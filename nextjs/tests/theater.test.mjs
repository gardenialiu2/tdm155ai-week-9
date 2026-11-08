import assert from "node:assert/strict";
import { test } from "node:test";
import { fields, parseAction, parseGoal, parseLine, parseRoute, parseVerdict, parseVote } from "../lib/theater/parse.mjs";
import { runSystem } from "../lib/theater/run.mjs";
import { listSystems, loadSystem } from "../lib/theater/systems.mjs";
import { summarize } from "../app/theater/derive.mjs";

// A fake model: answers by what kind of agent it was asked to be, never calls OpenRouter.
function fake(script = {}) {
  let n = 0;
  return async ({ system, user }) => {
    n++;
    const text = system.includes("the judge") ? (script.judge?.(n) ?? "VERDICT: ACCEPT\nREASON: fine")
      : system.includes("the router") ? "BRANCH: Fan Liaison\nREASON: praise"
      : system.includes("the director") ? (script.director?.(user) ?? "GOAL: NOT YET\nREASON: no\nNOTE: hurry")
      : system.includes("the producer") ? (script.producer?.(user) ?? "ACTION: twist\nTEXT: The lights go out.")
      : system.includes("the observer") ? "The table is tense."
      : user.includes("VOTE:") ? "VOTE: Felix\nWHY: he lies"
      : "TO: Felix\nSAY: Pass the salt.\nASIDE: I know.";
    return { text, tokens: { in: 10, out: 5 }, cost: 0.001, model: "fake" };
  };
}

const collect = async (system, opts = {}) => {
  const events = [];
  await runSystem(system, { call: fake(opts.script), emit: (e) => events.push(e), overrides: opts.overrides, signal: opts.signal });
  return events;
};

test("labelled replies parse, across lines and with stray bold", () => {
  assert.deepEqual(fields("TO: Ada\nSAY: one\ntwo\n**ASIDE:** three"), { TO: "Ada", SAY: "one\ntwo", ASIDE: "three" });
  assert.deepEqual(parseLine("TO: Felix and June\nSAY: Hello.", ["Felix", "June", "Agnes"]).to, ["Felix", "June"]);
  assert.equal(parseLine("Just talking.", ["A"]).say, "Just talking.");
  assert.equal(parseVerdict("VERDICT: REJECT\nREASON: no").accept, false);
  assert.equal(parseRoute("BRANCH: house manager", ["House Manager", "Fan Liaison"]).branch, "House Manager");
  assert.equal(parseGoal("GOAL: NOT YET").reached, false);
  assert.equal(parseGoal("GOAL: REACHED").reached, true);
  assert.deepEqual(parseAction("ACTION: eliminate\nTARGET: june\nTEXT: Bye.", ["June", "Felix"]), { action: "eliminate", target: "June", text: "Bye." });
  assert.equal(parseVote("VOTE: Agnes", ["Agnes", "Felix"], "Agnes").target, null, "no voting for yourself");
});

test("every preset loads", async () => {
  const systems = await listSystems();
  assert.ok(systems.length >= 3);
  for (const s of systems) assert.ok(["loop", "switch", "graph", "cast", "draw"].includes(s.config.kind), s.name);
});

test("the loop takes at least minTries even when the judge would accept at once, and stops at maxTries", async () => {
  const taboo = await loadSystem("01-taboo");
  const events = await collect(taboo);
  const verdicts = events.filter((e) => e.kind === "verdict");
  assert.equal(verdicts.length, 3);
  assert.deepEqual(verdicts.map((v) => v.state.accept), [false, false, true]);
  const never = await collect(taboo, { script: { judge: () => "VERDICT: REJECT\nREASON: no" } });
  assert.equal(never.filter((e) => e.kind === "verdict").length, 8);
  assert.match(never.at(-1).text, /hard maximum/);
});

test("the switch routes once and the chosen branch answers", async () => {
  const events = await collect(await loadSystem("02-stage-door"));
  assert.equal(events.find((e) => e.kind === "route").state.branch, "Fan Liaison");
  assert.equal(events.find((e) => e.kind === "reply").speaker, "Fan Liaison");
});

