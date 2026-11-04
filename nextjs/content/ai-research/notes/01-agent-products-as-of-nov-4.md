---
title: "Agent products and frameworks as of November 4, 2026"
description: "A dated check of consumer agents, always-on harnesses, and agent frameworks against the November 1 survey, with what changed since then."
author: claude (research subagent A)
date: 2026-11-04
status: draft; agent research, check before citing
order: 1
---

# Agent products and frameworks as of November 4, 2026

This note re-checks the November 1 survey ("From blackboards to harnesses," `mk-agent-studies/content/orchestration-across-industries/07-…`) against the web on November 4, 2026. The big picture holds: four consumer agents (Grok Bot, Muse, dots, Claude Duet) run on their own cloud computers, wake on a schedule or on their own judgment, and come back to a person for approval, while developer frameworks keep shipping small releases on graph, crew, and handoff metaphors. Three days of news brought no major launches. The changes are small: new Grok Bot "Team Bots" with manager-approved shared memory, Hermes Agent releases on November 2 and 3 that extend cron and Kanban, an OpenClaw beta for durable scheduled work, and routine framework releases. The useful corrections come from first-party pages the November 1 agent could not read. Anthropic's and Meta's own posts on Duet and Muse are now read, and OpenAI's dots documentation was read on learn.chatgpt.com. Meta's own Muse post says Muse checks with the person before sensitive actions, which corrects the survey's note that no per-action approval was mentioned.

Every claim below is marked **(verified: read <source> on Nov 4)** or **(unverified: <why>)**. "Verified" means I read the page today; it does not mean the vendor's claim is true.

## Consumer and always-on agents

### OpenAI dots (September 29, 2026)

Launched at DevDay on September 29, 2026 **(unverified: openai.com and help.openai.com returned 403; date from the survey, NBC and Al Jazeera search results)**. OpenAI's learning site calls a dot "an always-on agent that keeps work moving across your tools and projects" that "lives in the cloud and has its own computer and browser" **(verified: read learn.chatgpt.com/docs/dots on Nov 4)**. Triggers are chat (ChatGPT apps, Slack, Microsoft Teams), calls, recurring check-ins with a time zone and end date, and the dot's own judgment: it "can decide when to pause and wake up to continue work" **(verified: same page)**. It can delegate to ChatGPT Work or Codex **(verified: same page)**.

Where the human sits: Custom Rules give each kind of action one of four behaviors: "Take action without asking," "Take action when you say so," "Ask before taking action," and "Hand off to you." A review step checks account-affecting actions and decides whether the action "can proceed, needs your approval, or includes a step you must do yourself." Pausing a dot "doesn't stop every delegated task or cancel future scheduled runs" **(verified: read learn.chatgpt.com/docs/dots/controls on Nov 4)**. The second behavior's wording differs from the survey's "act if pre-approved" (from DataCamp); the official wording is "Take action when you say so." OpenAI's safety post on dots is still unread **(unverified: 403)**.

Plans: Pro 100, Pro 200, and Pro 500 (outside the EEA, UK, and Switzerland), Business Premium, and Enterprise (off by default) **(verified: learn.chatgpt.com/docs/dots, Nov 4)**. A November 2 X trending post says dots are coming to Plus **(unverified: no OpenAI source found)**.

New since Nov 1: the page now says OpenAI is "expanding the family of frontier models that power dots to include GPT-6.1 Terra." The "What's new" log dates GPT-6.1 Terra and the texting beta (iMessage/RCS, U.S. Pro) to the week of October 26–30 **(verified: read learn.chatgpt.com/docs/whats-new on Nov 4)**. So the model change predates November 1, but the survey did not have it.

### ChatGPT Work (July 9, 2026)

