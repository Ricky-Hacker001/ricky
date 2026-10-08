import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";

/**
 * Immersive project panel. Hover: 3D tilt, visual parallax, brighter border,
 * scanline sweep, expanding number and revealed specs. All pointer math is
 * written to CSS variables — zero React re-renders while moving.
 */
const ProjectPanel = ({ project, flip }: { project: Project; flip: boolean }) => {
  const ref = useRef<HTMLElement>(null);
  const fine = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !fine || still) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.classList.add("is-active");
    el.style.setProperty("--ry", `${px * 5}deg`);
    el.style.setProperty("--rx", `${-py * 4}deg`);
    el.style.setProperty("--px", `${px * 2}`);
    el.style.setProperty("--py", `${py * 2}`);
    el.style.setProperty("--sx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--sy", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-active");
    ["--ry", "--rx"].forEach((v) => el.style.setProperty(v, "0deg"));
    ["--px", "--py"].forEach((v) => el.style.setProperty(v, "0"));
  };

  const primary = project.live ?? project.repo;

  return (
    <div className="reveal">
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-labelledby={`p-${project.code}`}
      className="tilt group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[var(--graphite)] transition-[border-color,box-shadow] duration-500 hover:border-white/20 hover:shadow-[0_40px_120px_-40px_rgba(255,45,61,0.35)]"
    >
      <div className={`grid lg:grid-cols-[1.15fr_1fr] ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* ---------------- visual ---------------- */}
        <a
          href={primary}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="VIEW"
          tabIndex={-1}
          aria-hidden
          className="relative block min-h-[280px] overflow-hidden border-b border-white/[0.06] bg-[radial-gradient(120%_100%_at_70%_0%,rgba(255,45,61,0.10),transparent_55%),#08090c] sm:min-h-[360px] lg:min-h-[460px] lg:border-b-0"
        >
          <div className="grid-bg absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <ProjectVisual kind={project.visual} />
          </div>
          <div className="spot absolute inset-0" />
          <div className="scanline" />
          <span className="text-outline pointer-events-none absolute -bottom-6 left-4 font-display text-[clamp(7rem,14vw,12rem)] font-bold leading-none tracking-[-0.06em] transition-all duration-700 ease-out group-hover:-bottom-2 group-hover:scale-110 group-hover:[-webkit-text-stroke-color:rgba(255,45,61,0.6)]">
            {project.code}
          </span>
          <span className="absolute right-4 top-4 flex items-center gap-2 rounded-md border border-white/10 bg-black/50 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.2em] text-white/70 backdrop-blur">
            <span className={`h-1.5 w-1.5 rounded-full ${project.status === "ACTIVE" ? "bg-emerald-400" : project.status === "SHIPPED" ? "bg-white/70" : "bg-amber-400"}`} />
            {project.status}
          </span>
        </a>

        {/* ---------------- info ---------------- */}
        <div className="relative flex flex-col p-6 sm:p-9">
          <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.22em]">
            <span className="text-signal-red">{project.code}</span>
            <span className="h-px w-8 bg-white/15" />
            <span className="text-[var(--text-dim)]">{project.category}</span>
          </div>
          <h3 id={`p-${project.code}`} className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em]">
            {project.title}
          </h3>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--text-dim)]">{project.description}</p>

          {/* technical readout — revealed on hover (always visible on touch) */}
          <ul className="mt-6 grid gap-1.5 border-l border-signal-red/40 pl-4 font-mono text-[10.5px] tracking-[0.14em] text-[var(--muted)] transition-all duration-500 [@media(hover:hover)]:translate-x-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-x-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100">
            {project.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-5 pt-8">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="link-line flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white"
              >
                <Github size={14} /> GITHUB <ArrowUpRight size={13} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="link-line flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-signal-red-hot"
              >
                LIVE DEMO <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
    </div>
  );
};

export default ProjectPanel;
