---
title: "Papers and essays on agents"
description: "An annotated list of primary readings on agents, each labelled as research paper or engineering essay: Anthropic's engineering essays from Building effective agents (2024) to Managed Agents (2026), OpenAI's practical guide, and the foundational papers from ReAct to the MAST failure taxonomy, tied to the class 9 steps."
author: claude (research subagent P)
date: 2026-11-04
status: "draft; agent research, check before citing"
order: 3
---

# Papers and essays on agents

Each entry is labelled. A **research paper** reports a system or experiment with a method and can be cited as a finding; an **engineering essay** is a lab's account of what it built and recommends, first-hand evidence of practice rather than a controlled result. Every page was opened on November 4, 2026, and authors and titles come from the page itself; redirects and PDF-only copies are noted.

Class steps referred to: **loop**, **3-node graph with a switch**, **ensemble**, **director**, **reality mechanics or simulation**, **observers**; and the questions what loops, what routes, who decides, what persists, when a human intervenes, how you inspect what happened.

## Start here

Five readings for a first pass, in this order: the vocabulary, the loop, a working ensemble with a director, a simulation with memory, and the ways ensembles fail.

### Building effective agents

**Kind.** Engineering essay (Anthropic), December 19, 2024. Authors: the page now reads "Written by Erik S. and Barry Zhang" (Erik Schluntz is the full name as originally published; the page gives only the initial today).

