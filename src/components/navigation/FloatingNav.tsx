import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TerminalSquare, Menu, X, FileText } from "lucide-react";
import { NAV, PROFILE } from "@/data/profile";
import { scrollToId } from "@/hooks/useActiveSection";

type Props = { active: string; onTerminal: () => void };

/** Floating glass navigation. Compacts on scroll, sliding red active indicator. */
const FloatingNav = ({ active, onTerminal }: Props) => {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = false;
    const onScroll = () => {
      const next = window.scrollY > 40;
      if (next !== last) {
        last = next;
        setCompact(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed left-1/2 z-[60] -translate-x-1/2 transition-all duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] ${
        compact ? "top-3 w-[min(980px,calc(100%-20px))]" : "top-5 w-[min(1240px,calc(100%-24px))]"
      }`}
    >
      <div
        className={`glass flex items-center justify-between rounded-2xl pl-3 pr-2 transition-all duration-500 ${
          compact ? "py-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]" : "py-2.5"
        }`}
      >
        <a href="#top" onClick={(e) => go(e, "top")} className="flex items-center gap-2.5" aria-label="Ricky — back to top">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-gradient-to-b from-white/10 to-transparent font-display text-sm font-bold">
            R
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 bg-signal-red shadow-[0_0_8px_var(--red-glow)]" />
          </span>
          <span className={`font-mono text-[11px] tracking-[0.2em] text-[var(--text-dim)] transition-opacity ${compact ? "hidden sm:inline" : ""}`}>
            {PROFILE.handle}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={on ? "true" : undefined}
                    className={`relative block rounded-lg px-3 py-2 font-mono text-[10.5px] tracking-[0.16em] transition-colors ${
                      on ? "text-white" : "text-[var(--muted)] hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 bg-signal-red shadow-[0_0_8px_var(--red-glow)] transition-all duration-300 ${
                        on ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-[10.5px] tracking-[0.16em] text-[var(--text-dim)] transition-colors hover:text-white md:flex"
          >
            <FileText size={13} /> RESUME
          </a>
          <button
            onClick={onTerminal}
            className="hidden items-center gap-2 rounded-lg border border-[var(--line-strong)] px-3 py-2 font-mono text-[10.5px] tracking-[0.14em] text-[var(--text-dim)] transition-colors hover:border-signal-red/50 hover:text-white sm:flex"
          >
            <TerminalSquare size={13} /> TERMINAL
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line-strong)] text-[var(--text-dim)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="glass mt-2 rounded-2xl p-2 lg:hidden">
          <ul className="grid gap-0.5">
            {NAV.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-mono text-xs tracking-[0.16em] ${
                    active === item.id ? "bg-white/[0.05] text-white" : "text-[var(--text-dim)]"
                  }`}
                >
                  {item.label}
                  <span className="text-[10px] text-[var(--muted)]">{String(i).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[var(--line)] pt-2">
            <Link to="/blog" className="btn btn-ghost !px-2 !py-3 !text-[10px]">
              BLOG
            </Link>
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-2 !py-3 !text-[10px]">
              RESUME
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onTerminal();
              }}
              className="btn btn-ghost !px-2 !py-3 !text-[10px]"
            >
              SHELL
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default FloatingNav;
