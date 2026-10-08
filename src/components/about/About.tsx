import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { PROFILE, EDUCATION } from "@/data/profile";
import { WORLDS } from "@/data/skills";
import WorldVisual from "./WorldVisual";

const STATEMENT = "SOFTWARE IS ONLY ONE SIDE OF THE MACHINE.".split(" ");

/** Word lights up as the statement scrolls through the viewport. */
const Word = ({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.14, 1]);
  const accent = word === "MACHINE.";
  return (
    <motion.span style={{ opacity }} className={`mr-[0.22em] inline-block ${accent ? "text-signal" : "text-metal"}`}>
      {word}
    </motion.span>
  );
};

const About = () => {
  const statement = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: statement, offset: ["start 85%", "end 45%"] });
  const [active, setActive] = useState<string>(WORLDS[0].key);

  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-24 py-[clamp(96px,14vw,180px)]">
      <div className="wrap">
        <div className="reveal mb-10 flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.24em] text-signal-red">[01]</span>
          <span id="about-title" className="eyebrow">THE ENGINEER BEHIND THE SYSTEM</span>
        </div>

        <h2 ref={statement} className="mega max-w-[14ch] text-[clamp(2.8rem,8.4vw,8rem)]" aria-label="Software is only one side of the machine.">
          {STATEMENT.map((w, i) => (
            <Word key={i} word={w} i={i} n={STATEMENT.length} progress={scrollYProgress} />
          ))}
        </h2>

        <div className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          {/* ---------- operator card ---------- */}
          <article className="reveal panel frame overflow-hidden">
            <div className="relative aspect-[4/3.4] overflow-hidden border-b border-[var(--line)]">
              <img
                src="/images/ricky.webp"
                alt="Ricky, standing outdoors in a black blazer"
                width={600}
                height={597}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[50%_22%] grayscale contrast-[1.15] brightness-[0.82]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-transparent to-transparent" />
              <div className="absolute inset-0 mix-blend-color" style={{ background: "linear-gradient(160deg, rgba(255,45,61,0.0), rgba(255,45,61,0.35))" }} />
              <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)" }} />
              <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] text-white/70">ID // RICKY</span>
              <span className="absolute right-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/70">
                <span className="dot-live" /> OPERATOR
              </span>
            </div>
            <div className="p-6">
              <p className="text-[15px] leading-relaxed text-[var(--text-dim)]">{PROFILE.about}</p>
              <dl className="mt-6 grid gap-3 border-t border-[var(--line)] pt-5 text-[13px]">
                {[
                  ["EDU", EDUCATION.degree],
                  ["ORG", `${EDUCATION.school} · ${EDUCATION.period}`],
                  ["FOCUS", EDUCATION.focus],
                  ["BASE", PROFILE.location],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[64px_1fr] gap-3">
                    <dt className="font-mono text-[10.5px] tracking-[0.18em] text-signal-red">{k}</dt>
                    <dd className="text-[var(--text-dim)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* ---------- four worlds ---------- */}
          <div className="grid gap-4 sm:grid-cols-2">
            {WORLDS.map((w, i) => {
              const on = active === w.key;
              const Icon = w.icon;
              return (
                // .reveal lives on a static wrapper so React re-renders (on hover)
                // never rewrite the className that the IntersectionObserver marked `.in`.
                <div key={w.key} className="reveal" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <button
                  onMouseEnter={() => setActive(w.key)}
                  onFocus={() => setActive(w.key)}
                  onClick={() => setActive(w.key)}
                  aria-pressed={on}
                  className={`panel group relative flex h-full min-h-[290px] w-full flex-col overflow-hidden p-6 text-left transition-[border-color] duration-500 ${
                    on ? "border-signal-red/40" : "hover:border-white/15"
                  }`}
                >
                  <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal-red/20 blur-3xl transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`} />
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[10.5px] tracking-[0.22em] text-[var(--muted)]">0{i + 1} / {w.signal}</span>
                    <Icon size={16} className={on ? "text-signal-red" : "text-[var(--muted)]"} />
                  </div>
                  <div className="relative my-4 h-[84px]">
                    <WorldVisual kind={w.key} on={on} />
                  </div>
                  <h3 className="relative font-display text-[2.1rem] font-bold leading-none tracking-[-0.03em]">{w.title}</h3>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-[var(--text-dim)]">{w.line}</p>
                  <div
                    className={`relative mt-auto flex flex-wrap gap-1.5 pt-5 transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"}`}
                  >
                    {w.items.map((it) => (
                      <span key={it} className="chip">
                        {it}
                      </span>
                    ))}
                  </div>
                </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
