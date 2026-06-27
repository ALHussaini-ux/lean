import React from 'react';
import { motion } from 'motion/react';
import LeadPortal from './LeadPortal';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPremium() {
  return (
    <div className="pt-28 md:pt-36 pb-24 bg-brand-light font-sans min-h-screen">
      {/* Visual Header Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-brand-orange text-xs tracking-[0.2em] font-black uppercase inline-block border-b-2 border-brand-orange pb-2 mb-2">
              ESTABLISH CONNECTION
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight leading-tight uppercase">
              Schedule Your System Audit
            </h1>
            <p className="font-body text-neutral-500 text-sm md:text-base max-w-xl leading-relaxed">
              Choose an ingestion pipeline below to contact our systems engineers. Let's analyze your current advertising parameters and deploy automated follow-up structures.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white/60 border border-neutral-200/50 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-sans font-black text-emerald-600 uppercase tracking-widest block">SECURE CHANNEL</span>
              <p className="text-xs font-body text-neutral-500">All data encrypted. No vendor lock-in guarantees.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main LeadPortal Component wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <LeadPortal />
      </motion.div>
    </div>
  );
}
