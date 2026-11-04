#!/usr/bin/env node
// The podcast prep team's notebook, for Claude Code: one deterministic helper that keeps a prep session on disk so the
// four subagents (Collector, Interviewer, Sidekick, Producer) and the parent session share one record. It never calls a
// chat model. The only network calls are the Collector's tools in ./read.mjs beside it: transcription (ffmpeg, then
// OpenRouter) and fetching a link the person gave. Everything the agents need is in .claude/utils/podcast/.
//
// Storage: output/podcast-claude/<session>/ at the repo root (gitignored):
//   session.json            title, open revision, closed revisions and their briefings
//   originals/<item>-<name> every submission exactly as given, never changed
//   items/<item>/item.json  the item, each agent's status (waiting|running|done|failed|skipped) and errors
//   items/<item>/text.md    the Collector's readable text or transcript
//   items/<item>/interviewer.json, sidekick.json   the agents' outputs (contract shapes)
//   items/<item>/attempts/  earlier outputs moved aside by a retry
//   briefings/briefing-r<N>.md                     the Producer's briefings, one per revision
//   trace.jsonl             every step: who, what they received, what they produced, the handoff
//
// Run `node .claude/utils/podcast/prep.mjs help` (from the repo root) for the commands.

import { kindOf, readLink, readText, transcribe } from "./read.mjs";
import { mkdir, readdir, readFile, rename, rm, stat, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../.."); // .claude/utils/podcast/ → the repo root
const root = process.env.PODCAST_CLAUDE_ROOT ? path.resolve(process.env.PODCAST_CLAUDE_ROOT) : path.join(repoRoot, "output", "podcast-claude");

export const AGENTS = ["intake", "interviewer", "sidekick"]; // per item; the producer works per revision
export const TITLES = { intake: "Collector", interviewer: "Interviewer", sidekick: "Sidekick", producer: "Producer" };
export const HEADINGS = [
  "The guest and the work",
  "The central thread",
  "Suggested beats",
  "Questions and follow-ups",
  "Optional sidekick moments",
  "Names, references and terms",
  "Handle with care / check before recording",
  "Sources used and intake status",
];
const BUTTS = ["host", "sidekick", "situation"];
const TERMINAL = new Set(["done", "failed", "skipped"]);

// ---------- paths and safety ----------

const SESSION_ID = /^[a-z0-9][a-z0-9-]{0,80}$/;
const ITEM_ID = /^i\d{3,}$/;
function sessionDir(id) {
  if (!SESSION_ID.test(String(id || ""))) fail(`No session "${id}". Run \`list\` to see them.`);
  return path.join(root, id);
}
function itemDir(sid, iid) {
  if (!ITEM_ID.test(String(iid || ""))) fail(`"${iid}" isn't an item id (they look like i001).`);
  return path.join(sessionDir(sid), "items", iid);
}
const slug = (t) => String(t || "").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 40) || "session";
const stamp = () => new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "").replace("T", "-");
const safeName = (name) => path.basename(String(name || "item")).replace(/[^\w.\- ]+/g, "_").replace(/^\.+/, "").slice(0, 120) || "item";

class Refusal extends Error {}
function fail(message) {
  throw new Refusal(message);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}
async function writeJson(file, value) {
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temp, JSON.stringify(value, null, 2) + "\n");
  await rename(temp, file);
}
async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

// One writer at a time per session (subagents may run in parallel): a lock directory, taken and released around
// every change. A lock older than 30 seconds is from a crashed run and is cleared.
async function locked(sid, fn) {
  const lock = path.join(sessionDir(sid), ".lock");
  for (let i = 0; ; i++) {
    try {
      await mkdir(lock);
      break;
    } catch {
      try {
        if (Date.now() - (await stat(lock)).mtimeMs > 30000) await rm(lock, { recursive: true, force: true });
      } catch {}
      if (i > 400) fail("The session is busy (another step is writing). Try again.");
      await new Promise((r) => setTimeout(r, 50));
    }
  }
  try {
    return await fn();
  } finally {
    await rm(lock, { recursive: true, force: true });
  }
}

async function trace(sid, event) {
  await appendFile(path.join(sessionDir(sid), "trace.jsonl"), JSON.stringify({ t: new Date().toISOString(), ...event }) + "\n");
}

