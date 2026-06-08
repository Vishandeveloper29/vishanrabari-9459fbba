import ThunderBg from "./backgrounds/ThunderBg";
import { memo, useEffect, useRef, useState, useCallback } from "react";

/* ── Data ──────────────────────────────────────────────────────── */
const JOURNEY = [
  {
    phase: "Phase 01",
    year: "2022",
    title: "The Spark",
    subtitle: "First Line of Code",
    desc: "Started with HTML & CSS, built my first webpage. Fell in love with turning design into reality through code.",
    tags: ["HTML", "CSS", "Basics"],
    color: "99,102,241",
    accent: "#6366f1",
    icon: "⚡",
    status: "Completed",
  },
  {
    phase: "Phase 02",
    year: "2023",
    title: "JavaScript Era",
    subtitle: "Logic & Interactivity",
    desc: "Learned JavaScript deeply — DOM manipulation, async patterns, REST APIs. Built interactive projects and started freelancing.",
    tags: ["JavaScript", "APIs", "Freelance"],
    color: "250,204,21",
    accent: "#facc15",
    icon: "🔥",
    status: "Completed",
  },
  {
    phase: "Phase 03",
    year: "2023",
    title: "React Universe",
    subtitle: "Component Architecture",
    desc: "Discovered React and Tailwind CSS. Built complex UIs, mastered hooks, and started crafting premium dark-glass interfaces.",
    tags: ["React", "Tailwind", "Vite", "Hooks"],
    color: "56,189,248",
    accent: "#38bdf8",
    icon: "🚀",
    status: "Completed",
  },
  {
    phase: "Phase 04",
    year: "2024",
    title: "Ayik Solution",
    subtitle: "Manager & Developer",
    desc: "Joined Ayik Solution as Manager & Developer. Delivered real client projects, led the frontend team, shipped production apps.",
    tags: ["Leadership", "Client Work", "Production"],
    color: "167,139,250",
    accent: "#a78bfa",
    icon: "💼",
    status: "Active",
    link: "https://ayiksolution.vercel.app/",
  },
  {
    phase: "Phase 05",
    year: "2024–Now",
    title: "3D & Advanced UI",
    subtitle: "Three.js · WebGL · Blender",
    desc: "Diving into 3D web — Three.js, WebGL shaders, Blender models. Building cinematic, physics-driven portfolio experiences.",
    tags: ["Three.js", "WebGL", "Blender", "GSAP"],
    color: "52,211,153",
    accent: "#34d399",
    icon: "🌐",
    status: "Current",
  },
];

/* ── Spine line ────────────────────────────────────────────────── */
const SpineLine = () => (
  <div style={{
    width: 1, height: "100%",
    background: "linear-gradient(180deg,transparent 0%,rgba(99,102,241,.5) 12%,rgba(168,85,247,.4) 35%,rgba(244,114,182,.4) 58%,rgba(52,211,153,.4) 80%,transparent 100%)",
  }} />
);

/* ── Heading ───────────────────────────────────────────────────── */
const HeadingSection = () => (
  <div style={{ textAlign: "center", marginBottom: "clamp(48px,7vw,88px)" }}>
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
);

