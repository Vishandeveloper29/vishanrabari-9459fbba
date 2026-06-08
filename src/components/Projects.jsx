import ThunderBg from "./backgrounds/ThunderBg";
import { memo, useCallback, useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  GitBranch,
  Layers,
  Globe,
  ShoppingCart,
  Car,
  CheckSquare,
  Search,
  Sparkles,
  Code2,
  MonitorSmartphone,
  Rocket,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

import bmwProject from "../assets/projects/bmw.png";
import githubExplorer from "../assets/projects/githubexplorer.png";
import lkMart from "../assets/projects/lkmart.png";
import todoProject from "../assets/projects/todo.png";
import trueBuild from "../assets/projects/truebuild.png";
import gauSala from "../assets/projects/gausala.png";

/* ─── Design Tokens ──────────────────────────────────────────────────────── */
const T = {
  fontDisplay: "'Bebas Neue', sans-serif",
  fontBody: "'Outfit', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  glass1: "rgba(255,255,255,0.042)",
  glass2: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.09)",
  glassBorderHover: "rgba(255,255,255,0.18)",
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const projects = [
  {
    id: "truebuild",
    title: "TrueBuild",
    fullTitle: "TrueBuild Deck & Turf",
    category: "Business Website",
    image: trueBuild,
    icon: BadgeCheck,
    year: "2026",
    color: "#d6ad60",
    rgb: "214,173,96",
    badge: "Premium Business",
    previewUrl: "truebuilddeck.vercel.app",
    description:
      "A premium business website for decking and turf products with clean sections, strong brand visuals, product-focused UI, and professional conversion flow.",
    longDesc:
      "Designed for a modern material brand with a polished hero, premium visual tone, product and service positioning, and a clear quote-based conversion path.",
    tech: ["React", "Tailwind CSS", "Vite"],
    highlights: ["Premium UI", "Quote Flow", "Business Landing"],
    live: "https://truebuilddeck.vercel.app/",
    github: "https://github.com/Vishandeveloper29/Apex-web",
    stat: { label: "Type", value: "Biz" },
  },
  {
    id: "lk-mart",
    title: "LK Mart",
    fullTitle: "LK Mart E-Commerce UI",
    category: "E-Commerce",
    image: lkMart,
    icon: ShoppingCart,
    year: "2025",
    color: "#f6ad55",
    rgb: "246,173,85",
    badge: "Storefront",
    previewUrl: "lkmart.onrender.com",
    description:
      "A clean grocery e-commerce frontend with product-first visuals, responsive layout, CTA buttons, and a simple shopping experience.",
    longDesc:
      "Built like a real local-store landing page with delivery-focused messaging, product visuals, WhatsApp-style ordering flow, and responsive sections.",
    tech: ["React", "UI Design", "Responsive"],
    highlights: ["Product Cards", "Delivery UI", "Mobile First"],
    live: "https://lkmart.onrender.com/",
    github: "https://github.com/Vishandeveloper29/L-K-mart",
    stat: { label: "Hosted", value: "Live" },
  },
  {
    id: "gau-sala",
    title: "Gau Sala",
    fullTitle: "Kamdhenu Gau Seva",
    category: "Authority Page",
    image: gauSala,
    icon: Globe,
    year: "2025",
    color: "#68d391",
    rgb: "104,211,145",
    badge: "Authority Page",
    previewUrl: "kamdhenugauseva.vercel.app",
    description:
      "A trust-based Gau Seva website focused on clear information, emotional presentation, service sections, and a clean contact or donation direction.",
    longDesc:
      "Created as an authority-style page with calm visuals, strong content hierarchy, service storytelling, and a clear user path for contact and support.",
    tech: ["React", "Vite", "Tailwind CSS"],
    highlights: ["Trust UI", "Content Flow", "Clean Sections"],
    live: "https://kamdhenugauseva.vercel.app/",
    github: "https://github.com/Vishandeveloper29/Gau-Sala",
    stat: { label: "Page", value: "Auth" },
  },
  {
    id: "bmw-3d",
    title: "BMW 3D",
    fullTitle: "BMW 3D Model Viewer",
    category: "3D Viewer",
    image: bmwProject,
    icon: Car,
    year: "2024",
    color: "#fc81b8",
    rgb: "252,129,184",
    badge: "3D Model",
    previewUrl: "bmw3dmodelviewer.vercel.app",
    description:
      "A dark BMW 3D model viewer with premium automotive styling, immersive model presentation, and clean viewer-based interaction design.",
    longDesc:
      "A visual-heavy 3D experience built around a BMW model, using dark cinematic UI direction, viewer-style controls, and premium presentation.",
    tech: ["GLB", "Three.js", "JavaScript"],
    highlights: ["3D Viewer", "Dark UI", "Auto Rotate"],
    live: "http://bmw3dmodelviewer.vercel.app/",
    github: "https://github.com/Vishandeveloper29/BMW-3D-Model-Viewer",
    stat: { label: "Mode", value: "3D" },
  },
  {
    id: "github-explorer",
    title: "GitHub Explorer",
    fullTitle: "GitHub Profile Explorer",
    category: "Frontend + API",
    image: githubExplorer,
    icon: Search,
    year: "2025",
    color: "#63b3ed",
    rgb: "99,179,237",
    badge: "API Project",
    previewUrl: "github.io/GitHub-Explorer",
    description:
      "A GitHub profile search app that fetches live profile data, repository details, stats, and developer information using the GitHub API.",
    longDesc:
      "Focused on API fetching, profile cards, repository display, live data handling, and a clean dashboard-style frontend experience.",
    tech: ["React", "GitHub API", "CSS"],
    highlights: ["Live API", "Profile Stats", "Repo Data"],
    live: "https://vishandeveloper29.github.io/GitHub-Explorer/",
    github: "https://github.com/Vishandeveloper29/GitHub-Explorer",
    stat: { label: "Data", value: "API" },
  },
  {
    id: "todo-app",
    title: "Todo App",
    fullTitle: "React Todo App",
    category: "Mini App",
    image: todoProject,
    icon: CheckSquare,
    year: "2025",
    color: "#b794f6",
    rgb: "183,148,246",
    badge: "State App",
    previewUrl: "github.io/To-Do-List",
    description:
      "A clean productivity app built to practice React state management, reusable components, task actions, and simple interaction flow.",
    longDesc:
      "A focused mini project covering task creation, task deletion, component structure, state updates, and clean user interaction patterns.",
    tech: ["React", "useState", "Components"],
    highlights: ["Task Actions", "State Logic", "Clean UI"],
    live: "https://vishandeveloper29.github.io/To-Do-List/",
    github: "https://github.com/Vishandeveloper29/To-Do-List",
    stat: { label: "Type", value: "SPA" },
  },
];

/* ─── Scroll Reveal Hook ─────────────────────────────────────────────────── */
const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [
    ref,
    {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.982)",
      filter: visible ? "blur(0px)" : "blur(6px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.65s ${T.ease} ${delay}ms, filter 0.55s ease ${delay}ms`,
    },
  ];
};

