import { useEffect, useMemo, useRef, useState } from "react";
import { SKILL_NODES } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Technology constellation. Lightweight by design: HTML buttons + one SVG,
 * tilted in CSS 3D by the pointer (CSS variables written in rAF, no React
 * renders). Hover / focus a category to deploy its technologies.
 */

const W = 1000;
const H = 620;

const Constellation = () => {
  const [active, setActive] = useState<string | null>(null);
  const stage = useRef<HTMLDivElement>(null);

  const nodes = useMemo(
    () =>
      SKILL_NODES.map((n, i) => {
        const a = (i / SKILL_NODES.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(a) * 36;
        const y = 50 + Math.sin(a) * 36;
        // technologies fan outward from the node
        const techs = n.items.map((label, j) => {
          const spread = Math.min(2.4, 0.32 * n.items.length);
          const ta = a - spread / 2 + (spread * j) / Math.max(n.items.length - 1, 1);
          const r = 15 + (j % 2) * 4.5;
          return { label, x: x + Math.cos(ta) * r * 0.85, y: y + Math.sin(ta) * r * 1.35 };
        });
        return { ...n, a, x, y, techs };
      }),
    []
  );

  // pointer tilt
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--ry", `${tx * 7}deg`);
          el.style.setProperty("--rx", `${16 - ty * 6}deg`);
        });
    };
    const onLeave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "16deg");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const current = nodes.find((n) => n.key === active);

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative scroll-mt-24 py-[clamp(80px,12vw,160px)]">
      <div className="wrap">
        <SectionHeading
          id="skills-title"
          index="02"
          label="TECH CONSTELLATION"
          title={["ONE NODE.", <span key="b" className="text-outline">MANY SYSTEMS.</span>]}
          subtitle="Everything connects back to the same engineer. Hover or focus a domain to deploy the tools behind it."
        />

        {/* ---------- desktop / tablet constellation ---------- */}
        <div className="reveal relative hidden md:block" style={{ perspective: "1400px" }}>
          <div
            ref={stage}
            className="relative mx-auto aspect-[1000/620] w-full max-w-[1100px] transition-transform duration-700 ease-out"
            style={{ transform: "rotateX(var(--rx, 16deg)) rotateY(var(--ry, 0deg))", transformStyle: "preserve-3d" }}
          >
            {/* orbit rings + links */}
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden>
              {[0.36, 0.24, 0.12].map((r, i) => (
                <ellipse key={r} cx={W / 2} cy={H / 2} rx={W * r} ry={H * r} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray={i === 0 ? "2 6" : undefined} />
              ))}
              {nodes.map((n) => {
                const on = active === n.key;
                return (
                  <g key={n.key} style={{ opacity: active && !on ? 0.18 : 1, transition: "opacity .4s" }}>
                    <line x1={W / 2} y1={H / 2} x2={(n.x / 100) * W} y2={(n.y / 100) * H} stroke={on ? "#ff2d3d" : "rgba(255,255,255,0.16)"} strokeWidth={on ? 1.4 : 1} />
                    {on &&
                      n.techs.map((t) => (
                        <line
                          key={t.label}
                          x1={(n.x / 100) * W}
                          y1={(n.y / 100) * H}
                          x2={(t.x / 100) * W}
                          y2={(t.y / 100) * H}
                          stroke="rgba(255,45,61,0.45)"
                          strokeDasharray="2 4"
                        />
                      ))}
                  </g>
                );
              })}
            </svg>

            {/* core */}
            <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-signal-red/40 bg-[radial-gradient(circle_at_35%_30%,#2a0e12,#0b0c0f_70%)] shadow-[0_0_80px_-20px_rgba(255,45,61,0.7)]">
              <span className="absolute inset-[-14px] rounded-full border border-white/[0.06]" />
              <span className="absolute inset-[-14px] rounded-full border-t border-signal-red/60" style={{ animation: "spin 9s linear infinite" }} />
              <span className="font-display text-xl font-bold tracking-[0.18em]">RICKY</span>
            </div>

            {/* category nodes */}
            {nodes.map((n) => {
              const on = active === n.key;
              return (
                <button
                  key={n.key}
                  onMouseEnter={() => setActive(n.key)}
                  onFocus={() => setActive(n.key)}
                  onClick={() => setActive((p) => (p === n.key ? null : n.key))}
                  aria-pressed={on}
                  aria-describedby="constellation-readout"
                  data-cursor="EXPLORE"
                  className={`absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.18em] backdrop-blur-sm transition-all duration-300 ${
                    on
                      ? "border-signal-red/70 bg-signal-red/15 text-white shadow-[0_0_30px_-8px_rgba(255,45,61,0.8)]"
                      : active
                        ? "border-white/[0.06] bg-black/40 text-white/35"
                        : "border-white/[0.12] bg-black/50 text-[var(--text-dim)] hover:text-white"
                  }`}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-signal-red" : "bg-white/40"}`} />
                  {n.label}
                </button>
              );
            })}

            {/* deployed technologies */}
            {current?.techs.map((t, j) => (
              <span
                key={`${current.key}-${t.label}`}
                className="pointer-events-none absolute z-[1] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[rgba(10,12,16,0.85)] px-2.5 py-1 font-mono text-[10.5px] text-white/85"
                style={{ left: `${t.x}%`, top: `${t.y}%`, animation: `tech-in .45s cubic-bezier(.2,.8,.2,1) both`, animationDelay: `${j * 35}ms` }}
              >
                {t.label}
              </span>
            ))}
          </div>
          <style>{`@keyframes tech-in{from{opacity:0;transform:translate(-50%,-50%) scale(.6)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}`}</style>

          <p id="constellation-readout" className="mt-6 text-center font-mono text-[11px] tracking-[0.18em] text-[var(--muted)]" aria-live="polite">
            {current ? `${current.label} → ${current.items.join(" · ")}` : "// HOVER A NODE TO TRACE THE STACK"}
          </p>
        </div>

        {/* ---------- mobile: stacked readout ---------- */}
        <div className="grid gap-3 md:hidden">
          {SKILL_NODES.map((n) => (
            <div key={n.key} className="reveal panel p-4">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 bg-signal-red" />
                {n.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {n.items.map((it) => (
                  <span key={it} className="chip">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Constellation;
