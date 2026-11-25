import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo.jsx";
import { business } from "../../data/business.js";
import { segments } from "../../data/content.js";

const COLS = [
  ["Product", [["/product", "Platform overview"], ["/how-it-works", "How it works"], ["/demo", "Live demo"], ["/pricing", "Pricing"], ["/technology", "Technology & AWS"], ["/security", "Security"]]],
  ["Solutions", segments.map((s) => [`/solutions#${s.id}`, s.name])],
  ["Company", [["/about", "About"], ["/about#team", "Team"], ["/about#roadmap", "Roadmap"], ["/contact", "Contact"]]],
  ["Legal", [["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"]]],
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{business.oneLiner}</p>
          <p className="mt-5 text-sm"><a className="font-semibold text-gold hover:underline" href={`mailto:${business.email}`}>{business.email}</a></p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/75"><span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />{business.status}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLS.map(([h, links]) => (
            <div key={h}>
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/55">{h}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {links.map(([to, l]) => <li key={to}><Link to={to} className="text-white/80 hover:text-white">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {business.foundingYear} {business.name} · {business.domain}</p>
          <p>Afograde is independent and not affiliated with JAMB. <a className="underline hover:text-white" href={business.linkedin} rel="noopener" target="_blank">LinkedIn</a></p>
        </div>
      </div>
    </footer>
  );
}
