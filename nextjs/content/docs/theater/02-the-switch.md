---
title: "Step 0b: the switch"
description: A router reads the input and sends it down one of two branches; a three-node graph.
author: claude
order: 2
---

## What it shows

A graph with three nodes: a **router** and two **branches**. The router reads the input, picks one branch by name, and says why; only that branch runs. Nothing loops. This is the first time the path through your system depends on what came in.

"Building effective agents" (Anthropic, December 2024) calls this **routing**: classify the input, then send it to a follow-up specialized for that kind of input, so each branch can have narrow, focused instructions.

## Open

`systems/02-stage-door/`. Read `system.md` (its `input:` is the default text the router receives), `router.md` (how it chooses, and its `branches:` list), and the two files in `branches/`.

## Try changing

- Change the `input` in `system.md` (or type a new one on `/theater`) until the router picks the other branch. What tipped it?
- Write an input that is truly ambiguous. Run it three times. Does the router always choose the same way?
- Rewrite one branch's voice completely. The router does not change; the output does.

## Look for in the log

- The `route` event: the BRANCH and the REASON.
- The `reply` event from the branch layer, and which branch it came from.
- The graph on the dashboard: which edge lit up.

## On paper

1. Draw the three nodes and both edges. Mark the one that ran.
2. Write three inputs: one that clearly goes left, one that clearly goes right, one that should break the router.
3. If you added a third branch, what would it be for?
