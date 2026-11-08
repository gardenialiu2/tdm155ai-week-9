"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./scribblio.module.css";

// A replay on the game's own clock: the picture, the guesses and the countdown appear at the seconds they happened.
export default function Scribblio({ rounds, ending, runs, current }) {
  const [n, setN] = useState(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const started = useRef(0);
  const r = rounds[n];
  const limit = (r?.seconds || 30) * 1000;
  const lastAt = r ? Math.max(0, ...r.guesses.map((g) => g.at), ...r.arts.map((a) => a.at)) : 0;
  const endAt = r?.reveal?.solved ? lastAt : limit;

  useEffect(() => {
    if (!r || !playing) return;
    started.current = performance.now() - t;
    const id = setInterval(() => {
      const now = performance.now() - started.current;
      if (now >= endAt + 400) { setT(endAt + 400); setPlaying(false); } else setT(now);
    }, 80);
    return () => clearInterval(id);
  }, [n, playing, r, endAt]); // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (i) => { setN(i); setT(0); setPlaying(true); };
  if (!r) return <main className={styles.room}><p className={styles.empty}>No games yet. Run Scribblio in <a href="/systems">Systems</a>, then come back.</p></main>;

  const art = [...r.arts].reverse().find((a) => a.at <= t) || null;
  const guesses = r.guesses.filter((g) => g.at <= t);
  const over = t >= endAt + 400 || (r.reveal?.solved && t >= lastAt);
  const left = Math.max(0, Math.ceil((limit - Math.min(t, limit)) / 1000));
  const total = rounds.reduce((s, x) => s + (x.reveal?.points || 0), 0);
  const word = over ? r.reveal?.word : null;
  const halfway = t > limit / 2 && r.hint;
  const hint = word ? word.split("").join(" ") : halfway ? r.hint.replace(/^_/, "?") : r.hint;

  return (
    <main className={styles.room}>
      <header className={styles.top}>
        <a href="/systems">← Systems</a>
        <span className={styles.logo}>Scribblio</span>
        <select aria-label="Game" value={current} onChange={(e) => (window.location.href = `/scribblio?run=${e.target.value}`)}>
          {runs.map((x) => <option key={x.run} value={x.run}>{new Date(x.when).toLocaleString()}</option>)}
        </select>
      </header>

      <div className={styles.bar}>
        <span className={styles.clock} aria-label="Seconds left">{left}</span>
        <span className={styles.word}>{hint}</span>
        <span className={styles.round}>Round {r.n} of {rounds.length}</span>
      </div>
      <div className={styles.meter} aria-hidden="true"><div style={{ width: `${Math.max(0, 100 - (Math.min(t, limit) / limit) * 100)}%` }} /></div>

      <section className={styles.stage}>
        <pre className={styles.canvas} aria-label="The drawing">{art ? art.text : "Pip is drawing…"}</pre>
        <ol className={styles.chat} aria-label="Guesses">
          {guesses.map((g, i) => (
            <li key={i} className={g.right ? styles.right : ""}>
              <strong>Quill</strong> {g.right ? `guessed it! +${g.points}` : <>guessed <em>{g.guess}</em></>}
              {g.say && !g.right && <span>{g.say}</span>}
            </li>
          ))}
          {over && r.reveal && <li className={styles.reveal}>{r.reveal.text}</li>}
        </ol>
      </section>

      <footer className={styles.bottom}>
        <div className={styles.controls}>
          <button onClick={() => pick(n)}>↻ Replay</button>
          {rounds.map((x, i) => <button key={i} className={i === n ? styles.on : ""} onClick={() => pick(i)} aria-label={`Round ${x.n}`}>{x.n}{x.reveal ? (x.reveal.solved ? " ✓" : " ✗") : ""}</button>)}
        </div>
        <p className={styles.score}>Score {total}{ending ? ` · ${ending}` : ""}</p>
      </footer>
    </main>
  );
}
