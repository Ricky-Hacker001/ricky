
import React from 'react';
import { School, Award } from 'lucide-react';

const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-6 md:px-10 lg:px-24 bg-portfolio-navy">
      <div className="container mx-auto">
        <h2 className="section-heading">Education & Achievements</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-portfolio-lightest-slate mb-6">Education</h3>
            
            <div className="bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-portfolio-teal-tint p-3 rounded-full">
                  <School size={24} className="text-portfolio-teal" />
                </div>
                <div>
                  <h4 className="text-portfolio-lightest-slate text-lg font-medium">Bachelor of Technology in Computer Science and Engineering</h4>
                  <p className="text-portfolio-slate">Christ (Deemed to be University), Bangalore</p>
                </div>
              </div>
              <p className="text-portfolio-teal font-fira-code">2022 - Present</p>
            </div>
            
            <h3 className="text-xl font-semibold text-portfolio-lightest-slate mt-10 mb-6">Certifications</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-portfolio-teal mr-2">▹</span>
                Networking Protocols Basics - CISCO
              </li>
              <li className="flex items-start">
                <span className="text-portfolio-teal mr-2">▹</span>
                Introduction to Cybersecurity - CISCO
              </li>
              <li className="flex items-start">
                <span className="text-portfolio-teal mr-2">▹</span>
                Basic Ethical Hacking - My Captain
              </li>
              <li className="flex items-start">
                <span className="text-portfolio-teal mr-2">▹</span>
                Introduction to IoT and Digital Transformation
              </li>
              <li className="flex items-start">
                <span className="text-portfolio-teal mr-2">▹</span>
                Introduction to DevOps - Great Learning
              </li>
              <li className="flex items-start">
                <span className="text-portfolio-teal mr-2">▹</span>
                SQL and Database Bootcamp - Udemy
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-portfolio-lightest-slate mb-6">Achievements</h3>
            
            <div className="space-y-6">
              <div className="bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <h4 className="text-portfolio-lightest-slate text-lg font-medium">1st Place, IoT Hackathon</h4>
                </div>
                <p className="text-portfolio-slate">
                  Ranked among 10+ teams, delivering innovative IoT based real-world solutions.
                </p>
              </div>
              
              <div className="bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <h4 className="text-portfolio-lightest-slate text-lg font-medium">1st Place, GenAI hackathon</h4>
                </div>
                <p className="text-portfolio-slate">
                  K.S.R College of Engineering
                </p>
              </div>
              
              <div className="bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <h4 className="text-portfolio-lightest-slate text-lg font-medium">4th Place, Smart India Hackathon</h4>
                </div>
                <p className="text-portfolio-slate">
                  Ranked among 40+ teams, delivering innovative real-world solutions.
                </p>
              </div>
              
              <div className="bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <h4 className="text-portfolio-lightest-slate text-lg font-medium">Hackathon Participant</h4>
                </div>
                <p className="text-portfolio-slate">
                  Competed in various hackathons, demonstrating problem-solving and coding skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;