import { SiteFooter, SiteHeader } from "../../components/Chrome.jsx";
import View from "./View.jsx";

export const metadata = { title: "View a log", description: "Drop any Theater log (.jsonl) here for its dashboard." };

export default function ViewPage() {
  return (
    <>
      <SiteHeader current="theater" />
      <main id="main" className="machine-shell">
        <header className="machine-heading">
          <p className="eyebrow">Systems (theaters of agents)</p>
          <h1>View a log</h1>
          <p className="machine-more">Drop a <code>.jsonl</code> log from anyone's run (a classmate's, or one you edited by hand) to see its dashboard. It's read in this browser; nothing is sent anywhere.</p>
        </header>
        <View />
      </main>
      <SiteFooter />
    </>
  );
}
