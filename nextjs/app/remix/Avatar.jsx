// The podcast cast as small animated characters: the Collector, the Interviewer, the Sidekick, the Producer.
// Each drawing is inline SVG on a 100 x 100 grid. The `state` prop is written to data-state on the root, and the
// stylesheet animates only [data-state="working"]; every other state is a still. No timers, no JS animation.
// The static Slack icons in ./avatars/*.svg are the same drawings, scaled to 256 x 256: change both together.
import s from "./avatars.module.css";

const CAST = {
  intake: { name: "Collector", role: "Intake", disc: "#15302b" },
  interviewer: { name: "Interviewer", role: "Interviewer", disc: "#33280f" },
  sidekick: { name: "Sidekick", role: "Sidekick", disc: "#251d35" },
  producer: { name: "Producer", role: "Producer", disc: "#361a28" },
};

const STATES = ["idle", "working", "waiting", "done", "failed"];

// The shared shoulders: a curve that meets the disc's edge, so no clip path is needed.
const SHOULDERS = "M18.25 86 Q22 70 38 67 L62 67 Q78 70 81.75 86 A48 48 0 0 1 18.25 86 Z";

// Collector (intake): plain bob, round glasses, an in-tray. Working: a page slides in and settles on the stack.
function Collector() {
  return (
    <>
      {/* figure:intake */}
      <rect x="44" y="50" width="12" height="18" fill="#6fc0b0" />
      <path d={SHOULDERS} fill="#6f86a0" />
      <g className={s.piperHead}>
        <rect x="31" y="20" width="38" height="35" rx="13" fill="#6fc0b0" />
        <path d="M29 40 Q28 15 50 15 Q72 15 71 40 L71 47 L65 47 L65 31 Q50 34 35 31 L35 47 L29 47 Z" fill="#2e5d55" />
        <circle cx="43" cy="40.5" r="1.9" fill="#161816" stroke="none" />
        <circle cx="57" cy="40.5" r="1.9" fill="#161816" stroke="none" />
        <circle cx="43" cy="40.5" r="5" fill="none" stroke="#161816" strokeWidth="1.8" />
        <circle cx="57" cy="40.5" r="5" fill="none" stroke="#161816" strokeWidth="1.8" />
        <path d="M48 40.5 L52 40.5" fill="none" stroke="#161816" strokeWidth="1.8" />
        <path d="M45 48 Q50 51 55 48" fill="none" stroke="#161816" strokeWidth="2" />
      </g>
      <rect x="30" y="70" width="40" height="8" rx="1" fill="#f2efe6" />
      <g className={s.piperPage}>
        <rect x="37" y="58" width="26" height="22" rx="1.5" fill="#fbf9f2" />
        <path d="M41 63 L59 63 M41 67.5 L55 67.5" fill="none" stroke="#8a8f86" strokeWidth="1.6" />
      </g>
      <path d="M25 75 L75 75 L71 88 L29 88 Z" fill="#b48a5e" />
      <path d="M42 81 L58 81" fill="none" stroke="#161816" strokeWidth="1.8" />
      {/* /figure */}
    </>
  );
}

