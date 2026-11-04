# TDM 155AI week 9 — agents, systems, orchestration

Class November 4, 2026. Unit 3 begins: beyond the single piece. This repository contains a local Next app for creative agent systems, podcast preparation, and the week's glossary and research. Public repo: https://github.com/tdm155ai/tdm155ai-week-9.

## Start the app

Use Node 22.12+ and pnpm. Copy `.env.example` to `.env` at the repository root and add your `OPENROUTER_API_KEY`. Keep credentials local. Audio/video transcription also needs ffmpeg.

```sh
git clone https://github.com/tdm155ai/tdm155ai-week-9.git
cd tdm155ai-week-9/nextjs
pnpm install
pnpm dev
```

Open the address printed by Next (normally http://localhost:3000). An already running instance may use a different port.

## The app

- **Systems (Theaters of Agents)** — `/systems`: three starting systems, with instructions, run controls and the resulting conversation/log.
  - `systems/00-favorite-color/`: guess a secret favorite color, use the feedback, stop when correct or after at most ten guesses. No forced minimum.
  - `systems/09-rushmore/`: The giant carved heads of Washington, Jefferson, Theodore Roosevelt and Lincoln argue about life as Mount Rushmore in South Dakota, fixed side by side in the mountain. Separate character files, one scenario, **20 total speeches**, not 20 rounds.
  - `systems/10-divine-villa/`: eight Greek gods, modern human producers, three secret traitors, public dialogue and private truthful ITMs. An advanced remix of the simple cast mechanic. The fourth item, **Make your own**, supplies a copyable Claude Code remix prompt.
- **Sessions** — `/systems/sessions`: local system history, initially empty. Running a system creates a saved session. Logs can be inspected/downloaded; they are gitignored and do not ship with a fresh clone.
- **Research** — `/ai-research`: AI-generated research notes, ensemble/format libraries, official documentation, API history and primary readings, with source links and verification limits.
- **Glossary** — `/ai-research/glossary`: agent definitions and the week's related terms.
- **Podcast prep** — `/podcast`: submit files, notes and links; Collector reads/transcribes, Interviewer generates questions, Sidekick suggests optional guest-supporting humor, Producer briefs after explicit finish. Failed items need retry or an explicit proceed-with-gaps choice. Later material opens another revision.
- **Remix** — `/remix`: a self-contained student copy of Podcast prep, with its own routes/library and storage.

Systems defaults to the supported Claude Sonnet model. It has a turn/guess limit, cost ceiling and Stop control. Free rehearsal uses stand-in replies, not a live model; it demonstrates the wiring. Read the actual run's ending to see whether it succeeded, hit a limit or was stopped.

## Make something of your own

Ask Claude Code to copy one of the starting folders into a new `systems/<name>/`, then change the copy. A system has a premise/configuration and separate character instructions; more elaborate systems add producer, role or observer files. Keep the built-in examples and other people's work intact. For a simple cast, specify the scenario and **total** number of speaking turns explicitly. Keep secrets out of characters' contexts unless those characters are meant to know them.

A class goal is to design conditions for interactions and aesthetic effects, run them, and understand what changed. A cast of familiar characters is a starting point, not a required final form.

## Where the code and material live

- `nextjs/app/`: pages/routes. The creative-system implementation retains internal `theater/` paths; old public Theater URLs may redirect to Systems. `nextjs/lib/theater/` loads and runs system definitions, enforces caps, and records events. The visible activity is named Systems.
- `systems/`: Markdown-based systems. Earlier examples are marked archived and excluded from the picker/API list. The initial picker contains the three systems above and **4 · Make your own**; new unfeatured, unarchived copies appear under **Your systems**.
- `runs/`: gitignored system event logs behind Sessions. Old classroom-test logs are cleared/archived out of active history before delivery; no sample run is required to start.
- `nextjs/lib/podcast/contract.mjs`: shared podcast role IDs, output shapes, statuses, revision rules and eight briefing headings. `nextjs/lib/podcast/` implements the web workflow; `nextjs/app/podcast/` is the UI, including state-driven SVG avatars.
- `output/podcast/`, `output/podcast-remix/`: separate gitignored server-side prep stores. Originals, transcripts, state and briefings remain local.
- `.claude/agents/podcast-*.md`: Collector, Interviewer, Sidekick and Producer subagents. The parent Claude session coordinates them. `.claude/utils/podcast/` contains their contract/helper and usage guide; they store sessions separately in `output/podcast-claude/`.
- `draft-skills/podcast-prep/SKILL.md`: deliberately parked outside skill discovery. The active subagents do not depend on loading it.
- `nextjs/content/`: rendered Markdown. The front page is `content/README.md`; reference content is under `content/ai-research/`. Earlier `content/docs/` files and the October 30 `/ensemble` example are legacy material, not another required section of the current app.
- `utils/`: media-generation and editing tools carried forward from earlier weeks. See [utils/README.md](utils/README.md); run root `pnpm install` for their dependencies. The Next app installs separately.

## The Slack demo

[tdm155ai-podcast-producer](https://github.com/tdm155ai/tdm155ai-podcast-producer) is a separate local Slack app, handed to Madeleine. It follows the same Collector/Interviewer/Sidekick/Producer contract, with Slack-specific triggers and per-person sessions. It is not a submodule or a prerequisite for this app. Access to that separate repo may be required. Do not share live session files or credentials between implementations.

## Local material and checks

Root `.env` and `nextjs/.env.local`, generated media, podcast data and system histories are gitignored. Keys stay on the server; never put them in browser code. The built-in `sample-context-repo/` and test fixtures describe invented work, not real student submissions. Student material belongs in local ignored storage, not course-content folders.

App checks: `pnpm --dir nextjs test` and `pnpm --dir nextjs build`. General media-tool checks: `pnpm test` at the repo root. Test the behavior affected by a change; a free rehearsal or passing unit test alone does not establish the quality of generated dialogue.

## Origins

The Markdown reader came from week 8 on October 30. The initial fixed podcast-briefing graph remains at `/ensemble` with its own `/ensemble/remix`; it is distinct from today's Podcast prep and `/remix`. The creative-system runner, podcast team, research and simplified three-system interface were developed for November 4. They are prepared teaching material, not a report of classroom outcomes.
