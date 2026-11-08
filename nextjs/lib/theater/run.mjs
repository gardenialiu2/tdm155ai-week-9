import { matches, parseAction, parseGoal, parseGuess, parseLine, parseRoute, parseVerdict, parseVote } from "./parse.mjs";

// The Theater's kinds of system, run on the server one model call at a time:
//   loop    one agent (or a small cast) tries until a judge accepts, at least minTries and at most maxTries; with an
//           `answer`, the judge is code that checks each guess against it and the guessers never see it
//   graph   a router reads the input and sends it down one of two branches; with an `answer` (or a judge.md), a final
//           judge checks the branch's guess. (`switch` is the same thing without the judge, its earlier name.)
//   cast    characters speak round-robin for `turns` rounds, or for `speeches` speeches in all; a director may stop the
//           scene when its goal is reached, producers may write into it (twists, challenges, votes, eliminations),
//           observers read it and take notes. Characters can hold secret roles (roles/), told only to themselves.
// Every step is an event: `emit` receives it, and the route writes it to the log and streams it to the page. `call` is
// the model call (lib/theater/model.mjs; the tests pass a fake). Caps are on by default: turns and tries are clamped,
// the run stops at the cost ceiling, and `signal` is the Stop button.

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number.isFinite(n) ? n : lo));
const RECENT = 80; // events of the scene so far that each agent is shown

class Stop extends Error {}

export async function runSystem(system, { call, emit, signal, overrides = {} }) {
  const config = { ...system.config, ...clean(overrides) };
  config.turns = clamp(config.turns, 1, 30);
  config.maxTries = clamp(config.maxTries, 1, 20);
  config.minTries = clamp(config.minTries, 1, config.maxTries);
  config.costCeiling = clamp(config.costCeiling, 0.01, 5);
  if (config.maxTokens) config.maxTokens = clamp(config.maxTokens, 500, 8000);
  if (config.speeches > 0) {
    config.speeches = clamp(config.speeches, 1, 120);
    config.turns = Math.ceil(config.speeches / Math.max(1, system.cast.length));
  }
  const state = { spent: 0, calls: 0, events: [] };

  const record = (event) => {
    const full = { layer: "system", speaker: "", kind: "", to: null, text: "", state: null, tokens: null, cost: null, round: null, turn: null, ...event };
    state.events.push(full);
    emit(full);
    return full;
  };

  const ask = async (who, prompt, maxTokens) => {
    if (signal?.aborted) throw new Stop("stopped by you");
    if (state.spent >= config.costCeiling) throw new Stop(`cost ceiling reached ($${state.spent.toFixed(4)} of $${config.costCeiling})`);
    try {
      const answer = await call({ model: who?.data?.model || config.model, ...prompt, maxTokens, signal });
      state.spent += answer.cost || 0;
      state.calls += 1;
      return { ...answer, prompt };
    } catch (error) {
      if (signal?.aborted || error.name === "AbortError") throw new Stop("stopped by you");
      throw error;
    }
  };
  const usage = (answer) => ({ tokens: answer.tokens, cost: answer.cost, model: answer.model, prompt: answer.prompt });

  record({
    kind: "start",
    speaker: system.title,
    text: system.premise,
    state: { system: system.name, title: system.title, kind: config.kind, config, cast: system.cast.map((c) => c.name), roles: secretRoles(system), judge: system.judge?.name || null, router: system.router?.name || null, branches: system.branches.map((b) => b.name), director: system.director?.name || null, producers: system.producers.map((p) => p.name), observers: system.observers.map((o) => o.name) },
  });

  let reason = "done";
  let extra = {};
  try {
    checkRoles(system);
    if (config.kind === "loop") extra = await runLoop(system, config, { ask, record, usage });
    else if (config.kind === "switch" || config.kind === "graph") extra = await runSwitch(system, config, { ask, record, usage });
    else extra = await runCast(system, config, { ask, record, usage, state });
    reason = extra.reason || reason;
  } catch (error) {
    if (error instanceof Stop) reason = error.message;
    else {
      record({ kind: "error", text: error.message });
      reason = "error";
    }
  }
  record({ kind: "stop", text: reason, state: { reason, calls: state.calls, spent: state.spent, ...extra } });
  return state;
}

