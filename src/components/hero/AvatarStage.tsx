import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from "react";
import { detectTier, type Tier } from "@/lib/device";
import { useActive, onIdle } from "@/hooks/useFx";
import AvatarFallback from "./AvatarFallback";

const HeroScene = lazy(() => import("@/components/3d/HeroScene"));

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
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

/**
 * Progressive avatar:
 *  1. static render paints instantly
 *  2. three.js chunk is fetched when the browser is idle (never on weak devices)
 *  3. the canvas cross-fades in after its first real frame
 *  4. rendering pauses whenever the hero is off-screen or the tab is hidden
 * Any WebGL failure (creation, shader, context loss) falls back silently.
 */
const AvatarStage = ({ children }: { children?: ReactNode }) => {
  const [tier] = useState<Tier>(() => detectTier());
  const [quality, setQuality] = useState<"high" | "low">(tier === "high" ? "high" : "low");
  const [ref, active] = useActive<HTMLDivElement>("80px");
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Dev-only: ?capture keeps the scene rendering even when the tab/pane is hidden,
  // so a full-res frame can be grabbed for the static fallback.
  const capture = import.meta.env.DEV && typeof window !== "undefined" && window.location.search.includes("capture");

  useEffect(() => {
    if (tier === "none") return;
    if (capture) {
      setLoad(true);
      return;
    }
    return onIdle(() => setLoad(true), 1500);
  }, [tier, capture]);

  const use3D = tier !== "none" && load && !failed;
  const sceneActive = active || capture;

  return (
    <div ref={ref} className="relative h-full w-full" data-paused={!active}>
      <AvatarFallback hidden={use3D && ready} />

      {use3D && (
        <SceneBoundary onError={() => setFailed(true)}>
          <Suspense fallback={null}>
            <div
              className={`absolute inset-0 transition-opacity [transition-duration:1200ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
              data-cursor="EXPLORE"
            >
              <HeroScene
                quality={quality}
                active={sceneActive}
                onReady={() => setReady(true)}
                onDegrade={() => setQuality("low")}
                onLost={() => setFailed(true)}
              />
            </div>
          </Suspense>
        </SceneBoundary>
      )}

      {use3D && !ready && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9.5px] tracking-[0.24em] text-[var(--muted)]">
          INITIALISING RENDERER<span className="caret">_</span>
        </span>
      )}
      {children}
    </div>
  );
};

export default AvatarStage;
