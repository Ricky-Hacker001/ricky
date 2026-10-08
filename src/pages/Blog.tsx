import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText } from "lucide-react";
import Backdrop from "@/components/system/Backdrop";
import CustomCursor from "@/components/system/CustomCursor";
import SubpageHeader from "@/components/navigation/SubpageHeader";
import Footer from "@/components/contact/Footer";
import { useReveal } from "@/hooks/useReveal";
import { BLOGS } from "@/data/blogs";

const Blog = () => {
  useReveal();
  useEffect(() => {
    document.title = "Research & Writeups — Ricky";
  }, []);

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <CustomCursor />
      <SubpageHeader />

      <main className="relative z-[2] pt-32">
        <div className="wrap">
          <div className="reveal mb-4 flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.24em] text-signal-red">[ /blog ]</span>
            <span className="eyebrow">SECURITY RESEARCH</span>
          </div>
          <h1 className="reveal mega text-[clamp(2.6rem,8vw,6rem)]">
            <span className="text-metal">BUILD. BREAK.</span> <span className="text-signal">EXPLAIN.</span>
          </h1>
          <p className="reveal mt-5 max-w-xl text-[15.5px] leading-relaxed text-[var(--text-dim)]">
            Field notes from the lab — responsible-disclosure writeups, OSINT findings and hardware-security experiments.
          </p>

          <ul className="mt-14 grid gap-4 pb-24 md:grid-cols-2">
            {BLOGS.map((b, i) => (
              <li key={b.id} className="reveal" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <Link
                  to={`/blog/${b.id}`}
                  data-cursor="READ"
                  className="panel group flex h-full flex-col p-6 transition-colors duration-300 hover:border-white/20"
                >
                  <div className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] text-[var(--muted)]">
                    <span className="flex items-center gap-2 text-signal-red">
                      <FileText size={13} /> {String(i + 1).padStart(2, "0")}
                    </span>
                    {b.date.toUpperCase()}
                  </div>
                  <h2 className="mt-5 font-display text-[1.4rem] font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-signal-red-hot">
                    {b.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--text-dim)]">{b.description}</p>
                  <span className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-white">
                    READ <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
