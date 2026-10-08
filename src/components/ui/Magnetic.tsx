import { forwardRef, useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

type Common = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Cursor label, e.g. "OPEN" */
  cursor?: string;
  strength?: number;
};

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Magnetic button with click ripple. Pointer math writes directly to style —
 * no re-renders. Disabled automatically on touch / reduced motion via CSS
 * (the transform simply never gets set without a fine pointer).
 */
const Magnetic = forwardRef<HTMLElement, AsButton | AsLink>(function Magnetic(props, _ref) {
  const { children, variant = "primary", className = "", cursor, strength = 0.28, ...rest } = props;
  const el = useRef<HTMLElement | null>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const fine = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const still = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const magnetic = fine && !still;

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || !el.current) return;
    const r = el.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.current.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
    if (inner.current) inner.current.style.transform = `translate3d(${dx * strength * 0.35}px, ${dy * strength * 0.35}px, 0)`;
  };
  const onLeave = () => {
    if (!el.current) return;
    el.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };
  const onDown = (e: React.PointerEvent) => {
    const t = el.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--rx", `${e.clientX - r.left}px`);
    t.style.setProperty("--ry", `${e.clientY - r.top}px`);
    t.classList.remove("rippling");
    void t.offsetWidth; // restart animation
    t.classList.add("rippling");
  };

  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} transition-transform duration-300 ease-out ${className}`;
  const content = (
    <span ref={inner} className="inline-flex items-center gap-2.5 transition-transform duration-300 ease-out">
      {children}
    </span>
  );
  const handlers = { onPointerMove: onMove, onPointerLeave: onLeave, onPointerDown: onDown };

  if ("href" in rest && rest.href) {
    const { href, ...a } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        ref={(n) => (el.current = n)}
        href={href}
        className={cls}
        data-cursor={cursor}
        {...handlers}
        {...a}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      ref={(n) => (el.current = n)}
      type="button"
      className={cls}
      data-cursor={cursor}
      {...handlers}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});

export default Magnetic;
