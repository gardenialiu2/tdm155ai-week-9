// The Collector's reading tools: turn a saved original into text the other agents can read. Text files are read as
// they are, audio and video are transcribed (ffmpeg, then OpenRouter), and links are fetched and stripped to text.
// Images and PDFs aren't handled here: the Collector opens those itself with Claude Code's Read tool. Nothing here
// changes an original. Each function returns { text, method, cost }.
//
// Adapted on 2026-11-04 from the week 9 web app's nextjs/lib/podcast/read.mjs (same model, same ffmpeg settings),
// copied so the Claude Code agents don't depend on the app's files. No chat model is called here.

import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
// .claude/utils/podcast/ → the repo root, where the gitignored .env lives.
export const repoRoot = path.resolve(here, "../../..");

export const TRANSCRIBE_MODEL = process.env.PODCAST_TRANSCRIBE_MODEL || "openai/gpt-4o-mini-transcribe";

// A key from the environment, or else from the repo's root .env. The value is used for the request and never printed.
export async function env(name) {
  if (process.env[name]?.trim()) return process.env[name].trim();
  try {
    const text = await readFile(path.join(repoRoot, ".env"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && m[1] === name) return m[2].replace(/^(['"])(.*)\1$/, "$2");
    }
  } catch {}
  return "";
}

const TEXT = /\.(md|markdown|txt|text|csv|tsv|json|ya?ml|html?|xml|srt|vtt|js|mjs|py|rtf)$/i;
const AUDIO = /\.(mp3|wav|m4a|aac|ogg|oga|opus|flac|aiff?|caf)$/i;
const VIDEO = /\.(mp4|mov|m4v|mkv|avi|webm)$/i;
const IMAGE = /\.(png|jpe?g|gif|webp|heic|heif)$/i;

export function kindOf(name = "") {
  if (AUDIO.test(name)) return "audio";
  if (VIDEO.test(name)) return "video";
  if (IMAGE.test(name)) return "image";
  if (/\.pdf$/i.test(name)) return "pdf";
  if (TEXT.test(name)) return "text";
  return "other";
}

export function stripHtml(html) {
  return String(html)
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>|<\/(p|div|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ").replace(/\n\s*\n\s*\n+/g, "\n\n").trim();
}

export async function hasFfmpeg() {
  try {
    await run("ffmpeg", ["-version"]);
    return true;
  } catch {
    return false;
  }
}

// Any audio or video → a small mono MP3 (16 kHz, 32 kbps: an hour is about 14 MB), so one request can carry it.
async function toMp3(bytes, name) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "collector-"));
  try {
    const input = path.join(dir, `in${path.extname(name) || ".bin"}`);
    const output = path.join(dir, "out.mp3");
    await writeFile(input, bytes);
    await run("ffmpeg", ["-y", "-loglevel", "error", "-i", input, "-vn", "-ac", "1", "-ar", "16000", "-b:a", "32k", output], { maxBuffer: 1 << 24 });
    return await readFile(output);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export async function transcribe(bytes, name, kind, { model = TRANSCRIBE_MODEL } = {}) {
  const key = await env("OPENROUTER_API_KEY");
  if (!key) throw new Error("No OPENROUTER_API_KEY in the environment or the repo's .env (copy .env.example to .env and add it).");
  let data = bytes;
  let format = path.extname(name).slice(1).toLowerCase() || "mp3";
  const ffmpeg = await hasFfmpeg();
  if (ffmpeg) {
    data = await toMp3(bytes, name);
    format = "mp3";
  } else if (kind === "video" || !["mp3", "wav", "m4a", "ogg", "flac", "webm"].includes(format)) {
    throw new Error("This needs ffmpeg to pull the sound out (brew install ffmpeg), then retry it.");
  }
  const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, input_audio: { data: Buffer.from(data).toString("base64"), format } }),
  });
  const reply = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(reply.error?.message || `OpenRouter's transcription answered ${response.status}.`);
  const text = String(reply.text || "").trim();
  if (!text) throw new Error("The transcription came back empty (is there speech in it?).");
  return { text, method: `transcribed (${model}${ffmpeg ? ", via ffmpeg" : ""})`, cost: reply.usage?.cost ?? null };
}

export async function readLink(url) {
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (TDM 155AI podcast prep, local)" }, redirect: "follow", signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`The page answered ${response.status}.`);
  const type = response.headers.get("content-type") || "";
  if (!/text|html|json|xml/.test(type)) throw new Error(`The link is ${type || "not a web page"}; download it and add the file instead.`);
  const raw = await response.text();
  const title = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const text = /html/.test(type) ? stripHtml(raw) : raw;
  if (!text.trim()) throw new Error("The page had no readable text (it may need a browser to load).");
  return { text: `${title ? `${title}\n\n` : ""}${text}`, method: "fetched the page", cost: 0 };
}

export async function readText(bytes, name) {
  const raw = Buffer.from(bytes).toString("utf8");
  if (/\.html?$/i.test(name)) return { text: stripHtml(raw), method: "read the HTML as text", cost: 0 };
  if (/\.rtf$/i.test(name)) return { text: raw.replace(/\\par[d]?/g, "\n").replace(/\{\\[^{}]*\}|\\[a-z]+-?\d* ?|[{}]/g, "").trim(), method: "read the RTF as text", cost: 0 };
  return { text: raw, method: "read as text", cost: 0 };
}
