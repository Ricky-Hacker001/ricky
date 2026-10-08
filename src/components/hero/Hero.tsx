import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PROFILE, HUD_LABELS } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/social";
import { useBooted } from "@/lib/boot";
import { scrollToId } from "@/hooks/useActiveSection";
import Magnetic from "@/components/ui/Magnetic";
import HeroBackground from "./HeroBackground";
import AvatarStage from "./AvatarStage";

const ease = [0.2, 0.8, 0.2, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease, delay: 0.15 + i * 0.08 } }),
};

const char: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 0.9, ease, delay: 0.25 + i * 0.035 } }),
};

const LINES: { text: string; className: string }[] = [
  { text: "I BUILD", className: "text-metal" },
  { text: "WEIRD", className: "text-signal" },
  { text: "THINGS.", className: "text-metal" },
];

/** Splits a line into masked, staggered characters (aria-hidden; the h1 carries the label). */
const SplitLine = ({ text, offset, className, animate }: { text: string; offset: number; className: string; animate: string }) => (
  <span className="block overflow-hidden pb-[0.04em] leading-[0.86]">
    {text.split("").map((c, i) => (
      <motion.span
        key={i}
        custom={offset + i}
        variants={char}
        initial="hidden"
        animate={animate}
        className={`inline-block ${className}`}
        style={{ whiteSpace: "pre" }}
      >
        {c}
      </motion.span>
    ))}
  </span>
);

const jump = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToId(id);
};

/** Small floating HUD tag around the avatar. */
const Tag = ({ text, className, delay }: { text: string; className: string; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, x: -6 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.8, ease }}
    className={`pointer-events-none absolute hidden items-center gap-2 rounded-md border border-white/[0.08] bg-black/40 px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.18em] text-white/55 backdrop-blur-sm sm:flex ${className}`}
  >
    <span className="h-1 w-1 bg-signal-red" />
    {text}
  </motion.span>
);

const Hero = () => {
  const booted = useBooted();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.92]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);

  const animate = booted ? "show" : "hidden";
  let charIndex = 0;

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-10 pt-28 lg:pt-24"
    >
      <HeroBackground />

      <div className="wrap relative z-[2] grid items-center gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        {/* ---------------- LEFT: copy ---------------- */}
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-[3]">
          <motion.div custom={0} variants={rise} initial="hidden" animate={animate} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.22em] text-[var(--text-dim)]">
              <span className="dot-live pulse" /> SYSTEM ONLINE
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.22em] text-[var(--muted)]">v2026.10 // LAB BUILD</span>
          </motion.div>

          <motion.p
            custom={1}
            variants={rise}
            initial="hidden"
            animate={animate}
            className="mb-5 flex items-center gap-4 font-display text-[clamp(1.1rem,2vw,1.45rem)] font-semibold tracking-[0.42em] text-white"
          >
            RICKY
            <span className="h-px w-12 bg-gradient-to-r from-signal-red to-transparent" />
            <span className="font-mono text-[10.5px] font-normal tracking-[0.2em] text-[var(--muted)]">{PROFILE.tagline.toUpperCase()} ⚡</span>
          </motion.p>

          <h1 aria-label="I build weird things." className="mega text-[clamp(4.1rem,10.2vw,9.6rem)]">
            {LINES.map((l) => {
              const offset = charIndex;
              charIndex += l.text.length;
              return (
                <span key={l.text} aria-hidden>
                  <SplitLine text={l.text} offset={offset} className={l.className} animate={animate} />
                </span>
              );
            })}
          </h1>

          <motion.p
            custom={4}
            variants={rise}
            initial="hidden"
            animate={animate}
            className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.16em] text-[var(--text-dim)]"
          >
            {PROFILE.roles.map((r, i) => (
              <span key={r} className="flex items-center gap-3">
                {i > 0 && <span className="text-signal-red">•</span>}
                {r.toUpperCase()}
              </span>
            ))}
          </motion.p>

          <motion.p custom={5} variants={rise} initial="hidden" animate={animate} className="mt-5 max-w-[30rem] text-[16px] leading-relaxed text-[var(--text-dim)]">
            {PROFILE.intro}
          </motion.p>

          <motion.div custom={6} variants={rise} initial="hidden" animate={animate} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic href="#work" cursor="VIEW" onClick={jump("work")}>
              Explore my work <ArrowDownRight size={16} />
            </Magnetic>
            <Magnetic variant="ghost" href="#contact" cursor="OPEN" onClick={jump("contact")}>
              Contact me <ArrowUpRight size={16} />
            </Magnetic>
          </motion.div>

          <motion.ul custom={7} variants={rise} initial="hidden" animate={animate} className="mt-10 flex items-center gap-2" aria-label="Social links">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.07] text-[var(--muted)] transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
            <li className="ml-3 hidden font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] sm:block">{PROFILE.location.toUpperCase()}</li>
          </motion.ul>
        </motion.div>

        {/* ---------------- RIGHT: avatar ---------------- */}
        <motion.div
          style={{ scale: stageScale, y: stageY }}
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.2 }}
          className="relative h-[clamp(420px,62vh,560px)] lg:h-[min(80vh,760px)]"
        >
          <AvatarStage>
            <Tag text={HUD_LABELS[0]} className="left-[2%] top-[12%]" delay={1.3} />
            <Tag text={HUD_LABELS[1]} className="right-[0%] top-[24%]" delay={1.45} />
            <Tag text={HUD_LABELS[2]} className="left-[6%] top-[58%]" delay={1.6} />
            <Tag text={HUD_LABELS[3]} className="right-[4%] top-[66%]" delay={1.75} />
            <Tag text={HUD_LABELS[4]} className="bottom-[4%] left-1/2 -translate-x-1/2" delay={1.9} />
          </AvatarStage>
        </motion.div>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => scrollToId("about")}
        className="absolute bottom-6 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9.5px] tracking-[0.3em] text-[var(--muted)] transition-colors hover:text-white md:flex"
        aria-label="Scroll to about"
      >
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-signal-red" style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }} />
        </span>
        <style>{`@keyframes scroll-cue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
      </button>
    </section>
  );
};

export default Hero;
