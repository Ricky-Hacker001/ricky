import type { ReactNode } from "react";
import type { ProjectVisual as Kind } from "@/data/projects";

/**
 * Generative, illustrative visualisations (not screenshots). Two depth layers
 * shift with the pointer through the --px / --py CSS variables set on the
 * parent panel — pure CSS, no re-renders.
 */

const RED = "#ff2d3d";
const DIM = "rgba(255,255,255,0.16)";
const TXT = { fontFamily: "JetBrains Mono, monospace" } as const;

const Layer = ({ depth, children }: { depth: number; children: ReactNode }) => (
  <g style={{ transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`, transition: "transform .5s cubic-bezier(.2,.8,.2,1)" }}>
    {children}
  </g>
);

const Window = ({ x, y, w, h, title }: { x: number; y: number; w: number; h: number; title: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill="#0b0d11" stroke={DIM} />
    <line x1={x} y1={y + 22} x2={x + w} y2={y + 22} stroke={DIM} />
    <circle cx={x + 13} cy={y + 11} r="3.5" fill={RED} />
    <circle cx={x + 25} cy={y + 11} r="3.5" fill="#2a2f37" />
    <text x={x + 40} y={y + 15} fontSize="9" fill="rgba(255,255,255,0.45)" style={TXT}>
      {title}
    </text>
  </g>
);

function art(kind: Kind) {
  switch (kind) {
    case "neural": {
      const cols = [[90, 4], [200, 6], [310, 6], [420, 3]] as const;
      const pts = cols.map(([x, n]) => Array.from({ length: n }, (_, i) => [x, 200 + (i - (n - 1) / 2) * 46] as const));
      return (
        <>
          <Layer depth={6}>
            {pts.slice(0, -1).map((col, c) =>
              col.map(([x1, y1], i) =>
                pts[c + 1].map(([x2, y2], j) => (
                  <line key={`${c}-${i}-${j}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={(i + j + c) % 5 === 0 ? "rgba(255,45,61,0.55)" : "rgba(255,255,255,0.08)"} />
                ))
              )
            )}
            {pts.flat().map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 7 === 0 ? 6 : 4} fill={i % 7 === 0 ? RED : "#dfe5ec"} />
            ))}
          </Layer>
          <Layer depth={16}>
            <path d="M500 120 L560 140 V200 C560 240 530 265 500 280 C470 265 440 240 440 200 V140 Z" fill="rgba(255,45,61,0.08)" stroke={RED} />
            <path d="M478 200 L495 217 L525 185" fill="none" stroke="#fff" strokeWidth="3" />
            <text x="440" y="310" fontSize="10" fill="rgba(255,255,255,0.5)" style={TXT}>THREAT · READY</text>
          </Layer>
        </>
      );
    }
    case "terminal":
      return (
        <>
          <Layer depth={6}>
            <Window x={60} y={70} w={400} h={250} title="open_cobra — python3" />
            {[
              ["$", "python3 open_cobra.py"],
              ["", "[1] passive recon"],
              ["", "[2] vulnerability scan"],
              ["", "[3] hash utilities"],
              ["", "[4] generate report"],
              ["$", "select > 1"],
              ["", "[+] mapping surface …"],
            ].map(([p, s], i) => (
              <text key={i} x="80" y={120 + i * 26} fontSize="13" fill={p ? "#fff" : "rgba(200,208,218,0.7)"} style={TXT}>
                <tspan fill={RED}>{p} </tspan>
                {s}
              </text>
            ))}
          </Layer>
          <Layer depth={18}>
            <rect x="400" y="230" width="150" height="90" rx="8" fill="#101318" stroke={RED} />
            <text x="414" y="256" fontSize="10" fill={RED} style={TXT}>REPORT.md</text>
            {[0, 1, 2].map((i) => (
              <rect key={i} x="414" y={270 + i * 14} width={110 - i * 25} height="5" rx="2" fill="rgba(255,255,255,0.25)" />
            ))}
          </Layer>
        </>
      );
    case "scanner":
      return (
        <>
          <Layer depth={6}>
            <Window x={50} y={60} w={430} h={270} title="git push → leakwatch" />
            {["const db = connect(env.DB_URL)", 'const key = "sk-proj-████████"', "const upi = \"user@████\"", "export default handler", "// pre-push hook"].map((l, i) => (
              <g key={i}>
                {(i === 1 || i === 2) && <rect x="64" y={102 + i * 32} width="400" height="24" fill="rgba(255,45,61,0.12)" />}
                <text x="76" y={119 + i * 32} fontSize="13" fill={i === 1 || i === 2 ? "#ffd6d9" : "rgba(200,208,218,0.7)"} style={TXT}>
                  {l}
                </text>
              </g>
            ))}
          </Layer>
          <Layer depth={20}>
            <g transform="rotate(-8 470 300)">
              <rect x="395" y="275" width="150" height="48" rx="6" fill="rgba(255,45,61,0.14)" stroke={RED} strokeWidth="2" />
              <text x="470" y="306" textAnchor="middle" fontSize="16" fontWeight="700" fill={RED} style={TXT}>PUSH BLOCKED</text>
            </g>
          </Layer>
        </>
      );
    case "radar":
      return (
        <>
          <Layer depth={5}>
            {[150, 110, 70, 30].map((r) => (
              <circle key={r} cx="300" cy="200" r={r} fill="none" stroke={DIM} />
            ))}
            <line x1="150" y1="200" x2="450" y2="200" stroke="rgba(255,255,255,0.08)" />
            <line x1="300" y1="50" x2="300" y2="350" stroke="rgba(255,255,255,0.08)" />
            <g style={{ transformOrigin: "300px 200px", animation: "sweep 4s linear infinite" }}>
              <path d="M300 200 L300 50 A150 150 0 0 1 430 125 Z" fill="url(#radar)" />
            </g>
            <defs>
              <linearGradient id="radar" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(255,45,61,0)" />
                <stop offset="1" stopColor="rgba(255,45,61,0.35)" />
              </linearGradient>
            </defs>
          </Layer>
          <Layer depth={16}>
            {[[240, 140], [360, 250], [330, 120], [210, 260]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#dfe5ec" />
            ))}
            <circle cx="380" cy="150" r="7" fill={RED} className="pulse" />
            <text x="392" y="140" fontSize="10" fill={RED} style={TXT}>ROGUE AP?</text>
            <text x="60" y="340" fontSize="10" fill="rgba(255,255,255,0.45)" style={TXT}>wlan1mon · deauth watch · telegram ↗</text>
          </Layer>
        </>
      );
    case "robot":
      return (
        <>
          <Layer depth={6}>
            <rect x="240" y="70" width="120" height="100" rx="30" fill="none" stroke="rgba(255,255,255,0.45)" />
            <rect x="262" y="105" width="76" height="22" rx="11" fill="rgba(255,45,61,0.15)" stroke={RED} />
            <circle cx="282" cy="116" r="4" fill={RED} />
            <circle cx="318" cy="116" r="4" fill={RED} />
            <rect x="230" y="190" width="140" height="120" rx="18" fill="none" stroke="rgba(255,255,255,0.3)" />
            <line x1="300" y1="170" x2="300" y2="190" stroke="rgba(255,255,255,0.3)" />
            <path d="M230 210 L170 270 L160 320 M370 210 L430 270 L440 320" fill="none" stroke="rgba(255,255,255,0.3)" />
          </Layer>
          <Layer depth={16}>
            {[[300, 180], [230, 210], [370, 210], [170, 270], [430, 270]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="7" fill="#0b0d11" stroke={RED} />
                <circle cx={x} cy={y} r="2" fill={RED} />
              </g>
            ))}
            <text x="390" y="100" fontSize="10" fill="rgba(255,255,255,0.5)" style={TXT}>PI 4 · VOICE</text>
            <text x="390" y="116" fontSize="10" fill="rgba(255,255,255,0.5)" style={TXT}>MEGA · SERVOS</text>
          </Layer>
        </>
      );
    case "mesh": {
      const svc = [["catalog", 110, 90], ["orders", 110, 300], ["ratings", 490, 90], ["notify", 490, 300]] as const;
      return (
        <>
          <Layer depth={6}>
            {svc.map(([, x, y]) => (
              <line key={`${x}${y}`} x1="300" y1="195" x2={x} y2={y} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 5" className="trace" />
            ))}
            <path d="M110 300 C250 380 380 380 490 300" fill="none" stroke="rgba(255,45,61,0.6)" strokeDasharray="3 5" className="trace" />
            <text x="270" y="372" fontSize="10" fill={RED} style={TXT}>rabbitmq</text>
          </Layer>
          <Layer depth={14}>
            <rect x="240" y="170" width="120" height="50" rx="10" fill="rgba(255,45,61,0.12)" stroke={RED} />
            <text x="300" y="200" textAnchor="middle" fontSize="12" fill="#fff" style={TXT}>GATEWAY</text>
            {svc.map(([n, x, y]) => (
              <g key={n}>
                <rect x={x - 55} y={y - 20} width="110" height="40" rx="8" fill="#0d1014" stroke={DIM} />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fill="rgba(230,235,240,0.85)" style={TXT}>
                  {n}
                </text>
              </g>
            ))}
          </Layer>
        </>
      );
    }
    case "handoff":
      return (
        <>
          <Layer depth={6}>
            <rect x="70" y="120" width="230" height="150" rx="10" fill="#0b0d11" stroke="rgba(255,255,255,0.3)" />
            <rect x="50" y="270" width="270" height="12" rx="4" fill="rgba(255,255,255,0.15)" />
            <text x="88" y="150" fontSize="10" fill="rgba(255,255,255,0.5)" style={TXT}>linux@koottali</text>
            {[0, 1, 2].map((i) => (
              <rect key={i} x="88" y={166 + i * 22} width={160 - i * 30} height="8" rx="3" fill="rgba(255,255,255,0.14)" />
            ))}
          </Layer>
          <Layer depth={16}>
            <rect x="430" y="110" width="100" height="190" rx="16" fill="#0b0d11" stroke="rgba(255,255,255,0.35)" />
            <rect x="445" y="140" width="70" height="40" rx="6" fill="rgba(255,45,61,0.15)" stroke={RED} />
            <text x="452" y="164" fontSize="9" fill="#fff" style={TXT}>clipboard</text>
            <path d="M300 170 C350 90 400 90 440 140" fill="none" stroke={RED} strokeDasharray="4 6" className="trace" />
            <circle cx="370" cy="104" r="5" fill={RED} />
          </Layer>
        </>
      );
    case "dashboard":
      return (
        <>
          <Layer depth={6}>
            <rect x="60" y="60" width="480" height="280" rx="10" fill="#0b0d11" stroke={DIM} />
            <rect x="60" y="60" width="100" height="280" rx="10" fill="rgba(255,255,255,0.03)" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="76" y={90 + i * 26} width={60 - (i % 2) * 18} height="8" rx="3" fill={i === 1 ? RED : "rgba(255,255,255,0.15)"} />
            ))}
          </Layer>
          <Layer depth={14}>
            {[60, 110, 80, 150, 120, 175, 140].map((h, i) => (
              <rect key={i} x={190 + i * 44} y={230 - h} width="26" height={h} rx="3" fill={i === 5 ? RED : "rgba(255,255,255,0.18)"} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x="190" y={256 + i * 22} width="320" height="14" rx="3" fill="rgba(255,255,255,0.05)" />
            ))}
          </Layer>
        </>
      );
  }
}

const ProjectVisual = ({ kind }: { kind: Kind }) => (
  <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
    {art(kind)}
  </svg>
);

export default ProjectVisual;