const loadSession = (sid) => readJson(path.join(sessionDir(sid), "session.json")).catch(() => fail(`No session "${sid}". Run \`list\` to see them.`));
const saveSession = (s) => writeJson(path.join(sessionDir(s.id), "session.json"), s);
const loadItem = (sid, iid) => readJson(path.join(itemDir(sid, iid), "item.json")).catch(() => fail(`No item ${iid} in ${sid}.`));
const saveItem = (sid, item) => writeJson(path.join(itemDir(sid, item.id), "item.json"), item);

async function allItems(sid) {
  let names = [];
  try {
    names = (await readdir(path.join(sessionDir(sid), "items"))).filter((n) => ITEM_ID.test(n)).sort();
  } catch {}
  return Promise.all(names.map((n) => loadItem(sid, n)));
}

// ---------- what's ready ----------

const hasText = (item) => item.status.intake === "done" || (item.status.intake === "skipped" && item.source === "paste");

function nextFor(item) {
  if (item.status.intake === "waiting") return item.needs === "read" ? "intake (Collector reads it with the Read tool)" : "intake";
  if (hasText(item) && item.status.interviewer === "waiting") return "interviewer";
  if (hasText(item) && TERMINAL.has(item.status.interviewer) && item.status.sidekick === "waiting") return "sidekick";
  return null;
}

function readiness(session, items, n) {
  const rev = session.revisions.find((r) => r.n === n);
  if (!rev) return { revision: n, ready: false, why: `Revision ${n} isn't closed. Nothing is briefed until the person says they're done.` };
  const mine = items.filter((i) => rev.items.includes(i.id));
  const waiting = mine.filter((i) => AGENTS.some((a) => !TERMINAL.has(i.status[a]))).map((i) => i.id);
  const failed = mine.filter((i) => AGENTS.some((a) => i.status[a] === "failed")).map((i) => ({ id: i.id, name: i.name, failed: AGENTS.filter((a) => i.status[a] === "failed").map((a) => `${TITLES[a]}: ${i.errors[a] || "failed"}`) }));
  if (rev.briefing.status === "done") return { revision: n, ready: false, done: true, why: `Revision ${n} is already briefed (${rev.briefing.file}).` };
  if (waiting.length) return { revision: n, ready: false, waiting, failed, why: `Waiting for ${waiting.length} item(s) to finish: ${waiting.join(", ")}.` };
  if (failed.length && !rev.proceedWithGaps) return { revision: n, ready: false, blocked: true, failed, why: `${failed.length} item(s) failed. Retry them, or the person can say to proceed with gaps.` };
  return { revision: n, ready: true, items: rev.items, failed, proceedWithGaps: rev.proceedWithGaps, why: failed.length ? "Ready, with gaps the briefing must name." : "Ready." };
}

// ---------- commands ----------

const commands = {};

commands.help = async () => {
  console.log(`prep.mjs: the podcast prep session record (storage: ${path.relative(repoRoot, root)}/)

  new "<guest or project>"                 start a session; prints its id
  list                                     the sessions, newest first
  status <s> [--json]                      every item, each agent's status, what's next, revisions, briefings
  add <s> --file <path>                    save a file (copied unchanged into originals/)
  add <s> --text [--name <n>]              save pasted text from stdin
  add <s> --url <url>                      save a link
  intake <s> [<item>...]                   Collector's tools: read text, transcribe audio/video, fetch links,
                                           for every waiting item (or the ones named); images and PDFs are
                                           left for the Collector to read with the Read tool
  start <s> <item> <agent>                 mark an agent running (logs what it received)
  show <s> <item>                          the item: its readable text and every output so far
  put <s> <item> <agent> [--method <m>]    save an agent's output from stdin (intake: text; interviewer and
                                           sidekick: the contract JSON); refuses a duplicate
  fail <s> <item> <agent> "<why>"          record a failure (the original is kept)
  retry <s> <item> <agent>                 reset a failed or done step to waiting; earlier output kept in attempts/
  finish <s> [--proceed]                   the person said they're done: close the revision (or, with --proceed,
                                           go ahead past the failed items in the closed one)
  check <s> [<revision>]                   can the Producer brief this revision yet?
  brief-input <s> <revision>               everything the Producer is given for the revision
  brief <s> <revision>                     save the Producer's Markdown from stdin (validated)

  <agent> is intake (Collector), interviewer, sidekick.`);
};

