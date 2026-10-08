/**
 * Hero environment — pure CSS/SVG: radial light, masked technical grid,
 * circuit traces, coordinates and a slow scan band. No JS per frame.
 */
const TRACES = [
  "M0 120 H180 L210 150 H420 L450 120 H620",
  "M1440 220 H1240 L1210 250 H1060 L1030 280 H880",
  "M0 640 H140 L170 610 H360",
  "M1440 700 H1300 L1270 730 H1120 L1090 700 H980",
  "M720 0 V60 L750 90 V180",
];
const NODES: [number, number][] = [[210, 150], [450, 120], [1210, 250], [1030, 280], [170, 610], [1270, 730], [750, 90]];

const HeroBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    {/* light */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(60rem 42rem at 72% 46%, rgba(255,45,61,0.13), transparent 60%), radial-gradient(40rem 30rem at 72% 60%, rgba(255,255,255,0.05), transparent 65%), radial-gradient(50rem 40rem at 8% 10%, rgba(99,217,255,0.05), transparent 60%)",
      }}
    />
    {/* technical grid */}
    <div
      className="grid-bg absolute inset-0 opacity-70"
      style={{
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 70% 60% at 65% 50%, #000 10%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 65% 50%, #000 10%, transparent 75%)",
      }}
    />
    {/* circuit traces */}
    <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice">
      <g fill="none" strokeWidth="1">
        {TRACES.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="rgba(255,255,255,0.08)" />
            <path d={d} stroke={i % 2 ? "rgba(99,217,255,0.5)" : "rgba(255,45,61,0.65)"} className="trace" style={{ animationDelay: `${i * -2.3}s` }} />
          </g>
        ))}
      </g>
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill={i % 3 ? "rgba(255,255,255,0.5)" : "#ff2d3d"} />
          <circle cx={x} cy={y} r="7" fill="none" stroke="rgba(255,255,255,0.12)" />
        </g>
      ))}
    </svg>
    {/* coordinates — Bangalore lab */}
    <span className="absolute left-[3%] top-[22%] hidden font-mono text-[9.5px] tracking-[0.2em] text-white/25 md:block">
      LAT 12.9716°N
      <br />
      LON 77.5946°E
    </span>
    <span className="absolute bottom-[14%] right-[3%] hidden font-mono text-[9.5px] tracking-[0.2em] text-white/25 md:block">
      GRID 56 / 56 · Z 0.00
    </span>
    {/* slow scan band */}
    <div
      className="absolute inset-x-0 h-40 opacity-60"
      style={{
        background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.025) 60%, rgba(255,45,61,0.06) 99%, transparent)",
        animation: "hero-scan 9s linear infinite",
      }}
    />
    <style>{`@keyframes hero-scan{from{transform:translateY(-20vh)}to{transform:translateY(110vh)}}`}</style>
    {/* bottom fade into page */}
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]" />
  </div>
);

export default HeroBackground;
