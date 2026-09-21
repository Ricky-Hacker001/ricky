import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Maximize2,
  X,
  Radio,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import CyberBackground from "../components/CyberBackground";
import ExperienceSection from "../components/ExperienceSection";
import SectionHeading from "../components/SectionHeading";

const projects = [
  {
    code: "01",
    title: "Koottali",
    type: "Linux × Android ecosystem",
    description:
      "A local-first companion platform exploring seamless copy, paste, notifications and device handoff between Linux and Android.",
    tags: ["Linux", "Android", "Networking", "Open Source"],
    repo: "https://github.com/Ricky-Hacker001/ricky",
  },
  {
    code: "02",
    title: "Open_Cobra",
    type: "Security research toolkit",
    description:
      "A modular security toolkit combining passive recon, vulnerability checks, hashing utilities and security research workflows.",
    tags: ["Python", "Recon", "Web Security", "Research"],
    repo: "https://github.com/Ricky-Hacker001/ricky",
  },
  {
    code: "03",
    title: "Cake Delight",
    type: "Cloud-native microservices",
    description:
      "A distributed application built around service boundaries, an API gateway, RabbitMQ events, MongoDB and container orchestration.",
    tags: ["Node.js", "Docker", "Kubernetes", "RabbitMQ"],
    repo: "https://github.com/Ricky-Hacker001/ricky",
  },
  {
    code: "04",
    title: "LeakWatch",
    type: "Data leak monitoring",
    description:
      "A security-focused project for monitoring exposed data and turning leak intelligence into actionable security visibility.",
    tags: ["Security", "Monitoring", "Python", "Threat Intel"],
    repo: "https://github.com/Ricky-Hacker001/leakwatch",
  },
  {
    code: "05",
    title: "Gold App Backend",
    type: "Backend engineering",
    description:
      "Backend services for a gold-focused application, built around API design, business logic and persistent data workflows.",
    tags: ["Backend", "API", "Node.js", "Database"],
    repo: "https://github.com/Ricky-Hacker001/gold-app-backend",
  },
  {
    code: "06",
    title: "Gold App Frontend",
    type: "Product interface",
    description:
      "The frontend application for the Gold App, connecting a responsive user experience to its backend services.",
    tags: ["Frontend", "React", "API", "UI"],
    repo: "https://github.com/Ricky-Hacker001/gold-app-frontend",
  },
];

const skills = [
  ["Security", "VAPT / Web Security / SOC / Threat Hunting", ShieldCheck],
  ["Engineering", "React / Node.js / Java / Python / APIs", Code2],
  ["Cloud", "Docker / Kubernetes / CI/CD / AWS", Boxes],
  ["Hardware", "ESP32 / Raspberry Pi / IoT / Wireless", Cpu],
  ["Networks", "TCP/IP / Linux / Routing / Lab Automation", Radio],
  ["Build", "Rapid prototyping / tooling / side quests", TerminalSquare],
] as const;

const nav = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Achievements", "achievements"],
  ["Lab", "lab"],
  ["Contact", "contact"],
] as const;

