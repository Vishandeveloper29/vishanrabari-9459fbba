import { useRef } from "react";

const getChildIconClass = "[&_svg]:transition-transform [&_svg]:duration-300";

const alphaRgba = (value = "34,211,238", alpha = 1) => {
  const v = String(value).trim();
  if (v.startsWith("rgba")) return v;
  if (v.startsWith("rgb")) return v;
  if (v.startsWith("#")) return v;
  return `rgba(${v},${alpha})`;
};

export const BtnPrimary = ({
  href = "#",
  children,
  className = "",
  c1 = "#67e8f9",
  c2 = "#3b82f6",
  glowColor = "34,211,238",
  particleColor,
  fillColor,
  textNormal,
  textFilled,
  borderColor,
  ...props
}) => {
  const glow = String(glowColor).includes("rgba")
    ? glowColor
    : `rgba(${glowColor},0.28)`;

  const hoverGlow = String(glowColor).includes("rgba")
    ? glowColor
    : `rgba(${glowColor},0.35)`;

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-[13px] font-black uppercase tracking-[0.08em] text-black transition-all duration-300 hover:scale-[1.045] ${getChildIconClass} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        boxShadow: `0 0 34px ${glow}`,
      }}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${hoverGlow}, transparent 55%)`,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </a>
  );
};

export const BtnGhost = ({
  href = "#",
  children,
  className = "",
  color = "#67e8f9",
  glowColor = "34,211,238",
  particleColor,
  fillColor,
  textNormal,
  textFilled,
  borderColor,
  ...props
}) => {
  const baseBorder = alphaRgba(glowColor, 0.18);
  const hoverBorder = alphaRgba(glowColor, 0.42);
  const baseBg = alphaRgba(glowColor, 0.045);
  const hoverBg = alphaRgba(glowColor, 0.08);
  const hoverShadow = alphaRgba(glowColor, 0.18);

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border px-8 py-4 text-[13px] font-bold uppercase tracking-[0.06em] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${getChildIconClass} ${className}`}
      style={{
        borderColor: baseBorder,
        background: baseBg,
        color: "rgba(240,249,255,0.72)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorder;
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.color = color;
        e.currentTarget.style.boxShadow = `0 0 36px ${hoverShadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = baseBorder;
        e.currentTarget.style.background = baseBg;
        e.currentTarget.style.color = "rgba(240,249,255,0.72)";
        e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.22)";
      }}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/14 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </a>
  );
};

export const BtnMagnetic = ({
  href = "#",
  children,
  className = "",
  color = "#60a5fa",
  glowColor = "96,165,250",
  particleColor,
  fillColor,
  textNormal,
  textFilled,
  borderColor,
  ...props
}) => {
  const btnRef = useRef(null);
  const border = borderColor || alphaRgba(glowColor, 0.2);
  const bg = alphaRgba(glowColor, 0.055);
  const dotColor = fillColor || color;

  const handleMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.16}px, ${y * 0.22}px) scale(1.035)`;
  };

  const handleLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px) scale(1)";
  };

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border px-7 py-4 text-[13px] font-bold uppercase tracking-[0.06em] backdrop-blur-xl transition-[transform,background,border,box-shadow,color] duration-300 ease-out ${getChildIconClass} ${className}`}
      style={{
        borderColor: border,
        background: bg,
        color,
        boxShadow: "0 12px 35px rgba(0,0,0,0.24)",
      }}
      {...props}
    >
      <span
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: `linear-gradient(180deg, ${alphaRgba(
            glowColor,
            0.18
          )}, transparent, rgba(0,0,0,0.16))`,
        }}
      />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span
        className="relative z-10 h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
        style={{
          background: dotColor,
          boxShadow: `0 0 15px ${alphaRgba(glowColor, 0.9)}`,
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </a>
  );
};

export const BtnOutline = ({
  href = "#",
  children,
  className = "",
  c1 = "rgba(96,165,250,0.9)",
  c2 = "rgba(34,211,238,0.7)",
  glowColor = "34,211,238",
  particleColor,
  fillColor,
  textNormal,
  textFilled,
  borderColor,
  ...props
}) => {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border px-6 py-3.5 text-sm font-black text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${getChildIconClass} ${className}`}
      style={{
        borderColor: borderColor || alphaRgba(glowColor, 0.25),
        background: "rgba(255,255,255,0.035)",
        boxShadow: `0 0 28px ${alphaRgba(glowColor, 0.1)}`,
      }}
      {...props}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      />
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2.5 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
    </a>
  );
};

export const BtnIconCircle = ({
  href = "#",
  icon: Icon,
  label = "Open",
  size = 18,
  className = "",
  color = "#22d3ee",
  colorRgb = "34,211,238",
  particleColor,
  fillColor,
  textNormal,
  textFilled,
  borderColor,
  ...props
}) => {
  return (
    <a
      href={href}
      aria-label={label}
      className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        borderColor: borderColor || alphaRgba(colorRgb, 0.18),
        background: alphaRgba(colorRgb, 0.045),
        color,
      }}
      {...props}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${alphaRgba(
            colorRgb,
            0.22
          )}, transparent 70%)`,
        }}
      />
      <span className="relative z-10">
        {Icon ? <Icon size={size} /> : label}
      </span>
    </a>
  );
};