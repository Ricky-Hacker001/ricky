import { useEffect, useRef, useState } from "react";
import { markBooted } from "@/lib/boot";
import { prefersReducedMotion } from "@/lib/device";

const KEY = "ricky.booted";
const BAR = 18;

/**
 * Short boot sequence (~1s) shown once per session. It never waits for
 * assets — the page is already rendered underneath and the 3D avatar keeps
 * loading progressively after the overlay fades.
 */
const Loader = () => {
  const [show] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY) && !prefersReducedMotion();
    } catch {
      return !prefersReducedMotion();
    }
  });
  const [phase, setPhase] = useState<"init" | "load" | "done" | "gone">("init");
  const bar = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!show) {
      markBooted();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode */
    }

    const start = performance.now();
    const DURATION = 900;
    let raf = 0;
    let loading = false;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const filled = Math.round(eased * BAR);
      if (bar.current) bar.current.textContent = "█".repeat(filled) + "░".repeat(BAR - filled);
      if (pct.current) pct.current.textContent = `${Math.round(eased * 100)}%`;
      if (p > 0.25 && !loading) {
        loading = true;
        setPhase("load");
      }
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("done");
        markBooted();
        window.setTimeout(() => setPhase("gone"), 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  if (!show || phase === "gone") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9000] grid place-items-center bg-[var(--bg)] transition-[opacity,clip-path] [transition-duration:650ms] [transition-timing-function:cubic-bezier(.7,0,.2,1)]"
      style={{
        opacity: phase === "done" ? 0 : 1,
        clipPath: phase === "done" ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}
    >
      <div className="w-[min(420px,calc(100%-48px))] font-mono text-[12px] tracking-[0.14em]">
        <div className="mb-5 flex items-center gap-2 text-[var(--text-dim)]">
          <span className="h-1.5 w-1.5 bg-signal-red" />
          INITIALIZING RICKY.TECHIE<span className="caret">_</span>
        </div>
        <div className={`mb-2 text-[var(--muted)] transition-opacity duration-300 ${phase === "init" ? "opacity-0" : "opacity-100"}`}>
          LOADING SYSTEMS
        </div>
        <div className="flex items-center justify-between gap-4 text-white">
          <span>
            [<span ref={bar} className="text-signal-red">{"░".repeat(BAR)}</span>]
          </span>
          <span ref={pct}>0%</span>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2 text-[9.5px] text-[var(--muted)]">
          <span>CYBER ✓</span>
          <span>CODE ✓</span>
          <span>HARDWARE ✓</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
