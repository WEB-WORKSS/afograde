# AWS Activate readiness: afograde.com

| Check | Status |
|---|---|
| Corporate site that names the company, what it does, who runs it and how to reach it | Pass |
| Contact email on the same domain (orevaoghene@afograde.com) | Pass |
| HTTPS, www as the main host, bare domain redirects, HSTS | Needs founder action: deploy with vercel.json, or the CloudFront setup in the README |
| Multi-page site: product, how-it-works, solutions, technology, security, pricing, about/team, contact, privacy, terms, demo, 404 | Pass (each page loads at its own URL; the build prerenders them) |
| robots.txt, sitemap.xml, Organization JSON-LD, OG image, favicon set | Pass |
| No placeholders or lorem ipsum, working mobile layout | Pass (spot-checked) |
| Working contact form | Pass with the email fallback. To send through an endpoint, set VITE_LEAD_ENDPOINT |
| Named founders with titles and bios | Pass. Founder & CEO; Co-founder (title to confirm) |
| Stage stated honestly; AWS architecture labelled proposed | Pass |
| AWS section and page naming 8 services, each with its job | Pass |
| Interactive demo in the main nav | Pass |
| Sourced industry figures, comparison, roadmap, FAQ, pricing | Pass |
| Site live on the domain before applying | Needs founder action. The domain currently shows only a holding page |

## Founder-side checklist
- Use orevaoghene@afograde.com (not Gmail) for the AWS root user, the AWS Builder ID and the Activate application.
- Upgrade the AWS account to a paid plan before applying.
- Use one AWS account per startup and submit one application at a time. Applications cannot be edited after submission.
- Enter https://www.afograde.com, the domain root, as the website.
- Keep the name (Afograde), the founders, the founding year (2026) and the description identical in the application, on LinkedIn and on the site.
- No website guarantees approval. AWS also runs its own internal checks.
