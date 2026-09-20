import { useEffect, useRef } from "react";

const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0, width = 0, height = 0;
    const pointer = { x: -1000, y: -1000 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e: PointerEvent) => { pointer.x = e.clientX; pointer.y = e.clientY; };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const gap = width < 760 ? 44 : 58;
      const wave = time * 0.00025;

      for (let x = 0; x <= width; x += gap) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += gap) {
          const d = Math.hypot(pointer.x - x, pointer.y - y);
          const force = Math.max(0, 1 - d / 220);
          const px = x + Math.sin(y * .02 + wave) * 3 + force * 8;
          y === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
        }
        ctx.strokeStyle = "rgba(87,242,255,.07)"; ctx.stroke();
      }
      for (let y = 0; y <= height; y += gap) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += gap) {
          const d = Math.hypot(pointer.x - x, pointer.y - y);
          const force = Math.max(0, 1 - d / 220);
          const py = y + Math.cos(x * .015 + wave) * 2 + force * 8;
          x === 0 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
        }
        ctx.strokeStyle = "rgba(115,98,255,.06)"; ctx.stroke();
      }

      const nodes = width < 760 ? 9 : 18;
      for (let i = 0; i < nodes; i++) {
        const x = (i * 137.7 + 70) % width;
        const y = (i * 83.9 + 110 + Math.sin(wave * 3 + i) * 25) % height;
        ctx.beginPath(); ctx.arc(x, y, 1.5 + Math.sin(wave * 5 + i) * .6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(87,242,255,.45)"; ctx.fill();
      }
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
