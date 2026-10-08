/**
 * Device capability detection. Decides how much 3D a visitor gets:
 *   high → full hero scene + hardware lab
 *   low  → reduced scene (lower DPR, fewer particles/objects)
 *   none → static image + CSS fallbacks (no WebGL work at all)
 *
 * Override for testing with ?3d=high|low|none
 */
export type Tier = "high" | "low" | "none";

let probe: { webgl: boolean; renderer: string } | null = null;

function probeWebGL() {
  if (probe) return probe;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      probe = { webgl: false, renderer: "" };
      return probe;
    }
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    probe = { webgl: true, renderer };
  } catch {
    probe = { webgl: false, renderer: "" };
  }
  return probe;
}

export function hasWebGL(): boolean {
  return probeWebGL().webgl;
}

let cached: Tier | null = null;

export function detectTier(): Tier {
  if (cached) return cached;
  if (typeof window === "undefined") return "none";

  const forced = new URLSearchParams(window.location.search).get("3d");
  if (forced === "high" || forced === "low" || forced === "none") return (cached = forced);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return (cached = "none");

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "")) return (cached = "none");

  const { webgl, renderer } = probeWebGL();
  if (!webgl) return (cached = "none");
  // Software rasterisers make any WebGL scene stutter.
  if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) return (cached = "none");

  const mem = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 4;
  if (mem <= 2 || cores <= 2) return (cached = "none");

  const mobile = window.matchMedia("(max-width: 820px), (pointer: coarse)").matches;
  if (mobile || mem < 6 || cores < 6) return (cached = "low");
  return (cached = "high");
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
