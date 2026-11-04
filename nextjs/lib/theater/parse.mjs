// Reading agents' replies. Every agent in the Theater answers in labelled lines (`TO:`, `SAY:`, `ASIDE:`,
// `VERDICT:`, `BRANCH:`, `GOAL:`, `ACTION:`, ...). A label starts a field and the field runs until the next label, so a
// line of dialogue can span several lines. Pure functions: the server and the tests use them, and nothing here calls a model.

const LABEL = /^\s*[*_]*\s*([A-Z][A-Z ]{1,20}?)\s*[*_]*\s*:\s*[*_]*\s*(.*)$/;

export function fields(text = "") {
  const out = {};
  let current = null;
  for (const line of String(text).split(/\r?\n/)) {
    const match = line.match(LABEL);
    if (match) {
      current = match[1].trim().toUpperCase();
      out[current] = match[2].trim();
    } else if (current) {
      out[current] = `${out[current]}\n${line}`.trim();
    }
  }
  return out;
}

const clean = (value) => (value || "").replace(/^["“]|["”]$/g, "").trim();

// A character's turn. If the model forgot the labels, the whole reply is the public line.
export function parseLine(text, names = []) {
  const f = fields(text);
  const say = clean(f.SAY) || (f.TO || f.ASIDE ? "" : String(text).trim());
  const to = addressees(f.TO, names);
  return { to, say, aside: clean(f.ASIDE) };
}

// "everyone", "Ada", "Ada and Bo", "Ada, Bo" → ["everyone"] or the names that match the cast.
export function addressees(value = "", names = []) {
  const raw = (value || "").trim();
  if (!raw || /^(everyone|all|the room|the group)\b/i.test(raw)) return ["everyone"];
  const found = names.filter((name) => new RegExp(`\\b${escape(firstWord(name))}`, "i").test(raw));
  return found.length ? found : ["everyone"];
}

const firstWord = (name) => String(name).split(/\s+/)[0];
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function parseVerdict(text) {
  const f = fields(text);
  const accept = /accept/i.test(f.VERDICT || "") && !/reject/i.test(f.VERDICT || "");
  return { accept, reason: f.REASON || (f.VERDICT ? "" : String(text).trim()) };
}

export function parseRoute(text, branches = []) {
  const f = fields(text);
  const said = (f.BRANCH || "").toLowerCase();
  const branch = branches.find((b) => said.includes(b.toLowerCase())) || branches.find((b) => String(text).toLowerCase().includes(b.toLowerCase())) || branches[0];
  return { branch, reason: f.REASON || "" };
}

export function parseGoal(text) {
  const f = fields(text);
  const goal = (f.GOAL || "").toLowerCase();
  return { reached: /reached|yes|met/.test(goal) && !/not/.test(goal), reason: f.REASON || "", note: clean(f.NOTE) };
}

const ACTIONS = ["twist", "challenge", "vote", "eliminate", "none"];

export function parseAction(text, names = []) {
  const f = fields(text);
  const action = ACTIONS.find((a) => (f.ACTION || "").toLowerCase().includes(a)) || "none";
  const target = f.TARGET ? names.find((n) => new RegExp(escape(firstWord(n)), "i").test(f.TARGET)) || null : null;
  return { action, target, text: clean(f.TEXT) };
}

// A private vote: the first cast name mentioned in VOTE: (or anywhere), never the voter.
export function parseVote(text, names = [], voter = "") {
  const f = fields(text);
  const where = f.VOTE || String(text);
  const candidates = names.filter((n) => n !== voter);
  const target = candidates.find((n) => new RegExp(`\\b${escape(firstWord(n))}`, "i").test(where)) || null;
  return { target, why: clean(f.WHY) || clean(f.REASON) };
}
