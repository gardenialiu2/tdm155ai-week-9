---
title: The Glow Room
description: "A loop that makes ASCII art. An artist draws, a strict curator scores it out of ten, and the piece is only hung in the gallery at 8 or above."
kind: loop
model: anthropic/claude-opus-5.5
minTries: 2
maxTries: 10
costCeiling: 2.00
maxTokens: 8000
---

**The Glow Room** is a small gallery for glowing ASCII art, in the spirit of the animated ASCII pieces people post online: one bold subject, rendered in text, bright against black. Lumen, the artist, makes one piece at a time. After each try, the Curator scores it out of ten. The piece is hung only on an 8 or higher; anything lower is sent back with notes, and Lumen revises the same piece. The curator will not accept a first draft, and Lumen has at most ten tries before the piece is dropped from the show.
