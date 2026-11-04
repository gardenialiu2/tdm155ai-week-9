---
title: "Catalog: agent products, harnesses, APIs, and frameworks, with their official documentation"
description: "One card per agent-related product, harness, API, SDK, framework, protocol, and builder as of November 4, 2026: what it is, its building blocks, status, access and cost, and direct links to the official pages, each opened that day."
author: claude (research subagents K, L, M, and N, assembled by the RS pane)
date: 2026-11-04
status: draft; agent research, check before citing
order: 1
---

# Catalog

One card per thing a student or teacher might meet when building with agents, as of **November 4, 2026**. Each card gives the exact name and its layer (consumer app, harness, coding agent, API, SDK, framework, hosted platform, protocol, or no-code builder), a status line, what it is, its building blocks in the course's vocabulary, access and cost, one suggestion for class use, and the official documentation: links to the exact pages, opened by the researcher that day.

How to read the cards:

- **Status** is current, preview, historical, or retired, as of the date checked. Products in this field change weekly, so check again before relying on a version or price.
- **Official documentation** links go to the specific page (overview, agent loop, tools and permissions, quickstart, reference, changelog). Where a kind of page doesn't exist or couldn't be opened, the card says so instead of linking a home page. **Limits** records 403s, redirects, login walls, and anything read only in a search snippet.
- **In this class (adaptation)** is our suggestion, not a sourced fact.
- Note 01, *Agent products as of November 4*, has the longer comparison of the always-on consumer agents; essay 07 of the Lab's *Orchestration across industries* series (in the `mk-agent-studies` repository) has the history. For how the APIs changed over time, including why OpenAI retired the Assistants API, see [History](history.md); for the readings, see [Papers and essays](papers-and-essays.md).

For each card, ask the class questions: what loops, what routes, who decides the next step, what persists, which tool gets called, when a human steps in, and how you can inspect what happened.

## Agent products people encounter

These are the agents a student is likely to meet as an app, not as code: each runs on a vendor's cloud computer, keeps working after the chat closes, and returns to the person for approval. None of them has a public developer API for the agent itself; they are documented through help pages, launch posts, and safety write-ups, which is what these cards link.

### OpenAI dots (consumer app)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** A consumer agent inside ChatGPT, launched at DevDay (September 29, 2026, per note 01; OpenAI's own launch post was not readable). OpenAI: "Your dot is an always-on agent that keeps work moving across your tools and projects."

**How it acts.** Started by a message or call in ChatGPT, Slack, or Teams, by text (beta, U.S. Pro), by a saved schedule, or by itself: it "can decide when to pause and wake up to continue work." It "lives in the cloud and has its own computer and browser," uses installed plugins and, optionally, one connected personal computer. It can delegate "to ChatGPT Work or Codex" and run background agents. It keeps "its own notes about preferences, decisions, and ongoing work," separate from ChatGPT memory. Approval: four Custom Rules per kind of action ("Take action without asking," "Take action when you say so," "Ask before taking action," "Hand off to you"), plus an automatic review that decides whether an action "can proceed, needs your approval, or includes a step you must do yourself." The interface gives the dot a name and look, a profile, and an **Activity** view of delegated work. Pausing "doesn't stop every delegated task or cancel future scheduled runs."

**Status, November 4, 2026.** Rolling out. "We're expanding the family of frontier models that power dots to include GPT-6.1 Terra." What's new lists texting (Oct 26–30) and iOS widgets (Oct 12–16).

**Access and cost.** Pro 100/200/500 (outside the EEA, UK, Switzerland), Business Premium, and Enterprise (off by default). No dots price or quota on the pages read. No developer API.

**In this class (adaptation).** A model for the director character: one standing agent with explicit rules for when it acts alone and when it hands off.

**Official documentation.**

