import { useEffect, useRef } from "react";

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const value =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean;

  const num = parseInt(value, 16);

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
};

const lerp = (a, b, t) => a + (b - a) * t;

const DotField = ({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 3,
  gradientFrom = "#3B82F6",
  gradientTo = "#06B6D4",
  glowColor = "#021637",
}) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(null);
  const timeRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const from = hexToRgb(gradientFrom);
    const to = hexToRgb(gradientTo);
    const glow = hexToRgb(glowColor);

    const createDots = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      sizeRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dots = [];

      for (let y = dotSpacing / 2; y < height; y += dotSpacing) {
        for (let x = dotSpacing / 2; x < width; x += dotSpacing) {
          dots.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            alpha: 0.32,
            seed: Math.random() * 10,
          });
        }
      }

      dotsRef.current = dots;
    };

    const draw = () => {
      const { width, height } = sizeRef.current;
      const dots = dotsRef.current;
      const mouse = mouseRef.current;

      timeRef.current += 0.012;

      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          glowRadius
        );

        glowGradient.addColorStop(
          0,
          `rgba(${glow.r}, ${glow.g}, ${glow.b}, 0.55)`
        );
        glowGradient.addColorStop(
          1,
          `rgba(${glow.r}, ${glow.g}, ${glow.b}, 0)`
        );

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const dx = dot.ox - mouse.x;
        const dy = dot.oy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = dot.ox;
        let ty = dot.oy;
        let active = 0;

        if (mouse.active && dist < cursorRadius) {
          active = 1 - dist / cursorRadius;

          const angle = Math.atan2(dy, dx);
          const force = active * bulgeStrength * cursorForce;

          if (bulgeOnly) {
            tx = dot.ox + Math.cos(angle) * force;
            ty = dot.oy + Math.sin(angle) * force;
          } else {
            tx = dot.ox - Math.cos(angle) * force;
            ty = dot.oy - Math.sin(angle) * force;
          }
        }

        const wave =
          Math.sin(timeRef.current + dot.ox * 0.018 + dot.oy * 0.014) *
          waveAmplitude *
          0.35;

        dot.x = lerp(dot.x, tx, 0.12);
        dot.y = lerp(dot.y, ty + wave, 0.12);

        const mix = Math.min(1, Math.max(0, active));
        const r = Math.round(lerp(from.r, to.r, mix));
        const g = Math.round(lerp(from.g, to.g, mix));
        const b = Math.round(lerp(from.b, to.b, mix));

        const sparkleAlpha =
          sparkle && Math.sin(timeRef.current * 3 + dot.seed) > 0.96
            ? 0.9
            : 0;

        const alpha = 0.24 + active * 0.72 + sparkleAlpha;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.arc(dot.x, dot.y, dotRadius + active * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handlePointerMove = (e) => {
      const rect = wrapper.getBoundingClientRect();

      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const resizeObserver = new ResizeObserver(createDots);

    createDots();
    resizeObserver.observe(wrapper);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    glowRadius,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
    glowColor,
  ]);

  return (
    <div ref={wrapperRef} className="h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default DotField;