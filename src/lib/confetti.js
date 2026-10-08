// Code-symbol confetti on a throw-away canvas. Skipped for reduced-motion users.
export function confetti(x = innerWidth / 2, y = innerHeight * 0.62) {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const dpr = Math.min(2, devicePixelRatio || 1);
  const c = document.createElement('canvas');
  c.className = 'confetti'; c.width = innerWidth * dpr; c.height = innerHeight * dpr;
  document.body.appendChild(c);
  const g = c.getContext('2d'); g.scale(dpr, dpr);
  const glyphs = ['{ }', '</>', ';', '#', '*', '<3', '()', '=>'];
  const colors = ['#e4572e', '#f2a03d', '#4cc790', '#f4efe6', '#ffffff'];
  const ps = Array.from({ length: 110 }, () => {
    const a = -Math.PI * (0.1 + Math.random() * 0.8), v = 7 + Math.random() * 11;
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      col: colors[(Math.random() * colors.length) | 0], t: Math.random() < 0.55 ? glyphs[(Math.random() * glyphs.length) | 0] : null, s: 7 + Math.random() * 7 };
  });
  const t0 = performance.now();
  const frame = (now) => {
    g.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach((p) => {
      p.vy += 0.38; p.vx *= 0.992; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.col;
      if (p.t) { g.font = `800 ${p.s + 6}px monospace`; g.fillText(p.t, 0, 0); } else g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      g.restore();
    });
    if (now - t0 < 3000) requestAnimationFrame(frame); else c.remove();
  };
  requestAnimationFrame(frame);
}
