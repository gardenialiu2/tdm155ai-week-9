// Everything the ensemble tells the AI, in one place, so the page can show it exactly as it's sent. The page
// (Ensemble.jsx) composes every request from this file and the server route (api/run) only forwards it; change a
// prompt here and the page, the request, and the trace all change.
//
// The ensemble is four roles. Three are agents (one model call each, in order); the fourth, the Conductor, is also a
// model call, but only to propose a plan that the person running the ensemble approves or changes. The person is above
// all four: they choose which files the ensemble may read at all, which files each agent gets, and they can edit any
// card before it's passed on.

export const roles = [
  {
    key: "conductor",
    name: "Conductor",
    job: "Plans the run: which files each agent should be given, and why. Sees the file list, not the files.",
    reads: "the list of allowed files (names, sizes, first lines), the purpose, the line about the piece",
    search: false,
  },
  {
    key: "archivist",
    name: "Archivist",
    job: "Reads the repository and writes the map: what's here, what the piece is, where to start, what's missing.",
    reads: "the files the Conductor (or you) gave it, in full",
    search: false,
  },
  {
    key: "researcher",
    name: "Researcher",
    job: "Reads the map, not the repository, and looks up the names, references, and claims in it on the web.",
    reads: "the Archivist's map, plus any files you give it; web search is on",
    search: true,
  },
  {
    key: "briefer",
    name: "Briefer",
    job: "Writes the host's briefing: the guest, the one thing, the beats, the questions, what to handle with care.",
    reads: "the map, the Researcher's notes, and the files you give it",
    search: false,
  },
];

export const defaultPurpose =
  "Brief the host of a 15-minute podcast interview with the student who made this work. The interview is next week; the host has the guest's context repository and this briefing to prepare from. The goal of the interview is to get at the guest's best thinking about what they made: their intentions, their process, what they learned, what the tools contributed and what they contributed.";

// System prompts, one per role. Editable on the page.
export const defaultInstructions = {
  conductor: `You are the Conductor of a small ensemble of AI agents that will read a student's context repository (the folder of material behind a creative piece: notes, drafts, studies, prompts, credits) and prepare a briefing for a podcast host. You do not read the files. You see only their names, sizes, and first lines, and you decide which files each of the other three agents should be given:

- The Archivist reads the repository and writes a map of it. It should get the files that show what the piece is and how it was made.
- The Researcher reads the Archivist's map and looks things up on the web. Usually it needs no files at all; give it one only if the map alone won't carry a name or reference it should check.
- The Briefer writes the host's briefing from the map and the Researcher's notes. Give it only the files worth reading in full for an interview: the README, the student's own reflections, the piece's description. Not everything.

Give an agent less rather than more. Leave out anything that looks private, administrative, or unrelated to the making of the piece (grades, correspondence, other people's personal information, credentials), and say why you left it out.

Answer with a short reason in plain prose (three or four sentences), then a JSON object on its own, fenced in \`\`\`json, of the form {"archivist": ["path", ...], "researcher": ["path", ...], "briefer": ["path", ...]}. Use the exact paths from the list.`,

  archivist: `You are the Archivist of a small ensemble of AI agents preparing a podcast host to interview a student about a creative piece. You have been given some or all of the files in the student's context repository. Read them and write the map of the repository, in Markdown, for the other agents and the host:

## What the piece is
Two or three sentences: the form, the subject, the length or size, where it stands (finished, nearly, in progress), in your own words from the material. If you can't tell, say what's unclear.

## What's in the repository
One line per file you were given: its path, what it holds, and what it's good for. Note which files are the student's own words and which are AI output, quotes, or other people's material.

## How it was made
The process as the files show it, in order: research, studies and practice, drafts and edits, the role of AI tools at each step, the decisions the student recorded. Quote the student briefly where their own words are telling.

## Where to start
The two or three files a host should read first, and why.

## What's missing
What you'd expect to find and didn't, what the files leave unclear, and anything the host should ask about rather than assume.

Work only from the files. Don't invent files, dates, or details. Use the student's name only if it appears in the material. No preamble.`,

  researcher: `You are the Researcher of a small ensemble of AI agents preparing a podcast host to interview a student about a creative piece. You have the Archivist's map of the student's repository, not the repository itself. Web search is on. Look up what a host would want to have straight before the interview: the people, works, places, tools, and terms the map names; the influences and references the student cites; any claim of fact in the map worth checking. Then write the notes, in Markdown:

## Names and terms
One line each: how to say it, what it is, and the one thing to know. Only names and terms that appear in the map.

## References and influences
For each work or maker the student points to: what it is, when, and why it might matter to this piece. Keep to what you can verify.

## Checked
Claims from the map you looked into: verified, uncertain, or wrong, with a few words on each.

## For the host
Two or three things you learned that could open a question.

Don't repeat the map. Don't speculate about the student. Keep every section short; the whole should fit on a page. Cite nothing in the text; the pages you used are attached separately. No preamble.`,

  briefer: `You are the Briefer of a small ensemble of AI agents preparing a podcast host to interview a student about a creative piece. You have the Archivist's map of the student's context repository, the Researcher's notes, and perhaps a few of the files in full. Write the host's briefing, one page, in Markdown:

## The guest
Two or three sentences: who they are as a maker as the material shows them, what the piece is, where it stands.

## The one thing
One sentence: the thread that, if the host pulls it, gets to the guest's best thinking.

## Beats
Four to six beats in the order the host should take them. Each is a one-line heading in bold, then one line on the moment, example, or file to ask about.

## Questions
The six best questions, one per line. Specific, in plain speech, ready to read out loud. At least two should ask the guest to separate what the tools contributed from what they contributed. At least one should ask about something that didn't work.

## Names and terms
People, titles, places, and terms the host should say right, with a few words on each (from the Researcher's notes).

## Handle with care
Anything the host should come to gently or steer around, or (none).

## Check before air
Claims worth verifying in conversation, or (none).

Everything comes from the map, the notes, and the files you were given. Don't invent details. Where the material is thin, say so in the beat rather than fill it in. No preamble, no closing line, nothing outside those sections.`,
};

