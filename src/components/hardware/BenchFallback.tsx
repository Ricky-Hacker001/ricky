import { HARDWARE, type HardwareId } from "@/data/hardware";

/** Top-down SVG workbench used when WebGL is unavailable / disabled. Fully clickable. */
const SPOTS: Record<HardwareId, [number, number, number, number]> = {
  rpi: [70, 70, 190, 125],
  esp32: [330, 50, 150, 70],
  mega: [540, 70, 240, 115],
  nrf24: [60, 270, 120, 60],
  rfid: [300, 240, 140, 115],
  sonar: [540, 270, 130, 60],
};

const BenchFallback = ({ selected, onSelect }: { selected: HardwareId; onSelect: (id: HardwareId) => void }) => (
  <svg viewBox="0 0 840 420" className="h-full w-full" role="group" aria-label="Electronics workbench">
    <defs>
      <pattern id="mat" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" />
      </pattern>
    </defs>
    <rect x="10" y="10" width="820" height="400" rx="16" fill="#0b0d10" />
    <rect x="10" y="10" width="820" height="400" rx="16" fill="url(#mat)" stroke="rgba(255,45,61,0.3)" />
    <path d="M260 130 C300 60 320 60 330 85" stroke="#ff2d3d" strokeWidth="3" fill="none" />
    <path d="M480 85 C520 100 520 110 540 120" stroke="#d9dde3" strokeWidth="3" fill="none" />
    <path d="M130 195 C120 240 120 250 120 270" stroke="#63d9ff" strokeWidth="3" fill="none" />
    <path d="M660 185 C640 230 620 250 605 270" stroke="#ff2d3d" strokeWidth="3" fill="none" />
    {HARDWARE.map((h) => {
      const [x, y, w, hh] = SPOTS[h.id];
      const on = h.id === selected;
      return (
        <g
          key={h.id}
          role="button"
          tabIndex={0}
          aria-pressed={on}
          aria-label={h.name}
          onClick={() => onSelect(h.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(h.id);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <rect x={x} y={y} width={w} height={hh} rx="8" fill={on ? "rgba(255,45,61,0.12)" : "#111419"} stroke={on ? "#ff2d3d" : "rgba(255,255,255,0.2)"} strokeWidth={on ? 2 : 1} />
          <rect x={x + 12} y={y + 12} width={Math.min(36, w / 4)} height={Math.min(36, hh / 2)} rx="3" fill="#1b1f26" stroke="rgba(255,255,255,0.18)" />
          {Array.from({ length: Math.floor(w / 14) }).map((_, i) => (
            <rect key={i} x={x + 8 + i * 14} y={y + hh - 10} width="6" height="4" fill="#b8a774" opacity="0.7" />
          ))}
          <text x={x + 12} y={y + hh - 18} fontSize="12" fontFamily="JetBrains Mono, monospace" fill={on ? "#fff" : "rgba(220,226,234,0.7)"}>
            {h.name}
          </text>
        </g>
      );
    })}
  </svg>
);

export default BenchFallback;
