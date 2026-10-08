import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { pointer } from "@/lib/pointer";

const DRACO_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";
const BASIS_PATH = `https://cdn.jsdelivr.net/npm/three@0.${THREE.REVISION}.0/examples/jsm/libs/basis/`;

/**
 * Optional production avatar: a Draco-compressed GLB (KTX2 textures allowed),
 * enabled by setting AVATAR.modelUrl. Only loaded when configured — the
 * decoder is fetched on demand. Plays the first animation clip if present
 * (ideally an idle loop) and turns the head bone toward the pointer.
 */
const GltfAvatar = ({ url }: { url: string }) => {
  const gl = useThree((s) => s.gl);
  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const draco = new DRACOLoader().setDecoderPath(DRACO_PATH);
    const ktx2 = new KTX2Loader().setTranscoderPath(BASIS_PATH).detectSupport(gl);
    loader.setDRACOLoader(draco);
    loader.setKTX2Loader(ktx2);
  });

  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), [gltf]);
  const headBone = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    headBone.current = gltf.scene.getObjectByName("Head") ?? gltf.scene.getObjectByName("mixamorigHead") ?? null;
    if (gltf.animations[0]) mixer.clipAction(gltf.animations[0]).play();
    return () => {
      mixer.stopAllAction();
    };
  }, [gltf, mixer]);

  useFrame((_, dt) => {
    mixer.update(Math.min(dt, 0.05));
    const h = headBone.current;
    if (h) {
      h.rotation.y += (THREE.MathUtils.clamp(pointer.nx * 0.6 - 0.3, -0.8, 0.4) - h.rotation.y) * 0.08;
      h.rotation.x += (-pointer.ny * 0.2 - h.rotation.x) * 0.08;
    }
  });

  return <primitive object={gltf.scene} />;
};

export default GltfAvatar;
