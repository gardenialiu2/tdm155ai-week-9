---
title: "Agent APIs and SDKs over time: a dated history with three migration cases"
description: "When the agent layers of OpenAI, Anthropic, Google, and Microsoft launched, were deprecated, removed, or renamed, and what each migration moved: the loop, the state, the routing, the approval."
author: claude (research subagent O)
date: 2026-11-04
status: "draft; agent research, check before citing"
order: 2
---

# Agent APIs and SDKs over time

From June 2023 to November 2026 the agent loop moved three times. Function calling (2023) left the loop in the developer's code. OpenAI's Assistants API (November 2023) moved the loop and the conversation state onto OpenAI's servers as threads and runs. The Responses API and Agents SDK (March 2025) moved orchestration back into the developer's application while keeping optional server-side state, and the Assistants API was removed on August 26, 2026. In parallel, Anthropic turned the Claude Code harness into a general SDK (renamed September 2025) and then offered it as a hosted runtime (Claude Managed Agents, April 2026); OpenAI did the same with a managed Codex harness (the Agents API, September 2026). This file dates those moves from official pages opened on November 4, 2026 and works through three migrations. The general history of orchestration is in essay 07; the current product survey is in `notes/01-agent-products-as-of-nov-4.md`, and this file does not repeat either.

## Timeline

Dates are the vendor's own. Where a vendor page and its heading disagree, the row says so.