commands.new = async (args) => {
  const title = args._.join(" ").trim() || "Untitled guest";
  await mkdir(root, { recursive: true });
  let id = `${stamp()}-${slug(title)}`;
  while (await exists(path.join(root, id))) id = `${id}-2`.slice(0, 80);
  await mkdir(path.join(root, id, "originals"), { recursive: true });
  await mkdir(path.join(root, id, "items"), { recursive: true });
  await mkdir(path.join(root, id, "briefings"), { recursive: true });
  const session = { id, title: title.slice(0, 200), created: new Date().toISOString(), revision: 1, nextItem: 1, revisions: [] };
  await saveSession(session);
  await trace(id, { agent: "parent", kind: "session", text: `New prep session: ${session.title}.` });
  out(args, { id, title: session.title, dir: path.relative(repoRoot, path.join(root, id)) }, `${id}\n(${path.relative(repoRoot, path.join(root, id))}/)`);
};

commands.list = async (args) => {
  let names = [];
  try {
    names = (await readdir(root, { withFileTypes: true })).filter((d) => d.isDirectory() && SESSION_ID.test(d.name)).map((d) => d.name);
  } catch {}
  const rows = [];
  for (const n of names) {
    try {
      const s = await loadSession(n);
      rows.push({ id: s.id, title: s.title, created: s.created, items: s.nextItem - 1, revisions: s.revisions.length });
    } catch {}
  }
  rows.sort((a, b) => b.created.localeCompare(a.created));
  out(args, rows, rows.length ? rows.map((r) => `${r.id}  ${r.title}  (${r.items} items, ${r.revisions} closed revision(s))`).join("\n") : "No sessions yet.");
};

commands.add = async (args) => {
  const sid = args._[0];
  const kinds = [args.file, args.text, args.url].filter((v) => v !== undefined);
  if (kinds.length !== 1) fail("Give exactly one of --file <path>, --text (stdin), --url <url>.");
  let bytes, name, source, url = null;
  if (args.file !== undefined) {
    const from = path.resolve(String(args.file));
    if (!(await exists(from)) || !(await stat(from)).isFile()) fail(`No file at ${args.file}.`);
    bytes = await readFile(from);
    name = path.basename(from);
    source = "upload";
  } else if (args.text !== undefined) {
    bytes = Buffer.from(await stdin());
    if (!bytes.length) fail("No text on stdin.");
    name = args.name ? `${safeName(args.name).replace(/\.\w+$/, "")}.md` : null;
    source = "paste";
  } else {
    url = String(args.url);
    if (!/^https?:\/\/\S+$/i.test(url)) fail("A link must start with http:// or https://.");
    bytes = Buffer.from(url + "\n");
    name = "link.txt";
    source = "link";
  }
  const item = await locked(sid, async () => {
    const session = await loadSession(sid);
    const number = session.nextItem++;
    const id = `i${String(number).padStart(3, "0")}`;
    name = name || `note-${number}.md`;
    const dir = itemDir(sid, id);
    await mkdir(path.join(dir, "attempts"), { recursive: true });
    const original = `originals/${id}-${safeName(name)}`;
    await writeFile(path.join(sessionDir(sid), original), bytes, { flag: "wx" });
    const kind = source === "link" ? "link" : source === "paste" ? "text" : kindOf(name);
    const item = { id, number, revision: session.revision, name: source === "link" ? url : name, kind, source, url, original, size: bytes.length, created: new Date().toISOString(), status: { intake: "waiting", interviewer: "waiting", sidekick: "waiting" }, errors: {}, method: null, needs: ["image", "pdf"].includes(kind) ? "read" : null };
    if (source === "paste") {
      await writeFile(path.join(dir, "text.md"), bytes);
      item.status.intake = "skipped";
      item.method = "pasted as text (nothing to extract)";
    }
    await saveItem(sid, item);
    await saveSession(session);
    return item;
  });
  const late = item.revision > 1 ? ` It belongs to revision ${item.revision}; earlier briefings don't include it.` : "";
  await trace(sid, { agent: "intake", kind: "saved", item: item.id, revision: item.revision, text: `Saved ${item.name} (${item.kind}) as ${item.original}.${late}` });
  out(args, item, `${item.id}  ${item.kind}  ${item.original}  (revision ${item.revision})${late}`);
};

