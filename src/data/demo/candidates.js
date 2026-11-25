// DEMO · SAMPLE DATA. Every candidate, centre and attempt here is fictional and exists only for the demo.
// Attempts are generated deterministically from the profiles below, so every visitor sees the same data.
import { SUBJECTS } from "./subjects.js";

export const CENTRE = { id: "DEMO-CTR-01", name: "Brightpath Study Centre (fictional)", mentor: "Demo Mentor" };

// ability: base accuracy per subject, adjusted per topic by `weak` / `strong`; trend: improvement per mock.
const PROFILES = [
  { id: "DEMO-C101", name: "Adaeze O.", course: "Medicine & Surgery", combo: ["ENG", "BIO", "CHM", "PHY"], target: 360, ability: { ENG: 0.78, BIO: 0.82, CHM: 0.7, PHY: 0.62 }, weak: ["elec", "org", "summ"], strong: ["phys", "cell"], trend: 0.03, mocks: 3 },
  { id: "DEMO-C102", name: "Tunde B.", course: "Computer Science", combo: ["ENG", "MTH", "PHY", "CHM"], target: 320, ability: { ENG: 0.66, MTH: 0.85, PHY: 0.74, CHM: 0.6 }, weak: ["oral", "inorg"], strong: ["alg", "mech"], trend: 0.02, mocks: 3 },
  { id: "DEMO-C103", name: "Halima S.", course: "Law", combo: ["ENG", "LIT", "GOV", "ECO"], target: 330, ability: { ENG: 0.84, LIT: 0.8, GOV: 0.77, ECO: 0.58 }, weak: ["macro", "trade"], strong: ["comp", "ngov"], trend: 0.04, mocks: 3 },
  { id: "DEMO-C104", name: "Chinedu E.", course: "Mechanical Engineering", combo: ["ENG", "MTH", "PHY", "CHM"], target: 340, ability: { ENG: 0.7, MTH: 0.8, CHM: 0.68 }, weak: ["calc", "phys"], strong: ["num"], trend: 0.02, mocks: 2, note: "No Physics mock taken yet" },
  { id: "DEMO-C105", name: "Zainab M.", course: "Pharmacy", combo: ["ENG", "BIO", "CHM", "PHY"], target: 320, ability: { ENG: 0.72, BIO: 0.75, CHM: 0.77, PHY: 0.55 }, weak: ["mod", "wave", "gen"], strong: ["inorg"], trend: 0.05, mocks: 3 },
  { id: "DEMO-C106", name: "Ifeoluwa A.", course: "Economics", combo: ["ENG", "MTH", "ECO", "GOV"], target: 300, ability: { ENG: 0.62, MTH: 0.57, ECO: 0.7, GOV: 0.66 }, weak: ["stat", "geo", "lexis"], strong: ["micro"], trend: 0.01, mocks: 3 },
  { id: "DEMO-C107", name: "Emeka N.", course: "Electrical Engineering", combo: ["ENG", "MTH", "PHY", "CHM"], target: 360, ability: { ENG: 0.86, MTH: 0.92, PHY: 0.88, CHM: 0.84 }, weak: ["env", "text"], strong: ["alg", "elec", "calc"], trend: 0.02, mocks: 3 },
  { id: "DEMO-C108", name: "Blessing U.", course: "Nursing Science", combo: ["ENG", "BIO", "CHM", "PHY"], target: 280, ability: { ENG: 0.6, BIO: 0.64, CHM: 0.5, PHY: 0.46 }, weak: ["phys", "elec", "mech"], strong: ["eco"], trend: 0.06, mocks: 3 },
  { id: "DEMO-C109", name: "Kelechi I.", course: "Mass Communication", combo: ["ENG", "LIT", "GOV", "ECO"], target: 300, ability: { ENG: 0.76, LIT: 0.7, GOV: 0.72, ECO: 0.64 }, weak: ["intl"], strong: ["comp"], trend: 0.02, mocks: 2, partial: { LIT: ["prose"] }, note: "Literature mocks so far covered Prose only" },
  { id: "DEMO-C110", name: "Fatima Y.", course: "Accounting", combo: ["ENG", "MTH", "ECO", "GOV"], target: 320, ability: { ENG: 0.74, MTH: 0.79, ECO: 0.81, GOV: 0.7 }, weak: ["const", "calc"], strong: ["macro", "num"], trend: 0.03, mocks: 3 },
  { id: "DEMO-C111", name: "Samuel K.", course: "Architecture", combo: ["ENG", "MTH", "PHY", "CHM"], target: 300, ability: { ENG: 0.68, MTH: 0.66, PHY: 0.63, CHM: 0.61 }, weak: ["org", "heat"], strong: ["geo"], trend: -0.01, mocks: 3 },
  { id: "DEMO-C112", name: "Ngozi P.", course: "Microbiology", combo: ["ENG", "BIO", "CHM", "PHY"], target: 300, ability: {}, weak: [], strong: [], trend: 0, mocks: 0, note: "Newly enrolled · no mocks yet" },
];

function rng(seed) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

const DATES = ["2026-09-21", "2026-10-12", "2026-11-02"];

function buildAttempts() {
  const out = [];
  let n = 100;
  PROFILES.forEach((p, pi) => {
    const r = rng(1000 + pi * 37);
    const start = 3 - p.mocks;
    for (let m = 0; m < p.mocks; m++) {
      for (const subj of p.combo) {
        if (p.ability[subj] == null) continue; // e.g. no Physics mock for DEMO-C104
        const results = {};
        const total = subj === "ENG" ? 60 : 40;
        for (const [key, [, w]] of Object.entries(SUBJECTS[subj].topics)) {
          if (p.partial?.[subj] && !p.partial[subj].includes(key)) continue;
          const q = Math.max(2, Math.round(w * total));
          let acc = p.ability[subj] + p.trend * m + (r() - 0.5) * 0.12;
          if (p.weak.includes(key)) acc -= 0.28;
          if (p.strong.includes(key)) acc += 0.1;
          acc = Math.min(1, Math.max(0.05, acc));
          results[key] = [Math.round(acc * q), q];
        }
        out.push({ id: `DEMO-A${++n}`, candidateId: p.id, subject: subj, date: DATES[start + m], results, source: "sample" });
      }
    }
  });
  return out;
}

export const CANDIDATES = PROFILES.map(({ ability, weak, strong, trend, partial, mocks, ...c }) => c);
export const ATTEMPTS = buildAttempts();