- **Official docs:** [Meet dots](https://learn.chatgpt.com/docs/dots)
- **Agent loop / architecture:** [Tasks and memory](https://learn.chatgpt.com/docs/dots/tasks-and-memory)
- **Tools, state, permissions:** [Control your dot](https://learn.chatgpt.com/docs/dots/controls)
- **Quickstart / example:** [Getting started](https://learn.chatgpt.com/docs/dots/getting-started)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** [What's new](https://learn.chatgpt.com/docs/whats-new)
- **Limits:** learn.chatgpt.com readable (old /codex/dots paths redirect to /docs/dots); openai.com and help.openai.com returned 403 to note 01, not retried; no launch-date page read.

**Sources.** [Meet dots, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/dots) (verified); [Control your dot, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/dots/controls) (verified); [Tasks and memory, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/dots/tasks-and-memory) (verified); [What's new, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/whats-new) (verified)

### ChatGPT Work (consumer app)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** A mode of ChatGPT for delegated tasks: "ChatGPT Work is a way to delegate real work to ChatGPT." Launched July 9, 2026 (note 01, from secondary press; the launch post was not read).

**How it acts.** The person switches from Chat to Work and states a task with an outcome (a deck, an analysis, a workflow). It runs locally through the desktop app (local files, apps, browser) or in Work Cloud, "a cloud container" that cannot reach your computer. It reads files and plugins (Drive, Gmail, Slack, SharePoint, Salesforce, GitHub, and others). Scheduled tasks can also fire on Gmail, Slack, or GitHub events, and "The **Scheduled** view acts as your inbox." The person can "follow progress, answer questions, change direction, and approve important actions"; permission modes are "Ask for approval," "Approve for me" (automatic review), "Full access," and custom. Models offered in the selector: GPT-6 Astra, GPT-6.1 Sol, Luna; What's new adds GPT-6.1 Terra (Oct 26–30). The pages read describe Projects but no Work-specific memory.

**Status, November 4, 2026.** Live; Work and Codex share "the same core capabilities."

**Access and cost.** Plan tiers not listed on the pages read. Enterprise use is billed in credits from a workspace pool; OpenAI's illustrative median was about $53 per employee per year, "not fixed prices." No developer API for Work.

**In this class (adaptation).** A scheduled observer: an event-triggered task that drafts a report and waits for sign-off.

**Official documentation.**

- **Official docs:** [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work)
- **Agent loop / architecture:** [ChatGPT Work overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview)
- **Tools, state, permissions:** [Permissions](https://learn.chatgpt.com/docs/permission-modes); [Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- **Quickstart / example:** [Get started with ChatGPT Work](https://learn.chatgpt.com/docs/get-started-with-work)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** [What's new](https://learn.chatgpt.com/docs/whats-new)
- **Limits:** [Usage and cost](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-usage-and-cost) covers enterprise credits only; consumer plan availability not stated; launch post not read.

**Sources.** [Get started with ChatGPT Work, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/get-started-with-work) (verified); [ChatGPT Work overview, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview) (verified); [Scheduled tasks, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/automations) (verified); [Permissions, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/permission-modes) (verified); [Usage and cost, OpenAI, read Nov 4](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-usage-and-cost) (verified)

### Grok Bot (consumer app)

**Status:** preview · checked 2026-11-04 · xAI (site branded SpaceXSI)

**What it is.** A desktop and iOS app of always-on agents, launched in beta August 11, 2026: "Grok Bot is your team of always-on agents." The x.ai pages are branded "SpaceXSI" in their titles, with xAI named as publisher in the page metadata. Grok Bot is a separate product from the @grok reply account on X, which the site lists as its own download ("Grok on X").

**How it acts.** You message a Bot "like a coworker" and hand off work. "Bots share a computer of their own in the cloud." "A chief of staff sits on top, with a specialist for each lane"; Bots message each other and join group chats. Show a Bot a task once and it "saves your workflow as a routine." Bots "remember conversations" and "only come back when something needs your approval." Team Bots (public beta, September 28) are shared Bots with context, plugins, credentials, and memories; "each person's conversations with it remain private." Data Bot answers warehouse questions with read-only credentials. Note 01's claim that managers approve shared-memory additions comes from Unite.AI; xAI's Team Bots page does not say it.

**Status, November 4, 2026.** Beta; Team Bots in public beta on Teams and Enterprise plans.

**Access and cost.** Included with SuperGrok (Plus, Heavy), Cursor Pro/Pro+/Ultra, and Cursor Teams; Bots have "their own usage, separate from your Grok and Cursor plans." No prices published. No Grok Bot API on the pages read (docs.x.ai covers the model API).

**In this class (adaptation).** The chief-of-staff-plus-specialists shape is a ready-made ensemble: one coordinator, three lanes.

**Official documentation.**

- **Official docs:** [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot)
- **Agent loop / architecture:** not found
- **Tools, state, permissions:** [Team Bots](https://x.ai/news/team-bots)
- **Quickstart / example:** [Grok Bot Guides](https://x.ai/bot/guides)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** [Grok Bot is now included with more plans](https://x.ai/news/grok-bot-more-plans)
- **Limits:** x.ai/bot and x.ai/changelog/bot returned 403; guides index shows blurbs only.

**Sources.** [Introducing Grok Bot, xAI/SpaceXSI, read Nov 4](https://x.ai/news/introducing-grok-bot) (verified); [Team Bots, xAI/SpaceXSI, read Nov 4](https://x.ai/news/team-bots) (verified); [Grok Bot is now included with more plans, read Nov 4](https://x.ai/news/grok-bot-more-plans) (verified); [Grok Bot changelog](https://x.ai/changelog/bot) (unverified: 403)

### Muse (consumer app)

**Status:** current · checked 2026-11-04 · Meta

**What it is.** Meta's personal agent app (iOS, Android, muse.ai), announced September 8, 2026, updated September 30: "Muse is a personal AI agent." Don't confuse the agent with its models: Meta's post says Muse is powered by **Muse Spark**, a model, and note 01 records the **Muse Wonder** models (October 12) that "will soon power experiences in Muse."

**How it acts.** It runs on Muse Secure VM, "an isolated linux box with a browser" holding the agent, your data, and credentials, so it works after the app closes. It can send email, book travel, browse, fill forms, launch subagents, build its own tools, and "write its own custom connectors." A separate agent, Sentinel, "is the sole permission authority for connector actions and network egress": it allows, denies, or asks, and swaps surrogate tokens for real credentials so Muse never sees secrets. Approvals appear in the app UI, not the chat, and can be one-time, session, task, time-bounded, or perpetual. The design: "one long conversation in a main chat," side chats, notifications "only when something is meaningfully new," and tapping the avatar shows "its full activity log as well as permissions you've approved." Memory persists and is editable and downloadable.

**Status, November 4, 2026.** Rolling out in the U.S.; glasses "coming soon."

**Access and cost.** "Free for most needs," with subscriptions for heavier use; no prices read. No developer API.

**In this class (adaptation).** Sentinel is a guardrail character: a second agent whose only job is to say yes, no, or ask.

**Official documentation.**

- **Official docs:** [Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)
- **Agent loop / architecture:** [How We Built Safety Into Muse](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)
- **Tools, state, permissions:** same page (Sentinel, approvals)
- **Quickstart / example:** [How We Designed Muse](https://introducing.muse.ai)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** not found
- **Limits:** security.muse.ai redirects to the research.meta.ai post; no Muse help center page found.

**Sources.** [Introducing Muse, Meta, read Nov 4](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) (verified); [How We Built Safety Into Muse, Meta AI Research, read Nov 4](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) (verified); [How We Designed Muse, Meta, read Nov 4](https://introducing.muse.ai) (verified)

### Claude Duet (consumer app)

**Status:** preview · checked 2026-11-04 · Anthropic

**What it is.** A research preview, published October 21, 2026, of "a new app where Claude works as a proactive agent," for professionals and small business owners; iOS, Android, and claude.ai, separate from the main Claude app. Built around Claude Opus 5.5 (the model; Duet is the product).

**How it acts.** It starts the day with a short brief, "checks your connected accounts every few hours," and messages you only when something needs attention, in one ongoing thread (typed or voice). Its browser runs on "a virtual machine with its own browser," and it "never sees your passwords, browser cookies, or the sign-in tokens." It reaches 6,000+ connectors and plugins and pays through Link or Shop Pay. Before it sends, pays, signs, or deletes, "it shows you the action, the destination, and the content, including every recipient" and waits; trading securities and moving money between accounts are refused even with approval. If you can't approve, it "finishes the rest of the task and brings the approval back to you later." A **Tasks** tab shows each task's page; "only you can mark a task as completed." It carries over Claude memory, skills, and connectors and keeps history until you delete it.

**Status, November 4, 2026.** Research preview, U.S. waitlist.

**Access and cost.** Included in Pro, Max, and Ultra, sharing Claude usage limits; background checks count toward them. No Duet API.

**In this class (adaptation).** The "brings the approval back later" rule is a clean pattern for a director who keeps the scene going while one decision waits.

**Official documentation.**

- **Official docs:** [Introducing Claude Duet](https://claude.com/resources/articles/claude-duet)
- **Agent loop / architecture:** [Claude Duet Safety, Privacy, and Security](https://claude.com/resources/articles/claude-duet-safety-privacy-and-security)
- **Tools, state, permissions:** same page
- **Quickstart / example:** [Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** not opened today (release notes read by note 01)
- **Limits:** help page shows "Updated this week," no date.

**Sources.** [Introducing Claude Duet, Anthropic, read Nov 4](https://claude.com/resources/articles/claude-duet) (verified); [Claude Duet Safety, Privacy, and Security, Anthropic, Oct 23, read Nov 4](https://claude.com/resources/articles/claude-duet-safety-privacy-and-security) (verified); [Get started with Claude Duet, Anthropic, read Nov 4](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet) (verified)

### Claude Cowork (consumer app)

**Status:** current · checked 2026-11-04 · Anthropic

**What it is.** Anthropic's task agent for non-programmers, missing from note 01: "Claude Cowork uses the same agentic architecture that powers Claude Code, with no terminal required." Desktop (beta on macOS, Windows, Linux), web, and mobile by plan.

**How it acts.** You give it a multi-step task; "Claude's work runs on Anthropic's servers, in an isolated environment," and reaches your computer through the Claude Desktop app when needed. It reads and writes only "folders you've connected," drives a browser, and produces spreadsheets, decks, and documents. It "breaks complex work into smaller tasks and coordinates parallel workstreams." Scheduled tasks "run in the cloud, with no device online" (`/schedule`). Three modes decide who approves: Manual asks before actions, Auto reviews each action and blocks unsafe ones, Skip runs without checks; permanent deletion always needs permission. Sessions continue if you close the laptop and open "from any surface"; cloud sessions start from Claude memory, which you can switch off per task.

**Status, November 4, 2026.** Available on paid plans; desktop in beta.

**Access and cost.** Pro, Max, Ultra, Team, Enterprise (Enterprise owner must enable). No Cowork API; developers build similar agents with Anthropic's SDKs (see subagent M's Claude Code card).

**In this class (adaptation).** Manual, Auto, and Skip map directly onto how much freedom the class gives each persona agent.

**Official documentation.**

- **Official docs:** [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)
- **Agent loop / architecture:** same page
- **Tools, state, permissions:** same page
- **Quickstart / example:** same page
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** not found
- **Limits:** one help page read; "Updated this week," no date; launch date not checked.

**Sources.** [Get started with Claude Cowork, Anthropic, read Nov 4](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork) (verified)

### Tasks in Gemini, formerly Gemini Spark (consumer app)

**Status:** current · checked 2026-11-04 · Google

**What it is.** Google's background agent in the Gemini app, announced at I/O on May 19, 2026 as Gemini Spark, "a 24/7 personal AI agent." Google's help center now says: "Since May, we've been testing Spark in beta with our subscribers ... so we renamed it Task." Not to be confused with Meta's Muse Spark model. Google says Spark "runs on Gemini 3.5 and uses the Antigravity harness."

**How it acts.** You switch to task mode and state goals and timing; "Schedules: automated triggers for a task that tell Gemini when to execute your instructions," at a set time or "in response to an event," up to 15 running at once. It uses Connected Apps, skills, chats, signed-in websites, Personal Intelligence, and location; it works through your local Chrome or a remote cloud browser and takes Workspace actions (Calendar, Gmail, Drive, Docs). Approval always comes before sending communications, purchases, submitting forms, and Google sign-in, and before web browsing on each task after the first grant; you can take over the browser. The help page warns: "If a schedule runs when you are offline, you may not be able to stop Gemini from completing an unintended action." Turning off task mode pauses schedules without deleting them.

**Status, November 4, 2026.** Live as Task; the rename was reported around October 12 (secondary, not read).

**Access and cost.** Google AI Pro or Ultra, 18+, personal account, not in the EEA, UK, Switzerland, or Nigeria. No price on pages read. No developer API for the agent.

**In this class (adaptation).** Schedules plus an explicit list of always-approve actions make a simple observer contract.

**Official documentation.**

- **Official docs:** [The Gemini app becomes more agentic](https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/)
- **Agent loop / architecture:** not found
- **Tools, state, permissions:** [Manage your tasks & workflows in Gemini Apps](https://support.google.com/gemini/answer/16596215?hl=en)
- **Quickstart / example:** same help page ("Create a task")
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** help page "Where did Spark go?" entry
- **Limits:** help page undated; Google's Oct 8 enterprise "Gemini at Work" agent not checked.

**Sources.** [The Gemini app becomes more agentic, Google, May 19, read Nov 4](https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/) (verified); [Manage your tasks & workflows in Gemini Apps, Google, read Nov 4](https://support.google.com/gemini/answer/16596215?hl=en) (verified); [9to5Google, Spark task redesign, Oct 12](https://9to5google.com/2026/10/12/gemini-spark-task-redesign/) (unverified: search result only)

## Always-on harnesses

Open-source harnesses you install on your own machine or server: they supply the loop, tools, channels, schedules, memory files, and permissions, and you bring the model. Claude Code and Codex are in subagent M's section.

### OpenClaw (harness)

**Status:** current · checked 2026-11-04 · OpenClaw (open source)

**What it is.** A self-hosted "gateway that connects Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo, and more to AI coding agents"; TypeScript/Node, MIT, repository created November 24, 2025.

**Building blocks.** The **agent loop** is "the serialized, per-session run that turns a message into actions and a reply: intake, context assembly, model inference, tool execution, streaming, persistence," with lifecycle events and `agent.wait` returning `ok|error|timeout`. **Model vs. harness:** a provider and model are chosen separately from the **agent runtime** ("the low-level loop"), which can be OpenClaw's own or an external one such as `codex` or `claude-cli`. **Tools:** read/exec/edit/write always present, filtered by tool policy; **skills** and **plugins** add more. **Instruction files:** `AGENTS.md`, `SOUL.md`, `IDENTITY.md`, `USER.md`, `MEMORY.md` injected at session start. **Memory:** "plain Markdown files ... there is no hidden state." **Routing:** bindings send each channel account to an isolated agent. **Subagents:** `sessions_spawn`, `sessions_yield`, `subagents`. **Triggers:** Automations (cron, webhooks, Gmail), hooks, and standing orders; the old heartbeat is now a "Proactive check" job every 30 minutes that answers `NO_REPLY` when quiet. **Stops:** per-attempt timeouts, cancellation, `before_tool_call` `{ block: true }`. **Permissions:** exec approvals and allowlists, sandbox. **Traces:** `openclaw logs` and an activity ledger (`openclaw audit`).

**Status, November 4, 2026.** v2026.10.10 (November 3, latest); v2026.11.5-beta.1 (November 4) adds "persistent streams and richer execution context for durable scheduled work."

**Access and cost.** Free, MIT; you pay your model provider.

**In this class (adaptation).** One gateway, three bound agents with their own `SOUL.md`, one Proactive check as the observer.

**Official documentation.**

- **Official docs:** [Agent runtime](https://docs.openclaw.ai/concepts/agent)
- **Agent loop / architecture:** [Agent loop](https://docs.openclaw.ai/concepts/agent-loop); [Agent runtimes](https://docs.openclaw.ai/concepts/agent-runtimes)
- **Tools, state, permissions:** [Tools](https://docs.openclaw.ai/tools); [Session tools](https://docs.openclaw.ai/concepts/session-tool); [Multi-agent routing](https://docs.openclaw.ai/concepts/multi-agent); [Approvals](https://docs.openclaw.ai/cli/approvals); [Memory overview](https://docs.openclaw.ai/concepts/memory); [Automation](https://docs.openclaw.ai/automation); [Standing orders](https://docs.openclaw.ai/automation/standing-orders); [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat); [Audit records](https://docs.openclaw.ai/cli/audit)
- **Quickstart / example:** [Getting started](https://docs.openclaw.ai/start/getting-started)
- **API / SDK reference:** [Agent CLI](https://docs.openclaw.ai/cli/agent) (listed in llms.txt; not opened)
- **Changelog / migration / deprecation:** [Releases](https://github.com/openclaw/openclaw/releases)
- **Limits:** docs read as Markdown via llms.txt and `.md` URLs; releases read through the GitHub API.

**Sources.** [OpenClaw docs (pages above), read Nov 4](https://docs.openclaw.ai/llms.txt) (verified); [openclaw/openclaw releases, read Nov 4](https://github.com/openclaw/openclaw/releases) (verified)

### Hermes Agent (harness)

**Status:** current · checked 2026-11-04 · Nous Research

**What it is.** "The self-improving AI agent built by Nous Research": an open-source, self-hosted agent in Python with a TUI, a messaging gateway, a desktop app, and Docker images; MIT; repository created July 22, 2025 (launch date disputed, note 01). "Use any model you want."

**Building blocks.** **Agent loop:** `AIAgent` builds the prompt, calls the model (three API modes: chat completions, Codex Responses, Anthropic Messages), and "If tool_calls: execute them, append results, loop back"; "If text response: persist session, flush memory if needed, return." **Stops:** an `IterationBudget`, default 500 (`agent.max_turns`), where "At 100%, the agent stops and returns a summary"; calls are interruptible by a new message or `/stop`. **Tools:** "70+ registered tools across ~28 toolsets," plus MCP and six terminal backends (local, Docker, SSH, Modal, Daytona, Vercel Sandbox). **Subagents:** `delegate_task` "Spawns subagent(s) with isolated context," each capped by `delegation.max_iterations` (default 50). **Instruction files:** first match of `.hermes.md`, `AGENTS.override.md`, `AGENTS.md`, `CLAUDE.md`, plus a global `SOUL.md`. **Memory:** `MEMORY.md` (2,200 chars) and `USER.md` (1,375 chars), SQLite/FTS5 session search, agent-written skills (agentskills.io). **Schedules:** cron jobs in natural language or cron syntax, with attached skills and delivery to any platform. **Routing:** one gateway for 25+ platforms with allowlists. **Permissions:** dangerous-command approval (`smart | manual | off`; cron defaults to `deny`). **Traces:** progress callbacks; ShareGPT-format trajectories.

**Status, November 4, 2026.** v0.22.7 (November 3: cron jobs that post into Group Chats, pinned Kanban boards) and v0.22.6 (November 2: `hermes cron cancel`, a per-job missed-run policy), both patch roll-ups.

**Access and cost.** Free, MIT; pay your model provider (Nous Portal, OpenRouter, others).

**In this class (adaptation).** A persona cast as `SOUL.md` files, with a cron job as the nightly observer.

**Official documentation.**

- **Official docs:** [Hermes Agent README](https://github.com/NousResearch/hermes-agent)
- **Agent loop / architecture:** [Architecture](https://hermes-agent.nousresearch.com/docs/developer-guide/architecture); [Agent Loop Internals](https://hermes-agent.nousresearch.com/docs/developer-guide/agent-loop)
- **Tools, state, permissions:** [Tools](https://hermes-agent.nousresearch.com/docs/user-guide/features/tools); [Memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory); [Skills](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills); [Context files](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files); [Cron](https://hermes-agent.nousresearch.com/docs/user-guide/features/cron); [Security](https://hermes-agent.nousresearch.com/docs/user-guide/security)
- **Quickstart / example:** [Quickstart](https://hermes-agent.nousresearch.com/docs/getting-started/quickstart)
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [Releases](https://github.com/NousResearch/hermes-agent/releases)
- **Limits:** docs are HTML (read as stripped text); llms.txt exists; releases read through the GitHub API.

**Sources.** [Hermes Agent docs (pages above), Nous Research, read Nov 4](https://hermes-agent.nousresearch.com/llms.txt) (verified); [NousResearch/hermes-agent README and releases, read Nov 4](https://github.com/NousResearch/hermes-agent/releases) (verified)

## Coding agents and harnesses

A coding agent is a model inside a harness: the harness runs the loop, supplies the tools, loads instruction files, keeps sessions, and asks permission, while the model decides what to do next. The class runs Claude Code and Codex panes side by side in cmux, so those three cards come first.

### Claude Code (harness)

**Status:** current · checked 2026-11-04 · Anthropic

**What it is.** Anthropic's agentic coding harness: a CLI plus IDE extensions, a desktop app, and cloud sessions, first released February 2025 (note 01). The docs draw the line this class needs: "Claude Code is the layer around the model that provides the tools and manages the context the model sees. This surrounding layer is what the term agentic harness refers to." The model (Claude Sonnet or Opus) does the reasoning.

**Building blocks.** A loop of "gather context, take action, and verify results"; built-in tools (files, search, shell, web); `CLAUDE.md` or `AGENTS.md` plus auto memory (`MEMORY.md`); skills; subagents in their own context windows; hooks; MCP; permission modes (Auto, Manual, Accept edits, Plan); checkpoints; resumable and forkable sessions; `/loop` and `/schedule` triggers.

**Status, November 4, 2026.** v2.1.318 released November 4 (GitHub releases; note 01 lists the week's changes).

**Access and cost.** A Claude subscription (Pro, Max, Ultra, Team, or Enterprise), a Claude Console account, or a supported cloud provider, per the quickstart read November 4.

**In this class (adaptation).** Make each persona a subagent file and let the main session be the director, or run one persona per pane.

**Official documentation.**

- **Official docs:** [Overview - Claude Code Docs](https://code.claude.com/docs/en/overview)
- **Agent loop / architecture:** [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works)
- **Tools, state, permissions:** [Configure permissions](https://code.claude.com/docs/en/permissions); [Extend Claude Code](https://code.claude.com/docs/en/features-overview)
- **Quickstart / example:** [Quickstart](https://code.claude.com/docs/en/quickstart)
- **API / SDK reference:** [Run Claude Code programmatically](https://code.claude.com/docs/en/headless)
- **Changelog / migration / deprecation:** [Claude Code changelog](https://code.claude.com/docs/en/changelog)
- **Limits:** none; Markdown twins via code.claude.com/docs/llms.txt.

**Sources.** [How Claude Code works, Anthropic, read Nov 4, 2026](https://code.claude.com/docs/en/how-claude-code-works.md) (verified); [anthropics/claude-code releases, GitHub, read Nov 4, 2026](https://github.com/anthropics/claude-code) (verified via GitHub API); note 01.

### OpenAI Codex (coding agent)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** OpenAI's coding agent, available as the open-source Codex CLI (Apache-2.0, Rust), an IDE extension, Codex Cloud, and a Codex mode in the ChatGPT desktop app, plus the Codex SDK and an App Server. The models (GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna, per the Codex manual) are separate from the harness; the glossary describes the App Server as a "Local JSON-RPC server for embedding Codex threads, turns, approvals, history, and streamed events in custom clients."

**Building blocks.** Threads and turns; `AGENTS.md`; skills and plugins; MCP; subagents and custom agents; memories; hooks ("A lifecycle handler that runs when a Codex event matches"); sandbox modes `read-only`, `workspace-write`, `danger-full-access`, with approval rules and an auto-review agent; `codex exec` for scripts; a GitHub Action; scheduled or event-triggered automations.

**Status, November 4, 2026.** Codex CLI 0.166.0 (October 29); GPT-6.1 Terra arrived in Work and Codex October 26. The old Codex MCP server was removed in favor of the App Server.

**Access and cost.** Included in ChatGPT Free ($0, quick tasks), Go ($8/mo), Plus ($20), Pro (from $100; $100, $200, or $500), Business ($20/user/mo annual, $25 monthly), Enterprise and Edu (sales). Alternatively, an API key billed at API rates, with no cloud features (pricing page, read November 4).

**In this class (adaptation).** One Codex pane per persona, each with its own `AGENTS.md`; an observer can be a `codex exec` call in a shell loop.

**Official documentation.**

- **Official docs:** [Codex CLI | ChatGPT Learn](https://learn.chatgpt.com/docs/codex/cli)
- **Agent loop / architecture:** [Codex App Server](https://learn.chatgpt.com/docs/app-server.md) (threads, turns, events); [Glossary](https://learn.chatgpt.com/docs/glossary.md)
- **Tools, state, permissions:** [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security); [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- **Quickstart / example:** [openai/codex](https://github.com/openai/codex) (README)
- **API / SDK reference:** [Codex SDK](https://learn.chatgpt.com/docs/codex-sdk)
- **Changelog / migration / deprecation:** [ChatGPT & Codex changelog](https://learn.chatgpt.com/docs/changelog)
- **Limits:** developers.openai.com/codex now redirects (308) to learn.chatgpt.com; OpenAI's "Unrolling the Codex agent loop" post returned 403, so no first-party loop essay is linked.

**Sources.** [Codex pricing, ChatGPT Learn, read Nov 4, 2026](https://learn.chatgpt.com/docs/pricing) (verified); [Codex manual, ChatGPT Learn, read Nov 4, 2026](https://learn.chatgpt.com/docs/codex-manual.md) (verified).

### cmux (harness)

**Status:** current · checked 2026-11-04 · Manaflow

**What it is.** A native macOS terminal (Swift and AppKit on libghostty) built for running CLI coding agents side by side, from Manaflow. The app is GPL-3.0-or-later; its server parts are under the Business Source License 1.1. It hosts other harnesses (Claude Code, Codex, OpenCode, Gemini CLI, Aider) rather than being a model or an agent itself.

**Building blocks.** Workspaces, split panes, and vertical tabs showing branch, PR, ports, and the latest notification; notification rings when an agent needs input (OSC 9/99/777 or `cmux notify`); a scriptable in-app browser; a `cmux` CLI and Unix socket API to create panes, send keystrokes, and read screens; hooks, skills, custom commands; `cmux claude-teams`; SSH workspaces; session restore; Cloud VMs.

**Status, November 4, 2026.** v0.65.2.2 (October 27, 2026); 0.65.2 (October 14) made agent sessions resume after relaunch.

**Access and cost.** The app is free and open source. Paid Cloud: Pro $50/mo ($40 yearly), Max $200/mo, Team $60/user/mo, Enterprise custom; a $15 Plus tier appeared in only one version of the page (read November 4).

**In this class (adaptation).** The stage itself: the director pane drives persona panes through the socket API, and notification rings show which actor is waiting.

**Official documentation.**

- **Official docs:** [Concepts — cmux docs](https://cmux.com/docs/concepts)
- **Agent loop / architecture:** none public (cmux hosts other agents' loops)
- **Tools, state, permissions:** [Notifications — cmux docs](https://cmux.com/docs/notifications)
- **Quickstart / example:** [Getting Started — cmux docs](https://cmux.com/docs/getting-started)
- **API / SDK reference:** [CLI Reference — cmux docs](https://cmux.com/docs/api)
- **Changelog / migration / deprecation:** [Changelog](https://cmux.com/docs/changelog.md)
- **Limits:** macOS only; cmux.com/llms.txt indexes the docs.

**Sources.** [manaflow-ai/cmux, GitHub, read Nov 4, 2026](https://github.com/manaflow-ai/cmux) (verified); [cmux pricing, read Nov 4, 2026](https://cmux.com/pricing) (verified).

### Cursor (coding agent)

**Status:** current · checked 2026-11-04 · Anysphere (Cursor)

**What it is.** An AI code editor (a VS Code fork) with local agents, cloud agents, a CLI, and an Agent SDK. Press reports say SpaceX acquired Anysphere in August 2026 and folded Cursor into SpaceXAI.

**Building blocks.** An agent with tools (terminal, browser, search, canvas); rules; subagents; hooks; cloud agents with configurable environments; automations triggered by PR, comment, and CI events, chat mentions, webhooks, or a cron schedule; the Agent SDK, which defines "an agent as a folder of code," tests it with evals, and deploys it.

**Status, November 4, 2026.** Agent SDK generally available October 20; cloud-agent canvases and an Environments API beta October 16; remote control of local agents from iOS October 6.

**Access and cost.** Free ($0, limited agent requests); Plus $8/mo (Grok models only, no cloud agents); Premium $30 (cloud agents and automations, Bugbot, third-party models at API list price); Super $100; Ultra $200; Teams from $30/user (pricing page, read November 4).

**In this class (adaptation).** A cron-triggered cloud agent makes a cheap observer that reports on the repo each hour.

**Official documentation.**

- **Official docs:** [Overview | Cursor Docs](https://cursor.com/docs/agent/overview)
- **Agent loop / architecture:** [Cloud Agents](https://cursor.com/docs/cloud-agent)
- **Tools, state, permissions:** [Subagents](https://cursor.com/docs/subagents); [Hooks](https://cursor.com/docs/hooks)
- **Quickstart / example:** [Quickstart](https://cursor.com/docs/get-started/quickstart)
- **API / SDK reference:** [Agent SDK](https://cursor.com/docs/agent-sdk)
- **Changelog / migration / deprecation:** [Cursor changelog](https://cursor.com/changelog)
- **Limits:** Markdown via cursor.com/llms.txt.

**Sources.** [Cursor pricing, read Nov 4, 2026](https://cursor.com/pricing) (verified); [SpaceX makes its $60bn Cursor takeover official, The Next Web](https://thenextweb.com/news/spacex-cursor-acquisition-official-60-billion) (unverified: search result only).

### GitHub Copilot cloud agent (coding agent)

**Status:** current · checked 2026-11-04 · GitHub (Microsoft)

**What it is.** GitHub's background coding agent, formerly the "coding agent," now documented as the Copilot cloud agent and, in its new form, "Copilot in the cloud." It researches, edits, and runs tests on a repository and opens a pull request. It runs in GitHub Actions (one repository, 59-minute maximum) or a cloud sandbox (several repositories, resumable).

**Building blocks.** Tasks assigned from chat, the Copilot panel on an issue or PR, the Agents tab, or security alerts; automations on a schedule or repository events; one PR per task; Agent Merge to fix failing checks; custom agents, agent skills, MCP servers, hooks, custom instructions.

**Status, November 4, 2026.** The new cloud experience reaches paid plans from October 28, 2026; GitHub Enterprise now includes Copilot (changelog, October 28).

**Access and cost.** Free $0 (no cloud agent); Pro $10; Pro+ $39; Max $100. Usage is metered in AI credits (1 credit = $0.01): Pro gets $15 a month, Pro+ $70, Max $200. Verified students get a Copilot Student plan (plans page, read November 4).

**In this class (adaptation).** File one issue per actor change and let the agent answer with PRs; an automation on PR events plays the critic.

**Official documentation.**

- **Official docs:** [GitHub Copilot on GitHub.com and GitHub Mobile](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github)
- **Agent loop / architecture:** not found as a separate page
- **Tools, state, permissions:** [Custom agents](https://docs.github.com/en/copilot/concepts/customizations/custom-agents); [Hooks for GitHub Copilot](https://docs.github.com/en/copilot/concepts/customizations/hooks)
- **Quickstart / example:** [GitHub Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent)
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [GitHub Changelog: copilot](https://github.blog/changelog/label/copilot/)
- **Limits:** the old "about coding agent" URL redirects to the surfaces page above.

**Sources.** [Copilot plans, GitHub, read Nov 4, 2026](https://github.com/features/copilot/plans) (verified).

### Google Antigravity (coding agent)

**Status:** current · checked 2026-11-04 · Google

**What it is.** Google's agent-first coding platform: a desktop app ("command center" for background agents), an IDE, the Antigravity CLI (`agy`), IDE extensions (VS Code, JetBrains, Visual Studio, Zed, Xcode), and a Python SDK. Google's Jules turndown notice calls it "our agent-first platform."

**Building blocks.** Custom subagents; `/teamwork` agent teams; skills; rules (`GEMINI.md`, `AGENTS.md`); permissions; remote agents; Automations (Scheduled, Always on, Paused); `/browser`; headless mode; Agent Client Protocol; a plugin marketplace.

**Status, November 4, 2026.** App v2.29.0 (November 3) redesigned Automations and added voice mode and remote agents. Gemini CLI's free individual access moved here on June 18, 2026 (Gemini CLI README).

**Access and cost.** Individuals $0 with basic weekly rate limits; Google AI Pro and Ultra add limits and an AI credit pool (prices not shown); Business through Google Cloud from $30/seat/mo, or pay-as-you-go with no seat fee (pricing page, read November 4).

**In this class (adaptation).** `/teamwork` is a ready-made ensemble, and an "Always on" automation can serve as an observer.

**Official documentation.**

- **Official docs:** [Get started | Google Antigravity Docs](https://antigravity.google/docs/getting-started)
- **Agent loop / architecture:** [Custom subagents](https://antigravity.google/docs/subagents)
- **Tools, state, permissions:** [Permissions](https://antigravity.google/docs/permissions)
- **Quickstart / example:** [Migration - Antigravity CLI](https://antigravity.google/docs/cli/gcli-migration) (from Gemini CLI)
- **API / SDK reference:** [Antigravity SDK](https://antigravity.google/product/antigravity-sdk)
- **Changelog / migration / deprecation:** [Changelog](https://antigravity.google/docs/changelog)
- **Limits:** none; index at antigravity.google/llms.txt.

**Sources.** [Antigravity pricing, Google, read Nov 4, 2026](https://antigravity.google/pricing) (verified).

### Gemini CLI (harness)

**Status:** current · checked 2026-11-04 · Google

**What it is.** Google's open-source terminal agent (Apache-2.0, TypeScript), which runs Gemini models. Its free consumer access now lives in Antigravity CLI, which keeps Gemini CLI's conventions.

**Building blocks.** Built-in tools; `GEMINI.md` context files; MCP servers in `~/.gemini/settings.json`; extensions; subagents; a policy engine for tool approval; sandboxing; headless mode with `--output-format json` or `stream-json`.

**Status, November 4, 2026.** v0.66.0 stable and v0.67.0-preview.0 (October 27), nightly November 4 (GitHub releases). The README says: "Free individual access and Google AI Pro / Ultra (Google One) moved to Antigravity CLI on June 18, 2026." The docs site's changelog page still shows v0.64.0.

**Access and cost.** Open source; the README says there is no free tier. Use a Gemini API key or Google Cloud billing.

**In this class (adaptation).** Headless JSON output makes it easy to use as one node in a scripted three-node graph.

**Official documentation.**

- **Official docs:** [Get started with Gemini CLI](https://geminicli.com/docs/get-started/)
- **Agent loop / architecture:** [Subagents](https://geminicli.com/docs/core/subagents/)
- **Tools, state, permissions:** [Policy engine](https://geminicli.com/docs/reference/policy-engine/)
- **Quickstart / example:** [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) (README)
- **API / SDK reference:** [Headless mode reference](https://geminicli.com/docs/cli/headless/)
- **Changelog / migration / deprecation:** [Releases](https://github.com/google-gemini/gemini-cli/releases); [Migration - Antigravity CLI](https://antigravity.google/docs/cli/gcli-migration)
- **Limits:** the docs changelog lags GitHub releases.

**Sources.** [gemini-cli README, GitHub, read Nov 4, 2026](https://github.com/google-gemini/gemini-cli) (verified).

### Jules (coding agent)

**Status:** retired · checked 2026-11-04 · Google

**What it is.** Google's asynchronous cloud coding agent for GitHub repositories, with a web app, the Jules Tools CLI (`@google/jules`), and an API.

**Building blocks.** Sessions with a prompt, plan, activity log, and code patches; scheduled tasks; memories; setup scripts and environment variables; MCP support (February 2, 2026); auto-fixing CI failures (February 19, 2026).

**Status, November 4, 2026.** The "Jules Turndown" notice (October 29, 2026) says users can finish sessions until November 11, 2026, after which Jules is read-only; "Jules will wind down on December 31, 2026." Its lessons are going into Google Antigravity.

**Access and cost.** No new work. Users can export settings, scheduled tasks, memories, and sessions with `jules login` and an export prompt. The exported `env-variables.json` contains secrets.

**In this class (adaptation).** A historical example of a delegated cloud agent. Don't build on it.

**Official documentation.**

- **Official docs:** not opened
- **Agent loop / architecture:** not found
- **Tools, state, permissions:** not opened
- **Quickstart / example:** [Quickstart | Jules](https://jules.google/docs/api/reference/) (API)
- **API / SDK reference:** [Quickstart | Jules](https://jules.google/docs/api/reference/)
- **Changelog / migration / deprecation:** [Changelog | Jules](https://jules.google/docs/changelog/) (the turndown notice)
- **Limits:** historical after December 31, 2026.

**Sources.** [Jules changelog, Google, read Nov 4, 2026](https://jules.google/docs/changelog/) (verified).

### Devin (coding agent)

**Status:** current · checked 2026-11-04 · Cognition

**What it is.** Cognition's autonomous software engineer, sold as cloud sessions (Devin Cloud), the Devin CLI, an API and MCP server, and Devin Desktop. Devin Desktop is the former Windsurf IDE, which Cognition bought in 2025: "On June 2, 2026, Windsurf is becoming Devin Desktop" (FAQ).

**Building blocks.** Sessions with IDE, Browser, Shell, and Side Chat tools; Knowledge and Playbooks; parallel managed sessions; handoff from Claude Code or Codex; Local Hands, which lets a cloud session act on your machine "with your approval for each tool call"; Devin Local (the desktop agent, with subagents, plan mode, worktrees, and allow/ask/deny rules). Cascade is documented as legacy.

**Status, November 4, 2026.** Release notes dated November 2; the FAQ says pricing is unchanged for Windsurf plans.

**Access and cost.** Free $0 (light quota); Pro $20/mo; Max $200; Teams $80/mo plus $40 per full seat; Enterprise custom; overage billed at API pricing (pricing page, read November 4).

**In this class (adaptation).** A director could dispatch work to Devin sessions through its MCP server and read their summaries.

**Official documentation.**

- **Official docs:** [Introducing Devin](https://docs.devin.ai/get-started/devin-intro)
- **Agent loop / architecture:** [Devin Session Tools](https://docs.devin.ai/work-with-devin/devin-session-tools)
- **Tools, state, permissions:** [Devin Local Permissions](https://docs.devin.ai/desktop/devin-local/permissions); [Local Hands](https://docs.devin.ai/work-with-devin/local-hands)
- **Quickstart / example:** [Devin Desktop - Devin Local](https://docs.devin.ai/desktop/devin-local/overview)
- **API / SDK reference:** not opened (index at docs.devin.ai/_llms/en/api.txt)
- **Changelog / migration / deprecation:** [Recent Updates](https://docs.devin.ai/release-notes/overview); [Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq.md)
- **Limits:** the pricing page doesn't mention Windsurf or ACUs.

**Sources.** [Devin pricing, Cognition, read Nov 4, 2026](https://devin.ai/pricing) (verified).

### Amp (coding agent)

**Status:** current · checked 2026-11-04 · Amp

**What it is.** A coding agent and development environment with a CLI (`amp`), Mac, iOS, and Android apps, and the web. Agents run in remote machines called Orbs and "keep working after you close your laptop." The site names no parent company.

**Building blocks.** "The Dial" modes `low`, `medium`, `high`, `ultra`; a Task subagent and a Read Thread subagent, each with its own context window; tools; plugins; Orbs; Automations & Webhooks (schedule, time, external event); Agent to Agent delegation; multiplayer threads.

**Status, November 4, 2026.** Service Accounts (November 3), Artifacts (November 2), self-hosted Orbs (October 28).

**Access and cost.** Hobby free (buy credits at list price); Megawatt $20/mo, or $10 with the education discount; Gigawatt $200/mo; Teams no extra charge; Enterprise custom. Linking a ChatGPT or Claude subscription, or your own keys, adds no Amp fees (pricing docs, read November 4).

**In this class (adaptation).** The education discount and Agent to Agent support a director handing lines to persona agents.

**Official documentation.**

- **Official docs:** [Introduction](https://ampcode.com/docs/markdown)
- **Agent loop / architecture:** [Modes & Models](https://ampcode.com/docs/markdown/models-and-subagents)
- **Tools, state, permissions:** [Tools](https://ampcode.com/docs/markdown/tools)
- **Quickstart / example:** [Introduction](https://ampcode.com/docs/markdown)
- **API / SDK reference:** [Automations & Webhooks](https://ampcode.com/docs/markdown/orbs/automations)
- **Changelog / migration / deprecation:** news list on the [Amp home page](https://ampcode.com/)
- **Limits:** docs served as Markdown.

**Sources.** [Amp pricing docs, read Nov 4, 2026](https://ampcode.com/docs/markdown/pricing) (verified).

### Cline (coding agent)

**Status:** current · checked 2026-11-04 · Cline Bot Inc.

**What it is.** An open-source coding agent (Apache-2.0), offered as a VS Code extension, a CLI with a headless mode for CI, a desktop app, a JetBrains plugin (not open source), the `@cline/sdk` SDK, and Kanban.

**Building blocks.** Plan and Act modes; approval for each edit and command, or auto-approve; checkpoints; MCP (`cline mcp`); multi-agent teams in which a coordinator delegates to specialists; Kanban for parallel agents in git worktrees; hooks; any provider, including local Ollama or LM Studio.

**Status, November 4, 2026.** v4.1.26 (October 26, 2026). Its fork Roo Code was archived and shut down on May 15, 2026; Roo's README points users to the ZooCode fork and to Cline.

**Access and cost.** Free software. You pay a model provider, buy Cline usage-billing credits, or subscribe to ClinePass (price not read).

**In this class (adaptation).** Kanban gives an ensemble of parallel agents, and local models make it cost nothing.

**Official documentation.**

- **Official docs:** [Cline Overview](https://docs.cline.bot/cline-overview)
- **Agent loop / architecture:** [Cline Overview](https://docs.cline.bot/cline-overview) (Plan/Act)
- **Tools, state, permissions:** [Tools](https://docs.cline.bot/tools-reference/all-cline-tools)
- **Quickstart / example:** [Installing Cline](https://docs.cline.bot/getting-started/installing-cline)
- **API / SDK reference:** [CLI Reference](https://docs.cline.bot/cli/cli-reference)
- **Changelog / migration / deprecation:** [Releases](https://github.com/cline/cline) (GitHub); Roo Code: [RooCodeInc/Roo-Code](https://github.com/RooCodeInc/Roo-Code) (archived)
- **Limits:** none.

**Sources.** [cline/cline, GitHub, read Nov 4, 2026](https://github.com/cline/cline) (verified); [Kanban, Cline](https://docs.cline.bot/usage/kanban) (verified).

### OpenCode (coding agent)

**Status:** current · checked 2026-11-04 · Anomaly (anomalyco on GitHub)

**What it is.** An open-source (MIT) terminal coding agent with a TUI and a beta desktop app, provider-agnostic, at `anomalyco/opencode` (about 224k stars).

**Building blocks.** Two built-in agents, `build` (full access) and `plan` (read-only: it denies edits and asks before bash), switched with Tab; a `@general` subagent; custom agents; permissions.

**Status, November 4, 2026.** v1.19.5 is the latest GitHub release (October 28); the docs banner says "OpenCode v2 is now available," with separate v2 docs and install paths.

**Access and cost.** Free; bring your own provider. OpenCode Go is $10/month for hosted coding models (v2 page, read November 4).

**In this class (adaptation).** Define each persona as a custom agent with its own permissions, and keep the critic read-only like `plan`.

**Official documentation.**

- **Official docs:** [Intro](https://opencode.ai/docs)
- **Agent loop / architecture:** [Agents](https://opencode.ai/docs/agents)
- **Tools, state, permissions:** [Permissions](https://opencode.ai/docs/permissions)
- **Quickstart / example:** [Intro | OpenCode v2](https://opencode.ai/v2/docs/)
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [OpenCode v2](https://opencode.ai/v2)
- **Limits:** opencode.ai/docs/llms.txt is a 404.

**Sources.** [anomalyco/opencode, GitHub, read Nov 4, 2026](https://github.com/anomalyco/opencode) (verified).

### Aider (harness)

**Status:** current · checked 2026-11-04 · Aider-AI (GitHub org)

**What it is.** An open-source (Apache-2.0) terminal pair programmer in Python. It edits files in a git repository and commits each change. It is closer to a chat-plus-edit loop than to a multi-agent harness.

**Building blocks.** Chat modes (code, architect, ask); a repository map for context; automatic git commits; any model through your own API key. No subagents or scheduling.

**Status, November 4, 2026.** The latest GitHub release is v0.86.0 (August 9, 2025). The release history lists v0.86.1, and the repository was last pushed May 22, 2026, so development is quiet.

**Access and cost.** Free; you pay your model provider.

**In this class (adaptation).** A non-agentic baseline: one persona in one pane, for comparison with the looped harnesses.

**Official documentation.**

- **Official docs:** [Aider Documentation](https://aider.chat/docs/)
- **Agent loop / architecture:** [Chat modes](https://aider.chat/docs/usage/modes.html)
- **Tools, state, permissions:** not found
- **Quickstart / example:** [Usage](https://aider.chat/docs/usage.html)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** [Release history](https://aider.chat/HISTORY.html)
- **Limits:** no tagged release since August 2025.

**Sources.** [Aider-AI/aider releases, GitHub, read Nov 4, 2026](https://github.com/Aider-AI/aider/releases) (verified).

## Computer and browser use

These tools let a model see a screen or a web page and act on it. The API tools return actions for your code to carry out, while the apps run the loop for you and stop for approval. Several 2025 names have closed: Operator, ChatGPT agent mode, Atlas, and Project Mariner.

### Claude computer use and Claude in Chrome (API)

**Status:** current · checked 2026-11-04 · Anthropic

**What it is.** Two things. The computer use tool is a Claude API tool: "your application" receives Claude's action requests, carries them out, and returns screenshots. Claude in Chrome is a browser extension that Claude Code (and the Claude apps) drive in your own logged-in Chrome.

**Building blocks.** The API tool `computer_toolset_20260801` (Claude 5.5 and later, no beta header) has 17 actions (`screenshot`, `left_click`, `type`, `key`, `scroll`, `zoom`, `wait`, and others), any of which can be disabled. You write the loop. Chrome: `claude --chrome`, a tab group per session, site-level permissions, a pause for logins and CAPTCHAs, GIF recording.

**Status, November 4, 2026.** The API tool is stable on the Claude API, Bedrock, Google Cloud, and Foundry; the SDK toolset class is beta. The Claude Code docs index dates Chrome's general availability to the week of June 29, 2026.

**Access and cost.** The API is billed by tokens; each screenshot costs about 1,000–1,800 input tokens. Chrome requires a direct Anthropic plan (Pro, Max, Ultra, Team, or Enterprise) and isn't available through API keys or third-party clouds.

**In this class (adaptation).** An observer that screenshots the stage page each turn and reports what the audience sees.

**Official documentation.**

- **Official docs:** [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool.md)
- **Agent loop / architecture:** [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool.md) (the loop section)
- **Tools, state, permissions:** [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
- **Quickstart / example:** [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)
- **API / SDK reference:** [Let Claude use your computer from the CLI](https://code.claude.com/docs/en/computer-use)
- **Changelog / migration / deprecation:** earlier `computer_20251124` returns 400 on Claude 5.5+ (same page)
- **Limits:** none.

**Sources.** [Computer use tool, Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool.md) (verified).

### OpenAI computer use and ChatGPT browser (API)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** Two things. The API `computer` tool in the Responses API returns `computer_call` actions that your code executes and answers with `computer_call_output` and a screenshot. In ChatGPT, a built-in browser in the desktop app (with its own profile) plus a cloud browser for ChatGPT Work let ChatGPT Work or Codex click, type, and take screenshots.

**Building blocks.** API: `{ type: "computer" }`, or a code-execution path; pending safety checks; you confirm consequential actions. ChatGPT: website permissions (Always ask, Auto approve, Always allow); confirmation before payments or submissions; secure sign-in; a "Computer Use" setting for desktop apps.

**Status, November 4, 2026.** The API docs name `gpt-6-astra` and `gpt-6.1-sol` and link a migration from `computer-use-preview`. Press reports say ChatGPT agent mode (which absorbed Operator) was retired in early August 2026 and that Atlas stopped working August 9, 2026.

**Access and cost.** API: input and output tokens, with screenshots billed as image input. ChatGPT cloud browsing requires a paid plan other than Free or Go.

**In this class (adaptation).** Give a stagehand persona the `computer` tool and a Playwright handler.

**Official documentation.**

- **Official docs:** [Computer use | OpenAI API](https://developers.openai.com/api/docs/guides/tools-computer-use)
- **Agent loop / architecture:** same page (loop and action handler)
- **Tools, state, permissions:** [Browser](https://learn.chatgpt.com/docs/browser.md)
- **Quickstart / example:** [Computer Use | ChatGPT Learn](https://learn.chatgpt.com/docs/computer-use)
- **API / SDK reference:** [Computer use | OpenAI API](https://developers.openai.com/api/docs/guides/tools-computer-use)
- **Changelog / migration / deprecation:** not opened (migration guide linked from the API page)
- **Limits:** help.openai.com (agent article) and chatgpt.com/atlas returned 403; the retirements are press-only.

**Sources.** [ChatGPT Agent: What Replaced Agent Mode, omidsaffari.com](https://omidsaffari.com/blog/chatgpt-agent-retired) (unverified: search result); [OpenAI sunsetting ChatGPT Atlas, Android Authority](https://androidauthority.com/openai-sunsetting-chatgpt-atlas-3686001) (unverified: search result).

### Gemini computer use and Gemini Agent (API)

**Status:** current · checked 2026-11-04 · Google

**What it is.** Two things. The Gemini API `computer_use` tool returns `function_call` actions that your client code carries out (the examples use Playwright). Gemini Agent, also called tasks, is a consumer feature of the Gemini app that browses and acts for you in the background.

**Building blocks.** API: environments `ENVIRONMENT_BROWSER`, `ENVIRONMENT_MOBILE`, `ENVIRONMENT_DESKTOP`; a `safety_decision` of `require_confirmation` requires a user confirmation returned as `safety_acknowledgement`. Gemini Agent: a local Chrome or cloud browser; Gmail, Calendar, Drive, and other apps; schedules; up to 15 tasks at once; confirmation before sending, deleting, buying, or submitting forms.

**Status, November 4, 2026.** API models: `gemini-3.8-flash` (recommended), `gemini-4-argon`, `gemini-3.5-flash-lite`, `gemini-3-flash-preview`. Gemini Agent is labeled experimental. Press reports say Project Mariner shut down May 4, 2026, with its technology moved into Gemini Agent and AI Mode.

**Access and cost.** API pricing not stated on the page. Gemini Agent requires Google AI Pro or Ultra, a personal account, and age 18 or older, and isn't offered in the EEA, UK, Switzerland, or Nigeria.

**In this class (adaptation).** A mobile-environment observer that checks the stage on a phone layout.

**Official documentation.**

- **Official docs:** [Computer use - Gemini API](https://aistudio.google.com/docs/computer-use)
- **Agent loop / architecture:** same page
- **Tools, state, permissions:** [Manage your tasks & workflows in Gemini Apps](https://support.google.com/gemini/answer/17094507)
- **Quickstart / example:** [Computer use - Gemini API](https://aistudio.google.com/docs/computer-use)
- **API / SDK reference:** same page
- **Changelog / migration / deprecation:** [Project Mariner](https://labs.google.com/mariner/) (page rendered no text)
- **Limits:** ai.google.dev now redirects to aistudio.google.com.

**Sources.** [Project Mariner is dead, TechSpot](https://www.techspot.com/news/112334-project-mariner-dead-but-google-browser-controlling-ai.html) (unverified: search result).

### Perplexity Comet (browser agent)

**Status:** current · checked 2026-11-04 · Perplexity

**What it is.** A web browser with a built-in agent, the Comet Assistant, for Mac, Windows, iOS, and Android. It is a consumer app, separate from Perplexity's developer APIs.

**Building blocks.** An assistant that acts in your tabs (research, email drafts, shopping) with a Pause control; delegated tasks such as "wrangling inboxes." For developers, Perplexity's separate Agent API offers hosted models with web search, tools, a loop bound, and a code sandbox.

**Status, November 4, 2026.** The product page was published March 11, 2026. No October 2026 announcement found.

**Access and cost.** The page lists an "Is Comet free?" FAQ but the answer wasn't readable. Press reports say Comet became free for everyone on October 2, 2025.

**In this class (adaptation).** A contrast case: a browser agent you watch, not one you program. Use the Agent API if you need code.

**Official documentation.**

- **Official docs:** [Comet Browser: a Personal AI Assistant](https://www.perplexity.ai/comet)
- **Agent loop / architecture:** none public for Comet
- **Tools, state, permissions:** none public for Comet
- **Quickstart / example:** not found
- **API / SDK reference:** none public for Comet (Agent API index at docs.perplexity.ai/llms.txt)
- **Changelog / migration / deprecation:** not found
- **Limits:** no public Comet docs; marketing page only.

**Sources.** [Perplexity makes Comet AI browser free worldwide, YourStory](https://yourstory.com/ai-story/perplexity-ai-comet-browser-free-worldwide) (unverified: search result).

### Browser Use (framework)

**Status:** current · checked 2026-11-04 · Browser Use

**What it is.** An open-source Python library (MIT) for AI browser agents, plus Browser Use Cloud: hosted "stealth" Chromium you drive over CDP and a hosted Cloud Agent API.

**Building blocks.** Library: an `Agent` with a task, an LLM, a browser, and tools you can add or remove. Cloud API V4: sessions (conversation history), workspaces (files), profiles (browser state), structured output, human in the loop, rerunnable scripts, recordings, observability.

**Status, November 4, 2026.** Library 0.13.14 (October 26, 2026; about 120k stars). V4 is the API for new integrations and by default uses GPT-6 Luna. The docs say "Box and Bux are retired."

**Access and cost.** The library is free. Cloud is pay as you go "from $0.02 per browser-hour," and new projects get 10 concurrent browsers at $0 (docs, read November 4).

**In this class (adaptation).** An observer agent that visits the stage URL and returns a structured review each round.

**Official documentation.**

- **Official docs:** [browser-use/browser-use](https://github.com/browser-use/browser-use)
- **Agent loop / architecture:** [Configuration](https://docs.browser-use.com/open-source/customize/agent/basics)
- **Tools, state, permissions:** [Overview (tools)](https://docs.browser-use.com/open-source/customize/tools/basics); [Human in the loop](https://docs.browser-use.com/cloud/agent/human-in-the-loop)
- **Quickstart / example:** [Human Quickstart](https://docs.browser-use.com/open-source/quickstart)
- **API / SDK reference:** [Run a task](https://docs.browser-use.com/cloud/agent/quickstart)
- **Changelog / migration / deprecation:** not opened
- **Limits:** the open-source library and the hosted SDK have different APIs.

**Sources.** [Browser Use llms.txt, read Nov 4, 2026](https://docs.browser-use.com/llms.txt) (verified).

### Stagehand (SDK)

**Status:** current · checked 2026-11-04 · Browserbase

**What it is.** An open-source (MIT) TypeScript framework from Browserbase for web automation that mixes code with model-driven steps. It runs on local Chrome or Browserbase's hosted browsers.

**Building blocks.** `act` (do something on the page), `extract` (structured data), `observe` (find possible actions); Search and Fetch add-ons; Claude and OpenAI computer-use toolsets; MCP bindings for agent frameworks.

**Status, November 4, 2026.** The docs are labeled v4. The latest GitHub releases are `stagehand-server-v3/v3.7.7` (October 23, 2026) and `@browserbasehq/stagehand@3.7.3` (August 28).

**Access and cost.** The framework is free. Browserbase's pricing page title reads "Free, $20, $99, or Custom" (read November 4; details not read).

**In this class (adaptation).** Use `extract` for an observer that turns the stage page into JSON for the director.

**Official documentation.**

- **Official docs:** [Introducing Stagehand](https://docs.stagehand.dev/v4/first-steps/introduction)
- **Agent loop / architecture:** not found
- **Tools, state, permissions:** [Act](https://docs.stagehand.dev/v4/basics/act)
- **Quickstart / example:** [Quickstart - Stagehand](https://docs.stagehand.dev/v4/first-steps/quickstart)
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [Releases](https://github.com/browserbase/stagehand/releases)
- **Limits:** the v4 docs and v3 release tags don't line up.

**Sources.** [browserbase/stagehand releases, GitHub, read Nov 4, 2026](https://github.com/browserbase/stagehand/releases) (verified).

## Model APIs with agent features

The model companies' own APIs now ship agent machinery: tool loops in the SDKs, server-run tools (search, code, browsers), MCP connections, and hosted agent runtimes that keep sessions alive on the vendor's servers. These cards cover what a student can call with one API key, checked November 4, 2026.

### Claude Messages API: tool use and the tool runner (API)

**Status:** current · checked 2026-11-04 · Anthropic

**What it is.** Anthropic's core HTTP API for Claude, with SDKs in Python, TypeScript, C#, Go, Java, PHP, and Ruby. "Tool use (also called function calling) lets Claude call functions that you define or that Anthropic provides."

**Building blocks.** Client tools (yours, plus Anthropic-schema `bash`, `text_editor`, memory, computer, browser) return `tool_use` blocks that your loop answers with `tool_result`; server tools (`web_search`, `web_fetch`, `code_execution`, advisor, `tool_search`, MCP connector) run on Anthropic's side. The SDK **tool runner** (`client.beta.messages.tool_runner` with `@beta_tool` in Python, `toolRunner` in TypeScript) runs the loop for you; for human approval the docs say to use the manual loop.

**Status, November 4, 2026.** Tool use is stable; the tool runner is beta in all seven SDKs. Python SDK `anthropic` 2.4.0 (PyPI, November 2).

**Access and cost.** Paid API key from the Claude Console. Read today: Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 5.5 $0.10/$0.50 per million input/output tokens (prompts up to 100k); web search $10 per 1,000; code execution 1,550 free hours per organization per month, then $0.05 per container-hour.

**In this class (adaptation).** The plainest loop: one persona as a system prompt, two tools (`speak`, `pass_to`), and a 20-line manual loop where the director approves each turn.

**Official documentation.**

- **Official docs:** [Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
- **Agent loop / architecture:** [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
- **Tools, state, permissions:** [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls); [Tool runner (SDK)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner)
- **Quickstart / example:** [Tutorial: Build a tool-using agent](https://platform.claude.com/docs/en/agents-and-tools/tool-use/build-a-tool-using-agent)
- **API / SDK reference:** [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference)
- **Changelog / migration / deprecation:** [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)
- **Limits:** none; all pages opened.

**Sources.** [Tool use with Claude, Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) (verified); [Pricing, Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/about-claude/pricing) (verified); [anthropic on PyPI, read Nov 4, 2026](https://pypi.org/project/anthropic/) (verified)

### Claude computer use toolset and MCP connector (API)

**Status:** current (computer use) and preview (MCP connector, beta) · checked 2026-11-04 · Anthropic

**What it is.** Two Anthropic-provided tool types in the Messages API. Computer use is a client toolset: Claude asks for screenshots, clicks, and keystrokes, and your code performs them in your own desktop or VM. The MCP connector lets the API itself call remote MCP servers "without a separate MCP client."

**Building blocks.** `computer_toolset_20260801` (17 member tools such as `screenshot`, `left_click`, `type`, `zoom`); `mcp_servers` plus an `mcp_toolset` entry in `tools`, with allowlists, denylists, and OAuth `authorization_token`.

**Status, November 4, 2026.** The current computer toolset "needs no beta header," works on Claude 5.5 models, and is listed as stable on the Claude API; it "isn't available in Claude Managed Agents." The MCP connector is beta (`mcp-client-2026-09-15`); the `mcp-client-2025-04-04` version is deprecated. Limits: "only tool calls are currently supported," and servers must be public over HTTP (no local stdio).

**Access and cost.** Same key and token pricing as the Messages API; a screenshot costs about "1,000–1,800 input tokens."

**In this class (adaptation).** An observer agent with computer use watches the stage (a browser tab) and reports what it sees; MCP lets every persona share one prop-closet server.

**Official documentation.**

- **Official docs:** [Computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool); [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)
- **Agent loop / architecture:** [How tool use works](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works)
- **Tools, state, permissions:** [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference)
- **Quickstart / example:** examples are inside the two overview pages
- **API / SDK reference:** [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference)
- **Changelog / migration / deprecation:** deprecated `mcp-client-2025-04-04` section on the [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) page
- **Limits:** the computer use page is about 128k characters; I read the first 100k (no pricing section reached).

**Sources.** [Computer use tool, Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) (verified); [MCP connector, Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector) (verified)

### Claude Managed Agents (hosted platform)

**Status:** preview · checked 2026-11-04 · Anthropic

**What it is.** Anthropic's hosted agent runtime, called through the Claude API: a "pre-built, configurable agent harness that runs in managed infrastructure," for "long-running tasks and asynchronous work."

**Building blocks.** Four concepts: **Agent** (model, system prompt, tools, MCP servers, skills), **Environment** (Anthropic cloud sandbox or self-hosted sandbox), **Session** (a running instance with persistent filesystem and history), **Events** (user turns, tool results, status). Built-in Bash, file tools, web search and fetch; steer or interrupt mid-run; scheduled deployments on cron; multiagent orchestration via **subagents**, **dynamic workflows**, and an **advisor** model.

**Status, November 4, 2026.** Beta on every model; all endpoints need the `managed-agents-2026-04-01` header (the SDK sets it). MCP tunnels and "dreaming" are a narrower research preview. Not eligible for zero data retention or HIPAA.

**Access and cost.** "Enabled by default for all API accounts." Billed on tokens at model rates plus session runtime at $0.08 per session-hour, counted only while `running` (read today).

**In this class (adaptation).** A director agent in one long session spawns subagent personas and runs the play on a nightly schedule, with transcripts kept server-side for observers.

**Official documentation.**

- **Official docs:** [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)
- **Agent loop / architecture:** [Multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multi-agent)
- **Tools, state, permissions:** [Tools](https://platform.claude.com/docs/en/managed-agents/tools); [Start a session](https://platform.claude.com/docs/en/managed-agents/sessions)
- **Quickstart / example:** [Get started with Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/quickstart)
- **API / SDK reference:** [Reference](https://platform.claude.com/docs/en/managed-agents/reference)
- **Changelog / migration / deprecation:** [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)
- **Limits:** launch date not stated on the pages read.

**Sources.** [Claude Managed Agents overview, Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/managed-agents/overview) (verified); [Pricing (Managed Agents section), Anthropic, read Nov 4, 2026](https://platform.claude.com/docs/en/about-claude/pricing) (verified)

### Claude Agent SDK (SDK)

**Status:** current · checked 2026-11-04 · Anthropic

**What it is.** A Python and TypeScript library that gives you "the same tools, agent loop, and context management that power Claude Code"; it runs the Claude Code binary inside a process you operate. Renamed from the Claude Code SDK.

**Building blocks.** Built-in tools (read, write, edit, shell, web search), **hooks** at lifecycle points, **subagents**, MCP, **permissions** ("which tools run automatically, which need approval"), **sessions** you can resume or fork, skills, commands, memory from `.claude/`, and plugins.

**Status, November 4, 2026.** Python `claude-agent-sdk` 0.2.178 (PyPI, November 4), which bundles Claude CLI 2.1.318; TypeScript changelog at 0.3.318. Note 01 covers Claude Code itself.

**Access and cost.** Free to install; you pay Claude API token rates with an API key. Third parties may not offer claude.ai login "unless previously approved." The PyPI package lists MIT, but the docs say use is governed by Anthropic's Commercial Terms.

**In this class (adaptation).** Each persona is a subagent with its own tools; a `PreToolUse` hook acts as the stage manager who can veto a move.

**Official documentation.**

- **Official docs:** [Agent SDK overview](https://code.claude.com/docs/en/agent-sdk/overview)
- **Agent loop / architecture:** [How the agent loop works](https://code.claude.com/docs/en/agent-sdk/agent-loop)
- **Tools, state, permissions:** [Configure permissions](https://code.claude.com/docs/en/agent-sdk/permissions); [Subagents in the SDK](https://code.claude.com/docs/en/agent-sdk/subagents)
- **Quickstart / example:** [Quickstart](https://code.claude.com/docs/en/agent-sdk/quickstart)
- **API / SDK reference:** [Agent SDK reference - Python](https://code.claude.com/docs/en/agent-sdk/python)
- **Changelog / migration / deprecation:** [claude-agent-sdk-python CHANGELOG](https://github.com/anthropics/claude-agent-sdk-python/blob/main/CHANGELOG.md)
- **Limits:** platform.claude.com/docs/en/agent-sdk/overview redirects (307) to code.claude.com.

**Sources.** [Agent SDK overview, Anthropic, read Nov 4, 2026](https://code.claude.com/docs/en/agent-sdk/overview) (verified); [claude-agent-sdk on PyPI, read Nov 4, 2026](https://pypi.org/project/claude-agent-sdk/) (verified)

### OpenAI Responses API with built-in tools (API)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** OpenAI's main HTTP API for models and tools, recommended "for all new projects"; Chat Completions "remains supported."

**Building blocks.** Built-in tools: `web_search`, `file_search`, remote MCP (`mcp`), Shell (hosted containers or your machine), Computer use, Image generation, `tool_search`, Programmatic Tool Calling (the model writes JavaScript that orchestrates tool calls), Skills, plus function calling. State through `previous_response_id`, the Conversations API, or stored responses (`store: false` turns storage off).

**Status, November 4, 2026.** Current. The Assistants API was removed August 26, 2026 (see the separate Assistants history).

**Access and cost.** Paid key at platform.openai.com. Read today: gpt-6.1-sol $2/$10 and gpt-6-astra $10/$50 per million tokens; web search $10 per 1,000 calls; file search $2.50 per 1,000 calls plus $0.10/GB-day after 1 GB; containers from $0.03 per 20-minute session (1 GB). Computer use pricing not listed.

**In this class (adaptation).** One request per actor turn, with `previous_response_id` as each persona's memory and `web_search` for a researcher character.

**Official documentation.**

- **Official docs:** [Using tools](https://developers.openai.com/api/docs/guides/tools)
- **Agent loop / architecture:** [Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)
- **Tools, state, permissions:** [Function calling](https://developers.openai.com/api/docs/guides/function-calling); [MCP servers](https://developers.openai.com/api/docs/guides/tools-connectors-mcp); [Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use)
- **Quickstart / example:** not opened today
- **API / SDK reference:** [Responses (API reference)](https://developers.openai.com/api/reference/resources/responses)
- **Changelog / migration / deprecation:** [Changelog](https://developers.openai.com/api/docs/changelog); [Deprecations](https://developers.openai.com/api/docs/deprecations); [Assistants migration guide](https://developers.openai.com/api/docs/assistants/migration)
- **Limits:** developers.openai.com loaded; openai.com returned 403.

**Sources.** [Using tools, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/guides/tools) (verified); [Pricing, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/pricing) (verified); [Deprecations, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/deprecations) (verified)

### OpenAI Agents API (hosted platform)

**Status:** preview · checked 2026-11-04 · OpenAI

**What it is.** A hosted agent runtime released in public beta on September 10, 2026 (OpenAI changelog). "The Agents API gives your application access to the Codex harness through an OpenAI-managed API"; OpenAI handles "sessions, orchestration, context compaction, and recovery." It is a new product, not a renamed Assistants API.

**Building blocks.** **Agents** (model, instructions, tools, MCP servers), optional **environments** (OpenAI-hosted, prewarmed, or self-hosted sandboxes), durable **sessions**, **events and items**, webhooks and streaming, **multi-agent** delegation to subagents, approvals ("Automatic review"), scheduled automations, tracing, vaults for credentials. Computer use in an OpenAI-hosted browser was added September 29.

**Status, November 4, 2026.** Public beta; recent changelog entries add sandbox prewarming, Ultrafast mode, and document-making skills in hosted sandboxes.

**Access and cost.** Paid API key. Model usage at model rates, built-in tools at tool rates, hosted sandboxes "at standard container rates." No separate agent fee stated.

**In this class (adaptation).** Run the director as a scheduled session that wakes, delegates scenes to subagent actors, and posts to a webhook the observers read.

**Official documentation.**

- **Official docs:** [Agents API overview](https://developers.openai.com/api/docs/guides/agents-api/overview)
- **Agent loop / architecture:** [Architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture); [Multi-agent](https://developers.openai.com/api/docs/guides/agents-api/multi-agent)
- **Tools, state, permissions:** [Automatic review](https://developers.openai.com/api/docs/guides/agents-api/sessions/approvals); [Scheduled automations](https://developers.openai.com/api/docs/guides/agents-api/sessions/automations)
- **Quickstart / example:** [Agents API quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart)
- **API / SDK reference:** not opened today
- **Changelog / migration / deprecation:** [Changelog](https://developers.openai.com/api/docs/changelog)
- **Limits:** the launch post at openai.com/index/introducing-the-agents-api returned 403; dates come from the developers changelog.

**Sources.** [Agents API overview, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/guides/agents-api/overview) (verified); [Changelog, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/changelog) (verified); [Agents, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/guides/agents) (verified)

### OpenAI Agents SDK (SDK)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** OpenAI's open-source agent library for Python and TypeScript (March 2025). OpenAI's agents page pitches it for teams who want to "Control the agent loop in your application with reusable agents, tools, and handoffs."

**Building blocks.** `Agent`, `Runner`, tools, **handoffs** ("Handoffs allow an agent to delegate tasks to another agent," per note 01), guardrails and human review, sessions, tracing.

**Status, November 4, 2026.** Python `openai-agents` 0.24.0 (PyPI, October 15); pre-release v0.24.0-alpha.6 (November 3) adds native child approvals (note 01). Named by OpenAI as the path forward from Agent Builder.

**Access and cost.** MIT license (PyPI). Pay the model provider; it works with OpenAI models by default.

**In this class (adaptation).** Each persona is an `Agent`; the director is a triage agent whose handoffs choose who speaks next.

**Official documentation.**

- **Official docs:** [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- **Agent loop / architecture:** [Running agents](https://openai.github.io/openai-agents-python/running_agents/); [Orchestration and handoffs](https://developers.openai.com/api/docs/guides/agents/orchestration)
- **Tools, state, permissions:** [Guardrails and human review](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals)
- **Quickstart / example:** [Quickstart](https://openai.github.io/openai-agents-python/quickstart/)
- **API / SDK reference:** [Agent](https://openai.github.io/openai-agents-python/ref/agent/); [TypeScript SDK](https://openai.github.io/openai-agents-js/)
- **Changelog / migration / deprecation:** [Releases](https://github.com/openai/openai-agents-python/releases) (from note 01)
- **Limits:** none.

**Sources.** Note 01; [openai-agents on PyPI, read Nov 4, 2026](https://pypi.org/project/openai-agents/) (verified); [Agents, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/guides/agents) (verified)

### OpenAI Agent Builder (AgentKit) (no-code builder)

**Status:** retired (shutting down) · checked 2026-11-04 · OpenAI

**What it is.** OpenAI's visual canvas for drawing agent workflows as node graphs, launched October 2025 as part of what OpenAI called AgentKit (note 01).

**Building blocks.** Nodes and edges on a canvas, published as workflows that ChatKit could embed by workflow ID.

**Status, November 4, 2026.** "On June 3, 2026, we notified developers using Agent Builder that the product is being deprecated"; "Agent Builder is scheduled to shut down" November 30, 2026. Existing hosted workflows continue through a transition window. The deprecations page has no entry named AgentKit.

**Access and cost.** Do not start new work on it. OpenAI points to the Agents SDK or ChatGPT Workspace Agents.

**In this class (adaptation).** Use it only as a historical example of the canvas metaphor; draw the graph on paper and build it in code.

**Official documentation.**

- **Official docs:** [Agent Builder](https://developers.openai.com/api/docs/guides/agent-builder)
- **Agent loop / architecture:** none public beyond the overview
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** not opened today
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** [Migrate from Agent Builder](https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder); [Deprecations](https://developers.openai.com/api/docs/deprecations)
- **Limits:** none.

**Sources.** [Deprecations, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/deprecations) (verified); [ChatKit, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/guides/chatkit) (verified); note 01

### OpenAI ChatKit (SDK)

**Status:** current · checked 2026-11-04 · OpenAI

**What it is.** A customizable chat front end for agents, called "the best way to build agentic chat experiences": a JavaScript embed (`chatkit-js`) plus the ChatKit Python SDK for your server.

**Building blocks.** Chat UI with widgets, tool-invocation display, file attachments, and chain-of-thought views. Two setups: **self-hosted** (your server, any agent backend, including the Agents SDK) or **OpenAI-hosted** (a session tied to an Agent Builder workflow ID).

**Status, November 4, 2026.** "ChatKit remains available" after Agent Builder's shutdown; the docs recommend the self-hosted ("advanced") integration for new projects. Python `openai-chatkit` 1.6.5 (PyPI, May 19, 2026).

**Access and cost.** Open-source libraries; you pay for whatever model and tools your backend calls.

**In this class (adaptation).** The audience window: a ChatKit page where viewers talk to the ensemble while the director runs behind it.

**Official documentation.**

- **Official docs:** [ChatKit](https://developers.openai.com/api/docs/guides/chatkit)
- **Agent loop / architecture:** not opened today
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** [openai/chatkit-js](https://github.com/openai/chatkit-js)
- **API / SDK reference:** [ChatKit Python SDK](https://openai.github.io/chatkit-python/)
- **Changelog / migration / deprecation:** [Deprecations](https://developers.openai.com/api/docs/deprecations)
- **Limits:** the advanced-integration guide URL I tried returned 404.

**Sources.** [ChatKit, OpenAI, read Nov 4, 2026](https://developers.openai.com/api/docs/guides/chatkit) (verified); [openai-chatkit on PyPI, read Nov 4, 2026](https://pypi.org/project/openai-chatkit/) (verified)

### Gemini API: Interactions API, function calling, and managed agents (API)

**Status:** current (Interactions API) and preview (managed agents) · checked 2026-11-04 · Google

**What it is.** Google's developer API for Gemini (Google AI Studio). The Interactions API, public beta December 2025 and now generally available, is "a unified interface for interacting with Gemini models and agents" and Google's primary Gemini API.

**Building blocks.** `client.interactions.create`; server-side state via `previous_interaction_id`; background execution; function calling with `tool_choice` modes auto, any, none, and validated; parallel and compositional calls; built-in tools (Google Search, Google Maps) mixed with your functions. **Managed agents** run in "a secure Linux sandbox hosted by Google": the Antigravity agent (on Gemini 3.8 Flash), Deep Research, and custom agents.

**Status, November 4, 2026.** Interactions API GA; managed agents labeled "Public Preview." Docs examples use `gemini-3.8-flash`.

**Access and cost.** Free tier with an AI Studio key. Read today: Gemini 3.8 Flash $0.75/$3.75 per million through December 31, 2026; Search grounding 5,000 free requests a month, then $14 per 1,000; agent sandbox compute not billed during the preview.

**In this class (adaptation).** The cheapest ensemble: free-tier Flash personas, with Deep Research as the dramaturg.

**Official documentation.**

- **Official docs:** [Interactions API](https://aistudio.google.com/docs/interactions)
- **Agent loop / architecture:** [Agents overview](https://aistudio.google.com/docs/agents)
- **Tools, state, permissions:** [Function calling with the Gemini API](https://aistudio.google.com/docs/function-calling)
- **Quickstart / example:** [Getting started](https://aistudio.google.com/docs/quickstart)
- **API / SDK reference:** not opened today
- **Changelog / migration / deprecation:** [Release notes](https://aistudio.google.com/docs/changelog)
- **Limits:** ai.google.dev now redirects (301) to aistudio.google.com; the GA blog post shows no date (press says June 2026, unverified).

**Sources.** [Interactions API: our primary interface for Gemini models and agents, Google, read Nov 4, 2026](https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api-general-availability) (verified); [Gemini Developer API pricing, Google, read Nov 4, 2026](https://aistudio.google.com/docs/pricing) (verified)

### Google Agent Development Kit (ADK) (framework)

**Status:** current · checked 2026-11-04 · Google

**What it is.** Google's open-source, "model-agnostic" agent framework (April 2025, per note 01), with a Python SDK; also the Build layer of Google's Gemini Enterprise Agent Platform.

**Building blocks.** LLM agents in a hierarchy, workflow agents (sequential, parallel, loop), graph workflows with nodes such as `ClassifierNode` for routing, `require_confirmation` for human approval, tools, sessions and memory, A2A for agent-to-agent calls (note 01).

**Status, November 4, 2026.** ADK for Python v2.13.0 (GitHub, October 23; PyPI agrees); no later release.

**Access and cost.** Open source (license not re-read today); free to use, pay for the model you call.

**In this class (adaptation).** A `LoopAgent` for the two-actor scene, a `SequentialAgent` for the three-node graph, and a confirmation node where the director signs off.

**Official documentation.**

- **Official docs:** [Agent Development Kit (ADK)](https://google.github.io/adk-docs/)
- **Agent loop / architecture:** [Template agent workflows](https://google.github.io/adk-docs/agents/workflow-agents/)
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** [Quickstart](https://google.github.io/adk-docs/get-started/quickstart/)
- **API / SDK reference:** [Agent Development Kit (Python) 2.13.0 documentation](https://google.github.io/adk-docs/api-reference/python/)
- **Changelog / migration / deprecation:** [adk-python releases](https://github.com/google/adk-python/releases)
- **Limits:** the quickstart URL served a redirect page.

**Sources.** Note 01; [adk-python releases, GitHub, read Nov 4, 2026](https://github.com/google/adk-python/releases) (verified)

### xAI API (Grok) agent tools (API)

**Status:** current · checked 2026-11-04 · xAI (docs site titled "SpaceXSI Docs")

**What it is.** xAI's HTTP API for Grok models, OpenAI-compatible, with a native `xai-sdk` (Python, Apache-2.0). Tool examples use the Responses API (`/v1/responses`).

**Building blocks.** Server-side tools: Web Search, X Search, Code Interpreter (`code_execution`), Image Generation, Collections Search. Client-side function calling. Remote MCP tools in the native SDK and Responses API ("Only Streaming HTTP and SSE transports are supported"; `require_approval` not yet supported in Responses). The model list includes `grok-4.20-multi-agent-0309`, a multi-agent model.

**Status, November 4, 2026.** Current model `grok-4.7`. `xai-sdk` 1.21.0 (PyPI, October 23). Recent release notes concern image and voice models, not agent tools.

**Access and cost.** Paid key from the xAI console. Read today: grok-4.7 $2/$6 and grok-4.20-multi-agent-0309 $1.25/$2.50 per million tokens (under 200k). Tool calls are billed per invocation; I did not read the per-call rate.

**In this class (adaptation).** An X Search observer reports how a scene's topic is playing online, as a chorus character.

**Official documentation.**

- **Official docs:** [Tools Overview](https://docs.x.ai/docs/guides/tools/overview)
- **Agent loop / architecture:** not found
- **Tools, state, permissions:** [Function Calling](https://docs.x.ai/docs/guides/function-calling); [Remote MCP Tools](https://docs.x.ai/docs/guides/tools/remote-mcp-tools); [Web Search](https://docs.x.ai/docs/guides/tools/search-tools)
- **Quickstart / example:** [Grok API Quickstart](https://docs.x.ai/docs/tutorial)
- **API / SDK reference:** [Responses, REST API Reference](https://docs.x.ai/docs/api-reference)
- **Changelog / migration / deprecation:** [Release Notes](https://docs.x.ai/docs/release-notes)
- **Limits:** no multi-agent guide found (404 at the URL tried).

**Sources.** [Tools Overview, xAI, read Nov 4, 2026](https://docs.x.ai/docs/guides/tools/overview) (verified); [Grok Models & Pricing, xAI, read Nov 4, 2026](https://docs.x.ai/docs/models) (verified)

### Mistral Agents SDK and Agents API (SDK)

**Status:** preview (Agents SDK) and historical (Agents API) · checked 2026-11-04 · Mistral AI

**What it is.** Mistral's agent tooling is in transition. The hosted Agents API (May 2025: connectors, handoffs, Conversations) now sits in the docs' "Deprecated" navigation group. Its successor is a Python **Agents SDK** within Mistral Studio, labeled "Coming soon."

**Building blocks.** **Agent** (model, instructions), **Harness** (Python tools, connectors and MCP, sandbox commands and files, skills, "permission approvals before tool calls," hooks), **Session** (turns and events). Deploy as managed agents (Mistral hosts the worker) or self-hosted; Studio traces for observation. Handoffs are not an SDK building block, and "API agents, tools, handoffs, or conversation state" do not transfer automatically.

**Status, November 4, 2026.** No dated deprecation found for the Agents API. `mistralai` 3.7.0 (PyPI, November 1). Recent changelog: Voice Agents (October 20).

**Access and cost.** API key from Mistral; "tool APIs are priced per call" (no rates shown). Mistral Large $0.5/$1.5 per million tokens (read today).

**In this class (adaptation).** Wait for the SDK; meanwhile Mistral models work as personas through OpenRouter.

**Official documentation.**

- **Official docs:** [Agents](https://docs.mistral.ai/studio/agents/overview)
- **Agent loop / architecture:** not opened today
- **Tools, state, permissions:** [Quickstart: add a connector](https://docs.mistral.ai/studio/connectors/quickstart)
- **Quickstart / example:** [Build and deploy an agent end to end](https://docs.mistral.ai/getting-started/quickstarts/studio/build-an-agent-end-to-end)
- **API / SDK reference:** [API reference](https://docs.mistral.ai/api)
- **Changelog / migration / deprecation:** [Changelog](https://docs.mistral.ai/getting-started/changelog)
- **Limits:** the deprecated Agents API pages were not opened; the SDK's package name and license are not stated.

**Sources.** [Agents, Mistral, read Nov 4, 2026](https://docs.mistral.ai/studio/agents/overview) (verified); [Pricing, Mistral, read Nov 4, 2026](https://mistral.ai/pricing) (verified)

### OpenRouter (API)

**Status:** current · checked 2026-11-04 · OpenRouter

**What it is.** A hosted router: one OpenAI-compatible API and one key for hundreds of models from many providers. Many classes use it so students can switch models without new accounts.

**Building blocks.** Tool calling "compatible with the OpenAI function calling parameter," standardized across providers ("The LLM does not call the tools directly"); `parallel_tool_calls`; filter models with `supported_parameters=tools`; a web search plugin; provider routing; an OpenAI-compatible Responses API that is "stateless."

**Status, November 4, 2026.** Current; Python SDK `openrouter` 1.3.116 (PyPI, November 4, Apache-2.0).

**Access and cost.** Sign up and create a key. Read today: 25+ free models, capped at 20 requests a minute and 50 a day (1,000 a day after buying $10 of credits); a 5.5% fee on credit purchases (Standard); BYOK free up to $25,000 of list-price inference a month.

**In this class (adaptation).** The casting office: give each persona a different model from one key, and swap actors between rehearsals.

**Official documentation.**

- **Official docs:** [OpenRouter Quickstart Guide](https://openrouter.ai/docs/quickstart)
- **Agent loop / architecture:** [Tool & Function Calling](https://openrouter.ai/docs/guides/features/tool-calling)
- **Tools, state, permissions:** [Web Search](https://openrouter.ai/docs/guides/features/plugins/web-search); [Provider Routing](https://openrouter.ai/docs/guides/routing/provider-selection)
- **Quickstart / example:** [OpenRouter Quickstart Guide](https://openrouter.ai/docs/quickstart)
- **API / SDK reference:** [API Reference](https://openrouter.ai/docs/api/reference/overview); [Responses API](https://openrouter.ai/docs/api/reference/responses/overview)
- **Changelog / migration / deprecation:** [OpenRouter Blog](https://openrouter.ai/announcements)
- **Limits:** tool support varies by model and provider.

**Sources.** [Tool & Function Calling, OpenRouter, read Nov 4, 2026](https://openrouter.ai/docs/guides/features/tool-calling) (verified); [Pricing, OpenRouter, read Nov 4, 2026](https://openrouter.ai/pricing) (verified)

## Cloud agent platforms

The three big clouds and the largest CRM vendor sell managed places to run agents with enterprise identity, policy, memory, and tracing; most accept agents built in any framework. Students mostly meet these at work, but the vocabulary (runtime, gateway, registry, harness) is the same as in class.

### Amazon Bedrock AgentCore (hosted platform)

**Status:** current · checked 2026-11-04 · Amazon Web Services

**What it is.** AWS's "agentic platform for building, deploying, and operating highly effective agents securely at scale using any framework and foundation model." Modular services you use together or alone.

**Building blocks.** **Harness** (a managed agent loop, "define and invoke AI agents with a single API call"; each session in a microVM), **Runtime** (serverless hosting for agents built with CrewAI, LangGraph, LlamaIndex, Google ADK, OpenAI Agents SDK, or Strands; MCP and A2A), **Memory** (short and long term), **Gateway** (APIs and Lambdas as MCP tools), **Identity**, **Code Interpreter**, **Browser**, **Observability** (OpenTelemetry), **Policy** (rules checked before every tool call), **Evaluations**, **Optimization**, **Registry**, **Payments**.

**Status, November 4, 2026.** Current; `bedrock-agentcore` 1.25.3 (PyPI, November 3). Bedrock Agents (2023) is now **Bedrock Agents Classic**, closed to new customers since July 30, 2026, in maintenance mode with "no planned end-of-life date."

**Access and cost.** AWS account; "up to $200 in Free Tier credits" for new customers. Runtime from $0.0895 per vCPU-hour and $0.00945 per GB-hour; Gateway $0.005 per 1,000 invocations (read today).

**In this class (adaptation).** Deploy the finished ensemble behind Gateway, with Policy as the stage manager's rulebook.

**Official documentation.**

- **Official docs:** [What is Amazon Bedrock AgentCore?](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html)
- **Agent loop / architecture:** [AgentCore harness](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/harness.html)
- **Tools, state, permissions:** [Policy in Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/policy.html)
- **Quickstart / example:** [Get started with Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-get-started-cli.html)
- **API / SDK reference:** [AgentCore Data Plane API Reference](https://docs.aws.amazon.com/bedrock-agentcore/latest/APIReference/Welcome.html)
- **Changelog / migration / deprecation:** [Document history](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/doc-history.html); [Bedrock Agents Classic maintenance mode](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html)
- **Limits:** none.

**Sources.** [What is Amazon Bedrock AgentCore?, AWS, read Nov 4, 2026](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html) (verified); [AgentCore pricing, AWS, read Nov 4, 2026](https://aws.amazon.com/bedrock/agentcore/pricing/) (verified); [Bedrock Agents Classic maintenance mode, AWS, read Nov 4, 2026](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html) (verified)

### Strands Agents (framework)

**Status:** current · checked 2026-11-04 · Amazon Web Services (open source)

**What it is.** An open-source agent framework from AWS for Python and TypeScript, Apache-2.0. AWS's docs name it as the code-defined path onto AgentCore.

**Building blocks.** A model-driven agent loop, tools (including MCP), and multi-agent patterns: **swarm**, **graph**, **workflow**, and **agents-as-tools**. Model providers are pluggable: "Bring your own model — works with every major provider" (Bedrock, Anthropic, OpenAI, Google, Ollama).

**Status, November 4, 2026.** `strands-agents` 1.63.0 (PyPI, October 30). The GitHub URL `strands-agents/sdk-python` now opens a repository titled `strands-agents/harness-sdk`, which suggests a rename I did not confirm.

**Access and cost.** Free and open source; pay for the model. Runs locally or on AgentCore Runtime.

**In this class (adaptation).** The graph pattern is the three-node graph almost word for word; swarm fits the improvising ensemble.

**Official documentation.**

- **Official docs:** [Strands Agents](https://strandsagents.com/latest/)
- **Agent loop / architecture:** [Graph Multi-Agent Pattern](https://strandsagents.com/latest/documentation/docs/user-guide/concepts/multi-agent/graph/)
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** [Get started](https://strandsagents.com/latest/documentation/docs/user-guide/quickstart/)
- **API / SDK reference:** not opened today
- **Changelog / migration / deprecation:** [Releases](https://github.com/strands-agents/sdk-python/releases)
- **Limits:** none.

**Sources.** [Strands Agents, AWS, read Nov 4, 2026](https://strandsagents.com/latest/) (verified); [strands-agents on PyPI, read Nov 4, 2026](https://pypi.org/project/strands-agents/) (verified)

### Gemini Enterprise Agent Platform: Agent Runtime (formerly Vertex AI Agent Engine) (hosted platform)

**Status:** current · checked 2026-11-04 · Google Cloud

**What it is.** Google Cloud's enterprise AI platform, "an evolution of Vertex AI," launched April 22, 2026. Release notes map "Vertex AI Agent Engine" → "Agent Runtime," and its Sessions and Memory Bank → "Agent Platform Sessions" and "Agent Platform Memory Bank."

**Building blocks.** Build: ADK, Agent Studio (a low-code canvas), Model Garden. Scale: **Agent Runtime** (hosting), **Sessions** (state), **Memory Bank** (recall across sessions). Govern: **Agent Registry**, **Agent Identity**, **Agent Gateway** ("A central policy enforcement point to govern all agent tool calls"). Optimize: agent evaluation.

**Status, November 4, 2026.** Latest agent entries: a regional Agent Registry per Gemini Enterprise app (October 28) and semantic governance for non-Gemini models' tool calls (October 26). `google-cloud-aiplatform` 2.7.0 (PyPI, October 28).

**Access and cost.** Google Cloud project with billing. Read today: Agent Compute $0.085 per vCPU-hour, Agent Memory $0.009 per GiB-hour; Sessions storage $0.30 per GiB-month.

**In this class (adaptation).** Deploy an ADK ensemble to Agent Runtime and use Memory Bank so characters remember earlier performances.

**Official documentation.**

- **Official docs:** [Agent Platform overview](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview)
- **Agent loop / architecture:** [Scale your agents](https://docs.cloud.google.com/agent-builder/agent-engine/overview)
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** not opened today
- **API / SDK reference:** not opened today
- **Changelog / migration / deprecation:** [Release notes](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes)
- **Limits:** the pricing page was too large for the fetch tool and was read by text extraction.

**Sources.** [Agent Platform overview, Google Cloud, read Nov 4, 2026](https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview) (verified); [Release notes, Google Cloud, read Nov 4, 2026](https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes) (verified); [Gemini platform pricing, Google Cloud, read Nov 4, 2026](https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing) (verified)

### Microsoft Foundry Agent Service (hosted platform)

**Status:** current · checked 2026-11-04 · Microsoft

**What it is.** "A managed platform for building, deploying, and scaling AI agents" in Microsoft Foundry (formerly Azure AI Foundry). The page is dated October 26, 2026.

**Building blocks.** Three agent types: **prompt agents** (configuration only; optional Microsoft Copilot harness, in preview), **voice-based prompt agents**, and **hosted agents** (your container, built with Agent Framework, LangGraph, the OpenAI Agents SDK, the Anthropic SDK, or your own code). Agent Runtime, **Toolboxes** (tools behind one managed MCP endpoint), Entra agent identity, tracing and evaluations, an agent optimizer (preview), and publishing to Teams and Copilot. A2A v1.0 is generally available.

**Status, November 4, 2026.** Current. Microsoft Ignite runs November 17–20, so expect changes soon (search result, unverified).

**Access and cost.** Azure subscription; free account $200 for 30 days. Prompt agents carry "no additional charge" beyond model tokens and tools; hosted agents add container compute. The pricing page showed placeholders instead of rates.

**In this class (adaptation).** Package the Agent Framework ensemble as a hosted agent; the Toolbox is the shared prop closet.

**Official documentation.**

- **Official docs:** [What is Microsoft Foundry Agent Service?](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
- **Agent loop / architecture:** [Hosted agents in Foundry Agent Service](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents)
- **Tools, state, permissions:** [What is Toolbox in Microsoft Foundry?](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/toolbox-overview)
- **Quickstart / example:** [Quickstart: Create a prompt agent](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/prompt-agent)
- **API / SDK reference:** not opened today (`azure-ai-projects` 2.10.0 on PyPI, October 30)
- **Changelog / migration / deprecation:** not found (a what's-new URL returned 404)
- **Limits:** the pricing page shows "$-" placeholders.

**Sources.** [What is Microsoft Foundry Agent Service?, Microsoft Learn, read Nov 4, 2026](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) (verified); [Foundry Agent Service pricing, Microsoft, read Nov 4, 2026](https://azure.microsoft.com/en-us/pricing/details/foundry-agent-service/) (verified)

### Microsoft Copilot Studio (no-code builder)

**Status:** current · checked 2026-11-04 · Microsoft

**What it is.** "A graphical, low-code studio for building and managing AI-powered agents and workflows," published to Teams, Microsoft Copilot, websites, and other channels. The overview is dated October 27, 2026.

**Building blocks.** Agents (instructions, knowledge, tools), drag-and-drop **workflows** with human-in-the-loop controls, **agent flows**, and three **harnesses**: the GitHub Copilot harness (multi-step reasoning), the Customer Conversation harness (a primary agent with specialized sub-agents and escalation to a person), and the standard harness (topic-based). Agents can get their own account to "work proactively"; also analytics and evaluations.

**Status, November 4, 2026.** Current; the app-creation experience and natural-language building are in preview.

**Access and cost.** Billed in Copilot Credits (prepaid packs, pay-as-you-go via Azure, or a one-year prepurchase). A trial license lets an individual build and test but not publish. No credit prices on the page I read.

**In this class (adaptation).** Show how an office would build the same director-and-actors pattern without code, then compare with the class version.

**Official documentation.**

- **Official docs:** [Overview - Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)
- **Agent loop / architecture:** [Harnesses in Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview)
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** [Quickstart: Create and deploy an agent with the standard harness](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-get-started)
- **API / SDK reference:** none public for the studio itself
- **Changelog / migration / deprecation:** [What's new in Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/whats-new); [Standard harness licensing](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing)
- **Limits:** needs a Microsoft work account; Harvard access not checked.

**Sources.** [Overview - Microsoft Copilot Studio, Microsoft Learn, read Nov 4, 2026](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio) (verified); [Standard harness licensing, Microsoft Learn, read Nov 4, 2026](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing) (verified)

### Salesforce Agentforce (hosted platform)

**Status:** current · checked 2026-11-04 · Salesforce

**What it is.** Salesforce's agent platform inside its CRM, sold for "24/7 autonomous support at enterprise scale."

**Building blocks.** Agent Builder (subagents, actions, instructions), **Agent Script** (a language for precise control of agent behavior), the **Atlas Reasoning Engine** ("breaks requests into smaller tasks and plans next steps"), actions, subagents, Prompt Builder, and verified MCP servers.

**Status, November 4, 2026.** Current. Third-party posts say the new Agentforce Builder replaced the legacy builder the week of July 13, 2026 (unverified; developer docs refused).

**Access and cost.** Read today: Flex Credits at $500 per 100,000 credits (a standard action is 20 credits, about $0.10); $2 per conversation; per-user add-ons from $5 to $550 a month. "Salesforce Foundations" lists $0 with Agentforce Builder, Prompt Builder, and Agent Script. No Developer Edition terms read.

**In this class (adaptation).** A case study of an agent graph priced per action, useful for asking what each line of the play would cost.

**Official documentation.**

- **Official docs:** [Agentforce](https://www.salesforce.com/agentforce/) (product page)
- **Agent loop / architecture:** not found (developer.salesforce.com returned 403)
- **Tools, state, permissions:** not found (403)
- **Quickstart / example:** not found (403)
- **API / SDK reference:** not found (403 at the Agent API guide)
- **Changelog / migration / deprecation:** not found
- **Limits:** every developer.salesforce.com page I tried returned 403.

**Sources.** [Agentforce, Salesforce, read Nov 4, 2026](https://www.salesforce.com/agentforce/) (verified); [Agentforce Pricing, Salesforce, read Nov 4, 2026](https://www.salesforce.com/agentforce/pricing/) (verified); [Salesforce Dictionary, legacy builder retires (search snippet only)](https://salesforcedictionary.com/news/salesforce-news-july-12-2026-agentforce-legacy-builder-retires) (unverified)

## Open frameworks and SDKs

These are the code libraries students would actually import to build a theater of agents: a loop, a graph of nodes, a crew of personas, a director that delegates. Almost all are free and open source; what costs money is the model calls underneath and, for some, an optional hosted tracing or deployment service. Version numbers and dates come from GitHub releases, npm, or PyPI read on November 4, 2026.

### LangGraph (framework)

**Status:** current · checked 2026-11-04 · LangChain

**What it is.** An open-source Python and JavaScript framework from LangChain for building agents as stateful graphs; first released January 2024 (note 01). It is a library, not a hosted service; LangSmith is the separate paid platform.

**Building blocks.** A `StateGraph` with typed state and reducers, nodes (`add_node`), edges and routers (`add_edge`, `add_conditional_edges`, `START`, `END`), fan-out with `Send`, control with `Command`, a `checkpointer` for persistence and threads, and `interrupt` for human approval.

**Status, November 4, 2026.** langgraph 1.2.19 (October 30) and langgraph-sdk 0.4.12 (November 3), both maintenance releases (note 01; re-read on GitHub today).

**Access and cost.** MIT license, free. LangSmith (tracing, deployment): Developer plan $0 for 1 seat and up to 5k base traces a month; Plus $39 per seat a month; deployment metered in LSUs (pricing page read November 4).

**In this class (adaptation).** The natural fit for the three-node graph: persona nodes, a director as a conditional edge, an observer node reading shared state.

**Official documentation.**

- **Official docs:** [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview)
- **Agent loop / architecture:** [Graph API overview](https://docs.langchain.com/oss/python/langgraph/graph-api)
- **Tools, state, permissions:** [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts); [Persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- **Quickstart / example:** [Quickstart](https://docs.langchain.com/oss/python/langgraph/quickstart)
- **API / SDK reference:** [langgraph, LangChain Reference](https://reference.langchain.com/python/langgraph)
- **Changelog / migration / deprecation:** [Releases, langchain-ai/langgraph](https://github.com/langchain-ai/langgraph/releases)
- **Limits:** all pages opened directly; Python docs linked (JavaScript docs exist in parallel).

**Sources.** [LangGraph releases, GitHub, Nov 4 2026](https://github.com/langchain-ai/langgraph/releases) (verified); [LangChain pricing, LangChain, Nov 4 2026](https://www.langchain.com/pricing) (verified); note 01.

### LangChain (framework)

**Status:** current · checked 2026-11-04 · LangChain

**What it is.** LangChain's open-source Python and JavaScript framework; since version 1.0 (PyPI, October 17, 2025) its center is a prebuilt agent built on LangGraph. Its docs: "An agent is a model calling tools in a loop until a given task is complete."

**Building blocks.** `create_agent` (model, tools, system prompt); middleware that shapes the "harness": `HumanInTheLoopMiddleware` (approval), `SummarizationMiddleware`, `PIIMiddleware` (guardrail), `TodoListMiddleware`, `SubAgentMiddleware`, retry middleware; `AgentState` (append-only `messages`), a `checkpointer` plus `thread_id` for memory, `response_format` for structured output. Several middleware classes come from the separate `deepagents` package.

**Status, November 4, 2026.** langchain 1.4.8 and langchain-core 1.7.4, both November 2 (GitHub releases).

**Access and cost.** MIT license, free; you pay your model provider. LangSmith pricing as on the LangGraph card.

**In this class (adaptation).** The quickest single persona in a loop: one `create_agent` per character, with the human-in-the-loop middleware as the director's veto.

**Official documentation.**

- **Official docs:** [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview)
- **Agent loop / architecture:** [Agents](https://docs.langchain.com/oss/python/langchain/agents); [Multi-agent](https://docs.langchain.com/oss/python/langchain/multi-agent)
- **Tools, state, permissions:** [Tools](https://docs.langchain.com/oss/python/langchain/tools); [Middleware overview](https://docs.langchain.com/oss/python/langchain/middleware/overview); [Human-in-the-loop](https://docs.langchain.com/oss/python/langchain/human-in-the-loop); [Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)
- **Quickstart / example:** [Quickstart](https://docs.langchain.com/oss/python/langchain/quickstart)
- **API / SDK reference:** [langchain, LangChain Reference](https://reference.langchain.com/python/langchain)
- **Changelog / migration / deprecation:** [What's new in LangChain v1](https://docs.langchain.com/oss/python/releases/langchain-v1); [LangChain v1 migration guide](https://docs.langchain.com/oss/python/migrate/langchain-v1)
- **Limits:** `/middleware` redirects to `/middleware/overview`.

**Sources.** [Agents, LangChain docs, Nov 4 2026](https://docs.langchain.com/oss/python/langchain/agents) (verified); [langchain releases, GitHub, Nov 4 2026](https://github.com/langchain-ai/langchain/releases) (verified); [langchain on PyPI, Nov 4 2026](https://pypi.org/project/langchain/) (verified).

### CrewAI (framework)

**Status:** current · checked 2026-11-04 · CrewAI

**What it is.** An open-source Python framework from CrewAI for "role-playing, autonomous AI agents" organized as crews; first released December 2023 (note 01). CrewAI also sells a hosted platform.

**Building blocks.** `Agent` with `role`, `goal`, `backstory` (note 01); `Task`; `Crew` run with `Process.sequential` or the hierarchical process (`manager_llm` / `manager_agent`); Flows for event-driven control with `@start`, `@listen`, `@router`, `or_`/`and_`, `@persist` state, and `@human_feedback`; memory.

**Status, November 4, 2026.** 1.15.34 (November 1, adds `crewai skill search`) and 1.15.35 (November 3, docs only) (note 01; GitHub releases today).

**Access and cost.** MIT license, free. Hosted plans: Basic is "Free" with "50 workflow executions/month"; Enterprise is custom (pricing page read November 4).

**In this class (adaptation).** The persona-first option: each character is a `role`/`goal`/`backstory`, and the hierarchical process makes one of them the director.

**Official documentation.**

- **Official docs:** [Introduction](https://docs.crewai.com/en/introduction)
- **Agent loop / architecture:** [Crews](https://docs.crewai.com/en/concepts/crews); [Flows](https://docs.crewai.com/en/concepts/flows)
- **Tools, state, permissions:** [Agents](https://docs.crewai.com/en/concepts/agents); [Memory](https://docs.crewai.com/en/concepts/memory)
- **Quickstart / example:** [Quickstart](https://docs.crewai.com/en/quickstart)
- **API / SDK reference:** [API reference introduction](https://docs.crewai.com/en/api-reference/introduction) (the hosted deployment API)
- **Changelog / migration / deprecation:** [Changelog](https://docs.crewai.com/en/changelog); [Releases, crewAIInc/crewAI](https://github.com/crewAIInc/crewAI/releases)
- **Limits:** unversioned doc URLs redirect to versioned ones (`/v1.15.35/en/...`).

**Sources.** [CrewAI releases, GitHub, Nov 4 2026](https://github.com/crewAIInc/crewAI/releases) (verified); [Pricing, CrewAI, Nov 4 2026](https://www.crewai.com/pricing) (verified); note 01.

### AutoGen (framework)

**Status:** retired · checked 2026-11-04 · Microsoft

**What it is.** Microsoft Research's open-source Python framework for multi-agent conversation, first released in 2023; the source of the "group chat" pattern. Microsoft has archived it.

**Building blocks.** Historical: `AgentChat` agents (`AssistantAgent`, `UserProxyAgent`), team chats, and an event-driven core runtime. Not recommended for new work.

**Status, November 4, 2026.** The README says "Project archived and no longer maintained": no bug fixes, security fixes, or features. "New users should start with Microsoft Agent Framework"; a migration guide exists. The banner was last clarified October 16, 2026. Last release python-v0.7.5 (September 30, 2025). The community fork continues separately as AG2 (next card).

**Access and cost.** Code remains public (repo license field reads CC-BY-4.0, which covers docs; code license not re-checked). Free.

**In this class (adaptation).** Read, don't build: its group-chat design is history for the theater, and the migration guide shows how the same ensemble looks in Agent Framework.

**Official documentation.**

- **Official docs:** [AutoGen (stable docs, historical)](https://microsoft.github.io/autogen/stable/)
- **Agent loop / architecture:** not opened today
- **Tools, state, permissions:** not opened today
- **Quickstart / example:** [microsoft/autogen README](https://github.com/microsoft/autogen)
- **API / SDK reference:** not opened today
- **Changelog / migration / deprecation:** [AutoGen to Microsoft Agent Framework Migration Guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)
- **Limits:** historical docs; GitHub's API does not flag the repo as archived even though the README says so.

**Sources.** [microsoft/autogen README, GitHub, Nov 4 2026](https://github.com/microsoft/autogen) (verified); [AutoGen releases, GitHub, Nov 4 2026](https://github.com/microsoft/autogen/releases) (verified).

### AG2 (framework)

**Status:** current · checked 2026-11-04 · AG2 (ag2ai)

**What it is.** "AG2 (formerly AutoGen)": an open-source Python framework maintained by the community fork of AutoGen. AG2 v1.0 (July 27, 2026) made a new protocol-driven framework the mainline, imported as `ag2`; the classic `autogen` API moved to `ag2ai/ag2-classic` in maintenance mode.

**Building blocks.** `Agent` with tools and middleware; subagents through `Agent.as_tool()` ("Subagents let agents delegate work to other agents through tool calling"), self-delegation, and `dynamic_agent()`; task lifecycle events (`TaskStarted`, `TaskCompleted`); approval-required tools and human in the loop; telemetry and evaluation scorers.

**Status, November 4, 2026.** v1.3.0 released today, November 4: "observation across delegation trees" and a shared task lifecycle; `TaskConfig` and `Agent(tasks=...)` are deprecated for removal in 1.4.0.

**Access and cost.** Apache-2.0, free; bring your own model key.

**In this class (adaptation).** A director agent that calls each persona as a tool, with observers watching the delegation tree that 1.3 exposes.

**Official documentation.**

- **Official docs:** [ag2, AG2 docs](https://docs.ag2.ai/)
- **Agent loop / architecture:** [Agent Communication](https://docs.ag2.ai/docs/user-guide/agents/); [Subagents](https://docs.ag2.ai/docs/user-guide/subagents/)
- **Tools, state, permissions:** [Approval Required](https://docs.ag2.ai/docs/user-guide/tools/approval_required/); [Human in the Loop](https://docs.ag2.ai/docs/user-guide/context/human_in_the_loop/)
- **Quickstart / example:** [Quick Start](https://docs.ag2.ai/docs/user-guide/quick-start/)
- **API / SDK reference:** not found (`/docs/api-reference/` returned 404)
- **Changelog / migration / deprecation:** [Releases, ag2ai/ag2](https://github.com/ag2ai/ag2/releases); [ag2ai/ag2-classic](https://github.com/ag2ai/ag2-classic) (classic API, maintenance mode)
- **Limits:** none beyond the 404.

**Sources.** [AG2 v1.0.0 and v1.3.0 release notes, GitHub, Nov 4 2026](https://github.com/ag2ai/ag2/releases) (verified); [Subagents, AG2, Nov 4 2026](https://docs.ag2.ai/docs/user-guide/subagents/) (verified).

### Microsoft Agent Framework (framework)

**Status:** current · checked 2026-11-04 · Microsoft

**What it is.** Microsoft's open-source Python and .NET framework for agents and multi-agent workflows, the successor to AutoGen and Semantic Kernel's agent features; preview October 2025 (note 01), 1.0 on April 2, 2026 (GitHub releases).

**Building blocks.** Agents with sessions, context providers, middleware ("Termination & Guardrails"), function tools with "Tool Approval"; graph-based workflows of executors and edges with checkpoints and human in the loop; prebuilt orchestrations: Sequential, Concurrent, Handoff, Group Chat, Magentic; A2A and AG-UI integrations; DevUI for local tracing.

**Status, November 4, 2026.** python-1.24.0 and dotnet-1.27.0 (October 30): explicit default approval mode for local MCP tools; Magentic plan review preserved (note 01).

**Access and cost.** MIT license, free; you pay the model provider (Azure or others).

**In this class (adaptation).** Its Group Chat orchestration is the theater almost as named: personas take turns, a manager picks the next speaker.

**Official documentation.**

- **Official docs:** [Microsoft Agent Framework Overview](https://learn.microsoft.com/en-us/agent-framework/overview/)
- **Agent loop / architecture:** [Workflow concepts](https://learn.microsoft.com/en-us/agent-framework/concepts/workflows/); [Workflow capabilities](https://learn.microsoft.com/en-us/agent-framework/workflows/)
- **Tools, state, permissions:** [Using function tools with human in the loop approvals](https://learn.microsoft.com/en-us/agent-framework/agents/tools/tool-approval)
- **Quickstart / example:** [Step 1: Your First Agent](https://learn.microsoft.com/en-us/agent-framework/get-started/your-first-agent)
- **API / SDK reference:** not found today (the docs table of contents lists DevUI's API only)
- **Changelog / migration / deprecation:** [Releases, microsoft/agent-framework](https://github.com/microsoft/agent-framework/releases); [AutoGen migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)
- **Limits:** orchestration names read from the docs' table of contents, not each page.

**Sources.** [Agent Framework releases, GitHub, Nov 4 2026](https://github.com/microsoft/agent-framework/releases) (verified); [Agent Framework docs table of contents, Microsoft Learn, Nov 4 2026](https://learn.microsoft.com/en-us/agent-framework/overview/) (verified); note 01.

### LlamaIndex (framework)

**Status:** current · checked 2026-11-04 · LlamaIndex

**What it is.** An open-source Python (and TypeScript) framework, first known for retrieval over documents; its agents run on LlamaIndex Workflows. The company now presents itself around document processing: the repo calls LlamaIndex "the document processing platform for AI," and its pricing page is titled "LlamaParse Pricing."

**Building blocks.** `FunctionAgent`, `ReActAgent`, `CodeActAgent`; `AgentWorkflow` for multi-agent handoff (`can_handoff_to=[...]`); an orchestrator with sub-agents as tools; Workflows: "an event-driven, step-based way to control the execution flow," with `@step`, user-defined events, `StartEvent`/`StopEvent`, and a `Context` store; human in the loop; deployment through `llamactl`.

**Status, November 4, 2026.** llama-index-core 0.14.25 (September 21); llama-index-workflows 2.26.1 (October 21) and llama-agents 0.12.8 (October 23) in the `run-llama/llama-agents` repo.

**Access and cost.** MIT license, free. LlamaCloud/LlamaParse are paid (prices not read today).

**In this class (adaptation).** Workflows make the loop explicit: each scene is an event, each persona a `@step`, the observer a step listening for every event.

**Official documentation.**

- **Official docs:** [Building an agent](https://developers.llamaindex.ai/python/framework/understanding/agent/)
- **Agent loop / architecture:** [Workflows: Introduction](https://developers.llamaindex.ai/python/llamaagents/workflows/); [Multi-agent patterns](https://developers.llamaindex.ai/python/framework/understanding/agent/multi_agent/)
- **Tools, state, permissions:** [Maintaining state](https://developers.llamaindex.ai/python/framework/understanding/agent/state/); [Human in the loop](https://developers.llamaindex.ai/python/framework/understanding/agent/human_in_the_loop/)
- **Quickstart / example:** [Starter Tutorial (Using OpenAI)](https://developers.llamaindex.ai/python/framework/getting_started/starter_example/)
- **API / SDK reference:** [Agent Classes](https://developers.llamaindex.ai/python/framework-api-reference/agent/)
- **Changelog / migration / deprecation:** [ChangeLog](https://developers.llamaindex.ai/python/framework/changelog/); [Releases, run-llama/llama-agents](https://github.com/run-llama/llama-agents/releases)
- **Limits:** `run-llama/workflows-py` redirects to `run-llama/llama-agents`.

**Sources.** [llama_index and llama-agents releases, GitHub, Nov 4 2026](https://github.com/run-llama/llama_index/releases) (verified); [Multi-agent patterns, LlamaIndex, Nov 4 2026](https://developers.llamaindex.ai/python/framework/understanding/agent/multi_agent/) (verified).

### Pydantic AI (framework)

**Status:** current · checked 2026-11-04 · Pydantic

**What it is.** An open-source Python agent framework from the makers of Pydantic: "a typed, extensible agent loop." V2 went stable June 23, 2026 with "a harness-first design."

**Building blocks.** `Agent` with typed output and dependency injection; tools (`@agent.tool`) and toolsets; capabilities, which bundle "tools, instructions, hooks, and model settings"; deferred tools for human approval; subagents; Pydantic Graph for typed control flow (steps, joins, decisions, parallel); durable execution on Temporal, DBOS, Prefect, Restate and others; OpenTelemetry tracing; AG-UI and Vercel AI event streams; MCP.

**Status, November 4, 2026.** v2.66.0, released today (November 4); the V1 line still gets fixes (v1.107.10, also today).

**Access and cost.** MIT license, free. Logfire (tracing) is a separate paid product with its own plans (pricing page opened; numbers not recorded).

**In this class (adaptation).** Typed output keeps a persona's lines in a fixed shape (speaker, line, stage direction) so an observer can check them.

**Official documentation.**

- **Official docs:** [Pydantic AI](https://pydantic.dev/docs/ai/overview/)
- **Agent loop / architecture:** [Agents](https://pydantic.dev/docs/ai/core-concepts/agent/); [Multi-agent Applications](https://pydantic.dev/docs/ai/guides/multi-agent-applications/)
- **Tools, state, permissions:** [Capabilities](https://pydantic.dev/docs/ai/capabilities/overview/); [Deferred Tools](https://pydantic.dev/docs/ai/tools-toolsets/deferred-tools/)
- **Quickstart / example:** [Installation](https://pydantic.dev/docs/ai/overview/install/)
- **API / SDK reference:** [pydantic_ai.agent](https://pydantic.dev/docs/ai/api/pydantic-ai/agent/)
- **Changelog / migration / deprecation:** [Upgrade Guide](https://pydantic.dev/docs/ai/project/changelog/); [Releases, pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai/releases)
- **Limits:** ai.pydantic.dev redirects (301) to pydantic.dev/docs/ai.

**Sources.** [Pydantic AI V2.0 release notes, GitHub, Nov 4 2026](https://github.com/pydantic/pydantic-ai/releases/tag/v2.0.0) (verified); [Pydantic AI overview, Pydantic, Nov 4 2026](https://pydantic.dev/docs/ai/overview/) (verified).

### Mastra (framework)

**Status:** current · checked 2026-11-04 · Mastra (Kepler Software)

**What it is.** "A TypeScript framework for building AI agents and applications," from the team behind Gatsby; open source with a hosted platform. `@mastra/core` 1.0.0 was published January 20, 2026 (npm).

**Building blocks.** `Agent` (`instructions`, `model`), `createTool()`; workflows of `createStep()` composed with `createWorkflow()` and `.then()`, `.branch()`, `.parallel()`, `.dowhile()`, `.dountil()`, `.foreach()`, with suspend and resume; supervisor agents that list subagents in `agents` (`.network()` is deprecated); memory; tool approval with `requireApproval: true`; evals and scorers; tracing; Studio, a local UI; MCP and A2A.

**Status, November 4, 2026.** `@mastra/core` 1.82.0, released today; weekly minor releases.

**Access and cost.** Apache 2.0 outside `ee/` directories, which carry a separate enterprise license. Mastra platform: Free $0 (100K observability events), Starter $25, Team $250 per workspace a month, plus usage (pricing page read November 4).

**In this class (adaptation).** For students in Next.js: a workflow with `.parallel()` personas and a `.branch()` director, viewed live in Studio.

**Official documentation.**

- **Official docs:** [Get started with Mastra](https://mastra.ai/docs)
- **Agent loop / architecture:** [Agents](https://mastra.ai/docs/agents/overview); [Workflows](https://mastra.ai/docs/workflows/overview); [Multi-agent systems](https://mastra.ai/docs/guides/multi-agent-systems)
- **Tools, state, permissions:** [Human-in-the-loop (agents)](https://mastra.ai/docs/agents/human-in-the-loop); [Memory](https://mastra.ai/docs/memory/overview)
- **Quickstart / example:** [Get started with Mastra](https://mastra.ai/docs)
- **API / SDK reference:** [Agent class](https://mastra.ai/reference/agents/agent)
- **Changelog / migration / deprecation:** [Migration: .network() to supervisor agents](https://mastra.ai/reference/migrations/network-to-supervisor); [Releases, mastra-ai/mastra](https://github.com/mastra-ai/mastra/releases)
- **Limits:** docs have Markdown twins (append `.md`) and an index at mastra.ai/llms.txt.

**Sources.** [Mastra LICENSE.md, GitHub, Nov 4 2026](https://github.com/mastra-ai/mastra/blob/main/LICENSE.md) (verified); [Pricing, Mastra, Nov 4 2026](https://mastra.ai/pricing) (verified); [@mastra/core on npm, Nov 4 2026](https://www.npmjs.com/package/@mastra/core) (verified via the npm registry CLI; the web page returns 403).

### Vercel AI SDK (SDK)

**Status:** current · checked 2026-11-04 · Vercel

**What it is.** Vercel's open-source TypeScript SDK (npm package `ai`) for model calls, tools, UI streaming, and agents across providers. AI SDK 7 shipped June 25, 2026.

**Building blocks.** `ToolLoopAgent`, "the recommended approach for building agents"; loop control with `stopWhen` ("By default, `ToolLoopAgent` stops after 20 steps using `isStepCount(20)`"), `hasToolCall(...)`, `isLoopFinished()`, and `prepareStep` before each step; tool approvals (`needsApproval`, policy-based approvals, opt-in HMAC-signed approvals); subagents ("an agent that a parent agent can invoke"); `WorkflowAgent` for durable, resumable runs; experimental `HarnessAgent` to drive Claude Code, Codex, or Pi; unified telemetry. Note that v7 renamed the step-count helper: `isStepCount`, not v5/v6's `stepCountIs`.

**Status, November 4, 2026.** `ai` 7.0.162 (November 3); v6 (6.0.322) and v5 lines still patched.

**Access and cost.** Apache-2.0 (npm), free; you pay providers or Vercel's AI Gateway (not priced today).

**In this class (adaptation).** A step limit is a curtain: `stopWhen` ends each persona's turn, and subagents give the director its cast.

**Official documentation.**

- **Official docs:** [Agents](https://ai-sdk.dev/docs/agents/overview)
- **Agent loop / architecture:** [Loop Control](https://ai-sdk.dev/docs/agents/loop-control); [Building Agents](https://ai-sdk.dev/docs/agents/building-agents); [Subagents](https://ai-sdk.dev/docs/agents/subagents)
- **Tools, state, permissions:** [Tool Calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling); [Tool Approvals](https://ai-sdk.dev/docs/agents/tool-approvals); [WorkflowAgent](https://ai-sdk.dev/docs/agents/workflow-agent)
- **Quickstart / example:** [Next.js App Router](https://ai-sdk.dev/docs/getting-started/nextjs-app-router)
- **API / SDK reference:** [ToolLoopAgent](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent)
- **Changelog / migration / deprecation:** [Migrate AI SDK 6.x to 7.0](https://ai-sdk.dev/docs/migration-guides/migration-guide-7-0); [AI SDK 7 is now available](https://vercel.com/blog/ai-sdk-7)
- **Limits:** ai-sdk.dev/llms.txt did not download; docs pages show "v7 Latest documentation."

**Sources.** [AI SDK 7, Vercel blog, Nov 4 2026](https://vercel.com/blog/ai-sdk-7) (verified); [Loop Control, AI SDK, Nov 4 2026](https://ai-sdk.dev/docs/agents/loop-control) (verified); [ai on npm, Nov 4 2026](https://www.npmjs.com/package/ai) (verified via the npm registry CLI; the web page returns 403).

### smolagents (framework)

**Status:** current · checked 2026-11-04 · Hugging Face

**What it is.** Hugging Face's open-source Python library, "a barebones library for agents that think in code"; the agent logic "fits in ~thousand lines of code." First released December 2024.

**Building blocks.** `CodeAgent`, which "writes its actions in code"; `ToolCallingAgent` for JSON tool calls; multi-step ReAct loop; `managed_agents` for a manager over sub-agents; sandboxed execution via Modal, Blaxel, E2B, or Docker; tools from MCP servers, LangChain, or Hub Spaces; any model via Inference Providers, LiteLLM, Transformers, or Ollama.

**Status, November 4, 2026.** v1.26.0 (May 29, 2026) is the latest release, which removed the remote WasmExecutor; no release in five months.

**Access and cost.** Apache-2.0, free. Hugging Face Inference Providers are billed per use (not priced today).

**In this class (adaptation).** A small codebase students can read end to end: one manager `CodeAgent` with each persona as a managed agent.

**Official documentation.**

- **Official docs:** [smolagents](https://huggingface.co/docs/smolagents/index)
- **Agent loop / architecture:** [How do multi-step agents work?](https://huggingface.co/docs/smolagents/conceptual_guides/react); [Orchestrate a multi-agent system](https://huggingface.co/docs/smolagents/examples/multiagents)
- **Tools, state, permissions:** [Secure code execution](https://huggingface.co/docs/smolagents/tutorials/secure_code_execution)
- **Quickstart / example:** [Agents: Guided tour](https://huggingface.co/docs/smolagents/guided_tour)
- **API / SDK reference:** [Agents (reference)](https://huggingface.co/docs/smolagents/reference/agents)
- **Changelog / migration / deprecation:** [Releases, huggingface/smolagents](https://github.com/huggingface/smolagents/releases)
- **Limits:** llms.txt points to v1.26.0 versioned pages.

**Sources.** [smolagents index, Hugging Face, Nov 4 2026](https://huggingface.co/docs/smolagents/index) (verified); [smolagents releases, GitHub, Nov 4 2026](https://github.com/huggingface/smolagents/releases) (verified).

### DSPy (framework)

**Status:** current · checked 2026-11-04 · Stanford NLP

**What it is.** An open-source Python framework from Stanford NLP, "Program, don't prompt, your LLMs": you declare a task's inputs and outputs and let optimizers tune the prompts. It is closer to a compiler for LM programs than an orchestration framework.

**Building blocks.** Signatures (typed inputs and outputs); modules that choose a strategy: `dspy.Predict`, `dspy.ChainOfThought`, `dspy.ReAct` and ReActV2 (an agent loop with tools); MCP tools; optimizers such as `dspy.GEPA` and `MIPROv2` that tune a program against a metric; RLM for large contexts.

**Status, November 4, 2026.** 3.4.1 (October 12). 3.4 (September 25) is "the LM transition release; 3.5 is the migration deadline" for legacy LM integrations.

**Access and cost.** MIT license, free; no hosted service.

**In this class (adaptation).** For observers: write the critic as a signature, score scenes with a metric, and let an optimizer tune the persona prompts.

**Official documentation.**

- **Official docs:** [DSPy: Program, don't prompt, your LLMs](https://dspy.ai/current/)
- **Agent loop / architecture:** [Changing modules](https://dspy.ai/current/getting-started/changing-modules/); [ReAct](https://dspy.ai/current/api/modules/ReAct/)
- **Tools, state, permissions:** [Expanding signatures](https://dspy.ai/current/getting-started/expanding-signatures/)
- **Quickstart / example:** [Building AI Agents with DSPy](https://dspy.ai/current/tutorials/customer_service_agent/)
- **API / SDK reference:** [ReAct](https://dspy.ai/current/api/modules/ReAct/); [GEPA optimization](https://dspy.ai/current/getting-started/gepa-optimization/)
- **Changelog / migration / deprecation:** [Releases, stanfordnlp/dspy](https://github.com/stanfordnlp/dspy/releases)
- **Limits:** older `/learn/...` URLs redirect by script to `/current/getting-started/...`; no llms.txt (404).

**Sources.** [DSPy 3.4.0 release notes, GitHub, Nov 4 2026](https://github.com/stanfordnlp/dspy/releases/tag/3.4.0) (verified); [DSPy home, Nov 4 2026](https://dspy.ai/current/) (verified).

### Letta (formerly MemGPT) (harness)

**Status:** current · checked 2026-11-04 · Letta

**What it is.** Letta, "f.k.a. MemGPT," is a platform for stateful agents with long-term memory. Its open-source core is now Letta Code, an npm-installed agent harness with a terminal UI, App Server, and channels; Letta Cloud and a TypeScript Letta Agent SDK sit alongside. Letta Code's repo dates from October 2025.

**Building blocks.** The stateful agent, "a persistent AI identity with its own memory, model configuration, tools, and message history"; MemFS, "a git-backed memory filesystem" the agent edits; dreaming ("background subagents ... consolidate useful lessons," set with `/sleeptime`); subagents; conversations; channels (Slack, Telegram, Discord, WhatsApp, Signal); shared memory.

**Status, November 4, 2026.** Letta Code v0.34.39 (November 2). The old `letta-ai/letta` server (last release 0.16.8, May 14, 2026) is retired: "active projects should use the current source." The memory-blocks page sits under `v1-sdk` (historical).

**Access and cost.** Letta Code is Apache-2.0. Cloud: Free $0 (BYOK, limited agents, 5 MiB memory), Pro $20 a month (up to 20 stateful agents); team and usage-based developer plans (pricing page read November 4).

**In this class (adaptation).** Give each persona a memory that survives between class sessions, and let a "dreaming" observer rewrite it overnight.

**Official documentation.**

- **Official docs:** [Letta Documentation](https://docs.letta.com/); [Stateful agents](https://docs.letta.com/concepts/stateful-agents)
- **Agent loop / architecture:** [MemFS](https://docs.letta.com/concepts/memfs); [Subagents](https://docs.letta.com/configuration/subagents)
- **Tools, state, permissions:** [Memory & dreaming](https://docs.letta.com/configuration/memory); [Channels](https://docs.letta.com/self-hosting/channels)
- **Quickstart / example:** [Quickstart](https://docs.letta.com/quickstart)
- **API / SDK reference:** [Agents (API)](https://docs.letta.com/api/resources/agents); [Letta Agent SDK overview](https://docs.letta.com/agent-sdk)
- **Changelog / migration / deprecation:** [Releases, letta-ai/letta-code](https://github.com/letta-ai/letta-code/releases); [Memory blocks (core memory), historical v1 SDK](https://docs.letta.com/v1-sdk/memory/memory-blocks)
- **Limits:** none.

**Sources.** [letta-ai/letta README, GitHub, Nov 4 2026](https://github.com/letta-ai/letta) (verified); [Pricing, Letta Docs, Nov 4 2026](https://docs.letta.com/pricing) (verified).

### Haystack (framework)

**Status:** current · checked 2026-11-04 · deepset

**What it is.** deepset's open-source Python framework for pipelines and agents, long used for retrieval (RAG). Haystack 3.0 (July 20, 2026) is "a major release for building production-grade agents."

**Building blocks.** Pipelines of components with explicit routing; an `Agent` component that loops "calling tools, updating state, and generating prompts" until `exit_conditions` are met (default `["text"]`), capped by `max_agent_steps` (default 100); `state_schema` with tools reading and writing state; hooks at `before_run`, `before_llm`, `before_tool`, `after_tool`, `on_exit`, `after_run` for guardrails and human confirmation; skills.

**Status, November 4, 2026.** v3.4.1 (October 21); the 2.x line still gets patches (v2.31.1, November 3).

**Access and cost.** Apache-2.0, free. deepset's hosted Haystack Enterprise Platform: Studio tier $0 (one user, about 100 pipeline hours); Enterprise custom (pricing page read November 4).

**In this class (adaptation).** Hooks are the observer's seat: a `before_tool` hook can log, veto, or ask a human before any persona acts.

**Official documentation.**

- **Official docs:** [Introduction to Haystack](https://docs.haystack.deepset.ai/docs/intro)
- **Agent loop / architecture:** [Agent](https://docs.haystack.deepset.ai/docs/agent); [Pipelines](https://docs.haystack.deepset.ai/docs/pipelines)
- **Tools, state, permissions:** [Agent](https://docs.haystack.deepset.ai/docs/agent) (state, hooks)
- **Quickstart / example:** [Get Started](https://docs.haystack.deepset.ai/docs/get-started); [Build a Tool-Calling Agent](https://haystack.deepset.ai/tutorials/43_building_a_tool_calling_agent)
- **API / SDK reference:** [Agents API](https://docs.haystack.deepset.ai/reference/agents-api)
- **Changelog / migration / deprecation:** [Migration Guide](https://docs.haystack.deepset.ai/docs/migration); [Releases, deepset-ai/haystack](https://github.com/deepset-ai/haystack/releases)
- **Limits:** none.

**Sources.** [Haystack 3.0.0 release notes, GitHub, Nov 4 2026](https://github.com/deepset-ai/haystack/releases/tag/v3.0.0) (verified); [Agent, Haystack docs, Nov 4 2026](https://docs.haystack.deepset.ai/docs/agent) (verified); [Pricing, deepset, Nov 4 2026](https://www.deepset.ai/pricing) (verified).

### Agno (framework)

**Status:** current · checked 2026-11-04 · Agno

**What it is.** An open-source Python framework and runtime (formerly Phidata) for agents, teams, and workflows, with AgentOS, a FastAPI runtime you host yourself. v3.0 (August 24, 2026) was a breaking release requiring a database migration.

**Building blocks.** `Agent`; `Team`, which "coordinates agents or nested teams," with `TeamMode` coordinate, route, broadcast, or tasks; `Workflow` patterns; human in the loop (confirmation required, user input, external execution); sessions and memory in a database; tool-result offloading to AgentFS (v3); AgentOS serving "execution APIs, persistent state, authorization, tracing."

**Status, November 4, 2026.** v3.1.12 (October 29).

**Access and cost.** Apache-2.0; "the runtime is free." Control plane: Free $0 (local), Pro $150 a month (one live AgentOS connection, three seats), Enterprise custom (pricing page read November 4).

**In this class (adaptation).** `TeamMode.broadcast` sends one cue to every persona at once; route mode makes the leader a director.

**Official documentation.**

- **Official docs:** [Welcome to Agno](https://docs.agno.com/)
- **Agent loop / architecture:** [What are Agents?](https://docs.agno.com/agents/overview); [What are Teams?](https://docs.agno.com/teams/overview); [What are Workflows?](https://docs.agno.com/workflows/overview)
- **Tools, state, permissions:** [Human-in-the-Loop (HITL)](https://docs.agno.com/hitl/overview); [AgentOS Runtime](https://docs.agno.com/agent-os/overview)
- **Quickstart / example:** [Build a personal agent](https://docs.agno.com/first-agent)
- **API / SDK reference:** [Agent](https://docs.agno.com/reference/agents/agent)
- **Changelog / migration / deprecation:** [Migrating to Agno v3.0](https://docs.agno.com/other/v3-migration); [Releases, agno-agi/agno](https://github.com/agno-agi/agno/releases)
- **Limits:** none.

**Sources.** [Agno v3.0.0 release notes, GitHub, Nov 4 2026](https://github.com/agno-agi/agno/releases/tag/v3.0.0) (verified); [Pricing, Agno, Nov 4 2026](https://www.agno.com/pricing) (verified).

### CAMEL (framework)

**Status:** current · checked 2026-11-04 · CAMEL-AI

**What it is.** An open-source Python multi-agent framework from the CAMEL-AI community, descended from the 2023 CAMEL paper on role-playing agents; its stated aim is "finding the scaling laws of agents for data generation, world simulation, and task automation."

**Building blocks.** `ChatAgent`; Societies, including `RolePlaying` ("Turn-based, prompt-engineered, zero-role-flip agent collaboration") with an AI User, an AI Assistant, and an optional Critic; `Workforce`, "the central orchestrator" for teams of agents; memory, tools, interpreters and sandboxed runtimes; MCP client and server.

**Status, November 4, 2026.** Latest stable v0.2.90 (March 22, 2026); pre-releases continue to v0.2.91a7 (September 3). Development is slower than the frameworks above.

**Access and cost.** Apache-2.0, free.

**In this class (adaptation).** The closest to the theater out of the box: `RolePlaying` is two personas plus a critic, i.e. two actors and an observer.

**Official documentation.**

- **Official docs:** [Introduction](https://docs.camel-ai.org/get_started/introduction)
- **Agent loop / architecture:** [Societies](https://docs.camel-ai.org/key_modules/societies); [Workforce](https://docs.camel-ai.org/key_modules/workforce)
- **Tools, state, permissions:** [Agents](https://docs.camel-ai.org/key_modules/agents)
- **Quickstart / example:** [Creating Your First Agent Society](https://docs.camel-ai.org/cookbooks/basic_concepts/create_your_first_agents_society)
- **API / SDK reference:** [camel.agents.chat_agent](https://docs.camel-ai.org/reference/camel.agents.chat_agent)
- **Changelog / migration / deprecation:** [Releases, camel-ai/camel](https://github.com/camel-ai/camel/releases)
- **Limits:** every docs page has the same HTML title; Markdown twins (`.md`) carry the content.

**Sources.** [Societies, CAMEL docs, Nov 4 2026](https://docs.camel-ai.org/key_modules/societies) (verified); [CAMEL releases, GitHub, Nov 4 2026](https://github.com/camel-ai/camel/releases) (verified).

## Protocols

Protocols are agreements about messages, not software: they let an agent built in one framework reach tools (MCP), other agents (A2A), a user's screen (AG-UI), or a shop and a payment (ACP, UCP, AP2, x402). They cost nothing to use; the SDKs that implement them are open source.

### Model Context Protocol (MCP) (protocol)

**Status:** current · checked 2026-11-04 · Agentic AI Foundation

**What it is.** An open protocol, originated by Anthropic in November 2024 and now governed by the Agentic AI Foundation (note 01), that connects an AI application (host and client) to servers offering tools, resources, and prompts.

**Building blocks.** Hosts, clients, servers; tools, resources, prompts; per the current spec, "Stateless, self-contained requests" and optional extensions: Tasks (long-running operations with polling and "durable handles"), Skills over MCP, MCP Apps (note 01). Hosts must get user consent before tool use (note 01).

**Status, November 4, 2026.** Spec version 2026-07-28 (note 01; the `latest` URL now resolves to `/specification/2026-07-28`). Python SDK `mcp` 2.3.0 (October 2, PyPI).

**Access and cost.** Open specification and open-source SDKs; free.

**In this class (adaptation).** Give every persona the same MCP server (a shared script or prop table) so the cast works from one source of truth.

**Official documentation.**

- **Official docs:** [What is the Model Context Protocol (MCP)?](https://modelcontextprotocol.io/docs/getting-started/intro)
- **Agent loop / architecture:** [Architecture overview](https://modelcontextprotocol.io/docs/learn/architecture)
- **Tools, state, permissions:** [Tools (spec)](https://modelcontextprotocol.io/specification/latest/server/tools)
- **Quickstart / example:** [Build an MCP server](https://modelcontextprotocol.io/docs/develop/build-server)
- **API / SDK reference:** [Specification](https://modelcontextprotocol.io/specification/latest)
- **Changelog / migration / deprecation:** [Key Changes](https://modelcontextprotocol.io/specification/latest/changelog)
- **Limits:** docs URLs redirect to versioned paths (`/docs/2026-07-28/...`).

**Sources.** [MCP specification, modelcontextprotocol.io, Nov 4 2026](https://modelcontextprotocol.io/specification/latest) (verified); [mcp on PyPI, Nov 4 2026](https://pypi.org/project/mcp/) (verified); note 01.

### Agent2Agent (A2A) (protocol)

**Status:** current · checked 2026-11-04 · Agentic AI Foundation

**What it is.** An open protocol, originated by Google in April 2025, for agents built by different vendors to discover each other and exchange tasks. Its site: "MCP is for agent-to-tool communication" and "A2A is for agent-to-agent communication" (note 01).

**Building blocks.** Agent cards for discovery, tasks with a lifecycle, messages and artifacts, streaming and asynchronous updates, extensions (AP2 is one), protocol bindings.

**Status, November 4, 2026.** Spec at v1.0 ("What's New in v1.0" page). A2A was accepted as "a Growth Stage project at the Agentic AI Foundation" (blog, August 27, 2026); an official `a2a` CLI was introduced October 1, 2026 (blog list read today). Python `a2a-sdk` 1.3.0 (October 27, PyPI).

**Access and cost.** Open specification; Apache-2.0 SDKs; free.

**In this class (adaptation).** Run each persona as its own service with an agent card, so the director discovers its cast over the network instead of in one program.

**Official documentation.**

- **Official docs:** [What is A2A?](https://a2a-protocol.org/latest/topics/what-is-a2a/)
- **Agent loop / architecture:** [Core Concepts](https://a2a-protocol.org/latest/topics/key-concepts/); [Life of a Task](https://a2a-protocol.org/latest/topics/life-of-a-task/)
- **Tools, state, permissions:** [Core Concepts](https://a2a-protocol.org/latest/topics/key-concepts/)
- **Quickstart / example:** [Python tutorial: Introduction](https://a2a-protocol.org/latest/tutorials/python/1-introduction/)
- **API / SDK reference:** [Specification overview](https://a2a-protocol.org/latest/specification/)
- **Changelog / migration / deprecation:** [What's New in v1.0](https://a2a-protocol.org/latest/whats-new-v1/); [Blog](https://a2a-protocol.org/latest/blog/)
- **Limits:** the AAIF and CLI posts were seen in the blog list, not opened individually.

**Sources.** [A2A blog, a2a-protocol.org, Nov 4 2026](https://a2a-protocol.org/latest/blog/) (verified); [a2a-sdk on PyPI, Nov 4 2026](https://pypi.org/project/a2a-sdk/) (verified); note 01.

### AG-UI (Agent–User Interaction Protocol) (protocol)

**Status:** current · checked 2026-11-04 · CopilotKit (originator)

**What it is.** "An open, lightweight, event-based protocol that standardizes how AI agents connect to user-facing applications," started by CopilotKit in May 2025. It pairs with MCP (tools) and A2A (agents) as the agent-to-user layer.

**Building blocks.** A stream of typed events from agent to front end (run lifecycle such as `RUN_FINISHED`, text messages, tool calls, state snapshots and deltas, `REASONING_*` events), interrupts for human input, shared state, frontend tools, subagents, generative UI.

**Status, November 4, 2026.** AG-UI 1.0 is "the first release with a specification behind it"; `@ag-ui/core` 1.0.0 was published September 17, 2026 (npm), now 1.0.3; repo releases are date-tagged (latest release/2026-11-03). Supported by Pydantic AI, CrewAI, Microsoft Agent Framework, and others (their docs, read today).

**Access and cost.** MIT license, free.

**In this class (adaptation).** Stream every persona's events to one stage view, so the audience watches lines, tool calls, and the director's interrupts in real time.

**Official documentation.**

- **Official docs:** [AG-UI Overview](https://docs.ag-ui.com/introduction)
- **Agent loop / architecture:** [Core architecture](https://docs.ag-ui.com/concepts/architecture); [Events](https://docs.ag-ui.com/concepts/events)
- **Tools, state, permissions:** [Interrupts](https://docs.ag-ui.com/concepts/interrupts)
- **Quickstart / example:** [Quickstart: Introduction](https://docs.ag-ui.com/quickstart/introduction)
- **API / SDK reference:** [JS core SDK overview](https://docs.ag-ui.com/sdk/js/core/overview)
- **Changelog / migration / deprecation:** [Migrating to 1.0](https://docs.ag-ui.com/migrating-to-1-0)
- **Limits:** no official 1.0 announcement found; date from npm.

**Sources.** [AG-UI Overview, docs.ag-ui.com, Nov 4 2026](https://docs.ag-ui.com/introduction) (verified); [@ag-ui/core on npm, Nov 4 2026](https://www.npmjs.com/package/@ag-ui/core) (verified via the npm registry CLI; the web page returns 403).

### Agentic Commerce Protocol (ACP) (protocol)

**Status:** preview · checked 2026-11-04 · OpenAI and Stripe

**What it is.** "An open standard for programmatic commerce flows between buyers, AI agents, and businesses," maintained by OpenAI and Stripe and "currently in `beta`." ChatGPT was the first AI platform to implement it; Stripe was the first payment provider (Shared Payment Token).

**Building blocks.** Merchant REST endpoints (`POST /checkout_sessions`, update, retrieve, complete) returning authoritative cart state; a payment token in `payment_data`; publishable via REST or MCP; the business stays merchant of record.

**Status, November 4, 2026.** Dated spec versions 2025-12-12, 2026-01-16, 2026-01-30, 2026-04-17, plus `unreleased` (GitHub). Merchants apply to "Instant Checkout in ChatGPT."

**Access and cost.** Apache-2.0 spec; free to implement. Payment processing fees are the processor's (not read).

**In this class (adaptation).** Out of scope for the theater, but a clear case study of where a human must approve: the purchase.

**Official documentation.**

- **Official docs:** [Agentic Commerce Protocol: Introduction](https://www.agenticcommerce.dev/docs)
- **Agent loop / architecture:** [Agentic Commerce Protocol, OpenAI Developers](https://developers.openai.com/commerce)
- **Tools, state, permissions:** [Agentic commerce, Stripe Documentation](https://docs.stripe.com/agentic-commerce)
- **Quickstart / example:** not found
- **API / SDK reference:** [Spec repository](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- **Changelog / migration / deprecation:** [changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/tree/main/changelog)
- **Limits:** the OpenAI and Stripe pages were opened (HTTP 200) but not read in full.

**Sources.** [ACP README, GitHub, Nov 4 2026](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol) (verified); [agenticcommerce.dev, Nov 4 2026](https://www.agenticcommerce.dev/) (verified).

### Universal Commerce Protocol (UCP) (protocol)

**Status:** current · checked 2026-11-04 · UCP Authors (Google-led)

**What it is.** An open standard, "the common language for platforms, agents, and businesses," co-developed by Google, Shopify, Etsy, Walmart, Amazon, Stripe, Booking.com, Hilton, DoorDash, and Square and endorsed by Visa, Mastercard, PayPal, and others. First tagged release January 23, 2026 (GitHub).

**Building blocks.** REST and JSON-RPC transports; checkout capabilities; "AP2, A2A, and MCP support built in," with AP2 handling payment mandates; a Lodging draft.

**Status, November 4, 2026.** Latest tagged spec v2026-08-25; the repo was updated today.

**Access and cost.** Apache-2.0; free to implement.

**In this class (adaptation).** Out of scope; useful as an example of a protocol layered on three others.

**Official documentation.**

- **Official docs:** [Overview (specification)](https://ucp.dev/latest/specification/overview/)
- **Agent loop / architecture:** [UCP and AP2](https://ucp.dev/documentation/ucp-and-ap2/)
- **Tools, state, permissions:** not opened
- **Quickstart / example:** [Samples for UCP](https://github.com/Universal-Commerce-Protocol/samples)
- **API / SDK reference:** [Specification repository](https://github.com/Universal-Commerce-Protocol/ucp)
- **Changelog / migration / deprecation:** [Releases, Universal-Commerce-Protocol/ucp](https://github.com/Universal-Commerce-Protocol/ucp/releases)
- **Limits:** no version number on the home page; versions from GitHub tags.

**Sources.** [ucp.dev, Nov 4 2026](https://ucp.dev/) (verified); [UCP releases, GitHub, Nov 4 2026](https://github.com/Universal-Commerce-Protocol/ucp/releases) (verified).

### Agent Payments Protocol (AP2) (protocol)

**Status:** preview · checked 2026-11-04 · Google; standardization moving to FIDO Alliance

**What it is.** "An open protocol for the emerging Agent Economy," from Google, "available as an extension for the open-source Agent2Agent (A2A) protocol" and an "open extension for A2A and MCP." It proves a user authorized an agent's payment.

**Building blocks.** Verifiable digital credentials: a Checkout Mandate (shared with the merchant) and a Payment Mandate (shared with the credential provider, network, and processor), each with an Open stage (the user's constraints) and a Closed stage (authorization of a specific checkout or amount).

**Status, November 4, 2026.** v0.2.0 (GitHub release April 28, 2026), linked on the site as "AP2 v0.2 Release and FIDO Alliance Donation"; standardization "will continue within" FIDO working groups. The initial version supports card payments.

**Access and cost.** Apache-2.0; free.

**In this class (adaptation).** The mandate is a good model of a director's written permission slip: what an actor may do alone, signed in advance.

**Official documentation.**

- **Official docs:** [Executive Summary](https://ap2-protocol.org/overview/)
- **Agent loop / architecture:** [Flows](https://ap2-protocol.org/ap2/flows/)
- **Tools, state, permissions:** [Agent Payments Protocol specification](https://ap2-protocol.org/ap2/specification/)
- **Quickstart / example:** [google-agentic-commerce/AP2 samples](https://github.com/google-agentic-commerce/AP2)
- **API / SDK reference:** [Agent Payments Protocol specification](https://ap2-protocol.org/ap2/specification/)
- **Changelog / migration / deprecation:** not opened (the FIDO donation post was seen as a link only)
- **Limits:** none beyond that.

**Sources.** [ap2-protocol.org, Nov 4 2026](https://ap2-protocol.org/) (verified); [AP2 releases, GitHub, Nov 4 2026](https://github.com/google-agentic-commerce/AP2/releases) (verified).

### x402 (protocol)

**Status:** current · checked 2026-11-04 · x402 Foundation (Linux Foundation)

**What it is.** "The open payment standard that enables services to charge for access to their APIs and content directly over HTTP," built on the HTTP `402 Payment Required` status code, with "native support for machine-to-machine payments" by agents. Created by Coinbase; contributed to the Linux Foundation's new x402 Foundation (announced April 2, 2026).

**Building blocks.** A client requests a resource, the server answers 402 with payment instructions, the client pays, and a facilitator verifies and settles before the resource is returned; seller middleware such as `paymentMiddleware`; network- and currency-agnostic schemes (stablecoins, tokens, fiat).

**Status, November 4, 2026.** Python package `x402` 2.26.0 (October 28, PyPI); spec repo at `x402-foundation/x402`, updated November 3.

**Access and cost.** Apache-2.0; free. Each payment costs whatever the seller charges plus network fees.

**In this class (adaptation).** Out of scope; a pointer for students curious how agents might pay per call.

**Official documentation.**

- **Official docs:** [Welcome to x402](https://docs.x402.org/introduction)
- **Agent loop / architecture:** [HTTP 402](https://docs.x402.org/core-concepts/http-402)
- **Tools, state, permissions:** not opened
- **Quickstart / example:** [Quickstart for Buyers](https://docs.x402.org/getting-started/quickstart-for-buyers)
- **API / SDK reference:** [x402-foundation/x402](https://github.com/x402-foundation/x402)
- **Changelog / migration / deprecation:** [Releases, x402-foundation/x402](https://github.com/x402-foundation/x402/releases)
- **Limits:** a `coinbase/x402` repo also still exists; its relation to the foundation repo was not checked.

**Sources.** [Linux Foundation is Launching the x402 Foundation, Linux Foundation, Nov 4 2026](https://www.linuxfoundation.org/press/linux-foundation-is-launching-the-x402-foundation-and-welcoming-the-contribution-of-the-x402-protocol) (verified); [Welcome to x402, Nov 4 2026](https://docs.x402.org/introduction) (verified).

## No-code and low-code builders

These tools draw the agent: a canvas or form where triggers, model steps, tools, and approvals are boxes and arrows, run on someone else's servers. They are where students can build a three-node graph without code, and two of them (Flowise, and Zapier's old AI Actions) show how fast this layer turns over.

### n8n (no-code builder)

**Status:** current · checked 2026-11-04 · n8n

**What it is.** A node-graph workflow automation tool, first released in 2019 (note 01), that can be self-hosted or used in the cloud. It is source-available under its own license, not OSI open source.

**Building blocks.** Triggers (schedule, webhook, chat, app events); an AI Agent node with model, memory, and tool sub-nodes; ordinary app nodes as tools; the agent builder's Test agent button; Slack agents that reply only when mentioned (note 01).

**Status, November 4, 2026.** n8n 3.0 shipped October 27 with breaking changes (note 01); GitHub shows `n8n@3.1.0` (November 3), with 2.x patches still shipping (2.46.6, November 4).

**Access and cost.** Cloud Starter €20/mo (annual) for 2.5K executions, Pro €50 for 10K, Business €667 for 40K (self-hosted), Enterprise custom; billed by workflow executions. A Community Edition is self-hostable from GitHub. A trial gives 1,000 executions with no card (pricing page, read November 4).

**In this class (adaptation).** Draw the three-node graph literally: two AI Agent nodes and a router.

**Official documentation.**

- **Official docs:** [Integrate AI | n8n Docs](https://docs.n8n.io/build/integrate-ai)
- **Agent loop / architecture:** [AI Agent | Nodes](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent)
- **Tools, state, permissions:** [Compare editions](https://docs.n8n.io/deploy/host-n8n/community-edition-features)
- **Quickstart / example:** not opened
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [Release notes](https://docs.n8n.io/changelog/release-notes)
- **Limits:** old docs URLs redirect (advanced-ai to build/integrate-ai).

**Sources.** [n8n pricing, read Nov 4, 2026](https://n8n.io/pricing/) (verified); note 01.

### Zapier Agents (no-code builder)

**Status:** current · checked 2026-11-04 · Zapier

**What it is.** Hosted AI agents at agents.zapier.com, built with help from Zapier Copilot and connected to Zapier's catalog of "9,000+ apps." Zapier MCP and a Zapier SDK expose the same integrations to coding agents.

**Building blocks.** Instructions; actions in connected apps; knowledge (FAQs, docs, links); web browsing and a Chrome extension; agents started from a Zap; one agent calling another (help-center titles); Copilot to edit. Zapier MCP turns app actions into tools for any MCP client.

**Status, November 4, 2026.** The docs say AI Actions and Natural Language Actions "are retired. Use Zapier MCP instead." The marketing page gives no beta label or dates.

**Access and cost.** Agents bill "activities," not tasks: 400/mo on Free and 1,500/mo on Pro, capped at 10 per run on Free and 40 on paid plans. Each Zapier MCP call uses 2 tasks. Free gives 100 tasks a month; Pro starts at $19.99/mo annual (pricing page, read November 4).

**In this class (adaptation).** An observer agent that posts a summary to Slack whenever the stage changes.

**Official documentation.**

- **Official docs:** [Build AI teammates with Zapier Agents](https://zapier.com/agents)
- **Agent loop / architecture:** [Zapier Agents: Combine AI agents with automation](https://zapier.com/blog/zapier-agents-guide/)
- **Tools, state, permissions:** [Create agents](https://help.zapier.com/hc/en-us/sections/33250012887693-Create-agents)
- **Quickstart / example:** [Build an agent in Zapier Agents](https://help.zapier.com/hc/en-us/articles/24393442652557-Build-an-agent-in-Zapier-Agents)
- **API / SDK reference:** [Zapier MCP](https://docs.zapier.com/mcp/home)
- **Changelog / migration / deprecation:** [docs.zapier.com llms.txt](https://docs.zapier.com/llms.txt) (AI Actions retirement)
- **Limits:** two older help-center category URLs return 404.

**Sources.** [Zapier pricing, read Nov 4, 2026](https://zapier.com/pricing) (verified).

### Make AI Agents (no-code builder)

**Status:** preview · checked 2026-11-04 · Make

**What it is.** Make's visual scenario builder, with an AI agent app, "Make AI Agent (New)," released February 2, 2026. Agents live inside scenarios (automated workflows).

**Building blocks.** In the docs' words: an LLM ("like a brain"), an AI provider, visible reasoning, instructions, knowledge files in the agent's memory, per-run input, files, and tools, which "are modules, scenarios, MCP server tools, and other agents."

**Status, November 4, 2026.** "Available in **open beta**, so product functionality and pricing may change" (help center). The older Manage AI agents pages remain as the previous version.

**Access and cost.** Available "on all plans" using Make's AI Provider; custom AI provider connections on paid plans. Make's pricing page returned 403, so no prices are quoted.

**In this class (adaptation).** "Other agents as tools" gives a director agent that calls persona agents.

**Official documentation.**

- **Official docs:** [Make AI Agents](https://help.make.com/make-ai-agents)
- **Agent loop / architecture:** [Introduction to Make AI Agent (New)](https://help.make.com/introduction-to-make-ai-agent-new)
- **Tools, state, permissions:** [AI agent best practices](https://help.make.com/ai-agent-best-practices)
- **Quickstart / example:** [Introduction to Make AI Agent (New)](https://help.make.com/introduction-to-make-ai-agent-new)
- **API / SDK reference:** [Make Developer Hub](https://developers.make.com/)
- **Changelog / migration / deprecation:** [Manage AI agents](https://help.make.com/manage-ai-agents) (previous version)
- **Limits:** make.com marketing and pricing pages return 403 (Cloudflare); the help center has Markdown twins.

**Sources.** [Introduction to Make AI Agent (New), Make, read Nov 4, 2026](https://help.make.com/introduction-to-make-ai-agent-new.md) (verified).

### Dify (no-code builder)

**Status:** current · checked 2026-11-04 · LangGenius

**What it is.** A platform for building AI applications and agentic workflows, with an open-source self-hosted edition and Dify Cloud. Workflows publish as web apps or APIs.

**Building blocks.** Workflow and Chatflow canvases; nodes including Agent, Question Classifier (router), If-Else, Iteration, Loop, Variable Aggregator, Human Input ("Pause workflows to request human input"), and triggers; knowledge retrieval; plugins for models and tools.

**Status, November 4, 2026.** v1.19.0, released November 4, 2026 (GitHub).

**Access and cost.** Cloud Sandbox is free with 200 message credits; Professional $590 per workspace per year; Team $1,590 per year. The self-hosted Community Edition is free under the "Dify Open Source License" (pricing page, read November 4).

**In this class (adaptation).** Question Classifier plus two Agent nodes plus Human Input gives a routed scene with a human director.

**Official documentation.**

- **Official docs:** [Use Dify](https://docs.dify.ai/en/cloud/use-dify/getting-started/introduction)
- **Agent loop / architecture:** [Agent - Dify Docs](https://docs.dify.ai/en/cloud/use-dify/nodes/agent)
- **Tools, state, permissions:** [Human Input](https://docs.dify.ai/en/cloud/use-dify/nodes/human-input)
- **Quickstart / example:** not opened
- **API / SDK reference:** not opened (OpenAPI spec linked from docs.dify.ai/llms.txt)
- **Changelog / migration / deprecation:** [langgenius/dify releases](https://github.com/langgenius/dify) (GitHub)
- **Limits:** the license isn't standard OSI (GitHub reports NOASSERTION).

**Sources.** [Dify pricing, read Nov 4, 2026](https://dify.ai/pricing) (verified).

### Langflow (no-code builder)

**Status:** current · checked 2026-11-04 · langflow-ai

**What it is.** An open-source (MIT) low-code visual builder for agents and workflows, written in Python. Run it locally with `uv run langflow run`, as Langflow Desktop, or deployed. Every flow is also an API and can be served as an MCP server.

**Building blocks.** Flows made of components; an Agent component with tools; a Playground for testing; flows triggered through the API; an MCP client and server.

**Status, November 4, 2026.** v1.13.1, released November 4, 2026 (GitHub).

**Access and cost.** Free and open source; you pay your model provider.

**In this class (adaptation).** Publish each persona flow as an MCP tool and let a Claude Code director call them.

**Official documentation.**

- **Official docs:** [Use the visual editor](https://docs.langflow.org/concepts-overview)
- **Agent loop / architecture:** [Use Langflow agents](https://docs.langflow.org/agents)
- **Tools, state, permissions:** [Use Langflow agents](https://docs.langflow.org/agents)
- **Quickstart / example:** [Quickstart](https://docs.langflow.org/get-started-quickstart)
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [Langflow release notes](https://docs.langflow.org/release-notes)
- **Limits:** none.

**Sources.** [Langflow llms.txt, read Nov 4, 2026](https://docs.langflow.org/llms.txt) (verified).

### Flowise (no-code builder)

**Status:** retired · checked 2026-11-04 · FlowiseAI

**What it is.** An open-source (Apache 2.0) visual builder ("Build AI Agents, Visually") with Agentflow canvases, once a common no-code front end for LangChain-style agents.

**Building blocks.** Agentflows and chatflows made of nodes, with tools and memory.

**Status, November 4, 2026.** Archived. In "The Future of Flowise," the maintainer wrote that "The typical rigid workflow low-code approach quickly hits the limit when it comes to complexity." Development stopped July 29, 2026; the repository was archived August 13, with npm and Docker packages deprecated; the core team left Discord and GitHub August 31. The last release was `flowise@3.1.4` (July 29).

**Access and cost.** The code stays usable under Apache 2.0; users are told to fork. No successor is named.

**In this class (adaptation).** A case study for the class: the maintainer's reason for closing was that coding agents had overtaken drawn graphs.

**Official documentation.**

- **Official docs:** [Introduction | FlowiseAI](https://docs.flowiseai.com/) (historical)
- **Agent loop / architecture:** not opened
- **Tools, state, permissions:** not opened
- **Quickstart / example:** not opened
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [The Future of Flowise](https://github.com/FlowiseAI/Flowise/discussions/6727)
- **Limits:** historical; the repository is read-only.

**Sources.** [The Future of Flowise, GitHub, read Nov 4, 2026](https://github.com/FlowiseAI/Flowise/discussions/6727) (verified).

### Relevance AI (no-code builder)

**Status:** current · checked 2026-11-04 · Relevance AI

**What it is.** A hosted platform that calls itself "the home of your AI Workforce": agents, tools, and multi-agent Workforces built in a browser. Agents can also be built through MCP from Claude Code.

**Building blocks.** Agents; Tools ("from API calls to LLM prompts to custom code"); Workforces, "a visual canvas where you can design, connect, and m[anage]" agents together; Knowledge (retrieval); Chat; evaluations; Invent, which builds agents from a description.

**Status, November 4, 2026.** "Meet the new Invent" (September 3, 2026) is the latest changelog entry found.

**Access and cost.** No free tier: the Free plan has been retired. Pro is $19/mo annual ($29 monthly) with 2,500 Actions a month; Team $234/mo annual ($349 monthly); Enterprise custom. Vendor Credits pay for models at cost, or you can bring your own keys (pricing docs, read November 4).

**In this class (adaptation).** A Workforce canvas is a drawn ensemble with handoffs between personas.

**Official documentation.**

- **Official docs:** [Introduction](https://relevanceai.com/docs/get-started/introduction)
- **Agent loop / architecture:** [Workforces](https://relevanceai.com/docs/get-started/core-concepts/workforces)
- **Tools, state, permissions:** [Agents](https://relevanceai.com/docs/get-started/core-concepts/agents)
- **Quickstart / example:** [Quick Start](https://relevanceai.com/docs/get-started/quick-start-guide)
- **API / SDK reference:** not opened
- **Changelog / migration / deprecation:** [Changelog](https://relevanceai.com/docs/changelog)
- **Limits:** docs.relevanceai.com redirects to relevanceai.com/docs.

**Sources.** [Relevance AI pricing docs, read Nov 4, 2026](https://relevanceai.com/docs/get-started/pricing.md) (verified).

### Lindy (no-code builder)

**Status:** current · checked 2026-11-04 · Lindy

**What it is.** A hosted "AI teammate" that lives in Slack, email, calendar, and phone. Instead of drawing a graph, you teach it routines and skills.

**Building blocks.** Routines (recurring automation); Skills ("reusable playbooks"); Memory, a "versioned file system"; Watch and Learn (demonstrate a task); Apps and Artifacts it builds; MCP servers; integrations with guardrails.

**Status, November 4, 2026.** Lindy Apps (October 28), booking links (October 16), phone calls (October 14).

**Access and cost.** Free: $50 of credits for 7 days, no card. Team: $49.99/mo for 5,000 credits, with seats sharing one credit pool. Enterprise custom (pricing page, read November 4). The docs instead name Plus, Pro, and Max plans at $0.01 per credit.

**In this class (adaptation).** A persona that lives in a Slack channel and answers on a routine.

**Official documentation.**

- **Official docs:** [What is Lindy?](https://docs.lindy.ai/index)
- **Agent loop / architecture:** [Routines](https://docs.lindy.ai/teammate/routines)
- **Tools, state, permissions:** [Skills](https://docs.lindy.ai/teammate/skills)
- **Quickstart / example:** [Quickstart](https://docs.lindy.ai/start-here/quickstart)
- **API / SDK reference:** none public
- **Changelog / migration / deprecation:** [What's new in Lindy](https://www.lindy.ai/changelog)
- **Limits:** the pricing page and the docs disagree on plan names.

**Sources.** [Lindy pricing, read Nov 4, 2026](https://www.lindy.ai/pricing) (verified); [Lindy pricing docs](https://docs.lindy.ai/pricing.md) (verified).

### Gumloop (no-code builder)

**Status:** current · checked 2026-11-04 · Gumloop

**What it is.** A hosted "AI agent platform": you "Build AI agents that use your tools and data," then automate them "with triggers, schedules, and the API." It also offers Gumball, a personal agent.

**Building blocks.** Agents; Human in the loop ("tool approval settings, app rules, and the Ask Question ability"); skills; Brain (company knowledge); an agent browser with saved logins; a code sandbox and secrets; artifacts and live artifacts; evaluations; Slack.

**Status, November 4, 2026.** Changelog entries dated October 30, 2026.

**Access and cost.** Credits cost $0.005 each and cover model use, tool calls, compute (5 credits a minute), and an 8% orchestration fee. Pro is $37/mo with 20,000 credits; Enterprise is custom; a 14-day Pro trial requires a card (credits docs, read November 4).

**In this class (adaptation).** Tool approval settings make a human-approved director step.

**Official documentation.**

- **Official docs:** [Welcome to Gumloop](https://docs.gumloop.com/index)
- **Agent loop / architecture:** [Agents - Gumloop](https://docs.gumloop.com/core-concepts/agents)
- **Tools, state, permissions:** [Human in the loop](https://docs.gumloop.com/core-concepts/human_in_the_loop)
- **Quickstart / example:** not opened
- **API / SDK reference:** not opened (API reference listed in docs.gumloop.com/llms.txt)
- **Changelog / migration / deprecation:** [Changelog | Gumloop](https://www.gumloop.com/changelog)
- **Limits:** the gumloop.com pricing page rendered no prices; prices come from the credits doc.

**Sources.** [Credits, Gumloop docs, read Nov 4, 2026](https://docs.gumloop.com/core-concepts/credits.md) (verified).

## What could not be verified

Each researcher's list, as reported. The cards mark the same gaps in their **Limits** bullets.

**Products and always-on harnesses.**

- Launch dates for dots (September 29) and ChatGPT Work (July 9): no OpenAI launch post read; openai.com/help.openai.com not retried after note 01's 403s.
- Grok Bot: x.ai/bot and x.ai/changelog/bot returned 403. Note 01's "managers review proposed memory additions" for Team Bots appears only in Unite.AI, not on xAI's Team Bots page.
- Muse: no Meta help center page found; Muse Wonder page not re-opened.
- Gemini: the rename date (around October 12) comes from search results only; Google's October 8 enterprise "Gemini at Work" agent and the November 2025 "Gemini Agent" predecessor were not checked.
- Claude Duet release notes and the Claude Cowork launch date not re-opened.
- Hermes Agent's public launch date (the repository dates to July 22, 2025; note 01 calls the launch date disputed).

**Coding agents, computer use, and no-code builders.**

- OpenAI's retirement of ChatGPT agent mode (early August 2026) and Atlas (August 9, 2026): help.openai.com and chatgpt.com/atlas returned 403, and learn.chatgpt.com doesn't mention them. Press only.
- OpenAI's first-party "Codex agent loop" essay (openai.com, 403). The Codex card uses the App Server and glossary pages instead.
- The SpaceX/SpaceXAI acquisition of Cursor (press only).
- Project Mariner's shutdown date of May 4, 2026: Google's labs page rendered no text. Press only.
- Whether Comet is free today: the FAQ answer wasn't readable.
- Make's prices (make.com returned 403), Gumloop's pricing page (no prices rendered), and Browserbase's tier details (title only).
- Who makes Amp (the site names no company), Antigravity's Pro and Ultra prices, and the ClinePass price.
- Stagehand's current version: the docs say v4, but GitHub's newest tags are 3.7.x.

**Model APIs and cloud platforms.**

- OpenAI's Agents API launch post (openai.com returned 403); the September 10 date comes from OpenAI's developers changelog.
- When Claude Managed Agents launched (the header is dated 2026-04-01; no launch date on the pages read).
- xAI per-call tool prices, and what the `grok-4.20-multi-agent-0309` model does (listed only in the model table).
- Whether Mistral's Agents API has a shutdown date, and the Agents SDK's package name and license.
- The date of the Gemini Interactions API GA post (press says June 2026).
- Foundry Agent Service and Copilot Studio per-unit prices (placeholders or not on the pages read).
- Every Salesforce developer doc (403), including Agent Script and the Agent API.
- Whether the Strands repository was renamed to `harness-sdk`.
- Other enterprise agent platforms (IBM watsonx Orchestrate, ServiceNow, Oracle) were not checked.

**Frameworks and protocols.**

- AutoGen's code license and the exact date Microsoft archived it (README banners dated April 6 and October 16, 2026; GitHub's API does not mark the repo archived).
- Pydantic Logfire and LlamaCloud/LlamaParse prices, Vercel AI Gateway prices, Hugging Face Inference Providers prices (pages not read or numbers not recorded).
- Microsoft Agent Framework's API reference location; the Group Chat and Magentic pages were seen in the table of contents, not opened.
- Strands Agents' AWS provenance and May 2025 open-sourcing come from AWS links on the site and secondary press, not an AWS page; whether subagent K's AWS card already covers Strands.
- AG-UI 1.0's announcement date (npm publish date used); A2A's v1.0 release date (the "What's New in v1.0" page was opened but no date recorded).
- The A2A AAIF and CLI blog posts themselves (seen in the blog list only).
- The x402 Foundation's operational launch on July 14, 2026 (secondary press only); the relation between `coinbase/x402` and `x402-foundation/x402`.
- Adoption figures for the commerce protocols (vendor comparison blogs only).
- Whether any other framework has become "major" in 2026 beyond those listed: a fuller comparison search was not run; Strands was added on the strength of its AWS backing and harness release.
