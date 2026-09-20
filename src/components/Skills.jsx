import useReveal from '../hooks/useReveal';

const groups = [
  {
    label: 'FRONTEND',
    items: [
      ['HTML5 & CSS3', 'Markup / layout', 92],
      ['JavaScript (ES6+)', 'Core language', 85],
      ['React.js', 'Component architecture', 88],
      ['Vite', 'Build tooling', 84],
    ],
  },
  {
    label: 'STYLING & MOTION',
    items: [
      ['Tailwind CSS', 'Utility-first styling', 90],
      ['Framer Motion', 'Interface animation', 75],
      ['Responsive UI', 'Mobile-first systems', 88],
    ],
  },
  {
    label: 'TOOLS & DESIGN',
    items: [
      ['Figma', 'Interface design', 78],
      ['Git & GitHub', 'Version control', 82],
      ['REST APIs', 'Data integration', 74],
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useReveal(0.15);

  return (
    <section id="skills" ref={ref} className={`section black-section theme-violet skills-section ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="section-top">
          <div>
            <div className="section-tag reveal">005 / THE TOOLKIT</div>
            <h2 className="mega reveal reveal-1">
              MY<br /><span>SKILLS</span><br /><em>IN ACTION.</em>
            </h2>
          </div>
          <p className="lead light reveal reveal-2">
            A practical stack for building responsive interfaces, motion-heavy experiences and real-world web
            products. Numbers below are a working self-rating, not a certificate — they move up every time I ship.
          </p>
        </div>

        <div className="skills-side">
          <div className="skills-groups">
            {groups.map((group) => (
              <div className="skill-group" key={group.label}>
                <div className="skill-group-head">
                  <h3>{group.label}</h3>
                  <span>{group.items.length} SKILLS</span>
                </div>
                <div className="skill-rows">
                  {group.items.map(([name, tag, pct]) => (
                    <div className="skill-row" key={name}>
                      <div className="skill-row-name">
                        {name}
                        <span className="skill-tag">{tag}</span>
                      </div>
                      <div className="skill-bar">
                        <span className="skill-bar-fill" style={{ '--pct': `${pct}%` }} />
                      </div>
                      <div className="skill-row-pct">{pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="skills-now">
            <h4>CURRENTLY LEARNING</h4>
            <ul>
              <li><b>→</b> Node.js &amp; backend fundamentals, to close the loop between frontend and API</li>
              <li><b>→</b> Three.js / WebGL, for the 3D and immersive work I keep reaching for</li>
              <li><b>→</b> Blender, to model and texture assets I can bring straight into the browser</li>
              <li><b>→</b> System-level animation with Framer Motion, past the basics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="page-wrap ticker-dark">
        <div>
          HTML5 <b>✳</b> CSS3 <b>✳</b> JAVASCRIPT <b>✳</b> REACT <b>✳</b> VITE <b>✳</b> TAILWIND <b>✳</b> FIGMA <b>✳</b> GIT <b>✳</b> THREE.JS <b>✳</b> NODE.JS <b>✳</b> SHIP IT <b>✳</b>
        </div>
      </div>
    </section>
  );
}