OpenAI's launch post on X: "a new agent in ChatGPT powered by Codex and GPT-5.6. It can take action across your apps and files, stay with a project for hours if needed" **(unverified: seen as a search snippet of x.com/OpenAI; MacRumors dated July 9)**. OpenAI's docs now include a use case titled "Set up a work chief of staff," whose starter prompt begins "Be my chief of staff," asks for an hourly scheduled check, and says to "interrupt me only when a priority, deadline, blocker, decision, or message meaningfully changes." Everything except the check needs sign-off **(verified: read learn.chatgpt.com/use-cases/daily-work-brief on Nov 4)**. Scheduled tasks can also be event-triggered (Gmail, Slack, GitHub) on web and mobile, and "The **Scheduled** view acts as your inbox" **(verified: read learn.chatgpt.com/docs/automations on Nov 4)**. There are four approval modes: "Ask for approval," "Approve for me" (sends eligible requests to automatic review), "Full access," and custom **(verified: read learn.chatgpt.com/docs/permission-modes on Nov 4)**. Nothing new found since Nov 1.

### Grok Bot (SpaceXAI, August 11, 2026)

SpaceXAI's page is unchanged: "Grok Bot is your team of always-on agents," "A chief of staff sits on top, with a specialist for each lane," a Bot that watches a job once saves it as a routine, and Bots "only come back when something needs your approval." Beta for SuperGrok (including Plus and Heavy), Cursor Pro/Pro+/Ultra, and Cursor Teams; Bots have "their own usage, separate from your Grok and Cursor plans." No dollar prices on the page **(verified: read x.ai/news/introducing-grok-bot on Nov 4)**. The changelog at x.ai/changelog/bot refused the request **(unverified: 403)**.

New since Nov 1: on November 2, xAI introduced **Data Bot**, a "Team Bot" for warehouse queries, where "Team Bot managers review proposed memory additions" before shared memory reaches every user **(verified: read Unite.AI on Nov 4; secondary)**. A Teslanorth roundup dated November 2 lists nine upgrades including shopping, checkout, and Team Bot sharing **(unverified: search snippet only)**. Fortune (November 3) reports Grok Bot reached 800,000 paid weekly users in early October and that Musk wrote the cost of serving it "was unsustainably high relative to revenue" **(verified: read Fortune on Nov 4)**.

### Meta Muse (September 8, 2026)

Meta's own post is now read: published September 8, updated September 30, 2026. "Muse is a personal AI agent. It doesn't just answer questions, it actually does the work." It "runs on Muse Secure VM, a dedicated secure computer with its own browser," keeps working after the app is closed, and returns when something changes or it needs approval. "Nothing Muse does reaches the internet unless the Sentinel approves it," and Muse "checks with the person before sensitive actions like sending an email or making a purchase." Free for most use, with subscriptions **(verified: read about.fb.com/news/2026/09/introducing-muse-personal-ai-agent on Nov 4)**. On October 12 Meta announced the Muse Wonder models, which "will soon power experiences in Muse" **(verified: read about.fb.com on Nov 4)**. Fortune puts Muse at about 10 million users **(verified: Fortune, Nov 3)**. Nothing new found since Nov 1; an October 31 report of a humanoid Muse is an X rumor **(unverified)**.

### Anthropic Claude Duet (October 21, 2026)

Anthropic's release notes date the research preview to October 21, 2026 **(verified: read support.claude.com release notes on Nov 4)**. Anthropic's announcement: Duet is a proactive agent in its own app for professionals and small business owners; it sends a morning brief, "checks connected accounts every few hours and messages you only when something needs attention," and "comes to you first" in one ongoing thread. Before it sends a message, pays, signs, or deletes, it "shows you exactly what it's about to do and waits for your approval"; trading securities and moving money between accounts are off-limits even with approval. It reaches 6,000+ connectors, is designed around Claude Opus 5.5, and the closest metaphor on the page is "a partner you can trust" **(verified: read claude.com/resources/articles/claude-duet on Nov 4)**. The help center adds that it "checks your accounts at set intervals," that if you can't respond it finishes the rest of the task and brings the approval back later, and that only you can mark a task complete **(verified: read support.claude.com "Get started with Claude Duet" on Nov 4)**.

