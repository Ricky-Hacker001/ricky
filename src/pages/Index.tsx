import { useEffect, useState } from "react";
import Backdrop from "@/components/system/Backdrop";
import ScrollProgress from "@/components/system/ScrollProgress";
import CustomCursor from "@/components/system/CustomCursor";
import Loader from "@/components/system/Loader";
import Terminal from "@/components/system/Terminal";
import SectionRail from "@/components/system/SectionRail";
import FloatingNav from "@/components/navigation/FloatingNav";
import Hero from "@/components/hero/Hero";
import SignalBand from "@/components/hero/SignalBand";
import About from "@/components/about/About";
import Constellation from "@/components/skills/Constellation";
import ProjectLab from "@/components/projects/ProjectLab";
import HardwareLab from "@/components/hardware/HardwareLab";
import SecurityOps from "@/components/cyber/SecurityOps";
import MissionLog from "@/components/experience/MissionLog";
import ContentStudio from "@/components/content/ContentStudio";
import OpenSource from "@/components/content/OpenSource";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/contact/Footer";
import { useReveal } from "@/hooks/useReveal";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NAV } from "@/data/profile";

const IDS = NAV.map((n) => n.id);

const Index = () => {
  const [terminal, setTerminal] = useState(false);
  const active = useActiveSection(IDS, "top");
  useReveal();

  // Honour deep links like /#work (also when arriving from /blog).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Loader />
      <Backdrop />
      <ScrollProgress />
      <CustomCursor />
      <FloatingNav active={active} onTerminal={() => setTerminal(true)} />
      <SectionRail active={active} />

      <main id="main" className="relative z-[2]">
        <Hero />
        <SignalBand />
        <About />
        <Constellation />
        <ProjectLab />
        <HardwareLab />
        <SecurityOps />
        <MissionLog />
        <ContentStudio />
        <OpenSource />
        <Contact />
      </main>

      <Footer />
      <Terminal open={terminal} onClose={() => setTerminal(false)} />
    </div>
  );
};

export default Index;
