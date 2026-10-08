/**
 * Project Lab — only real projects from the previous portfolio, the résumé
 * and public repositories on github.com/Ricky-Hacker001.
 */

export type ProjectVisual =
  | "neural"
  | "terminal"
  | "scanner"
  | "radar"
  | "robot"
  | "mesh"
  | "handoff"
  | "dashboard";

export type Project = {
  code: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  repo?: string;
  live?: string;
  status: "ACTIVE" | "SHIPPED" | "RESEARCH";
  visual: ProjectVisual;
  /** Short technical facts revealed on hover. */
  specs: string[];
};

const GH = "https://github.com/Ricky-Hacker001";

export const PROJECTS: Project[] = [
  {
    code: "01",
    title: "Open Cobra",
    category: "SECURITY TOOLKIT",
    description:
      "An all-in-one cybersecurity toolkit in Python: modular passive recon, vulnerability scanning, hashing utilities and automated reporting to streamline penetration-testing workflows.",
    tags: ["Python", "Recon", "VAPT", "Automation", "CLI"],
    repo: `${GH}/open_cobra`,
    status: "ACTIVE",
    visual: "terminal",
    specs: ["MODULES // RECON · SCAN · HASH · REPORT", "INTERFACE // CLI", "LANG // PYTHON"],
  },
  {
    code: "02",
    title: "LeakWatch",
    category: "DEVSECOPS / CLI",
    description:
      "A pre-push secret & PII scanner for developers. Catches API keys, passwords, Aadhaar, UPI IDs, PAN numbers and 30+ more patterns — 100% local, before anything leaves the machine.",
    tags: ["Node.js", "CLI", "Git Hooks", "Secret Scanning", "PII"],
    repo: `${GH}/leakwatch`,
    live: "https://www.npmjs.com/package/leakwatch",
    status: "SHIPPED",
    visual: "scanner",
    specs: ["RUN // npx leakwatch scan", "HOOK // pre-push", "PATTERNS // 30+"],
  },
  {
    code: "03",
    title: "Wi-Fi Monitoring Security Device",
    category: "HARDWARE × SECURITY",
    description:
      "A Raspberry Pi 4 intrusion-detection rig: live packet capture in monitor mode, deauth and rogue-AP anomaly detection, ultrasonic entry sensing and Pi Camera captures — with real-time Telegram and dashboard alerts.",
    tags: ["Raspberry Pi 4", "Python", "Scapy", "OpenCV", "Telegram API", "MySQL"],
    repo: `${GH}/network`,
    status: "SHIPPED",
    visual: "radar",
    specs: ["CAPTURE // MONITOR MODE", "DETECT // DEAUTH · ROGUE AP", "ALERT // TELEGRAM + WEB"],
  },
  {
    code: "04",
    title: "Chrisbo",
    category: "AI × ROBOTICS",
    description:
      "A modular humanoid reception robot that guides campus visitors using a college-specific dataset — voice recognition, gesture control and interactive behaviour on a Raspberry Pi 4 + Arduino Mega control stack.",
    tags: ["Raspberry Pi 4", "Arduino Mega", "Python", "AI Dataset", "Sensors"],
    repo: `${GH}/chrisbo`,
    status: "ACTIVE",
    visual: "robot",
    specs: ["BRAIN // RASPBERRY PI 4", "MOTION // ARDUINO MEGA", "I/O // VOICE · GESTURE"],
  },
  {
    code: "05",
    title: "Cake Delight",
    category: "CLOUD-NATIVE",
    description:
      "A cloud-native ordering platform split into catalog, order, rating and notification services behind an Express gateway — RabbitMQ events, per-service MongoDB and Kubernetes orchestration.",
    tags: ["React", "Node.js", "Express Gateway", "RabbitMQ", "MongoDB", "Kubernetes"],
    repo: `${GH}/Cake_Microservice`,
    status: "SHIPPED",
    visual: "mesh",
    specs: ["SERVICES // 4 + GATEWAY", "EVENTS // RABBITMQ", "ORCH // KUBERNETES"],
  },
  {
    code: "06",
    title: "Koottali",
    category: "LINUX × ANDROID",
    description:
      "A local-first companion platform exploring seamless copy, paste, notifications and device handoff between Linux and Android over the local network.",
    tags: ["Kotlin", "Linux", "Android", "Networking", "Open Source"],
    repo: `${GH}/koottali`,
    status: "ACTIVE",
    visual: "handoff",
    specs: ["LINK // LOCAL NETWORK", "SYNC // CLIPBOARD · NOTIFS", "CLIENT // ANDROID"],
  },
  {
    code: "07",
    title: "The Kitchen",
    category: "FULL-STACK WEB APP",
    description:
      "A responsive food-ordering platform with four role-based secure logins (admin, delivery partner, cashier, user), order management, live delivery tracking and monthly sales reporting.",
    tags: ["PHP", "MySQL", "JavaScript", "Auth", "Dashboards"],
    repo: GH,
    status: "SHIPPED",
    visual: "dashboard",
    specs: ["ROLES // 4", "AUTH // ROLE-BASED", "REPORTS // MONTHLY SALES"],
  },
  {
    code: "08",
    title: "HRM Portal",
    category: "FULL-STACK WEB APP",
    description:
      "A complete HR management system for Noesis Publishing Services automating onboarding, attendance and payroll with role-based access control.",
    tags: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "RBAC"],
    repo: GH,
    status: "SHIPPED",
    visual: "dashboard",
    specs: ["CLIENT // NOESIS PUBLISHING", "ACCESS // RBAC", "FLOWS // ONBOARD · PAYROLL"],
  },
];
