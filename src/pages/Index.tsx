import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, ShieldCheck, TerminalSquare, Cpu, Radio, Code2, Boxes, ExternalLink } from "lucide-react";
import CyberBackground from "../components/CyberBackground";
import SectionHeading from "../components/SectionHeading";

const projects = [
  ["01","Koottali","Linux × Android ecosystem","A local-first companion platform exploring seamless copy, paste, notifications and device handoff between Linux and Android.",["Linux","Android","Networking","Open Source"],"https://github.com/Ricky-Hacker001/ricky"],
  ["02","Open_Cobra","Security research toolkit","A modular security toolkit combining passive recon, vulnerability checks, hashing utilities and security research workflows.",["Python","Recon","Web Security","Research"],"https://github.com/Ricky-Hacker001/ricky"],
  ["03","Cake Delight","Cloud-native microservices","A distributed application built around service boundaries, an API gateway, RabbitMQ events, MongoDB and container orchestration.",["Node.js","Docker","Kubernetes","RabbitMQ"],"https://github.com/Ricky-Hacker001/ricky"],
  ["04","LeakWatch","Data leak monitoring","A security-focused project for monitoring exposed data and turning leak intelligence into actionable security visibility.",["Security","Monitoring","Python","Threat Intel"],"https://github.com/Ricky-Hacker001/leakwatch"],
  ["05","Gold App Backend","Backend engineering","Backend services for a gold-focused application, built around API design, business logic and persistent data workflows.",["Backend","API","Node.js","Database"],"https://github.com/Ricky-Hacker001/gold-app-backend"],
  ["06","Gold App Frontend","Product interface","The frontend application for the Gold App, connecting a responsive user experience to its backend services.",["Frontend","React","API","UI"],"https://github.com/Ricky-Hacker001/gold-app-frontend"]
] as const;

const skills = [
  ["Security","VAPT / Web Security / SOC / Threat Hunting",ShieldCheck],
  ["Engineering","React / Node.js / Java / Python / APIs",Code2],
  ["Cloud","Docker / Kubernetes / CI/CD / AWS",Boxes],
  ["Hardware","ESP32 / Raspberry Pi / IoT / Wireless",Cpu],
  ["Networks","TCP/IP / Linux / Routing / Lab Automation",Radio],
  ["Build","Rapid prototyping / tooling / side quests",TerminalSquare]
] as const;

const nav = [["About","about"],["Experience","experience"],["Projects","projects"],["Achievements","achievements"],["Lab","lab"],["Contact","contact"]];

