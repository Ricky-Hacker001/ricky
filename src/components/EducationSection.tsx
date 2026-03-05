import React from 'react';
import { School, Award, Shield, Terminal, Server, Code, Lock, Bug, Database } from 'lucide-react';

const EducationSection = () => {
  return (
    <section id="education" className="py-20 px-6 md:px-10 lg:px-24 bg-portfolio-navy">
      <div className="container mx-auto">
        <h2 className="section-heading">Education & Achievements</h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-portfolio-teal"></div>
              <h3 className="text-xl font-semibold text-portfolio-lightest-slate">Education</h3>
            </div>
            
            <div className="relative bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <School size={80} className="text-portfolio-teal" />
              </div>
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="bg-portfolio-teal-tint p-3 rounded-full">
                  <School size={24} className="text-portfolio-teal" />
                </div>
                <div>
                  <h4 className="text-portfolio-lightest-slate text-lg font-medium">Bachelor of Technology in Computer Science and Engineering</h4>
                  <p className="text-portfolio-slate">Christ (Deemed to be University), Bangalore</p>
                </div>
              </div>
              <div className="font-fira-code mb-3">
                <p className="text-portfolio-teal">$ date --education-period</p>
                <p className="text-portfolio-slate ml-4">2022 - Present</p>
              </div>
              <div className="font-fira-code">
                <p className="text-portfolio-teal">$ cat /etc/courses/focus</p>
                <p className="text-portfolio-slate ml-4">Cybersecurity, IoT, Network Engineering</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-10 mb-4">
              <div className="h-8 w-1 bg-portfolio-teal"></div>
              <h3 className="text-xl font-semibold text-portfolio-lightest-slate">Certifications</h3>
            </div>
            
            <div className="bg-portfolio-light-navy bg-opacity-60 p-4 rounded-lg border border-portfolio-lightest-navy">
              <div className="font-fira-code mb-4">
                <p className="text-portfolio-teal">$ ls -la ~/certifications/</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="text-portfolio-teal mr-3 group-hover:animate-pulse"><Shield size={18} /></div>
                  <div>
                    <p className="text-portfolio-lightest-slate font-medium">Networking Protocols Basics - CISCO</p>
                    <p className="text-xs text-portfolio-slate">Learned TCP/IP fundamentals, routing, switching concepts</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="text-portfolio-teal mr-3 group-hover:animate-pulse"><Lock size={18} /></div>
                  <div>
                    <p className="text-portfolio-lightest-slate font-medium">Introduction to Cybersecurity - CISCO</p>
                    <p className="text-xs text-portfolio-slate">Security principles, threat mitigation, network defense</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="text-portfolio-teal mr-3 group-hover:animate-pulse"><Bug size={18} /></div>
                  <div>
                    <p className="text-portfolio-lightest-slate font-medium">Basic Ethical Hacking - My Captain</p>
                    <p className="text-xs text-portfolio-slate">Penetration testing, vulnerability assessment</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="text-portfolio-teal mr-3 group-hover:animate-pulse"><Terminal size={18} /></div>
                  <div>
                    <p className="text-portfolio-lightest-slate font-medium">Introduction to IoT and Digital Transformation</p>
                    <p className="text-xs text-portfolio-slate">Smart device development, sensor integration</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="text-portfolio-teal mr-3 group-hover:animate-pulse"><Server size={18} /></div>
                  <div>
                    <p className="text-portfolio-lightest-slate font-medium">Introduction to DevOps - Great Learning</p>
                    <p className="text-xs text-portfolio-slate">CI/CD pipelines, infrastructure automation</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="text-portfolio-teal mr-3 group-hover:animate-pulse"><Database size={18} /></div>
                  <div>
                    <p className="text-portfolio-lightest-slate font-medium">SQL and Database Bootcamp - Udemy</p>
                    <p className="text-xs text-portfolio-slate">Database security, query optimization, NoSQL</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 bg-portfolio-teal"></div>
              <h3 className="text-xl font-semibold text-portfolio-lightest-slate">Achievements</h3>
            </div>
            
            <div className="space-y-6">
              <div className="group bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy hover:border-portfolio-teal transition-colors duration-300">
  <div className="flex items-center gap-4 mb-4">
    <div className="bg-portfolio-teal-tint p-3 rounded-full group-hover:animate-pulse">
      <Bug size={24} className="text-portfolio-teal" />
    </div>

    <div className="font-fira-code">
      <h4 className="text-portfolio-lightest-slate text-lg font-medium">
        Security Vulnerability Discovery <span className="text-portfolio-teal">|</span> Responsible Disclosure
      </h4>
      <p className="text-xs text-portfolio-slate mt-1">$ domain: cybersecurity-research</p>
    </div>
  </div>

  <p className="text-portfolio-slate">
    Identified and responsibly disclosed a misconfigured 
    <span className="text-portfolio-teal"> DMARC policy</span> vulnerability that could allow 
    <span className="text-portfolio-teal"> email spoofing attacks</span>, improving organizational email security.
  </p>

  <p className="text-portfolio-slate mt-2">
    Discovered a <span className="text-portfolio-teal">PII exposure vulnerability</span> on a university portal using 
    <span className="text-portfolio-teal"> Google Dorking techniques</span> and reported it responsibly to enhance data protection.
  </p>

  <div className="mt-2">
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">DMARC</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Email Security</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Google Dorking</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mb-2">PII Protection</span>
  </div>
</div>
              <div className="group bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy hover:border-portfolio-teal transition-colors duration-300">
  <div className="flex items-center gap-4 mb-4">
    <div className="bg-portfolio-teal-tint p-3 rounded-full group-hover:animate-pulse">
      <Shield size={24} className="text-portfolio-teal" />
    </div>

    <div className="font-fira-code">
      <h4 className="text-portfolio-lightest-slate text-lg font-medium">
        Copyright Granted <span className="text-portfolio-teal">|</span> Cybersecurity Toolkit
      </h4>
      <p className="text-xs text-portfolio-slate mt-1">$ date: 2025</p>
    </div>
  </div>

  <p className="text-portfolio-slate">
    Received official <span className="text-portfolio-teal">copyright protection</span> for a 
    <span className="text-portfolio-teal"> blockchain-based cybersecurity toolkit</span> designed for 
    offensive security testing, defensive monitoring, and tamper-proof secure logging.
  </p>

  <div className="mt-2">
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Blockchain</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Cybersecurity</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Secure Logging</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mb-2">Security Toolkit</span>
  </div>
</div>
              <div className="group bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy hover:border-portfolio-teal transition-colors duration-300">
  <div className="flex items-center gap-4 mb-4">
    <div className="bg-portfolio-teal-tint p-3 rounded-full group-hover:animate-pulse">
      <Award size={24} className="text-portfolio-teal" />
    </div>
    <div className="font-fira-code">
      <h4 className="text-portfolio-lightest-slate text-lg font-medium">
        1st Place <span className="text-portfolio-teal">|</span> Hack with GDG Season-03
      </h4>
      <p className="text-xs text-portfolio-slate mt-1">$ date: 2025-09</p>
    </div>
  </div>

  <p className="text-portfolio-slate">
    My team <span className="text-portfolio-teal">NuetreX.io</span> secured 
    <span className="text-portfolio-teal"> 1st Place in the Requestly Track</span> at 
    Hack with GDG Season-03 hosted by GDG KSRCE. We built and refined our solution 
    during an intense 36-hour hackathon and won the <span className="text-portfolio-teal">$100 prize</span>.
  </p>

  <p className="text-xs text-portfolio-slate mt-2">
    Team: PrabhaVathi S, Dharmeswaran, Suriyan TR
  </p>

  <div className="mt-2">
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Web Security</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Web Development</span>
    <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mb-2">Requestly</span>
  </div>
</div>
              <div className="group bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy hover:border-portfolio-teal transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full group-hover:animate-pulse">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <div className="font-fira-code">
                    <h4 className="text-portfolio-lightest-slate text-lg font-medium">1st Place <span className="text-portfolio-teal">|</span> IoT Hackathon</h4>
                    <p className="text-xs text-portfolio-slate mt-1">$ date: 2025-03</p>
                  </div>
                </div>
                <p className="text-portfolio-slate">
                  Ranked among 10+ teams, delivering innovative IoT based real-world solutions for home automation and security.
                </p>
                <div className="mt-2">
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Security Systems</span>
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Arduino</span>
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mb-2">Raspberry Pi</span>
                </div>
              </div>
              
              <div className="group bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy hover:border-portfolio-teal transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full group-hover:animate-pulse">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <div className="font-fira-code">
                    <h4 className="text-portfolio-lightest-slate text-lg font-medium">1st Place <span className="text-portfolio-teal">|</span> GenAI hackathon</h4>
                    <p className="text-xs text-portfolio-slate mt-1">$ date: 2025-04</p>
                  </div>
                </div>
                <p className="text-portfolio-slate">
                  K.S.R College of Engineering - Created an AI-powered cybersecurity threat detection system.
                </p>
                <div className="mt-2">
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">AI/ML</span>
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Python</span>
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mb-2">TensorFlow</span>
                </div>
              </div>
              
              <div className="group bg-portfolio-light-navy p-6 rounded-lg border border-portfolio-lightest-navy hover:border-portfolio-teal transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-portfolio-teal-tint p-3 rounded-full group-hover:animate-pulse">
                    <Award size={24} className="text-portfolio-teal" />
                  </div>
                  <div className="font-fira-code">
                    <h4 className="text-portfolio-lightest-slate text-lg font-medium">4th Place <span className="text-portfolio-teal">|</span> Smart India Hackathon</h4>
                    <p className="text-xs text-portfolio-slate mt-1">$ date: 2024-10</p>
                  </div>
                </div>
                <p className="text-portfolio-slate">
                  Ranked among 40+ teams, delivering innovative real-world solutions for municipal waste management.
                </p>
                <div className="mt-2">
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">IoT</span>
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mr-2 mb-2">Web Development</span>
                  <span className="inline-block bg-portfolio-navy px-2 py-1 rounded text-xs text-portfolio-teal mb-2">Data Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;