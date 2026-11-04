---
title: Podcast prep, with four agents
description: Piper takes everything in, Quinn proposes questions, Kit offers kind jokes, and Bea writes the host's briefing once you say you're done.
author: claude
order: 3
---

**Claude's build of November 4, from TL's brief of that morning; the names are TL's proposals.** The same four agents, with the same jobs and the same briefing, run in Slack as the Producer bot, so a guest's material gets the same treatment in either place.

## The cast

| Agent | Job | Starts when |
|---|---|---|
| **Piper**, intake | Saves every original as it was sent, then reads it: text as is, audio and video transcribed, images described, PDFs read, links fetched. Keeps the inventory. | The moment an item arrives |
| **Quinn**, interviewer | A two-sentence reading of the item and two to four questions tied to something specific in it, each with a "why". | Piper has read the item |
| **Kit**, sidekick | Up to three optional jokes or openers per item. The guest always comes off well: the butt is the host, Kit, or the situation. "No useful joke here" is a good answer. | Quinn is done (or failed) |
| **Bea**, producer | The host's briefing, from everything submitted and the other three's notes. | You press *I'm done adding material*, and every item is finished |

Each agent's card shows what it's told; each item shows what each agent was given and what it said. The avatars move only while that agent is working.

## How to use it

1. `cd nextjs`, `pnpm dev`, and open http://localhost:3000/podcast.
2. **Start a session** for one guest ("Jo, the Alabaster stop-motion").
3. **Add material** as it comes: drop files (audio, video, photos, PDFs, text), paste a note, or add a link. Each one is saved first, in `output/podcast/<session>/originals/` at the repo root (on this computer only; it's never committed), and the agents start on it right away.
4. Something failed? The original is still saved. Press *Retry* on that agent, or convert the file and add it again. *Leave it out* keeps an item away from every agent from then on.
5. When you're done, press **I'm done adding material — make the host briefing**. That closes a *revision*: everything added so far. Bea waits until every item in it is finished. If any failed, she stops and asks: retry them, or *go ahead without the failed items* (the briefing then says what wasn't read).
6. Material added after that goes into the next revision. The briefing says which revision and items it's based on, and the page tells you what's newer. Press the button again for an updated briefing.
7. **Download the briefing** (Markdown) or **Print** it (light, for paper). **Download the trace** for everything: every item, every prompt, every answer, every event.

## The briefing

Always these sections, in this order, in both the web and Slack versions: The guest and the work · The central thread · Suggested beats · Questions and follow-ups · Optional sidekick moments · Names, references and terms · Handle with care / check before recording · Sources used and intake status.

## What to change

The agents' instructions are in `nextjs/lib/podcast/prompts.mjs`; Piper's ways of reading are in `nextjs/lib/podcast/read.mjs`; the order of who-waits-for-whom is in `nextjs/lib/podcast/jobs.mjs`; the avatars are in `nextjs/app/podcast/Avatar.jsx`. Things to try with Claude Code: a fifth agent (a fact-checker that reads Quinn's questions against the items), a different sidekick personality, a briefing for a different format (a panel, a radio call-in), Kit and Quinn in a different order.

## Where it came from

The Slack Producer (`tdm155ai/tdm155ai-podcast-producer`) and this page share one contract, `nextjs/lib/podcast/contract.mjs`: the cast, the per-item answers, the finish rule, and the briefing's headings. The October 30 [Ensemble](/ensemble) is the earlier design: a fixed pipeline (Conductor, Archivist, Researcher, Briefer) that a person approves step by step.
