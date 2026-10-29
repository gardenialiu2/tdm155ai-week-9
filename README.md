# tdm155ai-week-9

TDM 155AI week 9 (class 2026-11-04): Agents and systems. Unit 3 begins: beyond the single piece. A local Next app in `nextjs/` with three parts, one per link in the nav, and a sample repository beside it:

- **Docs** (`/docs`, Markdown in `nextjs/content/docs/`): the ensemble on paper (a proposal for the in-class paper activity), what an agent is, and how the screen version works.
- **Ensemble** (`/ensemble`, code in `nextjs/app/ensemble/`): four roles read a context repository and brief a podcast host. A **Conductor** sees the file list and proposes who reads what; an **Archivist** reads the files and writes a map; a **Researcher** reads the map, not the files, and looks things up on the web; a **Briefer** writes the host's one-page briefing. The person at the keyboard is above all four: they pick the folder, withhold files from the whole ensemble, approve or change the plan, and can edit any card before the next role reads it. Every system prompt is on the page and editable; every request is shown before it's sent; the whole run comes out as a **trace** (Markdown) that prints, for marking up on paper.
- **Remix** (`/remix`, code in `nextjs/app/remix/`): an identical copy of the ensemble for students to change. Everything it needs is in its folder, including its own server routes, so changing it never touches `/ensemble`.
- **`sample-context-repo/`**: an invented student's context repository for a letterpress-and-stop-motion piece about the two versions of Emily Dickinson's "Safe in their Alabaster Chambers," with primary documents, secondary criticism, an unchecked AI summary, dictated notes, process logs, prompts, Slack posts, credits, and a `private/` folder and a venting note that should be withheld. *Use the sample repository* on the Ensemble page loads it. The poem, the versions, Sue's objection, and the books are real; the student and everything else are not.
- **`examples/`**: one real run on the sample (October 30, Claude Haiku 5.5, every file allowed so the Conductor had to decide about `private/` itself): the trace, 900 lines, ready to print for the paper exercise, and the briefing it produced.

Private, in the `ll-26-27` org; a standalone repo (not nested in The Notebook), cloned at `~/Development/tdm155ai-week-9`.

## Run it

Copy `.env.example` to `.env` at the repo root and add `OPENROUTER_API_KEY`. Then:

```
cd nextjs
pnpm install
pnpm dev
```

Open http://localhost:3000/ensemble in Chrome. Press *Use the sample repository*, untick `private/` and `notebook/venting.md`, write a line about the piece, and press *Run all three*. Or ask the Conductor first.

## How it works

- `nextjs/app/ensemble/prompts.mjs`: the four roles, their system prompts, the function that composes each role's message (what it's given), the request body, and the parser for the Conductor's plan. The page imports this file to show exactly what will be sent; the route imports it to build the request.
- `nextjs/app/ensemble/Ensemble.jsx` (in the browser): the four steps. Reads a folder picked with the browser's folder input (text files only, whole, skipping `node_modules`, `.git`, `_media`, `_raw`, `output`, and dotfiles), keeps the session in localStorage, composes each request, and records each card with what was sent, what came back, its cost, and whether a person edited it.
- `nextjs/app/ensemble/api/run/route.js`: one model call for one role. POST `{ model, role, instructions, message }` to OpenRouter's chat completions; the Researcher's call adds the web plugin (Exa, up to six results) and returns its citations as `sources`. Default model Claude Haiku 5.5; Sonnet and Opus 5.5 on the page. Keys come from the repo's root `.env` through `lib/keys.mjs` and never reach the browser.
- `nextjs/app/ensemble/api/sample/route.js`: serves `sample-context-repo/` to the page with the same filter.
- `nextjs/app/ensemble/trace.mjs`: the trace as Markdown: the file table (allowed, withheld, who got what), then per role what it was told, what it was given, what it said, pages it used, and whether a person edited it. Downloaded as `trace.md`, or printed (print hides everything but the trace).
- The Markdown site (`lib/content.mjs`, `/docs`, `/print`, the catch-all) is week 8's, unchanged.

## Where it came from

**Copied 2026-10-30 from `tdm155ai/tdm155ai-week-8` at `3e335a6`**, the Markdown-rendering parts of its Next app only: `lib/content.mjs`, `lib/keys.mjs`, the catch-all page, `/print`, `/context-media`, `/docs`, the components, and the CSS. Left behind: the interview machines and their docs. The ensemble's request and route follow the shape of week 8's mwRemix `api/suggest`. Unlike week 8, nothing an agent is given is ever cut: no per-file or total character caps. If a role is given more than the model can take, the route reports the model's refusal and the fix is fewer files for that role, never shorter ones.

Written by Claude on 2026-10-30 with Madeleine, from Marlon's Story of Week 9 canvas (theme: agents and systems; Unit 3, beyond the single work) and his October 29 hackathon-readout notes (software as a jig; the transcript and the archive as what persists; understanding the agents by laying their activity out on paper). Tested that day: `pnpm build`, the five prompt and trace tests (`pnpm test`), and two full runs on the sample through the live routes with Claude Haiku 5.5. The first run found that a Claude model given a whole repository spends its entire output budget on hidden reasoning and answers with nothing, so the request now caps reasoning at a small budget (the newer models refuse to turn it off); the second run is in `examples/`. Not yet run with students or on paper; the paper activity is a proposal.