// Interviewer: one curl, wide eyes, a raised brow, an "oh?" mouth, a stand mic.
// Working: sound rings pulse out of the mic, the question mark bobs, the head tilts.
function Interviewer() {
  return (
    <>
      {/* figure:interviewer */}
      <rect x="41" y="56" width="10" height="13" fill="#e8b84e" />
      <path d={SHOULDERS} fill="#d4774f" />
      <g className={s.quinnHead}>
        <circle cx="46" cy="42" r="19" fill="#e8b84e" />
        <path d="M28 38 Q28 22 46 22 Q64 22 64 38 Q58 30 46 31 Q36 31 28 38 Z" fill="#8a5a22" />
        <path d="M46 23 Q44 14 50 13 Q55 13 54 18" fill="none" />
        <circle cx="39" cy="42" r="5.5" fill="#fbf9f2" stroke="#161816" strokeWidth="1.5" />
        <circle cx="53" cy="42" r="5.5" fill="#fbf9f2" stroke="#161816" strokeWidth="1.5" />
        <circle cx="40.5" cy="43" r="2.4" fill="#161816" stroke="none" />
        <circle cx="54.5" cy="43" r="2.4" fill="#161816" stroke="none" />
        <path d="M34 34.5 Q39 32.5 43 34.5" fill="none" stroke="#161816" strokeWidth="2" />
        <path d="M49 31 Q54 27 58 31" fill="none" stroke="#161816" strokeWidth="2" />
        <circle cx="46" cy="52.5" r="2.4" fill="#161816" stroke="none" />
      </g>
      <g className={s.quinnQ}>
        <path d="M66 22 Q66 16 71.5 16 Q77 16 77 21.5 Q77 25 71.5 27 L71.5 29.5" fill="none" strokeWidth="2.6" />
        <circle cx="71.5" cy="34" r="1.7" className={s.inkFill} stroke="none" />
      </g>
      <path d="M74 66 L74 84 M67 85 L81 85" fill="none" />
      <rect x="71" y="58" width="6" height="9" rx="1.5" fill="#3a3d40" />
      <rect x="67" y="41" width="14" height="18" rx="7" fill="#a7adb3" />
      <path d="M68.8 47 L79.2 47 M68.5 50.5 L79.5 50.5 M68.8 54 L79.2 54" fill="none" stroke="#161816" strokeWidth="1.2" />
      <g className={s.quinnRing1}>
        <path d="M80.6 41.2 A11 11 0 0 1 80.6 58.8" fill="none" />
      </g>
      <g className={s.quinnRing2}>
        <path d="M84.2 36.4 A17 17 0 0 1 84.2 63.6" fill="none" />
      </g>
      {/* /figure */}
    </>
  );
}

// Sidekick: a top hat with a red band, a permanent wink, a lopsided grin, a bow tie.
// Working: the Sidekick tips the hat and raises the open eye's brow.
function Sidekick() {
  return (
    <>
      {/* figure:sidekick */}
      <path d={SHOULDERS} fill="#4a3d60" />
      <path d="M50 73 L40 67.5 L40 78.5 Z M50 73 L60 67.5 L60 78.5 Z" fill="#ff6b57" />
      <circle cx="50" cy="73" r="3" fill="#ff6b57" />
      <ellipse cx="50" cy="52" rx="18" ry="16" fill="#ad90e6" />
      <circle cx="37" cy="58" r="3.2" fill="#ff9cc0" stroke="none" opacity="0.75" />
      <circle cx="63" cy="58" r="3.2" fill="#ff9cc0" stroke="none" opacity="0.75" />
      <circle cx="43" cy="50" r="2.6" fill="#161816" stroke="none" />
      <circle cx="43.9" cy="49.1" r="0.8" fill="#fbf9f2" stroke="none" />
      <path d="M53 50.5 Q57 46.5 61 50.5" fill="none" stroke="#161816" strokeWidth="2.2" />
      <g className={s.kitBrow}>
        <path d="M38.5 44.5 Q43 41 47.5 44" fill="none" stroke="#161816" strokeWidth="2" />
      </g>
      <path d="M53 45.5 L60 46.5" fill="none" stroke="#161816" strokeWidth="2" />
      <path d="M41 57 Q51 66.5 60 55.5 Q51 60.5 41 57 Z" fill="#161816" stroke="#161816" strokeWidth="1.5" />
      <g className={s.kitHat}>
        <path d="M37 34 L38.5 13 L61.5 13 L63 34 Z" fill="#2b2633" />
        <path d="M37.6 26 L62.4 26 L62.7 31 L37.3 31 Z" fill="#ff6b57" />
        <rect x="29" y="33" width="42" height="5" rx="2.5" fill="#2b2633" />
      </g>
      {/* /figure */}
    </>
  );
}

