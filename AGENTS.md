# TDM 155AI week 9 — instructions for AI assistants

This local course workspace is for TDM 155AI (*Making Stuff in the Age of AI*), November 4, 2026: **agents, systems, orchestration**. It contains creative agent systems, podcast preparation, reference research and media utilities. Read the user's request first; a repository feature is not automatically your assignment.

## Identify the task before making things

Use the current request and supplied brief to determine the purpose and files. “Create skills/subagents” names a mechanism, not a subject. When the purpose is already given, follow it; when it cannot be found, ask one short question before inventing domain-specific agents. Do not default to building shows because the repo contains systems.

An assistant modifying the repo, a Claude subagent, and a character inside an app are distinct. Check the working tree and respect concurrent ownership. Keep instructor decisions, source material and AI proposals separate; prepared examples do not establish what happened in class. Read README.md and relevant nested instructions before changes.

## Current app structure

Top-level destinations: **Systems**, **Sessions**, **Research**, **Glossary**, **Podcast prep**, **Remix**. Page title: **Systems (Theaters of Agents)**. No top-level Docs section. Definitions of agents belong in the glossary; brief mechanic instructions belong beside the relevant system. Older example routes/files may remain for compatibility, but do not reintroduce their teaching ladder or navigation as the current plan.

### Systems

The initial picker has three examples, in this order:

1. `systems/00-favorite-color/`: one color guess at a time; use feedback; stop when correct, maximum **10 guesses**, no forced minimum. Keep the target private to the judge/configuration, not in the guesser's context. A deterministic judge is sufficient.
2. `systems/09-rushmore/`: Washington, Jefferson, **Theodore** Roosevelt and Lincoln, relocating to South Dakota, discuss their preferences and disagree while responding to prior dialogue. Separate character files + scenario + **20 total speeches**, not 20 rounds.
3. `systems/10-divine-villa/`: advanced Greek-gods reality-show system with modern human producers, exactly three secret traitors, public conversation and private ITMs. Traitors may deceive publicly but their ITMs must honestly state their role/plans. Never give faithful players other characters' hidden roles or ITMs. Public voting/reveals must follow game state, not a model's invented result.

Students remix by copying a system into a new `systems/<name>/` and changing its characters/scenario/rules. Preserve built-in examples and student work unless explicitly asked otherwise. The copyable remix prompt is part of the Systems experience. Earlier presets may stay as source/reference without appearing as additional required starters.

Default the creative-system runner to the supported **Sonnet** option. Keep Stop, total-turn/guess limits and cost ceiling working. New model calls must go through the runner's accounting helper so they count toward logs/caps. Free rehearsal is stand-in output, not evidence of live-model behavior.

Internal implementation remains under `nextjs/lib/theater/` and relevant `nextjs/app/` routes. Prefer the visible Systems/Sessions naming without a needless wholesale internal rename. Consult the actual loader/runner/file format before extending a system; do not assume Markdown instructions alone enforce hidden-state or vote rules.

### Sessions

Sessions is local history for the Systems activity. It starts empty; running a system creates a session. Backing JSONL logs are in gitignored `runs/`. They are not uploaded to GitHub. Previous test logs must be cleared/archived out of active history before classroom delivery, after checks and with no active run. Do not clear Podcast/Remix sessions or delete system definitions as part of that cleanup. Do not add a seeded initial session unless requested.

### Podcast prep and Remix

`/podcast`: `nextjs/app/podcast/` + `nextjs/lib/podcast/`. Read `nextjs/lib/podcast/contract.mjs` first. Stable IDs/functions: `intake` (**Collector**), `interviewer` (**Interviewer**), `sidekick` (**Sidekick**), `producer` (**Producer**). Optional student names are display aliases, not new workflow IDs.

Save submitted originals, read/transcribe when needed, generate per-item questions and optional guest-supporting humor, then brief only after explicit finish and pending work completes. Failed work needs retry or explicit proceed-with-gaps. Later material belongs to the next revision. Never ridicule the guest or their work, even gently; no joke is a valid result.

`/remix` (`nextjs/app/remix/`) is the self-contained student podcast copy with separate routes/library and `output/podcast-remix/` storage. Student podcast customizations normally go there; instructor maintenance of `/podcast` is a separate authorized task. Main prep storage is `output/podcast/`, server-side and gitignored. Do not merge live stores.

The separate Slack repo `tdm155ai-podcast-producer` follows the same role IDs/output fields/headings/finish behavior, with its own triggers and per-person storage. **Madeleine owns that repo now.** Coordinate shared-contract changes; do not change it as part of a course-app task without explicit assignment. It is not a submodule or dependency of this repo.

### Claude-native podcast agents

`.claude/agents/podcast-collector.md`, `podcast-interviewer.md`, `podcast-sidekick.md`, `podcast-producer.md` use simple function titles. The parent Claude session delegates. Their reference/helper is `.claude/utils/podcast/`; read its README for usage. Its separate store is `output/podcast-claude/`.

New podcast skills are deliberately parked in `draft-skills/podcast-prep/`, outside discovery. Do not register/link/load the parked SKILL.md automatically or move it into `.claude/skills/`. Active agents must work without that skill. Existing unrelated skills/agents are not invitations to expand their topic; do not remove them without a request. Do not promise always-on activity outside an active Claude invocation or start watchers/hooks/schedules just to simulate it.

### Research and Glossary

Reference pages live in `nextjs/content/ai-research/` at `/ai-research`; the glossary is `/ai-research/glossary`. Preserve the documented source/copy arrangement: research authors own sources, app maintainers own rendering. Agent definitions and overlapping buzzwords belong here, not a restored generic Docs section.

Keep original-documentation links, dates/access limits and AI-generated/adaptation labels. Dark screen reading and light printing must both work. SVG agent avatars move only while their actual job runs; retain reduced-motion alternatives and still print output.

Rendered course Markdown uses YAML `title`, one-line `description`, `author` and optional `order`; omit a body H1 when the page renders the title. This convention is for course-content pages, not every README/instruction/subagent file. Use each file type's native format.

## Tools, legacy material and local operation

- Use pnpm. The app is JavaScript and CSS; no TypeScript or Tailwind. Read `nextjs/AGENTS.md` before code changes. The person runs the server (`cd nextjs`, `pnpm install`, `pnpm dev`); do not start a background server unless asked.
- `utils/` holds general generation/model/media/editing tools. Read `utils/README.md`; root dependencies and package commands are separate from `nextjs/`.
- `/ensemble` and `/ensemble/remix` retain October 30's Conductor/Archivist/Researcher/Briefer graph. They are legacy teaching material, not the current podcast contract or required navigation. Preserve them unless the user asks to remove them.
- Root `.env` and `nextjs/.env.local` are ignored credentials; `.env.example` holds empty variable names. Keep keys server-side, never print/commit them, and do not overwrite local credentials casually.
- Process only material the person explicitly submits/chooses. Preserve exclusions and originals; report failed/unreadable material honestly. Student media, private notes, transcripts, briefings, logs and sessions stay in ignored local storage, outside public assets/content. Use invented fixtures for shared checks. `sample-context-repo/` must remain invented.
- Run checks relevant to the change; distinguish loader/rehearsal/unit-test checks from live generation and rendered UI checks. Report remaining gaps rather than claiming a requested example is complete before it runs.