function clean(overrides) {
  const out = {};
  for (const [key, value] of Object.entries(overrides || {})) {
    if (value === "" || value === null || value === undefined) continue;
    out[key] = ["turns", "speeches", "maxTries", "minTries", "costCeiling", "producersEvery", "observersEvery"].includes(key) ? Number(value) : value;
  }
  return out;
}

// ---- the prompts ----------------------------------------------------------------------------------------------

function characterPrompt(system, config, who, names, format = null) {
  const others = names.filter((n) => n !== who.name);
  const aside = config.asideLabel === "ASIDE"
    ? "ASIDE: <optional: a private confessional to the camera; nobody in the scene hears it>"
    : `${config.asideLabel}: <your private ${config.asideLabel === "ITM" ? "in-the-moment interview (ITM)" : "word"} to the camera, one or two sentences; nobody in the scene ever hears it. Be honest here.>`;
  return [
    `You are ${who.name}, a character in a scene played by AI agents for a class on agents and systems.`,
    `## The scene\n${system.premise}`,
    `## Who you are\n${who.data.voice ? `Your voice: ${who.data.voice}\n\n` : ""}${who.body}`,
    roleBriefing(system, who, names),
    `## The others in the scene\n${others.join(", ") || "nobody else"}`,
    `## How to reply\n${format || `Reply in these labelled lines and nothing else:\nTO: <one name, or everyone>\nSAY: <what you say out loud: one to three sentences, in your voice>${config.confessionals ? `\n${aside}` : ""}\nStay in character. Speak only for yourself. Don't repeat what you've already said; move the scene.`}`,
  ].filter(Boolean).join("\n\n");
}

// ---- secret roles ----------------------------------------------------------------------------------------------
// A cast file's `role:` names a file in roles/ (roles/traitor.md). Each character is told only its own role; a role
// with `knowEachOther: true` also tells its members who the others are. Nobody else's prompt carries a role: the
// scene, the votes, and the other characters never see them. The producers' and observers' control room does.

const roleOf = (system, who) => {
  const id = String(who.data?.role || "").toLowerCase();
  return id ? system.roles?.find((r) => r.id === id || r.name.toLowerCase() === id) || null : null;
};

function roleBriefing(system, who, alive) {
  const role = roleOf(system, who);
  if (!role) return "";
  const mates = system.cast.filter((c) => c.name !== who.name && roleOf(system, c) === role).map((c) => (alive.includes(c.name) ? c.name : `${c.name} (banished)`));
  const known = role.data.knowEachOther ? `\n\nThe other ${role.name.toLowerCase()}s, known only to you and them: ${mates.join(", ") || "none"}.` : "";
  return `## Your secret role: ${role.name}\nOnly you know this${role.data.knowEachOther ? " (and the others with the same role)" : ""}.\n\n${role.body}${known}`;
}

export function secretRoles(system) {
  if (!system.roles?.length) return null;
  return Object.fromEntries(system.cast.map((c) => [c.name, roleOf(system, c)?.name || null]));
}

function controlRoom(system) {
  const roles = secretRoles(system);
  return roles ? `\n\nThe control room only: the secret roles. Never announce, hint at, or confirm them.\n${Object.entries(roles).map(([n, r]) => `- ${n}: ${r || "none"}`).join("\n")}` : "";
}

// A role with `count:` must have exactly that many cast files (the Divine Villa's three traitors).
function checkRoles(system) {
  for (const role of system.roles || []) {
    if (role.data.count === undefined) continue;
    const have = system.cast.filter((c) => roleOf(system, c) === role).length;
    if (have !== Number(role.data.count)) throw new Error(`roles/${role.id}.md says ${role.data.count} players are ${role.name}, but ${have} cast files have that role.`);
  }
  const unknown = system.cast.filter((c) => c.data.role && !roleOf(system, c));
  if (unknown.length) throw new Error(`No file in roles/ for the role of ${unknown.map((c) => `${c.name} (${c.data.role})`).join(", ")}.`);
}

function agentPrompt(system, who, role, format) {
  return [`You are ${who.name}, the ${role} in a system of AI agents for a class on agents and systems.`, `## The scene\n${system.premise}`, `## Your job\n${who.body}`, `## How to reply\n${format}`].join("\n\n");
}

