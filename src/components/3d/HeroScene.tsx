import { Component, Suspense, lazy, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { pointer, bindPointer } from "@/lib/pointer";
import { AVATAR } from "@/data/profile";
import { createPalette, type Palette } from "./materials";
import Avatar from "./Avatar";
import Env from "./Env";
import Workstation from "./Workstation";
import { BoardESP32, BoardRPi, CyberLock, Microchip, NetworkNode, TerminalCube, UsbStick } from "./Devices";
import { dotTexture, networkTexture, statusTexture, terminalTexture } from "./canvasTextures";

const GltfAvatar = lazy(() => import("./GltfAvatar"));

export type Quality = "high" | "low";

/* ------------------------------------------------------------------ */
/*  Camera parallax + adaptive resolution                               */
/* ------------------------------------------------------------------ */
function Rig({ quality, onDegrade }: { quality: Quality; onDegrade: () => void }) {
  const { camera, setDpr } = useThree();
  const base = useMemo(() => new THREE.Vector3(0.1, 1.12, 5.0), []);
  const target = useMemo(() => new THREE.Vector3(0.05, 1.08, 0), []);
  const perf = useRef({ acc: 0, frames: 0, slowFor: 0, dpr: 0, degraded: false });

  useEffect(() => {
    perf.current.dpr = Math.min(window.devicePixelRatio || 1, quality === "high" ? 1.75 : 1.25);
  }, [quality]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const k = 1 - Math.exp(-dt * 2.2);
    camera.position.x += (base.x + pointer.nx * 0.22 - camera.position.x) * k;
    camera.position.y += (base.y + pointer.ny * 0.12 - camera.position.y) * k;
    camera.position.z = base.z;
    camera.lookAt(target);

    // Rolling frame-time check: if we're consistently slow, step resolution down.
    const p = perf.current;
    p.acc += rawDt;
    p.frames++;
    if (p.acc >= 1) {
      const avg = p.acc / p.frames;
      p.slowFor = avg > 1 / 45 ? p.slowFor + 1 : 0;
      if (p.slowFor >= 2 && p.dpr > 1) {
        p.dpr = Math.max(1, p.dpr * 0.75);
        setDpr(p.dpr);
        p.slowFor = 0;
      } else if (p.slowFor >= 2 && !p.degraded) {
        p.degraded = true;
        onDegrade();
      }
      p.acc = 0;
      p.frames = 0;
    }
  });
  return null;
}

/* ------------------------------------------------------------------ */
/*  Floating hardware (max 7, slow drift — never spinning fast)         */
/* ------------------------------------------------------------------ */
type Floater = { el: (m: Palette) => ReactNode; p: THREE.Vector3Tuple; r: THREE.Vector3Tuple; s: number };

const FLOATERS: Floater[] = [
  { el: (m) => <BoardESP32 m={m} />, p: [-0.92, 1.9, -0.4], r: [0.9, 0.4, 0.2], s: 1.15 },
  { el: (m) => <CyberLock m={m} />, p: [0.9, 2.12, -0.6], r: [0.15, -0.5, 0.1], s: 1.1 },
  { el: (m) => <BoardRPi m={m} />, p: [-0.98, 0.72, -0.1], r: [0.7, 0.6, -0.25], s: 1 },
  { el: (m) => <NetworkNode m={m} />, p: [1.05, 1.62, -1.1], r: [0, 0, 0], s: 1.2 },
  { el: (m) => <Microchip m={m} />, p: [1.3, 1.02, -1.25], r: [0.9, 0.3, 0.1], s: 0.95 },
  { el: () => <TerminalCube />, p: [0.32, 2.22, -1.0], r: [0.4, 0.6, 0.1], s: 1 },
  { el: (m) => <UsbStick m={m} />, p: [-0.62, 0.3, 0.75], r: [0.6, -0.8, 0.5], s: 1.15 },
];