const Index = () => (
  <div className="site-shell">
    <CyberBackground />
    <div className="noise-layer" />
    <header className="topbar">
      <a href="#top" className="brand"><span className="brand-mark">R</span><span>Ricky<span className="accent">.raw</span></span></a>
      <nav>{nav.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <a className="status-pill" href="mailto:ricky.devsec@gmail.com"><span className="status-dot"/> available</a>
    </header>

    <main id="top">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> SECURITY × SOFTWARE × HARDWARE</div>
          <h1>I build systems<span className="headline-glow"> that fight back.</span></h1>
          <p className="hero-lede">Ricky — engineer and security builder exploring the space where cybersecurity, cloud-native software, Linux and experimental hardware collide.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#projects">Explore work <ArrowDownRight size={17}/></a>
            <a className="ghost-btn" href="https://github.com/Ricky-Hacker001" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17}/></a>
          </div>
          <div className="signal-row"><span><span className="mini-dot"/> Chennai, India</span><span>BUILD STATUS: ONLINE</span><span>LOCATION: KRISHNAGIRI, TAMIL NADU</span></div>
        </div>
        <motion.div className="hero-console" initial={{opacity:0,y:24,rotate:1}} animate={{opacity:1,y:0,rotate:0}} transition={{duration:.8}}>
          <div className="console-top"><span><i/><i/><i/></span><span>ricky@lab:~</span><span>v3.0</span></div>
          <div className="console-body">
            <div><b>$ whoami</b><span>ricky</span></div>
            <div><b>$ focus</b><span>cybersecurity</span></div>
            <div><b>$ stack</b><span>react • node • java • python</span></div>
            <div><b>$ mode</b><span>build → break → learn → repeat</span></div>
            <div className="console-cursor">$ <span className="type-cursor">█</span></div>
          </div>
          <div className="console-graph">{Array.from({length:38},(_,i)=><span key={i} style={{height:`${18+((i*17)%62)}%`}}/>)}</div>
        </motion.div>
      </section>

      <section className="marquee-band"><div>CYBERSECURITY</div><span>✦</span><div>LINUX</div><span>✦</span><div>MICROSERVICES</div><span>✦</span><div>IOT</div><span>✦</span><div>OPEN SOURCE</div><span>✦</span><div>WIRELESS</div></section>

      <section id="about" className="content-section about-grid">
        <SectionHeading index="01" eyebrow="identity" title="A builder with a security-first brain."/>
        <div className="about-panel">
          <p>I like engineering problems that sit one layer below the polished interface: protocols, infrastructure, attack surfaces, distributed systems and the hardware that makes software touch the physical world.</p>
          <p>My portfolio is a record of experiments — from security tooling and Raspberry Pi labs to cloud-native services and an ongoing Linux × Android ecosystem.</p>
          <div className="about-metrics"><div><strong>01</strong><span>Security-first mindset</span></div><div><strong>02</strong><span>Hands-on lab culture</span></div><div><strong>03</strong><span>Software + hardware</span></div></div>
        </div>
      </section>

      <section id="experience" className="content-section">
        <SectionHeading index="02" eyebrow="trajectory" title="Shipping, learning, then shipping again." description="A compact timeline of the environments where I have been building real systems."/>
        <div className="timeline">
          <article><span className="timeline-mark">NOW</span><div><h3>Cloud Native Microservice Engineer <em>@ Accenture</em></h3><p>Java, Spring, Node.js, Docker, Kubernetes and service-oriented architecture.</p></div></article>
          <article><span className="timeline-mark">2026</span><div><h3>SOC & Security Research</h3><p>Hands-on work around monitoring, threat hunting, vulnerability research and self-hosted security labs.</p></div></article>
          <article><span className="timeline-mark">2025</span><div><h3>Strategic & Data / Web Engineering</h3><p>Built web platforms, data workflows and product prototypes across internships and hackathon projects.</p></div></article>
        </div>
      </section>

      <section id="projects" className="content-section">
        <SectionHeading index="03" eyebrow="selected builds" title="Projects from the lab, not the template." description="A few things that represent how I think: useful, experimental and slightly obsessive."/>
        <div className="project-grid">{projects.map(([code,title,type,copy,tags,repo]) => <motion.a key={code} href={repo} target="_blank" rel="noreferrer" className="project-card" whileHover={{y:-7}}>
          <div className="project-meta"><span>{code}</span><ExternalLink size={15}/></div><div className="project-type">{type}</div><h3>{title}</h3><p>{copy}</p><div className="tag-row">{tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        </motion.a>)}</div>
      </section><section id="achievements" className="content-section recognition-section"><SectionHeading index="04" eyebrow="recognition" title="Proof that the side quests shipped." description="Competitions, responsible disclosures and intellectual property from the earlier portfolio." />
        <div className="achievement-grid">
          <article className="achievement-card"><span>01</span><div><h3>1st Place — Hack with GDG Season-03</h3><p>NuetreX.io secured 1st Place in the Requestly Track at Hack with GDG Season-03, a 36-hour hackathon hosted by GDG KSRCE.</p><small>SEPT 2025 · REQUESTLY · WEB SECURITY</small></div></article>
          <article className="achievement-card"><span>02</span><div><h3>1st Place — IoT Hackathon</h3><p>Ranked 1st among participating teams with an IoT-based real-world solution focused on home automation and security.</p><small>MAR 2025 · IOT · ARDUINO · RASPBERRY PI</small></div></article>
          <article className="achievement-card"><span>03</span><div><h3>1st Place — GenAI Hackathon</h3><p>Built an AI-powered cybersecurity threat detection system at K.S.R. College of Engineering.</p><small>APR 2025 · AI/ML · PYTHON · TENSORFLOW</small></div></article>
          <article className="achievement-card"><span>04</span><div><h3>4th Place — Smart India Hackathon</h3><p>Ranked among 40+ teams with a real-world municipal waste-management solution.</p><small>OCT 2024 · IOT · WEB · DATA ANALYTICS</small></div></article>
          <article className="achievement-card"><span>05</span><div><h3>Responsible Security Disclosures</h3><p>Identified a misconfigured DMARC policy and a PII exposure issue and reported both responsibly to improve security and data protection.</p><small>DMARC · EMAIL SECURITY · GOOGLE DORKING</small></div></article>
          <article className="achievement-card copyright-card"><span>©</span><div><h3>Copyright Registered — Offensive and Defensive Cyber Hacking Alert Using Blockchain</h3><p>Official copyright registration for a Python cybersecurity toolkit covering offensive testing, defensive monitoring, blockchain-based logging and self-healing mechanisms.</p><small>APPLICATION SW-38224/2025-CO · CERTIFICATE SW-2026022251 · ROC 29 JAN 2026</small></div></article>
        </div>
      </section>
\n      <section id="lab" className="content-section lab-grid">
        <div><SectionHeading index="05" eyebrow="toolchain" title="The stack behind the side quests."/>
          <div className="skills-grid">{skills.map(([title,copy,Icon])=><div className="skill-card" key={title}><Icon size={19}/><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
        </div>
        <div className="lab-terminal"><div className="terminal-label"><span/> LIVE LAB</div>
          <div className="lab-line"><span>01</span> ping localhost</div><div className="lab-line"><span>02</span> system → <b>secure</b></div><div className="lab-line"><span>03</span> services → <b>12 online</b></div><div className="lab-line"><span>04</span> devices → <b>07 connected</b></div><div className="lab-line"><span>05</span> caffeine → <b>∞</b></div><div className="lab-line"><span>06</span> next_side_quest → <b>loading...</b></div>
          <div className="scanner"><span>SCANNING</span><i/></div>
        </div>
      </section>

      <section id="contact" className="contact-section"><div className="contact-card">
        <div><div className="section-kicker"><span>05</span> open channel</div><h2>Have a system worth building?</h2><p>Drop a message. Security research, engineering, collaborations and interesting problems are welcome.</p></div>
        <div className="contact-actions"><a href="mailto:ricky.devsec@gmail.com" className="primary-btn"><Mail size={17}/> Email me</a><a href="https://www.instagram.com/ricky.techie/" target="_blank" rel="noreferrer" className="ghost-btn"><span>◎</span> Instagram</a><a href="https://www.linkedin.com/in/ricky-f-btech/" target="_blank" rel="noreferrer" className="ghost-btn"><Linkedin size={17}/> LinkedIn</a><a href="https://github.com/Ricky-Hacker001" target="_blank" rel="noreferrer" className="ghost-btn"><Github size={17}/> GitHub</a></div>
      </div></section>
    </main>
    <footer className="footer"><span>© {new Date().getFullYear()} Ricky. Built in public.</span><span>NO TEMPLATE. JUST SIDE QUESTS.</span></footer>
  </div>
);

export default Index;
