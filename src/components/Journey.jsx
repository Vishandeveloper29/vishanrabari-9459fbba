import ThunderBg from "./backgrounds/ThunderBg";
import { memo, useEffect, useRef, useState, useCallback } from "react";

/* ── Data ──────────────────────────────────────────────────────── */
const JOURNEY = [
  {
    phase: "Phase 01", year: "2022", title: "The Spark", subtitle: "First Line of Code",
    desc: "Started with HTML & CSS, built my first webpage. Fell in love with turning design into reality through code.",
    tags: ["HTML", "CSS", "Basics"], color: "99,102,241", accent: "#6366f1", icon: "⚡", status: "Completed",
    svgIcon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <polygon points="22,3 8,22 18,22 18,37 32,18 22,18" fill="rgba(99,102,241,0.9)" stroke="rgba(129,140,248,0.6)" strokeWidth="1"/>
        <polygon points="22,3 8,22 18,22 18,37 32,18 22,18" fill="url(#bolt-glow)" opacity="0.5"/>
        <defs>
          <radialGradient id="bolt-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="1"/>
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    ),
  },
  {
    phase: "Phase 02", year: "2023", title: "JavaScript Era", subtitle: "Logic & Interactivity",
    desc: "Learned JavaScript deeply — DOM manipulation, async patterns, REST APIs. Built interactive projects and started freelancing.",
    tags: ["JavaScript", "APIs", "Freelance"], color: "250,204,21", accent: "#facc15", icon: "🔥", status: "Completed",
    svgIcon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <path d="M20 35c-8 0-13-5-13-12 0-4 2-7 4-9 0 4 2 6 4 6-1-3 1-8 5-11 0 3 2 5 4 5-1-5 3-10 6-12-1 6 3 11 1 16 2-1 4-3 4-6 2 3 2 7 1 10 2-2 3-4 3-7 1 2 1 5 0 8-1 8-7 12-14 12z" fill="rgba(250,204,21,0.85)" stroke="rgba(253,224,71,0.5)" strokeWidth="0.5"/>
      </svg>
    ),
  },
  {
    phase: "Phase 03", year: "2023", title: "React Universe", subtitle: "Component Architecture",
    desc: "Discovered React and Tailwind CSS. Built complex UIs, mastered hooks, and started crafting premium dark-glass interfaces.",
    tags: ["React", "Tailwind", "Vite", "Hooks"], color: "56,189,248", accent: "#38bdf8", icon: "🚀", status: "Completed",
    svgIcon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <ellipse cx="20" cy="20" rx="4" ry="4" fill="rgba(56,189,248,0.9)"/>
        <ellipse cx="20" cy="20" rx="18" ry="6" stroke="rgba(56,189,248,0.7)" strokeWidth="1.5" fill="none"/>
        <ellipse cx="20" cy="20" rx="18" ry="6" stroke="rgba(56,189,248,0.7)" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
        <ellipse cx="20" cy="20" rx="18" ry="6" stroke="rgba(56,189,248,0.7)" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
      </svg>
    ),
  },
  {
    phase: "Phase 04", year: "2024", title: "Ayik Solution", subtitle: "Manager & Developer",
    desc: "Joined Ayik Solution as Manager & Developer. Delivered real client projects, led the frontend team, shipped production apps.",
    tags: ["Leadership", "Client Work", "Production"], color: "167,139,250", accent: "#a78bfa", icon: "💼", status: "Active",
    link: "https://ayiksolution.vercel.app/",
    svgIcon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <rect x="4" y="14" width="32" height="20" rx="3" fill="rgba(167,139,250,0.2)" stroke="rgba(167,139,250,0.7)" strokeWidth="1.5"/>
        <path d="M14 14v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" stroke="rgba(167,139,250,0.7)" strokeWidth="1.5"/>
        <line x1="4" y1="22" x2="36" y2="22" stroke="rgba(167,139,250,0.5)" strokeWidth="1"/>
        <circle cx="20" cy="22" r="2" fill="rgba(167,139,250,0.9)"/>
      </svg>
    ),
  },
  {
    phase: "Phase 05", year: "2024–Now", title: "3D & Advanced UI", subtitle: "Three.js · WebGL · Blender",
    desc: "Diving into 3D web — Three.js, WebGL shaders, Blender models. Building cinematic, physics-driven portfolio experiences.",
    tags: ["Three.js", "WebGL", "Blender", "GSAP"], color: "52,211,153", accent: "#34d399", icon: "🌐", status: "Current",
    svgIcon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <circle cx="20" cy="20" r="16" stroke="rgba(52,211,153,0.6)" strokeWidth="1"/>
        <ellipse cx="20" cy="20" rx="7" ry="16" stroke="rgba(52,211,153,0.6)" strokeWidth="1" fill="none"/>
        <line x1="4" y1="20" x2="36" y2="20" stroke="rgba(52,211,153,0.4)" strokeWidth="1"/>
        <line x1="6" y1="13" x2="34" y2="13" stroke="rgba(52,211,153,0.3)" strokeWidth="0.8"/>
        <line x1="6" y1="27" x2="34" y2="27" stroke="rgba(52,211,153,0.3)" strokeWidth="0.8"/>
        <circle cx="20" cy="20" r="3" fill="rgba(52,211,153,0.9)"/>
      </svg>
    ),
  },
];

