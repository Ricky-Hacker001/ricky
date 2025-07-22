
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Download, FileText, Code, Wifi, Database, Server, Globe, Shield, Bug, Router, Zap, Satellite, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface Command {
  command: string;
  description: string;
  action: () => void;
}

interface NetworkDevice {
  ip: string;
  mac: string;
  name: string;
  type: string;
  status: string;
}

interface PortScanResult {
  port: number;
  service: string;
  status: string;
}

const Terminal = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Ricky\'s Terminal Portfolio v1.0.0',
    'Type "help" to see available commands',
    '> '
  ]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for network simulation
  const networkDevices: NetworkDevice[] = [
    { ip: '192.168.1.1', mac: '00:1A:2B:3C:4D:5E', name: 'Gateway Router', type: 'Router', status: 'Online' },
    { ip: '192.168.1.2', mac: 'F1:E2:D3:C4:B5:A6', name: 'Ricky-Laptop', type: 'Computer', status: 'Active' },
    { ip: '192.168.1.3', mac: '11:22:33:44:55:66', name: 'Smart-Thermostat', type: 'IoT Device', status: 'Online' },
    { ip: '192.168.1.4', mac: 'AA:BB:CC:DD:EE:FF', name: 'Security-Camera', type: 'IoT Device', status: 'Online' },
    { ip: '192.168.1.5', mac: '12:34:56:78:9A:BC', name: 'Smart-Light', type: 'IoT Device', status: 'Offline' },
  ];

  const portScanResults: PortScanResult[] = [
    { port: 22, service: 'SSH', status: 'Open' },
    { port: 80, service: 'HTTP', status: 'Open' },
    { port: 443, service: 'HTTPS', status: 'Open' },
    { port: 21, service: 'FTP', status: 'Closed' },
    { port: 3389, service: 'RDP', status: 'Filtered' }
  ];

  const commands: Command[] = [
    {
      command: 'help',
      description: 'Show available commands',
      action: () => {
        addToHistory('Available commands:');
        commands.forEach((cmd) => {
          addToHistory(`  ${cmd.command} - ${cmd.description}`);
        });
      },
    },
    {
      command: 'clear',
      description: 'Clear terminal',
      action: () => {
        setHistory(['> ']);
      },
    },
    {
      command: 'about',
      description: 'Show information about Ricky',
      action: () => {
        addToHistory([
          'Ricky - Multidisciplinary Engineering Student',
          'Specializing in Cybersecurity, IoT Development, Network Engineering, and Full-Stack Web Development',
          'Currently completing Bachelor of Technology at Christ University, Bangalore',
          ''
        ]);
      },
    },
    {
      command: 'skills',
      description: 'List technical skills',
      action: () => {
        addToHistory([
          'Technical Skills:',
          '- Programming: Python (Intermediate), JavaScript (Basic), HTML5, CSS3, PHP (Basic)',
          '- Cybersecurity: Ethical Hacking, Vulnerability Assessment, Burp Suite',
          '- IoT & Embedded: Arduino, Raspberry Pi, RFID Systems',
          '- Networking: Protocols, Secure Communication, Web Servers',
          '- Databases: SQL',
          '- Tools: Burp Suite, Git, VS Code, Web Hosting',
          ''
        ]);
      },
    },
    {
      command: 'projects',
      description: 'View major projects',
      action: () => {
        addToHistory([
          'Major Projects:',
          '',
          '1. Chrisbo | Humanoid Robot',
          '   AI-powered robot for college reception assistance',
          '   Tech: Python, Raspberry Pi 4, Arduino Mega, Sensors, AI',
          '',
          '2. WiFi Monitoring Security Device',
          '   Real-time network intrusion & object detection system',
          '   Tech: Raspberry Pi 4, Python, MySQL, Telegram API, OpenCV',
          '',
          '3. HRM Portal | Full-Stack Web App',
          '   Complete HR management system with employee records & payroll',
          '   Tech: HTML, CSS, JavaScript, PHP, MySQL',
          '',
          'Type "goto projects" to navigate to projects section'
        ]);
      },
    },
    {
      command: 'contact',
      description: 'Show contact information',
      action: () => {
        addToHistory([
          'Contact Information:',
          '- Email: ricky.nuetrex@gmail.com',
          '- Phone: +91 7418922390',
          '- LinkedIn: linkedin.com/in/ricky',
          '- GitHub: github.com/ricky',
          '',
          'Type "goto contact" to navigate to contact section'
        ]);
      },
    },
    {
      command: 'resume',
      description: 'View or download resume',
      action: () => {
        addToHistory([
          'Resume Options:',
          '',
          'Type "view resume" to view online',
          'Type "download resume" to download PDF',
          ''
        ]);
      },
    },
    {
      command: 'view resume',
      description: 'View resume online',
      action: () => {
        addToHistory('Opening resume in new tab...');
        window.open('/resume.pdf', '_blank');
      },
    },
    {
      command: 'download resume',
      description: 'Download resume as PDF',
      action: () => {
        addToHistory('Downloading resume...');
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Ricky_Resume.pdf';
        link.click();
        toast({
          title: "Download Started",
          description: "Your download has started.",
        });
      },
    },
    {
      command: 'goto',
      description: 'Navigate to a section (usage: goto [section])',
      action: () => {
        addToHistory('Usage: goto [about|experience|projects|education|contact]');
      },
    },
    {
      command: 'goto about',
      description: 'Navigate to About section',
      action: () => {
        addToHistory('Navigating to About section...');
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      command: 'goto experience',
      description: 'Navigate to Experience section',
      action: () => {
        addToHistory('Navigating to Experience section...');
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      command: 'goto projects',
      description: 'Navigate to Projects section',
      action: () => {
        addToHistory('Navigating to Projects section...');
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      command: 'goto education',
      description: 'Navigate to Education section',
      action: () => {
        addToHistory('Navigating to Education section...');
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      command: 'goto contact',
      description: 'Navigate to Contact section',
      action: () => {
        addToHistory('Navigating to Contact section...');
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      command: 'hack',
      description: 'Attempt to hack the system',
      action: () => {
        addToHistory('Access denied. Nice try! 😎');
      },
    },
    // New networking commands
    {
      command: 'netscan',
      description: 'Scan local network for devices',
      action: () => {
        addToHistory('Initiating network scan...');
        setTimeout(() => {
          addToHistory('Scan complete. Found devices:');
          addToHistory('-'.repeat(70));
          addToHistory('| IP Address   | MAC Address        | Device Name       | Type       | Status  |');
          addToHistory('-'.repeat(70));
          networkDevices.forEach(device => {
            addToHistory(`| ${device.ip.padEnd(12)} | ${device.mac.padEnd(18)} | ${device.name.padEnd(18)} | ${device.type.padEnd(10)} | ${device.status.padEnd(7)} |`);
          });
          addToHistory('-'.repeat(70));
        }, 1500);
      },
    },
    {
      command: 'portscan',
      description: 'Scan ports on localhost',
      action: () => {
        addToHistory('Initiating port scan on localhost...');
        setTimeout(() => {
          addToHistory('Port scan complete:');
          addToHistory('-'.repeat(40));
          addToHistory('| Port  | Service | Status   |');
          addToHistory('-'.repeat(40));
          portScanResults.forEach(result => {
            addToHistory(`| ${result.port.toString().padEnd(6)} | ${result.service.padEnd(8)} | ${result.status.padEnd(9)} |`);
          });
          addToHistory('-'.repeat(40));
        }, 1500);
      },
    },
    {
      command: 'iotcontrol',
      description: 'Control IoT devices',
      action: () => {
        addToHistory([
          'IoT Control Panel',
          'Available devices:',
          '1. Smart-Thermostat (192.168.1.3)',
          '2. Security-Camera (192.168.1.4)',
          '3. Smart-Light (192.168.1.5) [OFFLINE]',
          '',
          'To control a device: iotcontrol [device_number] [action]',
          'Example: iotcontrol 1 status',
          'Actions: status, toggle, info'
        ]);
      },
    },
    {
      command: 'iotcontrol 1 status',
      description: 'Check Smart-Thermostat status',
      action: () => {
        addToHistory([
          'Device: Smart-Thermostat (192.168.1.3)',
          'Status: ONLINE',
          'Current Temperature: 22°C',
          'Target Temperature: 24°C',
          'Mode: Cooling'
        ]);
      },
    },
    {
      command: 'iotcontrol 2 status',
      description: 'Check Security-Camera status',
      action: () => {
        addToHistory([
          'Device: Security-Camera (192.168.1.4)',
          'Status: ONLINE',
          'Recording: Yes',
          'Motion Detection: Enabled',
          'Last Motion Detected: 5 minutes ago'
        ]);
      },
    },
    {
      command: 'iotcontrol 1 toggle',
      description: 'Toggle Smart-Thermostat',
      action: () => {
        addToHistory('Toggling Smart-Thermostat...');
        setTimeout(() => {
          addToHistory('Smart-Thermostat mode changed from Cooling to Heating');
        }, 1000);
      },
    },
    {
      command: 'iotcontrol 2 toggle',
      description: 'Toggle Security-Camera',
      action: () => {
        addToHistory('Toggling Security-Camera recording status...');
        setTimeout(() => {
          addToHistory('Security-Camera recording stopped');
        }, 1000);
      },
    },
    {
      command: 'ssh',
      description: 'Secure Shell into a system',
      action: () => {
        addToHistory('Usage: ssh [username@hostname]');
      },
    },
    {
      command: 'ssh admin@192.168.1.3',
      description: 'SSH to the Smart-Thermostat',
      action: () => {
        addToHistory('Connecting to admin@192.168.1.3...');
        setTimeout(() => {
          addToHistory('Password required. Enter "ssh-login" to simulate successful login.');
        }, 1000);
      },
    },
    {
      command: 'ssh-login',
      description: 'Simulate SSH login',
      action: () => {
        addToHistory('Login successful!');
        setActiveSession('thermostat');
        addToHistory('Connected to Smart-Thermostat. Type "exit" to disconnect.');
        addToHistory('thermostat> ');
      },
    },
    {
      command: 'exit',
      description: 'Exit current session',
      action: () => {
        if (activeSession) {
          addToHistory(`Disconnected from ${activeSession}`);
          setActiveSession(null);
        } else {
          addToHistory('No active session to exit');
        }
      },
    },
    {
      command: 'traceroute',
      description: 'Trace route to a host',
      action: () => {
        addToHistory('Usage: traceroute [hostname]');
      },
    },
    {
      command: 'traceroute github.com',
      description: 'Trace route to GitHub',
      action: () => {
        addToHistory('Tracing route to github.com [140.82.121.4]');
        setTimeout(() => {
          addToHistory('1    1 ms    1 ms    1 ms  192.168.1.1');
          setTimeout(() => {
            addToHistory('2   15 ms   12 ms   10 ms  10.10.10.1');
            setTimeout(() => {
              addToHistory('3   22 ms   20 ms   19 ms  isp-gateway.net [203.0.113.1]');
              setTimeout(() => {
                addToHistory('4   35 ms   32 ms   31 ms  core1.isp.net [203.0.113.18]');
                setTimeout(() => {
                  addToHistory('5   42 ms   41 ms   40 ms  198.51.100.5');
                  setTimeout(() => {
                    addToHistory('6   50 ms   49 ms   48 ms  140.82.121.1');
                    setTimeout(() => {
                      addToHistory('7   58 ms   57 ms   56 ms  github.com [140.82.121.4]');
                      addToHistory('Trace complete.');
                    }, 300);
                  }, 300);
                }, 300);
              }, 300);
            }, 300);
          }, 300);
        }, 300);
      },
    },
    {
      command: 'ping',
      description: 'Ping a host',
      action: () => {
        addToHistory('Usage: ping [hostname]');
      },
    },
    {
      command: 'ping github.com',
      description: 'Ping GitHub',
      action: () => {
        addToHistory('Pinging github.com [140.82.121.4]');
        let count = 0;
        const interval = setInterval(() => {
          addToHistory(`Reply from 140.82.121.4: time=${Math.floor(Math.random() * 10) + 40}ms`);
          count++;
          if (count >= 4) {
            clearInterval(interval);
            addToHistory('Ping complete.');
          }
        }, 500);
      },
    },
    {
      command: 'bruteforce',
      description: 'Simulate a password brute force attack',
      action: () => {
        addToHistory('WARNING: Simulated educational demonstration only');
        addToHistory('Initiating simulated brute force attack...');
        
        const passwords = ['password', 'admin', '12345', 'qwerty', 'secret'];
        let attempt = 0;
        
        const bruteForce = setInterval(() => {
          if (attempt < passwords.length) {
            addToHistory(`Attempt ${attempt + 1}: ${passwords[attempt]} ... Failed`);
            attempt++;
          } else {
            clearInterval(bruteForce);
            addToHistory('Access denied. Brute force attack failed.');
            addToHistory('This was a simulation for educational purposes only.');
          }
        }, 600);
      },
    },
    {
      command: 'whois',
      description: 'Look up domain registration info',
      action: () => {
        addToHistory('Usage: whois [domain]');
      },
    },
    {
      command: 'whois github.com',
      description: 'Look up GitHub domain info',
      action: () => {
        addToHistory([
          'Domain Name: GITHUB.COM',
          'Registry Domain ID: 1264983250_DOMAIN_COM-VRSN',
          'Registrar WHOIS Server: whois.markmonitor.com',
          'Registrar URL: http://www.markmonitor.com',
          'Updated Date: 2022-09-07T09:10:44Z',
          'Creation Date: 2007-10-09T18:20:50Z',
          'Registrant Organization: GitHub, Inc.',
          'Registrant State/Province: CA',
          'Registrant Country: US',
          'Admin Email: domains@github.com',
          '[Simulated Data for Educational Purposes]'
        ]);
      },
    },
  ];

  useEffect(() => {
    // Scroll to bottom whenever history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    // Focus input whenever possible
    inputRef.current?.focus();
  }, [history]);

  const addToHistory = (text: string | string[]) => {
    if (Array.isArray(text)) {
      setHistory(prev => [...prev, ...text, '> ']);
    } else {
      setHistory(prev => [...prev, text, '> ']);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedInput = input.trim().toLowerCase();
    
    if (trimmedInput) {
      // Add command to history with proper prompt based on active session
      const promptPrefix = activeSession ? `${activeSession}> ` : '> ';
      setHistory(prev => [...prev.slice(0, -1), `${promptPrefix}${input}`, '']);
      
      // Process command
      const matchingCommand = commands.find(cmd => cmd.command === trimmedInput);
      
      if (matchingCommand) {
        matchingCommand.action();
      } else {
        // Special handling for IoT control commands with dynamic parameters
        if (trimmedInput.startsWith('iotcontrol')) {
          const parts = trimmedInput.split(' ');
          if (parts.length === 3) {
            const deviceNum = parts[1];
            const action = parts[2];
            
            if (deviceNum === '3') {
              addToHistory('Error: Device Smart-Light is offline. Cannot perform actions.');
            } else if (['1', '2'].includes(deviceNum) && ['status', 'toggle', 'info'].includes(action)) {
              const specificCommand = `iotcontrol ${deviceNum} ${action}`;
              const specificCommandObj = commands.find(cmd => cmd.command === specificCommand);
              
              if (specificCommandObj) {
                specificCommandObj.action();
              } else {
                addToHistory(`Command ${specificCommand} not implemented yet.`);
              }
            } else {
              addToHistory(`Invalid device number or action. Try "iotcontrol" for help.`);
            }
          } else {
            addToHistory(`Invalid command format. Try "iotcontrol" for help.`);
          }
        } else {
          addToHistory(`Command not found: ${input}. Type "help" for available commands.`);
        }
      }
      
      // Clear input
      setInput('');
    }
  };

  return (
    <div className="w-full lg:max-w-3xl mx-auto rounded-md overflow-hidden border border-portfolio-teal shadow-lg shadow-portfolio-teal/20 bg-portfolio-light-navy">
      {/* Terminal Header */}
      <div className="bg-portfolio-lightest-navy px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <TerminalIcon size={16} className="text-portfolio-teal mr-2" />
          <span className="font-fira-code text-portfolio-teal">
            {activeSession 
              ? `${activeSession}@192.168.1.3:~` 
              : "ricky@portfolio:~"}
          </span>
        </div>
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className="bg-portfolio-navy h-80 p-4 overflow-auto font-fira-code text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, index) => (
          <div key={index} className={cn(
            "whitespace-pre-wrap mb-1",
            line.startsWith('>') || line.includes('> ') ? 'text-portfolio-teal' : 'text-portfolio-light-slate'
          )}>
            {line}
          </div>
        ))}
        
        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-portfolio-teal flex-1 caret-portfolio-teal"
            autoFocus
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;