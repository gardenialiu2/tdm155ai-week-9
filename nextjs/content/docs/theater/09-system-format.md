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

## system.md

The frontmatter holds the settings; the body is the premise or scene, given to every agent.

```yaml
---
title: Taboo
description: one line
kind: loop            # loop | switch | cast
model: anthropic/claude-haiku-5.5   # optional, default Haiku 5.5
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

On `vote`, every remaining character votes privately (as an aside) and the most-voted character is eliminated.

## `observers/` (cast, optional)

Frontmatter `name:`. The body says what to watch for. An observer reads the whole log so far and replies with free notes in Markdown, shown on the dashboard. Observers never write into the cast. With `ratingsLoop: true`, producers see the observers' latest notes.

## The log

Each run writes `runs/<system>/<runid>.jsonl`, one JSON object per line:

```
{ t, seq, run, layer, speaker, kind, to, text, state, tokens: {in, out}, cost, round, turn }
```

| Field | Values |
|---|---|
| `layer` | system, cast, judge, router, branch, director, producer, observer |
| `kind` | start, line, aside, verdict, route, reply, goal, note, twist, challenge, vote, eliminate, observation, stop, error |

`t` is the time, `seq` the event's number in the run, `run` the run id, `cost` in US dollars, `tokens` the tokens in and out of that model call.

## Caps

Every run stops at the first of: the turn cap (`turns` per character, or `maxTries`), the goal (a director's REACHED or a judge's ACCEPT), the cost ceiling (`costCeiling`), or the Stop button.
