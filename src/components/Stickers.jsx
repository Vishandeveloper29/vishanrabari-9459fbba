import { useRef } from 'react';

/* ---------- die-cut helper: white sticker outline + coloured body ---------- */
const Die = ({ shape, tone, lines = [], children }) => (
  <>
    <g className="cut">
      {shape}
      {lines.map((d, i) => <path key={i} d={d} className="cl" />)}
    </g>
    <g className={tone}>{shape}</g>
    {lines.map((d, i) => <path key={i} d={d} className="ln" />)}
    {children}
  </>
);

const Svg = ({ vb = '0 0 120 120', children }) => <svg viewBox={vb} aria-hidden="true">{children}</svg>;

const pill = (text, tone) => {
  const w = Math.round(text.length * 8.6 + 52);
  return (
    <Svg vb={`0 0 ${w} 52`}>
      <Die tone={tone} shape={<rect x="10" y="8" width={w - 20} height="36" rx="18" />}>
        <text className={`tx ${tone === 'c-k' ? 'tx-p' : ''}`} x={w / 2} y="31" textAnchor="middle">{text}</text>
      </Die>
    </Svg>
  );
};

/* ---------- the sticker pack ---------- */
const PACK = {
  tag: () => (
    <Svg>
      <Die tone="c-v" shape={<rect x="14" y="14" width="92" height="92" rx="26" />}
        lines={['M46 44 L30 60 L46 76', 'M74 44 L90 60 L74 76', 'M66 40 L54 80']} />
    </Svg>
  ),
  braces: () => (
    <Svg>
      <Die tone="c-e" shape={<circle cx="60" cy="60" r="46" />}
        lines={[]}>
        <path className="ln-p" d="M52 34 C42 34 42 42 42 50 C42 56 40 60 34 60 C40 60 42 64 42 70 C42 78 42 86 52 86" />
        <path className="ln-p" d="M68 34 C78 34 78 42 78 50 C78 56 80 60 86 60 C80 60 78 64 78 70 C78 78 78 86 68 86" />
      </Die>
    </Svg>
  ),
  terminal: () => (
    <Svg vb="0 0 150 110">
      <Die tone="c-k" shape={<rect x="12" y="14" width="126" height="82" rx="16" />}>
        <circle cx="28" cy="31" r="4.5" fill="#ff5f57" /><circle cx="42" cy="31" r="4.5" fill="#febc2e" /><circle cx="56" cy="31" r="4.5" fill="#28c840" />
        <text className="tx tx-v" x="26" y="60">$ npm run dev</text>
        <text className="tx tx-p tx-s" x="26" y="80">✓ ready in 42ms<tspan className="blink"> ▌</tspan></text>
      </Die>
    </Svg>
  ),
  coffee: () => (
    <Svg>
      <path className="ln-w" d="M84 62 C104 62 104 86 84 86" />
      <Die tone="c-p" shape={<path d="M28 56 H86 V80 C86 94 76 104 57 104 C38 104 28 94 28 80Z" />} lines={['M84 62 C104 62 104 86 84 86']}>
        <text className="tx tx-d" x="57" y="88" textAnchor="middle">JS</text>
        <path className="ln steam" d="M42 46 q-7 -9 0 -18 t0 -18" />
        <path className="ln steam s2" d="M60 46 q-7 -9 0 -18 t0 -18" />
        <path className="ln steam s3" d="M78 46 q-7 -9 0 -18 t0 -18" />
      </Die>
    </Svg>
  ),
  bug: () => (
    <Svg>
      <Die tone="c-g" shape={<><ellipse cx="60" cy="70" rx="24" ry="30" /><circle cx="60" cy="36" r="13" /></>}
        lines={['M36 58 L16 46', 'M36 70 L14 70', 'M36 82 L16 96', 'M84 58 L104 46', 'M84 70 L106 70', 'M84 82 L104 96', 'M54 26 L46 12', 'M66 26 L74 12', 'M60 50 V98']}>
        <circle cx="48" cy="64" r="4.5" fill="#15130f" /><circle cx="72" cy="78" r="4.5" fill="#15130f" /><circle cx="50" cy="86" r="3.5" fill="#15130f" />
      </Die>
    </Svg>
  ),
  git: () => (
    <Svg>
      <Die tone="c-k" shape={<circle cx="60" cy="60" r="46" />}>
        <path className="ln-p" d="M46 34 V86 M46 72 C46 58 76 66 76 50" />
        <circle className="nd" cx="46" cy="34" r="7" /><circle className="nd" cx="46" cy="86" r="7" /><circle className="nd" cx="76" cy="48" r="7" />
      </Die>
    </Svg>
  ),
  react: () => (
    <Svg>
      <Die tone="c-k" shape={<circle cx="60" cy="60" r="46" />}>
        {[0, 60, 120].map((r) => <ellipse key={r} className="ln-v" cx="60" cy="60" rx="34" ry="13" transform={`rotate(${r} 60 60)`} />)}
        <circle cx="60" cy="60" r="6" fill="var(--volt)" />
      </Die>
    </Svg>
  ),
  semi: () => (
    <Svg>
      <Die tone="c-e" shape={<rect x="14" y="14" width="92" height="92" rx="30" />}>
        <circle cx="60" cy="42" r="9" fill="#15130f" /><circle cx="60" cy="76" r="9" fill="#15130f" />
        <path className="ln" d="M62 84 Q60 97 48 102" />
      </Die>
    </Svg>
  ),
  heart: () => (
    <Svg>
      <Die tone="c-v" shape={<path d="M60 100 C16 68 22 26 46 26 C54 26 58 32 60 37 C62 32 66 26 74 26 C98 26 104 68 60 100Z" />}>
        <text className="tx tx-d tx-l" x="60" y="68" textAnchor="middle">{'<3'}</text>
      </Die>
    </Svg>
  ),
  rocket: () => (
    <Svg>
      <Die tone="c-e" shape={<><path d="M42 68 L22 94 L46 88Z" /><path d="M78 68 L98 94 L74 88Z" /></>} />
      <Die tone="c-p" shape={<path d="M60 10 C82 28 86 56 79 88 H41 C34 56 38 28 60 10Z" />}>
        <circle cx="60" cy="46" r="10" fill="var(--volt)" stroke="#15130f" strokeWidth="3" />
        <path className="flame" d="M49 92 Q60 122 71 92Z" />
      </Die>
    </Svg>
  ),
  cursor: () => (
    <Svg>
      <circle className="ln ripple" cx="38" cy="26" r="20" />
      <Die tone="c-k" shape={<path d="M36 24 L36 90 L52 76 L64 102 L77 96 L65 70 L88 70Z" />} />
    </Svg>
  ),
  p404: () => pill('404: sleep not found', 'c-v'),
  plog: () => pill("console.log('hi')", 'c-k'),
  ctrls: () => pill('Ctrl + S', 'c-p'),
  todo: () => pill('// TODO: ship it', 'c-g'),
};

