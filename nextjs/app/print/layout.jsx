// Print pages: black ink on white, no chrome, tuned for Letter paper.
export const metadata = { title: { default: "Print · TDM 155AI week 9", template: "%s · Print · TDM 155AI week 9" } };

export default function PrintLayout({ children }) {
  return <div className="print-root">{children}</div>;
}
