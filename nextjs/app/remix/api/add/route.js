import { addItem } from "../../lib/jobs.mjs";

export const dynamic = "force-dynamic";

// POST multipart: session, any number of `file`s, and/or `text` (with an optional `textName`), and/or `link`.
// Each becomes one item, saved before any agent sees it, and the agents start on it right away.
export async function POST(request) {
  const form = await request.formData();
  const session = String(form.get("session") || "");
  const added = [];
  const refused = [];
  try {
    for (const file of form.getAll("file")) {
      if (!file || typeof file === "string" || !file.size) {
        if (file?.name) refused.push({ name: file.name, why: "empty file" });
        continue;
      }
      added.push(await addItem(session, { name: file.name, mime: file.type || "", bytes: Buffer.from(await file.arrayBuffer()) }));
    }
    const text = String(form.get("text") || "");
    if (text.trim()) added.push(await addItem(session, { name: String(form.get("textName") || "").trim() || null, text }));
    for (const link of form.getAll("link").map(String).map((l) => l.trim()).filter(Boolean)) {
      if (!/^https?:\/\//i.test(link)) refused.push({ name: link, why: "not a web address (start it with https://)" });
      else added.push(await addItem(session, { url: link }));
    }
  } catch (error) {
    return Response.json({ error: error.message, added, refused }, { status: 400 });
  }
  return Response.json({ added: added.map((i) => i.id), refused });
}
