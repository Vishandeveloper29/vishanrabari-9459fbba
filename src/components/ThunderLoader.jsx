import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────
   ThunderLoader
   Usage in App.jsx / main entry:

   const [loaded, setLoaded] = useState(false);
   if (!loaded) return <ThunderLoader onDone={() => setLoaded(true)} />;
   return <YourApp />;
───────────────────────────────────────── */
export default function ThunderLoader({ onDone }) {
  const canvasRef   = useRef(null);
  const loaderRef   = useRef(null);
  const rafRef      = useRef(null);
  const startRef    = useRef(null);
  const doneRef     = useRef(false);

  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState("loading"); // loading | striking | split
  const [crackPts, setCrackPts] = useState("");
  const [crackPts2, setCrackPts2] = useState("");

  /* ── helpers ── */
  const rand = (a, b) => a + Math.random() * (b - a);

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
  }, []);

  /* ── bolt drawing ── */
  const drawBolt = useCallback((ctx, cx, W, H, alpha) => {
    ctx.save();
    const colors = ["#818cf8", "#38bdf8", "#ffffff"];
    // main jagged bolt
    for (let pass = 0; pass < 3; pass++) {
      ctx.globalAlpha = alpha * (pass === 2 ? 0.95 : pass === 1 ? 0.35 : 0.15);
      ctx.lineWidth   = pass === 2 ? 1.5 : pass === 1 ? 5 : 12;
      ctx.shadowBlur  = pass === 2 ? 20 : pass === 1 ? 40 : 0;
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
    // branch bolts
    for (let b = 0; b < 3; b++) {
      const startY = rand(H * 0.15, H * 0.65);
      const endY   = startY + rand(60, 140);
      const dir    = b % 2 === 0 ? 1 : -1;
      ctx.globalAlpha = alpha * 0.45;
      ctx.lineWidth   = 0.8;
      ctx.strokeStyle = "#a5b4fc";
      ctx.shadowColor = "#818cf8";
      ctx.shadowBlur  = 12;
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

  /* ── flash helper ── */
  const flashScreen = useCallback((duration = 50) => {
    const el = document.getElementById("vr-flash");
    if (!el) return;
    el.style.opacity = "0.9";
    el.style.transition = "opacity 0s";
    setTimeout(() => {
      el.style.transition = "opacity 0.35s ease";
      el.style.opacity    = "0";
    }, duration);
  }, []);

  /* ── bolt sequence ── */
  const doBoltSequence = useCallback((totalFlashes, onComplete) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W   = canvas.width;
    const H   = canvas.height;
    const cx  = W / 2;

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

  /* ── main progress animation ── */
  const LOAD_TIME = 3000;

  const tick = useCallback((ts) => {
    if (doneRef.current) return;
    if (!startRef.current) startRef.current = ts;
    const elapsed = ts - startRef.current;
    const p       = Math.min(elapsed / LOAD_TIME, 1);
    setProgress(p);

    if (p < 1) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      setPhase("striking");
      // 3 quick pre-bolts, then the BIG one
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
              canvasRef.current.getContext("2d")
                .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            setPhase("split");
            doneRef.current = true;
            setTimeout(() => { onDone?.(); }, 900);
          }, 350);
        });
      }, 200);
    }
  }, [doBoltSequence, drawBolt, flashScreen, generateCrack, onDone]);

  /* ── resize canvas ── */
  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !loaderRef.current) return;
      canvasRef.current.width  = loaderRef.current.offsetWidth;
      canvasRef.current.height = loaderRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── start animation ── */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  const pct = Math.round(progress * 100);
  const isSplit = phase === "split";

  return (
    <div
      ref={loaderRef}
      id="vr-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#020408",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
        perspective: "1200px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@500&family=Space+Grotesk:wght@700;900&display=swap');

        #vr-loader * { box-sizing: border-box; }

        .vr-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          will-change: transform;
          transition: transform 1s cubic-bezier(.77,0,.18,1),
                      opacity .8s ease;
          backface-visibility: hidden;
        }
        .vr-panel-left  { left: 0;  transform-origin: left center;  }
        .vr-panel-right { right: 0; transform-origin: right center; }

        .vr-panel-left.split  { transform: translateX(-105%) rotateY(10deg); }
        .vr-panel-right.split { transform: translateX(105%)  rotateY(-10deg); }

        .vr-scan {
          position: absolute;
          left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg,
            transparent,rgba(129,140,248,.7),rgba(56,189,248,.9),
            rgba(129,140,248,.7),transparent);
          pointer-events: none;
          opacity: 0;
          animation: vr-scan-run 2.8s ease-in-out 0.4s forwards;
        }
        @keyframes vr-scan-run {
          0%   { top:0%;   opacity:0; }
          5%   { opacity:1; }
          95%  { opacity:.8; }
          100% { top:100%; opacity:0; }
        }

        .vr-crack-line {
          position: absolute;
          top: 0; left: 50%;
          width: 2px;
          height: 100%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 22;
        }

        .vr-crack-svg {
          position: absolute;
          top: 0; left: 50%;
          width: 24px;
          height: 100%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 23;
          overflow: visible;
          opacity: 0;
          transition: opacity .15s ease;
        }
        .vr-crack-svg.visible { opacity: 1; }

        @keyframes vr-progress-pulse {
          0%,100% { opacity:.6; }
          50%     { opacity:1; }
        }

        .vr-behind {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
          transition: opacity .7s ease .15s;
          z-index: 5;
        }
        .vr-behind.visible { opacity: 1; }

        @keyframes vr-name-in {
          from { opacity:0; transform:scale(.92) translateY(12px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        .vr-behind.visible .vr-name-big {
          animation: vr-name-in .7s cubic-bezier(.16,1,.3,1) .3s both;
        }

        @keyframes vr-particle {
          0%   { transform: translate(0,0) scale(1); opacity:.9; }
          100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity:0; }
        }
        .vr-particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: vr-particle var(--dur) ease forwards;
        }

        .vr-progress-bar {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(140px,25vw,200px);
          height: 2px;
          background: rgba(255,255,255,.08);
          border-radius: 999px;
          z-index: 35;
          overflow: hidden;
        }
        .vr-progress-fill {
          height: 100%;
          background: linear-gradient(90deg,#818cf8,#38bdf8);
          border-radius: 999px;
          transition: width .06s linear;
        }

        @keyframes vr-shimmer {
          0% { transform:translateX(-100%) skewX(-15deg); }
          100% { transform:translateX(300%) skewX(-15deg); }
        }
        .vr-shimmer-bar {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: 999px;
        }
        .vr-shimmer-bar::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent);
          animation: vr-shimmer 1.4s ease-in-out infinite;
        }
      `}</style>

      {/* ── BEHIND (revealed after split) ── */}
      <div className={`vr-behind${isSplit ? " visible" : ""}`}>
        <div style={{
          width: 80, height: 80,
          borderRadius: "50%",
          background: "linear-gradient(135deg,rgba(129,140,248,.22),rgba(56,189,248,.14))",
          border: "1px solid rgba(129,140,248,.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 900, color: "#e2e8f0",
          boxShadow: "0 0 40px rgba(129,140,248,.4),0 0 80px rgba(129,140,248,.15)",
        }}>VR</div>
        <div
          className="vr-name-big"
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(36px,8vw,72px)",
            letterSpacing: ".05em",
            background: "linear-gradient(110deg,#fff 0%,#7dd3fc 35%,#a78bfa 65%,#fff 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >VISHAN RABARI</div>
        <div style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 11,
          letterSpacing: ".32em",
          textTransform: "uppercase",
          color: "rgba(125,211,252,.5)",
        }}>Frontend Developer</div>
      </div>

      {/* ── SCAN LINE ── */}
      {phase === "loading" && <div className="vr-scan" />}

      {/* ── LEFT PANEL ── */}
      <div className={`vr-panel vr-panel-left${isSplit ? " split" : ""}`}>
        <div style={{
          position: "absolute", inset: 0, background: "#020408",
          display: "flex", alignItems: "center", justifyContent: "flex-end",
          paddingRight: "clamp(20px,5vw,56px)",
        }}>
          <div style={{ textAlign: "right" }}>
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(38px,9vw,96px)",
              color: "rgba(255,255,255,.94)",
              letterSpacing: ".04em",
              lineHeight: .88,
            }}>TURNING<br />IDEAS</div>
            <div style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10, letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "rgba(129,140,248,.4)",
              marginTop: 10,
            }}>Vishandeveloper.me</div>
          </div>
        </div>
        {/* edge glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right,transparent 55%,rgba(129,140,248,.12))",
          pointerEvents: "none",
        }} />
        {/* grid lines */}
        <div style={{
          position: "absolute", inset: 0, opacity: .04,
          backgroundImage: "repeating-linear-gradient(0deg,rgba(129,140,248,.8) 0,rgba(129,140,248,.8) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(129,140,248,.8) 0,rgba(129,140,248,.8) 1px,transparent 1px,transparent 60px)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={`vr-panel vr-panel-right${isSplit ? " split" : ""}`}>
        <div style={{
          position: "absolute", inset: 0, background: "#020408",
          display: "flex", alignItems: "center", justifyContent: "flex-start",
          paddingLeft: "clamp(20px,5vw,56px)",
        }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(38px,9vw,96px)",
              color: "rgba(255,255,255,.94)",
              letterSpacing: ".04em",
              lineHeight: .88,
            }}>INTO<br />WEBSITES</div>
            <div style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10, letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "rgba(56,189,248,.4)",
              marginTop: 10,
            }}>React · Three.js · Vite</div>
          </div>
        </div>
        {/* edge glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to left,transparent 55%,rgba(56,189,248,.12))",
          pointerEvents: "none",
        }} />
        {/* grid lines */}
        <div style={{
          position: "absolute", inset: 0, opacity: .04,
          backgroundImage: "repeating-linear-gradient(0deg,rgba(56,189,248,.8) 0,rgba(56,189,248,.8) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(56,189,248,.8) 0,rgba(56,189,248,.8) 1px,transparent 1px,transparent 60px)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── CENTER CRACK LINE (before split) ── */}
      {!isSplit && (
        <div className="vr-crack-line" style={{
          background: phase === "striking"
            ? "linear-gradient(to bottom,transparent,rgba(129,140,248,.6),rgba(56,189,248,.8),rgba(129,140,248,.6),transparent)"
            : "linear-gradient(to bottom,transparent,rgba(255,255,255,.06),transparent)",
          zIndex: 20,
        }} />
      )}

      {/* ── CRACK SVG (shown on strike) ── */}
      <svg
        className={`vr-crack-svg${phase === "split" || phase === "striking" ? " visible" : ""}`}
        viewBox="0 0 24 600"
        preserveAspectRatio="none"
        style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 24, height: "100%", zIndex: 23, pointerEvents: "none", overflow: "visible", opacity: phase === "striking" || phase === "split" ? 1 : 0, transition: "opacity .15s" }}
      >
        <defs>
          <filter id="crack-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {crackPts && (
          <>
            <polyline points={crackPts}  stroke="#818cf8" strokeWidth="2"   fill="none" filter="url(#crack-glow)" />
            <polyline points={crackPts2} stroke="#38bdf8" strokeWidth="1"   fill="none" opacity=".55" />
            <polyline points={crackPts}  stroke="#ffffff" strokeWidth=".5"  fill="none" opacity=".6" />
          </>
        )}
      </svg>

      {/* ── BOLT CANVAS ── */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none" }}
      />

      {/* ── FLASH OVERLAY ── */}
      <div
        id="vr-flash"
        style={{
          position: "absolute", inset: 0, zIndex: 25,
          background: "radial-gradient(ellipse at 50% 30%,rgba(255,255,255,.95),rgba(129,140,248,.5) 50%,transparent 75%)",
          opacity: 0, pointerEvents: "none",
        }}
      />

      {/* ── PROGRESS ── */}
      {phase === "loading" && (
        <>
          <div className="vr-progress-bar" style={{ zIndex: 40 }}>
            <div className="vr-progress-fill" style={{ width: `${pct}%` }}>
              <div className="vr-shimmer-bar" />
            </div>
          </div>
          <div style={{
            position: "absolute", bottom: 52, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'DM Mono',monospace", fontSize: 11,
            letterSpacing: ".28em", textTransform: "uppercase",
            color: "rgba(129,140,248,.55)", zIndex: 40, whiteSpace: "nowrap",
            animation: "vr-progress-pulse 1.4s ease-in-out infinite",
          }}>{pct}%</div>
          <div style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'DM Mono',monospace", fontSize: 9,
            letterSpacing: ".3em", textTransform: "uppercase",
            color: "rgba(255,255,255,.16)", zIndex: 40, whiteSpace: "nowrap",
          }}>Loading portfolio</div>
        </>
      )}

      {phase === "striking" && (
        <div style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'DM Mono',monospace", fontSize: 11,
          letterSpacing: ".32em", textTransform: "uppercase",
          color: "rgba(129,140,248,.7)", zIndex: 40, whiteSpace: "nowrap",
        }}>INCOMING ⚡</div>
      )}
    </div>
  );
}
