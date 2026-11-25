import { Page } from "../components/layout/Page.jsx";
import { PageHero, CTA } from "../components/ui/primitives.jsx";
import * as S from "../components/sections/Sections.jsx";

export default function Product() {
  return (
    <Page>
      <PageHero eyebrow="Platform overview" title="Every mock, measured by topic. Every week, a plan." lede="Afograde is UTME preparation software with five connected parts: mocks, scoring, projection, planning and mentor review. It is in development; the demo runs the scoring, projection and planning logic on sample data today."><CTA.Demo /><CTA.Access /></PageHero>
      <S.Features detailed /><S.Comparison /><S.AiSection /><S.ClosingCta />
    </Page>
  );
}
