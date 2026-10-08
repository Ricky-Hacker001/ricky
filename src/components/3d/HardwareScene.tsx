import { useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { pointer, bindPointer } from "@/lib/pointer";
import { HARDWARE, type HardwareId } from "@/data/hardware";
import { createPalette, type Palette } from "./materials";
import { canvasTexture } from "./canvasTextures";
import Env from "./Env";
import { BoardESP32, BoardMega, BoardNRF24, BoardOLED, BoardRFID, BoardRPi, BoardSonar } from "./Devices";

/**
 * Virtual electronics workbench — 6 selectable boards + an OLED that shows
 * the current selection, a handful of jumper wires and a cutting mat.
 * ~25 draw calls, no shadows, no post-processing.
 */

type Slot = {
  id: HardwareId;
  p: THREE.Vector3Tuple;
  ry: number;
  ring: number;
  /** invisible click hitbox size [w, h, d] covering the component footprint */
  hit: THREE.Vector3Tuple;
  el: (m: Palette) => ReactNode;
};

const SLOTS: Slot[] = [
  { id: "rpi", p: [-0.56, 0, -0.2], ry: 0.12, ring: 0.24, hit: [0.42, 0.16, 0.3], el: (m) => <BoardRPi m={m} /> },
  { id: "esp32", p: [0.02, 0, -0.3], ry: -0.08, ring: 0.18, hit: [0.34, 0.14, 0.2], el: (m) => <BoardESP32 m={m} /> },
  { id: "mega", p: [0.58, 0, -0.16], ry: -0.14, ring: 0.27, hit: [0.5, 0.16, 0.28], el: (m) => <BoardMega m={m} /> },
  { id: "nrf24", p: [-0.62, 0, 0.3], ry: 0.25, ring: 0.14, hit: [0.28, 0.14, 0.18], el: (m) => <BoardNRF24 m={m} /> },
  { id: "rfid", p: [-0.1, 0, 0.26], ry: -0.1, ring: 0.18, hit: [0.3, 0.14, 0.26], el: (m) => <BoardRFID m={m} /> },
  { id: "sonar", p: [0.5, 0, 0.3], ry: 0.08, ring: 0.15, hit: [0.26, 0.16, 0.18], el: (m) => <BoardSonar m={m} /> },
];

const WIRES: { from: THREE.Vector3Tuple; to: THREE.Vector3Tuple; color: string; lift: number }[] = [
  { from: [-0.44, 0.02, -0.29], to: [-0.1, 0.0, -0.36], color: "#ff2d3d", lift: 0.12 },
  { from: [0.12, 0.0, -0.24], to: [0.22, 0.01, 0.0], color: "#d9dde3", lift: 0.07 },
  { from: [0.42, 0.02, -0.08], to: [0.5, 0.0, 0.25], color: "#63d9ff", lift: 0.09 },
  { from: [-0.62, 0.02, -0.1], to: [-0.6, 0.0, 0.25], color: "#d9dde3", lift: 0.08 },
  { from: [-0.05, 0.0, -0.24], to: [-0.12, 0.0, 0.14], color: "#ff2d3d", lift: 0.1 },
  { from: [0.32, 0.01, 0.04], to: [0.46, 0.0, 0.26], color: "#3a3f48", lift: 0.06 },
];

function oledTexture() {
  const t = canvasTexture(256, 150);
  const draw = (title: string, sub: string) => {
    const { ctx } = t;
    ctx.fillStyle = "#020304";
    ctx.fillRect(0, 0, 256, 150);
    ctx.fillStyle = "#63d9ff";
    ctx.font = "500 15px 'JetBrains Mono', monospace";
    ctx.fillText("RICKY.LAB / OLED", 12, 26);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 24px 'Space Grotesk', sans-serif";
    ctx.fillText(title.slice(0, 16), 12, 72);
    ctx.fillStyle = "rgba(200,230,255,0.7)";
    ctx.font = "500 13px 'JetBrains Mono', monospace";
    ctx.fillText(sub.slice(0, 28), 12, 104);
    ctx.fillStyle = "#ff2d3d";
    ctx.fillRect(12, 124, 60, 6);
    t.texture.needsUpdate = true;
  };
  return { texture: t.texture, draw };
}

function Rig({ focus }: { focus: THREE.Vector3 }) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(0, 0, 0.02), []);
  useFrame((_, rawDt) => {
    const k = 1 - Math.exp(-Math.min(rawDt, 0.05) * 2.5);
    camera.position.x += (pointer.nx * 0.12 + focus.x * 0.18 - camera.position.x) * k;
    camera.position.y += (1.22 + pointer.ny * 0.06 - camera.position.y) * k;
    camera.position.z += (1.3 + focus.z * 0.15 - camera.position.z) * k;
    look.lerp(new THREE.Vector3(focus.x * 0.3, 0, focus.z * 0.3 + 0.02), k);
    camera.lookAt(look);
  });
  return null;
}

