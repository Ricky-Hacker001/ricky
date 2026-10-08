import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { PROFILE } from "@/data/profile";

const Footer = () => (
  <footer className="relative z-[2] border-t border-[var(--line)]">
    <div className="wrap grid gap-8 py-12 md:grid-cols-[1fr_auto_1fr] md:items-end">
      <div>
        <div className="font-display text-2xl font-bold tracking-[0.08em]">
          {PROFILE.handle.split(".")[0]}
          <span className="text-signal-red">.</span>
          {PROFILE.handle.split(".")[1]}
        </div>
        <div className="mt-2 font-mono text-[10.5px] tracking-[0.24em] text-[var(--muted)]">CYBER • CODE • HARDWARE • AI</div>
      </div>

      <div className="flex flex-col items-start gap-1.5 font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] md:items-center">
        <span className="flex items-center gap-2 text-[var(--text-dim)]">
          <span className="dot-live" /> SYSTEM STATUS: ONLINE
        </span>
        <span>© {new Date().getFullYear()} {PROFILE.name.toUpperCase()} · BUILT, BROKEN & REBUILT IN PUBLIC</span>
      </div>

      <div className="flex items-center gap-5 font-mono text-[10.5px] tracking-[0.2em] text-[var(--text-dim)] md:justify-end">
        <Link to="/blog" className="link-line hover:text-white">
          BLOG
        </Link>
        <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="link-line hover:text-white">
          RESUME
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-3 py-2 transition-colors hover:border-white/30 hover:text-white"
        >
          TOP <ArrowUp size={13} />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