Corrections to the survey: the plans are Pro, Max, **and Ultra** (U.S., waitlist), and the date is October 21 (TechCrunch's article is October 22). A search snippet said the release notes name "Claude Opus 5"; the page I read did not name a model, and the help center says Opus 5.5 **(verified)**.

### OpenClaw (open source; first release November 24, 2025)

The heartbeat page, re-read today, matches the survey: "Heartbeat monitoring now uses ordinary automation jobs"; setup creates one "Proactive check" job that "runs every 30 minutes unless the provider supplies a different initial cadence"; after `openclaw doctor --fix`, the runtime does not "read `HEARTBEAT.md`"; and "Return `NO_REPLY` when a check has no visible update." New detail: a `record_result` action logs an outcome without sending a message **(verified: read docs.openclaw.ai/gateway/heartbeat on Nov 4)**. Correction: the automation overview no longer mentions `HEARTBEAT.md`, so the inconsistency the survey saw in a search snippet is gone. It calls Automations "OpenClaw's built-in scheduler for all recurring and one-shot" work and describes **standing orders**, which "live in workspace files (typically `AGENTS.md`) and are injected into every session" **(verified: read docs.openclaw.ai/automation on Nov 4)**.

New since Nov 1: release 2026.10.10 (marked Latest) on November 3, and pre-release 2026.11.5-beta.1 on November 4, which adds "persistent streams and richer execution context for durable scheduled work" **(verified: read github.com/openclaw/openclaw/releases on Nov 4)**. A November 2 weekly roundup calls the late-October releases operational hardening, not features **(verified: read bighatgroup.com on Nov 4; secondary)**.

### Nous Research Hermes Agent (2026; launch date disputed)

The README still says "the self-improving AI agent," with a built-in cron scheduler, agent-curated memory, self-improving skills on the agentskills.io standard, one gateway for Telegram, Discord, Slack, WhatsApp, Signal, and CLI, and isolated subagents **(verified: read github.com/NousResearch/hermes-agent on Nov 4)**. Kanban arrived in v0.12.0, which Nous announced on May 3, 2026: "Agents claim tasks from a board, work in parallel, and hand off when blocked" **(unverified: Nous's X post seen as a search snippet)**.

New since Nov 1: **v0.22.6 (November 2)** adds `hermes cron cancel`, a per-job missed-run policy, and a Stop button in the cron editor; **v0.22.7 (November 3)** adds pinned Kanban boards and lets cron jobs post into Group Chats **(verified: read GitHub releases on Nov 4)**. The New Stack article on OpenClaw and Hermes still did not render **(unverified: body absent)**.

## Frameworks and builders

**OpenAI Agent Builder / AgentKit.** The deprecations entry dated June 3, 2026 stands: "Agent Builder is scheduled to shut down" on November 30, 2026, "ChatKit remains available," and developers should "continue with the Agents SDK or ChatGPT Workspace Agents." The Evals platform became read-only on October 31 and shuts down November 30. The Assistants API was removed August 26, 2026. There is no entry named AgentKit **(verified: read developers.openai.com/api/docs/deprecations on Nov 4)**. Related: custom GPTs retire December 11, 2026 **(unverified: TechRepublic and others in search; OpenAI's FAQ returned 403)**, and Workspace Agents have been generally available since May 2026 **(unverified: release notes seen only as a search snippet)**.

**OpenAI Agents SDK.** "Handoffs allow an agent to delegate tasks to another agent" **(verified: read the SDK's handoffs doc on Nov 4)**. Latest stable Python release v0.24.0 (October 15). A pre-release, v0.24.0-alpha.6 (November 3), adds resuming pending manual-tool requests from checkpoints and "native child approvals and form requests" **(verified: read GitHub releases on Nov 4)**.

**LangGraph.** The graph metaphor and human approval hold: "Interrupts allow you to pause graph execution at specific points and wait for external input," and you resume with `Command(resume=...)` on the same thread ID **(verified: read LangGraph interrupts docs on Nov 4)**. Latest: langgraph 1.2.19 (October 30) and langgraph-sdk 0.4.12 (November 3), both maintenance releases **(verified: GitHub releases, Nov 4)**.

**CrewAI.** Agents still need `role` ("the agent's function and expertise within the crew"), `goal`, and `backstory` ("context and personality to the agent") **(verified: read docs.crewai.com on Nov 4)**. New since Nov 1: 1.15.34 (November 1) adds `crewai skill search` and removes the 1.15.29 agent executor; 1.15.35 (November 3) is docs only **(verified: GitHub releases, Nov 4)**.

**Google ADK and A2A.** ADK for Python is now on **2.x**: v2.13.0 (October 23) adds a `ClassifierNode` for routing workflows, and v2.12.0 (October 13) adds `require_confirmation` for workflow nodes **(verified: read google/adk-python releases on Nov 4)**. The A2A site still says "MCP is for agent-to-tool communication" and "A2A is for agent-to-agent communication," and links posts saying A2A joined the Agentic AI Foundation (August 27, 2026) and introducing an A2A CLI (October 1, 2026) **(verified: read a2a-protocol.org on Nov 4; the posts themselves unread)**.

**Microsoft Agent Framework.** python-1.24.0 and dotnet-1.27.0 shipped October 30; the Python release adds "an explicit default approval mode for local MCP tools" and the .NET release "preserves pending Magentic plan review" **(verified: read github.com/microsoft/agent-framework/releases on Nov 4)**. Nothing new since Nov 1.

**n8n.** n8n 3.0 shipped October 27 with breaking changes; its agent builder gained a Test agent button, and Slack agents can now reply only when mentioned **(verified: read docs.n8n.io release notes on Nov 4)**. A goal-driven "n8n Agents" feature entered preview on September 25 **(unverified: community posts and blogs in search)**.

**Claude Code subagents and skills.** The docs still define subagents as running "in its own context window with a custom system prompt, specific tool access, and independent permissions," with nesting "up to three layers below the main conversation" and a default concurrency cap of 20 **(verified: read code.claude.com/docs/en/sub-agents on Nov 4)**. New since Nov 1: v2.1.316 (October 31) adds `CLAUDE_CODE_SUBAGENT_EFFORT`; v2.1.317 (November 3) makes `/schedule` warn when a cloud scheduled task gets connectors you did not ask for; v2.1.318 (November 4) moves long shell commands in background subagents to the background after 3 minutes **(verified: read the Claude Code changelog on Nov 4)**.

**MCP.** The current spec is dated 2026-07-28. It describes "Stateless, self-contained requests" and optional extensions, including **Tasks** ("Asynchronous execution of long-running operations, with polling, mid-flight input, and durable handles"), **Skills over MCP**, and **MCP Apps** **(verified: read modelcontextprotocol.io/specification/latest on Nov 4)**. No change since Nov 1 found.

## Comparison

| product | maker | launched | trigger | where the human sits | metaphor | status Nov 4 |
| --- | --- | --- | --- | --- | --- | --- |
| dots | OpenAI | Sep 29, 2026 | chat, call, text; schedules; self-wake | four-level Custom Rules; review step; approves | always-on agent | rolling out to Pro, Business Premium, Enterprise; GPT-6.1 Terra added (late Oct) |
| ChatGPT Work | OpenAI | Jul 9, 2026 | human; schedules; events (Gmail, Slack, GitHub) | approval modes; drafts held for sign-off | "chief of staff" (use case) | live; no change since Nov 1 found |
| Grok Bot | SpaceXAI | Aug 11, 2026 (beta) | human; learned routines | approves when a Bot returns; managers approve shared memory | team with a chief of staff | beta; Data Bot / Team Bots Nov 2 |
| Muse | Meta | Sep 8, 2026 | human; works on after app closes | Sentinel gates network; asks before sensitive actions | personal agent on its own VM | live in US; nothing new since Nov 1 found |
| Claude Duet | Anthropic | Oct 21, 2026 (preview) | morning brief; checks at intervals; human | approves send, pay, sign, delete; some actions barred | proactive agent; "partner" | waitlist, US Pro/Max/Ultra |
| OpenClaw | OpenClaw Foundation | Nov 24, 2025 | automation jobs (30-min Proactive check); messages | standing orders; quiet `NO_REPLY` | gateway plus scheduler | 2026.10.10 (Nov 3); 2026.11.5-beta.1 (Nov 4) |
| Hermes Agent | Nous Research | 2026 (disputed) | cron; messages via gateway | reviews Kanban board; unblocks | self-improving agent; Kanban | v0.22.7 (Nov 3) |
| Agent Builder | OpenAI | Oct 2025 | human | drags nodes on a canvas | visual canvas | shuts down Nov 30, 2026 |
| Agents SDK | OpenAI | Mar 2025 | code | approvals in code | handoff | v0.24.0; alpha.6 Nov 3 |
| LangGraph | LangChain | Jan 2024 | code | interrupts and resume | graph / state machine | 1.2.19 (Oct 30) |
| CrewAI | CrewAI | Dec 2023 | code; Flows | casts roles | crew of roles | 1.15.35 (Nov 3) |
| ADK / A2A | Google; A2A in Agentic AI Foundation | Apr 2025 | code | `require_confirmation` nodes | hierarchy plus workflow agents | ADK 2.13.0 (Oct 23) |
| Agent Framework | Microsoft | Oct 2025 preview | code | tool approval policies | workflows; Magentic planner | python-1.24.0 (Oct 30) |
| n8n | n8n | 2019 | triggers in a node graph | draws the graph; instance policies | node graph | 3.0 (Oct 27) |
| Claude Code | Anthropic | Feb 2025 | human; `/schedule` cloud tasks | permissions at the terminal | harness; subagents; skills | 2.1.318 (Nov 4) |
| MCP | Agentic AI Foundation | Nov 2024 | n/a (protocol) | host must get consent before tool use | plug and socket | spec 2026-07-28 |

## What changed since Nov 1

- **Grok Bot added Team Bots** (Data Bot, November 2), with managers approving what goes into shared memory. This is a new place for a human: editor of the team's memory, not approver of each action.
- **Hermes Agent v0.22.6 and v0.22.7** (November 2–3): cron cancel, missed-run policy, pinned Kanban boards, cron posting into group chats.
- **OpenClaw** shipped 2026.10.10 (November 3) and a beta (November 4) for durable scheduled work. Its docs no longer mention `HEARTBEAT.md` outside the migration page.
- **Claude Code** 2.1.317 and 2.1.318; **CrewAI** 1.15.34 and 1.15.35; **LangGraph SDK** 0.4.12; **Agents SDK** pre-release alpha.6. All are incremental.
- **Corrections to the survey from first-party pages:** Muse asks before sensitive actions (Meta's post); Duet includes Ultra plans and dates to October 21; dots' second rule is "Take action when you say so"; dots now run on GPT-6.1 Terra as well (late October); ADK is on 2.x; A2A joined the Agentic AI Foundation in August 2026; the MCP spec is dated 2026-07-28.

## What I could not verify

- OpenAI's dots safety post, "Introducing dots," the dots help center, and the custom-GPT retirement FAQ: openai.com and help.openai.com returned 403. I used learn.chatgpt.com (OpenAI's) instead.
- Whether dots are coming to Plus (an X trending post only).
- The Grok Bot changelog (403) and the Teslanorth list of nine upgrades (snippet only).
- The New Stack article on OpenClaw and Hermes: the body still does not render, and searching for its headline found only other comparisons.
- Hermes Agent's launch date and the v0.12.0 Kanban announcement (X post via search).
- Workspace Agents' GA date and the end of "ChatGPT agent" (search snippets of OpenAI release notes).
- n8n Agents' preview date (community posts).
- ChatGPT Work's launch post (X snippet; secondary press agrees on July 9).
- Whether Anthropic's release notes name Opus 5 or 5.5 (a snippet said 5; the page I read named no model).

## Sources

- [OpenAI, Meet dots (learn.chatgpt.com)](https://learn.chatgpt.com/docs/dots)
- [OpenAI, Control your dot](https://learn.chatgpt.com/docs/dots/controls)
- [OpenAI, What's new](https://learn.chatgpt.com/docs/whats-new)
- [OpenAI, Scheduled tasks](https://learn.chatgpt.com/docs/automations)
- [OpenAI, Permissions](https://learn.chatgpt.com/docs/permission-modes)
- [OpenAI, Set up a work chief of staff](https://learn.chatgpt.com/use-cases/daily-work-brief)
- [OpenAI, Deprecations](https://developers.openai.com/api/docs/deprecations)
- [OpenAI, How we build safety into dots (403)](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/)
- [OpenAI Agents SDK, Handoffs](https://openai.github.io/openai-agents-python/handoffs/)
- [OpenAI Agents SDK releases](https://github.com/openai/openai-agents-python/releases)
- [SpaceXAI, Introducing Grok Bot](https://x.ai/news/introducing-grok-bot)
- [Unite.AI, Data Bot (Nov 2, 2026)](https://www.unite.ai/xai-introduces-data-bot-to-bring-shared-analytics-skills-to-grok-bot/)
- [Fortune, Grok Bot costs (Nov 3, 2026)](https://fortune.com/2026/11/03/grok-bot-is-growing-fast-but-elon-musk-says-its-costs-are-unsustainably-high-compared-to-revenue/)
- [Teslanorth, Grok Bot upgrades (snippet only)](https://teslanorth.com/2026/11/02/grok-bot-9-upgrades-shopping/)
- [Meta, Introducing Muse](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)
- [Meta, Introducing Muse Wonder](https://about.fb.com/news/2026/10/introducing-muse-wonder-models/)
- [Anthropic, Introducing Claude Duet](https://claude.com/resources/articles/claude-duet)
- [Anthropic, Get started with Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)
- [Anthropic, Claude release notes](https://support.claude.com/en/articles/12138966-release-notes)
- [TechCrunch, Claude Duet (Oct 22, 2026)](https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/)
- [OpenClaw docs, Heartbeat](https://docs.openclaw.ai/gateway/heartbeat)
- [OpenClaw docs, Automation](https://docs.openclaw.ai/automation)
- [OpenClaw releases](https://github.com/openclaw/openclaw/releases)
- [Big Hat Group, OpenClaw weekly (Nov 2, 2026)](https://www.bighatgroup.com/blog/openclaw-weekly-2026-11-02/)
- [Hermes Agent README](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent releases](https://github.com/NousResearch/hermes-agent/releases)
- [Nous Research on Kanban (X, snippet only)](https://x.com/NousResearch/status/2050997692977844324)
- [The New Stack, OpenClaw and Hermes (body not rendered)](https://thenewstack.io/openclaw-hermes-agent-harness/)
- [LangGraph, Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [LangGraph releases](https://github.com/langchain-ai/langgraph/releases)
- [LangChain, Introducing ambient agents](https://www.langchain.com/blog/introducing-ambient-agents)
- [CrewAI docs, Agents](https://docs.crewai.com/en/concepts/agents)
- [CrewAI releases](https://github.com/crewAIInc/crewAI/releases)
- [Google ADK Python releases](https://github.com/google/adk-python/releases)
- [A2A protocol](https://a2a-protocol.org/latest/)
- [Microsoft Agent Framework releases](https://github.com/microsoft/agent-framework/releases)
- [n8n release notes](https://docs.n8n.io/release-notes/)
- [Claude Code docs, Subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code changelog](https://code.claude.com/docs/en/changelog)
- [MCP specification](https://modelcontextprotocol.io/specification/latest)

## Glossary candidates

### Always-on agent
**In AI engineering.** An agent that keeps running after the conversation ends, on its own cloud computer, and continues work or checks in without being asked. Grok Bot is "your team of always-on agents"; a dot is "an always-on agent."
**In human practice.** A staff member on retainer who keeps working when the boss leaves the room.
**In the theater of agents.** The ensemble's stage manager stays awake between scenes and decides when to call the actors back.
**Sources.** [SpaceXAI, Grok Bot](https://x.ai/news/introducing-grok-bot) (verified Nov 4); [OpenAI, Meet dots](https://learn.chatgpt.com/docs/dots) (verified Nov 4)

### Proactive agent
**In AI engineering.** An agent that comes to you first with what needs attention, rather than waiting for a prompt. Claude Duet sends a morning brief and checks accounts at intervals; OpenClaw's first job is a "Proactive check."
**In human practice.** The assistant who says "you'll want to see this" before you ask.
**In the theater of agents.** An observer character who interrupts the scene only when something in the plot has changed.
**Sources.** [Anthropic, Introducing Claude Duet](https://claude.com/resources/articles/claude-duet) (verified Nov 4); [OpenClaw, Heartbeat](https://docs.openclaw.ai/gateway/heartbeat) (verified Nov 4)

### Ambient agent
**In AI engineering.** LangChain's term (Harrison Chase, January 14, 2025): "Ambient agents listen to an event stream and act on it accordingly, potentially acting on multiple events at a time." They are triggered by events, not by chat.
**In human practice.** None in particular.
**In the theater of agents.** A character who reacts to every message posted in the cast's group chat, without being addressed.
**Sources.** [LangChain, Introducing ambient agents](https://www.langchain.com/blog/introducing-ambient-agents) (verified Nov 4)

### Custom rules (approval policy)
**In AI engineering.** Per-action settings for how much an agent may do alone. OpenAI's dots offer four: "Take action without asking," "Take action when you say so," "Ask before taking action," and "Hand off to you." ChatGPT Work's approval modes and Microsoft Agent Framework's tool approval policies are the same idea.
**In human practice.** A delegation-of-authority policy: what a staffer may sign without the manager.
**In the theater of agents.** The producer hands each character a card saying which moves they may make alone and which need the director's nod.
**Sources.** [OpenAI, Control your dot](https://learn.chatgpt.com/docs/dots/controls) (verified Nov 4); [OpenAI, Permissions](https://learn.chatgpt.com/docs/permission-modes) (verified Nov 4)

### Gateway
**In AI engineering.** The process that connects an agent to the channels people already use (Telegram, Slack, WhatsApp, Signal, CLI) and routes messages in and out. Hermes Agent runs one gateway process for all of them; OpenClaw is organized around its gateway.
**In human practice.** A switchboard or front desk.
**In the theater of agents.** The single doorway through which audience notes reach the cast.
**Sources.** [Hermes Agent README](https://github.com/NousResearch/hermes-agent) (verified Nov 4); [OpenClaw, Heartbeat](https://docs.openclaw.ai/gateway/heartbeat) (verified Nov 4)

### Automation job
**In AI engineering.** A scheduled or one-shot task with its own schedule, prompt, context, and delivery settings. OpenClaw replaced its heartbeat file with these, and a job with nothing to report returns `NO_REPLY`.
**In human practice.** A standing calendar reminder with a checklist attached.
**In the theater of agents.** Every thirty minutes a stagehand checks the set and stays silent unless something is broken.
**Sources.** [OpenClaw, Automation](https://docs.openclaw.ai/automation) (verified Nov 4); [OpenClaw, Heartbeat](https://docs.openclaw.ai/gateway/heartbeat) (verified Nov 4)

### Standing orders
**In AI engineering.** Ongoing authority given to an agent for defined programs, written in workspace files (typically `AGENTS.md`) and injected into every session (OpenClaw's term).
**In human practice.** Standing orders in the military or in a hospital: instructions that hold until revoked.
**In the theater of agents.** A director's note pinned backstage that every character reads before each entrance.
**Sources.** [OpenClaw, Automation](https://docs.openclaw.ai/automation) (verified Nov 4)

### Chief of staff agent
**In AI engineering.** A coordinating agent that oversees specialists and reports to the person. Grok Bot puts "a chief of staff" on top "with a specialist for each lane"; OpenAI's ChatGPT Work use case opens "Be my chief of staff."
**In human practice.** The aide who manages an executive's priorities and decides what reaches the desk.
**In the theater of agents.** The producer character who assigns scenes to the cast and brings only decisions to the showrunner.
**Sources.** [SpaceXAI, Grok Bot](https://x.ai/news/introducing-grok-bot) (verified Nov 4); [OpenAI, Set up a work chief of staff](https://learn.chatgpt.com/use-cases/daily-work-brief) (verified Nov 4)

### Handoff
**In AI engineering.** Passing the conversation or task from one agent to another; in the OpenAI Agents SDK, "Handoffs allow an agent to delegate tasks to another agent." Hermes's Kanban agents "hand off when blocked."
**In human practice.** A shift change or a warm transfer between departments.
**In the theater of agents.** One character exits mid-line and another enters to finish the scene.
**Sources.** [OpenAI Agents SDK, Handoffs](https://openai.github.io/openai-agents-python/handoffs/) (verified Nov 4); [Nous Research on X](https://x.com/NousResearch/status/2050997692977844324) (unverified)

### Interrupt (human-in-the-loop pause)
**In AI engineering.** A point where a running graph stops and waits for human input, saving its state so it can resume. In LangGraph, "Interrupts allow you to pause graph execution at specific points and wait for external input," resumed with `Command(resume=...)`.
**In human practice.** A sign-off gate in a production pipeline.
**In the theater of agents.** The show freezes mid-scene while the audience votes, then picks up exactly where it stopped.
**Sources.** [LangGraph, Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) (verified Nov 4)
