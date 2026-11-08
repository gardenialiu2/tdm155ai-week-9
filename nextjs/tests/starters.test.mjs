import assert from "node:assert/strict";
import { test } from "node:test";
import { runSystem } from "../lib/theater/run.mjs";
import { loadSystem } from "../lib/theater/systems.mjs";
import { rehearsal } from "../lib/theater/rehearsal.mjs";

// The three starters (favorite color, the Rushmore four, the Divine Villa) and the graph, run against fake models
// that record every prompt, so the tests can check what each agent was and wasn't given.

const run = async (system, call, opts = {}) => {
  const events = [];
  const prompts = [];
  const spy = async (req) => {
    prompts.push(req);
    return call(req, prompts.length);
  };
  await runSystem(system, { call: spy, emit: (e) => events.push(e), overrides: opts.overrides, signal: opts.signal });
  return { events, prompts };
};
const reply = (text) => ({ text, tokens: { in: 10, out: 5 }, cost: 0.001, model: "fake" });
const me = (system) => system.match(/^You are ([^,]+),/)?.[1];

test("favorite color: one guess at a time, stops the moment it's right, and the guesser never sees the answer", async () => {
  const color = await loadSystem("00-favorite-color");
  assert.equal(color.config.model, "anthropic/claude-sonnet-5.5");
  const guesses = ["red", "Blue!", "is it burgundy?", "green"];
  const { events, prompts } = await run(color, (req, n) => reply(`GUESS: ${guesses[n - 1]}\nSAY: hmm`));
  const verdicts = events.filter((e) => e.kind === "verdict");
  assert.deepEqual(verdicts.map((v) => v.state.accept), [false, false, true]);
  assert.equal(prompts.length, 3, "three model calls: the judge is code");
  assert.match(events.at(-1).text, /guessed right on guess 3/);
  for (const p of prompts) assert.doesNotMatch(`${p.system}\n${p.user}`, /burgundy/i);
  assert.match(prompts[2].user, /No, not red/, "the guesser sees the judge's earlier answers");
});

test("favorite color: never right means exactly ten guesses, then a stop", async () => {
  const color = await loadSystem("00-favorite-color");
  const { events, prompts } = await run(color, () => reply("GUESS: beige"));
  assert.equal(prompts.length, 10);
  assert.equal(events.filter((e) => e.kind === "verdict").length, 10);
  assert.match(events.at(-1).text, /hard maximum of 10 guesses/);
});

test("the Rushmore four: twenty speeches in all, five each in turn, each with the scene so far", async () => {
  const rushmore = await loadSystem("09-rushmore");
  const { events, prompts } = await run(rushmore, (req, n) => reply(`TO: everyone\nSAY: Line ${n} from ${me(req.system)}.`));
  const lines = events.filter((e) => e.kind === "line");
  assert.equal(lines.length, 20);
  assert.deepEqual(lines.slice(0, 4).map((e) => e.speaker), ["Washington", "Jefferson", "Roosevelt", "Lincoln"]);
  for (const name of ["Washington", "Jefferson", "Roosevelt", "Lincoln"]) assert.equal(lines.filter((e) => e.speaker === name).length, 5);
  assert.deepEqual(lines.map((e) => e.turn), Array.from({ length: 20 }, (_, i) => i + 1));
  assert.match(prompts[19].user, /Line 19 from Roosevelt/, "the last speaker hears the speech before");
  assert.match(prompts[19].user, /Speech 20 of 20/);
  assert.equal(events.filter((e) => ["aside", "twist", "vote", "goal", "observation"].includes(e.kind)).length, 0, "nothing but the cast");
  assert.match(events.at(-1).text, /all 20 speeches given/);
});

