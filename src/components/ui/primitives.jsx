import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Loader2, Circle, MonitorCheck, ListChecks, Gauge, CalendarRange, UsersRound, MessagesSquare, FileText, GraduationCap, Building2, School, HeartHandshake } from "lucide-react";
const ICONS = { MonitorCheck, ListChecks, Gauge, CalendarRange, UsersRound, MessagesSquare, FileText, GraduationCap, Building2, School, HeartHandshake };

export const SkipLink = () => <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-indigo focus:px-4 focus:py-2 focus:text-white">Skip to content</a>;

export function Icon({ name, className = "size-5" }) {
  const C = ICONS[name] || Circle;
  return <C className={className} aria-hidden="true" />;
}

export function Section({ id, className = "", children, tone }) {
  const bg = tone === "paper2" ? "bg-paper-2" : tone === "ink" ? "bg-ink text-white" : tone === "white" ? "bg-white" : "";
  return <section id={id} className={`py-20 sm:py-24 ${bg} ${className}`}><div className="wrap">{children}</div></section>;
}

export function Heading({ eyebrow, title, lede, center, as: H = "h2", light }) {
  return (
    <div className={`reveal ${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-gold" : ""}`}>{eyebrow}</p>}
      <H className={`h2 mt-3 ${light ? "text-white" : ""}`}>{title}</H>
      {lede && <p className={`lede ${center ? "mx-auto" : ""} ${light ? "text-white/75" : ""}`}>{lede}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, lede, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-2">
      <div className="dots absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="wrap relative py-16 sm:py-20">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="h1 mt-4 max-w-4xl rise">{title}</h1>
        {lede && <p className="lede rise text-lg">{lede}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3 rise">{children}</div>}
      </div>
    </section>
  );
}

export const CTA = {
  Access: ({ className = "", label = "Request early access", plan }) => <Link to={plan ? `/contact?plan=${plan}` : "/contact"} className={`btn btn-primary ${className}`}>{label}<ArrowRight className="size-4" aria-hidden="true" /></Link>,
  Demo: ({ className = "", label = "Explore the live demo" }) => <Link to="/demo" className={`btn btn-line ${className}`}><PlayCircle className="size-4" aria-hidden="true" />{label}</Link>,
};

export function StatusPill({ children, className = "" }) {
  return <span className={`inline-flex items-center gap-2 rounded-full border border-indigo/20 bg-white px-3 py-1 text-[0.78rem] font-semibold text-indigo ${className}`}><span className="size-2 rounded-full bg-gold" aria-hidden="true" />{children}</span>;
}

export const SampleTag = ({ children = "Demo data", className = "" }) => <span className={`chip bg-gold-soft text-gold-ink ${className}`}>{children}</span>;

export function Spinner({ className = "size-4" }) { return <Loader2 className={`spin ${className}`} aria-hidden="true" />; }
