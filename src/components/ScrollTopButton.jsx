import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const RADIUS = 17;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? doc.scrollTop / max : 0;
      setVisible(doc.scrollTop > 500);
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - pct));
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      className={`scrolltop-btn ${visible ? 'is-visible' : ''}`}
      onClick={goTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg width="46" height="46" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r={RADIUS} fill="none" stroke="var(--black)" strokeOpacity=".15" strokeWidth="3" />
        <circle
          ref={ringRef}
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
        />
      </svg>
      <ArrowUp size={17} />
    </button>
  );
}
