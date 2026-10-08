import { useEffect } from "react";

/**
 * One IntersectionObserver for every `.reveal` / `.clip-reveal` element on
 * the page. Adds `.in` once; CSS does the rest (opacity/transform/filter only).
 * A MutationObserver picks up elements mounted later (lazy sections).
 */
export function useReveal() {
  useEffect(() => {
    const SELECTOR = ".reveal:not(.in), .clip-reveal:not(.in)";
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    scan();

    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
