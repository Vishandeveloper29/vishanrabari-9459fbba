import ThunderBg from "./backgrounds/ThunderBg";
import {
  Code2,
  GitBranch,
  Globe,
  MonitorSmartphone,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";


const frontendSkills = [
  {
    name: "React / Vite",
    type: "UI Library",
    icon: Code2,
    color: "#0ea5e9",
    rgb: "14,165,233",
  },
  {
    name: "Tailwind CSS",
    type: "Styling",
    icon: MonitorSmartphone,
    color: "#60a5fa",
    rgb: "96,165,250",
  },
  {
    name: "JavaScript",
    type: "Language",
    icon: Zap,
    color: "#facc15",
    rgb: "250,204,21",
  },
  {
    name: "Responsive UI",
    type: "Frontend",
    icon: Globe,
    color: "#38bdf8",
    rgb: "56,189,248",
  },
];

const threeDWebSkills = [
  {
    name: "Three.js",
    type: "3D Library",
    icon: Sparkles,
    color: "#a78bfa",
    rgb: "167,139,250",
  },
  {
    name: "3D Websites",
    type: "Creative Web",
    icon: Globe,
    color: "#38bdf8",
    rgb: "56,189,248",
  },
  {
    name: "Blender",
    type: "3D Design",
    icon: Sparkles,
    color: "#fb923c",
    rgb: "251,146,60",
  },
  {
    name: "WebGL",
    type: "Browser 3D",
    icon: Zap,
    color: "#22d3ee",
    rgb: "34,211,238",
  },
];

const programmingSkills = [
  {
    name: "JavaScript",
    type: "Language",
    icon: Zap,
    color: "#facc15",
    rgb: "250,204,21",
  },
  {
    name: "Python",
    type: "Language",
    icon: Terminal,
    color: "#60a5fa",
    rgb: "96,165,250",
  },
  {
    name: "C Language",
    type: "Programming",
    icon: Code2,
    color: "#22c55e",
    rgb: "34,197,94",
  },
  {
    name: "REST APIs",
    type: "Integration",
    icon: Globe,
    color: "#c084fc",
    rgb: "192,132,252",
  },
];

const tools = [
  { name: "VS Code", icon: Code2, color: "#22d3ee" },
  { name: "CLI", icon: Terminal, color: "#22c55e" },
  { name: "Git", icon: GitBranch, color: "#f472b6" },
  { name: "Vite", icon: Zap, color: "#f59e0b" },
  { name: "GitHub", icon: GitBranch, color: "#a78bfa" },
  { name: "Deploy", icon: Globe, color: "#38bdf8" },
];

const SkillOrb = ({ skill, delay = 0 }) => {
  const Icon = skill.icon;

  return (
    <div
      className="skill-fade group relative flex flex-col items-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full sm:h-[128px] sm:w-[128px] md:h-[150px] md:w-[150px] lg:h-[166px] lg:w-[166px]"
        style={{
          border: `1px solid rgba(${skill.rgb},0.34)`,
          background: `radial-gradient(circle at center, rgba(${skill.rgb},0.18), rgba(${skill.rgb},0.055) 42%, rgba(2,6,14,0.82) 72%)`,
          boxShadow: `0 0 45px rgba(${skill.rgb},0.08), inset 0 0 28px rgba(${skill.rgb},0.08)`,
        }}
      >
        <div
          className="absolute inset-[-12px] rounded-full opacity-45 transition-all duration-500 group-hover:inset-[-18px] group-hover:opacity-80"
          style={{ border: `1px solid rgba(${skill.rgb},0.18)` }}
        />

        <div
          className="absolute inset-[18px] rounded-full opacity-35"
          style={{ border: `1px solid rgba(${skill.rgb},0.16)` }}
        />

        <div
          className="pointer-events-none absolute h-16 w-16 rounded-full blur-2xl transition-all duration-500 group-hover:h-24 group-hover:w-24"
          style={{ background: `rgba(${skill.rgb},0.26)` }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <Icon
            size={24}
            strokeWidth={2.5}
            style={{
              color: skill.color,
              filter: `drop-shadow(0 0 10px rgba(${skill.rgb},0.75))`,
            }}
          />

          <h3 className="mt-4 text-center font-['Space_Grotesk'] text-[11px] font-black uppercase tracking-[0.12em] text-white">
            {skill.name}
          </h3>
        </div>
      </div>

      <p
        className="mt-4 font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.34em]"
        style={{ color: `rgba(${skill.rgb},0.65)` }}
      >
        {skill.type}
      </p>
    </div>
  );
};

const SkillRow = ({
  title,
  accent,
  index,
  side = "left",
  skills,
  theme = "cyan",
}) => {
  const isRight = side === "right";

  const themeColor =
    theme === "purple"
      ? "rgba(192,132,252,0.35)"
      : theme === "green"
      ? "rgba(34,197,94,0.35)"
      : "rgba(34,211,238,0.35)";

  const themeBg =
    theme === "purple"
      ? "rgba(192,132,252,0.08)"
      : theme === "green"
      ? "rgba(34,197,94,0.08)"
      : "rgba(34,211,238,0.08)";

  const textColor =
    theme === "purple"
      ? "text-purple-400"
      : theme === "green"
      ? "text-emerald-400"
      : "text-cyan-400";

  const iconClass =
    theme === "purple"
      ? "text-purple-300"
      : theme === "green"
      ? "text-emerald-300"
      : "text-cyan-300";

  const RowIcon =
    title === "3D Web" ? Sparkles : title === "Programming" ? Terminal : Code2;

  return (
    <div className="relative mb-24 lg:mb-32">
      <div
        className={`mb-10 flex items-center gap-4 ${
          isRight ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            border: `1px solid ${themeColor}`,
            background: themeBg,
          }}
        >
          <RowIcon size={17} className={iconClass} />
        </div>

        <h3 className="font-['Space_Grotesk'] text-xl font-black uppercase tracking-[0.15em] text-white">
          {title} <span className={textColor}>{accent}</span>
        </h3>
      </div>

      <div
        className={`absolute top-4 hidden font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.5em] opacity-70 lg:block ${
          isRight ? "left-6" : "right-6"
        } ${textColor}`}
      >
        {index} //{" "}
        {title === "3D Web"
          ? "CREATIVE"
          : title === "Programming"
          ? "LOGIC"
          : "VISUAL"}
      </div>

      <div className="relative mx-auto max-w-[900px]">
        <div className="pointer-events-none absolute left-[11%] right-[11%] top-[83px] hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

        <div className="grid grid-cols-2 place-items-center gap-x-6 gap-y-12 md:grid-cols-4">
          {skills.map((skill, index) => (
            <SkillOrb key={skill.name} skill={skill} delay={index * 120} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ToolCard = ({ tool, delay }) => {
  const Icon = tool.icon;

  return (
    <div
      className="skill-fade group relative flex h-[72px] w-[96px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.045] sm:h-[78px] sm:w-[112px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="absolute inset-x-4 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: tool.color }}
      />

      <Icon
        size={19}
        strokeWidth={2.4}
        style={{
          color: tool.color,
          filter: `drop-shadow(0 0 8px ${tool.color})`,
        }}
      />

      <span className="mt-3 font-['Space_Grotesk'] text-[11px] font-bold text-white/45 transition-colors duration-300 group-hover:text-white">
        {tool.name}
      </span>
    </div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#020408] px-4 py-20 text-white sm:px-6 sm:py-28"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        @keyframes skillFade {
          from {
            opacity: 0;
            transform: translateY(32px) scale(0.94);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes floatGlow {
          0%, 100% {
            transform: translate3d(0,0,0) scale(1);
            opacity: 0.08;
          }
          50% {
            transform: translate3d(24px,-18px,0) scale(1.08);
            opacity: 0.14;
          }
        }

        @keyframes ctaGrad {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .skill-fade {
          opacity: 0;
          animation: skillFade 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.18);
        }
      `}</style>

      {/* CSS dot grid — zero canvas, zero RAF */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden" style={{
        backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
      }} />

      <ThunderBg variant="storm" opacity={0.55} />
      {/* Readable dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,8,0.34)_45%,#020408_100%)]" />

      {/* Soft cyan glow */}
      <div
        className="pointer-events-none absolute -left-24 top-36 z-[1] h-[300px] w-[300px] rounded-full blur-3xl sm:h-[520px] sm:w-[520px] sm:-left-48"
        style={{
          background: "rgba(14,165,233,0.2)",
          animation: "floatGlow 9s ease-in-out infinite",
        }}
      />

      {/* Soft purple glow */}
      <div
        className="pointer-events-none absolute -right-24 top-[520px] z-[1] h-[300px] w-[300px] rounded-full blur-3xl sm:h-[520px] sm:w-[520px] sm:-right-48"
        style={{
          background: "rgba(168,85,247,0.18)",
          animation: "floatGlow 11s ease-in-out infinite reverse",
        }}
      />

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#020408] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <h2 className="font-['Bebas_Neue'] leading-none tracking-[0.06em]" style={{fontSize:"clamp(52px,12vw,116px)"}}>
            <span className="bg-gradient-to-r from-sky-200 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              SKILLS
            </span>{" "}
            <span className="outline-text">UNIVERSE</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl font-['Space_Grotesk'] text-[15px] font-medium text-white/35">
            An interactive constellation of technologies powering my
            capabilities.
          </p>
        </div>

        <SkillRow
          title="Frontend"
          accent="Galaxy"
          index="01"
          side="left"
          theme="cyan"
          skills={frontendSkills}
        />

        <SkillRow
          title="3D Web"
          accent="Nebula"
          index="02"
          side="right"
          theme="purple"
          skills={threeDWebSkills}
        />

        <SkillRow
          title="Programming"
          accent="Core"
          index="03"
          side="left"
          theme="green"
          skills={programmingSkills}
        />

        <div className="relative mt-8 flex flex-col items-center">
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-cyan-300/10 bg-white/[0.025] px-7 py-3 backdrop-blur-xl">
            <Sparkles size={16} className="text-cyan-400" />
            <span className="font-['Space_Grotesk'] text-sm font-black uppercase tracking-[0.12em] text-white/80">
              Tools & Platforms
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} delay={index * 90} />
            ))}
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-[24px] border border-cyan-300/10 bg-[#07161d]/80 px-5 py-12 text-center shadow-[0_0_60px_rgba(14,165,233,0.06)] backdrop-blur-2xl sm:mt-24 sm:rounded-[28px] sm:py-16 md:px-10">
          <h2 className="font-['Bebas_Neue'] leading-none tracking-[0.06em] text-white" style={{fontSize:"clamp(36px,8vw,64px)"}}>
            Ready to Build Something{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #e0f2fe, #0ea5e9, #67e8f9)",
                backgroundSize: "200% 200%",
                animation: "ctaGrad 5s ease infinite",
              }}
            >
              Real?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md font-['Space_Grotesk'] text-[15px] leading-relaxed text-white/40">
            Clean code, practical solutions, continuous learning — let&apos;s
            turn your idea into a working product.
          </p>

          <a
            href="mailto:rabarivishan2@gmail.com"
            className="mt-9 inline-flex rounded-xl bg-sky-500 px-9 py-4 font-['Space_Grotesk'] text-sm font-black text-white shadow-[0_0_30px_rgba(14,165,233,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-sky-400 hover:shadow-[0_0_45px_rgba(14,165,233,0.38)]"
          >
            Start Collaboration
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;