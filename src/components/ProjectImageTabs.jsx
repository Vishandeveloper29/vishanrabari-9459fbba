import ThunderBg from "./backgrounds/ThunderBg";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Car,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import bmwProject from "../assets/projects/bmw.png";
import githubExplorer from "../assets/projects/githubexplorer.png";
import lkMart from "../assets/projects/lkmart.png";
import todoProject from "../assets/projects/todo.png";
import trueBuild from "../assets/projects/truebuild.png";
import gauSala from "../assets/projects/gausala.png";

const projects = [
  {
    id: "truebuild",
    title: "TrueBuild",
    fullTitle: "TrueBuild Deck & Turf",
    category: "Business Website",
    image: trueBuild,
    icon: BadgeCheck,
    badge: "Premium Business",
    previewUrl: "truebuilddeck.vercel.app",
    description: "A premium business website for decking and turf products.",
    live: "https://truebuilddeck.vercel.app/",
    github: "https://github.com/Vishandeveloper29/Apex-web",
    accent: "#a855f7",
    accentRgb: "168,85,247",
  },
  {
    id: "lk-mart",
    title: "LK Mart",
    fullTitle: "LK Mart E-Commerce UI",
    category: "E-Commerce",
    image: lkMart,
    icon: ShoppingCart,
    badge: "Storefront",
    previewUrl: "lkmart.onrender.com",
    description: "A clean grocery e-commerce frontend with responsive layout.",
    live: "https://lkmart.onrender.com/",
    github: "https://github.com/Vishandeveloper29/L-K-mart",
    accent: "#06b6d4",
    accentRgb: "6,182,212",
  },
  {
    id: "gau-sala",
    title: "Gau Sala",
    fullTitle: "Kamdhenu Gau Seva",
    category: "Authority Page",
    image: gauSala,
    icon: Globe,
    badge: "Authority Page",
    previewUrl: "kamdhenugauseva.vercel.app",
    description: "A trust-based Gau Seva website with clean information flow.",
    live: "https://kamdhenugauseva.vercel.app/",
    github: "https://github.com/Vishandeveloper29/Gau-Sala",
    accent: "#22c55e",
    accentRgb: "34,197,94",
  },
  {
    id: "bmw-3d",
    title: "BMW 3D",
    fullTitle: "BMW 3D Model Viewer",
    category: "3D Viewer",
    image: bmwProject,
    icon: Car,
    badge: "3D Model",
    previewUrl: "bmw3dmodelviewer.vercel.app",
    description: "A dark BMW 3D model viewer with premium automotive styling.",
    live: "https://bmw3dmodelviewer.vercel.app/",
    github: "https://github.com/Vishandeveloper29/BMW-3D-Model-Viewer",
    accent: "#f59e0b",
    accentRgb: "245,158,11",
  },
  {
    id: "github-explorer",
    title: "GitHub",
    fullTitle: "GitHub Profile Explorer",
    category: "Frontend + API",
    image: githubExplorer,
    icon: Search,
    badge: "API Project",
    previewUrl: "github.io/GitHub-Explorer",
    description: "A GitHub profile search app that fetches live profile data.",
    live: "https://vishandeveloper29.github.io/GitHub-Explorer/",
    github: "https://github.com/Vishandeveloper29/GitHub-Explorer",
    accent: "#e879f9",
    accentRgb: "232,121,249",
  },
  {
    id: "todo-app",
    title: "Todo App",
    fullTitle: "React Todo App",
    category: "Mini App",
    image: todoProject,
    icon: CheckSquare,
    badge: "State App",
    previewUrl: "github.io/To-Do-List",
    description: "A clean productivity app built to practice React state management.",
    live: "https://vishandeveloper29.github.io/To-Do-List/",
    github: "https://github.com/Vishandeveloper29/To-Do-List",
    accent: "#f43f5e",
    accentRgb: "244,63,94",
  },
];

