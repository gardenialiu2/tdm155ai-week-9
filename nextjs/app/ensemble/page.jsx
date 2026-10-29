import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import Ensemble from "./Ensemble.jsx";

export const metadata = {
  title: "Ensemble",
  description: "Four roles read a context repository and brief a podcast host. You decide who reads what.",
};

export default function EnsemblePage() {
  return (
    <>
      <SiteHeader current="ensemble" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Week 9 · Agents and systems</p>
          <h1>The ensemble</h1>
          <p className="hero-deck">
            A context repository goes in. A Conductor proposes who reads what, an Archivist maps the files, a Researcher looks things up, a Briefer writes the host's briefing. You decide what the ensemble may read, approve or change the plan, and can edit any card before it's passed on. Everything each role is told is on this page, and the whole run comes out as a trace you can print and mark up.
          </p>
          <p className="machine-more">
            Done it on paper first? See <a href="/docs/paper-ensemble">the paper version</a>. Want to change this one? Your copy is at <a href="/remix">Remix</a>.
          </p>
        </header>
        <Ensemble />
      </main>
      <SiteFooter />
    </>
  );
}
