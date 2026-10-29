import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";

// GET → { files: [{ path, size, text }] }: the sample context repository at the repo root (sample-context-repo/),
// so the ensemble can run in class without anyone's real repository. Text files only, the same filter the page
// applies to a folder you pick; nothing outside that folder.
const sampleRoot = path.join(path.dirname(/* turbopackIgnore: true */ process.cwd()), "sample-context-repo");
const textTypes = new Set([".md", ".markdown", ".txt", ".csv", ".json", ".yaml", ".yml", ".html", ".css", ".js", ".mjs", ".py", ".srt", ".vtt"]);

async function walk(dir, base) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    const rel = path.posix.join(base, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, rel)));
    else if (textTypes.has(path.extname(entry.name).toLowerCase())) {
      const { size } = await stat(full);
      if (size > 200000) continue;
      out.push({ path: rel, size, text: await readFile(full, "utf8") });
    }
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export async function GET() {
  try {
    return Response.json({ files: await walk(sampleRoot, "sample-context-repo") });
  } catch {
    return Response.json({ error: "No sample-context-repo/ folder at the repo root." }, { status: 404 });
  }
}