/* ---------- where each pack goes: [sticker, left%, top%, rotation, width(px), float delay] ---------- */
const SETS = {
  hero: [
    ['tag', 4, 19, -10, 92, 0],
    ['p404', 6, 41, 7, 168, 1.2],
    ['react', 5, 60, 12, 92, 2],
    ['coffee', 87, 16, 8, 92, .6],
    ['terminal', 77, 38, -6, 150, 1.8],
    ['git', 89, 58, -9, 86, 2.4],
    ['cursor', 22, 10, -4, 84, .9],
    ['todo', 74, 8, 5, 160, 1.5],
  ],
  about: [
    ['braces', 78, -4, 10, 86, 0],
    ['bug', -4, 40, -12, 88, 1.1],
    ['semi', 82, 60, 8, 78, 2],
    ['heart', 6, 88, -8, 82, .7],
    ['ctrls', 52, 94, 5, 128, 1.6],
  ],
};

function Sticker({ id, x, y, r, w, d }) {
  const el = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const down = (e) => {
    const node = el.current;
    node.setPointerCapture(e.pointerId);
    node.classList.add('drag');
    const sx = e.clientX - pos.current.x, sy = e.clientY - pos.current.y;
    const move = (ev) => {
      pos.current = { x: ev.clientX - sx, y: ev.clientY - sy };
      node.style.setProperty('--dx', `${pos.current.x}px`);
      node.style.setProperty('--dy', `${pos.current.y}px`);
    };
    const up = () => {
      node.classList.remove('drag');
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerup', up);
      node.removeEventListener('pointercancel', up);
    };
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerup', up);
    node.addEventListener('pointercancel', up);
  };

  const spin = (e) => {
    const inner = e.currentTarget.querySelector('.stk-spin');
    inner.classList.remove('spin'); void inner.offsetWidth; inner.classList.add('spin');
  };

  const Art = PACK[id];
  return (
    <div ref={el} className="stk" onPointerDown={down} onDoubleClick={spin}
      style={{ left: `${x}%`, top: `${y}%`, '--r': `${r}deg`, '--w': `${w}px`, '--d': `${d}s` }}>
      <div className="stk-float"><div className="stk-spin"><Art /></div></div>
    </div>
  );
}

// Drag me around. Double-click to spin. Hidden from assistive tech (pure decoration).
export function StickerLayer({ set = 'hero' }) {
  return (
    <div className={`stk-layer stk-${set}`} aria-hidden="true">
      {SETS[set].map(([id, x, y, r, w, d]) => <Sticker key={id} id={id} x={x} y={y} r={r} w={w} d={d} />)}
    </div>
  );
}
