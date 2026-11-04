---
name: podcast-prep
description: PARKED DRAFT, not installed. Coordinates the podcast prep subagents (Collector, Interviewer, Sidekick, Producer) to prepare a student's 15-minute podcast interview. Only becomes active if someone deliberately moves it into .claude/skills/.
author: claude
---

# Podcast prep (parked draft)

This is a draft for a possible future coordinator skill. It lives in `draft-skills/` deliberately, where Claude Code doesn't look for skills. The subagents in `.claude/agents/podcast-*.md` work without it. Today the person asks the parent session in plain language, following `.claude/utils/podcast/README.md`.

If this becomes a skill, it would:

1. Read `.claude/utils/podcast/contract.md`.
2. Start or select a session with `node .claude/utils/podcast/prep.mjs new|list|status`.
3. Send the person's explicitly given material to `podcast-collector`; then, as items become ready, run `podcast-interviewer` and `podcast-sidekick` on them, showing each handoff.
4. On an explicit "done", `finish`, wait for the revision's work, handle failures (retry, or proceed with gaps only on the person's say-so), then run `podcast-producer`.
5. Keep later material in the next revision, and never brief without an explicit "done".

Open questions before activating it: the skill's name and whether it should be user-invoked only (`disable-model-invocation: true`); and whether students should get display names for the agents (as aliases, never replacing the role IDs).
