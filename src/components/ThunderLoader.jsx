import { useEffect, useRef, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   THUNDER LOADER
═══════════════════════════════════════════════════════════ */
function ThunderLoader({ onDone }) {
  const canvasRef = useRef(null);
  const loaderRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const doneRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  const [crackPts, setCrackPts] = useState("");
  const [crackPts2, setCrackPts2] = useState("");

  const rand = useCallback((a, b) => a + Math.random() * (b - a), []);

  const generateCrack = useCallback(() => {
    const H = loaderRef.current?.offsetHeight || 600;
    let pts = [[0, 0]];
    let y = 0, x = 0;
    while (y < H) {
      y += rand(20, 45);
      x = rand(-4, 4);
      pts.push([x, y]);
    }
    pts.push([0, H]);
    return pts.map(p => p.join(",")).join(" ");
  }, [rand]);

  const drawBolt = useCallback((ctx, cx, W, H, alpha) => {
    ctx.save();
    const colors = ["#818cf8", "#38bdf8", "#ffffff"];
    for (let pass = 0; pass < 3; pass++) {
      ctx.globalAlpha = alpha * (pass === 2 ? 0.95 : pass === 1 ? 0.35 : 0.15);
      ctx.lineWidth = pass === 2 ? 1.5 : pass === 1 ? 5 : 12;
      ctx.shadowBlur = pass === 2 ? 20 : pass === 1 ? 40 : 0;
      ctx.shadowColor = pass === 2 ? "#818cf8" : "#38bdf8";
      ctx.strokeStyle = colors[pass];
      ctx.beginPath();
      let x = cx, y = 0;
      ctx.moveTo(x, y);
      for (let i = 1; i <= 22; i++) {
        const t = i / 22;
        y = t * H;
        x = cx + rand(-14, 14) * (1 - Math.abs(t - 0.5));
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    for (let b = 0; b < 3; b++) {
      const startY = rand(H * 0.15, H * 0.65);
      const endY = startY + rand(60, 140);
      const dir = b % 2 === 0 ? 1 : -1;
      ctx.globalAlpha = alpha * 0.45;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "#a5b4fc";
      ctx.shadowColor = "#818cf8";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      let bx = cx, by = startY;
      ctx.moveTo(bx, by);
      for (let i = 1; i <= 8; i++) {
        const t = i / 8;
        by = startY + t * (endY - startY);
        bx = cx + dir * rand(5, 30) * t;
        ctx.lineTo(bx, by);
      }
      ctx.stroke();
    }
    ctx.restore();
  }, [rand]);

  const flashScreen = useCallback((duration = 50) => {
    const el = document.getElementById("vr-flash");
    if (!el) return;
    el.style.opacity = "0.9";
    el.style.transition = "opacity 0s";
    setTimeout(() => {
      el.style.transition = "opacity 0.35s ease";
      el.style.opacity = "0";
    }, duration);
  }, []);

  const doBoltSequence = useCallback((totalFlashes, onComplete) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height, cx = W / 2;
    let count = 0;
    function oneStrike() {
      if (count >= totalFlashes) { onComplete(); return; }
      count++;
      ctx.clearRect(0, 0, W, H);
      drawBolt(ctx, cx, W, H, rand(0.7, 1));
      flashScreen(count === totalFlashes ? 100 : 40);
      const gap = count < totalFlashes - 1 ? rand(80, 180) : rand(500, 700);
      setTimeout(() => {
        ctx.clearRect(0, 0, W, H);
        setTimeout(oneStrike, rand(50, 120));
      }, gap);
    }
    oneStrike();
  }, [drawBolt, flashScreen, rand]);

  const LOAD_TIME = 3000;
  const tick = useCallback((ts) => {
    if (doneRef.current) return;
    if (!startRef.current) startRef.current = ts;
    const elapsed = ts - startRef.current;
    const p = Math.min(elapsed / LOAD_TIME, 1);
    setProgress(p);
    if (p < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setPhase("striking");
      setTimeout(() => {
        doBoltSequence(4, () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBolt(ctx, canvas.width / 2, canvas.width, canvas.height, 1);
          }
          flashScreen(120);
          setCrackPts(generateCrack());
          setCrackPts2(generateCrack());
          setTimeout(() => {
            if (canvasRef.current) {
              canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            setPhase("split");
            doneRef.current = true;
            setTimeout(() => { onDone?.(); }, 900);
          }, 350);
        });
      }, 200);
    }
  }, [doBoltSequence, drawBolt, flashScreen, generateCrack, onDone]);

  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !loaderRef.current) return;
      canvasRef.current.width = loaderRef.current.offsetWidth;
      canvasRef.current.height = loaderRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const pct = Math.round(progress * 100);
  const isSplit = phase === "split";

  return (
    <div ref={loaderRef} id="vr-loader" style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#020408", overflow: "hidden",
      fontFamily: "'Space Grotesk', sans-serif", perspective: "1200px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@500&family=Space+Grotesk:wght@700;900&display=swap');
        #vr-loader * { box-sizing: border-box; }
        .vr-panel { position:absolute; top:0; width:50%; height:100%; will-change:transform; transition:transform 1s cubic-bezier(.77,0,.18,1), opacity .8s ease; backface-visibility:hidden; }
        .vr-panel-left { left:0; transform-origin:left center; }
        .vr-panel-right { right:0; transform-origin:right center; }
        .vr-panel-left.split { transform:translateX(-105%) rotateY(10deg); }
        .vr-panel-right.split { transform:translateX(105%) rotateY(-10deg); }
        .vr-scan { position:absolute; left:0; width:100%; height:2px; background:linear-gradient(90deg,transparent,rgba(129,140,248,.7),rgba(56,189,248,.9),rgba(129,140,248,.7),transparent); pointer-events:none; opacity:0; animation:vr-scan-run 2.8s ease-in-out 0.4s forwards; }
        @keyframes vr-scan-run { 0%{top:0%;opacity:0} 5%{opacity:1} 95%{opacity:.8} 100%{top:100%;opacity:0} }
        .vr-crack-line { position:absolute; top:0; left:50%; width:2px; height:100%; transform:translateX(-50%); pointer-events:none; z-index:22; }
        .vr-crack-svg { position:absolute; top:0; left:50%; width:24px; height:100%; transform:translateX(-50%); pointer-events:none; z-index:23; overflow:visible; opacity:0; transition:opacity .15s ease; }
        .vr-crack-svg.visible { opacity:1; }
        @keyframes vr-progress-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .vr-behind { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:10px; opacity:0; transition:opacity .7s ease .15s; z-index:5; }
        .vr-behind.visible { opacity:1; }
        @keyframes vr-name-in { from{opacity:0;transform:scale(.92) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .vr-behind.visible .vr-name-big { animation:vr-name-in .7s cubic-bezier(.16,1,.3,1) .3s both; }
        .vr-progress-bar { position:absolute; bottom:36px; left:50%; transform:translateX(-50%); width:clamp(140px,25vw,200px); height:2px; background:rgba(255,255,255,.08); border-radius:999px; z-index:35; overflow:hidden; }
        .vr-progress-fill { height:100%; background:linear-gradient(90deg,#818cf8,#38bdf8); border-radius:999px; transition:width .06s linear; }
        @keyframes vr-shimmer { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        .vr-shimmer-bar { position:absolute; inset:0; overflow:hidden; border-radius:999px; }
        .vr-shimmer-bar::after { content:''; position:absolute; top:0; left:0; width:40%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent); animation:vr-shimmer 1.4s ease-in-out infinite; }
      `}</style>

      <div className={`vr-behind${isSplit ? " visible" : ""}`}>
        <div style={{ width:80, height:80, borderRadius:"50%", background:"linear-gradient(135deg,rgba(129,140,248,.22),rgba(56,189,248,.14))", border:"1px solid rgba(129,140,248,.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:900, color:"#e2e8f0", boxShadow:"0 0 40px rgba(129,140,248,.4),0 0 80px rgba(129,140,248,.15)" }}>VR</div>
        <div className="vr-name-big" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(36px,8vw,72px)", letterSpacing:".05em", background:"linear-gradient(110deg,#fff 0%,#7dd3fc 35%,#a78bfa 65%,#fff 100%)", backgroundSize:"200% 100%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>VISHAN RABARI</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:".32em", textTransform:"uppercase", color:"rgba(125,211,252,.5)" }}>Frontend Developer</div>
      </div>

      {phase === "loading" && <div className="vr-scan" />}

      <div className={`vr-panel vr-panel-left${isSplit ? " split" : ""}`}>
        <div style={{ position:"absolute", inset:0, background:"#020408", display:"flex", alignItems:"center", justifyContent:"flex-end", paddingRight:"clamp(20px,5vw,56px)" }}>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(38px,9vw,96px)", color:"rgba(255,255,255,.94)", letterSpacing:".04em", lineHeight:.88 }}>TURNING<br />IDEAS</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(129,140,248,.4)", marginTop:10 }}>Vishandeveloper.me</div>
          </div>
        </div>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,transparent 55%,rgba(129,140,248,.12))", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:"repeating-linear-gradient(0deg,rgba(129,140,248,.8) 0,rgba(129,140,248,.8) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(129,140,248,.8) 0,rgba(129,140,248,.8) 1px,transparent 1px,transparent 60px)", pointerEvents:"none" }} />
      </div>

      <div className={`vr-panel vr-panel-right${isSplit ? " split" : ""}`}>
        <div style={{ position:"absolute", inset:0, background:"#020408", display:"flex", alignItems:"center", justifyContent:"flex-start", paddingLeft:"clamp(20px,5vw,56px)" }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(38px,9vw,96px)", color:"rgba(255,255,255,.94)", letterSpacing:".04em", lineHeight:.88 }}>INTO<br />WEBSITES</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(56,189,248,.4)", marginTop:10 }}>React · Three.js · Vite</div>
          </div>
        </div>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left,transparent 55%,rgba(56,189,248,.12))", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, opacity:.04, backgroundImage:"repeating-linear-gradient(0deg,rgba(56,189,248,.8) 0,rgba(56,189,248,.8) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(56,189,248,.8) 0,rgba(56,189,248,.8) 1px,transparent 1px,transparent 60px)", pointerEvents:"none" }} />
      </div>

      {!isSplit && (
        <div className="vr-crack-line" style={{ background: phase === "striking" ? "linear-gradient(to bottom,transparent,rgba(129,140,248,.6),rgba(56,189,248,.8),rgba(129,140,248,.6),transparent)" : "linear-gradient(to bottom,transparent,rgba(255,255,255,.06),transparent)", zIndex:20 }} />
      )}

      <svg className={`vr-crack-svg${phase === "split" || phase === "striking" ? " visible" : ""}`} viewBox="0 0 24 600" preserveAspectRatio="none" style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:24, height:"100%", zIndex:23, pointerEvents:"none", overflow:"visible", opacity: phase === "striking" || phase === "split" ? 1 : 0, transition:"opacity .15s" }}>
        <defs><filter id="crack-glow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        {crackPts && (<><polyline points={crackPts} stroke="#818cf8" strokeWidth="2" fill="none" filter="url(#crack-glow)" /><polyline points={crackPts2} stroke="#38bdf8" strokeWidth="1" fill="none" opacity=".55" /><polyline points={crackPts} stroke="#ffffff" strokeWidth=".5" fill="none" opacity=".6" /></>)}
      </svg>

      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, zIndex:30, pointerEvents:"none" }} />
      <div id="vr-flash" style={{ position:"absolute", inset:0, zIndex:25, background:"radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.95),rgba(129,140,248,.5) 50%,transparent 75%)", opacity:0, pointerEvents:"none" }} />

      {phase === "loading" && (
        <>
          <div className="vr-progress-bar" style={{ zIndex:40 }}>
            <div className="vr-progress-fill" style={{ width:`${pct}%` }}><div className="vr-shimmer-bar" /></div>
          </div>
          <div style={{ position:"absolute", bottom:52, left:"50%", transform:"translateX(-50%)", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(129,140,248,.55)", zIndex:40, whiteSpace:"nowrap", animation:"vr-progress-pulse 1.4s ease-in-out infinite" }}>{pct}%</div>
          <div style={{ position:"absolute", bottom:16, left:"50%", transform:"translateX(-50%)", fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.16)", zIndex:40, whiteSpace:"nowrap" }}>Loading portfolio</div>
        </>
      )}
      {phase === "striking" && (
        <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:".32em", textTransform:"uppercase", color:"rgba(129,140,248,.7)", zIndex:40, whiteSpace:"nowrap" }}>INCOMING ⚡</div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO DATA
═══════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    tag: "Web App",
    title: "3D Product Configurator",
    desc: "Real-time 3D product customization tool built with Three.js and React. Drag, rotate, recolor — all in the browser at 60fps.",
    tech: ["React", "Three.js", "GLSL", "Vite"],
    year: "2024",
    color: "#818cf8",
  },
  {
    id: 2,
    tag: "UI/UX",
    title: "Finance Dashboard",
    desc: "Data-dense analytics dashboard with animated charts, real-time portfolio updates, and pixel-perfect dark mode.",
    tech: ["React", "Recharts", "Framer Motion", "TailwindCSS"],
    year: "2024",
    color: "#38bdf8",
  },
  {
    id: 3,
    tag: "Full Stack",
    title: "Dev Community Platform",
    desc: "Developer forum and code-snippet sharing platform — think Stack Overflow meets Dribbble. Built end-to-end.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Vercel"],
    year: "2023",
    color: "#a78bfa",
  },
  {
    id: 4,
    tag: "Creative",
    title: "Generative Art Gallery",
    desc: "Procedurally generated canvas art — every render is unique. Exported as high-res SVG for print.",
    tech: ["Canvas API", "WebGL", "React", "p5.js"],
    year: "2023",
    color: "#34d399",
  },
];

const SKILLS = [
  { name: "React", level: 96 },
  { name: "Three.js", level: 88 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 82 },
  { name: "GLSL / WebGL", level: 75 },
  { name: "Framer Motion", level: 93 },
  { name: "Vite / Webpack", level: 87 },
  { name: "CSS / GSAP", level: 95 },
];

/* ═══════════════════════════════════════════════════════════
   CURSOR (custom electric cursor)
═══════════════════════════════════════════════════════════ */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    const over = () => { ringRef.current && (ringRef.current.style.transform += " scale(1.8)"); };
    const out = () => {};
    document.querySelectorAll("a,button,[data-hover]").forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:"fixed", width:8, height:8, background:"#818cf8", borderRadius:"50%", pointerEvents:"none", zIndex:9998, top:0, left:0, mixBlendMode:"difference" }} />
      <div ref={ringRef} style={{ position:"fixed", width:40, height:40, border:"1px solid rgba(129,140,248,.6)", borderRadius:"50%", pointerEvents:"none", zIndex:9997, top:0, left:0, transition:"transform 0s", mixBlendMode:"difference" }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════ */
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Work", "About", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: "0 clamp(20px,5vw,60px)",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(2,4,8,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(129,140,248,.1)" : "none",
      transition: "all .3s ease",
    }}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:".08em", color:"#e2e8f0", cursor:"pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        VR
      </div>
      <div style={{ display:"flex", gap:"clamp(16px,3vw,36px)", alignItems:"center" }}>
        {links.map(l => (
          <button key={l} data-hover onClick={() => {
            setActive(l);
            const id = l.toLowerCase();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'DM Mono',monospace", fontSize: 11,
            letterSpacing: ".28em", textTransform: "uppercase",
            color: active === l ? "#818cf8" : "rgba(255,255,255,.45)",
            transition: "color .2s",
            padding: "4px 0",
            borderBottom: active === l ? "1px solid #818cf8" : "1px solid transparent",
          }}>{l}</button>
        ))}
        <a href="mailto:vishan@vishandeveloper.me" data-hover style={{
          background: "linear-gradient(135deg,#818cf8,#38bdf8)",
          color: "#020408", border: "none", borderRadius: 6,
          padding: "8px 18px", fontSize: 11, fontFamily: "'DM Mono',monospace",
          letterSpacing: ".2em", textTransform: "uppercase",
          cursor: "pointer", textDecoration: "none", fontWeight: 700,
          display: "none",
        }} className="nav-hire">Hire me</a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════ */
function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    let animId;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .5,
      color: Math.random() > .5 ? "129,140,248" : "56,189,248",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},.5)`;
        ctx.fill();
      });
      // connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(129,140,248,${(1 - dist / 120) * .15})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const [typed, setTyped] = useState("");
  const words = ["React Developer", "UI Engineer", "Three.js Creator", "Frontend Architect"];
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    const type = () => {
      const word = words[wordIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(word.slice(0, charIdx.current));
        if (charIdx.current === word.length) { deleting.current = true; timeout = setTimeout(type, 1800); return; }
      } else {
        charIdx.current--;
        setTyped(word.slice(0, charIdx.current));
        if (charIdx.current === 0) { deleting.current = false; wordIdx.current = (wordIdx.current + 1) % words.length; }
      }
      timeout = setTimeout(type, deleting.current ? 60 : 90);
    };
    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: "#020408",
    }}>
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, pointerEvents:"none" }} />

      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"20%", left:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(129,140,248,.08) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"8%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"0 clamp(20px,5vw,60px)", maxWidth:900 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:".4em", textTransform:"uppercase", color:"rgba(129,140,248,.6)", marginBottom:24, opacity:0, animation:"fadeUp .6s ease .2s forwards" }}>
          ⚡ Available for freelance
        </div>

        <h1 style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(52px,12vw,140px)",
          lineHeight: .9,
          letterSpacing: ".03em",
          margin: "0 0 8px",
          color: "#fff",
          opacity: 0,
          animation: "fadeUp .7s ease .35s forwards",
        }}>
          VISHAN
          <br />
          <span style={{
            background: "linear-gradient(110deg,#818cf8 0%,#38bdf8 50%,#a78bfa 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>RABARI</span>
        </h1>

        <div style={{
          height: 40, display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily: "'DM Mono',monospace", fontSize:"clamp(14px,2.5vw,18px)",
          color:"rgba(255,255,255,.55)", letterSpacing:".12em",
          opacity: 0, animation: "fadeUp .7s ease .5s forwards",
          marginBottom: 8,
        }}>
          {typed}<span style={{ borderRight:"2px solid #818cf8", animation:"blink .8s step-end infinite" }}>&nbsp;</span>
        </div>

        <p style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "clamp(14px,2vw,17px)",
          color: "rgba(255,255,255,.35)",
          maxWidth: 520, margin: "0 auto 40px",
          lineHeight: 1.7,
          opacity: 0, animation: "fadeUp .7s ease .65s forwards",
        }}>
          I craft immersive web experiences at the intersection of design and engineering — turning bold ideas into pixel-perfect, performant realities.
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", opacity:0, animation:"fadeUp .7s ease .8s forwards" }}>
          <button data-hover onClick={() => document.getElementById("work")?.scrollIntoView({ behavior:"smooth" })} style={{
            background: "linear-gradient(135deg,#818cf8,#38bdf8)",
            border: "none", borderRadius: 8,
            padding: "14px 32px",
            fontFamily: "'DM Mono',monospace", fontSize: 12,
            letterSpacing: ".22em", textTransform: "uppercase",
            color: "#020408", fontWeight: 700, cursor: "pointer",
            transition: "transform .2s,box-shadow .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >View My Work</button>

          <a href="https://vishandeveloper.me" target="_blank" rel="noopener" data-hover style={{
            background: "transparent",
            border: "1px solid rgba(129,140,248,.35)",
            borderRadius: 8, padding: "14px 32px",
            fontFamily: "'DM Mono',monospace", fontSize: 12,
            letterSpacing: ".22em", textTransform: "uppercase",
            color: "rgba(255,255,255,.7)", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
            transition: "border-color .2s,color .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(129,140,248,.7)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(129,140,248,.35)"; e.currentTarget.style.color = "rgba(255,255,255,.7)"; }}
          >Live Site ↗</a>
        </div>

        {/* Social links */}
        <div style={{ display:"flex", gap:24, justifyContent:"center", marginTop:48, opacity:0, animation:"fadeUp .7s ease .95s forwards" }}>
          {[
            { label:"GitHub", href:"https://github.com/vishanrabari" },
            { label:"LinkedIn", href:"https://linkedin.com/in/vishanrabari" },
            { label:"Twitter", href:"https://twitter.com/vishanrabari" },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" data-hover style={{
              fontFamily:"'DM Mono',monospace", fontSize:10,
              letterSpacing:".3em", textTransform:"uppercase",
              color:"rgba(255,255,255,.25)", textDecoration:"none",
              transition:"color .2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(129,140,248,.8)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.25)"}
            >{s.label}</a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0, animation:"fadeUp .7s ease 1.1s forwards" }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.2)" }}>Scroll</div>
        <div style={{ width:1, height:40, background:"linear-gradient(to bottom,rgba(129,140,248,.4),transparent)", animation:"scrollPulse 1.5s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse { 0%,100%{opacity:.4} 50%{opacity:1} }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════ */
function ProjectCard({ p, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} data-hover style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity .6s ease ${index * .1}s, transform .6s ease ${index * .1}s`,
      background: hovered ? "rgba(129,140,248,.05)" : "rgba(255,255,255,.025)",
      border: `1px solid ${hovered ? "rgba(129,140,248,.3)" : "rgba(255,255,255,.06)"}`,
      borderRadius: 16,
      padding: "clamp(24px,3vw,36px)",
      cursor: "pointer",
      transition2: "background .25s, border-color .25s",
      position: "relative", overflow: "hidden",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* color accent line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${p.color},transparent)`, opacity: hovered ? 1 : .4, transition:"opacity .25s" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, gap:12 }}>
        <div>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:p.color, background:`${p.color}18`, padding:"3px 10px", borderRadius:4 }}>{p.tag}</span>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".2em", color:"rgba(255,255,255,.2)", marginTop:8 }}>{p.year}</div>
        </div>
        <div style={{ fontSize:20, opacity: hovered ? 1 : .3, transition:"opacity .25s, transform .25s", transform: hovered ? "translate(2px,-2px)" : "translate(0,0)", color:"rgba(255,255,255,.5)" }}>↗</div>
      </div>

      <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,2.5vw,24px)", fontWeight:700, color:"rgba(255,255,255,.92)", margin:"0 0 10px", letterSpacing:"-.01em" }}>{p.title}</h3>
      <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)", lineHeight:1.65, margin:"0 0 20px" }}>{p.desc}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {p.tech.map(t => (
          <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.07)", borderRadius:4, padding:"4px 8px" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WORK SECTION
