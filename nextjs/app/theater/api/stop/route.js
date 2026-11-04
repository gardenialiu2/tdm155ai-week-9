import active from "../../../../lib/theater/active.mjs";

// POST { run } → stops that run after the model call in progress. With no run, stops every run on this machine.
export async function POST(request) {
  const { run = "" } = await request.json().catch(() => ({}));
  const ids = run ? [run] : [...active.keys()];
  for (const id of ids) active.get(id)?.abort();
  return Response.json({ stopped: ids.filter((id) => active.has(id)) });
}
