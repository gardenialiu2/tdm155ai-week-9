import { chat, DEFAULT_MODEL } from "./model.mjs";
import { instructions, interviewerMessage, producerMessage, sidekickMessage } from "./prompts.mjs";
import { describeImage, kindOf, readLink, readPdf, readText, transcribe } from "./read.mjs";
import { load, note, readOriginal, saveBriefing, saveOriginal, update } from "./store.mjs";

// The podcast prep workflow, on the server. Every item is saved first; then, as soon as it's in:
//   Piper (intake)        reads it: text as is, sound transcribed, images described, PDFs read, links fetched
//   Quinn (interviewer)   once Piper is done: questions tied to the item
//   Kit (sidekick)        once Quinn is done (or failed): optional jokes, the guest never the butt
// and only when the person says they're done (which closes a revision: everything submitted so far):
//   Bea (producer)        once every item in that revision is finished: the host's briefing
// `pump` looks at a session and starts whatever is ready. It runs after every change, and on every read, so a
// restarted server picks up where it left off (a job that was running when the server stopped goes back to waiting).

const TERMINAL = new Set(["done", "failed", "skipped"]);
const MAX_JOBS = 4; // at a time, per session
const running = globalThis.__remixRunning || (globalThis.__remixRunning = new Set());
const key = (session, ...parts) => [session, ...parts].join(":");

const blank = () => ({ status: "waiting" });

export async function addItem(sessionId, { name, mime = "", bytes = null, text = null, url = null }) {
  const { result } = await update(sessionId, async (session) => {
    const number = session.nextItem++;
    const id = `i${String(number).padStart(3, "0")}`;
    const source = url ? "link" : text !== null ? "paste" : "upload";
    const item = {
      id,
      number,
      revision: session.revision,
      name: name || (url ? url : `Note ${number}`),
      kind: url ? "link" : text !== null ? "text" : kindOf(name, mime),
      mime,
      size: bytes ? bytes.length : (text || "").length,
      source,
      url,
      excluded: false,
      created: new Date().toISOString(),
      intake: blank(),
      interviewer: blank(),
      sidekick: blank(),
    };
    // The original is on disk before any agent touches it.
    item.file = await saveOriginal(sessionId, id, source === "upload" ? name : source === "paste" ? `${(name || "note").replace(/\.\w+$/, "")}.md` : "link.txt", bytes || Buffer.from(text ?? url ?? ""));
    if (source === "paste") item.intake = { status: "done", text, method: "pasted as text", cost: 0 };
    session.items.push(item);
    note(session, "intake", "saved", `Saved ${item.name} (${item.kind}) as ${item.file}${session.revisions.length ? `, in revision ${item.revision}` : ""}.`, id);
    return item;
  });
  pump(sessionId);
  return result;
}

export async function setExcluded(sessionId, itemId, excluded) {
  await update(sessionId, (session) => {
    const item = session.items.find((i) => i.id === itemId);
    if (!item) throw new Error("No such item.");
    item.excluded = Boolean(excluded);
    note(session, "intake", excluded ? "excluded" : "included", `${item.name} is ${excluded ? "left out of" : "back in"} everything the agents read from now on.`, itemId);
  });
  pump(sessionId);
}

export async function retry(sessionId, itemId, agent) {
  await update(sessionId, (session) => {
    if (agent === "producer") {
      const rev = session.revisions.find((r) => r.n === Number(itemId));
      if (rev) rev.briefing = blank();
      return;
    }
    const item = session.items.find((i) => i.id === itemId);
    if (!item || !["intake", "interviewer", "sidekick"].includes(agent)) throw new Error("Nothing to retry.");
    item[agent] = blank();
    // A new reading means new questions and jokes.
    if (agent === "intake") {
      item.interviewer = blank();
      item.sidekick = blank();
    }
    if (agent === "interviewer") item.sidekick = blank();
    note(session, agent, "retry", `Retrying ${agent} for ${item.name}.`, itemId);
  });
  pump(sessionId);
}

