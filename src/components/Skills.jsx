import ThunderBg from "./backgrounds/ThunderBg";
import { memo, useState, useCallback, useRef } from "react";
import {
  Code2, GitBranch, Globe, MonitorSmartphone, Sparkles, Terminal, Zap,
} from "lucide-react";

/* ── Data ──────────────────────────────────────────────────────── */
const frontendSkills = [
  { name: "React / Vite", type: "UI Library",  icon: Code2,           color: "#0ea5e9", rgb: "14,165,233" },
  { name: "Tailwind CSS", type: "Styling",      icon: MonitorSmartphone, color: "#60a5fa", rgb: "96,165,250" },
  { name: "JavaScript",   type: "Language",     icon: Zap,             color: "#facc15", rgb: "250,204,21" },
  { name: "Responsive UI",type: "Frontend",     icon: Globe,           color: "#38bdf8", rgb: "56,189,248" },
];
const threeDWebSkills = [
  { name: "Three.js",    type: "3D Library",   icon: Sparkles, color: "#a78bfa", rgb: "167,139,250" },
  { name: "3D Websites", type: "Creative Web", icon: Globe,    color: "#38bdf8", rgb: "56,189,248" },
  { name: "Blender",     type: "3D Design",    icon: Sparkles, color: "#fb923c", rgb: "251,146,60" },
  { name: "WebGL",       type: "Browser 3D",   icon: Zap,      color: "#22d3ee", rgb: "34,211,238" },
];
const programmingSkills = [
  { name: "JavaScript", type: "Language",    icon: Zap,      color: "#facc15", rgb: "250,204,21" },
  { name: "Python",     type: "Language",    icon: Terminal, color: "#60a5fa", rgb: "96,165,250" },
  { name: "C Language", type: "Programming", icon: Code2,    color: "#22c55e", rgb: "34,197,94" },
  { name: "REST APIs",  type: "Integration", icon: Globe,    color: "#c084fc", rgb: "192,132,252" },
];
const tools = [
  { name: "VS Code", icon: Code2,      color: "#22d3ee", rgb: "34,211,238" },
  { name: "CLI",     icon: Terminal,   color: "#22c55e", rgb: "34,197,94" },
  { name: "Git",     icon: GitBranch,  color: "#f472b6", rgb: "244,114,182" },
  { name: "Vite",    icon: Zap,        color: "#f59e0b", rgb: "245,158,11" },
  { name: "GitHub",  icon: GitBranch,  color: "#a78bfa", rgb: "167,139,250" },
  { name: "Deploy",  icon: Globe,      color: "#38bdf8", rgb: "56,189,248" },
];

