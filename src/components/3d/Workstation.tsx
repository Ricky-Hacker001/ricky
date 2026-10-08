import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { floorTexture, keyboardTexture, terminalTexture } from "./canvasTextures";
import type { Palette } from "./materials";
import { BoardRPi } from "./Devices";

/**
 * Desk, monitor (live terminal), keyboard, a Raspberry Pi and the circular
 * stage floor with baked contact shadows. No real-time shadows.
 */
const Workstation = ({ m, animate }: { m: Palette; animate: boolean }) => {
  const led = useRef<THREE.MeshBasicMaterial>(null);

  const res = useMemo(() => {
    const term = terminalTexture(640, 380, "ricky@lab: ~/weird-things");
    return {
      term,
      floor: floorTexture(512, [
        [0.5, 0.5, 0.11, 0.07], // feet
        [0.73, 0.5, 0.2, 0.17], // desk
      ]),
      keys: keyboardTexture(),
      top: new RoundedBoxGeometry(1.06, 0.034, 0.6, 2, 0.012),
      panel: new RoundedBoxGeometry(0.66, 0.4, 0.026, 2, 0.012),
    };
  }, []);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(res.term.step, 750);
    return () => window.clearInterval(id);
  }, [animate, res]);

  useFrame(({ clock }) => {
    if (led.current) led.current.opacity = 0.35 + 0.65 * (Math.sin(clock.elapsedTime * 5) > 0.2 ? 1 : 0);
  });

  return (
    <group>
      {/* stage floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.35, 0.001, 0]}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial map={res.floor} transparent depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.35, 0.003, 0]} material={m.redSoft}>
        <ringGeometry args={[1.32, 1.326, 128]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.35, 0.003, 0]}>
        <ringGeometry args={[1.62, 1.623, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>

      {/* desk */}
      <group position={[0.95, 0, -0.05]}>
        <mesh geometry={res.top} position={[0, 0.765, 0]} material={m.darkMetal} />
        {/* LED strip under the front edge */}
        <mesh position={[0, 0.745, 0.302]} material={m.redSoft}>
          <boxGeometry args={[0.98, 0.004, 0.004]} />
        </mesh>
        {/* slim steel frame legs */}
        {[-0.47, 0.47].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            {[-0.22, 0.22].map((z) => (
              <mesh key={z} position={[0, 0.375, z]} material={m.darkMetal}>
                <boxGeometry args={[0.028, 0.75, 0.028]} />
              </mesh>
            ))}
            <mesh position={[0, 0.06, 0]} material={m.darkMetal}>
              <boxGeometry args={[0.028, 0.028, 0.47]} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.69, -0.22]} material={m.darkMetal}>
          <boxGeometry args={[0.94, 0.06, 0.012]} />
        </mesh>

        {/* monitor */}
        <group position={[0.06, 0.785, -0.17]} rotation={[0, -0.5, 0]}>
          <mesh position={[0, 0.005, 0]} material={m.darkMetal}>
            <boxGeometry args={[0.22, 0.01, 0.15]} />
          </mesh>
          <mesh position={[0, 0.13, -0.03]} material={m.darkMetal}>
            <boxGeometry args={[0.04, 0.25, 0.02]} />
          </mesh>
          <group position={[0, 0.39, 0]} rotation={[-0.06, 0, 0]}>
            <mesh geometry={res.panel} material={m.rubber} />
            <mesh position={[0, 0, 0.0135]}>
              <planeGeometry args={[0.63, 0.37]} />
              <meshBasicMaterial map={res.term.texture} toneMapped={false} />
            </mesh>
          </group>
        </group>

        {/* keyboard */}
        <group position={[-0.04, 0.792, 0.1]} rotation={[0, -0.15, 0]}>
          <mesh material={m.rubber}>
            <boxGeometry args={[0.42, 0.016, 0.14]} />
          </mesh>
          <mesh position={[0, 0.0085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.41, 0.13]} />
            <meshBasicMaterial map={res.keys} />
          </mesh>
        </group>

        {/* raspberry pi on the bench */}
        <group position={[0.36, 0.79, 0.12]} rotation={[0, 0.6, 0]} scale={0.55}>
          <BoardRPi m={m} />
          <mesh position={[0.14, 0.025, 0.08]}>
            <sphereGeometry args={[0.008, 8, 6]} />
            <meshBasicMaterial ref={led} color="#ff2d3d" transparent toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default Workstation;
