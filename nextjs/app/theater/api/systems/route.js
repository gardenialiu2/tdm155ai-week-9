import { listSystems } from "../../../../lib/theater/systems.mjs";

export const dynamic = "force-dynamic";

// GET → every system in systems/, as the Theater page shows it: its config and every agent's file.
export async function GET() {
  return Response.json({ systems: await listSystems() });
}
