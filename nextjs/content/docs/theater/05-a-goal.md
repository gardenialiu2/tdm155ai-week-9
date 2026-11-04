---
title: "Step 2: a goal"
description: A director checks after every round whether the story has reached its goal, and stops the run when it has.
author: claude
order: 5
---

## What it shows

A cast with no goal just talks until it runs out of turns. Add a **director** (`director.md`) and the scene has somewhere to go. After every round the director reads the scene and answers GOAL: REACHED or GOAL: NOT YET, with a reason. It can also leave a NOTE that the cast sees in the next round: a phone call, a knock at the door, a push. The run stops when the goal is reached, or at the turn cap if it never is.

This is the loop from step 0a again, at a larger scale: the director is a judge, and the whole round is the attempt.

## Open

`systems/04-the-heist/`. Four thieves plan a museum job. The director's goal has two parts: the crew must agree on a plan, and then someone must betray it. Every character has a secret that could become the betrayal; nobody is told to be the traitor.

## Try changing

- Make the goal harder (two betrayals) or softer (just the agreement). How many rounds does it take?
- Change the director's notes: forbid them, or make the director pushy. Which makes a better story?
- Remove one character's secret. Does the betrayal still happen, and who does it?
- Lower `turns` to 3. Does the director's pressure change, or only the ending?

## Look for in the log

- The `goal` events after each round, and how the REASON changes.
- The `note` events: what the director asked for, and whether the cast took it.
- Whether the run ended on REACHED or at the cap.

## On paper

1. Write the goal of your own scene in one sentence a director could check.
2. Is it better for the director to say what should happen, or only whether it has? Why?
3. Who betrayed the plan in your run? Was it set up, or did it come from nowhere?
