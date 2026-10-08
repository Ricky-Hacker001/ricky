import type { World } from "@/data/skills";

/**
 * Tiny SVG "instrument" per world. Animations are CSS-only and only run
 * while the parent module is hovered/active (via the data-on attribute).
 */
const WorldVisual = ({ kind, on }: { kind: World["key"]; on: boolean }) => {
  const play = on ? "running" : "paused";
  const common = { className: "h-full w-full", viewBox: "0 0 120 80", "aria-hidden": true } as const;

  switch (kind) {
    case "cyber":
      return (
        <svg {...common}>
          {[30, 22, 14].map((r) => (
            <circle key={r} cx="60" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.12)" />
          ))}
          <line x1="60" y1="6" x2="60" y2="74" stroke="rgba(255,255,255,0.06)" />
          <line x1="26" y1="40" x2="94" y2="40" stroke="rgba(255,255,255,0.06)" />
          <g style={{ transformOrigin: "60px 40px", animation: "sweep 3s linear infinite", animationPlayState: play }}>
            <path d="M60 40 L60 10 A30 30 0 0 1 86 25 Z" fill="url(#cyber-g)" />
          </g>
          <circle cx="74" cy="28" r="2.2" fill="#ff2d3d" className="pulse" />
          <circle cx="47" cy="52" r="1.6" fill="#e9edf2" />
          <defs>
            <linearGradient id="cyber-g" x1="0" x2="1">
              <stop offset="0" stopColor="rgba(255,45,61,0)" />
              <stop offset="1" stopColor="rgba(255,45,61,0.45)" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "build":
      return (
        <svg {...common}>
          {[0, 1, 2].map((i) => (
            <g key={i} style={{ transform: `translateY(${on ? -i * 4 : 0}px)`, transition: "transform .6s cubic-bezier(.2,.8,.2,1)" }}>
              <path
                d={`M60 ${30 + i * 12} L92 ${42 + i * 12 - 6} L60 ${54 + i * 12 - 12} L28 ${42 + i * 12 - 6} Z`}
                fill={i === 0 ? "rgba(255,45,61,0.18)" : "rgba(255,255,255,0.03)"}
                stroke={i === 0 ? "#ff2d3d" : "rgba(255,255,255,0.25)"}
              />
            </g>
          ))}
          <text x="60" y="20" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,0.45)">
            {"</> API · DB · UI"}
          </text>
        </svg>
      );
    case "ai": {
      const L = [[20, [20, 40, 60]], [60, [14, 30, 50, 66]], [100, [30, 50]]] as const;
      return (
        <svg {...common}>
          {L[0][1].map((a) =>
            L[1][1].map((b) => <line key={`${a}-${b}`} x1={20} y1={a} x2={60} y2={b} stroke="rgba(255,255,255,0.1)" />)
          )}
          {L[1][1].map((a) =>
            L[2][1].map((b) => <line key={`${a}-${b}b`} x1={60} y1={a} x2={100} y2={b} stroke="rgba(255,45,61,0.3)" />)
          )}
          {L.map(([x, ys], li) =>
            ys.map((y, i) => (
              <circle
                key={`${x}-${y}`}
                cx={x}
                cy={y}
                r={3}
                fill={li === 2 ? "#ff2d3d" : "#e9edf2"}
                style={{ animation: "pulse 1.6s ease-in-out infinite", animationDelay: `${(li * 3 + i) * 0.15}s`, animationPlayState: play }}
              />
            ))
          )}
        </svg>
      );
    }
    case "hardware":
      return (
        <svg {...common}>
          <rect x="44" y="24" width="32" height="32" rx="3" fill="#0c0e12" stroke="rgba(255,255,255,0.35)" />
          <rect x="53" y="33" width="14" height="14" fill="rgba(255,45,61,0.25)" stroke="#ff2d3d" />
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} stroke="rgba(201,176,110,0.7)">
              <line x1={48 + i * 6} y1="24" x2={48 + i * 6} y2="18" />
              <line x1={48 + i * 6} y1="56" x2={48 + i * 6} y2="62" />
            </g>
          ))}
          {["M44 32 H24 V14 H8", "M76 48 H96 V66 H112", "M44 48 H30 V70"].map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={i === 1 ? "#ff2d3d" : "rgba(255,255,255,0.3)"}
              strokeDasharray="3 5"
              style={{ animation: "dash 6s linear infinite", animationPlayState: play }}
            />
          ))}
        </svg>
      );
  }
};

export default WorldVisual;
