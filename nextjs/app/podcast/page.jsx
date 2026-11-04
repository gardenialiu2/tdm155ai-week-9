import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import Podcast from "./Podcast.jsx";

export const metadata = {
  title: "Podcast prep",
  description: "Four agents prepare the host: Piper takes everything in, Quinn proposes questions, Kit offers kind jokes, Bea writes the briefing.",
};

export default function PodcastPage() {
  return (
    <>
      <SiteHeader current="podcast" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Week 9 · Agents, systems, orchestration</p>
          <h1>Podcast prep</h1>
          <p className="hero-deck">
            Four agents get the host ready for next week's interview. Add the guest's material as it comes; each piece is saved, read, and worked on as it arrives. When you're done adding, the producer writes the briefing.
          </p>
          <p className="machine-more">
            How it works: <a href="/docs/podcast-prep">the docs</a>. The same four agents run in Slack as the Producer bot. The October 30 version, a fixed pipeline you approve step by step, is still at <a href="/ensemble">Ensemble</a>.
          </p>
        </header>
        <Podcast />
      </main>
      <SiteFooter />
    </>
  );
}
