
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

type NavItem = {
  index: number;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { index: 1, label: 'About', href: '#about' },
  { index: 2, label: 'Experience', href: '#experience' },
  { index: 3, label: 'Projects', href: '#projects' },
  { index: 4, label: 'Education', href: '#education' },
  { index: 5, label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      
      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-10 py-4',
        isScrolled
          ? 'bg-portfolio-navy/90 backdrop-blur shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-portfolio-teal font-fira-code text-xl md:text-2xl font-bold cyber-border p-1">
          R<span className="text-portfolio-lightest-slate">icky</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <ol className="flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <li key={item.index}>
                <a 
                  href={item.href} 
                  className={cn(
                    "nav-link relative p-1",
                    activeSection === item.href.substring(1) && "text-portfolio-teal"
                  )}
                >
                  <span className="nav-number text-scramble" data-text={`0${item.index}.`}>0{item.index}.</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            className="cyber-button px-4 py-2 rounded text-sm hover:text-portfolio-lightest-slate"
            aria-label="View Resume"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-portfolio-lightest-slate focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-screen w-3/4 bg-portfolio-light-navy z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="absolute top-4 right-6">
          <button
            className="text-portfolio-lightest-slate focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-6">
          <ol className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <li key={item.index} className="overflow-hidden">
                <a
                  href={item.href}
                  className="text-portfolio-lightest-slate text-lg typing-animation"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  <span className="text-portfolio-teal font-fira-code">0{item.index}.</span>
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            className="mt-8 cyber-button px-8 py-3 rounded text-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="View Resume"
          >
            Resume
          </a>
        </nav>
        
        {/* Mobile menu flair */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="text-xs font-fira-code text-portfolio-teal opacity-70 typing-animation">
            {'> system access granted_'}
          </div>
        </div>
      </div>
      
      {/* Dark overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-portfolio-navy-shadow z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;