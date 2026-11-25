import { PageHero, Section } from "../components/ui/primitives.jsx";
import { business } from "../data/business.js";

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" lede="Last updated 24 November 2026." />
      <Section><div className="prose-legal max-w-3xl">
        <p>These terms apply to your use of {business.domain}, including the interactive demo ("the site"), operated by {business.name}. By using the site you agree to them.</p>
        <h2>The site and the demo</h2>
        <p>The site describes a product that is in development. The demo is a demonstration on fictional sample data. Its scores, projections and plans are illustrations of the method, not predictions of any real candidate's UTME result, and must not be relied on for admission or study decisions. Topic weightings in the demo are sample values, not official figures.</p>
        <h2>Independence</h2>
        <p>{business.name} is not affiliated with, endorsed by or acting for the Joint Admissions and Matriculation Board (JAMB). "UTME" is used only to describe the exam our product helps candidates prepare for.</p>
        <h2>Acceptable use</h2>
        <ul><li>Do not attempt to disrupt, overload or gain unauthorised access to the site.</li><li>Do not submit unlawful, abusive or misleading content through the contact form.</li><li>Do not scrape the site in a way that degrades it for others.</li></ul>
        <h2>Intellectual property</h2>
        <p>The site's content, design, logo, practice questions and code belong to {business.name}. You may view and share links to the site; you may not copy substantial parts of it without permission.</p>
        <h2>Pricing and availability</h2>
        <p>Prices shown are in USD and exclude taxes. No plan is on sale through the site. Any future subscription will be governed by a separate agreement presented before purchase.</p>
        <h2>Disclaimers</h2>
        <p>The site is provided "as is". We work to keep it accurate and available but make no warranty that it will be error-free or uninterrupted, and we do not guarantee any exam result.</p>
        <h2>Limitation of liability</h2>
        <p>To the extent the law allows, {business.name} is not liable for indirect or consequential loss arising from your use of the site. Nothing in these terms limits liability that cannot be limited by law.</p>
        <h2>Changes</h2>
        <p>We may update these terms; the date above shows the latest version.</p>
        <h2>Contact</h2>
        <p><a href={`mailto:${business.email}`}>{business.email}</a></p>
      </div></Section>
    </>
  );
}
