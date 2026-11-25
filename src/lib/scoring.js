// Demo scoring engine. Runs entirely in the browser on sample data. Pure functions, no side effects.
import { SUBJECTS, COVERAGE_MIN } from "../data/demo/subjects.js";

const RECENCY = [1, 2, 3]; // oldest → newest weight for the last three attempts

/** Recency-weighted accuracy per topic from a candidate's attempts in one subject. */
export function topicMastery(subject, attempts) {
  const sorted = attempts.filter((a) => a.subject === subject).sort((a, b) => a.date.localeCompare(b.date)).slice(-3);
  const offset = 3 - sorted.length;
  const out = {};
  for (const [key, [label, weight]] of Object.entries(SUBJECTS[subject].topics)) {
    let wSum = 0, accSum = 0, correct = 0, total = 0, n = 0;
    sorted.forEach((a, i) => {
      const r = a.results[key];
      if (!r || !r[1]) return;
      const w = RECENCY[offset + i];
      wSum += w; accSum += w * (r[0] / r[1]); correct += r[0]; total += r[1]; n++;
    });
    out[key] = { key, label, weight, tested: n > 0, acc: n ? accSum / wSum : null, correct, total, attempts: n };
  }
  return out;
}

/** Projected subject score out of 100, or "unavailable" with a reason. `overrides` maps topic → accuracy (0–1) for what-if scenarios. */
export function projectSubject(subject, attempts, overrides = {}) {
  const mastery = topicMastery(subject, attempts);
  const topics = Object.values(mastery).map((t) => (overrides[t.key] != null ? { ...t, acc: overrides[t.key], tested: true, scenario: true } : t));
  const coverage = topics.filter((t) => t.tested).reduce((s, t) => s + t.weight, 0);
  const name = SUBJECTS[subject].name;
  const count = attempts.filter((a) => a.subject === subject).length;
  if (count === 0 && !Object.keys(overrides).length) {
    return { subject, name, status: "unavailable", reason: `No ${name} mock recorded yet.`, coverage: 0, topics };
  }
  if (coverage < COVERAGE_MIN - 1e-9) {
    return { subject, name, status: "unavailable", reason: `Only ${Math.round(coverage * 100)}% of ${name}'s weighting has been tested; at least ${COVERAGE_MIN * 100}% is needed.`, coverage, topics };
  }
  // Untested topics within a sufficiently covered subject are scored at the average of tested topics, and flagged.
  const tested = topics.filter((t) => t.tested);
  const avg = tested.reduce((s, t) => s + t.acc * t.weight, 0) / coverage;
  const contributions = topics.map((t) => {
    const acc = t.tested ? t.acc : avg;
    return { ...t, accUsed: acc, estimated: !t.tested, marks: acc * t.weight * 100, lost: (1 - acc) * t.weight * 100 };
  });
  const score = Math.round(contributions.reduce((s, c) => s + c.marks, 0));
  return { subject, name, status: "ok", score, coverage, attempts: count, topics: contributions };
}

export function bandFor(gap) {
  if (gap == null) return "unavailable";
  if (gap <= 0) return "on-track";
  if (gap <= 30) return "close";
  return "attention";
}

export const BAND_LABEL = { "on-track": "On track", close: "Close to target", attention: "Needs attention", unavailable: "Projection unavailable" };

/** Full summary for a candidate: subject projections, aggregate, gap to target. */
export function summarise(candidate, attempts, { target, overrides = {} } = {}) {
  const own = attempts.filter((a) => a.candidateId === candidate.id);
  const subjects = candidate.combo.map((s) => projectSubject(s, own, overrides[s] || {}));
  const missing = subjects.filter((s) => s.status !== "ok");
  const aggregate = missing.length ? null : subjects.reduce((s, x) => s + x.score, 0);
  const t = target ?? candidate.target;
  const gap = aggregate == null ? null : t - aggregate;
  const last = own.map((a) => a.date).sort().at(-1) || null;
  return {
    candidate, subjects, aggregate, target: t, gap, band: bandFor(gap), lastActivity: last, attemptCount: own.length,
    unavailableReason: missing.length ? missing.map((m) => m.reason).join(" ") : null,
  };
}

/** Allocates weekly hours across topics: priority = topic weight × (1 − accuracy). Untested topics get a 0.5 h diagnostic first. */
export function studyPlan(summary, hours) {
  const items = [];
  let budget = Math.max(0, hours);
  const untested = [];
  const scored = [];
  for (const s of summary.subjects) {
    for (const t of s.topics) {
      if (!t.tested || t.estimated) untested.push({ subject: s.subject, subjectName: s.name, ...t });
      else scored.push({ subject: s.subject, subjectName: s.name, ...t, priority: t.weight * (1 - t.acc) });
    }
  }
  untested.sort((a, b) => b.weight - a.weight);
  for (const t of untested) {
    if (budget < 0.5) break;
    items.push({ subject: t.subject, subjectName: t.subjectName, topic: t.label, key: t.key, hours: 0.5, kind: "diagnostic", reason: "Not yet tested — take a short diagnostic quiz before planning study time." });
    budget -= 0.5;
  }
  const totalP = scored.reduce((s, t) => s + t.priority, 0);
  if (totalP > 0 && budget > 0) {
    const ranked = scored.sort((a, b) => b.priority - a.priority);
    let left = budget;
    for (const t of ranked) {
      const h = Math.round(((t.priority / totalP) * budget) * 2) / 2;
      if (h < 0.5 || left < 0.5) continue;
      const give = Math.min(h, left);
      left -= give;
      items.push({ subject: t.subject, subjectName: t.subjectName, topic: t.label, key: t.key, hours: give, kind: "study", acc: t.acc, weight: t.weight, atStake: Math.round(t.weight * (1 - t.acc) * 100), reason: `${Math.round(t.acc * 100)}% accuracy on a topic worth ${Math.round(t.weight * 100)}% of ${t.subjectName}.` });
    }
  }
  return { items, allocated: items.reduce((s, i) => s + i.hours, 0), requested: hours };
}

/** Marks a mock exam: returns per-topic [correct, total] results in the same shape as stored attempts. */
export function markMock(questions, answers) {
  const results = {};
  let correct = 0;
  questions.forEach((q, i) => {
    const r = (results[q.topic] ||= [0, 0]);
    r[1]++;
    if (answers[i] === q.answer) { r[0]++; correct++; }
  });
  return { results, correct, total: questions.length };
}
