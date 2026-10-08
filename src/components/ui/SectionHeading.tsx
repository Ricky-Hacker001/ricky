import type { ReactNode } from "react";

/**
 * Section header: mono index + label, massive display title, optional
 * subtitle. Title lines are clip-revealed with a stagger.
 */
const SectionHeading = ({
  index,
  label,
  title,
  subtitle,
  id,
  align = "left",
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode[];
  subtitle?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) => (
  <header className={`mb-14 md:mb-20 ${align === "center" ? "text-center" : ""} ${className}`}>
    <div className={`reveal mb-6 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
      <span className="font-mono text-[11px] tracking-[0.24em] text-signal-red">[{index}]</span>
      <span className="eyebrow">{label}</span>
    </div>
    <h2 id={id} className="display text-[clamp(2.6rem,7.4vw,6.6rem)]">
      {title.map((line, i) => (
        <span key={i} className="clip-reveal block pb-[0.06em]" style={{ ["--d" as string]: `${i * 90}ms` }}>
          <span>{line}</span>
        </span>
      ))}
    </h2>
    {subtitle && (
      <p
        className={`reveal mt-6 max-w-xl text-[15.5px] leading-relaxed text-[var(--text-dim)] ${align === "center" ? "mx-auto" : ""}`}
        style={{ ["--d" as string]: "200ms" }}
      >
        {subtitle}
      </p>
    )}
  </header>
);

export default SectionHeading;