commands.intake = async (args) => {
  const sid = args._[0];
  const wanted = args._.slice(1);
  const items = (await allItems(sid)).filter((i) => (wanted.length ? wanted.includes(i.id) : true));
  if (wanted.length && items.length !== wanted.length) fail(`No such item: ${wanted.filter((w) => !items.some((i) => i.id === w)).join(", ")}.`);
  const lines = [];
  for (const item of items) {
    if (item.status.intake !== "waiting") {
      if (wanted.length) lines.push(`${item.id}: intake is ${item.status.intake}; nothing to do${item.status.intake === "failed" ? " (retry it first)" : ""}.`);
      continue;
    }
    if (item.needs === "read") {
      lines.push(`${item.id}: ${item.kind}. Read ${path.relative(repoRoot, path.join(sessionDir(sid), item.original))} with the Read tool and save what it shows with \`put ${sid} ${item.id} intake --method "..."\`.`);
      continue;
    }
    await setStatus(sid, item.id, "intake", "running", `Collector received ${item.original} (${item.kind}).`);
    try {
      const r = await collect(sid, item);
      await saveOutput(sid, item.id, "intake", r.text, r.method);
      lines.push(`${item.id}: done, ${r.method}, ${r.text.length.toLocaleString()} characters.`);
    } catch (error) {
      const why = String(error.message).replace(/retry it\.$/, `run \`retry ${sid} ${item.id} intake\`.`);
      await recordFailure(sid, item.id, "intake", why);
      lines.push(`${item.id}: FAILED: ${why}`);
    }
  }
  out(args, lines, lines.join("\n") || "Nothing waiting for intake.");
};

commands.start = async (args) => {
  const [sid, iid, agent] = args._;
  checkAgent(agent);
  const item = await loadItem(sid, iid);
  if (item.status[agent] === "running") fail(`${TITLES[agent]} is already running on ${iid}.`);
  if (item.status[agent] !== "waiting") fail(`${TITLES[agent]} is ${item.status[agent]} on ${iid}; retry it first to redo it.`);
  if (agent !== "intake" && !hasText(item)) fail(`${iid} has no readable text yet (Collector: ${item.status.intake}).`);
  if (agent === "sidekick" && !TERMINAL.has(item.status.interviewer)) fail(`The Sidekick waits for the Interviewer on ${iid} (now ${item.status.interviewer}).`);
  const received = agent === "intake" ? item.original : agent === "interviewer" ? "text.md" : "text.md + interviewer.json";
  await setStatus(sid, iid, agent, "running", `${TITLES[agent]} received ${iid}: ${received}.`);
  console.log(`${TITLES[agent]} running on ${iid}.`);
};

commands.show = async (args) => {
  const [sid, iid] = args._;
  const item = await loadItem(sid, iid);
  const dir = itemDir(sid, iid);
  const text = (await readFile(path.join(dir, "text.md"), "utf8").catch(() => null));
  const interviewer = await readJson(path.join(dir, "interviewer.json")).catch(() => null);
  const sidekick = await readJson(path.join(dir, "sidekick.json")).catch(() => null);
  if (args.json) return console.log(JSON.stringify({ item, text, interviewer, sidekick }, null, 2));
  console.log(`# ${item.id}: ${item.name}
kind: ${item.kind} | source: ${item.source} | revision ${item.revision} | original: ${item.original}
Collector: ${item.status.intake}${item.errors.intake ? ` (${item.errors.intake})` : ""}${item.method ? `, ${item.method}` : ""} | Interviewer: ${item.status.interviewer}${item.errors.interviewer ? ` (${item.errors.interviewer})` : ""} | Sidekick: ${item.status.sidekick}${item.errors.sidekick ? ` (${item.errors.sidekick})` : ""}

## Readable text
${text ?? "(none yet)"}

## Interviewer
${interviewer ? JSON.stringify(interviewer, null, 2) : "(none yet)"}

## Sidekick
${sidekick ? JSON.stringify(sidekick, null, 2) : "(none yet)"}`);
};