// Producer: hair in a bun, a headset, a clipboard held up. Working: the lines write themselves in, one by one.
function Producer() {
  return (
    <>
      {/* figure:producer */}
      <rect x="35" y="50" width="10" height="18" fill="#ee93b0" />
      <path d={SHOULDERS} fill="#5f8fd6" />
      <circle cx="40" cy="18" r="6.5" fill="#6b3b4a" />
      <circle cx="40" cy="38" r="16" fill="#ee93b0" />
      <path d="M24 37 Q24 21 40 21 Q56 21 56 37 Q51 28 40 28.5 Q29 28 24 37 Z" fill="#6b3b4a" />
      <path d="M22.5 39 A17.5 17.5 0 0 1 57.5 39" fill="none" stroke="#a7adb3" strokeWidth="2.6" />
      <rect x="19" y="34" width="7" height="11" rx="3" fill="#3a3d40" />
      <path d="M23 44 Q24 51.5 32 50.5" fill="none" stroke="#a7adb3" strokeWidth="2" />
      <circle cx="33" cy="50.3" r="2" fill="#3a3d40" stroke="none" />
      <circle cx="35.5" cy="40" r="2" fill="#161816" stroke="none" />
      <circle cx="46.5" cy="40" r="2" fill="#161816" stroke="none" />
      <path d="M36 46 Q41 49.5 46 46" fill="none" stroke="#161816" strokeWidth="2" />
      <rect x="50" y="55" width="28" height="31" rx="3" fill="#b48a5e" />
      <rect x="53.5" y="60" width="21" height="23" rx="1" fill="#f2efe6" stroke="none" />
      <rect x="58" y="52" width="12" height="6.5" rx="2" fill="#a7adb3" />
      <g className={s.beaLine1}>
        <path d="M56.5 65 L71.5 65" fill="none" stroke="#3a3d40" strokeWidth="1.8" />
      </g>
      <g className={s.beaLine2}>
        <path d="M56.5 69.5 L69 69.5" fill="none" stroke="#3a3d40" strokeWidth="1.8" />
      </g>
      <g className={s.beaLine3}>
        <path d="M56.5 74 L71.5 74" fill="none" stroke="#3a3d40" strokeWidth="1.8" />
      </g>
      <g className={s.beaLine4}>
        <path d="M56.5 78.5 L65 78.5" fill="none" stroke="#3a3d40" strokeWidth="1.8" />
      </g>
      <circle cx="51" cy="72" r="4.5" fill="#ee93b0" />
      {/* /figure */}
    </>
  );
}

const FIGURES = { intake: Collector, interviewer: Interviewer, sidekick: Sidekick, producer: Producer };

// A small still mark in the lower right for the states that need one.
function Badge({ state }) {
  if (state === "done") {
    return (
      <g>
        <circle cx="82" cy="80" r="10" fill="#7fc787" className={s.badgeRing} />
        <path d="M77 80.5 L80.8 84.2 L87.2 76.8" fill="none" stroke="#121412" strokeWidth="3" />
      </g>
    );
  }
  if (state === "failed") {
    return (
      <g>
        <circle cx="82" cy="80" r="10" fill="#ff8a80" className={s.badgeRing} />
        <path d="M82 74.5 L82 81" fill="none" stroke="#121412" strokeWidth="3" />
        <circle cx="82" cy="85" r="1.7" fill="#121412" />
      </g>
    );
  }
  if (state === "waiting") {
    return (
      <g>
        <circle cx="82" cy="80" r="10" fill="#a0a49a" className={s.badgeRing} />
        <circle cx="77.5" cy="80" r="1.6" fill="#121412" />
        <circle cx="82" cy="80" r="1.6" fill="#121412" />
        <circle cx="86.5" cy="80" r="1.6" fill="#121412" />
      </g>
    );
  }
  return null;
}

export default function Avatar({ agent, state = "idle", size = 72 }) {
  const who = CAST[agent];
  const Figure = FIGURES[agent];
  const shown = STATES.includes(state) ? state : "idle";
  const label = who ? `${who.role === who.name ? who.name : `${who.name}, ${who.role}`}: ${shown}` : `Unknown agent: ${shown}`;
  return (
    <svg
      className={s.avatar}
      data-agent={agent}
      data-state={shown}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={label}
    >
      <circle className={s.disc} cx="50" cy="50" r="48" fill={who ? who.disc : "#1a1c19"} />
      <g className={s.figure}>
        {Figure ? (
          <Figure />
        ) : (
          <path d="M42 40 Q42 30 50 30 Q58 30 58 38 Q58 44 50 47 L50 54 M50 62 L50 63" fill="none" strokeWidth="4" />
        )}
      </g>
      <Badge state={shown} />
    </svg>
  );
}
