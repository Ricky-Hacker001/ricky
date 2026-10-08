import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Palette } from "./materials";
import { terminalTexture } from "./canvasTextures";

/**
 * Low-poly electronics shared by the hero and the Hardware Lab.
 * Repeated parts (header pins) are a single InstancedMesh per board.
 */

type V3 = THREE.Vector3Tuple;

const PIN_GEO = new THREE.BoxGeometry(0.008, 0.022, 0.008);

export const Pins = ({ positions, m }: { positions: V3[]; m: Palette }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const d = new THREE.Object3D();
    positions.forEach((p, i) => {
      d.position.set(...p);
      d.updateMatrix();
      mesh.setMatrixAt(i, d.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);
  return <instancedMesh ref={ref} args={[PIN_GEO, m.pin, positions.length]} />;
};

/** n evenly spaced points along x (or z) */
const row = (n: number, from: number, to: number, fixed: [number, number], axis: "x" | "z" = "x"): V3[] =>
  Array.from({ length: n }, (_, i) => {
    const v = from + ((to - from) * i) / Math.max(n - 1, 1);
    return axis === "x" ? [v, fixed[0], fixed[1]] : [fixed[1], fixed[0], v];
  });

/* ------------------------------------------------------------------ */

export const BoardESP32 = ({ m }: { m: Palette }) => {
  const pins = useMemo(
    () => [...row(15, -0.11, 0.11, [-0.017, 0.05]), ...row(15, -0.11, 0.11, [-0.017, -0.05])],
    []
  );
  return (
    <group>
      <mesh material={m.pcbBlack}>
        <boxGeometry args={[0.27, 0.012, 0.12]} />
      </mesh>
      <mesh position={[-0.035, 0.016, 0]} material={m.metal}>
        <boxGeometry args={[0.1, 0.02, 0.08]} />
      </mesh>
      {/* PCB antenna trace */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-0.115, 0.0065, -0.03 + i * 0.02]} material={m.redSoft}>
          <boxGeometry args={[0.022, 0.001, 0.004]} />
        </mesh>
      ))}
      <mesh position={[0.125, 0.012, 0]} material={m.metal}>
        <boxGeometry args={[0.03, 0.014, 0.045]} />
      </mesh>
      <mesh position={[0.07, 0.009, 0.03]} material={m.red}>
        <boxGeometry args={[0.008, 0.004, 0.008]} />
      </mesh>
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const BoardRPi = ({ m }: { m: Palette }) => {
  const pins = useMemo(
    () => [...row(20, -0.12, 0.12, [0.022, -0.092]), ...row(20, -0.12, 0.12, [0.022, -0.078])],
    []
  );
  return (
    <group>
      <mesh material={m.pcb}>
        <boxGeometry args={[0.34, 0.012, 0.22]} />
      </mesh>
      <mesh position={[-0.03, 0.012, 0.01]} material={m.metal}>
        <boxGeometry args={[0.06, 0.012, 0.06]} />
      </mesh>
      <mesh position={[0.045, 0.01, 0.01]} material={m.pcbBlack}>
        <boxGeometry args={[0.05, 0.008, 0.035]} />
      </mesh>
      {[-0.05, 0.02].map((z) => (
        <mesh key={z} position={[0.14, 0.035, z]} material={m.metal}>
          <boxGeometry args={[0.07, 0.06, 0.055]} />
        </mesh>
      ))}
      <mesh position={[0.14, 0.03, 0.082]} material={m.metal}>
        <boxGeometry args={[0.07, 0.05, 0.05]} />
      </mesh>
      <mesh position={[0, 0.012, -0.085]} material={m.pcbBlack}>
        <boxGeometry args={[0.26, 0.012, 0.03]} />
      </mesh>
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const Microchip = ({ m }: { m: Palette }) => {
  const pins = useMemo(() => {
    const out: V3[] = [];
    for (let i = 0; i < 8; i++) {
      const v = -0.07 + i * 0.02;
      out.push([v, 0, 0.1], [v, 0, -0.1], [0.1, 0, v], [-0.1, 0, v]);
    }
    return out;
  }, []);
  return (
    <group>
      <mesh material={m.darkMetal}>
        <boxGeometry args={[0.18, 0.03, 0.18]} />
      </mesh>
      <mesh position={[-0.055, 0.0155, 0.055]} rotation={[-Math.PI / 2, 0, 0]} material={m.white}>
        <circleGeometry args={[0.008, 12]} />
      </mesh>
      <mesh position={[0, 0.0155, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.redSoft}>
        <ringGeometry args={[0.03, 0.033, 4, 1, Math.PI / 4]} />
      </mesh>
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const CyberLock = ({ m }: { m: Palette }) => {
  const body = useMemo(() => new RoundedBoxGeometry(0.18, 0.15, 0.07, 3, 0.02), []);
  return (
    <group>
      <mesh geometry={body} material={m.darkMetal} />
      <mesh position={[0, 0.075, 0]} material={m.metal}>
        <torusGeometry args={[0.058, 0.013, 8, 24, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.012, 0.036]} material={m.red}>
        <circleGeometry args={[0.014, 16]} />
      </mesh>
      <mesh position={[0, -0.014, 0.036]} material={m.red}>
        <planeGeometry args={[0.008, 0.03]} />
      </mesh>
    </group>
  );
};

export const NetworkNode = ({ m }: { m: Palette }) => {
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.13, 1)), []);
  return (
    <group>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#63d9ff" transparent opacity={0.45} />
      </lineSegments>
      <mesh material={m.red}>
        <icosahedronGeometry args={[0.034, 1]} />
      </mesh>
      {([[0.13, 0, 0], [-0.065, 0.11, 0.02], [0, -0.08, 0.1]] as V3[]).map((p, i) => (
        <mesh key={i} position={p} material={m.white}>
          <sphereGeometry args={[0.011, 8, 6]} />
        </mesh>
      ))}
    </group>
  );
};

let cubeTex: THREE.Texture | null = null;
export const TerminalCube = () => {
  const tex = useMemo(() => (cubeTex ??= terminalTexture(256, 256, "~/cube").texture), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.17, 0.17, 0.17)), []);
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.168, 0.168, 0.168]} />
        <meshBasicMaterial map={tex} transparent opacity={0.85} toneMapped={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
};