/* ══════════════════════════════════════════════════════════════════════════
   DITHER BACKGROUND SYSTEM
   — Bayer-matrix ordered dither wave, fully color-reactive to active project
   — Dark base + multi-palette pixel wave + noise grain + vignette
   ══════════════════════════════════════════════════════════════════════════ */


/* Subtle noise grain on top for tactile depth */
const NoiseLayer = memo(() => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.030,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: "180px 180px",
  }} />
));

/* Composed dither-only background */
const ProjectsBg = memo(({ currentRgb }) => (
  <div style={{ position: "absolute", inset: 0 }}>
    {/* L1: Thunder Background */}
    <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
      <ThunderBg variant="purple" opacity={0.8} />
    </div>

    {/* L2: Accent radial bloom — soft glow from bottom-left */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
      background: `radial-gradient(ellipse 60% 55% at 15% 85%, rgba(${currentRgb},0.13), transparent 65%)`,
      transition: "background 0.6s ease",
    }} />

    {/* L3: Noise grain */}
    <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
      <NoiseLayer />
    </div>

    {/* L4: Vignette — pulls edges dark so cards pop */}
    <div style={{
      position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
      background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 28%, rgba(2,3,10,0.80) 100%)",
    }} />
  </div>
));
ProjectsBg.displayName = "ProjectsBg";


