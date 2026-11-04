---
title: "Formats and mechanics: cards for putting a cast through a format"
description: Twenty short cards, ten from podcasts and radio and ten from reality television, each turning a broadcast role or rule into one concrete rule a theater of agents can run.
author: claude (research subagent J)
date: 2026-11-04
status: draft; agent research, check before citing
order: 2
---

# Formats and mechanics

These cards are parts for building a format: each names one role or rule from radio, podcasts, or reality television, gives a human example, and turns it into a rule an orchestrator can enforce on persona agents (who acts, when, with what input, producing what, under what cap). The idea is "same cast, different rules; same rules, different cast": pick an ensemble, pick a handful of cards, and see what the combination produces. The longer story of how reality TV is produced (story producers, confessionals, frankenbites, casting, game masters) is in [note 03](../notes/03-reality-tv-and-game-masters.md); these cards don't repeat it.

## Podcast and radio

### Host

**What it is.** The host owns the clock and the agenda: opens, introduces, asks, moves on, and closes. Johnny Carson hosted *The Tonight Show* on NBC from 1962 to 1992, with Ed McMahon beside him. Ian Hutchby's conversation-analysis study of a British talk radio show (1996) is about the asymmetries between host and caller, including who sets the agenda.

**The rule for agents (adaptation).** The host speaks first and last in every segment and is the only agent who may change the topic. Input: the producer's briefing and the event log. Output: one turn of at most 60 words that either asks one question, follows up, or hands off by name.

**What it produces.** A spine. Every other voice is a response to the host, which keeps the transcript readable.

**Watch out for.** Hosts that answer their own questions or summarize the guest back at length; cap the words and forbid restating.

