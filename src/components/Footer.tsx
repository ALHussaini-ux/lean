import React, { useState } from 'react';
import { Page } from '../types';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer id="app-footer" data-header-theme="dark" className="bg-brand-dark text-white pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-neutral-800">
          
          {/* Logo and Tagline Column */}
          <div className="md:col-span-1 space-y-4">
            <div 
              id="footer-logo"
              className="flex flex-col items-start cursor-pointer select-none group"
              onClick={() => handleNav('home')}
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5" 
                alt="LEAN Logo"
                referrerPolicy="no-referrer"
                className="h-9 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://drive.google.com/thumbnail?id=1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5&sz=w1000";
                }}
              />
              <span className="text-[7px] md:text-[8px] text-neutral-400 font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-3 mt-0 group-hover:mt-1 overflow-hidden whitespace-nowrap">
                Built for Real Estate Growth
              </span>
            </div>
            <p className="font-body text-xs text-neutral-400 leading-relaxed max-w-xs">
              Architecting high-conversion lead ingestion systems and automated communication infrastructure for modern builders and developers.
            </p>
          </div>

          {/* Quick Navigation links */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-300">NAVIGATION</h3>
            <ul className="space-y-2 font-body text-xs sm:text-sm text-neutral-400">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left py-0.5"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left py-0.5"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left py-0.5"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleNav('home');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 150);
                  }} 
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left py-0.5"
                >
                  How It Works
                </button>
              </li>
              <li>
                <span className="text-neutral-600 cursor-not-allowed text-left py-0.5 block">
                  Blog (coming soon)
                </span>
              </li>
              <li>
                <button 
                  onClick={() => {
                    handleNav('home');
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 150);
                  }} 
                  className="hover:text-brand-orange transition-colors cursor-pointer text-left py-0.5"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details / Address */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-300">TECHNICAL HUB</h3>
            <ul className="space-y-2 font-body text-xs sm:text-sm text-neutral-400">
              <li className="leading-relaxed">
                LEAN Real Estate Growth Systems<br />
                MG Road, Hyderabad<br />
                Telangana, India
              </li>
              <li className="pt-2">
                <span className="text-neutral-500">Contact:</span> hello@leansystem.co
              </li>
              <li>
                <span className="text-neutral-500">Service Hours:</span> 24/7 Autonomous Systems Monitoring
              </li>
            </ul>
          </div>

          {/* Interactive Automation Bulletin Sign-up */}
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-300 font-bold">AUTOMATION INSIGHTS</h3>
            <p className="font-body text-sm text-neutral-400 leading-relaxed">
              Subscribe to receive telemetry briefs regarding local real estate lead-capture benchmarks.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative flex">
                <input
                  type="email"
                  required
                  placeholder="name@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-orange px-4 py-3 text-sm rounded-sm text-white focus:outline-none font-body placeholder-neutral-600 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-opacity-95 text-white px-4 flex items-center justify-center rounded-sm transition-opacity cursor-pointer"
                  aria-label="Submit Email"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-2 text-brand-orange text-xs font-sans font-semibold animate-fade-in">
                  <Check className="w-3 h-3" />
                  <span>Subscribed! Ingestion systems configured.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright and legal note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-sans tracking-wide space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} LEAN Automation Systems. All rights reserved. Built with Swiss precision.
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Telemetry</span>
            <span className="hover:text-white cursor-pointer transition-colors">System Security</span>
            <span className="hover:text-white cursor-pointer transition-colors">SLA Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
