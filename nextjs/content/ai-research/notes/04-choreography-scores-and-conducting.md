---
title: "Choreography, scores, and conducting as models for agents"
description: "How dance and the less-discussed corners of music (parts, cues, graphic scores, conduction, game pieces, In C) coordinate performers without a single controller, and what each lends to a theater of agents."
author: claude (research subagent D)
date: 2026-11-04
status: draft; agent research, check before citing
order: 4
---

# Choreography, scores, and conducting as models for agents

Software engineers say "orchestration" when one conductor directs the services and "choreography" when each participant knows its part and reacts to the others; the pairing is usually credited to Chris Peltz's 2003 article in IEEE *Computer*. Dance and music have much richer versions of both, and they keep the two layers apart that agent builders often blur: what is written down in advance (notation, scores, parts, rules) and what is passed in the moment (counts, cues, gestures, touch). The practices below run from fully written (Feuillet, Labanotation, the orchestral part) through rule-based (Cunningham's chance, Trisha Brown's accumulations, Riley's *In C*) to live-signalled (Butch Morris's conduction, Zorn's *Cobra*, ballroom lead and follow). For a class building an ensemble of AI characters with a director, producers, and observers, the most useful finds are the dancers' cue network in Forsythe's *One Flat Thing, reproduced*, the dance captain as a maintainer rather than an author, Zorn's split between deciding *when and with whom* and leaving *what* to the players, and *In C* as a loop with a local stop rule. This note skips what the earlier orchestra section already covers (orchestration as assigning parts, the conductor's history, sections and the concertmaster's bowings).

## 1. Who coordinates a dance

Dance has a set of roles that separate making a work from keeping it alive.