// The scene so far, as each agent sees it: public lines and announcements, plus (for `self`) that agent's own asides.
export function sceneSoFar(events, { self = null, everything = false } = {}) {
  const lines = [];
  for (const e of events.slice(-RECENT * 2)) {
    const at = e.round ? `[${e.round}] ` : "";
    if (e.kind === "line") lines.push(`${at}${e.speaker} → ${(e.to || ["everyone"]).join(", ")}: ${e.text}`);
    else if (e.kind === "aside" && (everything || e.speaker === self)) lines.push(`${at}(${e.speaker}, ${e.state?.label === "ITM" ? "ITM" : "aside"} to camera: ${e.text})`);
    else if (e.kind === "vote" && (everything || e.speaker === self)) lines.push(`${at}(${e.speaker} votes privately for ${e.state?.target || "nobody"}: ${e.text})`);
    else if (["twist", "challenge", "vote-call"].includes(e.kind)) lines.push(`${at}[PRODUCER ${e.speaker.toUpperCase()}: ${e.text}]`);
    else if (e.kind === "eliminate" || e.kind === "tie") lines.push(`${at}[${e.text}]`);
    else if (e.kind === "note") lines.push(`${at}[DIRECTOR'S NOTE: ${e.text}]`);
    else if (e.kind === "verdict") lines.push(`${at}[JUDGE ${e.speaker}: ${e.state?.accept ? "ACCEPT" : "REJECT"}: ${e.text}]`);
    else if (e.kind === "observation" && everything) lines.push(`${at}[OBSERVER ${e.speaker}: ${e.text}]`);
  }
  return lines.slice(-RECENT).join("\n") || "(nothing yet: you speak first)";
}

// ---- loop ------------------------------------------------------------------------------------------------------

async function runLoop(system, config, { ask, record, usage }) {
  const cast = system.cast;
  const names = cast.map((c) => c.name);
  const hidden = config.answer !== null && config.answer !== undefined && config.answer !== "";
  if (!cast.length || (!system.judge && !hidden)) throw new Error("A loop needs at least one file in cast/, and a judge.md or an answer: in system.md.");
  const events = [];
  const push = (e) => events.push(record(e));
  if (hidden) return guessLoop(system, config, { ask, push, usage, events, names });
  for (let tries = 1; tries <= config.maxTries; tries++) {
    for (const who of cast) {
      const answer = await ask(who, { system: characterPrompt(system, config, who, names), user: `The tries so far:\n${sceneSoFar(events, { self: who.name })}\n\nTry ${tries} of at most ${config.maxTries}. Your move.` }, config.maxTokens || 1500);
      const line = parseLine(answer.text, names);
      push({ layer: "cast", speaker: who.name, kind: "line", to: line.to, text: line.say, round: tries, ...usage(answer) });
    }
    const verdictFormat = `VERDICT: ACCEPT or REJECT\nREASON: <one or two sentences; when you reject, say what was wrong>`;
    const rule = tries < config.minTries ? `This is try ${tries}. The rule of this game: you may not accept before try ${config.minTries}, so reject this one and say what would make it better.` : `This is try ${tries} of at most ${config.maxTries}. Accept if it meets the goal.`;
    const answer = await ask(system.judge, { system: agentPrompt(system, system.judge, "judge", verdictFormat), user: `The tries so far:\n${sceneSoFar(events)}\n\n${rule}` }, 1200);
    const verdict = parseVerdict(answer.text);
    const accept = verdict.accept && tries >= config.minTries;
    push({ layer: "judge", speaker: system.judge.name, kind: "verdict", text: verdict.reason, round: tries, state: { accept, tries, minTries: config.minTries, maxTries: config.maxTries }, ...usage(answer) });
    if (accept) return { reason: `the judge accepted on try ${tries}`, tries, accepted: true };
  }
  return { reason: `hard maximum of ${config.maxTries} tries reached`, tries: config.maxTries, accepted: false };
}

