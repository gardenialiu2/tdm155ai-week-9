# TDM 155AI week 9 — instructions for AI assistants

This is a local course workspace for TDM 155AI (*Making Stuff in the Age of AI*), class November 4, 2026: **agents, systems, orchestration**, the start of Unit 3. It includes podcast preparation, creative agent systems, research/readings, and general media utilities. Read the user's request first, then the relevant part of this map. The presence of an app or example does not make it your assignment.

## Start with the requested task

- Identify what the user wants to accomplish and which files/feature it concerns. Use their current brief and session instructions; do not infer a new task from whichever feature has the longest documentation.
- “Create skills/subagents” specifies a mechanism, not their purpose. If the purpose is supplied, follow it. If the purpose cannot be found in the request or provided brief, ask one short question before creating domain-specific agents. Do not default to Theater or create a sample catalog of skills on speculation.
- Keep the roles separate: the agent helping modify this repository, a Claude subagent defined in `.claude/agents/`, and an agent character inside a running app are different things. Creating one does not automatically require creating the others.
- Read the relevant source and current contract before implementing. Keep source material, instructor decisions, and AI proposals distinguishable. Prepared activities are not evidence of what happened in class.
- Other people/agents may be editing concurrently. Check the working tree, honor assigned ownership, and avoid sweeping up or overwriting their work. A current explicit user assignment takes precedence over this general map.

## Podcast preparation — three interfaces, one workflow

The web app, separate Slack Producer, and Claude-native agents prepare a host for a podcast interview about creative work. Shared functions: collect/save submitted material; read/transcribe it when needed; generate source-specific questions; generate optional guest-supporting sidekick humor; produce a structured host briefing after the person explicitly finishes intake.

- **Web:** `/podcast`, implemented in `nextjs/app/podcast/` and `nextjs/lib/podcast/`. The contract is `nextjs/lib/podcast/contract.mjs`: roles, output fields, statuses, finish/revision semantics and briefing headings. Start there.
- **Slack:** separate repository `tdm155ai-podcast-producer`, a sibling of this repo in The Notebook. Read its `src/prompts.js` for the matched prompts. Coordinate changes to the shared contract; do not edit the sibling without assignment.
- **Claude-native:** use function titles **Collector**, **Interviewer**, **Sidekick**, **Producer**. Collector maps to the shared internal role ID `intake`; the other IDs are `interviewer`, `sidekick`, `producer`. Active project subagents belong in `.claude/agents/`. The parent Claude session coordinates them directly.
- **Skills are deliberately inactive for today's podcast work:** put new podcast skill drafts in `draft-skills/podcast-prep/`, outside `.claude/skills/` and all other discovery locations. Do not expose them through symlinks, hooks, registration or automatic loading. Agents must work without those drafts. Existing unrelated skills/subagents are not instructions to expand their topic; do not delete or repurpose them without a user request.
- The apps and the Slack bot display the same function titles, Collector, Interviewer, Sidekick, Producer (Marlon, November 4; they were Piper, Quinn, Kit, Bea until then). Optional student-chosen names can later be display aliases over the stable IDs; do not rename the IDs.
- Start per-item work as material arrives during an active workflow. Make the final briefing only after explicit “done” and after pending work for that revision completes. Failed work requires retry or an explicit proceed-with-gaps choice. Later material belongs to the next revision; preserve which material each briefing used.
- Humor supports the guest. The host, sidekick or situation can be the butt; never mock the guest or their work. No joke is an acceptable result.
- Local server-side storage is intended: `output/podcast/` is gitignored. Keep originals, extracted text/transcripts, agent outputs, inventory, state and briefings there. Do not put submitted material in public assets or course-content folders. A Claude utility must coordinate storage formats with the app, or use a separate `output/podcast-claude/` folder.

**Student remix:** `/remix` (`nextjs/app/remix/`) is the self-contained podcast copy with its own routes/lib/avatars and `output/podcast-remix/` storage. Student requests to customize podcast prep normally go there; instructor maintenance of `/podcast` is a separate, authorized task.

## Theater — creative systems when requested

Students design a system with a theatrical spin: loops, routing, casts, goals, producers and observers. They run, inspect and visualize it, with creativity rather than code quality as the emphasis. This is one activity in the repo, not the default topic for every task.

- `systems/<name>/`: each system's Markdown definition and characters; format in `nextjs/content/docs/theater/09-system-format.md`. For a new student show, copy a preset into a new folder; preserve presets `01-` through `06-`. Change students' characters only as requested.
- `nextjs/lib/theater/`: runner/prompts (`run.mjs`), parsers (`parse.mjs`), loading (`systems.mjs`), model calls (`model.mjs`) and the free stand-in (`rehearsal.mjs`). `nextjs/app/theater/` holds pages/routes/dashboard.
- Keep turn/cost caps and Stop working. New model calls in this engine go through `ask` in `run.mjs` so they count toward the ceiling and log.
- `runs/` is gitignored: run events as JSONL. Do not commit a student's logs or output.

## Earlier ensemble example

`/ensemble` (`nextjs/app/ensemble/`) is the October 30 worked example: Conductor → Archivist → Researcher → Briefer. Its prompts and trace explain a fixed graph reading a context repository. It is historical teaching material alongside the new podcast flow; do not use its role names as the current podcast contract. Its separate student copy is `/ensemble/remix`, not `/remix`. Preserve the teaching example when changing a student's copy.

`sample-context-repo/` is invented material for demonstrations. Keep it invented; never replace it with a student's work.

## Research, documents and general tools

- `nextjs/content/`: Markdown displayed by the site; `content/docs/` supplies `/docs`. Research is displayed at `/ai-research`. Keep the source-research/copy arrangement documented; research authors own their sources and the app maintainer owns rendering.
- Course-content Markdown uses YAML frontmatter: `title`, one-line `description`, and `author`; `order` sets sidebar position. Do not put an H1 in the body when the page renders its title. This is a content-page convention, not a demand to apply course-page frontmatter to every README, instruction file or agent/skill definition. Use the native format required for those files.
- Distinguish original documentation links and sources from generated notes/adaptations. Support dark screen reading and light printing. For bot SVGs, animate only during the corresponding job; respect reduced motion and print stills.
- `utils/` contains general text/image/video generation, model listers, batches, stills, compression and editing tools copied forward from earlier weeks. Read `utils/README.md`. Root package commands include `pnpm text`, `pnpm image`, `pnpm video`, `pnpm stills`, `pnpm compress-image`, and `pnpm test`. These utilities are available tools, not an instruction to generate something without a task.

## Running, credentials and local material

- Use pnpm. The app is plain JavaScript and CSS; no TypeScript or Tailwind. Read nested instructions before modifying `nextjs/`.
- The person runs the dev server: `cd nextjs`, `pnpm install`, `pnpm dev`. Do not start background servers unless asked.
- Credentials live in gitignored root `.env` and `nextjs/.env.local`; `.env.example` contains empty variable names. Server routes use `lib/keys.mjs`. Never print keys, include them in browser code, commit them, or overwrite existing local credentials casually.
- Process only material the person submits/chooses for the workflow. Preserve exclusions; do not scan unrelated folders. Save originals before transformations and report unreadable/failed items rather than pretending they were processed.
- Submitted student files, private notes, transcripts, generated briefings, sessions and logs stay in gitignored local storage. Use invented fixtures for shared tests and demonstrations.
- Read README.md for implementation details. Run checks relevant to your changes; report what was verified and what remains uncertain.
