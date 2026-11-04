---
title: "Drama managers: steering improvising characters toward a story"
description: What interactive-narrative research, game design, recent LLM director papers, and improvised theater know about a director layer that keeps autonomous characters moving toward a story goal, read as a model for step 2 of the theater of agents.
author: claude (research subagent F)
date: 2026-11-04
status: draft; agent research, check before citing
order: 6
---

# Drama managers: steering improvising characters toward a story

A drama manager is the research name for the director in step 2: an agent that watches characters act on their own and nudges them so the whole adds up to a story. Three decades of work agree on a few things: write the story as a few beats or plot points in a loose order, not a script; choose what comes next between beats and stay quiet inside them; measure progress somehow (a tension curve, an evaluation function, a yes/no check per milestone); and when a character goes off-script, either block the deviation or replan around it. Façade (2005) sequenced 27 beats against a target tension arc; Left 4 Dead's AI Director (2008) paced a game from one crude intensity number; the first LLM directors (2024 onward) check plot objectives after every turn and force the plot forward when it stalls; and a 2026 benchmark finds LLM narrators keep their own established facts poorly over long runs. Commedia dell'arte, *Sleep No More*, and Boal's Forum Theatre are the human versions. Game masters and Mafia moderators are covered in note 03 and not repeated here.

## Façade: beats chosen against a tension arc

