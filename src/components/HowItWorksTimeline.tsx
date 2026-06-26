import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Eye, 
  BarChart3, 
  Building2, 
  Check, 
  ArrowRight,
  Shield,
  Activity,
  Users
} from 'lucide-react';

interface StepItem {
  week: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  whatWeDo: string[];
  yourRole: string;
  outcome: string;
}

export default function HowItWorksTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const steps: StepItem[] = [
    {
      week: "Week 1",
      title: "Setup & Launch",
      description: "We configure the foundation of your lead generation system, including campaigns, landing pages, WhatsApp automation, and tracking.",
      icon: <Rocket className="w-5 h-5 text-[#FF6B00]" />,
      whatWeDo: [
        "Strategy session",
        "Landing page setup",
        "Google & Meta campaign configuration",
        "WhatsApp automation",
        "CRM integration"
      ],
      yourRole: "Provide project information, creative assets, and account access.",
      outcome: "Your marketing system is configured and ready to launch."
    },
    {
      week: "Weeks 2–3",
      title: "Campaign Launch",
      description: "Campaigns go live and enquiries begin flowing into your lead management system while we monitor performance and make initial optimizations.",
      icon: <Target className="w-5 h-5 text-[#FF6B00]" />,
      isActive: true, // The active step receives a subtle orange glow
      whatWeDo: [
        "Launch campaigns",
        "Monitor lead quality",
        "Optimize targeting",
        "Review campaign performance"
      ],
      yourRole: "Respond to enquiries and provide feedback on lead quality.",
      outcome: "Campaign data begins providing insights for optimization."
    },
    {
      week: "Week 4+",
      title: "Optimization & Growth",
      description: "Using campaign data, we continuously improve targeting, landing pages, and automation to increase overall marketing efficiency.",
      icon: <TrendingUp className="w-5 h-5 text-[#FF6B00]" />,
      whatWeDo: [
        "Optimize campaigns",
        "Improve landing pages",
        "Refine automation",
        "Analyze reporting"
      ],
      yourRole: "Review reports and discuss growth opportunities.",
      outcome: "Continuous improvements based on real performance data."
    }
  ];

  return (
    <section 
      id="how-it-works" 
      ref={containerRef}
      className="relative max-w-7xl mx-auto px-6 py-28 md:py-36 scroll-mt-24 overflow-hidden"
    >
      {/* Soft background light reflections for Apple-like atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="text-center mb-20 md:mb-24 space-y-4 max-w-3xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[#FF6B00] text-xs tracking-[0.2em] font-sans font-black uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2"
        >
          PROCESS
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-sans font-black text-brand-dark tracking-tight leading-tight"
        >
          How We Build Your Lead Generation System
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-body text-neutral-500 text-base md:text-lg leading-relaxed"
        >
          A transparent, step-by-step approach designed to launch, manage, and continuously improve your lead generation system.
        </motion.p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative mb-24">
        
        {/* Progress connecting lines for desktop */}
        <div className="absolute top-[38px] left-[15%] right-[15%] h-[1.5px] bg-neutral-200 hidden lg:block z-0 overflow-hidden">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-neutral-200 via-[#FF6B00]/40 to-neutral-200 origin-left"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10 items-stretch">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 45 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 45 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`group flex flex-col justify-between p-8 rounded-[24px] border transition-all duration-300 relative bg-white/10 backdrop-blur-[24px] ${
                step.isActive 
                  ? 'border-[#FF6B00]/30 shadow-[0_20px_50px_rgba(255,107,0,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.4)] hover:shadow-[0_24px_60px_rgba(255,107,0,0.1),inset_0_1.5px_4px_rgba(255,255,255,0.5)] ring-1 ring-[#FF6B00]/10' 
                  : 'border-white/20 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.03),inset_0_1.5px_3px_rgba(255,255,255,0.4)] hover:border-white/35 hover:bg-white/18 hover:shadow-[0_20px_45px_rgba(0,0,0,0.04),inset_0_1.5px_3px_rgba(255,255,255,0.5)]'
              }`}
            >
              {/* Active Step Glowing Badge */}
              {step.isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B00] text-white text-[9px] font-sans font-black tracking-[0.18em] uppercase py-1 px-3.5 rounded-full shadow-[0_4px_12px_rgba(255,107,0,0.25)] select-none">
                  ACTIVE PHASE
                </div>
              )}

              {/* Step Info */}
              <div className="space-y-6">
                
                {/* Top header line: Icon + Week */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-[14px] bg-white border border-white/70 shadow-[0_4px_12px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[5deg] group-hover:scale-105">
                    {step.icon}
                  </div>
                  <span className={`text-[11px] font-sans font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full ${
                    step.isActive 
                      ? 'bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/10' 
                      : 'bg-neutral-900/[0.04] text-neutral-400 border border-transparent'
                  }`}>
                    {step.week}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-sans font-extrabold text-brand-dark group-hover:text-[#FF6B00] transition-colors duration-200">
                    {step.title}
                  </h3>
                  <p className="font-body text-neutral-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Role Details */}
                <div className="border-t border-neutral-200/50 pt-5 space-y-4">
                  
                  {/* What We Do */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-black tracking-wider text-neutral-400 uppercase block">What We Do</span>
                    <ul className="space-y-2">
                      {step.whatWeDo.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-sans font-bold text-neutral-600">
                          <Check className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" strokeWidth={3} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Your Role */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans font-black tracking-wider text-neutral-400 uppercase block">Your Role</span>
                    <p className="text-xs font-body text-neutral-500 leading-relaxed">
                      {step.yourRole}
                    </p>
                  </div>

                </div>

              </div>

              {/* Step Output Box */}
              <div className="mt-8 pt-4 border-t border-neutral-200/50 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <span className="text-[10px] font-black text-emerald-600">✓</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-sans font-black uppercase tracking-widest text-emerald-600 block">System Outcome</span>
                  <span className="text-xs font-sans font-bold text-neutral-700 leading-tight block">
                    {step.outcome}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* PREMIUM TRUST BAR */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="max-w-4xl mx-auto rounded-[24px] bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.02),inset_0_1.5px_3px_rgba(255,255,255,0.4)] p-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 relative overflow-hidden"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-[10px] bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <Eye className="w-4.5 h-4.5 text-[#FF6B00]" />
          </div>
          <div>
            <span className="text-xs font-sans font-black tracking-wider text-neutral-400 uppercase block">Our Philosophy</span>
            <span className="text-sm font-sans font-extrabold text-brand-dark">No Shortcuts. Quality-First Systems.</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-neutral-200/50 sm:hidden" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-sans font-black text-neutral-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Transparent</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Data-Driven</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Real Estate Focused</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
