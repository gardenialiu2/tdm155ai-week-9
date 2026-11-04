---
title: "Labs, startups, and coaches: how people are orchestrated"
description: How research labs, startups, and sports teams divide roles, pass control, and keep records, read as models for designing ensembles of AI agents.
author: claude (research subagent E)
date: 2026-11-04
status: draft; agent research, check before citing
order: 5
---

# Labs, startups, and coaches: how people are orchestrated

Research labs, startups, and sports teams all run groups of capable people who cannot each see the whole job, and each has worked out its own answer to three questions an agent designer also faces: who decides, how control is handed over, and what gets written down. The lab answers with a hierarchy of trust (PI, postdocs, students), a weekly meeting, a notebook, and an outside critic in peer review. The startup answers with short cycles (the sprint, the daily standup, the retrospective), measurable goals (OKRs), and an argument, still open, about whether the founder should reach down through the org chart. The football team answers with a playbook of rehearsed plays, a radio that cuts off fifteen seconds before the snap, a quarterback who may change the call at the line, and a film session afterward that grades every player. Each lends a specific pattern to an ensemble of characters, producers, and observers, and each breaks in a specific place.

This note does not repeat the Lab's November 1 essays in `mk-agent-studies/content/orchestration-across-industries/`. Conway's law, Amazon's two-pizza teams, and the six-page memo are covered in essay 03, *The firm as an agent system*. CRediT, the 5,154-author ATLAS/CMS paper, and the Human Genome Project's 24-hour release rule are in essay 06, *Scholarship at scale*. Mission command and commander's intent are in essay 05. They are cited here, not retold.

## 1. The research lab

**The roles.** A lab handbook from Purdue's Learning Lab puts the principal investigator's job plainly: "My job is to oversee all aspects of the lab, supervise all people in the lab, and oversee all projects in the lab," while "Postdoctoral researchers and graduate students are responsible for leading multiple research projects in the lab," and undergraduates "work in the lab in exchange for course credit," mostly running sessions **(verified: read the Purdue Learning Lab handbook, "People")**. Another lab's handbook (Jesse Meyer's lab) says the PI guides research direction, secures funding, meets members regularly, and "will always be primarily responsible for correcting problems when they arise," while lab managers and research scientists "coordinate and take notes during weekly lab meetings" **(verified: read the Meyer lab handbook, ch. 2)**. So the PI owns direction and money, the senior members own projects, juniors execute, and a manager keeps the record. Roles vary widely from lab to lab **(unverified: a general claim from two handbooks, not a survey)**.

**How control passes.** Control in a lab passes mostly by delegation of whole projects, not of individual steps: a graduate student owns a project and reports on it. The weekly lab meeting is the synchronization point, where members present data and the group (not only the PI) questions it. I found handbooks that mention weekly lab meetings and note-taking but none that described the meeting's format in detail **(unverified: format of a typical lab meeting, from general knowledge)**.

**What is written down.** Three documents carry the lab's memory. The *lab notebook*: the National Cancer Institute's guide says to use a bound notebook, "write in ink," title, sign, and date each page, have a witness sign that they have "read and understood" the work, and never "blot out or erase mistakes," rip out pages, or modify data **(verified: read NCI Technology Transfer Center, "Guide for Keeping Laboratory Records: Dos and Don'ts")**. The *protocol*: a written procedure others can follow. And, since the replication debates of the 2010s, the *preregistration*, which the Center for Open Science defines as "specifying your research plan in advance of your study and submitting it to a registry," because it "helps to distinguish planned from unplanned work" **(verified: read COS, "Preregistration")**. The Meyer handbook adds that "elements of any project must always be documented" at designated milestones, and that departing members must leave their projects documented for the PI **(verified: read the Meyer lab handbook)**.

