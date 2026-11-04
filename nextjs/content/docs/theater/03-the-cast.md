---
title: "Step 1: the cast"
description: Characters you write take turns in a scene, each one hearing everything said so far.
author: claude
order: 3
---

## What it shows

Several agents share one scene. Each character is one file in `cast/`: a name, a voice, what they want, and what they hide. They speak in order (the files' alphabetical order, so `01-`, `02-` ...), one line per turn, each one hearing the whole scene so far, for `turns` turns each. A **round** is one turn for everyone. This is **round-robin**: no one decides who speaks next; the order does.

Every line says who it is **TO** (a name, or everyone) and what the character **SAY**s. With `confessionals: true` a character can also add an **ASIDE**: a private line to the camera that the other characters never hear, but you do.

Park and colleagues' "Generative Agents" (2023) put twenty-five model-driven characters in a small simulated town and watched social behavior emerge from their interactions. Your cast is a much smaller version of the same idea: you write the people, and the scene is what happens between them.

## Open

`systems/03-dinner-party/`. Read `system.md` (the premise every character is given) and each file in `cast/`.

## Try changing

- Give one character a secret that conflicts with another's want. Run it. Does it come out?
- Change the order by renaming files: who speaks first shapes everything after.
- Turn `confessionals` on or off and compare the two logs.
- Write one character with almost no instructions and one with many. Which is more interesting to watch?

## Look for in the log

- Who addresses whom: the TO line, and the "who addressed whom" view on the dashboard. Who is ignored?
- Where a character's ASIDE contradicts their SAY.
- Whether characters stay in their voices by turn 10, or start to sound alike.

## On paper

1. For each character, write one line: what they want from the others.
2. Mark the moment in the log where a secret came out, or should have.
3. What would you add so the scene ends instead of just stopping?
