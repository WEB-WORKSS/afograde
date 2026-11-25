import { Page } from "../components/layout/Page.jsx";
import { PageHero, Section, Heading } from "../components/ui/primitives.jsx";
import { PricingCards, CompareTable, Faq, ClosingCta } from "../components/sections/Sections.jsx";

export default function Pricing() {
  return (
    <Page>
      <PageHero eyebrow="Pricing" title="Simple plans per candidate." lede="Choose the level of mentoring a candidate needs. Plans open to early-access participants first." />
      <Section><PricingCards /></Section>
      <Section tone="white"><Heading eyebrow="Compare plans" title="What each plan includes." /><div className="mt-8"><CompareTable /></div></Section>
      <Faq /><ClosingCta />
    </Page>
  );
}
