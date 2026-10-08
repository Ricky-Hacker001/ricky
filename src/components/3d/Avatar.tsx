import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";
import { rng, segment, type Palette } from "./materials";

/**
 * Procedural engineer avatar — dark jacket + hoodie, cargo pants, curly
 * hair, around-the-neck headphones and an AR visor. Built from ~40 low-poly
 * primitives sharing a handful of materials (rim-lit via shader, no extra
 * lights). Idle breathing, body sway and pointer-follow head movement are
 * written straight to refs in useFrame — zero React re-renders.
 *
 * Coordinates are metres; feet at y = 0, facing +z.
 */

type V3 = THREE.Vector3Tuple;

/** Tapered limb from a (radius r) to b (radius r2); joints are separate spheres. */
const Limb = ({ a, b, r, r2 = r, mat }: { a: V3; b: V3; r: number; r2?: number; mat: THREE.Material }) => {
  const s = useMemo(() => segment(a, b), [a, b]);
  return (
    <mesh position={s.position} quaternion={s.quaternion} material={mat}>
      <cylinderGeometry args={[r2, r, s.length, 16, 1, true]} />
    </mesh>
  );
};

const Joint = ({ p, r, mat }: { p: V3; r: number; mat: THREE.Material }) => (
  <mesh position={p} material={mat}>
    <sphereGeometry args={[r, 16, 12]} />
  </mesh>
);

/* ---- skeleton (static pose) ---- */
const HIP_R: V3 = [-0.095, 0.93, 0];
const KNEE_R: V3 = [-0.105, 0.5, 0.015];
const ANKLE_R: V3 = [-0.115, 0.1, 0];
const HIP_L: V3 = [0.095, 0.93, 0];
const KNEE_L: V3 = [0.135, 0.5, 0.045];
const ANKLE_L: V3 = [0.165, 0.1, 0.0];

const SH_R: V3 = [-0.198, 1.395, -0.005];
const EL_R: V3 = [-0.262, 1.13, -0.03];
const WR_R: V3 = [-0.175, 0.955, 0.075];
const SH_L: V3 = [0.198, 1.395, -0.005];
const EL_L: V3 = [0.325, 1.155, 0.03];
const WR_L: V3 = [0.47, 0.86, 0.12];

const PROFILE: [number, number][] = [
  [0.001, 0.84], [0.168, 0.84], [0.166, 0.9], [0.165, 0.98], [0.172, 1.08], [0.186, 1.2], [0.205, 1.3],
  [0.222, 1.37], [0.214, 1.425], [0.17, 1.475], [0.09, 1.512], [0.001, 1.525],
];
const DEPTH = 0.62;

function radiusAt(y: number) {
  for (let i = 0; i < PROFILE.length - 1; i++) {
    const [r0, y0] = PROFILE[i];
    const [r1, y1] = PROFILE[i + 1];
    if (y >= y0 && y <= y1) return r0 + ((y - y0) / (y1 - y0)) * (r1 - r0);
  }
  return 0.15;
}

