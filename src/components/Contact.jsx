import ThunderBg from "./backgrounds/ThunderBg";
import { useState, useRef, useEffect, memo, useCallback } from "react";
import { ArrowUpRight, Mail, MapPin, Send, GitBranch, Zap, Radio } from "lucide-react";

/* ─── Tokens ─────────────────────────────────────────────────────────── */
const T = {
    mono: "'Share Tech Mono', 'Courier New', monospace",
    display: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    body: "'DM Sans', sans-serif",
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    teal: "#00ffe7",
    purple: "#bf5af2",
    orange: "#ff6b35",
    red: "#ff3b30",
    dim: "rgba(0,255,231,0.12)",
};

/* ─── Contact data ───────────────────────────────────────────────────── */
const CARDS = [
    { id: "EML", icon: Mail, label: "EMAIL", value: "rabarivishan2@gmail.com", href: "mailto:rabarivishan2@gmail.com", color: T.teal, rgb: "0,255,231", signal: "OPEN CHANNEL" },
    { id: "GIT", icon: GitBranch, label: "GITHUB", value: "Vishandeveloper29", href: "https://github.com/Vishandeveloper29", color: T.purple, rgb: "191,90,242", signal: "REPO LINK" },
    { id: "LOC", icon: MapPin, label: "LOCATION", value: "Gandhidham, India", href: "#contact", color: T.orange, rgb: "255,107,53", signal: "REMOTE READY" },
];

/* ══════════════════════════════════════════════════════════════════════
   MAGNETIC FIELD CANVAS — flowing field-line background
   ══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════════
   GLITCH TEXT — character-scramble on mount/hover
   ══════════════════════════════════════════════════════════════════════ */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>/\\|[]{}~^";
const GlitchText = ({ text, active, color = T.teal, fontSize = 14, mono = true }) => {
    const [display, setDisplay] = useState(text);
    const frame = useRef(0);

    useEffect(() => {
        if (!active) { setDisplay(text); return; }
        let iteration = 0;
        clearInterval(frame.current);
        frame.current = setInterval(() => {
            setDisplay(
                text.split("").map((ch, i) =>
                    i < iteration ? text[i] : (ch === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)])
                ).join("")
            );
            if (iteration >= text.length) clearInterval(frame.current);
            iteration += 0.6;
        }, 28);
        return () => clearInterval(frame.current);
    }, [active, text]);

    return (
        <span style={{
            fontFamily: mono ? T.mono : T.body,
            fontSize, color,
            letterSpacing: mono ? "0.08em" : "0.02em",
        }}>
            {display}
        </span>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   SIGNAL STRENGTH BARS — animated lock indicator
   ══════════════════════════════════════════════════════════════════════ */
const SignalBars = ({ color, active }) => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
        {[3, 6, 9, 12, 15].map((h, i) => (
            <div
                key={i}
                style={{
                    width: 3, height: h,
                    background: active ? color : "rgba(255,255,255,0.12)",
                    borderRadius: 1,
                    transition: `background 0.3s ease ${i * 0.05}s`,
                    boxShadow: active ? `0 0 6px ${color}` : "none",
                }}
            />
        ))}
    </div>
);

/* ══════════════════════════════════════════════════════════════════════
   CONTACT CARD — terminal signal lock style
   ══════════════════════════════════════════════════════════════════════ */
