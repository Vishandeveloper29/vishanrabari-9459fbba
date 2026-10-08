import { useEffect } from 'react';

// Pointer-driven polish (desktop only, skipped for reduced-motion):
//  - card glow follows the cursor  (--mx / --my)
//  - About photo gets a 3D tilt     (--rx / --ry)
//  - Hero orbs drift with the mouse (--px / --py)
export default function useInteractive() {
  useEffect(() => {
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (!fine || reduce) return;

    const GLOW = '.service,.fact,.journey-card,.skill-group,.contact-card';
    let raf = 0, ev = null, tilted = null;

    const resetTilt = () => {
      if (tilted) { tilted.style.setProperty('--rx', '0deg'); tilted.style.setProperty('--ry', '0deg'); tilted = null; }
    };

    const run = () => {
      raf = 0;
      if (!ev) return;
      const { clientX: x, clientY: y, target } = ev;
      const el = target instanceof Element ? target : null;

      const card = el?.closest(GLOW);
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${x - r.left}px`);
        card.style.setProperty('--my', `${y - r.top}px`);
      }

      const photo = el?.closest('.ab-photo');
      if (photo) {
        const r = photo.getBoundingClientRect();
        const nx = (x - r.left) / r.width - 0.5;
        const ny = (y - r.top) / r.height - 0.5;
        photo.style.setProperty('--rx', `${nx * 14}deg`);
        photo.style.setProperty('--ry', `${-ny * 14}deg`);
        tilted = photo;
      } else resetTilt();

      const hero = document.querySelector('.hx');
      if (hero && y < hero.getBoundingClientRect().bottom) {
        hero.style.setProperty('--px', (x / innerWidth - 0.5).toFixed(3));
        hero.style.setProperty('--py', (y / innerHeight - 0.5).toFixed(3));
      }
    };

    const onMove = (e) => { ev = e; if (!raf) raf = requestAnimationFrame(run); };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);
}
