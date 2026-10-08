import { useState } from "react";
import { Plus } from "lucide-react";
import { EXPERIENCE, ACHIEVEMENTS } from "@/data/experience";
import { EDUCATION, CERTIFICATIONS } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";

const hex = (n: number) => `0x${(n + 1).toString(16).padStart(2, "0").toUpperCase()}`;

const MissionLog = () => {
  const [open, setOpen] = useState<string | null>(EXPERIENCE[0].id);

  return (
    <section id="experience" aria-labelledby="exp-title" className="relative scroll-mt-24 py-[clamp(96px,14vw,180px)]">
      <div className="wrap">
        <SectionHeading
          id="exp-title"
          index="06"
          label="EXPERIENCE"
          title={["MISSION", <span key="l" className="text-outline">LOG</span>]}
          subtitle="Where I've built, shipped, defended and led — each record opens like a system log."
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          {/* ---------- timeline ---------- */}
          <ol className="relative">
            <span className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-signal-red via-white/15 to-transparent" aria-hidden />
            {EXPERIENCE.map((e, i) => {
              const isOpen = open === e.id;
              return (
                <li key={e.id} className="reveal relative pb-4 pl-12" style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <span
                    className={`absolute left-[9px] top-6 h-[13px] w-[13px] rotate-45 border transition-colors ${
                      isOpen ? "border-signal-red bg-signal-red shadow-[0_0_14px_var(--red-glow)]" : "border-white/30 bg-[var(--bg)]"
                    }`}
                    aria-hidden
                  />
                  <div className={`panel overflow-hidden transition-colors duration-300 ${isOpen ? "border-signal-red/30" : "hover:border-white/15"}`}>
                    <button
                      onClick={() => setOpen(isOpen ? null : e.id)}
                      aria-expanded={isOpen}
                      aria-controls={`log-${e.id}`}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="hidden font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] sm:block">LOG {hex(i)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10.5px] tracking-[0.18em] text-signal-red">{e.period}</span>
                        <span className="mt-1.5 block font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em]">
                          {e.role} <span className="text-[var(--muted)]">/ {e.org}</span>
                        </span>
                      </span>
                      <Plus size={18} className={`shrink-0 text-[var(--muted)] transition-transform duration-300 ${isOpen ? "rotate-45 text-white" : ""}`} />
                    </button>

                    <div
                      id={`log-${e.id}`}
                      className="grid transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(.2,.8,.2,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-[var(--line)] bg-black/20 px-5 py-5 font-mono text-[12px] sm:px-6">
                          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
                            {[
                              ["ROLE", e.role],
                              ["ORGANIZATION", e.org],
                              ["PERIOD", `${e.period} · ${e.place}`],
                            ].map(([k, v]) => (
                              <div key={k}>
                                <dt className="text-[9.5px] tracking-[0.22em] text-[var(--muted)]">{k}</dt>
                                <dd className="mt-1 text-white/90">{v}</dd>
                              </div>
                            ))}
                          </dl>
                          <div className="mt-5 text-[9.5px] tracking-[0.22em] text-[var(--muted)]">WHAT I WORKED ON</div>
                          <ul className="mt-2 space-y-2 font-sans text-[14px] leading-relaxed text-[var(--text-dim)]">
                            {e.work.map((w) => (
                              <li key={w} className="flex gap-3">
                                <span className="font-mono text-signal-red">›</span>
                                {w}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 text-[9.5px] tracking-[0.22em] text-[var(--muted)]">TECHNOLOGIES</div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {e.tech.map((t) => (
                              <span key={t} className="chip">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ---------- education / certs ---------- */}
          <aside className="space-y-4">
            <div className="reveal panel frame p-6">
              <div className="hud mb-4 text-signal-red">// EDUCATION</div>
              <h3 className="font-display text-xl font-semibold leading-snug">{EDUCATION.degree}</h3>
              <p className="mt-2 text-[14px] text-[var(--text-dim)]">{EDUCATION.school}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">{EDUCATION.period}</span>
              </div>
              <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-[var(--muted)]">{EDUCATION.focus.toUpperCase()}</p>
            </div>
            <div className="reveal panel p-6">
              <div className="hud mb-4 text-signal-red">// CERTIFICATIONS</div>
              <ul className="space-y-2.5">
                {CERTIFICATIONS.map((c) => (
                  <li key={c} className="flex gap-3 text-[13.5px] text-[var(--text-dim)]">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-signal-red" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* ---------- commendations ---------- */}
        <div className="mt-20">
          <div className="reveal mb-8 flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.24em] text-signal-red">[06.1]</span>
            <h3 className="eyebrow">COMMENDATIONS</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((a, i) => (
              <article
                key={a.code}
                className="reveal panel group relative overflow-hidden p-6 transition-colors duration-300 hover:border-white/15"
                style={{ ["--d" as string]: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className={`font-display text-4xl font-bold tracking-[-0.04em] ${a.code === "©" ? "text-signal" : "text-outline"}`}>{a.code}</span>
                  <span className="font-mono text-[9px] tracking-[0.16em] text-[var(--muted)]">REC</span>
                </div>
                <h4 className="mt-5 font-display text-[1.05rem] font-semibold leading-snug">{a.title}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-dim)]">{a.detail}</p>
                <p className="mt-5 font-mono text-[9.5px] tracking-[0.14em] text-[var(--muted)]">{a.meta}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal-red transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionLog;
