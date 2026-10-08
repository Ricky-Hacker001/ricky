/**
 * Identity, navigation and education — real information taken from the
 * previous portfolio and the résumé. Presentation lives in components.
 */

export const PROFILE = {
  name: "Ricky",
  handle: "RICKY.TECHIE",
  tagline: "Tamil Engineer Building Weird Stuff",
  roles: ["Cybersecurity Engineer", "Full-Stack Developer", "AI Builder", "Electronics Explorer"],
  disciplines: ["Cybersecurity", "Full-Stack", "AI", "Electronics"],
  location: "Krishnagiri · Bangalore, India",
  email: "ricky.devsec@gmail.com",
  resume:
    "https://raw.githubusercontent.com/Ricky-Hacker001/ricky/main/src/components/Ricky_Resume.pdf",
  githubUser: "Ricky-Hacker001",
  intro:
    "I build, break and experiment across software, cybersecurity, artificial intelligence and hardware.",
  about:
    "I like engineering problems that sit one layer below the polished interface: protocols, infrastructure, attack surfaces, distributed systems and the hardware that makes software touch the physical world. This portfolio is a record of experiments — from security tooling and Raspberry Pi labs to cloud-native services and an ongoing Linux × Android ecosystem.",
};

export const NAV = [
  { label: "HOME", id: "top" },
  { label: "ABOUT", id: "about" },
  { label: "WORK", id: "work" },
  { label: "LAB", id: "lab" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "CONTENT", id: "content" },
  { label: "CONTACT", id: "contact" },
] as const;

export type NavId = (typeof NAV)[number]["id"];

/** Decorative HUD labels. Flavour only — no metrics or claims. */
export const HUD_LABELS = [
  "SECURITY_NODE_01",
  "BUILD_STATUS: ACTIVE",
  "SYSTEM_ID: RICKY",
  "NETWORK: CONNECTED",
  "MODE: EXPERIMENTAL",
];

export const EDUCATION = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Christ (Deemed to be University), Bangalore",
  period: "AUG 2022 — MAY 2026",
  focus: "Cybersecurity · IoT · Network Engineering",
};

export const CERTIFICATIONS: string[] = [
  "CISCO — Networking Protocols Basics",
  "CISCO — Introduction to Cybersecurity",
  "CISCO — Ethical Hacker",
  "CISCO — Intro to IoT & Digital Transformation",
  "Basic Ethical Hacking — My Captain",
  "Introduction to DevOps — Great Learning",
  "SQL & Database Bootcamp — Udemy",
];

/**
 * Optional production avatar. Drop a Draco-compressed GLB (KTX2 textures
 * supported) into /public/models and set the path here — the hero will load
 * it progressively instead of the procedural engineer.
 */
export const AVATAR = {
  modelUrl: null as string | null, // e.g. "/models/ricky-avatar.glb"
  fallbackImage: "/images/avatar-fallback.webp",
};
