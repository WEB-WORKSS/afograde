import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, CheckCircle2, AlertTriangle } from "lucide-react";
import { Page } from "../components/layout/Page.jsx";
import { PageHero, Section, Spinner } from "../components/ui/primitives.jsx";
import { business } from "../data/business.js";
import { pricing } from "../data/content.js";
import { validate, submitLead, LEAD_ENDPOINT, mailtoFor } from "../lib/lead.js";

const ROLES = ["UTME candidate", "Parent or guardian", "Mentor or private tutor", "Tutorial / CBT centre", "School teacher or administrator", "Other"];
const SIZES = ["1 candidate", "2–10", "11–50", "51–200", "200+"];
const USES = ["Mock exams and scoring", "Study plans and mentoring", "Running a centre or class", "Pilot partnership", "Pricing question", "Other"];
const PLANS = [...pricing.map((p) => [p.id, p.name]), ["cohort", "Cohort (centre or school)"]];
const INIT = { name: "", email: "", company: "", role: "", size: "", useCase: "", plan: "", message: "", consent: false, website: "" };

export default function Contact() {
  const [params] = useSearchParams();
  const [v, setV] = useState(INIT);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({ status: "idle" });
  useEffect(() => { const p = params.get("plan"); if (p && PLANS.some(([id]) => id === p)) setV((s) => ({ ...s, plan: p })); }, [params]);

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const err = (k) => errors[k] && <p id={`${k}-err`} className="mt-1 text-xs font-semibold text-bad">{errors[k]}</p>;
  const aria = (k) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) { document.getElementById(Object.keys(found)[0])?.focus(); return; }
    setState({ status: "sending" });
    const r = await submitLead(v);
    setState(r.ok ? { status: "sent", mode: r.mode } : { status: "error", error: r.error });
    if (r.ok && r.mode === "endpoint") setV(INIT);
  }

  return (
    <Page>
      <PageHero eyebrow="Contact" title="Request early access." lede="Tell us about your candidates. A founder reads every request." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <form onSubmit={onSubmit} noValidate className="card grid gap-5 p-6 sm:grid-cols-2 sm:p-8" aria-describedby="form-note">
            <div><label className="label" htmlFor="name">Full name</label><input id="name" className="input" autoComplete="name" value={v.name} onChange={set("name")} {...aria("name")} />{err("name")}</div>
            <div><label className="label" htmlFor="email">Work email</label><input id="email" type="email" className="input" autoComplete="email" value={v.email} onChange={set("email")} {...aria("email")} />{err("email")}</div>
            <div><label className="label" htmlFor="company">Organisation</label><input id="company" className="input" autoComplete="organization" placeholder="Centre, school, or 'Individual'" value={v.company} onChange={set("company")} {...aria("company")} />{err("company")}</div>
            <div><label className="label" htmlFor="role">Role</label><select id="role" className="input" value={v.role} onChange={set("role")} {...aria("role")}><option value="">Choose…</option>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>{err("role")}</div>
            <div><label className="label" htmlFor="size">Number of candidates</label><select id="size" className="input" value={v.size} onChange={set("size")} {...aria("size")}><option value="">Choose…</option>{SIZES.map((r) => <option key={r}>{r}</option>)}</select>{err("size")}</div>
            <div><label className="label" htmlFor="useCase">Primary use case</label><select id="useCase" className="input" value={v.useCase} onChange={set("useCase")} {...aria("useCase")}><option value="">Choose…</option>{USES.map((r) => <option key={r}>{r}</option>)}</select>{err("useCase")}</div>
            <div className="sm:col-span-2"><label className="label" htmlFor="plan">Plan of interest <span className="font-normal text-faint">(optional)</span></label><select id="plan" className="input" value={v.plan} onChange={set("plan")}><option value="">Not sure yet</option>{PLANS.map(([id, n]) => <option key={id} value={id}>{n}</option>)}</select></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="message">Message <span className="font-normal text-faint">(optional)</span></label><textarea id="message" rows={5} maxLength={1000} className="input" value={v.message} onChange={set("message")} {...aria("message")} /><p className="mt-1 text-right text-xs text-faint" aria-live="polite">{v.message.length} / 1000</p>{err("message")}</div>
            <div className="hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} /></div>
            <div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm"><input id="consent" type="checkbox" className="mt-1 size-4 accent-indigo" checked={v.consent} onChange={set("consent")} {...aria("consent")} /><span>I agree that {business.name} may contact me about this request.</span></label>{err("consent")}</div>
            <div className="sm:col-span-2">
              <button className="btn btn-primary btn-lg w-full sm:w-auto" disabled={state.status === "sending"}>{state.status === "sending" ? <><Spinner /> Sending…</> : "Send request"}</button>
              <div aria-live="polite" className="mt-4">
                {state.status === "sent" && state.mode === "endpoint" && <p className="flex gap-2 rounded-xl bg-ok-soft p-4 text-sm font-semibold text-ok"><CheckCircle2 className="size-5 shrink-0" />Thanks — your request was sent. A founder will reply by email.</p>}
                {state.status === "sent" && state.mode === "mailto" && <p className="flex gap-2 rounded-xl bg-gold-soft p-4 text-sm text-gold-ink"><Mail className="size-5 shrink-0" />Your email app should now be open with your request filled in. Press send there to reach us. Nothing has been sent yet. If no window opened, email <a className="underline" href={mailtoFor(v)}>{business.email}</a>.</p>}
                {state.status === "error" && <p className="flex gap-2 rounded-xl bg-bad-soft p-4 text-sm text-bad"><AlertTriangle className="size-5 shrink-0" />Your request could not be sent ({state.error}). Please try again, or email <a className="font-semibold underline" href={mailtoFor(v)}>{business.email}</a>.</p>}
              </div>
              <p id="form-note" className="mt-3 text-xs text-faint">{LEAD_ENDPOINT ? "Your request is sent securely to our team." : `Your request opens as an email to ${business.email} in your email app.`} See our <a className="underline" href="/privacy">Privacy Policy</a>.</p>
            </div>
          </form>
          <aside className="space-y-8">
            <div><h2 className="font-display text-2xl font-semibold">Email us directly</h2><a href={`mailto:${business.email}`} className="mt-2 inline-flex items-center gap-2 font-semibold text-indigo hover:underline"><Mail className="size-4" />{business.email}</a></div>
            <div><h2 className="font-display text-2xl font-semibold">What happens next</h2>
              <ol className="mt-4 space-y-4 text-sm">{["A founder replies to arrange a short call.", "We look at how you prepare candidates today.", "If it's a fit, we invite you to the pilot for the 2027 UTME cohort."].map((t, i) => <li key={t} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-indigo font-mono text-xs text-white">{i + 1}</span><span className="pt-1">{t}</span></li>)}</ol></div>
            <p className="rounded-2xl bg-paper-2 p-5 text-sm text-muted">Status: {business.status}.</p>
          </aside>
        </div>
      </Section>
    </Page>
  );
}
