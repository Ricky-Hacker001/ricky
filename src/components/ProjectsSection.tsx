
import React from 'react';
import { ExternalLink, Github, File } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Chrisbo | Humanoid Robot",
    description: "Developing an AI-powered humanoid robot to assist and guide visitors at the college reception, using a college-specific AI dataset for context-aware interaction.",
    tech: ["Python", "Raspberry Pi 4", "Arduino Mega", "Serial Comm", "Sensors", "Motors", "AI Dataset"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/Ricky-Hacker001",
    live: "",
    inProgress: true
  },
  {
    title: "WiFi Monitoring Security Device",
    description: "Built a real-time WiFi intrusion and object detection system using Raspberry Pi and cloud integration that detects suspicious network activity and physical intrusions.",
    tech: ["Raspberry Pi 4", "Python", "TP-Link Adapter", "MySQL", "Telegram API", "Ultrasonic Sensors", "OpenCV"],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/Ricky-Hacker001",
    live: ""
  },
  {
    title: "HRM Portal | Full-Stack Web App",
    description: "Developed a complete HR management system for Noesis Publishing Services Pvt. Ltd. that automates employee records, attendance, and payroll.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Auth System"],
    imageUrl: "https://images.unsplash.com/photo-1578091879915-33ee869e2cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    github: "https://github.com/Ricky-Hacker001",
    live: "https://example-hrm.com"
  },
  {
    title: "College Student Notes Portal",
    description: "A full-stack web application that allows students to share and access academic notes securely within a college environment.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    github: "https://github.com/Ricky-Hacker001",
    live: ""
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-6 md:px-10 lg:px-24">
      <div className="container mx-auto">
        <h2 className="section-heading">Some Things I've Built</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {projects.map((project, index) => (
            <div key={index} className="project-card relative group">
              <Card className="bg-portfolio-light-navy border-portfolio-lightest-navy overflow-hidden h-full">
                <div className="relative">
                  <div className="absolute inset-0 bg-portfolio-navy opacity-60 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="h-48 w-full object-cover project-image"
                  />
                  
                  <div className="absolute top-0 right-0 p-4 flex gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-portfolio-lightest-slate hover:text-portfolio-teal bg-portfolio-navy-shadow p-2 rounded-full transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-portfolio-lightest-slate hover:text-portfolio-teal bg-portfolio-navy-shadow p-2 rounded-full transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  
                  {project.inProgress && (
                    <div className="absolute top-0 left-0 bg-portfolio-teal text-portfolio-navy px-2 py-1 text-xs font-semibold">
                      In Progress
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-portfolio-lightest-slate mb-2">
                    {project.title}
                  </h3>
                  <p className="text-portfolio-slate mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="text-xs font-fira-code text-portfolio-teal bg-portfolio-teal-tint px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-portfolio-lightest-slate mb-6">Other Noteworthy Projects</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-portfolio-light-navy border-portfolio-lightest-navy h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <File size={28} className="text-portfolio-teal" />
                  <div className="flex gap-3">
                    <a href="https://github.com/Ricky-Hacker001" target="_blank" rel="noopener noreferrer" className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-portfolio-lightest-slate mb-2">Front-End Projects</h3>
                <p className="text-portfolio-slate mb-4">Collection of responsive websites including Magnovite Event Website, Dance Studio Website, and CN-workX Website.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-fira-code text-portfolio-teal">HTML</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">CSS</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">JavaScript</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-portfolio-light-navy border-portfolio-lightest-navy h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <File size={28} className="text-portfolio-teal" />
                  <div className="flex gap-3">
                    <a href="https://github.com/Ricky-Hacker001" target="_blank" rel="noopener noreferrer" className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-portfolio-lightest-slate mb-2">IoT Projects</h3>
                <p className="text-portfolio-slate mb-4">Hardware projects including Path-Following Robot, Password-Based Circuit Breaker, and RFID Cloner.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-fira-code text-portfolio-teal">Arduino</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">C/C++</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">RFID</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">SPI</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-portfolio-light-navy border-portfolio-lightest-navy h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <File size={28} className="text-portfolio-teal" />
                  <div className="flex gap-3">
                    <a href="https://github.com/Ricky-Hacker001" target="_blank" rel="noopener noreferrer" className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-portfolio-lightest-slate mb-2">Secure Restaurant Website</h3>
                <p className="text-portfolio-slate mb-4">A full-stack restaurant website with secure ordering system and admin dashboard for menu management.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-fira-code text-portfolio-teal">HTML</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">CSS</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">JavaScript</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">PHP</span>
                  <span className="text-xs font-fira-code text-portfolio-teal">MySQL</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;