| Date | Vendor | Event | Layer | Kind | Source |
|---|---|---|---|---|---|
| 2023-06-13 | OpenAI | Function calling in Chat Completions (`gpt-4-0613`, `gpt-3.5-turbo-0613`) | API | launch | [blog, Wayback copy](https://web.archive.org/web/20230621010946/https://openai.com/blog/function-calling-and-other-api-updates) |
| 2023-11-06 | OpenAI | Assistants API beta (threads, runs; Code Interpreter, Retrieval, functions); `functions` parameter deprecated in favor of `tools` | API, hosted runtime | launch | [DevDay post, Wayback copy](https://web.archive.org/web/20231111010633/https://openai.com/blog/new-models-and-developer-products-announced-at-devday); [changelog](https://developers.openai.com/api/docs/changelog) |
| 2023-12-13 | Google | Gemini Pro in the Gemini API, with function calling | API | launch | [Google blog](https://blog.google/innovation-and-ai/products/gemini-api-developers-cloud/) |
| 2024-04-17 | OpenAI | Assistants v2 beta: file search tool (up to 10,000 files per assistant), token controls, tool choice | API | replaced (v1 → v2) | [changelog](https://developers.openai.com/api/docs/changelog) |
| 2024-05-30 | Anthropic | Tool use generally available on the Messages API | API | launch (GA) | [announcement](https://claude.com/resources/articles/tool-use-ga); [release notes](https://platform.claude.com/docs/en/release-notes/overview) |
| 2024-10-22 | Anthropic | Computer use, public beta, with upgraded Claude 3.5 Sonnet | API | launch | [announcement](https://www.anthropic.com/news/3-5-models-and-computer-use) |
| 2024-11-25 | Anthropic | Model Context Protocol open-sourced | protocol | launch | [announcement](https://www.anthropic.com/news/model-context-protocol) |
| 2024-12-18 | OpenAI | Assistants v1 beta access shut off | API | removed | [deprecations](https://developers.openai.com/api/docs/deprecations) |
| 2024-12-19 | Anthropic | "Building effective agents" (Schluntz, Zhang) | paper (engineering essay) | launch | [essay](https://www.anthropic.com/research/building-effective-agents) |
| 2025-02-24 | Anthropic | Claude Code, "limited research preview," with Claude 3.7 Sonnet | consumer app (CLI harness) | launch | [announcement](https://www.anthropic.com/news/claude-3-7-sonnet) |
| 2025-03-11 | OpenAI | Responses API, built-in tools, Agents SDK; plan announced to bring Assistants features to Responses and sunset Assistants in 2026 | API, SDK | launch; deprecation foreshadowed | [changelog](https://developers.openai.com/api/docs/changelog); [post, Wayback copy](https://web.archive.org/web/20250316154038/https://openai.com/index/new-tools-for-building-agents/) |
| 2025-04-09 | Google | Agent Development Kit (ADK), open source, at Cloud NEXT | SDK | launch | [Google Developers Blog](https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/) |
| 2025-04-09 | Google | Agent2Agent (A2A) protocol | protocol | launch | [Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) |
| 2025-05-22 | Anthropic | Claude Code generally available; "Claude Code SDK" named for background use | consumer app, SDK | launch | [Claude 4 announcement](https://www.anthropic.com/news/claude-4) |
| 2025-06-23 | Linux Foundation | A2A becomes a Linux Foundation project | protocol | moved to foundation | [LF press release](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents) |
| 2025-08-20 | OpenAI | Conversations API released, with an Assistants migration guide | API | launch | [changelog](https://developers.openai.com/api/docs/changelog) |
| 2025-08-26 | OpenAI | Assistants deprecation announced; removal set for 2026-08-26 (entry heading reads 2025-08-20) | API | deprecation announced | [deprecations](https://developers.openai.com/api/docs/deprecations) |
| 2025-09-29 | Anthropic | Claude Code SDK renamed Claude Agent SDK | SDK | renamed | [article](https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk); [migration guide](https://code.claude.com/docs/en/agent-sdk/migration-guide) |
| 2025-10-01 | Microsoft | Microsoft Agent Framework public preview, converging AutoGen and Semantic Kernel | SDK | replaced | [Azure blog](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/) |
| 2025-10-06 | OpenAI | Agent Builder (visual canvas) and ChatKit launched | hosted runtime, UI | launch | [changelog](https://developers.openai.com/api/docs/changelog) |
| 2025-10-16 | Anthropic | Agent Skills (`skills-2025-10-02` beta); open standard added 2025-12-18 | API, consumer app | launch | [announcement](https://claude.com/resources/articles/skills); [release notes](https://platform.claude.com/docs/en/release-notes/overview) |
| 2025-12-09 | Anthropic | MCP donated to the Agentic AI Foundation (Linux Foundation directed fund) | protocol | moved to foundation | [announcement](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) |
| 2026-04-02 | Microsoft | Agent Framework `python-1.0.0` and `dotnet-1.0.0` published | SDK | launch (1.0) | [GitHub releases](https://github.com/microsoft/agent-framework/releases) |
| 2026-04-08 | Anthropic | Claude Managed Agents, beta: hosted agent harness | hosted runtime | launch | [release notes](https://platform.claude.com/docs/en/release-notes/overview); [overview](https://platform.claude.com/docs/en/managed-agents/overview) |
| 2026-06-03 | OpenAI | Deprecation announced for Agent Builder, reusable prompt objects (`v1/prompts`), and the Evals platform; all shut down 2026-11-30 | hosted runtime, API | deprecation announced | [deprecations](https://developers.openai.com/api/docs/deprecations) |
| 2026-08-19 | Anthropic | Agent Skills and the Skills API out of beta | API | launch (GA) | [release notes](https://platform.claude.com/docs/en/release-notes/overview) |
| 2026-08-26 | OpenAI | Assistants API shut down | API | removed | [changelog](https://developers.openai.com/api/docs/changelog); [deprecations](https://developers.openai.com/api/docs/deprecations) |
| 2026-08-27 | A2A project | A2A accepted into the Agentic AI Foundation | protocol | moved to foundation | [A2A blog](https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/) |
| 2026-09-10 | OpenAI | Agents API public beta: "a managed Codex harness" | hosted runtime | launch | [changelog](https://developers.openai.com/api/docs/changelog); [agents guide](https://developers.openai.com/api/docs/guides/agents) |
| 2026-11-30 | OpenAI | Agent Builder, `v1/prompts`, Evals scheduled to shut down | hosted runtime, API | removed (scheduled) | [deprecations](https://developers.openai.com/api/docs/deprecations) |

All rows: (verified: opened the linked page Nov 4). The three openai.com posts returned 403 to direct requests on Nov 4, so those rows rest on Internet Archive copies of OpenAI's own pages, which are historical snapshots and not the current URLs. "AgentKit" as a name: the October 6, 2025 changelog entry names Agent Builder and ChatKit, not AgentKit; "AgentKit" appears in a May 2026 changelog entry as a product that can use Secure MCP Tunnel (verified: changelog Nov 4). OpenAI's AgentKit announcement returned 403 (unverified: launch wording).

## Migration case: OpenAI's Assistants API → Responses and Conversations

### The old objects and control flow

The DevDay post of November 6, 2023 called the Assistants API "our first step towards helping developers build agent-like experiences within their own applications" and named its key change: "persistent and infinitely long threads, which allow developers to hand off thread state management to OpenAI and work around context window constraints. With the Assistants API, you simply add each new message to an existing thread." (verified: opened [the Wayback copy](https://web.archive.org/web/20231111010633/https://openai.com/blog/new-models-and-developer-products-announced-at-devday) Nov 4; the live page returned 403.) The original platform docs at `platform.openai.com/docs/assistants/...` are gone: the current-site equivalents return 404 and the Wayback copy of "How it works" is a JavaScript shell without its text (unverified: the original reference text). The best surviving official walkthrough is OpenAI's cookbook notebook, a later revision that mentions `gpt-4o` and Python SDK 1.59.4, so it describes Assistants v2, not the November 2023 launch (verified: opened [the notebook](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Assistants_API_overview_python.ipynb) Nov 4).

The objects, as the cookbook and the current migration guide describe them:

- **Assistant**: a persistent API object that "bundled model choice, instructions, and tool declarations" (migration guide), plus files.
- **Thread**: "a collection of messages stored server-side," which "could _only_ store messages" (migration guide). Threads existed independently of assistants (cookbook).
- **Message**: an entry in a thread, listed newest first.
- **Run**: the execution of an assistant on a thread. "Creating a Run is an asynchronous operation": it returned at once with `status: queued`, and the developer polled until it finished (cookbook). The migration guide's own code shows the loop: `while run.status in ("queued", "in_progress"): time.sleep(1)`.
- **Run step**: "A Run is composed of one or more Steps," each with a status, for showing progress (cookbook).
- **Tools**: Code Interpreter and Retrieval (file search from v2) ran on OpenAI's side "in the background"; for custom functions the run stopped at `requires_action`, and "You are then responsible for calling the Function, and providing the output back to the Assistant" (cookbook).

So the loop ran on OpenAI's server. The developer's code started it, polled it, answered it when it paused for a function, and read the thread afterward.

### What replaced them

The migration guide gives the mapping in a table titled "What's changed?": Assistants → **Prompts**, "easier to version and update"; Threads → **Conversations**, "Streams of items instead of just messages"; Runs → **Responses**, which "send input items or use a conversation object and receive output items; tool call loops are explicitly managed"; Run steps → **Items**, "Generalized objects—can be messages, tool calls, outputs, and more" (verified: opened [Assistants migration guide](https://developers.openai.com/api/docs/assistants/migration) Nov 4). A Response is synchronous: "provide a set of input items to execute, and get a list of output items back," and "Responses are designed to be used alone." The guide does not map vector stores.

State becomes a choice. The Responses guide lists three routes: manage history yourself, "Use `previous_response_id` when you want OpenAI to manage prior response context," or "Use the Conversations API when you need a persistent conversation object" (verified: opened [Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses) Nov 4). The guide adds that previous input tokens in a chain "are billed as input tokens."

Orchestration moves to the application. Under "Separation of concerns" the migration guide says: "Your application code now handles orchestration (history pruning, tool loop, retries) while your prompt focuses on high-level behavior and constraints."

### Ergonomic and architectural changes

Ergonomic: synchronous calls instead of polling; one request instead of create-message, create-run, poll, list-messages; typed items and typed streaming events. Architectural: the run, a server-side process with its own lifecycle, is gone; a single Responses call can now chain several hosted tools ("An agentic loop by default ... within the span of one API request"), but the loop across your own functions, and history pruning and retries, belong to your code or to the Agents SDK runner. State moves from mandatory (threads) to optional (`store`, `previous_response_id`, Conversations, or your database).

### Chronology: the recommended replacement was itself deprecated

The migration guide's first step is "Create prompts from your assistants" in the dashboard. That replacement did not last. On June 3, 2026, before the Assistants removal date, OpenAI announced that "reusable prompt objects are being deprecated"; `v1/prompts` shuts down November 30, 2026, and the advice is now to "move reusable prompt content into your application code" (verified: opened [deprecations](https://developers.openai.com/api/docs/deprecations) and [Migrate from prompt objects](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object) Nov 4). The guide now carries its own warning: "Reusable prompt objects are also being deprecated." It also notes that "The Assistants API call that retrieves thread messages no longer works; use your stored messages instead," so a developer who did not export threads before August 26 cannot. Read the current guide as a document edited after the sunset, not as the August 2025 original.

### Dated record

| Date | Event | Source | What changed in control flow, state, or tools |
|---|---|---|---|
| 2023-11-06 | Assistants API beta | [DevDay, Wayback](https://web.archive.org/web/20231111010633/https://openai.com/blog/new-models-and-developer-products-announced-at-devday) | Loop and thread state move to OpenAI's server; developer polls runs |
| 2024-04-17 | v2 beta: file search, token controls, tool choice | [changelog](https://developers.openai.com/api/docs/changelog) | Retrieval becomes file search; more control over runs |
| 2024-12-18 | v1 beta shut off | [deprecations](https://developers.openai.com/api/docs/deprecations) | Only v2 remains |
| 2025-03-11 | Responses API and Agents SDK; Assistants sunset in 2026 announced "after achieving full feature parity" | [changelog](https://developers.openai.com/api/docs/changelog) | Synchronous items in and out; hosted tools in one request; SDK runner in your app |
| 2025-08-20 | Conversations API | [changelog](https://developers.openai.com/api/docs/changelog) | A durable server-side object for items, the thread's successor |
| 2025-08-26 | Deprecation notice; removal 2026-08-26 | [deprecations](https://developers.openai.com/api/docs/deprecations) | Replacement named: "Responses API and Conversations API" |
| 2026-06-03 | Reusable prompts deprecated | [deprecations](https://developers.openai.com/api/docs/deprecations) | The guide's replacement for assistants is withdrawn; configuration goes into app code |
| 2026-08-26 | Assistants shut down | [changelog](https://developers.openai.com/api/docs/changelog) | Thread retrieval stops working |
| 2026-11-30 | `v1/prompts` shuts down (scheduled) | [deprecations](https://developers.openai.com/api/docs/deprecations) | Prompt IDs stop resolving |

**Vendor's stated rationale.** OpenAI's March 11, 2025 post: "Based on developer feedback from the Assistants API beta, we've incorporated key improvements into the Responses API, making it more flexible, faster, and easier to use," and "The Responses API represents the future direction for building agents on OpenAI" (verified: [Wayback copy](https://web.archive.org/web/20250316154038/https://openai.com/index/new-tools-for-building-agents/) Nov 4). The same sentences appear today in the Responses migration guide's Assistants section. The deprecations entry says OpenAI had "announced plans to bring all Assistants API features to the easier to use Responses API." The March post said Responses "combines the simplicity of Chat Completions with the tool-use capabilities of the Assistants API," and that customers found building agents required "custom orchestration logic without sufficient visibility or built-in support." The migration guide adds: "Responses are simpler—send input items and get output items back," with "better performance and new features like web search, MCP, and computer use." The cost and SWE-bench figures on the Responses guide compare Responses with Chat Completions, not with Assistants, and are not part of the Assistants rationale.

**RS reading.** Interpretation, not sourced. The Assistants API put three things on OpenAI's server at once: the conversation (threads), the loop (runs), and the configuration (assistants). The migration unbundled them. The conversation can still live on the server (Conversations); the configuration was briefly on the server (prompts) and is now sent back to the developer's code; the loop across the developer's own tools went back to the developer or the Agents SDK. For class: under Assistants, "who decides the next step" was answered inside an opaque run you had to poll; under Responses it is answered in code you can read. Then, in September 2026, OpenAI put a whole loop back on its servers as the Agents API, this time a coding-agent harness with sessions and sandboxes rather than a chat thread. The pendulum is real, but what swung back is a harness, not the old run object. OpenAI's pages do not describe the Agents API as a successor to Assistants, and this file does not either.

## Migration case: Claude Code SDK → Claude Agent SDK

| Date | Event | Source | What changed in control flow, state, or tools |
|---|---|---|---|
| 2025-02-24 | Claude Code research preview | [announcement](https://www.anthropic.com/news/claude-3-7-sonnet) | A terminal agent loop on the developer's machine with file and shell tools |
| 2025-05-22 | Claude Code GA; "Claude Code SDK" for background use | [Claude 4 announcement](https://www.anthropic.com/news/claude-4) | The same loop callable from code |
| 2025-09-29 | Renamed Claude Agent SDK; v0.1.0 breaking changes | [article](https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk); [migration guide](https://code.claude.com/docs/en/agent-sdk/migration-guide) | Packages renamed; Claude Code's system prompt no longer the default |
| 2026-04-08 | Claude Managed Agents beta | [release notes](https://platform.claude.com/docs/en/release-notes/overview) | A harness run by Anthropic, with sessions, sandboxes, permission policies |

The migration guide's table: `@anthropic-ai/claude-code` → `@anthropic-ai/claude-agent-sdk`, `claude-code-sdk` → `claude-agent-sdk`, `ClaudeCodeOptions` → `ClaudeAgentOptions`. The substantive breaking change: "The SDK no longer uses Claude Code's system prompt by default"; to get it back you pass `systemPrompt: { type: "preset", preset: "claude_code" }`. A second change, loading no filesystem settings by default, "was briefly changed in v0.1.0 ... and then reverted"; today omitting `settingSources` loads user, project, and local settings, including CLAUDE.md files (verified: opened [migration guide](https://code.claude.com/docs/en/agent-sdk/migration-guide) Nov 4). The September 29, 2025 article now redirects from anthropic.com to claude.com (verified: redirect observed Nov 4).

**Vendor's stated rationale.** Anthropic: Claude Code "has begun to power almost all of our major agent loops. In other words, the agent harness that powers Claude Code (the Claude Code SDK) can power many other types of agents, too. To reflect this broader vision, we're renaming the Claude Code SDK to the Claude Agent SDK" ([article](https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk), Sep 29, 2025). The migration guide: the rename "reflects the SDK's broader capabilities for building AI agents beyond coding tasks." The article names the loop: "gather context -> take action -> verify work -> repeat." Anthropic's April 8, 2026 essay on Managed Agents adds that "harnesses encode assumptions about what Claude can't do on its own," and that those assumptions "can go stale as models improve" (verified: opened [the essay](https://www.anthropic.com/research/managed-agents) Nov 4; the `/engineering/` URL redirects to `/research/`).

**RS reading.** Interpretation. The rename is a statement that the harness, not the coding persona, is the product: the loop, the file and shell tools, permissions, and context handling became a library, and "coding agent" became one preset among many. That is why the breaking change sits in the system prompt. For class, it separates three things students tend to blur: the model (Claude), the harness (the loop and tools), and the persona (a system prompt). The 2024 "Building effective agents" essay now opens with a note that "Much of the tooling landscape described in this post has changed since December 2024" and points to Managed Agents (verified: opened [the essay](https://www.anthropic.com/research/building-effective-agents) Nov 4), which suggests that Anthropic's own advice moved from "write the loop yourself" to "use our harness, local or hosted."

## Migration case: AutoGen and Semantic Kernel → Microsoft Agent Framework

| Date | Event | Source | What changed in control flow, state, or tools |
|---|---|---|---|
| 2025-10-01 | Agent Framework public preview | [Azure blog](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/); [Foundry devblog](https://devblogs.microsoft.com/foundry/introducing-microsoft-agent-framework-the-open-source-engine-for-agentic-ai-apps/) | One SDK for single agents and graph workflows; MCP, A2A, OpenAPI built in |
| 2026-04-02 | `python-1.0.0`, `dotnet-1.0.0` | [GitHub releases](https://github.com/microsoft/agent-framework/releases) | Stable APIs |
| 2026-04-06 | AutoGen README maintenance banner updated to redirect new users | [AutoGen repo](https://github.com/microsoft/autogen) | Commit history only |
| 2026-10-16 | AutoGen README: "Project archived and no longer maintained" | [AutoGen repo](https://github.com/microsoft/autogen) | No bug or security fixes |

The AutoGen migration guide says the new framework is "developed by the core AutoGen and Semantic Kernel teams" and lists the differences. Orchestration: "AutoGen pairs an event-driven core with a high-level Team. Agent Framework centers on a typed, graph-based Workflow that routes data along edges." Loop: "AssistantAgent is single-turn unless you increase max_tool_iterations. Agent is multi-turn by default and keeps invoking tools until it can return a final answer." Runtime: "Agent Framework focuses on single-process composition today; distributed execution is planned" (verified: opened [AutoGen migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/) Nov 4). The Semantic Kernel guide notes in passing that "OpenAI Responses introduced a new conversation model that simplifies how conversations are handled... compared to the now deprecated OpenAI Assistants model," so the first case reached Microsoft's framework too (verified: opened [Semantic Kernel migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/) Nov 4).

AutoGen's status, checked Nov 4: the README says "Project archived and no longer maintained," that Microsoft "is not providing bug fixes, security fixes, new features, or support," and that "Microsoft Agent Framework (MAF) is the enterprise-ready successor to AutoGen." That wording was committed on October 16, 2026. But GitHub's API reports the repository's `archived` flag as `false`, with a push on October 28, 2026 (verified: opened the README and queried the GitHub API Nov 4). The project is archived in name, not in GitHub's read-only sense.

**Vendor's stated rationale.** Microsoft's devblog: "Developers asked us: why can't we have both — the innovation of AutoGen and the trust and stability of Semantic Kernel — in one unified framework? That's exactly why we built the Microsoft Agent Framework" (Oct 1, 2025). The Azure blog: it "converges AutoGen, a former Microsoft Research project, and the enterprise-ready foundations of Semantic Kernel into a unified, commercial-grade framework." The Semantic Kernel guide lists "Simplified API," "Better Performance," "Unified Interface," and "Enhanced Developer Experience." The AutoGen guide calls the framework "a significant evolution of the ideas pioneered in AutoGen."

**RS reading.** Interpretation. AutoGen's founding idea was that agents coordinate by conversation (essay 07 covers its 2023 paper). Its successor makes the graph the default: data moves along typed edges and the developer draws the routes. Conversation survives as one pattern among the workflows (group chat, Magentic), not as the foundation. For class, it is the same move as the podcast prep workflow: fixed routes where the steps are known, a model's choice only where it is needed.

## What changed, in the class's terms

| Era | Where the loop runs | Where state lives | Who routes | Where the human approves |
|---|---|---|---|---|
| Function calling (2023) | Your code calls the model again after each function | Your code resends the whole history | Model proposes a call; your code runs it and decides whether to continue | Anywhere your code pauses |
| Assistants API (2023–2026) | OpenAI's server, as an asynchronous run you poll | Server-side threads | Model inside the run; hosted tools run without stopping | Only at `requires_action`, when your function is needed |
| Responses + Agents SDK (2025–) | Hosted tools within one request on OpenAI's side; your functions in your app or the SDK runner | Your choice: your store, `previous_response_id`, or Conversations | Model within a request; SDK handoffs in your process | In your application or SDK |
| Visual canvas: Agent Builder (2025–Nov 2026) | OpenAI's server, following the drawn graph | Vendor-hosted | A human, at design time, by drawing edges | Nodes in the graph; product shuts down Nov 30 |
| Harness as library: Claude Code → Agent SDK (2025–) | A harness process on your machine or server | Your filesystem and session files; settings and CLAUDE.md | Model, with subagents | Permission modes in the harness |
| Hosted harness: Managed Agents (Apr 2026), OpenAI Agents API (Sep 2026) | The vendor's harness and sandbox | Vendor sessions and memory stores | Model, with vendor multi-agent config | Permission policies; approval events your app answers |
| Graph framework: Microsoft Agent Framework (2025–) | Your process | Agent sessions and workflow checkpoints in your app | The developer's typed graph, with agents inside nodes | Request-response steps in the workflow |

Approval rows rest on the docs cited above; the Managed Agents `auto` permission policy ("runs it, denies it, or pauses for your approval") is in the Anthropic release notes (verified Nov 4).

## What I could not verify

- **Original Assistants reference docs.** The 2023–2024 `platform.openai.com/docs/assistants/*` pages are gone (404 on the current site); the Wayback copy I tried is a JavaScript shell. Object descriptions come from the 2023 DevDay post (Wayback), the current migration guide, and a later revision of the cookbook notebook.
- **openai.com posts returned 403** on Nov 4 (DevDay 2023, function calling 2023, "New tools for building agents" 2025, AgentKit). I read Internet Archive copies of the first three; the AgentKit announcement is unread, so "AgentKit" components rest on the changelog and essay 07's secondary sources.
- **Assistants deprecation date discrepancy.** The deprecations entry heading reads 2025-08-20; its text says developers were notified August 26, 2025. I report both.
- **Anthropic tool use beta start.** The release notes I read confirm GA on May 30, 2024, not the beta date.
- **Claude Code SDK first release.** First mention I verified is the May 22, 2025 Claude 4 announcement; an earlier release is possible.
- **Semantic Kernel's own status.** I read the migration guide but no official statement that Semantic Kernel is deprecated or in maintenance; I do not claim it.
- **AutoGen "archived".** The README says archived; GitHub's archived flag is false. When the April 2026 maintenance banner first appeared is not established beyond the commit date.
- **Agent Framework 1.0 date.** GitHub shows April 2, 2026 (UTC); essay 07 cites a secondary source saying April 3. I found no official announcement post.
- **Gemini function calling details.** The December 13, 2023 post lists function calling among Gemini Pro's features; I did not read the original Gemini API docs from that date.

## Sources

All opened November 4, 2026.

- OpenAI, [Deprecations](https://developers.openai.com/api/docs/deprecations) (also its `.md` version)
- OpenAI, [Assistants migration guide](https://developers.openai.com/api/docs/assistants/migration)
- OpenAI, [Migrate to the Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses)
- OpenAI, [Changelog](https://developers.openai.com/api/docs/changelog)
- OpenAI, [Agents guide](https://developers.openai.com/api/docs/guides/agents)
- OpenAI, [Conversation state](https://developers.openai.com/api/docs/guides/conversation-state)
- OpenAI, [Migrate from Agent Builder](https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder)
- OpenAI, [Migrate from prompt objects](https://developers.openai.com/api/docs/guides/prompting/migrate-from-prompt-object)
- OpenAI, "Function calling and other API updates," June 13, 2023, [Wayback copy of June 21, 2023](https://web.archive.org/web/20230621010946/https://openai.com/blog/function-calling-and-other-api-updates) (live page 403)
- OpenAI, "New models and developer products announced at DevDay," Nov 6, 2023, [Wayback copy of Nov 11, 2023](https://web.archive.org/web/20231111010633/https://openai.com/blog/new-models-and-developer-products-announced-at-devday) (live page 403)
- OpenAI, "New tools for building agents," Mar 11, 2025, [Wayback copy of Mar 16, 2025](https://web.archive.org/web/20250316154038/https://openai.com/index/new-tools-for-building-agents/) (live page 403)
- OpenAI Cookbook, [Assistants API Overview (Python SDK)](https://raw.githubusercontent.com/openai/openai-cookbook/main/examples/Assistants_API_overview_python.ipynb), later revision
- Anthropic, [Claude can now use tools](https://claude.com/resources/articles/tool-use-ga), May 30, 2024 (redirected from anthropic.com/news/tool-use-ga)
- Anthropic, [Claude 3.5 Sonnet, Claude 3.5 Haiku, and computer use](https://www.anthropic.com/news/3-5-models-and-computer-use), Oct 22, 2024
- Anthropic, [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol), Nov 25, 2024
- Anthropic, [Building effective agents](https://www.anthropic.com/research/building-effective-agents), Dec 19, 2024 (redirected from /engineering/)
- Anthropic, [Claude 3.7 Sonnet and Claude Code](https://www.anthropic.com/news/claude-3-7-sonnet), Feb 24, 2025
- Anthropic, [Introducing Claude 4](https://www.anthropic.com/news/claude-4), May 22, 2025
- Anthropic, [Building agents with the Claude Agent SDK](https://claude.com/resources/articles/building-agents-with-the-claude-agent-sdk), Sep 29, 2025 (redirected from anthropic.com/engineering/)
- Anthropic, [Migrate to Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/migration-guide)
- Anthropic, [Introducing Agent Skills](https://claude.com/resources/articles/skills), Oct 16, 2025 (redirected from anthropic.com/news/skills)
- Anthropic, [Donating MCP and establishing the Agentic AI Foundation](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation), Dec 9, 2025
- Anthropic, [Scaling Managed Agents](https://www.anthropic.com/research/managed-agents), Apr 8, 2026 (redirected from /engineering/)
- Anthropic, [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)
- Anthropic, [Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview)
- Google, [Gemini API for developers and enterprises](https://blog.google/innovation-and-ai/products/gemini-api-developers-cloud/), Dec 13, 2023 (redirected from blog.google/technology/ai/)
- Google, [Agent Development Kit](https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/), Apr 9, 2025
- Google, [A2A: A new era of agent interoperability](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/), Apr 9, 2025
- Linux Foundation, [Agent2Agent protocol project launch](https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project-to-enable-secure-intelligent-communication-between-ai-agents), Jun 23, 2025
- A2A, [A New Chapter for A2A: Joining the Agentic AI Foundation](https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/), Aug 27, 2026
- Microsoft, [Introducing Microsoft Agent Framework (Azure blog)](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/), Oct 1, 2025
- Microsoft, [Introducing Microsoft Agent Framework (Foundry devblog)](https://devblogs.microsoft.com/foundry/introducing-microsoft-agent-framework-the-open-source-engine-for-agentic-ai-apps/), Oct 1, 2025
- Microsoft, [AutoGen to Agent Framework migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/)
- Microsoft, [Semantic Kernel to Agent Framework migration guide](https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/)
- Microsoft, [AutoGen repository](https://github.com/microsoft/autogen) (README, commit history, and API metadata)
- Microsoft, [Agent Framework releases](https://github.com/microsoft/agent-framework/releases)
- Essay 07, "From blackboards to harnesses," in the Lab's mk-agent-studies (cited in plain text)
