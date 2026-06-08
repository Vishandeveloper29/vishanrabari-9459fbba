import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = ["Home", "About", "Services", "Projects", "Skills", "Journey", "Contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const hireBtnRef = useRef(null);

  const handleMagnetMove = (e) => {
    const btn = hireBtnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
  };

  const handleMagnetLeave = () => {
    const btn = hireBtnRef.current;
    if (!btn) return;

    btn.style.transform = "translate(0px, 0px)";
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-5">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-full border border-blue-400/20 bg-[#020617]/70 px-4 py-3 shadow-[0_8px_45px_rgba(37,99,235,0.22)] backdrop-blur-2xl sm:px-5">

        {/* Dark blue glass layer */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-blue-500/18 via-blue-950/[0.10] to-black/35" />

        {/* Top blue highlight */}
        <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

        {/* Inner border */}
        <div className="pointer-events-none absolute inset-[1px] rounded-full border border-blue-200/[0.08]" />

        {/* Soft dark blue blur */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full bg-blue-500/[0.16] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-32 w-80 rounded-full bg-indigo-600/[0.13] blur-3xl" />

        {/* Logo */}
        <a href="#home" className="relative z-10 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/[0.10] text-sm font-black text-blue-100 shadow-[inset_0_1px_8px_rgba(96,165,250,0.16),0_0_24px_rgba(37,99,235,0.18)] backdrop-blur-xl">
            VR
          </span>

          <div className="hidden leading-tight sm:block">
            <h1 className="text-sm font-black tracking-wide text-white">
              Vishan
            </h1>
            <p className="text-[11px] font-semibold text-blue-200/50">
              Frontend Developer
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="relative z-10 hidden items-center gap-1 rounded-full border border-blue-400/15 bg-blue-500/[0.045] px-2 py-2 backdrop-blur-xl lg:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="group relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-blue-50/55 transition-all duration-300 hover:bg-blue-500/[0.12] hover:text-blue-100"
            >
              <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 bg-blue-300/75 transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative z-10">{link}</span>
            </a>
          ))}
        </div>

        {/* Magnetic Hire Me Button */}
        <a
          ref={hireBtnRef}
          href="#contact"
          onMouseMove={handleMagnetMove}
          onMouseLeave={handleMagnetLeave}
          className="group relative z-10 hidden items-center justify-center gap-3 overflow-hidden rounded-full border border-blue-400/30 bg-blue-500/[0.11] px-7 py-3 text-sm font-semibold text-blue-50 shadow-[inset_0_1px_0_rgba(147,197,253,0.20),0_8px_30px_rgba(37,99,235,0.24)] backdrop-blur-xl transition-[transform,background,border,box-shadow] duration-300 ease-out hover:border-blue-300/50 hover:bg-blue-500/[0.16] hover:shadow-[inset_0_1px_0_rgba(147,197,253,0.26),0_14px_44px_rgba(37,99,235,0.34)] lg:inline-flex"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-300/[0.20] via-transparent to-blue-950/30" />
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-100/[0.26] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_16px_rgba(96,165,250,0.95)] transition-transform duration-300 group-hover:scale-125" />
          <span className="relative z-10 tracking-wide">Hire Me</span>
          <ArrowUpRight
            size={16}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/[0.10] text-blue-50 shadow-[0_8px_25px_rgba(37,99,235,0.22)] backdrop-blur-xl transition hover:bg-blue-500/[0.15] lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="relative mx-auto mt-3 max-w-7xl overflow-hidden rounded-[28px] border border-blue-400/20 bg-[#020617]/85 p-4 shadow-[0_8px_40px_rgba(37,99,235,0.26)] backdrop-blur-2xl lg:hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/[0.14] via-blue-950/[0.08] to-black/35" />
          <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-80 -translate-x-1/2 rounded-full bg-blue-500/[0.14] blur-3xl" />

          <div className="relative z-10 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-semibold text-blue-50/60 transition hover:bg-blue-500/[0.12] hover:text-blue-100"
              >
                {link}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="relative mt-3 inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-blue-400/30 bg-blue-500/[0.12] px-8 py-3.5 text-sm font-semibold text-blue-50 shadow-[0_10px_30px_rgba(37,99,235,0.24)] backdrop-blur-xl"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-300/[0.20] via-transparent to-blue-950/30" />
              <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_16px_rgba(96,165,250,0.95)]" />
              <span className="relative z-10">Hire Me</span>
              <ArrowUpRight size={16} className="relative z-10" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;