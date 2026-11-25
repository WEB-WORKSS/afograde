// Single source of truth for company facts. Every page, the SEO tags and the JSON-LD read from here.
// Only facts supplied by the founders are recorded. Anything unconfirmed is left out (see docs/open-items.md).

export const business = {
  name: "Afograde",
  domain: "afograde.com",
  url: "https://www.afograde.com",
  email: "orevaoghene@afograde.com",
  foundingYear: 2026,
  companyType: "Privately held",
  // Product stage, stated the same way everywhere.
  status: "Building initial product · early access open for the 2027 UTME cohort",
  statusShort: "Early access · 2027 UTME cohort",
  slogan: "Structured UTME preparation, from first mock to 360+.",
  positioning:
    "Afograde is UTME preparation and mentorship software that turns mock-exam results into topic-level progress, a projected score and a weekly study plan, so mentors, tutorial centres and schools can guide each candidate toward 360+.",
  oneLiner: "UTME preparation and mentorship software for mentors, tutorial centres and schools.",
  linkedin: "https://www.linkedin.com/company/afograde",
  prices: { currency: "USD", tiers: [10, 20, 40] },
};

export const team = [
  {
    id: "orevaoghene",
    name: "Orevaoghene Jerry-Ogeme",
    title: "Founder & CEO",
    photo: "/assets/team/orevaoghene.webp",
    linkedin: "https://www.linkedin.com/company/afograde",
    email: "orevaoghene@afograde.com",
    bio: "Civil engineering graduate (B.Eng, University of Ibadan) and graduate member of the Nigerian Society of Engineers. Started Afograde to give UTME candidates the structured, measured preparation that gets results.",
    owns: ["Product direction", "Mentorship programme", "Pilot partnerships"],
  },
  {
    id: "muhammed",
    name: "Muhammed Issa",
    title: "Co-founder",
    initials: "MI",
    bio: "Co-founder of Afograde, building the company and its 2027 UTME early-access programme alongside the founder.",
    owns: ["Company building", "Early-access programme"],
  },
];