**Links.** [Official HTML](https://www.anthropic.com/engineering/building-effective-agents) · PDF: none · [Cookbook: basic workflows](https://platform.claude.com/cookbook/patterns-agents-basic-workflows) · [Computer-use reference implementation](https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo)

**What it says.** It separates *workflows*, "systems where LLMs and tools are orchestrated through predefined code paths," from *agents*, "systems where LLMs dynamically direct their own processes and tool usage." It builds up from the augmented LLM through five workflow patterns (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) to the autonomous agent, and advises starting with the simplest thing that works. The cookbook implements chaining, parallelization, and routing in a few lines each.

**Why it matters for this class.** It is the vocabulary for the whole session: the 3-node graph with a switch is "routing," the director is an "orchestrator," and an observer that grades and sends work back is an "evaluator-optimizer." The key question it hands students is who decides the next step, the code or the model.

**Checked.** Opened November 4, 2026. No redirect. The page now carries a note that "Much of the tooling landscape described in this post has changed since December 2024," pointing to the Managed Agents essay and docs.

### ReAct: Synergizing Reasoning and Acting in Language Models

**Kind.** Research paper, submitted October 6, 2022 (v3, March 10, 2023, ICLR camera-ready). Authors: Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao.

**Links.** [arXiv abstract](https://arxiv.org/abs/2210.03629) · [PDF](https://arxiv.org/pdf/2210.03629) · [Project site with code](https://react-lm.github.io)

**What it says.** A language model interleaves written reasoning ("thoughts") with actions such as search calls, reads the observations that come back, and continues. Reasoning keeps the plan on track and actions bring in outside facts, so the combination beats either alone on question answering and interactive tasks.

**Why it matters for this class.** This is the loop in its original form: thought, action, observation, repeat. Students can point at the transcript and see exactly what loops and where the model, not the code, chose the next action.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

### How we built our multi-agent research system

**Kind.** Engineering essay (Anthropic), June 13, 2025. Contributors: Jeremy Hadfield, Barry Zhang, Kenneth Lien, Florian Scholz, Jeremy Fox, Daniel Ford.

**Links.** [Official HTML](https://www.anthropic.com/engineering/multi-agent-research-system) · PDF: none · Code: none

**What it says.** A lead agent plans a research question, spawns parallel subagents with their own context windows and tools, and synthesizes their condensed findings, after which a citation agent attributes claims. The lead saves its plan to external memory so it survives truncation, and an LLM judge scores outputs against a rubric alongside human testing. Multi-agent runs used about fifteen times the tokens of a chat.

**Why it matters for this class.** It is a production director-and-ensemble, with the costs stated. It answers what persists (a saved plan outside the context), who decides (the lead), and how you inspect it (a rubric judge plus humans reading transcripts), which is the observer step.

**Checked.** Opened November 4, 2026. No redirect.

### Generative Agents: Interactive Simulacra of Human Behavior

**Kind.** Research paper, submitted April 7, 2023 (v2, August 6, 2023; UIST '23). Authors: Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein.

**Links.** [arXiv abstract](https://arxiv.org/abs/2304.03442) · [PDF](https://arxiv.org/pdf/2304.03442) · [Code](https://github.com/joonspk-research/generative_agents)

**What it says.** Characters live in a sandbox town (Smallville). Each logs its experiences in a memory stream, periodically condenses them into reflections, and retrieves them to plan its day; an ablation suggests observation, planning, and reflection each make behavior more believable.

**Why it matters for this class.** It is the reference case for reality mechanics or simulation: the world has rules, and each character's memory is what persists between turns. Note 02 covers it in depth.

**Checked.** Opened November 4, 2026 (arXiv abstract; repository README confirms it accompanies the paper).

### Why Do Multi-Agent LLM Systems Fail?

**Kind.** Research paper, submitted March 17, 2025 (v3, October 26, 2025). Authors: Mert Cemri, Melissa Z. Pan, Shuyi Yang, Lakshya A. Agrawal, Bhavya Chopra, Rishabh Tiwari, Kurt Keutzer, Aditya Parameswaran, Dan Klein, Kannan Ramchandran, Matei Zaharia, Joseph E. Gonzalez, Ion Stoica.

**Links.** [arXiv abstract](https://arxiv.org/abs/2503.13657) · [PDF](https://arxiv.org/pdf/2503.13657) · Code: none linked on the abstract page

**What it says.** From more than 1,600 annotated traces of multi-agent systems, the authors build MAST, a taxonomy of 14 failure modes under three headings: system design issues, inter-agent misalignment, and task verification. The dataset (MAST-Data) is released with it.

**Why it matters for this class.** It gives observers a checklist of what to count in an ensemble's log, and it makes the point that "nobody checked the result" is a design failure, not bad luck. Note 07 builds its observer schema on it.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

## Anthropic engineering essays

Anthropic's engineering index (https://www.anthropic.com/engineering) was opened today. It displayed 24 of the 27 articles its header counts. Agent-relevant items opened and annotated are below, in date order. Also on the index and not annotated here: the "think" tool (March 20, 2025), Desktop Extensions (June 26, 2025), Claude Code sandboxing (October 20, 2025), Code execution with MCP (November 4, 2025), Advanced tool use (November 24, 2025), Claude Code auto mode (March 25, 2026), How we contain Claude across products (May 25, 2026), and Redesigning source control at Anthropic (October 13, 2026, the newest). Building effective agents and the multi-agent research system are under "Start here."

### Claude Code: Best practices for agentic coding (now "Best practices for Claude Code")

**Kind.** Engineering essay turned product documentation (Anthropic). The engineering index dates the original April 18, 2025; the live page is undated and unsigned.

**Links.** [Original URL](https://www.anthropic.com/engineering/claude-code-best-practices) (redirects) · [Current docs page](https://code.claude.com/docs/en/best-practices) · PDF: none

**What it says.** The current page argues that defaults now handle most sessions (auto mode, automatic subagent delegation, automatic compaction) and covers what to do when they don't: tell Claude what it can't see, give it a check to run, keep CLAUDE.md short, know what subagents cost, and run sessions in parallel.

**Why it matters for this class.** Students are using a harness, and this is the vendor's own account of which parts of the loop the harness supplies and which the user must supply (instructions file, checks, rules). The 2025 essay has been replaced in place.

**Checked.** Opened November 4, 2026. The original URL returns a 308 permanent redirect to code.claude.com; the April 2025 text is no longer served there.

### Writing effective tools for agents — with agents

**Kind.** Engineering essay (Anthropic), September 11, 2025. Author: Ken Aizawa, with contributors named in the acknowledgements.

**Links.** [Official HTML](https://www.anthropic.com/engineering/writing-tools-for-agents) · PDF: none · [Tool evaluation cookbook](https://platform.claude.com/cookbook/tool-evaluation-tool-evaluation) (linked, not opened)

**What it says.** Tools for agents should be designed for how a non-deterministic model reads them, not as thin wrappers on an API. Prototype, evaluate on realistic multi-step tasks, read the transcripts, and iterate, using an agent to help; prefer a few purpose-built, namespaced tools with concise outputs, clear descriptions, and helpful errors.

**Why it matters for this class.** When students give a node a tool, this tells them what a model needs to choose it correctly, and it models inspection by transcript.

**Checked.** Opened November 4, 2026. No redirect.

### Effective context engineering for AI agents

**Kind.** Engineering essay (Anthropic), September 29, 2025. Authors: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield, with contributions from Rafi Ayub, Hannah Moran, Cal Rueb, Connor Jennings.

**Links.** [Official HTML](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) · PDF: none · Code: none

**What it says.** A model's recall degrades as its context fills, so context is a budget: find "the smallest set of high-signal tokens." For long tasks it describes compaction, structured note-taking outside the window, and subagents that return condensed results.

**Why it matters for this class.** It is the clearest answer to "what persists?" Each character card, running summary, or shared log in an ensemble is a context-engineering decision.

**Checked.** Opened November 4, 2026. No redirect; one internal link in the page points back at itself.

### Building agents with the Claude Agent SDK

**Kind.** Engineering essay (Anthropic, now on the Claude blog), September 29, 2025. Author: Thariq Shihipar, with notes and editing from Molly Vorwerck, Suzanne Wang, Alex Isken, Cat Wu, Keir Bradwell, Alexander Bricken, Ashwin Bhat.

**Links.** [Official HTML](https://claude.com/blog/building-agents-with-the-claude-agent-sdk) · PDF: none · Docs linked from the essay: Agent SDK overview, subagents, custom tools (not opened today; see the catalog)

**What it says.** It announces the rename of the Claude Code SDK to the Claude Agent SDK and frames the agent loop as three stages, gather context, take action, verify work, then repeat. It covers file search, subagents, bash, code generation, MCP, rule-based checks, visual feedback, and LLM-as-judge.

**Why it matters for this class.** "Verify work" as a stage inside the loop is the seed of the observer step; students can ask where verification lives in their own loop.

**Checked.** Opened November 4, 2026. The anthropic.com/engineering URL returns a 308 redirect to claude.com/blog.

### Equipping agents for the real world with Agent Skills

**Kind.** Engineering essay (Anthropic), October 16, 2025. Authors: Barry Zhang, Keith Lazuka, Mahesh Murag.

**Links.** [Official HTML](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) · PDF: none · [Example skill (PDF)](https://github.com/anthropics/skills/tree/main/document-skills/pdf) · [Skills cookbook](https://github.com/anthropics/claude-cookbooks/tree/main/skills) (linked, not opened)

**What it says.** A skill is a folder of instructions, scripts, and resources centered on a SKILL.md whose name and description load at startup; the full file and linked files load only when relevant ("progressive disclosure"). A December 18, 2025 update says Agent Skills were published as an open standard.

**Why it matters for this class.** A skill is a role card for an agent that it reads only when needed, which is a way to give an ensemble member expertise without filling its context. The Notebook's own `.agents/skills/` folder uses this format.

**Checked.** Opened November 4, 2026. No redirect.

### Effective harnesses for long-running agents

**Kind.** Engineering essay (Anthropic), November 26, 2025. Author: Justin Young.

**Links.** [Official HTML](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) · PDF: none · [Quickstart: autonomous-coding](https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding) (linked, not opened)

**What it says.** Each new session forgets earlier work, so an initializer agent sets up an `init.sh`, a `claude-progress.txt` log, a first git commit, and a JSON feature list whose items start as failing; later coding agents take one feature at a time and use git history and the progress file to resume.

**Why it matters for this class.** Persistence is a file, not a memory: the progress log and feature list are the shared state any agent (or a student) can inspect. It is the plainest model of a loop that survives across sessions.

**Checked.** Opened November 4, 2026. No redirect.

### Demystifying evals for AI agents

**Kind.** Engineering essay (Anthropic), January 9, 2026. Authors: Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, Jiri De Jonghe.

**Links.** [Official HTML](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) · PDF: none · Code: none

**What it says.** It defines the transcript (trace, trajectory) as the full record of a trial, graders as code-based, model-based, or human, and the outcome as the final state of the environment, which may differ from what the agent claims.

**Why it matters for this class.** It gives observers precise vocabulary: grade the transcript or grade the outcome, and know which you are doing. "The agent says the reservation exists; does it?" is a good classroom test.

**Checked.** Opened November 4, 2026. No redirect.

### Building a C compiler with a team of parallel Claudes

**Kind.** Engineering essay (Anthropic), February 5, 2026. Author: Nicholas Carlini.

**Links.** [Official HTML](https://www.anthropic.com/engineering/building-c-compiler) · PDF: none · Code: not opened

**What it says.** Parallel agents claimed tasks by writing lock files into a shared git repository, worked against strict test harnesses designed for a model's context, used GCC as a known-good oracle to split the Linux kernel build, and took specialized roles (deduplication, performance, code critique, documentation). No orchestrating agent was used.

**Why it matters for this class.** It is an ensemble without a director: coordination comes from shared files and tests. Set beside the research system, it lets students compare "who decides" when nobody is in charge.

**Checked.** Opened November 4, 2026. No redirect.

### Harness design for long-running application development

**Kind.** Engineering essay (Anthropic), March 24, 2026. Author: Prithvi Rajasekaran.

**Links.** [Official HTML](https://www.anthropic.com/engineering/harness-design-long-running-apps) · PDF: none · Code: none

**What it says.** A generator agent builds and a separate evaluator agent grades, a GAN-inspired pairing that made design quality more consistent; it was extended to planner, generator, and evaluator for multi-hour builds. With a newer model the author dropped the sprint structure and used the evaluator only where the model was unreliable alone.

**Why it matters for this class.** A small graph with a switch in practice: the evaluator's verdict routes work back or forward. It also shows harnesses being simplified as models improve.

**Checked.** Opened November 4, 2026. No redirect.

### Scaling Managed Agents: Decoupling the brain from the hands

**Kind.** Engineering essay (Anthropic), April 8, 2026. Authors: Lance Martin, Gabe Cemaj, Michael Cohen.

**Links.** [Official HTML](https://www.anthropic.com/engineering/managed-agents) · PDF: none · [Managed Agents docs](https://platform.claude.com/docs/en/managed-agents/overview) (linked from Building effective agents; not opened today)

**What it says.** An agent is split into a session (a durable event log), a harness (the loop that calls the model and routes tool calls), and a sandbox (where code runs). Keeping the session outside the context window lets the harness recover from crashes and query past events.

**Why it matters for this class.** It names the three parts students are building: the log is what persists and what observers read, the harness is what loops and routes, and the model is only one component.

**Checked.** Opened November 4, 2026. No redirect. This is the essay Building effective agents now points to.

## Other labs' guides

### A practical guide to building agents (OpenAI)

**Kind.** Engineering guide (OpenAI), PDF, 34 pages; the file's metadata gives April 7, 2025; no authors named.

**Links.** Official HTML: blocked (see Checked) · [PDF](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) · Code: none (inline snippets use the Agents SDK)

**What it says.** It defines agents as "systems that independently accomplish tasks on your behalf" and says apps that use an LLM without letting it control workflow execution are not agents. Every orchestration needs a "run," a loop until an exit condition; multi-agent systems are graphs in two patterns, a *manager* that calls specialist agents as tools and a *decentralized* pattern where agents hand off to one another. It closes on guardrails and planning for human intervention.

**Why it matters for this class.** Its two graph patterns map straight onto the director (manager) and the 3-node switch (handoffs), and "exit condition" is the question of when the loop stops and a human steps in.

**Checked.** Opened November 4, 2026 as PDF only (text extracted locally); the openai.com landing page returned HTTP 403.

## Research papers

ReAct, Generative Agents, and the MAST paper are under "Start here."

### Toolformer: Language Models Can Teach Themselves to Use Tools

**Kind.** Research paper, submitted February 9, 2023. Authors: Timo Schick, Jane Dwivedi-Yu, Roberto Dessì, Roberta Raileanu, Maria Lomeli, Luke Zettlemoyer, Nicola Cancedda, Thomas Scialom.

**Links.** [arXiv abstract](https://arxiv.org/abs/2302.04761) · [PDF](https://arxiv.org/pdf/2302.04761) · Code: none

**What it says.** A model learns, self-supervised from a few demonstrations per API, when to call tools such as a calculator or search engine and how to use the results, improving zero-shot performance.

**Why it matters for this class.** It is the moment tool calling moved into the model's own choices. Today tool use is an API feature, but the question, when to reach for a tool, is the one students set.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

### Reflexion: Language Agents with Verbal Reinforcement Learning

**Kind.** Research paper, submitted March 20, 2023 (v4, October 10, 2023; NeurIPS 2023 per the repository). Authors: Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao.

**Links.** [arXiv abstract](https://arxiv.org/abs/2303.11366) · [PDF](https://arxiv.org/pdf/2303.11366) · [Code](https://github.com/noahshinn/reflexion)

**What it says.** After a failed attempt the agent writes a verbal reflection, stores it in memory, and uses it on the next try, improving without weight updates (91% pass@1 on HumanEval).

**Why it matters for this class.** A loop with a memory of its own mistakes: what persists between iterations is a written note. A director or observer that writes such notes for its ensemble is doing Reflexion.

**Checked.** Opened November 4, 2026 (arXiv abstract and repository).

### CAMEL: Communicative Agents for "Mind" Exploration of Large Language Model Society

**Kind.** Research paper, submitted March 31, 2023 (v2, November 2, 2023; NeurIPS 2023). Authors: Guohao Li, Hasan Abed Al Kader Hammoud, Hani Itani, Dmitrii Khizbullin, Bernard Ghanem.

**Links.** [arXiv abstract](https://arxiv.org/abs/2303.17760) · [PDF](https://arxiv.org/pdf/2303.17760) · [Code](https://github.com/camel-ai/camel) (linked from arXiv)

**What it says.** Chat agents take roles set by "inception prompting" and cooperate on a task autonomously; the conversations become data for studying multi-agent behavior.

**Why it matters for this class.** The minimal ensemble: two role cards and a task, no director. It is a good baseline before students add a third node or a switch.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

### AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation

**Kind.** Research paper (Microsoft), submitted August 16, 2023 (v2, October 3, 2023). Authors: Qingyun Wu, Gagan Bansal, Jieyu Zhang, Yiran Wu, Beibin Li, Erkang Zhu, Li Jiang, Xiaoyun Zhang, Shaokun Zhang, Jiale Liu, Ahmed Hassan Awadallah, Ryen W White, Doug Burger, Chi Wang.

**Links.** [arXiv abstract](https://arxiv.org/abs/2308.08155) · [PDF](https://arxiv.org/pdf/2308.08155) · [Code](https://github.com/microsoft/autogen)

**What it says.** An open-source framework in which customizable agents, backed by LLMs, human input, or tools, converse to complete tasks; conversation is the programming model.

**Why it matters for this class.** A human can be one of the agents, which makes "when does a human intervene" a design choice in the graph.

**Checked.** Opened November 4, 2026. The GitHub README says: "This project has been archived and is no longer actively maintained by Microsoft," and names Microsoft Agent Framework as "the enterprise‑ready successor to AutoGen."

### MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework

**Kind.** Research paper, submitted August 1, 2023 (v7, November 1, 2024). Authors: Sirui Hong, Mingchen Zhuge, Jiaqi Chen, Xiawu Zheng, Yuheng Cheng, Ceyao Zhang, Jinlin Wang, Zili Wang, Steven Ka Shing Yau, Zijuan Lin, Liyang Zhou, Chenyu Ran, Lingfeng Xiao, Chenglin Wu, Jürgen Schmidhuber.

**Links.** [arXiv abstract](https://arxiv.org/abs/2308.00352) · [PDF](https://arxiv.org/pdf/2308.00352) · [Code](https://github.com/geekan/MetaGPT) (linked from arXiv)

**What it says.** Human "Standardized Operating Procedures" become prompt sequences; agents take assigned roles on an assembly line and check one another's intermediate documents.

**Why it matters for this class.** Structure lives in the procedure, not in a director's judgment: a fixed workflow of roles, like the podcast prep workflow. Students can compare it with an ensemble whose director chooses who speaks.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

### Improving Factuality and Reasoning in Language Models through Multiagent Debate

**Kind.** Research paper, submitted May 23, 2023. Authors: Yilun Du, Shuang Li, Antonio Torralba, Joshua B. Tenenbaum, Igor Mordatch.

**Links.** [arXiv abstract](https://arxiv.org/abs/2305.14325) · [PDF](https://arxiv.org/pdf/2305.14325) · [Project page and code](https://composable-models.github.io/llm_debate/) (linked from arXiv)

**What it says.** Several instances of a model answer, read one another's answers, and revise over rounds, which improves reasoning and reduces factual errors.

**Why it matters for this class.** It is the case for an ensemble over a single agent. Note 07 pairs it with later work showing agents converge too fast; read both before claiming debate makes answers better.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

### Voyager: An Open-Ended Embodied Agent with Large Language Models

**Kind.** Research paper, submitted May 25, 2023 (v2, October 19, 2023). Authors: Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, Anima Anandkumar.

**Links.** [arXiv abstract](https://arxiv.org/abs/2305.16291) · [PDF](https://arxiv.org/pdf/2305.16291) · [Project site and code](https://voyager.minedojo.org/) (linked from arXiv)

**What it says.** A Minecraft agent proposes its own goals (an automatic curriculum), writes code to reach them, refines it from game feedback, and saves working code to a skill library it reuses.

**Why it matters for this class.** Reality mechanics: the game's rules give honest feedback the model cannot argue with. The skill library is a durable store that grows, an ancestor of Agent Skills.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

### SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering

**Kind.** Research paper, submitted May 6, 2024 (v3, November 11, 2024). Authors: John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press.

**Links.** [arXiv abstract](https://arxiv.org/abs/2405.15793) · [PDF](https://arxiv.org/pdf/2405.15793) · [Project site](https://swe-agent.com) (linked from arXiv)

**What it says.** The interface between a model and a computer (its commands, file viewer, edit format, feedback) should be designed for the model, as human interfaces are for people; a purpose-built "agent-computer interface" lets the agent explore repositories, edit code, and run tests.

**Why it matters for this class.** The harness, not the model, determines much of what an agent can do.

**Checked.** Opened November 4, 2026 (arXiv abstract page).

## Already in the Lab's reading

**Imas and DeepMind (economic and system framing).** The Lab already cites Alex Imas, Andrew Koh, and Shane Legg, "Organizing Intelligence" (Google DeepMind working paper, October 29, 2026, 108 pages; https://storage.googleapis.com/deepmind-media/papers/organizing-intelligence.pdf) and its companion DeepMind Institute essay, "The Economics of Intelligence" (October 29, 2026; https://institute.deepmind.com/essays/the-economics-of-intelligence/). The framing is in `apps/mk-agent-studies/content/orchestration-across-industries/README.md` ("Orchestration across industries"), essay `07-software-orchestration-and-agent-platforms.md` ("From blackboards to harnesses"), essay `03-the-firm.md` ("The firm as an agent system", which also describes a different May 2026 DeepMind primer by Martin Gonzalez with the same title), and the commissioning brief `apps/mk-agent-studies/_context/20261101-orchestration-essays-brief.md`. I opened both today: the paper's first page names the three authors and the date, and its abstract calls organizations "the key unit of economic production" and distinguishes competence ("shifts productivity levels") from coordination ("governs how productivity scales with size"); the essay names the same authors and date and says it draws on the paper. This list does not repeat that framing. The connection is that the engineering essays above (the research system, the C compiler, Managed Agents) are first-hand cases of the coordination layer the economists model. The Lab's week 9 planning (`ll-weeks/fall-2026/09-ending-20261106/weekly-doc.md`) also refers to them.

**Already cited elsewhere in the Lab.**

- Research note 02, "Simulations of people" (`research/notes/02-simulations-of-people.md`), cites Generative Agents (arXiv 2304.03442) among about twenty sources; none of the Anthropic essays or the other papers above.
- Research note 07, "How ensembles fail, and how to watch them" (`research/notes/07-how-ensembles-fail-and-how-to-watch-them.md`), cites the MAST paper (arXiv 2503.13657), Du et al.'s multi-agent debate (arXiv 2305.14325), and Anthropic's multi-agent research system essay.
- The week 9 glossary (`research/glossary.md`) links Building effective agents, the multi-agent research system, ReAct, and Generative Agents.
- `apps/mk-agent-studies/content/orchestration-across-industries/07-software-orchestration-and-agent-platforms.md` cites Building effective agents, the Agent Skills essay, ReAct, and AutoGen; essay `05-command-and-control.md` ("Intent, not instructions") cites Building effective agents and the research system.
- `_context/projects/50-in-focus/ll-weeks/fall-2026/06-ending-20261016/research/07-black-boxing-abstraction-and-agent-skills.md` ("Black boxing, abstraction, and agent skills") cites the Agent Skills essay.

New to the Lab's reading in this list: Toolformer, Reflexion, CAMEL, MetaGPT, Voyager, SWE-agent, OpenAI's practical guide, and the Anthropic essays on tools, context engineering, the Agent SDK, long-running harnesses, evals, the C compiler, harness design, Managed Agents, and the Claude Code best-practices page.

## Could not open

- **Google, "Agents" whitepaper** (Julia Wiesinger, Patrick Marlow, Vladimir Vuskovic; September 2024 according to secondary sources). The official Kaggle page, https://www.kaggle.com/whitepaper-agents, loaded with a title only and no text or PDF link; search returned only secondary summaries. Not listed as read.
- **OpenAI guide landing page**, https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/: HTTP 403. The PDF itself opened and is annotated above.
- **The original April 2025 text of "Claude Code: Best practices for agentic coding"**: the URL now redirects to the current docs page, so the 2025 version was not read.
- **Three of the 27 engineering articles** the index header counts were not displayed on the index page today.
