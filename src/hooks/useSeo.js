import { useEffect } from "react";
import { metaFor, urlFor } from "../lib/seo.js";

export function useSeo(path) {
  useEffect(() => {
    const m = metaFor(path);
    document.title = m.title;
    const set = (sel, attr, val) => document.head.querySelector(sel)?.setAttribute(attr, val);
    const url = urlFor(path);
    set('meta[name="description"]', "content", m.description);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", m.title);
    set('meta[property="og:description"]', "content", m.description);
    set('meta[name="twitter:title"]', "content", m.title);
    set('meta[name="twitter:description"]', "content", m.description);
    set('meta[name="robots"]', "content", m.noindex ? "noindex, nofollow" : "index, follow");
  }, [path]);
}
