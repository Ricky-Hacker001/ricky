
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Terminal from './Terminal';
import { Wifi, Server, Router, Zap, Database, Shield, Lock, NetworkIcon, Bug, Globe, Satellite, FileCode, Key } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Simulate IoT device data
interface IoTDevice {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'warning';
  type: string;
  lastSeen: string;
  icon: LucideIcon;
}

const HeroSection = () => {
  const [networkActivity, setNetworkActivity] = useState<number>(0);
  const [securityLevel, setSecurityLevel] = useState<number>(78);
  const [activeDevices, setActiveDevices] = useState<IoTDevice[]>([
    { id: 1, name: "Smart Hub", status: "online", type: "Controller", lastSeen: "Now", icon: Router },
    { id: 2, name: "Security Cam", status: "online", type: "Camera", lastSeen: "2m ago", icon: Shield },
    { id: 3, name: "Thermostat", status: "online", type: "Climate", lastSeen: "5m ago", icon: Zap },
    { id: 4, name: "Database", status: "warning", type: "Storage", lastSeen: "1m ago", icon: Database },
    { id: 5, name: "Network", status: "offline", type: "Gateway", lastSeen: "15m ago", icon: Wifi },
    { id: 6, name: "Encryption", status: "online", type: "Security", lastSeen: "3m ago", icon: Lock },
    { id: 7, name: "Satellite", status: "warning", type: "Comms", lastSeen: "8m ago", icon: Satellite },
    { id: 8, name: "Firewall", status: "online", type: "Security", lastSeen: "1m ago", icon: Shield },
  ]);
  const [intrusionAttempts, setIntrusionAttempts] = useState<number>(0);
  const [loadingPhase, setLoadingPhase] = useState<number>(0);

  // Simulate network activity and security metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkActivity(Math.floor(Math.random() * 100));
      setSecurityLevel(70 + Math.floor(Math.random() * 20));
      
      // Randomly update device statuses
      setActiveDevices(devices => 
        devices.map(device => {
          if (Math.random() > 0.8) {
            const statuses: ('online' | 'offline' | 'warning')[] = ['online', 'offline', 'warning'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const timeValues = ["Now", "1m ago", "2m ago", "5m ago", "10m ago"];
            const randomTime = timeValues[Math.floor(Math.random() * timeValues.length)];
            
            return { ...device, status: randomStatus, lastSeen: randomTime };
          }
          return device;
        })
      );

      // Randomly increment intrusion attempts
      if (Math.random() > 0.85) {
        setIntrusionAttempts(prev => prev + 1);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Loading sequence effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingPhase < 3) {
        setLoadingPhase(prev => prev + 1);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [loadingPhase]);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-4 sm:px-6 md:px-10 lg:px-24">
      <div className="container mx-auto animate-fade-in-down [animation-delay:200ms] opacity-0">
        <p className="font-fira-code text-portfolio-teal mb-5 text-base sm:text-lg typing-animation">
          <span className="inline-block blinking-cursor">$</span> ./initialize_portfolio.sh
        </p>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:400ms] opacity-0">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-portfolio-lightest-slate mb-4 glitch-text">
          Ricky<span className="text-portfolio-teal">.</span>
        </h1>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:600ms] opacity-0">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-portfolio-slate mb-6">
          I build <span className="hacker-gradient-text">secure digital solutions</span>.
        </h2>
      </div>
      <div className="container mx-auto animate-fade-in-down [animation-delay:800ms] opacity-0">
        <p className="text-portfolio-slate max-w-xl mb-8 text-base sm:text-lg">
          I'm a multidisciplinary engineering student specializing in 
          <span className="text-portfolio-teal"> Cybersecurity</span>,
          <span className="text-portfolio-teal"> IoT Development</span>,
          <span className="text-portfolio-teal"> Network Engineering</span>, and
          <span className="text-portfolio-teal"> Full-Stack Web Development</span>.
          Currently, I'm focused on building secure, scalable systems while completing my 
          Bachelor of Technology at Christ University.
        </p>
      </div>
      
      {/* Security Status Dashboard */}
      <div className="container mx-auto animate-fade-in-down [animation-delay:850ms] opacity-0 mb-4">
        <div className="bg-portfolio-lightest-navy bg-opacity-50 border border-portfolio-teal/30 rounded-md p-4 device-scan">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
            <h3 className="text-portfolio-teal font-fira-code text-sm matrix-text">// Security Status</h3>
            <div className="flex items-center w-full sm:w-auto">
              <span className="text-xs text-portfolio-slate mr-2">Security Level:</span>
              <div className="h-2 w-full sm:w-24 bg-portfolio-light-navy rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-500",
                    securityLevel > 85 ? "bg-green-500" : 
                    securityLevel > 70 ? "bg-yellow-500" : "bg-red-500"
                  )}
                  style={{ width: `${securityLevel}%` }}
                ></div>
              </div>
              <span className="text-xs text-portfolio-slate ml-2">{securityLevel}%</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="border border-red-500/30 text-red-500 text-xs px-2 py-1 rounded flex items-center gap-1 cyber-border">
              <Bug size={12} className="animate-pulse" />
              <span>Intrusion attempts: {intrusionAttempts}</span>
            </div>
            <div className="border border-green-500/30 text-green-500 text-xs px-2 py-1 rounded flex items-center gap-1 cyber-border">
              <Lock size={12} />
              <div>
                <span>Encryption: </span>
                <span className="relative">
                  Active
                  <span className="absolute -right-3 -top-1 security-pulse"></span>
                </span>
              </div>
            </div>
            <div className="border border-yellow-500/30 text-yellow-500 text-xs px-2 py-1 rounded flex items-center gap-1 cyber-border">
              <Shield size={12} />
              <span>Firewall: Monitoring</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* IoT Network Status Dashboard */}
      <div className="container mx-auto animate-fade-in-down [animation-delay:900ms] opacity-0 mb-8">
        <div className="bg-portfolio-lightest-navy bg-opacity-50 border border-portfolio-teal/30 rounded-md p-4 scan-line">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
            <h3 className="text-portfolio-teal font-fira-code text-sm matrix-text">// Network Status Dashboard</h3>
            <div className="flex items-center w-full sm:w-auto">
              <span className="text-xs text-portfolio-slate mr-2">Network Activity:</span>
              <div className="h-2 w-full sm:w-24 bg-portfolio-light-navy rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-500",
                    networkActivity > 70 ? "bg-red-500" : 
                    networkActivity > 30 ? "bg-yellow-500" : "bg-green-500"
                  )}
                  style={{ width: `${networkActivity}%` }}
                ></div>
              </div>
              <span className="text-xs text-portfolio-slate ml-2">{networkActivity}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {activeDevices.map(device => (
              <div 
                key={device.id} 
                className={cn(
                  "border rounded-md p-2 flex items-center gap-2 transition-colors grid-item-hover float",
                  device.status === 'online' ? "border-green-500/30 text-green-500" : 
                  device.status === 'warning' ? "border-yellow-500/30 text-yellow-500" : 
                  "border-red-500/30 text-red-500"
                )}
                style={{animationDelay: `${device.id * 0.1}s`}}
              >
                <device.icon size={16} className="flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold truncate text-portfolio-lightest-slate">{device.name}</p>
                  <p className="text-xs opacity-70 truncate">{device.lastSeen}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto animate-fade-in-down [animation-delay:1000ms] opacity-0 mb-6">
        <Terminal />
      </div>
      
      <div className="container mx-auto animate-fade-in-down [animation-delay:1200ms] opacity-0">
        <div className="flex flex-wrap gap-2 justify-start text-xs text-portfolio-slate font-fira-code mb-2">
          <div className="flex items-center typing-animation" style={{animationDelay: '0.3s'}}>
            <span className="text-portfolio-teal opacity-70">$</span>
            <span className="ml-1">Type</span>
          </div>
          <code className="bg-portfolio-lightest-navy px-2 py-1 rounded text-portfolio-teal matrix-text">"netscan"</code>
          <span>to scan the network</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-start text-xs text-portfolio-slate font-fira-code mb-2">
          <div className="flex items-center typing-animation" style={{animationDelay: '0.6s'}}>
            <span className="text-portfolio-teal opacity-70">$</span>
            <span className="ml-1">Type</span>
          </div>
          <code className="bg-portfolio-lightest-navy px-2 py-1 rounded text-portfolio-teal matrix-text">"iotcontrol"</code>
          <span>to manage IoT devices</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-start text-xs text-portfolio-slate font-fira-code">
          <div className="flex items-center typing-animation" style={{animationDelay: '0.9s'}}>
            <span className="text-portfolio-teal opacity-70">$</span>
            <span className="ml-1">Type</span>
          </div>
          <code className="bg-portfolio-lightest-navy px-2 py-1 rounded text-portfolio-teal matrix-text">"help"</code>
          <span>to see all available commands</span>
        </div>
      </div>

      {/* System Loading Indicator */}
      <div className="fixed bottom-4 left-4 text-xs font-fira-code text-portfolio-teal">
        <div className="flex items-center">
          <span className="mr-2 blinking-cursor">$</span>
          <span className="matrix-text">
            {loadingPhase >= 1 ? "System initialized..." : "Initializing system..."}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 blinking-cursor">$</span>
          <span className="matrix-text">
            {loadingPhase >= 2 ? "Security protocols active..." : "Loading security protocols..."}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 blinking-cursor">$</span>
          <span className="matrix-text">
            {loadingPhase >= 3 ? "Portfolio access granted." : "Authorizing portfolio access..."}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;