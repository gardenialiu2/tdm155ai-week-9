import { pump } from "../../../../lib/podcast/jobs.mjs";
import { load } from "../../../../lib/podcast/store.mjs";

export const dynamic = "force-dynamic";

// GET ?id= → the whole session: items, every agent's status and output, revisions and briefings, the trace.
// Reading also starts anything that's ready (so a restarted server picks up where it left off).
export async function GET(request) {
  const id = new URL(request.url).searchParams.get("id");
  try {
    await pump(id);
    return Response.json({ session: await load(id) });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 404 });
  }
}
