import { readdir, readFile, mkdir, appendFile, stat } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

// The Theater's systems are folders at the repo root, systems/<name>/ (see content/docs/theater/09-system-format.md),
// and its runs are logs at runs/<system>/<run>.jsonl, one event per line. Both are read on every request, so an edit
// to a character file applies to the next run without a restart.
const repoRoot = path.dirname(/* turbopackIgnore: true */ process.cwd());
export const systemsRoot = path.join(repoRoot, "systems");
export const runsRoot = path.join(repoRoot, "runs");

export const DEFAULT_MODEL = "anthropic/claude-sonnet-5.5";

const safe = (name) => /^[A-Za-z0-9._-]+$/.test(name) && !name.startsWith(".");

async function readAgent(file) {
  const raw = await readFile(file, "utf8");
  let data = {};
  let content = raw;
  let problem = null;
  try {
    ({ data, content } = matter(raw));
  } catch (error) {
    // A student's frontmatter that YAML can't read (often an unquoted colon): use the file anyway and say so.
    problem = `The frontmatter of ${path.relative(repoRoot, file)} couldn't be read (${error.reason || error.message}). Put quotes around any value with a colon in it.`;
    content = raw.replace(/^---[\s\S]*?---\s*/, "");
  }
  const base = path.basename(file, ".md").replace(/^\d+[-_]/, "");
  return { file: path.relative(repoRoot, file), id: base.toLowerCase(), name: String(data.name || data.title || base), data, body: content.trim(), raw, problem };
}

async function readFolder(dir) {
  let names = [];
  try {
    names = (await readdir(dir)).filter((n) => n.endsWith(".md") && !n.startsWith(".") && n.toLowerCase() !== "readme.md").sort();
  } catch {
    return [];
  }
  return Promise.all(names.map((n) => readAgent(path.join(dir, n))));
}

async function optional(file) {
  try {
    return await readAgent(file);
  } catch {
    return null;
  }
}

// A plain file beside the system (its README, a prompt to copy), or null.
async function text(file) {
  try {
    return await readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function listSystems() {
  let names = [];
  try {
    names = (await readdir(systemsRoot, { withFileTypes: true })).filter((d) => d.isDirectory() && safe(d.name)).map((d) => d.name).sort();
  } catch {
    return [];
  }
  const systems = await Promise.all(names.map((n) => loadSystem(n).catch(() => null)));
  return systems.filter((s) => s && !s.config.archived);
}

export async function loadSystem(name) {
  if (!safe(name)) throw new Error(`No system called "${name}".`);
  const dir = path.join(systemsRoot, name);
  const system = await readAgent(path.join(dir, "system.md"));
  const d = system.data;
  const kind = ["loop", "switch", "graph", "cast"].includes(d.kind) ? d.kind : "cast";
  const config = {
    kind,
    model: d.model || DEFAULT_MODEL,
    costCeiling: Number(d.costCeiling ?? 0.5),
    minTries: Number(d.minTries ?? 3),
    maxTries: Number(d.maxTries ?? 8),
    input: d.input || "",
    turns: Number(d.turns ?? 10),
    confessionals: Boolean(d.confessionals),
    producersEvery: Number(d.producersEvery ?? 1) || 1,
    observersEvery: Number(d.observersEvery ?? 0),
    ratingsLoop: Boolean(d.ratingsLoop),
    // The hidden answer a loop's or a graph's judge checks in code (never shown to the agents), and the newer knobs:
    // a cast's total number of speeches, the name of the private line (ASIDE, or ITM), the vote's question, whether a
    // banishment reveals the true role from the cast files, and where the system sits on the Theater page.
    answer: d.answer ?? null,
    speeches: Number(d.speeches ?? 0),
    asideLabel: /^[A-Z]{2,12}$/.test(String(d.asideLabel || "")) ? String(d.asideLabel) : "ASIDE",
    voteQuestion: String(d.voteQuestion || ""),
    revealOnBanish: Boolean(d.revealOnBanish),
    featured: Number(d.featured ?? 0),
    archived: Boolean(d.archived),
    level: String(d.level || ""),
  };
  const router = await optional(path.join(dir, "router.md"));
  return {
    name,
    title: String(d.title || name),
    description: String(d.description || ""),
    premise: system.body,
    config,
    files: { system: system.file },
    cast: await readFolder(path.join(dir, "cast")),
    judge: await optional(path.join(dir, "judge.md")),
    router,
    branches: await readFolder(path.join(dir, "branches")),
    director: await optional(path.join(dir, "director.md")),
    producers: await readFolder(path.join(dir, "producers")),
    observers: await readFolder(path.join(dir, "observers")),
    roles: await readFolder(path.join(dir, "roles")),
    guide: await text(path.join(dir, "README.md")),
    prompt: await text(path.join(dir, "prompt.md")),
    raw: system.raw,
  };
}

// The run's log file. Created with the run's first event.
export function runPath(system, run) {
  if (!safe(system) || !safe(run)) throw new Error("Bad run name.");
  return path.join(runsRoot, system, `${run}.jsonl`);
}

export async function appendEvent(file, event) {
  await mkdir(path.dirname(file), { recursive: true });
  await appendFile(file, JSON.stringify(event) + "\n");
}

export async function listRuns() {
  const out = [];
  let systems = [];
  try {
    systems = (await readdir(runsRoot, { withFileTypes: true })).filter((d) => d.isDirectory() && safe(d.name));
  } catch {
    return [];
  }
  for (const dir of systems) {
    const files = (await readdir(path.join(runsRoot, dir.name))).filter((f) => f.endsWith(".jsonl"));
    for (const f of files) {
      const info = await stat(path.join(runsRoot, dir.name, f));
      out.push({ system: dir.name, run: f.replace(/\.jsonl$/, ""), id: `${dir.name}~${f.replace(/\.jsonl$/, "")}`, size: info.size, mtime: info.mtime.toISOString() });
    }
  }
  return out.sort((a, b) => b.mtime.localeCompare(a.mtime));
}

export async function readRun(id) {
  const [system, run] = String(id).split("~");
  const text = await readFile(runPath(system, run), "utf8");
  return text.split("\n").filter(Boolean).map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}
