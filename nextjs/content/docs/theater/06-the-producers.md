---
title: "Step 3: the producers"
description: Agents who change the game from outside the scene, with twists, challenges, votes, and eliminations; or a game-theory simulation.
author: claude
order: 6
---

## What it shows

A director watches; producers interfere. Producers are a second system that writes into the first: every `producersEvery` rounds each producer (one file in `producers/`) reads the scene and picks one move:

- **twist**: a rule change or a revelation the cast hears.
- **challenge**: a task the cast must respond to.
- **vote**: the Theater asks every remaining character in private for a `VOTE:` and a `WHY:`, and the most-voted is eliminated.
- **eliminate**: the producer removes one character by name (the TARGET).
- **none**: leave the scene alone.

With `confessionals: true`, the private asides become the reality-show confessional booth: the audience (you) hears what the contestants will not say to each other.

## Two presets

**`systems/05-the-villa/`**: a reality show. Five contestants with wants and secrets; a Showrunner who adds twists and challenges; a Host who calls votes and eliminations, and is told to do it rarely. It also has observers and the ratings loop on (see [the observers](/docs/theater/07-the-observers)).

**`systems/06-werewolf/`**: a social-science simulation. Werewolf (also played as Mafia) is a party game of hidden roles: a few players are secretly the enemy, and everyone argues and votes in the open. Here, a village of five, one of them secretly the werewolf; a Moderator alternates day votes and night eliminations; a Referee (a director) stops the game when one side wins. Games like this are a way to study deception, trust, and coalitions. Robert Axelrod's computer tournaments of the repeated Prisoner's Dilemma are a classic example of running strategies against each other to see which survive; you can design your own tournament the same way, with characters as strategies.

## Try changing

- In the Villa, make the Host trigger-happy (eliminate every time). Is the show better or worse?
- In Werewolf, add a second werewolf, or tell one villager who the werewolf is. Who wins now?
- Write a producer of your own: a sponsor who demands product placement, a network executive who wants a romance.
- Turn `confessionals` off. Can you still follow the game?

## Look for in the log

- The `twist`, `challenge`, `vote`, and `eliminate` events, and how the cast's lines change right after each.
- In a vote, the private votes (asides) next to what each character said in public.
- In Werewolf, the werewolf's asides: when is it lying?

## On paper

1. Draw the two systems, the cast and the producers, and the arrow between them.
2. Which producer move changed the story most? Why?
3. If your cast were strategies instead of people, what would a "win" be, and how would you score it?
