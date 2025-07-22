
import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, Terminal, Lock, User, Send } from 'lucide-react';

const ContactSection = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate sending a message
    setTimeout(() => {
      setLoading(false);
      setMessageSent(true);
      setMessageText('');
      setEmail('');
      setName('');
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-10 lg:px-24 bg-portfolio-navy">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-fira-code text-portfolio-teal mb-4">05. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-portfolio-lightest-slate mb-6">Get In Touch</h2>
          <p className="text-portfolio-slate mb-10 text-lg">
            I'm currently looking for opportunities to apply my skills and knowledge. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>
        
        {/* Terminal-style contact form */}
        <div className="mb-12 rounded-md overflow-hidden border border-portfolio-teal shadow-lg shadow-portfolio-teal/20">
          <div className="bg-portfolio-lightest-navy px-4 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <Terminal size={16} className="text-portfolio-teal mr-2" />
              <span className="font-fira-code text-portfolio-teal">terminal@contact:~</span>
            </div>
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          
          <div className="bg-portfolio-light-navy p-6">
            {messageSent ? (
              <div className="animate-fade-in space-y-4 text-center py-8">
                <div className="text-portfolio-teal text-6xl flex justify-center">
                  <Send />
                </div>
                <p className="text-portfolio-lightest-slate text-xl">Message received!</p>
                <p className="font-fira-code text-portfolio-teal">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="font-fira-code text-portfolio-teal mb-6">
                  <p>$ sudo ./send_message.sh</p>
                  <p>Enter your credentials to establish a secure connection...</p>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center pl-3 h-full text-portfolio-teal">
                    <User size={16} />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name" 
                    className="w-full bg-portfolio-navy border border-portfolio-lightest-navy pl-10 pr-4 py-3 rounded text-portfolio-lightest-slate placeholder:text-portfolio-slate focus:outline-none focus:border-portfolio-teal"
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-0 flex items-center pl-3 h-full text-portfolio-teal">
                    <Mail size={16} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    className="w-full bg-portfolio-navy border border-portfolio-lightest-navy pl-10 pr-4 py-3 rounded text-portfolio-lightest-slate placeholder:text-portfolio-slate focus:outline-none focus:border-portfolio-teal"
                    required
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3 text-portfolio-teal">
                    <Lock size={16} />
                  </div>
                  <textarea 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Your message" 
                    rows={4}
                    className="w-full bg-portfolio-navy border border-portfolio-lightest-navy pl-10 pr-4 py-3 rounded text-portfolio-lightest-slate placeholder:text-portfolio-slate focus:outline-none focus:border-portfolio-teal"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={`w-full border border-portfolio-teal text-portfolio-teal px-6 py-3 rounded hover:bg-portfolio-teal-tint transition-colors duration-300 font-fira-code flex items-center justify-center ${loading ? 'opacity-70' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Encrypting message...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Transmit Secure Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a 
            href="mailto:ricky.nuetrex@gmail.com" 
            className="flex items-center gap-2 text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors group"
          >
            <div className="bg-portfolio-light-navy p-2 rounded-full group-hover:animate-pulse">
              <Mail size={20} />
            </div>
            <span>ricky.nuetrex@gmail.com</span>
          </a>
          
          <a 
            href="tel:+917418922390" 
            className="flex items-center gap-2 text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors group"
          >
            <div className="bg-portfolio-light-navy p-2 rounded-full group-hover:animate-pulse">
              <Phone size={20} />
            </div>
            <span>+91 7418922390</span>
          </a>
        </div>
        
        <div className="mt-16 flex justify-center gap-8">
          <a 
            href="https://www.linkedin.com/in/ricky-f-btech/" 
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-portfolio-light-navy p-3 rounded-full group-hover:animate-pulse">
              <Linkedin size={24} />
            </div>
          </a>
          
          <a 
            href="https://github.com/Ricky-Hacker001" 
            className="text-portfolio-lightest-slate hover:text-portfolio-teal transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-portfolio-light-navy p-3 rounded-full group-hover:animate-pulse">
              <Github size={24} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
