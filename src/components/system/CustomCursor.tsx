import { useEffect, useRef } from "react";
import { useIsTouch } from "@/hooks/useFx";
import { pointer, bindPointer } from "@/lib/pointer";

/**
 * Dot + trailing ring. Modes come from the hovered element:
 *   data-cursor="VIEW" | "EXPLORE" | "OPEN" …  → labelled ring
 *   any link / button                          → plain ring
 * No React state: everything is written straight to the DOM, and the rAF loop
 * sleeps once the ring has caught up with the pointer.
 */
const CustomCursor = () => {
  const touch = useIsTouch();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (touch) return;
    bindPointer();
    document.body.classList.add("has-cursor");

    const pos = { x: pointer.x, y: pointer.y };
    let raf = 0;
    let lastTarget: Element | null = null;

    const loop = () => {
      pos.x += (pointer.x - pos.x) * 0.2;
      pos.y += (pointer.y - pos.y) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(pointer.x - pos.x) + Math.abs(pointer.y - pos.y) > 0.3) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!raf) raf = requestAnimationFrame(loop);

      const t = e.target as Element | null;
      if (t === lastTarget || !ring.current) return;
      lastTarget = t;
      const labelled = t?.closest?.<HTMLElement>("[data-cursor]");
      if (labelled) {
        ring.current.dataset.mode = "label";
        if (label.current) label.current.textContent = labelled.dataset.cursor ?? "";
      } else if (t?.closest?.("a, button, [role='button'], summary, label")) {
        ring.current.dataset.mode = "hover";
      } else {
        ring.current.dataset.mode = "";
      }
    };

    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.dataset.mode = "";
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-cursor");
    };
  }, [touch]);

  if (touch) return null;

  return (
    <>
      <div ref={dot} className="cursor cursor-dot" aria-hidden />
      <div ref={ring} className="cursor cursor-ring" aria-hidden>
        <span ref={label} />
      </div>
    </>
  );
};

export default CustomCursor;
