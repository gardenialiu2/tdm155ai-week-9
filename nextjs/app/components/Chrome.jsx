import Link from "next/link";
import { site } from "../../lib/content.mjs";

// `current` marks the section you're on: "docs", "theater", "runs", "research", "glossary", "podcast", "remix", or nothing.
const sections = [
  ["docs", "/docs", "Docs"],
  ["theater", "/theater", "Theater"],
  ["runs", "/theater/runs", "Runs"],
  ["research", "/ai-research", "Research"],
  ["glossary", "/ai-research/glossary", "Glossary"],
  ["podcast", "/podcast", "Podcast prep"],
  ["remix", "/remix", "Remix"],
];

export function SiteHeader({ current = "" }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/">
        {site.title} <span>{site.label}</span>
      </Link>
      <nav aria-label="Main navigation">
        {sections.map(([key, href, label]) => <Link key={key} href={href} aria-current={current === key ? "page" : undefined}>{label}</Link>)}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/">{site.title}</Link>
      <span>{site.term}</span>
    </footer>
  );
}
