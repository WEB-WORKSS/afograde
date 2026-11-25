import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Flag, ChevronRight } from "lucide-react";
import { useDemo } from "../../lib/demoStore.jsx";
import { summarise } from "../../lib/scoring.js";
import { SUBJECTS } from "../../data/demo/subjects.js";
import { Band, PageTitle, fmtDate } from "./common.jsx";

const SORTS = { gap: "Gap to target (largest first)", name: "Name", projected: "Projected score (highest first)", recent: "Last mock (oldest first)" };

export default function Cohort() {
  const { visibleCandidates, attempts, targetFor, state, can } = useDemo();
  const [q, setQ] = useState("");
  const [band, setBand] = useState("all");
  const [subj, setSubj] = useState("all");
  const [sort, setSort] = useState("gap");

  const rows = useMemo(() => visibleCandidates.map((c) => summarise(c, attempts, { target: targetFor(c) })), [visibleCandidates, attempts, targetFor]);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = rows.filter((r) => (!t || `${r.candidate.name} ${r.candidate.id} ${r.candidate.course}`.toLowerCase().includes(t)) && (band === "all" || r.band === band || (band === "followup" && state.followUp[r.candidate.id])) && (subj === "all" || r.candidate.combo.includes(subj)));
    const by = { gap: (a, b) => (b.gap ?? -1e9) - (a.gap ?? -1e9), name: (a, b) => a.candidate.name.localeCompare(b.candidate.name), projected: (a, b) => (b.aggregate ?? -1) - (a.aggregate ?? -1), recent: (a, b) => (a.lastActivity || "").localeCompare(b.lastActivity || "") };
    return [...list].sort(by[sort]);
  }, [rows, q, band, subj, sort, state.followUp]);

  const counts = rows.reduce((m, r) => ({ ...m, [r.band]: (m[r.band] || 0) + 1 }), {});
  return (
    <div>
      <PageTitle title={can.seeAll ? "2027 UTME cohort" : "My progress"} sub={can.seeAll ? `${rows.length} fictional candidates · projected aggregate out of 400` : "You're viewing as a candidate or parent: only one candidate is visible."} />
      {can.seeAll && <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[["on-track", "On track"], ["close", "Close to target"], ["attention", "Needs attention"], ["unavailable", "Projection unavailable"]].map(([k, l]) => (
          <button key={k} onClick={() => setBand(band === k ? "all" : k)} aria-pressed={band === k} className={`card p-4 text-left transition ${band === k ? "border-indigo ring-2 ring-indigo/20" : "hover:border-line-2"}`}><p className="font-display text-3xl font-semibold">{counts[k] || 0}</p><p className="text-xs text-muted">{l}</p></button>
        ))}
      </div>}
      <div className="card mb-4 grid gap-3 p-3 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <label className="relative"><span className="sr-only">Search candidates</span><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" aria-hidden="true" /><input className="input !pl-9" placeholder="Search name, ID or course" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <label><span className="sr-only">Filter by status</span><select className="input" value={band} onChange={(e) => setBand(e.target.value)}><option value="all">All statuses</option><option value="on-track">On track</option><option value="close">Close to target</option><option value="attention">Needs attention</option><option value="unavailable">Projection unavailable</option><option value="followup">Flagged for follow-up</option></select></label>
        <label><span className="sr-only">Filter by subject</span><select className="input" value={subj} onChange={(e) => setSubj(e.target.value)}><option value="all">All subjects</option>{Object.entries(SUBJECTS).map(([k, s]) => <option key={k} value={k}>{s.name}</option>)}</select></label>
        <label><span className="sr-only">Sort</span><select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>{Object.entries(SORTS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
      </div>
      {shown.length === 0 ? (
        <div className="card p-10 text-center text-sm text-muted">No candidates match these filters. <button className="font-semibold text-indigo underline" onClick={() => { setQ(""); setBand("all"); setSubj("all"); }}>Clear filters</button></div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead><tr><th className="th">Candidate</th><th className="th">Subjects</th><th className="th text-right">Projected</th><th className="th text-right">Target</th><th className="th text-right">Gap</th><th className="th">Status</th><th className="th">Last mock</th><th className="th"><span className="sr-only">Open</span></th></tr></thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.candidate.id} className="hover:bg-paper">
                  <td className="td"><Link to={`/demo/candidates/${r.candidate.id}`} className="font-semibold hover:text-indigo">{r.candidate.name}</Link>{state.followUp[r.candidate.id] && <Flag className="ml-1.5 inline size-3.5 text-bad" aria-label="Flagged for follow-up" />}<p className="font-mono text-[0.7rem] text-faint">{r.candidate.id} · {r.candidate.course}</p></td>
                  <td className="td text-xs text-muted">{r.candidate.combo.join(" · ")}</td>
                  <td className="td text-right font-mono">{r.aggregate ?? <span className="text-faint" title={r.unavailableReason}>unavailable</span>}</td>
                  <td className="td text-right font-mono">{r.target}</td>
                  <td className="td text-right font-mono">{r.gap == null ? "—" : r.gap > 0 ? `−${r.gap}` : `+${-r.gap}`}</td>
                  <td className="td"><Band band={r.band} /></td>
                  <td className="td text-xs text-muted">{fmtDate(r.lastActivity)}</td>
                  <td className="td"><Link to={`/demo/candidates/${r.candidate.id}`} aria-label={`Open ${r.candidate.name}`} className="text-faint hover:text-indigo"><ChevronRight className="size-4" /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-faint">Gap = target − projected aggregate. Projections are withheld when less than 60% of a subject's sample weighting has been tested.</p>
    </div>
  );
}
