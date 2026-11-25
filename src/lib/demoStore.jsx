// Demo state kept only in this browser (localStorage). Nothing is sent to a server.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ATTEMPTS, CANDIDATES } from "../data/demo/candidates.js";

const KEY = "afograde-demo-v1";
const EMPTY = { extraAttempts: [], notes: {}, targets: {}, hours: {}, scenarios: {}, followUp: {}, role: "mentor", self: "DEMO-C101", onboarded: false };

function load() {
  if (typeof window === "undefined") return EMPTY;
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return EMPTY; }
}

const Ctx = createContext(null);

export function DemoProvider({ children }) {
  const [state, setState] = useState(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ } }, [state]);

  const update = useCallback((fn) => setState((s) => ({ ...s, ...fn(s) })), []);
  const api = useMemo(() => {
    const attempts = [...ATTEMPTS, ...state.extraAttempts];
    const role = state.role;
    return {
      state, attempts, candidates: CANDIDATES, role,
      can: {
        editPlan: role === "mentor",
        editNotes: role === "mentor",
        takeMock: role !== "parent",
        seeAll: role === "mentor",
      },
      visibleCandidates: role === "mentor" ? CANDIDATES : CANDIDATES.filter((c) => c.id === state.self),
      targetFor: (c) => state.targets[c.id] ?? c.target,
      hoursFor: (c) => state.hours[c.id] ?? 10,
      setRole: (role) => update(() => ({ role })),
      setSelf: (self) => update(() => ({ self })),
      setTarget: (id, v) => update((s) => ({ targets: { ...s.targets, [id]: v } })),
      setHours: (id, v) => update((s) => ({ hours: { ...s.hours, [id]: v } })),
      toggleFollowUp: (id) => update((s) => ({ followUp: { ...s.followUp, [id]: !s.followUp[id] } })),
      addNote: (id, text) => update((s) => ({ notes: { ...s.notes, [id]: [...(s.notes[id] || []), { text, at: new Date().toISOString(), by: s.role === "mentor" ? "Demo Mentor" : "You" }] } })),
      deleteNote: (id, i) => update((s) => ({ notes: { ...s.notes, [id]: (s.notes[id] || []).filter((_, j) => j !== i) } })),
      saveScenario: (id, sc) => update((s) => ({ scenarios: { ...s.scenarios, [id]: [...(s.scenarios[id] || []), sc] } })),
      deleteScenario: (id, i) => update((s) => ({ scenarios: { ...s.scenarios, [id]: (s.scenarios[id] || []).filter((_, j) => j !== i) } })),
      addAttempt: (a) => update((s) => ({ extraAttempts: [...s.extraAttempts, a] })),
      finishOnboarding: () => update(() => ({ onboarded: true })),
      reset: () => { localStorage.removeItem(KEY); setState({ ...EMPTY, onboarded: true }); },
    };
  }, [state, update]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useDemo = () => useContext(Ctx);
