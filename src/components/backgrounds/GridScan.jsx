import React from "react";

const GridScan = () => {
  return (
    <div className="gridscan-bg relative h-full w-full overflow-hidden bg-[#05030d]">
      <style>{`
        .gridscan-bg {
          --grid-color: rgba(180, 140, 255, 0.16);
          --grid-strong: rgba(210, 190, 255, 0.28);
          --scan-color: rgba(168, 85, 247, 0.35);
        }

        .gridscan-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: radial-gradient(circle at center, black 0%, black 45%, transparent 82%);
          -webkit-mask-image: radial-gradient(circle at center, black 0%, black 45%, transparent 82%);
          animation: gridMove 16s linear infinite;
        }

        .gridscan-bg::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -20%;
          height: 28%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(168, 85, 247, 0.12),
            rgba(255, 255, 255, 0.16),
            rgba(168, 85, 247, 0.12),
            transparent
          );
          filter: blur(10px);
          animation: scanDown 5.5s ease-in-out infinite;
        }

        .gridscan-line {
          position: absolute;
          left: 0;
          right: 0;
          top: -10%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--scan-color),
            rgba(255,255,255,0.75),
            var(--scan-color),
            transparent
          );
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.45);
          animation: scanLine 5.5s ease-in-out infinite;
        }

        .gridscan-glow-1 {
          position: absolute;
          left: 12%;
          top: 18%;
          width: 280px;
          height: 280px;
          border-radius: 999px;
          background: rgba(168, 85, 247, 0.14);
          filter: blur(70px);
        }

        .gridscan-glow-2 {
          position: absolute;
          right: 8%;
          bottom: 12%;
          width: 340px;
          height: 340px;
          border-radius: 999px;
          background: rgba(99, 102, 241, 0.12);
          filter: blur(80px);
        }

        .gridscan-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, transparent 0%, rgba(5, 3, 13, 0.35) 58%, rgba(5, 3, 13, 0.92) 100%),
            linear-gradient(to bottom, rgba(5, 3, 13, 0.15), rgba(5, 3, 13, 0.85));
        }

        @keyframes gridMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 42px 42px;
          }
        }

        @keyframes scanDown {
          0% {
            transform: translateY(-30%);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(520%);
            opacity: 0;
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-30vh);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gridscan-bg::before,
          .gridscan-bg::after,
          .gridscan-line {
            animation: none !important;
          }
        }
      `}</style>

      <div className="gridscan-glow-1" />
      <div className="gridscan-glow-2" />
      <div className="gridscan-line" />
      <div className="gridscan-vignette" />
    </div>
  );
};

export default GridScan;