export const UsbStick = ({ m }: { m: Palette }) => {
  const body = useMemo(() => new RoundedBoxGeometry(0.055, 0.022, 0.15, 2, 0.008), []);
  return (
    <group>
      <mesh geometry={body} material={m.darkMetal} />
      <mesh position={[0, 0, 0.098]} material={m.metal}>
        <boxGeometry args={[0.04, 0.013, 0.048]} />
      </mesh>
      <mesh position={[0, 0.012, -0.05]} material={m.red}>
        <boxGeometry args={[0.012, 0.003, 0.006]} />
      </mesh>
    </group>
  );
};

/* ---------------- Hardware Lab only ---------------- */

export const BoardNRF24 = ({ m }: { m: Palette }) => {
  const pins = useMemo(() => [...row(4, -0.03, 0.03, [-0.017, 0.012], "z"), ...row(4, -0.03, 0.03, [-0.017, 0.028], "z")], []);
  return (
    <group>
      <mesh material={m.pcb}>
        <boxGeometry args={[0.2, 0.01, 0.09]} />
      </mesh>
      <mesh position={[0.06, 0.008, 0]} material={m.pcbBlack}>
        <boxGeometry args={[0.035, 0.006, 0.035]} />
      </mesh>
      {/* meander antenna */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-0.075 + i * 0.012, 0.0055, 0]} material={m.pin}>
          <boxGeometry args={[0.003, 0.001, 0.06]} />
        </mesh>
      ))}
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const BoardMega = ({ m }: { m: Palette }) => {
  const pins = useMemo(
    () => [...row(18, -0.16, 0.12, [0.016, 0.088]), ...row(18, -0.16, 0.12, [0.016, -0.088]), ...row(16, -0.08, 0.08, [0.016, 0.19], "z")],
    []
  );
  return (
    <group>
      <mesh material={m.pcb}>
        <boxGeometry args={[0.44, 0.012, 0.21]} />
      </mesh>
      <mesh position={[0.02, 0.012, 0]} rotation={[0, Math.PI / 4, 0]} material={m.pcbBlack}>
        <boxGeometry args={[0.06, 0.012, 0.06]} />
      </mesh>
      <mesh position={[-0.2, 0.025, 0.05]} material={m.metal}>
        <boxGeometry args={[0.06, 0.045, 0.05]} />
      </mesh>
      <mesh position={[-0.2, 0.025, -0.06]} material={m.pcbBlack}>
        <boxGeometry args={[0.06, 0.045, 0.035]} />
      </mesh>
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const BoardRFID = ({ m }: { m: Palette }) => {
  const coil = useMemo(() => {
    const geos: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 3; i++) {
      const w = 0.17 - i * 0.022;
      const h = 0.13 - i * 0.022;
      const r = 0.012;
      const s = new THREE.Shape();
      s.moveTo(-w / 2 + r, -h / 2);
      s.lineTo(w / 2 - r, -h / 2);
      s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      s.lineTo(w / 2, h / 2 - r);
      s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      s.lineTo(-w / 2 + r, h / 2);
      s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      s.lineTo(-w / 2, -h / 2 + r);
      s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      geos.push(new THREE.BufferGeometry().setFromPoints(s.getPoints(6)));
    }
    return geos;
  }, []);
  const pins = useMemo(() => row(8, -0.07, 0.07, [-0.016, 0.105]), []);
  return (
    <group>
      <mesh material={m.pcb}>
        <boxGeometry args={[0.24, 0.01, 0.2]} />
      </mesh>
      {coil.map((g, i) => (
        <lineLoop key={i} geometry={g} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0065, -0.012]}>
          <lineBasicMaterial color="#c9b06e" />
        </lineLoop>
      ))}
      {/* access card */}
      <mesh position={[0.05, 0.03, 0.02]} rotation={[0, 0.35, 0.06]}>
        <boxGeometry args={[0.17, 0.004, 0.108]} />
        <meshStandardMaterial color="#d8dbe0" roughness={0.4} />
      </mesh>
      <mesh position={[0.05, 0.0325, 0.02]} rotation={[-Math.PI / 2, 0, -0.35]} material={m.redSoft}>
        <planeGeometry args={[0.05, 0.006]} />
      </mesh>
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const BoardSonar = ({ m }: { m: Palette }) => {
  const pins = useMemo(() => row(4, -0.024, 0.024, [-0.016, 0.05]), []);
  return (
    <group>
      <mesh material={m.pcb}>
        <boxGeometry args={[0.2, 0.01, 0.09]} />
      </mesh>
      {[-0.052, 0.052].map((x) => (
        <group key={x} position={[x, 0.03, 0]}>
          <mesh material={m.metal}>
            <cylinderGeometry args={[0.034, 0.034, 0.05, 24]} />
          </mesh>
          <mesh position={[0, 0.0255, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.rubber}>
            <circleGeometry args={[0.028, 24]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0.012, -0.02]} material={m.metal}>
        <boxGeometry args={[0.025, 0.012, 0.01]} />
      </mesh>
      <Pins positions={pins} m={m} />
    </group>
  );
};

export const BoardOLED = ({ m, screen }: { m: Palette; screen: THREE.Texture }) => (
  <group>
    <mesh material={m.pcbBlack}>
      <boxGeometry args={[0.14, 0.01, 0.13]} />
    </mesh>
    <mesh position={[0, 0.006, -0.008]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.122, 0.072]} />
      <meshBasicMaterial map={screen} toneMapped={false} />
    </mesh>
  </group>
);
