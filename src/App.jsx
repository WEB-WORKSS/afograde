import { Component, lazy, Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { SkipLink } from "./components/ui/primitives.jsx";
import { useSeo } from "./hooks/useSeo.js";
import NotFound from "./pages/NotFound.jsx";
import { PAGES } from "./routes.jsx";

const Demo = lazy(() => import("./pages/demo/DemoApp.jsx"));

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (<div className="wrap py-32 text-center"><h1 className="h2">Something went wrong.</h1><p className="lede mx-auto">Please reload the page. If it keeps happening, email orevaoghene@afograde.com.</p><button className="btn btn-primary mt-6" onClick={() => location.reload()}>Reload</button></div>);
  }
}

function Site() { return (<><SkipLink /><Header /><main id="main"><Outlet /></main><Footer /></>); }

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useSeo(pathname);
  useEffect(() => {
    if (hash) { const t = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 60); return () => clearTimeout(t); }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const Loading = () => <div className="grid min-h-[70vh] place-items-center text-faint" role="status">Loading demo…</div>;

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollManager />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/demo/*" element={<Demo />} />
          <Route element={<Site />}>
            {Object.entries(PAGES).map(([p, Page]) => <Route key={p} path={p} element={<Page />} />)}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
