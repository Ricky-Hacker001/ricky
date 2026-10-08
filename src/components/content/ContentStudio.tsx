import { Link } from "react-router-dom";
import { ArrowUpRight, Play, FileText } from "lucide-react";
import { CONTENT_CHANNELS, type Channel } from "@/data/social";
import { blogs } from "@/data/blogs";
import SectionHeading from "@/components/ui/SectionHeading";

/** CSS-only "thumbnail" per channel — terminal overlays & diagrams, no image downloads. */
const Thumb = ({ c }: { c: Channel }) => {
  if (c.key === "youtube")
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_70%_20%,rgba(255,45,61,0.25),transparent_60%),linear-gradient(160deg,#121419,#07080a)]" />
        <div className="absolute left-5 top-5 font-display text-[2.6rem] font-bold leading-[0.85] tracking-[-0.04em]">
          BUILD
          <br />
          <span className="text-signal">LOG #</span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-md border border-white/10 bg-black/60 p-2.5 font-mono text-[10px] text-white/70 backdrop-blur">
          <span className="text-signal-red">$</span> ./explain --hardware --security
        </div>
        <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-signal-red text-white shadow-[0_10px_30px_-8px_var(--red-glow)] transition-transform duration-500 group-hover:scale-110">
          <Play size={18} fill="currentColor" />
        </span>
        <div className="absolute bottom-[68px] left-5 right-5 h-[3px] rounded bg-white/10">
          <div className="h-full w-[38%] rounded bg-signal-red transition-[width] [transition-duration:1.2s] ease-out group-hover:w-[72%]" />
        </div>
      </div>
    );
  if (c.key === "instagram")
    return (
      <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-sm bg-[#0d0f13]"
            style={{ background: i % 4 === 0 ? "linear-gradient(150deg,#2a0d12,#0b0c0f)" : i % 3 === 0 ? "linear-gradient(150deg,#0d1a20,#0b0c0f)" : "#0f1216" }}
          >
            <svg viewBox="0 0 60 80" className="absolute inset-0 h-full w-full opacity-70" aria-hidden>
              {i % 2 === 0 ? (
                <>
                  <rect x="18" y="26" width="24" height="24" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" />
                  <path d="M18 34 H8 M42 42 H52 M30 26 V14" stroke="#ff2d3d" />
                </>
              ) : (
                <>
                  <circle cx="30" cy="40" r="12" fill="none" stroke="rgba(255,255,255,0.35)" />
                  <circle cx="30" cy="40" r="3" fill="#ff2d3d" />
                </>
              )}
            </svg>
            {i === 0 && <Play size={12} className="absolute right-1.5 top-1.5 text-white/80" fill="currentColor" />}
          </div>
        ))}
      </div>
    );
  return (
    <div className="absolute inset-0 bg-[linear-gradient(160deg,#101318,#07080a)] p-5 font-mono text-[10.5px] leading-[1.9] text-white/60">
      <div>
        <span className="text-signal-red">❯</span> git log --oneline
      </div>
      {["feat: recon module", "fix: wifi monitor alerts", "chore: k8s manifests", "feat: pre-push hook"].map((l, i) => (
        <div key={l} className="truncate">
          <span className="text-amber-300/70">{(0xa3f1 + i * 2731).toString(16)}</span> {l}
        </div>
      ))}
      <div className="mt-3 grid grid-cols-[repeat(16,1fr)] gap-[3px]">
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className="aspect-square rounded-[2px] bg-white/[0.06]" />
        ))}
      </div>
    </div>
  );
};

const ContentStudio = () => {
  const posts = [...blogs].slice(0, 4);
  return (
    <section id="content" aria-labelledby="content-title" className="relative scroll-mt-24 py-[clamp(96px,14vw,180px)]">
      <div className="wrap">
        <SectionHeading
          id="content-title"
          index="07"
          label="TECHNICAL CREATOR"
          title={["BUILD.", <span key="b" className="text-signal">BREAK.</span>, "EXPLAIN."]}
          subtitle="I document the work — build logs, security breakdowns and hardware experiments. Technical storytelling, not influencer branding."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {CONTENT_CHANNELS.map((c, i) => {
            const Icon = c.icon;
            return (
              <a
                key={c.key}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="reveal panel group relative flex flex-col overflow-hidden transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-white/20"
                style={{ ["--d" as string]: `${i * 90}ms` }}
              >
                <div className="relative aspect-[16/11] overflow-hidden border-b border-[var(--line)]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                    <Thumb c={c} />
                  </div>
                  <div className="scanline" />
                </div>
                <div className="flex items-center gap-4 p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--line)] text-[var(--text-dim)] transition-colors group-hover:border-signal-red/40 group-hover:text-signal-red">
                    <Icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold">{c.label}</span>
                    <span className="block font-mono text-[10.5px] tracking-[0.12em] text-[var(--muted)]">
                      {c.handle} · {c.format}
                    </span>
                  </span>
                  <ArrowUpRight size={17} className="text-[var(--muted)] transition-colors group-hover:text-white" />
                </div>
                <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-[var(--text-dim)]">{c.blurb}</p>
              </a>
            );
          })}
        </div>

        {/* written research */}
        <div className="mt-16">
          <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.24em] text-signal-red">[07.1]</span>
              <h3 className="eyebrow">RESEARCH & WRITEUPS</h3>
            </div>
            <Link to="/blog" className="link-line flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[var(--text-dim)] hover:text-white">
              ALL POSTS <ArrowUpRight size={13} />
            </Link>
          </div>
          <ul className="reveal divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {posts.map((p, i) => (
              <li key={p.id}>
                <Link
                  to={`/blog/${p.id}`}
                  data-cursor="READ"
                  className="group grid items-center gap-2 py-5 transition-colors sm:grid-cols-[70px_1fr_auto] sm:gap-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--muted)]">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-signal-red-hot">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[13.5px] text-[var(--text-dim)]">{p.description}</span>
                  </span>
                  <span className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.16em] text-[var(--muted)]">
                    <FileText size={13} /> {p.date.toUpperCase()}
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContentStudio;
