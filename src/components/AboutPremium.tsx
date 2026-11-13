import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Target, 
  AppWindow, 
  Database, 
  LineChart, 
  ArrowRight, 
  Check, 
  ChevronRight
} from './icons';

// Define Prop Types for AboutPremium
interface AboutPremiumProps {
  setCurrentPage: (page: 'home' | 'services' | 'about' | 'get-started') => void;
}

export default function AboutPremium({ setCurrentPage }: AboutPremiumProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.15 });

  const philosophyRef = useRef<HTMLDivElement>(null);
  const isPhilosophyInView = useInView(philosophyRef, { once: true, amount: 0.15 });

  const timelineSectionRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineSectionRef, { once: true, amount: 0.1 });

  const actionsRef = useRef<HTMLDivElement>(null);
  const isActionsInView = useInView(actionsRef, { once: true, amount: 0.15 });

  const principlesRef = useRef<HTMLDivElement>(null);
  const isPrinciplesInView = useInView(principlesRef, { once: true, amount: 0.15 });

  const whyRef = useRef<HTMLDivElement>(null);
  const isWhyInView = useInView(whyRef, { once: true, amount: 0.15 });

  const closingRef = useRef<HTMLDivElement>(null);
  const isClosingInView = useInView(closingRef, { once: true, amount: 0.15 });

  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.15 });


  return (
    <div className="space-y-20 sm:space-y-32 pb-16 sm:pb-24 font-sans-clean bg-brand-light">

      {/* SECTION 01: ABOUT EDITORIAL HEADER */}
      <section 
        id="about-intro" 
        ref={introRef}
        className="pt-24 sm:pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="max-w-4xl space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6 }}
            className="text-[#FF6B00] text-xs tracking-[0.2em] font-sans-clean font-bold uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2"
          >
            ABOUT
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-brand-dark tracking-tight leading-tight"
          >
            We Build Systems That Help Real Estate Teams Capture More Opportunities.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={isIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans-clean text-neutral-500 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Lean System designs and implements modern lead generation systems using landing pages, advertising, CRM tracking, and performance analytics. Our goal is to create a simple, organized process that helps businesses manage enquiries more efficiently.
          </motion.p>
        </div>
      </section>


      {/* SECTION 03: OUR PHILOSOPHY */}
      <section 
        id="about-philosophy" 
        ref={philosophyRef}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono-num font-medium tracking-widest text-[#FF6B00] uppercase block">
              OUR FRAMEWORK
            </span>
            <h2 className="text-4xl font-display font-bold text-brand-dark tracking-tight leading-tight">
              Technology Should Simplify Growth.
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Column 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-white border border-neutral-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center font-mono-num font-bold text-xs text-neutral-400 select-none">
                01
              </div>
              <h3 className="text-lg font-display font-bold text-brand-dark">Clarity</h3>
              <p className="font-sans-clean text-neutral-500 text-sm leading-relaxed">
                Every project starts with understanding the business before choosing the tools.
              </p>
            </motion.div>

            {/* Column 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-white border border-neutral-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center font-mono-num font-bold text-xs text-neutral-400 select-none">
                02
              </div>
              <h3 className="text-lg font-display font-bold text-brand-dark">Transparency</h3>
              <p className="font-sans-clean text-neutral-500 text-sm leading-relaxed">
                We explain what we're doing, why we're doing it, and what the data tells us.
              </p>
            </motion.div>

            {/* Column 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="w-10 h-10 rounded-[12px] bg-white border border-neutral-200/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center font-mono-num font-bold text-xs text-neutral-400 select-none">
                03
              </div>
              <h3 className="text-lg font-display font-bold text-brand-dark">Continuous Improvement</h3>
              <p className="font-sans-clean text-neutral-500 text-sm leading-relaxed">
                Digital marketing is never finished. We continuously analyze and refine based on performance.
              </p>
            </motion.div>

          </div>
        </div>
      </section>


      {/* SECTION 04: INTERACTIVE HORIZONTAL TIMELINE */}
      <section 
        id="about-timeline" 
        ref={timelineSectionRef}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono-num font-medium tracking-widest text-[#FF6B00] uppercase block">
              OUR PATHWAY
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark tracking-tight leading-tight">
              How We Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Discover', step: 'PHASE 01', desc: 'Understand the business, goals, audience, and current challenges.' },
              { title: 'Build', step: 'PHASE 02', desc: 'Develop landing pages, campaigns, automation, and tracking.' },
              { title: 'Launch', step: 'PHASE 03', desc: 'Deploy the system and monitor its performance.' },
              { title: 'Improve', step: 'PHASE 04', desc: 'Use real campaign data to optimize over time.' }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="p-7 rounded-[22px] bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.03),inset_0_1.5px_3px_rgba(255,255,255,0.45)] flex flex-col justify-between h-48 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono-num font-medium tracking-widest text-neutral-400 uppercase block">
                    {t.step}
                  </span>
                  <h3 className="text-xl font-display font-bold text-brand-dark group-hover:text-[#FF6B00] transition-colors duration-200">
                    {t.title}
                  </h3>
                  <p className="text-xs font-sans-clean text-neutral-500 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="flex justify-end pt-2">
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF6B00] group-hover:translate-x-1.5 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 05: WHAT WE ACTUALLY DO (FLOATING LIQUID GLASS CARDS) */}
      <section ref={actionsRef} className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono-num font-medium tracking-widest text-[#FF6B00] uppercase block">
              ECOSYSTEM MODULES
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark tracking-tight leading-tight">
              Ecosystem Components
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Google & Meta Ads', icon: <Target className="w-5 h-5 text-[#FF6B00]" />, desc: 'High-intent search keyword targeting.' },
              { title: 'Landing Pages', icon: <AppWindow className="w-5 h-5 text-[#FF6B00]" />, desc: 'Engineered conversion portals.' },
              { title: 'CRM Integration', icon: <Database className="w-5 h-5 text-[#FF6B00]" />, desc: 'Consolidated enquiry pipelines.' },
              { title: 'Performance Reporting', icon: <LineChart className="w-5 h-5 text-[#FF6B00]" />, desc: 'Actionable performance audits.' }
            ].map((srv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isActionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-[24px] bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.45),0_10px_35px_-10px_rgba(0,0,0,0.03)] hover:bg-white/18 hover:shadow-[0_20px_45px_rgba(255,107,0,0.06),inset_0_1.5px_3px_rgba(255,255,255,0.5)] transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div className="space-y-6">
                  <div className="w-10 h-10 rounded-[12px] bg-white border border-white/70 shadow-[0_4px_12px_rgba(0,0,0,0.02),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center group-hover:rotate-[5deg] group-hover:scale-105 transition-all duration-300">
                    {srv.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-display font-bold text-brand-dark leading-snug group-hover:text-[#FF6B00] transition-colors duration-200">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-sans-clean text-neutral-500 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 06: OUR PRINCIPLES (PREMIUM EDITORIAL STATEMENTS) */}
      <section 
        id="about-principles" 
        ref={principlesRef}
        className="max-w-5xl mx-auto px-6 py-12 border-y border-neutral-200/50"
      >
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#FF6B00] text-xs tracking-[0.2em] font-sans-clean font-bold uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2">
              OUR STANDARDS
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark tracking-tight leading-tight">
              A Transparent Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { statement: 'No fake metrics.', subtitle: 'We report on actual leads and client interactions, not vanity impressions or ambiguous impressions.' },
              { statement: 'No unrealistic guarantees.', subtitle: 'Real marketing relies on structural testing, continuous analysis, and data-driven decision making.' },
              { statement: 'No shortcuts.', subtitle: 'We configure thorough campaigns, structured databases, and complete webhook routing boards.' },
              { statement: 'No unnecessary complexity.', subtitle: 'Every recommendation is backed by a clear strategy and actionable performance feedback.' }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={isPrinciplesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#FF6B00]" strokeWidth={3} />
                </div>
                <div className="space-y-1.5">
                  <span className="text-lg font-display font-bold text-brand-dark block">{p.statement}</span>
                  <p className="text-xs font-sans-clean text-neutral-500 leading-relaxed">{p.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 07: WHY LEAN */}
      <section 
        id="about-why" 
        ref={whyRef}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="space-y-16">
          <div className="space-y-3">
            <span className="text-xs font-mono-num font-medium tracking-widest text-[#FF6B00] uppercase block">
              OUR VALUE
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark tracking-tight leading-tight">
              The Lean System Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Focused', desc: 'We specialize exclusively in lead generation systems for real estate builders and property developers.' },
              { title: 'Practical', desc: 'Every feature and tracking step we deploy has a clear purpose and direct utility.' },
              { title: 'Transparent', desc: 'Clear documentation, open ad accounts, and straightforward analytics reporting.' },
              { title: 'Built to Scale', desc: 'Systems designed with robust APIs and standard webhooks that can grow with you.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isWhyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                className="p-8 rounded-[24px] bg-white border border-neutral-200/50 hover:border-[#FF6B00]/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 space-y-4 cursor-default"
              >
                <span className="text-xs font-mono-num font-bold tracking-widest text-[#FF6B00] uppercase block">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-display font-bold text-brand-dark">
                  {item.title}
                </h3>
                <p className="text-xs font-sans-clean text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 09: CLOSING EDITORIAL */}
      <section 
        id="about-closing" 
        ref={closingRef}
        className="max-w-4xl mx-auto px-6 text-center space-y-8"
      >
        <motion.h3 
          initial={{ opacity: 0, y: 25 }}
          animate={isClosingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-display font-bold text-brand-dark tracking-tight leading-tight"
        >
          Good systems create consistency.
        </motion.h3>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isClosingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-sans-clean text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Our role is to build a reliable digital foundation that helps businesses capture, organize, and manage opportunities more effectively.
        </motion.p>
      </section>


      {/* CALL TO ACTION (CTA) SECTION */}
      <section 
        id="about-cta" 
        ref={ctaRef}
        className="max-w-5xl mx-auto px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8 }}
          className="rounded-[32px] bg-brand-dark text-white p-10 md:p-14 text-center relative overflow-hidden shadow-2xl space-y-8"
        >
          {/* Subtle light leak for cosmic flare look */}
          <div className="absolute top-0 left-1/4 w-80 h-32 bg-[#FF6B00]/10 blur-[80px] pointer-events-none" />

          <div className="space-y-3">
            <span className="text-[#FF6B00] text-xs font-mono-num font-medium tracking-widest uppercase block">READY TO START</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
              Let's Build Something That Works.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('get-started');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#FF6B00] hover:bg-orange-600 font-sans-clean font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 shadow-[0_10px_25px_rgba(255,107,0,0.25)] flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </a>
            <a 
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('services');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 font-sans-clean font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Our Services</span>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
