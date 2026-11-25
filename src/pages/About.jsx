import { Page } from "../components/layout/Page.jsx";
import { PageHero, Section, Heading } from "../components/ui/primitives.jsx";
import { Team, Roadmap, ClosingCta } from "../components/sections/Sections.jsx";
import { business } from "../data/business.js";

export default function About() {
  return (
    <Page>
      <PageHero eyebrow="About" title="We're building the structure UTME preparation is missing." lede={`${business.name} was founded in ${business.foundingYear}. ${business.positioning}`} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Heading eyebrow="Our story" title="Hard work deserves a clear direction." />
          <div className="reveal space-y-4 leading-relaxed text-muted">
            <p>Every year, around two million candidates sit the UTME. Most prepare by working through past questions and sitting mocks, but a mock usually produces one number — not an answer to the question that matters: <em>what should I study next?</em></p>
            <p>Afograde started as a mentorship programme aimed at helping 2027 UTME candidates reach 360+. We are turning that approach into software: measure every topic, plan the week from the evidence, and keep a mentor in the loop.</p>
            <p><strong className="text-ink">Mission:</strong> give every UTME candidate, and the people guiding them, a clear, honest picture of where marks are being lost and a plan to win them back.</p>
            <p><strong className="text-ink">Where we are:</strong> {business.status}. Company: {business.companyType.toLowerCase()}, founded {business.foundingYear}.</p>
          </div>
        </div>
      </Section>
      <Team /><Roadmap /><ClosingCta />
    </Page>
  );
}