/* ── Card ──────────────────────────────────────────────────────── */
const MagneticCard = ({ item, index }) => {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const isLeft = index % 2 === 0;

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientY - r.top)  / r.height - 0.5) * -8,
      y: ((e.clientX - r.left) / r.width  - 0.5) *  8,
    });
  }, []);

  const statusColors = {
    Completed: { bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  text: "#34d399" },
    Active:    { bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.3)",  text: "#818cf8" },
    Current:   { bg: "rgba(250,204,21,0.08)", border: "rgba(250,204,21,0.3)",  text: "#facc15" },
  };
  const sc = statusColors[item.status] || statusColors.Completed;

  return (
    <div
      className={`journey-row journey-row--${isLeft ? "left" : "right"}`}
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      {/* Timeline dot */}
      <div className="journey-dot" style={{
        position: "absolute", left: 22, top: 28, zIndex: 2,
        width: 20, height: 20,
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: "50%",
          background: `rgba(${item.color},0.15)`,
          border: `2px solid rgba(${item.color},0.6)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.accent, boxShadow: `0 0 8px ${item.accent}` }} />
        </div>
        {/* Ping */}
        {item.status === "Current" && (
          <div style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: `1px solid rgba(${item.color},0.5)`,
            animation: "journey-ping 2s ease-in-out infinite",
          }} />
        )}
      </div>

      {/* Card */}
      <div
        className="journey-card-inner"
        ref={cardRef}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x:0, y:0 }); }}
        onMouseMove={onMove}
        style={{
          marginLeft: 54,
          transform: hov ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)` : "perspective(900px) rotateX(0) rotateY(0)",
          transition: "transform 0.25s ease, box-shadow 0.3s ease",
          borderRadius: 24,
          border: hov ? `1px solid rgba(${item.color},0.45)` : "1px solid rgba(255,255,255,0.07)",
          background: hov ? `rgba(${item.color},0.06)` : "rgba(255,255,255,0.025)",
          backdropFilter: "blur(28px)",
          boxShadow: hov ? `0 24px 70px rgba(0,0,0,0.45), 0 0 40px rgba(${item.color},0.12)` : "0 8px 32px rgba(0,0,0,0.3)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Top shimmer */}
        <div style={{ position: "absolute", inset: "0 0 auto 0", height: 1, background: `linear-gradient(90deg,transparent,rgba(${item.color},0.6),transparent)`, opacity: hov ? 1 : 0.4, transition: "opacity .3s" }} />

        {/* Glow blob */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: `rgba(${item.color},0.1)`, filter: "blur(40px)", opacity: hov ? 1 : 0.3, transition: "opacity .4s", pointerEvents: "none" }} />

        <div style={{ padding: "clamp(18px,3vw,28px)" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
                background: `rgba(${item.color},0.1)`,
                border: `1px solid rgba(${item.color},0.25)`,
              }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: `rgba(${item.color},0.8)`, marginBottom: 2 }}>
                  {item.phase} · {item.year}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.1 }}>
                  {item.title}
                </h3>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 999, border: `1px solid ${sc.border}`, background: sc.bg, fontFamily: "'DM Mono',monospace", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: sc.text }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: sc.text, boxShadow: `0 0 6px ${sc.text}` }} />
                {item.status}
              </span>
            </div>
          </div>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(12px,1.5vw,14px)", lineHeight: 1.85, color: "rgba(255,255,255,.45)", margin: "0 0 16px" }}>
            {item.desc}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tags.map(tag => (
              <span key={tag} className="journey-tag" style={{
                padding: "4px 10px", borderRadius: 999,
                border: `1px solid rgba(${item.color},0.22)`,
                background: `rgba(${item.color},0.06)`,
                fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: `rgba(${item.color},0.85)`,
                transition: "all .25s ease",
              }}>{tag}</span>
            ))}
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" style={{
                padding: "4px 10px", borderRadius: 999,
                border: `1px solid rgba(${item.color},0.4)`,
                background: `rgba(${item.color},0.1)`,
                fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: item.accent, textDecoration: "none",
                transition: "all .25s ease",
              }}>↗ Visit</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Deco layer (CSS only, zero RAF) ───────────────────────────── */
const ORB_CONFIG = [
  { x:"8%",  y:"10%", size:320, color:"99,102,241",  delay:0, dur:14 },
  { x:"80%", y:"5%",  size:240, color:"168,85,247",  delay:2, dur:11 },
  { x:"85%", y:"55%", size:280, color:"236,72,153",  delay:1, dur:16 },
  { x:"5%",  y:"65%", size:200, color:"20,184,166",  delay:3, dur:12 },
];

const DecoLayer = memo(() => (
  <div style={{ position:"absolute", inset:0, zIndex:8, overflow:"hidden", pointerEvents:"none" }}>
    {ORB_CONFIG.map((o,i) => (
      <div key={i} style={{
        position:"absolute", left:o.x, top:o.y,
        width:o.size, height:o.size, borderRadius:"50%",
        background:`radial-gradient(circle,rgba(${o.color},.07) 0%,transparent 70%)`,
        filter:"blur(40px)",
        animation:`journey-float ${o.dur}s ease-in-out infinite ${o.delay}s`,
      }}/>
    ))}
  </div>
));

