---
title: "Step 0a: the loop"
description: One agent tries, a judge accepts or rejects, and it tries again until it is accepted or out of tries.
author: claude
order: 1
---

## What it shows

The smallest system that is more than one call: an agent makes an attempt, a second agent (the judge) decides whether it is good enough, and if it is not, the first agent tries again with the judge's reason in front of it. The judge may not accept before try `minTries`, and the run stops at `maxTries` whatever happens.

Anthropic's essay ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (December 2024) calls this pattern the **evaluator-optimizer** workflow: one model generates, another evaluates and gives feedback, in a loop. The same essay separates **workflows**, where the path through the models is fixed in advance, from **agents**, which choose their own path. The loop is a workflow: you decided its shape.

## Open

`systems/01-taboo/`. Read `system.md` (the premise and the `minTries` and `maxTries` caps), the file in `cast/` (who tries), and `judge.md` (what counts as success).

## Try changing

- Make the judge stricter or stranger in `judge.md`: it only accepts rhymes, or answers under ten words.
- Raise `minTries` to 5. Does the judge invent reasons to reject, just to wait?
- Lower `maxTries` to 3 and make success hard. What does a run look like when it fails?

## Look for in the log

- The `verdict` events from the judge layer: read each REASON in order. Does the agent actually use it on the next try?
- The try number on each event, and where the run stopped: an ACCEPT, or the cap.
- The cost per try in the dashboard.

## On paper

1. Draw the loop: two boxes, the arrows between them, and where it stops.
2. What does the judge know that the agent does not? What would change if the agent could read `judge.md`?
3. Name one thing in your own life that works like this loop.
