import { useEffect, useRef } from "react";

/**
 * Illustrative network topology. Packets travel along links with SMIL
 * <animateMotion> (GPU-cheap, no JS per frame) and pause off-screen.
 */
const NODES = [
  { id: "core", x: 300, y: 190, label: "RICKY.LAB", kind: "core" },
  { id: "fw", x: 160, y: 110, label: "FW-01", kind: "infra" },
  { id: "siem", x: 450, y: 100, label: "SIEM", kind: "infra" },
  { id: "web", x: 120, y: 260, label: "WEB-APP", kind: "endpoint" },
  { id: "api", x: 300, y: 330, label: "API-GW", kind: "endpoint" },
  { id: "iot", x: 480, y: 280, label: "IOT-NODE", kind: "alert" },
  { id: "pi", x: 40, y: 170, label: "RPI-SENSOR", kind: "endpoint" },
  { id: "cloud", x: 560, y: 190, label: "CLOUD", kind: "infra" },
] as const;

const LINKS: [string, string][] = [
  ["core", "fw"], ["core", "siem"], ["core", "web"], ["core", "api"], ["core", "iot"],
  ["fw", "pi"], ["siem", "cloud"], ["iot", "cloud"], ["web", "pi"], ["api", "iot"],
];

const pos = (id: string) => NODES.find((n) => n.id === id)!;

const NetworkGraph = ({ active }: { active: boolean }) => {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    if (active) el.unpauseAnimations();
    else el.pauseAnimations();
  }, [active]);

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <svg ref={svg} viewBox="0 0 600 380" className="h-full w-full" role="img" aria-label="Illustrative network topology with endpoints, SIEM and one flagged IoT node">
      <defs>
        <radialGradient id="ng-core">
          <stop offset="0" stopColor="rgba(255,45,61,0.45)" />
          <stop offset="1" stopColor="rgba(255,45,61,0)" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="190" r="120" fill="url(#ng-core)" opacity="0.5" />
      {LINKS.map(([a, b], i) => {
        const A = pos(a);
        const B = pos(b);
        const d = `M${A.x} ${A.y} L${B.x} ${B.y}`;
        const hot = b === "iot" || a === "iot";
        return (
          <g key={i}>
            <path id={`ln-${i}`} d={d} stroke={hot ? "rgba(255,45,61,0.45)" : "rgba(255,255,255,0.12)"} strokeWidth="1" fill="none" />
            {!reduced && (
              <circle r="2.4" fill={hot ? "#ff2d3d" : "#63d9ff"}>
                <animateMotion dur={`${2.2 + (i % 4) * 0.7}s`} repeatCount="indefinite" begin={`${i * 0.37}s`}>
                  <mpath href={`#ln-${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        );
      })}
      {NODES.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          {n.kind === "alert" && <circle r="16" fill="none" stroke="#ff2d3d" className="pulse" />}
          <rect
            x={n.kind === "core" ? -14 : -7}
            y={n.kind === "core" ? -14 : -7}
            width={n.kind === "core" ? 28 : 14}
            height={n.kind === "core" ? 28 : 14}
            rx={n.kind === "core" ? 6 : 3}
            fill={n.kind === "core" ? "#1a0b0e" : "#0d1014"}
            stroke={n.kind === "alert" || n.kind === "core" ? "#ff2d3d" : n.kind === "infra" ? "#63d9ff" : "rgba(255,255,255,0.4)"}
          />
          {n.kind === "core" && <circle r="4" fill="#ff2d3d" />}
          <text y={n.kind === "core" ? 30 : 22} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="rgba(220,226,234,0.6)" letterSpacing="1">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default NetworkGraph;
