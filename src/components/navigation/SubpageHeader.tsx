import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROFILE } from "@/data/profile";

/** Compact glass header for subpages (blog, 404). Section links go back to the home page anchors. */
const SubpageHeader = () => (
  <header className="fixed left-1/2 top-4 z-[60] w-[min(980px,calc(100%-20px))] -translate-x-1/2">
    <div className="glass flex items-center justify-between rounded-2xl py-2 pl-3 pr-2">
      <Link to="/" className="flex items-center gap-2.5" aria-label="Ricky — home">
        <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-gradient-to-b from-white/10 to-transparent font-display text-sm font-bold">
          R
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 bg-signal-red" />
        </span>
        <span className="hidden font-mono text-[11px] tracking-[0.2em] text-[var(--text-dim)] sm:inline">{PROFILE.handle}</span>
      </Link>
      <nav aria-label="Subpage" className="flex items-center gap-1 font-mono text-[10.5px] tracking-[0.16em]">
        <Link to="/blog" className="rounded-lg px-3 py-2 text-[var(--text-dim)] hover:text-white">
          BLOG
        </Link>
        <a href="/#work" className="hidden rounded-lg px-3 py-2 text-[var(--text-dim)] hover:text-white sm:block">
          WORK
        </a>
        <a href="/#contact" className="hidden rounded-lg px-3 py-2 text-[var(--text-dim)] hover:text-white sm:block">
          CONTACT
        </a>
        <Link to="/" className="ml-1 flex items-center gap-2 rounded-lg border border-[var(--line-strong)] px-3 py-2 text-[var(--text-dim)] hover:text-white">
          <ArrowLeft size={13} /> HOME
        </Link>
      </nav>
    </div>
  </header>
);

export default SubpageHeader;
