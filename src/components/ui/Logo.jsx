import { Link } from "react-router-dom";

/** Afograde mark: three answer bubbles climbing toward a filled one — progress, mock by mock. */
export function Mark({ className = "size-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#2C2A8F" />
      <circle cx="9" cy="22.5" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="23" cy="9.5" r="3.9" fill="#E9A516" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Afograde home">
      <Mark />
      <span className={`font-display text-[1.45rem] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>afograde</span>
    </Link>
  );
}
