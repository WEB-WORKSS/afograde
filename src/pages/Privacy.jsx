import { PageHero, Section } from "../components/ui/primitives.jsx";
import { business } from "../data/business.js";
import { LEAD_ENDPOINT } from "../lib/lead.js";

export default function Privacy() {
  const e = <a href={`mailto:${business.email}`}>{business.email}</a>;
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lede="Last updated 24 November 2026." />
      <Section><div className="prose-legal max-w-3xl">
        <p>This policy explains what {business.name} ("we", "us") collects through {business.domain} and the {business.name} demo, why, and your choices. {business.name} is in development; this policy covers the website only. A separate policy will apply to the product before anyone can use it with real data.</p>
        <h2>What we collect</h2>
        <ul>
          <li><strong>Contact requests.</strong> When you use the contact form we receive your name, email, organisation, role, number of candidates, use case, plan of interest and message. {LEAD_ENDPOINT ? "The form sends these to our form endpoint." : "The form opens your own email app with these details; we receive them only if you send that email."}</li>
          <li><strong>Emails you send us</strong>, including their content and your address.</li>
          <li><strong>Technical logs.</strong> Our hosting provider records standard server logs (IP address, browser, pages requested, time) for security and reliability.</li>
        </ul>
        <p>We do not use advertising cookies or third-party analytics on this site. The demo stores your demo changes in your own browser's local storage; that data never leaves your device, and "Reset demo data" deletes it. Fonts are loaded from Google Fonts, which receives your IP address to deliver them.</p>
        <h2>Why we use it</h2>
        <ul><li>To reply to your request and discuss early access or a pilot.</li><li>To keep the website secure and working.</li></ul>
        <p>We do not sell personal data and do not use it for advertising.</p>
        <h2>Who processes it</h2>
        <p>Our email provider, our website hosting provider{LEAD_ENDPOINT ? " and our form-processing service" : ""} process data on our behalf. We share data with no one else unless the law requires it.</p>
        <h2>How long we keep it</h2>
        <p>Contact requests are kept for up to 24 months after our last exchange, then deleted, unless you become a customer or ask us to delete them sooner. Server logs are kept for no longer than our hosting provider's standard retention.</p>
        <h2>Children</h2>
        <p>Many UTME candidates are under 18. If you are under 18, please ask a parent or guardian before sending us your details. We will not knowingly keep a minor's contact request without a parent or guardian's involvement where the law requires it.</p>
        <h2>Your rights</h2>
        <p>You can ask to see, correct or delete the personal data we hold about you, or object to how we use it, by emailing {e}. Depending on where you live, including under Nigeria's Data Protection Act 2023, you may also complain to your data protection authority.</p>
        <h2>Contact</h2>
        <p>{business.name} · {e}</p>
      </div></Section>
    </>
  );
}
