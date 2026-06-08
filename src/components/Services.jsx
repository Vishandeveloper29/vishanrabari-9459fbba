import ThunderBg from "./backgrounds/ThunderBg";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowUpRight, BadgeCheck, Box, Code2, Database, Gauge,
  MonitorSmartphone, PenTool, Search, Server, Sparkles,
  WandSparkles, CheckCircle2, Layers, Zap, Globe,
} from "lucide-react";

/* ── DATA ── */
const services = [
  {
    icon: Box, title: "3D Web Experiences",
    text: "Premium interactive sections, depth cards, smooth motion, and modern 3D-style layouts for high-end websites.",
    tag: "3D Web", stat: "WOW UI", color: "#22d3ee", rgb: "34,211,238",
    features: ["Parallax Depth", "Motion Effects", "Premium Layout"],
  },
  {
    icon: Code2, title: "Frontend Development",
    text: "Clean React components, responsive layouts, reusable sections, Tailwind styling, and smooth user interactions.",
    tag: "React UI", stat: "Clean Code", color: "#818cf8", rgb: "129,140,248",
    features: ["React Components", "Tailwind CSS", "Responsive"],
  },
  {
    icon: PenTool, title: "UI / UX Design",
    text: "Modern spacing, readable typography, glass effects, attractive hover states, and user-focused interface design.",
    tag: "UI/UX", stat: "Premium Feel", color: "#e879f9", rgb: "232,121,249",
    features: ["Glassmorphism", "Hover States", "Typography"],
  },
  {
    icon: Gauge, title: "Performance Optimization",
    text: "Fast loading pages, optimized sections, lightweight animations, better structure, and smooth browsing experience.",
    tag: "Speed", stat: "High Score", color: "#4ade80", rgb: "74,222,128",
    features: ["Fast Load", "Optimized Assets", "Smooth UX"],
  },
  {
    icon: Search, title: "SEO Ready Structure",
    text: "Clean headings, proper section flow, accessible layout, keyword-friendly content, and better search visibility.",
    tag: "SEO", stat: "Rank Ready", color: "#fbbf24", rgb: "251,191,36",
    features: ["Clean HTML", "Meta Tags", "Accessibility"],
  },
  {
    icon: Server, title: "Full Stack + Backend",
    text: "API integration, backend logic, database handling, auth-ready structure, and scalable full-stack website systems.",
    tag: "Backend", stat: "Full Stack", color: "#f87171", rgb: "248,113,113",
    features: ["API Integration", "Database", "Auth Systems"],
  },
];

const miniFeatures = [
  { icon: MonitorSmartphone, title: "Responsive", text: "Mobile to desktop perfect" },
  { icon: WandSparkles, title: "Glass UI", text: "Blur, glow & gradients" },
  { icon: Database, title: "Database", text: "Backend-ready structure" },
  { icon: BadgeCheck, title: "Professional", text: "Portfolio-level polish" },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Understand your goals, audience, and vision." },
  { num: "02", title: "Design", desc: "Craft premium UI with attention to every detail." },
  { num: "03", title: "Build", desc: "Clean, optimized code with smooth interactions." },
  { num: "04", title: "Launch", desc: "Deploy, test, and deliver a polished product." },
];

/* ── LIGHTNING BOLT SVG ── */
const LightningBolt = ({ size = 24, color = "#22d3ee", opacity = 0.8, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M13 2L4.5 13.5H11L10 22L20.5 9.5H14L13 2Z"
      fill={color} stroke={color} strokeWidth="1" strokeLinejoin="round"
      style={{ opacity }}
    />
  </svg>
);

/* ── ANIMATED LIGHTNING FLASH ── */
function LightningFlash({ x, y, color = "#22d3ee", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 600);
    return () => clearTimeout(t);
  }, [onDone]);

  const pts = generateBolt(x, y, y + 80 + Math.random() * 60);

  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }}
    >
      <defs>
        <filter id={`glow-${x}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        filter={`url(#glow-${x})`}
        style={{ animation: "bolt-fade 0.6s ease-out forwards" }}
      />
      <polyline
        points={pts}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        style={{ animation: "bolt-fade 0.6s ease-out forwards" }}
      />
    </svg>
  );
}

