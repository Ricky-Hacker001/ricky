import { Fragment, type ReactNode } from "react";
import CodeBlock from "./CodeBlock";

/**
 * Renders the plain-text blog content stored in src/data/blogs.ts. The posts
 * use a light, consistent convention, so we parse it generically rather than
 * hard-coding anything per post:
 *   - lines of dashes (----)                 → divider
 *   - "Image:" followed by an <img ...> tag  → responsive figure
 *   - C/C++/Arduino snippets                 → syntax-highlighted code block
 *   - "• " or "N. " lines                    → lists
 *   - short Title Case lines                 → sub-headings
 *   - http(s) URLs                           → links
 */

type Block =
  | { t: "divider" }
  | { t: "code"; lang: string; text: string }
  | { t: "img"; src: string; width?: string }
  | { t: "heading"; text: string }
  | { t: "list"; ordered: boolean; items: string[] }
  | { t: "para"; text: string };

const CODE_START = /#include|void setup|void loop|DigiKeyboard|^\s*(sudo|npx|npm|git|python3?|site:)/;
const IMG_RE = /<img\s+src=["']([^"']+)["'][^>]*?(?:width=["'](\d+)["'])?[^>]*\/?>(?:<\/img>)?/i;

function parse(content: string): Block[] {
  const lines = content.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let code: string[] | null = null;

  const flushPara = () => {
    if (para.length) blocks.push({ t: "para", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push({ t: "list", ...list });
    list = null;
  };
  const flushCode = () => {
    if (code && code.join("").trim()) blocks.push({ t: "code", lang: "cpp", text: code.join("\n").trim() });
    code = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (code !== null) {
      // Code continues until a divider or a blank gap after a closing brace.
      if (/^-{4,}$/.test(line.trim())) {
        flushCode();
        blocks.push({ t: "divider" });
        continue;
      }
      code.push(raw);
      continue;
    }

    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    if (/^-{4,}$/.test(line.trim())) {
      flushPara();
      flushList();
      blocks.push({ t: "divider" });
      continue;
    }

    const img = line.match(IMG_RE);
    if (img) {
      flushPara();
      flushList();
      blocks.push({ t: "img", src: img[1], width: img[2] });
      continue;
    }

    if (CODE_START.test(line) && /#include|void (setup|loop)|DigiKeyboard/.test(content)) {
      // Start a fenced code region (used by the Arduino posts).
      flushPara();
      flushList();
      code = [raw];
      continue;
    }

    const li = line.match(/^\s*(?:[•-]\s+|(\d+)\.\s+)(.*)$/);
    if (li) {
      flushPara();
      const ordered = li[1] !== undefined;
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(li[2]);
      continue;
    }

    // Short, punctuation-free Title line → heading.
    const words = line.trim().split(/\s+/);
    if (words.length <= 7 && !/[.:,;]$/.test(line.trim()) && /^[A-Z0-9⚠]/.test(line.trim()) && line.trim().length < 56 && para.length === 0) {
      flushList();
      blocks.push({ t: "heading", text: line.trim() });
      continue;
    }

    flushList();
    para.push(line.trim());
  }
  flushCode();
  flushPara();
  flushList();
  return blocks;
}

const linkify = (text: string): ReactNode =>
  text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );

const PostBody = ({ content }: { content: string }) => {
  const blocks = parse(content);
  return (
    <div className="article space-y-5">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "divider":
            return <hr key={i} className="my-9 border-0" style={{ height: 1, background: "linear-gradient(90deg,var(--line-strong),transparent)" }} />;
          case "code":
            return <CodeBlock key={i} code={b.text} language={b.lang} />;
          case "img":
            return (
              <figure key={i} className="my-6">
                <img
                  src={b.src}
                  alt=""
                  loading="lazy"
                  className="mx-auto max-h-[380px] w-auto rounded-xl border border-[var(--line)]"
                  style={{ maxWidth: b.width ? `${Math.min(Number(b.width) * 1.4, 360)}px` : "100%" }}
                />
              </figure>
            );
          case "heading":
            return (
              <h2 key={i} className="!mt-10 flex items-center gap-3 font-display text-[1.4rem] font-semibold tracking-[-0.01em] text-white">
                <span className="h-4 w-1 bg-signal-red" />
                {b.text}
              </h2>
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="ml-1 space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[var(--text-dim)]">
                    <span className="font-mono text-[12px] text-signal-red">{String(j + 1).padStart(2, "0")}</span>
                    <span>{linkify(it)}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="ml-1 space-y-2">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[var(--text-dim)]">
                    <span className="mt-[9px] h-1 w-1 shrink-0 bg-signal-red" />
                    <span>{linkify(it)}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return <p key={i}>{linkify(b.text)}</p>;
        }
      })}
    </div>
  );
};

export default PostBody;
