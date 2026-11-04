import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import Theater from "./Theater.jsx";

export const metadata = {
  title: "Systems",
  description: "Three systems of agents to run and remix: a loop, a cast, and a reality show with secrets.",
};

export default function TheaterPage() {
  return (
    <>
      <SiteHeader current="theater" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Week 9 · Agents, systems, orchestration</p>
          <h1>Systems (Theaters of Agents)</h1>
          <p className="hero-deck">
            A system is a folder of plain files: who's in it, what they're told, and the rules. Three to start: a loop, a cast, and a reality show with secrets. Rehearse one for free, run it, stop it, and read what it did.
          </p>
          <p className="machine-more">
            Each system's page says how it works. Every session is saved at <a href="/systems/sessions">Sessions</a>; drop anyone's log onto <a href="/systems/view">View a log</a>. Words you don't know are in the <a href="/ai-research/glossary">Glossary</a>.
          </p>
        </header>
        <Theater />
      </main>
      <SiteFooter />
    </>
  );
}
