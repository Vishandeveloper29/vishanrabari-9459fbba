import React, { useEffect, useRef } from "react";

const GhostCursor = ({
    trailLength = 95,
    inertia = 0.22,
    grainIntensity = 0.008,
    bloomStrength = 0.12,
    bloomRadius = 35,
    brightness = 1.45,
    color = "#3B82F6",
    edgeIntensity = 0,
}) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const smoothMouseRef = useRef({ x: 0, y: 0 });
    const trailRef = useRef([]);
    const hasMovedRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });

        let width = 0;
        let height = 0;
        let animationId;

        const hexToRgb = (hex) => {
            const clean = hex.replace("#", "");
            const value = parseInt(clean, 16);

            return {
                r: (value >> 16) & 255,
                g: (value >> 8) & 255,
                b: value & 255,
            };
        };

        const rgb = hexToRgb(color);

        const resize = () => {
            const parent = canvas.parentElement;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            width = parent.offsetWidth;
            height = parent.offsetHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!hasMovedRef.current) {
                const startX = width * 0.68;
                const startY = height * 0.38;

                mouseRef.current = { x: startX, y: startY };
                smoothMouseRef.current = { x: startX, y: startY };

                trailRef.current = Array.from({ length: trailLength }, (_, i) => ({
                    x: startX - i * 10,
                    y: startY + Math.sin(i * 0.22) * 14 + i * 2.2,
                    vx: 0,
                    vy: 0,
                }));
            }
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();

            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };

            hasMovedRef.current = true;
        };

        const handleTouchMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];

            mouseRef.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
            };

            hasMovedRef.current = true;
        };

        const drawBlob = (x, y, radius, alpha, core = false) => {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

            if (core) {
                gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
                gradient.addColorStop(0.18, `rgba(190,245,255,${alpha * 0.82})`);
                gradient.addColorStop(0.42, `rgba(90,190,255,${alpha * 0.5})`);
                gradient.addColorStop(
                    0.75,
                    `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.26})`
                );
                gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            } else {
                gradient.addColorStop(
                    0,
                    `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.9})`
                );
                gradient.addColorStop(
                    0.35,
                    `rgba(60,160,255,${alpha * 0.55})`
                );
                gradient.addColorStop(
                    0.7,
                    `rgba(20,60,180,${alpha * 0.22})`
                );
                gradient.addColorStop(1, `rgba(0,0,0,0)`);
            }

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const drawNoise = (x, y, radius, amount, alpha) => {
            if (grainIntensity <= 0) return;

            ctx.fillStyle = `rgba(255,255,255,${alpha})`;

            for (let i = 0; i < amount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * radius;
                const px = x + Math.cos(angle) * distance;
                const py = y + Math.sin(angle) * distance;

                ctx.beginPath();
                ctx.arc(px, py, Math.random() * 0.9, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            smoothMouseRef.current.x +=
                (mouseRef.current.x - smoothMouseRef.current.x) * inertia;
            smoothMouseRef.current.y +=
                (mouseRef.current.y - smoothMouseRef.current.y) * inertia;

            const trail = trailRef.current;

            if (trail.length === 0) {
                for (let i = 0; i < trailLength; i++) {
                    trail.push({
                        x: smoothMouseRef.current.x,
                        y: smoothMouseRef.current.y,
                        vx: 0,
                        vy: 0,
                    });
                }
            }

            trail[0].x += (smoothMouseRef.current.x - trail[0].x) * 0.38;
            trail[0].y += (smoothMouseRef.current.y - trail[0].y) * 0.38;

            for (let i = 1; i < trail.length; i++) {
                const prev = trail[i - 1];
                const current = trail[i];

                const follow = 0.18;

                current.vx += (prev.x - current.x) * follow;
                current.vy += (prev.y - current.y) * follow;

                current.vx *= 0.58;
                current.vy *= 0.58;

                current.x += current.vx;
                current.y += current.vy;
            }

            ctx.save();
            ctx.globalCompositeOperation = "lighter";

            // Soft smoky trail
            ctx.filter = "blur(28px)";

            for (let i = trail.length - 1; i >= 0; i--) {
                const p = trail[i];
                const t = 1 - i / trail.length;

                const waveX =
                    Math.sin(i * 0.32 + performance.now() * 0.001) * 16 * (1 - t);
                const waveY =
                    Math.cos(i * 0.25 + performance.now() * 0.001) * 12 * (1 - t);

                const radius = 24 + t * 72 + bloomRadius;
                const alpha = Math.pow(t, 1.8) * 0.09 * brightness;

                drawBlob(p.x + waveX, p.y + waveY, radius, alpha, false);

                if (i % 7 === 0) {
                    drawBlob(
                        p.x - waveX * 0.6,
                        p.y - waveY * 0.6,
                        radius * 0.55,
                        alpha * 0.5,
                        false
                    );
                }
            }

            // Outer aura
            ctx.filter = "blur(34px)";
            drawBlob(
                trail[0].x,
                trail[0].y,
                135 + bloomRadius,
                0.11 * brightness,
                false
            );

            // Cursor body
            ctx.filter = "blur(10px)";
            drawBlob(
                trail[0].x,
                trail[0].y,
                78 + bloomRadius * 0.35,
                0.2 * brightness,
                true
            );

            // Sharp center glow
            ctx.filter = "blur(1px)";
            drawBlob(
                trail[0].x,
                trail[0].y,
                26,
                0.32 * brightness + bloomStrength,
                true
            );

            // Small premium core dot
            ctx.filter = "blur(0px)";
            ctx.fillStyle = "rgba(255,255,255,0.9)";
            ctx.beginPath();
            ctx.arc(trail[0].x, trail[0].y, 3.2, 0, Math.PI * 2);
            ctx.fill();

            drawNoise(trail[0].x, trail[0].y, 105, 12, grainIntensity * 0.5);

            if (edgeIntensity > 0) {
                ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${edgeIntensity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();

                trail.forEach((p, index) => {
                    if (index === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                });

                ctx.stroke();
            }

            ctx.restore();

            animationId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove, { passive: true });

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [
        trailLength,
        inertia,
        grainIntensity,
        bloomStrength,
        bloomRadius,
        brightness,
        color,
        edgeIntensity,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full opacity-95"
            aria-hidden="true"
        />
    );
};

export default GhostCursor;