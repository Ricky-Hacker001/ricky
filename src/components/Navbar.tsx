
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-10 py-4',
        isScrolled
          ? 'bg-portfolio-navy/90 backdrop-blur shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-portfolio-teal font-fira-code text-2xl font-bold">
          R<span className="text-portfolio-lightest-slate">icky</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <ol className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.index}>
                <a href={item.href} className="nav-link relative p-1">
                  <span className="nav-number">0{item.index}.</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href="https://drive.google.com/file/d/12kSjN5ePQt3zN58d2ZflkjIDVaV560HW/view?usp=sharing"
            className="border border-portfolio-teal text-portfolio-teal px-4 py-2 rounded hover:bg-portfolio-teal-tint transition-colors duration-300"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-portfolio-lightest-slate focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <nav className="flex flex-col items-center space-y-6">
          <ol className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <li key={item.index}>
                <a
                  href={item.href}
                  className="text-portfolio-lightest-slate text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-portfolio-teal font-fira-code">0{item.index}.</span>
                  <span className="ml-2">{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            className="mt-8 border border-portfolio-teal text-portfolio-teal px-6 py-3 rounded hover:bg-portfolio-teal-tint transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resume
          </a>
        </nav>
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
