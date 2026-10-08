/**
 * Single global pointer tracker shared by the cursor, 3D scenes and parallax.
 * Values are written to a plain mutable object — reading them in rAF/useFrame
 * never triggers a React render.
 */
export const pointer = {
  /** pixels */
  x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  /** normalised -1..1, y up */
  nx: 0,
  ny: 0,
  moved: false,
};

let bound = false;

export function bindPointer() {
  if (bound || typeof window === "undefined") return;
  bound = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ny = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.moved = true;
    },
    { passive: true }
  );
}