commands.put = async (args) => {
  const [sid, iid, agent] = args._;
  checkAgent(agent);
  const item = await loadItem(sid, iid);
  if (item.status[agent] === "done" || item.status[agent] === "skipped") fail(`${TITLES[agent]} is already ${item.status[agent]} on ${iid}; nothing saved. Retry it first to replace it.`);
  if (item.status[agent] === "failed") fail(`${TITLES[agent]} failed on ${iid}; retry it first.`);
  if (agent !== "intake" && !hasText(item)) fail(`${iid} has no readable text yet.`);
  if (agent === "sidekick" && !TERMINAL.has(item.status.interviewer)) fail(`The Sidekick waits for the Interviewer on ${iid}.`);
  const raw = (await stdin()).trim();
  if (agent === "intake") {
    if (!raw) fail("No text on stdin. If the item couldn't be read, use `fail` instead.");
    await saveOutput(sid, iid, agent, raw, String(args.method || "read by the Collector"));
  } else {
    const value = parseJson(raw);
    const problems = agent === "interviewer" ? checkInterviewer(value) : checkSidekick(value);
    if (problems.length) fail(`Not saved; the ${TITLES[agent]}'s output doesn't match the contract:\n- ${problems.join("\n- ")}`);
    await saveOutput(sid, iid, agent, value);
  }
  console.log(`Saved ${TITLES[agent]}'s output for ${iid}. ${handoff(agent)}`);
};

commands.fail = async (args) => {
  const [sid, iid, agent, ...why] = args._;
  checkAgent(agent);
  const item = await loadItem(sid, iid);
  if (item.status[agent] === "done") fail(`${TITLES[agent]} is done on ${iid}; nothing to fail.`);
  await recordFailure(sid, iid, agent, why.join(" ") || "failed");
  console.log(`Recorded: ${TITLES[agent]} failed on ${iid}. The original is untouched.`);
};

commands.retry = async (args) => {
  const [sid, iid, agent] = args._;
  checkAgent(agent);
  const reset = agent === "intake" ? AGENTS : agent === "interviewer" ? ["interviewer", "sidekick"] : ["sidekick"];
  await locked(sid, async () => {
    const item = await loadItem(sid, iid);
    // A step left "running" is from an agent that was interrupted (nothing runs in the background), so it can be reset.
    if (agent === "intake" && item.source === "paste") fail(`${iid} was pasted; there's nothing for the Collector to redo.`);
    const dir = itemDir(sid, iid);
    for (const a of reset) {
      const file = path.join(dir, a === "intake" ? "text.md" : `${a}.json`);
      if (await exists(file)) await rename(file, path.join(dir, "attempts", `${a}-${Date.now()}${path.extname(file)}`));
      item.status[a] = "waiting";
      delete item.errors[a];
    }
    if (agent === "intake") item.method = null;
    await saveItem(sid, item);
  });
  await trace(sid, { agent, kind: "retry", item: iid, text: `Retrying ${reset.map((a) => TITLES[a]).join(", ")} on ${iid}; earlier output kept in attempts/, original untouched.` });
  console.log(`${reset.map((a) => TITLES[a]).join(", ")} on ${iid}: back to waiting.`);
};

commands.finish = async (args) => {
  const sid = args._[0];
  const result = await locked(sid, async () => {
    const session = await loadSession(sid);
    const items = await allItems(sid);
    const open = session.revisions.find((r) => r.briefing.status !== "done");
    if (open) {
      if (args.proceed) open.proceedWithGaps = true;
      await saveSession(session);
      return { n: open.n, already: true, proceed: Boolean(args.proceed) };
    }
    const mine = items.filter((i) => i.revision <= session.revision);
    if (!mine.length) fail("Nothing has been added yet.");
    const n = session.revision;
    session.revisions.push({ n, closedAt: new Date().toISOString(), items: mine.map((i) => i.id), proceedWithGaps: Boolean(args.proceed), briefing: { status: "waiting" } });
    session.revision = n + 1;
    await saveSession(session);
    return { n, count: mine.length, proceed: Boolean(args.proceed) };
  });
  await trace(sid, { agent: "producer", kind: result.already ? (result.proceed ? "proceed" : "finish-again") : "finish", revision: result.n, text: result.already ? `Revision ${result.n} was already closed${result.proceed ? "; going ahead past its failed items" : ""}.` : `Done adding material: revision ${result.n} closed with ${result.count} item(s). Anything added now goes into revision ${result.n + 1}.` });
  const session = await loadSession(sid);
  const r = readiness(session, await allItems(sid), result.n);
  out(args, { ...result, ...r }, `Revision ${result.n} ${result.already ? "was already closed" : `is closed (${result.count} items)`}.${result.proceed ? " Proceeding with gaps." : ""} ${r.why}`);
};

