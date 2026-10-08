import { NAV } from "@/data/profile";
import { scrollToId } from "@/hooks/useActiveSection";

/** Desktop-only vertical section progress indicator. */
const SectionRail = ({ active }: { active: string }) => {
  const index = Math.max(
    0,
    NAV.findIndex((n) => n.id === active)
  );
  return (
    <nav
      aria-label="Section progress"
      className="fixed right-5 top-1/2 z-[55] hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
    >
      {NAV.map((item, i) => {
        const on = i === index;
        return (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            aria-label={`Go to ${item.label.toLowerCase()}`}
            aria-current={on ? "true" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={`font-mono text-[9.5px] tracking-[0.2em] transition-all duration-300 ${
                on ? "text-white" : "text-[var(--muted)]"
              } translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100`}
            >
              {String(i).padStart(2, "0")} {item.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                on ? "w-8 bg-signal-red shadow-[0_0_8px_var(--red-glow)]" : "w-3.5 bg-white/25 group-hover:w-5 group-hover:bg-white/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SectionRail;
