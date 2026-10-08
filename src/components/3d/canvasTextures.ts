import * as THREE from "three";

/**
 * Small 2D-canvas textures for screens and holograms. Each one is a single
 * low-res canvas that can be redrawn occasionally (never per frame).
 */

const MONO = "500 15px 'JetBrains Mono', ui-monospace, monospace";

export function canvasTexture(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { canvas, ctx, texture };
}

const TERMINAL_LINES = [
  ["$ ", "nmap -sV lab.local"],
  ["", "22/tcp  open  ssh"],
  ["", "80/tcp  open  http"],
  ["$ ", "python3 open_cobra.py --recon"],
  ["", "[+] modules loaded: 4"],
  ["$ ", "npx leakwatch scan"],
  ["", "✓ 0 secrets found"],
  ["$ ", "ssh pi@rpi-lab"],
  ["", "rpi-lab: monitor mode ON"],
  ["$ ", "docker compose up -d"],
  ["", "gateway · catalog · orders"],
  ["$ ", "./build_weird_things.sh"],
];

/** Scrolling terminal — call `step()` every ~600ms to advance one line. */
export function terminalTexture(w = 512, h = 320, title = "ricky@lab: ~", holo = false) {
  const t = canvasTexture(w, h);
  let offset = 0;
  const draw = () => {
    const { ctx } = t;
    ctx.clearRect(0, 0, w, h);
    // holographic panels are drawn additively, so keep their background black
    ctx.fillStyle = holo ? "rgba(0,0,0,1)" : "rgba(8,10,14,0.92)";
    ctx.fillRect(0, 0, w, h);
    if (holo) {
      ctx.fillStyle = "rgba(99,217,255,0.05)";
      ctx.fillRect(0, 0, w, h);
    }
    ctx.strokeStyle = holo ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)";
    ctx.strokeRect(1, 1, w - 2, h - 2);
    // title bar
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillRect(0, 0, w, 30);
    ["#ff2d3d", "#3a3f48", "#3a3f48"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(18 + i * 16, 15, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "500 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(220,225,232,0.6)";
    ctx.fillText(title, 74, 19);

    ctx.font = MONO;
    const rows = Math.floor((h - 46) / 22);
    for (let i = 0; i < rows; i++) {
      const [p, s] = TERMINAL_LINES[(offset + i) % TERMINAL_LINES.length];
      const y = 54 + i * 22;
      ctx.fillStyle = "#ff4553";
      ctx.fillText(p, 16, y);
      ctx.fillStyle = p ? "#eef0f3" : "rgba(170,180,192,0.8)";
      ctx.fillText(s, 16 + (p ? 18 : 0), y);
    }
    // caret
    ctx.fillStyle = "#ff2d3d";
    ctx.fillRect(16, 54 + rows * 22 - 14, 9, 16);
    t.texture.needsUpdate = true;
  };
  draw();
  return {
    texture: t.texture,
    step: () => {
      offset++;
      draw();
    },
  };
}

/** Holographic network graph panel (static). */
export function networkTexture(size = 384) {
  const t = canvasTexture(size, size);
  const { ctx } = t;
  const nodes = [
    [0.5, 0.5], [0.2, 0.25], [0.78, 0.22], [0.82, 0.68], [0.25, 0.78], [0.52, 0.12], [0.1, 0.52], [0.6, 0.86],
  ].map(([x, y]) => [x * size, y * size]);
  const links = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [1, 6], [4, 6], [3, 7], [4, 7], [2, 3]];
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.strokeRect(1, 1, size - 2, size - 2);
  ctx.lineWidth = 1.5;
  links.forEach(([a, b], i) => {
    ctx.strokeStyle = i % 4 === 0 ? "rgba(255,45,61,0.75)" : "rgba(99,217,255,0.45)";
    ctx.beginPath();
    ctx.moveTo(nodes[a][0], nodes[a][1]);
    ctx.lineTo(nodes[b][0], nodes[b][1]);
    ctx.stroke();
  });
  nodes.forEach(([x, y], i) => {
    ctx.fillStyle = i === 0 ? "#ff2d3d" : "#dfe6ee";
    ctx.beginPath();
    ctx.arc(x, y, i === 0 ? 9 : 5, 0, Math.PI * 2);
    ctx.fill();
    if (i === 0) {
      ctx.strokeStyle = "rgba(255,45,61,0.5)";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
  ctx.font = "500 13px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(230,235,240,0.75)";
  ctx.fillText("NETWORK: CONNECTED", 14, 24);
  ctx.fillStyle = "rgba(255,69,83,0.9)";
  ctx.fillText("NODE_00 // RICKY", 14, size - 14);
  t.texture.needsUpdate = true;
  return t.texture;
}

/** Security status / circuit fragment panel (static). */
export function statusTexture(w = 448, h = 256) {
  const t = canvasTexture(w, h);
  const { ctx } = t;
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.strokeRect(1, 1, w - 2, h - 2);
  ctx.font = "500 14px 'JetBrains Mono', monospace";
  const rows = [
    ["SECURITY_NODE_01", "#ff4553"],
    ["BUILD_STATUS: ACTIVE", "#eef0f3"],
    ["MODE: EXPERIMENTAL", "rgba(170,180,192,0.85)"],
  ];
  rows.forEach(([s, c], i) => {
    ctx.fillStyle = c;
    ctx.fillText(s, 18, 34 + i * 26);
  });
  // circuit traces
  ctx.strokeStyle = "rgba(255,45,61,0.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(18, 140); ctx.lineTo(120, 140); ctx.lineTo(150, 170); ctx.lineTo(300, 170); ctx.lineTo(330, 200); ctx.lineTo(430, 200);
  ctx.moveTo(18, 210); ctx.lineTo(90, 210); ctx.lineTo(110, 190); ctx.lineTo(240, 190);
  ctx.stroke();
  ctx.fillStyle = "#ff2d3d";
  [[120, 140], [300, 170], [240, 190]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
  // bars
  for (let i = 0; i < 12; i++) {
    const hh = 8 + ((i * 37) % 40);
    ctx.fillStyle = i % 4 === 0 ? "rgba(255,45,61,0.85)" : "rgba(99,217,255,0.4)";
    ctx.fillRect(300 + i * 11, 120 - hh, 6, hh);
  }
  t.texture.needsUpdate = true;
  return t.texture;
}

/** Soft radial sprite for particles. */
export function dotTexture(size = 32) {
  const t = canvasTexture(size, size);
  const g = t.ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  t.ctx.fillStyle = g;
  t.ctx.fillRect(0, 0, size, size);
  t.texture.needsUpdate = true;
  return t.texture;
}

/** Floor: dark disc with soft contact shadows baked in. */
export function floorTexture(size = 512, shadows: [number, number, number, number][] = []) {
  const t = canvasTexture(size, size);
  const { ctx } = t;
  const c = size / 2;
  const g = ctx.createRadialGradient(c, c, 0, c, c, c);
  g.addColorStop(0, "rgba(40,44,52,0.55)");
  g.addColorStop(0.55, "rgba(20,22,27,0.35)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  // baked contact shadows: [x, y, rx, ry] in 0..1 space
  shadows.forEach(([x, y, rx, ry]) => {
    ctx.save();
    ctx.translate(x * size, y * size);
    ctx.scale(rx * size, ry * size);
    const s = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    s.addColorStop(0, "rgba(0,0,0,0.85)");
    s.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = s;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  t.texture.needsUpdate = true;
  return t.texture;
}

/** Keyboard key grid. */
export function keyboardTexture(w = 256, h = 96) {
  const t = canvasTexture(w, h);
  const { ctx } = t;
  ctx.fillStyle = "#0d0f13";
  ctx.fillRect(0, 0, w, h);
  for (let r = 0; r < 4; r++) {
    for (let k = 0; k < 14; k++) {
      ctx.fillStyle = r === 3 && k > 4 && k < 9 ? "#1b1e24" : "#191c22";
      ctx.fillRect(6 + k * 17.6, 8 + r * 21, 15, 17);
    }
  }
  ctx.fillStyle = "rgba(255,45,61,0.8)";
  ctx.fillRect(6 + 13 * 17.6, 8 + 2 * 21, 15, 17);
  t.texture.needsUpdate = true;
  return t.texture;
}