function Component({
  slot,
  m,
  selected,
  onSelect,
  hovered,
  setHovered,
}: {
  slot: Slot;
  m: Palette;
  selected: boolean;
  onSelect: (id: HardwareId) => void;
  hovered: boolean;
  setHovered: (id: HardwareId | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock }, rawDt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-Math.min(rawDt, 0.05) * 6);
    const lift = selected ? 0.06 + Math.sin(clock.elapsedTime * 1.6) * 0.008 : hovered ? 0.02 : 0;
    g.position.y += (lift - g.position.y) * k;
    g.rotation.x += ((selected ? -0.12 : 0) - g.rotation.x) * k;
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity += ((selected ? 0.9 : hovered ? 0.35 : 0) - mat.opacity) * k;
    }
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(slot.id);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHovered(null);
    document.body.style.cursor = "";
  };

  return (
    <group position={slot.p} rotation={[0, slot.ry, 0]}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[slot.ring, slot.ring + 0.006, 64]} />
        <meshBasicMaterial color="#ff2d3d" transparent opacity={0} toneMapped={false} />
      </mesh>
      <group ref={group}>
        {/* invisible hitbox — the single, reliable click/hover target for this component */}
        <mesh
          position={[0, slot.hit[1] / 2, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(slot.id);
          }}
          onPointerOver={over}
          onPointerOut={out}
        >
          <boxGeometry args={slot.hit} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        {/* decorative board — no event handlers, so R3F never raycasts it; the hitbox owns all clicks */}
        <group position={[0, 0.03, 0]}>{slot.el(m)}</group>
      </group>
    </group>
  );
}

const Bench = ({ selected, onSelect, onReady }: { selected: HardwareId; onSelect: (id: HardwareId) => void; onReady: () => void }) => {
  const m = useMemo(() => createPalette(), []);
  const hoveredRef = useRef<HardwareId | null>(null);
  const [, force] = useReducerTick();
  const setHovered = (id: HardwareId | null) => {
    if (hoveredRef.current !== id) {
      hoveredRef.current = id;
      force();
    }
  };
  const oled = useMemo(() => oledTexture(), []);
  const item = HARDWARE.find((h) => h.id === selected)!;
  useEffect(() => oled.draw(item.name.toUpperCase(), item.what), [item, oled]);

  const wires = useMemo(
    () =>
      WIRES.map((w) => {
        const a = new THREE.Vector3(...w.from);
        const b = new THREE.Vector3(...w.to);
        const mid = a.clone().lerp(b, 0.5).setY(w.lift);
        const curve = new THREE.CatmullRomCurve3([a, a.clone().lerp(mid, 0.5).setY(w.lift * 0.8), mid, b.clone().lerp(mid, 0.5).setY(w.lift * 0.8), b]);
        return { geo: new THREE.TubeGeometry(curve, 32, 0.0045, 6, false), color: w.color };
      }),
    []
  );

  const mat = useMemo(() => {
    const t = canvasTexture(512, 300);
    const { ctx } = t;
    ctx.fillStyle = "#0b0d10";
    ctx.fillRect(0, 0, 512, 300);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    for (let x = 0; x <= 512; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 300);
      ctx.stroke();
    }
    for (let y = 0; y <= 300; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(255,45,61,0.35)";
    ctx.strokeRect(8, 8, 496, 284);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "500 10px 'JetBrains Mono', monospace";
    ctx.fillText("RICKY.LAB // BENCH-01   GRID 10MM", 16, 286);
    t.texture.needsUpdate = true;
    return t.texture;
  }, []);

  const focus = useMemo(() => new THREE.Vector3(...SLOTS.find((s) => s.id === selected)!.p), [selected]);

  const frames = useRef(0);
  useFrame(() => {
    if (frames.current < 3 && ++frames.current === 3) onReady();
  });

  return (
    <>
      <Env intensity={0.4} />
      <Rig focus={focus} />
      <hemisphereLight args={["#aab4c4", "#050505", 0.5]} />
      <directionalLight position={[-1.5, 2.5, 1.5]} intensity={1.2} />
      <directionalLight position={[2, 1, -2]} intensity={2.2} color="#ff2d3d" />

      {/* cutting mat */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[1.9, 1.12]} />
        <meshStandardMaterial map={mat} roughness={0.9} metalness={0} />
      </mesh>

      {SLOTS.map((s) => (
        <Component key={s.id} slot={s} m={m} selected={s.id === selected} onSelect={onSelect} hovered={hoveredRef.current === s.id} setHovered={setHovered} />
      ))}

      {/* OLED readout (decor, mirrors the selection) */}
      <group position={[0.23, 0.02, 0.0]} rotation={[0, -0.2, 0]}>
        <BoardOLED m={m} screen={oled.texture} />
      </group>

      {wires.map((w, i) => (
        <mesh key={i} geometry={w.geo}>
          <meshStandardMaterial color={w.color} roughness={0.5} metalness={0.1} />
        </mesh>
      ))}
    </>
  );
};

/** Minimal force-update: hover changes re-render only on enter/leave, never per move. */
function useReducerTick() {
  return useReducer((x: number) => x + 1, 0);
}

const HardwareScene = ({
  selected,
  onSelect,
  active,
  quality,
  onReady,
  onLost,
}: {
  selected: HardwareId;
  onSelect: (id: HardwareId) => void;
  active: boolean;
  quality: "high" | "low";
  onReady: () => void;
  onLost: () => void;
}) => {
  useEffect(bindPointer, []);
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, quality === "high" ? 1.6 : 1.2]}
      raycaster={{ params: { Line: { threshold: 0.008 }, Points: { threshold: 0.012 } } as THREE.RaycasterParameters }}
      camera={{ position: [0, 1.22, 1.3], fov: 36, near: 0.05, far: 20 }}
      gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
      style={{ background: "transparent" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onLost();
        });
      }}
      onPointerMissed={() => (document.body.style.cursor = "")}
    >
      <Bench selected={selected} onSelect={onSelect} onReady={onReady} />
    </Canvas>
  );
};

export default HardwareScene;
