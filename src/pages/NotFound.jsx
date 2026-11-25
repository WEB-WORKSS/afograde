import { Link } from "react-router-dom";
import { Mark } from "../components/ui/Logo.jsx";
export default function NotFound() {
  return (
    <section className="wrap grid min-h-[65vh] place-items-center py-24 text-center">
      <div>
        <Mark className="mx-auto size-14" />
        <p className="eyebrow mt-6">Error 404</p>
        <h1 className="h2 mt-3">This page isn't on the syllabus.</h1>
        <p className="lede mx-auto">The page you're looking for doesn't exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3"><Link to="/" className="btn btn-primary">Back to home</Link><Link to="/demo" className="btn btn-line">Open the demo</Link></div>
      </div>
    </section>
  );
}
