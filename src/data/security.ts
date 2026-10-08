/**
 * Security Operations. Domains map to real skills/experience. The live
 * telemetry in the UI is clearly labelled as a simulation — no claims about
 * real attacks, incidents or clients.
 */

export type SecurityDomain = { id: string; label: string; detail: string; side: "OFFENSE" | "DEFENSE" };

export const SECURITY_DOMAINS: SecurityDomain[] = [
  { id: "threat", label: "THREAT DETECTION", detail: "ML-assisted detection of suspicious activity.", side: "DEFENSE" },
  { id: "network", label: "NETWORK MONITORING", detail: "Packet capture, anomaly and rogue-AP detection.", side: "DEFENSE" },
  { id: "web", label: "WEB SECURITY", detail: "OWASP-aligned testing with Burp Suite and SQLmap.", side: "OFFENSE" },
  { id: "api", label: "API SECURITY", detail: "Auth, access-control and input-validation testing.", side: "OFFENSE" },
  { id: "osint", label: "OSINT", detail: "Passive mapping, dorking and attack-surface discovery.", side: "OFFENSE" },
  { id: "cloud", label: "CLOUD SECURITY", detail: "Hardened containers, secrets hygiene and pipeline checks.", side: "DEFENSE" },
  { id: "soc", label: "SOC", detail: "Telemetry triage, alert investigation and IR documentation.", side: "DEFENSE" },
];

/** Generic, illustrative log lines for the simulated console. */
export const SIM_LOGS = [
  "recon      enumerating lab surface …",
  "nmap       -sV 10.0.0.0/24 → services mapped",
  "burp       intercept /api/v1/auth",
  "siem       correlating alert cluster",
  "detector   anomaly score 0.82 → review",
  "wifi       deauth burst pattern (lab)",
  "osint      exposed asset flagged",
  "leakwatch  pre-push scan → 0 secrets",
  "report     remediation drafted",
  "ir         evidence captured · timeline ok",
];
