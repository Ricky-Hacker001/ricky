import { Component, Suspense, lazy, useState, type ReactNode } from "react";
import { Cpu } from "lucide-react";
import { HARDWARE, type HardwareId } from "@/data/hardware";
import { detectTier } from "@/lib/device";
import { useActive, useNearViewport } from "@/hooks/useFx";
import SectionHeading from "@/components/ui/SectionHeading";
import BenchFallback from "./BenchFallback";

const HardwareScene = lazy(() => import("@/components/3d/HardwareScene"));

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const Readout = ({ k, children }: { k: string; children: ReactNode }) => (
  <div className="border-t border-[var(--line)] py-4">
    <dt className="mb-1.5 font-mono text-[10px] tracking-[0.24em] text-signal-red">{k}</dt>
    <dd className="text-[14.5px] leading-relaxed text-[var(--text-dim)]">{children}</dd>
  </div>
);

const HardwareLab = () => {
  const [tier] = useState(() => detectTier());
  const [selected, setSelected] = useState<HardwareId>("esp32");
  const [nearRef, near] = useNearViewport<HTMLDivElement>("400px");
  const [activeRef, active] = useActive<HTMLElement>("50px");
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const item = HARDWARE.find((h) => h.id === selected)!;
  const use3D = tier !== "none" && near && !failed;

  return (
    <section ref={activeRef} id="lab" aria-labelledby="lab-title" data-paused={!active} className="relative scroll-mt-24 py-[clamp(96px,14vw,180px)]">
      {/* warm workshop light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_30%_40%,rgba(255,45,61,0.07),transparent_65%)]" aria-hidden />
      <div className="wrap relative">
        <SectionHeading
          id="lab-title"
          index="04"
          label="ELECTRONICS WORKBENCH"
          title={["HARDWARE", <span key="l" className="text-signal">LAB</span>]}
          subtitle="Where code meets copper. Pick up a component to see what it is, what I built with it and where it lives."
        />

        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          {/* ---------- bench ---------- */}
          <div ref={nearRef} className="reveal panel frame relative aspect-[4/3] overflow-hidden sm:aspect-[16/11]">
            <div className="absolute inset-0" data-cursor={use3D ? "EXPLORE" : undefined}>
              {(!use3D || !ready) && (
                <div className={`absolute inset-0 p-3 transition-opacity duration-700 ${use3D ? "opacity-30" : "opacity-100"}`}>
                  <BenchFallback selected={selected} onSelect={setSelected} />
                </div>
              )}
              {use3D && (
                <Boundary onError={() => setFailed(true)}>
                  <Suspense fallback={null}>
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
                      <HardwareScene
                        selected={selected}
                        onSelect={setSelected}
                        active={active}
                        quality={tier === "high" ? "high" : "low"}
                        onReady={() => setReady(true)}
                        onLost={() => setFailed(true)}
                      />
                    </div>
                  </Suspense>
                </Boundary>
              )}
            </div>
            <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] tracking-[0.22em] text-white/50">BENCH-01 // {use3D ? "CLICK A COMPONENT" : "SELECT A COMPONENT"}</span>
            <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.22em] text-white/40">{item.bus}</span>
          </div>

          {/* ---------- inspector ---------- */}
          <div className="reveal flex flex-col">
            <div role="tablist" aria-label="Components" className="grid grid-cols-3 gap-1.5">
              {HARDWARE.map((h) => {
                const on = h.id === selected;
                return (
                  <button
                    key={h.id}
                    role="tab"
                    aria-selected={on}
                    aria-controls="hw-panel"
                    onClick={() => setSelected(h.id)}
                    className={`truncate rounded-lg border px-2.5 py-2.5 text-left font-mono text-[10px] tracking-[0.12em] transition-colors ${
                      on ? "border-signal-red/50 bg-signal-red/10 text-white" : "border-[var(--line)] text-[var(--text-dim)] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {h.name.split(" /")[0].toUpperCase()}
                  </button>
                );
              })}
            </div>

            <article id="hw-panel" role="tabpanel" aria-live="polite" className="panel mt-4 flex-1 p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-signal-red/40 bg-signal-red/10 text-signal-red">
                  <Cpu size={18} />
                </span>
                <h3 key={item.id} className="font-display text-[1.9rem] font-bold leading-none tracking-[-0.03em]" style={{ animation: "log-in .45s ease both" }}>
                  {item.name}
                </h3>
              </div>
              <dl className="mt-5">
                <Readout k="WHAT IT IS">{item.what}</Readout>
                <Readout k="WHAT I BUILT">{item.built}</Readout>
                <Readout k="PROJECT">{item.project}</Readout>
                <Readout k="TECHNOLOGY">
                  <span className="flex flex-wrap gap-1.5 pt-1">
                    {item.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </span>
                </Readout>
              </dl>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareLab;
