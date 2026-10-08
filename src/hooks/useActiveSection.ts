import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the middle of the
 * viewport. One shared IntersectionObserver; updates only on change.
 */
export function useActiveSection(ids: readonly string[], fallback: string) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}

export function scrollToId(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
}
