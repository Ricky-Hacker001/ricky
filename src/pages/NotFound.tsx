import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Backdrop from "@/components/system/Backdrop";
import CustomCursor from "@/components/system/CustomCursor";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 — route not found:", location.pathname);
    document.title = "404 — Ricky";
  }, [location.pathname]);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden">
      <Backdrop />
      <CustomCursor />
      <div
        className="pointer-events-none absolute inset-0 grid-bg opacity-40"
        style={{ maskImage: "radial-gradient(circle at 50% 45%, #000, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 50% 45%, #000, transparent 70%)" }}
      />
      <div className="relative z-[2] px-6 text-center">
        <div className="mega text-[clamp(6rem,22vw,16rem)] leading-none">
          <span className="text-outline">4</span>
          <span className="text-signal">0</span>
          <span className="text-outline">4</span>
        </div>
        <p className="mt-2 font-mono text-[11px] tracking-[0.24em] text-[var(--muted)]">SIGNAL LOST // SYSTEM_ID: RICKY</p>
        <p className="mx-auto mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--text-dim)]">
          This route doesn't exist in the lab. The experiment you're looking for may have been moved or never shipped.
        </p>
        <Link to="/" className="btn btn-primary mt-8 inline-flex">
          <ArrowLeft size={15} /> Back to base
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