/* ── Background SVG Particle Field ─────────────────────────────── */
const SVGParticleField = memo(() => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3, overflow: "visible" }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <radialGradient id="pf-glow-a" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="pf-glow-b" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.12"/>
        <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
      </radialGradient>
      <filter id="pf-blur-sm">
        <feGaussianBlur stdDeviation="1.5"/>
      </filter>
      <filter id="pf-blur-lg">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>

    {/* Corner circuit traces */}
    <g opacity="0.18" stroke="#6366f1" strokeWidth="0.6" fill="none">
      <path d="M0,80 L40,80 L40,60 L80,60"/>
      <path d="M0,120 L20,120 L20,100 L60,100 L60,80"/>
      <path d="M0,160 L30,160 L30,130 L70,130"/>
      <circle cx="40" cy="80" r="2" fill="#6366f1" opacity="0.6"/>
      <circle cx="20" cy="120" r="2" fill="#818cf8" opacity="0.6"/>
      <circle cx="30" cy="160" r="2" fill="#6366f1" opacity="0.5"/>
    </g>

    {/* Right side traces */}
    <g opacity="0.15" stroke="#34d399" strokeWidth="0.6" fill="none" transform="translate(100%,0) scale(-1,1)">
      <path d="M0,100 L50,100 L50,70 L90,70"/>
      <path d="M0,200 L30,200 L30,170 L80,170"/>
      <path d="M0,300 L20,300 L20,260 L60,260"/>
      <circle cx="50" cy="100" r="2" fill="#34d399" opacity="0.7"/>
      <circle cx="30" cy="200" r="2" fill="#34d399" opacity="0.5"/>
    </g>

    {/* Floating geometric shapes */}
    <g filter="url(#pf-blur-sm)" opacity="0.3">
      <polygon points="5%,15% 8%,10% 11%,15% 8%,20%" fill="none" stroke="#a78bfa" strokeWidth="0.8">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-12;0,0" dur="8s" repeatCount="indefinite"/>
      </polygon>
      <polygon points="88%,25% 92%,20% 96%,25% 92%,30%" fill="none" stroke="#38bdf8" strokeWidth="0.8">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="11s" repeatCount="indefinite"/>
      </polygon>
      <rect x="3%" y="60%" width="18" height="18" rx="3" fill="none" stroke="#f472b6" strokeWidth="0.7" transform="rotate(15)">
        <animateTransform attributeName="transform" type="rotate" values="0 3% 60%;360 3% 60%" dur="20s" repeatCount="indefinite"/>
      </rect>
      <rect x="91%" y="55%" width="14" height="14" rx="2" fill="none" stroke="#facc15" strokeWidth="0.7">
        <animateTransform attributeName="transform" type="rotate" values="0 92% 55%;-360 92% 55%" dur="16s" repeatCount="indefinite"/>
      </rect>
    </g>

    {/* Dot grid — left column */}
    {[0,1,2,3,4,5,6,7,8,9].map(row =>
      [0,1,2].map(col => (
        <circle
          key={`dl-${row}-${col}`}
          cx={`${col * 3 + 1}%`}
          cy={`${row * 10 + 5}%`}
          r="1"
          fill="#6366f1"
          opacity={0.08 + Math.random() * 0.08}
        />
      ))
    )}
    {/* Dot grid — right column */}
    {[0,1,2,3,4,5,6,7,8,9].map(row =>
      [0,1,2].map(col => (
        <circle
          key={`dr-${row}-${col}`}
          cx={`${97 - col * 3}%`}
          cy={`${row * 10 + 5}%`}
          r="1"
          fill="#34d399"
          opacity={0.08 + Math.random() * 0.08}
        />
      ))
    )}

    {/* Scanning line */}
    <line x1="0" y1="0" x2="100%" y2="0" stroke="url(#scan-grad)" strokeWidth="1" opacity="0.4">
      <animateTransform attributeName="transform" type="translate" values="0,0;0,2000" dur="12s" repeatCount="indefinite"/>
    </line>
    <defs>
      <linearGradient id="scan-grad" x1="0" y1="0" x2="100%" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="30%" stopColor="rgba(99,102,241,0.6)"/>
        <stop offset="50%" stopColor="rgba(168,85,247,0.8)"/>
        <stop offset="70%" stopColor="rgba(52,211,153,0.6)"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
    </defs>
  </svg>
));

