# Scribblio

A draw-and-guess game, as in skribbl.io, for two agents.

- `kind: draw` (see `runDraw` in `nextjs/lib/theater/run.mjs`). The cast has two files: one with `job: draw` (Pip) and one with `job: guess` (Quill).
- Each round the code picks a secret word from `words:` in `system.md`. Only the drawer is told it. The guesser sees the drawing, the blanks (`_ _ _ _`) and the seconds left; at half time the first letter is shown.
- The drawer draws in `stages` passes while the guesser is already guessing, so the picture can change under the guesser's feet.
- The clock is real: `guessSeconds` (default 30) from the moment the first picture appears. A guess still in flight when it runs out is cancelled.
- The judge is code: a guess is right if it contains the word and is at most three words long. A right answer scores up to 500 points, falling with the time taken (at least 50).
- `maxTries` caps the guesses per round; `rounds` is the number of words; `costCeiling` still stops the run.
- Type words into the page's input (comma-separated) to choose the words yourself.
- Watch it full screen at `/scribblio`.
