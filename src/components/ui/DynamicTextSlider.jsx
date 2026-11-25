import { useEffect, useRef, useState, useCallback } from "react";

const MIN_RANGE = 50;
const ROTATION_DEG = -2.76;
const THETA = ROTATION_DEG * (Math.PI / 180);
const COS_THETA = Math.cos(THETA);
const SIN_THETA = Math.sin(THETA);

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const OpenSourceSlider = ({
  text = "Let's Work",
  width: initialWidth,
  height = 70,
  handleSize = 28,
}) => {
  const width = initialWidth > 0 ? initialWidth + 35 : 350;

  const [left, setLeft] = useState(0);
  const [rightValue, setRightValue] = useState(null);
  const [draggingHandle, setDraggingHandle] = useState(null);

  const right = clamp(rightValue ?? width, MIN_RANGE, width);
  const handleMidpoint = (left + right) / 2;
  const sliderCenter = width / 2;
  const deviationFactor = sliderCenter ? (handleMidpoint - sliderCenter) / sliderCenter : 0;
  const dynamicRotation = ROTATION_DEG + deviationFactor * 3;

  const leftRef = useRef(left);
  const rightRef = useRef(right);
  const dragRef = useRef(null);

  useEffect(() => {
    leftRef.current = left;
    rightRef.current = right;
  }, [left, right]);

  const startDrag = (handle, event) => {
    event.preventDefault();
    dragRef.current = {
      handle,
      startX: event.clientX,
      startY: event.clientY,
      initialLeft: leftRef.current,
      initialRight: rightRef.current,
    };
    setDraggingHandle(handle);
  };

  const moveDrag = useCallback(
    (event) => {
      if (!dragRef.current) return;
      const { handle, startX, startY, initialLeft, initialRight } = dragRef.current;
      const dX = event.clientX - startX;
      const dY = event.clientY - startY;
      const projected = dX * COS_THETA + dY * SIN_THETA;
      if (handle === "left") {
        setLeft(clamp(initialLeft + projected, 0, rightRef.current - MIN_RANGE));
      } else {
        setRightValue(clamp(initialRight + projected, leftRef.current + MIN_RANGE, width));
      }
    },
    [width]
  );

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDraggingHandle(null);
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [moveDrag, endDrag]);

  return (
    <div
      className="relative select-none transition-transform duration-300 ease-out"
      style={{ width, height, transform: `rotate(${dynamicRotation}deg)` }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 bg-white/[0.03] shadow-[0_0_35px_rgba(120,120,255,0.25)]" />

      {["left", "right"].map((handle) => {
        const x = handle === "left" ? left : right - handleSize;
        return (
          <button
            key={handle}
            type="button"
            aria-label={`${handle} slider handle`}
            onPointerDown={(event) => startDrag(handle, event)}
            className={`absolute top-0 z-20 flex h-full w-7 cursor-ew-resize items-center justify-center rounded-full border border-white/25 bg-black/70 backdrop-blur-xl transition-transform duration-150 ${draggingHandle === handle ? "scale-125" : "hover:scale-110"
              }`}
            style={{ left: x, touchAction: "none" }}
          >
            <span className="h-8 w-1 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </button>
        );
      })}

      <div
        className="pointer-events-none z-10 flex h-full w-full items-center justify-center overflow-hidden px-4 text-5xl font-black tracking-tighter text-white md:text-7xl"
        style={{ clipPath: `inset(0 ${width - right}px 0 ${left}px round 1rem)` }}
      >
        {text}
      </div>
    </div>
  );
};

const DynamicTextSlider = ({ text = "Let's Work" }) => {
  const measureRef = useRef(null);
  const [textWidth, setTextWidth] = useState(420);

  useEffect(() => {
    const measure = () => {
      setTextWidth(measureRef.current?.clientWidth ?? 420);
    };
    measure();
    window.addEventListener("resize", measure);
    const resizeObserver = new ResizeObserver(measure);
    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
    }
    return () => {
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <span
        ref={measureRef}
        className="absolute -left-[9999px] whitespace-nowrap px-4 text-5xl font-black tracking-tighter md:text-7xl"
      >
        {text}
      </span>
      <OpenSourceSlider text={text} width={textWidth} />
    </div>
  );
};

export default DynamicTextSlider;