/* ── SVG Timeline Connector ─────────────────────────────────────── */
const TimelineConnectorSVG = () => (
  <svg
    style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 1, height: "100%", zIndex: 2, overflow: "visible" }}
    width="1" height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="spine-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="transparent"/>
        <stop offset="12%"  stopColor="rgba(99,102,241,0.6)"/>
        <stop offset="35%"  stopColor="rgba(168,85,247,0.5)"/>
        <stop offset="58%"  stopColor="rgba(244,114,182,0.5)"/>
        <stop offset="80%"  stopColor="rgba(52,211,153,0.5)"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
      <linearGradient id="spine-grad-center" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="transparent"/>
        <stop offset="12%"  stopColor="rgba(99,102,241,0.5)"/>
        <stop offset="35%"  stopColor="rgba(168,85,247,0.4)"/>
        <stop offset="58%"  stopColor="rgba(244,114,182,0.4)"/>
        <stop offset="80%"  stopColor="rgba(52,211,153,0.4)"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="0" x2="0" y2="100%" stroke="url(#spine-grad)" strokeWidth="1"/>
    {/* Travelling pulse dot */}
    <circle cx="0" cy="0" r="3" fill="#a78bfa" opacity="0.9">
      <animateMotion path="M0,0 L0,2000" dur="6s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

