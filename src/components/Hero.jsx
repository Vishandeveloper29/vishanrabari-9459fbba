import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Code2, GitBranch, MonitorSmartphone, Sparkles, Zap, Terminal, Globe } from "lucide-react";
import InteractiveNeuralVortex from "./ui/interactive-neural-vortex-background";
import { BtnPrimary, BtnGhost, BtnMagnetic } from "./ui/PortfolioButtons";

const roles = [
  { label: "Frontend Developer", color: "#00ffe7" },
  { label: "React UI Builder",   color: "#7dd3fc" },
  { label: "3D Web Creator",     color: "#38bdf8" },
  { label: "Dark Glass UI",      color: "#60a5fa" },
  { label: "Open to Work",       color: "#4affc7" },
];

const RoleCycler = ({ go }) => {
  const [i, setI] = useState(0);
  const [vis, setVis] = useState(true);
  useEffect(() => {
    if (!go) return;
    const id = setInterval(() => {
      setVis(false);
      setTimeout(() => { setI(x => (x+1)%roles.length); setVis(true); }, 320);
    }, 2600);
    return () => clearInterval(id);
  }, [go]);
  return (
    <span className="hero-mono inline-block text-[10px] font-black uppercase tracking-[0.4em] sm:text-[11px]"
      style={{ color: roles[i].color, opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(-7px)",
        transition: "opacity .3s ease, transform .3s ease, color .3s ease" }}>
      {roles[i].label}
    </span>
  );
};

const CharReveal = ({ text, delay=0, className="", style={} }) => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setShow(true), delay); return()=>clearTimeout(t); }, [delay]);
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split("").map((ch,j) => (
        <span key={j} style={{
          display:"inline-block",
          opacity: show?1:0,
          transform: show?"translateY(0) rotateX(0)":"translateY(50px) rotateX(-80deg)",
          transition: `opacity .5s cubic-bezier(.16,1,.3,1) ${delay+j*32}ms, transform .6s cubic-bezier(.16,1,.3,1) ${delay+j*32}ms`,
          transformOrigin:"top center",
        }}>{ch===" "?"\u00A0":ch}</span>
      ))}
    </span>
  );
};

const stats = [
  { icon:GitBranch,   value:"41+", label:"GitHub Repos",  color:"#00d9ff", rgb:"0,217,255"   },
  { icon:Code2,       value:"7+",  label:"Live Projects",  color:"#7dd3fc", rgb:"125,211,252" },
  { icon:Sparkles,    value:"3D",  label:"Web Effects",    color:"#38bdf8", rgb:"56,189,248"  },
  { icon:MonitorSmartphone, value:"UI", label:"Responsive",color:"#4affc7", rgb:"74,255,199"  },
];

