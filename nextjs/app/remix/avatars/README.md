---
title: The podcast cast's avatars
description: Piper, Quinn, Kit, and Bea as small drawn characters, what each one does while working, and how to change one
author: claude
---

The four agents of the podcast producer each have a face. On the page they are drawn by `../Avatar.jsx` as inline SVG (`<Avatar agent="intake" state="working" size={72} />`), with the styles and motion in `../avatars.module.css`. A character moves only while its `state` is `working`; `idle` is a still, `waiting` adds a grey dots badge, `done` a green check, and `failed` a red exclamation mark. Nothing moves for anyone who has asked their computer for reduced motion, and printing gives a clean still with black outlines on white. The four `.svg` files in this folder are the same drawings at 256 × 256, standing still on a coloured disc, for use as Slack icons.

**Piper, Intake.** A plain, dependable character in teal: a neat bob, round glasses, a small straight smile, holding an in-tray with a stack of paper in it. While working, a page drifts in from the right, drops into the tray and settles on the stack, and Piper gives a small nod as it lands (1.6 seconds a loop).

**Quinn, Interviewer.** Mustard yellow, with one curl sticking up, wide eyes looking over at a stand microphone, one eyebrow raised, and a small "oh?" mouth; a question mark floats beside the head. While working, sound rings pulse out of the microphone, the question mark bobs, and Quinn's head tilts, curious.

**Kit, Sidekick.** Violet, in a top hat with a red band and a red bow tie, winking, with rosy cheeks and a lopsided grin. While working, Kit tips the hat up and off to one side, raises the open eye's eyebrow, and puts the hat back (1.8 seconds a loop).

**Bea, Producer.** Pink, with her hair up in a bun and a headset with a small boom mic, holding up a clipboard. While working, the four lines on the clipboard write themselves in one after another, then the page clears for the next briefing (2 seconds a loop).

To change one, ask your assistant (or open `../Avatar.jsx` yourself): each character is one short function there (`Piper`, `Quinn`, `Kit`, `Bea`) made of circles, rectangles, and paths on a 100 × 100 grid, and its colours are the `fill` values on those shapes. The disc colour and the name shown to screen readers are in `CAST` at the top of the file. What moves, and how, is in `../avatars.module.css`: find the character's section (for example `/* Kit: tips the hat ... */`) and change the `@keyframes`, or the duration in its `animation:` line. Keep motion to `transform` and `opacity`, and keep it under the `[data-state="working"]` selector so the character is still the rest of the time. If you change a drawing, change its `.svg` here to match, since the Slack icon is a separate copy: the shapes inside the SVG's `<g transform="scale(2.56)">` are the same as the function's, written with `stroke-width` instead of `strokeWidth`.
