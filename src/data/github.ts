/** Fallback shown when the GitHub API is unreachable or rate-limited. No invented metrics. */
export const GITHUB_FALLBACK_REPOS = [
  { name: "open_cobra", language: "Python", stars: null, url: "https://github.com/Ricky-Hacker001/open_cobra", description: "Multi-tool Python cybersecurity framework." },
  { name: "leakwatch", language: "JavaScript", stars: null, url: "https://github.com/Ricky-Hacker001/leakwatch", description: "CLI pre-push secret & PII scanner." },
  { name: "chrisbo", language: null, stars: null, url: "https://github.com/Ricky-Hacker001/chrisbo", description: "Modular humanoid robot." },
  { name: "Cake_Microservice", language: "JavaScript", stars: null, url: "https://github.com/Ricky-Hacker001/Cake_Microservice", description: "Cloud-native microservices app." },
  { name: "koottali", language: "Kotlin", stars: null, url: "https://github.com/Ricky-Hacker001/koottali", description: "Linux × Android companion." },
  { name: "network", language: "PHP", stars: null, url: "https://github.com/Ricky-Hacker001/network", description: "Wi-Fi monitoring & anomaly detection." },
];

/** Repos highlighted first when live data is available (in this order). */
export const GITHUB_PINNED = ["open_cobra", "leakwatch", "chrisbo", "Cake_Microservice", "koottali", "network"];
