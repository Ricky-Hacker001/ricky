const WORDS = ["CYBERSECURITY", "FULL-STACK", "ARTIFICIAL INTELLIGENCE", "ELECTRONICS", "IOT", "CLOUD NATIVE", "LINUX", "OPEN SOURCE"];

/** Slow marquee band between hero and content — one CSS animation, duplicated track. */
const SignalBand = () => (
  <div className="relative z-[2] overflow-hidden border-y border-[var(--line)] bg-[var(--bg-2)]/80 py-5" aria-hidden>
    <div className="marquee-track">
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center">
          {WORDS.map((w) => (
            <span key={w} className="flex items-center">
              <span className="px-8 font-display text-[clamp(1rem,2vw,1.35rem)] font-semibold tracking-[0.08em] text-white/70">{w}</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-signal-red" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default SignalBand;