**Sources.** [Ed McMahon, Wikipedia](https://en.wikipedia.org/wiki/Ed_McMahon) (verified); [Hutchby, *Confrontation Talk*, Routledge 1996](https://www.routledge.com/Confrontation-Talk-Arguments-Asymmetries-and-Power-on-Talk-Radio/Hutchby/p/book/9780805817973) (verified: publisher description and contents read; book not read).

### Co-host

**What it is.** Two hosts of equal standing who riff, disagree, and finish each other's thoughts. Tom and Ray Magliozzi hosted *Car Talk*, a call-in show about car repair, from 1977 on Boston's WBUR (nationally on NPR from 1987 until new episodes ended in 2012), diagnosing listeners' cars over the phone while joking with each other.

**The rule for agents (adaptation).** Two agents share the host role and alternate as lead per segment. The non-lead may interject once per exchange (at most 30 words) to agree, disagree, or add a fact, and must address the co-host by name at least once per segment.

**What it produces.** Chemistry and friendly conflict; the audience gets two takes on every answer.

**Watch out for.** Two agents converging on the same voice and agreeing with everything; give them opposed default positions in their persona files.

**Sources.** [Car Talk, Wikipedia](https://en.wikipedia.org/wiki/Car_Talk) (verified).

### Guest

**What it is.** The person brought in because they know or did something. An NPR show editor's checklist (Jerome Socolovsky, 2021) asks first "Why is _____ the right guest?" and lists the kinds: a newsmaker, an eyewitness, an affected person, a stakeholder, a journalist.

**The rule for agents (adaptation).** The guest agent answers only the question it was asked, in at most 80 words, from its own persona file and the intake material. It may decline once per episode ("I'd rather not get into that") and may not ask the host questions unless invited.

**What it produces.** Substance, and the friction of a guest who has their own agenda.

**Watch out for.** Guests who are too agreeable and too complete; give them one thing they want to promote and one thing they avoid.

**Sources.** [NPR Training, "The show editor's interview checklist," Socolovsky 2021](https://training.npr.org/2021/03/04/the-show-editors-interview-checklist/) (verified).

### Sidekick

**What it is.** The second chair who laughs, needles, and makes the host look good. Ed McMahon announced and sat beside Johnny Carson on *The Tonight Show* from 1962 to 1992 ("Heeeere's Johnny!"), nicknamed the "Human Laugh Track"; Andy Richter sat beside Conan O'Brien on *Late Night* from 1993 to 2000; Robin Quivers joined Howard Stern's morning show at WWDC in Washington in 1981 as the newscaster and became his co-host.

**The rule for agents (adaptation).** After each host turn, the sidekick may add one line of at most 25 words, or pass. The butt of the joke is the host, the sidekick, or the situation, never the guest. In the class's podcast-prep app this is the sidekick that offers 0 to 3 optional jokes per item, where "no useful joke here" is a valid result.

**What it produces.** Rhythm and warmth; a release valve between questions.

**Watch out for.** A sidekick that jokes on every turn; make passing the default and count passes on the dashboard.

**Sources.** [Ed McMahon](https://en.wikipedia.org/wiki/Ed_McMahon), [Andy Richter](https://en.wikipedia.org/wiki/Andy_Richter), [Robin Quivers](https://en.wikipedia.org/wiki/Robin_Quivers), Wikipedia (all verified).

### Producer

**What it is.** The person off-mic who books the guest, does the pre-interview, writes the host's briefing, and talks into the host's ear during the show. Socolovsky's checklist asks whether a pre-interview "gauged their responses to your questions, but without spoiling the conversation for the host," whether the background is in "the host passoff," and whether the host has "ideas for pushback." Live, producers reach the host through talkback (interruptible foldback): an earpiece the audience can't hear.

**The rule for agents (adaptation).** Before the show, the producer writes the host briefing (background, the central question, three questions, one pushback). During the show it may whisper to the host on a private channel at most once every three turns, in at most 20 words. It never speaks on air.

**What it produces.** A hidden hand; the dashboard can show whisper versus what the host did with it.

**Watch out for.** The host reading whispers aloud; mark the channel private in the host's prompt.

**Sources.** [NPR Training checklist, Socolovsky 2021](https://training.npr.org/2021/03/04/the-show-editors-interview-checklist/) (verified); [Interruptible foldback, Wikipedia](https://en.wikipedia.org/wiki/Interruptible_foldback) (verified).

### Caller

**What it is.** A member of the audience who gets on air for a minute. Phone-ins date to the 1920s: a December 1924 phone-in on BBC Nottingham was reported in *Radio Times* in 1925. On talk radio a call screener takes each caller's details, which appear on the host's screen before the call goes live; a delay lets the station cut anything unbroadcastable. Hutchby found the argument on talk radio is shaped by the caller having to state a position first.

**The rule for agents (adaptation).** A screener agent takes one caller per segment from a queue, writes a one-line card (name, question, stance) for the host, and passes it. The caller gets two turns of at most 40 words; the host decides when the call ends.

**What it produces.** Outside voices and surprise inside a controlled format.

**Watch out for.** Every caller sounding like the same agent; generate the queue with varied stances in advance.

**Sources.** [Phone-in, Wikipedia](https://en.wikipedia.org/wiki/Phone-in) (verified); Hutchby 1996 (claim about first position from memory of the book; unverified: book not read).

### Cold open

**What it is.** A scene that starts before the titles to hook the audience. *Saturday Night Live* has opened with a cold-open sketch since its 1975 premiere; TV teasers often end on something unresolved. Many podcasts do the same with a clip pulled from later in the episode.

**The rule for agents (adaptation).** After the episode is recorded, an editor agent picks one exchange of at most 60 words from the event log, quoted exactly, that raises a question the episode answers, and places it before the host's welcome. It may not rewrite the lines.

**What it produces.** A hook, and a reason to keep the log: the open is chosen after the fact.

**Watch out for.** Editors paraphrasing to make the clip punchier, which is a frankenbite (see note 03); require exact quotes with turn IDs.

**Sources.** [Cold open, Wikipedia](https://en.wikipedia.org/wiki/Cold_open) (verified); the podcast-clip practice is general knowledge (unverified: no source read).

### Recurring segment

**What it is.** A named slot with fixed rules that returns every episode. David Letterman's Top Ten List first aired on September 18, 1985 ("The Top Ten Words That Almost Rhyme With 'Peas'") and ran for about thirty years, read in reverse from ten to one.

**The rule for agents (adaptation).** The run-down includes one named segment with a fixed template (for example, "Three Things I Learned This Week": each cast member gives one item of at most 20 words, host picks a winner). The template is in the system prompt; only the content changes.

**What it produces.** Familiarity and comparison across episodes; a natural column for the dashboard.

**Watch out for.** Agents drifting from the template after a few rounds; validate the segment's output against a schema.

**Sources.** [Late Show Top Ten List, Wikipedia](https://en.wikipedia.org/wiki/Late_Show_Top_Ten_List) (verified).

### Running bit

**What it is.** A joke that recurs across episodes and gets funnier through repetition. On *The Jack Benny Program*, Benny's basement vault was a running gag: any break-in set off an elaborate run of sound effects.

**The rule for agents (adaptation).** The producer seeds one bit in the shared state (a phrase, an object, a grudge). Any agent may call back to it at most once per episode, and an observer logs each callback with its turn ID.

**What it produces.** Continuity, memory, and the feeling of an ensemble with history.

**Watch out for.** The bit appearing every turn once it is in context; the once-per-episode cap matters, and the observer can enforce it.

**Sources.** [Running gag, Wikipedia](https://en.wikipedia.org/wiki/Running_gag) (verified; the show's years are from general knowledge, unverified).

### Interview arc

**What it is.** The shape of a good interview: open (who are you, why now), deepen (the specifics), turn (the pushback or the surprise), close (what next). The NPR checklist asks, "Do the questions follow a logical arc? Is there a beginning, middle and end?" and whether it is "the right number of questions for the segment length."

**The rule for agents (adaptation).** The interviewer writes 2 to 4 questions per item, each tagged with its stage (open, deepen, turn, close) and a one-line "why," as the class's podcast-prep interviewer does. The host must ask them in stage order and must hit "turn" before "close."

**What it produces.** Shape: a conversation that builds instead of a list of questions.

**Watch out for.** Every "turn" being a softball; require the turn question to name a counter-claim or a cost.

**Sources.** [NPR Training checklist, Socolovsky 2021](https://training.npr.org/2021/03/04/the-show-editors-interview-checklist/) (verified; the four stage names are this card's framing, not NPR's).

## Reality-show mechanics

### Challenge

**What it is.** A competition each round that sorts the cast. On *Survivor* (CBS, 2000) challenges are for reward (food, comfort, letters from home) or for immunity (safety from the vote), and the difference drives strategy.

**The rule for agents (adaptation).** Each round the director posts a challenge prompt (a riddle, a pitch, a piece of writing) and its stakes: reward (a perk, such as one extra turn or a peek at a confessional) or immunity. Each contestant gets one submission of at most 80 words; a judge agent scores them against a rubric posted in advance.

**What it produces.** Winners and losers each round, and a reason to perform rather than just talk.

**Watch out for.** Judge agents favoring the longest or most flattering answer; publish the rubric and blind the names.

**Sources.** [Survivor (American TV series), Wikipedia](https://en.wikipedia.org/wiki/Survivor_(American_TV_series)) (verified).

### Immunity

**What it is.** Protection from elimination for one round. *Survivor*'s immunity challenge winner can't be voted out; *Big Brother*'s Head of Household (CBS, 2000) is safe that week and nominates others; on *The Traitors* (BBC, 2022) a shield protects against being murdered by the Traitors but not against being banished by the group.

**The rule for agents (adaptation).** The holder is flagged in shared state and removed from that round's ballot. Immunity expires at the end of the round and is never transferable unless a twist card says so.

**What it produces.** Power that shifts each round, and the question of what to do with safety (attack, protect an ally).

**Watch out for.** Agents forgetting who is immune; the orchestrator, not the agents, should validate ballots.

**Sources.** [Survivor](https://en.wikipedia.org/wiki/Survivor_(American_TV_series)), [Big Brother (American TV series)](https://en.wikipedia.org/wiki/Big_Brother_(American_TV_series)), [The Traitors (British TV series)](https://en.wikipedia.org/wiki/The_Traitors_(British_TV_series)), Wikipedia (all verified).

### Confessional

**What it is.** The private interview to camera. On *The Real World* (MTV, 1992) housemates sat alone each week and talked about what had happened; *Big Brother*'s Diary Room (from the Dutch original, 1999) is where housemates privately say what they think of the game and each other. See note 03 for how confessionals are prompted and cut.

**The rule for agents (adaptation).** After every round, each agent writes one confessional of at most 60 words to a private channel that no other cast member can read. Prompt with a sentence to finish ("Right now I'm thinking..."). Observers and the audience can read it; the cast never can.

**What it produces.** Dramatic irony: the audience knows what the cast doesn't, and the gap between public and private speech is the show.

**Watch out for.** Confessional content leaking into public turns; keep the channels in separate stores, not just separate labels.

**Sources.** [The Real World, Wikipedia](https://en.wikipedia.org/wiki/The_Real_World_(TV_series)), [Big Brother (franchise), Wikipedia](https://en.wikipedia.org/wiki/Big_Brother_(franchise)) (verified).

### Vote

**What it is.** How the cast removes one of its own. *Survivor*'s Tribal Council collects written votes and the host reads them; *Big Brother* housemates cast eviction votes privately in the Diary Room; *The Traitors*' Round Table has players write a name privately and then reveal in turn. A jury of eliminated players chooses the winner on *Survivor*, where Richard Hatch won the first season 4–3 in 2000.

**The rule for agents (adaptation).** Secret vote: each eligible agent submits one name and a one-sentence reason to the orchestrator; names are revealed one at a time by the host, reasons only in confessionals. Open vote: same, but each says the name aloud in turn order. Ties go to a revote among the tied.

**What it produces.** Suspense and betrayal (secret), or bandwagons and social pressure (open).

**Watch out for.** Agents all voting for the same "obvious" target; give each a private grievance at casting.

**Sources.** [Survivor](https://en.wikipedia.org/wiki/Survivor_(American_TV_series)), [Survivor: Borneo](https://en.wikipedia.org/wiki/Survivor:_Borneo), [Big Brother (American)](https://en.wikipedia.org/wiki/Big_Brother_(American_TV_series)), [The Traitors (British)](https://en.wikipedia.org/wiki/The_Traitors_(British_TV_series)), Wikipedia (verified).

### Elimination

**What it is.** The ceremony where someone leaves. *Survivor*'s Tribal Council; *The Apprentice*'s boardroom (NBC, 2004), where the losing team's project manager brings back two teammates and the host fires one; *Love Island* (ITV2, 2015), where anyone left single after a recoupling is dumped and the couples with the fewest public votes are at risk; *The Traitors*, where the banished player reveals their role.

**The rule for agents (adaptation).** "Bottom two": the losing side's leader names two others; each gets one defense of at most 50 words; a decider (host, vote, or audience poll) picks who goes. The eliminated agent gets a 30-word exit line and then stops receiving events.

**What it produces.** Stakes, accusation, and a public reckoning each round.

**Watch out for.** Eliminated agents coming back because their persona is still in someone's context; remove them from the roster the scheduler reads.

**Sources.** [The Apprentice (American TV series)](https://en.wikipedia.org/wiki/The_Apprentice_(American_TV_series)), [Love Island (2015 TV series)](https://en.wikipedia.org/wiki/Love_Island_(2015_TV_series)), Wikipedia (verified).

### Alliance

**What it is.** A private pact to vote together. On the first *Survivor* (2000) the Tagi alliance of Richard Hatch, Susan Hawk, Rudy Boesch, and Kelly Wiglesworth voted as a bloc; Wikipedia quotes the A.V. Club's Noel Murray that the strategy was seen as "controversial and against the spirit of the show," yet later seasons were built on it.

**The rule for agents (adaptation).** Any two or three agents may open a side channel by request; the orchestrator logs that it exists and who is in it, but its contents are readable only by members and observers. One open alliance per agent at a time; leaving is announced only in a confessional.

**What it produces.** Factions, betrayals, and a graph the observers can draw.

**Watch out for.** Agents announcing their alliance in public turns because they're "being honest"; say in the prompt that alliances are secret by default.

**Sources.** [Survivor: Borneo, Wikipedia](https://en.wikipedia.org/wiki/Survivor:_Borneo) (verified; the Murray quote read as quoted there, not at the A.V. Club).

### Twist

**What it is.** A rule change in mid-game. *Survivor: Guatemala* (2005) told the merged tribe that a hidden immunity idol was somewhere in the jungle; *Love Island* sends in "bombshells" (new islanders) and, from series 3, Casa Amor, a second villa that tests the couples. See note 03 on formats and twists.

**The rule for agents (adaptation).** The director holds a sealed deck of twist cards written before the run. At a set round (or when an observer flags the tension score below a threshold) it plays one card, announced in the event log as a rule change. No more than one twist per three rounds.

**What it produces.** Surprise, and a test of whether the personas adapt in character.

**Watch out for.** A director agent improvising twists that break the game (unbounded powers); twists only from the pre-written deck.

**Sources.** [Survivor: Guatemala](https://en.wikipedia.org/wiki/Survivor:_Guatemala), [Love Island (2015 TV series)](https://en.wikipedia.org/wiki/Love_Island_(2015_TV_series)), Wikipedia (verified; that the Guatemala idol was the show's first comes from fan and blog sources, unverified).

### Producer intervention

**What it is.** Producers steering an unscripted show from the side. An anonymous Australian producer told VICE (2022) that each contestant has a producer who becomes their "best friend," that storylines are shaped by executives ("keep them around for a few more episodes"), and that more gets said off camera. On *Love Island* the islanders receive texts announcing challenges, dumpings, and recouplings: the producers' voice delivered as a message. See note 03.

**The rule for agents (adaptation).** A producer agent may send one private nudge per round to one cast member (at most 25 words, a question or a piece of information, never a line to say). Every nudge is logged with its target and shown on the dashboard.

**What it produces.** Storylines, and an honest record of how much was steered.

**Watch out for.** Nudges that are scripts in disguise ("tell Ross you're angry"); forbid quoted lines and imperatives about speech.

**Sources.** [VICE, Fenwick 2022](https://vice.com/en/article/theres-100-manipulation-the-inner-workings-of-reality-tv-according-to-a-producer) (verified); [Love Island (2015), Wikipedia](https://en.wikipedia.org/wiki/Love_Island_(2015_TV_series)) (verified).

### The edit

**What it is.** The story told afterward from the footage. The VICE producer says "we can give you a hero or a villain cut," and that the villain cut is harder because the person still has to do the questionable things on camera. Note 03 covers story producers, string-outs, and frankenbites.

**The rule for agents (adaptation).** After the run, an editor agent writes a recap of at most 300 words assigning each cast member an arc (hero, villain, underdog, comic relief), citing at least two turn IDs from the log per arc. A second editor writes the opposite arcs from the same log.

**What it produces.** Two edits of one run, which shows students how much the edit decides.

**Watch out for.** Invented quotes; check every quoted line against the log by turn ID.

**Sources.** [VICE, Fenwick 2022](https://vice.com/en/article/theres-100-manipulation-the-inner-workings-of-reality-tv-according-to-a-producer) (verified).

### Reunion

**What it is.** After the season, the cast sits together with a host to revisit what happened, often confronted with the footage. *Survivor* has aired a reunion after its finale since 2000 (Jeff Probst hosting since the fifth season); *The Real World Homecoming: New York* (2021) brought the 1992 cast back to their loft.

**The rule for agents (adaptation).** After the final round, all agents (eliminated ones restored) get their own confessionals and two moments from the log. The host asks each one question about a clip; each answers in at most 60 words; anyone named may respond once.

**What it produces.** Reckoning: agents must square their private and public record, and observers can score consistency.

**Watch out for.** Everyone apologizing and making up; give the host a briefing of the three biggest contradictions to press.

**Sources.** [Survivor](https://en.wikipedia.org/wiki/Survivor_(American_TV_series)), [The Real World](https://en.wikipedia.org/wiki/The_Real_World_(TV_series)), Wikipedia (verified).

## Combining them

- **The Olympians on Survivor:** immunity challenge each round, secret vote, Zeus as host with one veto; observers count alliances and draw the alliance graph.
- **Seinfeld's four prepare a podcast:** Jerry hosts, Elaine is the interviewer writing the arc, Kramer is the sidekick (passing is the default), George is the producer whispering to Jerry; Newman calls in once.
- **The nine Muses on The Traitors:** the director secretly names two Traitors, each night the Traitors remove one Muse, the day's Round Table is a secret vote revealed in turn; confessionals after every round.
- **Friends in The Apprentice boardroom:** two teams pitch a coffee-shop rebrand, the losing project manager brings back two, Monica-as-host fires one; the edit card runs twice afterward.
- **The Beatles versus the Backstreet Boys, call-in show:** the Beatles co-host, the Backstreet Boys are the caller queue, a screener writes cards, and a running bit seeded by the producer must recur once.
- **Any cast, reunion only:** run a short Survivor game, then the reunion card, and let observers score who contradicts their own confessionals.

## Sources

Radio, podcasts, and talk shows:

- [NPR Training, "The show editor's interview checklist" (Jerome Socolovsky, 2021)](https://training.npr.org/2021/03/04/the-show-editors-interview-checklist/) (verified)
- [Hutchby, *Confrontation Talk: Arguments, Asymmetries, and Power on Talk Radio*, Routledge 1996](https://www.routledge.com/Confrontation-Talk-Arguments-Asymmetries-and-Power-on-Talk-Radio/Hutchby/p/book/9780805817973) (verified: publisher page only)
- Hutchby, *Media Talk: Conversation Analysis and the Study of Broadcasting*, Open University Press 2006 (unverified: catalogue records only; not cited in a card)
- [Wikipedia, "Ed McMahon"](https://en.wikipedia.org/wiki/Ed_McMahon) (verified)
- [Wikipedia, "Andy Richter"](https://en.wikipedia.org/wiki/Andy_Richter) (verified)
- [Wikipedia, "Robin Quivers"](https://en.wikipedia.org/wiki/Robin_Quivers) (verified)
- [Wikipedia, "Car Talk"](https://en.wikipedia.org/wiki/Car_Talk) (verified)
- [Wikipedia, "Phone-in"](https://en.wikipedia.org/wiki/Phone-in) (verified)
- [Wikipedia, "Interruptible foldback"](https://en.wikipedia.org/wiki/Interruptible_foldback) (verified)
- [Wikipedia, "Cold open"](https://en.wikipedia.org/wiki/Cold_open) (verified)
- [Wikipedia, "Late Show Top Ten List"](https://en.wikipedia.org/wiki/Late_Show_Top_Ten_List) (verified)
- [Wikipedia, "Running gag"](https://en.wikipedia.org/wiki/Running_gag) (verified)

Reality television:

- [Wikipedia, "Survivor (American TV series)"](https://en.wikipedia.org/wiki/Survivor_(American_TV_series)) (verified)
- [Wikipedia, "Survivor: Borneo"](https://en.wikipedia.org/wiki/Survivor:_Borneo) (verified)
- [Wikipedia, "Survivor: Guatemala"](https://en.wikipedia.org/wiki/Survivor:_Guatemala) (verified)
- [Wikipedia, "Big Brother (American TV series)"](https://en.wikipedia.org/wiki/Big_Brother_(American_TV_series)) (verified)
- [Wikipedia, "Big Brother (franchise)"](https://en.wikipedia.org/wiki/Big_Brother_(franchise)) (verified)
- [Wikipedia, "The Apprentice (American TV series)"](https://en.wikipedia.org/wiki/The_Apprentice_(American_TV_series)) (verified)
- [Wikipedia, "The Traitors (British TV series)"](https://en.wikipedia.org/wiki/The_Traitors_(British_TV_series)) (verified)
- [Wikipedia, "Love Island (2015 TV series)"](https://en.wikipedia.org/wiki/Love_Island_(2015_TV_series)) (verified)
- [Wikipedia, "The Real World (TV series)"](https://en.wikipedia.org/wiki/The_Real_World_(TV_series)) (verified)
- [VICE, "'There's 100% Manipulation': The Inner Workings of Reality TV, According to a Producer" (Julie Fenwick, 2022)](https://vice.com/en/article/theres-100-manipulation-the-inner-workings-of-reality-tv-according-to-a-producer) (verified)
- [Note 03, "Producers and game masters"](../notes/03-reality-tv-and-game-masters.md), for story producers, frankenbites, casting, format bibles, and game masters
