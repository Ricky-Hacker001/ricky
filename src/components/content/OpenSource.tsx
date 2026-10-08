import { useMemo } from "react";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { SOCIALS } from "@/data/social";
import { useGithub } from "@/hooks/useGithub";
import { useNearViewport } from "@/hooks/useFx";
import SectionHeading from "@/components/ui/SectionHeading";

const LANG: Record<string, string> = {
  Python: "#63d9ff",
  JavaScript: "#f2d06b",
  TypeScript: "#5b9cff",
  Kotlin: "#b07cff",
  PHP: "#8e96c8",
  "C++": "#ff8a5c",
};

const WEEKS = 13;

/** Heatmap of public GitHub events over the last 13 weeks. */
const Activity = ({ data }: { data: Record<string, number> }) => {
  const cells = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - (WEEKS * 7 - 1) - today.getDay());
    return Array.from({ length: WEEKS * 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      return { key, n: d > today ? -1 : data[key] ?? 0 };
    });
  }, [data]);
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const level = (n: number) => (n <= 0 ? 0 : n < 2 ? 1 : n < 5 ? 2 : n < 10 ? 3 : 4);
  const fill = ["rgba(255,255,255,0.05)", "rgba(255,45,61,0.25)", "rgba(255,45,61,0.45)", "rgba(255,45,61,0.7)", "#ff2d3d"];

  return (
    <div>
      <div className="grid grid-flow-col grid-rows-7 gap-[4px]" role="img" aria-label={`${total} public GitHub events in the last ${WEEKS} weeks`}>
        {cells.map((c) => (
          <span
            key={c.key}
            title={c.n >= 0 ? `${c.key}: ${c.n} events` : undefined}
            className="aspect-square rounded-[3px]"
            style={{ background: c.n < 0 ? "transparent" : fill[level(c.n)] }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-[var(--muted)]">
        <span>{total} PUBLIC EVENTS · {WEEKS} WEEKS</span>
        <span className="flex items-center gap-1">
          LESS {fill.map((f) => <span key={f} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: f }} />)} MORE
        </span>
      </div>
    </div>
  );
};

const OpenSource = () => {
  const [ref, near] = useNearViewport<HTMLElement>("500px");
  const gh = useGithub(PROFILE.githubUser, near);
  const loading = gh.status === "idle" || gh.status === "loading";

  return (
    <section ref={ref} id="code" aria-labelledby="code-title" className="relative scroll-mt-24 py-[clamp(80px,12vw,150px)]">
      <div className="wrap">
        <SectionHeading
          id="code-title"
          index="08"
          label="BUILT IN PUBLIC"
          title={["OPEN SOURCE", <span key="c" className="text-outline">/ CODE</span>]}
          subtitle="Live from the GitHub API — cached locally, and never blocking the page."
        />

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          {/* profile + activity */}
          <div className="reveal panel frame flex flex-col p-6">
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="group flex items-center gap-4">
              {gh.avatar ? (
                <img src={gh.avatar} alt="" width={52} height={52} loading="lazy" className="h-[52px] w-[52px] rounded-xl border border-white/10 grayscale" />
              ) : (
                <span className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-white/10 text-[var(--muted)]">
                  <Github size={22} />
                </span>
              )}
              <span>
                <span className="block font-display text-lg font-semibold transition-colors group-hover:text-signal-red-hot">@{PROFILE.githubUser}</span>
                <span className="block font-mono text-[10.5px] tracking-[0.16em] text-[var(--muted)]">github.com/{PROFILE.githubUser}</span>
              </span>
              <ArrowUpRight size={16} className="ml-auto text-[var(--muted)] group-hover:text-white" />
            </a>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["PUBLIC REPOS", gh.publicRepos],
                ["FOLLOWERS", gh.followers],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-xl border border-[var(--line)] bg-black/20 p-4">
                  <div className="font-display text-3xl font-bold">{loading ? <span className="inline-block h-7 w-10 animate-pulse rounded bg-white/10 align-middle" /> : v ?? "—"}</div>
                  <div className="mt-1 font-mono text-[9.5px] tracking-[0.18em] text-[var(--muted)]">{k}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex-1">
              <div className="hud mb-3">// CONTRIBUTION ACTIVITY</div>
              {loading ? (
                <div className="h-[130px] animate-pulse rounded-lg bg-white/[0.04]" />
              ) : gh.activity ? (
                <Activity data={gh.activity} />
              ) : (
                <p className="rounded-lg border border-dashed border-[var(--line)] p-4 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
                  Live activity is unavailable right now (API offline or rate-limited). The full history lives on GitHub.
                </p>
              )}
            </div>
          </div>

          {/* repositories */}
          <div className="reveal grid gap-3 sm:grid-cols-2" aria-busy={loading}>
            {(loading ? Array.from({ length: 6 }, () => null) : gh.repos).map((r, i) =>
              r ? (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className="panel group flex flex-col p-5 transition-colors duration-300 hover:border-white/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-[13.5px] text-white">{r.name}</span>
                    <ArrowUpRight size={14} className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-signal-red" />
                  </div>
                  <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-[var(--text-dim)]">{r.description ?? "—"}</p>
                  <div className="mt-4 flex items-center gap-4 font-mono text-[10.5px] text-[var(--muted)]">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: LANG[r.language] ?? "#9aa3ae" }} />
                        {r.language}
                      </span>
                    )}
                    {r.stars != null && (
                      <span className="flex items-center gap-1">
                        <Star size={11} /> {r.stars}
                      </span>
                    )}
                    {r.pushed && <span className="ml-auto">{r.pushed}</span>}
                  </div>
                </a>
              ) : (
                <div key={i} className="h-[138px] animate-pulse rounded-[14px] border border-[var(--line)] bg-white/[0.02]" />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
