import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/* ─────────────────────────────────────────────────────────
   ThunderLoader — Storm + Glass-Shatter Finale (World Class)

   Usage in App.jsx / main entry:
   const [loaded, setLoaded] = useState(false);
   if (!loaded) return <ThunderLoader onDone={() => setLoaded(true)} />;
   return <YourApp />;
───────────────────────────────────────────────────────── */
export default function ThunderLoader({ onDone }) {
  const canvasRef = useRef(null);
  const wrapRef   = useRef(null);
  const rafRef    = useRef(null);
  const startRef  = useRef(null);
  const doneRef   = useRef(false);
  const flashRef  = useRef(null);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState("loading"); // loading | striking | shatter
  const [shakeKey, setShakeKey] = useState(0);

  const rand = (a, b) => a + Math.random() * (b - a);

  /* ── split geometry: single center split (2 halves) ── */
  const shardCols = 2, shardRows = 1;
  const shards = useMemo(() => {
    return [
      { r: 0, c: 0, tx: -108, ty: 0, rot: 6,  rot3d: 16,  delay: 0,  scale: 0.96 },
      { r: 0, c: 1, tx: 108,  ty: 0, rot: -6, rot3d: -16, delay: 40, scale: 0.96 },
    ];
  }, []);

  const generateJagged = useCallback((len, spread) => {
    let pts = [];
    let y = 0;
    while (y < len) {
      pts.push([rand(-spread, spread), y]);
      y += rand(16, 34);
    }
    return pts.map(p => p.join(",")).join(" ");
  }, []);

  /* ── realistic fractal lightning channel (midpoint displacement) ── */
  const fractalPath = useCallback((x1, y1, x2, y2, disp, depth = 0) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (depth > 8 || len < 10) return [[x1, y1], [x2, y2]];
    const mx = (x1 + x2) / 2 + rand(-disp, disp);
    const my = (y1 + y2) / 2 + rand(-disp * 0.15, disp * 0.15);
    const left  = fractalPath(x1, y1, mx, my, disp * 0.58, depth + 1);
    const right = fractalPath(mx, my, x2, y2, disp * 0.58, depth + 1);
    return [...left.slice(0, -1), ...right];
  }, []);

  const strokeTapered = (ctx, pts, wStart, wEnd, alphaBase) => {
    const n = pts.length;
    for (let i = 0; i < n - 1; i++) {
      const t = i / (n - 2 || 1);
      ctx.lineWidth = wStart + (wEnd - wStart) * t;
      ctx.globalAlpha = alphaBase * (1 - t * 0.22);
      ctx.beginPath();
      ctx.moveTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
      ctx.stroke();
    }
  };

  /* ── bolt drawing: fractal channel + organic forks ── */
  const drawBolt = useCallback((ctx, cx, topY, W, H, alpha, scale = 1) => {
    ctx.save();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const endX = cx + rand(-22, 22) * scale;
    const disp = Math.max(18, W * 0.05) * scale;
    const main = fractalPath(cx, topY, endX, H, disp);

    // organic forks spawned off real points along the channel
    const forks = [];
    for (let i = 2; i < main.length - 3; i++) {
      if (Math.random() < 0.16) {
        const [bx, by] = main[i];
        const remaining = 1 - i / main.length;
        const dir = Math.random() < 0.5 ? 1 : -1;
        const flen = rand(40, 130) * scale * (0.4 + remaining);
        const tx = bx + dir * rand(0.5, 1) * flen;
        const ty = by + flen * rand(0.6, 1);
        forks.push(fractalPath(bx, by, tx, ty, disp * 0.4 * remaining + 4));
      }
    }

    const colors = ["#8b7cff", "#38bdf8", "#ffffff"];
    for (let pass = 0; pass < 3; pass++) {
      const isCore = pass === 2;
      const baseAlpha = alpha * (isCore ? 1 : pass === 1 ? 0.38 : 0.16);
      const wStart = (isCore ? 2.1 : pass === 1 ? 6 : 15) * scale;
      const wEnd   = (isCore ? 0.5 : pass === 1 ? 1.6 : 4) * scale;
      ctx.shadowBlur  = isCore ? 24 : pass === 1 ? 46 : 0;
      ctx.shadowColor = isCore ? "#e9e4ff" : "#7c5cff";
      ctx.strokeStyle = colors[pass];
      strokeTapered(ctx, main, wStart, wEnd, baseAlpha);

      if (pass === 1) {
        for (const f of forks) {
          const fa = rand(0.2, 0.36);
          strokeTapered(ctx, f, rand(1.4, 2.4) * scale, 0.3 * scale, fa);
        }
      }
      if (isCore) {
        // hairline white core over forks so they read as branching off the same strike
        ctx.shadowBlur = 6;
        for (const f of forks) strokeTapered(ctx, f, 1 * scale, 0.2 * scale, alpha * 0.45);
      }
    }
    ctx.restore();
  }, [fractalPath]);

  /* strike with a quick real-world flicker: bright leader stroke,
     near-instant dim, then a slightly offset brighter return stroke */
  const strikeBolt = useCallback((ctx, cx, topY, W, H, alpha, scale, onFrame) => {
    const W2 = W, H2 = H;
    ctx.clearRect(0, 0, W2, H2);
    drawBolt(ctx, cx, topY, W, H, alpha * 0.55, scale * 0.96);
    onFrame?.(alpha * 0.5);
    setTimeout(() => {
      ctx.clearRect(0, 0, W2, H2);
      drawBolt(ctx, cx, topY, W, H, alpha, scale);
      onFrame?.(alpha);
    }, rand(18, 34));
  }, [drawBolt]);

  const flashScreen = useCallback((intensity = 0.55, duration = 90, tint = "cool") => {
    const el = flashRef.current;
    if (!el) return;
    el.style.background = tint === "hot"
      ? "radial-gradient(ellipse at 50% 25%,rgba(255,255,255,.98),rgba(196,181,253,.6) 40%,rgba(56,189,248,.3) 65%,transparent 78%)"
      : "radial-gradient(ellipse at 50% 25%,rgba(238,235,255,.95),rgba(129,140,248,.55) 45%,transparent 75%)";
    el.style.transition = "opacity 0s";
    el.style.opacity = String(intensity);
    setTimeout(() => {
      el.style.transition = `opacity ${duration > 100 ? 0.5 : 0.25}s ease`;
      el.style.opacity = "0";
    }, duration);
  }, []);

  const shake = useCallback(() => setShakeKey(k => k + 1), []);

  /* ── ambient background strikes during loading ── */
  const ambientStrike = useCallback(() => {
    if (doneRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = rand(W * 0.1, W * 0.9);
    const scale = rand(0.4, 0.8);
    strikeBolt(ctx, cx, 0, W, H * rand(0.5, 0.9), rand(0.38, 0.65), scale, (a) => flashScreen(a * 0.35, 60));
    setTimeout(() => ctx.clearRect(0, 0, W, H), 130);
  }, [strikeBolt, flashScreen]);

  /* ── finale: escalating strikes on the center seam, then shatter ── */
  const doFinale = useCallback((onComplete) => {
    const canvas = canvasRef.current;
    if (!canvas) { onComplete(); return; }
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2;
    let count = 0;
    const total = 5;

    function strike() {
      count++;
      const isLast = count === total;
      strikeBolt(
        ctx, cx, 0, W, H,
        isLast ? 1 : 0.75 + count * 0.05,
        isLast ? 1.8 : 0.85 + count * 0.15,
        (a) => flashScreen(isLast ? a : 0.3 + count * 0.08, isLast ? 220 : 60, isLast ? "hot" : "cool")
      );
      shake();

      if (count < total) {
        setTimeout(() => {
          ctx.clearRect(0, 0, W, H);
          setTimeout(strike, rand(70, 140));
        }, rand(100, 160));
      } else {
        setTimeout(() => {
          ctx.clearRect(0, 0, W, H);
          onComplete();
        }, 300);
      }
    }
    strike();
  }, [strikeBolt, flashScreen, shake]);

  /* ── progress animation ── */
  const LOAD_TIME = 3400;

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
        doFinale(() => {
          setPhase("shatter");
          doneRef.current = true;
          setTimeout(() => onDone?.(), 1150);
        });
      }, 150);
    }
  }, [doFinale, onDone]);

  /* ── resize canvas ── */
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !wrapRef.current) return;
      canvasRef.current.width  = wrapRef.current.offsetWidth;
      canvasRef.current.height = wrapRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── start progress + ambient strikes ── */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    let ambientTimer;
    const scheduleAmbient = () => {
      ambientTimer = setTimeout(() => {
        if (!doneRef.current) ambientStrike();
        if (!doneRef.current) scheduleAmbient();
      }, rand(600, 1350));
    };
    scheduleAmbient();
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(ambientTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const pct = Math.round(progress * 100);
  const isShatter = phase === "shatter";
  const isStriking = phase === "striking";

  /* rain streaks (generated once) */
  const rainDrops = useMemo(() => Array.from({ length: 34 }).map((_, i) => ({
    left: rand(0, 100),
    delay: rand(0, 3.5),
    dur: rand(1.4, 2.6),
    len: rand(40, 100),
    opacity: rand(0.05, 0.18),
  })), []);

  /* the full loader scene rendered once, tiled into shards below */
  const Scene = (
    <>
      <div className="tl-cloud" style={{
        top: "-15%", left: "-10%", width: "70%", height: "70%",
        background: "radial-gradient(circle,rgba(88,60,180,.55),rgba(30,20,60,.15) 60%,transparent 75%)",
        animation: "tl-drift-a 18s ease-in-out infinite",
      }} />
      <div className="tl-cloud" style={{
        top: "-10%", right: "-15%", width: "65%", height: "75%",
        background: "radial-gradient(circle,rgba(60,90,190,.45),rgba(20,25,60,.12) 60%,transparent 75%)",
        animation: "tl-drift-b 22s ease-in-out infinite",
      }} />
      <div className="tl-cloud" style={{
        bottom: "-20%", left: "-10%", width: "75%", height: "70%",
        background: "radial-gradient(circle,rgba(70,50,150,.5),rgba(20,15,45,.1) 60%,transparent 75%)",
        animation: "tl-drift-b 20s ease-in-out infinite",
      }} />
      <div className="tl-cloud" style={{
        bottom: "-18%", right: "-12%", width: "68%", height: "68%",
        background: "radial-gradient(circle,rgba(50,80,170,.5),rgba(15,20,50,.1) 60%,transparent 75%)",
        animation: "tl-drift-a 16s ease-in-out infinite",
      }} />
      <div className="tl-cloud" style={{
        top: "30%", left: "30%", width: "45%", height: "45%",
        background: "radial-gradient(circle,rgba(90,70,200,.25),transparent 70%)",
        animation: "tl-drift-c 14s ease-in-out infinite",
      }} />

      {/* rain */}
      {rainDrops.map((d, i) => (
        <div key={i} style={{
          position: "absolute", top: -80, left: `${d.left}%`,
          width: 1, height: d.len,
          background: `linear-gradient(180deg,transparent,rgba(190,200,255,${d.opacity}),transparent)`,
          transform: "rotate(8deg)",
          animation: `tl-rain ${d.dur}s linear ${d.delay}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center,transparent 30%,rgba(3,2,8,.85) 100%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg,rgba(5,3,8,.4),transparent 20%,transparent 80%,rgba(5,3,8,.6))",
        pointerEvents: "none",
      }} />

      {Array.from({ length: 26 }).map((_, i) => {
        const top = rand(0, 100), left = rand(0, 100), size = rand(1, 2.4), dur = rand(2, 5), delay = rand(0, 4);
        return (
          <div key={i} style={{
            position: "absolute", top: `${top}%`, left: `${left}%`,
            width: size, height: size, borderRadius: "50%",
            background: "#c4b5fd",
            animation: `tl-twinkle ${dur}s ease-in-out ${delay}s infinite`,
            pointerEvents: "none",
          }} />
        );
      })}

      <SideLabel side="left"  text="CONNECTING IDEAS" />
      <SideLabel side="right" text="POWERING CREATIVITY" />

      <div style={{
        position: "absolute", inset: 0, zIndex: 20,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 18, padding: "0 24px", textAlign: "center",
      }}>
        <div style={{ animation: "tl-icon-pulse 2.4s ease-in-out infinite" }}>
          <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
            <path
              d="M20 40c-6.6 0-12-5.2-12-11.6C8 22 13.2 17 19.6 17c.9 0 1.8.1 2.6.3C24.4 12 29.6 8 36 8c8 0 14.6 6.2 15.3 14.1 5.6 1 9.7 5.9 9.7 11.8 0 6.6-5.4 12-12 12H20z"
              stroke="#e9e4ff" strokeWidth="2.2" strokeLinejoin="round"
            />
            <path
              d="M34 30l-9 14h8l-3 12 12-16h-8l4-10z"
              fill="#a78bfa" stroke="#f5f3ff" strokeWidth="1.4" strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 style={{
          margin: 0,
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(30px,6vw,52px)",
          letterSpacing: ".12em",
          color: "#f4f2ff",
          textShadow: "0 0 24px rgba(129,140,248,.5),0 0 48px rgba(56,189,248,.2)",
          animation: "tl-name-in .9s cubic-bezier(.16,1,.3,1) both",
        }}>VISHAN RABARI</h1>

        <p style={{
          margin: "-8px 0 6px",
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "clamp(11px,1.6vw,14px)",
          letterSpacing: ".04em",
          color: "rgba(226,220,255,.55)",
          animation: "tl-fade-up .8s ease .2s both",
        }}>
          Crafting digital experiences that{" "}
          <span style={{ color: "#a78bfa", fontWeight: 700 }}>ELECTRIFY</span>
        </p>

        <div style={{
          marginTop: 18,
          fontFamily: "'DM Mono',monospace",
          fontSize: 11, letterSpacing: ".35em", textTransform: "uppercase",
          color: isStriking ? "#fca5f7" : "rgba(167,139,250,.7)",
          animation: "tl-pulse-soft 1.6s ease-in-out infinite",
        }}>
          {isStriking ? "System Overload ⚡" : "Loading Experience"}
        </div>

        <div style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "clamp(24px,4vw,34px)",
          fontWeight: 700,
          color: "#fff",
          textShadow: "0 0 20px rgba(129,140,248,.6)",
        }}>{pct}%</div>

        <div style={{
          width: "clamp(180px,28vw,260px)",
          height: 3,
          borderRadius: 999,
          background: "rgba(255,255,255,.08)",
          overflow: "hidden",
          position: "relative",
          marginTop: 4,
        }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 999,
            background: pct >= 100
              ? "linear-gradient(90deg,#f472b6,#818cf8,#38bdf8)"
              : "linear-gradient(90deg,#7c3aed,#818cf8,#38bdf8)",
            boxShadow: "0 0 12px rgba(129,140,248,.8)",
            transition: "width .05s linear, background .3s ease",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: "40%", height: "100%",
                background: "linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent)",
                animation: "tl-shimmer 1.3s ease-in-out infinite",
              }} />
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 10,
          fontFamily: "'DM Mono',monospace",
          fontSize: 9.5, letterSpacing: ".3em", textTransform: "uppercase",
          color: "rgba(255,255,255,.22)",
        }}>Preparing something extraordinary</div>
      </div>
    </>
  );

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050308",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
        perspective: "1600px",
        animation: isStriking
          ? `${shakeKey % 2 === 0 ? "tl-shake" : "tl-shake-alt"} .45s cubic-bezier(.36,.07,.19,.97)`
          : "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap');
        #tl-root * { box-sizing: border-box; }

        @keyframes tl-drift-a { 0%,100% { transform: translate(-4%,-3%) scale(1.05) rotate(0deg); } 50% { transform: translate(3%,2%) scale(1.15) rotate(2deg); } }
        @keyframes tl-drift-b { 0%,100% { transform: translate(3%,2%) scale(1.1) rotate(0deg); } 50% { transform: translate(-4%,-2%) scale(1.2) rotate(-2deg); } }
        @keyframes tl-drift-c { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-2%,3%) scale(1.08); } }
        @keyframes tl-twinkle { 0%,100% { opacity:.15; } 50% { opacity:.8; } }
        @keyframes tl-rain { 0% { transform: translateY(0) rotate(8deg); } 100% { transform: translateY(140vh) rotate(8deg); } }
        @keyframes tl-icon-pulse {
          0%,100% { filter: drop-shadow(0 0 10px rgba(167,139,250,.55)) drop-shadow(0 0 22px rgba(56,189,248,.25)); }
          50%     { filter: drop-shadow(0 0 18px rgba(167,139,250,.85)) drop-shadow(0 0 34px rgba(56,189,248,.45)); }
        }
        @keyframes tl-name-in { from { opacity:0; letter-spacing:.5em; } to { opacity:1; letter-spacing:.12em; } }
        @keyframes tl-fade-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes tl-shimmer { 0% { transform:translateX(-120%) skewX(-15deg); } 100% { transform:translateX(320%) skewX(-15deg); } }
        @keyframes tl-pulse-soft { 0%,100% { opacity:.55; } 50% { opacity:1; } }
        @keyframes tl-behind-in { from { opacity:0; transform:scale(.9) translateY(14px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes tl-shake {
          0%   { transform: translate(0,0) rotate(0); }
          10%  { transform: translate(-18px,10px) rotate(-1deg) scale(1.01); }
          20%  { transform: translate(16px,-14px) rotate(1.1deg); }
          30%  { transform: translate(-20px,12px) rotate(-.9deg); }
          40%  { transform: translate(14px,-16px) rotate(1deg); }
          50%  { transform: translate(-12px,8px) rotate(-.6deg); }
          60%  { transform: translate(10px,-9px) rotate(.5deg); }
          70%  { transform: translate(-7px,6px) rotate(-.35deg); }
          80%  { transform: translate(5px,-4px) rotate(.2deg); }
          90%  { transform: translate(-3px,2px) rotate(-.1deg); }
          100% { transform: translate(0,0) rotate(0); }
        }
        @keyframes tl-shake-alt {
          0%   { transform: translate(0,0) rotate(0); }
          10%  { transform: translate(18px,-10px) rotate(1deg) scale(1.01); }
          20%  { transform: translate(-16px,14px) rotate(-1.1deg); }
          30%  { transform: translate(20px,-12px) rotate(.9deg); }
          40%  { transform: translate(-14px,16px) rotate(-1deg); }
          50%  { transform: translate(12px,-8px) rotate(.6deg); }
          60%  { transform: translate(-10px,9px) rotate(-.5deg); }
          70%  { transform: translate(7px,-6px) rotate(.35deg); }
          80%  { transform: translate(-5px,4px) rotate(-.2deg); }
          90%  { transform: translate(3px,-2px) rotate(.1deg); }
          100% { transform: translate(0,0) rotate(0); }
        }

        .tl-cloud { position:absolute; border-radius:50%; filter:blur(40px); pointer-events:none; }

        .tl-shard {
          position: absolute;
          overflow: hidden;
          will-change: transform, opacity, filter;
          transition: transform 1.05s cubic-bezier(.65,0,.2,1),
                      opacity .8s ease,
                      filter .8s ease;
          backface-visibility: hidden;
        }
        .tl-shard-inner {
          position: absolute;
        }
      `}</style>

      <div id="tl-root" style={{ position: "absolute", inset: 0 }}>

        {/* ── BEHIND LAYER (revealed after shatter) ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 14,
          background: "radial-gradient(ellipse at 50% 40%,rgba(50,35,110,.5),#050308 70%)",
          opacity: isShatter ? 1 : 0,
          transition: "opacity .7s ease .3s",
        }}>
          <div style={{
            width: 74, height: 74, borderRadius: "50%",
            background: "linear-gradient(135deg,rgba(129,140,248,.22),rgba(56,189,248,.14))",
            border: "1px solid rgba(167,139,250,.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#f4f2ff",
            boxShadow: "0 0 40px rgba(129,140,248,.45),0 0 80px rgba(129,140,248,.15)",
            animation: isShatter ? "tl-behind-in .8s cubic-bezier(.16,1,.3,1) .4s both" : "none",
          }}>VR</div>
          <div style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(32px,7vw,64px)",
            letterSpacing: ".08em",
            background: "linear-gradient(110deg,#fff 0%,#a78bfa 35%,#38bdf8 65%,#fff 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            animation: isShatter ? "tl-behind-in .8s cubic-bezier(.16,1,.3,1) .5s both" : "none",
          }}>VISHAN RABARI</div>
          <div style={{
            fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: ".32em",
            textTransform: "uppercase", color: "rgba(167,139,250,.55)",
            animation: isShatter ? "tl-behind-in .8s cubic-bezier(.16,1,.3,1) .6s both" : "none",
          }}>Portfolio Ready</div>
        </div>

        {/* ── SHARDS (grid-tiled full scene, shatters apart at 100%) ── */}
        {shards.map((s, i) => {
          const w = 100 / shardCols, h = 100 / shardRows;
          const style = {
            top: `${s.r * h}%`,
            left: `${s.c * w}%`,
            width: `${w}%`,
            height: `${h}%`,
            zIndex: 20,
            transitionDelay: isShatter ? `${s.delay}ms` : "0ms",
            transform: isShatter
              ? `translate(${s.tx}%,${s.ty}%) rotate(${s.rot}deg) rotateY(${s.rot3d}deg) scale(${s.scale})`
              : "translate(0,0) rotate(0) rotateY(0) scale(1)",
            opacity: isShatter ? 0 : 1,
            filter: isShatter ? "brightness(1.4)" : "none",
            border: !isShatter && (isStriking) ? "1px solid rgba(167,139,250,.15)" : "none",
          };
          const innerStyle = {
            top: `${-s.r * 100}%`,
            left: `${-s.c * 100}%`,
            width: `${shardCols * 100}%`,
            height: `${shardRows * 100}%`,
          };
          return (
            <div className="tl-shard" key={i} style={style}>
              <div className="tl-shard-inner" style={innerStyle}>{Scene}</div>
            </div>
          );
        })}

        {/* seam overlay removed — not needed for a clean 2-way split */}

        {/* ── LIGHTNING CANVAS ── */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none" }} />

        {/* ── FLASH OVERLAY ── */}
        <div
          ref={flashRef}
          style={{
            position: "absolute", inset: 0, zIndex: 35,
            opacity: 0, pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ── corner-bracket side label ── */
function SideLabel({ side, text }) {
  const isLeft = side === "left";
  return (
    <div style={{
      position: "absolute",
      top: "50%",
      [isLeft ? "left" : "right"]: "clamp(16px,4vw,56px)",
      transform: "translateY(-50%)",
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "'DM Mono',monospace",
      fontSize: 10,
      letterSpacing: ".22em",
      textTransform: "uppercase",
      color: "rgba(226,220,255,.4)",
      flexDirection: isLeft ? "row" : "row-reverse",
    }}>
      <span style={{
        width: 8, height: 8,
        borderTop: "1px solid rgba(167,139,250,.6)",
        borderLeft: isLeft ? "1px solid rgba(167,139,250,.6)" : "none",
        borderRight: !isLeft ? "1px solid rgba(167,139,250,.6)" : "none",
      }} />
      <span>{text}</span>
    </div>
  );
}
