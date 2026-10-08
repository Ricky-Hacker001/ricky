import { PROJECTS } from "@/data/projects";
import { SOCIALS } from "@/data/social";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectPanel from "./ProjectPanel";
import { ArrowUpRight } from "lucide-react";

const ProjectLab = () => (
  <section id="work" aria-labelledby="work-title" className="relative scroll-mt-24 py-[clamp(96px,14vw,180px)]">
    <div className="wrap">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="work-title"
          index="03"
          label={`${PROJECTS.length} BUILDS ON FILE`}
          title={["PROJECT", <span key="lab" className="text-signal">LAB</span>]}
          subtitle="Things I've built, broken and experimented with."
          className="!mb-0"
        />
        <a
          href={SOCIALS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal link-line mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[var(--text-dim)] hover:text-white"
        >
          FULL ARCHIVE ON GITHUB <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="mt-16 grid gap-6 md:mt-20 md:gap-8">
        {PROJECTS.map((p, i) => (
          <ProjectPanel key={p.code} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectLab;
