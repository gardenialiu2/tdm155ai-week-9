import { listRuns, readRun } from "../../../../lib/theater/systems.mjs";

export const dynamic = "force-dynamic";

// GET → the saved runs, newest first. GET ?id=<system>~<run> → that run's events. GET ?id=...&download=1 → the .jsonl.
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return Response.json({ runs: await listRuns() });
  try {
    const events = await readRun(id);
    if (url.searchParams.get("download")) {
      return new Response(events.map((e) => JSON.stringify(e)).join("\n") + "\n", { headers: { "Content-Type": "application/x-ndjson", "Content-Disposition": `attachment; filename="${id.replace("~", "-")}.jsonl"` } });
    }
    return Response.json({ events });
  } catch {
    return Response.json({ error: `No run "${id}".` }, { status: 404 });
  }
}