═══════════════════════════════════════════════════════════ */
function Work() {
  return (
    <section id="work" style={{ background:"#020408", padding:"clamp(80px,12vh,140px) clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ marginBottom:64 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".38em", textTransform:"uppercase", color:"rgba(129,140,248,.5)", marginBottom:12 }}>Selected Work</div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(42px,8vw,80px)", color:"#fff", margin:0, letterSpacing:".03em", lineHeight:.9 }}>
            PROJECTS THAT<br />
            <span style={{ background:"linear-gradient(90deg,#818cf8,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>HIT DIFFERENT</span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>

        <div style={{ textAlign:"center", marginTop:48 }}>
          <a href="https://github.com/vishanrabari" target="_blank" rel="noopener" data-hover style={{
            fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".3em", textTransform:"uppercase",
            color:"rgba(255,255,255,.3)", textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,.1)", paddingBottom:2,
            transition:"color .2s, border-color .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "rgba(129,140,248,.8)"; e.currentTarget.style.borderColor = "rgba(129,140,248,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; }}
          >View all on GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════════════ */
function SkillBar({ skill, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, color:"rgba(255,255,255,.6)", fontWeight:600 }}>{skill.name}</span>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(129,140,248,.6)", letterSpacing:".12em" }}>{skill.level}%</span>
      </div>
      <div style={{ height:2, background:"rgba(255,255,255,.06)", borderRadius:999, overflow:"hidden" }}>
        <div style={{
          height:"100%",
          background: `linear-gradient(90deg,#818cf8,#38bdf8)`,
          borderRadius:999,
          width: visible ? `${skill.level}%` : "0%",
          transition: `width .9s cubic-bezier(.16,1,.3,1) ${index * .07}s`,
        }} />
      </div>
    </div>
  );
}

function About() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { num:"3+", label:"Years building" },
    { num:"40+", label:"Projects shipped" },
    { num:"15+", label:"Happy clients" },
    { num:"∞", label:"Lines of passion" },
  ];

  return (
    <section id="about" ref={ref} style={{ background:"#030610", padding:"clamp(80px,12vh,140px) clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"clamp(40px,6vw,80px)", alignItems:"start" }}>
          {/* Left */}
          <div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".38em", textTransform:"uppercase", color:"rgba(56,189,248,.5)", marginBottom:12, opacity: visible ? 1 : 0, transition:"opacity .6s ease .1s" }}>About Me</div>
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,7vw,72px)", color:"#fff", margin:"0 0 24px", lineHeight:.9, letterSpacing:".03em", opacity: visible ? 1 : 0, transition:"opacity .6s ease .2s, transform .6s ease .2s", transform: visible ? "none" : "translateY(20px)" }}>
              CRAFTING THE<br />
              <span style={{ background:"linear-gradient(90deg,#38bdf8,#818cf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>WEB'S FUTURE</span>
            </h2>

            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(14px,1.6vw,16px)", color:"rgba(255,255,255,.45)", lineHeight:1.8, marginBottom:16, opacity: visible ? 1 : 0, transition:"opacity .6s ease .3s" }}>
              I'm Vishan — a frontend developer obsessed with the details that separate good from extraordinary. Based in India, building for the world.
            </p>
            <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(14px,1.6vw,16px)", color:"rgba(255,255,255,.35)", lineHeight:1.8, marginBottom:40, opacity: visible ? 1 : 0, transition:"opacity .6s ease .4s" }}>
              When I'm not pushing pixels, I'm pushing the limits of what browsers can render — experimenting with WebGL, creative coding, and motion design.
            </p>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, opacity: visible ? 1 : 0, transition:"opacity .6s ease .5s" }}>
              {stats.map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,.025)", border:"1px solid rgba(255,255,255,.05)", borderRadius:12, padding:"20px 24px" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(32px,5vw,48px)", color:"#818cf8", lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Skills */}
          <div style={{ opacity: visible ? 1 : 0, transition:"opacity .6s ease .3s" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".32em", textTransform:"uppercase", color:"rgba(255,255,255,.25)", marginBottom:28 }}>Tech Arsenal</div>
            {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}

            <div style={{ marginTop:36, padding:"20px 24px", background:"rgba(129,140,248,.06)", border:"1px solid rgba(129,140,248,.15)", borderRadius:12 }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(129,140,248,.5)", marginBottom:8 }}>Currently exploring</div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:"rgba(255,255,255,.6)", lineHeight:1.6 }}>
                WebGPU, AI-driven UIs, and the intersection of generative art with interactive design.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════════════════ */
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} style={{ background:"#020408", padding:"clamp(80px,12vh,140px) clamp(20px,5vw,80px)", position:"relative", overflow:"hidden" }}>
      {/* bg decoration */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(129,140,248,.04) 0%,transparent 65%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, letterSpacing:".38em", textTransform:"uppercase", color:"rgba(129,140,248,.5)", marginBottom:12, opacity: visible ? 1 : 0, transition:"opacity .6s ease .1s" }}>Get In Touch</div>
        <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(44px,9vw,88px)", color:"#fff", margin:"0 0 16px", lineHeight:.9, letterSpacing:".03em", opacity: visible ? 1 : 0, transition:"opacity .6s ease .2s, transform .6s ease .2s", transform: visible ? "none" : "translateY(20px)" }}>
          LET'S BUILD<br />
          <span style={{ background:"linear-gradient(110deg,#818cf8,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>SOMETHING SICK</span>
        </h2>
        <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:15, color:"rgba(255,255,255,.35)", lineHeight:1.7, marginBottom:40, opacity: visible ? 1 : 0, transition:"opacity .6s ease .3s" }}>
          Got a project in mind? An idea that needs the right hands? Drop me a line — I read every message.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14, textAlign:"left", opacity: visible ? 1 : 0, transition:"opacity .6s ease .4s" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {["name","email"].map(f => (
                <div key={f} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.3)" }}>{f}</label>
                  <input type={f === "email" ? "email" : "text"} required value={form[f]} onChange={e => setForm(prev => ({ ...prev, [f]: e.target.value }))} style={{
                    background: "rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                    borderRadius:8, padding:"12px 16px",
                    fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:"rgba(255,255,255,.8)",
                    outline:"none", transition:"border-color .2s",
                  }}
                    onFocus={e => e.target.style.borderColor = "rgba(129,140,248,.45)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"}
                  />
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.3)" }}>Message</label>
              <textarea required rows={5} value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} style={{
                background: "rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)",
                borderRadius:8, padding:"12px 16px",
                fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:"rgba(255,255,255,.8)",
                outline:"none", resize:"vertical", transition:"border-color .2s",
              }}
                onFocus={e => e.target.style.borderColor = "rgba(129,140,248,.45)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.08)"}
              />
            </div>
            <button type="submit" data-hover style={{
              background:"linear-gradient(135deg,#818cf8,#38bdf8)", border:"none", borderRadius:8,
              padding:"14px 32px", fontFamily:"'DM Mono',monospace", fontSize:12,
              letterSpacing:".22em", textTransform:"uppercase", color:"#020408",
              fontWeight:700, cursor:"pointer", alignSelf:"center", marginTop:8,
              transition:"transform .2s, box-shadow .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(129,140,248,.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >Send Message ↗</button>
          </form>
        ) : (
          <div style={{ padding:"40px 32px", background:"rgba(129,140,248,.06)", border:"1px solid rgba(129,140,248,.2)", borderRadius:16, opacity: visible ? 1 : 0, transition:"opacity .6s ease .4s" }}>
            <div style={{ fontSize:32, marginBottom:16 }}>⚡</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#818cf8", letterSpacing:".05em", marginBottom:8 }}>Message Sent!</div>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)", lineHeight:1.6 }}>I'll get back to you within 24 hours. Let's build something great.</div>
          </div>
        )}

        <div style={{ marginTop:56, display:"flex", justifyContent:"center", gap:32, flexWrap:"wrap", opacity: visible ? 1 : 0, transition:"opacity .6s ease .5s" }}>
          {[
            { label:"Email", val:"vishan@vishandeveloper.me", href:"mailto:vishan@vishandeveloper.me" },
            { label:"Website", val:"vishandeveloper.me", href:"https://vishandeveloper.me" },
          ].map(l => (
            <div key={l.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".3em", textTransform:"uppercase", color:"rgba(255,255,255,.2)", marginBottom:4 }}>{l.label}</div>
              <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13, color:"rgba(129,140,248,.7)", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#818cf8"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(129,140,248,.7)"}
              >{l.val}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:"#020408", borderTop:"1px solid rgba(255,255,255,.04)", padding:"28px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,255,255,.15)" }}>
          © 2024 Vishan Rabari · Built with React + ⚡
        </div>
        <a href="https://vishandeveloper.me" style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(129,140,248,.3)", textDecoration:"none" }}>
          vishandeveloper.me
        </a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    document.title = "Vishan Rabari — Frontend Developer";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "#020408";
    document.body.style.cursor = "none";
  }, []);

  // Section tracking
  useEffect(() => {
    if (!loaded) return;
    const sections = ["home","work","about","contact"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: .4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loaded]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@500&family=Space+Grotesk:wght@400;600;700;900&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin:0; padding:0; background:#020408; overflow-x:hidden; cursor:none; }
        ::selection { background:rgba(129,140,248,.3); color:#fff; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#020408; }
        ::-webkit-scrollbar-thumb { background:rgba(129,140,248,.3); border-radius:2px; }
        input, textarea { color-scheme: dark; }
      `}</style>

      <Cursor />

      {!loaded && <ThunderLoader onDone={() => setLoaded(true)} />}

      {loaded && (
        <div style={{ opacity:0, animation:"portfolioIn .5s ease forwards" }}>
          <style>{`@keyframes portfolioIn { from{opacity:0} to{opacity:1} }`}</style>
          <Nav active={active} setActive={setActive} />
          <Hero />
          <Work />
          <About />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