const Index = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>(["ricky@lab:~$ system --status", "SYSTEM ONLINE  //  12 SERVICES  //  07 DEVICES", "ricky@lab:~$ _"]);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--rx", `${(-y * 2.2).toFixed(2)}deg`);
      document.documentElement.style.setProperty("--ry", `${(x * 2.2).toFixed(2)}deg`);
      document.documentElement.style.setProperty("--px", `${(x * 10).toFixed(2)}px`);
      document.documentElement.style.setProperty("--py", `${(y * 10).toFixed(2)}px`);
    };

    window.addEventListener("pointermove", move, { passive: true });

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.innerHTML = `<span class="cursor-crosshair"></span><span class="cursor-dot"></span>`;
    document.body.appendChild(cursor);
    const cursorMove = (event: PointerEvent) => {
      cursor.style.setProperty("--cx", `${event.clientX}px`);
      cursor.style.setProperty("--cy", `${event.clientY}px`);
    };
    const cursorDown = () => cursor.classList.add("cursor-active");
    const cursorUp = () => cursor.classList.remove("cursor-active");
    window.addEventListener("pointermove", cursorMove, { passive: true });
    window.addEventListener("pointerdown", cursorDown, { passive: true });
    window.addEventListener("pointerup", cursorUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointermove", cursorMove);
      window.removeEventListener("pointerdown", cursorDown);
      window.removeEventListener("pointerup", cursorUp);
      cursor.remove();
    };
  }, []);

  return (
    <div className="site-shell">
      <CyberBackground />
      <div className="noise-layer" />
      <div className="ambient-hud" aria-hidden="true">
        <span className="hud-orbit hud-orbit-a" />
        <span className="hud-orbit hud-orbit-b" />
        <span className="hud-crosshair" />
        <span className="hud-wire wire-a" />
        <span className="hud-wire wire-b" />
      </div>

      <header className="topbar">
        <a href="#top" className="brand">
          <span className="brand-mark">R</span>
          <span>Ricky<span className="accent">.raw</span></span>
        </a>
        <nav>
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <a className="status-pill" href="mailto:ricky.devsec@gmail.com">
          <span className="status-dot" /> available
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> SECURITY × SOFTWARE × HARDWARE
            </div>
            <h1>
              I build systems
              <span className="headline-glow"> that fight back.</span>
            </h1>
            <p className="hero-lede">
              Ricky — engineer and security builder exploring the space where
              cybersecurity, cloud-native software, Linux and experimental
              hardware collide.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#projects">
                Explore work <ArrowDownRight size={17} />
              </a>
              <a
                className="ghost-btn"
                href="https://github.com/Ricky-Hacker001"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="signal-row">
              <span><span className="mini-dot" /> KRISHNAGIRI, TAMIL NADU</span>
              <span>BUILD STATUS: ONLINE</span>
              <span>SECURITY MODE: ACTIVE</span>
            </div>
          </div>

          <div className="hero-visual-layer" aria-hidden="true">
            <span className="hero-orbit orbit-one" />
            <span className="hero-orbit orbit-two" />
            <span className="hero-orbit orbit-three" />
            <span className="hero-core" />
            <span className="hero-wire hero-wire-a" />
            <span className="hero-wire hero-wire-b" />
            <span className="hero-wire hero-wire-c" />
          </div>

          <motion.div
            className="hero-console"
            initial={{ opacity: 0, y: 24, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="console-top">
              <span><i /><i /><i /></span>
              <span>ricky@lab:~</span>
              <span>v3.0</span>
            </div>
            <div className="console-body">
              <div><b>$ whoami</b><span>ricky</span></div>
              <div><b>$ focus</b><span>cybersecurity</span></div>
              <div><b>$ stack</b><span>react • node • java • python</span></div>
              <div><b>$ mode</b><span>build → break → learn → repeat</span></div>
              <div className="console-cursor">$ <span className="type-cursor">█</span></div>
            </div>
            <div className="console-graph">
              {Array.from({ length: 38 }, (_, i) => (
                <span key={i} style={{ height: `${18 + ((i * 17) % 62)}%` }} />
              ))}
            </div>
          </motion.div>
        </section>

        <section className="marquee-band">
          <div>CYBERSECURITY</div><span>✦</span>
          <div>LINUX</div><span>✦</span>
          <div>MICROSERVICES</div><span>✦</span>
          <div>IOT</div><span>✦</span>
          <div>OPEN SOURCE</div><span>✦</span>
          <div>WIRELESS</div>
        </section>

        <section id="about" className="content-section about-grid">
          <SectionHeading
            index="01"
            eyebrow="identity"
            title="A builder with a security-first brain."
          />
          <div className="about-panel">
            <p>
              I like engineering problems that sit one layer below the polished
              interface: protocols, infrastructure, attack surfaces, distributed
              systems and the hardware that makes software touch the physical world.
            </p>
            <p>
              My portfolio is a record of experiments — from security tooling and
              Raspberry Pi labs to cloud-native services and an ongoing Linux ×
              Android ecosystem.
            </p>
            <div className="about-metrics">
              <div><strong>01</strong><span>Security-first mindset</span></div>
              <div><strong>02</strong><span>Hands-on lab culture</span></div>
              <div><strong>03</strong><span>Software + hardware</span></div>
            </div>
          </div>
        </section>

        <ExperienceSection />

        <section id="projects" className="content-section">
          <SectionHeading
            index="03"
            eyebrow="selected builds"
            title="Projects from the lab, not the template."
            description="A few things that represent how I think: useful, experimental and slightly obsessive."
          />
          <div className="project-grid">
            {projects.map((project) => (
              <motion.a
                key={project.code}
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="project-card"
                whileHover={{ y: -7 }}
              >
                <div className="project-meta">
                  <span>{project.code}</span>
                  <ExternalLink size={15} />
                </div>
                <div className="project-type">{project.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="achievements" className="content-section recognition-section">
          <SectionHeading
            index="04"
            eyebrow="recognition"
            title="Proof that the side quests shipped."
            description="Competitions, responsible disclosures and intellectual property from the earlier portfolio."
          />
          <div className="achievement-grid">
            <article className="achievement-card"><span>01</span><div><h3>1st Place — Hack with GDG Season-03</h3><p>NuetreX.io secured 1st Place in the Requestly Track at Hack with GDG Season-03, a 36-hour hackathon hosted by GDG KSRCE.</p><small>SEPT 2025 · REQUESTLY · WEB SECURITY</small></div></article>
            <article className="achievement-card"><span>02</span><div><h3>1st Place — IoT Hackathon</h3><p>Ranked 1st among participating teams with an IoT-based real-world solution focused on home automation and security.</p><small>MAR 2025 · IOT · ARDUINO · RASPBERRY PI</small></div></article>
            <article className="achievement-card"><span>03</span><div><h3>1st Place — GenAI Hackathon</h3><p>Built an AI-powered cybersecurity threat detection system at K.S.R. College of Engineering.</p><small>APR 2025 · AI/ML · PYTHON · TENSORFLOW</small></div></article>
            <article className="achievement-card"><span>04</span><div><h3>4th Place — Smart India Hackathon</h3><p>Ranked among 40+ teams with a real-world municipal waste-management solution.</p><small>OCT 2024 · IOT · WEB · DATA ANALYTICS</small></div></article>
            <article className="achievement-card"><span>05</span><div><h3>Responsible Security Disclosures</h3><p>Identified a misconfigured DMARC policy and a PII exposure issue and reported both responsibly.</p><small>DMARC · EMAIL SECURITY · GOOGLE DORKING</small></div></article>
            <article className="achievement-card copyright-card"><span>©</span><div><h3>Copyright Registered — Offensive and Defensive Cyber Hacking Alert Using Blockchain</h3><p>Copyright registration for a Python cybersecurity toolkit covering offensive testing, defensive monitoring, blockchain-based logging and self-healing mechanisms.</p><small>APPLICATION SW-38224/2025-CO · CERTIFICATE SW-2026022251 · ROC 29 JAN 2026</small></div></article>
          </div>
        </section>

        <section id="lab" className="content-section lab-grid">
          <div>
            <SectionHeading
              index="05"
              eyebrow="toolchain"
              title="The stack behind the side quests."
            />
            <div className="skills-grid">
              {skills.map(([title, copy, Icon]) => (
                <div className="skill-card" key={title}>
                  <Icon size={19} />
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="lab-terminal">
            <div className="terminal-label"><span /> LIVE LAB</div>
            <div className="lab-line"><span>01</span> ping localhost</div>
            <div className="lab-line"><span>02</span> system → <b>secure</b></div>
            <div className="lab-line"><span>03</span> services → <b>12 online</b></div>
            <div className="lab-line"><span>04</span> devices → <b>07 connected</b></div>
            <div className="lab-line"><span>05</span> caffeine → <b>∞</b></div>
            <div className="lab-line"><span>06</span> next_side_quest → <b>loading...</b></div>
            <div className="scanner"><span>SCANNING</span><i /></div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-card">
            <div>
              <div className="section-kicker"><span>06</span> open channel</div>
              <h2>Have a system worth building?</h2>
              <p>Drop a message. Security research, engineering, collaborations and interesting problems are welcome.</p>
            </div>
            <div className="contact-actions">
              <a href="mailto:ricky.devsec@gmail.com" className="primary-btn"><Mail size={17} /> Email me</a>
              <a href="https://www.instagram.com/ricky.techie/" target="_blank" rel="noreferrer" className="ghost-btn">◎ Instagram</a>
              <a href="https://www.linkedin.com/in/ricky-f-btech/" target="_blank" rel="noreferrer" className="ghost-btn"><Linkedin size={17} /> LinkedIn</a>
              <a href="https://github.com/Ricky-Hacker001" target="_blank" rel="noreferrer" className="ghost-btn"><Github size={17} /> GitHub</a>
            </div>
          </div>
        </section>
      </main>


      <button type="button" className="terminal-launcher" onClick={() => setTerminalOpen(true)} aria-label="Open interactive terminal">
        <span className="terminal-launcher-ring" />
        <TerminalSquare size={18} />
        <span>TERMINAL</span>
      </button>

      {terminalOpen && (
        <div className="terminal-overlay" role="dialog" aria-modal="true" aria-label="Interactive terminal">
          <div className="terminal-window">
            <div className="terminal-window-head">
              <div className="terminal-window-title"><span className="terminal-live-dot" /> ricky@cyberlab — secure shell</div>
              <div className="terminal-window-actions">
                <button type="button" onClick={() => setTerminalLines(["ricky@lab:~$ _"])} aria-label="Clear terminal">CLEAR</button>
                <button type="button" onClick={() => setTerminalOpen(false)} aria-label="Close terminal"><X size={16} /></button>
              </div>
            </div>
            <div className="terminal-output" aria-live="polite">
              {terminalLines.map((line, index) => <div key={index} className={line.startsWith("SYSTEM") ? "terminal-success" : ""}>{line}</div>)}
            </div>
            <form className="terminal-input-row" onSubmit={(event) => {
              event.preventDefault();
              const command = terminalInput.trim().toLowerCase();
              if (!command) return;
              const responses: Record<string, string> = {
                help: "commands: help · about · skills · projects · status · clear",
                about: "identity: security × software × hardware",
                skills: "stack: react · node · java · python · docker · kubernetes · linux",
                projects: "projects: koottali · open_cobra · cake delight · leakwatch · gold app",
                status: "all systems nominal // perimeter green // lab online",
              };
              const output = command === "clear" ? [] : [`ricky@lab:~$ ${command}`, responses[command] ?? `command not found: ${command}  // try "help"`, "ricky@lab:~$ _"];
              setTerminalLines(output);
              setTerminalInput("");
            }}>
              <span>›</span>
              <input value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} autoFocus aria-label="Terminal command" placeholder="type help" />
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <span>© {new Date().getFullYear()} Ricky. Built in public.</span>
        <span>NO TEMPLATE. JUST SIDE QUESTS.</span>
      </footer>
    </div>
  );
};

export default Index;
