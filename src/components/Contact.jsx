import { useState } from 'react';
import { ArrowUpRight, Globe2, Mail, MapPin } from 'lucide-react';
import useReveal from '../hooks/useReveal';

const GithubMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.18c-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.46.12-3.04 0 0 .98-.31 3.18 1.18a11.05 11.05 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.64 1.58.24 2.74.12 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.35.79 1.04.79 2.1v3.12c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
);

export default function Contact() {
  const [ref, inView] = useReveal(0.2);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project brief from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:rabarivishan2@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" ref={ref} className={`section paper-section contact-section theme-ember ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="section-top">
          <div>
            <div className="section-tag reveal">007 / CONTACT</div>
            <h2 className="mega dark reveal reveal-1">
              LET'S<br /><span>BUILD</span><br /><em>SOMETHING.</em>
            </h2>
          </div>
          <p className="lead reveal reveal-2">
            Have a website, product idea, redesign or a weird brief? Tell me what you're trying to build — I can
            take it from a rough idea to a shipped web experience, solo or with KV Agency.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card black-card reveal reveal-2">
            <div className="contact-row">
              <Mail />
              <div><small>EMAIL</small><a href="mailto:rabarivishan2@gmail.com">rabarivishan2@gmail.com</a></div>
            </div>
            <div className="contact-row">
              <Globe2 />
              <div><small>PORTFOLIO</small><a href="https://www.vishandeveloper.me" target="_blank" rel="noreferrer">vishandeveloper.me</a></div>
            </div>
            <div className="contact-row">
              <GithubMark size={22} />
              <div><small>GITHUB</small><a href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer">Vishandeveloper29</a></div>
            </div>
            <div className="contact-row">
              <MapPin />
              <div><small>BASE</small><strong>Gandhidham, Gujarat / India</strong></div>
            </div>
            <div className="contact-sticker">YOUR<br />IDEA<br />NEXT →</div>
          </div>

          <form className="contact-form reveal reveal-3" onSubmit={handleSubmit}>
            <label>
              YOUR NAME
              <input value={form.name} onChange={update('name')} placeholder="Type your name" required />
            </label>
            <label>
              YOUR EMAIL
              <input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" required />
            </label>
            <label>
              WHAT ARE WE MAKING?
              <textarea rows="5" value={form.message} onChange={update('message')} placeholder="Tell me what you have in mind..." required />
            </label>
            <button className="btn black" type="submit">SEND THE BRIEF <ArrowUpRight size={18} /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
