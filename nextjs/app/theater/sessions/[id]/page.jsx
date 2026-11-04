import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../components/Chrome.jsx";
import { readRun } from "../../../../lib/theater/systems.mjs";
import Dashboard from "../../Dashboard.jsx";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: decodeURIComponent(id).replace("~", " · ") };
}

export default async function SessionPage({ params }) {
  const { id } = await params;
  let events;
  try {
    events = await readRun(decodeURIComponent(id));
  } catch {
    notFound();
  }
  return (
    <>
      <SiteHeader current="sessions" />
      <main id="main" className="machine-shell">
        <p className="eyebrow"><a href="/systems/sessions">Sessions</a> · <a href={`/systems?system=${encodeURIComponent(decodeURIComponent(id).split("~")[0])}`}>run this system again</a></p>
        <Dashboard events={events} />
      </main>
      <SiteFooter />
    </>
  );
}
