---
title: "Reading path: what to read for each step of class 9"
description: "Two or three readings for each step of the class sequence, from a single loop to observers feeding a dashboard, drawn from the glossary, notes, libraries, and documentation in this folder."
author: claude (RS research pane, TDM 155AI week 9)
date: 2026-11-04
status: draft; agent research, check before citing
order: 1
---

# Reading path

The class builds up a theater of agents one step at a time. For each step: the glossary terms to know, one or two things to read in this folder, and one primary source or official page from outside it. Everything here is agent research, checked on November 4, 2026; the files themselves mark what was verified.

## Step 0a: a loop

- **Terms:** Agent, Augmented LLM, Loop, Stop condition, Cap, in the [glossary](glossary.md).
- **Read:** "Building effective agents" and ReAct, the first two entries under "Start here" in [Papers and essays](documentation/papers-and-essays.md).
- **Look at:** the Claude Messages API card (tool use and the tool runner) or the Vercel AI SDK card (its default step limit) in the [catalog](documentation/catalog.md). Open the "Agent loop / architecture" link and find where the loop stops.

## Step 0b: a 3-node graph with a switch

- **Terms:** Graph, Node, Edge, Router (switch), State, Workflow vs. agent.
- **Read:** the routing pattern in "Building effective agents"; the LangGraph card in the [catalog](documentation/catalog.md), especially its link on conditional edges and interrupts.
- **Ask:** which edge does the model choose, and which does your code choose?

## Step 1: an ensemble, ten turns each

- **Terms:** Ensemble, Persona, Turn-taking, Event log, Conformity, Persona drift.
- **Read:** pick a cast from [Ensembles](libraries/ensembles.md) and use its persona seeds. Then read "Conversation failures" and the table "Failures in a ten-turn ensemble" in [note 07](notes/07-how-ensembles-fail-and-how-to-watch-them.md), so you know what to look for when everyone starts agreeing.
- **Primary source:** *Generative Agents* (Park et al., 2023), in [Papers and essays](documentation/papers-and-essays.md) and [note 02](notes/02-simulations-of-people.md).

## Step 2: a narrative goal, checked by a director

- **Terms:** Director, Drama manager, Beat, Tension arc, Intervention and accommodation, Commander's intent.
- **Read:** [note 06](notes/06-drama-managers-and-interactive-narrative.md), especially IBSEN's director (check milestones every turn, with a minimum before acting and a cap that forces the milestone) and "What it lends to a theater of agents." Then the judge biases in [note 07](notes/07-how-ensembles-fail-and-how-to-watch-them.md), because a director that checks a goal is a judge.
- **Human practice:** Zorn's *Cobra* in [note 04](notes/04-choreography-scores-and-conducting.md) (a prompter who decides when and with whom, never what), and the commedia scenario and the Joker in note 06.

## Step 3: reality-show mechanics, or a simulation of people

- **Terms:** Producer, Confessional, Moderator, and the glossary sections "Producers and game masters" and "Simulations of people."
- **Read:** [Formats and mechanics](libraries/formats-and-mechanics.md) for rules an agent can follow (vote, elimination, alliance, twist, producer intervention), then [note 03](notes/03-reality-tv-and-game-masters.md) for how producers actually work, including the case against frankenbiting. For a simulation, [note 02](notes/02-simulations-of-people.md): the scoring rule decides who wins.
- **Try:** one row of "Combining them" at the end of Formats and mechanics.

## Step 4: something of your own

- **Read:** [Libraries](libraries/README.md): same cast, different rules, or same rules, different cast. For other models of who decides, [note 05](notes/05-labs-startups-and-coaches.md) (the coach's timeouts as a budget for human intervention) and the Lab's *Orchestration across industries* essays.
- **Pick a tool:** the [documentation index](documentation/README.md) and its "Start here" list. Check a card's status line before you build on it.

## Step 5: observers feeding a dashboard

- **Terms:** Observer, Event log, Graph of graphs, Span, Coding scheme, Inter-rater reliability, Position bias, Self-preference bias.
- **Read:** "A minimal event log and dashboard (proposal)" in [note 07](notes/07-how-ensembles-fail-and-how-to-watch-them.md): one row per turn and eight counts worth showing. Then the story producer and the string-out in [note 03](notes/03-reality-tv-and-game-masters.md), and the film session in [note 05](notes/05-labs-startups-and-coaches.md), for observers that work after the fact.
- **Rule worth keeping:** observers quote only whole turns, by ID (note 03).

## For the teacher

- [History](documentation/history.md): how agent APIs changed, and why OpenAI retired the Assistants API, in its own words.
- [Note 01](notes/01-agent-products-as-of-nov-4.md) and the "Agent products people encounter" section of the [catalog](documentation/catalog.md): the always-on consumer agents students may already use.
- The [documentation README](documentation/README.md) lists where the catalog corrects note 01.
