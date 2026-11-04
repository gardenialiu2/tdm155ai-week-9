import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import { listRuns } from "../../../lib/theater/systems.mjs";
import styles from "../theater.module.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sessions", description: "Every Theater session on this computer." };

export default async function SessionsPage() {
  const runs = await listRuns();
  return (
    <>
      <SiteHeader current="sessions" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Systems (theaters of agents)</p>
          <h1>Sessions</h1>
          <p className="machine-more">Each time you press Run it or Rehearse in Systems, the session is saved here, newest first. It stays on this computer: the logs are in <code>runs/</code> at the repo root, which git ignores. Open one for its dashboard. Somebody else's log? <a href="/systems/view">View a log</a>.</p>
        </header>
        <div className={styles.runs}>
          {runs.map((r) => (
            <a key={r.id} href={`/systems/sessions/${encodeURIComponent(r.id)}`}>
              <span><strong>{r.system}</strong> · <code>{r.run}</code></span>
              <span className={styles.muted}>{Math.round(r.size / 1024)} KB</span>
            </a>
          ))}
          {!runs.length && <p className={styles.muted}>No sessions yet. Go to <a href="/systems">Systems</a> and run one.</p>}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
