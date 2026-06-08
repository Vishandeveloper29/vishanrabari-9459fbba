import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   PERSPECTIVE CODE TERMINAL
───────────────────────────────────────────────────────────────────────────── */

const fields = [
    { key: "role", value: '"Frontend Dev"', vcolor: "#fc81b8" },
    { key: "location", value: '"Gandhidham, IN"', vcolor: "#f97316" },
    { key: "passion", value: '"Build cool stuff"', vcolor: "#68d391" },
    { key: "repos", value: "41", vcolor: "#00ffe7" },
    { key: "experience", value: '"1 Year"', vcolor: "#a855f7" },
    { key: "projects", value: "7", vcolor: "#f97316" },
    { key: "status", value: '"Open to Work"', vcolor: "#ffd700" },
];

const TerminalStats = ({ trigger = true }) => {
    const [visibleFields, setVisibleFields] = useState(0);
    const [headerDone, setHeaderDone] = useState(false);
    const [closeDone, setCloseDone] = useState(false);
    const [cursorOn, setCursorOn] = useState(true);

    const timers = useRef([]);

    useEffect(() => {
        if (!trigger) return;

        timers.current.forEach(clearTimeout);
        timers.current = [];

        setVisibleFields(0);
        setHeaderDone(false);
        setCloseDone(false);

        timers.current.push(setTimeout(() => setHeaderDone(true), 300));

        fields.forEach((_, index) => {
            timers.current.push(
                setTimeout(() => setVisibleFields(index + 1), 600 + index * 230)
            );
        });

        timers.current.push(
            setTimeout(() => setCloseDone(true), 600 + fields.length * 230 + 250)
        );

        return () => timers.current.forEach(clearTimeout);
    }, [trigger]);

    useEffect(() => {
        const id = setInterval(() => {
            setCursorOn((prev) => !prev);
        }, 520);

        return () => clearInterval(id);
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap');

        @keyframes term-float {
          0%, 100% {
            transform: perspective(900px) rotateX(6deg) rotateY(-8deg) rotateZ(1.2deg) translateY(0px);
          }
          50% {
            transform: perspective(900px) rotateX(6deg) rotateY(-8deg) rotateZ(1.2deg) translateY(-10px);
          }
        }

        @keyframes underlight-pulse {
          0%, 100% {
            opacity: 0.65;
            transform: translateX(-50%) scaleX(1) scaleY(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1.08) scaleY(1.25);
          }
        }

        @keyframes wide-underlight-pulse {
          0%, 100% {
            opacity: 0.32;
            transform: translateX(-50%) scaleX(1);
          }
          50% {
            opacity: 0.58;
            transform: translateX(-50%) scaleX(1.12);
          }
        }

        @keyframes scanline-roll {
          0% {
            top: -2px;
            opacity: 0;
          }
          8% {
            opacity: 0.85;
          }
          92% {
            opacity: 0.85;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes terminal-flicker {
          0%, 100% {
            opacity: 1;
          }
          91% {
            opacity: 1;
          }
          92% {
            opacity: 0.88;
          }
          93% {
            opacity: 1;
          }
          97% {
            opacity: 0.94;
          }
          98% {
            opacity: 1;
          }
        }

        .terminal-card {
          animation: term-float 6s ease-in-out infinite, terminal-flicker 9s ease-in-out infinite;
        }

        .terminal-underlight-main {
          animation: underlight-pulse 4s ease-in-out infinite;
        }

        .terminal-underlight-wide {
          animation: wide-underlight-pulse 4s ease-in-out infinite 0.6s;
        }

        .terminal-scanline {
          animation: scanline-roll 5s linear infinite;
        }
      `}</style>

            <div className="relative flex w-full items-center justify-center px-6 pb-20 pt-10 lg:justify-end">
                <div className="terminal-underlight-main pointer-events-none absolute bottom-4 left-1/2 z-0 h-8 w-[80%] rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-2xl" />

                <div className="terminal-underlight-wide pointer-events-none absolute bottom-1 left-1/2 z-0 h-5 w-[115%] rounded-full bg-gradient-to-r from-transparent via-fuchsia-500/55 to-transparent blur-xl" />

                <div
                    className="terminal-card relative z-10 w-full max-w-[360px] overflow-hidden rounded-2xl border border-purple-400/20 bg-[#080514]/95 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(124,58,237,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                >
                    <div className="terminal-scanline pointer-events-none absolute inset-x-0 z-20 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />

                    <div
                        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundSize: "180px 180px",
                        }}
                    />

                    <div className="relative z-10 flex items-center justify-between border-b border-purple-400/10 bg-purple-500/[0.03] px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.8)]" />
                            <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.8)]" />
                            <span className="h-[11px] w-[11px] rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.8)]" />
                        </div>

                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300/45">
                            vishan.config.js
                        </span>

                        <span className="text-[9px] uppercase tracking-[0.18em] text-yellow-300/50">
                            JS
                        </span>
                    </div>

                    <div className="relative z-10 px-6 py-5 text-[13px] leading-[2]">
                        <div
                            className="transition-all duration-500"
                            style={{
                                opacity: headerDone ? 1 : 0,
                                transform: headerDone ? "translateX(0)" : "translateX(-10px)",
                            }}
                        >
                            <span className="font-medium text-purple-300">const </span>
                            <span className="font-semibold text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.7)]">
                                vishan
                            </span>
                            <span className="text-white/35"> = </span>
                            <span className="text-white/55">{"{"}</span>
                        </div>

                        <div className="pl-5">
                            {fields.map((field, index) => (
                                <div
                                    key={field.key}
                                    className="flex items-baseline whitespace-nowrap transition-all duration-500"
                                    style={{
                                        opacity: visibleFields > index ? 1 : 0,
                                        transform:
                                            visibleFields > index
                                                ? "translateX(0)"
                                                : "translateX(-10px)",
                                    }}
                                >
                                    <span className="text-blue-300">{field.key}</span>
                                    <span className="mr-2 text-white/25">:</span>

                                    <span
                                        className="font-medium"
                                        style={{
                                            color: field.vcolor,
                                            textShadow: `0 0 14px ${field.vcolor}66`,
                                        }}
                                    >
                                        {field.value}
                                    </span>

                                    <span className="text-white/20">,</span>

                                    {visibleFields === index + 1 && !closeDone && (
                                        <span
                                            className="ml-1 inline-block h-[14px] w-[7px] rounded-sm bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.95)]"
                                            style={{ opacity: cursorOn ? 1 : 0 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div
                            className="transition-all duration-500"
                            style={{
                                opacity: closeDone ? 1 : 0,
                                transform: closeDone ? "translateX(0)" : "translateX(-8px)",
                            }}
                        >
                            <span className="text-white/55">{"};"}</span>
                        </div>

                        {closeDone && (
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-purple-300/40">▶</span>
                                <span className="text-green-400/80">ready_for_work</span>
                                <span
                                    className="inline-block h-[14px] w-[7px] rounded-sm bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.95)]"
                                    style={{ opacity: cursorOn ? 1 : 0 }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="relative z-10 flex items-center justify-between border-t border-purple-400/10 bg-purple-500/[0.025] px-4 py-2">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-purple-300/35">
                            JavaScript
                        </span>

                        <span className="text-[9px] uppercase tracking-[0.18em] text-green-400/60">
                            ● Open To Work
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TerminalStats;