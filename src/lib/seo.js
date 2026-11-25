import { business } from "../data/business.js";

const n = business.name;
export const routeMeta = {
  "/": { title: `${n} | UTME preparation and mentorship software`, description: "Afograde turns UTME mock-exam results into topic-level progress, a projected score and a weekly study plan for mentors, tutorial centres and schools. Early access open for the 2027 UTME cohort." },
  "/product": { title: `Platform overview | ${n}`, description: "CBT-style mocks, topic-level scoring, projected UTME aggregate, weekly study plans and a mentor cohort view — what each Afograde feature does and its status." },
  "/how-it-works": { title: `How it works | ${n}`, description: "Practise, measure, plan, review, repeat: how Afograde turns each UTME mock into a weekly study plan that a mentor approves." },
  "/solutions": { title: `Solutions for mentors, centres, schools and families | ${n}`, description: "How UTME mentors, tutorial centres, secondary schools and parents use Afograde to guide candidates toward their target score." },
  "/technology": { title: `How we use Amazon Web Services | ${n}`, description: "Afograde's proposed AWS architecture: Amazon CloudFront, Cognito, API Gateway, Lambda, DynamoDB, S3, Bedrock and SES — what each does and what is built." },
  "/security": { title: `Security and safeguards | ${n}`, description: "How Afograde is designed to protect candidate data, many of whom are minors, keep mentors in control and keep every figure traceable." },
  "/pricing": { title: `Pricing | ${n}`, description: "Afograde plans: Essential $10, Mentored $20 and 360+ Intensive $40 (USD, excluding taxes)." },
  "/about": { title: `About and team | ${n}`, description: "Afograde was founded in 2026 to give UTME candidates structured, measured preparation. Meet the team behind Afograde." },
  "/contact": { title: `Request early access | ${n}`, description: "Request early access to Afograde for the 2027 UTME cohort, ask about pricing or a pilot for your centre or school." },
  "/demo": { title: `Live demo | ${n}`, description: "Try the Afograde mentor workspace on fictional sample candidates. Runs in your browser; nothing is sent to a server." },
  "/privacy": { title: `Privacy Policy | ${n}`, description: "What afograde.com collects, why, who processes it, how long it is kept and your rights." },
  "/terms": { title: `Terms of Service | ${n}`, description: "The terms that apply when you use afograde.com and the Afograde demo." },
};

export const publicRoutes = ["/", "/product", "/how-it-works", "/solutions", "/technology", "/security", "/pricing", "/about", "/contact", "/privacy", "/terms"];

export function metaFor(path) {
  if (path.startsWith("/demo")) return routeMeta["/demo"];
  return routeMeta[path] || { title: `Page not found | ${n}`, description: "This page doesn't exist.", noindex: true };
}

export const urlFor = (path) => `${business.url}${path === "/" ? "/" : path}`;

export function headTags(path) {
  const m = metaFor(path);
  const url = urlFor(path);
  const e = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return [
    `<title>${e(m.title)}</title>`,
    `<meta name="description" content="${e(m.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:title" content="${e(m.title)}">`,
    `<meta property="og:description" content="${e(m.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta name="twitter:title" content="${e(m.title)}">`,
    `<meta name="twitter:description" content="${e(m.description)}">`,
    `<meta name="robots" content="${m.noindex ? "noindex, nofollow" : "index, follow"}">`,
  ].join("\n");
}
