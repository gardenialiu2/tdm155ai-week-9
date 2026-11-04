import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import Theater from "./Theater.jsx";

export const metadata = {
  title: "Theater",
  description: "Design a system of agents as a folder of files, run it, and inspect what it did.",
};

export default function TheaterPage() {
  return (
    <>
      <SiteHeader current="theater" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Week 9 · Agents, systems, orchestration</p>
          <h1>The theater of agents</h1>
          <p className="hero-deck">
            A system is a folder of files you write: characters, a judge, a router, a director, producers, observers. Run it, watch it, stop it, and read the log it leaves.
          </p>
          <p className="machine-more">
            Start with <a href="/docs/theater">the Theater docs</a>: the loop, the switch, the cast, a goal, the producers, the observers. Every run is saved at <a href="/theater/runs">Runs</a>; drop anyone's log onto <a href="/theater/view">View a log</a>.
          </p>
        </header>
        <Theater />
      </main>
      <SiteFooter />
    </>
  );
}
