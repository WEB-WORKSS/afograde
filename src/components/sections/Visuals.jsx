// Product-concept visuals. Figures are computed from the demo's sample dataset and labeled as demo data.
import { ATTEMPTS, CANDIDATES } from "../../data/demo/candidates.js";
import { summarise, studyPlan, BAND_LABEL } from "../../lib/scoring.js";
import { SampleTag, Icon } from "../ui/primitives.jsx";

const hero = CANDIDATES[0];
export const heroSummary = summarise(hero, ATTEMPTS);
const heroPlan = studyPlan(heroSummary, 10);

export function Gauge({ value, target = 360, size = 150 }) {
  const r = 58, c = Math.PI * r; // half circle
  const pct = value == null ? 0 : Math.min(1, value / 400);
  const tAng = Math.PI * (1 - target / 400);
  const tx = 75 + r * Math.cos(tAng), ty = 75 - r * Math.sin(tAng);
  return (
    <svg viewBox="0 0 150 88" width={size} role="img" aria-label={value == null ? "Projected aggregate unavailable" : `Projected aggregate ${value} of 400, target ${target}`}>
      <path d="M17 75 A58 58 0 0 1 133 75" fill="none" stroke="#ECE6D6" strokeWidth="12" strokeLinecap="round" />
      <path d="M17 75 A58 58 0 0 1 133 75" fill="none" stroke="#2C2A8F" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
      <circle cx={tx} cy={ty} r="5" fill="#E9A516" stroke="#fff" strokeWidth="2" />
      <text x="75" y="68" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="26" fill="#16142E">{value ?? "—"}</text>
      <text x="75" y="84" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="#6C6982">/ 400 · TARGET {target}</text>
    </svg>
  );
}

export function HeroVisual() {
  const s = heroSummary;
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-indigo/5" aria-hidden="true" />
      <div className="card overflow-hidden shadow-[0_30px_60px_-30px_rgba(22,20,46,.35)]">
        <div className="flex items-center justify-between border-b border-line bg-paper-2 px-4 py-2.5">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-faint">Mentor workspace · Candidate</span>
          <SampleTag>Demo data</SampleTag>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[0.7rem] text-faint">{hero.id}</p>
            <p className="font-display text-xl font-semibold">{hero.name}</p>
            <p className="text-sm text-muted">{hero.course} · target {s.target}</p>
            <ul className="mt-4 space-y-2.5">
              {s.subjects.map((x) => (
                <li key={x.subject}>
                  <div className="flex justify-between text-[0.8rem]"><span className="font-semibold">{x.name}</span><span className="font-mono">{x.score ?? "—"}/100</span></div>
                  <div className="mt-1 h-2 rounded-full bg-paper-2"><div className="h-2 rounded-full bg-indigo" style={{ width: `${x.score ?? 0}%` }} /></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-paper-2 p-4">
            <Gauge value={s.aggregate} target={s.target} />
            <span className={`chip mt-2 ${s.band === "on-track" ? "bg-ok-soft text-ok" : s.band === "close" ? "bg-gold-soft text-gold-ink" : "bg-bad-soft text-bad"}`}>{BAND_LABEL[s.band]}</span>
          </div>
        </div>
        <div className="border-t border-line px-5 py-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-faint">This week's plan · 10 h</p>
          <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
            {heroPlan.items.slice(0, 4).map((i) => <li key={i.key + i.subject} className="flex items-center justify-between rounded-lg bg-paper px-3 py-1.5"><span className="truncate">{i.topic}</span><span className="ml-2 font-mono text-xs text-indigo">{i.hours} h</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function FeatureVisual({ id }) {
  const s = heroSummary;
  if (id === "mocks") return (
    <div className="space-y-2">
      <div className="flex items-center justify-between font-mono text-xs"><span>Mathematics · Q12 of 40</span><span className="rounded bg-ink px-2 py-0.5 text-white">31:42</span></div>
      <p className="text-sm">Differentiate y = 5x³ with respect to x.</p>
      {["15x²", "5x²", "15x³", "x⁴"].map((o, i) => <div key={o} className="flex items-center gap-2 text-sm text-indigo"><span className={`bubble ${i === 0 ? "on" : ""}`} />{o}</div>)}
    </div>
  );
  if (id === "scoring") return (
    <ul className="space-y-2">{s.subjects[3].topics.map((t) => <li key={t.key} className="text-xs"><div className="flex justify-between"><span>{t.label}</span><span className="font-mono">{Math.round(t.accUsed * 100)}%</span></div><div className="mt-1 h-1.5 rounded-full bg-paper-2"><div className={`h-1.5 rounded-full ${t.accUsed < 0.5 ? "bg-gold" : "bg-indigo"}`} style={{ width: `${t.accUsed * 100}%` }} /></div></li>)}</ul>
  );
  if (id === "projection") return <div className="flex justify-center"><Gauge value={s.aggregate} target={s.target} size={170} /></div>;
  if (id === "plan") return (
    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[0.62rem]">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={i}><div className="text-faint">{d}</div><div className={`mt-1 h-12 rounded ${[0, 2, 3, 5].includes(i) ? "bg-indigo/80" : i === 6 ? "bg-paper-2" : "bg-gold/70"}`} /></div>)}</div>
  );
  if (id === "mentor") return (
    <table className="w-full text-xs"><tbody>{CANDIDATES.slice(0, 4).map((c, i) => <tr key={c.id} className="border-t border-line first:border-0"><td className="py-1.5 font-semibold">{c.name}</td><td className="font-mono text-faint">{c.id}</td><td className="text-right"><span className={`chip ${["bg-gold-soft text-gold-ink", "bg-ok-soft text-ok", "bg-ok-soft text-ok", "bg-paper-2 text-faint"][i]}`}>{["Close", "On track", "On track", "Unavailable"][i]}</span></td></tr>)}</tbody></table>
  );
  if (id === "explain") return (
    <div className="space-y-2 text-xs"><p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-indigo px-3 py-2 text-white">Why is my Physics score low?</p><p className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-paper-2 px-3 py-2">Electricity: 34% accuracy on 25% of the weighting. It is 3 h of this week's plan.</p></div>
  );
  return (
    <div className="space-y-2"><div className="flex items-center gap-2 text-xs font-semibold"><Icon name="FileText" className="size-4 text-indigo" />Weekly progress · week 7</div>{[90, 70, 80, 55].map((w, i) => <div key={i} className="h-2 rounded bg-paper-2" style={{ width: `${w}%` }} />)}</div>
  );
}
