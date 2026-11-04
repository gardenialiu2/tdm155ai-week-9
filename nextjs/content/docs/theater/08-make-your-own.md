---
title: "Step 4: make your own"
description: Copy a preset folder, rewrite it as your own show, and have Claude Code help you build what it needs.
author: claude
order: 8
---

## Start from a copy

A system is just a folder. To make your own, copy one and change it. The dinner party is a good start, because it is a cast with nothing else yet:

```
cp -r systems/03-dinner-party systems/my-show
```

(Run that from the repository root, or ask Claude Code to do it.) Then open `systems/my-show/system.md`, change the `title` and the premise, and rewrite the files in `cast/`. Your show appears on `/theater`. Add a director, producers, and observers as you go: copy them from `04-the-heist`, `05-the-villa`, or `06-werewolf` and rewrite them. The [system format](/docs/theater/09-system-format) lists every file and setting.

Keep everything you write invented: no real classmates, and nothing private.

## Prompts to give Claude Code

- "Copy `systems/03-dinner-party` to `systems/my-show`. The premise is: [your premise]. Write four characters with clear wants and secrets that conflict."
- "Add a director to `systems/my-show` whose goal is: [your goal]."
- "Add a producer who [does what], acting every 2 rounds, and keep it in the producer reply format."
- "Add an observer who watches for [what] and writes a short table."
- "Turn on confessionals and the ratings loop, and set the cost ceiling to $0.40."
- "Run nothing; just explain to me how my system's parts are wired, as a list of arrows."
- "Read my last run's log and tell me where the story stalled. Suggest one change to one file."

## Ideas

- **A courtroom**: a defendant, two lawyers, a witness who lies; a judge (director) whose goal is a verdict; a jury vote as the producer.
- **A writers' room**: four writers pitching an episode; a showrunner producer who kills ideas; an observer who tracks whose jokes survive.
- **A séance**: guests, a medium, and a ghost who may only speak in asides until a twist lets it speak aloud.
- **A trading floor**: traders as strategies (always cooperate, always defect, copy the last move); a producer who announces market shocks; a game-theorist observer.
- **A cooking competition**: contestants, a judge, a twist ingredient every round, and a critic who rates the drama.
- **A myth retold**: the gods as producers, mortals as the cast, the chorus as the observer.
- **A loop of your own**: an agent that writes a haiku, and a judge who accepts only when it would make a stranger cry.
- **A switch of your own**: a router that reads a dream and sends it to a fortune teller or a scientist.

## On paper, before you build

1. Draw your system: the cast, and every agent outside it, with arrows for who reads and who writes.
2. Write the one-sentence goal, and how the run stops.
3. Write one secret for each character, and the moment you hope it comes out.
