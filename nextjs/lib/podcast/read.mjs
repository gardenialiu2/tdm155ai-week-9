import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { env } from "../keys.mjs";
import { chat } from "./model.mjs";

// Piper's tools: what turns a saved original into text the other agents can read. Text files are read as they
// are; audio and video are converted with ffmpeg (if it's installed) and transcribed through OpenRouter; images are
// described and PDFs read by a vision model; links are fetched and stripped to text. Each returns
// { text, method, cost }. Nothing here ever changes the original.

const run = promisify(execFile);

const TEXT = /\.(md|markdown|txt|text|csv|tsv|json|ya?ml|html?|xml|srt|vtt|js|mjs|py|rtf)$/i;
const AUDIO = /\.(mp3|wav|m4a|aac|ogg|oga|opus|flac|webm|aiff?|caf)$/i;
const VIDEO = /\.(mp4|mov|m4v|mkv|avi|webm)$/i;
const IMAGE = /\.(png|jpe?g|gif|webp|heic|heif)$/i;

export function kindOf(name = "", mime = "") {
  if (mime.startsWith("audio/") || (AUDIO.test(name) && !mime.startsWith("video/"))) return "audio";
  if (mime.startsWith("video/") || VIDEO.test(name)) return "video";
  if (mime.startsWith("image/") || IMAGE.test(name)) return "image";
  if (mime === "application/pdf" || /\.pdf$/i.test(name)) return "pdf";
  if (mime.startsWith("text/") || TEXT.test(name)) return "text";
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

async function hasFfmpeg() {
  try {
    await run("ffmpeg", ["-version"]);
    return true;
  } catch {
    return false;
  }
}

// Any audio or video → a small mono MP3 (32 kbps: an hour is about 14 MB), so one request can carry it.
async function toMp3(bytes, name) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "piper-"));
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

export async function transcribe(bytes, name, kind, { model = "openai/gpt-4o-mini-transcribe", hint = "" } = {}) {
  const key = await env("OPENROUTER_API_KEY");
  if (!key) throw new Error("No OPENROUTER_API_KEY in the repo's .env.");
  let data = bytes;
  let format = path.extname(name).slice(1).toLowerCase() || "mp3";
  if (await hasFfmpeg()) {
    data = await toMp3(bytes, name);
    format = "mp3";
  } else if (kind === "video" || !["mp3", "wav", "m4a", "ogg", "flac", "webm"].includes(format)) {
    throw new Error("This needs ffmpeg to pull the sound out (brew install ffmpeg), then press Retry.");
  }
  const body = { model, input_audio: { data: Buffer.from(data).toString("base64"), format } };
  if (hint && model.startsWith("openai/")) body.provider = { options: { openai: { prompt: hint } } };
  const response = await fetch("https://openrouter.ai/api/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const reply = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(reply.error?.message || `OpenRouter's transcription answered ${response.status}.`);
  const text = String(reply.text || "").trim();
  if (!text) throw new Error("The transcription came back empty (is there speech in it?).");
  return { text, method: `transcribed (${model}${format === "mp3" && (await hasFfmpeg()) ? ", via ffmpeg" : ""})`, cost: reply.usage?.cost ?? null };
}

const mimeFor = (name, fallback) => ({ png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp" })[path.extname(name).slice(1).toLowerCase()] || fallback || "image/png";

export async function describeImage(bytes, name, mime, model) {
  let data = bytes;
  let type = mimeFor(name, mime);
  if (/\.(heic|heif)$/i.test(name)) {
    // HEIC (iPhone photos): convert with macOS's sips if it's there.
    const dir = await mkdtemp(path.join(os.tmpdir(), "piper-"));
    try {
      await writeFile(path.join(dir, "in.heic"), bytes);
      await run("sips", ["-s", "format", "jpeg", path.join(dir, "in.heic"), "--out", path.join(dir, "out.jpg")]);
      data = await readFile(path.join(dir, "out.jpg"));
      type = "image/jpeg";
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }
  const answer = await chat({
    model,
    system: "You are Piper, the intake agent for a podcast's producers. Describe an image someone submitted, so that colleagues who can't see it can ask good questions about it. Be factual: what is in it, any text in it (transcribed exactly), what kind of image it is (photo, sketch, screenshot, frame, diagram). Under 200 words. Don't guess at meanings or praise it.",
    content: [{ type: "text", text: `The file is "${name}". Describe it.` }, { type: "image_url", image_url: { url: `data:${type};base64,${Buffer.from(data).toString("base64")}` } }],
  });
  return { text: answer.text, method: `described (${answer.model})`, cost: answer.cost };
}

export async function readPdf(bytes, name, model) {
  const answer = await chat({
    model,
    maxTokens: 8000,
    system: "You are Piper, the intake agent for a podcast's producers. Give the full text of the PDF you're given, as plain Markdown, in reading order. Describe any images or figures in one bracketed line each. Don't summarize or comment.",
    content: [{ type: "text", text: `The file is "${name}".` }, { type: "file", file: { filename: path.basename(name), file_data: `data:application/pdf;base64,${Buffer.from(bytes).toString("base64")}` } }],
  });
  return { text: answer.text, method: `read as a PDF (${answer.model})`, cost: answer.cost };
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
  return { text: `${title ? `${title}\n\n` : ""}${text}`, method: "fetched the page", cost: 0, title };
}

export async function readText(bytes, name) {
  const raw = Buffer.from(bytes).toString("utf8");
  if (/\.html?$/i.test(name)) return { text: stripHtml(raw), method: "read the HTML as text", cost: 0 };
  if (/\.rtf$/i.test(name)) return { text: raw.replace(/\\par[d]?/g, "\n").replace(/\{\\[^{}]*\}|\\[a-z]+-?\d* ?|[{}]/g, "").trim(), method: "read the RTF as text", cost: 0 };
  return { text: raw, method: "read as text", cost: 0 };
}
