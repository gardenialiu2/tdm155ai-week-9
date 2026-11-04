---
title: "Documentation: the official pages behind agent products, harnesses, and APIs"
description: "An index of official documentation for the agent products, harnesses, APIs, SDKs, frameworks, and protocols as of November 4, 2026, with a dated history of how the APIs changed and the primary papers and essays."
author: claude (RS research pane, TDM 155AI week 9)
date: 2026-11-04
status: draft; agent research, check before citing
order: 0
---

# Documentation

This folder points at the real documentation: official pages, API references, runnable examples, and original papers. Every link was opened by a research agent on **November 4, 2026**. The explanations around the links are ours; the links are the sources. Marlon asked for it, and TL planned it (in the course planning folder, `plan/unit-3/rs-agent-documentation-plan.md`).

| file | what it is |
| --- | --- |
| [catalog.md](catalog.md) | 80 cards in nine groups, one per product, harness, coding agent, API, SDK, framework, hosted platform, protocol, and no-code builder: status, what it is, building blocks, access and cost, and direct links to the overview, agent-loop, tools and permissions, quickstart, reference, and changelog pages. |
| [history.md](history.md) | A dated timeline of agent APIs and SDKs, and three migration cases: OpenAI's Assistants API to Responses and Conversations, the Claude Code SDK to the Claude Agent SDK, and AutoGen and Semantic Kernel to Microsoft Agent Framework. The vendor's stated reason and our reading are kept apart. |
| [papers-and-essays.md](papers-and-essays.md) | 24 primary readings, each labelled research paper or engineering essay, with official links and what each means for the class. |

## Start here

Five pages to open first, in this order:

1. **Anthropic, "Building effective agents"** (December 19, 2024): workflows versus agents, and the five patterns the class builds on. In [Papers and essays](papers-and-essays.md).
2. **A tool loop you can read:** the Claude Messages API card, or the OpenAI Responses API card, in the [catalog](catalog.md). The "Agent loop / architecture" link shows the loop the model and your code take turns in.
3. **A harness:** the Claude Code or Codex card in the [catalog](catalog.md): what the harness supplies around the model (tools, context, subagents, permissions, schedules).
4. **An always-on agent:** the OpenClaw or Hermes Agent card in the [catalog](catalog.md), for heartbeats, cron jobs, and standing orders.
5. **Why APIs change:** the Assistants case in [History](history.md), where the documented reason is "more flexible, faster, and easier to use," and the recommended replacement for one of its objects was itself retired.

## Questions to bring to every card

What loops? What routes? Who decides the next step? What persists between turns? Which tool gets called? When does a human step in? How can you inspect what happened? The class's podcast-prep workflow (intake, interviewer, sidekick, producer) answers each of these in fixed code, without a framework; it is a useful comparison, not a recommendation to adopt one.

## What changed since note 01

The catalog re-opened the official pages rather than trusting earlier labels. Where it disagrees with [note 01](../notes/01-agent-products-as-of-nov-4.md), trust the catalog until someone checks both:

- ChatGPT Work's model list on its own page names GPT-6 models (Astra, Sol, Luna, and Terra), not the GPT-5.6 that note 01 took from a post on X.
- xAI's own Team Bots page doesn't say that managers approve additions to shared memory; only press coverage says so. The x.ai pages also read "SpaceXSI" in their titles where note 01 has "SpaceXAI"; unresolved.
- New since note 01: Claude Cowork; Google's Tasks in Gemini (formerly Gemini Spark); OpenAI's hosted Agents API (public beta since September 10, 2026); Vertex AI renamed the Gemini Enterprise Agent Platform; Bedrock Agents now "Classic" and closed to new customers; Mistral's Agents API listed under "Deprecated"; Jules shutting down (read-only after November 11, 2026); Flowise and Roo Code discontinued; Windsurf now Devin Desktop.

## How it was checked

Research agents opened each page on November 4, 2026. A page that refused them (openai.com, help.openai.com, x.ai, and developer.salesforce.com often return 403) is recorded as a limit, and the card falls back to the next-best official source and says so. Redirects are noted where they matter (several anthropic.com essays now live at claude.com or under /research). Nothing here mirrors a documentation site; short quotations are marked and attributed. Check before citing: these products change weekly.