const ContactCard = memo(({ card, index }) => {
    const Icon = card.icon;
    const [hov, setHov] = useState(false);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLocked(true), 800 + index * 250);
        return () => clearTimeout(t);
    }, [index]);

    return (
        <a
            href={card.href}
            target={card.href.startsWith("http") ? "_blank" : undefined}
            rel={card.href.startsWith("http") ? "noreferrer" : undefined}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                display: "block", textDecoration: "none", position: "relative",
                borderRadius: 4,
                border: `1px solid ${hov ? card.color : "rgba(255,255,255,0.08)"}`,
                background: hov ? `rgba(${card.rgb},0.055)` : "rgba(0,0,0,0.55)",
                padding: "18px 20px",
                backdropFilter: "blur(20px)",
                transform: hov ? "translateX(6px)" : "translateX(0)",
                transition: `all 0.35s ${T.ease}`,
                opacity: locked ? 1 : 0,
                animation: locked ? `ct-slide 0.5s ${T.ease} forwards` : "none",
                boxShadow: hov ? `inset 0 0 0 1px rgba(${card.rgb},0.18), 4px 0 32px rgba(${card.rgb},0.12)` : "none",
            }}
        >
            {/* Left accent bar */}
            <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                background: hov ? card.color : "rgba(255,255,255,0.08)",
                borderRadius: "4px 0 0 4px",
                transition: `background 0.3s ease`,
                boxShadow: hov ? `0 0 12px ${card.color}` : "none",
            }} />

            <div style={{ paddingLeft: 6 }}>
                {/* Top row — ID + signal */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontFamily: T.mono, fontSize: 9, fontWeight: 700, letterSpacing: "0.4em", color: card.color, opacity: 0.7 }}>
                        [{card.id}] ·· {card.label}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.2em", color: hov ? card.color : "rgba(255,255,255,0.25)", transition: "color 0.3s" }}>
                            {hov ? card.signal : "STANDBY"}
                        </span>
                        <SignalBars color={card.color} active={hov} />
                    </div>
                </div>

                {/* Icon + value */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 4, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: `1px solid rgba(${card.rgb},0.28)`,
                        background: `rgba(${card.rgb},0.08)`,
                        transition: `transform 0.4s ${T.ease}`,
                        transform: hov ? "scale(1.08)" : "scale(1)",
                    }}>
                        <Icon size={16} style={{ color: card.color }} />
                    </div>
                    <div>
                        <GlitchText text={card.value} active={hov} color="rgba(255,255,255,0.9)" fontSize={13} />
                    </div>
                    <ArrowUpRight size={14} style={{
                        marginLeft: "auto",
                        color: hov ? card.color : "rgba(255,255,255,0.15)",
                        transform: hov ? "translate(2px,-2px)" : "translate(0,0)",
                        transition: `all 0.3s ${T.ease}`,
                        flexShrink: 0,
                    }} />
                </div>
            </div>
        </a>
    );
});

/* ══════════════════════════════════════════════════════════════════════
   OPEN TO WORK BLOCK — broadcast signal card
   ══════════════════════════════════════════════════════════════════════ */
