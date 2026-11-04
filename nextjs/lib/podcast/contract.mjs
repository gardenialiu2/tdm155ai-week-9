// The podcast-prep contract shared with the Slack Producer (tdm155ai/tdm155ai-podcast-producer): the same four agents,
// the same per-item fields, the same finish rule, the same briefing headings, so a guest's material gets the same
// treatment on the web and in Slack. From TL's brief of November 4 (tdm155ai-dev/plan/unit-3/podcast-agents-brief.md
// in The Notebook); the icons are TL's proposals; the agents go by their functions (Marlon, November 4), and
// the IDs stay stable, so a student could give them display names later. Change both apps together.

export const CAST = [
  { id: "intake", name: "Collector", role: "Intake", icon: "📥", job: "Saves every original, reads the text out of it, and transcribes anything with sound. Keeps the inventory." },
  { id: "interviewer", name: "Interviewer", role: "Interviewer", icon: "🎙️", job: "Reads each item as it's ready and proposes specific questions tied to it." },
  { id: "sidekick", name: "Sidekick", role: "Sidekick", icon: "🎭", job: "Offers a few optional, warm opening jokes for each item. The guest always comes off well; the host or the Sidekick can be the butt." },
  { id: "producer", name: "Producer", role: "Producer", icon: "📋", job: "Waits until you say you're done, and until every item's work is finished, then writes the host's briefing." },
];

// Each item's status per agent: waiting → running → done | failed (with `error`); "skipped" when an agent has
// nothing to do (the Collector on pasted text). A failed agent can be retried without touching the original.
export const STATUSES = ["waiting", "running", "done", "failed", "skipped"];

// What each per-item agent returns (JSON from the model), as agreed with SB on the week 9 board:
//   The Interviewer: { "summary": "a two-sentence reading of the item", "questions": [ { "question": "...", "why": "one line: what in the item it comes from" } ] }   (2 to 4)
//   The Sidekick:   { "jokes": [ { "idea": "...", "butt": "host" | "sidekick" | "situation" } ], "jokesNote": "" }   (0 to 3; jokesNote says why there's none)
// The briefing's first line: "# Host briefing (revision N, items 1–M)".

// The host's briefing: exactly these headings, in this order, in both apps.
export const BRIEFING_HEADINGS = [
  "The guest and the work",
  "The central thread",
  "Suggested beats",
  "Questions and follow-ups",
  "Optional sidekick moments",
  "Names, references and terms",
  "Handle with care / check before recording",
  "Sources used and intake status",
];

// The finish rule: "I'm done adding material" (web) or #briefing / #done (Slack) closes revision N, the items received
// so far. The Producer runs only when every item in revision N is done in all three per-item agents. A failed item stops her
// until it is retried or the person chooses "proceed with gaps", and the briefing then names what wasn't read.
// Material arriving after the close goes into revision N+1; the earlier briefing says which revision it covers.