/* ── Section ───────────────────────────────────────────────────── */
const Journey = () => (
  <section id="journey" style={{
    position:"relative", overflow:"hidden",
    background:"#03040f", color:"#fff",
    padding:"clamp(70px,10vw,112px) clamp(16px,4vw,40px)",
  }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
      #journey *,#journey *::before,#journey *::after{box-sizing:border-box;}
      @keyframes journey-ping  {0%{transform:scale(1);opacity:.6}75%,100%{transform:scale(2.2);opacity:0}}
      @keyframes journey-pulse {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.9)}}
      @keyframes journey-grad  {0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
      @keyframes journey-float {0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
      .journey-tag:hover{border-color:rgba(255,255,255,.22)!important;color:rgba(255,255,255,.8)!important;background:rgba(255,255,255,.05)!important;}
      @media(min-width:768px){
        .journey-spine-mobile{display:none!important;}
        .journey-spine-center{display:block!important;}
        .journey-row{display:flex!important;}
        .journey-row--left {padding-right:52%!important;flex-direction:row!important;}
        .journey-row--right{padding-left:52%!important;flex-direction:row-reverse!important;}
        .journey-dot{left:calc(50% - 10px)!important;}
        .journey-card-inner{margin-left:0!important;}
      }
    `}</style>

    {/* Bg layers */}
    <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 120% 80% at 50% 0%,rgba(15,10,40,1) 0%,#03040f 60%)" }}/>
    <div style={{ position:"absolute", inset:0, zIndex:1 }}><ThunderBg variant="purple" opacity={0.75}/></div>
    <div style={{ position:"absolute", inset:0, zIndex:7, pointerEvents:"none", background:"radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(3,4,15,.65) 100%)" }}/>
    <DecoLayer/>

    {/* Content */}
    <div style={{ position:"relative", zIndex:10, maxWidth:1000, margin:"0 auto" }}>
      <HeadingSection/>

      <div style={{ position:"relative" }}>
        {/* Mobile spine */}
        <div className="journey-spine-mobile" style={{ position:"absolute", left:27, top:0, bottom:0, width:1, zIndex:1 }}>
          <SpineLine/>
        </div>
        {/* Desktop spine */}
        <div className="journey-spine-center" style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, transform:"translateX(-50%)", zIndex:1, display:"none" }}>
          <SpineLine/>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"clamp(32px,5vw,64px)" }}>
          {JOURNEY.map((item,i) => <MagneticCard key={item.phase} item={item} index={i}/>)}
        </div>
      </div>

      {/* Footer pill */}
      <div style={{ marginTop:"clamp(48px,7vw,96px)", textAlign:"center" }}>
        <div style={{
          display:"inline-flex", alignItems:"center", gap:14, flexWrap:"wrap", justifyContent:"center",
          padding:"clamp(10px,2vw,14px) clamp(16px,3vw,28px)", borderRadius:20,
          border:"1px solid rgba(255,255,255,.07)", background:"rgba(255,255,255,.03)",
          backdropFilter:"blur(20px)", boxShadow:"0 4px 32px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06)",
        }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#a78bfa", animation:"journey-pulse 2s ease-in-out infinite", boxShadow:"0 0 12px rgba(167,139,250,.8)", flexShrink:0 }}/>
          <span style={{ fontSize:"clamp(11px,1.5vw,13px)", fontWeight:600, color:"rgba(255,255,255,.38)", fontFamily:"'DM Sans',sans-serif", letterSpacing:".02em" }}>
            Still building · Always learning · Open to new opportunities
          </span>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#f472b6", animation:"journey-pulse 2s ease-in-out infinite .8s", boxShadow:"0 0 12px rgba(244,114,182,.8)", flexShrink:0 }}/>
        </div>
      </div>
    </div>
  </section>
);

export default Journey;