commands.check = async (args) => {
  const sid = args._[0];
  const session = await loadSession(sid);
  const n = args._[1] ? Number(args._[1]) : session.revisions.find((r) => r.briefing.status !== "done")?.n ?? session.revisions.at(-1)?.n;
  if (!n) return out(args, { ready: false, why: "No revision is closed. The Producer waits until the person says they're done." }, "No revision is closed. The Producer waits until the person says they're done.");
  const r = readiness(session, await allItems(sid), n);
  out(args, r, `Revision ${n}: ${r.why}${r.failed?.length ? "\n" + r.failed.map((f) => `  ${f.id} ${f.name}: ${f.failed.join("; ")}`).join("\n") : ""}`);
};

commands["brief-input"] = async (args) => {
  const [sid, nArg] = args._;
  const n = Number(nArg);
  const session = await loadSession(sid);
  const items = await allItems(sid);
  const r = readiness(session, items, n);
  if (!r.ready) fail(`Revision ${n} can't be briefed yet. ${r.why}`);
  const rev = session.revisions.find((x) => x.n === n);
  const mine = items.filter((i) => rev.items.includes(i.id));
  const last = Math.max(...mine.map((i) => i.number));
  const parts = [];
  for (const i of mine) {
    const dir = itemDir(sid, i.id);
    const text = await readFile(path.join(dir, "text.md"), "utf8").catch(() => null);
    const q = await readJson(path.join(dir, "interviewer.json")).catch(() => null);
    const k = await readJson(path.join(dir, "sidekick.json")).catch(() => null);
    parts.push(`### Item ${i.number} (${i.id}): ${i.name}
kind ${i.kind}, ${i.source}, revision ${i.revision}; original ${i.original}
Collector: ${i.status.intake}${i.errors.intake ? ` (${i.errors.intake})` : ""}${i.method ? `, ${i.method}` : ""}; Interviewer: ${i.status.interviewer}; Sidekick: ${i.status.sidekick}

Readable text:
${text ?? "(none: not read)"}

Interviewer's reading: ${q?.summary ?? "(none)"}
Interviewer's questions:
${q?.questions?.map((x) => `- ${x.question} [why: ${x.why}]`).join("\n") || "(none)"}

Sidekick's optional ideas:
${k?.jokes?.length ? k.jokes.map((j) => `- ${j.idea} (butt: ${j.butt})`).join("\n") : `(none${k?.jokesNote ? `: ${k.jokesNote}` : ""})`}`);
  }
  console.log(`Session: ${session.title}
Revision ${n}, items 1–${last} (${mine.length} item(s))${rev.proceedWithGaps ? "; the person chose to proceed with gaps" : ""}.
First line of the briefing must be exactly: # Host briefing (revision ${n}, items 1–${last})
Headings, in order: ${HEADINGS.map((h) => `## ${h}`).join(" | ")}

${parts.join("\n\n")}`);
};

commands.brief = async (args) => {
  const [sid, nArg] = args._;
  const n = Number(nArg);
  const md = (await stdin()).trim();
  const saved = await locked(sid, async () => {
    const session = await loadSession(sid);
    const items = await allItems(sid);
    const r = readiness(session, items, n);
    if (!r.ready) fail(`Not saved. ${r.why}`);
    const rev = session.revisions.find((x) => x.n === n);
    const last = Math.max(...items.filter((i) => rev.items.includes(i.id)).map((i) => i.number));
    const problems = checkBriefing(md, n, last);
    if (problems.length) fail(`Not saved; the briefing doesn't match the contract:\n- ${problems.join("\n- ")}`);
    const file = `briefings/briefing-r${n}.md`;
    await writeFile(path.join(sessionDir(sid), file), md + "\n", { flag: "wx" }).catch(() => fail(`${file} already exists; a briefing is never overwritten.`));
    rev.briefing = { status: "done", file, at: new Date().toISOString(), items: rev.items.length, last };
    await saveSession(session);
    return file;
  });
  await trace(sid, { agent: "producer", kind: "briefing", revision: n, produced: saved, text: `Producer wrote the host briefing for revision ${n}: ${saved}.` });
  console.log(`Saved ${path.relative(repoRoot, path.join(sessionDir(sid), saved))}.`);
};

