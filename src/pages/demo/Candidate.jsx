import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Flag, Lock, Trash2, Save, AlertCircle, PencilLine } from "lucide-react";
import { useDemo } from "../../lib/demoStore.jsx";
import { summarise, studyPlan } from "../../lib/scoring.js";
import { Gauge } from "../../components/sections/Visuals.jsx";
import { Band, PageTitle, pct, fmtDate } from "./common.jsx";

function Locked({ children = "Mentor only in this role" }) { return <span className="inline-flex items-center gap-1 text-xs text-faint"><Lock className="size-3" aria-hidden="true" />{children}</span>; }

export default function Candidate() {
  const { id } = useParams();
  const d = useDemo();
  const c = d.candidates.find((x) => x.id === id);
  const [open, setOpen] = useState(null);
  const [scSubj, setScSubj] = useState("");
  const [scTopic, setScTopic] = useState("");
  const [scAcc, setScAcc] = useState(70);
  const [note, setNote] = useState("");
  const [scName, setScName] = useState("");

  const target = c ? d.targetFor(c) : 0;
  const hours = c ? d.hoursFor(c) : 0;
  const s = useMemo(() => c && summarise(c, d.attempts, { target }), [c, d.attempts, target]);
  const plan = useMemo(() => s && studyPlan(s, hours), [s, hours]);
  const overrides = scSubj && scTopic ? { [scSubj]: { [scTopic]: scAcc / 100 } } : {};
  const scenario = useMemo(() => c && scSubj && scTopic ? summarise(c, d.attempts, { target, overrides }) : null, [c, d.attempts, target, scSubj, scTopic, scAcc]);

  if (!c) return <div className="card p-10 text-center"><AlertCircle className="mx-auto size-6 text-bad" /><p className="mt-2 font-semibold">No sample candidate with ID {id}.</p><Link to="/demo" className="btn btn-primary btn-sm mt-4">Back to cohort</Link></div>;
  if (!d.can.seeAll && c.id !== d.state.self) return <Navigate to={`/demo/candidates/${d.state.self}`} replace />;

  const subjOk = s.subjects.find((x) => x.subject === scSubj);
  const notes = d.state.notes[c.id] || [];
  const scenarios = d.state.scenarios[c.id] || [];
  const own = d.attempts.filter((a) => a.candidateId === c.id).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      {d.can.seeAll && <Link to="/demo" className="mb-3 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><ArrowLeft className="size-4" />Cohort</Link>}
      <PageTitle title={c.name} sub={`${c.id} · ${c.course} · ${s.attemptCount} subject attempts recorded · last mock ${fmtDate(s.lastActivity)}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Band band={s.band} />
          {d.can.editNotes && <button className={`btn btn-sm ${d.state.followUp[c.id] ? "bg-bad-soft text-bad" : "btn-line"}`} onClick={() => d.toggleFollowUp(c.id)} aria-pressed={!!d.state.followUp[c.id]}><Flag className="size-3.5" />{d.state.followUp[c.id] ? "Flagged for follow-up" : "Flag for follow-up"}</button>}
          {d.can.takeMock && <Link to={`/demo/mock?c=${c.id}`} className="btn btn-primary btn-sm"><PencilLine className="size-3.5" />Take a mock</Link>}
        </div>
      </PageTitle>
      {c.note && <p className="mb-4 rounded-xl bg-paper-2 px-4 py-2.5 text-sm text-muted">Sample-data note: {c.note}.</p>}

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <section className="card p-5" aria-labelledby="proj-h">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="proj-h" className="font-display text-xl font-semibold">Projected UTME aggregate</h2>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="target">Target</label>
                <input id="target" type="number" min={180} max={400} step={5} value={target} disabled={!d.can.editPlan} onChange={(e) => { const v = Math.max(0, Math.min(400, Number(e.target.value) || 0)); d.setTarget(c.id, v); }} className="input !w-24 !py-1.5" />
                {!d.can.editPlan && <Locked />}
              </div>
            </div>
            <div className="mt-4 grid items-center gap-6 md:grid-cols-[auto_1fr]">
              <div className="text-center"><Gauge value={s.aggregate} target={target} size={190} />{s.gap != null && <p className="text-sm text-muted">{s.gap > 0 ? `${s.gap} marks below target` : `${-s.gap} marks above target`}</p>}</div>
              {s.aggregate == null && <p className="flex gap-2 rounded-xl bg-paper-2 p-4 text-sm"><AlertCircle className="mt-0.5 size-4 shrink-0 text-gold-ink" aria-hidden="true" /><span><strong>Aggregate unavailable.</strong> {s.unavailableReason} We don't guess missing scores.</span></p>}
              {s.aggregate != null && <p className="text-sm text-muted">Sum of four subject projections. Each subject = Σ (recency-weighted topic accuracy × sample topic weight) × 100.</p>}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {s.subjects.map((x) => (
                <div key={x.subject} className="rounded-xl border border-line">
                  <button className="flex w-full items-center justify-between gap-2 p-4 text-left" aria-expanded={open === x.subject} onClick={() => setOpen(open === x.subject ? null : x.subject)}>
                    <span><span className="block text-sm font-semibold">{x.name}</span><span className="text-xs text-faint">{x.status === "ok" ? `${pct(x.coverage)} of weighting tested` : "unavailable"}</span></span>
                    <span className="font-display text-2xl font-semibold">{x.status === "ok" ? x.score : "—"}<span className="text-sm text-faint">/100</span></span>
                  </button>
                  {x.status !== "ok" && <p className="border-t border-line px-4 py-2.5 text-xs text-muted">{x.reason}</p>}
                  {open === x.subject && (
                    <table className="w-full border-t border-line text-xs"><thead><tr><th className="th">Topic</th><th className="th text-right">Weight</th><th className="th text-right">Accuracy</th><th className="th text-right">Correct</th></tr></thead>
                      <tbody>{x.topics.map((t) => <tr key={t.key}><td className="td !py-2">{t.label}{t.estimated && <span className="ml-1 text-gold-ink">(estimated)</span>}</td><td className="td !py-2 text-right font-mono">{pct(t.weight)}</td><td className="td !py-2 text-right font-mono">{t.tested ? pct(t.acc) : "unavailable"}</td><td className="td !py-2 text-right font-mono">{t.tested ? `${t.correct}/${t.total}` : "not tested"}</td></tr>)}</tbody></table>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="card p-5" aria-labelledby="plan-h">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 id="plan-h" className="font-display text-xl font-semibold">This week's study plan</h2>
              <div className="flex items-center gap-3 text-sm">
                <label htmlFor="hours">Hours per week</label>
                <input id="hours" type="range" min={2} max={30} step={1} value={hours} disabled={!d.can.editPlan} onChange={(e) => d.setHours(c.id, Number(e.target.value))} className="accent-indigo" />
                <span className="w-10 font-mono">{hours} h</span>
                {!d.can.editPlan && <Locked />}
              </div>
            </div>
            {plan.items.length === 0 ? <p className="mt-4 rounded-xl bg-paper-2 p-4 text-sm text-muted">No plan yet — there are no scored topics. Start with a mock in each subject.</p> : (
              <ul className="mt-4 divide-y divide-line">
                {plan.items.map((i) => (
                  <li key={i.subject + i.key} className="flex items-start justify-between gap-4 py-3">
                    <div><p className="text-sm font-semibold">{i.topic} <span className="font-normal text-faint">· {i.subjectName}</span></p><p className="text-xs text-muted">{i.reason}{i.atStake != null && ` About ${i.atStake} marks at stake.`}</p></div>
                    <span className={`chip shrink-0 ${i.kind === "diagnostic" ? "bg-gold-soft text-gold-ink" : "bg-indigo-soft text-indigo"}`}>{i.kind === "diagnostic" ? "Diagnostic · " : ""}{i.hours} h</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-faint">{plan.allocated} of {plan.requested} hours allocated (rounded to half-hours). In production a mentor approves the plan before the candidate sees it.</p>
          </section>

          <section className="card p-5" aria-labelledby="sc-h">
            <h2 id="sc-h" className="font-display text-xl font-semibold">What-if scenario</h2>
            <p className="mt-1 text-sm text-muted">If this candidate raised one topic to a new accuracy, what would the projection be?</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <label className="text-sm"><span className="label">Subject</span><select className="input" value={scSubj} onChange={(e) => { setScSubj(e.target.value); setScTopic(""); }}><option value="">Choose…</option>{s.subjects.map((x) => <option key={x.subject} value={x.subject}>{x.name}</option>)}</select></label>
              <label className="text-sm"><span className="label">Topic</span><select className="input" value={scTopic} disabled={!scSubj} onChange={(e) => setScTopic(e.target.value)}><option value="">Choose…</option>{subjOk?.topics.map((t) => <option key={t.key} value={t.key}>{t.label} ({t.tested ? pct(t.acc) : "untested"})</option>)}</select></label>
              <label className="text-sm"><span className="label">New accuracy: {scAcc}%</span><input type="range" min={0} max={100} value={scAcc} onChange={(e) => setScAcc(Number(e.target.value))} className="mt-3 w-full accent-indigo" /></label>
            </div>
            {scenario && (
              <div className="mt-4 rounded-xl bg-indigo-soft/60 p-4 text-sm">
                {scenario.aggregate != null ? <p>Projected aggregate would be <strong className="font-mono">{scenario.aggregate}</strong>{s.aggregate != null && <> ({scenario.aggregate - s.aggregate >= 0 ? "+" : ""}{scenario.aggregate - s.aggregate} vs now)</>}. {scenario.gap > 0 ? `Still ${scenario.gap} below target.` : "Target reached."}</p>
                  : <p>Projection still unavailable: {scenario.unavailableReason}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  <label className="sr-only" htmlFor="scname">Scenario name</label>
                  <input id="scname" className="input !w-56 !py-1.5" placeholder="Name this scenario" value={scName} onChange={(e) => setScName(e.target.value)} />
                  <button className="btn btn-primary btn-sm" onClick={() => { d.saveScenario(c.id, { name: scName.trim() || `${subjOk.topics.find((t) => t.key === scTopic).label} → ${scAcc}%`, subject: scSubj, topic: scTopic, acc: scAcc, result: scenario.aggregate, base: s.aggregate, at: new Date().toISOString() }); setScName(""); }}><Save className="size-3.5" />Save scenario</button>
                </div>
              </div>
            )}
            {scenarios.length > 0 && (
              <div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead><tr><th className="th">Saved scenario</th><th className="th text-right">Then</th><th className="th text-right">Scenario</th><th className="th text-right">Change</th><th className="th"><span className="sr-only">Delete</span></th></tr></thead>
                <tbody>{scenarios.map((x, i) => <tr key={x.at}><td className="td">{x.name}</td><td className="td text-right font-mono">{x.base ?? "—"}</td><td className="td text-right font-mono">{x.result ?? "unavailable"}</td><td className="td text-right font-mono">{x.result != null && x.base != null ? `${x.result - x.base >= 0 ? "+" : ""}${x.result - x.base}` : "—"}</td><td className="td text-right"><button className="text-faint hover:text-bad" onClick={() => d.deleteScenario(c.id, i)} aria-label={`Delete scenario ${x.name}`}><Trash2 className="size-4" /></button></td></tr>)}</tbody></table></div>
            )}
          </section>
        </div>

        <div className="space-y-5">
          <section className="card p-5" aria-labelledby="notes-h">
            <h2 id="notes-h" className="font-display text-lg font-semibold">Mentor notes</h2>
            {notes.length === 0 && <p className="mt-2 text-sm text-faint">No notes yet.</p>}
            <ul className="mt-3 space-y-2">{notes.map((n, i) => <li key={n.at} className="rounded-xl bg-paper p-3 text-sm"><p>{n.text}</p><p className="mt-1 flex justify-between text-[0.7rem] text-faint"><span>{n.by} · {new Date(n.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>{d.can.editNotes && <button onClick={() => d.deleteNote(c.id, i)} className="hover:text-bad" aria-label="Delete note"><Trash2 className="size-3.5" /></button>}</p></li>)}</ul>
            {d.can.editNotes ? (
              <form className="mt-3" onSubmit={(e) => { e.preventDefault(); if (note.trim()) { d.addNote(c.id, note.trim()); setNote(""); } }}>
                <label htmlFor="note" className="sr-only">New note</label>
                <textarea id="note" rows={3} maxLength={400} className="input" placeholder="e.g. Agreed to focus on Electricity this week" value={note} onChange={(e) => setNote(e.target.value)} />
                <button className="btn btn-primary btn-sm mt-2" disabled={!note.trim()}>Add note</button>
              </form>
            ) : <p className="mt-3"><Locked /></p>}
          </section>
          <section className="card p-5" aria-labelledby="hist-h">
            <h2 id="hist-h" className="font-display text-lg font-semibold">Recorded attempts</h2>
            {own.length === 0 ? <p className="mt-2 text-sm text-faint">No mocks recorded yet.</p> : (
              <ul className="mt-3 max-h-80 space-y-1.5 overflow-auto pr-1 text-xs">{own.map((a) => { const [cr, tt] = Object.values(a.results).reduce((m, r) => [m[0] + r[0], m[1] + r[1]], [0, 0]); return <li key={a.id} className="flex justify-between rounded-lg bg-paper px-3 py-2"><span><span className="font-mono text-faint">{a.id}</span> · {a.subject}{a.source === "visitor" && <span className="ml-1 text-indigo">(you)</span>}</span><span className="font-mono">{cr}/{tt} · {fmtDate(a.date)}</span></li>; })}</ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
