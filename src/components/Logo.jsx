import { useId } from 'react';

// VR monogram: a "V" and an "R" drawn as one continuous stroke each,
// on a rounded ink badge with a vermilion→amber gradient and a little spark.
export default function Logo({ className = '', size = 44, animate = true }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`logo ${animate ? 'logo-anim' : ''} ${className}`} width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="VR — Vishan Rabari">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff7a45" /><stop offset="1" stopColor="#f2a03d" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#15130f" />
      <rect x="2.75" y="2.75" width="58.5" height="58.5" rx="17.3" fill="none" stroke={`url(#g${id})`} strokeWidth="1.5" opacity=".6" />
      <path className="lg-v" pathLength="1" d="M11 20 L21.5 45 L32 20" fill="none" stroke="#f4efe6" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="lg-r" pathLength="1" d="M39 45 V20 H46.5 a7.5 7.5 0 0 1 0 15 H39 M45.5 35 L53 45" fill="none" stroke={`url(#g${id})`} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="lg-spark" cx="53" cy="11.5" r="2.6" fill="#f2a03d" />
    </svg>
  );
}