/* ── SVG Language Logos for Background ────────────────────────── */
const BgLanguageSVGs = memo(() => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, overflow: "hidden" }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="bg-blur"><feGaussianBlur stdDeviation="0.8"/></filter>
      <filter id="bg-blur-md"><feGaussianBlur stdDeviation="1.5"/></filter>
    </defs>

    {/* JS Logo — top left */}
    <g transform="translate(4%, 6%)" opacity="0.055" filter="url(#bg-blur)">
      <rect x="0" y="0" width="72" height="72" rx="8" fill="#facc15"/>
      <text x="8" y="56" fontFamily="monospace" fontWeight="900" fontSize="38" fill="#1a1400">JS</text>
    </g>

    {/* React atom — top right */}
    <g transform="translate(87%, 4%)" opacity="0.05" filter="url(#bg-blur)">
      <ellipse cx="36" cy="36" rx="34" ry="12" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
      <ellipse cx="36" cy="36" rx="34" ry="12" fill="none" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(60 36 36)"/>
      <ellipse cx="36" cy="36" rx="34" ry="12" fill="none" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(120 36 36)"/>
      <circle cx="36" cy="36" r="5" fill="#38bdf8"/>
    </g>

    {/* Python snake logo — left mid */}
    <g transform="translate(2%, 38%)" opacity="0.048" filter="url(#bg-blur)">
      <path d="M30,4 C16,4 18,10 18,18 L18,24 L36,24 L36,28 L14,28 C6,28 4,34 4,42 C4,50 7,54 14,54 L20,54 L20,48 L14,48 C10,48 10,46 10,42 C10,38 11,34 14,34 L40,34 C46,34 50,30 50,24 L50,18 C50,10 47,4 30,4 Z" fill="#60a5fa"/>
      <path d="M42,68 C56,68 54,62 54,54 L54,48 L36,48 L36,44 L58,44 C66,44 68,38 68,30 C68,22 65,18 58,18 L52,18 L52,24 L58,24 C62,24 62,26 62,30 C62,34 61,38 58,38 L32,38 C26,38 22,42 22,48 L22,54 C22,62 25,68 42,68 Z" fill="#facc15"/>
      <circle cx="26" cy="17" r="3" fill="#fff" opacity="0.6"/>
      <circle cx="46" cy="55" r="3" fill="#fff" opacity="0.6"/>
    </g>

    {/* HTML5 badge — center-right */}
    <g transform="translate(88%, 35%)" opacity="0.05" filter="url(#bg-blur)">
      <polygon points="8,0 64,0 58,66 36,72 14,66" fill="#e34c26"/>
      <polygon points="36,66 55,61 58,32 36,32" fill="#ef652a"/>
      <polygon points="36,32 36,20 18,20 20,44 36,44 36,52 50,49 52,32" fill="#fff" opacity="0.9"/>
      <polygon points="36,32 36,20 54,20 52,44 36,44" fill="#fff" opacity="0.55"/>
    </g>

    {/* CSS3 badge — bottom left */}
    <g transform="translate(5%, 72%)" opacity="0.048" filter="url(#bg-blur)">
      <polygon points="8,0 64,0 58,66 36,72 14,66" fill="#264de4"/>
      <polygon points="36,66 55,61 58,32 36,32" fill="#2965f1"/>
      <polygon points="20,20 36,20 36,32 22,32 22,44 36,44 36,52 36,52 20,48 19,38 25,38 26,46 36,46 36,34 18,34" fill="#fff" opacity="0.9"/>
      <polygon points="36,20 52,20 50,38 36,42 36,46 50,42 51,34 37,34 38,32 52,32 54,20 36,20" fill="#fff" opacity="0.55"/>
    </g>

    {/* Three.js / WebGL diamond — bottom right */}
    <g transform="translate(85%, 68%)" opacity="0.05" filter="url(#bg-blur)">
      <polygon points="36,0 72,24 72,60 36,72 0,60 0,24" fill="none" stroke="#a78bfa" strokeWidth="2"/>
      <polygon points="36,14 60,28 60,54 36,62 12,54 12,28" fill="none" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6"/>
      <line x1="36" y1="0" x2="36" y2="72" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4"/>
      <line x1="0" y1="24" x2="72" y2="24" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4"/>
      <line x1="0" y1="60" x2="72" y2="60" stroke="#a78bfa" strokeWidth="0.8" opacity="0.4"/>
    </g>

    {/* Blender tris — center top */}
    <g transform="translate(45%, 2%)" opacity="0.04" filter="url(#bg-blur-md)">
      <polygon points="36,4 68,60 4,60" fill="none" stroke="#fb923c" strokeWidth="2.5"/>
      <polygon points="36,18 56,52 16,52" fill="none" stroke="#fb923c" strokeWidth="1.5" opacity="0.7"/>
      <polygon points="36,30 48,50 24,50" fill="#fb923c" opacity="0.3"/>
    </g>

    {/* Git branch diagram — center-left */}
    <g transform="translate(6%, 52%)" opacity="0.044" filter="url(#bg-blur)">
      <circle cx="16" cy="12" r="7" fill="none" stroke="#f472b6" strokeWidth="2"/>
      <circle cx="16" cy="60" r="7" fill="none" stroke="#f472b6" strokeWidth="2"/>
      <circle cx="52" cy="36" r="7" fill="none" stroke="#f472b6" strokeWidth="2"/>
      <line x1="16" y1="19" x2="16" y2="53" stroke="#f472b6" strokeWidth="2"/>
      <path d="M16,19 Q16,30 52,30" fill="none" stroke="#f472b6" strokeWidth="2"/>
      <path d="M52,42 Q52,53 16,53" fill="none" stroke="#f472b6" strokeWidth="2"/>
    </g>

    {/* Vite lightning — top center-left */}
    <g transform="translate(28%, 1%)" opacity="0.042" filter="url(#bg-blur)">
      <polygon points="44,0 20,40 36,40 28,72 60,28 42,28 56,0" fill="#f59e0b"/>
      <polygon points="44,0 20,40 36,40 28,72 60,28 42,28 56,0" fill="url(#vite-fade)" opacity="0.5"/>
      <defs>
        <linearGradient id="vite-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4"/>
        </linearGradient>
      </defs>
    </g>

    {/* C language brackets — right mid */}
    <g transform="translate(89%, 52%)" opacity="0.05" filter="url(#bg-blur)">
      <text x="0" y="52" fontFamily="monospace" fontWeight="900" fontSize="60" fill="#22c55e" opacity="0.9">C</text>
      <text x="34" y="28" fontFamily="monospace" fontWeight="400" fontSize="20" fill="#22c55e" opacity="0.5">{"{"}</text>
      <text x="34" y="52" fontFamily="monospace" fontWeight="400" fontSize="20" fill="#22c55e" opacity="0.5">{"}"}</text>
    </g>

    {/* Tailwind wave — bottom center */}
    <g transform="translate(38%, 80%)" opacity="0.04" filter="url(#bg-blur)">
      <path d="M0,24 C12,0 24,0 36,24 C48,48 60,48 72,24" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round"/>
      <path d="M0,40 C12,16 24,16 36,40 C48,64 60,64 72,40" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      <path d="M0,56 C12,32 24,32 36,56 C48,80 60,80 72,56" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
    </g>

    {/* VS Code bracket icon — far right mid */}
    <g transform="translate(92%, 18%)" opacity="0.044" filter="url(#bg-blur)">
      <path d="M8,0 L40,20 L40,52 L8,72 L0,60 L28,36 L0,12 Z" fill="#22d3ee"/>
      <path d="M40,0 L48,12 L20,36 L48,60 L40,72 L8,52 L8,20 Z" fill="#22d3ee" opacity="0.55"/>
    </g>

    {/* Floating nano particles */}
    {[
      {cx:"20%", cy:"20%", r:1.5, c:"#6366f1", dur:7},
      {cx:"75%", cy:"15%", r:1,   c:"#38bdf8", dur:9},
      {cx:"15%", cy:"75%", r:2,   c:"#a78bfa", dur:6},
      {cx:"80%", cy:"80%", r:1.5, c:"#f472b6", dur:8},
      {cx:"50%", cy:"50%", r:1,   c:"#facc15", dur:11},
      {cx:"35%", cy:"88%", r:1.5, c:"#34d399", dur:7.5},
      {cx:"65%", cy:"92%", r:1,   c:"#38bdf8", dur:9.5},
    ].map((p,i) => (
      <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.c} opacity="0.35">
        <animate attributeName="opacity" values="0.15;0.5;0.15" dur={`${p.dur}s`} repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur={`${p.dur}s`} repeatCount="indefinite"/>
      </circle>
    ))}

    {/* Circuit line ornaments */}
    <g opacity="0.07" stroke="#6366f1" strokeWidth="0.7" fill="none">
      <path d="M0,150 L30,150 L30,130 L80,130"/>
      <path d="M0,250 L20,250 L20,220 L60,220"/>
      <circle cx="30" cy="150" r="2" fill="#6366f1" opacity="0.6"/>
      <circle cx="20" cy="250" r="2" fill="#818cf8" opacity="0.5"/>
    </g>
    <g opacity="0.06" stroke="#34d399" strokeWidth="0.7" fill="none" transform="translate(100%,0) scale(-1,1)">
      <path d="M0,200 L40,200 L40,170 L90,170"/>
      <path d="M0,350 L25,350 L25,310 L70,310"/>
      <circle cx="40" cy="200" r="2" fill="#34d399" opacity="0.6"/>
      <circle cx="25" cy="350" r="2" fill="#34d399" opacity="0.5"/>
    </g>

    {/* Scanning horizontal line */}
    <line x1="0" y1="0" x2="100%" y2="0" stroke="url(#scan-h)" strokeWidth="0.8" opacity="0.35">
      <animateTransform attributeName="transform" type="translate" values="0,0;0,3000" dur="16s" repeatCount="indefinite"/>
    </line>
    <defs>
      <linearGradient id="scan-h" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="transparent"/>
        <stop offset="25%" stopColor="rgba(56,189,248,0.5)"/>
        <stop offset="50%" stopColor="rgba(99,102,241,0.8)"/>
        <stop offset="75%" stopColor="rgba(52,211,153,0.5)"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
    </defs>
  </svg>
));

