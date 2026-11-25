# Test evidence (24 Nov 2026)

## Build
`npm run build` succeeded. It prerendered 11 marketing routes, plus the demo shell and 404.html. The main JS is 272 kB (86 kB gzip), the demo chunk is 48 kB and the CSS is 41 kB.

## Demo logic (node, sample data)
| Candidate | Expected | Observed |
|---|---|---|
| DEMO-C101 | Projection computed | 295, Needs attention |
| DEMO-C104 (no Physics mock) | Aggregate unavailable, with the reason | "No Physics mock recorded yet." |
| DEMO-C109 (Literature: Prose only) | Unavailable: coverage below 60% | "Only 35% … at least 60% is needed." |
| DEMO-C112 (no mocks) | Unavailable in every subject | Reasons listed for all four subjects |

## Demo in the browser (vite preview, port 4190)
- /demo/candidates/DEMO-C104 loaded directly. The banner, the "Projection unavailable" status and the onboarding hint showed, and there were no console errors.
- Changed weekly hours on DEMO-C101 from 10 to 20, then refreshed. The slider still showed 20, localStorage held `{"DEMO-C101":20}` and the plan read "19 of 20 hours". Saved state survives a refresh: **pass**.
- Not run in this pass: the Reset button, the mock-exam recording flow, the assistant, and the contact-form endpoint success and failure tests against `backend/dev-server.mjs`. Run these before launch.

## Home page
It rendered at 800 px with the hero, the status pill and the "Demo data" visual. The nav wrapped at that width; fixed with whitespace-nowrap (not re-screenshotted).
