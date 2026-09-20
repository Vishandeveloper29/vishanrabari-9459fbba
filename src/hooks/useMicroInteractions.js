import { useEffect } from 'react';

const TILT_SELECTOR = '.service, .fact, .journey-card, .project-feature, .about-poster';
const MAGNETIC_SELECTOR = '.btn, .nav-cta, .menu-btn, .scrolltop-btn';
const CURSOR_HOVER_SELECTOR = 'a, button, input, textarea, .project-tab, .section-dots a';

// Attaches lightweight, delegated mouse listeners once for the whole app:
// - a lagging ring + snapping dot custom cursor
// - a subtle 3D tilt on card-like surfaces
// - a magnetic pull on buttons/CTAs
// Desktop + fine-pointer only; fully skipped on touch devices and when the
// user has requested reduced motion.
export default function useMicroInteractions() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf = null;

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const clearTilt = (except) => {
      document.querySelectorAll('.is-tilting').forEach((el) => {
        if (el !== except) {
          el.style.transform = '';
          el.classList.remove('is-tilting');
        }
      });
    };
    const clearMagnetic = (except) => {
      document.querySelectorAll('.is-magnetic').forEach((el) => {
        if (el !== except) {
          el.style.transform = '';
          el.classList.remove('is-magnetic');
        }
      });
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dot) dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;

      const tiltEl = e.target.closest ? e.target.closest(TILT_SELECTOR) : null;
      clearTilt(tiltEl);
      if (tiltEl) {
        const r = tiltEl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tiltEl.classList.add('is-tilting');
        tiltEl.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateZ(4px)`;
      }

      const magEl = e.target.closest ? e.target.closest(MAGNETIC_SELECTOR) : null;
      clearMagnetic(magEl);
      if (magEl) {
        const r = magEl.getBoundingClientRect();
        const mx = (e.clientX - (r.left + r.width / 2)) * 0.26;
        const my = (e.clientY - (r.top + r.height / 2)) * 0.26;
        magEl.classList.add('is-magnetic');
        magEl.style.transform = `translate(${mx.toFixed(1)}px, ${my.toFixed(1)}px)`;
      }

      const hoverEl = e.target.closest ? e.target.closest(CURSOR_HOVER_SELECTOR) : null;
      document.body.classList.toggle('cursor-active', !!hoverEl);
    };

    const resetAll = () => {
      clearTilt(null);
      clearMagnetic(null);
      document.body.classList.remove('cursor-active');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', resetAll);
    window.addEventListener('scroll', () => clearTilt(null), { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', resetAll);
      resetAll();
    };
  }, []);
}
