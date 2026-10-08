import { Shield, Code2, Cpu, BrainCircuit, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  The four worlds (About)                                            */
/* ------------------------------------------------------------------ */

export type World = {
  key: "cyber" | "build" | "ai" | "hardware";
  title: string;
  line: string;
  icon: LucideIcon;
  items: string[];
  signal: string;
};

export const WORLDS: World[] = [
  {
    key: "cyber",
    title: "CYBER",
    line: "Breaking systems and understanding how they fail.",
    icon: Shield,
    items: ["VAPT", "SOC / SIEM", "Web & API Security", "OSINT", "Responsible Disclosure"],
    signal: "ATTACK SURFACE",
  },
  {
    key: "build",
    title: "BUILD",
    line: "Creating full-stack applications and backend systems.",
    icon: Code2,
    items: ["React", "Node.js", "PHP / MySQL", "Microservices", "Auth & RBAC"],
    signal: "SHIP PIPELINE",
  },
  {
    key: "ai",
    title: "AI",
    line: "Experimenting with LLMs, computer vision and intelligent agents.",
    icon: BrainCircuit,
    items: ["Python", "TensorFlow", "OpenCV", "LLMs", "AI Agents"],
    signal: "INFERENCE",
  },
  {
    key: "hardware",
    title: "HARDWARE",
    line: "Building with ESP32, Raspberry Pi, sensors and electronics.",
    icon: Cpu,
    items: ["ESP32 / ESP8266", "Raspberry Pi", "Arduino", "NRF24L01 / RFID", "Sensors"],
    signal: "COPPER + CODE",
  },
];

/* ------------------------------------------------------------------ */
/*  Technology constellation (Skills)                                  */
/* ------------------------------------------------------------------ */

export type SkillNode = { key: string; label: string; items: string[] };

export const SKILL_NODES: SkillNode[] = [
  {
    key: "cyber",
    label: "CYBERSECURITY",
    items: [
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Wazuh",
      "Splunk",
      "Velociraptor",
      "SQLmap",
      "Metasploit",
      "OWASP",
      "API Security",
      "Web Security",
    ],
  },
  {
    key: "fullstack",
    label: "FULL STACK",
    items: ["React", "Node.js", "Express", "FastAPI", "Java", "Spring Boot", "PHP", "MySQL", "MongoDB"],
  },
  {
    key: "ai",
    label: "AI",
    items: ["Python", "PyTorch", "TensorFlow", "YOLO", "ONNX", "OpenCV", "LLMs", "AI Agents"],
  },
  { key: "cloud", label: "CLOUD", items: ["AWS", "Terraform", "Nginx", "Vercel"] },
  { key: "devops", label: "DEVOPS", items: ["Docker", "Kubernetes", "GitHub Actions", "Git", "Linux"] },
  {
    key: "electronics",
    label: "ELECTRONICS",
    items: ["ESP32", "ESP8266", "Raspberry Pi", "Arduino", "NRF24L01", "Sensors"],
  },
  { key: "iot", label: "IoT", items: ["IoT Systems", "RFID", "Wireless Telemetry", "Telegram Alerts"] },
  {
    key: "automation",
    label: "AUTOMATION",
    items: ["Python Tooling", "Telegram Bots", "Lab Automation", "Data Workflows", "Scripting"],
  },
];
