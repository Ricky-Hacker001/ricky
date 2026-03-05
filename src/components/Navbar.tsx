import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type NavItem = {
  index: number;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { index: 1, label: "About", href: "#about" },
  { index: 2, label: "Experience", href: "#experience" },
  { index: 3, label: "Projects", href: "#projects" },
  { index: 4, label: "Education", href: "#education" },
  { index: 5, label: "Blog", href: "/blog" },
  { index: 6, label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll detection for active section
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      const sections = navItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.substring(1));

      const currentSection = sections.find((section) => {
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Handle navigation from blog page → home sections
  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(href.substring(1))
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document
          .getElementById(href.substring(1))
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-10 py-4",
        isScrolled
          ? "bg-portfolio-navy/90 backdrop-blur shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-portfolio-teal font-fira-code text-xl md:text-2xl font-bold cyber-border p-1"
        >
          R<span className="text-portfolio-lightest-slate">icky</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <ol className="flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <li key={item.index}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "nav-link relative p-1",
                    activeSection === item.href.substring(1) &&
                      "text-portfolio-teal"
                  )}
                >
                  <span
                    className="nav-number text-scramble"
                    data-text={`0${item.index}.`}
                  >
                    0{item.index}.
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>

          {/* Resume Button */}
          <a
            href="https://raw.githubusercontent.com/Ricky-Hacker001/ricky/main/src/components/Ricky_Resume.pdf"
            className="cyber-button px-4 py-2 rounded text-sm hover:text-portfolio-lightest-slate"
            aria-label="View Resume"
            target="_blank"
            rel="noopener noreferrer"
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
          "fixed top-0 right-0 h-screen w-3/4 bg-portfolio-light-navy z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center justify-center",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="absolute top-4 right-6">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-6">
          <ol className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <li key={item.index}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="text-portfolio-lightest-slate text-lg typing-animation"
                >
                  <span className="text-portfolio-teal font-fira-code">
                    0{item.index}.
                  </span>
                  <span className="ml-2">{item.label}</span>
                </button>
              </li>
            ))}
          </ol>

          <a
            href="https://raw.githubusercontent.com/Ricky-Hacker001/ricky/main/src/components/Ricky_Resume.pdf"
            className="mt-8 cyber-button px-8 py-3 rounded text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>

        {/* Mobile flair */}
        <div className="absolute bottom-10 text-xs font-fira-code text-portfolio-teal opacity-70">
          {"> system access granted_"}
        </div>
      </div>

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