// A loop whose judge is code: one guess at a time, each checked against the hidden answer, stopping the moment one is
// right (minTries still applies if a system sets it above 1). The answer is never in any agent's prompt.
async function guessLoop(system, config, { ask, push, usage, events, names }) {
  const judge = system.judge?.name || "The judge";
  const format = "Reply in these labelled lines and nothing else:\nGUESS: <one guess, a word or two>\nSAY: <optional: one short sentence, in your voice>";
  let n = 0;
  for (let tries = 1; tries <= config.maxTries; tries++) {
    for (const who of system.cast) {
      if (n >= config.maxTries) break;
      n++;
      const answer = await ask(who, { system: characterPrompt(system, config, who, names, format), user: `The guesses so far, and what the judge said:\n${sceneSoFar(events, { self: who.name })}\n\nGuess ${n} of at most ${config.maxTries}. One guess.` }, 1200);
      const { guess, say } = parseGuess(answer.text);
      push({ layer: "cast", speaker: who.name, kind: "line", to: ["everyone"], text: say ? `${guess}. ${say}` : guess, round: n, state: { guess }, ...usage(answer) });
      const right = matches(guess, config.answer);
      const accept = right && n >= config.minTries;
      push({ layer: "judge", speaker: judge, kind: "verdict", text: right ? (accept ? `Yes: ${guess}.` : `Right, but this game needs at least ${config.minTries} guesses.`) : `No, not ${guess}.`, round: n, state: { accept, tries: n, guess, minTries: config.minTries, maxTries: config.maxTries, byCode: true } });
      if (accept) return { reason: `guessed right on guess ${n}`, tries: n, accepted: true };
    }
  }
  return { reason: `hard maximum of ${config.maxTries} guesses reached`, tries: n, accepted: false };
}

// ---- switch ----------------------------------------------------------------------------------------------------

async function runSwitch(system, config, { ask, record, usage }) {
  const branches = system.router?.data?.branches?.length ? system.router.data.branches.map(String) : system.branches.map((b) => b.name);
  if (!system.router || system.branches.length < 2) throw new Error("A switch needs a router.md and two files in branches/.");
  const input = String(config.input || "").trim();
  if (!input) throw new Error("Nothing to route: give the switch an input.");
  record({ layer: "system", speaker: "input", kind: "input", text: input });
  const menu = system.branches.map((b) => `- ${b.name}: ${b.data.description || b.body.split("\n")[0]}`).join("\n");
  const routeFormat = `BRANCH: <exactly one of: ${branches.join(", ")}>\nREASON: <one sentence>`;
  const answer = await ask(system.router, { system: agentPrompt(system, system.router, "router", routeFormat) + `\n\n## The branches\n${menu}`, user: input }, 800);
  const route = parseRoute(answer.text, branches);
  record({ layer: "router", speaker: system.router.name, kind: "route", to: [route.branch], text: route.reason, state: { branch: route.branch, branches }, ...usage(answer) });
  const branch = system.branches.find((b) => b.name.toLowerCase() === route.branch.toLowerCase()) || system.branches[0];
  const hidden = config.answer !== null && config.answer !== undefined && config.answer !== "";
  const guessing = hidden || Boolean(system.judge);
  const branchFormat = guessing ? "Reply in these labelled lines and nothing else:\nGUESS: <one answer, a word or two>\nWHY: <one sentence>" : "Reply in your own voice, briefly: no more than about 150 words.";
  const reply = await ask(branch, { system: agentPrompt(system, branch, "branch", branchFormat), user: input }, 1500);
  const { guess, why } = parseGuess(reply.text);
  record({ layer: "branch", speaker: branch.name, kind: "reply", text: guessing ? `${guess}${why ? `. ${why}` : ""}` : reply.text.trim(), state: { branch: branch.name, guess: guessing ? guess : null }, ...usage(reply) });
  if (!guessing) return { reason: `routed to ${branch.name}`, branch: branch.name };

  // The final judge: code against the hidden answer, or a judge.md reading the input and the guess.
  let accept;
  let reason;
  if (hidden) {
    accept = matches(guess, config.answer);
    reason = accept ? `Yes: ${guess}.` : `No: ${guess} isn't it.`;
    record({ layer: "judge", speaker: system.judge?.name || "The judge", kind: "verdict", text: reason, state: { accept, guess, byCode: true } });
  } else {
    const verdict = await ask(system.judge, { system: agentPrompt(system, system.judge, "judge", "VERDICT: ACCEPT or REJECT\nREASON: <one sentence>"), user: `The input: ${input}\n\n${branch.name}'s answer: ${guess}${why ? ` (${why})` : ""}` }, 1000);
    ({ accept, reason } = { ...parseVerdict(verdict.text), reason: parseVerdict(verdict.text).reason });
    record({ layer: "judge", speaker: system.judge.name, kind: "verdict", text: reason, state: { accept, guess }, ...usage(verdict) });
  }
  return { reason: `routed to ${branch.name}, who guessed ${guess}: ${accept ? "right" : "wrong"}`, branch: branch.name, accepted: accept };
}

