
import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-10 lg:px-24 bg-portfolio-navy">
      <div className="container mx-auto max-w-2xl text-center">
        <p className="font-fira-code text-portfolio-teal mb-4">05. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-portfolio-lightest-slate mb-6">Get In Touch</h2>
        <p className="text-portfolio-slate mb-10 text-lg">
          I'm currently looking for opportunities to apply my skills and knowledge. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a 
            href="mailto:ricky.nuetrex@gmail.com" 
            className="flex items-center gap-2 text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
          >
            <Mail size={20} />
            <span>ricky.nuetrex@gmail.com</span>
          </a>
          
          <a 
            href="tel:+917418922390" 
            className="flex items-center gap-2 text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
          >
            <Phone size={20} />
            <span>+91 7418922390</span>
          </a>
        </div>
        
        <a 
          href="mailto:ricky.nuetrex@gmail.com"
          className="border border-portfolio-teal text-portfolio-teal px-8 py-4 rounded hover:bg-portfolio-teal-tint inline-block transition-colors duration-300 font-fira-code"
        >
          Say Hello
        </a>
        
        <div className="mt-16 flex justify-center gap-8">
          <a 
            href="https://linkedin.com/in/ricky" 
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>
          
          <a 
            href="https://github.com/ricky" 
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;