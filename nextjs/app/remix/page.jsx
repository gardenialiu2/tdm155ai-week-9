import { SiteFooter, SiteHeader } from "../components/Chrome.jsx";
import Podcast from "./Podcast.jsx";

export const metadata = {
  title: "Remix",
  description: "Four agents prepare the host: the Collector takes everything in, the Interviewer proposes questions, the Sidekick offers kind jokes, the Producer writes the briefing.",
};

export default function PodcastPage() {
  return (
    <>
      <SiteHeader current="remix" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Week 9 · Agents, systems, orchestration</p>
          <h1>Your podcast prep</h1>
          <p className="hero-deck">
            Four agents get the host ready for next week's interview. Add the guest's material as it comes; each piece is saved, read, and worked on as it arrives. When you're done adding, the producer writes the briefing.
          </p>
          <p className="machine-more">
            This is your copy of <a href="/podcast">podcast prep</a>, all in <code>nextjs/app/remix/</code>: the page, the agents' instructions (<code>lib/prompts.mjs</code>), how the Collector reads things (<code>lib/read.mjs</code>), who waits for whom (<code>lib/jobs.mjs</code>), and the avatars. Change anything; it never touches the original. Its sessions are saved apart, in <code>output/podcast-remix/</code>.
          </p>
        </header>
        <Podcast />
      </main>
      <SiteFooter />
    </>
  );
}