function FloatingDevices({ m, count }: { m: Palette; count: number }) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const f = FLOATERS[i];
      g.position.y = f.p[1] + Math.sin(t * 0.6 + i * 1.7) * 0.05;
      g.rotation.x = f.r[0] + Math.sin(t * 0.3 + i) * 0.12;
      g.rotation.y = f.r[1] + t * 0.08 * (i % 2 ? 1 : -1);
    });
  });
  return (
    <group>
      {FLOATERS.slice(0, count).map((f, i) => (
        <group key={i} ref={(n) => (refs.current[i] = n)} position={f.p} rotation={f.r} scale={f.s}>
          {f.el(m)}
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Holographic UI panels                                               */
/* ------------------------------------------------------------------ */
function Holograms({ animate, full }: { animate: boolean; full: boolean }) {
  const tex = useMemo(
    () => ({ term: terminalTexture(512, 320, "ricky@lab: ~", true), net: networkTexture(), status: statusTexture() }),
    []
  );
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(tex.term.step, 900);
    return () => window.clearInterval(id);
  }, [animate, tex]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      c.position.y = (c.userData.y as number) + Math.sin(t * 0.5 + i * 2) * 0.03;
    });
  });

  const holo = (map: THREE.Texture, opacity = 0.8) => (
    <meshBasicMaterial
      map={map}
      transparent
      opacity={opacity}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
      toneMapped={false}
      side={THREE.DoubleSide}
    />
  );

  const panels: { map: THREE.Texture; size: [number, number]; p: THREE.Vector3Tuple; ry: number; o?: number }[] = [
    { map: tex.term.texture, size: [0.78, 0.49], p: [-0.98, 1.3, -0.95], ry: 0.42 },
    { map: tex.net, size: [0.6, 0.6], p: [-0.62, 2.28, -1.7], ry: 0.3, o: 0.75 },
    { map: tex.status, size: [0.62, 0.36], p: [-1.05, 0.42, -0.75], ry: 0.5, o: 0.8 },
  ];

  return (
    <group ref={group}>
      {panels.slice(0, full ? 3 : 2).map((pl, i) => (
        <mesh key={i} position={pl.p} rotation={[0, pl.ry, 0]} userData={{ y: pl.p[1] }}>
          <planeGeometry args={pl.size} />
          {holo(pl.map, pl.o)}
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particles                                                           */
/* ------------------------------------------------------------------ */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const red = new THREE.Color("#ff3b4a");
    const white = new THREE.Color("#c8ced6");
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.6;
      pos[i * 3 + 1] = Math.random() * 2.8;
      pos[i * 3 + 2] = -Math.random() * 2.4 + 0.4;
      const c = Math.random() < 0.18 ? red : white;
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.022,
      map: dotTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    return { geometry: g, material: mat };
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += Math.min(dt, 0.05) * 0.015;
  });
  return <points ref={ref} geometry={geometry} material={material} />;
}

/* ------------------------------------------------------------------ */
/*  Fires once the first real frame has been drawn                      */
/* ------------------------------------------------------------------ */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    if (++frames.current >= 3) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* ------------------------------------------------------------------ */

const SceneContent = ({ quality, active, onReady, degrade }: { quality: Quality; active: boolean; onReady: () => void; degrade: () => void }) => {
  const m = useMemo(() => createPalette(), []);
  const procedural = <Avatar m={m} />;

  return (
    <>
      <Env />
      <Rig quality={quality} onDegrade={degrade} />
      {/* cinematic 3-point: cool key, red rim, cyan fill + soft top bounce */}
      <hemisphereLight args={["#9aa6b8", "#050505", 0.3]} />
      <directionalLight position={[-2.4, 3.0, 3.4]} intensity={1.35} color="#f4f6fa" />
      <directionalLight position={[3.2, 2.0, -2.6]} intensity={3.0} color="#ff2d3d" />
      <directionalLight position={[-3.4, 1.2, -2.2]} intensity={1.0} color="#63d9ff" />
      <spotLight position={[0.2, 3.6, 1.6]} angle={0.5} penumbra={1} intensity={6} color="#ffffff" distance={9} />
      <pointLight position={[0.1, 1.2, 1.1]} intensity={1.2} color="#ffdede" distance={3.2} />

      {/* stage turned three-quarters toward the desk */}
      <group rotation={[0, 0.36, 0]} position={[-0.12, 0, 0]}>
        {AVATAR.modelUrl ? (
          <ModelBoundary fallback={procedural}>
            <Suspense fallback={procedural}>
              <GltfAvatar url={AVATAR.modelUrl} />
            </Suspense>
          </ModelBoundary>
        ) : (
          procedural
        )}
        <Workstation m={m} animate={active} />
      </group>

      <FloatingDevices m={m} count={quality === "high" ? 7 : 4} />
      <Holograms animate={active} full={quality === "high"} />
      <Particles count={quality === "high" ? 240 : 90} />
      <ReadySignal onReady={onReady} />
    </>
  );
};

const HeroScene = ({
  quality,
  active,
  onReady,
  onDegrade,
  onLost,
}: {
  quality: Quality;
  active: boolean;
  onReady: () => void;
  onDegrade: () => void;
  onLost: () => void;
}) => {
  useEffect(bindPointer, []);
  // Dev-only: ?capture keeps the drawing buffer so the static fallback image can be re-rendered.
  const capture = import.meta.env.DEV && window.location.search.includes("capture");
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={capture ? 2 : [1, quality === "high" ? 1.75 : 1.25]}
      camera={{ position: [0.1, 1.12, 5.0], fov: 32, near: 0.1, far: 30 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance", stencil: false, preserveDrawingBuffer: capture }}
      style={{ background: "transparent" }}
      aria-hidden
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onLost();
        });
      }}
    >
      <SceneContent quality={quality} active={active} onReady={onReady} degrade={onDegrade} />
    </Canvas>
  );
};

export default HeroScene;
