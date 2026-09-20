// A handful of deliberately placed accent stickers, kept out of the copy
// column so they add texture without fighting the headline for attention.
const stickers = [
  { text: 'NO TEMPLATE', top: '8%', left: '62%', rot: -6, variant: 'dark' },
  { text: 'BUILD LOUD', top: '20%', left: '90%', rot: 5, variant: 'lime' },
  { text: 'SHIP FAST ✳', top: '46%', left: '3%', rot: -4, variant: '' },
  { text: 'EST. 2025', top: '78%', left: '88%', rot: 4, variant: 'dark' },
];

export default function StickerCloud() {
  return (
    <div className="sticker-cloud" aria-hidden="true">
      {stickers.map((s) => (
        <span
          key={s.text}
          className={`max-sticker ${s.variant}`}
          style={{ top: s.top, left: s.left, '--rot': `${s.rot}deg` }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
