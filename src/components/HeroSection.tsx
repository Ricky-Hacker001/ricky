
import React from 'react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6 md:px-10 lg:px-24">
      <div className="container mx-auto animate-fade-in-down [animation-delay:200ms] opacity-0">
        <p className="font-fira-code text-portfolio-teal mb-5 text-lg">Hi, my name is</p>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:400ms] opacity-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-portfolio-lightest-slate mb-4">
          Ricky.
        </h1>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:600ms] opacity-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-slate mb-6">
          I build secure digital solutions.
        </h2>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:800ms] opacity-0">
        <p className="text-portfolio-slate max-w-lg mb-12 text-lg">
          I'm a multidisciplinary engineering student specializing in 
          <span className="text-portfolio-teal"> Cybersecurity</span>,
          <span className="text-portfolio-teal"> IoT Development</span>,
          <span className="text-portfolio-teal"> Network Engineering</span>, and
          <span className="text-portfolio-teal"> Full-Stack Web Development</span>.
          Currently, I'm focused on building secure, scalable systems while completing my 
          Bachelor of Technology at Christ University.
        </p>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:1000ms] opacity-0">
        <a 
          href="#projects" 
          className="border border-portfolio-teal text-portfolio-teal px-8 py-4 rounded hover:bg-portfolio-teal-tint inline-block transition-colors duration-300 font-fira-code"
        >
          Check out my projects!
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
