import { useEffect, useState } from 'react';

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });
}

export default function LiveStatus() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="live-status" aria-hidden="true">
      <span className="live-dot" />
      GANDHIDHAM, IN — {time} IST
    </div>
  );
}
