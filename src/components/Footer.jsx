import ThunderBg from "./backgrounds/ThunderBg";
import { useState } from "react";
import { ArrowUpRight, Code2, Mail } from "lucide-react";

export default function Footer() {
  const [spot, setSpot] = useState({ x:"50%", y:"50%" });
  const mv = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x:`${e.clientX-r.left}px`, y:`${e.clientY-r.top}px` });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#02030a] text-white">
      <ThunderBg variant="storm" opacity={0.45}/>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"/>

      {/* Big word — responsive */}
      <div onMouseMove={mv} className="group relative w-full overflow-hidden pt-14 sm:pt-20">
        <h1 className="select-none whitespace-nowrap text-center font-black leading-[0.85] tracking-[-0.08em] text-transparent"
          style={{ fontSize:"clamp(80px,18vw,280px)", WebkitTextStroke:"1.5px rgba(255,255,255,0.1)" }}>
          Developer
        </h1>
        <h1 className="pointer-events-none absolute left-0 top-14 w-full select-none whitespace-nowrap text-center font-black leading-[0.85] tracking-[-0.08em] text-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:top-20"
          style={{
            fontSize:"clamp(80px,18vw,280px)",
            WebkitMaskImage:`radial-gradient(circle 280px at ${spot.x} ${spot.y},black 0%,black 32%,rgba(0,0,0,.5) 52%,transparent 76%)`,
            maskImage:`radial-gradient(circle 280px at ${spot.x} ${spot.y},black 0%,black 32%,rgba(0,0,0,.5) 52%,transparent 76%)`,
          }}>
          Developer
        </h1>
      </div>

      {/* Footer content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-10 sm:gap-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1fr] lg:px-10">
        {/* Brand */}
        <div>
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white text-black shadow-[0_0_24px_rgba(255,255,255,.08)]">
              <Code2 size={22} strokeWidth={2.7}/>
            </span>
            <span className="text-base font-black text-white">Vishan Rabari</span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-[1.8] text-zinc-500">
            Frontend Developer crafting clean, modern, responsive dark glass web experiences.
          </p>
          <div className="mt-6 flex items-center gap-2.5">
            {[
              { label:"GH", href:"https://github.com/Vishandeveloper29", target:"_blank" },
              { label:"in", href:"#contact" },
              { label:"IG", href:"#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} target={l.target} rel={l.target?"noreferrer":undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-black text-white transition-all hover:border-blue-300/60 hover:text-blue-200 hover:shadow-[0_0_14px_rgba(96,165,250,.2)]">
                {l.label}
              </a>
            ))}
            <a href="mailto:rabarivishan2@gmail.com"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:border-blue-300/60 hover:text-blue-200">
              <Mail size={15}/>
            </a>
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-white/80">Pages</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            {["home","about","projects","contact"].map(p => (
              <li key={p}><a href={`#${p}`} className="capitalize transition hover:text-blue-200">{p}</a></li>
            ))}
          </ul>
        </div>

        {/* Work */}
        <div>
          <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-white/80">Work</h3>
          <ul className="space-y-3 text-sm text-zinc-400">
            {["services","skills","journey"].map(p => (
              <li key={p}><a href={`#${p}`} className="capitalize transition hover:text-blue-200">{p}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-white/80">Contact</h3>
          <p className="text-sm leading-[1.8] text-zinc-500">
            Want a portfolio like this? Let's make it clean and modern.
          </p>
          <a href="mailto:rabarivishan2@gmail.com"
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-blue-500/35 bg-blue-500/[0.09] px-5 py-2.5 text-sm font-black text-white transition-all hover:border-blue-300/60 hover:bg-blue-500/[0.18]">
            Let's Connect
            <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 border-t border-white/[0.07] px-5 py-5 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 Vishan Rabari. All rights reserved.</p>
        <a href="#home" className="transition hover:text-blue-200">Back to top ↑</a>
      </div>
    </footer>
  );
}
