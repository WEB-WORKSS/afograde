import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, PlayCircle } from "lucide-react";
import { Logo } from "../ui/Logo.jsx";

export const NAV = [
  ["/product", "Product"], ["/how-it-works", "How it works"], ["/solutions", "Solutions"], ["/technology", "Technology"],
  ["/security", "Security"], ["/pricing", "Pricing"], ["/about", "Team"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const link = ({ isActive }) => `whitespace-nowrap rounded-full px-2.5 py-2 text-[0.86rem] font-semibold transition ${isActive ? "text-indigo" : "text-muted hover:text-ink"}`;
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center lg:flex">
          {NAV.map(([to, l]) => <NavLink key={to} to={to} className={link}>{l}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/demo" className="btn btn-ghost btn-sm text-indigo"><PlayCircle className="size-4" aria-hidden="true" />Live demo</Link>
          <Link to="/contact" className="btn btn-primary btn-sm">Request early access</Link>
        </div>
        <button className="btn btn-ghost btn-sm lg:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}<span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <div className="wrap flex flex-col py-3">
            {NAV.map(([to, l]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-3 py-3 font-semibold ${isActive ? "bg-indigo-soft text-indigo" : "text-ink"}`}>{l}</NavLink>)}
            <NavLink to="/contact" className="rounded-xl px-3 py-3 font-semibold text-ink">Contact</NavLink>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/demo" className="btn btn-line">Live demo</Link>
              <Link to="/contact" className="btn btn-primary">Early access</Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
