import { ArrowDownRight, ArrowUpRight, Code2, Sparkles } from 'lucide-react';
import StickerCloud from './StickerCloud';

const GithubMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.18c-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.46.12-3.04 0 0 .98-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.64 1.58.24 2.74.12 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.35.79 1.04.79 2.1v3.12c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
);

const stack = ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'UI / UX'];
const stats = [
  ['06+', 'PROJECTS / BUILDS'],
  ['05+', 'CORE SKILLS'],
  ['01', 'PERSONAL PORTFOLIO'],
  ['02', 'KV AGENCY FOUNDERS'],
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <StickerCloud />
      <div className="hero-sun" />
      <div className="hero-ring" />
      <div className="hero-corner">VISHAN<br />RABARI</div>
      <div className="hero-side-note">KV AGENCY<br /><span>WEB SOLUTIONS</span></div>

      <div className="page-wrap hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">PERSONAL PORTFOLIO / VISHAN RABARI / 2026</div>
          <div className="hero-index">001 — DEVELOPER / CO-FOUNDER @ KV AGENCY</div>

          <h1 className="hero-title">
            I BUILD<br />
            <span className="fill">WEBSITES</span><br />
            <span className="stroke">THAT STAND OUT.</span>
          </h1>

          <div className="hero-under">
            <p>
              Hey, I'm <b>Vishan Rabari</b> — a developer who designs and builds modern web experiences. I work with React, JavaScript, Vite and Tailwind, and I'm also the co-founder of <b>KV Agency</b> with Kush Pandit.
            </p>
            <span className="scribble">IDEA<br />→ UI<br />→ CODE<br />→ SHIP</span>
          </div>

          <div className="hero-stack" aria-label="Vishan's technology stack">
            {stack.map((item) => <span key={item}>{item}</span>)}
          </div>

          <div className="hero-actions">
            <a className="btn lime" href="#projects">VIEW MY WORK <ArrowUpRight size={19} /></a>
            <a className="btn black" href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer"><GithubMark size={18} /> GITHUB <ArrowDownRight size={18} /></a>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-board">
            <img className="poster-texture" src="/kv-agency-hero-art.png" alt="Neon maximalist artwork for Vishan Rabari and KV Agency" />
            <div className="art-overlay" />
            <div className="art-top"><span>VISHAN RABARI / DEVELOPER</span><span>● AVAILABLE TO BUILD</span></div>

            <div className="profile-frame">
              <div className="profile-frame-label">VISHAN<br />RABARI</div>
              <img src="/profile.webp" alt="Portrait of Vishan Rabari" />
              <div className="profile-vr">VR</div>
            </div>

            <div className="art-main">
              <span className="art-giant art-vr-back">VR</span>
              <span className="art-giant art-vr-front">VR</span>
              <span className="art-slash">/</span>
            </div>

            <div className="art-bottom">
              <span>REACT</span><span>UI / UX</span><span>FRONTEND</span><Code2 size={30} />
            </div>
            <div className="art-sticker">CO-FOUNDER<br />@ KV AGENCY</div>
            <div className="art-cursor"><Sparkles size={18} /><b>BUILD<br />SOMETHING<br />REAL</b></div>
          </div>
          <div className="hero-label"><Sparkles size={17} /> VISHAN RABARI / KV AGENCY / WEB SOLUTIONS</div>
        </div>
      </div>

      <div className="page-wrap marquee-wrap">
        <div className="marquee">
          {['VISHAN RABARI', 'FRONTEND DEVELOPER', 'REACT', 'KV AGENCY', 'WEB SOLUTIONS', 'GITHUB / VISHANDEVELOPER29'].map((x, i) => (
            <span key={i}>{x}<b>✳</b></span>
          ))}
        </div>
      </div>

      <div className="page-wrap stat-grid">
        {stats.map(([n, l], i) => <div key={l} className={i % 2 ? 'stat dark' : 'stat'}><strong>{n}</strong><span>{l}</span></div>)}
      </div>
    </section>
  );
}
