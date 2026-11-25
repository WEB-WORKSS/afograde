// DEMO · SAMPLE DATA. Topic weights are illustrative sample values, not official JAMB weightings.
export const SUBJECTS = {
  ENG: { name: "Use of English", topics: { comp: ["Comprehension", 0.3], lexis: ["Lexis & structure", 0.3], oral: ["Oral forms", 0.15], summ: ["Summary", 0.1], text: ["Prescribed text", 0.15] } },
  MTH: { name: "Mathematics", topics: { num: ["Number & numeration", 0.2], alg: ["Algebra", 0.3], geo: ["Geometry & trigonometry", 0.2], calc: ["Calculus", 0.1], stat: ["Statistics", 0.2] } },
  PHY: { name: "Physics", topics: { mech: ["Mechanics", 0.3], wave: ["Waves & optics", 0.2], elec: ["Electricity & magnetism", 0.25], heat: ["Heat", 0.1], mod: ["Modern physics", 0.15] } },
  CHM: { name: "Chemistry", topics: { phys: ["Physical chemistry", 0.35], inorg: ["Inorganic chemistry", 0.3], org: ["Organic chemistry", 0.25], env: ["Environmental chemistry", 0.1] } },
  BIO: { name: "Biology", topics: { cell: ["Cells & living organisms", 0.2], eco: ["Ecology", 0.2], gen: ["Genetics & evolution", 0.2], phys: ["Physiology", 0.3], plant: ["Plant biology", 0.1] } },
  ECO: { name: "Economics", topics: { micro: ["Microeconomics", 0.35], macro: ["Macroeconomics", 0.35], ng: ["Nigerian economy", 0.15], trade: ["International trade", 0.15] } },
  GOV: { name: "Government", topics: { conc: ["Political concepts", 0.3], ngov: ["Nigerian government", 0.4], intl: ["International relations", 0.15], const: ["Constitutional development", 0.15] } },
  LIT: { name: "Literature in English", topics: { prose: ["Prose", 0.35], drama: ["Drama", 0.3], poetry: ["Poetry", 0.35] } },
};

export const TARGET_DEFAULT = 360;
export const COVERAGE_MIN = 0.6; // share of a subject's weighting that must be tested before projecting
