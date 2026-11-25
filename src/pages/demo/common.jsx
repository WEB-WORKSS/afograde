import { BAND_LABEL } from "../../lib/scoring.js";
export const bandClass = { "on-track": "bg-ok-soft text-ok", close: "bg-gold-soft text-gold-ink", attention: "bg-bad-soft text-bad", unavailable: "bg-paper-2 text-faint" };
export const Band = ({ band }) => <span className={`chip whitespace-nowrap ${bandClass[band]}`}>{BAND_LABEL[band]}</span>;
export const DemoTag = () => <span className="chip bg-gold-soft text-gold-ink">Demo · Sample data</span>;
export function PageTitle({ title, sub, children }) {
  return (<div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><DemoTag /><h1 className="mt-2 font-display text-3xl font-semibold">{title}</h1>{sub && <p className="mt-1 text-sm text-muted">{sub}</p>}</div>{children}</div>);
}
export const pct = (x) => (x == null ? "—" : `${Math.round(x * 100)}%`);
export const fmtDate = (d) => (d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "No mocks yet");
