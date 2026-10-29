import assert from "node:assert/strict";
import { test } from "node:test";
import { archivistMessage, conductorMessage, parsePlan, researcherMessage, roles, runRequest } from "../app/ensemble/prompts.mjs";
import { buildTrace } from "../app/ensemble/trace.mjs";

const files = [
  { path: "repo/README.md", size: 120, text: "# Alabaster\n\nStart here.", allowed: true },
  { path: "repo/private/dm.md", size: 80, text: "secret things", allowed: false },
  { path: "repo/notes.md", size: 40, text: "---\ntitle: x\n---\nA note.", allowed: true },
];

test("the Conductor sees names and first lines, never a withheld file", () => {
  const message = conductorMessage({ about: "Jo's piece", files: files.filter((f) => f.allowed) });
  assert.match(message, /repo\/README\.md \(120 B\) — # Alabaster/);
  assert.match(message, /repo\/notes\.md .* — A note\./, "frontmatter is skipped for the first line");
  assert.doesNotMatch(message, /private|secret/);
});

test("an agent is given only the files in its column, in full", () => {
  const message = archivistMessage({ about: "", files: [files[0]] });
  assert.match(message, /### repo\/README\.md\n# Alabaster/);
  assert.doesNotMatch(message, /notes\.md/);
});

test("the Researcher gets the map and web search; the others don't search", () => {
  const message = researcherMessage({ about: "", map: "## What the piece is\nBroadsides.", files: [] });
  assert.match(message, /The Archivist's map:\n\n## What the piece is/);
  assert.ok(runRequest({ model: "m", role: "researcher", instructions: "i", message: "u" }).plugins?.[0]?.id === "web");
  for (const role of roles.filter((r) => r.key !== "researcher")) {
    assert.equal(runRequest({ model: "m", role: role.key, instructions: "i", message: "u" }).plugins, undefined);
  }
});

test("the Conductor's plan is read from its answer and limited to known files", () => {
  const answer = 'Reasoning.\n\n```json\n{"archivist": ["repo/README.md", "repo/private/dm.md", "nope.md"], "researcher": [], "briefer": ["repo/README.md"]}\n```';
  const plan = parsePlan(answer, files.filter((f) => f.allowed));
  assert.deepEqual(plan, { archivist: ["repo/README.md"], researcher: [], briefer: ["repo/README.md"] });
  assert.equal(parsePlan("no json here", files), null);
});

test("the trace shows withheld files, who got what, and human edits", () => {
  const trace = buildTrace({
    files,
    plan: { archivist: ["repo/README.md", "repo/notes.md"], researcher: [], briefer: ["repo/README.md"] },
    cards: { archivist: { system: "S", message: "M", output: "The map", edited: true, ranAt: 1, cost: 0.001 } },
    about: "Jo", purpose: "P", model: "m", startedAt: 1,
  });
  assert.match(trace, /\| repo\/private\/dm\.md \| 80 \| \*\*withheld\*\* \|  \|  \|  \|/);
  assert.match(trace, /\| repo\/README\.md \| 120 \| yes \| ● \|  \| ● \|/);
  assert.match(trace, /### Said \(edited by a person before it was passed on\)\n\nThe map/);
  assert.match(trace, /## 3\. Researcher[\s\S]*\(not run\)/);
});
