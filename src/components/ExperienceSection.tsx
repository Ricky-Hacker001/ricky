import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const experiences = [
  {
    date: "JAN 2026 — MAY 2026",
    title: "SOC Analyst",
    company: "Terraeagle",
    place: "Remote",
    bullets: [
      "Monitored and triaged security telemetry using Grafana, leveraging Copilot to investigate critical alerts and asset impacts.",
      "Documented technical evidence and incident resolutions to maintain clear audit trails.",
      "Investigated suspicious activity and potential cyber threats using SIEM tools, log analysis and automated insights.",
      "Assisted with incident response, threat mitigation and security finding documentation."
    ]
  },
  {
    date: "MAY 2025",
    title: "Strategic & Data Analyst Intern",
    company: "Elevate Ecosystem Private Limited",
    place: "Indiranagar, Bangalore",
    bullets: [
      "Conducted strategic analysis and data interpretation for real-time projects.",
      "Developed insights to support data-driven business decisions.",
      "Collaborated with professionals to streamline analytical workflows and reporting.",
      "Gained practical exposure to industry-level data analytics and strategic planning."
    ]
  },
  {
    date: "JUL 2024 — JUL 2025",
    title: "Club Head",
    company: "Scripters | Christ University",
    place: "School of Technology",
    bullets: [
      "Led a technical club focused on automation and networking concepts.",
      "Organized workshops on scripting and advanced networking techniques.",
      "Mentored students using Python, Arduino and networking protocols.",
      "Hosted a bug bounty event to improve cybersecurity awareness."
    ]
  },
  {
    date: "MAY 2024",
    title: "Web Developer",
    company: "Noesis Publishing Services",
    place: "Coimbatore, Tamil Nadu",
    bullets: [
      "Built secure web applications with data privacy and role-based access controls.",
      "Implemented secure authentication mechanisms.",
      "Developed the HRM Portal for employee records, attendance and payroll.",
      "Created responsive UI with real-time tracking and secure access control."
    ]
  },
  {
    date: "2023 — 2024",
    title: "Event Website Developer",
    company: "Magnovite | Christ University",
    place: "School of Technology",
    bullets: [
      "Designed and developed the official Magnovite 2023–24 event website.",
      "Implemented dynamic content for schedules and event highlights.",
      "Optimized mobile responsiveness and participant experience."
    ]
  }
];

const ExperienceSection = () => (
  <section id="experience" className="content-section">
    <SectionHeading
      index="02"
      eyebrow="trajectory"
      title="Where I’ve built, shipped and learned."
      description="The actual work trail behind the experiments."
    />
    <div className="experience-grid">
      {experiences.map((exp, i) => (
        <motion.article
          key={exp.company}
          className="experience-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
        >
          <div className="experience-date">{exp.date}</div>
          <div>
            <h3>{exp.title} <em>@ {exp.company}</em></h3>
            <div className="experience-place">{exp.place}</div>
            <ul>{exp.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default ExperienceSection;
