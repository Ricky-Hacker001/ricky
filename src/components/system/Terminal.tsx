import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, CornerDownLeft } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { SOCIALS } from "@/data/social";
import { PROJECTS } from "@/data/projects";
import { HARDWARE } from "@/data/hardware";
import { SKILL_NODES } from "@/data/skills";
import { scrollToId } from "@/hooks/useActiveSection";

type Line = { kind: "in" | "out" | "sys"; text: string };

const BOOT: Line[] = [
  { kind: "sys", text: "RICKY.TECHIE // lab shell v2 — SYSTEM ONLINE" },
  { kind: "out", text: 'type "help" for commands' },
];

const QUICK = ["whoami", "projects", "hardware", "skills", "blog", "contact"];

/** Interactive lab shell. Commands are read-only views of the portfolio data. */
const Terminal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const body = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => field.current?.focus(), 40);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      prev?.focus?.();
    };
  }, [open, onClose]);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const exec = (raw: string): string[] | null => {
    const cmd = raw.trim().toLowerCase();
    switch (cmd) {
      case "help":
        return ["whoami · about · projects · hardware · skills · blog · resume · contact · social · goto <section> · clear · exit"];
      case "whoami":
        return [`${PROFILE.name.toLowerCase()} — ${PROFILE.tagline.toLowerCase()}`, PROFILE.roles.join(" · ")];
      case "about":
        return [PROFILE.intro];
      case "projects":
        return PROJECTS.map((p) => `${p.code}  ${p.title.padEnd(34, " ")} ${p.category}`);
      case "hardware":
        return HARDWARE.map((h) => `${h.name.padEnd(18, " ")} ${h.what}`);
      case "skills":
        return SKILL_NODES.map((s) => `${s.label.padEnd(14, " ")} ${s.items.slice(0, 5).join(", ")}`);
      case "contact":
        return [`email   ${PROFILE.email}`, `github  ${SOCIALS.github}`];
      case "social":
        return Object.entries(SOCIALS).map(([k, v]) => `${k.padEnd(9, " ")} ${v.replace("mailto:", "")}`);
      case "resume":
        window.open(PROFILE.resume, "_blank", "noopener");
        return ["opening résumé in a new tab…"];
      case "blog":
        onClose();
        navigate("/blog");
        return [];
      case "exit":
        onClose();
        return [];
      default:
        if (cmd.startsWith("goto ")) {
          const id = cmd.slice(5).trim();
          if (document.getElementById(id) || id === "top") {
            onClose();
            scrollToId(id);
            return [];
          }
          return [`no such section: ${id}`];
        }
        return null;
    }
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setInput("");
    if (cmd.toLowerCase() === "clear") return setLines([]);
    const out = exec(cmd);
    setLines((prev) =>
      [
        ...prev,
        { kind: "in" as const, text: cmd },
        ...(out ?? [`command not found: ${cmd} — try "help"`]).map((t) => ({ kind: "out" as const, text: t })),
      ].slice(-60)
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Lab terminal"
      onClick={onClose}
    >
      <div className="glass frame relative w-full max-w-2xl overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
          <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--text-dim)]">ricky@lab: ~</span>
          <button onClick={onClose} aria-label="Close terminal" className="text-[var(--muted)] hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div ref={body} className="h-[min(46vh,380px)] overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "in" ? "text-white" : l.kind === "sys" ? "text-signal-red" : "whitespace-pre-wrap text-[var(--text-dim)]"
              }
            >
              {l.kind === "in" && <span className="text-signal-red">❯ </span>}
              {l.text}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-[var(--line)] px-4 py-3">
          {QUICK.map((c) => (
            <button key={c} onClick={() => run(c)} className="chip transition-colors hover:border-signal-red/50 hover:text-white">
              {c}
            </button>
          ))}
        </div>

        <form
          className="flex items-center gap-3 border-t border-[var(--line)] px-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
        >
          <span className="font-mono text-[12px] text-signal-red">❯</span>
          <input
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type a command…"
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command"
            className="flex-1 bg-transparent font-mono text-[12.5px] text-white outline-none placeholder:text-[var(--muted)]"
          />
          <button type="submit" aria-label="Run command" className="text-[var(--muted)] hover:text-white">
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
