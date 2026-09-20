import { useEffect, useState } from 'react';

const sections = [
  ['home', 'HOME'],
  ['about', 'ABOUT'],
  ['services', 'SERVICES'],
  ['projects', 'WORK'],
  ['skills', 'SKILLS'],
  ['journey', 'JOURNEY'],
  ['contact', 'CONTACT'],
];

// Desktop-only editorial detail: a vertical dot rail that tracks which
// section is in view and jumps to it on click, with a label on hover.
export default function SectionDots() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const els = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="section-dots" aria-label="Section navigation">
      {sections.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-label={label}>
          <span className="dot-label">{label}</span>
        </a>
      ))}
    </nav>
  );
}