/* ── Heading ───────────────────────────────────────────────────── */
const HeadingSection = () => (
  <div style={{ textAlign: "center", marginBottom: "clamp(48px,7vw,88px)", position: "relative" }}>
    {/* Decorative SVG behind heading */}
    <svg
      style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 0, opacity: 0.25 }}
      width="500" height="220" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="250" cy="110" rx="220" ry="90" stroke="rgba(99,102,241,0.4)" strokeWidth="0.8" strokeDasharray="4 6"/>
      <ellipse cx="250" cy="110" rx="180" ry="70" stroke="rgba(168,85,247,0.3)" strokeWidth="0.6" strokeDasharray="3 8"/>
      {/* Corner ornaments */}
      <path d="M40,30 L60,30 L60,50" stroke="rgba(99,102,241,0.7)" strokeWidth="1" fill="none"/>
      <path d="M460,30 L440,30 L440,50" stroke="rgba(99,102,241,0.7)" strokeWidth="1" fill="none"/>
      <path d="M40,190 L60,190 L60,170" stroke="rgba(52,211,153,0.7)" strokeWidth="1" fill="none"/>
      <path d="M460,190 L440,190 L440,170" stroke="rgba(52,211,153,0.7)" strokeWidth="1" fill="none"/>
      {/* Tiny diamonds */}
      <polygon points="250,5 258,13 250,21 242,13" fill="none" stroke="rgba(167,139,250,0.6)" strokeWidth="0.8"/>
      <polygon points="250,200 255,205 250,210 245,205" fill="rgba(52,211,153,0.4)" stroke="none"/>
    </svg>

    <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
        padding: "7px 18px", borderRadius: 999,
        border: "1px solid rgba(129,140,248,0.28)",
        background: "rgba(99,102,241,0.08)", backdropFilter: "blur(16px)",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#818cf8", boxShadow: "0 0 8px rgba(129,140,248,0.9)", animation: "journey-pulse 2s ease-in-out infinite" }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(165,180,252,0.85)" }}>
          My Journey
        </span>
      </div>

      <h2 style={{
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: "clamp(52px,11vw,110px)",
        lineHeight: 0.88, letterSpacing: "0.04em",
        textTransform: "uppercase", color: "#fff", margin: 0,
      }}>
        THE{" "}
        <span style={{
          background: "linear-gradient(135deg,#6366f1 0%,#a78bfa 30%,#f472b6 60%,#34d399 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "journey-grad 5s ease infinite",
        }}>ROAD</span>
        <br />
        <span style={{ color: "rgba(255,255,255,.1)", WebkitTextStroke: "1px rgba(255,255,255,.18)" }}>SO FAR</span>
      </h2>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(13px,1.5vw,15px)",
        lineHeight: 1.8, color: "rgba(255,255,255,.35)",
        maxWidth: 480, margin: "20px auto 0",
      }}>
        From a blank HTML file to production React apps — every phase shaped how I build today.
      </p>
    </div>
  </div>
);

/* ── Card SVG Decorations ──────────────────────────────────────── */
const CardSVGDeco = ({ color, accent, hov, index }) => {
  const shapes = [
    // Circuit-like corner ornament top-right
    <g key="circuit" opacity={hov ? 0.7 : 0.25} style={{ transition: "opacity 0.35s ease" }}>
      <path d={`M100%,0 L${100 - 8}%,0 L${100 - 8}%,12 L${100 - 18}%,12`} stroke={`rgba(${color},0.8)`} strokeWidth="0.8" fill="none"/>
      <circle cx={`${100 - 18}%`} cy="12" r="2" fill={`rgba(${color},0.8)`}/>
      <circle cx={`${100 - 8}%`} cy="0" r="1.5" fill={`rgba(${color},0.5)`}/>
    </g>,
    // Cross-hatch pattern bottom-left
    <g key="crosshatch" opacity={hov ? 0.5 : 0.12} style={{ transition: "opacity 0.35s ease" }}>
      {[0,1,2,3].map(i => (
        <line key={i} x1={`${i * 6}px`} y1="100%" x2={`${i * 6 + 24}px`} y2={`calc(100% - 24px)`} stroke={`rgba(${color},0.6)`} strokeWidth="0.6"/>
      ))}
    </g>,
  ];

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden", borderRadius: 24 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`card-shimmer-${index}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="50%" stopColor={`rgba(${color},0.5)`}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <linearGradient id={`card-corner-${index}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`rgba(${color},0.15)`}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>

      {/* Top edge shimmer */}
      <line
        x1="0" y1="0" x2="100%" y2="0"
        stroke={`url(#card-shimmer-${index})`}
        strokeWidth="1"
        opacity={hov ? 1 : 0.4}
        style={{ transition: "opacity 0.35s" }}
      />

      {/* Corner glow fill */}
      <rect
        x="0" y="0" width="120" height="120"
        fill={`url(#card-corner-${index})`}
        opacity={hov ? 0.7 : 0.2}
        style={{ transition: "opacity 0.4s" }}
      />

      {/* Tiny circuit dots */}
      {[12, 20, 28].map((pos, i) => (
        <circle
          key={i}
          cx={`calc(100% - ${pos}px)`}
          cy={`${pos}px`}
          r="1"
          fill={`rgba(${color},${hov ? 0.6 : 0.2})`}
          style={{ transition: "fill 0.3s" }}
        />
      ))}

      {/* Diagonal scan line on hover */}
      {hov && (
        <line
          x1="0" y1="100%" x2="100%" y2="0"
          stroke={`rgba(${color},0.06)`}
          strokeWidth="40"
          style={{ animation: "journey-card-scan 0.6s ease-out forwards" }}
        />
      )}

      {/* Bottom right data corner */}
      <g opacity={hov ? 0.5 : 0.12} style={{ transition: "opacity 0.35s" }}>
        <path d={`M calc(100% - 0px),100% L calc(100% - 30px),100% L calc(100% - 30px),calc(100% - 8px)`} stroke={`rgba(${color},0.7)`} strokeWidth="0.8" fill="none"/>
        <circle cx="calc(100% - 30px)" cy="calc(100% - 8px)" r="1.5" fill={`rgba(${color},0.6)`}/>
      </g>
    </svg>
  );
};

