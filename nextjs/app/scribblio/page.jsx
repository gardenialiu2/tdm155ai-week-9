import { listRuns, readRun } from "../../lib/theater/systems.mjs";
import Scribblio from "./Scribblio.jsx";

export const dynamic = "force-dynamic";
export const metadata = { title: "Scribblio: game", description: "Full-screen replay of a game of Scribblio: a drawer, a guesser and a clock." };

const SYSTEM = "scribblio";

// Each round: the picture as it grew (with the second each pass appeared on the guess clock), the guesses and whether
// code said yes, and the reveal. Times come from the run's own `state.at`, so the page can replay the clock.
function rounds(events) {
  const out = [];
  const get = (n) => out.find((r) => r.n === n);
  for (const e of events) {
    if (e.kind === "round") out.push({ n: e.round, hint: e.state?.hint || "", seconds: e.state?.seconds || 30, arts: [], guesses: [], reveal: null });
    const r = get(e.round);
    if (!r) continue;
    if (e.kind === "line" && e.state?.art) r.arts.push({ at: e.state.at || 0, text: e.text });
    else if (e.kind === "line" && e.state?.guess !== undefined) {
      const guess = e.state.guess;
      const say = e.text.startsWith(guess) ? e.text.slice(guess.length).replace(/^[.\s]+/, "") : "";
      r.guesses.push({ at: e.state.at ?? 0, guess, say, right: false, points: 0 });
    } else if (e.kind === "verdict") {
      const g = r.guesses[r.guesses.length - 1];
      if (g) Object.assign(g, { right: Boolean(e.state?.accept), points: e.state?.points || 0, note: e.text });
    } else if (e.kind === "reveal") r.reveal = { text: e.text, word: e.state?.word || "", solved: Boolean(e.state?.solved), points: e.state?.points || 0, score: e.state?.score || 0 };
  }
  return out;
}

export default async function ScribblioPage({ searchParams }) {
  const { run } = await searchParams;
  const runs = (await listRuns()).filter((r) => r.system === SYSTEM && r.size > 3000);
  const chosen = runs.find((r) => r.run === run) || runs[0];
  let list = [];
  let ending = "";
  if (chosen) {
    const events = await readRun(chosen.id);
    list = rounds(events);
    ending = events.find((e) => e.kind === "stop")?.state?.reason || "";
  }
  return <Scribblio rounds={list} ending={ending} runs={runs.map((r) => ({ run: r.run, when: r.mtime }))} current={chosen?.run || ""} />;
}
