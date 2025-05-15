
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    id: "club-head",
    title: "Club Head",
    company: "Scripters | Christ University",
    location: "School of Technology",
    date: "July 2024 - Present",
    bullets: [
      "Lead a technical club focused on teaching automation and networking concepts to students.",
      "Organized workshops on scripting and advanced networking techniques.",
      "Mentored students on using tools like Python, Arduino, and networking protocols effectively.",
      "Created practical learning environments for hands-on experience with technical tools."
    ],
  }
];

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState("web-dev");

  return (
    <section id="experience" className="py-20 px-6 md:px-10 lg:px-24">
      <div className="container mx-auto">
        <h2 className="section-heading">Where I've Worked</h2>
        
        <div className="mt-8">
          <Tabs defaultValue="web-dev" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-col sm:flex-row border-l sm:border-l-0 sm:border-b border-portfolio-lightest-navy mb-6 overflow-x-auto">
              {experiences.map((exp) => (
                <TabsTrigger 
                  key={exp.id} 
                  value={exp.id}
                  className="px-5 py-3 font-fira-code data-[state=active]:border-l-2 sm:data-[state=active]:border-l-0 sm:data-[state=active]:border-b-2 data-[state=active]:border-portfolio-teal data-[state=active]:text-portfolio-teal"
                >
                  {exp.company.split('|')[0].trim()}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {experiences.map((exp) => (
              <TabsContent key={exp.id} value={exp.id} className="animate-fade-in-down">
                <div className="mb-2">
                  <h3 className="text-xl font-medium text-portfolio-lightest-slate">
                    {exp.title} <span className="text-portfolio-teal">@ {exp.company}</span>
                  </h3>
                  <p className="text-sm font-fira-code text-portfolio-slate mt-1 mb-4">
                    {exp.date} | {exp.location}
                  </p>
                </div>
                
                <ul className="space-y-2.5 max-w-2xl">
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
      </div>
    </section>
  );
};

export default ExperienceSection;
