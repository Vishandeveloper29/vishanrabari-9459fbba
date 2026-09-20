import { ArrowUpRight, Sparkles } from 'lucide-react';
import useReveal from '../hooks/useReveal';

export default function CTABanner() {
  const [ref, inView] = useReveal();
  return (
    <section className={`cta-section ${inView ? 'in-view' : ''}`} ref={ref}>
      <div className="page-wrap cta-box">
        <div className="cta-spark reveal">
          <Sparkles /> OPEN FOR FRONTEND WORK
        </div>
        <h2 className="reveal reveal-1">HAVE A<br /><span>GOOD</span><br />PROBLEM?</h2>
        <p className="reveal reveal-2">
          Bring the messy brief, the half-formed idea or the ambitious launch. I'll turn it into a digital
          experience with a point of view — solo, or with KV Agency.
        </p>
        <a className="btn lime reveal reveal-3" href="#contact">LET'S MAKE IT REAL <ArrowUpRight size={20} /></a>
        <div className="cta-big">VR</div>
      </div>
    </section>
  );
}
