import { useEffect, useRef, useState, lazy, Suspense } from "react";
import ThunderLoader    from "./components/ThunderLoader";

import Navbar           from "./components/Navbar";
import Hero             from "./components/Hero";
import About            from "./components/About";

/* Below-the-fold sections are code-split so the initial bundle only
   contains what's needed for the first paint (Navbar + Hero + About). */
const Services         = lazy(() => import("./components/Services"));
const ProjectImageTabs = lazy(() => import("./components/ProjectImageTabs"));
const Skills            = lazy(() => import("./components/Skills"));
const Journey            = lazy(() => import("./components/Journey"));
const CTABanner          = lazy(() => import("./components/CTABanner"));
const Contact            = lazy(() => import("./components/Contact"));
const Footer             = lazy(() => import("./components/Footer"));

/* ── Custom cursor ── */
const Cursor = () => {
  const ring = useRef(null);
  const dot  = useRef(null);
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    let mx=-200,my=-200,rx=-200,ry=-200,raf;
    const mv = e => {
      mx=e.clientX; my=e.clientY;
      if(dot.current){ dot.current.style.left=mx+"px"; dot.current.style.top=my+"px"; }
    };
    const tk = () => {
      rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
      if(ring.current){ ring.current.style.left=rx+"px"; ring.current.style.top=ry+"px"; }
      raf=requestAnimationFrame(tk);
    };
    window.addEventListener("mousemove",mv,{passive:true});
    raf=requestAnimationFrame(tk);
    return()=>{ window.removeEventListener("mousemove",mv); cancelAnimationFrame(raf); };
  },[]);
  return(<><div ref={ring} className="tc-ring"/><div ref={dot} className="tc-dot"/></>);
};

/* ── Section divider ── */
const Div = () => (
  <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(34,211,238,.22),rgba(99,102,241,.15),transparent)",position:"relative"}}>
    <span style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:5,height:5,borderRadius:"50%",background:"#22d3ee",boxShadow:"0 0 8px #22d3ee,0 0 18px rgba(34,211,238,.3)"}}/>
  </div>
);

/* ── Main App ── */
export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) return <ThunderLoader onDone={() => setLoaded(true)} />;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02030a] text-white">
      <Cursor />
      <Navbar />
      <main>
        <Hero />         <Div />
        <About />        <Div />
        <Suspense fallback={null}>
          <Services />     <Div />
          <ProjectImageTabs /> <Div />
          <Skills />       <Div />
          <Journey />      <Div />
          <CTABanner />    <Div />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
