import { Page } from "../components/layout/Page.jsx";
import { PageHero, Section, Heading } from "../components/ui/primitives.jsx";
import { Safeguards, ClosingCta } from "../components/sections/Sections.jsx";
import { business } from "../data/business.js";

const roles = [
  ["Candidate", "Takes mocks; sees own results, projection and plan; chooses whether to share with a parent."],
  ["Mentor", "Sees assigned candidates; adjusts plans and targets; writes notes. Every change is logged."],
  ["Centre admin", "Manages mentors and classes within one centre; sees centre-level progress."],
  ["Parent / sponsor", "Read-only summaries, only for candidates who have consented."],
];

export default function Security() {
  return (
    <Page>
      <PageHero eyebrow="Security" title="Safeguards for candidates' data and mentors' decisions." lede="Afograde is in development. This page describes how we are designing the platform — and is clear about what is not built yet. We hold no security certifications." />
      <Safeguards full />
      <Section tone="white">
        <Heading eyebrow="Access roles" title="Who can see and change what." />
        <div className="reveal mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] text-sm"><thead><tr className="bg-paper-2"><th className="th">Role</th><th className="th">Permissions (planned, enforced on the server)</th></tr></thead>
            <tbody>{roles.map(([r, p]) => <tr key={r}><td className="td font-semibold">{r}</td><td className="td text-muted">{p}</td></tr>)}</tbody></table>
        </div>
      </Section>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="reveal card p-6"><h2 className="font-display text-xl font-semibold">Data handling</h2><ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted"><li>• We collect only what scoring and mentoring need: name, contact email, subjects, targets and mock answers.</li><li>• Many candidates are under 18; we will seek parental consent where the law requires it.</li><li>• We do not sell personal data or use it for advertising.</li><li>• Candidates can ask for their data to be exported or deleted.</li></ul></div>
          <div className="reveal card p-6"><h2 className="font-display text-xl font-semibold">What exists today</h2><ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted"><li>• <strong className="text-ink">This website</strong> collects only contact-form messages (see the Privacy Policy).</li><li>• <strong className="text-ink">The demo</strong> runs entirely in your browser on fictional data; nothing you enter is sent to us.</li><li>• <strong className="text-ink">Not built yet:</strong> accounts, the production database, the audit trail and AI explanations.</li></ul></div>
        </div>
        <p className="mt-8 text-sm text-muted">Found a security issue on afograde.com? Email <a className="text-indigo underline" href={`mailto:${business.email}`}>{business.email}</a>.</p>
      </Section>
      <ClosingCta />
    </Page>
  );
}