// "I'm done adding material": close the open revision, or (proceed) go ahead past the failed items.
export async function finish(sessionId, { proceed = false } = {}) {
  const { result } = await update(sessionId, (session) => {
    const open = session.revisions.find((r) => r.briefing.status !== "done");
    if (open) {
      if (proceed) {
        open.proceedWithGaps = true;
        note(session, "producer", "proceed", `Going ahead with revision ${open.n} without the items that failed.`);
      }
      return open.n;
    }
    const items = session.items.filter((i) => i.revision <= session.revision);
    if (!items.length) throw new Error("Nothing has been added yet.");
    const n = session.revision;
    session.revisions.push({ n, closedAt: new Date().toISOString(), items: items.map((i) => i.id), proceedWithGaps: proceed, briefing: blank() });
    session.revision = n + 1;
    note(session, "producer", "finish", `Done adding material: revision ${n} is closed with ${items.length} item${items.length === 1 ? "" : "s"}. Anything added now goes into revision ${n + 1}.`);
    return n;
  });
  pump(sessionId);
  return result;
}

function itemsFor(session, rev) {
  return session.items.filter((i) => rev.items.includes(i.id));
}

// Look at the session and start whatever is ready.
export async function pump(sessionId) {
  let jobs = [];
  await update(sessionId, (session) => {
    // A status left "running" with no job behind it: the server restarted mid-job. Back to waiting.
    for (const item of session.items) {
      for (const agent of ["intake", "interviewer", "sidekick"]) {
        if (item[agent].status === "running" && !running.has(key(session.id, item.id, agent))) item[agent] = blank();
      }
    }
    for (const rev of session.revisions) {
      if (rev.briefing.status === "running" && !running.has(key(session.id, "brief", rev.n))) rev.briefing = blank();
    }

    let slots = MAX_JOBS - [...running].filter((k) => k.startsWith(`${session.id}:`)).length;
    const start = (item, agent) => {
      if (slots <= 0) return;
      slots--;
      item[agent] = { status: "running", started: new Date().toISOString() };
      running.add(key(session.id, item.id, agent));
      jobs.push({ item: item.id, agent });
    };
    for (const item of session.items) {
      if (item.excluded) continue;
      if (item.intake.status === "waiting") start(item, "intake");
      else if (item.intake.status === "done" && item.interviewer.status === "waiting") start(item, "interviewer");
      if (item.intake.status === "done" && TERMINAL.has(item.interviewer.status) && item.sidekick.status === "waiting") start(item, "sidekick");
    }

    // Bea: for each closed revision still to brief, once its items are finished.
    for (const rev of session.revisions) {
      if (rev.briefing.status !== "waiting" && rev.briefing.status !== "blocked") continue;
      const items = itemsFor(session, rev).filter((i) => !i.excluded);
      const finished = items.every((i) => ["intake", "interviewer", "sidekick"].every((a) => TERMINAL.has(i[a].status)));
      const failed = items.filter((i) => ["intake", "interviewer", "sidekick"].some((a) => i[a].status === "failed"));
      if (!finished) {
        rev.briefing = { status: "waiting", why: `waiting for ${items.filter((i) => !["intake", "interviewer", "sidekick"].every((a) => TERMINAL.has(i[a].status))).length} item(s) to finish` };
        continue;
      }
      if (failed.length && !rev.proceedWithGaps) {
        rev.briefing = { status: "blocked", why: `${failed.length} item(s) failed: retry them, or go ahead without them` };
        continue;
      }
      rev.briefing = { status: "running", started: new Date().toISOString() };
      running.add(key(session.id, "brief", rev.n));
      jobs.push({ revision: rev.n });
    }
  });
  for (const job of jobs) (job.revision ? brief(sessionId, job.revision) : work(sessionId, job.item, job.agent)).catch(() => {});
}

async function work(sessionId, itemId, agent) {
  const session = await load(sessionId);
  const item = session.items.find((i) => i.id === itemId);
  let outcome;
  try {
    outcome = await (agent === "intake" ? intake(sessionId, item) : agent === "interviewer" ? interviewer(item) : sidekick(item));
    outcome.status = outcome.status || "done";
  } catch (error) {
    outcome = { status: "failed", error: error.message };
  }
  running.delete(key(sessionId, itemId, agent));
  await update(sessionId, (s) => {
    const it = s.items.find((i) => i.id === itemId);
    it[agent] = { ...outcome, finished: new Date().toISOString() };
    // Nothing to read means nothing for Quinn and Kit to do until Piper is retried (a retry resets them).
    if (agent === "intake" && outcome.status === "failed") {
      it.interviewer = { status: "skipped", why: "Piper couldn't read this item" };
      it.sidekick = { status: "skipped", why: "Piper couldn't read this item" };
    }
    note(s, agent, outcome.status, outcome.status === "failed" ? `${it.name}: ${outcome.error}` : summary(agent, it), itemId);
  });
  pump(sessionId);
}

