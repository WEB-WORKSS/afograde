import { Page } from "../components/layout/Page.jsx";
import { PageHero, Section, Icon, CTA } from "../components/ui/primitives.jsx";
import { ClosingCta } from "../components/sections/Sections.jsx";
import { segments } from "../data/content.js";

export default function Solutions() {
  return (
    <Page>
      <PageHero eyebrow="Solutions" title="Built around the people who guide UTME candidates." lede="Mentors, tutorial centres, schools and families each need a different view of the same evidence." />
      {segments.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 ? "white" : undefined}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="reveal">
              <span className="grid size-14 place-items-center rounded-2xl bg-gold-soft text-gold-ink"><Icon name={s.icon} className="size-7" /></span>
              <h2 className="h2 mt-5">{s.name}</h2>
              <p className="lede">{s.who}</p>
            </div>
            <dl className="reveal grid gap-5 sm:grid-cols-3">
              {[["The problem", s.problem], ["How they use Afograde", s.use], ["The benefit", s.benefit]].map(([k, v]) => <div key={k} className="card p-5"><dt className="font-mono text-[0.7rem] uppercase tracking-wider text-indigo">{k}</dt><dd className="mt-2 text-sm leading-relaxed">{v}</dd></div>)}
            </dl>
          </div>
          <div className="mt-8 flex flex-wrap gap-3"><CTA.Access className="btn-sm" /><CTA.Demo className="btn-sm" /></div>
        </Section>
      ))}
      <ClosingCta />
    </Page>
  );
}
