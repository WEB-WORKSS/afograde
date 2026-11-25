// Demo assistant: deterministic, rule-based answers from sample data only. No model is called.
import { summarise, studyPlan, BAND_LABEL } from "./scoring.js";

export const INTENTS = [
  { id: "plan", label: "What should this candidate study this week?" },
  { id: "why", label: "How was the projected score calculated?" },
  { id: "weak", label: "Which topics cost the most marks?" },
  { id: "missing", label: "Is any projection unavailable, and why?" },
  { id: "cohort", label: "Which candidates are furthest from target?" },
];

export function answer(intent, { candidate, candidates, attempts, targetFor, hoursFor }) {
  const used = new Set();
  const own = (c) => { attempts.filter((a) => a.candidateId === c.id).forEach((a) => used.add(a.id)); return summarise(c, attempts, { target: targetFor(c) }); };
  if (intent === "cohort") {
    const rows = candidates.map(own);
    const ranked = rows.filter((r) => r.gap != null).sort((a, b) => b.gap - a.gap).slice(0, 3);
    const na = rows.filter((r) => r.gap == null);
    const lines = ranked.map((r) => `${r.candidate.name} (${r.candidate.id}): projected ${r.aggregate}, target ${r.target}, gap ${r.gap}.`);
    if (na.length) lines.push(`Projection unavailable for ${na.map((r) => r.candidate.name).join(", ")} — not enough mocks recorded.`);
    return { text: lines.join("\n"), used: [...used] };
  }
  if (!candidate) return { text: "Choose a candidate first.", used: [] };
  const s = own(candidate);
  const first = candidate.name.split(" ")[0];
  if (intent === "plan") {
    const p = studyPlan(s, hoursFor(candidate));
    if (!p.items.length) return { text: `${first} has no recorded mocks yet, so there is nothing to plan from. Start with a diagnostic mock in each subject.`, used: [...used] };
    const top = p.items.slice(0, 4).map((i) => `• ${i.topic} (${i.subjectName}) — ${i.hours} h. ${i.reason}`);
    return { text: `Of ${p.requested} hours this week, ${p.allocated} are allocated:\n${top.join("\n")}${p.items.length > 4 ? `\n…and ${p.items.length - 4} more items in the plan.` : ""}`, used: [...used] };
  }
  if (intent === "why") {
    const lines = s.subjects.map((x) => x.status === "ok"
      ? `${x.name}: ${x.score}/100 — sum of (recency-weighted accuracy × topic weight) over ${x.attempts} mock(s); ${Math.round(x.coverage * 100)}% of weighting tested.`
      : `${x.name}: unavailable. ${x.reason}`);
    lines.push(s.aggregate != null ? `Aggregate: ${s.aggregate}/400 against a target of ${s.target} (${BAND_LABEL[s.band]}).` : "Aggregate: unavailable until every subject has a projection.");
    return { text: lines.join("\n"), used: [...used] };
  }
  if (intent === "weak") {
    const all = s.subjects.flatMap((x) => (x.status === "ok" ? x.topics.filter((t) => !t.estimated).map((t) => ({ ...t, sub: x.name })) : []));
    if (!all.length) return { text: `No scored topics yet for ${first}.`, used: [...used] };
    const top = all.sort((a, b) => b.lost - a.lost).slice(0, 3).map((t) => `• ${t.label} (${t.sub}): ${Math.round(t.accUsed * 100)}% accuracy, about ${Math.round(t.lost)} marks lost of ${Math.round(t.weight * 100)}.`);
    return { text: `The three topics costing ${first} the most marks:\n${top.join("\n")}`, used: [...used] };
  }
  if (intent === "missing") {
    return { text: s.unavailableReason ? `Yes. ${s.unavailableReason} The assistant will not estimate a score without enough evidence.` : `No — every subject for ${first} has enough tested coverage for a projection.`, used: [...used] };
  }
  return { text: "I can only answer the listed questions in the demo.", used: [] };
}
