import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

export const StickyScrollReveal = ({ content = [] }) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!content.length) return;

    const total = content.length - 1;

    const breakpoints = content.map((_, index) =>
      total === 0 ? 0 : index / total
    );

    const closest = breakpoints.reduce((acc, point, index) => {
      const distance = Math.abs(latest - point);
      const currentDistance = Math.abs(latest - breakpoints[acc]);
      return distance < currentDistance ? index : acc;
    }, 0);

    setActiveCard(closest);
  });

  const activeItem = content[activeCard];

  return (
    <div
      ref={containerRef}
      className="sticky-scroll-clean relative flex h-[38rem] overflow-y-auto rounded-[34px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:h-[44rem] md:p-8 lg:gap-10"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_20%_10%,rgba(99,179,237,0.10),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(183,148,246,0.09),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 rounded-[34px] opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 flex-1">
        <div className="max-w-2xl">
          {content.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <div key={item.id} className="my-24 first:mt-6 last:mb-40">
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.34,
                    y: isActive ? 0 : 12,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black"
                      style={{
                        borderColor: `rgba(${item.rgb},0.35)`,
                        backgroundColor: `rgba(${item.rgb},0.10)`,
                        color: item.color,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em]"
                      style={{
                        borderColor: `rgba(${item.rgb},0.30)`,
                        backgroundColor: `rgba(${item.rgb},0.08)`,
                        color: item.color,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h3
                    className="text-3xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-5xl"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-5 max-w-xl text-sm leading-7 text-white/56 md:text-base"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {item.description}
                  </p>

                  {item.extra}

                  <div className="mt-8 block overflow-hidden rounded-[26px] border border-white/10 bg-black/40 lg:hidden">
                    {item.content}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sticky top-8 z-10 hidden h-[34rem] w-[36rem] shrink-0 overflow-hidden rounded-[30px] border border-white/10 bg-black/50 shadow-[0_30px_90px_rgba(0,0,0,0.55)] lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem?.id}
            initial={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="h-full w-full"
          >
            {activeItem?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};