/* ── Magnetic Card ─────────────────────────────────────────────── */
const MagneticCard = ({ item, index }) => {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const isLeft = index % 2 === 0;

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setMousePos({ x: px, y: py });
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -10,
      y: ((e.clientX - r.left) / r.width - 0.5) * 10,
    });
  }, []);

  const statusConfig = {
    Completed: { bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)", text: "#34d399", dot: "#34d399" },
    Active:    { bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.3)", text: "#818cf8", dot: "#818cf8" },
    Current:   { bg: "rgba(250,204,21,0.08)", border: "rgba(250,204,21,0.3)", text: "#facc15", dot: "#facc15" },
  };
  const sc = statusConfig[item.status] || statusConfig.Completed;

  return (
    <div
      className={`journey-row journey-row--${isLeft ? "left" : "right"}`}
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      {/* Timeline dot with SVG rings */}
      <div className="journey-dot" style={{ position: "absolute", left: 17, top: 28, zIndex: 2, width: 20, height: 20 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ position: "absolute", top: -4, left: -4 }} xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="9" fill={`rgba(${item.color},0.12)`} stroke={`rgba(${item.color},0.55)`} strokeWidth="1.5"/>
          <circle cx="14" cy="14" r="3" fill={item.accent} style={{ filter: `drop-shadow(0 0 4px ${item.accent})` }}/>
          {item.status === "Current" && (
            <>
              <circle cx="14" cy="14" r="12" fill="none" stroke={`rgba(${item.color},0.4)`} strokeWidth="1">
                <animate attributeName="r" values="9;14;9" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="14" cy="14" r="12" fill="none" stroke={`rgba(${item.color},0.2)`} strokeWidth="1">
                <animate attributeName="r" values="9;14;9" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" begin="0.8s" repeatCount="indefinite"/>
              </circle>
            </>
          )}
        </svg>
      </div>

      {/* Card */}
      <div
        className="journey-card-inner"
        ref={cardRef}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
        onMouseMove={onMove}
        style={{
          marginLeft: 54,
          transform: hov
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.01)`
            : "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)",
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease",
          borderRadius: 24,
          border: hov ? `1px solid rgba(${item.color},0.5)` : "1px solid rgba(255,255,255,0.07)",
          background: hov
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(${item.color},0.1) 0%, rgba(${item.color},0.03) 60%, rgba(255,255,255,0.02) 100%)`
            : "rgba(255,255,255,0.025)",
          backdropFilter: "blur(28px)",
          boxShadow: hov
            ? `0 28px 80px rgba(0,0,0,0.5), 0 0 60px rgba(${item.color},0.15), inset 0 1px 0 rgba(255,255,255,0.06)`
            : "0 8px 32px rgba(0,0,0,0.3)",
          overflow: "hidden",
          position: "relative",
          cursor: "default",
        }}
      >
        {/* SVG card decorations */}
        <CardSVGDeco color={item.color} accent={item.accent} hov={hov} index={index} />

        <div style={{ padding: "clamp(18px,3vw,28px)", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Icon box with SVG */}
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `rgba(${item.color},0.1)`,
                border: `1px solid rgba(${item.color},0.3)`,
                position: "relative",
                transform: hov ? "scale(1.08) rotate(-3deg)" : "scale(1) rotate(0deg)",
                transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}>
                {item.svgIcon}
                {hov && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 14,
                    background: `rgba(${item.color},0.08)`,
                    animation: "journey-icon-pulse 1.5s ease-in-out infinite",
                  }}/>
                )}
              </div>
              <div>
                <div style={{
                  fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.3em", textTransform: "uppercase",
                  color: `rgba(${item.color},0.8)`, marginBottom: 3,
                }}>
                  {item.phase} · {item.year}
                </div>
                <h3 style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "clamp(16px,2.5vw,22px)",
                  fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.1,
                  textShadow: hov ? `0 0 30px rgba(${item.color},0.4)` : "none",
                  transition: "text-shadow 0.35s ease",
                }}>
                  {item.title}
                </h3>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 500,
                  color: `rgba(${item.color},0.6)`, marginTop: 2,
                  letterSpacing: "0.05em",
                }}>
                  {item.subtitle}
                </div>
              </div>
            </div>

            {/* Status badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "4px 10px", borderRadius: 999,
              border: `1px solid ${sc.border}`,
              background: sc.bg, flexShrink: 0,
              fontFamily: "'DM Mono',monospace", fontSize: 8.5, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase", color: sc.text,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: sc.dot,
                boxShadow: `0 0 6px ${sc.dot}`,
                animation: item.status === "Current" ? "journey-pulse 1.5s ease-in-out infinite" : "none",
              }} />
              {item.status}
            </div>
          </div>

          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(12px,1.5vw,14px)",
            lineHeight: 1.85, color: "rgba(255,255,255,.45)",
            margin: "0 0 16px",
          }}>
            {item.desc}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tags.map((tag, ti) => (
              <span
                key={tag}
                className="journey-tag"
                style={{
                  padding: "4px 10px", borderRadius: 999,
                  border: `1px solid rgba(${item.color},0.22)`,
                  background: `rgba(${item.color},0.06)`,
                  fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: `rgba(${item.color},0.85)`,
                  transition: "all .25s ease",
                  transitionDelay: `${ti * 30}ms`,
                  transform: hov ? "translateY(-1px)" : "translateY(0)",
                }}
              >{tag}</span>
            ))}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "4px 10px", borderRadius: 999,
                  border: `1px solid rgba(${item.color},0.5)`,
                  background: `rgba(${item.color},0.12)`,
                  fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: item.accent, textDecoration: "none",
                  transition: "all .25s ease",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke={item.accent} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Visit
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Animated Orbs (CSS only) ──────────────────────────────────── */
const ORB_CONFIG = [
  { x: "8%",  y: "10%", size: 320, color: "99,102,241",  delay: 0,  dur: 14 },
  { x: "80%", y: "5%",  size: 240, color: "168,85,247",  delay: 2,  dur: 11 },
  { x: "85%", y: "55%", size: 280, color: "236,72,153",  delay: 1,  dur: 16 },
  { x: "5%",  y: "65%", size: 200, color: "20,184,166",  delay: 3,  dur: 12 },
];
const DecoLayer = memo(() => (
  <div style={{ position: "absolute", inset: 0, zIndex: 6, overflow: "hidden", pointerEvents: "none" }}>
    {ORB_CONFIG.map((o, i) => (
      <div key={i} style={{
        position: "absolute", left: o.x, top: o.y,
        width: o.size, height: o.size, borderRadius: "50%",
        background: `radial-gradient(circle,rgba(${o.color},.07) 0%,transparent 70%)`,
        filter: "blur(40px)",
        animation: `journey-float ${o.dur}s ease-in-out infinite ${o.delay}s`,
      }} />
    ))}
  </div>
));

/* ── Section ───────────────────────────────────────────────────── */
const Journey = () => (
  <section id="journey" style={{
    position: "relative", overflow: "hidden",
    background: "#03040f", color: "#fff",
    padding: "clamp(70px,10vw,112px) clamp(16px,4vw,40px)",
  }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
      #journey *, #journey *::before, #journey *::after { box-sizing: border-box; }

      @keyframes journey-ping        { 0%{transform:scale(1);opacity:.6} 75%,100%{transform:scale(2.4);opacity:0} }
      @keyframes journey-pulse       { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.9)} }
      @keyframes journey-grad        { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      @keyframes journey-float       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
      @keyframes journey-icon-pulse  { 0%,100%{opacity:0} 50%{opacity:1} }
      @keyframes journey-card-scan   { 0%{opacity:.12} 100%{opacity:0} }

      .journey-tag:hover {
        border-color: rgba(255,255,255,.22) !important;
        color: rgba(255,255,255,.8) !important;
        background: rgba(255,255,255,.05) !important;
        transform: translateY(-2px) !important;
      }

      @media (min-width: 768px) {
        .journey-spine-mobile   { display: none !important; }
        .journey-spine-center   { display: block !important; }
        .journey-row            { display: flex !important; }
        .journey-row--left      { padding-right: 52% !important; flex-direction: row !important; }
        .journey-row--right     { padding-left: 52% !important; flex-direction: row-reverse !important; }
        .journey-dot            { left: calc(50% - 10px) !important; }
        .journey-card-inner     { margin-left: 0 !important; }
      }
    `}</style>

    {/* Bg layers */}
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 120% 80% at 50% 0%,rgba(15,10,40,1) 0%,#03040f 60%)" }} />
    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}><ThunderBg variant="purple" opacity={0.75} /></div>
    <div style={{ position: "absolute", inset: 0, zIndex: 7, pointerEvents: "none", background: "radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(3,4,15,.65) 100%)" }} />

    {/* SVG particle field */}
    <SVGParticleField />

    <DecoLayer />

    {/* Content */}
    <div style={{ position: "relative", zIndex: 10, maxWidth: 1000, margin: "0 auto" }}>
      <HeadingSection />

      <div style={{ position: "relative" }}>
        {/* Mobile spine */}
        <div className="journey-spine-mobile" style={{ position: "absolute", left: 27, top: 0, bottom: 0, zIndex: 1 }}>
          <TimelineConnectorSVG />
        </div>

        {/* Desktop spine */}
        <div className="journey-spine-center" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, transform: "translateX(-50%)", zIndex: 1, display: "none" }}>
          <TimelineConnectorSVG />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(32px,5vw,64px)" }}>
          {JOURNEY.map((item, i) => <MagneticCard key={item.phase} item={item} index={i} />)}
        </div>
      </div>

      {/* Footer pill */}
      <div style={{ marginTop: "clamp(48px,7vw,96px)", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center",
          padding: "clamp(10px,2vw,14px) clamp(16px,3vw,28px)", borderRadius: 20,
          border: "1px solid rgba(255,255,255,.07)", background: "rgba(255,255,255,.03)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 32px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.06)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Subtle SVG deco inside pill */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(167,139,250,0.06)" strokeWidth="1"/>
          </svg>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", animation: "journey-pulse 2s ease-in-out infinite", boxShadow: "0 0 12px rgba(167,139,250,.8)", flexShrink: 0 }} />
          <span style={{ fontSize: "clamp(11px,1.5vw,13px)", fontWeight: 600, color: "rgba(255,255,255,.38)", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".02em", position: "relative" }}>
            Still building · Always learning · Open to new opportunities
          </span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f472b6", animation: "journey-pulse 2s ease-in-out infinite .8s", boxShadow: "0 0 12px rgba(244,114,182,.8)", flexShrink: 0 }} />
        </div>
      </div>
    </div>
  </section>
);

export default Journey;
