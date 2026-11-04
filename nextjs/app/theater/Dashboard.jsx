"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { scriptMarkdown, summarize } from "./derive.mjs";
import styles from "./theater.module.css";

// The dashboard for one run, from its events alone (see derive.mjs): the numbers, the graph, the script, a timeline
// by speaker, who addressed whom, the running cost, and the observers' notes. The same component shows a run as it
// streams in, a saved run, and a log someone dropped onto /theater/view. Print gives a light copy without the controls.

const money = (n) => `$${(n || 0).toFixed(4)}`;

// One color per layer, for the timeline dots and the legend.
const LAYER_COLORS = { cast: "#ecece6", judge: "#7fc787", router: "#f2c14e", branch: "#f2c14e", director: "#8ab4ff", producer: "#ff6b57", observer: "#c39bff", system: "#a0a49a" };

function save(name, text, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Dashboard({ events = [], live = false }) {
  const s = summarize(events);
  const kind = s.meta.kind;
  const ceiling = s.meta.config?.costCeiling || 0;
  const runId = events[0]?.run || "run";
  const fileBase = runId.replace("~", "-");
  if (!events.length) return null;
  return (
    <section className={styles.dashboard} aria-label="The run">
      <div className={`${styles.row} ${styles.noPrint}`}>
        <button className={styles.button} onClick={() => save(`${fileBase}.jsonl`, events.map((e) => JSON.stringify(e)).join("\n") + "\n", "application/x-ndjson")}>Download the log (.jsonl)</button>
        <button className={styles.button} onClick={() => save(`${fileBase}-script.md`, scriptMarkdown(events), "text/markdown")}>Download the script (.md)</button>
        <button className={styles.button} onClick={() => window.print()}>Print</button>
        {!live && events[0]?.run && <a className={styles.button} href={`/theater/runs/${encodeURIComponent(runId)}`}>Permalink</a>}
      </div>

      <div className={styles.panel}>
        <p className={styles.status}>
          <strong>{s.meta.title || "A run"}</strong> · <code>{runId}</code> · {kind} · {s.meta.config?.model}
          <br />
          {s.running ? <span>{live ? "Running…" : "This log has no stop event (cut short?)."}</span> : <span>Stopped: {s.stop.text}.</span>}
        </p>
        <div className={styles.stats}>
          {kind === "loop" && <div className={`${styles.stat} ${styles.big}`}><strong>{s.verdicts.length}</strong><span>tries (min {s.meta.config?.minTries}, max {s.meta.config?.maxTries})</span></div>}
          {kind !== "loop" && <div className={styles.stat}><strong>{s.rounds}</strong><span>{kind === "switch" ? "steps" : `rounds of ${s.meta.config?.turns ?? "?"}`}</span></div>}
          <div className={styles.stat}><strong>{events.length}</strong><span>events</span></div>
          <div className={styles.stat}><strong>{s.calls}</strong><span>model calls</span></div>
          <div className={styles.stat}><strong>{(s.tokens.in + s.tokens.out).toLocaleString()}</strong><span>tokens ({s.tokens.in.toLocaleString()} in, {s.tokens.out.toLocaleString()} out)</span></div>
          <div className={styles.stat}>
            <strong>{money(s.cost)}</strong><span>of a {money(ceiling)} ceiling</span>
            <div className={styles.meter}><span style={{ width: `${Math.min(100, ceiling ? (s.cost / ceiling) * 100 : 0)}%` }} /></div>
          </div>
          {s.eliminated.length > 0 && <div className={styles.stat}><strong>{s.eliminated.length}</strong><span>out: {s.eliminated.join(", ")}</span></div>}
        </div>
      </div>

      <div className={styles.panel}>
        <h3>The graph</h3>
        <div className={styles.graph}><Graph s={s} /></div>
      </div>

      <div className={styles.two}>
        <div className={styles.panel}>
          <h3>The script</h3>
          <Script events={events} kind={kind} />
        </div>
        <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
          <div className={styles.panel}>
            <h3>Timeline by speaker</h3>
            <Timeline events={events} s={s} />
          </div>
          {s.columns.length > 0 && (
            <div className={styles.panel}>
              <h3>Who addressed whom</h3>
              <Matrix s={s} />
            </div>
          )}
          <div className={styles.panel}>
            <h3>Running cost</h3>
            <CostChart s={s} ceiling={ceiling} />
          </div>
          {s.observations.length > 0 && (
            <div className={styles.panel}>
              <h3>The observers' notes</h3>
              {s.observations.map((o) => (
                <div className={styles.observation} key={o.seq}>
                  <p><strong>{o.speaker}</strong>{o.round ? ` · after round ${o.round}` : ""}</p>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{o.text}</ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Given({ e }) {
  if (!e.prompt) return null;
  return (
    <details className={styles.given}>
      <summary>What {e.speaker} was given{e.tokens?.in ? ` · ${e.tokens.in} tokens in, ${e.tokens.out} out` : ""}{e.cost ? ` · ${money(e.cost)}` : ""}</summary>
      <pre>{`SYSTEM\n${e.prompt.system}\n\nUSER\n${e.prompt.user}`}</pre>
    </details>
  );
}

function Script({ events, kind }) {
  const rows = [];
  let round = null;
  for (const e of events) {
    if (e.round && e.round !== round && e.kind !== "observation") {
      round = e.round;
      rows.push(<div className={styles.roundHead} key={`r${e.seq}`}>{kind === "loop" ? "Try" : "Round"} {round}</div>);
    }
    rows.push(
      <div className={styles.event} key={e.seq}>
        <span className={styles.seq}>{e.seq}</span>
        <div>
          <Line e={e} />
          <Given e={e} />
        </div>
      </div>,
    );
  }
  return <div className={styles.script}>{rows}</div>;
}

function Line({ e }) {
  const to = e.to && !e.to.includes("everyone") && !e.to.includes("camera") ? <span className={styles.to}> → {e.to.join(", ")}</span> : null;
  switch (e.kind) {
    case "start": return <div className={styles.direction}><ReactMarkdown remarkPlugins={[remarkGfm]}>{e.text}</ReactMarkdown></div>;
    case "input": return <span><span className={styles.who}>INPUT</span> {e.text}</span>;
    case "line": return <span><span className={styles.who}>{e.speaker.toUpperCase()}</span>{to}<br />{e.text}</span>;
    case "aside": return <span className={styles.aside}>({e.speaker}, to the camera) {e.text}</span>;
    case "vote": return <span className={styles.aside}>({e.speaker} votes for <strong>{e.state?.target || "nobody"}</strong>) {e.text}</span>;
    case "verdict": return <span><span className={e.state?.accept ? styles.accept : styles.reject}>{e.speaker}: {e.state?.accept ? "ACCEPT" : "REJECT"}</span> {e.text}</span>;
    case "route": return <span><span className={styles.producer}>{e.speaker} routes to {e.state?.branch}</span> {e.text}</span>;
    case "reply": return <span><span className={styles.who}>{e.speaker.toUpperCase()}</span><br />{e.text}</span>;
    case "goal": return <span className={styles.direction}><strong>{e.speaker}</strong>: {e.state?.reached ? "goal reached" : "not yet"}. {e.text}</span>;
    case "note": return <span className={styles.direction}><strong>{e.speaker}'s note to the cast:</strong> {e.text}</span>;
    case "observation": return <span className={styles.direction}><strong>{e.speaker}</strong> takes notes (see the observers' notes).</span>;
    case "stop": return <span className={styles.direction}>— Stopped: {e.text}.</span>;
    case "error": return <span className={styles.error}>Error: {e.text}</span>;
    default: return <span className={styles.producer}>[{e.speaker}{e.kind && e.kind !== "pass" ? `: ${e.kind}` : " passes"}] <span style={{ color: "var(--ink)", fontWeight: 400 }}>{e.text}</span></span>;
  }
}

// One row per speaker, one column per event; hover a dot for the text.
function Timeline({ events, s }) {
  const speakers = s.speakers;
  if (!speakers.length) return <p className={styles.muted}>Nothing yet.</p>;
  const last = Math.max(1, ...events.map((e) => e.seq || 0));
  const left = 110;
  const width = 620;
  const rowH = 22;
  const height = speakers.length * rowH + 24;
  const x = (seq) => left + ((seq || 0) / last) * (width - left - 12);
  const layers = [...new Set(events.filter((e) => e.speaker && e.layer !== "system").map((e) => e.layer))];
  return (
    <div className={styles.scroll}>
      <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Timeline by speaker">
        {speakers.map((name, i) => (
          <g key={name}>
            <text x={left - 8} y={i * rowH + 16} textAnchor="end">{name.length > 15 ? `${name.slice(0, 14)}…` : name}</text>
            <line x1={left} x2={width - 8} y1={i * rowH + 12} y2={i * rowH + 12} stroke="var(--line)" />
          </g>
        ))}
        {events.filter((e) => e.speaker && e.layer !== "system").map((e) => {
          const row = speakers.indexOf(e.speaker);
          const color = e.kind === "verdict" ? (e.state?.accept ? "var(--ok)" : "var(--error)") : LAYER_COLORS[e.layer] || "#aaa";
          const hollow = e.kind === "aside" || e.kind === "vote";
          return (
            <circle key={e.seq} cx={x(e.seq)} cy={row * rowH + 12} r={e.kind === "eliminate" ? 7 : 5} fill={hollow ? "none" : color} stroke={color} strokeWidth={hollow ? 2 : 0}>
              <title>{`#${e.seq} ${e.speaker} · ${e.kind}${e.round ? ` · round ${e.round}` : ""}\n${(e.text || "").slice(0, 240)}`}</title>
            </circle>
          );
        })}
        <text className={styles.faint} x={left} y={height - 4}>event 0</text>
        <text className={styles.faint} x={width - 8} y={height - 4} textAnchor="end">event {last}</text>
      </svg>
      <div className={styles.legend}>
        {layers.map((l) => <span key={l}><i style={{ background: LAYER_COLORS[l] }} />{l}</span>)}
        <span><i style={{ border: "2px solid var(--muted)" }} />aside or vote (private)</span>
      </div>
    </div>
  );
}

function Matrix({ s }) {
  const rows = Object.keys(s.addressed);
  return (
    <div className={styles.scroll}>
      <table className={styles.matrix}>
        <thead>
          <tr><th>from ↓ to →</th>{s.columns.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}><th>{r}</th>{s.columns.map((c) => { const n = s.addressed[r]?.[c] || 0; return <td key={c} data-n={n}>{n}</td>; })}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CostChart({ s, ceiling }) {
  const points = s.costSeries;
  if (!points.length) return <p className={styles.muted}>No cost reported yet.</p>;
  const width = 620;
  const height = 120;
  const last = Math.max(1, ...points.map((p) => p.seq));
  const top = Math.max(ceiling || 0, s.cost) || 1;
  const x = (seq) => 40 + (seq / last) * (width - 52);
  const y = (c) => height - 20 - (c / top) * (height - 34);
  const path = points.map((p, i) => `${i ? "L" : "M"}${x(p.seq).toFixed(1)},${y(p.cost).toFixed(1)}`).join(" ");
  const speakers = Object.entries(s.bySpeaker).filter(([, v]) => v.cost > 0).sort((a, b) => b[1].cost - a[1].cost);
  return (
    <>
      <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Running cost">
        {ceiling > 0 && <line x1={40} x2={width - 12} y1={y(ceiling)} y2={y(ceiling)} stroke="var(--error)" strokeDasharray="4 4" />}
        {ceiling > 0 && <text className={styles.faint} x={width - 12} y={y(ceiling) - 4} textAnchor="end">ceiling {money(ceiling)}</text>}
        <line x1={40} x2={width - 12} y1={height - 20} y2={height - 20} stroke="var(--line)" />
        <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2" />
        <text className={styles.faint} x={40} y={height - 4}>event 0</text>
        <text x={x(points.at(-1).seq)} y={y(points.at(-1).cost) - 6} textAnchor="end">{money(s.cost)}</text>
      </svg>
      <table className={styles.matrix} style={{ marginTop: 10 }}>
        <thead><tr><th>who</th><th>calls</th><th>cost</th></tr></thead>
        <tbody>{speakers.map(([name, v]) => <tr key={name}><th>{name}</th><td>{v.count}</td><td>{money(v.cost)}</td></tr>)}</tbody>
      </table>
    </>
  );
}

// The system's shape, with what fired: for a loop, the try and the judge and the edge back; for a switch, the router
// and the branch it chose; for a cast, the three systems (producers write in, observers read out).
function Graph({ s }) {
  const kind = s.meta.kind;
  const W = 620;
  const node = (x, y, label, on, sub) => (
    <g key={label}>
      <rect x={x - 80} y={y - 22} width={160} height={44} rx={10} fill={on ? "var(--accent)" : "var(--paper)"} stroke={on ? "var(--accent)" : "var(--muted)"} strokeWidth={1.5} />
      <text x={x} y={y + (sub ? -2 : 4)} textAnchor="middle" style={{ fill: on ? "var(--accent-ink)" : "var(--ink)", fontWeight: 700 }}>{label.length > 18 ? `${label.slice(0, 17)}…` : label}</text>
      {sub && <text x={x} y={y + 13} textLength={sub.length > 26 ? 150 : undefined} lengthAdjust="spacingAndGlyphs" textAnchor="middle" style={{ fill: on ? "var(--accent-ink)" : "var(--muted)", fontSize: 11 }}>{sub}</text>}
    </g>
  );
  const edge = (x1, y1, x2, y2, on, label, key) => (
    <g key={key || label}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? "var(--accent)" : "var(--line)"} strokeWidth={on ? 3 : 1.5} markerEnd={on ? "url(#arrowOn)" : "url(#arrow)"} />
      {label && <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 7} textAnchor="middle" className={styles.faint} style={{ fontSize: 11 }}>{label}</text>}
    </g>
  );
  const defs = (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--line)" /></marker>
      <marker id="arrowOn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" /></marker>
    </defs>
  );
  if (kind === "loop") {
    const rejects = s.verdicts.filter((v) => !v.state?.accept).length;
    const accepted = s.verdicts.some((v) => v.state?.accept);
    return (
      <svg className={styles.svg} viewBox={`0 0 ${W} 150`} role="img" aria-label="The loop">
        {defs}
        {node(110, 60, (s.meta.cast || []).join(" + ") || "the try", s.running, `try ${s.verdicts.length + (s.running ? 1 : 0)}`)}
        {node(330, 60, s.meta.judge || "judge", false, `${rejects} reject${rejects === 1 ? "" : "s"}`)}
        {node(530, 60, "done", accepted, accepted ? "accepted" : s.running ? "" : "not accepted")}
        {edge(190, 52, 248, 52, s.running, "try", "try")}
        {edge(410, 60, 448, 60, accepted, "accept", "acc")}
        <path d="M330,84 C330,130 110,130 110,86" fill="none" stroke={rejects ? "var(--accent)" : "var(--line)"} strokeWidth={rejects ? 2.5 : 1.5} markerEnd={rejects ? "url(#arrowOn)" : "url(#arrow)"} />
        <text x={220} y={136} textAnchor="middle" className={styles.faint} style={{ fontSize: 11 }}>reject: try again (×{rejects})</text>
      </svg>
    );
  }
  if (kind === "switch") {
    const [a, b] = s.meta.branches || [];
    const chosen = s.route?.state?.branch;
    return (
      <svg className={styles.svg} viewBox={`0 0 ${W} 170`} role="img" aria-label="The switch">
        {defs}
        {node(90, 85, "input", true)}
        {node(300, 85, s.meta.router || "router", Boolean(chosen), chosen ? "routed" : "")}
        {node(520, 35, a || "branch A", chosen === a)}
        {node(520, 135, b || "branch B", chosen === b)}
        {edge(170, 85, 218, 85, true, "", "in")}
        {edge(380, 78, 438, 42, chosen === a, chosen === a ? "fired" : "", "a")}
        {edge(380, 92, 438, 128, chosen === b, chosen === b ? "fired" : "", "b")}
      </svg>
    );
  }
  const has = (k) => (s.meta[k] || []).length || (k === "director" && s.meta.director);
  const producersOn = s.speakers.some((n) => s.bySpeaker[n].layer === "producer" && s.bySpeaker[n].count);
  const observersOn = s.observations.length > 0;
  return (
    <svg className={styles.svg} viewBox={`0 0 ${W} 170`} role="img" aria-label="The graph of graphs">
      {defs}
      {node(310, 85, "1 · the cast", s.running, `${(s.meta.cast || []).length} characters, round-robin`)}
      {has("producers") ? node(90, 85, "2 · producers", producersOn, (s.meta.producers || []).join(", ")) : null}
      {has("producers") ? edge(170, 85, 228, 85, producersOn, "write into", "p") : null}
      {has("observers") ? node(530, 85, "3 · observers", observersOn, (s.meta.observers || []).join(", ")) : null}
      {has("observers") ? edge(390, 85, 448, 85, observersOn, "read", "o") : null}
      {s.meta.director ? node(310, 25, s.meta.director, Boolean(s.stop?.state?.reached), s.stop?.state?.reached ? "goal reached" : "checks the goal") : null}
      {s.meta.director ? edge(310, 61, 310, 49, false, "", "d") : null}
      {s.meta.config?.ratingsLoop && has("producers") && has("observers") ? <path d="M530,109 C530,165 90,165 90,111" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow)" /> : null}
      {s.meta.config?.ratingsLoop && has("producers") && has("observers") ? <text x={310} y={160} textAnchor="middle" className={styles.faint} style={{ fontSize: 11 }}>the ratings loop: producers read the observers</text> : null}
    </svg>
  );
}
