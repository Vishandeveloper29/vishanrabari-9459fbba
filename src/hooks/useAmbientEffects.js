import { useEffect } from 'react';

const EGG_WORD = 'kv';

// A second, independent effects layer (kept separate from
// useMicroInteractions so each hook stays small and easy to reason about):
// - sets --px/--py on <html> for hero parallax depth
// - tracks pointer position for a soft "spotlight" glow over dark sections
// - spawns a quick expanding ring wherever the user clicks
// - a tiny easter egg: typing "kv" anywhere triggers a one-off colour pulse
export default function useAmbientEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;

    let onMove;
    if (fine && !reduceMotion) {
      onMove = (e) => {
        const px = (e.clientX / window.innerWidth - 0.5) * 2;
        const py = (e.clientY / window.innerHeight - 0.5) * 2;
        root.style.setProperty('--px', px.toFixed(3));
        root.style.setProperty('--py', py.toFixed(3));
        root.style.setProperty('--spot-x', `${e.clientX}px`);
        root.style.setProperty('--spot-y', `${e.clientY}px`);
        const overDark = e.target.closest && e.target.closest('.black-section, .loader, .cta-section');
        document.body.classList.toggle('spot-active', !!overDark);
      };
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    const onClick = (e) => {
      if (reduceMotion) return;
      const particle = document.createElement('span');
      particle.className = 'click-burst';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);
      window.setTimeout(() => particle.remove(), 650);
    };
    window.addEventListener('click', onClick);

    let buffer = '';
    let eggTimeout;
    const onKeydown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key.length !== 1) return;
      buffer = (buffer + key).slice(-EGG_WORD.length);
      if (buffer === EGG_WORD) {
        document.body.classList.add('egg-active');
        window.clearTimeout(eggTimeout);
        eggTimeout = window.setTimeout(() => document.body.classList.remove('egg-active'), 1400);
      }
    };
    window.addEventListener('keydown', onKeydown);

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeydown);
      window.clearTimeout(eggTimeout);
      document.body.classList.remove('spot-active', 'egg-active');
    };
  }, []);
}
