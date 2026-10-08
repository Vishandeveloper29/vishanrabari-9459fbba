import { ArrowUpRight, Code2, Layers3, MapPin, Palette, Rocket } from 'lucide-react';
import useReveal from '../hooks/useReveal';
import { StickerLayer } from './Stickers';
import GithubPulse from './GithubPulse';

const facts = [
  ['01', 'VISHAN RABARI', 'Frontend Developer / React / UI', Code2],
  ['02', 'KV AGENCY', 'Co-Founder / Web Solutions', Layers3],
  ['03', 'KUSH PANDIT', 'Co-Founder / Developer', Palette],
  ['04', 'MY APPROACH', 'Build / Ship / Learn / Repeat', Rocket],
];

export default function About() {
  const [ref, inView] = useReveal();
  return (
    <section id="about" ref={ref} className={`section black-section ab ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="ab-head">
          <div className="section-tag reveal">002 / ABOUT VISHAN</div>
          <h2 className="mega reveal reveal-1">CODE<br /><span>CREATE.</span><br /><em>REPEAT.</em></h2>
        </div>

        <div className="ab-main">
          <div className="ab-photo reveal reveal-2">
            <div className="ab-frame">
              <img src="/profile.webp" alt="Portrait of Vishan Rabari" width="800" height="800" loading="lazy" />
            </div>
            <StickerLayer set="about" />
            <span className="ab-badge ab-b1"><Code2 size={16} /> REACT DEV</span>
            <span className="ab-badge ab-b2">CO-FOUNDER @ KV AGENCY</span>
            <span className="ab-badge ab-b3"><MapPin size={15} /> GANDHIDHAM, IN</span>
          </div>

          <div className="ab-copy reveal reveal-3">
            <h3>Hi, I'm <em>Vishan.</em></h3>
            <p>
              I'm a developer focused on modern frontend experiences. I started with plain HTML, CSS and
              JavaScript, then moved into React, Vite and Tailwind — and never stopped building.
            </p>
            <p>
              Alongside my own projects, I'm the co-founder of <b>KV Agency</b> with Kush Pandit, where we
              build web solutions for real people, brands and businesses — from first idea to live product.
            </p>
            <div className="ab-tags">
              {['Frontend', 'React', 'UI / UX', 'Motion', 'Three.js (learning)'].map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="ab-actions">
              <a className="btn lime" href="#contact">LET'S TALK <ArrowUpRight size={19} /></a>
              <a className="btn" href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer">SEE MY GITHUB <ArrowUpRight size={19} /></a>
            </div>
          </div>
        </div>

        <div className="fact-grid ab-facts">
          {facts.map(([n, t, d, Icon], i) => (
            <div className={'fact reveal reveal-' + (i + 1) + (i === 1 || i === 2 ? ' lime-card' : '')} key={n}>
              <div className="fact-head"><small>{n}</small><Icon size={27} /></div>
              <h3>{t}</h3>
              <p>{d}</p>
              <ArrowUpRight className="fact-arrow" size={22} />
            </div>
          ))}
        </div>

        <GithubPulse />

        <div className="manifesto">
          <span>VISHAN / MANIFESTO</span>
          <strong>GOOD UI.<br />CLEAN CODE.<br />LOUD IDEAS.</strong>
          <a href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer">SEE MY GITHUB <ArrowUpRight size={20} /></a>
        </div>
      </div>
    </section>
  );
}
