// Marketing copy. Feature status is stated honestly: the product is in development; the /demo runs the
// core workflow on sample data in the browser.

export const audiences = [
  "UTME mentors and private tutors",
  "Tutorial and CBT centres",
  "Secondary schools (SS2–SS3)",
  "Scholarship and education programmes",
  "Parents supporting a candidate",
];

export const highlights = [
  { k: "Topic-level", v: "Every mock is broken down by syllabus topic, not just a total score." },
  { k: "Projected aggregate", v: "A score out of 400, shown only when enough of the syllabus has been tested." },
  { k: "Weekly plan", v: "Study hours allocated to the topics that cost the most marks." },
  { k: "Mentor in the loop", v: "Mentors review, adjust and sign off every plan before a candidate sees it." },
];

// Industry figures. Published by JAMB and reported by the Nigerian press; they describe the exam, not Afograde's results.
export const stats = [
  {
    figure: "≈78%",
    text: "of the more than 1.94 million candidates who sat the 2025 UTME scored below 200 of 400.",
    source: "Premium Times, 9 May 2025, reporting JAMB's release",
    href: "https://www.premiumtimesng.com/news/top-news/793154-utme-2025-jamb-releases-results-over-75-score-below-200.html",
  },
  {
    figure: "0.63%",
    text: "of 2025 candidates (12,421 people) scored 300 or above.",
    source: "Premium Times, 9 May 2025, reporting JAMB's release",
    href: "https://www.premiumtimesng.com/news/top-news/793154-utme-2025-jamb-releases-results-over-75-score-below-200.html",
  },
  {
    figure: "76%",
    text: "of 1,842,464 released 2024 UTME results (1,402,490 candidates) were below 200; 8,401 scored 300 or above.",
    source: "Nairametrics, 30 April 2024, reporting JAMB's release",
    href: "https://nairametrics.com/2024/04/30/utme-results-less-than-1-of-candidates-scored-300-and-above-jamb/",
  },
];

export const problems = [
  { t: "Mock scores without a diagnosis", d: "A candidate who scores 58 in Physics learns nothing from the number. Which topics lost the 42 marks — and are they heavily examined or rare?" },
  { t: "Plans that ignore the evidence", d: "Most timetables give every topic equal time. Candidates keep revising what they already know because it feels productive." },
  { t: "Mentors working from memory", d: "A mentor with 30 candidates tracks progress in notebooks, WhatsApp threads and spreadsheets. Nobody can see who is slipping until the next mock." },
  { t: "It doesn't scale", d: "Every extra candidate adds marking, analysis and planning time. Quality drops exactly when a centre grows." },
];

export const contrast = [
  ["A total score per mock", "A score per syllabus topic, weighted by how often it is examined"],
  ["Equal time for every topic", "Hours allocated to the topics costing the most marks"],
  ["Guessing a final score", "A projected aggregate, withheld when the evidence is too thin"],
  ["Progress tracked in notebooks", "One cohort view showing who is on track and who needs attention"],
  ["Explanations only in class", "Worked explanations drawn from the question bank, reviewed by mentors"],
];

