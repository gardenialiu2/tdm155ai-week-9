"use client";
import { useEffect, useState } from "react";
import styles from "./gallery.module.css";

export default function Gallery({ tries, hung, ending, runs, current }) {
  const [i, setI] = useState(Math.max(0, tries.length - 1));
  const go = (n) => setI((x) => Math.min(tries.length - 1, Math.max(0, x + n)));
  useEffect(() => {
    const key = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });
  const t = tries[i];
  if (!t) return <main className={styles.room}><p className={styles.empty}>No finished runs yet. Run The Glow Room in <a href="/systems">Systems</a>, then come back.</p></main>;
  return (
    <main className={styles.room}>
      <header className={styles.top}>
        <a href="/systems">← Systems</a>
        <span className={styles.title}>{t.title || "Untitled"}</span>
        <select aria-label="Run" value={current} onChange={(e) => (window.location.href = `/gallery?run=${e.target.value}`)}>
          {runs.map((r) => <option key={r.run} value={r.run}>{new Date(r.when).toLocaleString()}</option>)}
        </select>
      </header>
      <pre className={styles.art} aria-label={`${t.title}, try ${t.round}`}>{t.art}</pre>
      <footer className={styles.bottom}>
        <p className={styles.statement}>{t.statement}</p>
        <div className={styles.controls}>
          <button onClick={() => go(-1)} disabled={i === 0} aria-label="Previous try">←</button>
          {tries.map((x, n) => (
            <button key={n} className={n === i ? styles.on : ""} onClick={() => setI(n)} aria-label={`Try ${x.round}, score ${x.score ?? "unscored"}`}>{x.score ?? "·"}</button>
          ))}
          <button onClick={() => go(1)} disabled={i === tries.length - 1} aria-label="Next try">→</button>
        </div>
        <p className={styles.note}><strong>{t.accept ? "HUNG" : "Rejected"} · try {t.round}{t.score ? ` · ${t.score}/10` : ""}.</strong> {t.note}</p>
        <p className={styles.end}>{hung ? "This piece was hung in the gallery." : `Not hung: ${ending || "the run did not finish"}.`}</p>
      </footer>
    </main>
  );
}