// ---- cast ------------------------------------------------------------------------------------------------------

async function runCast(system, config, { ask, record, usage, state }) {
  if (!system.cast.length) throw new Error("A cast needs at least one file in cast/.");
  let alive = system.cast.map((c) => c.name);
  const byName = new Map(system.cast.map((c) => [c.name, c]));
  const all = () => state.events;
  let lastNotes = "";

  const observe = async (round) => {
    const notes = await Promise.all(system.observers.map(async (who) => {
      const answer = await ask(who, { system: agentPrompt(system, who, "observer", "Write your notes in Markdown, briefly (under 200 words). You only watch: nothing you write reaches the scene."), user: `Everything so far, including the private asides and votes:${controlRoom(system)}\n\n${sceneSoFar(all(), { everything: true })}` }, 1500);
      return { who, answer };
    }));
    for (const { who, answer } of notes) record({ layer: "observer", speaker: who.name, kind: "observation", text: answer.text.trim(), round, ...usage(answer) });
    lastNotes = notes.map(({ who, answer }) => `${who.name}: ${answer.text.trim()}`).join("\n\n");
  };

  let round = 0;
  let spoken = 0;
  const total = config.speeches > 0 ? config.speeches : null;
  for (round = 1; round <= config.turns; round++) {
    for (const name of [...alive]) {
      if (!alive.includes(name)) continue;
      if (total && spoken >= total) break;
      const who = byName.get(name);
      const when = total ? `Speech ${spoken + 1} of ${total} in all.` : `Round ${round} of ${config.turns}.`;
      const answer = await ask(who, { system: characterPrompt(system, config, who, alive), user: `The scene so far:\n${sceneSoFar(all(), { self: name })}\n\n${when} Your turn.` }, 1500);
      const line = parseLine(answer.text, alive);
      spoken++;
      record({ layer: "cast", speaker: name, kind: "line", to: line.to, text: line.say, round, turn: spoken, ...usage(answer) });
      if (config.confessionals && line.aside) record({ layer: "cast", speaker: name, kind: "aside", to: ["camera"], text: line.aside, round, turn: spoken, state: { label: config.asideLabel } });
    }
    if (total && spoken >= total) break;

    if (system.director) {
      const format = "GOAL: REACHED or NOT YET\nREASON: <one sentence>\nNOTE: <optional: one short note to the cast for the next round>";
      const answer = await ask(system.director, { system: agentPrompt(system, system.director, "director", format), user: `The scene so far:\n${sceneSoFar(all())}\n\nRound ${round} of ${config.turns} is over. Has the goal been reached?` }, 1000);
      const goal = parseGoal(answer.text);
      record({ layer: "director", speaker: system.director.name, kind: "goal", text: goal.reason, round, state: { reached: goal.reached }, ...usage(answer) });
      if (goal.reached) {
        if (system.observers.length) await observe(round);
        return { reason: `the director called it: goal reached in round ${round}`, rounds: round, reached: true, alive };
      }
      if (goal.note && round < config.turns) record({ layer: "director", speaker: system.director.name, kind: "note", to: ["everyone"], text: goal.note, round });
    }

    if (system.observers.length && config.observersEvery > 0 && round % config.observersEvery === 0 && round < config.turns) await observe(round);

    if (system.producers.length && round % config.producersEvery === 0 && round < config.turns) {
      for (const who of system.producers) {
        // A producer's file can limit what it may do (`actions: [vote]`) and when (`rounds: [2]`).
        if (Array.isArray(who.data.rounds) && !who.data.rounds.map(Number).includes(round)) continue;
        const allowed = Array.isArray(who.data.actions) && who.data.actions.length ? who.data.actions.map((a) => String(a).toLowerCase()) : ["twist", "challenge", "vote", "eliminate", "none"];
        const format = `ACTION: ${allowed.join(" | ")}${allowed.includes("eliminate") ? "\nTARGET: <a character's name, only for eliminate>" : ""}\nTEXT: <the announcement the cast hears, one to three sentences>`;
        const ratings = config.ratingsLoop && lastNotes ? `\n\nThe observers' latest notes (the ratings):\n${lastNotes}` : "";
        const answer = await ask(who, { system: agentPrompt(system, who, "producer", format), user: `Still in the game: ${alive.join(", ")}.${controlRoom(system)}\n\nEverything so far, including the private asides:\n${sceneSoFar(all(), { everything: true })}${ratings}\n\nRound ${round} of ${config.turns} is over. What do you do?` }, 1000);
        const action = parseAction(answer.text, alive);
        if (!allowed.includes(action.action)) {
          record({ layer: "producer", speaker: who.name, kind: "pass", text: `Chose ${action.action}, which this producer isn't allowed to do (only ${allowed.join(", ")}).`, round, ...usage(answer) });
          continue;
        }
        if (action.action === "none") {
          record({ layer: "producer", speaker: who.name, kind: "pass", text: action.text || "(no action)", round, ...usage(answer) });
          continue;
        }
        if ((action.action === "eliminate" || action.action === "vote") && alive.length <= 2) {
          record({ layer: "producer", speaker: who.name, kind: "pass", text: `Wanted to ${action.action}, but only ${alive.length} are left.`, round, ...usage(answer) });
          continue;
        }
        if (action.action === "vote") {
          record({ layer: "producer", speaker: who.name, kind: "vote-call", to: ["everyone"], text: action.text || "The producers have called a vote.", round, ...usage(answer) });
          const tally = {};
          for (const name of alive) {
            const voter = byName.get(name);
            const question = config.voteQuestion || "The producers have called a vote. In private, name one person still in the game to send home.";
            const vote = await ask(voter, { system: characterPrompt(system, config, voter, alive), user: `The scene so far:\n${sceneSoFar(all(), { self: name })}\n\n${question}\nYou may vote for: ${alive.filter((n) => n !== name).join(", ")}. Use only what you have seen and heard.\nReply:\nVOTE: <one name>\nWHY: <one sentence, to the camera>` }, 800);
            const parsed = parseVote(vote.text, alive, name);
            if (parsed.target) tally[parsed.target] = (tally[parsed.target] || 0) + 1;
            record({ layer: "cast", speaker: name, kind: "vote", to: parsed.target ? [parsed.target] : null, text: parsed.why, round, state: { target: parsed.target }, ...usage(vote) });
          }
          // The most votes goes; a tie sends nobody home. A banishment can reveal the true role, from the files.
          const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
          const cast = Object.values(tally).reduce((a, b) => a + b, 0);
          if (ranked.length && (ranked.length === 1 || ranked[0][1] > ranked[1][1])) {
            const out = ranked[0][0];
            alive = alive.filter((n) => n !== out);
            const role = config.revealOnBanish ? roleOf(system, byName.get(out))?.name || null : null;
            record({ layer: "producer", speaker: who.name, kind: "eliminate", to: [out], text: `${out} is voted out (${tally[out]} of ${cast} votes).${role ? ` ${out}'s true role: ${role}.` : ""}`, round, state: { eliminated: out, tally, alive, role } });
          } else {
            record({ layer: "producer", speaker: who.name, kind: "tie", to: ["everyone"], text: ranked.length ? `A tie (${ranked.filter(([, n]) => n === ranked[0][1]).map(([n]) => n).join(", ")}): nobody goes home.` : "No valid votes: nobody goes home.", round, state: { tally } });
          }
          continue;
        }
        if (action.action === "eliminate") {
          if (!action.target) {
            record({ layer: "producer", speaker: who.name, kind: "pass", text: `Tried to eliminate, but named nobody in the game. ${action.text}`, round, ...usage(answer) });
            continue;
          }
          alive = alive.filter((n) => n !== action.target);
          record({ layer: "producer", speaker: who.name, kind: "eliminate", to: [action.target], text: action.text || `${action.target} is out.`, round, state: { eliminated: action.target, alive }, ...usage(answer) });
          continue;
        }
        record({ layer: "producer", speaker: who.name, kind: action.action, to: ["everyone"], text: action.text, round, ...usage(answer) });
      }
    }
  }
  if (system.observers.length) await observe(Math.min(round, config.turns));
  if (total) return { reason: `all ${spoken} speeches given`, rounds: Math.min(round, config.turns), speeches: spoken, reached: false, alive };
  return { reason: system.director ? `all ${config.turns} rounds played; the goal was not reached` : `all ${config.turns} rounds played`, rounds: config.turns, reached: false, alive };
}
