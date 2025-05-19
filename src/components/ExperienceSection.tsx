import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const experiences = [
  {
    id: "web-dev",
    title: "Web Developer",
    company: "Noesis Publishing Services",
    location: "Coimbatore, Tamil Nadu",
    date: "May 2024",
    bullets: [
      "Built secure web applications with a focus on data privacy and role-based access controls.",
      "Gained experience in implementing secure authentication mechanisms.",
      "Developed the HRM Portal, a complete HR management system that automates employee records, attendance, and payroll.",
      "Created responsive UI with real-time tracking and secure access control."
    ],
  },
  {
    id: "magnovite",
    title: "Event Website Developer",
    company: "Christ University",
    location: "School of Technology",
    date: "2023-24",
    bullets: [
      "Designed and developed the official event website for Magnovite 2023-24.",
      "Implemented dynamic content features to showcase event schedules and highlights.",
      "Ensured mobile responsiveness and optimized user experience for event participants."
    ],
  },
  {
    id: "club-head",
    title: "Club Head",
    company: "Scripters | Christ University",
    location: "School of Technology",
    date: "July 2024 - Present",
    bullets: [
      "Lead a technical club focused on teaching automation and networking concepts to students.",
      "Organized workshops on scripting and advanced networking techniques.",
      "Mentored students on using tools like Python, Arduino, and networking protocols effectively.",
      "Created practical learning environments for hands-on experience with technical tools.",
      "Hosted a bug bounty event to enhance cybersecurity awareness among students."
    ],
  },
  {
    id: "intern",
    title: "Strategic and Data Analyst Intern",
    company: "Elevate Ecosystem Private Limited",
    location: "Indiranagar, Bangalore",
    date: "May 2025 - Present",
    bullets: [
      "Conducted strategic analysis and data interpretation for real-time projects.",
      "Developed insights to optimize business decisions based on data-driven methodologies.",
      "Collaborated with professionals to streamline analytical workflows and enhance reporting.",
      "Gained practical exposure to industry-level data analytics and strategic planning.",
      "Expressed gratitude to mentors for guidance in securing this opportunity."
    ],
  }
];

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="experience" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <h2 className="section-heading">Where I've Worked</h2>

        {/* Desktop View */}
        <div className="hidden md:block mt-6">
          <Tabs defaultValue="web-dev" className="w-full">
            <TabsList className="flex flex-col sm:flex-row border-l sm:border-l-0 sm:border-b border-portfolio-lightest-navy mb-4 overflow-x-auto">
              {experiences.map((exp) => (
                <TabsTrigger 
                  key={exp.id} 
                  value={exp.id}
                  className="px-4 py-2 font-fira-code data-[state=active]:border-l-2 sm:data-[state=active]:border-l-0 sm:data-[state=active]:border-b-2 data-[state=active]:border-portfolio-teal data-[state=active]:text-portfolio-teal whitespace-nowrap"
                >
                  {exp.company.split('|')[0].trim()}
                </TabsTrigger>
              ))}
            </TabsList>

            {experiences.map((exp) => (
              <TabsContent key={exp.id} value={exp.id} className="animate-fade-in-down">
                <div className="mb-2">
                  <h3 className="text-lg font-medium text-portfolio-lightest-slate">
                    {exp.title} <span className="text-portfolio-teal">@ {exp.company}</span>
                  </h3>
                  <p className="text-xs font-fira-code text-portfolio-slate mt-1 mb-3">
                    {exp.date} | {exp.location}
                  </p>
                </div>

                <ul className="space-y-2 max-w-2xl text-sm">
                  {exp.bullets.map((bullet, index) => (
                    <li key={index} className="flex">
                      <span className="text-portfolio-teal mt-1 mr-2">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile View - Swipeable Carousel */}
        <div className="md:hidden mt-6 relative overflow-hidden">
          <motion.div 
            key={experiences[activeIndex].id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-lg font-medium text-portfolio-lightest-slate">
              {experiences[activeIndex].title} <span className="text-portfolio-teal">@ {experiences[activeIndex].company}</span>
            </h3>
            <p className="text-xs font-fira-code text-portfolio-slate mt-1 mb-3">
              {experiences[activeIndex].date} | {experiences[activeIndex].location}
            </p>
            <ul className="space-y-2 max-w-md mx-auto text-sm">
              {experiences[activeIndex].bullets.map((bullet, index) => (
                <li key={index} className="flex">
                  <span className="text-portfolio-teal mt-1 mr-2">▹</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button 
              onClick={handlePrev} 
              className="px-3 py-1 text-portfolio-teal bg-portfolio-lightest-navy rounded-md"
            >
              ◀ Prev
            </button>
            <button 
              onClick={handleNext} 
              className="px-3 py-1 text-portfolio-teal bg-portfolio-lightest-navy rounded-md"
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
