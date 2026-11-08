import { listRuns, readRun } from "../../lib/theater/systems.mjs";
import Gallery from "./Gallery.jsx";

export const dynamic = "force-dynamic";
export const metadata = { title: "The Glow Room: gallery", description: "Full-screen view of the pieces made by the Glow Room loop." };

const SYSTEM = "ascii-gallery";
const scoreOf = (text = "") => Number(text.match(/Score\s*(\d+(?:\.\d+)?)\s*\/\s*10/i)?.[1]) || null;

// A piece is: a title line, the art, and one line of artist's statement. Split them so the art can fill the screen.
function split(text = "") {
  const lines = text.replace(/```[a-z]*/g, "").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const title = (lines.shift() || "").trim();
  const prose = (l) => l.trim().split(/\s+/).length >= 6 && /[a-z]{3,}.*[a-z]{3,}/.test(l) && !/[@#%*=+]{3}/.test(l);
  const statement = lines.length > 3 && prose(lines[lines.length - 1]) ? lines.pop().trim() : "";
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return { title, art: lines.join("\n"), statement };
}

export default async function GalleryPage({ searchParams }) {
  const { run } = await searchParams;
  const runs = (await listRuns()).filter((r) => r.system === SYSTEM && r.size > 4000);
  const chosen = runs.find((r) => r.run === run) || runs[0];
  let tries = [];
  let ending = "";
  if (chosen) {
    const events = await readRun(chosen.id);
    for (const e of events) {
      if (e.kind === "line" && e.layer === "cast") tries.push({ round: e.round, ...split(e.text) });
      if (e.kind === "verdict") {
        const t = tries.find((x) => x.round === e.round);
        if (t) Object.assign(t, { score: scoreOf(e.text), accept: Boolean(e.state?.accept), note: e.text.replace(/^Score\s*\d+(?:\.\d+)?\s*\/\s*10\.?\s*/i, "") });
      }
      if (e.kind === "stop") ending = e.state?.reason || e.text || "";
    }
  }
  const hung = tries.some((t) => t.accept);
  return <Gallery tries={tries} hung={hung} ending={ending} runs={runs.map((r) => ({ run: r.run, when: r.mtime }))} current={chosen?.run || ""} />;
}
