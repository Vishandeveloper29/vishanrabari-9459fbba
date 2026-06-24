import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight, Code2, GitBranch, MonitorSmartphone,
  Sparkles, Zap, Terminal, Globe, Star, Layers
} from "lucide-react";
import InteractiveNeuralVortex from "./ui/interactive-neural-vortex-background";
import { BtnPrimary, BtnGhost, BtnMagnetic } from "./ui/PortfolioButtons";

/* ─── DATA ──────────────────────────────────────────── */
const roles = [
  { label: "Frontend Developer", color: "#38bdf8" },
  { label: "React UI Builder",   color: "#a78bfa" },
  { label: "3D Web Creator",     color: "#34d399" },
  { label: "Dark Glass UI",      color: "#f472b6" },
  { label: "Open to Work ✦",    color: "#fbbf24" },
];

const stats = [
  { icon: GitBranch,         value: "41+", label: "GitHub Repos",  color: "#38bdf8", rgb: "56,189,248"   },
  { icon: Code2,             value: "7+",  label: "Live Projects",  color: "#a78bfa", rgb: "167,139,250"  },
  { icon: Sparkles,          value: "3D",  label: "Web Effects",    color: "#34d399", rgb: "52,211,153"   },
  { icon: MonitorSmartphone, value: "UI",  label: "Responsive",     color: "#f472b6", rgb: "244,114,182"  },
];

const marqueeItems = [
  "React","·","Three.js","·","Tailwind CSS","·","Blender","·",
  "WebGL","·","Figma","·","Vite","·","JavaScript","·",
  "Open To Work","·","Frontend","·","3D Web","·","Python","·","C",
];

/* ─── ROLE CYCLER ────────────────────────────────────── */
const RoleCycler = ({ go }) => {
  const [i, setI]   = useState(0);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    if (!go) return;
    const id = setInterval(() => {
      setVis(false);
      setTimeout(() => { setI(x => (x + 1) % roles.length); setVis(true); }, 320);
    }, 2800);
    return () => clearInterval(id);
  }, [go]);

  return (
    <span
      className="hero-mono inline-block text-[10px] font-black uppercase tracking-[0.45em] sm:text-[12px]"
      style={{
        color: roles[i].color,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity .3s ease, transform .3s ease, color .4s ease",
        textShadow: `0 0 20px ${roles[i].color}55`,
      }}
    >
      {roles[i].label}
    </span>
  );
};

