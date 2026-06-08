import ThunderBg from "./backgrounds/ThunderBg";
import { useRef } from "react";
import { ArrowUpRight, Mail, Sparkles, Zap } from "lucide-react";
import DynamicTextSlider from "./ui/DynamicTextSlider";

const CTABanner = () => {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    section.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    section.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-black px-5 py-24 text-white sm:px-8"
    >
      {/* Thunder Background */}
      <ThunderBg variant="storm" opacity={0.7} />
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-15%,rgba(59,130,246,.28),transparent_36%),radial-gradient(circle_at_10%_85%,rgba(34,211,238,.12),transparent_32%),radial-gradient(circle_at_90%_70%,rgba(124,58,237,.16),transparent_34%),linear-gradient(180deg,#020617_0%,#000_55%,#020617_100%)]" />

      {/* Mouse Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background:radial-gradient(520px_circle_at_var(--mx,50%)_var(--my,50%),rgba(34,211,238,.14),rgba(59,130,246,.08)_35%,transparent_70%)]" />

      {/* Soft Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] bg-[linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] bg-[size:52px_52px]" />

      {/* Top Thunder Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-36 w-[70%] -translate-x-1/2 bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="cta-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-[0_30px_110px_rgba(0,0,0,.88)] backdrop-blur-3xl sm:p-8 lg:p-10">
          {/* Glass border */}
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] cta-border" />

          {/* Inner glow */}
          <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-blue-500/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-3xl" />

          {/* Glass shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,.06)_22%,transparent_42%)]" />

          <div className="relative z-10 grid items-center gap-10 md:grid-cols-2 lg:grid-cols-[0.9fr_1fr]">
            {/* Left */}
            <div className="text-center md:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/75">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,.95)]" />
                </span>
                <Zap size={13} />
                Thunder Mode Active
              </div>

              <h2 className="text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[0.9] tracking-[-0.07em]">
                <span className="block text-white">Have an</span>
                <span className="cta-title-gradient block">electric</span>
                <span className="block text-white/85">idea?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-[15px] lg:mx-0">
                Let’s turn it into a fast, modern, responsive website with
                premium UI, smooth animations, thunder-style glow, and clean
                frontend code.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <a
                  href="mailto:rabarivishan2@gmail.com"
                  className="cta-primary group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-black text-white"
                >
                  <Mail size={17} />
                  Email Me
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href="#projects"
                  className="cta-secondary group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-black text-white/70"
                >
                  View Projects
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
                {["React", "Tailwind", "Glass UI", "Animation"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white/45 backdrop-blur-xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="cta-stage relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/35 p-6 shadow-[inset_0_0_70px_rgba(59,130,246,.12)] backdrop-blur-2xl sm:min-h-[340px]">
                {/* Stage BG */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] bg-[size:34px_34px]" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl cta-float" />
                <div className="pointer-events-none absolute right-6 top-6 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-6 left-6 h-32 w-32 rounded-full bg-violet-500/14 blur-3xl" />

                {/* Corners */}
                <span className="absolute left-5 top-5 h-8 w-8 border-l border-t border-cyan-300/60" />
                <span className="absolute right-5 top-5 h-8 w-8 border-r border-t border-blue-300/60" />
                <span className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-violet-300/60" />
                <span className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-cyan-300/60" />

                <div className="relative z-10 flex w-full flex-col items-center justify-center gap-7 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/45 backdrop-blur-xl">
                    <Sparkles size={12} />
                    Frontend Experience
                  </div>

                  <div className="scale-[0.78] sm:scale-90 lg:scale-100">
                    <DynamicTextSlider text="Let's Work" />
                  </div>

                  <div className="grid w-full max-w-sm grid-cols-3 gap-2">
                    {[
                      ["01", "Design"],
                      ["02", "Code"],
                      ["03", "Launch"],
                    ].map(([num, label]) => (
                      <div
                        key={num}
                        className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-4 backdrop-blur-xl"
                      >
                        <p className="text-xs font-black text-cyan-200">{num}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-white/40">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 cta-sweep" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cta-card {
          transform: translateZ(0);
        }

        .cta-border {
          padding: 1px;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(34, 211, 238, .7),
            rgba(59, 130, 246, .65),
            rgba(124, 58, 237, .55),
            transparent
          );
          background-size: 250% 250%;
          animation: ctaBorderMove 8s linear infinite;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .cta-title-gradient {
          width: fit-content;
          margin-inline: auto;
          background: linear-gradient(
            90deg,
            #67e8f9,
            #60a5fa,
            #8b5cf6,
            #67e8f9
          );
          background-size: 240% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ctaTextFlow 5s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(34, 211, 238, .35));
        }

        @media (min-width: 1024px) {
          .cta-title-gradient {
            margin-inline: 0;
          }
        }

        .cta-primary {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #2563eb, #06b6d4, #7c3aed);
          background-size: 220% auto;
          box-shadow:
            0 0 28px rgba(59, 130, 246, .35),
            0 0 65px rgba(34, 211, 238, .14),
            inset 0 1px 0 rgba(255, 255, 255, .25);
          transition: transform .25s ease, box-shadow .25s ease, background-position .35s ease;
        }

        .cta-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, .35) 50%,
            transparent 80%
          );
          transform: translateX(-130%);
          transition: transform .55s ease;
        }

        .cta-primary:hover {
          transform: translateY(-3px) scale(1.03);
          background-position: right center;
          box-shadow:
            0 0 44px rgba(59, 130, 246, .52),
            0 0 90px rgba(34, 211, 238, .22),
            0 18px 45px rgba(0, 0, 0, .45),
            inset 0 1px 0 rgba(255, 255, 255, .3);
        }

        .cta-primary:hover::before {
          transform: translateX(130%);
        }

        .cta-secondary {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .12);
          background: linear-gradient(135deg, rgba(255,255,255,.075), rgba(255,255,255,.035));
          backdrop-filter: blur(18px);
          transition: transform .25s ease, border-color .25s ease, color .25s ease, box-shadow .25s ease;
        }

        .cta-secondary:hover {
          color: #fff;
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(103, 232, 249, .4);
          box-shadow: 0 0 30px rgba(34, 211, 238, .18);
        }

        .cta-sweep {
          background: linear-gradient(
            100deg,
            transparent 0%,
            rgba(255,255,255,.08) 45%,
            transparent 70%
          );
          transform: translateX(-120%);
          animation: ctaSweep 5.5s ease-in-out infinite;
        }

        .cta-float {
          animation: ctaFloat 5s ease-in-out infinite;
        }

        @keyframes ctaBorderMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 250% 50%; }
        }

        @keyframes ctaTextFlow {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        @keyframes ctaSweep {
          0%, 18% { transform: translateX(-120%); opacity: 0; }
          38% { opacity: 1; }
          70%, 100% { transform: translateX(120%); opacity: 0; }
        }

        @keyframes ctaFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: .72;
          }
          50% {
            transform: translate(-50%, -54%) scale(1.12);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cta-border,
          .cta-title-gradient,
          .cta-sweep,
          .cta-float {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CTABanner;