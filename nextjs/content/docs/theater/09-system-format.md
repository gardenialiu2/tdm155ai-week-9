---
title: The system format
description: Every file and setting a Theater system can have, and the reply format each kind of agent uses.
author: claude
order: 9
---

A system is a folder at the repository root, `systems/<name>/`. Every file in it is Markdown with YAML frontmatter (the block between `---` lines at the top). Which files it needs depends on its `kind`.

| File | Kinds | What it is |
|---|---|---|
| `system.md` | all | settings, and the premise every agent is given |
| `cast/<file>.md` | all | one character per file |
| `judge.md` | loop | decides whether a try succeeds |
| `router.md` | switch | picks a branch |
| `branches/<name>.md` | switch | one agent per branch |
| `director.md` | cast (optional) | checks the narrative goal after every round |
| `producers/<file>.md` | cast (optional) | change the game: twists, challenges, votes, eliminations |
| `observers/<file>.md` | cast (optional) | read the log and write notes for the dashboard |
| `roles/<role>.md` | cast (optional) | a secret role (`traitor`, `faithful`): told only to the characters who have it |
| `README.md` | all (optional) | "How it works", shown beside the system on the Systems page |
| `prompt.md` | all (optional) | a prompt to copy into Claude Code, shown with Copy buttons |

## system.md

The frontmatter holds the settings; the body is the premise or scene, given to every agent.

```yaml
---
title: Taboo
description: one line
kind: loop            # loop | switch | cast
model: anthropic/claude-sonnet-5.5   # optional, default Sonnet 5.5
costCeiling: 0.25     # USD; the run stops when spent (default 0.50)
# loop only
minTries: 3           # the judge is told it may not accept before this try
maxTries: 8           # hard maximum
# switch only
input: "default text that goes into the router"
# cast only
turns: 10             # turns per character (default 10)
confessionals: true   # characters may add a private ASIDE each turn
producersEvery: 2     # producers act after every N rounds (default 1)
observersEvery: 0     # 0 = observers only at the end
ratingsLoop: false    # producers see the observers' latest notes
---
```

## `cast/` (one file per character)

One character per file. Files act in alphabetical order, so prefix them `01-`, `02-` .... In a loop system the cast files act in order on each try.

```markdown
---
name: Vivian
voice: Polished, quiet, polite to a fault.
---

Who she is, in a line or two.

## Wants

- ...

## Secrets

- ...
```

`## Wants` and `## Secrets` are free Markdown; more sections are fine. A character replies:

```
TO: <a name, or everyone>
SAY: <the public line>
ASIDE: <optional: private, to the camera; only when confessionals is on>
```

## judge.md (loop)

Frontmatter `name:`. The body says what counts as success. The judge replies:

```
VERDICT: ACCEPT        (or VERDICT: REJECT)
REASON: ...
```

## router.md and branches/ (switch)

`router.md` has frontmatter `name:` and `branches: [a, b]`, the names of the files in `branches/` (`branches/a.md`, `branches/b.md`). Its body says how to choose. The router replies:

```
BRANCH: <name>
REASON: ...
```

Each branch file has frontmatter `name:`; its body is that agent's instructions. It receives the input and replies freely.

## director.md (cast, optional)

Frontmatter `name:`. The body is the narrative goal. After every round the director replies:

```
GOAL: REACHED          (or GOAL: NOT YET)
REASON: ...
NOTE: ...              (optional: a note the cast sees next round)
```

The run stops when the goal is REACHED, or at the turn cap.

## `producers/` (cast, optional)

Frontmatter `name:`. The body is the producer's job and style. Every `producersEvery` rounds, each producer replies:

```
ACTION: twist | challenge | vote | eliminate | none
TARGET: <character name>   (eliminate only)
TEXT: <the announcement the cast hears>
```

On `vote`, the Theater asks every remaining character in private for `VOTE: <name>` and `WHY: <one sentence>` (nobody can vote for themselves); the most-voted character is eliminated (a tie goes to whoever reached the top first). Eliminated characters stop taking turns. Votes and eliminations need at least three characters left.

