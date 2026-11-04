import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import Ensemble from "./Ensemble.jsx";

export const metadata = {
  title: "Remix",
  description: "Four roles read a context repository and brief a podcast host. You decide who reads what.",
};

export default function EnsemblePage() {
  return (
    <>
      <SiteHeader current="remix" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Week 9 · Agents and systems</p>
          <h1>Remix</h1>
          <p className="hero-deck">
            A context repository goes in. A Conductor proposes who reads what, an Archivist maps the files, a Researcher looks things up, a Briefer writes the host's briefing. You decide what the ensemble may read, approve or change the plan, and can edit any card before it's passed on. Everything each role is told is on this page, and the whole run comes out as a trace you can print and mark up.
          </p>
          <p className="machine-more">
            This is your copy of <a href="/ensemble">the ensemble</a>, in <code>nextjs/app/ensemble/remix/</code>. Change anything: the roles, what each is told, what it reads, what comes out. Changing it never touches the original.
          </p>
        </header>
        <Ensemble />
      </main>
      <SiteFooter />
    </>
  );
}
