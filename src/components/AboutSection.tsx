import React from 'react';
import { Lock, Shield, Code, Database, Bug, Terminal } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    "Python", "JavaScript", "HTML5", "CSS3", "PHP",
    "Cybersecurity", "Ethical Hacking", "Vulnerability Assessment",
    "Arduino", "Raspberry Pi", "RFID Systems",
    "Networking Protocols", "SQL", "Git"
  ];

  const specializations = [
    { 
      name: "Cybersecurity", 
      icon: Shield,
      description: "Penetration testing, vulnerability assessment, and security auditing"
    },
    { 
      name: "IoT Development", 
      icon: Terminal,
      description: "Building smart devices and connected systems with Arduino and Raspberry Pi"
    },
    { 
      name: "Network Engineering", 
      icon: Database,
      description: "Designing and implementing secure networking protocols and infrastructure"
    },
    { 
      name: "Ethical Hacking", 
      icon: Bug,
      description: "White-hat hacking techniques to identify and fix security vulnerabilities"
    },
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-10 lg:px-24">
      <div className="container mx-auto">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4 text-lg">
            <div className="bg-portfolio-lightest-navy bg-opacity-50 p-4 border-l-4 border-portfolio-teal rounded-r mb-4">
              <p className="font-fira-code text-sm">
                <span className="text-red-400">import</span>{" "}
                <span className="text-green-400">&#123; Developer &#125;</span>{" "}
                <span className="text-red-400">from</span>{" "}
                <span className="text-yellow-400">'@cybersecurity/experts'</span>;
              </p>
            </div>
            
            <p>
              Hello! I'm Ricky, a multidisciplinary engineering student with a passion for building secure, 
              innovative tech solutions. My journey spans across various domains including cybersecurity, 
              IoT development, and full-stack web engineering.
            </p>
            
            <p>
              I'm currently pursuing my <span className="text-portfolio-teal">Bachelor of Technology in Computer Science and Engineering</span> at 
              Christ University, Bangalore, where I'm constantly expanding my knowledge and skills.
            </p>
            
            <p>
              As a web developer at Noesis Publishing Services, I built secure web applications with a focus on data privacy 
              and role-based access controls. I'm also proudly serving as the <span className="text-portfolio-teal">Club Head of Scripters</span> at 
              Christ University, where I lead workshops on automation and networking concepts.
            </p>
            
            <div className="mt-8 mb-8">
              <h3 className="text-xl text-portfolio-lightest-slate mb-4">Specializations:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specializations.map((spec, index) => (
                  <div key={index} className="border border-portfolio-lightest-navy bg-portfolio-light-navy bg-opacity-30 p-4 rounded flex gap-4 hover:border-portfolio-teal transition-colors duration-300">
                    <div className="text-portfolio-teal">
                      <spec.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-portfolio-teal font-semibold">{spec.name}</h4>
                      <p className="text-sm text-portfolio-slate mt-1">{spec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p>
              Here are a few technologies I've been working with recently:
            </p>
            
            <div className="mt-4 p-4 bg-portfolio-lightest-navy bg-opacity-40 rounded border border-portfolio-lightest-navy">
              <h3 className="font-fira-code text-portfolio-teal mb-4">$ tech_stack --list-all</h3>
              <ul className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-portfolio-teal mr-2">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="relative group">
            <div className="relative rounded-md overflow-hidden border-2 border-portfolio-teal w-full max-w-[300px] mx-auto">
              <div className="absolute inset-0 bg-portfolio-teal opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              <img
                src="https://raw.githubusercontent.com/Ricky-Hacker001/ricky/main/src/components/Ricky.png"
                alt="Ricky Portrait"
                className="w-full grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-portfolio-teal p-2 font-fira-code text-xs">
                <p>ID: RSE-2022-CBE</p>
                <p>ACCESS LEVEL: ADMIN</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 border-2 border-portfolio-teal h-full w-full rounded-md -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
