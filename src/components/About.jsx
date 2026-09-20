import { ArrowUpRight, Code2, Layers3, Palette, Rocket } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const facts = [
  ['01', 'VISHAN RABARI', 'Frontend Developer / React / UI', Code2],
  ['02', 'KV AGENCY', 'Co-Founder / Web Solutions', Layers3],
  ['03', 'KUSH PANDIT', 'Co-Founder / Developer', Palette],
  ['04', 'MY APPROACH', 'Build / Ship / Learn / Repeat', Rocket],
];

export default function About() {
  const [ref, inView] = useReveal();
  return (
    <section id="about" ref={ref} className={`section black-section ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="section-top">
          <div>
            <div className="section-tag reveal">002 / ABOUT VISHAN</div>
            <h2 className="mega reveal reveal-1">CODE<br /><span>CREATE.</span><br /><em>REPEAT.</em></h2>
          </div>
          <p className="lead light reveal reveal-2">
            I'm Vishan Rabari, a developer focused on modern frontend experiences. Alongside building my own
            projects, I'm the co-founder of <b>KV Agency</b> with Kush Pandit, where we build web solutions for
            real people, brands and businesses.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-poster reveal reveal-2">
            <div className="poster-word">BUILD<br />YOUR<br /><span>OWN<br />LANE.</span></div>
            <div className="poster-note">VISHAN RABARI<br />DEVELOPER<br />KV AGENCY</div>
            <div className="poster-circle" />
          </div>
          <div className="fact-grid">
            {facts.map(([n, t, d, Icon], i) => (
              <div className={'fact ' + (i === 1 || i === 2 ? 'lime-card' : '')} key={n}>
                <div className="fact-head"><small>{n}</small><Icon size={27} /></div>
                <h3>{t}</h3>
                <p>{d}</p>
                <ArrowUpRight className="fact-arrow" size={22} />
              </div>
            ))}
          </div>
        </div>
        <div className="manifesto">
          <span>VISHAN / MANIFESTO</span>
          <strong>GOOD UI.<br />CLEAN CODE.<br />LOUD IDEAS.</strong>
          <a href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer">SEE MY GITHUB <ArrowUpRight size={20} /></a>
        </div>
      </div>
    </section>
  );
}
