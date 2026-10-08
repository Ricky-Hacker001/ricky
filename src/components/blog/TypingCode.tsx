import { useEffect, useRef } from "react";

/** Types text into a terminal line. Writes to the DOM directly (no per-char re-render). */
const TypingCode = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [text]);

  return (
    <pre className="panel overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-signal-red-hot" aria-label={text}>
      <span ref={ref} aria-hidden />
      <span className="caret" aria-hidden>
        █
      </span>
    </pre>
  );
};

export default TypingCode;
