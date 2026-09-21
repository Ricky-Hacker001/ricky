import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  z: number;
  speed: number;
  phase: number;
};

const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    const pointer = { x: -1000, y: -1000 };
    const nodes: NodePoint[] = Array.from({ length: 42 }, (_, i) => ({
      x: ((i * 173.7) % 1000) / 1000,
      y: ((i * 91.3 + 40) % 1000) / 1000,
      z: 0.2 + ((i * 37) % 80) / 100,
      speed: 0.12 + ((i * 17) % 30) / 100,
      phase: i * 1.73,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const trace = (points: Array<[number, number]>, alpha: number) => {
      ctx.beginPath();
      points.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = `rgba(87,242,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const draw = (timestamp: number) => {
      time = timestamp * 0.001;
      ctx.clearRect(0, 0, width, height);

      const compact = width < 760;
      const gap = compact ? 54 : 68;
      const wave = time * 0.7;

      // Perspective wireframe floor / grid.
      const horizon = height * 0.46;
      for (let x = -width; x <= width * 2; x += gap) {
        const offset = Math.sin(wave + x * 0.004) * 7;
        ctx.beginPath();
        ctx.moveTo(width / 2 + (x - width / 2) * 0.12, horizon);
        ctx.lineTo(x + offset, height);
        ctx.strokeStyle = "rgba(87,242,255,.055)";
        ctx.stroke();
      }

      for (let i = 0; i < 13; i++) {
        const depth = i / 13;
        const y = horizon + Math.pow(depth, 1.8) * (height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = `rgba(115,98,255,${0.025 + depth * 0.035})`;
        ctx.stroke();
      }

      // Floating circuit traces with right-angle routing.
      const traceCount = compact ? 7 : 13;
      for (let i = 0; i < traceCount; i++) {
        const x = ((i * 241 + 90) % width);
        const y = ((i * 137 + 80) % Math.max(height * 0.82, 1));
        const length = 70 + ((i * 43) % 150);
        const lift = Math.sin(wave + i) * 8;
        trace(
          [
            [x, y + lift],
            [x + length * 0.45, y + lift],
            [x + length * 0.45, y + lift + 22],
            [x + length, y + lift + 22],
          ],
          0.045
        );
        ctx.beginPath();
        ctx.arc(x + length, y + lift + 22, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(87,242,255,.25)";
        ctx.fill();
      }

      // Floating 3D network nodes.
      nodes.slice(0, compact ? 18 : nodes.length).forEach((node, index) => {
        const driftX = Math.sin(time * node.speed + node.phase) * 0.025;
        const driftY = Math.cos(time * node.speed * 0.8 + node.phase) * 0.025;
        const x = (node.x + driftX) * width;
        const y = (node.y + driftY) * height;
        const depth = 0.55 + node.z * 0.75;
        const radius = 1 + node.z * 2.2;
        const dx = pointer.x - x;
        const dy = pointer.y - y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / 260);

        if (index > 0) {
          const previous = nodes[index - 1];
          const px = previous.x * width;
          const py = previous.y * height;
          const linkDistance = Math.hypot(px - x, py - y);
          if (linkDistance < width * 0.22) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(px, py);
            ctx.strokeStyle = `rgba(87,242,255,${0.025 + influence * 0.08})`;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(x + dx * influence * 0.025, y + dy * influence * 0.025, radius + influence * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(87,242,255,${0.12 + depth * 0.22 + influence * 0.2})`;
        ctx.fill();
      });

      // Radar ring around the pointer.
      if (pointer.x > 0 && pointer.y > 0) {
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.arc(pointer.x, pointer.y, 32 + ring * 18 + Math.sin(time * 2 + ring) * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(87,242,255,${0.025 - ring * 0.004})`;
          ctx.stroke();
        }
      }

      // Slow scanline.
      const scanY = (time * 42) % (height + 180) - 90;
      const gradient = ctx.createLinearGradient(0, scanY - 35, 0, scanY + 35);
      gradient.addColorStop(0, "rgba(87,242,255,0)");
      gradient.addColorStop(0.5, "rgba(87,242,255,.035)");
      gradient.addColorStop(1, "rgba(87,242,255,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 35, width, 70);

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas ref={canvasRef} className="cyber-canvas" aria-hidden="true" />;
};

export default CyberBackground;
