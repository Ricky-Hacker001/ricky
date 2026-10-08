import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";

/** Terminal-framed, syntax-highlighted code block for blog posts. */
const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);

  return (
    <div className="panel my-8 overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-signal-red" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)]">{language.toUpperCase()}</span>
      </div>
      <pre className="!m-0 overflow-x-auto !bg-transparent p-5 text-[13px]">
        <code ref={ref} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