test("the Divine Villa: three traitors, each player told only their own role, ITMs private, and the vote legal", async () => {
  const villa = await loadSystem("10-divine-villa");
  const traitors = villa.cast.filter((c) => c.data.role === "traitor").map((c) => c.name);
  assert.deepEqual(traitors.sort(), ["Ares", "Hera", "Hermes"]);
  assert.match(villa.premise, /three traitors/i);
  for (const name of traitors) assert.doesNotMatch(villa.premise, new RegExp(`\\b${name}\\b.*traitor|traitor.*\\b${name}\\b`, "i"), "the public scenario names no traitor");

  const { events, prompts } = await run(villa, (req, n) => {
    const who = me(req.system);
    if (req.system.includes("the producer in a system")) return reply(req.system.includes("ACTION: vote") ? "ACTION: vote\nTEXT: The round table is open." : "ACTION: challenge\nTEXT: Cook dinner in pairs.");
    if (req.system.includes("the observer in a system")) return reply("Notes.");
    if (req.user.includes("VOTE:")) return reply(`VOTE: ${who === "Zeus" ? "Zeus" : "Zeus"}\nWHY: he's loud`);
    return reply(`TO: everyone\nSAY: ${who} says something.\nITM: ${who}'s private thought ${n}.`);
  });

  const cast = prompts.filter((p) => p.system.includes("a character in a scene"));
  for (const p of cast) {
    const who = me(p.system);
    const traitor = traitors.includes(who);
    assert.match(p.system, new RegExp(`Your secret role: ${traitor ? "Traitor" : "Faithful"}`), who);
    assert.doesNotMatch(p.system, new RegExp(`Your secret role: ${traitor ? "Faithful" : "Traitor"}`), who);
    assert.match(p.system, /ITM: <your private in-the-moment interview/);
    if (traitor) for (const mate of traitors.filter((t) => t !== who)) assert.match(p.system, new RegExp(`known only to you and them: .*${mate}`), `${who} knows ${mate}`);
    else assert.doesNotMatch(p.system, /known only to you and them/, `${who} isn't told who the traitors are`);
    assert.doesNotMatch(p.system + p.user, /The control room only/, `${who} never sees the role list`);
    for (const other of villa.cast.filter((c) => c.name !== who)) assert.doesNotMatch(p.user, new RegExp(`${other.name}'s private thought`), `${who} never sees ${other.name}'s ITM`);
  }
  assert.ok(prompts.some((p) => p.system.includes("the producer in a system") && p.user.includes("The control room only")), "the producers see the control room");

  const votes = events.filter((e) => e.kind === "vote");
  assert.equal(votes.length, 8);
  assert.equal(votes.find((v) => v.speaker === "Zeus").state.target, null, "voting for yourself doesn't count");
  const out = events.find((e) => e.kind === "eliminate");
  assert.equal(out.state.eliminated, "Zeus");
  assert.equal(out.state.role, "Faithful", "the banishment reveals the true role from the files");
  assert.match(out.text, /Zeus's true role: Faithful/);
  assert.ok(events.filter((e) => e.kind === "aside").every((e) => e.state.label === "ITM"));
  const later = cast.filter((p) => me(p.system) === "Hera").at(-1);
  assert.match(later.system, /Your secret role: Traitor/);
  assert.doesNotMatch(later.system.match(/## The others in the scene\n(.*)/)[1], /Zeus/, "Zeus is out of the game after the round table");
});

test("the Divine Villa refuses to run with the wrong number of traitors, and producers can't do what their file forbids", async () => {
  const villa = await loadSystem("10-divine-villa");
  const four = { ...villa, cast: villa.cast.map((c) => (c.name === "Zeus" ? { ...c, data: { ...c.data, role: "traitor" } } : c)) };
  const { events } = await run(four, () => reply("TO: everyone\nSAY: hi"));
  assert.match(events.find((e) => e.kind === "error").text, /players are (Traitor, but 4|Faithful, but 4)/);

  const { events: rogue } = await run(villa, (req) => {
    if (req.system.includes("the producer in a system")) return reply(req.system.includes("ACTION: vote") ? "ACTION: vote\nTEXT: The round table." : "ACTION: eliminate\nTARGET: Athena\nTEXT: Athena, you're out.");
    if (req.user.includes("VOTE:")) return reply("VOTE: nobody");
    return reply("TO: everyone\nSAY: hi\nITM: hm");
  });
  assert.equal(rogue.filter((e) => e.kind === "eliminate").length, 0, "no producer may eliminate anyone");
  assert.ok(rogue.some((e) => e.kind === "pass" && /isn't allowed/.test(e.text)));
  assert.ok(rogue.some((e) => e.kind === "tie" && /nobody goes home/.test(e.text)), "no valid votes: nobody goes home");
});

test("a graph: one decision, one branch, then a final judge in code", async () => {
  const graph = {
    name: "test-graph", title: "Animals", premise: "Guess the animal from a clue.", files: { system: "x" }, raw: "",
    config: { kind: "graph", model: "fake", costCeiling: 1, minTries: 1, maxTries: 1, turns: 1, input: "I build dams in rivers", answer: "beaver", speeches: 0, asideLabel: "ASIDE" },
    cast: [], judge: null, director: null, producers: [], observers: [], roles: [],
    router: { name: "Router", data: {}, body: "Send water animals to the water specialist." },
    branches: [{ name: "Land Specialist", data: {}, body: "land" }, { name: "Water Specialist", data: {}, body: "water" }],
  };
  const { events, prompts } = await run(graph, (req) => reply(req.system.includes("the router") ? "BRANCH: Water Specialist\nREASON: dams" : "GUESS: a beaver\nWHY: dams"));
  assert.equal(prompts.length, 2, "router and one branch; the judge is code");
  assert.equal(events.filter((e) => e.kind === "reply").length, 1);
  assert.equal(events.find((e) => e.kind === "reply").speaker, "Water Specialist");
  assert.equal(events.find((e) => e.kind === "verdict").state.accept, true);
  for (const p of prompts) assert.doesNotMatch(`${p.system}\n${p.user}`, /beaver/i);
});

test("rehearsal runs every starter for free, and Stop and the cost ceiling still end a run", async () => {
  for (const name of ["00-favorite-color", "09-rushmore", "10-divine-villa"]) {
    const events = [];
    await runSystem(await loadSystem(name), { call: rehearsal(), emit: (e) => events.push(e) });
    assert.equal(events.at(-1).kind, "stop", name);
    assert.ok(!events.some((e) => e.kind === "error"), name);
    assert.ok(events.every((e) => !e.cost), name);
  }
  const rushmore = await loadSystem("09-rushmore");
  const capped = await run(rushmore, () => reply("TO: everyone\nSAY: hi"), { overrides: { costCeiling: 0.01 } });
  assert.match(capped.events.at(-1).text, /cost ceiling/);
  const controller = new AbortController();
  controller.abort();
  const stopped = await run(rushmore, () => reply("SAY: hi"), { signal: controller.signal });
  assert.equal(stopped.events.at(-1).text, "stopped by you");
});