function generateBolt(x, startY, endY) {
  const steps = 8;
  let pts = [[x, startY]];
  for (let i = 1; i < steps; i++) {
    const progress = i / steps;
    const curY = startY + (endY - startY) * progress;
    const offsetX = (Math.random() - 0.5) * 30;
    pts.push([x + offsetX, curY]);
  }
  pts.push([x + (Math.random() - 0.5) * 10, endY]);
  return pts.map(p => p.join(",")).join(" ");
}

/* ── ELECTRIC PARTICLE ── */
function ElectricParticles({ color, active }) {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    delay: i * 0.1,
    dist: 30 + Math.random() * 20,
  }));

  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 4, height: 4,
            borderRadius: "50%",
            background: color,
            transform: `rotate(${p.angle}deg) translateX(${p.dist}px)`,
            animation: `spark 0.6s ${p.delay}s ease-out forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

/* ── THUNDER COUNTER ── */
function ThunderCounter({ value, label, color }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = value / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setDisplay(value); clearInterval(timer); }
          else setDisplay(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        color,
        lineHeight: 1,
        textShadow: `0 0 20px rgba(${color === "#22d3ee" ? "34,211,238" : "251,191,36"},0.5)`,
      }}>
        {display}+
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

/* ── SERVICE CARD ── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sparking, setSparking] = useState(false);
  const [bolts, setBolts] = useState([]);
  const cardRef = useRef(null);

  const onMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const handleEnter = () => {
    setHovered(true);
    setSparking(true);
    setTimeout(() => setSparking(false), 700);
    const x = 50 + Math.random() * 200;
    setBolts(b => [...b, { id: Date.now(), x }]);
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 28,
        border: `1px solid ${hovered ? `rgba(${service.rgb},0.45)` : "rgba(255,255,255,0.07)"}`,
        background: hovered
          ? `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${service.rgb},0.12), transparent 70%), #06080f`
          : "#06080f",
        boxShadow: hovered
          ? `0 0 0 1px rgba(${service.rgb},0.2), 0 30px 80px rgba(${service.rgb},0.18), inset 0 1px 0 rgba(${service.rgb},0.15)`
          : "0 0 0 transparent",
        transform: hovered ? "translateY(-10px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "all 0.45s cubic-bezier(0.23,1,0.32,1)",
        cursor: "pointer",
      }}
    >
      {/* Lightning bolts that flash on hover */}
      {bolts.map(b => (
        <LightningFlash
          key={b.id} x={b.x} y={0}
          color={service.color}
          onDone={() => setBolts(prev => prev.filter(p => p.id !== b.id))}
        />
      ))}

      {/* Electric particles on hover */}
      <ElectricParticles color={service.color} active={sparking} />

      {/* Top voltage stripe */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${service.color}, rgba(${service.rgb},0.4), transparent)`,
        opacity: hovered ? 1 : 0.2,
        transition: "opacity 0.3s",
        boxShadow: hovered ? `0 0 12px ${service.color}` : "none",
      }} />

      {/* Corner lightning decorations */}
      <div style={{
        position: "absolute", top: 12, right: 12, opacity: hovered ? 0.6 : 0.1,
        transition: "opacity 0.3s",
        transform: hovered ? "scale(1.2) rotate(10deg)" : "scale(1)",
      }}>
        <LightningBolt size={18} color={service.color} />
      </div>

      {/* Scan line effect */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
          zIndex: 0,
        }} />
      )}

      <div style={{ position: "relative", padding: 24, zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{
            width: 64, height: 64,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 20,
            border: `1px solid rgba(${service.rgb},${hovered ? "0.4" : "0.12"})`,
            background: hovered ? `rgba(${service.rgb},0.15)` : "rgba(0,0,0,0.5)",
            color: service.color,
            transition: "all 0.35s ease",
            transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1)",
            boxShadow: hovered ? `0 0 20px rgba(${service.rgb},0.35)` : "none",
          }}>
            <service.icon size={26} />
          </div>

          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            color: hovered ? `rgba(${service.rgb},0.4)` : "rgba(255,255,255,0.08)",
            letterSpacing: 2,
            transition: "color 0.3s",
            lineHeight: 1,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <span style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            border: `1px solid rgba(${service.rgb},0.35)`,
            background: `rgba(${service.rgb},0.12)`,
            color: service.color,
            boxShadow: hovered ? `0 0 8px rgba(${service.rgb},0.3)` : "none",
          }}>
            ⚡ {service.tag}
          </span>
          <span style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.45)",
          }}>
            {service.stat}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          marginTop: 16, fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
          fontFamily: "'Bebas Neue', sans-serif",
          letterSpacing: "0.05em",
          color: hovered ? service.color : "white",
          transition: "color 0.3s",
          textShadow: hovered ? `0 0 20px rgba(${service.rgb},0.6)` : "none",
        }}>
          {service.title}
        </h3>

        <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.45)" }}>
          {service.text}
        </p>

        {/* Feature list */}
        <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {service.features.map(f => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              <span style={{ color: service.color, display: "flex" }}>
                <LightningBolt size={12} color={service.color} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div style={{
          marginTop: 22, paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontWeight: 800 }}>
            Premium Build
          </span>
          <div style={{
            width: 38, height: 38,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "50%",
            border: `1px solid ${hovered ? `rgba(${service.rgb},0.5)` : "rgba(255,255,255,0.08)"}`,
            background: hovered ? `rgba(${service.rgb},0.15)` : "rgba(255,255,255,0.04)",
            color: hovered ? service.color : "white",
            transition: "all 0.3s ease",
            transform: hovered ? "rotate(45deg)" : "rotate(0)",
            boxShadow: hovered ? `0 0 14px rgba(${service.rgb},0.4)` : "none",
          }}>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── STORM CLOUD BACKGROUND CANVAS ── */
/* ── VOLTAGE LINE ── */
function VoltageLine({ color = "#22d3ee" }) {
  return (
    <div style={{
      height: 2, width: "100%",
      background: `linear-gradient(90deg, transparent 0%, ${color} 20%, white 50%, ${color} 80%, transparent 100%)`,
      animation: "voltage-sweep 3s linear infinite",
      opacity: 0.5,
    }} />
  );
}

/* ── MAIN SECTION ── */
const Services = () => {
  const [activeProcess, setActiveProcess] = useState(null);

  return (
    <section id="services" style={{
      position: "relative", overflow: "hidden",
      background: "#03040a",
      padding: "clamp(4rem,8vw,7rem) clamp(1rem,4vw,1.5rem)",
      color: "white",
    }}>
      {/* Global keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');

        @keyframes bolt-fade {
          0% { opacity: 1; stroke-width: 2; }
          60% { opacity: 0.7; }
          100% { opacity: 0; stroke-width: 0.5; }
        }
        @keyframes spark {
          0% { transform: rotate(var(--angle)) translateX(0); opacity: 1; }
          100% { transform: rotate(var(--angle)) translateX(40px); opacity: 0; }
        }
        @keyframes voltage-sweep {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes storm-orb {
          0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.12; }
          50% { transform: translate(-50%,-50%) scale(1.35); opacity: 0.22; }
        }
        @keyframes storm-orb2 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.08; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.18; }
        }
        @keyframes charge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0); }
          50% { box-shadow: 0 0 0 8px rgba(34,211,238,0.12), 0 0 30px rgba(34,211,238,0.2); }
        }
        @keyframes zap-in {
          0% { opacity: 0; transform: translateY(30px) skewX(-5deg); }
          100% { opacity: 1; transform: translateY(0) skewX(0); }
        }
        @keyframes process-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes float-bolt {
          0%, 100% { transform: translateY(0) rotate(-10deg); opacity: 0.06; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.14; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .svc-card-anim { animation: zap-in 0.6s cubic-bezier(0.23,1,0.32,1) forwards; opacity: 0; }
        .process-step:hover .process-num { animation: process-glow 1.5s ease-in-out infinite; }
      `}</style>

      {/* Storm canvas - animated background lightning */}
      <ThunderBg variant="storm" opacity={0.9} />

      {/* Atmospheric orbs */}
      <div style={{
        position: "absolute", left: "15%", top: "20%",
        width: 700, height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
        animation: "storm-orb 10s ease-in-out infinite",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: "5%", bottom: "20%",
        width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        animation: "storm-orb2 14s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Floating giant bolt decorations */}
      {[{ top: "8%", left: "4%", size: 80 }, { top: "70%", right: "3%", size: 60 }, { top: "40%", left: "92%", size: 45 }].map((s, i) => (
        <div key={i} style={{
          position: "absolute", ...s,
          animation: `float-bolt ${6 + i * 2}s ease-in-out infinite`,
          pointerEvents: "none",
        }}>
          <LightningBolt size={s.size} color="#22d3ee" opacity={1} />
        </div>
      ))}

      {/* Storm grid texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06,
        backgroundImage: "linear-gradient(rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Top voltage line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none" }}>
        <VoltageLine />
      </div>

      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)",
      }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 60 }}>
          <div style={{ maxWidth: 680 }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "6px 16px", borderRadius: 999,
              border: "1px solid rgba(34,211,238,0.25)",
              background: "rgba(34,211,238,0.06)",
              marginBottom: 24,
              animation: "charge-pulse 3s ease-in-out infinite",
            }}>
              <Zap size={13} color="#22d3ee" />
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 13, letterSpacing: "0.3em", color: "#22d3ee",
              }}>
                CHARGED SERVICES
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              letterSpacing: "0.03em",
              lineHeight: 0.95,
              margin: 0,
            }}>
              <span style={{ display: "block", color: "white" }}>SERVICES THAT</span>
              <span style={{
                display: "block",
                background: "linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #e879f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
              }}>
                ELECTRIFY THE WEB
              </span>
            </h2>

            <p style={{
              marginTop: 20, fontSize: 15, lineHeight: 1.8,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: 540,
            }}>
              Frontend, UI/UX, performance, SEO, full stack and backend systems crafted with clean design and smooth user experience.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "clamp(2rem, 6vw, 5rem)", flexWrap: "wrap" }}>
            <ThunderCounter value={50} label="Projects Shipped" color="#22d3ee" />
            <ThunderCounter value={30} label="Happy Clients" color="#fbbf24" />
            <ThunderCounter value={99} label="Satisfaction %" color="#4ade80" />
          </div>
        </div>

        {/* ── MINI FEATURE STRIP ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(180px,100%), 1fr))",
          gap: 12, marginBottom: 48,
        }}>
          {miniFeatures.map((item, i) => (
            <div key={item.title}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 18px", borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                transition: "all 0.3s ease",
                animation: `zap-in 0.5s ${i * 0.1}s cubic-bezier(0.23,1,0.32,1) forwards`,
                opacity: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(34,211,238,0.3)";
                e.currentTarget.style.background = "rgba(34,211,238,0.05)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 14, border: "1px solid rgba(34,211,238,0.15)",
                background: "rgba(34,211,238,0.08)", color: "#22d3ee",
              }}>
                <item.icon size={20} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "white", fontFamily: "'DM Sans', sans-serif" }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SERVICE CARDS GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(300px,100%), 1fr))",
          gap: 20, marginBottom: 56,
        }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* ── PROCESS SECTION ── */}
        <div style={{
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(24px)",
          overflow: "hidden",
          marginBottom: 20,
        }}>
          {/* Header */}
          <div style={{
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 10,
              background: "rgba(34,211,238,0.12)",
              color: "#22d3ee",
            }}>
              <Zap size={16} />
            </div>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22, letterSpacing: "0.08em", color: "white",
            }}>
              STRIKE PROCESS
            </span>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", gap: 6 }}>
              {["#22d3ee", "#818cf8", "#4ade80", "#fbbf24"].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
              ))}
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px,100%), 1fr))" }}>
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="process-step"
                onMouseEnter={() => setActiveProcess(i)}
                onMouseLeave={() => setActiveProcess(null)}
                style={{
                  padding: "28px 24px",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: activeProcess === i ? "rgba(34,211,238,0.04)" : "transparent",
                  transition: "background 0.3s",
                  cursor: "default",
                }}
              >
                <div className="process-num" style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 42, letterSpacing: 2, lineHeight: 1,
                  color: activeProcess === i ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.07)",
                  transition: "color 0.3s",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {activeProcess === i && <LightningBolt size={24} color="#22d3ee" opacity={0.6} />}
                  {step.num}
                </div>
                <h4 style={{
                  marginTop: 10, fontSize: 14, fontWeight: 700,
                  color: activeProcess === i ? "white" : "rgba(255,255,255,0.8)",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "color 0.3s",
                }}>
                  {step.title}
                </h4>
                <p style={{
                  marginTop: 6, fontSize: 12, lineHeight: 1.7,
                  color: "rgba(255,255,255,0.38)",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {step.desc}
                </p>
                {activeProcess === i && (
                  <div style={{ marginTop: 12 }}>
                    <VoltageLine color="#22d3ee" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM STORM BANNER ── */}
        <div style={{
          position: "relative", overflow: "hidden",
          borderRadius: 28,
          border: "1px solid rgba(34,211,238,0.15)",
          background: "linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(129,140,248,0.04) 50%, rgba(232,121,249,0.04) 100%)",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          backdropFilter: "blur(24px)",
        }}>
          {/* Internal glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "50%", height: 80,
            borderRadius: "50%",
            background: "rgba(34,211,238,0.06)",
            filter: "blur(40px)",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }} />

          {/* Corner bolts */}
          <div style={{ position: "absolute", top: 16, left: 16, opacity: 0.2 }}>
            <LightningBolt size={30} color="#22d3ee" />
          </div>
          <div style={{ position: "absolute", bottom: 16, right: 16, opacity: 0.2, transform: "rotate(180deg)" }}>
            <LightningBolt size={30} color="#818cf8" />
          </div>

          <div style={{
            position: "relative",
            display: "flex", flexDirection: "column", gap: 32,
          }}>
            <div>
              <div style={{
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                color: "rgba(34,211,238,0.6)", fontWeight: 800, marginBottom: 14,
              }}>
                ⚡ Complete Website Solution
              </div>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                letterSpacing: "0.04em", lineHeight: 1,
                margin: 0, color: "white",
              }}>
                DESIGN. FRONTEND. BACKEND.{" "}
                <span style={{
                  background: "linear-gradient(90deg, #22d3ee, #818cf8, #e879f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  SEO. PERFORMANCE.
                </span>
              </h3>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
              gap: 10,
            }}>
              {[
                { label: "UI/UX", icon: PenTool, c: "#e879f9" },
                { label: "React", icon: Code2, c: "#818cf8" },
                { label: "Backend", icon: Server, c: "#f87171" },
                { label: "SEO", icon: Search, c: "#fbbf24" },
              ].map(({ label, icon: Icon, c }) => (
                <div key={label}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    padding: "16px 12px", borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(0,0,0,0.4)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${c}55`;
                    e.currentTarget.style.background = `${c}11`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 8px 25px ${c}22`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "rgba(0,0,0,0.4)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon size={18} color={c} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 999,
                background: "linear-gradient(135deg, #22d3ee, #818cf8)",
                color: "#03040a",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 16, letterSpacing: "0.15em",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(34,211,238,0.35)",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 50px rgba(34,211,238,0.55)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(34,211,238,0.35)";
                }}
              >
                <Zap size={15} />
                START A PROJECT
                <ArrowUpRight size={15} />
              </a>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 24px", borderRadius: 999,
                border: "1px solid rgba(34,211,238,0.25)",
                color: "#22d3ee",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 15, letterSpacing: "0.15em",
                cursor: "default",
              }}>
                <Sparkles size={13} />
                WITH KUSHDEVELOPER.ME
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;