export const features = [
  {
    id: "mocks", name: "CBT-style mock exams", icon: "MonitorCheck", status: "In development",
    what: "Timed, computer-based mocks in the four-subject UTME format, tagged question by question to syllabus topics.",
    benefit: "Candidates practise the real format; every answer becomes evidence about a topic.",
    place: "Step 1 · Practise",
  },
  {
    id: "scoring", name: "Topic-level scoring", icon: "ListChecks", status: "In development",
    what: "Scores each attempt per subject and per topic, with more weight on recent attempts.",
    benefit: "Shows exactly where marks are lost instead of a single number.",
    place: "Step 2 · Measure",
  },
  {
    id: "projection", name: "Projected UTME aggregate", icon: "Gauge", status: "In development",
    what: "Combines topic mastery with sample syllabus weights to project each subject and the aggregate out of 400.",
    benefit: "A realistic view of the gap to the target score — and an honest 'unavailable' when coverage is too low.",
    place: "Step 2 · Measure",
  },
  {
    id: "plan", name: "Weekly study plan", icon: "CalendarRange", status: "In development",
    what: "Allocates the candidate's available hours across topics by syllabus weight and current weakness; untested topics get a diagnostic task first.",
    benefit: "Time goes where it moves the score most.",
    place: "Step 3 · Plan",
  },
  {
    id: "mentor", name: "Mentor cohort view", icon: "UsersRound", status: "In development",
    what: "One screen per cohort: projected scores, gap to target, last activity and mentor notes, sortable and filterable.",
    benefit: "Mentors spot who is slipping in minutes, not at the next mock.",
    place: "Step 4 · Review",
  },
  {
    id: "explain", name: "Explanations and assistant", icon: "MessagesSquare", status: "Planned",
    what: "Explains a candidate's results and plan in plain language, using only their recorded attempts and the question bank's worked solutions.",
    benefit: "Candidates get answers between sessions; mentors stay in control of advice.",
    place: "Step 4 · Review",
  },
  {
    id: "reports", name: "Progress reports for families", icon: "FileText", status: "Planned",
    what: "A weekly summary for the candidate and, where they agree, a parent or sponsor.",
    benefit: "Everyone sees the same picture of progress.",
    place: "Step 5 · Repeat",
  },
];

export const steps = [
  { n: "01", t: "Practise", d: "The candidate sits a timed CBT-style mock in their four UTME subjects. Each question is tagged to a syllabus topic." },
  { n: "02", t: "Measure", d: "Afograde scores every topic, weights recent attempts more heavily and projects each subject score — or marks it unavailable if too little of the syllabus has been tested." },
  { n: "03", t: "Plan", d: "Available study hours are allocated by topic weight × weakness. Untested topics get a short diagnostic quiz before any hours." },
  { n: "04", t: "Review", d: "The mentor reviews the plan, adjusts it, adds notes and agrees targets with the candidate." },
  { n: "05", t: "Repeat", d: "The next mock updates every figure. Progress toward the target is visible week by week." },
];

export const segments = [
  {
    id: "mentors", name: "Mentors and private tutors", icon: "GraduationCap",
    who: "Independent mentors coaching small groups of UTME candidates.",
    problem: "Marking and analysing mocks by hand takes the time that should go to teaching.",
    use: "Assign mocks, read each candidate's topic breakdown and approve weekly plans from one cohort view.",
    benefit: "More candidates mentored well, without more admin.",
  },
  {
    id: "centres", name: "Tutorial and CBT centres", icon: "Building2",
    who: "Centres running UTME preparation classes for dozens to hundreds of candidates.",
    problem: "Class-level averages hide the individual candidates falling behind.",
    use: "Group candidates by class and subject combination, compare progress across groups and flag who needs attention.",
    benefit: "Consistent, measurable preparation as the centre grows.",
  },
  {
    id: "schools", name: "Secondary schools", icon: "School",
    who: "SS2 and SS3 teachers preparing students for UTME alongside WASSCE.",
    problem: "Teachers have little visibility of UTME readiness until results arrive.",
    use: "Run termly mocks, see topic gaps per class, and give students their own weekly plans.",
    benefit: "Earlier intervention on the topics a class is weakest in.",
  },
  {
    id: "families", name: "Parents and sponsors", icon: "HeartHandshake",
    who: "Parents, guardians and scholarship programmes paying for a candidate's preparation.",
    problem: "It is hard to tell whether lessons and practice are working.",
    use: "Receive a plain progress summary the candidate has agreed to share.",
    benefit: "Clear evidence of progress — or an early warning.",
  },
];