const marqueeItems = ["React","·","Three.js","·","Tailwind CSS","·","Blender","·","WebGL","·","Figma","·","Vite","·","JavaScript","·","Open To Work","·","Frontend","·","3D Web","·","Python","·","C Programming"];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [ms, setMs] = useState({ x:.5, y:.5 });
  const raw = useRef({ x:.5, y:.5 });
  const rafRef = useRef(null);

  useEffect(() => { const t=setTimeout(()=>setMounted(true),100); return()=>clearTimeout(t); },[]);

  useEffect(() => {
    const mv = e => { raw.current = { x:e.clientX/window.innerWidth, y:e.clientY/window.innerHeight }; };
    window.addEventListener("mousemove",mv,{passive:true});
    const tk = () => {
      setMs(p => ({ x:p.x+(raw.current.x-p.x)*.06, y:p.y+(raw.current.y-p.y)*.06 }));
      rafRef.current = requestAnimationFrame(tk);
    };
    rafRef.current = requestAnimationFrame(tk);
    return () => { window.removeEventListener("mousemove",mv); cancelAnimationFrame(rafRef.current); };
  },[]);

  const fu = (d=0) => ({
    opacity: mounted?1:0,
    transform: mounted?"translateY(0)":"translateY(22px)",
    transition: `opacity .75s ease ${d}ms, transform .85s cubic-bezier(.16,1,.3,1) ${d}ms`,
  });

  return (
    <section id="home" className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#020408] text-white"
      style={{ paddingTop:"clamp(80px,12vh,110px)" }}>
      <style>{`
        .hero-mono { font-family:'DM Mono',monospace; }
        .hero-bb   { font-family:'Bebas Neue',sans-serif; }
        .hero-sg   { font-family:'Space Grotesk',sans-serif; }

        .name-grad {
          background: linear-gradient(115deg,#e0faff 0%,#7dd3fc 28%,#0ea5e9 55%,#2563eb 100%);
          background-size:260% 260%;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          animation: grad-shift 7s ease infinite;
        }
        @keyframes grad-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

        .elec-title { text-shadow:0 0 18px rgba(34,211,238,.2),0 0 44px rgba(59,130,246,.14); }
        .elec-title::before {
          content:""; position:absolute; left:5%; right:5%; bottom:2%; height:10px; border-radius:999px;
          background:linear-gradient(90deg,transparent,rgba(34,211,238,.65),rgba(96,165,250,.7),rgba(14,165,233,.6),transparent);
          filter:blur(16px); opacity:.5; z-index:-1;
          animation:epulse 3.8s ease-in-out infinite;
        }
        @keyframes epulse { 0%,100%{opacity:.32;transform:scaleX(.92)} 50%{opacity:.82;transform:scaleX(1.04)} }

        @keyframes stat-border { to{--sb:360deg} }
        @property --sb { inherits:false; initial-value:0deg; syntax:"<angle>"; }
        .stat-card {
          --sb:0deg;
          background: linear-gradient(#05070d,#05070d) padding-box,
            conic-gradient(from var(--sb),transparent,rgba(34,211,238,.45),rgba(59,130,246,.25),transparent 60%) border-box;
          border:1px solid transparent;
          animation:stat-border 4s linear infinite;
        }
        .chip-a { animation:chip-a 6s ease-in-out infinite; }
        .chip-b { animation:chip-b 7.5s ease-in-out infinite; }
        .chip-c { animation:chip-c 5.5s ease-in-out infinite; }
        @keyframes chip-a { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-11px) rotate(2deg)} }
        @keyframes chip-b { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-8px) rotate(-3deg)} }
        @keyframes chip-c { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-14px) rotate(1deg)} }
        .tcursor { animation:blink 1s steps(2,start) infinite; }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes ping-r { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.2);opacity:0} }
        @keyframes scrollrun { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:1} 100%{transform:translateY(280%);opacity:0} }
        @media (prefers-reduced-motion:reduce) {
          .name-grad,.elec-title::before,.stat-card,.chip-a,.chip-b,.chip-c,.tcursor{animation:none!important}
        }
      `}</style>

      {/* WebGL bg */}
      <InteractiveNeuralVortex />

      {/* Mouse-track orb */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute h-[500px] w-[500px] rounded-full sm:h-[700px] sm:w-[700px]"
          style={{ background:"radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 70%)",
            left:`${ms.x*100}%`, top:`${ms.y*100}%`, transform:"translate(-50%,-50%)", transition:"left .8s ease,top .8s ease" }} />
      </div>

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.016]"
        style={{ background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.5) 2px,rgba(0,0,0,.5) 4px)" }} />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#020408] to-transparent" />

      {/* Floating chips — hidden below sm */}
      <div className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden sm:block">
        {[
          { cls:"chip-a left-[6%] top-[22%]", icon:Terminal, label:"React",    c:"cyan"   },
          { cls:"chip-b right-[7%] top-[26%]", icon:Globe,    label:"Tailwind", c:"blue"   },
          { cls:"chip-c right-[11%] bottom-[26%]",icon:Sparkles,label:"Vite",  c:"purple" },
          { cls:"chip-a left-[9%] bottom-[28%]", icon:Code2,  label:"JS",       c:"emerald",d:"1.5s"},
        ].map(({cls,icon:Icon,label,c,d}) => (
          <div key={label} className={`absolute ${cls}`} style={d?{animationDelay:d}:{}}>
            <div className={`flex items-center gap-1.5 rounded-full border border-${c}-400/15 bg-${c}-400/[0.06] px-3 py-1.5 backdrop-blur-xl`}>
              <Icon size={10} className={`text-${c}-400`}/>
              <span className={`hero-mono text-[9px] font-bold uppercase tracking-[0.22em] text-${c}-200/50`}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-8">
        {/* Available badge */}
        <div style={fu(0)} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.055] px-4 py-2 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#4affc7]" style={{animation:"ping-r 1.8s ease-in-out infinite"}}/>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4affc7]"/>
          </span>
          <span className="hero-mono text-[10px] font-black uppercase tracking-[0.32em] text-cyan-100/80">Available for Work</span>
        </div>

        {/* Role cycler */}
        <div style={fu(120)} className="mb-5"><RoleCycler go={mounted}/></div>

        {/* Big title */}
        <div className="mx-auto w-full max-w-[95vw]" style={{perspective:"1200px"}}>
          <h1 className="hero-bb block text-center uppercase leading-[0.86] tracking-[0.03em] text-white"
            style={{ fontSize:"clamp(44px,10.5vw,148px)", WebkitTextStroke:"1px rgba(255,255,255,0.04)" }}>
            <CharReveal text="Turning Ideas" delay={240}/>
          </h1>
          <h1 className="hero-bb elec-title name-grad relative mx-auto block w-fit text-center uppercase leading-[0.86] tracking-[0.03em]"
            style={{ fontSize:"clamp(44px,10.5vw,148px)" }}>
            <CharReveal text="Into Websites" delay={360}/>
          </h1>
        </div>

        {/* Subtext */}
        <p className="hero-sg mx-auto mt-6 max-w-xl px-2 text-center text-[15px] leading-[1.85] sm:text-[17px]"
          style={{ color:"rgba(232,236,240,.46)", ...fu(560) }}>
          I build <span className="font-bold text-white/85">sharp React interfaces</span>, dark glass UI sections,
          and <span className="font-bold text-cyan-300">animated frontend experiences</span>.
        </p>

        {/* Buttons */}
        <div style={fu(700)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <BtnPrimary href="#projects" glowColor="rgba(34,211,238,0.5)" particleColor="#22d3ee">
            View Projects <ArrowUpRight size={15}/>
          </BtnPrimary>
          <BtnGhost href="https://github.com/Vishandeveloper29" target="_blank" rel="noreferrer" glowColor="34,211,238">
            GitHub · 41 Repos ↗
          </BtnGhost>
          <BtnMagnetic href="#contact" fillColor="#22d3ee" textNormal="text-blue-100/80" textFilled="text-black" borderColor="rgba(96,165,250,0.3)">
            <Zap size={13}/> Hire Me
          </BtnMagnetic>
        </div>

        {/* Stats grid */}
        <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s,i) => {
            const Icon=s.icon;
            return (
              <div key={s.label} className="stat-card group relative overflow-hidden rounded-2xl bg-white/[0.03] px-4 py-4 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.055] sm:px-5"
                style={{ boxShadow:`0 16px 50px rgba(0,0,0,.32),0 0 28px rgba(${s.rgb},.07)`,
                  opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(22px)",
                  transition:`opacity .65s ease ${800+i*85}ms, transform .75s cubic-bezier(.16,1,.3,1) ${800+i*85}ms` }}>
                <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-35"
                  style={{background:s.color}}/>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor:`rgba(${s.rgb},.22)`, background:`rgba(${s.rgb},.08)`, color:s.color }}>
                    <Icon size={17}/>
                  </div>
                  <div>
                    <p className="hero-bb text-[28px] leading-none text-white">{s.value}</p>
                    <p className="hero-mono mt-0.5 text-[9px] font-black uppercase tracking-[0.22em]" style={{color:"rgba(232,236,240,.32)"}}>{s.label}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{background:`linear-gradient(90deg,${s.color},transparent)`}}/>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal strip */}
      <div style={fu(980)} className="relative z-10 mx-auto mt-10 w-[calc(100%-24px)] max-w-5xl overflow-hidden rounded-[20px] border border-cyan-300/10 bg-[#02060d]/70 shadow-[0_20px_80px_rgba(0,0,0,.4),0_0_45px_rgba(34,211,238,.07)] backdrop-blur-2xl sm:w-[calc(100%-40px)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent"/>
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/75 shadow-[0_0_8px_rgba(239,68,68,.4)]"/>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/75"/>
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/75"/>
            <span className="hero-mono ml-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/22">vishan@portfolio</span>
          </div>
          <span className="hero-mono hidden text-[9px] font-bold text-cyan-300/40 sm:block">● online</span>
        </div>
        <div className="px-4 py-3 sm:px-5">
          <div className="mb-2.5 flex items-center gap-2">
            <span className="hero-mono text-[11px] text-cyan-300">$</span>
            <span className="hero-mono text-[11px] text-white/65">npm run build-portfolio</span>
            <span className="tcursor h-3.5 w-[6px] bg-cyan-300/75"/>
          </div>
          <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
            {[
              {k:"stack",v:"React · Tailwind · Vite"},
              {k:"focus",v:"3D Web · Dark Glass UI"},
              {k:"projects",v:"7+ Live · 41+ Repos"},
              {k:"status",v:"Open to Work ✓"},
            ].map(({k,v}) => (
              <div key={k} className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5">
                <p className="hero-mono text-[9px] font-black uppercase tracking-[0.26em] text-cyan-300/50">{k}</p>
                <p className="hero-sg mt-1 text-[11px] font-semibold text-white/55">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-10 mt-4 border-y py-3.5" style={{borderColor:"rgba(255,255,255,.05)",...fu(1100)}}>
        <div className="overflow-hidden" style={{maskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)",WebkitMaskImage:"linear-gradient(90deg,transparent,black 8%,black 92%,transparent)"}}>
          <div className="flex gap-9 whitespace-nowrap" style={{animation:"marquee 26s linear infinite",willChange:"transform"}}>
            {[...marqueeItems,...marqueeItems].map((it,i) => (
              <span key={i} className="hero-mono shrink-0 text-[9.5px] font-black uppercase tracking-[0.32em]"
                style={{color:it==="Open To Work"?"#4affc7":it==="·"?"rgba(255,255,255,.08)":"rgba(232,236,240,.2)"}}>
                {it}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#about" style={fu(1200)} className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 sm:flex" aria-label="Scroll">
        <span className="hero-mono text-[9px] font-black uppercase tracking-[0.42em]" style={{color:"rgba(232,236,240,.2)"}}>Scroll</span>
        <div className="relative h-10 w-px overflow-hidden rounded-full" style={{background:"rgba(255,255,255,.07)"}}>
          <div className="absolute left-0 top-0 w-full rounded-full" style={{height:"50%",background:"linear-gradient(to bottom,transparent,#7dd3fc)",animation:"scrollrun 1.9s ease-in-out infinite"}}/>
        </div>
      </a>
    </section>
  );
}
