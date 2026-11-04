import path from "node:path";
import { load, readOriginal } from "../../../../lib/podcast/store.mjs";

// GET ?session=&item= → the original, exactly as it was submitted.
const TYPES = { ".md": "text/markdown; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".m4a": "audio/mp4", ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm" };

export async function GET(request) {
  const url = new URL(request.url);
  try {
    const session = await load(url.searchParams.get("session"));
    const item = session.items.find((i) => i.id === url.searchParams.get("item"));
    if (!item) throw new Error("No such item.");
    const bytes = await readOriginal(session.id, item.file);
    return new Response(bytes, { headers: { "Content-Type": item.mime || TYPES[path.extname(item.file).toLowerCase()] || "application/octet-stream", "Content-Disposition": `inline; filename="${path.basename(item.file).replace(/"/g, "")}"` } });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 404 });
  }
}