const Avatar = ({ m }: { m: Palette }) => {
  const root = useRef<THREE.Group>(null);
  const upper = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const hair = useRef<THREE.InstancedMesh>(null);
  const look = useRef({ yaw: -0.3, pitch: 0 });

  const geo = useMemo(() => {
    const torso = new THREE.LatheGeometry(
      PROFILE.map(([r, y]) => new THREE.Vector2(r, y)),
      28
    );
    torso.scale(1, 1, DEPTH);
    torso.computeVertexNormals();

    const inner = torso.clone();
    inner.scale(0.985, 1, 1.0);

    const zipPts: THREE.Vector3[] = [];
    for (let y = 0.86; y <= 1.47; y += 0.035) zipPts.push(new THREE.Vector3(0, y, radiusAt(y) * DEPTH + 0.0035));
    const zipper = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(zipPts), 24, 0.0028, 5, false);

    const shoe = new THREE.CapsuleGeometry(0.052, 0.17, 4, 12);
    shoe.rotateX(Math.PI / 2);
    shoe.scale(1.05, 0.72, 1);
    const sole = new THREE.CapsuleGeometry(0.056, 0.18, 4, 12);
    sole.rotateX(Math.PI / 2);
    sole.scale(1.08, 0.28, 1.02);

    return { torso, inner, zipper, shoe, sole };
  }, []);

  /* curly hair: one instanced mesh, deterministic placement */
  useLayoutEffect(() => {
    const mesh = hair.current;
    if (!mesh) return;
    const rand = rng(7);
    const d = new THREE.Object3D();
    let i = 0;
    while (i < mesh.count) {
      const u = rand();
      const v = rand();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(1 - v * 1.15); // top cap → slightly past equator
      const dir = new THREE.Vector3(Math.sin(phi) * Math.sin(theta), Math.cos(phi), Math.sin(phi) * Math.cos(theta));
      // keep the face clear: skip low front directions
      if (dir.z > 0.35 && dir.y < 0.55) continue;
      if (dir.y < -0.05 && dir.z > -0.4) continue;
      d.position.set(dir.x * 0.098, 0.085 + dir.y * 0.118, dir.z * 0.104 - 0.006);
      const s = 0.75 + rand() * 0.55;
      d.scale.set(s, s * (0.85 + rand() * 0.3), s);
      d.rotation.set(rand() * 3, rand() * 3, rand() * 3);
      d.updateMatrix();
      mesh.setMatrixAt(i, d.matrix);
      i++;
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = state.clock.elapsedTime;
    const breath = Math.sin(t * 1.65);

    if (upper.current) {
      upper.current.scale.set(1 + breath * 0.0035, 1 + breath * 0.006, 1 + breath * 0.008);
      upper.current.rotation.x = breath * 0.006;
      upper.current.rotation.y = look.current.yaw * 0.12 + 0.04;
    }
    if (root.current) {
      root.current.rotation.z = Math.sin(t * 0.42) * 0.006;
      root.current.position.x = Math.sin(t * 0.42) * 0.004;
    }

    const k = 1 - Math.exp(-dt * 2.8);
    const tYaw = THREE.MathUtils.clamp(pointer.nx * 0.6 - 0.32, -0.9, 0.35) + Math.sin(t * 0.55) * 0.035;
    const tPitch = THREE.MathUtils.clamp(-pointer.ny * 0.22, -0.22, 0.22) + Math.sin(t * 0.8) * 0.015 + 0.03;
    look.current.yaw += (tYaw - look.current.yaw) * k;
    look.current.pitch += (tPitch - look.current.pitch) * k;
    if (head.current) {
      head.current.rotation.y = look.current.yaw;
      head.current.rotation.x = look.current.pitch;
      head.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={root}>
      {/* ---------------- legs ---------------- */}
      <Limb a={HIP_R} b={KNEE_R} r={0.088} r2={0.062} mat={m.pants} />
      <Limb a={KNEE_R} b={ANKLE_R} r={0.06} r2={0.052} mat={m.pants} />
      <Limb a={HIP_L} b={KNEE_L} r={0.088} r2={0.062} mat={m.pants} />
      <Limb a={KNEE_L} b={ANKLE_L} r={0.06} r2={0.052} mat={m.pants} />
      <Joint p={KNEE_R} r={0.0605} mat={m.pants} />
      <Joint p={KNEE_L} r={0.0605} mat={m.pants} />
      <Joint p={ANKLE_R} r={0.052} mat={m.pants} />
      <Joint p={ANKLE_L} r={0.052} mat={m.pants} />
      {/* cargo pocket */}
      <mesh position={[-0.168, 0.66, 0.0]} rotation={[0, 0, 0.02]} material={m.pants}>
        <boxGeometry args={[0.03, 0.13, 0.1]} />
      </mesh>
      {/* sneakers */}
      {[ANKLE_R, ANKLE_L].map((a, i) => (
        <group key={i} position={[a[0], 0.05, a[2] + 0.055]} rotation={[0, i ? 0.22 : -0.06, 0]}>
          <mesh geometry={geo.shoe} material={m.shoe} position={[0, 0.012, 0]} />
          <mesh geometry={geo.sole} material={m.sole} position={[0, -0.022, 0.004]} />
          <mesh position={[0, 0.03, -0.11]} material={m.redSoft}>
            <boxGeometry args={[0.04, 0.012, 0.006]} />
          </mesh>
        </group>
      ))}

      {/* pelvis + belt */}
      <Limb a={[-0.105, 0.95, 0]} b={[0.105, 0.95, 0]} r={0.1} mat={m.pants} />
      <Joint p={[-0.105, 0.95, 0]} r={0.1} mat={m.pants} />
      <Joint p={[0.105, 0.95, 0]} r={0.1} mat={m.pants} />

      {/* ---------------- upper body (breathes from the waist) ---------------- */}
      <group ref={upper} position={[0, 0.98, 0]}>
        <group position={[0, -0.98, 0]}>
          <mesh geometry={geo.inner} material={m.jacketInner} />
          <mesh geometry={geo.torso} material={m.jacket} position={[0, 0, -0.004]} scale={[1.02, 1, 1.0]} />
          <mesh geometry={geo.zipper} material={m.red} />
          <mesh position={[0, 1.3, radiusAt(1.3) * DEPTH + 0.008]} material={m.metal}>
            <boxGeometry args={[0.012, 0.03, 0.006]} />
          </mesh>
          {/* jacket hem */}
          <mesh position={[0, 0.848, -0.004]} rotation={[Math.PI / 2, 0, 0]} scale={[1.03, DEPTH * 1.03, 1]} material={m.jacketInner}>
            <torusGeometry args={[0.165, 0.012, 6, 32]} />
          </mesh>
          {/* chest patch — tiny technical label */}
          <mesh position={[0.1, 1.31, radiusAt(1.31) * DEPTH - 0.003]} rotation={[0, 0.42, 0]} material={m.redSoft}>
            <planeGeometry args={[0.04, 0.012]} />
          </mesh>

          {/* hood bunched behind the neck */}
          <mesh position={[0, 1.495, -0.05]} rotation={[-Math.PI / 2 - 0.25, 0, 0]} scale={[1, 1, 1.25]} material={m.jacket}>
            <torusGeometry args={[0.105, 0.045, 10, 22, Math.PI]} />
          </mesh>

          {/* standing collar around the neck */}
          <mesh position={[0, 1.49, 0.005]} scale={[1.08, 1, DEPTH * 1.12]} material={m.jacket}>
            <cylinderGeometry args={[0.082, 0.1, 0.07, 24, 1, true]} />
          </mesh>
          <mesh position={[0, 1.525, 0.005]} scale={[1.08, 1, DEPTH * 1.12]} material={m.jacketInner}>
            <torusGeometry args={[0.082, 0.009, 6, 24]} />
          </mesh>

          {/* shoulders + raglan seam accent */}
          <Joint p={SH_R} r={0.072} mat={m.jacket} />
          <Joint p={SH_L} r={0.072} mat={m.jacket} />
          {[SH_R, SH_L].map((s, i) => (
            <mesh key={i} position={[s[0] * 0.78, s[1] - 0.02, radiusAt(1.4) * DEPTH * 0.5]} rotation={[0, 0, (i ? 1 : -1) * 0.5]} material={m.redSoft}>
              <boxGeometry args={[0.004, 0.14, 0.004]} />
            </mesh>
          ))}

          {/* right arm — hand in pocket */}
          <Limb a={SH_R} b={EL_R} r={0.07} r2={0.056} mat={m.jacket} />
          <Joint p={EL_R} r={0.0555} mat={m.jacket} />
          <Limb a={EL_R} b={WR_R} r={0.054} r2={0.046} mat={m.jacket} />
          {/* cuff */}
          <mesh position={WR_R} rotation={[0.4, 0, 0.2]} material={m.jacketInner}>
            <torusGeometry args={[0.047, 0.011, 6, 18]} />
          </mesh>
          <Joint p={WR_R} r={0.044} mat={m.jacketInner} />
          <mesh position={[WR_R[0] + 0.012, WR_R[1] - 0.03, WR_R[2] - 0.01]} scale={[0.85, 1.1, 0.7]} material={m.skin}>
            <sphereGeometry args={[0.042, 12, 10]} />
          </mesh>

          {/* left arm — leaning on the desk */}
          <Limb a={SH_L} b={EL_L} r={0.07} r2={0.056} mat={m.jacket} />
          <Joint p={EL_L} r={0.0555} mat={m.jacket} />
          <Limb a={EL_L} b={WR_L} r={0.054} r2={0.046} mat={m.jacket} />
          <mesh position={[0.505, 0.808, 0.14]} rotation={[0, -0.5, 0.18]} scale={[1.25, 0.5, 1]} material={m.skin}>
            <sphereGeometry args={[0.048, 14, 10]} />
          </mesh>
          {/* jacket cuff + smart band on the left wrist */}
          <mesh position={[WR_L[0] - 0.03, WR_L[1] + 0.012, WR_L[2] - 0.02]} rotation={[0.3, 0, -0.95]} material={m.jacketInner}>
            <torusGeometry args={[0.05, 0.012, 6, 18]} />
          </mesh>
          <mesh position={WR_L} rotation={[0.3, 0, -0.95]} material={m.rubber}>
            <torusGeometry args={[0.046, 0.009, 6, 18]} />
          </mesh>
          <mesh position={[WR_L[0] + 0.012, WR_L[1] - 0.002, WR_L[2] + 0.03]} rotation={[0.3, 0, -0.95]} material={m.red}>
            <boxGeometry args={[0.016, 0.022, 0.003]} />
          </mesh>

          {/* neck */}
          <Limb a={[0, 1.47, 0]} b={[0, 1.61, 0.012]} r={0.05} r2={0.045} mat={m.skin} />

          {/* headphones around the neck */}
          <group position={[0, 1.468, 0.01]}>
            <mesh rotation={[-Math.PI / 2 - 0.35, 0, 0]} material={m.rubber}>
              <torusGeometry args={[0.112, 0.011, 6, 26, Math.PI]} />
            </mesh>
            {[-1, 1].map((s) => (
              <group key={s} position={[s * 0.112, -0.012, 0.03]} rotation={[0.5, 0, (s * Math.PI) / 2]}>
                <mesh material={m.rubber}>
                  <cylinderGeometry args={[0.047, 0.047, 0.034, 22]} />
                </mesh>
                <mesh position={[0, s * -0.0175, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.red}>
                  <torusGeometry args={[0.034, 0.0022, 4, 28]} />
                </mesh>
              </group>
            ))}
          </group>
        </group>

        {/* ---------------- head (pointer-follow) ---------------- */}
        <group ref={head} position={[0, 0.585, 0.012]}>
          <mesh position={[0, 0.075, 0.004]} scale={[0.88, 1.1, 1]} material={m.skin}>
            <sphereGeometry args={[0.105, 28, 20]} />
          </mesh>
          {/* beard / jaw */}
          <mesh position={[0, 0.022, 0.032]} scale={[0.96, 0.72, 0.9]} material={m.hair}>
            <sphereGeometry args={[0.08, 16, 12]} />
          </mesh>
          {/* moustache line */}
          <mesh position={[0, 0.05, 0.1]} rotation={[0.2, 0, 0]} scale={[1, 0.35, 0.5]} material={m.hair}>
            <sphereGeometry args={[0.032, 10, 6]} />
          </mesh>
          {/* nose */}
          <mesh position={[0, 0.072, 0.104]} scale={[0.8, 1.2, 1]} material={m.skin}>
            <sphereGeometry args={[0.017, 10, 8]} />
          </mesh>
          {/* ears */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.092, 0.075, -0.004]} scale={[0.45, 1, 0.8]} material={m.skin}>
              <sphereGeometry args={[0.024, 10, 8]} />
            </mesh>
          ))}
          {/* AR visor */}
          <mesh position={[0, 0.093, 0.004]} scale={[0.9, 1, 1]} material={m.visor}>
            <cylinderGeometry args={[0.111, 0.108, 0.036, 28, 1, true, -1.15, 2.3]} />
          </mesh>
          <mesh position={[0, 0.074, 0.004]} scale={[0.9, 1, 1]} material={m.red}>
            <cylinderGeometry args={[0.1125, 0.1125, 0.0022, 28, 1, true, -1.05, 2.1]} />
          </mesh>
          {/* curly hair */}
          <instancedMesh ref={hair} args={[undefined, undefined, 34]} material={m.hair}>
            <icosahedronGeometry args={[0.042, 1]} />
          </instancedMesh>
        </group>
      </group>
    </group>
  );
};

export default Avatar;