**The outside critic.** Peer review is the lab's evaluator loop, and it is younger than people assume. According to JSTOR Daily's account of Moxham and Fyfe's research, the Royal Society took editorial control of the *Philosophical Transactions* "by committee" in 1752; formal refereeing, with "a written report of fitness" from one or more fellows, was institutionalized by 1832; and *Nature* made refereeing standard only in 1973 **(verified: read Matthew Wills, JSTOR Daily, July 21, 2024, citing Moxham and Fyfe 2018)**. Robert Merton's 1942 essay named the norm behind it, *organized skepticism*: "scientific claims should be exposed to critical scrutiny before being accepted," alongside communism (findings belong to the community), universalism (claims judged by impersonal criteria), and disinterestedness **(verified: read Wikipedia, "Mertonian norms"; not Merton's text itself)**. The referee report is a structured critique by someone outside the team who has no stake in the result, which is exactly what an agent evaluator usually lacks.

**Big science.** At the scale of a CERN experiment the PI disappears into a constitution. In ATLAS, by the accounts I found, a Collaboration Board with one vote per institution sets policy, an elected Spokesperson runs day-to-day management, a Publication Committee oversees review of every paper, and each paper gets its own Editorial Board, with a multi-step internal approval before submission **(unverified: from search-result summaries of CERN archive and ATLAS pages, not read directly; details may have changed)**. Credit at that scale is essay 06's subject.

**What it lends.** The lab notebook is the model for an agent's event log: append-only, dated, no erasures, failures included. Preregistration is a stop condition written before the run, so you can tell later whether the ensemble did what was planned or wandered. Peer review argues for an evaluator that is structurally outside the team, sees the sources as well as the draft, and writes a report rather than a score. The PI-and-project structure argues for delegating whole sub-projects to agents that report back on a schedule, not micromanaging each step.

## 2. The startup

**The roles.** Startups usually begin with two or three founders splitting the company roughly into business (CEO) and product or technology (CTO) **(unverified: common practice, no source read)**. The live argument is about what happens next. In September 2024 Paul Graham wrote up a talk Brian Chesky gave at a YC event: "there are two different ways to run a company: founder mode and manager mode." Manager mode treats "subtrees of the org chart as black boxes," on the advice to "hire good people and give them room to do their jobs." Graham predicted that under founder mode "'skip-level' meetings will become the norm," admitted "we still don't know" much about it, and warned in a footnote that "founders who are unable to delegate even things they should will use founder mode as the excuse" **(verified: read Paul Graham, "Founder Mode," September 2024)**.

**How control passes: the cycle.** The Agile Manifesto (2001) put four values on one page, including "Individuals and interactions over processes and tools" and "Responding to change over following a plan" **(verified: read agilemanifesto.org)**. Scrum turned those into a cadence. The 2020 Scrum Guide names three accountabilities (the Developers, the Product Owner, and the Scrum Master); sprints are "fixed length events of one month or less"; the Daily Scrum is "a 15-minute event" to "inspect progress toward the Sprint Goal" and produce "an actionable plan for the next day of work"; and the Sprint Retrospective exists "to plan ways to increase quality and effectiveness," timeboxed to three hours for a one-month sprint **(verified: read the 2020 Scrum Guide)**. Control passes at fixed intervals: the team commits to a goal for the sprint, adjusts daily, and changes its own process at the end.

**What is written down.** The sprint backlog and the goal (Scrum). OKRs, which John Doerr's own site credits to Andy Grove at Intel and says Doerr "introduced … to Google's founders in 1999" **(verified: read whatmatters.com, "The OKR Origin Story")**; that they date to the 1970s, descend from Drucker's management by objectives, and are usually set quarterly comes from secondary sources **(unverified: vendor blogs and book summaries)**. Amazon's habit of writing narratives instead of decks is essay 03's subject. Amazon also assigns each important initiative a "single-threaded leader" who owns it and little else, a term from Colin Bryar and Bill Carr's *Working Backwards* (2021) **(unverified: secondary summaries; I did not read the book or an Amazon source)**. Eric Ries's *Lean Startup* (2011) gives the build-measure-learn loop, the minimum viable product (the fastest way through that loop, not the smallest product), and the pivot (a change of strategy after a loop fails) **(unverified: book summaries only)**.

**Companies of agents (2024–26).** In an interview with Alexis Ohanian reported by Fortune on February 4, 2024, Sam Altman said there was a betting pool in his CEO group chat "for the first year that there is a one-person billion-dollar company," "which would have been unimaginable without AI and now will happen" **(verified: read Fortune, Feb 4, 2024)**. Asked in May 2025, at the launch of Claude 4, when the first billion-dollar company with one human employee would appear, Dario Amodei answered "2026" **(verified: read OfficeChai's report; secondary)**. In June 2025 Wix bought Base44, built by Maor Shlomo, for $80 million; coverage called it a one-man startup, but Globes reported six employees at the sale **(unverified: search-result summaries of Globes, Calcalist, and others)**. On April 2, 2026 the *New York Times* profiled Medvi, Matthew Gallagher's telehealth company selling GLP-1 drugs, on track for about $1.8 billion in 2026 revenue with two employees (Gallagher and his brother), contractors, and roughly a dozen AI agents doing marketing; Altman told the paper he would "like to meet the guy" **(verified: read Pixel Envy, Apr 8, 2026, and Il Post, Apr 10, 2026, on the NYT piece; I did not read the NYT article)**. The profile was criticized for leaving out fake doctor profiles in Medvi's ads and a class action under California's anti-spam law **(verified: read Il Post; the allegations are reported, not established)**. The lesson for a class is not that one person now runs a company of agents, but that the agents were concentrated in marketing, the humans kept the regulated and contractual work, and nobody was checking what the agents said in public.

**What it lends.** The daily standup is a heartbeat: every agent reports what it did, what it will do, and what blocks it, and the orchestrator re-plans. The retrospective is an observer that edits the process rather than the product. OKRs are a measurable stop condition the whole ensemble shares. The single-threaded owner says each goal should have exactly one agent accountable for it. The founder-mode debate is the question of whether the orchestrator may reach past a sub-orchestrator to talk to a worker directly; Conway's law (essay 03) predicts that whatever you choose will show in the output.

## 3. The coach

**The roles.** An American football staff has a head coach, offensive and defensive coordinators who usually call the plays, position coaches, and now analytics staff **(unverified: general knowledge of staff structure)**. In ESPN's 2024 survey of analytics staffers, 17 of 22 responding teams had an analytics person on the coaching headset during games, up from 13 of 21 in 2022, though the writer cautioned that the sample was self-selected **(verified: read Seth Walder, ESPN, Sept 20, 2024)**.

**How control passes.** Football is the most scripted of the major sports because it stops after every play. Paul Brown, the Browns' founding coach, "started the practice of calling plays from the sideline by utilizing alternating guards as messengers" **(verified: read the Pro Football Hall of Fame's Paul Brown page)**. He tested a helmet radio in 1956; the Giants listened in, the commissioner outlawed it within days, and radio from coach to player was legalized only in 1994 **(verified: read Pro Football Hall of Fame, "Call 1-800-QB-RADIO")**. The current NFL rule allows "no more than one player on the field with a speaker in his helmet" per side, and communication "is cut off when the play clock reaches 15 seconds or the ball is snapped, whichever occurs first" **(verified: read the NFL rulebook on operations.nfl.com)**. Within that window the quarterback may change the call: "An audible is simply a last-second change to the play, called by the quarterback, when the offense is already lined up," usually after reading the defense, using code words tied to the play **(verified: read Buccaneers.com, "RED Chalk Talk: Audible/Hot Route," Oct 12, 2015)**. Each team has "three timeouts during a half" and a 13-minute halftime, when the staff can rework the plan **(verified: read the NFL rulebook)**. Bill Walsh's 49ers scripted their first 15 plays, by one biographer's account "purely diagnostic," to learn how the defense responded before improvising **(unverified: search-result summaries quoting Lowell Cohn in the LA Times; the article blocked fetching)**.

**What is written down.** The playbook (a library of rehearsed plays, each with its built-in audibles), the game plan and call sheet for the week, the script, and the film. Brown was the first to "set up complete film clip statistical studies" and to "grade his own players based on film study," and to "use notebooks and classroom techniques extensively" **(verified: read the Pro Football Hall of Fame's Paul Brown page)**. The film session, where coaches and players review the tape and grade each play, is an observer layer added after the game, separate from whoever called the plays.

**The contrast: fluid sports.** Soccer has no timeouts, play is continuous, and under the Laws of the Game only one person at a time may convey tactical instructions from the technical area; José Mourinho has asked for basketball-style breaks and been told they would ruin the flow **(unverified: secondary summaries of the IFAB Laws and commentary; I did not read the Laws)**. Players read the game and decide; the manager's levers during play are shouting, substitutions, and halftime. Basketball sits between, with timeouts but continuous play **(unverified: general knowledge)**. The design choice is the same one an agent designer faces: a scripted graph with checkpoints where a coach can intervene, or a set of autonomous players given a shape and trained to decide.

**What it lends.** The playbook is a library of graphs, each named and rehearsed, and the play call picks one. The audible is dynamic routing: a worker at the edge, seeing what the planner could not, swaps to a different pre-approved graph, but only from a known list. The radio cutoff is a deadline after which the orchestrator must stop talking and let the workers act. Timeouts and halftime are scarce, budgeted interventions. The film session is an after-the-run observer that grades each agent's turn. The analytics staffer on the headset is an advisor agent with no authority of its own.

## The practices side by side

| practice | roles | what is written down | how control passes | agent-system analogue |
| --- | --- | --- | --- | --- |
| Lab meeting | PI, postdocs, students, lab manager | notes; each member's data | members present to the group on a fixed schedule | a heartbeat where each agent reports to the group, not only to the orchestrator |
| Lab notebook | every researcher, a witness | dated, signed, inked pages; no erasures | none; it is the record | append-only event log (trace) |
| Preregistration | researcher, registry | the plan, time-stamped, before data | the plan binds the later analysis | stop condition and plan fixed before the run |
| Peer review | editor, outside referees, authors | the referee report | the editor decides after outside critique | evaluator loop with an independent critic |
| Founder mode vs. manager mode | founder, executives, staff | (not formalized) | founder reaches past direct reports, or doesn't | may the orchestrator talk to workers directly? |
| Daily standup | developers, Scrum Master | sprint backlog | daily re-plan toward a fixed goal | heartbeat with re-planning |
| Retrospective | the whole team | changes to the process | team changes its own rules each sprint | observer that rewrites prompts or the graph between runs |
| Playbook and play call | coordinator, quarterback | playbook, call sheet, scripted openers | coach calls from the sideline until 15 s on the clock | router picks one of several named graphs |
| Audible | quarterback | built-in alternatives per play | edge player changes the call at the line | dynamic routing from a fixed menu |
| Timeout and halftime | head coach | adjustments to the game plan | three per half; one 13-minute reset | budgeted human-in-the-loop checkpoints |
| Film session | coaches, players | grades for every player on every play | none during play; it changes next week's plan | after-run observer that scores each turn |

## What it lends to a theater of agents

For a class designing ensembles of characters, producers, and observers, five patterns from these fields are worth borrowing directly.

1. **A heartbeat with a format.** The standup and the lab meeting both make every member report on a schedule, in a fixed shape. Give your producer a heartbeat on which each character answers the same three questions, and log the answers.
2. **A playbook, not a single plan.** Write three or four named scenes (graphs) the producer can call, each with one or two built-in audibles a character may switch to when the scene goes somewhere unexpected. That gives the characters latitude without letting them invent the structure.
3. **A cutoff.** The NFL radio goes silent at fifteen seconds. Decide when your producer stops steering and the characters must act on what they have.
4. **Two observers, during and after.** A live observer (the analytics staffer, the lab manager taking notes) advises but cannot decide. A film-session observer reads the whole log after the run and grades each turn; its report changes the next run's prompts, the way a retrospective changes the process.
5. **An outside referee.** Peer review's value is that the referee did not do the work. Give the evaluator the sources and the brief, not the producer's reasoning, and have it write a report of fitness with reasons, not a thumbs-up.

## Where the analogy breaks

**Agents do not learn between games unless you make them.** A film session works because players remember it next week. An agent has no memory of last run's grades unless the observer's report is written into its prompt or a file it reads.

**Nobody needs to be motivated, promoted, or credited.** Much of lab and startup management (authorship order, equity, morale, the PI's mentoring role) exists because the members are people with careers. Agents need none of it; the people around them still do (essay 06).

**Peer review assumes an independent mind.** Two instances of the same model reviewing each other share training and blind spots. Organized skepticism among copies of one model is weaker than it looks.

**Rules of the game are external in sport.** The fifteen-second cutoff and three timeouts are enforced by referees. In an agent system you write the rules and the referee, so nothing stops a producer from ignoring its own budget unless the harness enforces it.

**Founder mode is cheap for an orchestrator.** Graham's worry is a founder who cannot delegate. An orchestrator can read every worker's output at no social cost, so the real constraint is context length, not trust or time.

**The one-person company is a marketing story as often as an organizational one.** The best documented case so far, Medvi, used agents where scrutiny was lowest and drew legal complaints for what they produced.

## What I could not verify

Read only through search summaries or secondary accounts, and marked unverified above: the format of a typical lab meeting; ATLAS governance details; OKRs' 1970s origin, MBO lineage, and quarterly cadence; Amazon's single-threaded leader; Ries's MVP and pivot; the CEO/CTO split; Base44's sale and headcount (reports conflict); the *New York Times* Medvi article itself (read through Pixel Envy and Il Post); Walsh's scripted 15 plays (the LA Times column blocked fetching); soccer's technical-area rule and basketball's timeouts; football staff structure; and Scrum's origins before the 2020 Guide.

## Sources

- [Purdue Learning Lab handbook, "People"](https://learninglab.psych.purdue.edu/handbook/introduction/people) (read Nov 4)
- [Jesse Meyer lab handbook, ch. 2](https://jessegmeyerlab.github.io/Handbook/intro.html) (read Nov 4)
- [NCI Technology Transfer Center, "Guide for Keeping Laboratory Records: Dos and Don'ts"](https://techtransfer.cancer.gov/intellectualproperty/inventions/inventor-guidance/guide-keeping-laboratory-records-dos-dont) (read Nov 4)
- [Center for Open Science, "Preregistration"](https://www.cos.io/initiatives/prereg) (read Nov 4)
- [Matthew Wills, "The History of Peer Review Is More Interesting Than You Think," JSTOR Daily, July 21, 2024](https://daily.jstor.org/the-history-of-peer-review-is-more-interesting-than-you-think) (read Nov 4)
- [Wikipedia, "Mertonian norms"](https://en.wikipedia.org/wiki/Mertonian_norms) (read Nov 4)
- [NISO, CRediT contributor roles](https://credit.niso.org/) (read Nov 4)
- [CERN Archive, ATLAS Collaboration records](https://library.cern/archives/CERN_archive/guide/experimental_physics/LHC/isaatlas) (search summary only)
- [Paul Graham, "Founder Mode," September 2024](https://paulgraham.com/foundermode.html) (read Nov 4)
- [Manifesto for Agile Software Development, 2001](https://agilemanifesto.org/) (read Nov 4)
- [Ken Schwaber and Jeff Sutherland, *The Scrum Guide*, November 2020](https://scrumguides.org/scrum-guide.html) (read Nov 4)
- [What Matters, "The OKR Origin Story"](https://www.whatmatters.com/stories/the-origin-story) (read Nov 4)
- [Fortune, "Sam Altman … one-person unicorn," Feb 4, 2024](https://fortune.com/2024/02/04/sam-altman-one-person-unicorn-silicon-valley-founder-myth/) (read Nov 4)
- [OfficeChai, "The First One-Person Billion-Dollar Startup Will Be A Reality By 2026: Anthropic CEO Dario Amodei"](https://officechai.com/ai/the-first-one-person-billon-dollar-startup-will-be-a-reality-by-2026-anthropic-ceo-dario-amodei) (read Nov 4)
- [Globes, "Wix acquires Israeli vibe coding co Base44"](https://en.globes.co.il/en/article-wix-acquires-israeli-vibe-coding-co-base44-1001513267) (search summary only)
- [Nick Heer, Pixel Envy, on the NYT's Medvi profile, Apr 8, 2026](https://pxlnv.com/linklog/nyt-medvi/) (read Nov 4)
- [Il Post, "Il mito delle startup miliardarie con un solo dipendente," Apr 10, 2026](https://www.ilpost.it/2026/04/10/mito-startup-unicorno-un-solo-dipendente/) (read Nov 4)
- [Seth Walder, "NFL analytics survey 2024," ESPN, Sept 20, 2024](https://global.espn.com/nfl/story/_/id/41328710/nfl-analytics-survey-2024-most-least-analytically-inclined-teams-predictions) (read Nov 4)
- [Pro Football Hall of Fame, Paul Brown](https://www.profootballhof.com/players/paul-brown) (read Nov 4)
- [Pro Football Hall of Fame, "Moments in NFL history: Call 1-800-QB-RADIO"](https://www.profootballhof.com/news/moments-in-nfl-history-call-1-800-qb-radio) (read Nov 4)
- [NFL Football Operations, NFL Rulebook](https://operations.nfl.com/the-rules/nfl-rulebook/) (read Nov 4: coach-to-player communication, timeouts, halftime)
- [Buccaneers.com, "RED Chalk Talk: Audible/Hot Route," Oct 12, 2015](https://www.buccaneers.com/news/red-chalk-talk-audible-hot-route-16047899) (read Nov 4)
- [LA Times "Ask Farmer" on scripted plays, via inkl](https://www.inkl.com/news/ask-farmer-why-do-teams-script-their-plays-like-the-49ers-first-15) (blocked; search summary only)
- Lab essays, not re-read beyond overlap: `mk-agent-studies/content/orchestration-across-industries/03-the-firm.md` (Conway's law, two-pizza teams, six-page memo), `05-command-and-control.md` (commander's intent), `06-scholarship-at-scale.md` (CRediT, big-science author lists, the 24-hour rule)

## Glossary candidates

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
