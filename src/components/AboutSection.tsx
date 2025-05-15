
import React from 'react';

const AboutSection = () => {
  const skills = [
    "Python", "JavaScript", "HTML5", "CSS3", "PHP",
    "Cybersecurity", "Ethical Hacking", "Vulnerability Assessment",
    "Arduino", "Raspberry Pi", "RFID Systems",
    "Networking Protocols", "SQL", "Git"
  ];

  return (
    <section id="about" className="py-20 px-6 md:px-10 lg:px-24">
      <div className="container mx-auto">
        <h2 className="section-heading">About Me</h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4 text-lg">
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
            
            <p>
              Here are a few technologies I've been working with recently:
            </p>
            
            <ul className="grid grid-cols-2 gap-2 mt-4">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-portfolio-teal mr-2">▹</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative group">
            <div className="relative rounded-md overflow-hidden border-2 border-portfolio-teal w-full max-w-[300px] mx-auto">
              <div className="absolute inset-0 bg-portfolio-teal opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
                alt="Ricky Portrait"
                className="w-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 border-2 border-portfolio-teal h-full w-full rounded-md -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
