# TDM 155AI week 9: instructions for AI assistants

This repository is the week 9 site for TDM 155AI (*Making Stuff in the Age of AI*): Agents, systems, orchestration (class November 4, 2026), the first week of Unit 3, beyond the single piece. Students design a system of agents with a theatrical spin in the Theater (`/theater`): a loop, a switch, a cast of characters, a goal, producers, observers. They run it, then inspect and visualize it, and are graded on creativity, not code. The ensemble (`/ensemble`, built October 30) is a worked example of a fixed graph: it reads a context repository and briefs the host of next week's podcast interview.

## Where things go

- **`systems/<name>/`**: the Theater's systems, one folder each (format in `nextjs/content/docs/theater/09-system-format.md`). When a student asks for a new show, copy a preset to a new folder and change the copy; don't edit the presets `01-` to `06-`. A student's characters are their creative work: change them only as asked.
- **`nextjs/lib/theater/`**: the Theater's engine (`run.mjs` the runners and prompts, `parse.mjs` the reply formats, `systems.mjs` loading systems and logs, `model.mjs` the OpenRouter call, `rehearsal.mjs` the free stand-in). **`nextjs/app/theater/`**: the pages, the routes, and the dashboard (`Dashboard.jsx`, `derive.mjs`). Keep the caps (turns, cost ceiling, Stop) on; a new feature that calls a model goes through `ask` in `run.mjs` so it counts toward the ceiling and the log.
- **`runs/`** (gitignored): every run's log, one JSON object per line.
- **`nextjs/content/`**: the Markdown the site shows; each file is a page at the same path. `content/docs/` is the Docs section, shown with a sidebar at `/docs`.
- **`nextjs/app/ensemble/`**: the ensemble as taught. Don't change it when a student asks for changes; change their copy. `prompts.mjs` holds the roles, the system prompts, and what each role is given; `Ensemble.jsx` the page; `trace.mjs` the trace; `api/run/` the one model call; `api/sample/` serves the sample repository.
- **`nextjs/app/podcast/`** and **`nextjs/lib/podcast/`**: podcast prep as taught (Piper, Quinn, Kit, Bea; the contract shared with the Slack Producer is `lib/podcast/contract.mjs`; keep it in step with `tdm155ai/tdm155ai-podcast-producer`). Sessions are saved in the gitignored `output/podcast/`.
- **`nextjs/app/remix/`**: the student's copy of podcast prep, self-contained (its own `lib/`, routes, avatars, and storage in `output/podcast-remix/`). This is where student changes to podcast prep go; changing it never affects `/podcast`.
- **`nextjs/app/ensemble/`** and **`nextjs/app/ensemble/remix/`**: the October 30 ensemble (Conductor, Archivist, Researcher, Briefer) and its copy, kept as a worked example of a fixed graph. Don't change `/ensemble` when a student asks; change the remix.
- **`sample-context-repo/`**: an invented student's context repository, for running the ensemble in class. Keep it invented: no real student's material goes here.

See `README.md` for how the ensemble works.

## Writing docs

Every Markdown file you write starts with YAML frontmatter giving its title, a one-line description, and you as its author, so the student (and anyone reading) can tell your work from theirs:

```yaml
---
title: A Skeptic for the ensemble
description: A fifth role that strikes questions the files don't support
author: claude
---
```

Don't put an H1 in the body; the title comes from the frontmatter. `order:` sets a document's place in the sidebar.

## The app

- The student runs it themselves: `cd nextjs`, `pnpm install`, `pnpm dev`. Don't start it in the background.
- Plain JavaScript with its own CSS; no TypeScript or Tailwind.
- API keys live in the gitignored root `.env` (template `.env.example`) and are read only by the server routes (`lib/keys.mjs`). Never put a key in browser code, and never print one.
- A student's context repository may hold things about other people. The ensemble sends a file only when the person has allowed it and given it to a role; keep that so. Don't add anything that reads a folder without the person choosing it.
