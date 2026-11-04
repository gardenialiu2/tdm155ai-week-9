import { callModel } from "../../../../lib/theater/model.mjs";
import { rehearsal } from "../../../../lib/theater/rehearsal.mjs";
import { runSystem } from "../../../../lib/theater/run.mjs";
import active from "../../../../lib/theater/active.mjs";
import { appendEvent, loadSystem, runPath } from "../../../../lib/theater/systems.mjs";

// POST { system, overrides, rehearse } → a stream of events, one JSON object per line, as the run happens. Each event is also
// appended to runs/<system>/<run>.jsonl at the repo root. The run stops at its caps, when the page presses Stop
// (POST /theater/api/stop), or when the page goes away. With `rehearse`, stand-in replies replace the model
// (lib/theater/rehearsal.mjs): no key, no cost.
export const dynamic = "force-dynamic";

const stamp = () => new Date().toISOString().replace(/[-:]/g, "").replace(/\..*/, "").replace("T", "-") + "-" + Math.random().toString(16).slice(2, 5);

export async function POST(request) {
  const { system: name = "", overrides = {}, rehearse = false } = await request.json().catch(() => ({}));
  let system;
  try {
    system = await loadSystem(name);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
  const run = stamp();
  const file = runPath(system.name, run);
  const controller = new AbortController();
  request.signal?.addEventListener("abort", () => controller.abort());
  active.set(`${system.name}~${run}`, controller);
  let seq = 0;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(out) {
      let writing = Promise.resolve();
      const emit = (event) => {
        const full = { t: new Date().toISOString(), seq: seq++, run: `${system.name}~${run}`, ...event };
        writing = writing.then(() => appendEvent(file, full)).catch(() => {});
        try {
          out.enqueue(encoder.encode(JSON.stringify(full) + "\n"));
        } catch {
          // the page went away; the log keeps going until the run notices the abort
        }
      };
      try {
        await runSystem(system, { call: rehearse ? rehearsal() : callModel, emit, signal: controller.signal, overrides: rehearse ? { ...overrides, model: "rehearsal" } : overrides });
      } finally {
        await writing;
        active.delete(`${system.name}~${run}`);
        try {
          out.close();
        } catch {}
      }
    },
    cancel() {
      controller.abort();
    },
  });
  return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-cache" } });
}