export const comparison = {
  cols: ["Paper past questions", "Spreadsheets", "Generic CBT practice apps", "Afograde"],
  rows: [
    ["Real CBT timing and format", "No", "No", "Yes", "Yes"],
    ["Score per syllabus topic", "Manual", "Manual", "Sometimes", "Yes"],
    ["Projected aggregate with coverage check", "No", "Manual", "No", "Yes"],
    ["Study plan from the candidate's results", "No", "Manual", "No", "Yes"],
    ["Mentor review and notes", "Informal", "Manual", "No", "Yes"],
    ["Cohort view for centres and schools", "No", "Manual", "Rarely", "Yes"],
  ],
};

export const aiDoes = [
  "Explains, in plain language, how a projected score was calculated",
  "Summarises a candidate's strongest and weakest topics from recorded attempts",
  "Rewords the question bank's worked solutions at the candidate's level",
  "Drafts a weekly plan summary for the mentor to review",
];
export const aiDoesNot = [
  "Never guesses a score when coverage is too low — it says 'unavailable' and why",
  "Never invents questions, answers or syllabus content outside the reviewed bank",
  "Never changes a plan, target or note; mentors approve every change",
  "Never shares a candidate's data with a parent unless the candidate agreed",
];

export const sampleExchange = [
  { who: "Candidate", text: "Why is my projected Physics score 61?" },
  { who: "Assistant", text: "Across your last 3 Physics mocks you averaged 78% in Mechanics but 34% in Electricity. Electricity carries 25% of the sample weighting, so it cost you about 17 marks. Your plan gives it 3 of your 8 hours this week." },
];

export const safeguards = [
  { t: "Every figure is traceable", d: "Each projected score links back to the attempts and topic results it came from." },
  { t: "Mentors approve plans", d: "Plans are drafts until a mentor reviews them. Nothing is sent to a candidate automatically." },
  { t: "Role-based access", d: "Candidates see their own data, mentors see their cohort, centre admins see their centre — enforced on the server." },
  { t: "Audit trail", d: "Plan edits, target changes and notes are recorded with who made them and when." },
  { t: "Minors' data handled carefully", d: "Many candidates are under 18. We collect the minimum needed and share with parents only with consent." },
  { t: "AI stays inside the evidence", d: "Explanations use only recorded attempts and reviewed worked solutions; no score is ever guessed." },
];

export const roadmap = [
  { col: "Now", items: ["Interactive demo on sample data at afograde.com/demo", "Scoring, projection and study-plan logic", "Early-access list for the 2027 UTME cohort"] },
  { col: "Next", items: ["Pilot with a small group of mentors and candidates", "Reviewed question bank for core subjects", "Mentor accounts and cohort view on real data"] },
  { col: "Then", items: ["General availability for the 2027 UTME cycle", "Centre and school administration", "Weekly progress reports for families"] },
  { col: "Later", items: ["Post-UTME screening preparation", "Offline-friendly practice on low-bandwidth connections", "Additional exam formats"] },
];

export const pricing = [
  {
    id: "essential", name: "Essential", price: 10,
    who: "Self-guided candidates who want measured practice.",
    features: ["CBT-style mock exams", "Topic-level scoring", "Projected UTME aggregate", "Weekly study plan"],
  },
  {
    id: "mentored", name: "Mentored", price: 20, featured: true,
    who: "Candidates working with an Afograde mentor or their own tutor.",
    features: ["Everything in Essential", "Mentor review of every weekly plan", "Mentor notes and agreed targets", "Explanations of results and plan"],
  },
  {
    id: "intensive", name: "360+ Intensive", price: 40,
    who: "Candidates aiming for 360+ who want close, frequent mentoring.",
    features: ["Everything in Mentored", "Priority mentor review", "Progress summaries for a parent or sponsor (with consent)", "Extra mock-exam allowance"],
  },
];

export const compareTable = [
  ["CBT-style mock exams", true, true, true],
  ["Topic-level scoring", true, true, true],
  ["Projected UTME aggregate", true, true, true],
  ["Weekly study plan", true, true, true],
  ["Mentor review of plans", false, true, true],
  ["Mentor notes and targets", false, true, true],
  ["Explanations of results", false, true, true],
  ["Priority mentor review", false, false, true],
  ["Family progress summaries", false, false, true],
];

