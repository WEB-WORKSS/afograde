import { useReveal } from "../../hooks/useReveal.js";
export function Page({ children }) { const ref = useReveal(); return <div ref={ref}>{children}</div>; }
