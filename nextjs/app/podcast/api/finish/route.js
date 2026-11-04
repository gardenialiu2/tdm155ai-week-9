import { finish } from "../../../../lib/podcast/jobs.mjs";

// POST { session, proceed } → "I'm done adding material": closes the open revision; Bea writes the briefing once every
// item in it is finished. With proceed, Bea goes ahead past items that failed and names them in the briefing.
export async function POST(request) {
  const { session, proceed = false } = await request.json().catch(() => ({}));
  try {
    return Response.json({ revision: await finish(session, { proceed }) });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
