**The loop.** One agent tries, a judge checks, and the agent tries again with the judge's answer in front of it, until it's right or it runs out of tries.

- **The guesser** (`cast/01-guesser.md`) is a model. Each turn it sees the scene, its instructions, and every earlier guess with the judge's answer, and makes one guess.
- **The judge** is code. It checks the guess against `answer: burgundy` in `system.md`. The guesser never sees that line.
- **The caps:** it stops the moment a guess is right, or after `maxTries: 10` guesses, or at the cost ceiling, or when you press Stop.

Try: change `answer:` to another color, raise or lower `maxTries`, or give the guesser a personality in its file (a guesser who only guesses colors of fruit). Copy the folder to a new name first, so this one stays as it is.
