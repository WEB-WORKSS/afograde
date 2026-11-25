# Afograde website

The company website for Afograde (https://www.afograde.com): UTME preparation and mentorship software. It is built with Vite, React, Tailwind CSS v4 and Lucide icons. The marketing pages are prerendered to static HTML. The `/demo` page is an interactive demo that runs only in the browser, on fictional sample data.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ — client build + SSR prerender of all marketing routes
npm run preview
npm run assets     # regenerate favicon, OG image, logo, founder photo
```

## Environment
`VITE_LEAD_ENDPOINT`: an HTTPS endpoint that accepts the contact form as POSTed JSON. When it is empty, the form opens a pre-filled email to orevaoghene@afograde.com and says so under the form. Never put secrets in `VITE_*` variables.

- Local test endpoint: run `npm run dev:api`, then `VITE_LEAD_ENDPOINT=http://localhost:8787/lead npm run dev`. If you enter Organisation = `FAIL`, the endpoint returns a 500 so you can see the error state.
- Production handler: `backend/contact-lambda.mjs` runs on AWS Lambda with a Function URL and sends mail through Amazon SES. Set `TO_EMAIL`, `FROM_EMAIL` (an SES-verified sender) and `ALLOWED_ORIGIN`. It is not deployed yet.

## Deploy
**Vercel** (`vercel.json` is included): import the project, add the domains `www.afograde.com` (primary) and `afograde.com`, which redirects to www. HTTPS and HSTS are handled. `/demo/*` is rewritten to the demo shell. Unknown paths serve `404.html` with a 404 status.

**Amazon S3 + CloudFront** (alternative): upload `dist/` to S3 and serve it through CloudFront with an ACM certificate for both hosts. Use a CloudFront Function to redirect the bare domain to www, append `/index.html` to folder paths, and send `/demo/*` to `/demo/index.html`. Set custom error 404 → `/404.html`, and add a response-headers policy (HSTS, nosniff, frame DENY).

Browser support: current Chrome, Edge, Firefox, Safari, plus iOS Safari and Android Chrome.

## Structure
`src/data/business.js` holds the company facts that every page reads. `src/data/content.js` holds the copy. `src/data/demo/` holds the sample dataset. `src/lib/scoring.js` holds the demo logic. `src/pages/demo/` holds the demo screens.
