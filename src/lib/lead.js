// Contact form submission. Uses VITE_LEAD_ENDPOINT when configured; otherwise opens a pre-filled email.
import { business } from "../data/business.js";

export const LEAD_ENDPOINT = (import.meta.env?.VITE_LEAD_ENDPOINT || "").trim();

export function validate(v) {
  const e = {};
  if (!v.name?.trim() || v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email || "")) e.email = "Please enter a valid email address.";
  if (!v.company?.trim()) e.company = "Please enter your organisation (or 'Individual').";
  if (!v.role) e.role = "Please choose your role.";
  if (!v.size) e.size = "Please choose a number of candidates.";
  if (!v.useCase) e.useCase = "Please choose a primary use case.";
  if ((v.message || "").length > 1000) e.message = "Please keep your message under 1,000 characters.";
  if (!v.consent) e.consent = "Please agree so we can reply to you.";
  return e;
}

export function mailtoFor(v) {
  const body = [`Name: ${v.name}`, `Email: ${v.email}`, `Organisation: ${v.company}`, `Role: ${v.role}`, `Candidates: ${v.size}`, `Use case: ${v.useCase}`, v.plan ? `Plan: ${v.plan}` : "", "", v.message || ""].filter((l) => l !== null).join("\n");
  return `mailto:${business.email}?subject=${encodeURIComponent(`Early access request — ${v.company}`)}&body=${encodeURIComponent(body)}`;
}

export async function submitLead(v) {
  if (v.website) return { ok: true, spam: true }; // honeypot filled: drop silently
  if (!LEAD_ENDPOINT) { window.location.href = mailtoFor(v); return { ok: true, mode: "mailto" }; }
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(LEAD_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, source: "afograde.com/contact" }), signal: ctrl.signal });
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    return { ok: true, mode: "endpoint" };
  } catch (err) {
    return { ok: false, error: err.name === "AbortError" ? "The request timed out." : err.message };
  } finally { clearTimeout(t); }
}