const BroadcastCard = () => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 1200);
        return () => clearInterval(id);
    }, []);

    return (
        <div style={{
            position: "relative", overflow: "hidden", borderRadius: 4,
            border: "1px solid rgba(0,255,231,0.18)",
            background: "rgba(0,255,231,0.028)",
            padding: "22px 20px",
            backdropFilter: "blur(20px)",
        }}>
            {/* Sweeping radar line */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg,transparent,rgba(0,255,231,0.8),transparent)",
                animation: "ct-sweep 2.8s linear infinite",
            }} />

            {/* Corner markers */}
            {[["top:0,left:0", "border-top,border-left"], ["top:0,right:0", "border-top,border-right"], ["bottom:0,left:0", "border-bottom,border-left"], ["bottom:0,right:0", "border-bottom,border-right"]].map((_, i) => {
                const positions = [{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }];
                const borders = [
                    { borderTop: "2px solid rgba(0,255,231,0.5)", borderLeft: "2px solid rgba(0,255,231,0.5)" },
                    { borderTop: "2px solid rgba(0,255,231,0.5)", borderRight: "2px solid rgba(0,255,231,0.5)" },
                    { borderBottom: "2px solid rgba(0,255,231,0.5)", borderLeft: "2px solid rgba(0,255,231,0.5)" },
                    { borderBottom: "2px solid rgba(0,255,231,0.5)", borderRight: "2px solid rgba(0,255,231,0.5)" },
                ];
                return (
                    <div key={i} style={{
                        position: "absolute", width: 10, height: 10,
                        ...positions[i], ...borders[i],
                    }} />
                );
            })}

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <Radio size={14} style={{ color: T.teal }} />
                    <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.4em", color: "rgba(0,255,231,0.7)", textTransform: "uppercase" }}>
                        BROADCAST · SIGNAL ACTIVE
                    </span>
                    <span style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: T.teal,
                        boxShadow: `0 0 10px ${T.teal}`,
                        opacity: tick % 2 === 0 ? 1 : 0.3,
                        transition: "opacity 0.4s ease",
                        display: "inline-block",
                    }} />
                </div>

                <h3 style={{
                    fontFamily: T.display,
                    fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    lineHeight: 0.95,
                    color: "#fff",
                    textTransform: "uppercase",
                    margin: "0 0 12px",
                }}>
                    OPEN TO<br />
                    <span style={{ color: T.teal, textShadow: `0 0 20px rgba(0,255,231,0.4)` }}>FRONTEND</span> WORK
                </h3>

                <p style={{
                    fontFamily: T.body, fontSize: 12.5, lineHeight: 1.75,
                    color: "rgba(255,255,255,0.38)", margin: 0,
                }}>
                    Portfolio sections · Responsive websites · Dark glass UI · React components · Animated layouts
                </p>

                {/* Frequency bars */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginTop: 14, height: 18 }}>
                    {Array.from({ length: 28 }, (_, i) => (
                        <div
                            key={i}
                            style={{
                                width: 3,
                                height: `${30 + Math.sin(i * 0.9 + tick * 0.8) * 50 + 20}%`,
                                background: `rgba(0,255,231,${0.15 + Math.sin(i * 0.7) * 0.1})`,
                                borderRadius: 1,
                                transition: "height 0.4s ease",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   TERMINAL INPUT — CLI-style form field
   ══════════════════════════════════════════════════════════════════════ */
const TermInput = ({ label, name, type = "text", required, placeholder, multiline, rows }) => {
    const [focused, setFocused] = useState(false);
    const s = {
        width: "100%", display: "block",
        padding: multiline ? "12px 14px" : "11px 14px 11px 28px",
        borderRadius: 3,
        border: `1px solid ${focused ? "rgba(0,255,231,0.45)" : "rgba(255,255,255,0.07)"}`,
        background: focused ? "rgba(0,255,231,0.03)" : "rgba(0,0,0,0.5)",
        backdropFilter: "blur(12px)",
        fontFamily: T.mono,
        fontSize: 13,
        color: focused ? "#fff" : "rgba(255,255,255,0.75)",
        outline: "none", resize: "none",
        boxShadow: focused ? `0 0 0 1px rgba(0,255,231,0.15)` : "none",
        transition: `all 0.25s ${T.ease}`,
        boxSizing: "border-box",
        letterSpacing: "0.04em",
    };
    return (
        <div>
            <label style={{
                display: "block", fontFamily: T.mono, fontSize: 9, fontWeight: 700,
                letterSpacing: "0.38em", textTransform: "uppercase",
                color: focused ? "rgba(0,255,231,0.7)" : "rgba(255,255,255,0.22)",
                marginBottom: 7, transition: "color 0.25s ease",
            }}>
                &gt;_ {label}
            </label>
            <div style={{ position: "relative" }}>
                {!multiline && (
                    <span style={{
                        position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                        fontFamily: T.mono, fontSize: 11, color: T.teal, opacity: focused ? 0.9 : 0.35,
                        transition: "opacity 0.25s",
                    }}>$</span>
                )}
                {multiline
                    ? <textarea name={name} required={required} placeholder={placeholder} rows={rows || 6} style={s} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                    : <input name={name} type={type} required={required} placeholder={placeholder} style={s} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                }
                {focused && !multiline && (
                    <span style={{
                        position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                        fontFamily: T.mono, fontSize: 9, letterSpacing: "0.25em",
                        color: "rgba(0,255,231,0.4)",
                    }}>INPUT</span>
                )}
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════════════
   MAIN CONTACT SECTION
   ══════════════════════════════════════════════════════════════════════ */
const Contact = () => {
    const [btnHov, setBtnHov] = useState(false);
    const [sending, setSending] = useState(false);
    const [charIdx, setCharIdx] = useState(0);

    /* Animated header text */
    const headerText = "ESTABLISH CONTACT";
    useEffect(() => {
        if (charIdx >= headerText.length) return;
        const t = setTimeout(() => setCharIdx(i => i + 1), 60);
        return () => clearTimeout(t);
    }, [charIdx]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        const form = new FormData(e.currentTarget);
        const name = form.get("name");
        const email = form.get("email");
        const message = form.get("message");
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        setTimeout(() => {
            window.location.href = `mailto:rabarivishan2@gmail.com?subject=${subject}&body=${body}`;
            setSending(false);
        }, 700);
    };

    return (
        <section id="contact" style={{
            position: "relative", overflow: "hidden",
            background: "#050608",
            color: "#fff",
            padding: "clamp(60px,9vw,96px) clamp(14px,4vw,28px) clamp(70px,9vw,110px)",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow+Condensed:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        #contact *, #contact *::before, #contact *::after { box-sizing: border-box; }

        @keyframes ct-sweep { 0%{transform:translateX(-100%)} 100%{transform:translateX(100vw)} }
        @keyframes ct-slide  { from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ct-blink  { 0%,100%{opacity:1} 49%{opacity:1} 50%,99%{opacity:0} }
        @keyframes ct-pulse  { 0%,100%{box-shadow:0 0 8px rgba(0,255,231,0.6)} 50%{box-shadow:0 0 24px rgba(0,255,231,1)} }
        @keyframes ct-scanv  { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes ct-rot    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ct-flicker{
          0%,19%,21%,23%,25%,54%,56%,100%{opacity:1}
          20%,24%,55%{opacity:0.4}
        }

        #contact input::placeholder, #contact textarea::placeholder {
          color: rgba(255,255,255,0.12);
          font-family: 'Share Tech Mono', monospace;
          letter-spacing: 0.04em;
        }
        #contact input:focus, #contact textarea:focus { outline: none; }

        .ct-grid { display: flex; flex-direction: column; gap: 20px; }
        @media (min-width: 768px) {
          .ct-grid { display: grid !important; grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (min-width: 1024px) {
          .ct-grid { grid-template-columns: 0.9fr 1.1fr !important; gap: 28px; }
        }
        @media (min-width: 600px) {
          .ct-form-row { grid-template-columns: 1fr 1fr !important; }
        }

        .ct-tag:hover {
          border-color: rgba(255,255,255,0.25) !important;
          color: rgba(255,255,255,0.85) !important;
        }
      `}</style>

            {/* ── Background layers ── */}
            <div style={{ position: "absolute", inset: 0 }}>
                {/* Base */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(0,255,231,0.04) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 80% 70%, rgba(191,90,242,0.05) 0%, transparent 60%)" }} />

                {/* Field canvas */}
                <ThunderBg variant="teal" opacity={0.85} />

                {/* Vertical scan line */}
                <div style={{
                    position: "absolute", top: 0, bottom: 0, width: 1,
                    background: "linear-gradient(180deg,transparent 0%,rgba(0,255,231,0.35) 50%,transparent 100%)",
                    left: "50%",
                    animation: "none",
                    opacity: 0.25,
                    pointerEvents: "none",
                }} />

                {/* Vignette */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 35%, rgba(5,6,8,0.8) 100%)", pointerEvents: "none" }} />
            </div>

            {/* ── Content ── */}
            <div style={{ position: "relative", zIndex: 10, maxWidth: 1240, margin: "0 auto" }}>

                {/* ── Section header ── */}
                <div style={{ marginBottom: 64 }}>
                    {/* System label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <div style={{ display: "flex", gap: 5 }}>
                            {["#ff3b30", "#ffcc00", "#30d158"].map((c, i) => (
                                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
                            ))}
                        </div>
                        <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                            SYSTEM · CONTACT.JSX · PORT 3000
                        </span>
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(255,255,255,0.08),transparent)" }} />
                    </div>

                    {/* Main heading */}
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <h2 style={{
                            fontFamily: T.display,
                            fontSize: "clamp(3rem, 9vw, 8rem)",
                            fontWeight: 900,
                            letterSpacing: "0.04em",
                            lineHeight: 0.88,
                            color: "#fff",
                            textTransform: "uppercase",
                            margin: 0,
                            animation: "ct-flicker 8s ease infinite 3s",
                        }}>
                            {headerText.slice(0, charIdx)}
                            <span style={{
                                display: "inline-block", width: "0.06em", height: "0.85em",
                                background: T.teal, verticalAlign: "text-bottom", marginLeft: 2,
                                animation: charIdx < headerText.length ? "none" : "ct-blink 1s step-end infinite",
                                opacity: charIdx < headerText.length ? 1 : undefined,
                            }} />
                        </h2>

                        {/* Glitch duplicate */}
                        <h2 aria-hidden style={{
                            position: "absolute", inset: 0,
                            fontFamily: T.display,
                            fontSize: "clamp(3rem, 9vw, 8rem)",
                            fontWeight: 900,
                            letterSpacing: "0.04em",
                            lineHeight: 0.88,
                            color: T.teal,
                            textTransform: "uppercase",
                            margin: 0,
                            opacity: 0.04,
                            clipPath: "polygon(0 30%, 100% 28%, 100% 36%, 0 38%)",
                            transform: "translateX(-3px)",
                            pointerEvents: "none",
                        }}>
                            {headerText}
                        </h2>
                    </div>

                    <p style={{
                        fontFamily: T.body, fontSize: 14, lineHeight: 1.75,
                        color: "rgba(255,255,255,0.35)", margin: "20px 0 0",
                        maxWidth: 560,
                    }}>
                        Send the signal. I monitor all channels and respond within 24 hours with a clear direction for your project.
                    </p>
                </div>

                {/* ── Two-column grid ── */}
                <div className="ct-grid">

                    {/* ── LEFT — cards + broadcast ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {CARDS.map((card, i) => <ContactCard key={card.id} card={card} index={i} />)}
                        <div style={{ marginTop: 4 }}>
                            <BroadcastCard />
                        </div>
                    </div>

                    {/* ── RIGHT — form ── */}
                    <div style={{
                        position: "relative", overflow: "hidden", borderRadius: 6,
                        border: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(0,0,0,0.65)",
                        padding: "clamp(22px,4vw,36px) clamp(18px,3.5vw,34px)",
                        backdropFilter: "blur(40px)",
                    }}>
                        {/* Top scanning bar */}
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: "40%", background: `linear-gradient(90deg,transparent,rgba(0,255,231,0.8),transparent)`, animation: "ct-sweep 3.5s ease-in-out infinite" }} />
                        </div>

                        {/* Vertical scan */}
                        <div style={{ position: "absolute", top: 0, bottom: 0, left: "30%", width: 1, overflow: "hidden", pointerEvents: "none", opacity: 0.04 }}>
                            <div style={{ width: "100%", height: "50%", background: `linear-gradient(180deg,transparent,${T.teal},transparent)`, animation: "ct-scanv 4s ease-in-out infinite" }} />
                        </div>

                        {/* Corner accent */}
                        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(191,90,242,0.08)", filter: "blur(50px)", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(0,255,231,0.05)", filter: "blur(50px)", pointerEvents: "none" }} />

                        {/* Spinning deco ring */}
                        <div style={{
                            position: "absolute", right: 24, bottom: 24,
                            width: 60, height: 60, borderRadius: "50%",
                            border: "1px dashed rgba(0,255,231,0.12)",
                            animation: "ct-rot 20s linear infinite",
                            pointerEvents: "none",
                        }}>
                            <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1px dashed rgba(191,90,242,0.1)" }} />
                        </div>

                        <div style={{ position: "relative", zIndex: 1 }}>
                            {/* Form header */}
                            <div style={{ marginBottom: 30 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                                    <Zap size={12} style={{ color: T.purple }} />
                                    <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.38em", color: "rgba(191,90,242,0.75)", textTransform: "uppercase" }}>
                                        TRANSMISSION · COMPOSE
                                    </span>
                                </div>
                                <h3 style={{
                                    fontFamily: T.display,
                                    fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
                                    fontWeight: 800,
                                    letterSpacing: "0.04em",
                                    lineHeight: 0.9,
                                    textTransform: "uppercase",
                                    color: "#fff",
                                    margin: "0 0 12px",
                                }}>
                                    TRANSMIT<br />
                                    <span style={{ color: T.teal, textShadow: `0 0 24px rgba(0,255,231,0.3)` }}>YOUR PROJECT</span>
                                </h3>
                                <p style={{ fontFamily: T.body, fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                                    This form routes directly to my email client — hit send and your signal gets through.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <div className="ct-form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                                    <TermInput name="name" label="Callsign / Name" placeholder="your-name" required />
                                    <TermInput name="email" label="Return frequency" placeholder="email@domain.com" required type="email" />
                                </div>
                                <TermInput name="message" label="Message payload" placeholder="describe your project..." required multiline rows={6} />

                                {/* Submit */}
                                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                    <button
                                        type="submit"
                                        onMouseEnter={() => setBtnHov(true)}
                                        onMouseLeave={() => setBtnHov(false)}
                                        style={{
                                            display: "inline-flex", alignItems: "center", gap: 10,
                                            padding: "13px 32px", borderRadius: 3, border: `1px solid ${T.teal}`,
                                            cursor: "pointer",
                                            background: btnHov ? "rgba(0,255,231,0.12)" : "rgba(0,255,231,0.05)",
                                            fontFamily: T.mono, fontSize: 11, fontWeight: 700,
                                            letterSpacing: "0.32em", textTransform: "uppercase", color: T.teal,
                                            boxShadow: btnHov ? `0 0 32px rgba(0,255,231,0.2), inset 0 0 0 1px rgba(0,255,231,0.1)` : "none",
                                            transform: btnHov ? "translateY(-1px)" : "translateY(0)",
                                            transition: `all 0.3s ${T.ease}`,
                                        }}
                                    >
                                        {sending
                                            ? <><span style={{ opacity: 0.7 }}>TRANSMITTING</span><span style={{ animation: "ct-blink 0.6s step-end infinite" }}>_</span></>
                                            : <>TRANSMIT <Send size={13} style={{ transform: btnHov ? "translate(2px,-2px)" : "translate(0,0)", transition: `transform 0.3s ${T.ease}` }} /></>
                                        }
                                    </button>

                                    <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase" }}>
                                        · OPENS MAIL CLIENT
                                    </span>
                                </div>
                            </form>

                            {/* Footer status bar */}
                            <div style={{
                                marginTop: 24, paddingTop: 16,
                                borderTop: "1px solid rgba(255,255,255,0.05)",
                                display: "flex", alignItems: "center", gap: 8,
                            }}>
                                {["HTML", "CSS", "REACT", "VITE", "REMOTE"].map(tag => (
                                    <span
                                        key={tag}
                                        className="ct-tag"
                                        style={{
                                            padding: "3px 9px", borderRadius: 2,
                                            border: "1px solid rgba(255,255,255,0.07)",
                                            fontFamily: T.mono, fontSize: 9,
                                            letterSpacing: "0.28em", textTransform: "uppercase",
                                            color: "rgba(255,255,255,0.3)",
                                            transition: "all 0.2s ease",
                                            cursor: "default",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom border */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(0,255,231,0.25), rgba(191,90,242,0.2), transparent)",
            }} />
        </section>
    );
};

export default Contact;