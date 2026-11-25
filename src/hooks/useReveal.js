import { useEffect, useRef } from "react";
/** Adds .in to elements with .reveal as they scroll into view. Respects reduced motion via CSS. */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current; if (!root || !("IntersectionObserver" in window)) return;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
  return ref;
}
