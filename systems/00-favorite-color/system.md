---
title: Guess my favorite color
description: "The loop: one agent guesses a color, the judge says yes or no, and it tries again. It stops when it's right, or after ten guesses."
kind: loop
featured: 1
model: anthropic/claude-sonnet-5.5
answer: burgundy
minTries: 1
maxTries: 10
costCeiling: 0.50
---

Someone has a favorite color, and you don't know it. Make one color guess at a time. After each guess you're told whether it's right. Use what you've already been told, and don't repeat a color that was wrong.
