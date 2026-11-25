import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { FlaskConical, LayoutList, PencilLine, MessagesSquare, RotateCcw, Info, X, ArrowLeft, Menu } from "lucide-react";
import { DemoProvider, useDemo } from "../../lib/demoStore.jsx";
import { Mark } from "../../components/ui/Logo.jsx";
import { SkipLink } from "../../components/ui/primitives.jsx";
import { CENTRE } from "../../data/demo/candidates.js";
import Cohort from "./Cohort.jsx";
import Candidate from "./Candidate.jsx";
import Mock from "./Mock.jsx";
import Assistant from "./Assistant.jsx";

export function Banner() {
  return (
    <div className="bg-ink px-4 py-2 text-center text-[0.8rem] text-white" role="note">
      <FlaskConical className="mr-1.5 inline size-3.5 text-gold" aria-hidden="true" />
      <strong>Live demo · Sample data · Runs in your browser — nothing is sent to a server.</strong>{" "}
      <Link to="/contact?plan=pilot" className="ml-1 font-semibold text-gold underline">Request a pilot on real data</Link>
    </div>
  );
}

function Onboarding() {
  const { state, finishOnboarding } = useDemo();
  if (state.onboarded) return null;
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-2xl border border-line bg-white p-5 shadow-2xl sm:left-auto sm:right-6" role="dialog" aria-labelledby="ob-title">
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 size-5 shrink-0 text-indigo" aria-hidden="true" />
        <div className="text-sm">
          <p id="ob-title" className="font-semibold">Welcome to the Afograde demo</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-muted">
            <li>Open a candidate from the cohort to see topic scores, the projection and the weekly plan.</li>
            <li>Change the target, weekly hours or a what-if topic score — figures recalculate instantly.</li>
            <li>Take a short mock exam and record it; the candidate's projection updates.</li>
          </ol>
          <p className="mt-2 text-xs text-faint">All candidates are fictional. Your changes are stored only in this browser.</p>
          <button className="btn btn-primary btn-sm mt-3" onClick={finishOnboarding}>Got it</button>
        </div>
        <button className="btn btn-ghost btn-sm !p-1" onClick={finishOnboarding} aria-label="Close welcome"><X className="size-4" /></button>
      </div>
    </div>
  );
}

function Sidebar({ onNav }) {
  const { role, setRole, reset, candidates, state, setSelf } = useDemo();
  const [confirm, setConfirm] = useState(false);
  const link = ({ isActive }) => `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? "bg-indigo text-white" : "text-muted hover:bg-paper-2 hover:text-ink"}`;
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/" className="flex items-center gap-2" onClick={onNav}><Mark className="size-7" /><span className="font-display text-lg font-semibold">afograde</span><span className="chip bg-gold-soft text-gold-ink">Demo</span></Link>
      <div className="rounded-xl bg-paper-2 p-3 text-xs"><p className="font-semibold">{CENTRE.name}</p><p className="text-faint">{CENTRE.id}</p></div>
      <nav aria-label="Demo" className="space-y-1" onClick={onNav}>
        <NavLink end to="/demo" className={link}><LayoutList className="size-4" aria-hidden="true" />Cohort</NavLink>
        <NavLink to="/demo/mock" className={link}><PencilLine className="size-4" aria-hidden="true" />Mock exam</NavLink>
        <NavLink to="/demo/assistant" className={link}><MessagesSquare className="size-4" aria-hidden="true" />Assistant</NavLink>
      </nav>
      <div>
        <label htmlFor="role" className="label !text-xs">View as</label>
        <select id="role" className="input !py-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="mentor">Mentor</option><option value="candidate">Candidate</option><option value="parent">Parent (view only)</option>
        </select>
        {role !== "mentor" && (<><label htmlFor="self" className="label mt-3 !text-xs">Signed-in candidate (simulated)</label>
          <select id="self" className="input !py-2" value={state.self} onChange={(e) => setSelf(e.target.value)}>{candidates.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></>)}
        <p className="mt-2 text-[0.72rem] leading-snug text-faint">Roles are simulated in the demo; production enforces them on the server.</p>
      </div>
      <div className="mt-auto space-y-2 text-xs">
        <p className="text-faint">Your changes are stored only in this browser.</p>
        {confirm ? (
          <div className="flex gap-2"><button className="btn btn-sm bg-bad text-white" onClick={() => { reset(); setConfirm(false); }}>Confirm reset</button><button className="btn btn-ghost btn-sm" onClick={() => setConfirm(false)}>Cancel</button></div>
        ) : <button className="btn btn-line btn-sm w-full" onClick={() => setConfirm(true)}><RotateCcw className="size-3.5" aria-hidden="true" />Reset demo data</button>}
        <Link to="/" className="flex items-center gap-1 pt-2 text-muted hover:text-ink"><ArrowLeft className="size-3.5" aria-hidden="true" />Back to afograde.com</Link>
      </div>
    </div>
  );
}

function DemoNotFound() {
  return <div className="p-10 text-center"><h1 className="font-display text-2xl font-semibold">Demo page not found</h1><Link to="/demo" className="btn btn-primary mt-4">Back to cohort</Link></div>;
}

function Shell() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="min-h-screen bg-paper">
      <SkipLink />
      <Banner />
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-2 lg:hidden">
        <Link to="/demo" className="flex items-center gap-2"><Mark className="size-6" /><span className="font-display font-semibold">afograde demo</span></Link>
        <button className="btn btn-ghost btn-sm" aria-expanded={open} aria-controls="demo-side" onClick={() => setOpen((o) => !o)}><Menu className="size-5" /><span className="sr-only">Demo menu</span></button>
      </div>
      <div className="lg:grid lg:grid-cols-[250px_1fr]">
        <aside id="demo-side" className={`${open ? "block" : "hidden"} border-b border-line bg-white lg:sticky lg:top-0 lg:block lg:h-[calc(100vh-36px)] lg:border-b-0 lg:border-r`}><Sidebar onNav={() => setOpen(false)} /></aside>
        <main id="main" className="min-w-0 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<Cohort />} />
            <Route path="candidates/:id" element={<Candidate />} />
            <Route path="mock" element={<Mock />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="*" element={<DemoNotFound />} />
          </Routes>
        </main>
      </div>
      <Onboarding />
    </div>
  );
}

export default function DemoApp() { return <DemoProvider><Shell /></DemoProvider>; }