/* ─── CHAR REVEAL ────────────────────────────────────── */
const CharReveal = ({ text, delay = 0, className = "", style = {} }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span className={className} style={{ display: "inline-block", ...style }} aria-label={text}>
      {text.split("").map((ch, j) => (
        <span
          key={j}
          style={{
            display: "inline-block",
            opacity: show ? 1 : 0,
            transform: show
              ? "translateY(0) rotateX(0)"
              : "translateY(55px) rotateX(-85deg)",
            transition: `opacity .5s ease ${delay + j * 26}ms,
                         transform .6s cubic-bezier(.16,1,.3,1) ${delay + j * 26}ms`,
            transformOrigin: "bottom center",
            willChange: "opacity, transform",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
};

/* ─── MAIN HERO ──────────────────────────────────────── */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [ms, setMs]           = useState({ x: 0.5, y: 0.5 });
  const raw                   = useRef({ x: 0.5, y: 0.5 });
  const rafRef                = useRef(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mv = e => {
      raw.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", mv, { passive: true });
    const tk = () => {
      setMs(p => ({
        x: p.x + (raw.current.x - p.x) * 0.055,
        y: p.y + (raw.current.y - p.y) * 0.055,
      }));
      rafRef.current = requestAnimationFrame(tk);
    };
    rafRef.current = requestAnimationFrame(tk);
    return () => {
      window.removeEventListener("mousemove", mv);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const fu = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .8s ease ${d}ms, transform .9s cubic-bezier(.16,1,.3,1) ${d}ms`,
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#020408] text-white"
      style={{ paddingTop: "clamp(72px,11vh,108px)" }}
    >
      {/* ── STYLES ── */}
      <style>{`
        .hero-mono { font-family:'DM Mono',monospace; }
        .hero-bb   { font-family:'Bebas Neue',sans-serif; }
        .hero-sg   { font-family:'Space Grotesk',sans-serif; }

        /* ---- Gradient name ---- */
        .name-grad {
          color: #ffffff;
          background: linear-gradient(110deg,
            #ffffff 0%,
            #e0f2fe 15%,
            #7dd3fc 32%,
            #a5b4fc 50%,
            #c084fc 68%,
            #e0f2fe 85%,
            #ffffff 100%);
          background-size: 280% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: grad-shift 6s ease-in-out infinite;
          filter: brightness(1.15);
        }
        @supports not (-webkit-background-clip: text) {
          .name-grad { color: #e0f2fe; -webkit-text-fill-color: #e0f2fe; }
        }
        @keyframes grad-shift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }

        /* ---- Title glow ---- */
        .elec-title {
          filter: drop-shadow(0 0 32px rgba(125,211,252,.35)) drop-shadow(0 0 64px rgba(192,132,252,.18));
        }

        /* ---- Stat card rotating border ---- */
        @property --sb { inherits:false; initial-value:0deg; syntax:'<angle>'; }
        @keyframes stat-border { to { --sb: 360deg; } }
        .stat-card {
          --sb: 0deg;
          background:
            linear-gradient(#040810, #040810) padding-box,
            conic-gradient(from var(--sb),
              transparent 0%,
              rgba(129,140,248,.6) 20%,
              rgba(56,189,248,.4) 40%,
              rgba(52,211,153,.3) 60%,
              transparent 80%) border-box;
          border: 1px solid transparent;
          animation: stat-border 5s linear infinite;
          transition: transform .35s cubic-bezier(.16,1,.3,1),
                      background .25s ease, box-shadow .35s ease;
        }
        .stat-card:hover {
          transform: translateY(-10px) scale(1.03);
        }

        /* ---- Badge pulse ---- */
        @keyframes badge-ping {
          0%   { transform: scale(1); opacity: .75; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* ---- Marquee ---- */
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* ---- Scroll cue ---- */
        @keyframes scrollrun {
          0%   { transform: translateY(-100%); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(280%); opacity: 0; }
        }

        /* ---- Cursor blink ---- */
        .tcursor { animation: blink 1s steps(2,start) infinite; }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

        /* ---- Chip floats ---- */
        .chip-a { animation: chipA 6s ease-in-out infinite; }
        .chip-b { animation: chipB 7.5s ease-in-out infinite; }
        .chip-c { animation: chipC 5.5s ease-in-out infinite; }
        .chip-d { animation: chipA 8s ease-in-out infinite; animation-delay:1.8s; }
        @keyframes chipA { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
        @keyframes chipB { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-9px) rotate(-3deg)} }
        @keyframes chipC { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-15px) rotate(1deg)} }

        /* ---- Button shimmer ---- */
        .btn-shimmer {
          position: relative; overflow: hidden;
        }
        .btn-shimmer::after {
          content: ''; position: absolute;
          top: -50%; left: -75%;
          width: 50%; height: 200%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.14), transparent);
          transform: skewX(-20deg);
          transition: left .55s ease;
        }
        .btn-shimmer:hover::after { left: 130%; }

        /* ---- Terminal typing line ---- */
        @keyframes typeline {
          0%   { width: 0; }
          60%  { width: 100%; }
          100% { width: 100%; }
        }

        /* ---- Name underline glide ---- */
        .name-underline {
          position: absolute; bottom: -6px; left: 0; right: 0; height: 3px; border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(129,140,248,.8), rgba(56,189,248,.9), rgba(129,140,248,.8), transparent);
          filter: blur(1.5px);
          animation: underline-pulse 3.5s ease-in-out infinite;
        }
        @keyframes underline-pulse {
          0%,100% { opacity:.4; transform:scaleX(.9); }
          50%     { opacity:.9; transform:scaleX(1.04); }
        }

        /* ── MOBILE OVERRIDES ── */
        @media (max-width: 479px) {
          .hero-chips { display: none !important; }
          .hero-scroll-cue { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .name-grad, .stat-card, .chip-a, .chip-b, .chip-c, .chip-d,
          .btn-shimmer::after, .name-underline, .tcursor { animation: none !important; }
        }
      `}</style>

      {/* ── WebGL BACKGROUND ── */}
      <InteractiveNeuralVortex />

      {/* ── MOUSE ORB ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: "clamp(300px,45vw,700px)",
            height: "clamp(300px,45vw,700px)",
            background: "radial-gradient(circle,rgba(129,140,248,.11) 0%,rgba(56,189,248,.07) 40%,transparent 70%)",
            left: `${ms.x * 100}%`,
            top: `${ms.y * 100}%`,
            transform: "translate(-50%,-50%)",
            transition: "left .9s ease, top .9s ease",
          }}
        />
      </div>

      {/* ── SCANLINES ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.018]"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.5) 2px,rgba(0,0,0,.5) 4px)" }}
      />

      {/* ── CORNER GLOW ACCENTS ── */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div
          className="absolute -left-20 top-0 h-[400px] w-[400px] opacity-20 sm:opacity-30"
          style={{ background: "radial-gradient(circle,rgba(129,140,248,.35) 0%,transparent 70%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute -right-20 bottom-0 h-[350px] w-[350px] opacity-15 sm:opacity-25"
          style={{ background: "radial-gradient(circle,rgba(52,211,153,.3) 0%,transparent 70%)", filter: "blur(50px)" }}
        />
      </div>

      {/* ── BOTTOM FADE ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#020408] to-transparent" />

      {/* ── FLOATING CHIPS ── */}
      <div className="hero-chips pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        {[
          { cls: "chip-a left-[5%] top-[20%]",       icon: Terminal, label: "React",    color: "#38bdf8", border: "rgba(56,189,248,.2)",  bg: "rgba(56,189,248,.06)"  },
          { cls: "chip-b right-[6%] top-[24%]",       icon: Globe,    label: "Tailwind", color: "#a78bfa", border: "rgba(167,139,250,.2)", bg: "rgba(167,139,250,.06)" },
          { cls: "chip-c right-[10%] bottom-[24%]",   icon: Sparkles, label: "Vite",     color: "#34d399", border: "rgba(52,211,153,.2)",  bg: "rgba(52,211,153,.06)"  },
          { cls: "chip-d left-[8%] bottom-[26%]",     icon: Code2,    label: "JS",       color: "#fbbf24", border: "rgba(251,191,36,.2)",  bg: "rgba(251,191,36,.06)"  },
          { cls: "chip-b left-[3%] top-[48%]",        icon: Layers,   label: "WebGL",    color: "#f472b6", border: "rgba(244,114,182,.2)", bg: "rgba(244,114,182,.06)" },
          { cls: "chip-c right-[4%] top-[52%]",       icon: Star,     label: "Three.js", color: "#818cf8", border: "rgba(129,140,248,.2)", bg: "rgba(129,140,248,.06)" },
        ].map(({ cls, icon: Icon, label, color, border, bg }) => (
          <div key={label} className={`absolute ${cls} hidden lg:block`}>
            <div
              className="group flex cursor-default items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-xl transition-all duration-300 hover:scale-110"
              style={{ border: `1px solid ${border}`, background: bg }}
            >
              <Icon size={10} style={{ color }} />
              <span
                className="hero-mono text-[9px] font-bold uppercase tracking-[0.24em]"
                style={{ color: `${color}99` }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-8">

        {/* Available badge */}
        <div
          style={fu(0)}
          className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/45 hover:bg-emerald-400/[0.1] hover:shadow-[0_0_24px_rgba(52,211,153,.18)]"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              style={{ animation: "badge-ping 2s ease-in-out infinite" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="hero-mono text-[9.5px] font-black uppercase tracking-[0.36em] text-emerald-300/85">
            Available for Work
          </span>
        </div>

        {/* Role cycler */}
        <div style={fu(140)} className="mb-4 h-5 sm:h-6">
          <RoleCycler go={mounted} />
        </div>

        {/* BIG TITLE */}
        <div
          className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw]"
          style={{ perspective: "1400px" }}
        >
          <h1
            className="hero-bb block text-center uppercase leading-[0.84] tracking-[0.02em] text-white/95"
            style={{
              fontSize: "clamp(40px,10vw,144px)",
              WebkitTextStroke: "1px rgba(255,255,255,.03)",
            }}
          >
            <CharReveal text="Turning Ideas" delay={240} />
          </h1>

          {/* Gradient line with underline glow */}
          <div className="relative mx-auto w-fit">
            <h1
              className="hero-bb elec-title block text-center uppercase leading-[0.84] tracking-[0.02em]"
              style={{ fontSize: "clamp(40px,10vw,144px)" }}
            >
              <span
                className="name-grad"
                style={{
                  display: "inline-block",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(50px)",
                  transition: "opacity .7s ease 360ms, transform .8s cubic-bezier(.16,1,.3,1) 360ms",
                }}
              >
                Into Websites
              </span>
            </h1>
            <div className="name-underline" />
          </div>
        </div>

        {/* Sub text */}
        <p
          className="hero-sg mx-auto mt-6 max-w-lg px-3 text-center text-[14px] leading-[1.9] sm:max-w-xl sm:px-0 sm:text-[16.5px]"
          style={{ color: "rgba(203,213,225,.5)", ...fu(560) }}
        >
          I build{" "}
          <span
            className="font-semibold"
            style={{ color: "rgba(226,232,240,.85)" }}
          >
            sharp React interfaces
          </span>
          , dark glass UI,{" "}
          <span
            className="font-semibold"
            style={{ color: "rgba(125,211,252,.75)" }}
          >
            3D animated frontends
          </span>{" "}
          &amp; things that make people say{" "}
          <em
            className="not-italic font-semibold"
            style={{ color: "rgba(167,139,250,.85)" }}
          >
            &quot;how did you do that?&quot;
          </em>
        </p>

        {/* CTA BUTTONS */}
        <div
          style={fu(720)}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          <BtnPrimary
            href="#projects"
            glowColor="rgba(129,140,248,0.55)"
            particleColor="#818cf8"
            className="btn-shimmer"
          >
            View Projects <ArrowUpRight size={14} />
          </BtnPrimary>
          <BtnGhost
            href="https://github.com/Vishandeveloper29"
            target="_blank"
            rel="noreferrer"
            glowColor="56,189,248"
          >
            GitHub · 41 Repos ↗
          </BtnGhost>
          <BtnMagnetic
            href="#contact"
            fillColor="#818cf8"
            textNormal="text-slate-300/80"
            textFilled="text-white"
            borderColor="rgba(167,139,250,0.35)"
          >
            <Zap size={12} /> Hire Me
          </BtnMagnetic>
        </div>

        {/* ── STATS GRID ── */}
        <div className="mt-10 grid w-full max-w-4xl grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            const isHovered = hoveredStat === idx;
            return (
              <div
                key={s.label}
                className="stat-card group relative overflow-hidden rounded-2xl px-3 py-3.5 text-left backdrop-blur-xl sm:px-4 sm:py-4"
                style={{
                  boxShadow: isHovered
                    ? `0 20px 60px rgba(0,0,0,.4),0 0 40px rgba(${s.rgb},.22)`
                    : `0 14px 44px rgba(0,0,0,.3),0 0 20px rgba(${s.rgb},.07)`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted
                    ? isHovered ? "translateY(-10px) scale(1.03)" : "translateY(0)"
                    : "translateY(24px)",
                  transition: `opacity .7s ease ${820 + idx * 90}ms,
                    transform .45s cubic-bezier(.16,1,.3,1),
                    box-shadow .45s ease`,
                }}
                onMouseEnter={() => setHoveredStat(idx)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Corner glow on hover */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl"
                  style={{
                    background: s.color,
                    opacity: isHovered ? 0.4 : 0,
                    transition: "opacity .4s ease",
                  }}
                />

                <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
                  {/* Icon box */}
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-400 group-hover:scale-110 sm:h-10 sm:w-10"
                    style={{
                      borderColor: `rgba(${s.rgb},.28)`,
                      background: `rgba(${s.rgb},.1)`,
                      color: s.color,
                      boxShadow: isHovered ? `0 0 16px rgba(${s.rgb},.35)` : "none",
                      transition: "box-shadow .4s ease, transform .35s ease",
                    }}
                  >
                    <Icon size={15} />
                  </div>

                  <div>
                    <p
                      className="hero-bb leading-none"
                      style={{
                        fontSize: "clamp(20px,5vw,28px)",
                        color: isHovered ? s.color : "#f1f5f9",
                        transition: "color .35s ease",
                        textShadow: isHovered ? `0 0 20px ${s.color}66` : "none",
                      }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="hero-mono mt-0.5 text-[8.5px] font-black uppercase tracking-[0.24em] sm:text-[9px]"
                      style={{ color: "rgba(148,163,184,.38)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] rounded-full"
                  style={{
                    width: isHovered ? "100%" : "0%",
                    background: `linear-gradient(90deg,${s.color},transparent)`,
                    transition: "width .45s cubic-bezier(.16,1,.3,1)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TERMINAL STRIP ── */}
      <div
        style={fu(1020)}
        className="relative z-10 mx-auto mt-10 w-[calc(100%-20px)] max-w-5xl overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#020813]/75 shadow-[0_20px_80px_rgba(0,0,0,.5),0_0_50px_rgba(129,140,248,.06)] backdrop-blur-2xl sm:w-[calc(100%-40px)] sm:rounded-[22px]"
      >
        {/* Top edge line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />

        {/* Title bar */}
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-3 py-2 sm:px-5 sm:py-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70 shadow-[0_0_8px_rgba(239,68,68,.4)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70 shadow-[0_0_8px_rgba(234,179,8,.3)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70 shadow-[0_0_8px_rgba(52,211,153,.3)]" />
            <span className="hero-mono ml-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 sm:ml-2 sm:text-[9px]">
              vishan@portfolio
            </span>
          </div>
          <span className="hero-mono text-[9px] font-bold text-indigo-400/45 hidden sm:block">
            ● node v20 · npm 10
          </span>
        </div>

        {/* Body */}
        <div className="px-3 py-3 sm:px-5 sm:py-3.5">
          <div className="mb-3 flex items-center gap-2">
            <span className="hero-mono text-[10px] text-indigo-400 sm:text-[11px]">$</span>
            <span className="hero-mono text-[10px] text-white/50 sm:text-[11px]">
              npm run build-portfolio
            </span>
            <span className="tcursor h-3 w-[5px] bg-indigo-400/70 sm:h-3.5 sm:w-[6px]" />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4">
            {[
              { k: "stack",    v: "React · Tailwind · Vite",  c: "#38bdf8" },
              { k: "effects",  v: "Three.js · WebGL · GSAP",  c: "#a78bfa" },
              { k: "projects", v: "7+ Live · 41+ Repos",      c: "#34d399" },
              { k: "status",   v: "Open to Work ✓",           c: "#fbbf24" },
            ].map(({ k, v, c }) => (
              <div
                key={k}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.022] px-2.5 py-2 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04] sm:px-3 sm:py-2.5"
              >
                <p
                  className="hero-mono text-[8px] font-black uppercase tracking-[0.28em] sm:text-[9px]"
                  style={{ color: `${c}66` }}
                >
                  {k}
                </p>
                <p
                  className="hero-sg mt-1 text-[10px] font-semibold leading-snug sm:text-[11px]"
                  style={{ color: "rgba(203,213,225,.55)" }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div
        className="relative z-10 mt-4 border-y py-3"
        style={{ borderColor: "rgba(255,255,255,.04)", ...fu(1150) }}
      >
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)",
            WebkitMaskImage: "linear-gradient(90deg,transparent,black 6%,black 94%,transparent)",
          }}
        >
          <div
            className="flex gap-7 whitespace-nowrap"
            style={{ animation: "marquee 22s linear infinite", willChange: "transform" }}
          >
            {[...marqueeItems, ...marqueeItems].map((it, i) => (
              <span
                key={i}
                className="hero-mono shrink-0 text-[9px] font-black uppercase tracking-[0.3em] sm:text-[9.5px]"
                style={{
                  color:
                    it === "Open To Work"
                      ? "#34d399"
                      : it === "·"
                      ? "rgba(255,255,255,.07)"
                      : "rgba(203,213,225,.2)",
                  textShadow: it === "Open To Work" ? "0 0 12px rgba(52,211,153,.4)" : "none",
                }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCROLL CUE ── */}
      <a
        href="#about"
        style={fu(1280)}
        className="hero-scroll-cue group absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-7"
        aria-label="Scroll down"
      >
        <span
          className="hero-mono text-[8.5px] font-black uppercase tracking-[0.42em] transition-all duration-300 group-hover:tracking-[0.54em]"
          style={{ color: "rgba(203,213,225,.22)" }}
        >
          Scroll
        </span>
        <div
          className="relative h-10 w-px overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,.07)" }}
        >
          <div
            className="absolute left-0 top-0 w-full rounded-full"
            style={{
              height: "50%",
              background: "linear-gradient(to bottom,transparent,#818cf8)",
              animation: "scrollrun 2s ease-in-out infinite",
            }}
          />
        </div>
      </a>
    </section>
  );
}
