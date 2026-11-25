import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { SkipLink } from "./components/ui/primitives.jsx";
import { PAGES } from "./routes.jsx";

/** Renders a public route to static HTML for crawlers (scripts/prerender.mjs). */
export function render(path) {
  const Page = PAGES[path];
  return renderToString(<StaticRouter location={path}><SkipLink /><Header /><main id="main"><Page /></main><Footer /></StaticRouter>);
}
