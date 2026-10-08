import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const USER = 'Vishandeveloper29', KEY = 'vr-gh';
const read = () => { try { const c = JSON.parse(sessionStorage.getItem(KEY)); return c && Date.now() - c.t < 6e5 ? c.d : null; } catch { return null; } };
const ago = (iso) => {
  const m = Math.max(1, Math.round((Date.now() - new Date(iso)) / 60000));
  if (m < 60) return `${m}m ago`; if (m < 1440) return `${Math.round(m / 60)}h ago`;
  const d = Math.round(m / 1440); return d < 60 ? `${d}d ago` : `${Math.round(d / 30)}mo ago`;
};

// Live numbers straight from the GitHub API. Silently hidden if the request fails.
export default function GithubPulse() {
  const [d, setD] = useState(read);
  useEffect(() => {
    if (d) return undefined;
    let dead = false;
    const j = (u) => fetch(u).then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.status))));
    Promise.all([j(`https://api.github.com/users/${USER}`), j(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=1`)])
      .then(([u, r]) => {
        const data = { repos: u.public_repos, followers: u.followers, last: r[0]?.name, pushed: r[0]?.pushed_at };
        try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: data })); } catch { /* ignore */ }
        if (!dead) setD(data);
      }).catch(() => {});
    return () => { dead = true; };
  }, [d]);
  if (!d) return null;
  return (
    <a className="gh-pulse reveal reveal-2" href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">
      <span className="gh-live"><i /> LIVE FROM GITHUB</span>
      <span><b>{d.repos}</b> public repos</span>
      <span><b>{d.followers}</b> followers</span>
      {d.last && <span>last push <b>{d.last}</b> · {ago(d.pushed)}</span>}
      <ArrowUpRight size={18} />
    </a>
  );
}
