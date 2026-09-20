// A faint animated noise layer sits over the whole site to take the flatness
// off the big solid colour blocks — a paper/print texture, not a filter.
export default function Grain() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