/* ── Skill Orb (upgraded) ──────────────────────────────────────── */
const SkillOrb = ({ skill, delay = 0 }) => {
  const Icon = skill.icon;
  const [hov, setHov] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  return (
    <div
      className="skill-fade group relative flex flex-col items-center"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={onMove}
      ref={ref}
    >
      {/* Orb container */}
      <div
        style={{
          position: "relative",
          width: "clamp(96px,14vw,166px)",
          height: "clamp(96px,14vw,166px)",
          borderRadius: "50%",
          border: `1px solid rgba(${skill.rgb},${hov ? 0.6 : 0.3})`,
          background: hov
            ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(${skill.rgb},0.28), rgba(${skill.rgb},0.08) 55%, rgba(2,6,14,0.85) 80%)`
            : `radial-gradient(circle at center, rgba(${skill.rgb},0.18), rgba(${skill.rgb},0.055) 42%, rgba(2,6,14,0.82) 72%)`,
          boxShadow: hov
            ? `0 0 60px rgba(${skill.rgb},0.35), 0 0 120px rgba(${skill.rgb},0.12), inset 0 0 40px rgba(${skill.rgb},0.15)`
            : `0 0 45px rgba(${skill.rgb},0.08), inset 0 0 28px rgba(${skill.rgb},0.08)`,
          transform: hov ? "scale(1.1) translateY(-6px)" : "scale(1) translateY(0)",
          transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
          cursor: "default",
        }}
      >
        {/* SVG ring decorations */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Outer dashed ring */}
          <circle
            cx="50" cy="50"
            r={hov ? "58" : "54"}
            fill="none"
            stroke={`rgba(${skill.rgb},${hov ? 0.3 : 0.14})`}
            strokeWidth="0.8"
            strokeDasharray="4 6"
            style={{ transition: "all 0.4s ease" }}
          >
            {hov && <animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="12s" repeatCount="indefinite"/>}
          </circle>
          {/* Inner ring */}
          <circle
            cx="50" cy="50" r="34"
            fill="none"
            stroke={`rgba(${skill.rgb},${hov ? 0.2 : 0.1})`}
            strokeWidth="0.6"
            style={{ transition: "all 0.4s ease" }}
          >
            {hov && <animateTransform attributeName="transform" type="rotate" values="360 50 50;0 50 50" dur="8s" repeatCount="indefinite"/>}
          </circle>
          {/* Tick marks on outer ring (only on hover) */}
          {hov && [0,45,90,135,180,225,270,315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 50 + 52 * Math.cos(rad);
            const y1 = 50 + 52 * Math.sin(rad);
            const x2 = 50 + 56 * Math.cos(rad);
            const y2 = 50 + 56 * Math.sin(rad);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`rgba(${skill.rgb},0.5)`} strokeWidth="1.2"/>;
          })}
          {/* Center cross-hair on hover */}
          {hov && <>
            <line x1="42" y1="50" x2="46" y2="50" stroke={`rgba(${skill.rgb},0.4)`} strokeWidth="0.8"/>
            <line x1="54" y1="50" x2="58" y2="50" stroke={`rgba(${skill.rgb},0.4)`} strokeWidth="0.8"/>
            <line x1="50" y1="42" x2="50" y2="46" stroke={`rgba(${skill.rgb},0.4)`} strokeWidth="0.8"/>
            <line x1="50" y1="54" x2="50" y2="58" stroke={`rgba(${skill.rgb},0.4)`} strokeWidth="0.8"/>
          </>}
        </svg>

        {/* Glow blob */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: hov ? "70%" : "45%", height: hov ? "70%" : "45%",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: `rgba(${skill.rgb},${hov ? 0.3 : 0.18})`,
          filter: "blur(18px)",
          transition: "all 0.4s ease",
          pointerEvents: "none",
        }}/>

        {/* Icon + label */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center",
          height: "100%", justifyContent: "center",
          transform: hov ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.35s ease",
        }}>
          <Icon
            size={24} strokeWidth={2.5}
            style={{
              color: skill.color,
              filter: `drop-shadow(0 0 ${hov ? "16px" : "8px"} rgba(${skill.rgb},${hov ? 1 : 0.7}))`,
              transition: "filter 0.3s ease",
            }}
          />
          <h3 style={{
            marginTop: 14,
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(9px,1.1vw,11px)",
            fontWeight: 900, textTransform: "uppercase",
            letterSpacing: "0.12em", color: "#fff",
            textAlign: "center",
            textShadow: hov ? `0 0 20px rgba(${skill.rgb},0.6)` : "none",
            transition: "text-shadow 0.3s ease",
          }}>{skill.name}</h3>
        </div>
      </div>

      {/* Type label */}
      <p style={{
        marginTop: 14,
        fontFamily: "'DM Mono',monospace",
        fontSize: "clamp(8px,0.9vw,10px)",
        fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.34em",
        color: `rgba(${skill.rgb},${hov ? 0.9 : 0.55})`,
        transition: "color 0.3s ease",
      }}>{skill.type}</p>
    </div>
  );
};

/* ── Row section header with SVG accent ───────────────────────── */
const SkillRow = ({ title, accent, index, side = "left", skills, theme = "cyan" }) => {
  const isRight = side === "right";
  const themeMap = {
    cyan:   { color: "rgba(34,211,238,0.35)", bg: "rgba(34,211,238,0.08)", text: "#22d3ee" },
    purple: { color: "rgba(167,139,250,0.35)", bg: "rgba(167,139,250,0.08)", text: "#a78bfa" },
    green:  { color: "rgba(34,197,94,0.35)",  bg: "rgba(34,197,94,0.08)",  text: "#22c55e" },
  };
  const t = themeMap[theme];
  const RowIcon = title === "3D Web" ? Sparkles : title === "Programming" ? Terminal : Code2;

  return (
    <div style={{ position: "relative", marginBottom: "clamp(64px,8vw,120px)" }}>
      {/* SVG accent bar behind row heading */}
      <svg style={{ position: "absolute", top: 0, left: isRight ? "auto" : 0, right: isRight ? 0 : "auto", width: "55%", height: "3px", overflow: "visible" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`row-grad-${index}`} x1={isRight ? "1" : "0"} y1="0" x2={isRight ? "0" : "1"} y2="0">
            <stop offset="0%" stopColor={t.text} stopOpacity="0.7"/>
            <stop offset="100%" stopColor={t.text} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="1" fill={`url(#row-grad-${index})`}/>
        {/* Small circuit dots along line */}
        {[10,30,55,80].map((pct, i) => (
          <circle key={i} cx={`${pct}%`} cy="0.5" r="2" fill={t.text} opacity={0.3 + i * 0.1}/>
        ))}
      </svg>

      {/* Row heading */}
      <div style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 16, justifyContent: isRight ? "flex-end" : "flex-start" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${t.color}`, background: t.bg,
        }}>
          <RowIcon size={17} style={{ color: t.text }}/>
        </div>
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "clamp(16px,2.2vw,22px)",
          fontWeight: 900, textTransform: "uppercase",
          letterSpacing: "0.15em", color: "#fff", margin: 0,
        }}>
          {title} <span style={{ color: t.text }}>{accent}</span>
        </h3>
        {/* Index marker */}
        <span style={{
          fontFamily: "'DM Mono',monospace", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.4em", textTransform: "uppercase",
          color: `${t.text}88`, marginLeft: 8,
        }}>{index}</span>
      </div>

      {/* Orb grid */}
      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
        {/* Connector line behind orbs */}
        <div style={{
          position: "absolute", top: "83px", left: "11%", right: "11%", height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)",
          display: "none",
        }} className="skills-connector"/>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
          placeItems: "center",
          gap: "clamp(24px,4vw,48px) clamp(16px,3vw,32px)",
        }}>
          {skills.map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} delay={i * 120}/>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Tool Card (upgraded) ──────────────────────────────────────── */
const ToolCard = ({ tool, delay }) => {
  const Icon = tool.icon;
  const [hov, setHov] = useState(false);

  return (
    <div
      className="skill-fade"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${delay}ms`,
        position: "relative",
        width: "clamp(88px,12vw,112px)",
        height: "clamp(72px,10vw,82px)",
        borderRadius: 18,
        border: hov ? `1px solid rgba(${tool.rgb},0.55)` : "1px solid rgba(255,255,255,0.07)",
        background: hov ? `rgba(${tool.rgb},0.1)` : "rgba(255,255,255,0.025)",
        backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 10, overflow: "hidden",
        transform: hov ? "translateY(-5px) scale(1.04)" : "translateY(0) scale(1)",
        boxShadow: hov ? `0 16px 40px rgba(${tool.rgb},0.2), 0 0 30px rgba(${tool.rgb},0.1)` : "none",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        cursor: "default",
      }}
    >
      {/* SVG top shimmer */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "2px" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`tool-sh-${tool.name.replace(/\s/g,"")}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor={tool.color} stopOpacity={hov ? "0.9" : "0.3"}/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="2" fill={`url(#tool-sh-${tool.name.replace(/\s/g,"")})`}/>
      </svg>

      <Icon
        size={19} strokeWidth={2.4}
        style={{
          color: tool.color,
          filter: `drop-shadow(0 0 ${hov ? "12px" : "6px"} ${tool.color})`,
          transition: "filter 0.3s ease",
          transform: hov ? "scale(1.15)" : "scale(1)",
          transitionProperty: "filter, transform",
        }}
      />
      <span style={{
        fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700,
        color: hov ? "#fff" : "rgba(255,255,255,0.4)",
        transition: "color 0.3s ease",
        textShadow: hov ? `0 0 16px ${tool.color}` : "none",
      }}>{tool.name}</span>
    </div>
  );
};

/* ── CTA Card ──────────────────────────────────────────────────── */
const CTACard = () => {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      marginTop: "clamp(48px,8vw,96px)",
      borderRadius: "clamp(20px,3vw,28px)",
      border: "1px solid rgba(34,211,238,0.12)",
      background: "rgba(7,22,29,0.85)",
      padding: "clamp(40px,6vw,64px) clamp(24px,5vw,48px)",
      textAlign: "center",
      backdropFilter: "blur(24px)",
      boxShadow: "0 0 80px rgba(14,165,233,0.07)",
      position: "relative", overflow: "hidden",
    }}>
      {/* SVG circuit pattern inside CTA */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.08 }} xmlns="http://www.w3.org/2000/svg">
        <path d="M0,40 L40,40 L40,20 L80,20" stroke="#22d3ee" strokeWidth="0.8" fill="none"/>
        <path d="M0,80 L20,80 L20,60 L60,60" stroke="#22d3ee" strokeWidth="0.8" fill="none"/>
        <circle cx="40" cy="40" r="2" fill="#22d3ee"/>
        <circle cx="20" cy="80" r="2" fill="#22d3ee"/>
        <g transform="translate(100%,0) scale(-1,1)">
          <path d="M0,50 L50,50 L50,30 L90,30" stroke="#a78bfa" strokeWidth="0.8" fill="none"/>
          <circle cx="50" cy="50" r="2" fill="#a78bfa"/>
        </g>
      </svg>

      <h2 style={{
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: "clamp(36px,8vw,64px)",
        lineHeight: 1, letterSpacing: "0.06em",
        color: "#fff", margin: "0 0 20px",
      }}>
        Ready to Build Something{" "}
        <span style={{
          background: "linear-gradient(120deg,#e0f2fe,#0ea5e9,#67e8f9)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "skills-ctaGrad 5s ease infinite",
        }}>Real?</span>
      </h2>
      <p style={{
        fontFamily: "'Space Grotesk',sans-serif",
        fontSize: "clamp(13px,1.5vw,15px)",
        lineHeight: 1.8, color: "rgba(255,255,255,.35)",
        maxWidth: 420, margin: "0 auto 32px",
      }}>
        Clean code, practical solutions, continuous learning — let's turn your idea into a working product.
      </p>
      <a
        href="mailto:rabarivishan2@gmail.com"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "14px 36px", borderRadius: 14,
          background: hov ? "#38bef8" : "#0ea5e9",
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 14, fontWeight: 900, color: "#fff",
          textDecoration: "none",
          boxShadow: hov
            ? "0 0 50px rgba(14,165,233,0.5), 0 16px 40px rgba(14,165,233,0.25)"
            : "0 0 30px rgba(14,165,233,0.25)",
          transform: hov ? "translateY(-3px)" : "translateY(0)",
          transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Start Collaboration
      </a>
    </div>
  );
};