const ProjectImageTabs = () => {
  const [active, setActive] = useState(0);
  const switcherRef = useRef(null);

  const current = useMemo(() => projects[active], [active]);
  const Icon = current.icon;

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  // Fixed: only horizontal scroll inside project cards.
  // No scrollIntoView, so page will not auto-jump to Projects section.
  useEffect(() => {
    const row = switcherRef.current;
    const card = row?.children?.[active];

    if (!row || !card) return;

    const left = card.offsetLeft - row.clientWidth / 2 + card.clientWidth / 2;

    row.scrollTo({
      left,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#05020e] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8"
    >
      <ThunderBg variant="purple" opacity={0.7} />
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_35%),#05020e]" />

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 max-w-4xl">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2"
            style={{
              borderColor: `rgba(${current.accentRgb},0.3)`,
              background: `rgba(${current.accentRgb},0.08)`,
            }}
          >
            <Sparkles size={13} style={{ color: current.accent }} />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
              Project Lab
            </span>
          </div>

          <h2 className="font-black uppercase leading-[0.85] tracking-[-0.04em]" style={{fontSize:"clamp(36px,9vw,120px)"}}>
            <span className="text-white/80">Selected</span>
            <br />
            <span
              style={{
                backgroundImage: `linear-gradient(135deg, ${current.accent}, #ffffff, ${current.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Projects
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/45">
            A polished showcase of frontend builds — real links, responsive layouts,
            and premium glass styling.
          </p>
        </div>

        {/* Main preview */}
        <div className="grid gap-5 md:grid-cols-[1.3fr_0.7fr] lg:grid-cols-[1.35fr_0.65fr]">
          {/* Image preview */}
          <div
            className="group relative overflow-hidden rounded-[34px] border bg-white/[0.03] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            style={{
              borderColor: `rgba(${current.accentRgb},0.22)`,
              boxShadow: `0 30px 120px rgba(0,0,0,0.45), 0 0 80px rgba(${current.accentRgb},0.12)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />

            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black">
              <img
                key={current.id}
                src={current.image}
                alt={current.fullTitle}
                className="w-full object-cover object-top transition duration-700 group-hover:scale-[1.04]" style={{height:"clamp(220px,40vw,620px)"}}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-xl">
                <Icon size={14} style={{ color: current.accent }} />
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/70">
                  {current.badge}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/40">
                  {current.previewUrl}
                </p>

                <h3 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl">
                  {current.fullTitle}
                </h3>
              </div>
            </div>
          </div>

          {/* Details */}
          <div
            className="relative overflow-hidden rounded-[34px] border bg-white/[0.035] p-6 backdrop-blur-2xl sm:p-8"
            style={{
              borderColor: `rgba(${current.accentRgb},0.22)`,
            }}
          >
            <div
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[90px]"
              style={{ background: `rgba(${current.accentRgb},0.16)` }}
            />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-black uppercase tracking-[0.35em] text-white/35">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.05em] text-white sm:text-5xl">
                    {current.title}
                  </h3>

                  <p
                    className="mt-2 text-sm font-black uppercase tracking-[0.22em]"
                    style={{ color: current.accent }}
                  >
                    {current.category}
                  </p>
                </div>

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: `rgba(${current.accentRgb},0.32)`,
                    background: `rgba(${current.accentRgb},0.08)`,
                  }}
                >
                  <Icon size={22} style={{ color: current.accent }} />
                </div>
              </div>

              <p className="mt-8 text-base font-semibold leading-8 text-white/50">
                {current.description}
              </p>

              <div className="mt-8 grid gap-3">
                <a
                  href={current.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:bg-white/[0.08]"
                >
                  <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-white/75">
                    <Globe size={17} style={{ color: current.accent }} />
                    Live Site
                  </span>
                  <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                </a>

                <a
                  href={current.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:bg-white/[0.08]"
                >
                  <span className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-white/75">
                    <Code2 size={17} style={{ color: current.accent }} />
                    GitHub Repo
                  </span>
                  <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                </a>
              </div>

              <div className="mt-auto pt-8">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08]"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    onClick={handleNext}
                    type="button"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08]"
                    aria-label="Next project"
                  >
                    <ChevronRight size={19} />
                  </button>

                  <div className="ml-2 h-px flex-1 bg-white/10">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${((active + 1) / projects.length) * 100}%`,
                        background: current.accent,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project switcher */}
        <div className="mt-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-2xl">
          <div
            ref={switcherRef}
            className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => {
              const isActive = active === index;
              const ProjectIcon = project.icon;

              return (
                <button
                  key={project.id}
                  onClick={() => setActive(index)}
                  type="button"
                  className="group flex min-w-[160px] items-center gap-3 rounded-[20px] border p-3 text-left transition duration-300 sm:min-w-[190px]"
                  style={{
                    borderColor: isActive
                      ? `rgba(${project.accentRgb},0.45)`
                      : "rgba(255,255,255,0.08)",
                    background: isActive
                      ? `rgba(${project.accentRgb},0.09)`
                      : "rgba(255,255,255,0.025)",
                    boxShadow: isActive
                      ? `0 0 35px rgba(${project.accentRgb},0.13)`
                      : "none",
                    transform: isActive ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-top opacity-75 transition duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/25">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <p
                      className="mt-0.5 truncate text-sm font-black uppercase"
                      style={{
                        color: isActive ? project.accent : "rgba(255,255,255,0.72)",
                      }}
                    >
                      {project.title}
                    </p>

                    <p className="mt-0.5 truncate font-mono text-[9px] text-white/30">
                      {project.category}
                    </p>
                  </div>

                  <ProjectIcon
                    size={16}
                    style={{
                      color: isActive ? project.accent : "rgba(255,255,255,0.28)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectImageTabs;
