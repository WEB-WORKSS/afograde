import { Page } from "../components/layout/Page.jsx";
import { PageHero, Section, Heading, CTA, SampleTag } from "../components/ui/primitives.jsx";
import * as S from "../components/sections/Sections.jsx";
import { heroSummary } from "../components/sections/Visuals.jsx";
import { COVERAGE_MIN } from "../data/demo/subjects.js";

export default function HowItWorks() {
  const phy = heroSummary.subjects.find((s) => s.subject === "PHY");
  return (
    <Page>
      <PageHero eyebrow="How it works" title="A weekly loop from mock exam to mentor-approved plan." lede="Five steps, repeated every week until exam day. Here is what happens at each one and how the numbers are calculated."><CTA.Demo label="Run the loop in the demo" /></PageHero>
      <S.Steps detailed />
      <Section tone="white">
        <Heading eyebrow="The calculation" title="Transparent rules, worked through on one subject." lede="This is the exact method the demo uses. Topic weights are sample values, not official JAMB weightings." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ol className="reveal space-y-5 text-sm leading-relaxed">
            <li><strong>1. Topic accuracy.</strong> For each topic we take the candidate's last three mocks and weight them 1 : 2 : 3, oldest to newest, so recent progress counts more.</li>
            <li><strong>2. Coverage check.</strong> If the tested topics add up to less than {COVERAGE_MIN * 100}% of the subject's weighting, the subject projection is shown as <em>unavailable</em>, with the reason. We never guess.</li>
            <li><strong>3. Subject projection.</strong> Sum of (topic accuracy × topic weight) × 100. Any untested topic in a well-covered subject is scored at the subject average and flagged as estimated.</li>
            <li><strong>4. Aggregate.</strong> The four subject projections add up to a score out of 400, compared against the candidate's target.</li>
            <li><strong>5. Plan.</strong> Weekly hours are shared across topics by weight × (1 − accuracy). Untested topics get a 30-minute diagnostic quiz first.</li>
          </ol>
          <div className="reveal card overflow-hidden">
            <div className="flex items-center justify-between bg-paper-2 px-4 py-3"><p className="text-sm font-semibold">{phy.name} · {heroSummary.candidate.name}</p><SampleTag>Sample data</SampleTag></div>
            <table className="w-full text-sm"><thead><tr><th className="th">Topic</th><th className="th text-right">Weight</th><th className="th text-right">Accuracy</th><th className="th text-right">Marks</th></tr></thead>
              <tbody>{phy.topics.map((t) => <tr key={t.key}><td className="td">{t.label}</td><td className="td text-right font-mono">{Math.round(t.weight * 100)}%</td><td className="td text-right font-mono">{Math.round(t.accUsed * 100)}%</td><td className="td text-right font-mono">{t.marks.toFixed(1)}</td></tr>)}
                <tr className="bg-indigo-soft/60 font-semibold"><td className="td" colSpan={3}>Projected {phy.name}</td><td className="td text-right font-mono">{phy.score}/100</td></tr></tbody></table>
          </div>
        </div>
      </Section>
      <S.ClosingCta />
    </Page>
  );
}
