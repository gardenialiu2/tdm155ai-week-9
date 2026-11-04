import { CAST } from "../../lib/podcast/contract.mjs";

// The whole session as Markdown, for inspecting or printing: every item, what each agent was given and said, the
// revisions and their briefings, and the event log. Pure: the page builds it from the session it already has.
const who = (id) => CAST.find((c) => c.id === id);

export function traceMarkdown(session) {
  const out = [`# Trace: ${session.title}`, "", `Session \`${session.id}\` · created ${session.created} · ${session.items.length} items · ${session.revisions.length} revision(s) closed`, ""];
  for (const item of session.items) {
    out.push(`## Item ${item.number}: ${item.name}`, "", `${item.kind} · ${item.source}${item.url ? ` (${item.url})` : ""} · revision ${item.revision} · original \`${item.file}\`${item.excluded ? " · **left out by the person**" : ""}`, "");
    for (const agent of ["intake", "interviewer", "sidekick"]) {
      const s = item[agent];
      const c = who(agent);
      out.push(`### ${c.icon} ${c.name}${c.role === c.name ? "" : ` (${c.role})`}: ${s.status}${s.cost ? ` · $${s.cost.toFixed(4)}` : ""}${s.model ? ` · ${s.model}` : ""}`, "");
      if (s.error) out.push(`Error: ${s.error}`, "");
      if (agent === "intake" && s.text) out.push(`${s.method}:`, "", "```", s.text, "```", "");
      if (agent === "interviewer" && s.questions) out.push(...(s.summary ? [s.summary, ""] : []), ...s.questions.map((q, i) => `${i + 1}. ${q.question}${q.why ? ` *Why:* ${q.why}` : ""}`), "");
      if (agent === "sidekick" && s.jokes) out.push(...(s.jokes.length ? s.jokes.map((j) => `- ${j.idea} *(on the ${j.butt})*`) : [`No joke: ${s.jokesNote}`]), "");
      if (s.prompt) out.push("<details><summary>What it was given</summary>", "", "```", `SYSTEM\n${s.prompt.system}\n\nUSER\n${s.prompt.user}`, "```", "", "</details>", "");
    }
  }
  for (const rev of session.revisions) {
    const b = rev.briefing;
    out.push(`## ${who("producer").icon} Bea's briefing, revision ${rev.n}: ${b.status}`, "", `Closed ${rev.closedAt} with items ${rev.items.map((x) => Number(x.slice(1))).join(", ")}${rev.proceedWithGaps ? " · went ahead with gaps" : ""}${b.cost ? ` · $${b.cost.toFixed(4)}` : ""}`, "");
    if (b.error) out.push(`Error: ${b.error}`, "");
    if (b.text) out.push(b.text, "");
  }
  out.push("## Events", "", ...session.events.map((e) => `- ${e.t} · ${who(e.agent)?.name || e.agent} · ${e.kind}${e.item ? ` · ${e.item}` : ""}: ${e.text}`), "");
  return out.join("\n");
}
