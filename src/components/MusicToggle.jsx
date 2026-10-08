import { useEffect, useState } from 'react';
import { toggleMusic, isMusicOn } from '../lib/ambient';

export default function MusicToggle() {
  const [on, setOn] = useState(isMusicOn);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const sync = (e) => setOn(e.detail);
    window.addEventListener('vr-music', sync);
    const show = setTimeout(() => setHint(true), 2600);
    const hide = setTimeout(() => setHint(false), 11000);
    return () => { window.removeEventListener('vr-music', sync); clearTimeout(show); clearTimeout(hide); };
  }, []);

  return (
    <div className="music-wrap">
      <button type="button" className={`music-btn ${on ? 'on' : ''}`} onClick={() => { setHint(false); toggleMusic(); }} aria-pressed={on} aria-label={on ? 'Turn background music off' : 'Turn background music on'}>
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          {[3, 8, 13, 18].map((x, i) => <rect key={x} className={`mb mb${i}`} x={x} y="3" width="3" height="18" rx="1.5" />)}
        </svg>
        <span className="music-label">{on ? 'SOUND ON' : 'SOUND OFF'}</span>
      </button>
      {hint && !on && <span className="music-nudge" role="status">Tap for music ♪</span>}
    </div>
  );
}
