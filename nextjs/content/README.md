---
title: Agents and systems
description: TDM 155AI, week 9 · November 4, 2026 · Agents and systems. Unit 3 begins.
author: claude
print_set: [docs/paper-ensemble, docs/what-an-agent-is]
---

## This week

October was about making one thing: find the material, arrange it, edit it, deliver it, and say out loud what you did. Unit 3 is about going beyond the single piece: getting more done, and more kinds of things done, than one person could, by building a system that works for you. This week the system is a small ensemble of AI agents.

The repository you're assembling for Friday is the archive. An agent is something that reads an archive and acts. So the first system you build reads your own repository, or your podcast guest's, and prepares the host for next week's interview. You run it twice: once on paper, with people as the agents, and once on the screen.

## The one idea

An agent is not a smarter chatbot. It is a model plus **what it's told** (its instructions), **what it can see** (the files and messages it's given), and **what it can do** (write a card, search the web, call another agent). Change any of the three and you have a different agent. A system of agents is a set of these with the wiring between them: who reads what, in what order, and where a person steps in. The wiring is the design. What an agent must *not* see is part of the design too.

## On this site

- **[Docs](/docs):** the paper version of the ensemble, what an agent is, and how the screen version works.
- **[Ensemble](/ensemble):** four roles read a context repository and brief a podcast host. You decide who reads what, and the whole run comes out as a trace you can print and mark up.
- **[Remix](/remix):** your own copy of the ensemble. Change the roles, what each is told, what it reads, what comes out. The code is in `nextjs/app/remix/`.

## For Friday and next week

The First Project package is due Friday, November 6: the finished piece and your context repository. The week after, you record the podcast hour with two classmates. The host prepares from the guest's repository. This week's ensemble is one way to do that preparation; the host still decides what to ask.
