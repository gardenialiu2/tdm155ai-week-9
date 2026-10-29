---
title: What an agent is
description: A model, what it's told, what it can see, what it can do, and the wiring between several of them.
author: claude
order: 2
---

## Four parts

Take any chatbot and add three things and you have an agent:

1. **Instructions.** A standing brief: who it is, what it's for, what it must and must not do. In the ensemble this is each role's system prompt, and you can read and change all four under *What each role is told*.
2. **What it can see.** The files, messages, and earlier cards it's given. An agent has no memory of your repository beyond what's put in front of it for this call. Give it a different set of files and it's a different agent.
3. **What it can do.** Write a card. Search the web (the Researcher). Call a tool. Call another agent. The more it can do, the more the wiring matters.
4. **The loop.** Something runs it again: a person pressing a button, a schedule, a message arriving in Slack, another agent finishing. In the ensemble the loop is you.

The month's context repository is the second of these. **Context documents constitute agents**: the README you wrote for Friday is, read one way, the first half of an agent's brief.

## Several at once

A system of agents is several of these with wiring: who reads whose output, in what order, and where a person steps in. The ensemble is the smallest interesting case: a planner that sees names but not contents, a reader, a looker-up that sees the reader's summary but not the originals, a writer that sees both summaries and a few originals. Four different views of one repository. The briefing is only as good as the wiring.

Two directions the wiring can go, and this unit takes both:

- **Agents that help the work.** The ensemble, a research desk, a producer in your ear. The output is for you.
- **Agents as the work.** A dramaturg that hands a screenwriter a scene brief; a system that writes a different program note for every visitor. The output is the piece. Next week, and the installation weeks, go here.

## What's hidden, and what to make visible

"Open the black box" can mean four different things, and it helps to say which:

| Hidden | In the ensemble | Made visible by |
| --- | --- | --- |
| **Implementation**: how the model computes | the model behind each call | not available; pick the model and move on |
| **Workflow**: the sequence of steps | who ran when, with what | the trace |
| **Judgment**: why one thing and not another | why the Briefer picked those six questions | asking, and checking against the files |
| **Infrastructure and labor**: what and who made it possible | OpenRouter, the Exa search, the student who wrote the files | the request body; the credits |

The trace makes the workflow visible, not the judgment. Marking up the trace on paper is how you get at the judgment.

## What an agent must not know

Every file you give an agent goes somewhere: to a model, through a provider, into a log. The ensemble runs locally and sends only what you allow, but the design question is yours before it's the software's. A context repository holds things about other people. The **Withheld** envelope on paper and the **Allowed** column on the screen are the same decision: privacy is designed in at the moment you decide what an agent can see, or it isn't designed in at all.
