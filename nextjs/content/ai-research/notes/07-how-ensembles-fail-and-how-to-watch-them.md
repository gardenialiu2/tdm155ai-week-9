---
title: "How ensembles fail, and how to watch them"
description: The documented ways multi-agent LLM systems go wrong (the MAST taxonomy, Anthropic's research system, conformity in debate, persona drift, loops, judge bias), what each looks like in a ten-turn ensemble, and how observers can log and count it, with a proposed event-log schema for the class 9 dashboard.
author: claude (research subagent G)
date: 2026-11-04
status: draft; agent research, check before citing
order: 7
---

# How ensembles fail, and how to watch them

The best map of how multi-agent LLM systems fail is a 2025 Berkeley study that coded more than 1,600 execution traces into 14 failure modes under three headings: the system was badly specified, the agents talked past each other, or nobody checked the result. The most common single mode was repeating a step. Anthropic's account of its research system adds the costs: dozens of subagents for easy questions, duplicated work, and about fifteen times the tokens of a chat. Studies of agent conversation add three failures a ten-turn ensemble will hit in class: agents agree too fast, dropping correct positions to do it; characters drift from their cards within about eight rounds; and conversations settle into repetitive states. The director and observers are LLM judges, and judges favor the first answer, the longer answer, and sometimes their own. The fixes are old ones: caps, rubrics, swapped orders, fresh context, a judge from another model, two coders with an agreement statistic, and a log with one row per turn.

## The MAST taxonomy

Cemri and twelve co-authors built MAST (Multi-Agent System failure Taxonomy) from 150 traces, then grew the dataset to over 1,600 annotated traces across seven frameworks, on coding, math, and general agent tasks; human annotators agreed at Cohen's kappa 0.88 (verified: read [arXiv abstract, Cemri et al. 2025](https://arxiv.org/abs/2503.13657), v3 of October 26, 2025). An LLM annotator (o1, few-shot) matched human experts at 0.94 accuracy and kappa 0.77, against 0.58 zero-shot (verified: read [the paper's HTML, Cemri et al. 2025](https://arxiv.org/html/2503.13657v3), via a summarizing fetch).

| category | failure modes (share of annotated failures) |
| --- | --- |
| System design | disobey task specification (11.8%), disobey role specification (1.5%), step repetition (15.7%), loss of conversation history (2.8%), unaware of termination conditions (12.4%) |
| Inter-agent misalignment | conversation reset (2.2%), fail to ask for clarification (6.8%), task derailment (7.4%), information withholding (0.85%), ignored other agent's input (1.9%), reasoning-action mismatch (13.2%) |
| Task verification | premature termination (6.2%), no or incomplete verification (8.2%), incorrect verification (9.1%) |

(verified: read the paper's HTML, via a summarizing fetch; the category totals, about 44%, 32%, and 24%, are my sums, not the paper's.)

In ChatDev, clearer role specifications raised task success by 9.4% and a verification step by 15.6%; the authors call such fixes "tactical" and inconsistent, and argue for structural ones: multi-level verification, standard protocols, and state management (verified: same source). Nearly half the failures are in the setup, before any agent misbehaves.

## Anthropic's research system

Anthropic's post of June 13, 2025, describes a lead agent (Claude Opus 4) that spawns Sonnet 4 subagents to search in parallel; it beat single-agent Opus 4 by 90.2% on an internal eval (verified: read [Anthropic, Hadfield et al. 2025](https://www.anthropic.com/engineering/multi-agent-research-system)). Early versions spawned "50 subagents for simple queries," searched "endlessly for nonexistent sources," and distracted each other "with excessive updates"; given vague tasks, subagents "duplicate work, leave gaps" (verified: same source). Agents used about four times the tokens of chat, multi-agent systems about fifteen times, and token use alone explained 80% of the variance in their BrowseComp results (verified: same source). Fixes: scaling rules in the prompts (subagents and tool calls per kind of question); a delegation format giving each subagent "an objective, an output format, guidance on the tools and sources to use, and clear task boundaries"; one LLM-judge call with a rubric, scoring 0.0–1.0 plus pass/fail; human testers, who caught it preferring SEO content farms; and full production tracing (verified: same source).

## Conversation failures

**Agreement and conformity.** Multi-agent debate began as a fix: Du et al. had model instances propose answers and debate over rounds, and reported better reasoning and factuality (verified: read [arXiv abstract, Du et al. 2023](https://arxiv.org/abs/2305.14325)). Liang et al. named the problem it targets, "Degeneration-of-Thought": once confident, a model's self-reflection stops producing new ideas even when it is wrong; their debate needed an adaptive break, and LLM judges may be unfair when debaters are different models (verified: read [arXiv abstract, Liang et al.](https://arxiv.org/abs/2305.19118), EMNLP 2024). Later work is cooler. Choi, Zhu, and Li found majority voting "alone accounts for most of the performance gains typically attributed to" debate (verified: read [arXiv abstract, Choi et al. 2025](https://arxiv.org/abs/2508.17536), NeurIPS 2025). Wynn, Satija, and Hadfield found accuracy can fall during debate as models switch from correct to incorrect answers after reading peers, "favoring agreement over challenging flawed reasoning" (verified: read [arXiv abstract, Wynn et al. 2025](https://arxiv.org/abs/2509.05396)). BenchForm measures conformity rates in multi-agent settings and tests stronger personas and a reflection step as mitigations (verified: read [arXiv abstract, Weng et al. 2025](https://arxiv.org/abs/2501.13381), ICLR 2025; results not read).

**Persona drift.** Li et al. ran two instructed chatbots against each other and found "significant instruction drift within eight rounds," attributed partly to attention decay (verified: read [arXiv abstract, Li et al. 2024](https://arxiv.org/abs/2402.10962), COLM 2024). Choi et al. found larger models drifted more and that assigning a persona "may not help to maintain identity" (verified: read [arXiv abstract, Choi et al. 2024](https://arxiv.org/abs/2412.00804), under review). Abdulhai et al. define prompt-to-line, line-to-line, and Q&A consistency, and cut inconsistency by over 55% by training on them (verified: read [NeurIPS 2025 abstract, Abdulhai et al.](https://proceedings.nips.cc/paper_files/paper/2025/hash/4c91443877f8388d8190c938ac5a4d4d-Abstract-Conference.html)). They make a ready observer rubric.

**Loops and convergence.** MAST's two largest modes, step repetition and unawareness of termination conditions, cover over a quarter of failures (verified: the table above). Ko and Geiping find that debates settle into topic-independent "attractor states," and one model pulls another toward its habits (Claude Haiku's metacommentary spread to partners) (verified: read [arXiv abstract, Ko and Geiping 2026](https://arxiv.org/abs/2606.30571); June 2026 preprint).

## Judges: the director and the observers

Zheng et al. found strong LLM judges agree with humans over 80% of the time, about the human-human rate, and named position, verbosity, and self-enhancement biases (verified: read [arXiv abstract, Zheng et al. 2023](https://arxiv.org/abs/2306.05685), NeurIPS 2023). GPT-4 gave the same verdict after the answers were swapped only 65% of the time; padding answers with a rephrased duplicate list fooled Claude-v1 and GPT-3.5 91.3% of the time and GPT-4 8.7%; GPT-4 favored itself by about 10% in win rate and Claude-v1 by 25%, which the authors would not call conclusive (verified: read [ar5iv full text](https://ar5iv.labs.arxiv.org/html/2306.05685), via a summarizing fetch). Mitigations: judge twice with the order swapped, counting a win only if it holds both ways; few-shot examples (consistency 77.5%, at four times the cost); reference answers, which cut math-grading failures from 70% to 15% (verified: same source). Panickssery, Bowman, and Feng found that a model's ability to recognize its own text correlates linearly with how much it prefers it (verified: read [arXiv abstract, Panickssery et al. 2024](https://arxiv.org/abs/2404.13076)). Verga et al. replaced one large judge with a panel of smaller models from different families, which scored better, favored itself less, and cost over seven times less (verified: read [arXiv abstract, Verga et al. 2024](https://arxiv.org/abs/2404.18796)).

## Failures in a ten-turn ensemble

| failure | what it looks like | detect from the log | usual fix |
| --- | --- | --- | --- |
| Early consensus | by turn 4 everyone agrees; the dissenter folds | stance tags converge; position switches toward the majority | a contrarian role; vote before discussion; hide others' answers in round 1 |
| Persona drift | the cynic sounds like the optimist by turn 7 | observer scores each turn against the card | re-send the card each turn; shorter context; a turn cap |
| Repetition loop | the same exchange, reworded, three times | high similarity between consecutive turns | stop on repeated content; turn cap; inject an event |
| Failure to stop | the director never declares the goal met | stop reason is "cap hit" in most runs | explicit termination criteria for the director |
| Premature stop | the director declares success at turn 3 | "goal met" with no evidence turn cited | the director must cite the turns that satisfy the goal |
| Derailment | the plot wanders off the narrative goal | observer tags turns "off-goal" | restate the goal in each prompt; a director check every N turns |
| Director favoritism | the judge prefers the first, the longest, or its own model's proposal | scores change when order is swapped | swap and average; rubric; a judge from another family; a human spot check |
| Runaway cost | dozens of calls for a simple scene | tokens per run | caps on agents, turns, and tokens, in prompt and code |

(proposal: synthesized from the sources above; not tested in a classroom.)

## Watching a run: traces

OpenTelemetry's semantic conventions for generative AI name spans for model calls, agent invocations (`invoke_agent`), and tool calls, with attributes such as `gen_ai.operation.name`, `gen_ai.agent.name`, and `gen_ai.conversation.id`; the agent-spans page is marked **Development** (verified: read [the agent-spans spec](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md), November 4, 2026). The conventions have moved from the core OpenTelemetry docs to their own repository, which lists no releases today (verified: read [the moved notice](https://opentelemetry.io/docs/specs/semconv/gen-ai/) and [the releases page](https://github.com/open-telemetry/semantic-conventions-genai/releases), November 4, 2026); a blog dates the move to core semconv v1.42.0 (unverified: search summary only). In Langfuse, built on OpenTelemetry, a trace groups the observations (spans, generations, events) of one request and a session groups the traces of one conversation (verified: read [Langfuse data model](https://langfuse.com/docs/observability/data-model), November 2026). LangSmith calls a unit of work a run (comparable to a span), groups runs into a trace and traces into a thread, and attaches scores as feedback (verified: read [LangSmith concepts](https://docs.langchain.com/langsmith/observability-concepts), November 2026). For class: a turn is a span, a run is a trace, a season is a session.

## Watching a run: human practice

Ethnographers jot brief notes in the field, write full fieldnotes afterward, then code them (verified: read search summaries of the contents and a review of [Emerson, Fretz, and Shaw, *Writing Ethnographic Fieldnotes*, 2nd ed., 2011](https://soc.ucla.edu/publication/writing-ethnographic-fieldnotes); book not read). Bales's Interaction Process Analysis (1950) is a ready-made coding scheme for small-group talk: every act goes into one of twelve categories, six task-oriented (gives suggestion, opinion, orientation; asks for orientation, opinion, suggestion) and six socioemotional in mirrored pairs (shows solidarity, tension release, agrees; disagrees, shows tension, shows antagonism); one sentence can hold several acts, and two observers are generally enough (verified: read [Encyclopedia.com, "Observation Systems"](https://www.encyclopedia.com/social-sciences/encyclopedias-almanacs-transcripts-and-maps/observation-systems)). To check that coders agree, social scientists use Cohen's kappa (1960), agreement corrected for chance; the Landis and Koch (1977) bands call 0.61–0.80 "substantial," but rest on opinion and are widely questioned (verified: read [Wikipedia, "Cohen's kappa"](https://en.wikipedia.org/wiki/Cohen%27s_kappa)). Sports charting does this at volume: PFF grades every player on every play from −2 to +2 in half-point steps, zero meaning the player did what the play expected (verified: read [PFF, Moy 2025](https://www.pff.com/news/nfl-quarterback-play-level-data)).

## A minimal event log and dashboard (proposal)

One row per turn, appended, never edited:

| field | example |
| --- | --- |
| `run_id` | `2026-11-04-pod3-run07` |
| `turn_id`, `parent_turn_id` | `14`, `13` (the turn it answers) |
| `speaker` | `cynic`, `director`, `producer` |
| `channel` | `public` or `confessional` |
| `text` | the utterance |
| `ts` | ISO timestamp |
| `model`, `tokens` | which model spoke, tokens used |
| `event` | `turn`, `intervention`, or `stop` (with `stop_reason`: `goal_met`, `cap_hit`, `loop_detected`, `human`) |
| `tags` | observer codes, one set per observer: Bales category, stance, on/off card, on/off goal |

Counts the dashboard could show:

1. Turns and share of words per speaker, against an even split.
2. Agreement rate: turns coded "agrees" versus "disagrees," by turn number, to see consensus arrive.
3. Position switches toward the majority, per character.
4. Persona score per character per turn, to show drift.
5. Repetition: similarity of each turn to the previous three.
6. Stop reason across runs: goal met versus cap hit.
7. Director interventions per run, and the turns they followed.
8. Judge scores in both orders and the gap between them; kappa between two observers on the same run.

(proposal: my design, not drawn from a single source.)

## What it lends to a theater of agents

Failures are material, not only bugs: a character who folds to the majority at turn 5 is a scene. The research adds a way to tell a scene from a malfunction: log every turn, tag it, count. MAST gives observers a checklist (repeated step, ignored input, early stop, no stop). Bales gives a coding scheme students can apply by hand. Swapped-order judging and a second observer with kappa teach that a judgment is a measurement with error. Anthropic's delegation format (objective, output format, boundaries) is the shape of a good character card.

## Where the analogy breaks

The studies measure accuracy on math, code, and search; a narrative ensemble has no right answer, so "conformity" may be the plot working. Drift studies use two agents, not a cast of five with a director. Bales coded human groups with bodies and status; LLM turns may not be acts in his sense. Kappa assumes independent coders, and two observers from one model family may agree for the wrong reason. OpenTelemetry was built to count latency and errors, not to read a story.

## What I could not verify

- MAST's full text was read through a summarizing fetch of about two-thirds of the HTML; the AG2 case study was not read, and the category totals are my sums.
- BenchForm's conformity rates and mitigation results; only the abstract was read.
- Zheng et al.'s figures come from a summarizing fetch of the full text, not the tables directly.
- The OpenTelemetry move's version (v1.42.0) and date, from a blog summary only.
- Emerson, Fretz, and Shaw known from catalog records and a review summary, not the book.
- Ko and Geiping is a v1 preprint; findings beyond the abstract not read.
- I found no study of failures in a persona ensemble of five with a director.

## Sources

- Cemri et al. 2025, *Why Do Multi-Agent LLM Systems Fail?* [arXiv:2503.13657](https://arxiv.org/abs/2503.13657), [HTML v3](https://arxiv.org/html/2503.13657v3)
- Hadfield et al. 2025, [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system), Anthropic, June 13
- Du et al. 2023, multiagent debate, [arXiv:2305.14325](https://arxiv.org/abs/2305.14325)
- Liang et al. 2023/EMNLP 2024, divergent thinking through debate, [arXiv:2305.19118](https://arxiv.org/abs/2305.19118)
- Choi, Zhu, and Li 2025, *Debate or Vote*, [arXiv:2508.17536](https://arxiv.org/abs/2508.17536)
- Wynn, Satija, and Hadfield 2025, *Talk Isn't Always Cheap*, [arXiv:2509.05396](https://arxiv.org/abs/2509.05396)
- Weng, Chen, and Wang 2025, conformity and BenchForm, [arXiv:2501.13381](https://arxiv.org/abs/2501.13381)
- Li et al. 2024, instruction (in)stability, [arXiv:2402.10962](https://arxiv.org/abs/2402.10962)
- Choi et al. 2024, identity drift, [arXiv:2412.00804](https://arxiv.org/abs/2412.00804)
- Abdulhai et al. 2025, [consistent personas with multi-turn RL](https://proceedings.nips.cc/paper_files/paper/2025/hash/4c91443877f8388d8190c938ac5a4d4d-Abstract-Conference.html), NeurIPS
- Ko and Geiping 2026, attractor states, [arXiv:2606.30571](https://arxiv.org/abs/2606.30571)
- Zheng et al. 2023, LLM-as-a-judge, [arXiv:2306.05685](https://arxiv.org/abs/2306.05685), [ar5iv](https://ar5iv.labs.arxiv.org/html/2306.05685)
- Panickssery, Bowman, and Feng 2024, self-preference, [arXiv:2404.13076](https://arxiv.org/abs/2404.13076)
- Verga et al. 2024, *Replacing Judges with Juries*, [arXiv:2404.18796](https://arxiv.org/abs/2404.18796)
- OpenTelemetry, [GenAI agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md), [moved notice](https://opentelemetry.io/docs/specs/semconv/gen-ai/), [releases](https://github.com/open-telemetry/semantic-conventions-genai/releases), read November 4, 2026
- [Langfuse data model](https://langfuse.com/docs/observability/data-model); [LangSmith concepts](https://docs.langchain.com/langsmith/observability-concepts)
- Emerson, Fretz, and Shaw 2011, *Writing Ethnographic Fieldnotes*, [UCLA listing](https://soc.ucla.edu/publication/writing-ethnographic-fieldnotes)
- [Encyclopedia.com, "Observation Systems"](https://www.encyclopedia.com/social-sciences/encyclopedias-almanacs-transcripts-and-maps/observation-systems) (Bales 1950)
- [Wikipedia, "Cohen's kappa"](https://en.wikipedia.org/wiki/Cohen%27s_kappa)
- Moy 2025, [PFF play-level grading](https://www.pff.com/news/nfl-quarterback-play-level-data), July 28

## Glossary candidates

### Failure taxonomy
**In AI engineering.** A named list of the ways a system goes wrong, built by coding real traces; MAST has 14 modes in three categories.
**In human practice.** An error classification that lets different reviewers file the same incident the same way.
**In the theater of agents.** After each run an observer checks the log against six MAST modes and the dashboard shows "step repetition: 2."
**Sources.** [Cemri et al. 2025](https://arxiv.org/abs/2503.13657) (verified); human-practice sense (unverified: general knowledge)

### Conformity
**In AI engineering.** An agent dropping its own answer, often a correct one, to match the group after reading other agents' turns.
**In human practice.** Yielding to a group majority, the subject of Asch's line-judgment experiments.
**In the theater of agents.** The skeptic agrees with the other four at turn 5 without a new argument, and the observer tags a position switch.
**Sources.** [Wynn et al. 2025](https://arxiv.org/abs/2509.05396) (verified); [Weng et al. 2025](https://arxiv.org/abs/2501.13381) (verified); Asch (unverified: not read)

### Persona drift
**In AI engineering.** A character's voice, goals, or claims sliding away from its system prompt; measured within eight rounds of dialogue.
**In human practice.** An actor losing the character over a long run, which the stage manager notes and corrects.
**In the theater of agents.** By turn 8 the cynic is cheerful; the observer's prompt-to-line score drops from 4 to 1.
**Sources.** [Li et al. 2024](https://arxiv.org/abs/2402.10962) (verified); [Abdulhai et al. 2025](https://proceedings.nips.cc/paper_files/paper/2025/hash/4c91443877f8388d8190c938ac5a4d4d-Abstract-Conference.html) (verified); stage practice (unverified: general knowledge)

### Position bias
**In AI engineering.** An LLM judge preferring an answer because of where it appears; checked by judging twice with the order swapped.
**In human practice.** Order effects in judging, such as performers late in a competition scoring differently from early ones.
**In the theater of agents.** The director picks proposal A, then picks the other text when the order flips; the swap gap is logged.
**Sources.** [Zheng et al. 2023](https://arxiv.org/abs/2306.05685) (verified); competition order effects (unverified: not read)

### Self-preference bias
**In AI engineering.** A judge model scoring its own model's output higher, linked to its ability to recognize its own text.
**In human practice.** Judging your own work or your own student's; the reason for recusal.
**In the theater of agents.** Director and characters run on one model, so a judge from another family rescores the finale.
**Sources.** [Panickssery et al. 2024](https://arxiv.org/abs/2404.13076) (verified); [Verga et al. 2024](https://arxiv.org/abs/2404.18796) (verified)

### Span
**In AI engineering.** One timed unit of work inside a trace (a model call, tool call, or agent invocation) with named attributes; traces group into sessions.
**In human practice.** One line of a play-by-play log: who did what, when, with what result.
**In the theater of agents.** Each turn is a span tagged `gen_ai.agent.name=cynic` inside the trace for run 7.
**Sources.** [OpenTelemetry agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md) (verified, Development status, Nov 4, 2026); [Langfuse](https://langfuse.com/docs/observability/data-model) (verified)

### Coding scheme
**In AI engineering.** A fixed set of tags an observer agent applies to each turn, defined with examples so they can be counted across runs.
**In human practice.** A category system for observed behavior, such as Bales's twelve categories for small-group talk (1950).
**In the theater of agents.** Two observers tag every public turn with a Bales category; the dashboard charts "agrees" against "disagrees."
**Sources.** [Encyclopedia.com, "Observation Systems"](https://www.encyclopedia.com/social-sciences/encyclopedias-almanacs-transcripts-and-maps/observation-systems) (verified)

### Inter-rater reliability
**In AI engineering.** Agreement between two judges coding the same items, corrected for chance; MAST reports kappa 0.88 among humans and 0.77 for its LLM annotator.
**In human practice.** Cohen's kappa (1960), used to show a coding scheme can be applied consistently by different observers.
**In the theater of agents.** Two observers from different model families code run 7; kappa 0.45 says the "on card" tag needs a clearer definition.
**Sources.** [Wikipedia, "Cohen's kappa"](https://en.wikipedia.org/wiki/Cohen%27s_kappa) (verified); [Cemri et al. 2025](https://arxiv.org/html/2503.13657v3) (verified)
