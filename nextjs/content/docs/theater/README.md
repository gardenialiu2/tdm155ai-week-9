---
title: The Theater of agents
description: Design a system of agents as a play, run it on your own key, then read the log and the dashboard.
author: claude
order: 4
---

The Theater is a small stage for systems of agents. You write the parts in plain Markdown files: a premise, a cast of characters, and, if you want them, a judge, a router, a director, producers, and observers. The Theater runs them, one model call at a time, and writes down every line in a log. Then you open the dashboard and read what your system actually did: who spoke to whom, what they said in private, what it cost, and where it went off script.

You are the designer. Claude Code is your stagehand: it can copy a preset, change files, and add features to the app when you ask. You are graded on the creativity of the system you design, not on code.

The sequence below, the presets, and these docs are Claude's design for the November 4 class, not a report of how the class went.

## The sequence

| Step | What you do | The primitive | Read | Preset |
|---|---|---|---|---|
| 0a | One agent tries; a judge accepts or rejects; it tries again (at least 3 tries, a hard maximum) | **loop** | [The loop](/docs/theater/01-the-loop) | `systems/01-taboo` |
| 0b | A router reads the input and picks one of two branches | **switch** (a 3-node graph) | [The switch](/docs/theater/02-the-switch) | `systems/02-stage-door` |
| 1 | Write a cast of characters; each takes 10 turns, in order | **round-robin** | [The cast](/docs/theater/03-the-cast) | `systems/03-dinner-party` |
| 2 | Give the story a goal; a director checks it after every round | **goal** | [A goal](/docs/theater/05-a-goal) | `systems/04-the-heist` |
| 3 | Add producers who change the game: twists, challenges, votes, eliminations, confessionals; or run a game-theory simulation | **producers** (a system that writes into the cast) | [The producers](/docs/theater/06-the-producers) | `systems/05-the-villa`, `systems/06-werewolf` |
| 4 | Make something of your own | **any combination** | [Make your own](/docs/theater/08-make-your-own) | your folder |
| 5 | Add observers who read the log and write notes for the dashboard | **observer** (read-only) | [The observers](/docs/theater/07-the-observers) | `systems/05-the-villa`, `systems/06-werewolf` |

Every step adds one idea. After each run, read [the log and the dashboard](/docs/theater/04-the-log-and-dashboard). The full file format is in [the system format](/docs/theater/09-system-format).

## A graph of graphs

By step 5 your show is three systems stacked on each other:

1. **The cast** (system 1): the characters, taking turns, talking to each other.
2. **The producers** (system 2): agents who watch the cast and write into it, with twists, challenges, votes, and eliminations. They change what the cast does next.
3. **The observers** (system 3): agents who only read. A chorus, a critic, an inspector. They write notes for you, on the dashboard, and never speak to the cast.

Arrows point one way: producers write into the cast, observers read from it. With the optional **ratings loop** turned on, the producers also read the observers' latest notes, so the critic's review of episode two shapes the twist in episode three. That one arrow makes the whole thing a loop again.

## Caps: it always stops

A system of agents can run forever and spend money while it does. Every run in the Theater has three stops:

- **A turn limit.** `turns` per character in a cast, `maxTries` in a loop.
- **A cost ceiling.** `costCeiling` in `system.md`, in US dollars (default $0.50). The run stops when it is spent. The dashboard shows the running cost.
- **The Stop button.** On `/theater`, while a run is live. Use it whenever the show has made its point.

## How to run it

1. Put your OpenRouter key in the `.env` file at the root of this repository: `OPENROUTER_API_KEY=...` (copy `.env.example` if there is no `.env`). Never share it or paste it into a chat.
2. In a terminal, from the repository root: `cd nextjs`
3. `pnpm install` (the first time only)
4. `pnpm dev`
5. Open http://localhost:3000/theater, pick a system, and press Run.

Saved runs are at `/theater/runs`. Any `.jsonl` log, yours or a classmate's, can be dropped into `/theater/view`.

## What to ask Claude Code for

You design; Claude Code builds. Some requests that work well:

- "Copy `systems/03-dinner-party` to `systems/my-show` and change the cast to the five people in this description: ..."
- "Add a producer to `systems/my-show` who calls a challenge every second round. Keep it in the reply format."
- "Write an observer that counts how often each character mentions money, and reports it as a table."
- "My characters all sound the same. Read `systems/my-show/cast/` and make their voices more distinct, without changing their secrets."
- "Open my last run's log and tell me which character spoke to whom most."
- "Add a chart to the dashboard that shows each character's number of asides per round."

Ask Claude Code to explain what it changed, and read the files it wrote: they are your script.
