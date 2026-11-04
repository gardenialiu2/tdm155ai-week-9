import { createSession, listSessions } from "../../lib/store.mjs";

export const dynamic = "force-dynamic";

// GET → every prep session on this computer. POST { title } → a new one.
export async function GET() {
  return Response.json({ sessions: await listSessions() });
}

export async function POST(request) {
  const { title = "" } = await request.json().catch(() => ({}));
  return Response.json({ session: await createSession(title.trim() || "Untitled guest") });
}
