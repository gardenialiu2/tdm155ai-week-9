---
title: Podcast prep contract (Claude Code)
description: The four roles, per-item outputs, statuses, finish rule, briefing headings, and storage the Claude Code podcast agents share; each agent reads this file
author: claude
---

The Claude Code version of the podcast prep team in the week 9 web app (`nextjs/lib/podcast/`) and the Slack producer (`tdm155ai-podcast-producer`). The source of truth is `nextjs/lib/podcast/contract.mjs`; this file restates it for the agents in `.claude/agents/podcast-*.md`, which each read it. It is a plain reference, not a skill.

## The show

TDM 155AI, *Making Stuff in the Age of AI*, a Harvard course. A student (the guest) shares material about their creative work and process to prepare for a 15-minute podcast interview: the choices they made, how they used AI, what they threw out and why, what they learned, what they add as a person. Material may be the guest's own or something they found (a reference, an inspiration); say which, and never treat a find as theirs. AI-written summaries (including ours) are not the guest's words.

## The cast

| Title | Role ID | Subagent | Works on | Job |
|---|---|---|---|---|
| Collector | `intake` | `podcast-collector` | each item | saves originals, reads text out, transcribes sound, keeps the inventory |
| Interviewer | `interviewer` | `podcast-interviewer` | each item | a two-sentence reading and 2–4 questions tied to the item |
| Sidekick | `sidekick` | `podcast-sidekick` | each item, after the Interviewer | 0–3 optional warm openings; the guest always comes off well |
| Producer | `producer` | `podcast-producer` | a closed revision | the host briefing, only after the person says they're done |

The role IDs match the apps and stay fixed. The titles are what people see. A student may give the agents display names, but these never replace the IDs.

## Statuses

Each item has a status for each per-item agent: `waiting` → `running` → `done` | `failed` (with an error) | `skipped` (nothing to do: the Collector on pasted text; the Interviewer and Sidekick when the Collector failed). A retry puts a step back to `waiting`. The original is never touched, and earlier output is moved to `attempts/`.

## Outputs

Interviewer, per item:

```json
{"summary":"two-sentence reading","questions":[{"question":"Speakable question","why":"What in the item prompted it"}]}
```

Two to four questions. Each `why` names the detail in the item that prompted the question.

Sidekick, per item:

```json
{"jokes":[{"idea":"Optional opening","butt":"host"}],"jokesNote":""}
```

Zero to three jokes. `butt` must be `host`, `sidekick`, or `situation`, never the guest. With no jokes, `jokesNote` says why.

Producer, per closed revision: Markdown whose first line is exactly `# Host briefing (revision N, items 1–M)`, followed by exactly these `##` headings, in order:

1. The guest and the work
2. The central thread
3. Suggested beats
4. Questions and follow-ups
5. Optional sidekick moments
6. Names, references and terms
7. Handle with care / check before recording
8. Sources used and intake status

## The finish rule

- Only an explicit "I'm done; make the briefing" from the person closes revision N, which holds every item received so far. Nothing else closes a revision: not an invocation ending, not a pause.
- The Producer runs only when every item in revision N is finished (`done`, `failed`, or `skipped`) for all three per-item agents.
- A failed item blocks the Producer until it is retried or the person explicitly chooses to proceed with gaps. The briefing then names what wasn't read.
- Material that arrives after the close goes into revision N+1. A later briefing covers everything up to its own revision, and the earlier one is marked as not including the later items.

## Storage and the helper

Everything lives in `output/podcast-claude/<session>/` (gitignored): originals, readable text, each agent's output, `trace.jsonl`, session state, and `briefings/briefing-rN.md`. Every read and write goes through one helper, run from the repo root:

```bash
node .claude/utils/podcast/prep.mjs help
```

It saves originals unchanged with stable item IDs (`i001`…), checks every output against this contract before saving, refuses duplicates, and logs each step (who, what they received, what they produced, the handoff) to the trace. It never calls a chat model. Its reading and transcription tools are in `read.mjs` beside it.

This is a separate folder from the web app's `output/podcast/`. That app's `session.json` is written through a write queue that runs inside the Next server, so a second writer could corrupt an active session.

## Boundaries

- Only material the person explicitly gave: paths, pasted text, URLs. Never browse a folder they didn't choose.
- Never read or print API keys. If a key or tool is missing, say which, mark the step failed, and carry on with what doesn't need it.
- Never claim a file was read or transcribed if it wasn't.
- No servers, Slack posts, watchers, schedules, or hooks. Work happens only while the person has asked for it.
