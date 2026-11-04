Copy this sample prompt into Claude Code with this repository open. It makes a **new** system without changing the three examples. Change the cast, setting, or rules to make it yours; the named files let you inspect what you asked for and what Claude built.

```text
Read AGENTS.md and the examples in systems/09-rushmore/ and systems/10-divine-villa/. Make a NEW system in systems/my-divine-villa/ by copying the Divine Villa. Do not edit the built-in examples.

My show is Olympus After Hours: eight Greek gods have been stranded in a modern reality-show hotel. Give each a separate character description with a distinct voice, wants, relationships and reasons to disagree. Put the scenario and rules in system.md.

Exactly three gods are secretly traitors. The others try to identify them through public conversations, challenges and a round-table vote. Two modern-day human producers arrange the conditions for drama without scripting every line. Each god has private in-the-moment (ITM) interviews. Traitors can deceive publicly but are honest in their own ITMs about their role, plans and lies. A character must never receive another character's private role or ITMs. Keep real roles and votes in game state, not in a model's guess.

Keep it small: short speeches, a clear bounded turn count, Sonnet as the default model, a cost ceiling, and a working Stop button. Preserve public/private context separation and the existing legal-vote and tie rules. Include a short README saying who is in the cast, what each layer sees, and how to change the show.

Leave featured and archived unset in my new system.md so this copy appears under Your systems. Tell me when it is ready: I will reload Systems, choose my new show, rehearse it for free, and run it. Explain any engine change you need before making it, and keep Podcast prep and Remix untouched.
```

For a simpler project, ask for a copy of the Rushmore example instead: give it your own four characters, one scenario and twenty total speaking turns. You can also keep a cast and change just one rule, then compare the sessions.
