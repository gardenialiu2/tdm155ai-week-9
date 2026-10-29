"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ensemble.module.css";
import { defaultInstructions, defaultPurpose, messageFor, parsePlan, roles } from "./prompts.mjs";
import { buildTrace } from "./trace.mjs";

// The ensemble: four roles that read a context repository and brief a podcast host, run one at a time by the person
// at the keyboard. The session is kept in this browser (localStorage). Every request is composed here from
// prompts.mjs and shown before it's sent; the server route (api/run) only forwards it. trace.mjs records the run.

const models = [
  ["anthropic/claude-haiku-5.5", "Claude Haiku 5.5 (fast)"],
  ["anthropic/claude-sonnet-5.5", "Claude Sonnet 5.5"],
  ["anthropic/claude-opus-5.5", "Claude Opus 5.5"],
];

const agents = roles.filter((role) => role.key !== "conductor");
const textTypes = new Set([".md", ".markdown", ".txt", ".csv", ".json", ".yaml", ".yml", ".html", ".css", ".js", ".mjs", ".py", ".srt", ".vtt"]);
const skipFolders = /(^|\/)(node_modules|\.git|\.next|_media|_raw|output)(\/|$)/;

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function kb(size) {
  return size >= 1024 ? `${(size / 1024).toFixed(size >= 10240 ? 0 : 1)} KB` : `${size} B`;
}

// The plan before the Conductor has spoken: the Archivist gets everything allowed, the Researcher nothing, the
// Briefer the READMEs.
function defaultPlan(files) {
  const allowed = files.filter((file) => file.allowed).map((file) => file.path);
  return { archivist: allowed, researcher: [], briefer: allowed.filter((p) => /(^|\/)readme\.md$/i.test(p)) };
}

