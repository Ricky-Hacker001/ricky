import * as THREE from "three";

/**
 * Shared materials + a cheap fresnel "rim light" injected into standard
 * materials. This gives the signature red edge glow without extra dynamic
 * lights or post-processing.
 */

const RIM_KEY = "rim-v1";

export function withRim<T extends THREE.MeshStandardMaterial>(
  mat: T,
  { red = 0.9, cyan = 0.3, power = 3.2 }: { red?: number; cyan?: number; power?: number } = {}
): T {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.rimRed = { value: new THREE.Color("#ff2d3d").multiplyScalar(red) };
    shader.uniforms.rimCyan = { value: new THREE.Color("#63d9ff").multiplyScalar(cyan) };
    shader.uniforms.rimPower = { value: power };
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform vec3 rimRed;\nuniform vec3 rimCyan;\nuniform float rimPower;"
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        {
          float fres = pow(1.0 - saturate(dot(normal, normalize(vViewPosition))), rimPower);
          float side = smoothstep(0.0, 0.9, normal.x);
          totalEmissiveRadiance += rimRed * fres * side;
          totalEmissiveRadiance += rimCyan * fres * smoothstep(0.1, 0.9, -normal.x) * 0.6;
        }`
      );
  };
  mat.customProgramCacheKey = () => `${RIM_KEY}-${red}-${cyan}-${power}`;
  return mat;
}

/** Lazily-created material palette (one instance per scene mount). */
export function createPalette() {
  const std = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
  const phys = (p: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(p);
  return {
    // Technical shell jacket — matte fabric with a faint clearcoat sheen and env reflections.
    jacket: withRim(phys({ color: "#191c22", roughness: 0.58, metalness: 0.18, clearcoat: 0.3, clearcoatRoughness: 0.5, sheen: 0.4, sheenColor: new THREE.Color("#2a2f3a"), envMapIntensity: 0.7 })),
    jacketInner: withRim(std({ color: "#24272e", roughness: 0.78, metalness: 0.04, envMapIntensity: 0.4 }), { red: 0.6 }),
    pants: withRim(phys({ color: "#14161b", roughness: 0.8, metalness: 0.06, sheen: 0.3, sheenColor: new THREE.Color("#23262e"), envMapIntensity: 0.45 }), { red: 0.7 }),
    skin: withRim(phys({ color: "#80512f", roughness: 0.42, metalness: 0.0, clearcoat: 0.25, clearcoatRoughness: 0.55, envMapIntensity: 0.35 }), { red: 0.5, cyan: 0.18, power: 3.4 }),
    hair: withRim(std({ color: "#0d0d10", roughness: 0.85, metalness: 0.0, flatShading: true, envMapIntensity: 0.3 }), { red: 0.85, power: 2.2 }),
    shoe: withRim(phys({ color: "#1d2027", roughness: 0.42, metalness: 0.25, clearcoat: 0.4, clearcoatRoughness: 0.4, envMapIntensity: 0.6 }), { red: 0.7 }),
    sole: std({ color: "#d2d5db", roughness: 0.55 }),
    rubber: withRim(phys({ color: "#0d0e11", roughness: 0.4, metalness: 0.4, clearcoat: 0.5, clearcoatRoughness: 0.3, envMapIntensity: 0.7 }), { red: 0.8 }),
    visor: new THREE.MeshPhysicalMaterial({
      color: "#050507",
      roughness: 0.08,
      metalness: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    }),
    metal: std({ color: "#8a9099", roughness: 0.28, metalness: 1.0 }),
    darkMetal: withRim(std({ color: "#0d0f12", roughness: 0.45, metalness: 0.6, envMapIntensity: 0.5 }), { red: 0.5 }),
    pcb: std({ color: "#0b1210", roughness: 0.55, metalness: 0.25 }),
    pcbBlack: std({ color: "#0a0b0e", roughness: 0.5, metalness: 0.3 }),
    pin: std({ color: "#b8a774", roughness: 0.3, metalness: 1.0 }),
    red: new THREE.MeshBasicMaterial({ color: "#ff2d3d", toneMapped: false }),
    redSoft: new THREE.MeshBasicMaterial({ color: "#ff2d3d", transparent: true, opacity: 0.55, toneMapped: false }),
    cyan: new THREE.MeshBasicMaterial({ color: "#63d9ff", toneMapped: false }),
    white: new THREE.MeshBasicMaterial({ color: "#e9edf2", toneMapped: false }),
  };
}

export type Palette = ReturnType<typeof createPalette>;

/** Deterministic PRNG so procedural details are stable between renders. */
export function rng(seed = 1) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const UP = new THREE.Vector3(0, 1, 0);

/** Position + quaternion for a capsule spanning a → b. */
export function segment(a: THREE.Vector3Tuple, b: THREE.Vector3Tuple) {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const dir = vb.clone().sub(va);
  const length = dir.length();
  const quat = new THREE.Quaternion().setFromUnitVectors(UP, dir.normalize());
  const mid = va.add(vb).multiplyScalar(0.5);
  return { position: mid.toArray() as THREE.Vector3Tuple, quaternion: quat, length };
}
