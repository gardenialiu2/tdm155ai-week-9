import { env } from "../../../../../lib/keys.mjs";
import { roles, runRequest } from "../../prompts.mjs";

// POST { model, role, instructions, message } → { text, sources, cost, model }.
// One model call for one role of the ensemble. The page composes `instructions` (the role's system prompt) and
// `message` (what the role is given) from prompts.mjs and shows both before sending; this route only forwards them to
// a chat model on OpenRouter and returns the answer. The Researcher's call turns on OpenRouter's web search (see
// runRequest), and `sources` lists the pages it cited. Keys come from the repo's root .env and never reach the browser.

export async function POST(request) {
  const { model = "anthropic/claude-haiku-5.5", role = "", instructions = "", message = "" } = await request.json();
  if (!roles.some((r) => r.key === role)) return Response.json({ error: `Unknown role "${role}".` }, { status: 400 });
  if (!instructions.trim() || !message.trim()) return Response.json({ error: "Nothing to send: the instructions or the message is empty." }, { status: 400 });
  const key = await env("OPENROUTER_API_KEY");
  if (!key) return Response.json({ error: "No OPENROUTER_API_KEY in the repo's .env." }, { status: 500 });
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(runRequest({ model, role, instructions, message })),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) return Response.json({ error: body.error?.message || `OpenRouter answered ${response.status}.` }, { status: 502 });
  const choice = body.choices?.[0] || {};
  const reply = choice.message || {};
  if (!reply.content) return Response.json({ error: `The model answered with nothing (finish reason: ${choice.finish_reason || "unknown"}). If it ran out of tokens, give this role fewer files.` }, { status: 502 });
  const sources = (reply.annotations || [])
    .filter((item) => item.type === "url_citation" && item.url_citation?.url)
    .map((item) => ({ title: item.url_citation.title || item.url_citation.url, url: item.url_citation.url }));
  return Response.json({ text: reply.content || "", sources, cost: body.usage?.cost ?? null, model: body.model || model });
}