commands.status = async (args) => {
  const sid = args._[0];
  const session = await loadSession(sid);
  const items = await allItems(sid);
  const briefings = session.revisions.filter((r) => r.briefing.status === "done").map((r) => ({ revision: r.n, file: r.briefing.file, notIncluded: items.filter((i) => !r.items.includes(i.id)).map((i) => i.id) }));
  const data = {
    id: session.id,
    title: session.title,
    openRevision: session.revision,
    items: items.map((i) => ({ id: i.id, name: i.name, kind: i.kind, revision: i.revision, status: i.status, errors: i.errors, next: nextFor(i) })),
    revisions: session.revisions.map((r) => ({ n: r.n, items: r.items, briefing: r.briefing.status, proceedWithGaps: r.proceedWithGaps, check: r.briefing.status === "done" ? null : readiness(session, items, r.n).why })),
    briefings,
  };
  if (args.json) return console.log(JSON.stringify(data, null, 2));
  const cell = (i, a) => `${TITLES[a]} ${i.status[a]}${i.errors[a] ? ` (${i.errors[a]})` : ""}`;
  console.log(`${session.title}  [${session.id}]
Open revision: ${session.revision} (new material goes here)

${items.map((i) => `${i.id}  r${i.revision}  ${i.kind.padEnd(5)}  ${i.name}\n      ${AGENTS.map((a) => cell(i, a)).join(" | ")}${nextFor(i) ? `\n      next: ${nextFor(i)}` : ""}`).join("\n") || "(no items yet)"}

${data.revisions.map((r) => `Revision ${r.n}: ${r.items.length} item(s), briefing ${r.briefing}${r.check ? `: ${r.check}` : ""}`).join("\n") || "No revision closed: the Producer waits until the person says they're done."}
${briefings.map((b) => `Briefing r${b.revision}: ${b.file}${b.notIncluded.length ? `; does NOT include later items ${b.notIncluded.join(", ")}` : ""}`).join("\n")}`);
};

// ---------- helpers ----------

function checkAgent(agent) {
  if (!AGENTS.includes(agent)) fail(`"${agent}" isn't a per-item agent: use intake (Collector), interviewer, or sidekick.`);
}

const handoff = (agent) => ({ intake: "Handoff: Interviewer.", interviewer: "Handoff: Sidekick.", sidekick: "This item is ready for the Producer, who waits until the person says they're done." })[agent];

async function setStatus(sid, iid, agent, status, text) {
  await locked(sid, async () => {
    const item = await loadItem(sid, iid);
    item.status[agent] = status;
    await saveItem(sid, item);
  });
  await trace(sid, { agent, kind: status, item: iid, received: text });
}

async function saveOutput(sid, iid, agent, value, method) {
  await locked(sid, async () => {
    const item = await loadItem(sid, iid);
    if (item.status[agent] === "done") fail(`${TITLES[agent]} is already done on ${iid}; nothing saved.`);
    const dir = itemDir(sid, iid);
    const file = agent === "intake" ? "text.md" : `${agent}.json`;
    if (agent === "intake") await writeFile(path.join(dir, file), String(value).trim() + "\n");
    else await writeJson(path.join(dir, file), value);
    item.status[agent] = "done";
    delete item.errors[agent];
    if (agent === "intake") {
      item.method = method;
      item.needs = null;
    }
    await saveItem(sid, item);
  });
  const produced = agent === "intake" ? `text.md (${method})` : agent === "interviewer" ? `interviewer.json, ${value.questions.length} question(s)` : `sidekick.json, ${value.jokes.length ? `${value.jokes.length} idea(s)` : `no joke (${value.jokesNote})`}`;
  await trace(sid, { agent, kind: "done", item: iid, produced, handoff: handoff(agent) });
}

async function recordFailure(sid, iid, agent, why) {
  await locked(sid, async () => {
    const item = await loadItem(sid, iid);
    item.status[agent] = "failed";
    item.errors[agent] = String(why).slice(0, 500);
    if (agent === "intake") {
      for (const a of ["interviewer", "sidekick"]) if (item.status[a] === "waiting") item.status[a] = "skipped";
    }
    await saveItem(sid, item);
  });
  await trace(sid, { agent, kind: "failed", item: iid, text: String(why).slice(0, 500) });
}

