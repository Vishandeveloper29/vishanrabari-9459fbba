import { useEffect, useState } from 'react';
import { ArrowUpRight, Command } from 'lucide-react';
import { openPalette } from '../lib/toast';

export default function FloatingDock() {
  const [past, setPast] = useState(false);
  const [atContact, setAtContact] = useState(false);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setPast(scrollY > innerHeight * 0.7)); };
    addEventListener('scroll', on, { passive: true });
    const el = document.getElementById('contact');
    const io = el ? new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { threshold: 0.15 }) : null;
    if (io) io.observe(el);
    return () => { removeEventListener('scroll', on); cancelAnimationFrame(raf); io?.disconnect(); };
  }, []);
  return (
    <div className={`dock ${past && !atContact ? 'show' : ''}`}>
      <a className="dock-cta" href="#contact">LET'S TALK <ArrowUpRight size={16} /></a>
      <button type="button" className="dock-menu" onClick={openPalette} aria-label="Open quick menu"><Command size={16} /><span>MENU</span><kbd>K</kbd></button>
    </div>
  );
}