## `observers/` (cast, optional)

Frontmatter `name:`. The body says what to watch for. An observer reads the whole log so far and replies with free notes in Markdown, shown on the dashboard. Observers never write into the cast. With `ratingsLoop: true`, producers see the observers' latest notes.

## Added November 4: hidden answers, speeches, secret roles

These are the settings the three starters use (`00-favorite-color`, `09-rushmore`, `10-divine-villa`).

- **`answer:`** in `system.md` (loop or graph): the judge is code. Each guess (a `GUESS:` line) is checked against the answer, ignoring capitals and punctuation, and the run stops the moment one is right. The answer is in no agent's prompt; `judge.md` is optional and gives the judge its name.
- **`kind: graph`**: a switch with a final judge. The router picks one branch, the branch replies with `GUESS:` and `WHY:`, and the judge (code with `answer:`, or a `judge.md`) says right or wrong.
- **`speeches:`** in a cast's `system.md`: the total number of speeches, not rounds (`speeches: 20` with four characters is five each). Each line in the log carries its number in `turn`.
- **`asideLabel: ITM`**: the private line is called an ITM (an in-the-moment interview to camera) instead of an ASIDE. Each character sees only its own.
- **`role:`** in a cast file names a file in `roles/`. The character is told that role and nobody else's; `knowEachOther: true` in the role file also tells its members who the others are; `count:` must match the number of cast files with that role, or the run won't start. Producers and observers see the role list (the "control room"); the cast never does.
- **`actions:`** and **`rounds:`** in a producer's file limit what it may do and when (`actions: [vote]`, `rounds: [2]`). Anything else it tries is logged as a pass.
- **`voteQuestion:`** is what the cast is asked at a vote; **`revealOnBanish: true`** announces the banished player's true role, from the files, not from a model.
- **Votes:** each player votes in private, only for someone else still in the game. The most votes goes; a tie, or no valid votes, sends nobody home.
- **`featured:`** puts a system among the starters (1, 2, 3, in order) at the top of the Systems page; everything else is listed below them, folded.

## The log

Each run writes `runs/<system>/<runid>.jsonl`, one JSON object per line:

```
{ t, seq, run, layer, speaker, kind, to, text, state, tokens: {in, out}, cost, round, turn }
```

| Field | Values |
|---|---|
| `layer` | system, cast, judge, router, branch, director, producer, observer |
| `kind` | start, input, line, aside, verdict, route, reply, goal, note, twist, challenge, vote-call, vote, eliminate, tie, pass, observation, stop, error |

`t` is the time, `seq` the event's number in the run, `run` the run id (`<system>~<runid>`, the same as the file name), `prompt` what the agent was given (`{system, user}`), `cost` in US dollars, `tokens` the tokens in and out of that model call.

## Caps

Every run stops at the first of: the turn cap (`turns` per character, or `maxTries`), the goal (a director's REACHED or a judge's ACCEPT), the cost ceiling (`costCeiling`), or the Stop button.

## The order of a round (cast)

1. Every character still in the game speaks, in file order (`TO` / `SAY` / `ASIDE`).
2. The director, if there is one, checks the goal. REACHED ends the run; its NOTE reaches the cast next round.
3. The observers take notes, if `observersEvery` says this round (and always at the end).
4. The producers act, in file order, one action each, if `producersEvery` says this round (never after the last round). With `ratingsLoop`, they see the observers' latest notes, so set `observersEvery` too.

In a loop, each try is: every cast file in order, then the judge. Everyone in the next try sees the judge's REASON for the last one (the evaluator-optimizer loop).

## Rehearse before you run

*Rehearse* on the Theater page runs the whole system with stand-in replies: no model, no key, no cost. It shows the wiring (who speaks when, where the switch goes, when the producers and observers act) and fills the dashboard, so you can check a new system's shape before you spend anything on it.
