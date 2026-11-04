---
title: "A glossary of orchestration: agents, loops, graphs, and the people who run ensembles"
description: Core terms for designing a theater of agents, each with its meaning in AI engineering, its meaning in a human practice where it has one, and an example from a student's ensemble.
author: claude (RS research pane, TDM 155AI week 9)
date: 2026-11-04
status: "batches 1 and 2; agent research, check before citing"
order: 0
---

# A glossary of orchestration

Terms for class 9 of TDM 155AI, *agents, systems, orchestration*, with directing, producing, and choreography in the background. Batch 1 (33 core terms) follows the class sequence: the smallest loop, the small graph, how much the model decides, running without you, and the theater (the cast, the producers, the observers). Batch 2 (58 more) follows the research notes: the products as of today, simulations of people, producers and game masters, scores and choreography, and labs, startups, and coaches, plus a few more building blocks.

Each entry has four parts. **In AI engineering** gives the term as builders of agent systems use it. **In human practice** gives its meaning in music, theater, film, television, or another field where people orchestrate other people. **In the theater of agents** is a one-line example from the kind of system you are building this week: an ensemble of characters (system 1), the producers who write into it (system 2), and the observers who read both (system 3). **Sources** says where each claim comes from and how far it has been checked.

How the sources are marked:

- **read Nov 4**: the page was read on November 4, 2026, and the quoted words are on it.
- **Nov 1 essay**: taken from the Lab's *Orchestration across industries* essays (drafted by research agents on November 1, 2026, in the `mk-agent-studies` repository) and not re-read today.
- **unverified**: general background, not checked against a source today.

Product details change weekly. Every product claim carries a date. The research notes linked below go further than the glossary on each topic.

## The smallest unit: one agent in a loop

### Agent

**In AI engineering.** A system in which a language model decides its own next step: which tool to call, what to try next, when it is done. Anthropic's working definition: agents are "systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks," and in practice "typically just LLMs using tools based on environmental feedback in a loop." The word is also used loosely for any LLM with a role and a prompt, and in this class that looser sense is fine as long as you can say which parts the model decides and which parts you wired.

**In human practice.** Someone who acts on another's behalf: a talent agent, a travel agent, an insurance agent. Economics studies the gap between what the agent does and what the principal wants (the principal–agent problem). The everyday sense of "agency," the capacity to act on one's own, comes along with the word and is part of why it is persuasive.

**In the theater of agents.** Each character in your cast is an agent: a role card (its prompt), the transcript so far (its context), and a turn in which it decides what to say.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents), Dec 19, 2024 (read Nov 4; the page now notes that "much of the tooling landscape described in this post has changed since December 2024"). Principal–agent sense: Nov 1 essay 03, "The firm as an agent system."

### Augmented LLM

**In AI engineering.** The building block underneath every agent and workflow: one model call given extra capacities. Anthropic: "an LLM enhanced with augmentations such as retrieval, tools, and memory." A **tool** is a function the model can ask the program to run (search, read a file, roll a die, post a message); the program runs it and hands the result back.

**In human practice.** A performer with a prop table, a script supervisor with the continuity book, a reporter with a phone and a clip file: the person plus what is within reach.

**In the theater of agents.** Give one character a tool, such as a die to roll or a diary to read from, and watch how its lines change.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4).

### Loop

**In AI engineering.** The cycle that makes a single model call into an agent: think, act, observe the result, and go again until done. The pattern is often called **ReAct**, after Yao et al., whose paper had models "generate both reasoning traces and task-specific actions in an interleaved manner." BabyAGI and AutoGPT, both from spring 2023, made the open-ended loop famous. So did the "endless loop" that the graph frameworks were later pitched as a way to tame. A coding harness such as Claude Code is a loop: it keeps calling tools until it has an adequate answer.

**In human practice.** Rehearsal: run the scene, get a note, run it again. In music the loop is the repeat sign, or the vamp the band holds until the singer comes in.

**In the theater of agents.** Class step 0a: one agent loops until it reaches an easy goal. In a game of Taboo, for example, one character must get another to say a word without saying it, and the loop runs until the word is said (a proposal accepted for class).

**Sources.** Yao et al., ["ReAct: Synergizing Reasoning and Acting in Language Models"](https://arxiv.org/abs/2210.03629), first version Oct 6, 2022 (read Nov 4). BabyAGI and AutoGPT dates (Mar 28 and Mar 30, 2023): Story of Week 9 canvas, Nov 2, citing [agentichistory.org](https://agentichistory.org/history.html) (not re-read). Harness-as-loop: Marlon's words on the same canvas, Nov 2.

### Stop condition

**In AI engineering.** The rule that ends a loop: the goal is met, a judge approves, or a limit is reached. Anthropic: "The task often terminates upon completion, but it's also common to include stopping conditions (such as a maximum number of iterations) to maintain control." A good stop condition can be checked by something other than the agent that wants to stop, such as a second model acting as judge, a test, or a word match.

**In human practice.** The director's "cut," the stage manager's "hold," the conductor's cutoff, the referee's whistle. In each case the person who ends the action is not the one performing it.

**In the theater of agents.** Class step 2: a director agent reads each round and answers one question, whether the narrative goal has been reached. That answer is the stop condition.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4). Human-practice examples: unverified, general knowledge.

### Cap

**In AI engineering.** A hard limit that ends a run whatever the agent thinks: maximum turns, maximum tokens or dollars, maximum time. LangGraph, for example, has a **recursion limit** that "caps how many super-steps one run may execute" and raises an error when it is exceeded. Caps are what make it safe to let agents talk to each other: two agents that each reply to the other will otherwise run until someone pays the bill.

**In human practice.** The running time of a broadcast, the shot clock, the budget line, the union-mandated turnaround between shooting days.

**In the theater of agents.** Set a maximum number of turns, a cost ceiling, and a stop button for every run (a proposal accepted for class: "caps everywhere").

**Sources.** LangChain, [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api), recursion limit section (read Nov 4). Class design, Nov 4.

## The small graph: nodes, edges, routing, state

### Graph

**In AI engineering.** A system drawn as boxes and arrows: the boxes (nodes) do work, and the arrows (edges) say what runs next. LangGraph: it "models agent workflows as graphs built from three parts": state, nodes, and edges. A graph can be fixed in advance (a pipeline), branch on a decision (routing), or contain cycles (loops). Visual builders such as n8n and OpenAI's Agent Builder let you draw the graph. OpenAI's Agent Builder is scheduled to shut down on November 30, 2026 (rechecked Nov 4), so don't build on it.

**In human practice.** A flowchart, a production schedule, an org chart, a football play diagram, a dance floor pattern: any drawing of who passes what to whom.

**In the theater of agents.** Class step 0b: a three-node graph in which one node (a switch) decides which of two others runs next.