/* ── Main Skills Section ───────────────────────────────────────── */
const Skills = () => (
  <section
    id="skills"
    style={{
      position: "relative", overflow: "hidden",
      background: "#020408", color: "#fff",
      padding: "clamp(60px,10vw,112px) clamp(16px,4vw,40px)",
    }}
  >
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

      #skills *, #skills *::before, #skills *::after { box-sizing: border-box; }

      @keyframes skillFade {
        from { opacity:0; transform:translateY(32px) scale(0.94); filter:blur(10px); }
        to   { opacity:1; transform:translateY(0) scale(1); filter:blur(0); }
      }
      @keyframes skills-floatGlow {
        0%,100% { transform:translate3d(0,0,0) scale(1); opacity:.08; }
        50%      { transform:translate3d(24px,-18px,0) scale(1.08); opacity:.14; }
      }
      @keyframes skills-ctaGrad {
        0%,100% { background-position:0% 50%; }
        50%      { background-position:100% 50%; }
      }
      @keyframes skills-pulse {
        0%,100% { opacity:1; transform:scale(1); }
        50%     { opacity:.5; transform:scale(.9); }
      }

      .skill-fade {
        opacity: 0;
        animation: skillFade 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .skills-outline {
        color: transparent;
        -webkit-text-stroke: 1px rgba(255,255,255,0.14);
      }
      @media (min-width: 768px) {
        .skills-connector { display: block !important; }
      }
    `}</style>

    {/* Dot grid bg */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 0, overflow: "hidden",
      backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.16) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
    }}/>

    {/* Thunder bg */}
    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
      <ThunderBg variant="storm" opacity={0.5}/>
    </div>

    {/* Language SVG background */}
    <BgLanguageSVGs/>

    {/* Dark overlay */}
    <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "radial-gradient(ellipse at center,transparent 0%,rgba(2,4,8,0.34) 45%,#020408 100%)", pointerEvents: "none" }}/>

    {/* Cyan glow orb */}
    <div style={{
      position: "absolute", left: "clamp(-96px,-12vw,-48px)", top: 144, zIndex: 1,
      width: "clamp(300px,40vw,520px)", height: "clamp(300px,40vw,520px)",
      borderRadius: "50%", filter: "blur(80px)",
      background: "rgba(14,165,233,0.18)",
      animation: "skills-floatGlow 9s ease-in-out infinite",
    }}/>
    {/* Purple glow orb */}
    <div style={{
      position: "absolute", right: "clamp(-96px,-12vw,-48px)", top: 520, zIndex: 1,
      width: "clamp(300px,40vw,520px)", height: "clamp(300px,40vw,520px)",
      borderRadius: "50%", filter: "blur(80px)",
      background: "rgba(168,85,247,0.16)",
      animation: "skills-floatGlow 11s ease-in-out infinite reverse",
    }}/>

    {/* Bottom fade */}
    <div style={{ position: "absolute", inset: "auto 0 0 0", height: 192, zIndex: 4, background: "linear-gradient(to top,#020408,transparent)", pointerEvents: "none" }}/>

    {/* ── Content ── */}
    <div style={{ position: "relative", zIndex: 10, maxWidth: 1140, margin: "0 auto" }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "clamp(48px,7vw,96px)" }}>
        {/* Decorative SVG halo behind title */}
        <svg style={{ position: "absolute", left: "50%", transform: "translateX(-50%) translateY(-30px)", width: "min(600px,90vw)", height: 180, pointerEvents: "none", zIndex: 0, overflow: "visible" }} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="300" cy="90" rx="260" ry="70" stroke="rgba(34,211,238,0.12)" strokeWidth="1" fill="none" strokeDasharray="5 8"/>
          <ellipse cx="300" cy="90" rx="200" ry="48" stroke="rgba(167,139,250,0.1)" strokeWidth="0.8" fill="none" strokeDasharray="3 10"/>
          <line x1="30" y1="90" x2="570" y2="90" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
            padding: "6px 18px", borderRadius: 999,
            border: "1px solid rgba(34,211,238,0.22)",
            background: "rgba(34,211,238,0.06)", backdropFilter: "blur(16px)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 8px rgba(34,211,238,0.9)", animation: "skills-pulse 2s ease-in-out infinite" }}/>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(103,232,249,0.85)" }}>Tech Stack</span>
          </div>

          <h2 style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(52px,12vw,116px)",
            lineHeight: 0.9, letterSpacing: "0.06em",
            textTransform: "uppercase", margin: 0,
          }}>
            <span style={{
              background: "linear-gradient(90deg,#bae6fd,#22d3ee,#67e8f9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>SKILLS</span>{" "}
            <span className="skills-outline">UNIVERSE</span>
          </h2>

          <p style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: "clamp(13px,1.5vw,15px)",
            fontWeight: 500, color: "rgba(255,255,255,.32)",
            maxWidth: 480, margin: "18px auto 0", lineHeight: 1.8,
          }}>
            An interactive constellation of technologies powering my capabilities.
          </p>
        </div>
      </div>

      {/* Skill rows */}
      <SkillRow title="Frontend"    accent="Galaxy" index="01" side="left"  theme="cyan"   skills={frontendSkills}/>
      <SkillRow title="3D Web"      accent="Nebula" index="02" side="right" theme="purple" skills={threeDWebSkills}/>
      <SkillRow title="Programming" accent="Core"   index="03" side="left"  theme="green"  skills={programmingSkills}/>

      {/* Tools */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 8 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 36,
          padding: "7px 20px", borderRadius: 999,
          border: "1px solid rgba(34,211,238,0.14)",
          background: "rgba(255,255,255,0.025)", backdropFilter: "blur(16px)",
        }}>
          <Sparkles size={14} style={{ color: "#22d3ee" }}/>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.75)" }}>
            Tools & Platforms
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {tools.map((tool, i) => <ToolCard key={tool.name} tool={tool} delay={i * 90}/>)}
        </div>
      </div>

      {/* CTA */}
      <CTACard/>
    </div>
  </section>
);

export default Skills;
