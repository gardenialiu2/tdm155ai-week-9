# TDM 155AI week 9: instructions for AI assistants

This repository is the week 9 site for TDM 155AI (*Making Stuff in the Age of AI*): Agents and systems (class November 4, 2026), the first week of Unit 3, beyond the single piece. Students build their first system of agents: an ensemble that reads a context repository (the folder behind their First Project, due November 6) and briefs the host of next week's podcast interview. They do it on paper first, then on the screen.

## Where things go

- **`nextjs/content/`**: the Markdown the site shows; each file is a page at the same path. `content/docs/` is the Docs section, shown with a sidebar at `/docs`.
- **`nextjs/app/ensemble/`**: the ensemble as taught. Don't change it when a student asks for changes; change their copy. `prompts.mjs` holds the roles, the system prompts, and what each role is given; `Ensemble.jsx` the page; `trace.mjs` the trace; `api/run/` the one model call; `api/sample/` serves the sample repository.
- **`nextjs/app/remix/`**: the student's copy of the ensemble. This is where student changes go. It's self-contained, with its own routes, so changing it never affects `/ensemble`.
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