- **The choreographer** makes the work. William Forsythe insists that "choreography and dancing are two distinct and very different practices," and calls choreography "the method of deriving methods" (verified: read [Forsythe, "Choreographic Objects"](https://www.williamforsythe.com/essay.html)). In Forsythe's framing the choreographer designs a system that produces movement rather than every movement.
- **The répétiteur** "teaches the steps and interpretation of the roles" to a company performing a work; the word comes from *répéter*, to rehearse. Balanchine, Robbins, Arpino, and Tharp set up trusts that named "conservators," dancers who know particular ballets deeply, to act as répétiteurs and keep the works accurate after the choreographers' deaths (verified: read [Wikipedia, "Répétiteur"](https://en.wikipedia.org/wiki/R%C3%A9p%C3%A9titeur)).
- **The dance captain** on a Broadway show "maintains the integrity of the choreography" through the run, knows "all of the choreography for the entire show" (which is why dance captains are often also swings), runs "cleaning rehearsals," rehearses covers and swings, helps "integrate new cast members," and keeps "multiple documents to notate formations and detail" (verified: read [Broadway News, "Little-known theater jobs: dance captain"](https://www.broadwaynews.com/little-known-theater-jobs-dance-captain/)). That the captain works with the stage manager on daily cast changes comes from secondary career pages (unverified: search summaries only).
- **The stage manager calling cues** is covered in section 3 of the earlier study; it isn't repeated here.

The pattern: one author, then a chain of maintainers whose job is fidelity, not invention. The dance captain is the closest human analogue to an evaluator agent that holds the spec and checks every performance against it, and to a test suite that onboards a replacement.

## 2. What gets written down: notation and its limits

Dance has tried to write itself down for more than three centuries, and each system chose what to record.

- **Feuillet notation (1700).** Devised by Pierre Beauchamp in the 1680s and published in detail by Raoul-Auger Feuillet in *Chorégraphie* (1700). The melody runs across the top of the page and the bar lines of the music "are also drawn across the tract of the dancers," tying each step on the floor path to its bar; "the focus of the notation is the footwork" (verified: read [Wikipedia, "Feuillet notation"](https://en.wikipedia.org/wiki/Feuillet_notation)). It records a path through space indexed to musical time: a shared clock.
- **Labanotation (1928).** Rudolf Laban published *Schrifttanz* in 1928. The staff is vertical and "read from bottom to top"; "the centre line of the staff represents the centre line of the body," and "the length of a symbol defines the duration of the movement" (verified: read [Wikipedia, "Labanotation"](https://en.wikipedia.org/wiki/Labanotation)). Each body part gets its own column, so the score is effectively a parallel timeline per limb.
- **Benesh Movement Notation.** Created by Joan and Rudolf Benesh in the late 1940s and introduced publicly in 1955, on a five-line staff whose lines correspond to head, shoulders, waist, knees, and feet, read left to right so it can sit "beneath, and in sync with," the music (verified: read [Wikipedia, "Benesh Movement Notation"](https://en.wikipedia.org/wiki/Benesh_Movement_Notation)).

**Setting a work from a score.** The Dance Notation Bureau holds notated scores and supplies stagers: "A stager guides dancers through the entire dance, teaching each step." It says "whether a dance is taught from Labanotation score or from memory, the process remains the same," but the score lets the stager "consult the score for definitive answers when questions arise," "eliminating memory lapses." Permission comes from "the choreographer or estate," and the rights holder sets the fee (verified: read [Dance Notation Bureau, "Staging from Score"](https://www.dancenotation.org/staging-from-score/)). So even with a full score, transmission still runs through a person who teaches the body. Notation is the reference, not the delivery channel.

**Body to body.** Yvonne Rainer's *Trio A* (1966) "has been widely taught and performed by other dancers," and was open to "anyone who wanted to learn it" (verified: read [Wikipedia, "Trio A"](https://en.wikipedia.org/wiki/Trio_A) and [Wikipedia, "Judson Dance Theater"](https://en.wikipedia.org/wiki/Judson_Dance_Theater)). Accounts that Rainer later restricted teaching to designated transmitters are well known in dance writing but I did not read a source for them (unverified).

**Notation into software.** Forsythe's *Improvisation Technologies* (CD-ROM, 1999) drew "animated white lines" over video of him demonstrating, "tracing the invisible geometry of Forsythe's movements"; an earlier prototype (1994) was "a professional training tool for the dancers of Ballett Frankfurt" so they could study his principles on their own. ZKM put 63 of the lecture demonstrations online in 2023 (verified: read [ZKM, "Improvisation Technologies: The Website Project"](https://zkm.de/en/node/62551)). Cunningham choreographed with the LifeForms software after 1991 and released his *Loops* as motion-capture data under a Creative Commons license in 2008 (verified: read [Wikipedia, "Merce Cunningham"](https://en.wikipedia.org/wiki/Merce_Cunningham)).

## 3. Rules instead of steps: generative choreography

Here the written thing is a procedure, and the dance is what the procedure produces.

- **Cunningham and Cage: chance.** Cage used the *I Ching*'s 64 hexagrams for musical choices and Cunningham adapted it for dance. *Suite by Chance* (1953) was his first work made entirely by chance: charts listed elements such as space, time, and positions, and a coin toss settled each. In *Field Dances* (1963) dancers received sequences to perform "in any order, as often as they liked"; in *Canfield* (1969) playing cards assigned movements; the *I Ching* sometimes set the order of dances so the company learned it only on the night. Cunningham and Cage held that "dance and its music should not be intentionally coordinated with one another" (verified: read [Wikipedia, "Merce Cunningham"](https://en.wikipedia.org/wiki/Merce_Cunningham)). That music and dance often met for the first time at the premiere, aligned only by an agreed time structure (for *Root of an Unfocus*, 1944, only at section boundaries), is widely reported (unverified: search summaries of the Cunningham Trust and Northwestern pages, not read).
- **Trisha Brown: accumulation.** *Accumulation* (premiered October 22, 1971; about 4½ minutes): "One simple gesture is presented." It repeats until absorbed, then a second is added, and so on until no more can be added (verified: read [Trisha Brown Dance Company, *Accumulation*](https://trishabrowncompany.org/repertory/accumulation-1.html?ctx=date)). The sequence 1, 1-2, 1-2-3 is an append-only log replayed from the start each time.
- **Judson Dance Theater (1962–64)** grew from Robert Dunn's composition class at Cunningham's studio; Dunn had studied with Cage. Its members (Brown, Paxton, Rainer, Childs, Gordon, Hay, Monk, and others) used ordinary actions like walking and sitting, "democratic structures, improvisation, and a focus on process over product" (verified: read [Wikipedia, "Judson Dance Theater"](https://en.wikipedia.org/wiki/Judson_Dance_Theater)). The details of Dunn's score and task methods I did not reach (unverified).
- **Forsythe: the cue network.** *Synchronous Objects* (2009; Forsythe with Maria Palazzi, Norah Zuniga Shaw, and over 30 researchers at Ohio State's ACCAD) turned Forsythe's *One Flat Thing, reproduced* (2000) into data and visualizations. It found a **cue system**, "a network of relationships in which dancers give and receive cues," more than 200 of them, identified by interviewing the dancers, and an **alignment system**, brief moments when dancers synchronize some but not all aspects of their action. Forsythe's frame: "choreography is an organizational practice" (verified: read [Synchronous Objects](https://synchronousobjects.osu.edu/)). This is the strongest dance precedent for software choreography: no one calls the cues; each dancer's trigger is another dancer's action.

## 4. Coordination by touch and following

- **Flocking.** In one common improv warm-up, the group forms a pyramid: "one person in front, with two people behind her and three behind them"; "each row follows the row ahead," movement degrades toward the back, and when the leader turns, the flock turns and she "can no longer see what is happening." Leadership changes with the music or when someone comes forward (verified: read [ImproWiki, "Flock dance"](https://improwiki.com/en/wiki/flock-dance)). In many dance-class versions whoever ends up at the front after a turn becomes the leader, so leadership passes by geometry (unverified: search summaries of curriculum and workshop pages; there is no single canonical score).
- **Contact improvisation.** Steve Paxton's work at Oberlin in January 1972 led to *Magnesium*, a twenty-minute piece on gym mats; later that year *Contact Improvisations* was shown in New York. The form aims to be non-hierarchical, driven by "a simple exchange of weight and touch," and in a "round robin" other dancers can join a pair and replace one member (verified: read [Wikipedia, "Contact improvisation"](https://en.wikipedia.org/wiki/Contact_improvisation)).
- **Ballroom lead and follow.** The leader is "largely responsible for initiating movement" and in improvised dance chooses the steps; signals pass through the connection by compression and tension, and the follower gives feedback the leader adapts to. The follower can add styling; **backleading** (moving before or against the lead) is a fault; **hijacking** is a brief, deliberate role reversal signalled by increased tension (verified: read [Wikipedia, "Lead and follow"](https://en.wikipedia.org/wiki/Lead_and_follow)).

**Counts and cues in dance.** Dancers commonly coordinate by counting in eights against the music, by music cues (a phrase or hit in the score), and by visual cues from other dancers (unverified: general practice, not checked against a source this session). Forsythe's 200-plus cues (above) are the documented case of the visual kind.

## 5. Music, the deltas: parts, cues, and shared addresses

- **The score versus the parts.** The conductor reads the full score; each player reads only their part. **Cue notes** are small notes in a part showing "important passages being played by other instruments, such as an entrance after a long period of rest," labelled with the cued instrument and transposed into the reader's key; they can also prepare a substitute player when an instrument is missing (verified: read [Wikipedia, "Cue note"](https://en.wikipedia.org/wiki/Cue_note)). This is information hiding with just enough of the neighbours' state included to trigger your entrance.
- **Rehearsal letters and bar numbers.** Bold letters placed in both score and parts give everyone a common restart point; "begin at letter M" is easier than "bar 387." They sit at musically significant points so players counting rests can confirm their place; long works switch to rehearsal numbers (verified: read [Wikipedia, "Rehearsal letter"](https://en.wikipedia.org/wiki/Rehearsal_letter)). These are shared addresses into a document that each reader sees a different slice of: the musical equivalent of IDs or anchors in a shared state store.

## 6. Music, the deltas: indeterminacy, conduction, game pieces

- **Graphic scores.** Earle Brown's *December 1952* "consists purely of horizontal and vertical lines varying in width, spread out over the page," translated into sound by the performer. In Brown's "open form" works, material is divided into numbered "events" on "pages," and the conductor picks the order live: a placard for the page, the left hand for the event, the right hand for the downbeat (verified: read [Wikipedia, "Earle Brown"](https://en.wikipedia.org/wiki/Earle_Brown); the article is flagged for weak citation). Cornelius Cardew's *Treatise* (1963–67) is 193 pages of lines, symbols, and shapes, and "is not accompanied by any explicit instructions to the performers"; performers devise their own rules in advance (verified: read [Wikipedia, "Treatise (music)"](https://en.wikipedia.org/wiki/Treatise_(music))).
- **Conduction (Butch Morris).** Morris's *Conduction* is "a type of structured free improvisation where Morris directs and conducts an improvising ensemble" through hand and baton gestures (verified: read [Wikipedia, "Butch Morris"](https://en.wikipedia.org/wiki/Butch_Morris)). A musician who played in his ensembles counts "eighty-five in total" signs and gives one example, "memory 1," which tells players to "repeat what you just played"; she describes being in the ensemble as "to be led, to be played — which takes a lot of trust" (verified: read [Afrosonic Mapping, "Butch Morris: Conduction"](https://afrosonicmapping.com/2019/09/24/lawrence-d-butch-morris-1947-2013-conduction-a-liberated-subversive-vocabulary/)). Signs such as *sustain* (hold any sound), *repeat*, *memory* with a number to recall a marked passage later, and *panning* across the ensemble appear in a teaching handout and Morris's book *The Art of Conduction* (2017) (unverified: search snippets only; the book and handout were not read). The memory sign is the striking design: the conductor bookmarks a moment and calls it back by number.
- **Sun Ra.** A former Arkestra player's memoir describes Sun Ra counting off tunes, starting pieces from a wandering piano intro the band had to catch, cutting the band off with his arms, and cueing a solo with "the scantest wink," while other band members relayed cues ("It's you. It's your solo.") (verified: read [Literary Hub, "What playing with Sun Ra in college taught me about myself"](https://lithub.com/what-playing-with-sun-ra-in-college-taught-me-about-myself)). One player's account, not a general description of big-band cueing.
- **John Zorn's *Cobra* (1984).** A "game piece" with rules but no fixed sequence, for improvisers and a **prompter** who holds cue cards. A card marked "XP" calls a crossfade: active players stop, silent ones start. Other cards form subgroups or have players imitate one another. Players *request* calls from the prompter by gesture or headgear, and "guerrilla units" can temporarily ignore the prompter. Zorn was "interested in telling the musicians when to play, and with whom, but without telling them what to play" (verified: read [Wikipedia, "Cobra (Zorn)"](https://en.wikipedia.org/wiki/Cobra_(Zorn))).
- **Terry Riley's *In C* (1964).** Fifty-three patterns, any instruments, about three dozen players suggested. Each player moves through the patterns in order and decides how many times to repeat each; later instructions ask players to stay within two or three patterns of one another; an optional eighth-note pulse on high Cs holds time; "it is very important that performers listen very carefully to one another." The piece ends when everyone reaches pattern 53 and each player stops on their own (verified: read [Wikipedia, "In C"](https://en.wikipedia.org/wiki/In_C)). There is no conductor: a shared ordered list, a shared clock, a local choice to advance, a soft constraint on spread, and a stop condition that is true only when every player has reached the end.

## 7. Comparison

| practice | who coordinates | what is written down | how control passes | agent-system analogue |
|---|---|---|---|---|
| Ballet repertory (répétiteur, dance captain) | choreographer, then maintainers | steps, formations, notes | teaching, cleaning rehearsals, notes | a spec plus an evaluator that checks every run and onboards replacements |
| Labanotation / Benesh score, staged | stager from the score | every body part over time | a person reads the score and teaches | full shared state; a human or agent still has to "compile" it |
| Cunningham chance | choreographer's procedure | charts plus coin or *I Ching* | random draw sets order or content | seeded randomness in planning |
| Trisha Brown, *Accumulation* | the rule | one rule | append one gesture, replay from start | append-only log replayed each turn |
| Forsythe, *One Flat Thing, reproduced* | no one; dancers cue dancers | cue and alignment systems | 200+ peer cues | event-driven choreography: subscribe to another agent's action |
| Flocking | whoever is in front | a short rule set | leader changes with turns or music | leader election by position |
| Lead and follow | leader, with follower feedback | nothing (style conventions) | pressure through the connection; hijack | tight two-agent loop with a back-channel and an override signal |
| Orchestral parts | conductor (full score) | score; each player's part with cue notes | downbeat, gestures, cue notes, rehearsal letters | per-agent context with neighbour cues; shared IDs for restart |
| Earle Brown open form | conductor picks events live | numbered events on pages | placard and hand signals | router choosing among prebuilt modules |
| Cardew, *Treatise* | performers | images, no instructions | rules the group invents beforehand | agents given an ambiguous artifact and told to agree on a protocol |
| Morris, conduction | conductor | a sign lexicon (not the music) | gestures, incl. "memory N" | director with a small command vocabulary and numbered bookmarks |
| Zorn, *Cobra* | prompter, on request | rules and cue cards | cards held up; players request; guerrilla override | router that sets who and when, never what; requests and escape hatches |
| Riley, *In C* | no one | 53 patterns and a page of instructions | each player advances at will, within a band | loop over a shared list with a local advance rule and a global stop condition |

## What it lends to a theater of agents

- **Keep the score and the parts separate.** Give each character agent its own part (its lines, goals, and what it knows) plus cue notes: a few lines of what other characters just did that should trigger it. The director holds the full score. This is the orchestral answer to context isolation, and it echoes Mike Leigh's method in the earlier study.
- **Give everyone shared addresses.** Number scenes or beats like rehearsal letters so the director can say "back to C" and every agent knows where that is in its own part.
- **Decide what the director controls.** Zorn's prompter controls when and with whom, never what. A student director agent that only picks the next speaker and who is on stage, leaving content to the characters, is a clean, testable design. Add a request channel (a character can ask for the floor) and a guerrilla card (a producer can override the director once).
- **Use a small command lexicon.** Morris worked with a fixed sign vocabulary. A director that can emit only a handful of typed commands (sustain, repeat, recall #2, cut, crossfade) is easier to debug than one that writes free-text notes, and "memory N" is a ready-made way to plant and pay off a callback.
- **Producers as chance procedures.** A producer that injects twists is Cunningham's coin toss. Seed it and log the draw so a run can be replayed.
- **Observers as dance captains.** An observer that holds the spec and writes notes after each scene (spacing, lost detail) maintains rather than invents. Keep its notes out of the characters' context until the next "cleaning rehearsal."
- **Choreography without a conductor.** Forsythe's cue network and *In C* show that a coherent piece can run with no central controller if each agent knows its triggers, everyone shares a clock, and there is a stop rule. *In C* translates directly: a shared list of beats, each agent advances when it judges, no agent may get more than two beats ahead of the slowest, and the run ends when all reach the last beat.
- **Accumulation as a structure.** Brown's 1, 1-2, 1-2-3 is a good exercise for a turn-taking ensemble: each turn replays the story so far and adds one event. It makes context growth visible.

## Where the analogy breaks

- **Bodies carry what notation can't.** The Dance Notation Bureau still sends a person to teach even when the score is complete. Agents have no rehearsal history or muscle memory; everything they "know" is in the prompt, so a part must be more explicit than a dancer's part.
- **Real cues are continuous; agent turns are discrete.** Lead and follow works through constant pressure, and *In C* through constant listening. Turn-taking agents see a snapshot, act, and wait. "Listening carefully to one another" becomes "reading the transcript," and timing-based effects (overlap, crossfade) have to be simulated.
- **Chance in art is chosen and bounded.** Cunningham chose the charts the coin tossed over. Language-model randomness is uncontrolled and mixed with the model's habits, so a "producer" twist needs its own explicit menu to be a chance procedure in Cunningham's sense.
- **Trust and refusal.** Morris's players describe being led as an act of trust, and *Cobra*'s guerrilla units can refuse the prompter. Agreeable models rarely refuse; refusal has to be designed in.
- **Conductorless pieces still have a composer.** *In C* has no conductor but has Riley's 53 patterns and his instructions. "Choreography" in software still needs someone to write each participant's part.

## What I could not verify

- Peltz's own definitions of orchestration and choreography: I found the citation (*Computer* 36(10): 46–52, October 2003, DOI 10.1109/MC.2003.1236471, per dblp listings in search results) but could not extract the PDF text, so the definitions in the opening paragraph are the conventional reading, not quoted from him. One library page gives the volume as 28, apparently in error.
- Specific Morris signs beyond "memory" (sustain, repeat, panning, panorama) and his first conduction's date: search snippets only.
- Cunningham and Cage's practice of music and dance meeting at the premiere: widely reported, not read in a primary source this session.
- Rainer's later rules for who may teach *Trio A*; Robert Dunn's class methods.
- The flocking rule that whoever is in front after a turn leads: workshop and curriculum pages in search results, no canonical source.
- Dance counting in eights and music/visual cueing as general practice: from general knowledge, not checked.
- Sun Ra's cueing beyond one memoir; general big-band cueing (section leaders, head arrangements) not researched.
- Rehearsal director as a distinct title from répétiteur: not researched.

## Sources

- [Chris Peltz, "Web Services Orchestration and Choreography," *Computer*, 2003 (Vidal's library listing)](https://jmvidal.cse.sc.edu/lib/peltz03a.html)
- [William Forsythe, "Choreographic Objects"](https://www.williamforsythe.com/essay.html)
- [Synchronous Objects for One Flat Thing, reproduced (Ohio State, 2009)](https://synchronousobjects.osu.edu/)
- [ZKM, "William Forsythe: Improvisation Technologies. The Website Project"](https://zkm.de/en/node/62551)
- [Wikipedia, "Répétiteur"](https://en.wikipedia.org/wiki/R%C3%A9p%C3%A9titeur)
- [Broadway News, "Little-known theater jobs: dance captain"](https://www.broadwaynews.com/little-known-theater-jobs-dance-captain/)
- [Wikipedia, "Feuillet notation"](https://en.wikipedia.org/wiki/Feuillet_notation)
- [Wikipedia, "Labanotation"](https://en.wikipedia.org/wiki/Labanotation)
- [Wikipedia, "Benesh Movement Notation"](https://en.wikipedia.org/wiki/Benesh_Movement_Notation)
- [Dance Notation Bureau, "Staging from Score"](https://www.dancenotation.org/staging-from-score/)
- [Wikipedia, "Trio A"](https://en.wikipedia.org/wiki/Trio_A)
- [Wikipedia, "Judson Dance Theater"](https://en.wikipedia.org/wiki/Judson_Dance_Theater)
- [Wikipedia, "Merce Cunningham"](https://en.wikipedia.org/wiki/Merce_Cunningham)
- [Trisha Brown Dance Company, *Accumulation*](https://trishabrowncompany.org/repertory/accumulation-1.html?ctx=date)
- [ImproWiki, "Flock dance"](https://improwiki.com/en/wiki/flock-dance)
- [Wikipedia, "Contact improvisation"](https://en.wikipedia.org/wiki/Contact_improvisation)
- [Wikipedia, "Lead and follow"](https://en.wikipedia.org/wiki/Lead_and_follow)
- [Wikipedia, "Cue note"](https://en.wikipedia.org/wiki/Cue_note)
- [Wikipedia, "Rehearsal letter"](https://en.wikipedia.org/wiki/Rehearsal_letter)
- [Wikipedia, "Earle Brown"](https://en.wikipedia.org/wiki/Earle_Brown)
- [Wikipedia, "Treatise (music)"](https://en.wikipedia.org/wiki/Treatise_(music))
- [Wikipedia, "Butch Morris"](https://en.wikipedia.org/wiki/Butch_Morris)
- [Afrosonic Mapping, "Lawrence D. 'Butch' Morris: Conduction, a liberated subversive vocabulary"](https://afrosonicmapping.com/2019/09/24/lawrence-d-butch-morris-1947-2013-conduction-a-liberated-subversive-vocabulary/)
- [Literary Hub, "What playing with Sun Ra in college taught me about myself"](https://lithub.com/what-playing-with-sun-ra-in-college-taught-me-about-myself)
- [Wikipedia, "Cobra (Zorn)"](https://en.wikipedia.org/wiki/Cobra_(Zorn))
- [Wikipedia, "In C"](https://en.wikipedia.org/wiki/In_C)

## Glossary candidates

### Choreography
**In AI engineering.** A way of coordinating services or agents with no central controller: each participant knows its part and reacts to messages or events from the others. Contrasted with orchestration, where one conductor calls each step; the pairing is usually credited to Peltz (2003).
**In human practice.** The making of a dance; Forsythe calls it "an organizational practice" and "the method of deriving methods."
**In the theater of agents.** Characters each subscribe to cues from other characters and speak when triggered, with no director choosing the next speaker.
**Sources.** [Forsythe, "Choreographic Objects"](https://www.williamforsythe.com/essay.html) (verified); [Synchronous Objects](https://synchronousobjects.osu.edu/) (verified); [Peltz 2003](https://jmvidal.cse.sc.edu/lib/peltz03a.html) (citation verified, definitions unverified)

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
