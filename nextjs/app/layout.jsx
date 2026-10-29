import "@fontsource-variable/inter";
import "./globals.css";

export const metadata = {
  title: { default: "Agents and systems · TDM 155AI week 9", template: "%s · TDM 155AI week 9" },
  description: "TDM 155AI week 9: Agents and systems. An ensemble of agents that reads a context repository and briefs a podcast host, a copy to remix, and the paper version of the same system.",
};

export const viewport = {
  colorScheme: "dark",
  themeColor: "#121412",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
