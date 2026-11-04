import { mkdir, readdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

// Your remix's sessions, saved on this computer: output/podcast-remix/<session>/ at the repo root (gitignored), with
// session.json (the inventory, every agent's status and output, the revisions and their briefings, an event trace)
// and originals/ (every file exactly as it was submitted). Writes go through one queue per session and land by
// rename, so a crash never leaves half a session.json.
const repoRoot = path.dirname(/* turbopackIgnore: true */ process.cwd());
export const podcastRoot = path.join(repoRoot, "output", "podcast-remix");

const SAFE = /^[a-z0-9][a-z0-9-]{0,80}$/;
export const safeId = (id) => SAFE.test(String(id || ""));

export function sessionDir(id) {
  if (!safeId(id)) throw new Error(`No session "${id}".`);
  return path.join(podcastRoot, id);
}

const slug = (text) => String(text || "").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 40) || "session";
const stamp = () => new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "").replace("T", "-");

// A file name that can't climb out of originals/ or collide: the item id, then the name with anything odd removed.
export function originalName(itemId, name) {
  const base = path.basename(String(name || "item")).replace(/[^\w.\- ]+/g, "_").replace(/^\.+/, "").slice(0, 120) || "item";
  return `${itemId}-${base}`;
}

export async function createSession(title) {
  const id = `${stamp()}-${slug(title)}`.toLowerCase();
  const session = { id, title: String(title || "Untitled guest").slice(0, 200), created: new Date().toISOString(), revision: 1, nextItem: 1, items: [], revisions: [], events: [] };
  await mkdir(path.join(sessionDir(id), "originals"), { recursive: true });
  await save(session);
  return session;
}

export async function listSessions() {
  let names = [];
  try {
    names = (await readdir(podcastRoot, { withFileTypes: true })).filter((d) => d.isDirectory() && safeId(d.name)).map((d) => d.name);
  } catch {
    return [];
  }
  const out = [];
  for (const name of names) {
    try {
      const s = await load(name);
      out.push({ id: s.id, title: s.title, created: s.created, items: s.items.length, revisions: s.revisions.length });
    } catch {}
  }
  return out.sort((a, b) => b.created.localeCompare(a.created));
}

export async function load(id) {
  return JSON.parse(await readFile(path.join(sessionDir(id), "session.json"), "utf8"));
}

async function save(session) {
  const file = path.join(sessionDir(session.id), "session.json");
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temp, JSON.stringify(session, null, 2));
  await rename(temp, file);
}

// Change a session: `fn` gets the current session and edits it in place (or returns a value). One change at a time
// per session, so two agents finishing together can't overwrite each other.
const queues = globalThis.__remixQueues || (globalThis.__remixQueues = new Map());

export function update(id, fn) {
  const run = async () => {
    const session = await load(id);
    const result = await fn(session);
    await save(session);
    return { session, result };
  };
  const next = (queues.get(id) || Promise.resolve()).then(run, run);
  queues.set(id, next.catch(() => {}));
  return next;
}

export function note(session, agent, kind, text, item = null) {
  session.events.push({ t: new Date().toISOString(), agent, kind, item, text: String(text || "").slice(0, 2000) });
}

export async function saveOriginal(sessionId, itemId, name, bytes) {
  const file = originalName(itemId, name);
  await mkdir(path.join(sessionDir(sessionId), "originals"), { recursive: true });
  await writeFile(path.join(sessionDir(sessionId), "originals", file), bytes);
  return `originals/${file}`;
}

export async function readOriginal(sessionId, relative) {
  const dir = path.join(sessionDir(sessionId), "originals");
  const file = path.resolve(sessionDir(sessionId), relative);
  if (!file.startsWith(dir + path.sep)) throw new Error("Bad path.");
  return readFile(file);
}

export async function saveBriefing(sessionId, n, text) {
  await writeFile(path.join(sessionDir(sessionId), `briefing-r${n}.md`), text);
}
