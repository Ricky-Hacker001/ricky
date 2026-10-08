import { useState } from "react";
import { AVATAR } from "@/data/profile";

/**
 * Static avatar render + CSS-only motion. Shown immediately (it is the hero's
 * first paint), kept for no-WebGL / weak devices / reduced motion, and
 * cross-faded away once the live 3D scene has drawn its first frame.
 */
const AvatarFallback = ({ hidden }: { hidden: boolean }) => {
  const [ok, setOk] = useState(true);
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${hidden ? "opacity-0" : "opacity-100"}`}
      aria-hidden={hidden}
    >
      {/* stage ring */}
      <div className="absolute bottom-[6%] left-1/2 h-[16%] w-[78%] -translate-x-1/2 rounded-[50%] border border-signal-red/25 shadow-[0_0_60px_-10px_rgba(255,45,61,0.35)]" />
      {ok ? (
        <img
          src={AVATAR.fallbackImage}
          alt="Ricky's 3D engineer avatar standing beside a workstation, surrounded by floating hardware and holographic interfaces"
          width={900}
          height={1000}
          decoding="async"
          onError={() => setOk(false)}
          className="float-y absolute inset-0 h-full w-full object-contain"
          style={{ animationDuration: "9s" }}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-[60%] w-[34%] rounded-t-[45%] bg-gradient-to-b from-white/10 to-transparent" />
        </div>
      )}
    </div>
  );
};

export default AvatarFallback;
