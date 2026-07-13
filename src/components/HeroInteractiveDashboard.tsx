import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Zap, Database, MessageSquare, Users, 
  CheckCircle, TrendingUp, Bot, Smartphone, 
  Layers, Lock, Server, ArrowRight, RefreshCw, Cpu
} from 'lucide-react';

interface HeroInteractiveDashboardProps {
  activeTab: number;
}

export default function HeroInteractiveDashboard({ activeTab }: HeroInteractiveDashboardProps) {
  // Local state for live activity ticker in Tab 0
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM: Ready for lead ingestion',
    'METRIC: API Webhook status check: OK (200)',
    'INGRESS: Lead #388 (Bengaluru East) -> Transferred to CRM',
  ]);

  // Handle live ticker logs update
  useEffect(() => {
    if (activeTab !== 0) return;
    
    const locations = ['Whitefield', 'Kalyan Nagar', 'Sarjapur Road', 'Gachibowli', 'Koramangala', 'Noida Sec 62'];
    const names = ['Amit S.', 'Priya R.', 'Sandeep K.', 'Vikram M.', 'Neha J.', 'Rahul D.'];
    const channels = ['Meta Lead Form', 'Google Search Ads', 'WhatsApp QR', 'Instagram Ad'];
    
    const interval = setInterval(() => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      
      const newLog = `INGRESS: Lead ${randomName} (${randomLoc}) via ${randomChannel} -> Brochure Dispatched [60s limit]`;
      
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 3800);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div id="interactive-glass-dashboard" className="relative w-full h-full max-w-lg mx-auto lg:mx-0 z-10">
      {/* Background ambient glowing accent */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange/20 to-orange-600/10 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      
      {/* Main glass card container */}
      <div className="relative w-full h-[410px] bg-neutral-900/40 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col justify-between">
        
        {/* Frame Window Header */}
        <div className="px-5 py-3.5 border-b border-white/5 flex items-center justify-between bg-neutral-950/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="text-[10px] font-mono font-semibold text-neutral-400 tracking-wider ml-2 flex items-center gap-1.5 uppercase">
              <Cpu className="w-3 h-3 text-brand-orange" />
              LEAN Engine v2.4
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-mono font-bold text-emerald-400 tracking-widest uppercase">LIVE INGRESS</span>
          </div>
        </div>

        {/* Dynamic Display Area based on activeTab */}
        <div className="flex-grow p-5 overflow-hidden flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* TAB 0: REAL ESTATE GROWTH SYSTEMS */}
            {activeTab === 0 && (
              <motion.div
                key="tab-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-brand-orange/10 border border-brand-orange/20">
                      <Layers className="w-4 h-4 text-brand-orange" />
                    </div>
                    <span className="text-xs font-sans font-extrabold text-neutral-200 uppercase tracking-wider">
                      Real-time Pipeline Overview
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-body leading-relaxed">
                    A visual blueprint of how traffic is programmatically converted into sales-ready site visits.
                  </p>
                </div>

                {/* Conversion Flow Diagram */}
                <div className="grid grid-cols-4 gap-2 text-center my-1 relative">
                  <div className="absolute top-1/2 left-[12.5%] right-[12.5%] -translate-y-1/2 h-[1px] bg-gradient-to-r from-neutral-800 via-brand-orange/40 to-neutral-800 z-0" />
                  
                  <div className="z-10 bg-neutral-950/80 border border-white/5 rounded p-2 flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                    <span className="text-[9px] font-sans font-bold text-neutral-300">Ads Click</span>
                    <span className="text-[10px] font-mono text-brand-orange font-bold">100%</span>
                  </div>

                  <div className="z-10 bg-neutral-950/80 border border-white/5 rounded p-2 flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
                      <MessageSquare className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                    </div>
                    <span className="text-[9px] font-sans font-bold text-neutral-300">WhatsApp</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">85%</span>
                  </div>

                  <div className="z-10 bg-neutral-950/80 border border-white/5 rounded p-2 flex flex-col items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                    <span className="text-[9px] font-sans font-bold text-neutral-300">Verified</span>
                    <span className="text-[10px] font-mono text-brand-orange font-bold">72%</span>
                  </div>

                  <div className="z-10 bg-neutral-950/80 border border-brand-orange/30 rounded p-2 flex flex-col items-center gap-1 shadow-[0_0_15px_rgba(255,140,66,0.1)]">
                    <div className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-sans font-bold text-white">Site Visit</span>
                    <span className="text-[10px] font-mono text-brand-orange font-bold">34%</span>
                  </div>
                </div>

                {/* Simulated Log Feed */}
                <div className="bg-neutral-950/80 border border-white/5 rounded-lg p-2.5 font-mono text-[9px] leading-relaxed text-neutral-400 h-[105px] overflow-hidden flex flex-col gap-1.5 justify-start">
                  <span className="text-[8px] font-bold text-brand-orange/70 tracking-widest uppercase border-b border-white/5 pb-1 block">System Gateway Terminal</span>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <AnimatePresence>
                      {logs.map((log, index) => (
                        <motion.div
                          key={log + index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-start gap-1 truncate"
                        >
                          <span className="text-emerald-500 font-bold shrink-0">❯</span>
                          <span className={log.startsWith('INGRESS') ? 'text-white' : 'text-neutral-500'}>
                            {log}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 1: LEAD GENERATION PIPELINE */}
            {activeTab === 1 && (
              <motion.div
                key="tab-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-brand-orange/10 border border-brand-orange/20">
                      <TrendingUp className="w-4 h-4 text-brand-orange" />
                    </div>
                    <span className="text-xs font-sans font-extrabold text-neutral-200 uppercase tracking-wider">
                      Ad Performance Analytics
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-body leading-relaxed">
                    By bypassing generic agency portals, we optimize specifically for direct, high-intent real estate campaigns.
                  </p>
                </div>

                {/* Side-by-side comparison graphics */}
                <div className="grid grid-cols-2 gap-4 my-1">
                  
                  {/* Generic Agency */}
                  <div className="bg-neutral-950/40 border border-white/5 rounded-lg p-3 space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1">
                      <span className="text-[7px] font-mono bg-red-500/10 text-red-400 px-1 py-0.5 rounded uppercase">Generic Agent</span>
                    </div>
                    <span className="text-[9px] font-sans font-extrabold text-neutral-500 block uppercase tracking-wider">Market Competitor</span>
                    
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block leading-none">Cost per Lead</span>
                        <span className="text-sm font-mono text-neutral-400 font-extrabold">₹450 - ₹600</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block leading-none">Lead Quality Score</span>
                        <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-1">
                          <div className="bg-red-500/40 h-full rounded-full w-[35%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEAN Pipeline */}
                  <div className="bg-neutral-950 border border-brand-orange/20 rounded-lg p-3 space-y-2 relative overflow-hidden shadow-[0_0_20px_rgba(255,140,66,0.05)]">
                    <div className="absolute top-0 right-0 p-1">
                      <span className="text-[7px] font-mono bg-brand-orange/20 text-brand-orange px-1 py-0.5 rounded uppercase font-bold">LEAN pipeline</span>
                    </div>
                    <span className="text-[9px] font-sans font-extrabold text-brand-orange block uppercase tracking-wider">Our Platform</span>
                    
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-300 block leading-none">Cost per Lead</span>
                        <span className="text-sm font-mono text-white font-black">₹180 - ₹240</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-300 block leading-none">Lead Quality Score</span>
                        <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-1">
                          <div className="bg-brand-orange h-full rounded-full w-[92%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Efficiency Tag */}
                <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-lg p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Optimized Ad Budget Multiplier</span>
                  </div>
                  <span className="text-[11px] font-mono font-black text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20">+2.5x ROI</span>
                </div>
              </motion.div>
            )}

            {/* TAB 2: WHATSAPP AUTOMATION */}
            {activeTab === 2 && (
              <motion.div
                key="tab-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-brand-orange/10 border border-brand-orange/20">
                      <Bot className="w-4 h-4 text-brand-orange" />
                    </div>
                    <span className="text-xs font-sans font-extrabold text-neutral-200 uppercase tracking-wider">
                      Instant WhatsApp Assistant
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-body leading-relaxed">
                    Instantly deliver product catalogs & handle appointment bookings 24/7 without manual sales labor.
                  </p>
                </div>

                {/* WhatsApp Chat Simulator */}
                <div className="bg-neutral-950/80 border border-white/5 rounded-xl p-3 space-y-2.5 h-[155px] overflow-y-auto flex flex-col justify-end">
                  
                  {/* Message 1 (Prospect) */}
                  <div className="flex flex-col items-end space-y-1">
                    <div className="bg-neutral-800 text-white rounded-2xl rounded-tr-none px-3 py-1.5 max-w-[85%] text-[10px] font-body leading-tight">
                      Hi, please share floor plans and pricing for the 3BHK project.
                    </div>
                    <span className="text-[8px] font-mono text-neutral-500">11:12 AM • Delivered</span>
                  </div>

                  {/* Message 2 (Bot Response) */}
                  <div className="flex flex-col items-start space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] font-sans font-bold text-brand-orange bg-brand-orange/10 px-1 rounded">LEAN BOT</span>
                    </div>
                    <div className="bg-neutral-900 border border-white/5 text-neutral-200 rounded-2xl rounded-tl-none px-3 py-2 max-w-[85%] text-[10px] font-body leading-tight space-y-1">
                      <p>Hi there! 📥 Here is the official Brochure PDF.</p>
                      <div className="flex items-center gap-1.5 bg-neutral-950 p-1 px-1.5 rounded border border-white/5 mt-1">
                        <Database className="w-3.5 h-3.5 text-brand-orange" />
                        <div className="flex-grow min-w-0">
                          <p className="text-[8px] font-bold font-sans truncate text-white">brochure_3bhk_royal.pdf</p>
                          <p className="text-[7px] font-mono text-neutral-500">2.4 MB • PDF Document</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-500">11:13 AM</span>
                  </div>

                </div>

                {/* Simulated stat ribbon */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="bg-neutral-950/50 border border-white/5 p-1.5 rounded">
                    <span className="text-[9px] text-neutral-500 block">Avg Response Time</span>
                    <span className="font-bold text-emerald-400">4.8 Seconds</span>
                  </div>
                  <div className="bg-neutral-950/50 border border-white/5 p-1.5 rounded">
                    <span className="text-[9px] text-neutral-500 block">Lead Engagement Rate</span>
                    <span className="font-bold text-brand-orange">94.2%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: INFRASTRUCTURE YOU CONTROL */}
            {activeTab === 3 && (
              <motion.div
                key="tab-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 h-full flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-brand-orange/10 border border-brand-orange/20">
                      <Lock className="w-4 h-4 text-brand-orange" />
                    </div>
                    <span className="text-xs font-sans font-extrabold text-neutral-200 uppercase tracking-wider">
                      Secured Sovereign Architecture
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-body leading-relaxed">
                    No middleman licensing. We build custom landing pages and CRM webhooks directly in ad accounts that you own.
                  </p>
                </div>

                {/* Node Grid representation */}
                <div className="bg-neutral-950/80 border border-white/5 rounded-xl p-3.5 space-y-3">
                  <span className="text-[9px] font-sans font-extrabold text-neutral-400 block uppercase tracking-wider border-b border-white/5 pb-1">
                    System Asset Ownership Breakdown
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-300">
                    <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded border border-white/5">
                      <Server className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-[9px] text-white">Cloud Database</p>
                        <p className="text-[8px] text-emerald-400">100% Client-Owned</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded border border-white/5">
                      <Database className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-[9px] text-white">Lead Data</p>
                        <p className="text-[8px] text-emerald-400">No Broker Leaks</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded border border-white/5">
                      <Lock className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-[9px] text-white">Ad Accounts</p>
                        <p className="text-[8px] text-emerald-400">Zero Lock-in</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-neutral-900/60 p-2 rounded border border-white/5">
                      <Smartphone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-[9px] text-white">WhatsApp API</p>
                        <p className="text-[8px] text-emerald-400">Meta Authorized</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Small security warning note */}
                <p className="text-[9px] font-mono text-neutral-500 leading-normal flex items-start gap-1">
                  <span className="text-brand-orange font-bold font-sans">ℹ</span>
                  If you cancel your contract, the entire platform remains live, active, and fully hosted on your servers. No agency shutdown switch.
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer/Progress Indicator bar synced with slider */}
        <div className="px-5 py-3 border-t border-white/5 bg-neutral-950/20 text-center flex items-center justify-between text-[9px] font-mono text-neutral-500">
          <span>PORT: 3000 // HOST: 0.0.0.0</span>
          <span>GATEWAY SECURED</span>
        </div>

      </div>
    </div>
  );
}
