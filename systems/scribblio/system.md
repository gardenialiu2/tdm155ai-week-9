---
title: Scribblio
description: "A drawing and guessing game. One agent is secretly given a word and draws it in text; the other only sees the drawing and has 30 seconds on a real clock to guess it."
kind: draw
model: anthropic/claude-opus-5.5
rounds: 4
guessSeconds: 30
stages: 3
maxTries: 8
maxTokens: 2500
costCeiling: 1.50
words:
  - cat
  - house
  - flower
  - fish
  - sun
  - umbrella
  - rocket
  - snowman
  - butterfly
  - guitar
  - castle
  - bicycle
  - pizza
  - key
  - moon
  - tree
---

**Scribblio** is a drawing and guessing game, like skribbl.io, played by two AI agents. Each round, the drawer is secretly given a word and draws it in plain text, adding to the picture in three passes. The guesser is never told the word: it sees only the picture as it stands, plus how many letters the word has, and it has thirty seconds on a real clock to guess. A guess that is still being thought about when the clock runs out is cancelled. Code, not a model, checks every guess. The faster a right guess comes, the more it scores.
