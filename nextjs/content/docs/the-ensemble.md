---
title: How the ensemble works
description: The screen version, step by step, what it sends where, and what to change in your remix.
author: claude
order: 3
---

## The run

1. **The repository.** Pick a folder on this computer (yours, or your guest's if they've shared it), or press *Use the sample repository*. The page reads the folder's text files in the browser and lists them. Nothing has been sent anywhere. Untick a file to **withhold** it from the whole ensemble; it stays in the list, struck through, so the trace shows what wasn't read. The three columns to the right are the plan: which files each agent gets.
2. **About the piece.** One line from you, which every role sees, and the purpose of the run. Change the purpose and you've changed what the whole system is for.
3. **What each role is told.** The four system prompts. Edit any of them. They live in `prompts.mjs`, next to the page.
4. **The plan.** Ask the Conductor to propose who gets what. It sees file names, sizes, and first lines, not contents. When it answers, the columns in step 1 change to match; change them back by hand if you disagree. Or skip it.
5. **Run the agents.** Archivist, then Researcher, then Briefer. Each card appears in an editable box. Change a card before the next role reads it and the trace marks it as edited by you. *Run all three* does them in a row.
6. **What comes out.** The briefing (for the host) and the trace (for you). Print the trace and mark it up as in [the paper version](/docs/paper-ensemble).

## What goes where

Every call is one request to a chat model on OpenRouter, from the server route `api/run`, with the key in the repo's `.env`. The page composes the request and shows it under *What will be sent* before you press Run, and keeps it as *What was sent* afterwards. The Researcher's request turns on OpenRouter's web search (the Exa engine), which is why it costs a few cents more and comes back with sources. No file is sent to any role you didn't give it to. The session (files included) stays in this browser's storage until you pick another folder.

## Your remix

`nextjs/app/remix/` is a complete copy of the ensemble; changing it never touches `/ensemble`. Things worth trying, roughly in order of effort:

- **Change a prompt.** Make the Briefer write for a hostile interviewer, or a ten-year-old. Make the Archivist write in the maker's voice. See what the trace shows.
- **Change the wiring.** Give the Researcher the files, not the map. Run the Briefer before the Researcher. Take the Conductor out. Each is one line in `compose()` in `Ensemble.jsx` or one checkbox.
- **Add a role.** A Skeptic that reads the briefing and strikes any question the files don't support. A Fact-checker that reads only *Check before air* and searches. Add it to `roles` in `prompts.mjs`, give it a message function, and the page will show it.
- **Change the output.** Program notes instead of a briefing. A scene. A set of alt texts for the piece's images. Now the ensemble is the work.
- **Change the input.** Point it at a transcript from week 8 instead of a repository. Point it at the folder of a project that isn't yours (with permission).

Ask your coding agent for any of these; this file and `AGENTS.md` at the repo root tell it where things are.
