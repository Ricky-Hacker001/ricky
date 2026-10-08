import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Backdrop from "@/components/system/Backdrop";
import CustomCursor from "@/components/system/CustomCursor";
import SubpageHeader from "@/components/navigation/SubpageHeader";
import Footer from "@/components/contact/Footer";
import PostBody from "@/components/blog/PostBody";
import TypingCode from "@/components/blog/TypingCode";
import { useReveal } from "@/hooks/useReveal";
import { getBlog, BLOGS } from "@/data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = getBlog(id);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = blog ? `${blog.title} — Ricky` : "Post not found — Ricky";
  }, [blog]);

  if (!blog) {
    return (
      <div className="relative grid min-h-screen place-items-center">
        <Backdrop />
        <SubpageHeader />
        <div className="relative z-[2] text-center">
          <p className="font-mono text-[11px] tracking-[0.2em] text-signal-red">404 // POST NOT FOUND</p>
          <Link to="/blog" className="btn btn-ghost mt-6 inline-flex">
            <ArrowLeft size={15} /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const idx = BLOGS.findIndex((b) => b.id === blog.id);
  const next = BLOGS[(idx + 1) % BLOGS.length];

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <CustomCursor />
      <SubpageHeader />

      <main className="relative z-[2] pt-32">
        <article className="mx-auto w-[min(760px,calc(100%-32px))]">
          <Link to="/blog" className="link-line inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-[var(--muted)] hover:text-white">
            <ArrowLeft size={13} /> ALL POSTS
          </Link>

          <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-signal-red">{blog.date.toUpperCase()}</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.03em]">{blog.title}</h1>
          <p className="mt-5 text-[16px] leading-relaxed text-[var(--text-dim)]">{blog.description}</p>

          <div className="mt-8">
            <TypingCode text={"$ cat " + blog.id + ".md\n$ decrypting research notes…\n$ access granted"} />
          </div>

          <div className="mt-10 border-t border-[var(--line)] pt-10">
            <PostBody content={blog.content} />
          </div>

          <div className="my-6 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 font-mono text-[11.5px] leading-relaxed text-amber-200/70">
            ⚠ Security content is for education and authorised testing only — on systems you own or have explicit permission to assess.
          </div>

          <Link
            to={`/blog/${next.id}`}
            data-cursor="READ"
            className="panel group mt-12 mb-24 flex items-center justify-between gap-4 p-6 transition-colors hover:border-white/20"
          >
            <span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">NEXT POST</span>
              <span className="mt-1 block font-display text-lg font-semibold transition-colors group-hover:text-signal-red-hot">{next.title}</span>
            </span>
            <ArrowUpRight size={20} className="shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </Link>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