export default function Ensemble() {
  const [files, setFiles] = useState([]);
  const [about, setAbout] = useState("");
  const [purpose, setPurpose] = useState(defaultPurpose);
  const [model, setModel] = useState(models[0][0]);
  const [instructions, setInstructions] = useState(defaultInstructions);
  const [plan, setPlan] = useState({ archivist: [], researcher: [], briefer: [] });
  const [cards, setCards] = useState({});
  const [startedAt, setStartedAt] = useState(0);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFiles(load("ensemble.files", []));
    setAbout(load("ensemble.about", ""));
    setPurpose(load("ensemble.purpose", defaultPurpose));
    setModel(load("ensemble.model", models[0][0]));
    setInstructions({ ...defaultInstructions, ...load("ensemble.instructions", {}) });
    setPlan(load("ensemble.plan", { archivist: [], researcher: [], briefer: [] }));
    setCards(load("ensemble.cards", {}));
    setStartedAt(load("ensemble.startedAt", 0));
    setReady(true);
  }, []);

  useEffect(() => { if (ready) save("ensemble.files", files); }, [ready, files]);
  useEffect(() => { if (ready) save("ensemble.about", about); }, [ready, about]);
  useEffect(() => { if (ready) save("ensemble.purpose", purpose); }, [ready, purpose]);
  useEffect(() => { if (ready) save("ensemble.model", model); }, [ready, model]);
  useEffect(() => { if (ready) save("ensemble.instructions", instructions); }, [ready, instructions]);
  useEffect(() => { if (ready) save("ensemble.plan", plan); }, [ready, plan]);
  useEffect(() => { if (ready) save("ensemble.cards", cards); }, [ready, cards]);
  useEffect(() => { if (ready) save("ensemble.startedAt", startedAt); }, [ready, startedAt]);

  // The latest cards, for a run that steps through several roles in one go: each must see what the one before wrote.
  const cardsRef = useRef(cards);
  cardsRef.current = cards;

  const allowed = files.filter((file) => file.allowed);
  const given = (role) => allowed.filter((file) => plan[role].includes(file.path));

  // What a role would be sent right now.
  function compose(roleKey) {
    const message = messageFor[roleKey]({
      purpose,
      about,
      files: roleKey === "conductor" ? allowed : given(roleKey),
      map: cardsRef.current.archivist?.output || "",
      notes: cardsRef.current.researcher?.output || "",
    });
    return { system: instructions[roleKey], message };
  }

  function takeFiles(list) {
    const withheld = new Set(files.filter((file) => !file.allowed).map((file) => file.path));
    const next = list.map((file) => ({ ...file, allowed: !withheld.has(file.path) })).sort((a, b) => a.path.localeCompare(b.path));
    setFiles(next);
    setPlan(defaultPlan(next));
    setCards({});
    setStartedAt(0);
    setError("");
  }

  async function pickFolder(event) {
    const out = [];
    for (const file of Array.from(event.target.files || [])) {
      const path = file.webkitRelativePath || file.name;
      const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
      if (skipFolders.test(path) || /(^|\/)\./.test(path) || !textTypes.has(ext)) continue;
      out.push({ path, size: file.size, text: await file.text() });
    }
    if (!out.length) { setError("No text files in that folder (Markdown, text, CSV, JSON, HTML, code)."); return; }
    takeFiles(out);
  }

  async function loadSample() {
    setError("");
    const response = await fetch(`${window.location.pathname.replace(/\/$/, "")}/api/sample`);
    const body = await response.json().catch(() => ({}));
    if (!response.ok) { setError(body.error || "Couldn't load the sample."); return; }
    takeFiles(body.files);
  }

  function setAllowed(path, value) {
    setFiles(files.map((file) => (file.path === path ? { ...file, allowed: value } : file)));
    if (!value) setPlan((p) => Object.fromEntries(Object.entries(p).map(([role, list]) => [role, list.filter((x) => x !== path)])));
  }

  function setGiven(role, path, value) {
    setPlan((p) => ({ ...p, [role]: value ? [...new Set([...p[role], path])] : p[role].filter((x) => x !== path) }));
  }

  async function run(roleKey) {
    setError("");
    if (roleKey === "archivist" && !given("archivist").length) { setError("The Archivist has no files. Tick some in its column."); return false; }
    const { system, message } = compose(roleKey);
    setBusy(roleKey);
    if (!startedAt) setStartedAt(Date.now());
    try {
      const response = await fetch(`${window.location.pathname.replace(/\/$/, "")}/api/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, role: roleKey, instructions: system, message }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || `The server answered ${response.status}.`);
      const card = { system, message, output: body.text, sources: body.sources || [], cost: body.cost, model: body.model, edited: false, ranAt: Date.now() };
      cardsRef.current = { ...cardsRef.current, [roleKey]: card };
      setCards(cardsRef.current);
      if (roleKey === "conductor") {
        const proposed = parsePlan(body.text, allowed);
        if (proposed) setPlan(proposed);
        else setError("The Conductor answered, but no plan could be read from it. The columns are unchanged.");
      }
      return true;
    } catch (err) {
      setError(err.message || String(err));
      return false;
    } finally {
      setBusy("");
    }
  }

  async function runAgents() {
    for (const role of agents) {
      if (!(await run(role.key))) break;
    }
  }

  function editOutput(roleKey, text) {
    setCards((c) => ({ ...c, [roleKey]: { ...c[roleKey], output: text, edited: true } }));
  }

  function startOver() {
    setCards({});
    setPlan(defaultPlan(files));
    setStartedAt(0);
    setError("");
  }

  const trace = buildTrace({ files, plan, cards, about, purpose, model, startedAt });

  function printTrace() {
    document.body.classList.add("print-trace");
    window.print();
    setTimeout(() => document.body.classList.remove("print-trace"), 500);
  }

  if (!ready) return null;

  return (
    <div className={styles.ensemble}>
      {error && <p className={styles.error} role="alert">{error}<button type="button" onClick={() => setError("")}>Dismiss</button></p>}

      <Step number={1} title="The repository" note={files.length ? `${files.length} files, ${allowed.length} allowed.` : "Pick a context repository, or use the sample."}>
        <div className={styles.row}>
          <input className={styles.fileInput} type="file" webkitdirectory="" directory="" multiple onChange={pickFolder} aria-label="Pick a folder" />
          <button type="button" className={styles.button} onClick={loadSample}>Use the sample repository</button>
        </div>
        <p className={styles.note}>
          The page reads the folder's text files here in the browser. Nothing is sent until you run a role, and then only the files in that role's column. <strong>Untick Allowed to withhold a file from the whole ensemble;</strong> it stays in the list, struck through, so the trace shows what wasn't read.
        </p>
        {files.length > 0 && (
          <table className={styles.files}>
            <thead>
              <tr>
                <th>File</th><th>Size</th><th className={styles.tick}>Allowed</th>
                {agents.map((role) => <th key={role.key} className={styles.tick}>{role.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.path} className={file.allowed ? undefined : styles.withheld}>
                  <td>{file.path}</td>
                  <td className={styles.num}>{kb(file.size)}</td>
                  <td className={styles.tick}><input type="checkbox" checked={file.allowed} onChange={(e) => setAllowed(file.path, e.target.checked)} aria-label={`Allow ${file.path}`} /></td>
                  {agents.map((role) => (
                    <td key={role.key} className={styles.tick}>
                      {file.allowed
                        ? <input type="checkbox" checked={plan[role.key].includes(file.path)} onChange={(e) => setGiven(role.key, file.path, e.target.checked)} aria-label={`Give ${file.path} to the ${role.name}`} />
                        : <span className={styles.badge}>withheld</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <label className={styles.block}>The piece and its maker, in a line or two (every role sees this)
          <textarea rows={2} value={about} onChange={(e) => setAbout(e.target.value)} placeholder="e.g. Jo's Alabaster: three letterpress broadsides of the two versions of a Dickinson poem and a 90-second stop-motion of the type being reset. Jo is the guest; Dev hosts." />
        </label>
      </Step>

      <Step number={2} title="What each role is told" note="The purpose of the run and the four system prompts. Edit any of them." closed>
        <div className={styles.roles}>
          {roles.map((role) => (
            <div key={role.key} className={styles.role}>
              <strong>{role.name}</strong>
              <p>{role.job}</p>
              <p><b>Reads:</b> {role.reads}.</p>
            </div>
          ))}
        </div>
        <label className={styles.block}>Purpose (every role sees this too)
          <textarea rows={3} value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        </label>
        {roles.map((role) => (
          <label key={role.key} className={styles.block}>{role.name}
            <textarea rows={8} value={instructions[role.key]} onChange={(e) => setInstructions((i) => ({ ...i, [role.key]: e.target.value }))} />
          </label>
        ))}
        <div className={styles.row}>
          <button type="button" className={styles.button} onClick={() => { setInstructions(defaultInstructions); setPurpose(defaultPurpose); }}>Reset</button>
          <label className={styles.inline}>Model
            <select value={model} onChange={(e) => setModel(e.target.value)}>{models.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
          </label>
          <p className={styles.note}>All of this lives in <code>prompts.mjs</code>, next to this page.</p>
        </div>
      </Step>

      <Step number={3} title="Run" note="Conductor first if you want a plan proposed. Then Archivist, Researcher, Briefer, each reading what the one before it wrote.">
        <div className={styles.row}>
          <button type="button" className={styles.primary} onClick={runAgents} disabled={!!busy || !allowed.length}>Run the three agents</button>
          <button type="button" className={styles.button} onClick={startOver} disabled={!!busy}>Start over</button>
          <p className={styles.note}>Or one at a time. You can edit a card before the next role reads it; the trace marks it.</p>
        </div>
        {roles.map((role) => (
          <RunCard key={role.key} role={role} card={cards[role.key]} composed={compose(role.key)} busy={busy} disabled={!allowed.length}
            onRun={() => run(role.key)} onEdit={(t) => editOutput(role.key, t)}
            given={role.key === "conductor" ? `the list of ${allowed.length} allowed files` : given(role.key).length ? given(role.key).map((f) => f.path).join(", ") : "no files"} />
        ))}
      </Step>

      <Step number={4} title="What comes out" note="The briefing for the host, and the trace of the whole run." className={styles.out}>
        <div className={styles.row}>
          <button type="button" className={styles.primary} onClick={() => download("briefing.md", cards.briefer?.output || "")} disabled={!cards.briefer?.output}>Download briefing.md</button>
          <button type="button" className={styles.button} onClick={() => download("trace.md", trace)} disabled={!files.length}>Download trace.md</button>
          <button type="button" className={styles.button} onClick={printTrace} disabled={!files.length}>Print the trace</button>
        </div>
        <p className={styles.note}>Print the trace and mark it up: what did each role know, what should it not have known, and where would you have stepped in?</p>
        <pre className={styles.trace}>{trace}</pre>
      </Step>
    </div>
  );
}

function Step({ number, title, note, closed = false, className = "", children }) {
  return (
    <details className={`${styles.step} ${className}`} open={!closed}>
      <summary>
        <span className={styles.stepNumber}>{number}</span>
        <span className={styles.stepTitle}><strong>{title}</strong><small>{note}</small></span>
        <span className={styles.stepCaret} aria-hidden="true" />
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}

function RunCard({ role, card, composed, busy, disabled, given, onRun, onEdit }) {
  const sent = card || composed;
  return (
    <div className={styles.run}>
      <div className={styles.runHead}>
        <strong>{role.name}</strong>
        <small>{role.job}</small>
        {busy === role.key
          ? <span className={styles.busy}>Running…</span>
          : <button type="button" className={styles.primary} onClick={onRun} disabled={!!busy || disabled}>{card ? "Run again" : "Run"}</button>}
      </div>
      <p className={styles.note}>Given: {given}{role.key === "researcher" ? ", and the Archivist's map; web search on" : role.key === "briefer" ? ", the map, and the Researcher's notes" : ""}.</p>
      <details className={styles.sent}>
        <summary>{card ? "What was sent" : "What will be sent"} ({sent.message.length.toLocaleString()} characters)</summary>
        <pre>{`SYSTEM\n${sent.system}\n\nUSER\n${sent.message}`}</pre>
      </details>
      {card && (
        <label className={styles.block}>
          <span>{role.name} said{card.edited && <span className={styles.edited}> · edited by you</span>}{card.cost != null && ` · $${Number(card.cost).toFixed(4)}`}</span>
          <textarea className={styles.output} rows={14} value={card.output} onChange={(e) => onEdit(e.target.value)} />
        </label>
      )}
      {card?.sources?.length > 0 && (
        <ul className={styles.sources}>{card.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title}</a></li>)}</ul>
      )}
    </div>
  );
}
