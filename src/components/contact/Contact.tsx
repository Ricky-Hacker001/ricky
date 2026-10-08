import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { SOCIAL_LINKS } from "@/data/social";
import Magnetic from "@/components/ui/Magnetic";

const mailto = (subject: string, body = "") =>
  `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

const Contact = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 overflow-hidden pb-24 pt-[clamp(110px,16vw,200px)]">
      {/* cinematic floor: perspective grid + horizon glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgba(255,45,61,0.22),transparent_70%)]" />
        <div className="absolute inset-x-[-20%] bottom-[-10%] h-[60%] [perspective:600px]">
          <div
            className="grid-bg h-full w-full opacity-60"
            style={{
              backgroundSize: "60px 60px",
              transform: "rotateX(62deg)",
              transformOrigin: "50% 100%",
              maskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to top, #000 10%, transparent 85%)",
            }}
          />
        </div>
        <div className="absolute left-1/2 top-[38%] h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-signal-red/50 to-transparent" />
      </div>

      <div className="wrap relative">
        <div className="reveal mb-8 flex items-center justify-center gap-4">
          <span className="font-mono text-[11px] tracking-[0.24em] text-signal-red">[09]</span>
          <span className="eyebrow">OPEN CHANNEL</span>
        </div>

        <h2 id="contact-title" className="mega text-center text-[clamp(3rem,10.5vw,10rem)]">
          {["LET'S BUILD", "SOMETHING", "WEIRD."].map((l, i) => (
            <span key={l} className="clip-reveal block pb-[0.04em]" style={{ ["--d" as string]: `${i * 110}ms` }}>
              <span className={i === 2 ? "text-signal" : "text-metal"}>{l}</span>
            </span>
          ))}
        </h2>

        <p className="reveal mx-auto mt-8 max-w-md text-center text-[16px] leading-relaxed text-[var(--text-dim)]">
          Have an idea, project or experiment? Let's build it.
        </p>

        <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic href={mailto("Let's build something — project enquiry")} cursor="OPEN">
            Start a project <ArrowUpRight size={16} />
          </Magnetic>
          <Magnetic variant="ghost" href={`mailto:${PROFILE.email}`} cursor="OPEN">
            Contact me <ArrowUpRight size={16} />
          </Magnetic>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* channels */}
          <ul className="reveal panel divide-y divide-[var(--line)] overflow-hidden" aria-label="Contact channels">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, handle }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className="group flex items-center gap-4 px-6 py-5 transition-colors hover:bg-white/[0.02]"
                >
                  <Icon size={18} className="text-[var(--muted)] transition-colors group-hover:text-signal-red" />
                  <span className="font-display text-lg font-semibold">{label}</span>
                  <span className="ml-auto truncate font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">{handle}</span>
                  <ArrowUpRight size={16} className="shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ul>

          {/* transmit form (opens the visitor's mail client — no backend) */}
          <form
            className="reveal panel frame flex flex-col gap-3 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailto("New signal from the portfolio", `Hi Ricky,\n\n${msg}\n\n— ${name || "(your name)"}`);
            }}
          >
            <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.14em]">
              <span className="text-signal-red">$ ./transmit.sh</span>
              <span className="text-[var(--muted)]">CHANNEL: MAIL</span>
            </div>
            <label className="sr-only" htmlFor="c-name">Your name</label>
            <input
              id="c-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              autoComplete="name"
              className="w-full rounded-lg border border-[var(--line)] bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-signal-red/50"
            />
            <label className="sr-only" htmlFor="c-msg">What do you want to build?</label>
            <textarea
              id="c-msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              placeholder="what do you want to build?"
              className="w-full flex-1 resize-none rounded-lg border border-[var(--line)] bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted)] focus:border-signal-red/50"
            />
            <button type="submit" className="btn btn-primary w-full">
              Transmit <Send size={15} />
            </button>
            <p className="text-center font-mono text-[10px] tracking-[0.1em] text-[var(--muted)]">opens your mail client · {PROFILE.email}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