function summary(agent, item) {
  if (agent === "intake") return `${item.name}: ${item.intake.method}, ${item.intake.text.length.toLocaleString()} characters.`;
  if (agent === "interviewer") return `${item.name}: ${item.interviewer.questions.length} questions.`;
  return `${item.name}: ${item.sidekick.jokes.length ? `${item.sidekick.jokes.length} joke idea(s)` : `no joke (${item.sidekick.jokesNote || "nothing kind to say"})`}.`;
}

async function intake(sessionId, item) {
  if (item.source === "link") return readLink(item.url);
  const bytes = await readOriginal(sessionId, item.file);
  if (item.kind === "audio" || item.kind === "video") return transcribe(bytes, item.name, item.kind);
  if (item.kind === "image") return describeImage(bytes, item.name, item.mime, DEFAULT_MODEL);
  if (item.kind === "pdf") return readPdf(bytes, item.name, DEFAULT_MODEL);
  if (item.kind === "text") return readText(bytes, item.name);
  // Unknown kinds: try them as text; if that's mostly unreadable, say so rather than pretend.
  const attempt = await readText(bytes, item.name);
  if ((attempt.text.match(/�/g) || []).length > attempt.text.length / 50) throw new Error(`Piper can't read a ${item.name.split(".").pop()} file. It's saved; convert it (to PDF, text, audio, or an image) and add it again.`);
  return attempt;
}

async function interviewer(item) {
  const prompt = { system: instructions.interviewer, user: interviewerMessage(item) };
  const answer = await chat({ ...prompt, json: true, maxTokens: 2500 });
  const questions = (answer.data?.questions || []).filter((q) => q && typeof q.question === "string").map((q) => ({ question: q.question, why: String(q.why || "") }));
  if (!questions.length) throw new Error("Quinn's answer had no questions in it (the model didn't answer in JSON). Retry.");
  return { summary: String(answer.data.summary || ""), questions, cost: answer.cost, model: answer.model, prompt };
}

async function sidekick(item) {
  const prompt = { system: instructions.sidekick, user: sidekickMessage(item) };
  const answer = await chat({ ...prompt, json: true, maxTokens: 1500 });
  if (!answer.data) throw new Error("Kit's answer wasn't JSON. Retry.");
  const jokes = (answer.data.jokes || []).filter((j) => j && typeof j.idea === "string").map((j) => ({ idea: j.idea, butt: ["host", "sidekick", "situation"].includes(j.butt) ? j.butt : "situation" }));
  return { jokes, jokesNote: jokes.length ? "" : String(answer.data.jokesNote || "No useful joke here."), cost: answer.cost, model: answer.model, prompt };
}

async function brief(sessionId, n) {
  const session = await load(sessionId);
  const rev = session.revisions.find((r) => r.n === n);
  const all = itemsFor(session, rev);
  const failed = all.filter((i) => !i.excluded && ["intake", "interviewer", "sidekick"].some((a) => i[a].status === "failed") && i.intake.status !== "done");
  const items = all.filter((i) => !i.excluded && i.intake.status === "done").map((i) => ({ ...i, interviewer: i.interviewer.status === "done" ? i.interviewer : { questions: [] }, sidekick: i.sidekick.status === "done" ? i.sidekick : { jokes: [] } }));
  const excluded = all.filter((i) => i.excluded);
  let outcome;
  try {
    const prompt = { system: instructions.producer, user: producerMessage({ session, items, failed, excluded, revision: n }) };
    const answer = await chat({ ...prompt, maxTokens: 6000 });
    await saveBriefing(sessionId, n, answer.text);
    outcome = { status: "done", text: answer.text, cost: answer.cost, model: answer.model, prompt, items: items.map((i) => i.id), failed: failed.map((i) => i.id), excluded: excluded.map((i) => i.id) };
  } catch (error) {
    outcome = { status: "failed", error: error.message };
  }
  running.delete(key(sessionId, "brief", n));
  await update(sessionId, (s) => {
    const r = s.revisions.find((x) => x.n === n);
    r.briefing = { ...outcome, finished: new Date().toISOString() };
    note(s, "producer", outcome.status, outcome.status === "done" ? `The briefing for revision ${n} is ready (from ${outcome.items.length} item(s)).` : outcome.error);
  });
  pump(sessionId);
}