export const faq = [
  { q: "Is Afograde available today?", a: "Not yet as a full product. We are building it now and taking early-access requests for the 2027 UTME cohort. You can try the core workflow today in the interactive demo, which runs on sample data in your browser." },
  { q: "What does the AI do?", a: "In the production version it will explain results and plans in plain language, using only a candidate's recorded attempts and our reviewed worked solutions. It never guesses a missing score, never invents questions and never changes a plan — mentors approve every change. The demo uses a rule-based assistant on sample data." },
  { q: "How much does it cost?", a: "Three plans: Essential at $10, Mentored at $20 and 360+ Intensive at $40, in USD, excluding taxes. Billing per candidate per month is our proposed structure and will be confirmed before launch. Centres and schools can contact us about cohorts." },
  { q: "Who can change what?", a: "Candidates can take mocks and see their own results and plan. Mentors can adjust plans, targets and notes for their cohort. Parents or sponsors can only view summaries the candidate has agreed to share. Every change is recorded." },
  { q: "How is the projected score calculated?", a: "Each subject's topics carry a sample weighting. We take the candidate's recency-weighted accuracy in each topic, multiply by its weight and add up to a score out of 100 per subject, then sum four subjects for an aggregate out of 400. If less than 60% of a subject's weighting has been tested, the projection is shown as unavailable." },
  { q: "Is this affiliated with JAMB?", a: "No. Afograde is an independent company and is not affiliated with or endorsed by the Joint Admissions and Matriculation Board. Topic weightings in the demo are sample values, not official JAMB figures." },
  { q: "Which subjects are covered?", a: "The demo includes Use of English plus common science, social-science and arts combinations. The pilot will start with the most common subject combinations and expand from there." },
  { q: "How do you protect candidates' data?", a: "Many candidates are under 18, so we collect only what the service needs, never sell data, and share with parents only with consent. See the Security page for how the platform is being designed." },
];

// AWS architecture. Nothing below is deployed yet; status note on every AWS section says so.
export const awsStages = [
  { stage: "Data collection", svc: "Amazon API Gateway", job: "Receives mock answers and mentor actions" },
  { stage: "Secure storage", svc: "Amazon DynamoDB · Amazon S3", job: "Attempts and plans · question media and reports" },
  { stage: "Processing", svc: "AWS Lambda", job: "Scores attempts, projects scores, builds plans" },
  { stage: "AI intelligence", svc: "Amazon Bedrock", job: "Plain-language explanations from recorded evidence" },
  { stage: "Application", svc: "Amazon CloudFront · Amazon Cognito", job: "Fast delivery and role-based sign-in" },
];

export const awsServices = [
  { name: "Amazon CloudFront", purpose: "Delivers the Afograde web app and question media quickly to candidates on mobile connections across Nigeria." },
  { name: "Amazon Cognito", purpose: "Handles sign-in for candidates, mentors and centre admins, and carries each user's role." },
  { name: "Amazon API Gateway", purpose: "Receives mock-exam answers, plan edits and mentor notes, and checks the caller's role before anything is processed." },
  { name: "AWS Lambda", purpose: "Scores each attempt by topic, recalculates projected subject and aggregate scores, and builds weekly study plans." },
  { name: "Amazon DynamoDB", purpose: "Stores candidates, attempts, topic results, plans, notes and the audit trail of changes." },
  { name: "Amazon S3", purpose: "Stores question-bank images and diagrams, and generated progress reports." },
  { name: "Amazon Bedrock", purpose: "Runs a foundation model (Anthropic Claude) that explains results and plans using only the candidate's recorded attempts and reviewed worked solutions." },
  { name: "Amazon SES", purpose: "Sends weekly progress summaries to candidates and, with consent, to a parent or sponsor." },
];

export const awsStatus = "These services are our proposed architecture; they are not yet deployed. The public website and the browser-only demo do not use them.";
