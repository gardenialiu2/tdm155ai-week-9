import { env } from "../keys.mjs";

// One chat call for one podcast agent, through OpenRouter. `content` (an array of parts: text, an image, a PDF) is
// sent as the user message when given; otherwise `user` (text). Reasoning is capped small, as elsewhere in this app.
// The key stays on the server.
export const DEFAULT_MODEL = "anthropic/claude-haiku-5.5";

export async function chat({ model = DEFAULT_MODEL, system, user = "", content = null, maxTokens = 3000, json = false }) {
  const key = await env("OPENROUTER_API_KEY");
  if (!key) throw new Error("No OPENROUTER_API_KEY in the repo's .env.");
  const body = {
    model,
    max_tokens: maxTokens,
    reasoning: { max_tokens: 1024 },
    usage: { include: true },
    messages: [
      { role: "system", content: system },
      { role: "user", content: content || user },
    ],
    ...(content?.some((part) => part.type === "file") ? { plugins: [{ id: "file-parser", pdf: { engine: "native" } }] } : {}),
  };
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Title": "TDM 155AI podcast prep" },
    body: JSON.stringify(body),
  });
  const reply = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(reply.error?.message || `OpenRouter answered ${response.status}.`);
  const choice = reply.choices?.[0] || {};
  const text = String(choice.message?.content || "").trim();
  if (!text) throw new Error(`The model answered with nothing (finish reason: ${choice.finish_reason || "unknown"}).`);
  return { text, cost: reply.usage?.cost ?? null, model: reply.model || model, data: json ? parseJson(text) : null };
}

// The first JSON object in an answer (fenced or bare), or null.
export function parseJson(text) {
  const raw = String(text).match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] || String(text).match(/\{[\s\S]*\}/)?.[0];
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