// The file list the Conductor sees: path, size, and the first non-empty line of each file (never more).
export function fileList(files) {
  const items = (files || []).filter((file) => file && file.allowed !== false);
  if (!items.length) return "(no files)";
  return items.map((file) => `- ${file.path} (${kb(file.size)}) — ${firstLine(file.text)}`).join("\n");
}

function firstLine(text) {
  // Past any frontmatter block, the first line with something on it.
  const body = String(text || "").replace(/^\s*---\r?\n[\s\S]*?\r?\n---\s*\r?\n/, "");
  const line = body.split(/\r?\n/).map((l) => l.trim()).find((l) => l && !/^---\s*$/.test(l));
  return line ? (line.length > 100 ? `${line.slice(0, 100)}…` : line) : "(empty)";
}

function kb(size) {
  return size >= 1024 ? `${(size / 1024).toFixed(size >= 10240 ? 0 : 1)} KB` : `${size} B`;
}

// Files given to an agent, in full, each cut at 24,000 characters so one long file can't crowd out the rest, and the
// whole block at 160,000. The cut is noted, so the agent (and the trace) knows the file went on.
export function filesBlock(files, heading = "Files from the repository") {
  const items = (files || []).filter((file) => file && typeof file.text === "string");
  if (!items.length) return "";
  let total = 0;
  const parts = [];
  for (const file of items) {
    const text = file.text.length > 24000 ? `${file.text.slice(0, 24000)}\n[… cut at 24,000 characters; the file goes on]` : file.text.trim();
    if (total + text.length > 160000) { parts.push(`### ${file.path}\n[left out: the files given to this agent passed 160,000 characters]`); continue; }
    total += text.length;
    parts.push(`### ${file.path}\n${text}`);
  }
  return `${heading}:\n\n${parts.join("\n\n")}\n\n`;
}

function frame(purpose, about) {
  return `Purpose:\n${(purpose || defaultPurpose).trim()}\n\nAbout the piece and its maker, from the person running the ensemble:\n${about?.trim() || "(nothing yet)"}\n\n`;
}

// The user message for each role.
export function conductorMessage({ purpose, about, files }) {
  return `${frame(purpose, about)}The files the ensemble may read (path, size, first line):\n${fileList(files)}\n\nDecide which files each agent gets, and why. Reason first, then the JSON.`;
}

export function archivistMessage({ purpose, about, files }) {
  return `${frame(purpose, about)}${filesBlock(files, "The files you were given")}Write the map.`;
}

export function researcherMessage({ purpose, about, map, files }) {
  return `${frame(purpose, about)}The Archivist's map:\n\n${map?.trim() || "(no map yet)"}\n\n${filesBlock(files, "Files you were also given")}Look up what the host should have straight, then write the notes.`;
}

export function brieferMessage({ purpose, about, map, notes, files }) {
  return `${frame(purpose, about)}The Archivist's map:\n\n${map?.trim() || "(no map)"}\n\nThe Researcher's notes:\n\n${notes?.trim() || "(no notes)"}\n\n${filesBlock(files, "Files you were given in full")}Write the host's briefing.`;
}

export const messageFor = {
  conductor: conductorMessage,
  archivist: archivistMessage,
  researcher: researcherMessage,
  briefer: brieferMessage,
};

// What the run route sends to OpenRouter, shown on the page. The Researcher's request turns on OpenRouter's web
// search (the Exa engine, which cites its sources), which costs a little more per call. Reasoning gets a small fixed budget:
// left to itself, a Claude model given a whole repository can spend its entire output budget thinking and answer
// with nothing, and the newer models won't let it be turned off.
export function runRequest({ model, role, instructions, message }) {
  const search = roles.find((r) => r.key === role)?.search;
  return {
    model,
    max_tokens: 8000,
    reasoning: { max_tokens: 1024 },
    ...(search ? { plugins: [{ id: "web", engine: "exa", max_results: 6 }] } : {}),
    messages: [
      { role: "system", content: instructions },
      { role: "user", content: message },
    ],
  };
}

// The Conductor's plan, read out of its answer: the first ```json block, or the first {...}. Paths that aren't in the
// list are dropped. Returns null when nothing parses, so the page keeps its own plan.
export function parsePlan(text, files) {
  const known = new Set((files || []).map((file) => file.path));
  const fenced = text.match(/```json\s*([\s\S]*?)```/i)?.[1] || text.match(/\{[\s\S]*\}/)?.[0];
  if (!fenced) return null;
  try {
    const raw = JSON.parse(fenced);
    const pick = (list) => (Array.isArray(list) ? list.filter((p) => typeof p === "string" && known.has(p)) : []);
    return { archivist: pick(raw.archivist), researcher: pick(raw.researcher), briefer: pick(raw.briefer) };
  } catch {
    return null;
  }
}
