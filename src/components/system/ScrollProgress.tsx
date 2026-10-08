import { useEffect, useRef } from "react";

/** 2px top progress bar — transform only, rAF-throttled. */
const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      if (ref.current) ref.current.style.transform = `scaleX(${Math.min(window.scrollY / max, 1)})`;
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-signal-red-deep via-signal-red to-signal-red-hot"
      style={{ transform: "scaleX(0)" }}
    />
  );
};

export default ScrollProgress;
