import { Link } from "react-router-dom";
import { Check, Minus, ArrowRight, ExternalLink, Mail, Linkedin, Plus } from "lucide-react";
import { Section, Heading, Icon, CTA, SampleTag, StatusPill } from "../ui/primitives.jsx";
import { FeatureVisual, HeroVisual } from "./Visuals.jsx";
import { business, team } from "../../data/business.js";
import * as C from "../../data/content.js";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="dots absolute inset-x-0 top-0 h-[520px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <StatusPill className="rise">{business.statusShort}</StatusPill>
          <h1 className="h1 mt-6 rise">Know exactly which topics stand between a candidate and <span className="relative whitespace-nowrap text-indigo">360+<svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 10" aria-hidden="true"><path d="M2 7 Q60 1 118 6" fill="none" stroke="#E9A516" strokeWidth="4" strokeLinecap="round" /></svg></span>.</h1>
          <p className="lede rise text-lg">Afograde turns every UTME mock into topic-level scores, a projected aggregate and a weekly study plan — reviewed by a mentor before the candidate sees it. Built for mentors, tutorial centres and schools.</p>
          <div className="mt-8 flex flex-wrap gap-3 rise"><CTA.Access className="btn-lg" /><CTA.Demo className="btn-lg" /></div>
          <p className="mt-5 text-sm text-faint rise">In development · the demo runs the real scoring logic on fictional sample candidates.</p>
        </div>
        <div className="rise"><HeroVisual /></div>
      </div>
    </section>
  );
}

export function Audiences() {
  return (
    <div className="border-y border-line bg-white">
      <div className="wrap flex flex-col gap-3 py-6 md:flex-row md:items-center">
        <p className="shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint md:mr-6">Built for</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-semibold text-ink">
          {C.audiences.map((a) => <li key={a} className="flex items-center gap-2"><span className="bubble on !size-2.5" aria-hidden="true" />{a}</li>)}
        </ul>
      </div>
    </div>
  );
}

export function Highlights() {
  return (
    <Section>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {C.highlights.map((h) => <div key={h.k} className="reveal bg-card p-6"><p className="font-display text-xl font-semibold text-indigo">{h.k}</p><p className="mt-2 text-sm leading-relaxed text-muted">{h.v}</p></div>)}
      </div>
    </Section>
  );
}

