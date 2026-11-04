"use client";

import { useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard.jsx";
import styles from "./theater.module.css";

// The Theater page in the browser: pick a system from systems/, read every file it's made of, set the caps, and run
// it. The run happens on the server (api/run), which streams each event back as it happens; Stop asks the server to
// end the run after the call in progress, so the log still ends with a stop event.

const MODELS = [
  ["anthropic/claude-haiku-5.5", "Claude Haiku 5.5 (default, cheapest)"],
  ["anthropic/claude-sonnet-5.5", "Claude Sonnet 5.5"],
  ["anthropic/claude-opus-5.5", "Claude Opus 5.5 (expensive)"],
];

const GROUPS = [
  ["loop", "Step 0a · the loop"],
  ["switch", "Step 0b · the switch"],
  ["cast", "Steps 1–5 · the cast"],
];

function agentFiles(system) {
  return [
    { label: "system.md", file: system.files.system, text: system.raw },
    ...system.cast.map((a) => ({ label: `cast · ${a.name}`, file: a.file, text: a.raw, problem: a.problem })),
    ...(system.judge ? [{ label: `judge · ${system.judge.name}`, file: system.judge.file, text: system.judge.raw }] : []),
    ...(system.router ? [{ label: `router · ${system.router.name}`, file: system.router.file, text: system.router.raw }] : []),
    ...system.branches.map((a) => ({ label: `branch · ${a.name}`, file: a.file, text: a.raw })),
    ...(system.director ? [{ label: `director · ${system.director.name}`, file: system.director.file, text: system.director.raw }] : []),
    ...system.producers.map((a) => ({ label: `producer · ${a.name}`, file: a.file, text: a.raw })),
    ...system.observers.map((a) => ({ label: `observer · ${a.name}`, file: a.file, text: a.raw })),
  ];
}

export default function Theater() {
  const [systems, setSystems] = useState(null);
  const [picked, setPicked] = useState("");
  const [settings, setSettings] = useState({});
  const [events, setEvents] = useState([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const runId = useRef("");

  const load = async () => {
    const res = await fetch("/theater/api/systems", { cache: "no-store" });
    const body = await res.json();
    setSystems(body.systems || []);
    return body.systems || [];
  };

  useEffect(() => {
    load().then((list) => {
      let wanted = "";
      try {
        wanted = new URLSearchParams(window.location.search).get("system") || localStorage.getItem("theater:system") || "";
      } catch {}
      setPicked(list.find((s) => s.name === wanted)?.name || list[0]?.name || "");
    }).catch((e) => setError(e.message));
  }, []);

  const system = systems?.find((s) => s.name === picked);

  const pick = (name) => {
    setPicked(name);
    setSettings({});
    if (!running) setEvents([]);
    try {
      localStorage.setItem("theater:system", name);
    } catch {}
  };

  const set = (key) => (event) => setSettings((old) => ({ ...old, [key]: event.target.value }));

  const run = async (rehearse = false) => {
    setError("");
    setEvents([]);
    setRunning(true);
    runId.current = "";
    try {
      await load(); // pick up any edits to the files since the page opened
      const res = await fetch("/theater/api/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: picked, overrides: settings, rehearse }) });
      if (!res.ok || !res.body) throw new Error((await res.json().catch(() => ({}))).error || `The server answered ${res.status}.`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        const fresh = lines.filter(Boolean).map((line) => JSON.parse(line));
        if (fresh.length) {
          runId.current ||= fresh[0].run;
          setEvents((old) => [...old, ...fresh]);
        }
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setRunning(false);
    }
  };

  const stop = async () => {
    await fetch("/theater/api/stop", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ run: runId.current }) });
  };

  if (!systems) return <p className={styles.muted}>{error || "Loading the systems…"}</p>;
  if (!systems.length) return <p className={styles.muted}>No systems yet: make a folder in <code>systems/</code> at the repo root (see <a href="/docs/theater/09-system-format">the format</a>).</p>;

  const c = system?.config || {};
  return (
    <div className={styles.theater}>
      <div className={`${styles.layout}`}>
        <nav className={`${styles.systems} ${styles.noPrint}`} aria-label="Systems">
          {GROUPS.map(([kind, label]) => {
            const list = systems.filter((s) => s.config.kind === kind);
            if (!list.length) return null;
            return (
              <div key={kind} className={styles.systems}>
                <h2>{label}</h2>
                {list.map((s) => (
                  <button key={s.name} className={styles.systemButton} aria-pressed={s.name === picked} onClick={() => pick(s.name)} disabled={running}>
                    <span>{s.title}</span>
                    <small><code>systems/{s.name}/</code></small>
                  </button>
                ))}
              </div>
            );
          })}
          <p className={styles.muted}>Fork one: copy its folder in <code>systems/</code> to a new name, change the files, reload this page.</p>
        </nav>

        {system && (
          <div className={styles.theater}>
            <div className={`${styles.panel} ${styles.noPrint}`}>
              <p className={styles.muted}><span className={styles.kind}>{c.kind}</span><code>systems/{system.name}/</code></p>
              <h2>{system.title}</h2>
              <p className={styles.muted}>{system.description}</p>
              <p className={styles.premise}>{system.premise}</p>

              <div className={styles.controls}>
                <label>
                  Model
                  <select value={settings.model ?? c.model} onChange={set("model")} disabled={running}>
                    {[...new Set([c.model, ...MODELS.map(([m]) => m)])].map((m) => <option key={m} value={m}>{MODELS.find(([id]) => id === m)?.[1] || m}</option>)}
                  </select>
                </label>
                {c.kind === "loop" && (
                  <>
                    <label>At least (tries)<input type="number" min="1" max="20" value={settings.minTries ?? c.minTries} onChange={set("minTries")} disabled={running} /></label>
                    <label>At most (tries)<input type="number" min="1" max="20" value={settings.maxTries ?? c.maxTries} onChange={set("maxTries")} disabled={running} /></label>
                  </>
                )}
                {c.kind === "cast" && <label>Rounds (turns each)<input type="number" min="1" max="30" value={settings.turns ?? c.turns} onChange={set("turns")} disabled={running} /></label>}
                <label>Cost ceiling ($)<input type="number" min="0.01" max="5" step="0.05" value={settings.costCeiling ?? c.costCeiling} onChange={set("costCeiling")} disabled={running} /></label>
                {c.kind === "switch" && (
                  <label className={styles.wide}>
                    The input (what the router reads)
                    <textarea rows={3} value={settings.input ?? c.input} onChange={set("input")} disabled={running} />
                  </label>
                )}
              </div>

              <div className={styles.row}>
                {!running && <button className={styles.primary} onClick={() => run(false)}>Run it</button>}
                {!running && <button className={styles.button} onClick={() => run(true)} title="Stand-in replies, no model, no cost">Rehearse (no model, free)</button>}
                {running && <button className={styles.stop} onClick={stop}>Stop</button>}
                <span className={styles.muted}>
                  {c.kind === "cast" ? `${system.cast.length} characters × ${settings.turns ?? c.turns} rounds` : c.kind === "loop" ? `${system.cast.length} + judge, each try` : "router + one branch"}
                  {system.director ? " · a director" : ""}{system.producers.length ? ` · ${system.producers.length} producer${system.producers.length > 1 ? "s" : ""} every ${c.producersEvery} round${c.producersEvery > 1 ? "s" : ""}` : ""}{system.observers.length ? ` · ${system.observers.length} observer${system.observers.length > 1 ? "s" : ""}` : ""}{c.confessionals ? " · confessionals on" : ""}{c.ratingsLoop ? " · ratings loop" : ""}
                </span>
              </div>
              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.files}>
                {agentFiles(system).map((f) => (
                  <details className={styles.file} key={f.file}>
                    <summary>{f.label}<small><code>{f.file}</code></small>{f.problem && <span className={styles.error}> · {f.problem}</span>}</summary>
                    <pre>{f.text}</pre>
                  </details>
                ))}
              </div>
            </div>
            <Dashboard events={events} live={running} />
            {!running && events.length > 0 && <p className={`${styles.muted} ${styles.noPrint}`}>Saved as <code>runs/{(events[0]?.run || "").replace("~", "/")}.jsonl</code>. Every run is at <a href="/theater/runs">Runs</a>.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
