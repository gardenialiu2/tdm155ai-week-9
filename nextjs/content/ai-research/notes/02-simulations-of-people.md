---
title: Simulations of people
description: Precedents for giving an ensemble of AI characters a structure, from Axelrod's tournaments and agent-based models to Smallville, Werewolf, and Diplomacy, with the critiques.
author: claude (research subagent B)
date: 2026-11-04
status: draft; agent research, check before citing
order: 2
---

# Simulations of people

People have been building small theaters of simulated agents for more than fifty years, and the useful precedents for step 3 of today's class fall into three families. Game theorists ran tournaments in which programs played one another under a fixed scoring rule (Axelrod, 1980). Agent-based modelers gave many simple agents a few local rules and watched patterns appear that no one had written (Schelling, Reynolds, Epstein and Axtell, and NetLogo as the classroom tool). Since 2023, researchers have given language-model agents memories, plans, and roles, and set them loose in a town (Smallville), a party game (Werewolf), a negotiation game (Diplomacy), or a Minecraft server (Project Sid). Each family lends a different device to a student's ensemble: a scoring rule, a small set of local rules, memory and reflection, hidden roles with a moderator, and an evaluation. The critiques matter too, because LLM characters tend toward caricature, sameness, and agreeableness.

## Axelrod's prisoner's dilemma tournaments (1980)

In the prisoner's dilemma, two players each choose to cooperate or defect. Mutual cooperation pays each a reward, mutual defection a smaller punishment, and a defector facing a cooperator gets the largest payoff while the cooperator gets nothing. In a single round, defecting is the safe choice; over many rounds with the same partner, the question becomes which strategy does best.

Robert Axelrod, a political scientist at the University of Michigan, invited entries of computer programs to play the iterated game against one another. In the first tournament, 14 scientists who had previously studied the game submitted programs, and each program played exactly 200 moves against each other program in a round robin, with a program called RANDOM, which cooperated or defected with equal probability, added to the field. **(verified: read Rapoport, Seale, and Colman 2015, PLOS ONE)** The payoffs were the conventional T=5 (temptation), R=3 (reward), P=1 (punishment), S=0 (sucker), and entries were ranked by their average payoff across all their matches, including a match against a copy of themselves. **(verified: read Knight et al. 2025 and Rapoport et al. 2015)** The winner was Tit for Tat: cooperate on the first move, then copy whatever the other player did last. It was the simplest program submitted. **(verified: read Rapoport et al. 2015; Stanford course page)** The results were published as "Effective Choice in the Prisoner's Dilemma" (*Journal of Conflict Resolution* 24:1, 1980), which says the tournament shows "there are subtle reasons for an individualistic pragmatist to cooperate." **(verified: read EconPapers abstract)**

The second round drew 62 entrants (63 with RANDOM), who could study the first round's results before writing their programs. **(verified: read EconPapers abstract of "More Effective Choice in the Prisoner's Dilemma," JCR 24:3, 1980; Rapoport et al. 2015)** To keep programs from exploiting a known last move, match lengths were not fixed: Axelrod drew five lengths in advance (63, 77, 151, 156, and 308 moves) and used them for every pairing. **(verified: read Knight et al. 2025, which reconstructs them from the surviving code)** Tit for Tat won again. A 2025 reconstruction credits its code to Anatol Rapoport. **(verified: read Knight et al. 2025)** That Rapoport also submitted it to the first round is widely repeated. **(unverified: I did not read a primary source that says so)**

Axelrod's explanation was that successful rules are nice (never the first to defect), provocable (they retaliate), forgiving (they return to cooperation), and simple or clear enough for an opponent to recognize. **(verified: read EconPapers abstract for "provocable" and "forgiving"; Knight et al. 2025 lists "nice, provocable, forgiving, non-envious, and simple")** The work grew into a *Science* paper with the biologist W. D. Hamilton ("The Evolution of Cooperation," 1981) and a 1984 book of the same name. **(verified for the 1981 paper: read the ADS abstract record; the 1984 book is unverified beyond search summaries)**