export function ProblemSolution() {
  return (
    <Section tone="white" id="problem">
      <Heading eyebrow="The problem" title="Most candidates practise hard and still don't know why their score isn't moving." lede="UTME preparation is measured by a single number per mock. Without a topic-level diagnosis, time goes to the wrong places — and mentors can't see who is slipping until it is too late." />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {C.stats.map((s) => (
          <figure key={s.figure + s.text} className="reveal card bg-paper p-6">
            <p className="font-display text-5xl font-semibold text-indigo">{s.figure}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed">{s.text}</p>
            <figcaption className="mt-4 text-xs text-faint">Source: <a href={s.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-indigo underline">{s.source}<ExternalLink className="size-3" aria-hidden="true" /></a></figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-xs text-faint">These figures describe national UTME results as announced by JAMB and reported by the press. They are not Afograde's results. JAMB later ordered a resit for some 2025 candidates after technical problems at certain centres.</p>
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {C.problems.map((p) => <div key={p.t} className="reveal"><h3 className="font-display text-lg font-semibold">{p.t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p></div>)}
        </div>
        <div className="reveal card overflow-hidden">
          <div className="grid grid-cols-2 bg-paper-2 font-mono text-[0.7rem] uppercase tracking-wider"><p className="p-4 text-faint">Today</p><p className="p-4 text-indigo">With Afograde</p></div>
          {C.contrast.map(([a, b]) => <div key={a} className="grid grid-cols-2 border-t border-line text-sm"><p className="flex gap-2 p-4 text-muted"><Minus className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden="true" />{a}</p><p className="flex gap-2 p-4 font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />{b}</p></div>)}
        </div>
      </div>
    </Section>
  );
}

export function Features({ detailed = false }) {
  return (
    <Section id="features">
      <Heading eyebrow="Core features" title="From a mock exam to a plan a mentor can stand behind." lede="Each feature has one job in the workflow. Status is shown honestly: the product is in development, and you can try the scoring, projection and planning logic in the demo today." />
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {C.features.map((f, i) => (
          <article key={f.id} id={f.id} className={`reveal card flex flex-col p-6 ${i === 0 && !detailed ? "lg:col-span-2" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-indigo-soft text-indigo"><Icon name={f.icon} /></span>
              <span className={`chip ${f.status === "Planned" ? "bg-paper-2 text-faint" : "bg-indigo-soft text-indigo"}`}>{f.status}</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{f.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.what}</p>
            {detailed && <p className="mt-3 text-sm"><strong>Why it matters:</strong> {f.benefit}</p>}
            <div className="mt-5 flex-1 rounded-xl border border-line bg-paper p-4"><FeatureVisual id={f.id} /></div>
            <p className="mt-3 flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-wider text-faint"><span>{f.place}</span><SampleTag>Concept · sample data</SampleTag></p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Steps({ detailed = false }) {
  return (
    <Section tone="ink" id="how">
      <Heading light eyebrow="How it works" title="Practise. Measure. Plan. Review. Repeat." lede="A weekly loop that turns each mock into the next week's priorities." />
      <ol className="mt-14 grid gap-4 md:grid-cols-5">
        {C.steps.map((s, i) => (
          <li key={s.n} className="reveal relative rounded-2xl border border-white/12 bg-white/[.04] p-5">
            <div className="flex items-center gap-2">
              {C.steps.map((_, j) => <span key={j} className={`bubble !size-3 ${j <= i ? "on" : "text-white/30"}`} aria-hidden="true" />)}
            </div>
            <p className="mt-5 font-mono text-xs text-gold">{s.n}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-white">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
          </li>
        ))}
      </ol>
      {!detailed && <Link to="/how-it-works" className="mt-10 inline-flex items-center gap-2 font-semibold text-gold hover:underline">See the workflow in detail <ArrowRight className="size-4" aria-hidden="true" /></Link>}
    </Section>
  );
}

export function Segments() {
  return (
    <Section tone="white" id="segments">
      <Heading eyebrow="Who it's for" title="One workflow, four kinds of people guiding a candidate." />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {C.segments.map((s) => (
          <Link key={s.id} to={`/solutions#${s.id}`} className="reveal group card flex gap-5 bg-paper p-6 transition hover:border-indigo">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold-ink"><Icon name={s.icon} className="size-6" /></span>
            <div><h3 className="font-display text-xl font-semibold group-hover:text-indigo">{s.name}</h3><p className="mt-1 text-sm text-muted">{s.problem}</p><p className="mt-3 text-sm font-semibold">{s.benefit}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo">Read more <ArrowRight className="size-4" aria-hidden="true" /></span></div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

const cell = (v) => v === "Yes" ? <Check className="mx-auto size-4 text-ok" aria-label="Yes" /> : v === "No" ? <Minus className="mx-auto size-4 text-faint" aria-label="No" /> : <span className="text-xs text-muted">{v}</span>;

export function Comparison() {
  return (
    <Section id="compare">
      <Heading eyebrow="Compared with today" title="How the job is done now, and what changes." lede="We compare against methods, not named products." />
      <div className="reveal mt-10 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[680px] text-sm">
          <thead><tr className="bg-paper-2"><th className="th">Capability</th>{C.comparison.cols.map((c, i) => <th key={c} className={`th text-center ${i === 3 ? "!text-indigo" : ""}`}>{c}</th>)}</tr></thead>
          <tbody>{C.comparison.rows.map(([cap, ...vals]) => <tr key={cap}><td className="td font-semibold">{cap}</td>{vals.map((v, i) => <td key={i} className={`td text-center ${i === 3 ? "bg-indigo-soft/50" : ""}`}>{cell(v)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </Section>
  );
}

export function AiSection() {
  return (
    <Section tone="white" id="ai">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Heading eyebrow="How the AI is used" title="It explains the evidence. It never fills in for it." lede="Scores, projections and plans are calculated by transparent rules. The AI's job is to explain them in plain language — inside strict limits." />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div><h3 className="font-semibold text-ok">What it does</h3><ul className="mt-3 space-y-2 text-sm">{C.aiDoes.map((d) => <li key={d} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />{d}</li>)}</ul></div>
            <div><h3 className="font-semibold text-bad">What it does not do</h3><ul className="mt-3 space-y-2 text-sm">{C.aiDoesNot.map((d) => <li key={d} className="flex gap-2"><Minus className="mt-0.5 size-4 shrink-0 text-bad" aria-hidden="true" />{d}</li>)}</ul></div>
          </div>
        </div>
        <div className="reveal card self-start bg-paper p-6">
          <div className="flex items-center justify-between"><p className="font-mono text-[0.7rem] uppercase tracking-wider text-faint">Sample exchange</p><SampleTag>Sample data</SampleTag></div>
          <div className="mt-4 space-y-3">
            {C.sampleExchange.map((m) => <div key={m.who} className={m.who === "Candidate" ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-indigo p-4 text-sm text-white" : "max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-white p-4 text-sm"}><p className="mb-1 font-mono text-[0.65rem] uppercase tracking-wider opacity-70">{m.who}</p>{m.text}</div>)}
          </div>
          <Link to="/demo/assistant" className="btn btn-line btn-sm mt-6">Try the demo assistant <ArrowRight className="size-4" aria-hidden="true" /></Link>
        </div>
      </div>
    </Section>
  );
}

export function Safeguards({ full = false }) {
  return (
    <Section id="safeguards">
      <Heading eyebrow="Safeguards" title="Design commitments, not certificates." lede="How we are building Afograde to keep candidates' data safe and mentors in control." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {C.safeguards.map((s) => <div key={s.t} className="reveal card p-6"><h3 className="font-display text-lg font-semibold">{s.t}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p></div>)}
      </div>
      {!full && <Link to="/security" className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo hover:underline">Read the security overview <ArrowRight className="size-4" aria-hidden="true" /></Link>}
    </Section>
  );
}

export function AwsSection({ page = false }) {
  return (
    <Section tone="white" id="aws">
      <Heading as={page ? "h2" : "h2"} eyebrow="Architecture" title="How We Use Amazon Web Services" lede="Mock answers come in through Amazon API Gateway, AWS Lambda scores them and builds plans, Amazon DynamoDB and Amazon S3 store the results, Amazon Bedrock explains them in plain language, and Amazon CloudFront with Amazon Cognito deliver the app to the right people. This is the architecture we are building toward; it is not yet deployed." />
      <ol className="mt-12 grid gap-3 md:grid-cols-5">
        {C.awsStages.map((s, i) => (
          <li key={s.stage} className="reveal relative rounded-2xl border border-line bg-paper p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-indigo">{String(i + 1).padStart(2, "0")} · {s.stage}</p>
            <p className="mt-3 font-display text-lg font-semibold leading-snug">{s.svc}</p>
            <p className="mt-2 text-sm text-muted">{s.job}</p>
            {i < 4 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-white text-gold md:block" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="mt-5 text-sm font-semibold text-gold-ink">{C.awsStatus}</p>
      <ul className="mt-10 grid gap-x-10 gap-y-3 md:grid-cols-2">
        {C.awsServices.map((s) => <li key={s.name} className="reveal text-sm leading-relaxed"><strong>{s.name}:</strong> <span className="text-muted">{s.purpose}</span></li>)}
      </ul>
      {!page && <Link to="/technology" className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo hover:underline">See the full architecture <ArrowRight className="size-4" aria-hidden="true" /></Link>}
    </Section>
  );
}

export function Roadmap() {
  return (
    <Section id="roadmap">
      <Heading eyebrow="Roadmap" title="What exists, and what comes next." />
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {C.roadmap.map((r, i) => (
          <div key={r.col} className={`reveal rounded-2xl border p-6 ${i === 0 ? "border-indigo bg-indigo text-white" : "border-line bg-card"}`}>
            <p className={`font-mono text-xs uppercase tracking-[0.16em] ${i === 0 ? "text-gold" : "text-indigo"}`}>{r.col}</p>
            <ul className="mt-4 space-y-3 text-sm">{r.items.map((it) => <li key={it} className="flex gap-2"><span className={`bubble mt-0.5 !size-3 shrink-0 ${i === 0 ? "on" : "text-line-2"}`} aria-hidden="true" />{it}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-faint">The order is our plan and may change based on what pilots teach us.</p>
    </Section>
  );
}

export function PricingCards() {
  return (
    <>
      <div className="grid gap-5 lg:grid-cols-3">
        {C.pricing.map((p) => (
          <div key={p.id} className={`reveal relative flex flex-col rounded-3xl border p-7 ${p.featured ? "border-indigo bg-white shadow-[0_24px_50px_-28px_rgba(44,42,143,.5)]" : "border-line bg-card"}`}>
            {p.featured && <span className="chip absolute -top-3 left-7 bg-gold text-ink">Recommended</span>}
            <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted">{p.who}</p>
            <p className="mt-6 flex items-baseline gap-1"><span className="font-display text-5xl font-semibold">${p.price}</span><span className="text-sm text-faint">USD</span></p>
            <p className="text-xs text-faint">per candidate per month (proposed billing)</p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-ok" aria-hidden="true" />{f}</li>)}</ul>
            <CTA.Access plan={p.id} label={`Request ${p.name}`} className={`mt-7 ${p.featured ? "" : "!bg-ink hover:!bg-indigo"}`} />
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-faint">Prices in USD, excluding taxes. Billing per candidate per month is our proposed structure and will be confirmed before launch. No plan is on sale yet — requests join the early-access list. Running a centre or school? <Link className="text-indigo underline" to="/contact?plan=cohort">Ask about cohorts</Link>.</p>
    </>
  );
}

export function PricingSection() {
  return (
    <Section tone="white" id="pricing">
      <Heading eyebrow="Pricing" title="Three plans, priced for families and centres." center />
      <div className="mt-12"><PricingCards /></div>
    </Section>
  );
}

export function CompareTable() {
  return (
    <div className="reveal overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full min-w-[560px] text-sm">
        <thead><tr className="bg-paper-2"><th className="th">Feature</th>{C.pricing.map((p) => <th key={p.id} className="th text-center">{p.name}</th>)}</tr></thead>
        <tbody>{C.compareTable.map(([f, ...v]) => <tr key={f}><td className="td font-semibold">{f}</td>{v.map((x, i) => <td key={i} className="td text-center">{x ? <Check className="mx-auto size-4 text-ok" aria-label="Included" /> : <Minus className="mx-auto size-4 text-faint" aria-label="Not included" />}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Heading eyebrow="FAQ" title="Questions buyers ask us." lede="Can't find your answer? Email us." />
        <div className="divide-y divide-line rounded-2xl border border-line bg-card">
          {C.faq.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{f.q}<Plus className="size-4 shrink-0 transition group-open:rotate-45" aria-hidden="true" /></summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Team() {
  return (
    <Section tone="white" id="team">
      <Heading eyebrow="Team" title={`The Team Behind ${business.name}`} />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {team.map((p) => (
          <article key={p.id} className="reveal card flex flex-col gap-5 bg-paper p-6 sm:flex-row">
            {p.photo ? <img src={p.photo} alt={`Portrait of ${p.name}`} width="128" height="128" loading="lazy" className="size-32 shrink-0 rounded-2xl object-cover object-top" />
              : <div className="grid size-32 shrink-0 place-items-center rounded-2xl bg-indigo font-display text-4xl font-semibold text-white" aria-hidden="true">{p.initials}</div>}
            <div>
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
              <p className="font-semibold text-indigo">{p.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.bio}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">{p.owns.map((o) => <li key={o} className="chip bg-white text-muted ring-1 ring-line">{o}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {p.email && <a href={`mailto:${p.email}`} className="inline-flex items-center gap-1.5 font-semibold text-indigo hover:underline"><Mail className="size-4" aria-hidden="true" />{p.email}</a>}
                {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-semibold text-indigo hover:underline"><Linkedin className="size-4" aria-hidden="true" />LinkedIn</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="reveal mt-8 rounded-2xl border border-dashed border-line-2 p-6">
        <h3 className="font-display text-lg font-semibold">Who we'd like to hear from</h3>
        <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <li>• UTME mentors and tutors willing to pilot with a small group</li>
          <li>• Tutorial and CBT centres preparing 2027 candidates</li>
          <li>• Secondary-school teachers and exam coordinators</li>
          <li>• Advisors in Nigerian education and assessment</li>
        </ul>
      </div>
    </Section>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-indigo">
      <div className="wrap flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl">Give every candidate a plan built on their own results.</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn btn-gold btn-lg">Request early access <ArrowRight className="size-4" aria-hidden="true" /></Link>
          <Link to="/demo" className="btn btn-lg border border-white/30 text-white hover:bg-white/10">Explore the live demo</Link>
        </div>
      </div>
    </section>
  );
}
