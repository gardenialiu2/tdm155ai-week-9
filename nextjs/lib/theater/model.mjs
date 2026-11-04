import { env } from "../keys.mjs";

// One chat call to OpenRouter for one agent of the Theater: { system, user } in, { text, tokens, cost, model } out.
// Short replies: the Theater's agents speak a line at a time. Reasoning is capped small rather than turned off, as in the
// ensemble (the newer Claude models refuse to disable it). The key comes from the repo's root .env and never leaves
// the server.
export async function callModel({ model, system, user, maxTokens = 1800, signal }) {
  const key = await env("OPENROUTER_API_KEY");
  if (!key) throw new Error("No OPENROUTER_API_KEY in the repo's .env (copy .env.example to .env at the repo root).");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Title": "TDM 155AI Theater" },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      reasoning: { max_tokens: 1024 },
      usage: { include: true },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || `OpenRouter answered ${response.status}.`);
  const choice = body.choices?.[0] || {};
  const text = choice.message?.content || "";
  if (!text) throw new Error(`The model answered with nothing (finish reason: ${choice.finish_reason || "unknown"}).`);
  return {
    text,
    tokens: { in: body.usage?.prompt_tokens ?? null, out: body.usage?.completion_tokens ?? null },
    cost: body.usage?.cost ?? null,
    model: body.model || model,
  };
}
