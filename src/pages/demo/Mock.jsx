import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Lock, Timer } from "lucide-react";
import { useDemo } from "../../lib/demoStore.jsx";
import { QUESTIONS } from "../../data/demo/questions.js";
import { SUBJECTS } from "../../data/demo/subjects.js";
import { markMock, summarise } from "../../lib/scoring.js";
import { PageTitle } from "./common.jsx";

const today = () => new Date().toISOString().slice(0, 10);

export default function Mock() {
  const d = useDemo();
  const [params] = useSearchParams();
  const pool = d.visibleCandidates;
  const [cid, setCid] = useState(() => pool.find((c) => c.id === params.get("c"))?.id || pool[0]?.id);
  const cand = pool.find((c) => c.id === cid) || pool[0];
  const subjects = Object.keys(QUESTIONS).filter((s) => cand?.combo.includes(s));
  const [subj, setSubj] = useState(subjects[0]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(null);
  const [secs, setSecs] = useState(0);
  useEffect(() => { if (!subjects.includes(subj)) setSubj(subjects[0]); }, [cid]); // eslint-disable-line
  useEffect(() => { setAnswers({}); setResult(null); setSaved(null); setSecs(0); }, [cid, subj]);
  useEffect(() => { if (result) return; const t = setInterval(() => setSecs((s) => s + 1), 1000); return () => clearInterval(t); }, [result, cid, subj]);
  const qs = QUESTIONS[subj] || [];
  const before = useMemo(() => cand && summarise(cand, d.attempts, { target: d.targetFor(cand) }), [cand, d.attempts]);

  if (!d.can.takeMock) return <div><PageTitle title="Mock exam" /><div className="card flex items-center gap-2 p-8 text-sm text-muted"><Lock className="size-4" />Parents can view progress but cannot take mocks. Switch role in the sidebar.</div></div>;

  const submit = () => setResult(markMock(qs, answers));
  const record = () => {
    const id = `DEMO-V${Date.now().toString().slice(-6)}`;
    d.addAttempt({ id, candidateId: cand.id, subject: subj, date: today(), results: result.results, source: "visitor" });
    setSaved({ id, before: before.subjects.find((x) => x.subject === subj) });
  };
  const after = saved && summarise(cand, d.attempts, { target: d.targetFor(cand) }).subjects.find((x) => x.subject === subj);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0"), ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="max-w-3xl">
      <PageTitle title="Mock exam" sub="A short CBT-style practice set of original sample questions. Real mocks have 40–60 questions per subject." />
      <div className="card mb-5 grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="text-sm"><span className="label">Candidate</span><select className="input" value={cand?.id} onChange={(e) => setCid(e.target.value)} disabled={!d.can.seeAll}>{pool.map((c) => <option key={c.id} value={c.id}>{c.name} · {c.id}</option>)}</select></label>
        <label className="text-sm"><span className="label">Subject</span><select className="input" value={subj} onChange={(e) => setSubj(e.target.value)}>{subjects.map((s) => <option key={s} value={s}>{SUBJECTS[s].name}</option>)}</select></label>
        <p className="flex items-center gap-1.5 rounded-xl bg-ink px-3 py-2.5 font-mono text-sm text-white" aria-label={`Elapsed time ${mm}:${ss}`}><Timer className="size-4 text-gold" aria-hidden="true" />{mm}:{ss}</p>
      </div>
      <p className="mb-4 text-xs text-faint">The demo question bank covers Use of English and Mathematics only.</p>

      <ol className="space-y-4">
        {qs.map((q, i) => {
          const chosen = answers[i];
          return (
            <li key={q.id} className="card p-5">
              <fieldset disabled={!!result}>
                <legend className="text-sm"><span className="font-mono text-xs text-faint">Q{i + 1} · {SUBJECTS[subj].topics[q.topic][0]}</span><span className="mt-1 block font-semibold">{q.q}</span></legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((o, j) => {
                    const state = result ? (j === q.answer ? "right" : j === chosen ? "wrong" : "") : "";
                    return (
                      <label key={j} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${chosen === j && !result ? "border-indigo bg-indigo-soft" : "border-line hover:border-line-2"} ${state === "right" ? "!border-ok bg-ok-soft" : ""} ${state === "wrong" ? "!border-bad bg-bad-soft" : ""}`}>
                        <input type="radio" name={q.id} className="size-4 accent-indigo" checked={chosen === j} onChange={() => setAnswers((a) => ({ ...a, [i]: j }))} />
                        <span className="font-mono text-xs text-faint">{"ABCD"[j]}</span>{o}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {result && <p className={`mt-3 flex gap-2 text-sm ${chosen === q.answer ? "text-ok" : "text-bad"}`}>{chosen === q.answer ? <CheckCircle2 className="size-4 shrink-0" /> : <XCircle className="size-4 shrink-0" />}<span className="text-muted"><strong className={chosen === q.answer ? "text-ok" : "text-bad"}>{chosen == null ? "Not answered. " : chosen === q.answer ? "Correct. " : "Incorrect. "}</strong>{q.why}</span></p>}
            </li>
          );
        })}
      </ol>

      <div className="sticky bottom-0 mt-5 border-t border-line bg-paper/95 py-4 backdrop-blur" aria-live="polite">
        {!result ? (
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-muted">{Object.keys(answers).length} of {qs.length} answered</p><button className="btn btn-primary" onClick={submit} disabled={!Object.keys(answers).length}>Submit and mark</button></div>
        ) : !saved ? (
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm"><strong className="font-display text-2xl">{result.correct}/{result.total}</strong> correct</p><div className="flex gap-2"><button className="btn btn-line" onClick={() => { setAnswers({}); setResult(null); setSecs(0); }}>Try again</button><button className="btn btn-primary" onClick={record}>Record to {cand.name}'s results</button></div></div>
        ) : (
          <div className="rounded-xl bg-ok-soft p-4 text-sm">
            <p className="font-semibold text-ok">Recorded as {saved.id} (stored in this browser only).</p>
            <p className="mt-1">{SUBJECTS[subj].name} projection: <span className="font-mono">{saved.before.status === "ok" ? saved.before.score : "unavailable"}</span> → <span className="font-mono">{after.status === "ok" ? after.score : "unavailable"}</span>. This short set weighs as much as a full mock in the demo.</p>
            <Link to={`/demo/candidates/${cand.id}`} className="btn btn-primary btn-sm mt-3">View {cand.name}'s updated plan</Link>
          </div>
        )}
      </div>
    </div>
  );
}