**Sources.** LangChain, [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api) (read Nov 4). Agent Builder shutdown: OpenAI, [deprecations](https://developers.openai.com/api/docs/deprecations) (rechecked Nov 4 in [research note 01](notes/01-agent-products-as-of-nov-4.md)).

### Node

**In AI engineering.** One step in a graph. In LangGraph nodes are "functions that read state, do work, and return updates." A node might call a model (classify, summarize, critique, rewrite, generate an image), run ordinary code (an if-then, a counter, a date check, a lookup), wait for a trigger, or send output somewhere (post to Slack, write a row to a sheet).

**In human practice.** A station: a cook's station in the brigade, a department on a film crew, a desk in a newsroom.

**In the theater of agents.** Each character is a node, and so is the director who checks the goal and the producer who announces the vote.

**Sources.** LangChain, [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api) (read Nov 4). Node families: Story of Week 9 canvas, Nov 2 (Claude's list, which Marlon called "good").

### Edge

**In AI engineering.** A connection that says where control goes after a node. LangGraph distinguishes "**normal edges**," which "always go from one node to the next," from "**conditional edges**," which "call a function to determine the next node(s)."

**In human practice.** A handoff on the line: the pass in a kitchen, a cue from one performer to the next, a pass in a relay.

**In the theater of agents.** In a fixed round-robin every edge is normal: A, then B, then C. Once the producer chooses who speaks next, the edges become conditional.

**Sources.** LangChain, [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api) (read Nov 4).

### Router (switch)

**In AI engineering.** A node that decides which branch runs next. Anthropic's routing pattern "classifies an input and directs it to a specialized followup task." The decision can be made by a model or by plain code reading a field of structured output. In LangGraph a conditional edge calls a routing function that "receives the current graph state" and returns "the name of the next node."

**In human practice.** The triage nurse, the dispatcher, the assignment editor, the stage manager deciding which cue is next.

**In the theater of agents.** A small producer that reads the last line and picks who speaks next: whoever was insulted, or whoever has been silent longest.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4); LangChain, [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api) (read Nov 4).

### State

**In AI engineering.** What the system knows and carries between steps: the transcript, scores, flags, whose turn it is. LangGraph: "State is the shared data that nodes read and update." Designing a system is mostly deciding what goes into state and who may read or write each part.

**In human practice.** The scoreboard, the call sheet, the prompt book with every cue marked, the continuity notes. The Nov 1 essay on production crews calls the call sheet "one of the most successful pieces of shared state ever designed."

**In the theater of agents.** Alliances, a secret each character holds, a vote tally, an "applause meter": numbers that change over the run and show up on your dashboard.

**Sources.** LangChain, [LangGraph Graph API](https://docs.langchain.com/oss/python/langgraph/graph-api) (read Nov 4). Call sheet: Nov 1 essay 04, "Call sheets and cue lights."

## How much the model decides

### Workflow vs. agent

**In AI engineering.** The distinction Anthropic drew in December 2024. "Workflows are systems where LLMs and tools are orchestrated through predefined code paths," and agents are systems where LLMs "dynamically direct their own processes." Anthropic calls both "agentic systems" and names five workflow patterns: prompt chaining, routing, parallelization (sectioning and voting), orchestrator-workers, and evaluator-optimizer. In practice most real systems mix the two, with fixed paths where reliability, cost, or an audit trail matters and model choice elsewhere.

**In human practice.** A recipe against a chef; a blocked scene against an improvised one; a scripted radio essay against an unscripted interview.

**In the theater of agents.** A round-robin of characters is a workflow. When a character can decide to leave the scene or call for a vote, it starts to be an agent.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4). Mixing for reliability and audit trails: Story of Week 9 canvas, Nov 2 (Claude's suggestion).

### Agency

**In AI engineering.** In the Lab's working frame (three parts, Nov 1), agency is choice: whether the model decides the path or you wired it in advance. Vendors often call this "autonomy." CrewAI, for example, calls crews "autonomous" when it means they choose their own steps, so read product copy carefully.

**In human practice.** How much latitude a performer, soldier, or employee has. Mission command gives subordinates the commander's intent and leaves the how to them.

**In the theater of agents.** Turn agency up by letting characters choose whom to address and when to stay silent. Turn it down by fixing the order.

**Sources.** The three-part frame: weekly doc, "the theme: agents and systems" (terms proposed by Claude, agreed by Marlon, Nov 1). CrewAI usage and mission command: Nov 1 essays 07 and 05.

### Orchestration

**In AI engineering.** Coordinating many steps, tools, and agents in one run: who does what, in what order, in parallel or in sequence. In the Lab's frame it names the complexity of a single run ("the product of many intelligences," Marlon). In software, Chris Peltz (2003) defined orchestration as a process owned and run by one party that calls others in a defined order.

**In human practice.** In music, orchestration is "the study or practice of writing music for an orchestra": assigning each line to the instrument suited to it, a design-time job. Running the performance is **conducting**, which became a separate job only around 1820, when, by one account, "it became the norm to have a dedicated conductor who did not also play an instrument." The useful lesson: decide the parts before the run, and conduct during it.

**In the theater of agents.** Orchestration is casting your characters' parts (who is cynical, who knows the secret) before you press run. Conducting is the director agent keeping time during the run.

**Sources.** Peltz, ["Web Services Orchestration and Choreography"](https://jmvidal.cse.sc.edu/library/peltz03a.pdf), *IEEE Computer*, 2003 (Nov 1 essay 07, from summaries). Orchestra and conducting quotations: Wikipedia, ["Orchestration"](https://en.wikipedia.org/wiki/Orchestration) and ["Conducting"](https://en.wikipedia.org/wiki/Conducting), via Nov 1 essay 04. Lab frame: weekly doc, Nov 1.

### Choreography

**In AI engineering.** Coordination with no conductor: each participant knows its own part and reacts to messages from the others, and nobody runs the whole. Peltz (2003) contrasted it with orchestration. Agent systems that simply let agents reply to each other in a shared channel are choreographed, which is why they need turn limits.

**In human practice.** Composing movement for dancers, and the score or notation that records it so it can be taught and restaged. In performance the dancers carry it themselves: they keep counts, watch each other, and take cues from the music. There is no conductor in front of them. William Forsythe calls choreography "an organizational practice." In his *One Flat Thing, reproduced* the dancers give and receive more than 200 cues from each other (mapped by Ohio State's *Synchronous Objects*, 2009). [Research note 04](notes/04-choreography-scores-and-conducting.md) covers notation, chance procedures, and game pieces.

**In the theater of agents.** Give every character a rule ("speak when someone mentions money," "never speak twice in a row") and no producer. Then see whether a scene emerges or a loop does.

**Sources.** Peltz 2003, as above (Nov 1 essay 07). Dance sense and Forsythe: [research note 04](notes/04-choreography-scores-and-conducting.md) (Forsythe's essay and *Synchronous Objects* read Nov 4).

### Orchestrator–workers

**In AI engineering.** One agent breaks the task down, hands the parts to workers, and puts their results together. Anthropic: "a central LLM dynamically breaks down tasks, delegates them to worker LLMs, and synthesizes their results." Claude Code's subagents and Grok Bot's "chief of staff" over specialists are versions of it (Grok Bot as described in its Aug 11, 2026 announcement).

**In human practice.** The first assistant director running the set, the managing editor assigning stories, the PI dividing a project among the lab.

**In the theater of agents.** A showrunner agent that writes each episode's beats and hands one beat to each character to perform.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4). Grok Bot: SpaceXAI, ["Introducing Grok Bot"](https://x.ai/news/introducing-grok-bot): "A chief of staff sits on top, with a specialist for each lane" (read Nov 4 in [research note 01](notes/01-agent-products-as-of-nov-4.md)).

### Evaluator–optimizer

**In AI engineering.** A loop of two roles: one call generates, another critiques, and the generator revises. Anthropic: "one LLM call generates a response while another provides evaluation and feedback in a loop." It is the pattern behind the translation series (translate, critique, translate again) and the AI-detection loop the Lab sketched on Nov 1.

**In human practice.** The editor and the writer, the workshop critique, peer review, Pixar's Braintrust (critique without authority, per Nov 1 essay 04), the director's notes after a run-through.

**In the theater of agents.** A critic character watches each scene and gives notes, and the cast plays it again.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4). Translation and detection loops: Story of Week 9 canvas, "Sample use cases (Nov 1)."

### Handoff

**In AI engineering.** Passing control of a conversation from one agent to another. OpenAI's Agents SDK: "Handoffs allow an agent to delegate tasks to another agent," and "handoffs are represented as tools to the LLM": the model hands off by calling a tool.

**In human practice.** A relay baton, the shift handoff in a hospital (structured scripts such as SBAR and I-PASS), "you have control" in a cockpit, the moment a tag-team wrestler leaves the ring.

**In the theater of agents.** A character who says "ask my lawyer" and actually passes the scene to another agent.

**Sources.** OpenAI, [Agents SDK: Handoffs](https://openai.github.io/openai-agents-python/handoffs/) (read Nov 4). Hospital and cockpit handoffs: Nov 1 essay 05.

## Running without you

### Autonomy

**In AI engineering.** In the Lab's frame, autonomy means the system runs without a person starting each run: "always on, always running; on a loop or cron, … setting the agents free to continue running themselves and launching each other" (Marlon, Nov 1). The products of 2026 sell it under the names *always-on*, *proactive*, *background*, and *ambient* agents.

**In human practice.** A night watch, a standing order, a crew that keeps working after the director goes home.

**In the theater of agents.** Leave your ensemble running over the week on a schedule, so the soap opera has new episodes every morning (with caps).

**Sources.** Weekly doc, "the theme: agents and systems" (Nov 1). Product vocabulary: Nov 1 essay 07, section 11, and [research note 01](notes/01-agent-products-as-of-nov-4.md) (Nov 4).

### Trigger

**In AI engineering.** What starts a run: a person typing, a mention, a new file, a message in a channel, a schedule, a sensor. Marlon on Nov 2: the Grok reply bot on X ("is this tweet right") is "single prompt in, single prompt out, … just triggered by mentions," and the trigger is "one dimension of agents."

**In human practice.** A cue: the light cue, the downbeat, the "action!" call, the doorbell that sends the butler on.

**In the theater of agents.** A character that speaks only when its name is said, or a producer that wakes when the transcript passes fifty lines.

**Sources.** Story of Week 9 canvas, "First test with the LLUFs: what agents are" (Nov 2).

### Heartbeat

**In AI engineering.** A timer that wakes an agent at a set interval to check whether there is work. OpenClaw made it famous with a `HEARTBEAT.md` checklist read every 30 minutes. OpenClaw's documentation, re-read on Nov 4, 2026, says "Heartbeat monitoring now uses ordinary automation jobs": one "Proactive check" every 30 minutes by default, and "Return `NO_REPLY` when a check has no visible update." Nous Research's Hermes Agent uses built-in cron jobs instead. The design detail worth keeping is the quiet return: an agent that speaks only when something has changed.

**In human practice.** The canonical hours of a monastery, the night nurse's rounds, the daily standup, the stage manager's half-hour call.

**In the theater of agents.** A gossip columnist who wakes every hour, reads the transcript, and posts only if there is news.

**Sources.** OpenClaw docs, [Heartbeat](https://docs.openclaw.ai/gateway/heartbeat) (read Nov 4 in [research note 01](notes/01-agent-products-as-of-nov-4.md)); Hermes cron: same note. Monastery's hours: weekly doc, ensembles brainstorm.

### Harness

**In AI engineering.** The program around a model that turns it into a working agent. It runs the loop, gives the model its tools and files, loads instruction files and skills, enforces permissions, and keeps the log. Claude Code, Codex, OpenClaw, and Hermes are harnesses. The Lab's Oct 24 readings (harnesstax) argue that the same model can cost several times more in one harness than another. Marlon's Nov 2 point: many agents are "just text, just markdown files," and "the loop is the harness loop."

**In human practice.** The theater building and its crew: the stage, the lights, the rail, the call board, everything that lets an actor just act.

**In the theater of agents.** The class app is your harness. You write the characters, and it runs the turns, keeps the log, and enforces the caps.

**Sources.** Story of Week 9 canvas, Nov 2 (Marlon). [harnesstax](https://harnesstax.github.io/) (posted Oct 24; not read for this glossary).

### Human in the loop

**In AI engineering.** A point where the system pauses for a person to approve, edit, or choose before it continues. LangGraph implements it with **interrupts**, which "pause graph execution at specific points and wait for external input," saving the state so the run can resume. The 2026 consumer agents are built around it. OpenAI's dots let you set each kind of action to "Take action without asking," "Take action when you say so," "Ask before taking action," or "Hand off to you"; Grok Bot's bots "only come back when something needs your approval"; Meta's Muse "checks with the person before sensitive actions"; and Anthropic's Claude Duet waits for approval before it sends, pays, signs, or deletes (all as of Nov 4).

**In human practice.** The producer's sign-off, the editor's approval, the surgical time-out before the first cut.

**In the theater of agents.** Pause before each elimination so you, as the network executive, can veto it.

**Sources.** LangChain, [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) (read Nov 4). Product approval flows: [research note 01](notes/01-agent-products-as-of-nov-4.md) (vendor pages read Nov 4, except OpenAI's, which refused; dots wording is from OpenAI's learn.chatgpt.com docs).

### Guardrail

**In AI engineering.** A check that runs before or after an agent to block or repair what it should not do. OpenAI's Agents SDK: "Guardrails enable you to do checks and validations of user input and agent output," with input guardrails on what comes in and output guardrails on what goes out.

**In human practice.** Standards and practices at a network, the broadcast delay, the fact-checker, the stage combat choreographer's rules.

**In the theater of agents.** An output check that stops any character from naming a real person, or from repeating a line it has already said.

**Sources.** OpenAI, [Agents SDK: Guardrails](https://openai.github.io/openai-agents-python/guardrails/) (read Nov 4).

## The theater: cast, producers, observers

### Ensemble (multi-agent system)

**In AI engineering.** Several agents working in one system, each with its own role and prompt, sharing some state. Frameworks model this differently: as a conversation among agents (AutoGen), a crew of roles under a manager (CrewAI), handoffs (OpenAI Agents SDK), or a hierarchy with workflow agents (Google's ADK).

**In human practice.** A company of actors, a jazz combo, a writers' room, a heist crew: a group whose parts are designed to work together. The Lab's brainstorm lists dozens, from the nine Muses to the kitchen brigade.

**In the theater of agents.** System 1, your cast: the characters you design, talking to each other.

**Sources.** Framework metaphors: Nov 1 essay 07, section 15. Brainstorm: weekly doc, "ensembles: the semi-playful brainstorm."

### Persona (character card)

**In AI engineering.** The role an agent plays, set mostly in its system prompt: who it is, what it wants, how it talks, what it must not do. In a harness the persona is often a Markdown file. Park et al.'s *Generative Agents* (2023) seeded each of its 25 Smallville residents with a short paragraph of identity and relationships.

**In human practice.** The character breakdown in a casting call, the commedia dell'arte stock type, the actor's backstory, the reality-show archetype a casting producer looks for.

**In the theater of agents.** Write each character's wants, secrets, and verbal tics, and give two of them wants that conflict.

**Sources.** Park et al., ["Generative Agents: Interactive Simulacra of Human Behavior"](https://arxiv.org/abs/2304.03442), 2023 (the 25 residents, memory, reflection, and planning are detailed in [research note 02](notes/02-simulations-of-people.md)). Marlon on agents as Markdown files: Story of Week 9 canvas, Nov 2.

### Turn-taking (round-robin)

**In AI engineering.** The rule for who speaks next. The simplest is a fixed rotation. Others let a manager pick the speaker, let the last speaker hand off, or let each agent bid. AutoGen's group chats offered round-robin and manager-selected speakers (unverified for current versions).

**In human practice.** Parliamentary procedure, the talking stick, the order of solos in a jazz tune, the fixed order of a panel.

**In the theater of agents.** Class step 1, ten turns each in a fixed order, is the baseline. Every later step changes who goes next.

**Sources.** Class design, Nov 4. AutoGen speaker selection: unverified.

### Director

**In AI engineering.** Not a standard technical term. In this class it names the agent that holds the goal and decides whether the run has reached it: a judge, or the stop condition given a role.

**In human practice.** In theater and film, the person responsible for the interpretation of the whole, who works mostly in rehearsal and gives notes. On a film set, the running of the day falls to the first assistant director, so interpretation and timekeeping are separate jobs.

**In the theater of agents.** Class step 2: the director reads each round and says "not yet" or "that's the ending."

**Sources.** Class design, Nov 4. Director vs. first AD: Nov 1 essay 04.

### Producer

**In AI engineering.** Not a standard technical term. In this class it names a layer of agents that write into the cast's world without being characters in it: they set challenges, introduce twists, call votes, and run confessionals. In the Anthropic patterns a producer is close to an orchestrator or a router.

**In human practice.** In reality television, producers cast for conflict, design challenges and eliminations, conduct confessional interviews, and story producers shape the season in the edit. [Research note 03](notes/03-reality-tv-and-game-masters.md) covers this in detail.

**In the theater of agents.** System 2: producers who "write into system 1."

**Sources.** Class design, Nov 4 (Marlon's graph of graphs). Reality-TV detail: [research note 03](notes/03-reality-tv-and-game-masters.md).

### Confessional

**In AI engineering.** Not a standard term. In this class it names a channel of private output that other agents cannot read: the character's aside to camera. It serves as hidden state, because the character can want or plan things the others don't know, and as an inspection device, because you can read what a character "thinks."

**In human practice.** In reality TV, the interview a cast member gives to camera away from the others, often prompted by a producer and cut into the episode to narrate or contradict the action.

**In the theater of agents.** Every character gets a public line and a private aside each turn. The observers read the asides, and the other characters never see them.

**Sources.** Class design, Nov 4 (Claude's proposal, accepted). Reality-TV practice: [research note 03](notes/03-reality-tv-and-game-masters.md).

### Event log (trace)

**In AI engineering.** The record of a run: every step with its input, output, timing, cost, and errors. Tracing tools such as LangSmith and the OpenAI Agents SDK's traces exist because multi-agent runs are impossible to debug from the final output alone. The mk-agent-studies runtime returns a full trace for every run (Nov 1 essay 07).

**In human practice.** The stage manager's show report, the script supervisor's notes, the ship's log, the lab notebook, the dailies.

**In the theater of agents.** One line per event (layer, speaker, text, state changes, cost) in a single shared format from the first run, so that the same visualizer and the same observers work on anyone's system (a proposal accepted for class).

**Sources.** Class design, Nov 4. mk-agent-studies runtime: Nov 1 essay 07, section 16. LangSmith and SDK tracing: unverified today.

### Observer (observability)

**In AI engineering.** *Observability* is the practice of making a running system's inside visible through logs, traces, metrics, and dashboards. An observer agent goes one step further. It reads the log and interprets it: it summarizes, flags loops, scores, and explains. Observers read the system but do not change it.

**In human practice.** The Greek chorus, the critic, the sports commentator, the film session where a team watches game tape, the ethnographer.

**In the theater of agents.** System 3: inspectors, critics, and a chorus that read systems 1 and 2 into a dashboard. As an option, close the loop by letting the producers read the observers' report and chase the ratings.

**Sources.** Class design, Nov 4 (Marlon's arc; the closed loop is Claude's proposal). Observability as a practice: unverified, general knowledge.

### Graph of graphs

**In AI engineering.** A system whose nodes are themselves systems. Each agent is a loop-and-graph, a team of agents is a graph of those, and a class of teams is a graph of graphs. LangGraph supports this directly as subgraphs (unverified today). Marlon's framing for class: the cast (system 1), the producers (system 2), and the observers (system 3) together form a graph of graphs.

**In human practice.** An orchestra of sections under principals under a conductor; a film production of departments; a newsroom of desks; a league of teams.

**In the theater of agents.** Draw your three systems as three boxes, then draw the arrows between them: the producers write into the cast, and the observers read both.

**Sources.** Class design, Nov 4 (Marlon). Story of Week 9 canvas, Nov 2: "each student makes a big graph, and then there's a graph of those graphs." Orchestra sections: Nov 1 essay 04.

## Batch 2 (November 4, from the research notes)

Batch 2 gathers the glossary candidates from the five research notes and adds eight terms written in the pane. Entries from the notes keep their authors' source marks: "verified" means the subagent read the source on November 4, 2026. Read the note for the context and the full source list.

## Always on: the agent products as of November 4

Terms the 2026 products use for agents that keep working after you leave. From [research note 01](notes/01-agent-products-as-of-nov-4.md), which re-checked each product on the web on November 4, 2026.

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

## Simulations of people

From game theory, agent-based models, and LLM agents playing characters. From [research note 02](notes/02-simulations-of-people.md).

### Agent-based model

**In AI engineering.** A simulation built from many autonomous agents, each following its own rules and reacting to its neighbors or environment, run step by step so group-level patterns can be observed. LLM multi-agent systems are a descendant in which the rules are prompts.

**In human practice.** Social scientists use them to test whether simple individual behaviors can produce observed social patterns, such as segregation or markets.

**In the theater of agents.** Give twelve townspeople one rule each about whom they talk to next, and let the observers watch for cliques.

**Sources.** [NetLogo Segregation model](https://ccl.northwestern.edu/netlogo/models/Segregation) (verified); [Brookings, Growing Artificial Societies](https://www.brookings.edu/book/growing-artificial-societies/) (verified)

### Emergence

**In AI engineering.** Behavior of a system as a whole that no single component was programmed to produce, such as information spreading through a town of agents or a werewolf player inventing a bluff.

**In human practice.** Flocks, traffic jams, and neighborhoods that sort themselves without a planner.

**In the theater of agents.** The director never mentions a rivalry, but by round 7 two producers are undercutting each other; an observer names it.

**Sources.** [Reynolds 1987](https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87) (verified); [Park et al. 2023](https://arxiv.org/abs/2304.03442) (verified)

### Tit for Tat

**In AI engineering.** A strategy for repeated games: cooperate first, then copy the other player's last move. It won both of Axelrod's tournaments, though later work shows its success depends on the scoring and noise.

**In human practice.** Reciprocity: return a favor, answer a slight, and let it go once the other side relents.

**In the theater of agents.** One contestant's prompt says "start friendly, then mirror whatever the last person did to you."

**Sources.** [Axelrod 1980 (EconPapers)](https://econpapers.repec.org/RePEc:sae:jocore:v:24:y:1980:i:3:p:379-403) (verified); [Knight et al. 2025](https://arxiv.org/html/2510.15438v1) (verified)

### Tournament

**In AI engineering.** A structured evaluation in which every entry meets every other under fixed rules and a published scoring function, so strategies can be ranked against one another rather than against a fixed benchmark.

**In human practice.** Round-robin leagues, chess tournaments, and reality-show challenges.

**In the theater of agents.** Every character negotiates once with every other; a scorekeeper agent tallies points and the dashboard shows the leaderboard.

**Sources.** [Rapoport, Seale, and Colman 2015](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0134128) (verified)

### Memory stream

**In AI engineering.** A running log of an agent's observations, reflections, and plans as natural-language records with timestamps, from which the most recent, important, and relevant items are retrieved into the prompt.

**In human practice.** A diary or a production log.

**In the theater of agents.** Each character keeps a JSON list of what it saw; before speaking, it retrieves the three highest-scoring memories.

**Sources.** [Park et al. 2023](https://arxiv.org/abs/2304.03442) (verified)

### Reflection

**In AI engineering.** A step in which an agent reviews recent memories, asks itself questions, and writes higher-level conclusions back into memory; in Smallville it fires when accumulated importance passes a threshold.

**In human practice.** A confessional, a journal entry, a debrief.

**In the theater of agents.** After a dramatic round, each contestant records a private "confessional" that shapes its next move and feeds the observers.

**Sources.** [Park et al. 2023](https://arxiv.org/abs/2304.03442) (verified); [Xu et al. 2023](https://arxiv.org/abs/2309.04658) (verified)

### Hidden role

**In AI engineering.** Private information assigned to an agent (its team, goal, or power) that other agents must infer from behavior, used to test deception, trust, and inference.

**In human practice.** Werewolf, Mafia, Secret Hitler, and the mole on a reality show.

**In the theater of agents.** One of the six housemates is secretly the saboteur; observers log their guesses each round.

**Sources.** [Xu et al. 2023](https://arxiv.org/abs/2309.04658) (verified)

### Silicon sample

**In AI engineering.** Using a language model conditioned on persona or demographic backstories to stand in for human survey respondents or experimental subjects; how well it matches real people has to be measured case by case.

**In human practice.** None in particular.

**In the theater of agents.** An "audience" of twenty persona agents votes on which character to keep, and the class asks whether those votes resemble theirs.

**Sources.** [Argyle et al. 2023](https://arxiv.org/abs/2209.06899) (verified via the mk-agent-studies note, not reread); [Park et al. 2024](https://arxiv.org/abs/2411.10109) (verified)

### Caricature

**In AI engineering.** A failure of simulated personas that exaggerate a few stereotyped traits of their group and lose individuality; measured in CoMPosT as low individuation plus exaggeration.

**In human practice.** The stock character, the cartoon.

**In the theater of agents.** An observer agent flags any line that could have been said by every character of that "type."

**Sources.** [Cheng, Piccardi, and Yang 2023](https://arxiv.org/abs/2310.11501) (verified from abstract summaries only)

## Producers and game masters

How reality television and tabletop and party games run a cast. From [research note 03](notes/03-reality-tv-and-game-masters.md).

### Story producer

**In AI engineering.** An agent that reads a run's full log after the fact and writes the narrative: what happened, to whom, and why it matters. It selects; it shouldn't invent.

**In human practice.** The reality-TV producer who finds an episode's story in the footage, outlines it, and hands editors string-outs; often called the scriptwriter of unscripted TV.

**In the theater of agents.** After 40 rounds, the story-producer agent picks the six turns that make the alliance's collapse an episode.

**Sources.** [Wrapbook](https://wrapbook.com/blog/what-does-a-story-producer-do-on-reality-tv) (verified); [reality blurred](https://www.realityblurred.com/realitytv/2015/09/reality-tv-story-producer-job-explained/) (verified)

### Frankenbite

**In AI engineering.** A quotation assembled from fragments of different turns, presented as one utterance. In an agent log it is trivial to make and impossible to detect without turn IDs.

**In human practice.** An interview line spliced from pieces recorded at different times; defended as time compression, criticized as putting words in mouths.

**In the theater of agents.** The class rule: observers may quote only whole turns with IDs, and the dashboard flags any spliced quote.

**Sources.** [The A.V. Club](https://www.avclub.com/how-reality-tv-gets-written-1798239001) (verified); [A Way with Words](https://www.waywordradio.org/frankenbite_3/) (verified)

### String-out

**In AI engineering.** An ordered list of log references (turn IDs, timestamps) handed from a selecting agent to a writing or rendering agent; the evidence trail beneath a summary.

**In human practice.** A sequence of shots a story producer assembles for an editor as a road map, not a finished edit.

**In the theater of agents.** The observer writes `string-out.json` (turns 12, 15, 31, confessional 4) before drafting the episode recap.

**Sources.** [Reality 101, "The Perfect Stringout"](https://frankenbiter.blogspot.com/2011) (verified)

### Casting

**In AI engineering.** Persona design: choosing which characters exist and writing their system prompts so that their goals and temperaments produce interaction worth reading.

**In human practice.** Choosing a reality cast for type and conflict, from thousands of applicants, sometimes with villains in mind.

**In the theater of agents.** Rerun the same format with one character recast from cautious to reckless and compare the transcripts.

**Sources.** [VICE](https://vice.com/en/article/theres-100-manipulation-the-inner-workings-of-reality-tv-according-to-a-producer) (verified); [Wikipedia, The Real World](https://en.wikipedia.org/wiki/The_Real_World_(TV_series)) (verified)

### Format bible

**In AI engineering.** The rules file the producer and moderator agents read: phases, challenges, scoring, elimination, twists, and which parts may vary.

**In human practice.** The production manual licensed with a TV format so another company can make a local version without the creator.

**In the theater of agents.** `format.md` defines three rounds of challenge, vote, and elimination, and lists the twists the producers may inject.

**Sources.** [Vitrina](https://vitrina.ai/blog/tv-format-bible-commissioned-2026/) (verified; marketing source)

### Twist

**In AI engineering.** An injected event: the orchestrator changes the environment or rules at a set time or trigger, and the change is logged as an intervention.

**In human practice.** A mid-game rule change in competition reality TV, such as hidden immunity idols, Exile Island, or fake evictions.

**In the theater of agents.** At round 4 the producers announce that the next vote is secret and the loser picks who goes home.

**Sources.** [Wikipedia, Survivor (franchise)](https://en.wikipedia.org/wiki/Survivor_(franchise)) (verified); [Wikipedia, Big Brother (franchise)](https://en.wikipedia.org/wiki/Big_Brother_(franchise)) (verified)

### Elimination

**In AI engineering.** Removing an agent from the active set by a rule (a vote, a score), which changes every remaining agent's context.

**In human practice.** Voting a player out at Tribal Council or evicting a housemate by public vote.

**In the theater of agents.** The moderator tallies the characters' votes and removes the loser, who gives one final confessional.

**Sources.** [Wikipedia, Survivor (franchise)](https://en.wikipedia.org/wiki/Survivor_(franchise)) (verified)

### Game master

**In AI engineering.** An adjudicating agent that holds the world state, plays the non-player parts, and rules on what each character's action does.

**In human practice.** The referee and storyteller of a tabletop role-playing game, the Dungeon Master in D&D (1974).

**In the theater of agents.** A character says it searches the vault; the GM agent decides what it finds and tells only that character.

**Sources.** [Wikipedia, Dungeons & Dragons](https://en.wikipedia.org/wiki/Dungeons_%26_Dragons) (verified); [Wikipedia, Gamemaster](https://en.wikipedia.org/wiki/Gamemaster) (verified)

### Moderator

**In AI engineering.** A deterministic or mostly deterministic referee that assigns secret roles, runs phases, collects private actions, and posts public announcements.

**In human practice.** The non-playing narrator of Mafia or Werewolf, who knows every role and runs the night and day phases.

**In the theater of agents.** The moderator script whispers each character its secret role, then announces each morning who left the house.

**Sources.** [Wikipedia, Mafia (party game)](https://en.wikipedia.org/wiki/Mafia_(party_game)) (verified); [Xu et al. 2023](https://arxiv.org/abs/2309.04658) (verified) (from research note 02, on LLM Werewolf).

### Hidden information

**In AI engineering.** State some agents can see and others can't; enforced by giving each agent only its own projection of the state.

**In human practice.** What sits behind the gamemaster's screen: notes, maps, and dice rolls the players shouldn't see.

**In the theater of agents.** Only the producers and observers see the confessionals; characters see only the public channel.

**Sources.** [Wikipedia, Gamemaster's screen](https://en.wikipedia.org/wiki/Gamemaster%27s_screen) (verified)

### Fudging

**In AI engineering.** An orchestrator silently overriding a random or rule-based outcome to steer the story; it should at least be logged.

**In human practice.** A GM rolling one result behind the screen and announcing another, usually to save a character or the evening.

**In the theater of agents.** The producers may overrule one vote per season, and the dashboard marks it as an intervention.

**Sources.** [Nerdarchy](https://nerdarchy.com/dd-dice-fudging-is-it-cheating/) (verified)

## Scores, cues, and choreography

How dance and music coordinate performers, with and without a conductor. From [research note 04](notes/04-choreography-scores-and-conducting.md).

### Score

**In AI engineering.** The full plan or shared state that one coordinator can read in its entirety: the run's script, beat list, or state document.

**In human practice.** The conductor's copy with every instrument's line, or a dance notation record of every body part over time.

**In the theater of agents.** The director agent holds the full beat sheet; no character sees it whole.

**Sources.** [Wikipedia, "Labanotation"](https://en.wikipedia.org/wiki/Labanotation) (verified); [Wikipedia, "Cue note"](https://en.wikipedia.org/wiki/Cue_note) (verified)

### Part

**In AI engineering.** The slice of context an individual agent receives: its role, goals, and only the information it needs. A form of information hiding.

**In human practice.** An individual player's sheet music, showing only their line plus cue notes from others.

**In the theater of agents.** Each character's prompt is its part: its lines so far, its secret, and its entrances.

**Sources.** [Wikipedia, "Cue note"](https://en.wikipedia.org/wiki/Cue_note) (verified)

### Cue

**In AI engineering.** An event that triggers an agent to act: a message, a state change, or another agent's output matching a condition.

**In human practice.** A signal for an entrance: a cue note in a part, a dancer's movement that another dancer answers (Forsythe's piece has more than 200), a conductor's gesture, or a wink from Sun Ra.

**In the theater of agents.** "When the detective says the word 'alibi,' the butler enters."

**Sources.** [Synchronous Objects](https://synchronousobjects.osu.edu/) (verified); [Wikipedia, "Cue note"](https://en.wikipedia.org/wiki/Cue_note) (verified)

### Rehearsal letter

**In AI engineering.** A stable, shared identifier for a point in a run (a checkpoint or anchor) that every agent can resolve in its own context, used to restart or replay.

**In human practice.** A bold letter in the score and all parts so a conductor can say "begin at letter M" instead of "bar 387."

**In the theater of agents.** The director says "back to beat C, try it angrier," and every character knows where C is.

**Sources.** [Wikipedia, "Rehearsal letter"](https://en.wikipedia.org/wiki/Rehearsal_letter) (verified)

### Notation

**In AI engineering.** A structured format for recording what agents did or should do: a schema, a trace format, a typed plan.

**In human practice.** Systems such as Feuillet (1700), Labanotation (1928), and Benesh that write movement down so it can be reproduced.

**In the theater of agents.** Each turn is logged as JSON (speaker, cue received, line, state change) so a run can be replayed or staged again.

**Sources.** [Wikipedia, "Feuillet notation"](https://en.wikipedia.org/wiki/Feuillet_notation) (verified); [Wikipedia, "Labanotation"](https://en.wikipedia.org/wiki/Labanotation) (verified); [Wikipedia, "Benesh Movement Notation"](https://en.wikipedia.org/wiki/Benesh_Movement_Notation) (verified)

### Chance procedure

**In AI engineering.** Deliberate, bounded randomness in planning: sampling from a defined menu with a recorded seed so runs vary but can be reproduced.

**In human practice.** Cunningham and Cage's use of coin tosses, the *I Ching*, and playing cards to set movement, order, and timing.

**In the theater of agents.** A producer rolls a seeded die against a list of six twists and logs the roll.

**Sources.** [Wikipedia, "Merce Cunningham"](https://en.wikipedia.org/wiki/Merce_Cunningham) (verified)

### Game piece

**In AI engineering.** A routing protocol defined as rules and signals rather than a fixed sequence; the router decides who acts and when, and participants decide what.

**In human practice.** Zorn's *Cobra*: a prompter holds up cue cards, players request calls, and "guerrilla units" may ignore the prompter.

**In the theater of agents.** The director has five cards (solo, duet, crossfade, everyone, silence); characters can request the floor; one producer holds a guerrilla card.

**Sources.** [Wikipedia, "Cobra (Zorn)"](https://en.wikipedia.org/wiki/Cobra_(Zorn)) (verified)

### Conduction

**In AI engineering.** Steering a set of free-generating agents with a small, fixed vocabulary of typed commands rather than free-text instructions.

**In human practice.** Butch Morris's method of directing improvisers with a lexicon of hand and baton signs, including "memory" to repeat or recall material.

**In the theater of agents.** The director emits only `sustain`, `repeat`, `recall #2`, or `cut`, and characters interpret each in their own voice.

**Sources.** [Wikipedia, "Butch Morris"](https://en.wikipedia.org/wiki/Butch_Morris) (verified); [Afrosonic Mapping](https://afrosonicmapping.com/2019/09/24/lawrence-d-butch-morris-1947-2013-conduction-a-liberated-subversive-vocabulary/) (verified); specific signs beyond "memory" (unverified)

### Dance captain

**In AI engineering.** An evaluator or maintainer agent that holds the spec, checks each run against it, writes corrective notes, and prepares substitutes; it does not author new material.

**In human practice.** The cast member who maintains the choreography through a run, knows every track, and rehearses swings and replacements.

**In the theater of agents.** An observer agent compares each scene to the character bible and passes notes to the next run.

**Sources.** [Broadway News, "Little-known theater jobs: dance captain"](https://www.broadwaynews.com/little-known-theater-jobs-dance-captain/) (verified)

### Setting a work

**In AI engineering.** Deploying a fixed design onto a new set of models or agents: same spec, new performers, with someone checking the result against the reference.

**In human practice.** Staging an existing dance on a new company, taught by a stager from memory or a notated score, with the rights holder's permission.

**In the theater of agents.** Run the same ensemble script on a different model and have the observer compare it to the first cast.

**Sources.** [Dance Notation Bureau, "Staging from Score"](https://www.dancenotation.org/staging-from-score/) (verified)

### Lead and follow

**In AI engineering.** A tight two-agent loop where one initiates and the other executes with a feedback channel, plus an explicit signal for a temporary role reversal.

**In human practice.** In partner dance the leader initiates through the connection, the follower responds and can style, and "hijacking" briefly reverses the roles.

**In the theater of agents.** A detective leads an interrogation; the suspect follows but may hijack once by revealing a secret.

**Sources.** [Wikipedia, "Lead and follow"](https://en.wikipedia.org/wiki/Lead_and_follow) (verified)

## Labs, startups, and coaches

How research groups, young companies, and sports teams pass control and keep records. From [research note 05](notes/05-labs-startups-and-coaches.md).

### Principal investigator (PI)

**In AI engineering.** The orchestrator that owns the direction and the budget of a multi-agent run and delegates whole sub-projects to workers that report back, rather than dictating each step.

**In human practice.** The scientist who leads a lab, secures its funding, supervises its members, and is answerable for its work; postdocs and graduate students lead the individual projects.

**In the theater of agents.** The producer hands each character a whole subplot to run and asks for a report at each heartbeat.

**Sources.** [Purdue Learning Lab handbook](https://learninglab.psych.purdue.edu/handbook/introduction/people) (verified); [Meyer lab handbook](https://jessegmeyerlab.github.io/Handbook/intro.html) (verified)

### Lab meeting

**In AI engineering.** A scheduled synchronization step in which every agent posts its progress to a shared channel that all agents (not only the orchestrator) can read and question.

**In human practice.** A regular, usually weekly meeting where lab members present data to the group and someone takes notes.

**In the theater of agents.** Every ten turns, each character summarizes what it knows to the whole cast, and the observer logs the summaries.

**Sources.** [Meyer lab handbook](https://jessegmeyerlab.github.io/Handbook/intro.html) (verified that weekly meetings with note-takers exist; format unverified)

### Peer review (referee report)

**In AI engineering.** An evaluator loop in which a critic outside the generating team judges an output against stated criteria and writes reasons, which the generator or a human then acts on.

**In human practice.** Expert review of a paper before publication; the Royal Society required a written report of fitness by 1832, and *Nature* made refereeing standard in 1973.

**In the theater of agents.** A "referee" agent that never saw the rehearsal reads the scene and the brief and writes a one-paragraph report before the producer accepts it.

**Sources.** [JSTOR Daily, 2024](https://daily.jstor.org/the-history-of-peer-review-is-more-interesting-than-you-think) (verified)

### Preregistration

**In AI engineering.** Writing the plan, the success criteria, and the stop condition before the run, so you can tell afterward what was planned and what the agents improvised.

**In human practice.** "Specifying your research plan in advance of your study and submitting it to a registry," to distinguish planned from unplanned work.

**In the theater of agents.** Before pressing run, the student commits a file saying what the scene should achieve and when it should end.

**Sources.** [Center for Open Science](https://www.cos.io/initiatives/prereg) (verified)

### Daily standup (Daily Scrum)

**In AI engineering.** A heartbeat on which each agent reports what it did, what it will do next, and what blocks it, after which the orchestrator re-plans.

**In human practice.** A 15-minute daily event to inspect progress toward the sprint goal and produce a plan for the next day of work.

**In the theater of agents.** At each heartbeat the producer asks every character the same three questions and re-casts the next beat from the answers.

**Sources.** [The Scrum Guide, 2020](https://scrumguides.org/scrum-guide.html) (verified)

### Retrospective

**In AI engineering.** An observer that runs between runs and changes the process (prompts, roles, the graph) rather than the output.

**In human practice.** The Scrum event at the end of a sprint whose purpose is "to plan ways to increase quality and effectiveness."

**In the theater of agents.** After each performance an observer reads the log and proposes one change to a character card for the next night.

**Sources.** [The Scrum Guide, 2020](https://scrumguides.org/scrum-guide.html) (verified)

### OKR (objectives and key results)

**In AI engineering.** A shared, measurable success criterion that every agent can check its work against, set before the run.

**In human practice.** A goal-setting method credited to Andy Grove at Intel and brought to Google by John Doerr in 1999: a qualitative objective with a few measurable results.

**In the theater of agents.** The producer's brief states one objective ("the audience learns the secret") and three checkable results the observer scores at the end.

**Sources.** [What Matters, "The OKR Origin Story"](https://www.whatmatters.com/stories/the-origin-story) (verified for Grove and Doerr; the quarterly cadence unverified)

### Founder mode

**In AI engineering.** An orchestrator that reaches past its sub-orchestrators to inspect or instruct workers directly, instead of treating each subtree as a black box.

**In human practice.** Paul Graham's 2024 name, after a talk by Brian Chesky, for founders running companies hands-on, with skip-level contact, instead of the manager's "hire good people and give them room."

**In the theater of agents.** The director agent skips the scene producer and gives a note straight to an actor, and the observer records whether that helped.

**Sources.** [Paul Graham, "Founder Mode"](https://paulgraham.com/foundermode.html) (verified)

### Single-threaded owner

**In AI engineering.** The rule that each goal in a multi-agent system has exactly one agent accountable for it, and that agent has no competing goals.

**In human practice.** Amazon's practice, described in *Working Backwards*, of giving each important initiative a leader who owns it and does little else.

**In the theater of agents.** One character, and only one, is responsible for making sure the mystery is solved by the last scene.

**Sources.** [Working Backwards summaries](https://research.tedneward.com/reading/management/working-backwards/index.html) (unverified)

### Playbook and play call

**In AI engineering.** A library of named, tested graphs (workflows), from which a router or orchestrator picks one for the current situation.

**In human practice.** A football team's set of rehearsed plays; the coordinator calls one from the sideline by radio, which the NFL cuts off at 15 seconds on the play clock or the snap.

**In the theater of agents.** The producer can call "interrogation," "chase," or "confession," each a scene structure the cast has rehearsed.

**Sources.** [NFL Rulebook](https://operations.nfl.com/the-rules/nfl-rulebook/) (verified for the radio rule); [Pro Football Hall of Fame, Paul Brown](https://www.profootballhof.com/players/paul-brown) (verified)

### Audible

**In AI engineering.** Dynamic routing at the edge: a worker that sees something the planner could not switches to a different pre-approved path, chosen from a fixed menu.

**In human practice.** "A last-second change to the play, called by the quarterback, when the offense is already lined up at the line of scrimmage," usually after reading the defense.

**In the theater of agents.** A character who senses the scene is dying may call "switch to confession," but only one of the two switches written into the scene card.

**Sources.** [Buccaneers.com, 2015](https://www.buccaneers.com/news/red-chalk-talk-audible-hot-route-16047899) (verified)

### Film session

**In AI engineering.** An after-the-run observer that reads the full trace, grades each agent's turns, and feeds the grades into the next run's instructions.

**In human practice.** Coaches and players reviewing game film; Paul Brown was the first to set up film statistical studies and grade his players from them.

**In the theater of agents.** After the show, a "film room" agent replays the log and gives every character a grade with one note.

**Sources.** [Pro Football Hall of Fame, Paul Brown](https://www.profootballhof.com/players/paul-brown) (verified)

## More building blocks

Written in the pane on November 4 for terms the notes didn't cover; sources are marked as in batch 1.

### Skill

**In AI engineering.** A folder of instructions (a `SKILL.md` file, plus any scripts or references it needs) that a harness loads only when the task calls for it, so an agent can carry many abilities without filling its context with all of them. Claude Code, Hermes Agent, and OpenClaw all use skills, and the format is shared as an open standard (agentskills.io, per Hermes's README). Marlon's Nov 2 point applies here: many "agents" are really just skill or personality files that a harness runs.

**In human practice.** A recipe card, a standard operating procedure, a routine an actor or a crew has rehearsed and can call up by name.

**In the theater of agents.** Write the reality-show "challenge" as a skill file that any producer agent can load when it is time to run one.

**Sources.** Hermes Agent README, [github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (read Nov 4 in [research note 01](notes/01-agent-products-as-of-nov-4.md)). Story of Week 9 canvas, Nov 2 (Marlon).

### Subagent

**In AI engineering.** An agent started by another agent for one piece of work, usually with a fresh context, its own instructions, and limited tools, which returns only its result. Claude Code's documentation says a subagent runs "in its own context window with a custom system prompt, specific tool access, and independent permissions." It is the orchestrator–workers pattern built into a harness.

**In human practice.** Sending a researcher to the archive with a question and getting back a memo, not the whole archive.

**In the theater of agents.** The host sends a subagent to dig up a character's past and gets back one paragraph of scandal.

**Sources.** Anthropic, [Claude Code docs: Subagents](https://code.claude.com/docs/en/sub-agents) (read Nov 4 in [research note 01](notes/01-agent-products-as-of-nov-4.md)). This research folder was itself made by one pane and five subagents.

### MCP (Model Context Protocol)

**In AI engineering.** An open standard for connecting an agent to tools and data. A server exposes tools (search the calendar, read the Drive, query a database), and any harness that speaks MCP can use them. Anthropic introduced it in November 2024, and it is now stewarded by the Agentic AI Foundation. The current specification is dated July 28, 2026. Google's A2A protocol is the companion idea for agent-to-agent messages: "MCP is for agent-to-tool communication."

**In human practice.** A standard plug and socket: once the sockets match, any lamp works in any room.

**In the theater of agents.** Not needed for a local ensemble. It matters when a character must reach something real, such as a shared Slack channel.

**Sources.** [MCP specification](https://modelcontextprotocol.io/specification/latest) and the A2A site (read Nov 4 in [research note 01](notes/01-agent-products-as-of-nov-4.md)). Stewardship history: Nov 1 essay 07.

### Structured output

**In AI engineering.** Asking a model to answer in a fixed shape, usually JSON with named fields (`next_speaker`, `goal_reached`, `mood`), so that ordinary code can read the answer and act on it. Structured output is what lets a model's judgment drive a router, a stop condition, or a dashboard.

**In human practice.** A form: the referee's scorecard, the casting sheet, the call sheet. Anything filled in, not written freely.

**In the theater of agents.** The director answers every round with `{"goal_reached": false, "why": "..."}`, and the loop reads the first field.

**Sources.** Story of Week 9 canvas, "Sample use cases (Nov 1)" and Nov 2 ("a couple of flips based on structured outputs"). The general practice is unverified today.

### Parallelization

**In AI engineering.** Running several model calls at once and combining the results. Anthropic names two variations: "**Sectioning**: Breaking a task into independent subtasks run in parallel," and "**Voting:** Running the same task multiple times to get diverse outputs."

**In human practice.** Second unit shooting while the main unit shoots; a panel of judges each scoring alone before the scores are combined.

**In the theater of agents.** Three critic agents score the same episode independently, and the dashboard shows where they disagree.

**Sources.** Anthropic, ["Building effective agents"](https://www.anthropic.com/engineering/building-effective-agents) (read Nov 4).

### Blackboard

**In AI engineering.** A shared workspace that many specialist agents read and write, with no fixed order of steps. Each specialist contributes when it can improve what is on the board. The idea comes from Carnegie Mellon's Hearsay-II speech system of the 1970s. Today's equivalents are a shared file, a database table, a Kanban board (Hermes Agent's), or a git repository.

**In human practice.** A writers' room whiteboard, a detectives' incident board, the stage manager's call board.

**In the theater of agents.** A gossip board in the house that every character can read and pin a rumor to.

**Sources.** Nov 1 essay 07, section 3 (Erman, Hayes-Roth, Lesser, and Reddy, *ACM Computing Surveys*, 1980; not re-read). Hermes Kanban: [research note 01](notes/01-agent-products-as-of-nov-4.md).

### Stigmergy

**In AI engineering.** Coordination through traces left in a shared environment, not through messages. Each agent responds to what others have left behind. It is how leaderless swarms of agents can still build something.

**In human practice.** Ants following pheromone trails, termites building mounds, hikers wearing a path across a lawn, editors improving a wiki page one change at a time.

**In the theater of agents.** No one tells the characters what to talk about, but each must react to the last object someone left on the kitchen table.

**Sources.** Weekly doc, ensembles brainstorm ("ant colonies and beehives: simple rules, stigmergy"). The term is from Pierre-Paul Grassé (1959) on termites (unverified today).

### Commander's intent

**In AI engineering.** The part of a prompt that states purpose, priorities, and the end state, not steps, so that an agent meeting an unforeseen case can still act as its designer would want. Anthropic's multi-agent research system makes the same point from the other side: "each subagent needs an objective, an output format, guidance on the tools and sources to use, and clear task boundaries."

**In human practice.** In mission command, the "why" of an order, which lets a subordinate act when the plan fails on contact.

**In the theater of agents.** Give the producer an intent ("keep the season heading toward a betrayal in episode five") in place of a list of rules.

**Sources.** Nov 1 essay 05, "Intent, not instructions" (Anthropic, ["How we built our multi-agent research system"](https://www.anthropic.com/engineering/multi-agent-research-system), quoted there, not re-read today).
