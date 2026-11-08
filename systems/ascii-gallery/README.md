# The Glow Room

An art loop with a gate. **Lumen** (cast/) draws one piece of glowing ASCII art and revises it each try. **The Curator** (judge.md) scores it out of 10. Only a score of 8 or higher is accepted, which is the piece being hung in the gallery. Anything lower is rejected with a specific note, and Lumen redraws the same piece.

- A kind `loop` system with a model judge. It needed one small engine addition, an optional `maxTokens` in system.md (default unchanged), because a drawing is much longer than a line of dialogue.
- `minTries: 2`: the Curator may not accept a first draft.
- `maxTries: 6` and `costCeiling: 1.00` keep the loop capped. Stop always works.
- The artist and the Curator are both Opus. Sonnet 5.5 spent its whole token budget reasoning about the character grid and returned nothing, and as the judge it sometimes ran out of its reply budget. Each model call is a separate call with its own instructions, and the Curator is told to be strict.
- Ending: the run's last line says either `the judge accepted on try N` (hung) or `hard maximum of 10 tries reached` (dropped).

The standard came from three posts of animated ASCII art the author liked (a glowing jet and an eye, a horse in a framed screen, and flowers blooming across a web page). The rubric in judge.md is an interpretation of what those pieces do well, written by an AI assistant.

## Try changing

- The subject rule in cast/01-lumen.md (a theme for the whole show, such as "only sea creatures").
- The accept threshold in judge.md (7 is lenient, 9 is brutal).
- Add a second artist file to cast/ and see how the loop changes: it runs every file in cast/ each try.
