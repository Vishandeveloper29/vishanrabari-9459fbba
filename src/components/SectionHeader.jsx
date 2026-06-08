/* World-class section header — thunder/lightning themed */
const SectionHeader = ({
  tag = "",
  title = "",
  highlight = "",
  sub = "",
  tagColor = "#22d3ee",
  tagRgb = "34,211,238",
  titleSize = "clamp(2.8rem,5.5vw,5rem)",
  align = "center",
}) => (
  <div style={{ textAlign: align, position: "relative", zIndex: 10 }}>
    {tag && (
      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `rgba(${tagRgb},0.09)`,
          border: `1px solid rgba(${tagRgb},0.28)`,
          borderRadius: 999, padding: "6px 18px", marginBottom: 20,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: tagColor,
          boxShadow: `0 0 24px rgba(${tagRgb},0.12)`,
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: tagColor,
          boxShadow: `0 0 8px ${tagColor}`,
          display: "inline-block",
          animation: "pulse-dot 2s ease-in-out infinite",
        }} />
        {tag}
      </div>
    )}
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: titleSize,
      lineHeight: 0.9,
      letterSpacing: "0.04em",
      color: "#fff",
      margin: 0,
      textTransform: "uppercase",
    }}>
      {title}{" "}
      {highlight && (
        <span style={{
          background: `linear-gradient(115deg, ${tagColor}, rgba(${tagRgb},0.7) 60%, #fff 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: `drop-shadow(0 0 20px rgba(${tagRgb},0.35))`,
        }}>
          {highlight}
        </span>
      )}
    </h2>
    {sub && (
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: "clamp(14px,1.4vw,17px)",
        color: "rgba(232,236,240,0.45)",
        marginTop: 16, lineHeight: 1.8,
        maxWidth: 560,
        margin: align === "center" ? "16px auto 0" : "16px 0 0",
      }}>
        {sub}
      </p>
    )}
    <style>{`
      @keyframes pulse-dot {
        0%,100% { opacity:1; transform:scale(1); }
        50% { opacity:0.5; transform:scale(1.4); }
      }
    `}</style>
  </div>
);

export default SectionHeader;
