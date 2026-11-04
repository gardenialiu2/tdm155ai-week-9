import { retry, setExcluded } from "../../lib/jobs.mjs";

// POST { session, item, action: "exclude" | "include" | "retry", agent } → changes one item (or, with agent
// "producer" and item = the revision number, retries that briefing).
export async function POST(request) {
  const { session, item, action, agent } = await request.json().catch(() => ({}));
  try {
    if (action === "exclude" || action === "include") await setExcluded(session, item, action === "exclude");
    else if (action === "retry") await retry(session, String(item), agent);
    else throw new Error("Unknown action.");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