test("the cast speaks round-robin, keeps asides apart, and observers write at the end", async () => {
  const events = await collect(await loadSystem("03-dinner-party"), { overrides: { turns: 2 } });
  const lines = events.filter((e) => e.kind === "line");
  assert.deepEqual(lines.map((e) => e.speaker), ["Agnes", "Felix", "June", "Rowan", "Agnes", "Felix", "June", "Rowan"]);
  assert.equal(events.filter((e) => e.kind === "aside").length, 8);
  assert.equal(events.filter((e) => e.kind === "observation").length, 1);
  assert.equal(events.at(-1).kind, "stop");
});

test("the cost ceiling and the Stop button end a run", async () => {
  const dinner = await loadSystem("03-dinner-party");
  const capped = await collect(dinner, { overrides: { costCeiling: 0.01 } }); // 0.001 a call
  assert.match(capped.at(-1).text, /cost ceiling/);
  assert.ok(capped.filter((e) => e.kind === "line").length <= 10);
  const controller = new AbortController();
  controller.abort();
  const stopped = await collect(dinner, { signal: controller.signal });
  assert.equal(stopped.at(-1).text, "stopped by you");
});

test("a director stops the scene, producers vote people out, and the summary counts it all", async () => {
  const dinner = await loadSystem("03-dinner-party");
  const system = {
    ...dinner,
    config: { ...dinner.config, producersEvery: 1 },
    director: { name: "D", data: {}, body: "goal" },
    producers: [{ name: "P", data: {}, body: "job" }],
  };
  const events = await collect(system, {
    overrides: { turns: 5 },
    script: { producer: () => "ACTION: vote\nTEXT: Vote!", director: (user) => (user.includes("Round 3 of") ? "GOAL: REACHED\nREASON: yes" : "GOAL: NOT YET\nREASON: no") },
  });
  assert.ok(events.some((e) => e.kind === "eliminate" && e.state.eliminated === "Felix"));
  assert.match(events.at(-1).text, /goal reached in round 3/);
  const s = summarize(events);
  assert.ok(s.speakers.includes("Agnes"));
  assert.ok(s.cost > 0);
  assert.equal(s.addressed.Agnes.Felix, 1, "Felix is out after round 1, so nobody can address him");
});

test("a draw game keeps the word from the guesser, checks guesses in code, and ends a round on a right guess", async () => {
  const game = await loadSystem("scribblio");
  const prompts = [];
  const call = async ({ system, user }) => {
    prompts.push({ system, user });
    const drawing = system.startsWith("You are Pip");
    return { text: drawing ? "  /\\_/\\\n ( o.o )" : prompts.filter((p) => !p.system.startsWith("You are Pip")).length < 2 ? "GUESS: dog\nSAY: woof" : "GUESS: A cat!", tokens: { in: 1, out: 1 }, cost: 0.001, model: "fake" };
  };
  const events = [];
  await runSystem(game, { call, emit: (e) => events.push(e), overrides: { input: "cat", rounds: 1, stages: 1 } });
  const guessing = prompts.filter((p) => !p.system.startsWith("You are Pip"));
  assert.ok(guessing.length >= 2);
  for (const p of guessing) assert.ok(!/\bcat\b/i.test(p.system + p.user.replace(/A cat!/g, "")), "the guesser is never told the word");
  assert.ok(prompts.find((p) => p.system.startsWith("You are Pip")).system.includes("## The secret word\ncat"));
  assert.deepEqual(events.filter((e) => e.kind === "verdict").map((v) => v.state.accept), [false, true]);
  assert.equal(events.find((e) => e.kind === "reveal").state.solved, true);
  assert.equal(events.at(-1).state.solved, 1);
  assert.ok(events.find((e) => e.kind === "line" && e.state?.art).text.includes("o.o"));
});

test("a draw game's clock cancels a guess that is still being thought of", async () => {
  const game = await loadSystem("scribblio");
  const call = ({ system, signal }) => system.startsWith("You are Pip")
    ? Promise.resolve({ text: "( )", tokens: null, cost: 0, model: "fake" })
    : new Promise((resolve, reject) => signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" }))));
  const events = [];
  await runSystem(game, { call, emit: (e) => events.push(e), overrides: { input: "cat", rounds: 1, stages: 1, guessSeconds: 5 } });
  const reveal = events.find((e) => e.kind === "reveal");
  assert.equal(reveal.state.solved, false);
  assert.match(reveal.text, /Time's up/);
}, { timeout: 15000 });
