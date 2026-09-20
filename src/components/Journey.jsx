import useReveal from '../hooks/useReveal';

const steps = [
  ['2024', 'FIRST LINES OF CODE', 'Started learning HTML, CSS and JavaScript from scratch, building small static pages to understand how the web actually works.', false],
  ['2025', 'REACT & THE MODERN STACK', 'Moved into React, Vite and Tailwind CSS. Started building real interfaces instead of tutorials, and picked up Figma to design before I build.', false],
  ['2025', 'KV AGENCY, FOUNDED', 'Teamed up with Kush Pandit to launch KV Agency — building websites and product interfaces for real clients, end to end.', false],
  ['NOW', 'SHIPPING REAL PRODUCTS', 'Building and shipping projects like DMLoop, EventCure and TrueBuild — taking briefs from idea to a live, working product.', true],
  ['NEXT', 'DEEPER INTO 3D & BACKEND', 'Learning Three.js, WebGL and Node.js to build fuller-stack, more immersive experiences — not just interfaces, but worlds.', false],
];

export default function Journey() {
  const [ref, inView] = useReveal(0.2);

  return (
    <section id="journey" ref={ref} className={`section paper-section theme-ember ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="section-top">
          <div>
            <div className="section-tag reveal">006 / THE JOURNEY</div>
            <h2 className="mega dark reveal reveal-1">
              NO<br /><span>STRAIGHT</span><br /><em>LINE.</em>
            </h2>
          </div>
          <p className="lead reveal reveal-2">
            From a first HTML file to co-founding a small agency — every step here changed what I build next.
            The direction shifts; the standard doesn't.
          </p>
        </div>

        <div className="journey-line">
          {steps.map(([time, title, desc, isNow], i) => (
            <article className={`journey-item ${isNow ? 'is-now' : ''}`} key={title}>
              <div className="journey-pin">{time}</div>
              <div className="journey-card">
                <div className="journey-card-head">
                  <small>STEP 0{i + 1}</small>
                  {isNow && <small>● CURRENT</small>}
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
