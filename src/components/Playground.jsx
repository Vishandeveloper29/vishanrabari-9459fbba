import { useEffect, useRef, useState } from 'react';
import useReveal from '../hooks/useReveal';
import { toggleMusic } from '../lib/ambient';
import { confetti } from '../lib/confetti';
import { copyText } from '../lib/toast';

const EMAIL = 'rabarivishan2@gmail.com';
const PROJECTS = [
  ['DMLoop', 'social-automation SaaS', 'https://www.dmloop.app/'],
  ['EventCure', 'event-ops command center', 'https://eventcure-livid.vercel.app/'],
  ['TrueBuild', 'business / commerce site', 'https://truebuilddeck.vercel.app/'],
];
const COFFEE = `    ( (
     ) )
  .______.
  |      |]
  \\      /
   \`----'   ← fuel for shipping`;

const Link = ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;

const COMMANDS = {
  help: () => ['Available commands:', '  about      who is Vishan', '  skills     the toolkit', '  projects   things I shipped', '  contact    reach me', '  socials    find me online', '  music      toggle the lo-fi',
    '  coffee     ☕', '  confetti   🎉', '  sudo hire vishan', '  clear      wipe the screen', '', 'Tip: ↑/↓ history · Tab autocomplete · Ctrl+K for the quick menu'],
  about: () => ['Vishan Rabari — frontend developer, Gandhidham (IN).', 'Co-founder of KV Agency with Kush Pandit.', 'Build / Ship / Learn / Repeat.'],
  skills: () => ['core      → HTML, CSS, JavaScript (ES6+), React, Vite', 'styling   → Tailwind CSS, Framer Motion, responsive UI', 'tools     → Figma, Git, API integration', 'learning  → Three.js, WebGL, Node.js'],
  projects: () => PROJECTS.map(([n, d, u]) => <span key={n}>→ <Link href={u}>{n}</Link> — {d}</span>),
  contact: () => [<span key="m">email   → <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>, <span key="w">website → <Link href="https://www.vishandeveloper.me">vishandeveloper.me</Link></span>, 'tip: run `sudo hire vishan` 😉'],
  socials: () => [<span key="g">github  → <Link href="https://github.com/Vishandeveloper29">Vishandeveloper29</Link></span>],
  whoami: () => ['visitor — a person with great taste in portfolios'],
  ls: () => ['about.txt  skills.json  projects/  contact.md  secrets/'],
  date: () => [new Date().toString()],
  coffee: () => [COFFEE],
};
const ALIASES = { 'cat about.txt': 'about', 'cat skills.json': 'skills', 'cd projects': 'projects', 'cat contact.md': 'contact', '?': 'help' };
const NAMES = [...Object.keys(COMMANDS), 'clear', 'music', 'confetti', 'sudo hire vishan', 'echo'];
const CHIPS = ['help', 'about', 'skills', 'projects', 'contact', 'music', 'sudo hire vishan'];

export default function Playground() {
  const [ref, inView] = useReveal();
  const [lines, setLines] = useState([{ k: 'out', c: "Welcome to vishan.dev v3.0 — type 'help' or tap a command below." }]);
  const [val, setVal] = useState('');
  const hist = useRef({ list: [], i: -1 });
  const body = useRef(null);
  const field = useRef(null);

  useEffect(() => { if (body.current) body.current.scrollTop = body.current.scrollHeight; }, [lines]);

  const push = (arr) => setLines((l) => [...l, ...arr]);
  const out = (res, k = 'out') => res.map((c) => ({ k, c }));

  const run = (raw) => {
    const cmd = raw.trim().replace(/\s+/g, ' ');
    const low = cmd.toLowerCase();
    if (!cmd) return;
    hist.current.list.push(cmd); hist.current.i = hist.current.list.length;
    const echo = { k: 'in', c: cmd };
    if (low === 'clear') { setLines([]); return; }
    if (low === 'music') { toggleMusic(); push([echo, ...out(['♪ toggling the lo-fi…'], 'ok')]); return; }
    if (low === 'confetti') { confetti(); push([echo, ...out(['🎉 boom.'], 'ok')]); return; }
    if (low.startsWith('echo ')) { push([echo, ...out([cmd.slice(5)])]); return; }
    if (low === 'sudo hire vishan') {
      confetti();
      push([echo, ...out(['[sudo] verifying taste in developers… ✔', 'offer accepted! opening your mail app…'], 'ok')]);
      setTimeout(() => { window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Let’s work together')}`; }, 1100);
      return;
    }
    if (low.startsWith('sudo')) { push([echo, ...out(['nice try — you are not in the sudoers file. This incident will be reported. 🕵️'], 'err')]); return; }
    if (low === 'cd secrets' || low === 'ls secrets') { push([echo, ...out(['there is only coffee and unfinished side projects here ☕'])]); copyText(EMAIL, '📋 Secret unlocked: email copied'); return; }
    const key = ALIASES[low] || low;
    if (COMMANDS[key]) { push([echo, ...out(COMMANDS[key]())]); return; }
    push([echo, ...out([`command not found: ${cmd} — try 'help'`], 'err')]);
  };

  const onKey = (e) => {
    const h = hist.current;
    if (e.key === 'Enter') { run(val); setVal(''); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (h.i > 0) { h.i--; setVal(h.list[h.i]); } }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (h.i < h.list.length - 1) { h.i++; setVal(h.list[h.i]); } else { h.i = h.list.length; setVal(''); } }
    else if (e.key === 'Tab') { e.preventDefault(); const m = NAMES.filter((n) => val && n.startsWith(val.toLowerCase())); if (m.length) setVal(m[0]); }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); }
  };

  return (
    <section id="terminal" ref={ref} className={`section black-section theme-violet play ${inView ? 'in-view' : ''}`}>
      <div className="page-wrap">
        <div className="section-tag reveal">007 / PLAYGROUND</div>
        <h2 className="mega reveal reveal-1">TRY<br /><span>THE</span><br /><em>TERMINAL.</em></h2>
        <p className="lead light reveal reveal-2">A tiny command line living inside my portfolio. Type <b>help</b>, poke around, or run <b>sudo hire vishan</b> — go on.</p>

        <div className="term reveal reveal-3" onClick={() => field.current?.focus({ preventScroll: true })}>
          <div className="term-bar"><i /><i /><i /><span>visitor@vishan.dev — zsh</span></div>
          <div className="term-body" ref={body} aria-live="polite">
            {lines.map((l, i) => (
              <div key={i} className={`tl tl-${l.k}`}>{l.k === 'in' && <span className="ps">visitor@vishan:~$</span>} <span className="tt">{l.c}</span></div>
            ))}
            <label className="tl tl-in term-input"><span className="ps">visitor@vishan:~$</span>
              <input ref={field} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={onKey} spellCheck="false" autoCapitalize="off" autoComplete="off" autoCorrect="off" aria-label="Terminal command input" />
            </label>
          </div>
        </div>
        <div className="term-chips" aria-label="Quick commands">
          {CHIPS.map((c) => <button key={c} type="button" onClick={() => run(c)}>{c}</button>)}
        </div>
      </div>
    </section>
  );
}
