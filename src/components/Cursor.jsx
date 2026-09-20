// Purely decorative — driven by useMicroInteractions, which updates these
// nodes' transforms directly for performance (no per-frame React renders).
export default function Cursor() {
  return (
    <div className="custom-cursor" aria-hidden="true">
      <div id="cursor-ring" className="cursor-ring" />
      <div id="cursor-dot" className="cursor-dot" />
    </div>
  );
}
