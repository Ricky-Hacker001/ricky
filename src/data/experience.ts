export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  org: string;
  place: string;
  work: string[];
  tech: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "terraeagle",
    period: "JAN 2026 — MAY 2026",
    role: "SOC Analyst",
    org: "Terraeagle",
    place: "Remote · Bangalore",
    work: [
      "Monitored and triaged security telemetry in Grafana, investigating critical alerts and asset impact.",
      "Documented technical evidence and incident resolutions to maintain clear audit trails.",
      "Investigated suspicious activity using SIEM tooling, log analysis and automated insights.",
    ],
    tech: ["Grafana", "SIEM", "Log Analysis", "Incident Response"],
  },
  {
    id: "velonetics",
    period: "AUG 2025 — SEP 2025",
    role: "VAPT Analyst",
    org: "Velonetics",
    place: "Bangalore",
    work: [
      "Conducted vulnerability assessments and penetration tests on web apps and network infrastructure.",
      "Identified, analysed and reported security vulnerabilities with actionable remediation guidance.",
    ],
    tech: ["Burp Suite", "Nmap", "OWASP", "Reporting"],
  },
  {
    id: "elevate",
    period: "MAY 2025",
    role: "Strategic & Data Analyst Intern",
    org: "Elevate Ecosystem",
    place: "Indiranagar, Bangalore",
    work: [
      "Automated large-scale client data workflows, improving reporting efficiency.",
      "Developed insights to support data-driven business decisions.",
    ],
    tech: ["Python", "Automation", "Data Analysis"],
  },
  {
    id: "scripters",
    period: "JUL 2024 — JUL 2025",
    role: "Club Head — Scripters",
    org: "Christ University",
    place: "School of Technology",
    work: [
      "Led a technical club focused on automation and networking; ran 5+ hands-on workshops.",
      "Mentored 30+ students in Python, Arduino and TCP/IP, and hosted a bug-bounty event.",
    ],
    tech: ["Python", "Arduino", "TCP/IP", "Bug Bounty"],
  },
  {
    id: "noesis",
    period: "MAY 2024",
    role: "Web Developer Intern",
    org: "Noesis Publishing Services",
    place: "Coimbatore, Tamil Nadu",
    work: [
      "Engineered a full-stack HRM portal in PHP/MySQL with secure authentication and RBAC.",
      "Automated employee onboarding and payroll, cutting manual HR workload significantly.",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "RBAC"],
  },
];

export type Achievement = { code: string; title: string; detail: string; meta: string };

export const ACHIEVEMENTS: Achievement[] = [
  {
    code: "01",
    title: "1st Place — Hack with GDG Season-03",
    detail: "Team NuetreX.io won the Requestly Track at a 36-hour hackathon hosted by GDG KSRCE.",
    meta: "SEP 2025 · REQUESTLY · WEB SECURITY",
  },
  {
    code: "02",
    title: "1st Place — IoT Hackathon",
    detail: "Ranked 1st with an IoT real-world solution focused on home automation and security.",
    meta: "MAR 2025 · ARDUINO · RASPBERRY PI",
  },
  {
    code: "03",
    title: "1st Place — GenAI Hackathon",
    detail: "Built an AI-powered cybersecurity threat-detection system at K.S.R. College of Engineering.",
    meta: "APR 2025 · AI/ML · PYTHON · TENSORFLOW",
  },
  {
    code: "04",
    title: "4th Place — Smart India Hackathon",
    detail: "Ranked among 40+ teams with a real-world municipal waste-management solution.",
    meta: "OCT 2024 · IOT · WEB · DATA ANALYTICS",
  },
  {
    code: "05",
    title: "Responsible Security Disclosures",
    detail: "Reported a misconfigured DMARC policy and a PII exposure issue through coordinated disclosure.",
    meta: "DMARC · EMAIL SECURITY · OSINT",
  },
  {
    code: "©",
    title: "Copyright — Offensive & Defensive Cyber Alert Toolkit",
    detail:
      "Registered copyright for a Python toolkit covering offensive testing, defensive monitoring and blockchain-based secure logging.",
    meta: "CERT SW-2026022251 · ROC 29 JAN 2026",
  },
];
