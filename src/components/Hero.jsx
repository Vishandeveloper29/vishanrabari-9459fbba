import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { StickerLayer } from './Stickers';

const roles = ['Frontend Developer', 'React Builder', 'UI Craftsman', 'KV Agency Co-Founder'];

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return <span key={i} className="hx-role-word">{roles[i]}</span>;
}

// Counts up to the number the first time it scrolls into view ("06+" -> 06+).
function CountUp({ value }) {
  const m = /^(\d+)(.*)$/.exec(value);
  const ref = useRef(null);
  const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches;
  const [n, setN] = useState(m ? (reduce ? parseInt(m[1], 10) : 0) : null);
  useEffect(() => {
    if (!m || reduce) return;
    const end = parseInt(m[1], 10);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1300);
        setN(Math.round(end * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return value;
  return <span ref={ref}>{String(n).padStart(m[1].length, '0')}{m[2]}</span>;
}

const GithubMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.18c-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>
);

const stack = ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'UI / UX'];
const stats = [
  ['06+', 'PROJECTS / BUILDS'],
  ['05+', 'CORE SKILLS'],
  ['01', 'PERSONAL PORTFOLIO'],
  ['02', 'KV AGENCY FOUNDERS'],
];

function Doodles() {
  return (
    <svg className="hx-doodles" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="dd-line dd-bob" d="M80 200 q25 -42 50 0 t50 0 t50 0 t50 0" />
      <g transform="translate(1060 170)"><path className="dd-fill-v dd-spin" d="M0-30 C4-9 9-4 30 0 C9 4 4 9 0 30 C-4 9 -9 4 -30 0 C-9 -4 -4 -9 0 -30Z" /></g>
      <circle className="dd-line dd-dash" cx="150" cy="570" r="46" />
      <path className="dd-line dd-bob2" d="M1000 560h42M1021 539v42" />
      <polygon className="dd-fill-e dd-bob" points="1110,420 1144,478 1076,478" />
      <g transform="translate(250 420)" className="dd-spin2"><path className="dd-line" d="M0-18V18M-15.6-9L15.6 9M-15.6 9L15.6-9" /></g>
      <rect className="dd-fill-g dd-bob2" x="930" y="650" width="34" height="34" rx="9" transform="rotate(14 947 667)" />
      <circle className="dd-fill-v" cx="1130" cy="300" r="9" />
      <circle className="dd-fill-g" cx="90" cy="400" r="7" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hx">
      <div className="hx-orb hx-orb-a" aria-hidden="true" />
      <div className="hx-orb hx-orb-b" aria-hidden="true" />
      <div className="hx-orb hx-orb-c" aria-hidden="true" />
      <div className="hx-grid" aria-hidden="true" />
      <Doodles />
      <StickerLayer set="hero" />

      <div className="page-wrap hx-inner">
        <div className="hx-pill hx-up"><i /> AVAILABLE TO BUILD · 2026</div>

        <div className="hx-role hx-up hx-d1" aria-hidden="true"><i>//</i> <RotatingRole /></div>

        <h1 className="hx-title hx-up hx-d1">
          I build websites<br />
          that <span className="hx-mark">stand out.</span>
        </h1>

        <p className="hx-sub hx-up hx-d2">
          Hey, I'm <b>Vishan Rabari</b> — frontend developer and co-founder of <b>KV Agency</b>.
          I turn ideas into fast, bold and polished web experiences with React.
        </p>

        <div className="hx-stack hx-up hx-d3" aria-label="Technology stack">
          {stack.map((s) => <span key={s}>{s}</span>)}
        </div>

        <div className="hx-actions hx-up hx-d4">
          <a className="btn lime" href="#projects">VIEW MY WORK <ArrowUpRight size={19} /></a>
          <a className="btn black" href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer"><GithubMark /> GITHUB</a>
        </div>

        <a className="hx-scroll hx-up hx-d4" href="#about" aria-label="Scroll to about">
          <Sparkles size={15} /> SCROLL <span />
        </a>
      </div>

      <div className="page-wrap marquee-wrap">
        <div className="marquee">
          {['VISHAN RABARI', 'FRONTEND DEVELOPER', 'REACT', 'KV AGENCY', 'WEB SOLUTIONS', 'GITHUB / VISHANDEVELOPER29'].map((x, i) => (
            <span key={i}>{x}<b>✳</b></span>
          ))}
        </div>
      </div>

      <div className="page-wrap stat-grid">
        {stats.map(([n, l], i) => <div key={l} className={i % 2 ? 'stat dark' : 'stat'}><strong><CountUp value={n} /></strong><span>{l}</span></div>)}
      </div>
    </section>
  );
}
