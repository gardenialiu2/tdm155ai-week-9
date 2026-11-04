---
title: Podcast prep with Claude Code subagents
description: How the parent Claude session runs the Collector, Interviewer, Sidekick, and Producer to prepare a 15-minute podcast interview, and what is in .claude/utils/podcast/
author: claude
---

The podcast prep team from the week 9 web app and the Slack producer, as four Claude Code subagents in `.claude/agents/`:

| Title | Subagent | Role ID |
|---|---|---|
| Collector | `podcast-collector` | `intake` |
| Interviewer | `podcast-interviewer` | `interviewer` |
| Sidekick | `podcast-sidekick` | `sidekick` |
| Producer | `podcast-producer` | `producer` |

The parent Claude session (the one you talk to) coordinates them. There is no slash command. You ask in plain language.

## What's in this folder

Everything the agents need is here, in `.claude/utils/podcast/`. Claude Code doesn't load anything from `.claude/utils/` on its own; the agents name these files explicitly.

- `contract.md`: the shared reference every agent reads (roles, outputs, statuses, finish rule, headings, storage).
- `prep.mjs`: the deterministic helper that keeps the session on disk and checks every output. `node .claude/utils/podcast/prep.mjs help` lists its commands.
- `read.mjs`: the Collector's reading tools, used by `prep.mjs intake`: text files, links, and transcription (ffmpeg, then OpenRouter's `openai/gpt-4o-mini-transcribe`, with `OPENROUTER_API_KEY` from the repo's `.env`). It was adapted from the web app's `nextjs/lib/podcast/read.mjs` and doesn't depend on it.
- `README.md`: this guide, for the parent session.

A parked coordinator skill draft is in `draft-skills/podcast-prep/SKILL.md`. Nothing loads it, and nothing here depends on it.

## Asking for it

> Prep my podcast interview with the podcast agents. Read .claude/utils/podcast/README.md first. Start a session called "Rowan Ellery: audio walk", and add ~/Desktop/notes.md, ~/Desktop/memo.m4a, and this note: "…".

Then, as you add more:

> Add ~/Desktop/sketch.png to the Rowan session and continue.

And to finish:

> I'm done adding material; make the briefing.

To name one agent directly: "Use the podcast-interviewer subagent on item i002 of session <id>", or @-mention it (`@agent-podcast-interviewer`).

## How the parent session runs it

All state goes through the helper, run from the repo root (`P` below stands for `node .claude/utils/podcast/prep.mjs`).

1. **Session.** `P list` to find one, or `P new "<guest or project>"`. Tell the person the session ID and where it's stored.
2. **Material.** Only what the person explicitly gave: paths, pasted text, URLs. Delegate to **podcast-collector** with the session ID and the exact material. It saves every original first, then reads, transcribes, or describes each item and reports the item IDs and any failures.
3. **Per item, as each becomes ready.** Delegate to **podcast-interviewer** for items whose next step is `interviewer`, then to **podcast-sidekick** for items whose next step is `sidekick` (`P status <s>` shows "next:" for each item). Different items can run in parallel; on the same item the Sidekick waits for the Interviewer. After each, tell the person which agent ran, what it received, what it produced, and the handoff.
4. **Failures.** Show them as they are. Retry with `P retry <s> <item> <agent>` and run that agent again. A missing key or tool: name it and carry on with the items that don't need it.
5. **Finish.** Only when the person explicitly says they're done: `P finish <s>`. Then do the revision's remaining per-item work. If `P check <s>` reports failures, ask the person to retry or proceed with gaps (`P finish <s> --proceed`, only on their say-so). When it says Ready, delegate to **podcast-producer** with the session ID and revision. Show its briefing path and the gaps it names.
6. **After a briefing.** New material goes into the next revision automatically. `P status <s>` marks which later items each briefing doesn't include. A new briefing happens only on another explicit "done".
7. **Resume.** In a new conversation, `P list` and `P status <s>` pick up from the saved state. A step left `running` by an interrupted agent can be reset with `P retry`.

There are no watchers, servers, schedules, or Slack posts: work happens only while the person is asking for it. Optional web lookups (a term, a reference) only where they help, and with the actual sources given in the briefing.

## Storage

`output/podcast-claude/<session>/` at the repo root (gitignored):

```
session.json                 title, open revision, closed revisions and briefing status
originals/i001-<name>        every submission, unchanged
items/i001/item.json         statuses (waiting|running|done|failed|skipped), errors, how it was read
items/i001/text.md           readable text or transcript
items/i001/interviewer.json  {"summary", "questions":[{"question","why"}]}
items/i001/sidekick.json     {"jokes":[{"idea","butt"}], "jokesNote"}
items/i001/attempts/         earlier outputs moved aside by retries
briefings/briefing-r1.md     one per revision, never overwritten
trace.jsonl                  every step: agent, what it received, what it produced, the handoff
```

This is separate from the web app's `output/podcast/`, whose `session.json` is written through a write queue that runs inside the Next server. A second writer from outside could corrupt an active web session, so the two don't share files.

Set `PODCAST_CLAUDE_ROOT` to put sessions somewhere else (the checks use a scratch folder this way).
