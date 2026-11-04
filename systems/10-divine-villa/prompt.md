Want a system of your own? Copy the first prompt below into Claude Code, opened in this repository, and fill in the blanks. It makes a **new** folder, so the built-in examples stay as they are and the caps stay on. The second prompt is the one that made the Divine Villa, for reference: borrow from it.

```text
In this repository, read AGENTS.md, the system format (nextjs/content/docs/theater/09-system-format.md), and the example systems in systems/00-favorite-color/, systems/09-rushmore/ and systems/10-divine-villa/. Then make me a NEW system in a new folder, systems/<a-short-name-of-mine>/, by copying whichever example is closest (the Rushmore cast for a conversation, the Divine Villa for a game with secrets and producers). Don't change the built-in examples.

My idea: ______ (who is in it, where they are, what they talk about or compete for).
The cast: ______ (names, and one line each on who they are and how they speak). Give each one their own file in cast/.
The rules: ______ (how many speeches in all, or rounds; any secret roles and how many of each; private asides or ITMs; any producers and what they're allowed to do; any vote).

Keep it small: short lines, a clearly shown turn count, a cost ceiling, and the Stop button working. Keep everything an agent shouldn't know out of its prompt (other players' roles, private interviews, hidden answers). Write a short README.md in the folder saying who is in it, what each layer sees, and its limits. Then tell me the folder name, and I'll pick it on the Systems page (under "More systems"), Rehearse it for free, and Run it.
```

```text
In this week 9 repository, read AGENTS.md, the existing `systems/05-the-villa/` files, and the Theater system format/runner. Create a new, runnable system called **The Divine Villa**, inspired by the Villa's separation of cast, modern producers, and observers. Preserve the original Villa and all saved runs. Use the current supported format and make only the small engine changes needed to support the stated behavior.

Cast Greek gods as contestants in a contemporary reality-show villa, in a Traitors-inspired competition. Start with eight: Zeus, Hera, Athena, Hermes, Aphrodite, Ares, Apollo, Artemis. Give each a separate character file, a distinct voice, wants, relationships, and comic contradictions grounded loosely in recognizable mythology. This is an invented adaptation, not a factual reconstruction or an official recreation of the TV show.

Exactly THREE are traitors: Hera, Hermes, Ares. Keep a true hidden role in state/character configuration. Each contestant knows their own role; traitors may know one another. Faithful contestants must NOT receive the role list, other players' private instructions, or private interviews. The public scenario must not reveal the traitors. The teacher/audience may inspect an omniscient log, but that must not leak back into the characters' public context.

Give them a separate scenario/rules file and bounded public conversations, with short in-the-moment (ITM) interviews. Contestants react to specific earlier dialogue, form suspicions, disagree, defend themselves, and try to identify the three traitors. Traitors may lie in public, but MUST be honest in their private ITMs about being traitors, their tactics and the lies they just told. Faithful contestants' ITMs reveal their beliefs, not hidden facts they cannot know.

Use TWO fictional modern-day human producers, not gods: a Story Producer who creates challenges/twists and a Host who stages a round-table discussion/vote. Their file-based instructions are separate from the cast. The Story Producer arranges conditions for drama rather than scripting every line; the Host follows explicit voting rules and cannot invent votes, change secret roles, or eliminate arbitrarily. Producers may see the control-room context but must not accidentally announce the hidden role list. Cast votes only use information that character has. A banishment can reveal the actual role from state; it must not use a model's guess as ground truth.

A small bounded demonstration is sufficient: use short lines and a clearly displayed total turn count, a few phases of conversation → ITMs → producer intervention/round table. Do not build a sprawling game framework or claim to simulate an entire television season. Keep Stop, maximum turns, cost cap, and the same saved event-log/dashboard mechanics. Default the Theater to the existing supported Sonnet model, with cost displayed honestly. Rehearsal remains free and labeled as stand-in output. At least show the contrast between one traitor's public claim and truthful ITM, and one faithful contestant's uncertainty.

Explain on the page and in the files: who is in the cast, what the producers can do, what information each layer sees, and what the limits are. The viewer should be able to follow the public scene separately from private ITMs and producer actions. Keep the cast's initial 20-turn Rushmore example simple and separate; this is the advanced remix.

Add this prompt as a copyable example in the Theater UI so students can ask Claude Code to make their own new system. Tell them to create another copy, give it a new folder/name, change cast/scenario/mechanics, preserve the built-in examples, and retain caps. Test secret-context separation, exactly three traitors, truthful-ITM instructions, one legal vote, and turn/cost/stop limits using invented data. Report files created, how to run it and any limitation. Do not modify the Podcast or Slack apps.
```
