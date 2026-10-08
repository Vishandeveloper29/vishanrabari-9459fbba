import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, CornerDownLeft } from 'lucide-react';
import { toggleMusic } from '../lib/ambient';
import { confetti } from '../lib/confetti';
import { copyText } from '../lib/toast';

const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const ITEMS = [
  ['Go to', 'Home', 'top start', go('home')], ['Go to', 'About', 'me photo', go('about')],
  ['Go to', 'Services', 'what i do', go('services')], ['Go to', 'Work / Projects', 'dmloop eventcure truebuild', go('projects')],
  ['Go to', 'Skills', 'react tools stack', go('skills')], ['Go to', 'Journey', 'timeline story', go('journey')],
  ['Go to', 'Terminal playground', 'cli commands', go('terminal')], ['Go to', 'Contact', 'hire email', go('contact')],
  ['Actions', 'Toggle background music', 'sound lofi audio', () => toggleMusic()],
  ['Actions', 'Copy email address', 'mail gmail', () => copyText('rabarivishan2@gmail.com', '📋 Email copied')],
  ['Actions', 'Open GitHub profile', 'code repo', () => window.open('https://github.com/Vishandeveloper29', '_blank', 'noopener')],
  ['Actions', 'Open vishandeveloper.me', 'website', () => window.open('https://www.vishandeveloper.me', '_blank', 'noopener')],
  ['Fun', 'Launch confetti', 'party celebrate', () => confetti()],
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef(null);

  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); setQ(''); setSel(0); }
      else if (e.key === 'Escape') setOpen(false);
    };
    const show = () => { setOpen(true); setQ(''); setSel(0); };
    addEventListener('keydown', key); addEventListener('vr-palette', show);
    return () => { removeEventListener('keydown', key); removeEventListener('vr-palette', show); };
  }, []);

  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 30); }, [open]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ITEMS.filter(([g, t, k]) => !s || `${g} ${t} ${k}`.toLowerCase().includes(s));
  }, [q]);

  const run = (item) => { setOpen(false); setTimeout(item[3], 120); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel((i) => Math.min(list.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter' && list[sel]) run(list[sel]);
  };

  if (!open) return null;
  return (
    <div className="pal-back" onMouseDown={() => setOpen(false)}>
      <div className="pal" role="dialog" aria-modal="true" aria-label="Quick menu" onMouseDown={(e) => e.stopPropagation()}>
        <div className="pal-top"><Search size={18} />
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={onKey} placeholder="Type a command or search…" aria-label="Search commands" />
          <kbd>ESC</kbd></div>
        <ul className="pal-list">
          {list.length === 0 && <li className="pal-empty">No match — try “music” or “contact”</li>}
          {list.map((it, i) => (
            <li key={it[1]}>
              <button type="button" className={i === sel ? 'on' : ''} onMouseEnter={() => setSel(i)} onClick={() => run(it)}>
                <small>{it[0]}</small><span>{it[1]}</span>{i === sel && <CornerDownLeft size={15} />}
              </button>
            </li>
          ))}
        </ul>
        <div className="pal-foot">↑↓ navigate · ↵ select · Ctrl/⌘ K toggle</div>
      </div>
    </div>
  );
}