*Façade* (Michael Mateas and Andrew Stern, released for Windows in July 2005) is a one-act drama in which the player visits a couple, Grace and Trip, whose marriage comes apart over about 20 minutes (verified: read [Wikipedia, Façade](https://en.wikipedia.org/wiki/Fa%C3%A7ade_(video_game)) for the date; [Mateas and Stern 2005](https://cdn.aaai.org/AIIDE/2005/AIIDE05-016.pdf) for the length). Inside a **beat**, a canonical sequence of "beat goals" plays out how the scene "would play out in the absence of interaction"; handlers listen to the player and reorder upcoming goals or insert "beat mix-ins" that "connect the interaction back to the canonical sequence." Hot-button topics (divorce, the brass bull) can interrupt any beat, after which the interrupted goal plays a "reestablish" line ("So, I was going to say, about Italy...") (verified: read Mateas and Stern 2005).

Above the beats sits the **drama manager**, which "lies dormant most of the time, only active when the current beat is finished or is aborted." It picks "the unused beat whose preconditions are satisfied and whose story tension effects most closely match the near-term trajectory of an author-specified story tension arc (in Façade, an Aristotelian tension arc)," with weights and priorities also counting (verified: same). About 15 of the 27 beats play in any run, and most are causally independent, so the manager can prefer beats about topics the player raised; tone is matched to the current tension so players "often perceive them as causally related, even though they are not" (verified: same).

The authors' verdict: they bought local agency "at the expense of global agency," because only 27 beats could be written, and "did not take full advantage of the power of the drama manager's capabilities" (verified: same). Players tested the edges: persistent rudeness gets the player thrown out, unrecognized input earns "an awkward stare," and Let's Play videos of players provoking the couple built a cult following (verified: read Wikipedia, Façade).

## Search-based drama management: plot points and an evaluation function

Peter Weyhrauch's 1997 Carnegie Mellon thesis, *Guiding Interactive Drama*, framed the director as a search problem (unverified: not online; search summaries only). Mark Nelson and Michael Mateas revisited it in 2005: given "a set of plot points, a set of actions the drama manager can take, and an evaluation of story quality, search can be used to optimize the user's experience" (verified: read [Nelson and Mateas 2005](https://eis.ucsc.edu/papers/Nelson_Mateas_-_SBDM_-_AIIDE05.pdf)). Weyhrauch's test story, *Tea for Three*, was a simplified version of Infocom's *Deadline* (verified: same).

Plot points sit in an ordering graph. The director's actions come in five types: permanent deniers (make a plot point impossible), temporary deniers paired with undeniers, causers, hints that raise the odds of a plot point for a while, and game endings (verified: same). They prefer temporary deniers, since a permanent one that guesses wrong leaves "little to do to recover" (verified: same). The evaluation function is a weighted sum of features such as location flow, thought flow, motivation, and **manipulativity**, a per-action score for how likely the user is to notice "something suspicious going on" (verified: same). Their granularity rule: make a plot point of anything the director might want to cause or prevent (verified: same). The sobering result: Weyhrauch's results "were too optimistic," and search space explosion made full-depth search infeasible on the larger story (verified: same).

## Experience management: intervene or accommodate

Riedl and Bulitko's survey (*AI Magazine*, 2013) gives the standard definition: a drama manager is "an intelligent, omniscient, and disembodied agent that monitors the virtual world and intervenes to drive the narrative forward according to some model of quality of experience," first proposed by Joseph Bates; "experience manager" generalizes the term beyond drama (verified: read [Riedl and Bulitko, preprint](https://faculty.cc.gatech.edu/~riedl/pubs/aimag.pdf)). It usually acts through non-player characters, and "the user should not be aware of the existence of the experience manager or its interventions" (verified: same).

The survey's axes include character autonomy, from "strong story," where characters "do not act without the guidance and permission of the experience manager," to "strong autonomy," where they are "unaware of the needs of the overarching narrative," with Façade in between; and player modeling, learning the individual user's preferences (verified: same). The key failure case is the **boundary problem**, a user action that leaves the intended story, such as killing a character needed later. There are two responses: **intervention**, preventing the deviation by redirecting characters or changing the world ("causing the user's gun to jam"), and **accommodation**, letting it happen and generating a new plan ("selecting a new NPC to take the role of the killed character") (verified: same).

## Left 4 Dead's AI Director: pacing from one crude number

Valve's *Left 4 Dead* (2008; unverified: release year from general knowledge) has an "AI Director" that controls where and when zombies appear. Michael Booth's slides, hosted by Valve with its 2009 talks, state the goal as "algorithmically adjusting game pacing on the fly to maximize 'drama' (player excitement/intensity)" (verified: read [Booth, "The AI Systems of Left 4 Dead"](https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf); unverified: that it was given at AIIDE 2009 at Stanford, per a blog I did not open). Each survivor gets an intensity value that rises with damage taken, incapacitation, being pulled off a ledge, and nearby kills, and decays toward zero except while enemies are still engaging (verified: same).

The director runs a four-state cycle on the team's highest intensity. **Build Up**: full threat population until intensity crosses a peak threshold. **Sustain Peak**: 3 to 5 more seconds. **Peak Fade**: minimal population while the current fight plays out, waiting for "a natural break in the action." **Relax**: minimal population for 30 to 45 seconds or until the team moves far enough, then back to Build Up. Boss encounters are exempt (verified: same). Two lines from the deck matter for us: "Amplitude (difficulty) is not changed, frequency (pacing) is," and "Survivor Intensity estimation is crude, yet the resulting pacing works" (verified: same).
## LLM directors, 2024 to 2026

**IBSEN** (Han and others, arXiv, July 2024) is the closest published match to step 2. A director agent holds a list of plot objectives, writes an outline and a speaking order for the current one, and sends each actor a synopsis and keywords rather than a line, "to seek a balance between the autonomy of the actor and the control of the director." After each turn it asks the model whether the objective is complete, starting from the fifth turn of the objective; after nine turns an incomplete objective is forcibly completed "to prevent the plot from getting stuck." Across 218 checks, 11 needed forcing, and the completion check scored F1 0.77. Reported failures: actors repeating themselves, the director narrating instead of letting characters speak, actors too cheerful about bad events, and models avoiding unethical character behavior. A player action that doesn't complete the objective regenerates the storyline (verified: read [IBSEN, arXiv 2407.01093](https://arxiv.org/html/2407.01093v1)).

Others share the outline-then-improvise shape: **StoryVerse** (FDG 2024) turns authors' "abstract acts" into character actions given the world state (verified: read the [abstract](https://arxiv.org/abs/2405.13042)); **HAMLET** (arXiv, July 2025, revised May 2026) generates a "narrative blueprint" to guide improvising actor agents (verified: read the [abstract](https://arxiv.org/abs/2507.15518)); **From Role-Play to Drama-Interaction** (ACL 2024 Findings) adds a "Narrative Chain" to control plot progression (unverified: search summary only).

The warning comes from **NCP-Bench** (Ma and others, ICML 2026): 100 narrative environments from movie synopses, each with a checkable trajectory, commitments, and initial facts, played between a player agent and a narrator agent. Under adversarial play the best model kept its commitments in only 40 percent of cases after 20 turns, and fact-conflict rates ran from 40 to 68 percent; "high linguistic quality does not guarantee commitment preservation" (verified: read the [ICML abstract page](https://icml.cc/virtual/2026/poster/64786)).

## Human practice: scenarios, loops, and the Joker

**Commedia dell'arte.** A canovaccio "consisted only of a list of acts and scenes; the details were left to the improvisation of the actors" (verified: read [Wikipedia, Canovaccio](https://en.wikipedia.org/wiki/Canovaccio)). In a commedia, "key plot points and characters' entrances and exits are scripted"; the cast are masked stock types; the lazzo is a gag "usually well known to the performers and to some extent a scripted routine"; Flaminio Scala's collection of scenarios was published in the early 17th century (verified: read [Wikipedia, Commedia dell'arte](https://en.wikipedia.org/wiki/Commedia_dell%27arte)). That the scenario was pinned up backstage for actors to check their entrances is widely repeated (unverified: search snippets only).

**Sleep No More.** Punchdrunk's New York production (March 7, 2011 to January 5, 2025) ran three hour-long loops; characters "reset" and repeat, so the masked audience can follow different characters each time (verified: read [Wikipedia, Sleep No More](https://en.wikipedia.org/wiki/Sleep_No_More_(2011_play))). The story is fixed; the path through it is not.

**Forum Theatre.** Augusto Boal's form plays a scene of oppression once, then again, and spect-actors have "the power to stop and change the performance," usually by replacing the protagonist. The Joker facilitates, should "hold an impartial view of the interventions," and asks the audience whether an intervention is a "magic" solution (verified: read [Wikipedia, Forum theatre](https://en.wikipedia.org/wiki/Forum_theatre); unverified against Boal's own books).

Tabletop "railroading" versus "sandbox" play is the same spectrum as strong story versus strong autonomy (unverified: common usage, no source read).

## Director patterns at a glance

| System | Unit of story | How progress is checked | How it intervenes | Limit on intervention |
|---|---|---|---|---|
| Façade (2005) | 27 beats | Tension effect vs. target arc | Picks next beat; mix-ins inside beats | Acts only between beats |
| SBDM (1997, 2005) | Plot points in an ordering graph | Weighted evaluation function | Deny, undeny, cause, hint, end | Manipulativity scored as a cost |
| L4D AI Director (2008) | Pacing cycle | Survivor intensity | Spawn more or fewer enemies | Changes frequency, not difficulty |
| IBSEN (2024) | List of plot objectives | LLM yes/no after each turn | Instructions to actors | Check from turn 5, force at turn 9 |
| Forum Theatre | One scene, replayed | The audience judges | Spect-actor stops and replaces | Joker rules out "magic" fixes |

## What it lends to a theater of agents

**Write beats, not a plot.** Give the director five to eight milestones in a loose order, as Façade and IBSEN do, and let characters improvise how each is reached. Order-free milestones let the director follow what the characters raise.

**Check often, intervene rarely.** IBSEN's pattern fits ten turns per character: ask "has milestone N happened?" after every turn, don't act before a minimum, force it after a maximum. Like Façade's dormant manager, let the scene run until a milestone lands or the cap hits.

**Direct through characters, not narration.** Drama managers act through characters: a hint, a cue, a new arrival. The director whispers to one character ("You've just learned the ring is missing") rather than writing lines into the transcript; IBSEN's director slipping into narration is the failure to watch for.

**Track a crude tension number.** As in L4D, a rough signal is enough: an observer scores each turn 0 to 10 against a target arc, and the director adds pressure in a lull and eases off after a peak.

**Decide in advance how to handle deviation.** Intervene (block it through another character) or accommodate (rewrite the remaining milestones). Prefer reversible moves, like temporary deniers, and give a returning character Façade's reestablish line.

**Budget and log every intervention.** Give each director move a manipulativity cost and a per-run budget, and log it by turn so step 5's observers see where the story was pushed.

**Keep a commitments ledger.** Per NCP-Bench, a checker should test new turns against established facts.

**Rerun the same scenario.** Like *Sleep No More*'s loop or Forum Theatre's replay: run one scenario three times and compare, or let a student stop the run, replace one character's prompt, and replay from that turn.

## Where the analogy breaks

**There is no player to fool.** Drama management protects a human player's agency and hides itself from that player. In step 2 every character is an agent and the director can rewrite any prompt, so strong story is free; what's at stake is whether the scene stays alive, and the audience should be able to see the director.

**The checker is a model too.** IBSEN's check scored F1 0.77, and NCP-Bench shows fact tracking decays. "Milestone reached" is a judgment to log with its reason, not a fact.

**LLM characters comply too readily.** Façade's players resisted; LLM actors tend to agree, cheer up, and rush to resolution, and IBSEN reports them avoiding villainy. The step 2 director may spend more effort keeping conflict going than pulling characters back on track.

**Tension isn't measured the same way.** L4D measured damage; tension in dialogue is estimated by another model, a reading, not a sensor.

**Commedia actors had years of lazzi.** Improvising to a skeleton worked because performers carried known routines; agents have only their character sheet, so write a few lazzi into it.

## What I could not verify

- Weyhrauch's 1997 thesis itself (not online); Tea for Three details come from Nelson and Mateas 2005.
- That Booth's slides were presented at AIIDE 2009 at Stanford; Left 4 Dead's 2008 release date.
- The "Narrative Chain" mechanism in *From Role-Play to Drama-Interaction* (search summary only).
- HAMLET's director or planner roles and StoryVerse's handling of emergent events (abstracts only). A 2025 static-vs-agentic LLM game master study ([arXiv 2502.19519](https://arxiv.org/abs/2502.19519)) was read only as an abstract and left out.
- NCP-Bench's full paper; I read only the ICML abstract page.
- That commedia scenarios were pinned backstage; Boal's own texts on the Joker; railroading and sandbox as GM terms.
- Riedl's separate player-modeling papers (survey only).

## Sources

- [Mateas and Stern, "Structuring Content in the Façade Interactive Drama Architecture," AIIDE 2005](https://cdn.aaai.org/AIIDE/2005/AIIDE05-016.pdf)
- [Wikipedia, Façade (video game)](https://en.wikipedia.org/wiki/Fa%C3%A7ade_(video_game))
- [Nelson and Mateas, "Search-Based Drama Management in the Interactive Fiction Anchorhead," AIIDE 2005](https://eis.ucsc.edu/papers/Nelson_Mateas_-_SBDM_-_AIIDE05.pdf)
- [Riedl and Bulitko, "Interactive Narrative: An Intelligent Systems Approach," AI Magazine 34(1), 2013, preprint](https://faculty.cc.gatech.edu/~riedl/pubs/aimag.pdf)
- [Booth, "The AI Systems of Left 4 Dead," Valve, 2009](https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf)
- [Han and others, "IBSEN: Director-Actor Agent Collaboration...," arXiv 2407.01093, 2024](https://arxiv.org/html/2407.01093v1)
- [Wang, Zhou, and Ledo, "StoryVerse," FDG 2024, arXiv 2405.13042](https://arxiv.org/abs/2405.13042)
- [Wu and others, "From Role-Play to Drama-Interaction," arXiv 2405.14231, 2024](https://arxiv.org/abs/2405.14231) (not read)
- [Jiang and others, "HAMLET," arXiv 2507.15518, 2025](https://arxiv.org/abs/2507.15518)
- [Ma and others, "Can LLM Agents Stick to the Script?," ICML 2026](https://icml.cc/virtual/2026/poster/64786)
- [Wikipedia, Canovaccio](https://en.wikipedia.org/wiki/Canovaccio); [Wikipedia, Commedia dell'arte](https://en.wikipedia.org/wiki/Commedia_dell%27arte)
- [Wikipedia, Sleep No More (2011 play)](https://en.wikipedia.org/wiki/Sleep_No_More_(2011_play))
- [Wikipedia, Forum theatre](https://en.wikipedia.org/wiki/Forum_theatre)

## Glossary candidates

### Drama manager
**In AI engineering.** An agent outside the cast that watches the run and acts, usually through characters, to keep it heading toward a story.
**In human practice.** The director or stage manager who doesn't perform but decides what happens next.
**In the theater of agents.** After each turn the director agent reads the transcript, checks the next milestone, and either does nothing or whispers a cue to one character.
**Sources.** [Riedl and Bulitko 2013](https://faculty.cc.gatech.edu/~riedl/pubs/aimag.pdf) (verified); [Mateas and Stern 2005](https://cdn.aaai.org/AIIDE/2005/AIIDE05-016.pdf) (verified)

### Beat
**In AI engineering.** The smallest unit the director sequences: a short scene with preconditions, a default sequence, and an effect on story state such as tension.
**In human practice.** The smallest unit of dramatic action in a scene, in playwriting and acting vocabulary.
**In the theater of agents.** "The argument about the will" is one beat; the director picks it next because tension is low and the inheritance hasn't come up yet.
**Sources.** [Mateas and Stern 2005](https://cdn.aaai.org/AIIDE/2005/AIIDE05-016.pdf) (verified)

### Tension arc
**In AI engineering.** A target curve of story tension over time that the director tries to match when choosing what comes next.
**In human practice.** The rising action, climax, and falling action of a play; Façade's authors used an Aristotelian arc.
**In the theater of agents.** An observer scores each turn 0 to 10; the dashboard draws actual against target and marks where the director stepped in.
**Sources.** [Mateas and Stern 2005](https://cdn.aaai.org/AIIDE/2005/AIIDE05-016.pdf) (verified); [Booth 2009](https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf) (verified)

### Intervention and accommodation
**In AI engineering.** The two answers to a character leaving the story: block the deviation, or let it stand and replan the remaining milestones.
**In human practice.** A GM steering the party back versus rewriting the adventure around them.
**In the theater of agents.** The detective leaves town; the director sends a storm that closes the road, or moves the confession to the train station.
**Sources.** [Riedl and Bulitko 2013](https://faculty.cc.gatech.edu/~riedl/pubs/aimag.pdf) (verified)

### Adaptive pacing
**In AI engineering.** Adjusting how often pressure arrives from a running estimate of the participants' intensity, cycling through build-up, peak, and relax.
**In human practice.** The rhythm a director or DJ gives a show by alternating intense and quiet stretches.
**In the theater of agents.** After three high-tension turns the director holds back new events for two turns before adding the next complication.
**Sources.** [Booth 2009](https://cdn.fastly.steamstatic.com/apps/valve/2009/ai_systems_of_l4d_mike_booth.pdf) (verified)

### Scenario (canovaccio)
**In AI engineering.** A skeleton of scenes and entrances given to agents in place of a script, leaving dialogue to them.
**In human practice.** The commedia dell'arte outline of acts and scenes, improvised by masked stock types.
**In the theater of agents.** The director's file lists six scenes and who enters in each; each character gets two lazzi to fall back on.
**Sources.** [Wikipedia, Canovaccio](https://en.wikipedia.org/wiki/Canovaccio) (verified); [Wikipedia, Commedia dell'arte](https://en.wikipedia.org/wiki/Commedia_dell%27arte) (verified)

### Joker
**In AI engineering.** A facilitator role that runs replays and judges interventions without writing content.
**In human practice.** Boal's Forum Theatre facilitator, who lets spect-actors stop and replace a character, and asks whether a fix is "magic."
**In the theater of agents.** A student stops the run at turn 12, rewrites one character's prompt, replays from there, and the class judges whether the change was plausible.
**Sources.** [Wikipedia, Forum theatre](https://en.wikipedia.org/wiki/Forum_theatre) (verified; Boal's texts unverified)
