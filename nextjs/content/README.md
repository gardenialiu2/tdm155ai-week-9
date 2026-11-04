---
title: Agents and systems
description: TDM 155AI, week 9 · November 4, 2026 · Agents, systems, orchestration. Unit 3 begins.
author: claude
print_set: [docs/theater, docs/theater/01-the-loop, docs/theater/02-the-switch, docs/theater/03-the-cast, docs/theater/09-system-format, docs/what-an-agent-is]
---

## Today: agents, systems, orchestration

October was about making one thing. Unit 3 is about going beyond the single piece, by building a system that works for you. Today the system is a theater of agents: an ensemble of characters you design, talking to each other, that you let run and then inspect. Directing, producing, and choreography are in the background: you're the director and the producer, and the agents are your company.

The steps, each adding one idea:

1. **The loop.** One agent tries until a judge accepts: at least three tries, never more than a cap. ([Taboo](/theater?system=01-taboo))
2. **The graph.** Three nodes and a switch: a router sends the input down one of two branches. ([The stage door](/theater?system=02-stage-door))
3. **The cast.** Characters you write (a voice, wants, secrets) take ten turns each. ([The dinner party](/theater?system=03-dinner-party))
4. **A goal.** A director checks after every round whether the story got where it was going. ([The heist](/theater?system=04-the-heist))
5. **The producers.** A second system that writes into the first: twists, challenges, votes, eliminations, confessionals. A reality show, or a game-theory simulation. ([The villa](/theater?system=05-the-villa), [Werewolf](/theater?system=06-werewolf))
6. **Your own.** Something creative: fork a folder and make it yours.
7. **The observers.** When the system gets too hard to follow, agents that only watch: a chorus, a critic, an inspector, writing notes for the dashboard.

Cast, producers, observers: three systems stacked on each other, a graph of graphs. You're graded on the creativity of what you design, not on code: you design, and Claude Code builds. Every run leaves a log, one line per event, and the dashboard turns any log into a script, a timeline, who addressed whom, and the running cost. Print it and mark it up.

## The one idea

An agent is not a smarter chatbot. It is a model plus **what it's told** (its instructions), **what it can see** (the files and messages it's given), and **what it can do** (write a card, search the web, call another agent). Change any of the three and you have a different agent. A system of agents is a set of these with the wiring between them: who reads what, in what order, and where a person steps in. The wiring is the design. What an agent must *not* see is part of the design too.

## On this site

- **[Theater](/theater):** pick a system, rehearse it for free, run it, stop it, and read its dashboard. Systems are folders in `systems/` at the repo root; [the Theater docs](/docs/theater) explain each step and [the format](/docs/theater/09-system-format).
- **[Runs](/theater/runs):** every run on this computer; [View a log](/theater/view) opens anyone's `.jsonl`.
- **[Docs](/docs):** the Theater, what an agent is, and the ensemble on paper.
- **[Ensemble](/ensemble):** a worked example of a fixed graph: four roles read a context repository and brief a podcast host, with a person approving each step. [Remix](/remix) is your copy to change.

## For Friday and next week

The First Project package is due Friday, November 6: the finished piece and your context repository. The week after, you record the podcast hour with two classmates. The host prepares from the guest's repository. This week's ensemble is one way to do that preparation; the host still decides what to ask.
