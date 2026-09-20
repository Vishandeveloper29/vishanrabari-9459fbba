import { Box, Code2, PenTool, Gauge, Search, Server, ArrowUpRight } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const services = [
  ['01', 'WEB EXPERIENCES', 'High-impact websites with structure, motion and a clear conversion path.', Box],
  ['02', 'FRONTEND SYSTEMS', 'React interfaces that stay responsive, reusable and maintainable.', Code2],
  ['03', 'UI DIRECTION', 'Typography, layout, interaction and visual language turned into a coherent system.', PenTool],
  ['04', 'PERFORMANCE', 'Fast assets, sensible animation and a ruthless eye for unnecessary weight.', Gauge],
  ['05', 'DISCOVERABILITY', 'Semantic HTML, metadata and technical foundations built into the experience.', Search],
  ['06', 'PRODUCT BUILD', 'API-connected interfaces, data flows and product-ready frontend architecture.', Server],
];

export default function Services() {
  const [ref, inView] = useReveal();
  return (
    <section id="services" ref={ref} className={`section paper-section grid-section theme-violet ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="section-top">
          <div>
            <div className="section-tag reveal">003 / WHAT I DO</div>
            <h2 className="mega reveal reveal-1">BUILD<br /><span>THE</span><br /><em>UNEXPECTED.</em></h2>
          </div>
          <p className="lead reveal reveal-2">
            A full digital build from visual direction to shipped frontend — solo, or with KV Agency. Pick a single
            service or bring the whole problem.
          </p>
        </div>
        <div className="service-grid">
          {services.map(([n, t, d, Icon], i) => (
            <article className={'service ' + (i === 1 || i === 4 ? 'lime-card' : '')} key={t}>
              <div className="service-no">{n}</div>
              <div className="service-icon"><Icon /></div>
              <h3>{t}</h3>
              <p>{d}</p>
              <div className="service-foot"><span>DESIGN / BUILD / REFINE</span><a href="#contact" aria-label={'Discuss ' + t}><ArrowUpRight size={20} /></a></div>
            </article>
          ))}
        </div>
        <div className="process-strip">
          {['01 DISCOVER', '02 DIRECTION', '03 DESIGN', '04 DEVELOP', '05 DEPLOY'].map((x) => (
            <div key={x}><b>{x.split(' ')[0]}</b><span>{x.substring(3)}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}
