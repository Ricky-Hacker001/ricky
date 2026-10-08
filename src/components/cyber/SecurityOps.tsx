import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Crosshair } from "lucide-react";
import { SECURITY_DOMAINS, SIM_LOGS } from "@/data/security";
import { useActive } from "@/hooks/useFx";
import SectionHeading from "@/components/ui/SectionHeading";
import NetworkGraph from "./NetworkGraph";

const ALERTS = [
  { sev: "HIGH", text: "Deauth burst pattern", src: "wifi-lab" },
  { sev: "MED", text: "Exposed asset in recon", src: "osint" },
  { sev: "LOW", text: "Secret pattern blocked pre-push", src: "leakwatch" },
  { sev: "INFO", text: "Auth endpoint fuzzed", src: "burp" },
];

/** Log console: appends one line every ~1.6s, only while on screen. Writes straight to the DOM. */
const LogStream = ({ active }: { active: boolean }) => {
  const box = useRef<HTMLDivElement>(null);
  const i = useRef(0);

  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const el = box.current;
      if (!el) return;
      const line = document.createElement("div");
      const t = new Date().toISOString().slice(11, 19);
      line.innerHTML = `<span style="color:var(--muted)">${t}</span> <span style="color:#ff4553">›</span> `;
      line.append(document.createTextNode(SIM_LOGS[i.current++ % SIM_LOGS.length]));
      line.style.animation = "log-in .4s ease both";
      el.append(line);
      while (el.children.length > 7) el.firstElementChild?.remove();
    }, 1600);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <div ref={box} className="h-[178px] space-y-1.5 overflow-hidden font-mono text-[11.5px] leading-relaxed text-[var(--text-dim)]">
      {SIM_LOGS.slice(0, 5).map((l, k) => (
        <div key={k}>
          <span className="text-[var(--muted)]">--:--:--</span> <span className="text-signal-red">›</span> {l}
        </div>
      ))}
    </div>
  );
};

const SecurityOps = () => {
  const [ref, active] = useActive<HTMLElement>("100px");
  const [domain, setDomain] = useState(SECURITY_DOMAINS[0].id);
  const current = SECURITY_DOMAINS.find((d) => d.id === domain)!;

  return (
    <section ref={ref} id="security" aria-labelledby="sec-title" data-paused={!active} className="relative scroll-mt-24 py-[clamp(96px,14vw,180px)]">
      <div className="wrap">
        <SectionHeading
          id="sec-title"
          index="05"
          label="OFFENSE × DEFENSE"
          title={["SECURITY", <span key="o" className="text-outline">OPERATIONS</span>]}
          subtitle="I work the full loop — find the weakness, then build the defense. This console is a live illustration of that workflow, not real incident data."
        />

        <div className="reveal panel frame overflow-hidden">
          {/* top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-3">
            <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.2em]">
              <span className="dot-live pulse" />
              <span className="text-white">SOC // RICKY.LAB</span>
            </div>
            <span className="rounded-md border border-amber-400/25 bg-amber-400/5 px-2.5 py-1 font-mono text-[9.5px] tracking-[0.18em] text-amber-300/80">
              SIMULATED TELEMETRY · ILLUSTRATIVE ONLY
            </span>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr_280px]">
            {/* domains */}
            <div className="border-b border-[var(--line)] p-4 lg:border-b-0 lg:border-r">
              <div className="hud mb-3 px-1">// CAPABILITIES</div>
              <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                {SECURITY_DOMAINS.map((d) => {
                  const on = d.id === domain;
                  return (
                    <li key={d.id}>
                      <button
                        onClick={() => setDomain(d.id)}
                        onMouseEnter={() => setDomain(d.id)}
                        aria-pressed={on}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-mono text-[10.5px] tracking-[0.16em] transition-colors ${
                          on ? "bg-signal-red/10 text-white" : "text-[var(--text-dim)] hover:bg-white/[0.03] hover:text-white"
                        }`}
                      >
                        {d.label}
                        <span className={`text-[9px] ${d.side === "OFFENSE" ? "text-signal-red" : "text-signal-cyan"}`}>{d.side === "OFFENSE" ? "RED" : "BLUE"}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 rounded-lg border border-[var(--line)] p-3" aria-live="polite">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white">
                  {current.side === "OFFENSE" ? <Crosshair size={13} className="text-signal-red" /> : <ShieldCheck size={13} className="text-signal-cyan" />}
                  {current.side}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-dim)]">{current.detail}</p>
              </div>
            </div>

            {/* network graph */}
            <div className="relative min-h-[300px] border-b border-[var(--line)] p-3 lg:border-b-0">
              <div className="hud absolute left-4 top-4">// NETWORK MONITORING</div>
              <div className="grid-bg absolute inset-0 opacity-40" />
              <div className="relative h-full min-h-[300px] pt-6">
                <NetworkGraph active={active} />
              </div>
            </div>

            {/* threat + alerts */}
            <div className="border-[var(--line)] p-4 lg:border-l">
              <div className="hud mb-3 px-1">// THREAT INDICATOR</div>
              <div className="flex items-center gap-4 rounded-lg border border-[var(--line)] p-3">
                <svg viewBox="0 0 80 46" className="w-24" aria-hidden>
                  <path d="M6 42 A34 34 0 0 1 74 42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M6 42 A34 34 0 0 1 52 10" fill="none" stroke="url(#tg)" strokeWidth="6" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="tg">
                      <stop offset="0" stopColor="#63d9ff" />
                      <stop offset="1" stopColor="#ff2d3d" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <div className="font-display text-xl font-bold">ELEVATED</div>
                  <div className="font-mono text-[9.5px] tracking-[0.16em] text-[var(--muted)]">LAB SCENARIO</div>
                </div>
              </div>

              <div className="hud mb-2 mt-5 px-1">// ALERT QUEUE</div>
              <ul className="space-y-1.5">
                {ALERTS.map((a) => (
                  <li key={a.text} className="flex items-start gap-3 rounded-lg border border-[var(--line)] px-3 py-2">
                    <span
                      className={`mt-0.5 w-10 shrink-0 font-mono text-[9px] tracking-[0.14em] ${
                        a.sev === "HIGH" ? "text-signal-red" : a.sev === "MED" ? "text-amber-300" : a.sev === "LOW" ? "text-signal-cyan" : "text-[var(--muted)]"
                      }`}
                    >
                      {a.sev}
                    </span>
                    <span className="text-[12.5px] leading-snug text-[var(--text-dim)]">
                      {a.text}
                      <span className="block font-mono text-[9.5px] text-[var(--muted)]">src: {a.src}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* bottom: logs + packets */}
          <div className="grid border-t border-[var(--line)] lg:grid-cols-[1fr_280px]">
            <div className="p-5">
              <div className="hud mb-3">// ricky@soc:~$ tail -f lab.log</div>
              <LogStream active={active} />
            </div>
            <div className="border-t border-[var(--line)] p-5 lg:border-l lg:border-t-0">
              <div className="hud mb-3">// PACKET ACTIVITY</div>
              <div className="flex h-[150px] items-end gap-[3px]" aria-hidden>
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 origin-bottom rounded-sm"
                    style={{
                      height: `${30 + ((i * 37) % 60)}%`,
                      background: i % 7 === 3 ? "var(--red)" : "rgba(255,255,255,0.14)",
                      animation: `pkt ${1.2 + (i % 5) * 0.35}s ease-in-out ${i * -0.13}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes pkt{from{transform:scaleY(.25)}to{transform:scaleY(1)}}`}</style>
    </section>
  );
};

export default SecurityOps;
