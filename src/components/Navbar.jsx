import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = ["Home", "About", "Services", "Projects", "Skills", "Journey", "Contact"];

const Navbar = () => {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("home");
  const hireBtnRef                = useRef(null);

  /* ── scroll-reactive glass intensity ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section tracker ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navLinks.forEach(l => {
      const el = document.getElementById(l.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ── magnetic hire button ── */
  const handleMagnetMove = (e) => {
    const btn = hireBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.28}px)`;
  };
  const handleMagnetLeave = () => {
    if (hireBtnRef.current)
      hireBtnRef.current.style.transform = "translate(0,0)";
  };

  return (
    <>
      <style>{`
        .nav-font  { font-family: 'Space Grotesk', sans-serif; }
        .mono-font { font-family: 'DM Mono', monospace; }

        /* ─ glass pill ─ */
        .glass-pill {
          background:
            linear-gradient(135deg,
              rgba(255,255,255,0.07) 0%,
              rgba(255,255,255,0.03) 40%,
              rgba(129,140,248,0.06) 100%);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            0 8px 40px rgba(0,0,0,0.35),
            0 1px 0 rgba(255,255,255,0.10) inset,
            0 -1px 0 rgba(0,0,0,0.25) inset;
          transition: background .4s ease, box-shadow .4s ease, border-color .4s ease;
        }
        .glass-pill.scrolled {
          background:
            linear-gradient(135deg,
              rgba(255,255,255,0.055) 0%,
              rgba(8,10,24,0.72) 50%,
              rgba(129,140,248,0.05) 100%);
          border-color: rgba(255,255,255,0.07);
          box-shadow:
            0 12px 52px rgba(0,0,0,0.55),
            0 1px 0 rgba(255,255,255,0.08) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset;
        }

        /* ─ shimmer sweep ─ */
        .shimmer-sweep::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(105deg,
            transparent 0%,
            rgba(255,255,255,.055) 45%,
            rgba(255,255,255,.09) 50%,
            rgba(255,255,255,.055) 55%,
            transparent 100%);
          background-size: 200% 100%;
          background-position: -100% 0;
          animation: shimmer-run 6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shimmer-run {
          0%,40%  { background-position: -100% 0; }
          60%,100%{ background-position: 220% 0; }
        }

        /* ─ noise overlay (very subtle) ─ */
        .glass-noise::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: .018;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 120px 120px;
          pointer-events: none;
        }

        /* ─ nav link hover ─ */
        .nav-link {
          position: relative;
          color: rgba(226,232,240,.48);
          transition: color .25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%; right: 50%;
          height: 1.5px;
          border-radius: 999px;
          background: linear-gradient(90deg, #818cf8, #38bdf8);
          transition: left .3s ease, right .3s ease;
        }
        .nav-link:hover { color: rgba(226,232,240,.9); }
        .nav-link:hover::after,
        .nav-link.active::after { left: 14px; right: 14px; }
        .nav-link.active { color: rgba(226,232,240,.88); }

        /* ─ hire btn ─ */
        .hire-glass {
          background: linear-gradient(135deg,
            rgba(129,140,248,.18) 0%,
            rgba(56,189,248,.10) 60%,
            rgba(129,140,248,.14) 100%);
          border: 1px solid rgba(129,140,248,.35);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.07) inset,
            0 8px 28px rgba(129,140,248,.22),
            0 2px 6px rgba(0,0,0,.3);
          transition: background .3s ease, border-color .3s ease,
                      box-shadow .3s ease, transform .25s cubic-bezier(.16,1,.3,1);
        }
        .hire-glass:hover {
          background: linear-gradient(135deg,
            rgba(129,140,248,.28) 0%,
            rgba(56,189,248,.18) 60%,
            rgba(129,140,248,.24) 100%);
          border-color: rgba(129,140,248,.55);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.10) inset,
            0 10px 38px rgba(129,140,248,.38),
            0 0 50px rgba(129,140,248,.18),
            0 2px 6px rgba(0,0,0,.35);
        }

        /* ─ logo ring ─ */
        .logo-ring {
          background: linear-gradient(135deg,
            rgba(129,140,248,.22), rgba(56,189,248,.14));
          border: 1px solid rgba(129,140,248,.32);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.08) inset,
            0 0 20px rgba(129,140,248,.25),
            0 4px 12px rgba(0,0,0,.3);
          transition: box-shadow .3s ease, transform .3s ease;
        }
        .logo-ring:hover { box-shadow:
          0 0 0 1px rgba(255,255,255,.12) inset,
          0 0 28px rgba(129,140,248,.4),
          0 6px 18px rgba(0,0,0,.35);
          transform: scale(1.06);
        }

        /* ─ mobile dropdown ─ */
        .mobile-drop {
          background: linear-gradient(145deg,
            rgba(10,12,28,.88) 0%,
            rgba(8,10,24,.92) 100%);
          backdrop-filter: blur(28px) saturate(150%);
          -webkit-backdrop-filter: blur(28px) saturate(150%);
          border: 1px solid rgba(255,255,255,.08);
          box-shadow:
            0 20px 60px rgba(0,0,0,.55),
            0 1px 0 rgba(255,255,255,.09) inset;
          animation: drop-in .28s cubic-bezier(.16,1,.3,1);
        }
        @keyframes drop-in {
          from { opacity:0; transform:translateY(-10px) scale(.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        .mobile-link {
          color: rgba(203,213,225,.52);
          border-radius: 14px;
          border: 1px solid transparent;
          transition: color .22s ease, background .22s ease, border-color .22s ease;
        }
        .mobile-link:hover {
          color: rgba(226,232,240,.9);
          background: rgba(255,255,255,.055);
          border-color: rgba(255,255,255,.07);
        }

        /* ─ hamburger btn ─ */
        .menu-btn {
          background: linear-gradient(135deg,
            rgba(255,255,255,.07), rgba(129,140,248,.09));
          border: 1px solid rgba(255,255,255,.10);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0,0,0,.3), 0 0 0 1px rgba(255,255,255,.05) inset;
          transition: background .25s ease, border-color .25s ease, box-shadow .25s ease;
        }
        .menu-btn:hover {
          background: linear-gradient(135deg,
            rgba(129,140,248,.18), rgba(56,189,248,.10));
          border-color: rgba(129,140,248,.3);
          box-shadow: 0 6px 22px rgba(0,0,0,.35), 0 0 20px rgba(129,140,248,.2);
        }

        @media (prefers-reduced-motion:reduce) {
          .shimmer-sweep::before { animation:none; }
        }
      `}</style>

      <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 sm:py-5">
        <nav
          className={`glass-pill shimmer-sweep glass-noise relative mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2.5 sm:px-4 sm:py-3 ${scrolled ? "scrolled" : ""}`}
        >
          {/* Top edge highlight */}
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent rounded-full" />

          {/* Subtle inner top glow */}
          <div className="pointer-events-none absolute -top-16 left-1/2 h-20 w-64 -translate-x-1/2 rounded-full bg-indigo-500/[0.12] blur-3xl" />

          {/* ── LOGO ── */}
          <a href="#home" className="relative z-10 flex items-center gap-2.5 sm:gap-3">
            <div className="logo-ring flex h-10 w-10 items-center justify-center rounded-full sm:h-11 sm:w-11">
              <span className="nav-font text-[13px] font-black tracking-tight text-white/90">VR</span>
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="nav-font text-[13.5px] font-black tracking-wide text-white/92">Vishan</p>
              <p className="mono-font text-[10px] font-semibold tracking-[0.18em] text-indigo-300/50 uppercase">
                Frontend Dev
              </p>
            </div>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <div className="relative z-10 hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`nav-link nav-font rounded-full px-4 py-2 text-[13px] font-semibold ${
                  active === link.toLowerCase() ? "active" : ""
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* ── HIRE ME ── */}
          <a
            ref={hireBtnRef}
            href="#contact"
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            className="hire-glass relative z-10 hidden items-center gap-2.5 overflow-hidden rounded-full px-6 py-2.5 text-[13px] font-semibold text-white/88 lg:inline-flex"
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition-transform duration-700 group-hover:translate-x-full pointer-events-none" />
            {/* Dot */}
            <span className="relative h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_10px_rgba(129,140,248,.9),0_0_20px_rgba(129,140,248,.5)]" />
            <span className="relative nav-font tracking-wide">Hire Me</span>
            <ArrowUpRight
              size={14}
              className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* ── MOBILE TOGGLE ── */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="menu-btn relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/70 lg:hidden"
          >
            <span style={{ transition: "transform .25s ease, opacity .2s ease" }}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </span>
          </button>
        </nav>

        {/* ── MOBILE DROPDOWN ── */}
        {open && (
          <div className="mobile-drop relative mx-auto mt-2.5 max-w-7xl overflow-hidden rounded-[24px] p-3">
            {/* Top glow */}
            <div className="pointer-events-none absolute -top-12 left-1/2 h-24 w-72 -translate-x-1/2 rounded-full bg-indigo-500/[0.12] blur-3xl" />

            <div className="relative z-10 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={`mobile-link nav-font px-4 py-3 text-[13.5px] font-semibold ${
                    active === link.toLowerCase()
                      ? "!text-white/88 !bg-white/[0.06] !border-white/[0.08]"
                      : ""
                  }`}
                >
                  {link}
                </a>
              ))}

              {/* Mobile Hire Me */}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="hire-glass relative mt-2 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-[14px] px-6 py-3.5 text-[13.5px] font-semibold text-white/88"
              >
                <span className="relative h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_10px_rgba(129,140,248,.9)]" />
                <span className="nav-font tracking-wide">Hire Me</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
