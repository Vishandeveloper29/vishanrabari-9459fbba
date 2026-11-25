/* Thunder-themed section transition — electric plasma edge */
const SectionBlurBlend = () => (
  <div style={{ position: "relative", height: 2, overflow: "visible", zIndex: 20 }}>
    {/* Soft blur fade */}
    <div style={{
      position: "absolute", left: 0, right: 0, top: -40, height: 80,
      background: "linear-gradient(to bottom, transparent, rgba(2,3,10,0.3), transparent)",
      pointerEvents: "none",
    }} />
    {/* Electric line */}
    <div style={{
      position: "absolute", left: "10%", right: "10%", top: 0, height: 1,
      background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(99,102,241,0.3), rgba(34,211,238,0.4), transparent)",
    }} />
  </div>
);

export default SectionBlurBlend;
