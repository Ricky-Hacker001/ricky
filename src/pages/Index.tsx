
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = "Ricky - Cybersecurity & IoT Portfolio";
    
    // Create matrix canvas
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.zIndex = '-1';
    matrixCanvas.style.opacity = '0.07'; // Very subtle effect
    document.body.appendChild(matrixCanvas);

    const matrixContext = matrixCanvas.getContext('2d');
    const fontSize = 12;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * matrixCanvas.height);
    }

    // Create packet animation canvas
    const packetCanvas = document.createElement('canvas');
    packetCanvas.width = window.innerWidth;
    packetCanvas.height = window.innerHeight;
    packetCanvas.style.position = 'fixed';
    packetCanvas.style.top = '0';
    packetCanvas.style.left = '0';
    packetCanvas.style.zIndex = '-2';
    packetCanvas.style.opacity = '0.15';
    document.body.appendChild(packetCanvas);

    const packetContext = packetCanvas.getContext('2d');

    // Network point class to simulate network nodes
    class NetworkPoint {
      x: number;
      y: number;
      radius: number;
      connections: NetworkPoint[];
      pulses: { x: number; y: number; radius: number; alpha: number; }[];
      
      constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.connections = [];
        this.pulses = [];
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 255, 218, 0.3)';
        ctx.fill();
        
        // Draw connections
        this.connections.forEach(point => {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = 'rgba(100, 255, 218, 0.1)';
          ctx.stroke();
        });
        
        // Draw and update pulses
        this.pulses = this.pulses.filter(pulse => {
          // Update pulse size and alpha
          pulse.radius += 0.5;
          pulse.alpha -= 0.01;
          
          if (pulse.alpha <= 0) return false;
          
          // Draw pulse
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(100, 255, 218, ${pulse.alpha})`;
          ctx.stroke();
          
          return true;
        });
      }
      
      addPulse() {
        if (Math.random() > 0.98) {
          this.pulses.push({
            x: this.x,
            y: this.y,
            radius: this.radius,
            alpha: 0.3
          });
        }
      }
    }

    // Create network points
    const networkPoints: NetworkPoint[] = [];
    const numPoints = Math.floor(window.innerWidth / 150); // Adjust based on screen size
    
    for (let i = 0; i < numPoints; i++) {
      networkPoints.push(new NetworkPoint(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        1 + Math.random() * 2
      ));
    }
    
    // Create connections between points
    networkPoints.forEach(point => {
      const numConnections = 1 + Math.floor(Math.random() * 3);
      let connectedPoints: NetworkPoint[] = [...networkPoints]
        .filter(p => p !== point)
        .sort(() => Math.random() - 0.5)
        .slice(0, numConnections);
      
      point.connections = connectedPoints;
    });

    // Matrix animation function
    const matrix = () => {
      if (!matrixContext) return;
      
      matrixContext.fillStyle = 'rgba(10, 25, 47, 0.05)';
      matrixContext.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      matrixContext.font = `${fontSize}px monospace`;
      matrixContext.fillStyle = '#64ffda';
      
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        matrixContext.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    // Network packet animation function
    const networkAnim = () => {
      if (!packetContext) return;
      
      packetContext.clearRect(0, 0, packetCanvas.width, packetCanvas.height);
      
      // Draw and update network points
      networkPoints.forEach(point => {
        point.draw(packetContext);
        point.addPulse();
      });
    };

    const matrixInterval = setInterval(matrix, 50);
    const networkInterval = setInterval(networkAnim, 50);

    // Handle window resize
    const resizeHandler = () => {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      
      packetCanvas.width = window.innerWidth;
      packetCanvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeHandler);

    // Cleanup function
    return () => {
      clearInterval(matrixInterval);
      clearInterval(networkInterval);
      window.removeEventListener('resize', resizeHandler);
      document.body.removeChild(matrixCanvas);
      document.body.removeChild(packetCanvas);
    };
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-navy text-portfolio-slate">
      <Navbar />
      <main className="hacker-theme">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
