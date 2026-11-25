import { Page } from "../components/layout/Page.jsx";
import * as S from "../components/sections/Sections.jsx";

export default function Home() {
  return (
    <Page>
      <S.Hero /><S.Audiences /><S.Highlights /><S.ProblemSolution /><S.Features /><S.Steps /><S.Segments />
      <S.Comparison /><S.AiSection /><S.Safeguards /><S.AwsSection /><S.Roadmap /><S.PricingSection /><S.Faq /><S.Team /><S.ClosingCta />
    </Page>
  );
}
