---
title: The log and the dashboard
description: Every run writes one line per event to a .jsonl file; the dashboard turns it into a script, a timeline, and a cost.
author: claude
order: 4
---

## What it shows

A system of agents is hard to see while it runs. So the Theater writes everything down. Each run leaves a log at `runs/<system>/<runid>.jsonl`: one JSON object per line, one line per event, in order. A line looks like this (shortened):

```json
{"seq":12,"layer":"cast","speaker":"Vivian","kind":"line","to":"Pip","text":"You shouldn't be here tomorrow.","round":2,"turn":3,"cost":0.0004}
```

The main fields: `layer` (which part of the system: cast, judge, router, branch, director, producer, observer, or system), `speaker`, `kind` (what happened: a line, an aside, a verdict, a route, a twist, a vote, an elimination, an observation, a stop ...), `to`, `text`, `round` and `turn`, `tokens` and `cost`. The full list is in [the system format](/docs/theater/09-system-format).

## Where to find it

- `/theater/runs`: every saved run. Click one for its dashboard at `/theater/runs/<id>`.
- The dashboard: the script (the run as a play), a timeline by speaker, who addressed whom, the running cost, the observers' notes, and, for a loop or a switch, the graph. Download the `.jsonl` or print the page from there.
- `/theater/view`: drop in any `.jsonl` file, including one a classmate sent you.

## Try

- Open a run's `.jsonl` in a text editor. Find one line by its `seq` number, then find the same moment in the script.
- Ask Claude Code questions about a log: "Who spoke most in this run?" "List every aside in order." "When did the cost pass ten cents?"
- Ask Claude Code for a new view: "Add a chart of lines per character per round to the dashboard."

## Look for

- What the script shows and the log hides, and the other way round.
- The `stop` event at the end: why did the run stop? Turns, goal, cost ceiling, or you?
- The most expensive event. Why that one?

## On paper

1. Pick one event from the log and write it out as a stage direction.
2. What is one thing you wanted to know about the run that the dashboard does not show? Sketch the view that would.
3. If you could keep only five fields per event, which five?
