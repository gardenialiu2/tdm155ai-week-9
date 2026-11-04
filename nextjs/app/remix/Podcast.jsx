"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CAST } from "./lib/contract.mjs";
import { instructions } from "./lib/prompts.mjs";
import Avatar from "./Avatar.jsx";
import { traceMarkdown } from "./trace.mjs";
import styles from "./podcast.module.css";

// The podcast prep page: pick or start a session for one guest, add material (files, pasted notes, links), and
// watch the four agents work on each item as it arrives. When you're done adding, the Producer writes the host's briefing.
// Everything is saved on the server (output/podcast/<session>/); this page only shows it and sends what you add.

const ACTIVE = new Set(["waiting", "running"]);
const label = { waiting: "waiting", running: "working", done: "done", failed: "failed", skipped: "skipped", blocked: "blocked" };

function save(name, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

const post = (url, body) => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((r) => r.json());

export default function Podcast() {
  const [sessions, setSessions] = useState(null);
  const [id, setId] = useState("");
  const [session, setSession] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [textName, setTextName] = useState("");
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const [message, setMessage] = useState("");
  const files = useRef(null);

  const loadList = useCallback(async () => {
    const body = await fetch("/remix/api/sessions", { cache: "no-store" }).then((r) => r.json());
    setSessions(body.sessions || []);
    return body.sessions || [];
  }, []);

  const refresh = useCallback(async (which = id) => {
    if (!which) return;
    const body = await fetch(`/remix/api/session?id=${encodeURIComponent(which)}`, { cache: "no-store" }).then((r) => r.json());
    if (body.session) setSession(body.session);
  }, [id]);

  useEffect(() => {
    loadList().then((list) => {
      let wanted = "";
      try {
        wanted = new URLSearchParams(window.location.search).get("session") || localStorage.getItem("remix:session") || "";
      } catch {}
      const found = list.find((s) => s.id === wanted)?.id || list[0]?.id || "";
      setId(found);
    });
  }, [loadList]);

  useEffect(() => {
    setSession(null);
    if (!id) return;
    try {
      localStorage.setItem("remix:session", id);
      window.history.replaceState(null, "", `/remix?session=${encodeURIComponent(id)}`);
    } catch {}
    refresh(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  // While anything is waiting or working, look again every second and a half.
  const active = Boolean(session && (session.items.some((i) => !i.excluded && ["intake", "interviewer", "sidekick"].some((a) => ACTIVE.has(i[a].status))) || session.revisions.some((r) => ACTIVE.has(r.briefing.status))));
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => refresh(), 1500);
    return () => clearInterval(timer);
  }, [active, refresh]);

  const create = async () => {
    const body = await post("/remix/api/sessions", { title });
    setTitle("");
    await loadList();
    setId(body.session.id);
  };

  const add = async (picked) => {
    const form = new FormData();
    form.set("session", id);
    for (const file of picked || files.current?.files || []) form.append("file", file);
    if (text.trim()) {
      form.set("text", text);
      if (textName.trim()) form.set("textName", textName.trim());
    }
    if (link.trim()) form.append("link", link.trim());
    if ([...form.keys()].length <= 1) return;
    setBusy(true);
    setMessage("");
    try {
      const body = await fetch("/remix/api/add", { method: "POST", body: form }).then((r) => r.json());
      if (body.error) setMessage(body.error);
      else if (body.refused?.length) setMessage(`Not added: ${body.refused.map((r) => `${r.name} (${r.why})`).join("; ")}`);
      setText("");
      setTextName("");
      setLink("");
      if (files.current) files.current.value = "";
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const act = async (item, action, agent) => {
    const body = await post("/remix/api/item", { session: id, item, action, agent });
    if (body.error) setMessage(body.error);
    await refresh();
  };

  const finish = async (proceed = false) => {
    const body = await post("/remix/api/finish", { session: id, proceed });
    if (body.error) setMessage(body.error);
    await refresh();
  };

  if (!sessions) return <p className={styles.muted}>Loading…</p>;

  const agentState = (agent) => {
    if (!session) return "idle";
    if (agent === "producer") {
      const statuses = session.revisions.map((r) => r.briefing.status);
      return statuses.includes("running") ? "working" : statuses.includes("failed") ? "failed" : statuses.includes("waiting") || statuses.includes("blocked") ? "waiting" : statuses.includes("done") ? "done" : "idle";
    }
    const statuses = session.items.filter((i) => !i.excluded).map((i) => i[agent].status);
    return statuses.includes("running") ? "working" : statuses.includes("waiting") ? "waiting" : statuses.includes("failed") ? "failed" : statuses.length ? "done" : "idle";
  };
  const counts = (agent) => {
    if (!session) return "";
    if (agent === "producer") return `${session.revisions.filter((r) => r.briefing.status === "done").length} briefing(s)`;
    const items = session.items.filter((i) => !i.excluded);
    const done = items.filter((i) => i[agent].status === "done").length;
    const failed = items.filter((i) => i[agent].status === "failed").length;
    return `${done} of ${items.length} done${failed ? ` · ${failed} failed` : ""}`;
  };

  const open = session?.revisions.find((r) => r.briefing.status !== "done");
  const briefed = session ? [...session.revisions].reverse().find((r) => r.briefing.status === "done") : null;
  const newer = session && briefed ? session.items.filter((i) => !briefed.items.includes(i.id) && !i.excluded) : [];
  const cost = session ? session.items.reduce((sum, i) => sum + (i.intake.cost || 0) + (i.interviewer.cost || 0) + (i.sidekick.cost || 0), 0) + session.revisions.reduce((sum, r) => sum + (r.briefing.cost || 0), 0) : 0;

  return (
    <div className={styles.podcast}>
      <section className={`${styles.panel} ${styles.noPrint}`} aria-label="Session">
        <div className={styles.row}>
          <label className={styles.inline}>
            Session
            <select value={id} onChange={(e) => setId(e.target.value)}>
              {!sessions.length && <option value="">No sessions yet</option>}
              {sessions.map((s) => <option key={s.id} value={s.id}>{s.title} · {s.items} item{s.items === 1 ? "" : "s"} · {s.created.slice(0, 10)}</option>)}
            </select>
          </label>
          <span className={styles.muted}>or</span>
          <input type="text" placeholder="New guest: name and project" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && title.trim() && create()} />
          <button className={styles.button} onClick={create} disabled={!title.trim()}>Start a session</button>
        </div>
        {session && <p className={styles.muted}>Saved on this computer in <code>output/podcast/{session.id}/</code> · {session.items.length} item{session.items.length === 1 ? "" : "s"} · ${cost.toFixed(4)} so far</p>}
      </section>

      <section className={styles.cast} aria-label="The agents">
        {CAST.map((agent) => {
          const state = agentState(agent.id);
          return (
            <article className={styles.agent} key={agent.id} data-state={state}>
              <Avatar agent={agent.id} state={state} size={68} />
              <div>
                <h3>{agent.name}{agent.role !== agent.name && <span> · {agent.role}</span>}</h3>
                <p className={styles.state}>{label[state === "working" ? "running" : state] || "idle"}{session ? ` · ${counts(agent.id)}` : ""}</p>
                <p className={styles.muted}>{agent.job}</p>
                {instructions[agent.id] && (
                  <details className={`${styles.told} ${styles.noPrint}`}>
                    <summary>What {agent.name} is told</summary>
                    <pre>{instructions[agent.id]}</pre>
                  </details>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {session && (
        <>
          <section className={`${styles.panel} ${styles.noPrint}`} aria-label="Add material">
            <h2>Add material <span className={styles.badge}>revision {session.revision}</span></h2>
            <p className={styles.muted}>Anything the guest has: drafts, recordings, video, photos, PDFs, notes, links. Each item is saved first, then the Collector reads it and the Interviewer and the Sidekick start on it right away. Add as much as you like; nothing is final until you say you're done.</p>
            <label
              className={styles.drop}
              data-over={over}
              onDragOver={(e) => { e.preventDefault(); setOver(true); }}
              onDragLeave={() => setOver(false)}
              onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
            >
              <span>{busy ? "Saving…" : "Drop files here, or click to choose them"}</span>
              <input ref={files} type="file" multiple hidden onChange={(e) => add(e.target.files)} />
            </label>
            <div className={styles.fields}>
              <label className={styles.wide}>
                Paste a note
                <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="Notes, a transcript, an email from the guest…" />
              </label>
              <label>Its name (optional)<input type="text" value={textName} onChange={(e) => setTextName(e.target.value)} placeholder="e.g. pre-interview notes" /></label>
              <label>A link<input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://…" /></label>
            </div>
            <div className={styles.row}>
              <button className={styles.button} onClick={() => add([])} disabled={busy || (!text.trim() && !link.trim())}>Add the note or link</button>
              {message && <span className={styles.error}>{message}</span>}
            </div>
          </section>

          <section className={styles.items} aria-label="Items">
            {session.items.map((item) => <Item key={item.id} item={item} session={session} briefed={briefed} act={act} />)}
            {!session.items.length && <p className={styles.muted}>Nothing added yet.</p>}
          </section>

          <section className={styles.panel} aria-label="The briefing">
            <div className={styles.briefHead}>
              <Avatar agent="producer" state={agentState("producer")} size={84} />
              <div>
                <h2>The host's briefing</h2>
                {!open && !briefed && <p className={styles.muted}>The Producer waits until you say you're done, then until every item is finished.</p>}
                {open && <p className={styles.state}>Revision {open.n}: {open.briefing.status === "running" ? "The Producer is writing the briefing…" : open.briefing.status === "failed" ? `failed: ${open.briefing.error}` : open.briefing.why || label[open.briefing.status]}</p>}
              </div>
            </div>
            <div className={`${styles.row} ${styles.noPrint}`}>
              {!open && session.items.length > 0 && (!briefed || newer.length > 0) && <button className={styles.primary} onClick={() => finish(false)}>I'm done adding material — make the host briefing</button>}
              {open?.briefing.status === "blocked" && <button className={styles.button} onClick={() => finish(true)}>Go ahead without the failed items</button>}
              {open?.briefing.status === "failed" && <button className={styles.button} onClick={() => act(open.n, "retry", "producer")}>Retry the briefing</button>}
              {briefed && (
                <>
                  <button className={styles.button} onClick={() => save(`briefing-${session.id}-r${briefed.n}.md`, `${briefed.briefing.text}\n`)}>Download the briefing (.md)</button>
                  <button className={styles.button} onClick={() => window.print()}>Print</button>
                </>
              )}
              <button className={styles.button} onClick={() => save(`trace-${session.id}.md`, traceMarkdown(session))}>Download the trace (.md)</button>
            </div>
            {briefed && (
              <>
                <p className={styles.note}>Based on revision {briefed.n}: item{briefed.briefing.items.length === 1 ? "" : "s"} {briefed.briefing.items.map((x) => Number(x.slice(1))).join(", ")}{briefed.briefing.failed?.length ? `; not read: ${briefed.briefing.failed.map((x) => Number(x.slice(1))).join(", ")}` : ""}{briefed.briefing.excluded?.length ? `; left out by you: ${briefed.briefing.excluded.map((x) => Number(x.slice(1))).join(", ")}` : ""}.</p>
                {newer.length > 0 && <p className={styles.warn}>{newer.length} item{newer.length === 1 ? " was" : "s were"} added after this briefing and {newer.length === 1 ? "isn't" : "aren't"} in it ({newer.map((i) => i.number).join(", ")}). Press the button above when you're done for an updated briefing.</p>}
                <article className={styles.briefing}><ReactMarkdown remarkPlugins={[remarkGfm]}>{briefed.briefing.text}</ReactMarkdown></article>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function Lane({ agent, item, children, act }) {
  const cast = CAST.find((c) => c.id === agent);
  const s = item[agent];
  const state = item.excluded ? "idle" : s.status === "running" ? "working" : s.status;
  return (
    <div className={styles.lane} data-status={item.excluded ? "excluded" : s.status}>
      <div className={styles.laneHead}>
        <Avatar agent={agent} state={state} size={34} />
        <strong>{cast.name}</strong>
        <span className={styles.state}>{item.excluded ? "left out" : label[s.status]}{s.cost ? ` · $${s.cost.toFixed(4)}` : ""}</span>
        {s.status === "failed" && <button className={`${styles.small} ${styles.noPrint}`} onClick={() => act(item.id, "retry", agent)}>Retry</button>}
      </div>
      {s.status === "failed" && <p className={styles.error}>{s.error}</p>}
      {s.status === "done" && children}
      {s.status === "skipped" && s.why && <p className={styles.muted}>{s.why}</p>}
      {s.prompt && (
        <details className={`${styles.told} ${styles.noPrint}`}>
          <summary>What {cast.name} was given</summary>
          <pre>{`SYSTEM\n${s.prompt.system}\n\nUSER\n${s.prompt.user}`}</pre>
        </details>
      )}
    </div>
  );
}

function Item({ item, session, briefed, act }) {
  const late = briefed && !briefed.items.includes(item.id);
  return (
    <article className={styles.item} data-excluded={item.excluded}>
      <header className={styles.itemHead}>
        <span className={styles.number}>{item.number}</span>
        <div>
          <h3>{item.name}</h3>
          <p className={styles.muted}>
            {item.kind} · {item.source === "upload" ? `${Math.max(1, Math.round(item.size / 1024)).toLocaleString()} KB` : item.source} · revision {item.revision}
            {late ? " · not in the latest briefing" : ""} · <a href={`/remix/api/original?session=${encodeURIComponent(session.id)}&item=${item.id}`} target="_blank" rel="noreferrer">the original</a>
          </p>
        </div>
        <button className={`${styles.small} ${styles.noPrint}`} onClick={() => act(item.id, item.excluded ? "include" : "exclude")}>{item.excluded ? "Include it again" : "Leave it out"}</button>
      </header>
      <div className={styles.lanes}>
        <Lane agent="intake" item={item} act={act}>
          <p className={styles.muted}>{item.intake.method} · {(item.intake.text || "").length.toLocaleString()} characters</p>
          <details className={styles.read}>
            <summary>What the Collector read</summary>
            <pre>{item.intake.text}</pre>
          </details>
        </Lane>
        <Lane agent="interviewer" item={item} act={act}>
          {item.interviewer.summary && <p className={styles.muted}>{item.interviewer.summary}</p>}
          <ol className={styles.list}>
            {(item.interviewer.questions || []).map((q, i) => (
              <li key={i}>
                {q.question}
                {q.why && <span className={styles.from}> Why: {q.why}</span>}
              </li>
            ))}
          </ol>
        </Lane>
        <Lane agent="sidekick" item={item} act={act}>
          {item.sidekick.jokes?.length ? (
            <ul className={styles.list}>
              {(item.sidekick.jokes || []).map((j, i) => <li key={i}>{j.idea} <span className={styles.from}>(on the {j.butt})</span></li>)}
            </ul>
          ) : (
            <p className={styles.muted}>No joke here: {item.sidekick.jokesNote}</p>
          )}
        </Lane>
      </div>
    </article>
  );
}
