import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Check, 
  Copy, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Zap, 
  Database, 
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import PageMetadata from './PageMetadata';
import AramcoButton from './AramcoButton';

export default function HelloPrivateCard() {
  const navigate = useNavigate();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Contact details
  const emailAddress = "hello@leansystem.co";
  const phoneNumber = "+91 98765 43210";
  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20Numair%2C%20I%20scanned%20your%20business%20card.%20I%27d%20like%20to%20connect.";

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange selection:text-white pt-24 md:pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-between">
      
      {/* Metadata */}
      <PageMetadata 
        title="Numair | Founder & Pipeline Architect - LEAN Growth Systems"
        description="Digital business card and direct line to Numair at LEAN Growth Systems."
        noindex={false}
      />

      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="max-w-xl mx-auto w-full relative z-10 my-auto">
        
        {/* Digital Business Card Wrapper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] space-y-8"
        >
          
          {/* Card Top Pill Badge */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/15 border border-brand-orange/30 rounded-full">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] font-sans font-extrabold text-brand-orange uppercase tracking-widest">
                DIGITAL BUSINESS CARD
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              PRIVATE ENTRY
            </span>
          </div>

          {/* Intro Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-orange via-orange-600 to-neutral-900 p-0.5 shadow-lg shrink-0">
                <div className="w-full h-full bg-neutral-950 rounded-[14px] flex items-center justify-center font-sans font-black text-xl text-brand-orange">
                  N
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight leading-snug">
                  Hey, I'm Numair 👋
                </h1>
                <p className="text-xs sm:text-sm font-sans font-bold text-neutral-400 mt-0.5">
                  Founder & Lead Pipeline Architect
                </p>
                <p className="text-[11px] font-mono text-brand-orange/90 font-semibold tracking-wide">
                  LEAN Growth Systems
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-body text-neutral-300 leading-relaxed pt-2">
              Great meeting you in person! If you scanned the code on my business card, you're likely running or marketing real estate projects and want a clean, predictable way to attract genuine buyers without relying on traditional, black-box agencies.
            </p>
          </div>

          {/* What I Do Section (Under 60 Seconds) */}
          <div className="space-y-3 bg-neutral-950/60 border border-white/5 p-4 sm:p-5 rounded-2xl">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-orange" />
              <h2 className="text-xs font-sans font-extrabold text-white uppercase tracking-wider">
                What Lean Growth Systems Does
              </h2>
            </div>
            
            <p className="text-xs font-body text-neutral-400 leading-relaxed">
              We replace leaky, manual marketing with direct customer acquisition infrastructure built specifically for Indian real estate developers and builders:
            </p>

            <ul className="space-y-2.5 pt-1">
              <li className="flex items-start gap-2.5 text-xs text-neutral-300 font-body">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">High-Intent Ads:</strong> Precision Meta & Google campaigns targeted strictly at serious homebuyers.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-neutral-300 font-body">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">WhatsApp Automation:</strong> 24/7 instant brochure dispatch (&lt;60s) and friction-free site visit scheduling.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-neutral-300 font-body">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white font-semibold">100% Client Ownership:</strong> We build everything directly inside ad accounts and databases that you own. Zero middleman lock-in.</span>
              </li>
            </ul>
          </div>

          {/* Who I Help Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-sans font-extrabold text-neutral-400 uppercase tracking-wider">
              Who I Work With
            </h3>
            <p className="text-xs sm:text-sm font-body text-neutral-300 leading-relaxed">
              Real estate developers, residential builders, and project marketing heads who want predictable lead pipelines, fast customer response times, and complete visibility over their ad spend.
            </p>
          </div>

          {/* Direct Action / Contact Buttons */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-sans font-extrabold text-neutral-400 uppercase tracking-wider">
              Direct Contact Options
            </h3>

            {/* Primary Action: WhatsApp */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl p-4 flex items-center justify-between transition-all duration-300 shadow-lg shadow-emerald-950/50 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-100 uppercase tracking-wider block font-semibold">FASTEST RESPONSE</span>
                  <span className="text-sm font-sans font-bold text-white">Message Me on WhatsApp</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Grid for Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Email */}
              <div className="bg-neutral-950/80 border border-white/10 hover:border-brand-orange/50 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Mail className="w-4 h-4 text-brand-orange" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Email</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(emailAddress, 'email')}
                    className="text-[10px] text-neutral-400 hover:text-white p-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <a 
                  href={`mailto:${emailAddress}?subject=Inquiry%20from%20Business%20Card`}
                  className="text-xs font-mono font-bold text-white hover:text-brand-orange transition-colors truncate"
                >
                  {emailAddress}
                </a>
              </div>

              {/* Phone */}
              <div className="bg-neutral-950/80 border border-white/10 hover:border-brand-orange/50 rounded-2xl p-3.5 flex flex-col justify-between space-y-2 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Direct Call</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(phoneNumber, 'phone')}
                    className="text-[10px] text-neutral-400 hover:text-white p-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <a 
                  href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                  className="text-xs font-mono font-bold text-white hover:text-brand-orange transition-colors truncate"
                >
                  {phoneNumber}
                </a>
              </div>

            </div>

            {/* Schedule Consultation Call Option */}
            <button
              onClick={() => navigate('/contact')}
              className="w-full bg-neutral-950 border border-white/10 hover:border-brand-orange/60 text-neutral-200 hover:text-white rounded-2xl p-3.5 flex items-center justify-between transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-xs font-sans font-bold">Schedule a 30-Min Systems Audit Call</span>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6 space-y-4">
            
            {/* Main Website Navigation CTA */}
            <div className="bg-gradient-to-r from-brand-orange/10 via-brand-orange/5 to-transparent p-4 rounded-2xl border border-brand-orange/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-brand-orange font-extrabold uppercase tracking-widest block">
                  EXPLORE THE PLATFORM
                </span>
                <p className="text-xs font-sans font-bold text-white">
                  Want to see our methodology & system breakdown?
                </p>
              </div>

              <AramcoButton 
                onClick={() => navigate('/')} 
                variant="white"
                className="shrink-0 text-xs py-1"
              >
                Visit Full Website
              </AramcoButton>
            </div>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400 pt-2 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Private direct-access page • LEAN Growth Systems</span>
            </div>

          </div>

        </motion.div>
      </div>

      {/* Simple Bottom Footer Note */}
      <div className="text-center text-[11px] font-mono text-neutral-400 py-4 relative z-10">
        © {new Date().getFullYear()} LEAN Growth Systems. All rights reserved.
      </div>

    </div>
  );
}
