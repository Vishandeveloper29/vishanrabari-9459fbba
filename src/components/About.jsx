import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import ThunderBg from "./backgrounds/ThunderBg";
import {
  BriefcaseBusiness, Code2, Layers3, MoveUpRight,
  Sparkles, Zap, ArrowRight, Globe, Star, Terminal,
} from "lucide-react";
import { BtnPrimary, BtnMagnetic } from "./ui/PortfolioButtons";

/* ════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ════════════════════════════════════════════════════════════════════════ */
const T = {
  display: "'Bebas Neue', 'Arial Narrow', sans-serif",
  heading: "'Syne', sans-serif",
  body:    "'DM Sans', sans-serif",
  mono:    "'JetBrains Mono', monospace",
  ease:    "cubic-bezier(0.16, 1, 0.3, 1)",
};

/* ════════════════════════════════════════════════════════════════════════
   REACT-BITS SILK BACKGROUND
   Iridescent silk flow-field — animated vector field + curl noise
   ════════════════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════════════════
   STATS DATA
   ════════════════════════════════════════════════════════════════════════ */
const STATS = [
  { value: "2+",  label: "Years",    sub: "Experience" },
  { value: "20+", label: "Projects", sub: "Delivered"  },
  { value: "100%",label: "Focus",    sub: "On Quality" },
  { value: "∞",   label: "Passion",  sub: "Always"     },
];

const SKILLS = [
  { name: "React",          level: 92, color: "0,212,255"   },
  { name: "Tailwind CSS",   level: 95, color: "56,189,248"  },
  { name: "JavaScript",     level: 88, color: "251,191,36"  },
  { name: "UI Design",      level: 90, color: "167,139,250" },
  { name: "Vite",           level: 85, color: "99,102,241"  },
  { name: "Node.js",        level: 72, color: "74,222,128"  },
];

const TICKER_ITEMS = [
  "React", "Tailwind CSS", "JavaScript", "Vite", "Node.js",
  "UI Animation", "Responsive Design", "Glassmorphism", "REST APIs", "Git",
  "Figma", "CSS Variables", "React Hooks", "Web Performance",
];

const SERVICES = [
  { icon: Code2,            title: "Frontend Dev",  desc: "React · Tailwind · Vite · Responsive",    c: "0,212,255"   },
  { icon: Layers3,          title: "UI Craft",      desc: "Glass · Motion · Hover · Premium UX",     c: "167,139,250" },
  { icon: BriefcaseBusiness,title: "Management",   desc: "Client work · Projects · Delivery",        c: "251,191,36"  },
];

/* ════════════════════════════════════════════════════════════════════════
   TICKER ROW
   ════════════════════════════════════════════════════════════════════════ */
const TickerRow = memo(({ items, reverse = false, speed = 38 }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 10, whiteSpace: "nowrap", animation: `ab-ticker-${reverse ? "rev" : "fwd"} ${speed}s linear infinite` }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0,
            padding: "7px 18px", borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            fontFamily: T.mono, fontSize: 10, fontWeight: 700,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(120,80,255,0.7)", flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
});

/* ════════════════════════════════════════════════════════════════════════
   COUNT-UP HOOK
   ════════════════════════════════════════════════════════════════════════ */
const useCountUp = (target) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const num = parseFloat(target);
      if (isNaN(num)) { setCount(target); return; }
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1400, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(ease * num));
        if (p < 1) requestAnimationFrame(tick); else setCount(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return [count, ref];
};

/* ════════════════════════════════════════════════════════════════════════
   STAT CARD
   ════════════════════════════════════════════════════════════════════════ */
const StatCard = ({ s, index }) => {
  const [val, ref] = useCountUp(s.value);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", overflow: "hidden",
        borderRadius: 20, padding: "22px 18px",
        border: hov ? "1px solid rgba(120,80,255,0.45)" : "1px solid rgba(255,255,255,0.07)",
        background: hov ? "rgba(80,40,200,0.1)" : "rgba(255,255,255,0.025)",
        backdropFilter: "blur(24px)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: `all 0.4s ${T.ease}`,
        animationDelay: `${index * 0.1}s`,
        textAlign: "center",
      }}
    >
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20,
        background: hov ? "radial-gradient(circle at 50% 0%, rgba(120,80,255,0.18), transparent 70%)" : "none",
        transition: "all 0.4s ease",
        pointerEvents: "none",
      }} />
      <div style={{
        fontFamily: T.display, fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1,
        color: hov ? "#fff" : "rgba(255,255,255,0.9)",
        letterSpacing: "0.04em",
        textShadow: hov ? "0 0 32px rgba(120,80,255,0.7)" : "none",
        transition: "all 0.4s ease",
      }}>
        {val}
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 6 }}>
        {s.label}
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   SKILL BAR
   ════════════════════════════════════════════════════════════════════════ */