// The Collector's deterministic tools (./read.mjs). Images and PDFs never reach here: the Collector reads those.
async function collect(sid, item) {
  if (item.source === "link") return readLink(item.url);
  const bytes = await readFile(path.join(sessionDir(sid), item.original));
  if (item.kind === "audio" || item.kind === "video") {
    const r = await transcribe(bytes, item.name, item.kind);
    return { ...r, method: `${r.method}${item.kind === "video" ? "; sound only, the pictures weren't looked at" : ""}` };
  }
  if (item.kind === "text") return readText(bytes, item.name);
  const text = bytes.toString("utf8");
  const odd = (text.match(/[\u0000-\u0008\u000e-\u001f�]/g) || []).length;
  if (!text.trim() || odd > text.length * 0.02) throw new Error(`Can't read a ${path.extname(item.name) || "file"} like this: it isn't text, sound, a picture, or a PDF.`);
  return { text, method: "read as text (unknown kind)" };
}

function parseJson(raw) {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  try {
    return JSON.parse(fenced ? fenced[1] : raw);
  } catch {
    fail("Not saved: stdin isn't valid JSON.");
  }
}

export function checkInterviewer(v) {
  const p = [];
  if (!v || typeof v !== "object") return ["not a JSON object"];
  if (typeof v.summary !== "string" || !v.summary.trim()) p.push('"summary" must be a two-sentence reading');
  if (!Array.isArray(v.questions) || v.questions.length < 2 || v.questions.length > 4) p.push('"questions" must have 2 to 4 entries');
  for (const [i, q] of (v.questions || []).entries()) {
    if (typeof q?.question !== "string" || !q.question.trim()) p.push(`question ${i + 1} has no "question"`);
    if (typeof q?.why !== "string" || !q.why.trim()) p.push(`question ${i + 1} has no "why" (what in the item prompted it)`);
  }
  const extra = Object.keys(v).filter((k) => !["summary", "questions"].includes(k));
  if (extra.length) p.push(`unexpected field(s): ${extra.join(", ")}`);
  return p;
}

export function checkSidekick(v) {
  const p = [];
  if (!v || typeof v !== "object") return ["not a JSON object"];
  if (!Array.isArray(v.jokes) || v.jokes.length > 3) p.push('"jokes" must be an array of 0 to 3');
  for (const [i, j] of (v.jokes || []).entries()) {
    if (typeof j?.idea !== "string" || !j.idea.trim()) p.push(`joke ${i + 1} has no "idea"`);
    if (!BUTTS.includes(j?.butt)) p.push(`joke ${i + 1}: "butt" must be host, sidekick, or situation (never the guest)`);
  }
  if (typeof v.jokesNote !== "string") p.push('"jokesNote" must be a string ("" when there are jokes)');
  else if (Array.isArray(v.jokes) && !v.jokes.length && !v.jokesNote.trim()) p.push('no jokes: say why in "jokesNote"');
  const extra = Object.keys(v).filter((k) => !["jokes", "jokesNote"].includes(k));
  if (extra.length) p.push(`unexpected field(s): ${extra.join(", ")}`);
  return p;
}

export function checkBriefing(md, n, last) {
  const p = [];
  const first = md.split(/\r?\n/)[0].trim();
  const want = `# Host briefing (revision ${n}, items 1–${last})`;
  if (first !== want) p.push(`the first line must be exactly "${want}" (it is "${first.slice(0, 80)}")`);
  const found = [...md.matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1]);
  if (JSON.stringify(found) !== JSON.stringify(HEADINGS)) p.push(`the ## headings must be exactly, in order: ${HEADINGS.join(" | ")} (found: ${found.join(" | ") || "none"})`);
  return p;
}

async function stdin() {
  if (process.stdin.isTTY) return "";
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}

function out(args, data, text) {
  console.log(args.json ? JSON.stringify(data, null, 2) : text);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const v = argv[i + 1];
      if (["json", "proceed", "text"].includes(k)) args[k] = true;
      else {
        args[k] = v;
        i++;
      }
    } else args._.push(a);
  }
  return args;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd = "help", ...rest] = process.argv.slice(2);
  const fn = commands[cmd];
  if (!fn) {
    console.error(`Unknown command "${cmd}". Try: help`);
    process.exit(2);
  }
  fn(parseArgs(rest)).catch((error) => {
    console.error(error instanceof Refusal ? error.message : `Error: ${error.message}`);
    process.exit(1);
  });
}
