---
title: "Step 5: the observers"
description: Read-only agents who watch the whole log, including the asides, and write notes for the dashboard.
author: claude
order: 7
---

## What it shows

Observers are the third system. Each observer (one file in `observers/`) reads the entire log so far, every public line and every private aside, and writes notes in Markdown. The notes appear on the dashboard. Observers never write into the scene: the cast does not hear them and does not know they exist.

An observer is a way of looking. A Greek chorus watches for fate and hubris. A television critic watches for dead air. An inspector watches for lies. A game theorist watches for strategies and coalitions. Each one turns the same log into a different reading, which is what a dashboard is for.

`observersEvery` sets how often they run: `0` means only once, at the end; `2` means after every second round, so their notes build up while you watch.

## The ratings loop (optional)

Turn on `ratingsLoop: true` and the producers read the observers' latest notes before they act. The critic says the show is dragging; the Showrunner adds a twist. Now the observers are not only watching: through the producers, they shape the show. That arrow closes the graph of graphs into a loop. Try a run with it on and a run with it off.

## Open

`systems/05-the-villa/observers/` (the Chorus and the Ratings Critic; the ratings loop is on) and `systems/06-werewolf/observers/` (the Inspector and the Game Theorist).

## Try changing

- Write an observer that only counts: lines per character, questions asked, times someone says "trust."
- Write an observer who is wrong on purpose: a gossip columnist who believes every lie. Compare its notes with the Inspector's.
- Run the Villa with `ratingsLoop: false`, then `true`. Did the critic's notes change the show?

## Look for on the dashboard

- The `observation` events and their notes, round by round.
- Where two observers disagree about the same moment.
- With the ratings loop on, a producer move that answers an observer's note.

## On paper

1. Write the instructions for an observer of your own in three lines: what it watches, what it reports, what it ignores.
2. Why should an observer never speak to the cast? What would break if it did?
3. Which observer's notes would you show an audience, and which only the producers?
