import { roles } from "./prompts.mjs";

// The trace: everything that happened in one run of the ensemble, as Markdown, for the download and for printing.
// It has the same shape as the paper version of the activity (docs/paper-ensemble): the file list with what was
// withheld and who got what, then one section per role with what it was told, what it was given, and what it said,
// marked where a person changed it before passing it on. A reader with the trace can mark up every decision.

function when(ms) {
  return ms ? new Date(ms).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "";
}

export function buildTrace({ files = [], plan = {}, cards = {}, about = "", purpose = "", model = "", startedAt = 0 }) {
  const lines = [];
  lines.push("# Ensemble trace", "");
  lines.push(`Run ${when(startedAt) || "(not started)"} · model ${model || "(none)"}`, "");
  lines.push("## About the piece", "", about.trim() || "(nothing entered)", "");
  lines.push("## Purpose", "", purpose.trim() || "(default)", "");

  lines.push("## Files", "");
  lines.push("| File | Size | Allowed | Archivist | Researcher | Briefer |", "| --- | ---: | :-: | :-: | :-: | :-: |");
  for (const file of files) {
    const allowed = file.allowed !== false;
    const got = (role) => (allowed && (plan[role] || []).includes(file.path) ? "●" : "");
    lines.push(`| ${file.path} | ${file.size} | ${allowed ? "yes" : "**withheld**"} | ${got("archivist")} | ${got("researcher")} | ${got("briefer")} |`);
  }
  if (!files.length) lines.push("| (no files) | | | | | |");
  lines.push("");

  roles.forEach((role, index) => {
    const card = cards[role.key];
    lines.push(`## ${index + 1}. ${role.name}`, "", `_${role.job}_`, "");
    if (!card) { lines.push("(not run)", ""); return; }
    lines.push(`Ran ${when(card.ranAt)}${card.cost != null ? ` · cost $${Number(card.cost).toFixed(4)}` : ""}${card.model ? ` · ${card.model}` : ""}`, "");
    lines.push("### Told (system prompt)", "", "```", card.system || "", "```", "");
    lines.push("### Given (message)", "", "```", card.message || "", "```", "");
    lines.push(`### Said${card.edited ? " (edited by a person before it was passed on)" : ""}`, "", card.output || "(nothing)", "");
    if (card.sources?.length) {
      lines.push("### Pages it used", "", ...card.sources.map((s) => `- [${s.title}](${s.url})`), "");
    }
  });

  return lines.join("\n");
}