const SkillBar = ({ sk, index, animate }) => (
  <div style={{ animationDelay: `${index * 0.08}s` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
      <span style={{ fontFamily: T.mono, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)" }}>
        {sk.name}
      </span>
      <span style={{ fontFamily: T.mono, fontSize: 9, color: `rgba(${sk.color},0.7)`, letterSpacing: "0.15em" }}>
        {sk.level}%
      </span>
    </div>
    <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 99,
        background: `linear-gradient(90deg, rgba(${sk.color},0.9), rgba(${sk.color},0.5))`,
        width: animate ? `${sk.level}%` : "0%",
        transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
        boxShadow: `0 0 8px rgba(${sk.color},0.5)`,
      }} />
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════════════
   PROFILE CARD — 3D tilt
   ════════════════════════════════════════════════════════════════════════ */
const ProfileCard = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ x: y * -14, y: x * 14, scale: 1.025 });
  }, []);
  const onLeave = useCallback(() => setTilt({ x: 0, y: 0, scale: 1 }), []);

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setHov(false); }}
      onMouseEnter={() => setHov(true)}
      style={{ position: "relative", cursor: "default" }}
    >
      {/* Outer glow ring */}
      <div style={{
        position: "absolute", inset: -20,
        borderRadius: 999,
        background: "radial-gradient(ellipse at center, rgba(80,40,200,0.18) 0%, transparent 70%)",
        animation: "ab-glow 3.5s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Spinning decorative rings */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 520, height: 520,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        border: "1px solid rgba(120,80,255,0.07)",
        animation: "ab-spin 16s linear infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        width: 460, height: 460,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        border: "1px dashed rgba(56,189,248,0.06)",
        animation: "ab-spin 24s linear infinite reverse",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
        transition: "transform 180ms ease",
        transformStyle: "preserve-3d",
      }}>
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 36,
          border: "1px solid rgba(120,80,255,0.28)",
          background: "rgba(6,4,28,0.88)",
          backdropFilter: "blur(40px)",
          boxShadow: hov
            ? "0 40px 120px rgba(80,40,200,0.45), 0 0 0 1px rgba(120,80,255,0.2)"
            : "0 24px 80px rgba(0,0,0,0.6)",
          transition: `box-shadow 0.5s ${T.ease}`,
        }}>
          {/* Top shimmer */}
          <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: "linear-gradient(90deg,transparent,rgba(120,80,255,0.7) 40%,rgba(56,189,248,0.5) 60%,transparent)", pointerEvents: "none" }} />

          {/* Corner glows */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(80,40,200,0.22)", filter: "blur(50px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(20,80,180,0.18)", filter: "blur(50px)", pointerEvents: "none" }} />

          {/* Top badges */}
          <div style={{ position: "absolute", top: 18, left: 18, zIndex: 20, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(20px)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.9)", display: "inline-block" }} />
            <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>Open to Work</span>
          </div>

          <a href="https://ayiksolution.vercel.app/" target="_blank" rel="noreferrer" style={{
            position: "absolute", top: 18, right: 18, zIndex: 20, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999,
            border: "1px solid rgba(120,80,255,0.3)", background: "rgba(80,40,200,0.15)",
            backdropFilter: "blur(20px)", transition: `all 0.3s ${T.ease}`,
          }}>
            <Zap size={11} style={{ color: "#a78bfa" }} />
            <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#a78bfa" }}>Ayik</span>
          </a>

          {/* Image */}
          <div style={{ position: "relative", height: "clamp(240px,45vw,390px)", overflow: "hidden" }}>
            <img
              src="/profile.png"
              alt="Vishan Rabari"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: hov ? "grayscale(0%) brightness(1.05)" : "grayscale(20%) brightness(0.9)",
                transform: hov ? "scale(1.04)" : "scale(1.1)",
                transition: `all 0.6s ${T.ease}`,
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,4,28,1) 0%, rgba(6,4,28,0.3) 40%, transparent 100%)" }} />

            {/* Floating skill chips on the image */}
            <div style={{ position: "absolute", bottom: 20, left: 18, right: 18, display: "flex", gap: 7, flexWrap: "wrap" }}>
              {["React", "Tailwind", "UI/UX"].map((s, i) => (
                <span key={s} style={{
                  padding: "4px 10px", borderRadius: 999, backdropFilter: "blur(16px)",
                  border: "1px solid rgba(120,80,255,0.35)",
                  background: "rgba(80,40,200,0.18)",
                  fontFamily: T.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em",
                  color: "rgba(200,180,255,0.9)", textTransform: "uppercase",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: "22px 24px 26px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <p style={{ fontFamily: T.display, fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 0.9, letterSpacing: "0.04em", color: "#fff", margin: 0 }}>
                  VISHAN<br />RABARI
                </p>
              </div>
              <a
                href="https://ayiksolution.vercel.app/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "9px 16px", borderRadius: 12,
                  border: "1px solid rgba(120,80,255,0.3)",
                  background: "rgba(80,40,200,0.12)",
                  textDecoration: "none", transition: `all 0.3s ${T.ease}`,
                }}
              >
                <BriefcaseBusiness size={13} style={{ color: "#a78bfa" }} />
                <span style={{ fontFamily: T.mono, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#a78bfa" }}>Ayik&nbsp;Solution</span>
              </a>
            </div>

            <p style={{ fontFamily: T.body, fontSize: 12.5, lineHeight: 1.8, color: "rgba(255,255,255,0.42)", margin: "0 0 16px" }}>
              Frontend developer · UI craftsman. Building responsive, premium websites with smooth animations and glass-tier design.
            </p>

            {/* CTA in card */}
            <a
              href="https://ayiksolution.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px", borderRadius: 14,
                border: "1px solid rgba(120,80,255,0.25)",
                background: "rgba(80,40,200,0.09)",
                textDecoration: "none",
                fontFamily: T.mono, fontSize: 10.5, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(200,180,255,0.8)",
                transition: `all 0.3s ${T.ease}`,
              }}
            >
              Visit Ayik Solution
              <MoveUpRight size={13} />
            </a>
          </div>

          {/* Bottom accent */}
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 160, height: 2, borderRadius: 99, background: "linear-gradient(90deg, transparent, rgba(120,80,255,0.9), rgba(56,189,248,0.7), transparent)", filter: "blur(1px)" }} />
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════
   MAIN ABOUT SECTION
   ════════════════════════════════════════════════════════════════════════ */
export default function About() {
  const [activeTab, setActiveTab]   = useState("story");
  const [skillAnim, setSkillAnim]   = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillAnim(true); }, { threshold: 0.2 });
    if (skillRef.current) obs.observe(skillRef.current);
    return () => obs.disconnect();
  }, []);

  const TABS = {
    story: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <p style={{ fontFamily: T.body, fontSize: 14.5, lineHeight: 1.9, color: "rgba(255,255,255,0.65)", margin: 0 }}>
          My name is <strong style={{ color: "#fff", fontWeight: 700 }}>Vishan Rabari</strong>. I'm a frontend-focused developer and{" "}
          <a href="https://ayiksolution.vercel.app/" target="_blank" rel="noreferrer" style={{ color: "#a78bfa", textDecoration: "none", fontWeight: 600, borderBottom: "1px solid rgba(167,139,250,0.35)" }}>Manager at Ayik Solution</a>.
          I build responsive, attractive, user-friendly websites with smooth animations and premium UI design.
        </p>
        <p style={{ fontFamily: T.body, fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,0.38)", margin: 0 }}>
          I focus on clean layouts, glass effects, hover animations, responsive sections and high-quality React components. My goal is to make every website look professional, modern and easy to use.
        </p>
      </div>
    ),
    skills: (
      <div ref={skillRef} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {SKILLS.map((sk, i) => <SkillBar key={sk.name} sk={sk} index={i} animate={skillAnim} />)}
      </div>
    ),
    work: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { role: "Manager & Developer", company: "Ayik Solution",    period: "2024 – Present", active: true  },
          { role: "Freelance Frontend Dev", company: "Self-employed", period: "2023 – 2024",    active: false },
        ].map((job) => (
          <div key={job.company} style={{
            display: "flex", alignItems: "flex-start", gap: 14,
            padding: "16px 18px", borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
          }}>
            <div style={{
              marginTop: 5, width: 10, height: 10, flexShrink: 0, borderRadius: "50%",
              background: job.active ? "#4ade80" : "rgba(255,255,255,0.18)",
              boxShadow: job.active ? "0 0 10px rgba(74,222,128,0.8)" : "none",
            }} />
            <div>
              <p style={{ fontFamily: T.body, fontSize: 13.5, fontWeight: 700, color: "#fff", margin: 0 }}>{job.role}</p>
              <p style={{ fontFamily: T.mono, fontSize: 10, color: "#a78bfa", margin: "3px 0", letterSpacing: "0.12em" }}>{job.company}</p>
              <p style={{ fontFamily: T.mono, fontSize: 9.5, color: "rgba(255,255,255,0.28)", margin: 0, letterSpacing: "0.1em" }}>{job.period}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <section id="about" style={{ position: "relative", overflow: "hidden", background: "#04031a", color: "#fff", padding: "clamp(70px,10vw,100px) clamp(16px,4vw,40px) clamp(60px,8vw,80px)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

        #about *, #about *::before, #about *::after { box-sizing: border-box; }

        @keyframes ab-ticker-fwd { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ab-ticker-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        @keyframes ab-glow       { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
        @keyframes ab-spin       { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes ab-reveal     { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ab-pulse-dot  { 0%,100%{box-shadow:0 0 8px rgba(120,80,255,0.6)} 50%{box-shadow:0 0 24px rgba(120,80,255,1)} }
        @keyframes ab-float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ab-line-grow  { from{width:0;opacity:0} to{width:80px;opacity:1} }

        #about .ab-enter { animation: ab-reveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* ── Layer 0: base dark ── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(30,12,80,0.9) 0%, #04031a 55%)" }} />

      {/* ── Layer 1: Silk canvas ── */}
      <ThunderBg variant="purple" opacity={0.85} />

      {/* ── Layer 2: Subtle grid ── */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* ── Layer 3: Vignette ── */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(4,3,26,0.75) 100%)", pointerEvents: "none" }} />

      {/* ── CONTENT ── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto" }}>

        {/* ── EYEBROW ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,70px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
            padding: "8px 20px", borderRadius: 999,
            border: "1px solid rgba(120,80,255,0.3)",
            background: "rgba(80,40,200,0.1)",
            backdropFilter: "blur(20px)",
          }}>
            <Sparkles size={12} style={{ color: "#a78bfa" }} />
            <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(167,139,250,0.85)" }}>
              Who I Am
            </span>
          </div>

          {/* Massive headline */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <h2 style={{
              fontFamily: T.display,
              fontSize: "clamp(4.5rem, 12vw, 11rem)",
              fontWeight: 400,
              lineHeight: 0.88,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: "#fff",
              margin: 0,
            }}>
              BUILDING<br />
              <span style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 30%, #38bdf8 55%, #818cf8 75%, #c084fc 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "ab-ticker-fwd 6s ease infinite",
              }}>
                PREMIUM
              </span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.12)", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                DIGITAL
              </span>
            </h2>

            {/* Glitch layer */}
            <h2 aria-hidden style={{
              position: "absolute", inset: 0,
              fontFamily: T.display,
              fontSize: "clamp(4.5rem, 12vw, 11rem)",
              lineHeight: 0.88, letterSpacing: "0.03em", textTransform: "uppercase",
              color: "rgba(120,80,255,0.08)",
              clipPath: "polygon(0 48%, 100% 46%, 100% 52%, 0 54%)",
              transform: "translateX(-4px)",
              margin: 0, pointerEvents: "none",
            }}>BUILDING PREMIUM DIGITAL</h2>
          </div>

          <p style={{ fontFamily: T.body, fontSize: 14.5, lineHeight: 1.75, color: "rgba(255,255,255,0.38)", maxWidth: 480, margin: "24px auto 0" }}>
            Frontend developer, UI craftsman, and manager — turning bold ideas into polished digital products.
          </p>

          {/* Decorative divider */}
          <div style={{ margin: "28px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ height: 1, width: 80, background: "linear-gradient(90deg, transparent, rgba(120,80,255,0.5))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 12px rgba(124,58,237,0.8)", animation: "ab-pulse-dot 2.5s ease infinite" }} />
            <div style={{ height: 1, width: 80, background: "linear-gradient(90deg, rgba(120,80,255,0.5), transparent)" }} />
          </div>
        </div>

        {/* ── STAT STRIP ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(8px,1.5vw,12px)", marginBottom: "clamp(36px,5vw,64px)" }} className="about-stat-strip">
          {STATS.map((s, i) => <StatCard key={s.label} s={s} index={i} />)}
        </div>

        {/* ── MAIN 2-COL ── */}
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "1fr" }} className="about-grid">
          <style>{`
            @media (min-width: 768px) {
              .about-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (min-width: 1024px) {
              .about-grid { grid-template-columns: 1fr 420px !important; }
            }
            @media (max-width: 480px) {
              .about-stat-strip { grid-template-columns: repeat(2,1fr) !important; }
              .about-stat-grid  { grid-template-columns: repeat(2,1fr) !important; }
              .about-svc-grid   { grid-template-columns: 1fr !important; }
            }
            @media (min-width: 481px) and (max-width: 767px) {
              .about-stat-strip { grid-template-columns: repeat(4,1fr) !important; }
              .about-svc-grid   { grid-template-columns: repeat(2,1fr) !important; }
            }
          `}</style>

          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* TAB PANEL */}
            <div style={{
              overflow: "hidden", borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.022)",
              backdropFilter: "blur(32px)",
            }}>
              {/* Tab bar */}
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { id: "story",  label: "My Story"   },
                  { id: "skills", label: "Skills"      },
                  { id: "work",   label: "Experience"  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1, padding: "16px 8px", border: "none", cursor: "pointer",
                      background: "none",
                      fontFamily: T.mono, fontSize: 9.5, fontWeight: 700,
                      letterSpacing: "0.28em", textTransform: "uppercase",
                      color: activeTab === tab.id ? "#a78bfa" : "rgba(255,255,255,0.28)",
                      borderBottom: activeTab === tab.id ? "2px solid #7c3aed" : "2px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ padding: "24px 26px" }}>{TABS[activeTab]}</div>
            </div>

            {/* SERVICE CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="about-svc-grid">
              {SERVICES.map((svc) => {
                const [hov, setHov] = useState(false);
                return (
                  <div
                    key={svc.title}
                    onMouseEnter={() => setHov(true)}
                    onMouseLeave={() => setHov(false)}
                    style={{
                      position: "relative", overflow: "hidden",
                      padding: "20px 18px", borderRadius: 22,
                      border: hov ? `1px solid rgba(${svc.c},0.4)` : "1px solid rgba(255,255,255,0.07)",
                      background: hov ? `rgba(${svc.c},0.07)` : "rgba(255,255,255,0.025)",
                      backdropFilter: "blur(20px)",
                      transform: hov ? "translateY(-5px)" : "translateY(0)",
                      transition: `all 0.4s ${T.ease}`,
                    }}
                  >
                    <div style={{
                      position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%",
                      background: `rgba(${svc.c},0.1)`, filter: "blur(30px)", pointerEvents: "none",
                      opacity: hov ? 1 : 0.3, transition: "opacity 0.4s ease",
                    }} />
                    <div style={{
                      width: 40, height: 40, borderRadius: 12, marginBottom: 14,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1px solid rgba(${svc.c},0.28)`,
                      background: `rgba(${svc.c},0.08)`,
                      transform: hov ? "scale(1.12) rotate(-4deg)" : "scale(1)",
                      transition: `transform 0.4s ${T.ease}`,
                    }}>
                      <svc.icon size={18} style={{ color: `rgba(${svc.c},1)` }} />
                    </div>
                    <h3 style={{ fontFamily: T.heading, fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontFamily: T.mono, fontSize: 9.5, lineHeight: 1.7, color: "rgba(255,255,255,0.38)", margin: 0, letterSpacing: "0.06em" }}>
                      {svc.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <BtnPrimary href="#projects" glowColor="rgba(255,255,255,0.4)" particleColor="#ffffff">
                View My Work
                <MoveUpRight size={14} />
              </BtnPrimary>
              <BtnMagnetic href="#contact" fillColor="#7c3aed" textNormal="text-violet-300" textFilled="text-white" borderColor="rgba(167,139,250,0.3)">
                Contact Me
                <ArrowRight size={14} />
              </BtnMagnetic>
            </div>
          </div>

          {/* ── RIGHT: Profile card ── */}
          <div style={{ margin: "0 auto", width: "100%", maxWidth: 420 }}>
            <ProfileCard />
          </div>
        </div>

        {/* ── TICKER ── */}
        <div style={{ marginTop: "clamp(40px,6vw,72px)", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
          <TickerRow items={TICKER_ITEMS} speed={42} />
          <TickerRow items={[...TICKER_ITEMS].reverse()} reverse speed={54} />
        </div>
      </div>

      {/* Bottom edge fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #04031a)", pointerEvents: "none" }} />
    </section>
  );
}