/* ─── Project Preview ────────────────────────────────────────────────────── */
const ProjectPreview = memo(({ project }) => {
  const Icon = project.icon;
  const [ref, revealStyle] = useReveal(0);

  return (
    <div
      ref={ref}
      style={{
        ...revealStyle,
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: 28,
        border: `1px solid rgba(${project.rgb},0.22)`,
        background: T.glass1,
        padding: 10,
        boxShadow: `0 32px 96px rgba(0,0,0,0.55), 0 0 0 1px rgba(${project.rgb},0.06)`,
        backdropFilter: "blur(28px)",
      }}
    >
      <div style={{
        position: "absolute", inset: -32, pointerEvents: "none",
        background: `radial-gradient(circle at 30% 40%, rgba(${project.rgb},0.18), transparent 58%)`,
        filter: "blur(20px)",
      }} />

      <div style={{
        position: "relative", overflow: "hidden",
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "#04050f",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
              <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div style={{
            padding: "5px 14px", borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.04)",
            fontFamily: T.fontMono, fontSize: 10, fontWeight: 500,
            color: "rgba(255,255,255,0.32)", letterSpacing: "0.02em",
          }}>
            {project.previewUrl}
          </div>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid rgba(${project.rgb},0.35)`,
            background: `rgba(${project.rgb},0.12)`,
          }}>
            <Icon size={13} style={{ color: project.color }} />
          </div>
        </div>

        <div style={{ position: "relative", height: "clamp(260px, 40vw, 580px)", overflow: "hidden" }}>
          <img
            src={project.image}
            alt={project.fullTitle}
            loading="eager"
            decoding="async"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              transition: `transform 0.7s ${T.ease}`,
              display: "block",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(4,5,15,0.96) 0%, rgba(4,5,15,0.55) 38%, rgba(4,5,15,0.08) 70%, transparent 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.38,
            background: `linear-gradient(145deg, rgba(${project.rgb},0.32), transparent 52%)`,
          }} />

          <div style={{ position: "absolute", top: 14, left: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "5px 12px", borderRadius: 999,
              border: `1px solid rgba(${project.rgb},0.38)`,
              background: `rgba(${project.rgb},0.15)`,
              backdropFilter: "blur(16px)",
              fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: project.color,
            }}>
              <Sparkles size={9} />
              {project.badge}
            </span>
            <span style={{
              padding: "5px 12px", borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(16px)",
              fontFamily: T.fontMono, fontSize: 9, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}>
              {project.category}
            </span>
          </div>

          <div style={{ position: "absolute", top: 14, right: 14 }}>
            <div style={{
              padding: "8px 14px", borderRadius: 14, textAlign: "center",
              border: `1px solid rgba(${project.rgb},0.35)`,
              background: `rgba(${project.rgb},0.14)`,
              backdropFilter: "blur(16px)",
            }}>
              <p style={{ fontFamily: T.fontDisplay, fontSize: 22, lineHeight: 1, color: project.color, margin: 0 }}>
                {project.stat.value}
              </p>
              <p style={{
                fontFamily: T.fontMono, fontSize: 8, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", marginTop: 3,
              }}>
                {project.stat.label}
              </p>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px 26px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {project.highlights.map(h => (
                <span key={h} style={{
                  padding: "4px 10px", borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.09)",
                  backdropFilter: "blur(12px)",
                  fontFamily: T.fontMono, fontSize: 9, fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)",
                }}>
                  {h}
                </span>
              ))}
            </div>
            <h3 style={{
              fontFamily: T.fontDisplay,
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.02em",
              color: "#fff", margin: "0 0 10px",
              textShadow: `0 0 60px rgba(${project.rgb},0.45)`,
            }}>
              {project.title}
            </h3>
            <p style={{
              fontFamily: T.fontBody, fontSize: 13, fontWeight: 400,
              lineHeight: 1.75, color: "rgba(255,255,255,0.5)",
              maxWidth: "min(520px,100%)", margin: "0 0 18px",
            }}>
              {project.longDesc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a
                href={project.live} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "10px 22px", borderRadius: 999,
                  background: `linear-gradient(135deg, ${project.color} 0%, rgba(${project.rgb},0.7) 100%)`,
                  boxShadow: `0 12px 36px rgba(${project.rgb},0.32)`,
                  fontFamily: T.fontBody, fontSize: 13, fontWeight: 700,
                  color: "#000", textDecoration: "none",
                  transition: `transform 0.25s ${T.ease}, box-shadow 0.25s ease`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 18px 44px rgba(${project.rgb},0.45)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 12px 36px rgba(${project.rgb},0.32)`; }}
              >
                Live Preview <ArrowUpRight size={15} />
              </a>
              <a
                href={project.github} target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "10px 22px", borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  fontFamily: T.fontBody, fontSize: 13, fontWeight: 700,
                  color: "rgba(255,255,255,0.75)", textDecoration: "none",
                  transition: `all 0.25s ${T.ease}`,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
              >
                <GitBranch size={14} /> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ProjectPreview.displayName = "ProjectPreview";

/* ─── Project Details ────────────────────────────────────────────────────── */
const ProjectDetails = memo(({ project, active, total, onPrev, onNext }) => {
  const Icon = project.icon;
  const [ref, revealStyle] = useReveal(60);

  return (
    <div ref={ref} style={{
      ...revealStyle,
      position: "relative", overflow: "hidden",
      borderRadius: 28,
      border: `1px solid rgba(${project.rgb},0.18)`,
      background: T.glass1,
      padding: "26px 28px",
      backdropFilter: "blur(28px)",
      boxShadow: `0 24px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
    }}>
      <div style={{
        position: "absolute", top: -60, right: -60, width: 220, height: 220,
        borderRadius: "50%", pointerEvents: "none",
        background: `rgba(${project.rgb},0.14)`, filter: "blur(50px)",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1.5px solid rgba(${project.rgb},0.38)`,
              background: `rgba(${project.rgb},0.12)`,
              boxShadow: `0 0 28px rgba(${project.rgb},0.15), inset 0 1px 0 rgba(255,255,255,0.1)`,
            }}>
              <Icon size={20} style={{ color: project.color }} />
            </div>
            <div>
              <p style={{
                fontFamily: T.fontMono, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: project.color, margin: 0,
              }}>
                {project.category}
              </p>
              <p style={{ fontFamily: T.fontMono, fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>
                {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ fn: onPrev, Icon: ChevronLeft, label: "Previous" }, { fn: onNext, Icon: ChevronRight, label: "Next" }].map(({ fn, Icon: I, label }) => (
              <button key={label} onClick={fn} aria-label={`${label} project`} style={{
                width: 36, height: 36, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.55)",
                cursor: "pointer", transition: `all 0.2s ${T.ease}`,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              >
                <I size={15} />
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7, width: "fit-content",
          padding: "6px 14px", borderRadius: 999,
          border: `1px solid rgba(${project.rgb},0.32)`,
          background: `rgba(${project.rgb},0.08)`,
          fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: project.color,
        }}>
          <Sparkles size={10} /> {project.badge}
        </div>

        <h3 style={{
          fontFamily: T.fontDisplay,
          fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
          fontWeight: 400, lineHeight: 0.95, letterSpacing: "-0.01em",
          color: "#fff", margin: 0,
        }}>
          {project.fullTitle}
        </h3>

        <p style={{
          fontFamily: T.fontBody, fontSize: 13.5, fontWeight: 400,
          lineHeight: 1.8, color: "rgba(255,255,255,0.5)", margin: 0,
        }}>
          {project.description}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(90px,100%),1fr))", gap: 8 }}>
          {project.highlights.map((item, i) => (
            <div key={item} style={{
              borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(0,0,0,0.22)", padding: "14px 12px",
              backdropFilter: "blur(12px)",
              transition: `transform 0.3s ${T.ease}, background 0.3s ease`,
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(0,0,0,0.22)"; }}
            >
              <p style={{
                fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: project.color, margin: "0 0 6px",
              }}>0{i + 1}</p>
              <p style={{ fontFamily: T.fontBody, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.72)", margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p style={{
            fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
            letterSpacing: "0.38em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)", margin: "0 0 10px",
          }}>
            Tech Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tech.map(tech => (
              <span key={tech} style={{
                padding: "6px 14px", borderRadius: 999,
                border: `1px solid rgba(${project.rgb},0.28)`,
                background: `rgba(${project.rgb},0.07)`,
                fontFamily: T.fontMono, fontSize: 11, fontWeight: 500,
                color: project.color,
                transition: `transform 0.2s ${T.ease}`, cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(90px,100%),1fr))", gap: 8 }}>
          {[
            { icon: MonitorSmartphone, label: "Responsive" },
            { icon: Code2, label: "Clean Code" },
            { icon: Rocket, label: "Fast UI" },
          ].map(({ icon: QIcon, label }) => (
            <div key={label} style={{
              borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)", padding: "14px 12px",
            }}>
              <QIcon size={16} style={{ color: "rgba(255,255,255,0.38)", display: "block", marginBottom: 8 }} />
              <p style={{
                fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", margin: 0,
              }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
ProjectDetails.displayName = "ProjectDetails";

/* ─── Project Tab ────────────────────────────────────────────────────────── */
const ProjectTab = memo(({ project, index, active, onClick }) => {
  const isActive = active === index;
  const Icon = project.icon;
  return (
    <button type="button" onClick={onClick} aria-label={`Select ${project.title}`} aria-pressed={isActive}
      style={{
        flexShrink: 0,
        width: "clamp(128px, 18vw, 162px)",
        overflow: "hidden", borderRadius: 18,
        border: isActive ? `1.5px solid rgba(${project.rgb},0.6)` : `1px solid rgba(255,255,255,0.09)`,
        background: isActive ? `rgba(${project.rgb},0.11)` : "rgba(255,255,255,0.035)",
        padding: 7, cursor: "pointer", textAlign: "left",
        transition: `all 0.35s ${T.ease}`,
        boxShadow: isActive
          ? `0 0 36px rgba(${project.rgb},0.18), 0 8px 28px rgba(0,0,0,0.32)`
          : "0 4px 18px rgba(0,0,0,0.2)",
        transform: "translateY(0)",
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 12, height: "clamp(60px, 9vw, 84px)" }}>
        <img src={project.image} alt={project.title} loading="lazy" decoding="async"
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
            filter: isActive ? "none" : "brightness(0.42) saturate(0.65)",
            transition: `filter 0.35s ease, transform 0.5s ${T.ease}`,
            display: "block",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 60%)" }} />
        <div style={{
          position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid rgba(${project.rgb},0.4)`,
          background: `rgba(${project.rgb},0.2)`, backdropFilter: "blur(8px)",
        }}>
          <Icon size={10} style={{ color: project.color }} />
        </div>
        {isActive && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }} />
        )}
      </div>
      <div style={{ padding: "8px 6px 4px" }}>
        <p style={{
          fontFamily: T.fontMono, fontSize: 8, fontWeight: 700,
          letterSpacing: "0.26em", textTransform: "uppercase",
          color: isActive ? project.color : "rgba(255,255,255,0.28)",
          margin: "0 0 3px", transition: "color 0.3s ease",
        }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h4 style={{ fontFamily: T.fontDisplay, fontSize: 15, fontWeight: 400, lineHeight: 1, color: "#fff", margin: "0 0 3px", letterSpacing: "0.01em" }}>
          {project.title}
        </h4>
        <p style={{ fontFamily: T.fontBody, fontSize: 9, fontWeight: 400, color: "rgba(255,255,255,0.32)", margin: 0 }}>
          {project.category}
        </p>
      </div>
    </button>
  );
});
ProjectTab.displayName = "ProjectTab";

/* ─── Project Switcher ───────────────────────────────────────────────────── */
const ProjectSwitcher = memo(({ projects, active, current, onSelect }) => {
  const [ref, revealStyle] = useReveal(120);
  return (
    <div ref={ref} style={revealStyle}>
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: 24,
        border: `1px solid rgba(${current.rgb},0.14)`,
        background: T.glass1, padding: "20px 22px",
        backdropFilter: "blur(28px)",
        boxShadow: "0 20px 72px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none",
          background: `
            radial-gradient(circle at 15% 10%, rgba(${current.rgb},0.14), transparent 30%),
            linear-gradient(112deg, rgba(255,255,255,0.07), transparent 28%, rgba(${current.rgb},0.07), transparent 65%)
          `,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
            <div>
              <p style={{
                fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", margin: "0 0 3px",
              }}>Project Preview</p>
              <p style={{ fontFamily: T.fontBody, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.58)", margin: 0 }}>
                Select a project
              </p>
            </div>
            <div style={{
              padding: "6px 14px", borderRadius: 999,
              border: `1px solid rgba(${current.rgb},0.35)`,
              background: `rgba(${current.rgb},0.1)`,
              fontFamily: T.fontMono, fontSize: 11, fontWeight: 600,
              color: current.color,
            }}>
              {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(projects.length).padStart(2, "0")}
            </div>
          </div>

          <div style={{
            display: "flex", alignItems: "stretch", gap: 10,
            overflowX: "auto", paddingBottom: 4,
            scrollbarWidth: "none", msOverflowStyle: "none",
          }}>
            {projects.map((project, index) => (
              <ProjectTab key={project.id} project={project} index={index} active={active} onClick={() => onSelect(index)} />
            ))}
          </div>

          <div style={{ display: "flex", gap: 5, marginTop: 14, justifyContent: "center" }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => onSelect(i)} aria-label={`Go to project ${i + 1}`} style={{
                width: i === active ? 22 : 5, height: 5, borderRadius: 999, border: "none",
                background: i === active ? current.color : "rgba(255,255,255,0.18)",
                cursor: "pointer", padding: 0,
                transition: `all 0.35s ${T.ease}`,
                boxShadow: i === active ? `0 0 10px rgba(${current.rgb},0.6)` : "none",
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
ProjectSwitcher.displayName = "ProjectSwitcher";

/* ─── Main Section ───────────────────────────────────────────────────────── */
const Projects = () => {
  const [active, setActive] = useState(0);
  const current = projects[active];

  const handleSelect = useCallback(i => setActive(i), []);
  const handlePrev   = useCallback(() => setActive(p => (p === 0 ? projects.length - 1 : p - 1)), []);
  const handleNext   = useCallback(() => setActive(p => (p === projects.length - 1 ? 0 : p + 1)), []);

  const [headerRef, headerReveal] = useReveal(0);

  useEffect(() => {
    const onKey = e => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  return (
    <section id="projects" style={{
      position: "relative", overflow: "hidden",
      background: "#02030a", color: "#fff",
      padding: "100px 20px 110px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
        #projects * { box-sizing: border-box; }
        @keyframes proj-grad {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .proj-title-gradient {
          background: linear-gradient(135deg, #f0a6d8 0%, #8bd3ff 30%, #cbb8ff 60%, #f0a6d8 100%);
          background-size: 260% 260%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: proj-grad 6s ease infinite;
        }
        #projects button { outline: none; }
        #projects button:focus-visible { outline: 2px solid rgba(255,255,255,0.5); outline-offset: 2px; }
        #projects [data-scrollrow]::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          #projects *, #projects *::before, #projects *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* ── background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ProjectsBg currentRgb={current.rgb} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% -8%, rgba(255,255,255,0.065), transparent 55%)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)",
        }} />
      </div>

      {/* ── content ── */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1360, margin: "0 auto" }}>

        {/* header */}
        <div ref={headerRef} style={{ ...headerReveal, marginBottom: 52, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginBottom: 18, padding: "7px 18px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
              }}>
                <Layers size={11} style={{ color: "rgba(255,255,255,0.45)" }} />
                <span style={{
                  fontFamily: T.fontMono, fontSize: 9, fontWeight: 700,
                  letterSpacing: "0.45em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                }}>Project Lab</span>
              </div>
              <h2 style={{
                fontFamily: T.fontDisplay,
                fontSize: "clamp(3.2rem, 7.5vw, 6rem)",
                fontWeight: 400, lineHeight: 0.92, letterSpacing: "-0.03em",
                color: "#fff", margin: 0,
              }}>
                Selected{" "}<span className="proj-title-gradient">Projects</span>
              </h2>
            </div>
            <p style={{
              maxWidth: 340, fontFamily: T.fontBody, fontSize: 14, fontWeight: 400,
              lineHeight: 1.8, color: "rgba(255,255,255,0.4)", margin: 0,
            }}>
              A polished showcase of frontend builds — real project links, responsive layouts,
              clean UI patterns, and premium glass styling throughout.
            </p>
          </div>
          <div style={{
            height: 1,
            background: `linear-gradient(90deg, transparent, rgba(${current.rgb},0.35) 40%, rgba(${current.rgb},0.15) 70%, transparent)`,
            transition: "background 0.5s ease",
          }} />
        </div>

        {/* layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <style>{`
            @media (min-width: 900px) {
              .proj-layout { flex-direction: row !important; align-items: flex-start !important; }
              .proj-preview { flex: 1; min-width: 0; }
              .proj-sidebar { width: 360px; flex-shrink: 0; }
            }
            @media (min-width: 1024px) { .proj-sidebar { width: 420px; } }
            @media (min-width: 1280px) { .proj-sidebar { width: 460px; } }
          `}</style>
          <div className="proj-layout" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="proj-preview" style={{ width: "100%" }}>
              <ProjectPreview key={current.id} project={current} />
            </div>
            <div className="proj-sidebar" style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <ProjectDetails
                key={`d-${current.id}`}
                project={current} active={active} total={projects.length}
                onPrev={handlePrev} onNext={handleNext}
              />
              <ProjectSwitcher projects={projects} active={active} current={current} onSelect={handleSelect} />
            </div>
          </div>
        </div>

        {/* keyboard hint */}
        <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 10, alignItems: "center" }}>
          {[["←", "Prev"], ["→", "Next"]].map(([key, label]) => (
            <div key={key} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}>
              <kbd style={{ fontFamily: T.fontMono, fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)", background: "none", border: "none", padding: 0 }}>{key}</kbd>
              <span style={{ fontFamily: T.fontBody, fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.25)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;