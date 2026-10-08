import { useEffect, useState } from 'react';
let n = 0;
export default function ToastHost() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const on = (e) => {
      const id = ++n;
      setItems((a) => [...a.slice(-2), { id, msg: e.detail }]);
      setTimeout(() => setItems((a) => a.filter((t) => t.id !== id)), 2600);
    };
    window.addEventListener('vr-toast', on);
    return () => window.removeEventListener('vr-toast', on);
  }, []);
  return <div className="toasts" role="status" aria-live="polite">{items.map((t) => <div key={t.id} className="toast">{t.msg}</div>)}</div>;
}