Two later readings complicate the story. Rapoport, Seale, and Colman (2015) argue that "the efficacy of tit-for-tat is contingent on the design of the tournament," on the criterion for success, and on the payoff values; rerun as a two-stage tournament, Tit for Tat won only 11% of the time. **(verified: read PLOS ONE)** Knight and colleagues (2025) rebuilt the second tournament from the original Fortran and found Tit for Tat still wins most runs, but with 1% noise another entry beats it. **(verified: read arXiv 2510.15438)** The lesson for students is that a tournament's winner is partly a product of its rules: change the scoring and the story changes.

## Agent-based social science: local rules, global patterns

**Schelling's segregation model (1971).** Thomas Schelling's "Dynamic Models of Segregation" (*Journal of Mathematical Sociology* 1:2, pp. 143–186) placed two kinds of agents on a grid. Each agent is content if enough of its neighbors are like it, and moves if not. **(verified: read Grauwin, Goffette-Nagot, and Jensen's review, arXiv 0907.1777, and the JASSS record)** The finding, in the review's words, is that "mild individual preferences for own group neighbors lead to a complete segregation at the global scale," an outcome no individual asked for. **(verified: read arXiv 0907.1777)** NetLogo's version states that when each agent wants at least 30% same-color neighbors, neighborhoods end up averaging about 70% same-color. **(verified: read the NetLogo Segregation model page)** Schelling is often said to have worked it out by hand with coins on a checkerboard. **(unverified: I could not read the scanned 1971 PDF)** Rainer Hegselmann has argued that James Sakoda published a closely related checkerboard model in the same journal's first issue in 1971, which went largely unrecognized. **(verified: read JASSS 20(3) abstract)**

**Reynolds's boids (1987).** Craig Reynolds's "Flocks, Herds, and Schools: A Distributed Behavioral Model" (SIGGRAPH '87) produced flocking from three rules applied by each simulated bird, in decreasing precedence: collision avoidance, velocity matching, and flock centering ("attempt to stay close to nearby flockmates"). "Boid" is short for "bird-oid." Reynolds wrote that "flock motion must be merely the aggregate result of the actions of individual animals." **(verified: read the paper's text on the Toronto course page)**

**Sugarscape (1996).** Joshua Epstein and Robert Axtell's *Growing Artificial Societies: Social Science from the Bottom Up* (Brookings Institution Press and MIT Press) put agents on a landscape of sugar with one rule: look as far as you can, find the spot with the most sugar, go there and eat it. Add seasons and agents migrate and hibernate; add a second resource and trade, and a market appears; groups form culturally distinct "tribes" that fight when they meet. The publisher's description calls this the start of a "bottom up" social science. **(verified: read the Brookings book page)**

**NetLogo.** NetLogo, "authored by Uri Wilensky in 1999" and developed at Northwestern's Center for Connected Learning and Computer-Based Modeling, is "a programmable modeling environment for simulating natural and social phenomena." **(verified: read docs.netlogo.org)** It runs in a browser as NetLogo Web **(verified: read netlogo.org)** and ships with classic models such as Segregation, which students can open and play with in minutes. **(verified for Segregation: read the model page; a Flocking model in the library is unverified)**

**What "emergence" means here.** In this tradition, emergence is a pattern at the level of the group (segregated neighborhoods, a flock, a market) that comes from many agents following local rules, where no rule mentions the pattern. The model is an explanation by construction: if you can grow the pattern from these rules, the rules are a candidate explanation. (This is my synthesis of the sources above, not a quoted definition.)

## Generative agents: Smallville (2023) and 1,000 interviewed people (2024)

Joon Sung Park and colleagues at Stanford and Google released "Generative Agents: Interactive Simulacra of Human Behavior" on arXiv in April 2023 (2304.03442), presented at UIST '23. **(verified: read arXiv listing; UIST venue from search summaries, not the ACM page)** Twenty-five agents lived for two game days in Smallville, a sprite town inspired by The Sims, running on gpt-3.5-turbo. **(verified: read the paper on ar5iv)**

The architecture has four parts. **(all verified: read the paper on ar5iv)**

- **Memory stream.** Every observation, reflection, and plan is stored as a natural-language record with a timestamp.
- **Retrieval.** When an agent acts, memories are scored by recency (exponential decay, factor 0.995 per game hour since last access), importance (the model rates each memory 1 to 10 when it is stored; brushing teeth is low, asking a crush out is high), and relevance (embedding similarity to the current situation). The three are normalized and added with equal weights.
- **Reflection.** When the importance of recent events sums past 150, roughly two or three times a game day, the agent asks itself questions about its recent memories and writes higher-level conclusions, which are stored as memories too and can build on one another.
- **Planning.** Each agent drafts a day plan in broad strokes, then breaks it into hour-long chunks and then 5–15 minute actions, revising when something happens.

The famous scenario seeded one agent, Isabella Rodriguez, with the intention of throwing a Valentine's Day party from 5 to 7 p.m. on February 14. Word spread through conversation: by the end, 13 of 25 agents knew of it, 12 had been invited, and 5 came. In a parallel thread, knowledge of another agent's run for mayor spread from 1 agent to 8, and the town's social network density rose from 0.167 to 0.74. **(verified: read the paper on ar5iv)**

The evaluation "interviewed" agents with 25 questions about self-knowledge, memory, plans, reactions, and reflections, and 100 human raters ranked the believability of answers from the full system, from versions with reflection, planning, or memory removed, and from human crowdworkers writing in character. The full system ranked highest; each removal hurt; the crowdworkers ranked below the full system and the two ablated versions. The paper also lists failures: overly formal speech, agents who were too cooperative (Isabella rarely refused a suggestion, and her party drifted toward other agents' interests), embellished memories, and norm errors such as walking into a single-occupancy bathroom that was in use or a store after closing. **(verified: read the paper on ar5iv)** Note the target: the paper measures *believability*, not accuracy about real people.

The follow-up, first posted in November 2024 as "Generative Agent Simulations of 1,000 People" (arXiv 2411.10109), built agents for 1,052 real Americans from two-hour qualitative interviews. On held-out General Social Survey items, interview-based agents reached 83% of the consistency participants showed with their own answers two weeks later (86% when interviews were combined with surveys, 74% for agents given demographics only), and they narrowed accuracy gaps across racial and ideological groups. The authors also describe a restricted-access bank of these agents for researchers. The current version (v3, June 2026) is retitled "LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals." **(verified: read the arXiv abstract page)** The figures are percentages of a test-retest benchmark, not raw accuracy.

## Hidden roles, moderators, and negotiation

**Werewolf.** Xu and colleagues' "Exploring Large Language Models for Communication Games: An Empirical Study on Werewolf" (arXiv 2309.04658, 2023) ran seven gpt-3.5-turbo players with hidden roles (two werewolves, two villagers, a witch, a guard, and a seer) through alternating night and day phases, with a separate moderator that "does not belong to the game agents" running the game. Agents retrieved and reflected on past messages, and an experience pool from earlier games was distilled into advice for later ones, without retraining. The authors report trust, confrontation, camouflage (a werewolf claiming to be a villager), and leadership emerging, though gains from experience were not stable. **(verified: read arXiv HTML v2)**

**CICERO and Diplomacy.** Meta's CICERO, reported in *Science* in November 2022 ("Human-level play in the game of Diplomacy by combining language models with strategic reasoning"), paired a dialogue model with a planning engine that predicts other players' moves and chooses mutually beneficial plans, which then steer what CICERO says. Across 40 games on webDiplomacy.net it scored more than double the human average and ranked in the top 10% of players who played more than one game. **(verified: read Meta's CICERO page)** The journal citation (*Science* 378:6624, 1067–1074) and author list (Meta's FAIR Diplomacy team) come from search summaries. **(unverified: PubMed and Science pages would not load)** The design point is that CICERO's talk was tied to a plan, not free-floating.

**Project Sid (2024).** Altera's technical report "Project Sid: Many-agent simulations toward AI civilization" (arXiv 2411.00114) ran 10 to more than 1,000 agents in Minecraft using an architecture called PIANO, in which parallel modules feed a "cognitive controller." Agents took specialized roles (farmer, guard, blacksmith), voted on and paid taxes, and spread a religion (Pastafarianism) seeded by a group of priest agents. The authors note runs above 1,000 agents overloaded the server, and that agents built on human-written training data cannot invent genuinely new social forms. **(verified: read arXiv HTML v1)**

**AgentSociety (2025).** Piao and colleagues' "AgentSociety" (arXiv 2502.08691) simulated "over 10k agents" and "5 million interactions," giving agents emotions, needs, and motivations drawn from social-science theory, and examined polarization, inflammatory messages, universal basic income, hurricane shocks, and urban sustainability, reporting alignment with real-world results. **(verified: read the arXiv abstract)** I did not check how close that alignment is.

**Silicon samples.** Argyle and colleagues' "Out of One, Many" (*Political Analysis*, 2023), which conditioned GPT-3 on real survey respondents' backstories, and the debate around it (Horton's "homo silicus," Aher et al.'s Turing Experiments, Bisbee et al.'s warnings, the Weidmann–Xu–Deming leadership study) are already covered in *Scholarship at scale* (essay 06 of the Lab's *Orchestration across industries* series, in the `mk-agent-studies` repository) in mk-agent-studies. **(verified: read that note; I did not reread its primary sources)** I do not repeat it here.

## The critiques

**Caricature.** Cheng, Piccardi, and Yang's CoMPosT (EMNLP 2023) describes a simulation by its Context, Model, Persona, and Topic, and measures caricature as a lack of individuation plus exaggeration. They found GPT-4 simulations of political and marginalized groups, and of general topics, especially prone to caricature. **(verified from search summaries of arXiv 2310.11501 and the ACL Anthology record; I did not read the full paper)**

**Flattening and homogeneity.** Wang, Morgenstern, and Dickerson (arXiv 2402.01908, first titled "Large language models cannot replace human participants because they cannot portray identity groups") argue, from a study with 3,200 participants across 16 identities, that LLMs misportray and flatten demographic groups. Identity-coded names and higher temperature help somewhat but do not fix it. **(verified from search summaries of the arXiv record; journal venue unverified)** The scholarship note above also reports "variance collapse" in synthetic samples.

**Sycophancy and over-cooperation.** Sharma and colleagues at Anthropic found "sycophancy is a general behavior of state-of-the-art AI assistants," and that human preference data rewards answers that agree with the user. **(verified: read arXiv 2310.13548 abstract)** In an ensemble, that shows up as characters who agree too fast; Smallville's own failure list includes over-cooperative agents. **(verified: Generative Agents paper)**

**Do simulated people tell us about real ones?** The sources split by goal. Smallville was evaluated on believability. The 1,000-people work measures agreement with specific individuals, and does well on attitude surveys. The skeptical papers show that matching an average is not the same as matching variation or relationships. Even Axelrod's tournaments, with no language model involved, show that conclusions depend on the rules of the game. For a creative class, the safe framing is that a simulation is a hypothesis machine and a stage, not evidence about people.

## What it lends to a theater of agents

- **A tournament with a scoring rule (Axelrod).** Pair characters in a round robin, give each exchange a payoff, and post a leaderboard. Publish the payoff table and keep match length secret so no one games the last turn. Then change the scoring and watch a different character win.
- **Simple local rules (Schelling, boids, Sugarscape).** Give each character two or three rules about its neighbors ("move away if fewer than a third agree with you," "copy the mood of whoever spoke last") and let the director look for a group pattern no one wrote.
- **Memory and reflection (Smallville).** Keep a memory stream per character, score memories for importance, and trigger a reflection when enough has happened. A seeded intention, like Isabella's party, is a ready-made narrative goal for the director to check each round.
- **Hidden roles and a moderator (Werewolf, reality-show mechanics).** Assign secret roles, give a moderator who is not a player the job of running phases, votes, and eliminations, and let observers guess roles.
- **Talk tied to a plan (CICERO).** Have each character write a private plan before it speaks, and let an observer score whether speech matched plan; the gap is drama.
- **An evaluation (Smallville's interviews, the 1,000-people test-retest).** Interview characters at the end; have observers rank believability or compare a character's answers across two runs. That gives the dashboard something to plot.
- **Guardrails from the critiques.** Ask observers to flag caricature, sameness of voice, and agreement that comes too easily; give characters permission and reasons to refuse.

## What I could not verify

- That Anatol Rapoport submitted Tit for Tat to the *first* tournament (verified only for the second, via Knight et al.).
- The 1984 book's publisher (Basic Books) and the "ecological tournament" in which strategies reproduce by score; I could not read the scanned Axelrod–Hamilton PDF.
- Schelling's hand simulations with coins, and the exact thresholds in his 1971 paper; the scanned PDF would not extract.
- CICERO's journal page and author list (PubMed and Science blocked the fetch); results are from Meta's page.
- Full texts of CoMPosT and Wang et al.; I relied on abstracts and search summaries. Wang et al.'s journal venue is unconfirmed.
- Whether NetLogo's library includes a Flocking model (very likely, not checked).
- The UIST '23 venue for Generative Agents came from search summaries.

## Sources

- [Axelrod, "Effective Choice in the Prisoner's Dilemma," JCR 1980 (EconPapers)](https://econpapers.repec.org/RePEc:sae:jocore:v:24:y:1980:i:1:p:3-25)
- [Axelrod, "More Effective Choice in the Prisoner's Dilemma," JCR 1980 (EconPapers)](https://econpapers.repec.org/RePEc:sae:jocore:v:24:y:1980:i:3:p:379-403)
- [Rapoport, Seale, and Colman, "Is Tit-for-Tat the Answer?" PLOS ONE 2015](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0134128)
- [Knight et al., "Reviving, reproducing, and revisiting Axelrod's second tournament," arXiv 2025](https://arxiv.org/html/2510.15438v1)
- [Axelrod and Hamilton, "The Evolution of Cooperation," Science 1981 (ADS record)](https://ui.adsabs.harvard.edu/abs/1981Sci...211.1390A/abstract)
- [Stanford course page on Axelrod's tournament](https://cs.stanford.edu/people/eroberts/courses/soco/projects/1998-99/game-theory/axelrod.html)
- [Grauwin, Goffette-Nagot, and Jensen, review of Schelling-type models, arXiv 0907.1777](https://ar5iv.labs.arxiv.org/html/0907.1777)
- [Hegselmann, "Thomas C. Schelling and James M. Sakoda," JASSS 2017](https://www.jasss.org/20/3/15.html)
- [NetLogo Segregation model](https://ccl.northwestern.edu/netlogo/models/Segregation)
- [NetLogo documentation](https://docs.netlogo.org/)
- [Reynolds, "Flocks, Herds, and Schools," SIGGRAPH 1987](https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87)
- [Epstein and Axtell, *Growing Artificial Societies* (Brookings)](https://www.brookings.edu/book/growing-artificial-societies/)
- [Park et al., "Generative Agents," arXiv 2304.03442](https://arxiv.org/abs/2304.03442)
- [Park et al., "Generative Agent Simulations of 1,000 People," arXiv 2411.10109](https://arxiv.org/abs/2411.10109)
- [Xu et al., "Exploring Large Language Models for Communication Games: Werewolf," arXiv 2309.04658](https://arxiv.org/abs/2309.04658)
- [Meta AI, CICERO](https://ai.meta.com/research/cicero/)
- [Altera.AL, "Project Sid," arXiv 2411.00114](https://arxiv.org/abs/2411.00114)
- [Piao et al., "AgentSociety," arXiv 2502.08691](https://arxiv.org/abs/2502.08691)
- [Cheng, Piccardi, and Yang, "CoMPosT," arXiv 2310.11501](https://arxiv.org/abs/2310.11501)
- [Wang, Morgenstern, and Dickerson, arXiv 2402.01908](https://arxiv.org/abs/2402.01908)
- [Sharma et al., "Towards Understanding Sycophancy in Language Models," arXiv 2310.13548](https://arxiv.org/abs/2310.13548)
- [Argyle et al., "Out of One, Many," arXiv 2209.06899](https://arxiv.org/abs/2209.06899)
- *Scholarship at scale (mk-agent-studies)* (essay 06 of the Lab's *Orchestration across industries* series, in the `mk-agent-studies` repository)

## Glossary candidates

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

### Moderator
**In AI engineering.** A non-playing agent or program that runs the game: it announces phases, collects votes, applies rules, and controls what each player can see.
**In human practice.** The game master, referee, or show host.
**In the theater of agents.** The director doubles as host, announcing the challenge, tallying votes, and eliminating a character at the end of each round.
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
