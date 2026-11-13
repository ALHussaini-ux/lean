import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Target, 
  Sparkles, 
  AppWindow, 
  Database, 
  LineChart, 
  Layers, 
  Plus, 
  Minus, 
  Check, 
  ArrowRight
} from './icons';

interface FeatureBlock {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  deepDive: string;
  bullets: string[];
}

export default function ServicesPremium({ setCurrentPage }: { setCurrentPage: (page: any) => void }) {
  const featuresRef = useRef<HTMLDivElement>(null);

  const engagementRef = useRef<HTMLDivElement>(null);
  const isEngagementInView = useInView(engagementRef, { once: true, amount: 0.15 });

  const ctaRef = useRef<HTMLDivElement>(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.15 });

  // Feature block expand states
  const [expandedFeature, setExpandedFeature] = useState<string | null>('ads');

  const features: FeatureBlock[] = [
    {
      id: 'ads',
      title: 'Google & Meta Ads',
      icon: <Target className="w-5 h-5 text-[#FF6B00]" />,
      summary: 'High-intent target mapping and conversion-driven asset design.',
      deepDive: 'We configure and optimize advertising campaigns with a process-driven approach. We focus on search intent metrics on Google and qualified demographic parameters on Meta platforms to establish clean interest channels.',
      bullets: [
        'Keyword match-type pruning (exact & phrase match focus)',
        'Exclusion of non-performing search queries to prevent budget bleed',
        'High-contrast ad copy matching specific builder value statements',
        'Thorough UTM parameter tracing for absolute transparency'
      ]
    },
    {
      id: 'pages',
      title: 'Landing Pages',
      icon: <AppWindow className="w-5 h-5 text-[#FF6B00]" />,
      summary: 'Responsive, high-speed, and conversion-engineered interfaces.',
      deepDive: 'Our landing pages are built with modern frameworks to ensure loading times under 1.5 seconds. They prioritize clean visual hierarchy, prominent layout structures, and intuitive inquiry forms.',
      bullets: [
        'Lighthouse performance scores target 90+',
        'Elimination of structural friction to improve response rates',
        'Responsive layouts optimized for modern smartphone viewports',
        'Secure, direct form submissions to prevent webhook delays'
      ]
    },

    {
      id: 'crm',
      title: 'CRM Integration',
      icon: <Database className="w-5 h-5 text-[#FF6B00]" />,
      summary: 'Pipeline organization and clear, centralized boards.',
      deepDive: 'We configure structured lead databases (such as Airtable or standard CRMs) so your sales team always has clear visibility of active buyers, budget preferences, and contact history.',
      bullets: [
        'Centralized dashboard mapping incoming buyer inquiries',
        'Webhook automation to route enquiries in real-time',
        'Custom columns tracking follow-up status and site-visit bookings',
        'GDPR and local data storage privacy configuration'
      ]
    },
    {
      id: 'reporting',
      title: 'Performance Reporting',
      icon: <LineChart className="w-5 h-5 text-[#FF6B00]" />,
      summary: 'Transparent, weekly, and data-informed audits.',
      deepDive: 'No vanity metrics or impressions fluff. We provide honest reports showing exactly where your advertising budget went, how many real enquiries were generated, and the current cost per active conversation.',
      bullets: [
        'Weekly breakdown of CPL (Cost Per Lead) metrics',
        'Clear allocation audits across active campaigns',
        'Open, shared access to all ad accounts and platform settings',
        'Strategic recommendations based purely on campaign data'
      ]
    },
    {
      id: 'strategy',
      title: 'Strategic Architecture',
      icon: <Sparkles className="w-5 h-5 text-[#FF6B00]" />,
      summary: 'Market research, funnel planning, and structural planning.',
      deepDive: 'We build with intent. Before publishing campaigns, we study competitor listings, pricing structures, and audience dynamics to define exact unique selling propositions.',
      bullets: [
        'Deep-dive competitor ad campaign tracking',
        'Audience intent mapping across Google and Meta platforms',
        'Structural funnel design to optimize user flow',
        'Strategic consultation calls to align on project updates'
      ]
    },
    {
      id: 'creative',
      title: 'Creative Asset Support',
      icon: <Layers className="w-5 h-5 text-[#FF6B00]" />,
      summary: 'High-contrast graphic templates and clean copy.',
      deepDive: 'We design modern, minimalistic graphic assets and write clear, professional ad copy that articulates property details and payment structures without resorting to clickbait.',
      bullets: [
        'Minimalistic, brand-aligned visual design',
        'Compelling, honest copywriting that qualifies readers',
        'Formatting templates optimized for social platforms',
        'High-contrast layouts focusing purely on conversion'
      ]
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-32 pb-16 sm:pb-24 font-sans bg-brand-light">

      {/* WHAT'S INCLUDED - EXPANDABLE FEATURE BLOCKS */}
      <section 
        id="services-features" 
        ref={featuresRef}
        className="pt-24 sm:pt-28 md:pt-36 max-w-5xl mx-auto px-6"
      >
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[#FF6B00] text-xs tracking-[0.2em] font-sans-clean font-bold uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2">
              ECOSYSTEM MODULES
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-brand-dark tracking-tight">
              Ecosystem Features Explained
            </h1>
            <p className="font-sans-clean text-neutral-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              We focus on implementing clean digital components. Click any feature block to review its technical parameters.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feat) => {
              const isFeatExpanded = expandedFeature === feat.id;
              return (
                <div
                  key={feat.id}
                  className={`p-6 md:p-8 rounded-[24px] border bg-white transition-all duration-300 ${
                    isFeatExpanded 
                      ? 'border-[#FF6B00]/30 shadow-[0_15px_35px_rgba(255,107,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.85)]' 
                      : 'border-neutral-200/60 shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-[#FF6B00]/20'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFeature(isFeatExpanded ? null : feat.id)}
                    className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0">
                        {feat.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-brand-dark group-hover:text-[#FF6B00] transition-colors">{feat.title}</h3>
                        <p className="text-xs font-sans-clean text-neutral-500 line-clamp-1">{feat.summary}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500">
                      {isFeatExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isFeatExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-neutral-100/80 mt-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                          <div className="md:col-span-7 space-y-3">
                            <span className="text-[10px] font-mono-num font-medium text-neutral-400 uppercase tracking-widest block">Implementation Philosophy</span>
                            <p className="text-sm font-sans-clean text-neutral-500 leading-relaxed">
                              {feat.deepDive}
                            </p>
                          </div>

                          <div className="md:col-span-5 space-y-3">
                            <span className="text-[10px] font-mono-num font-medium text-neutral-400 uppercase tracking-widest block">Technical Standards</span>
                            <ul className="space-y-2">
                              {feat.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-600 font-sans-clean font-semibold">
                                  <Check className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" strokeWidth={3} />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* SECTION 4: HOW ENGAGEMENT WORKS - ANIMATED TIMELINE */}
      <section 
        id="services-engagement" 
        ref={engagementRef}
        className="max-w-7xl mx-auto px-6 py-12"
      >
        <div className="space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono-num font-medium tracking-widest text-[#FF6B00] uppercase block">
              ENGAGEMENT PATHWAY
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark tracking-tight">
              Our Collaborative Process
            </h2>
            <p className="font-sans-clean text-neutral-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              We maintain clear, structured steps to align goals, deploy assets, and audit performance metrics.
            </p>
          </div>

          <div className="relative">
            {/* Horizontal progress line for desktop */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-neutral-200 hidden lg:block z-0 overflow-hidden">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isEngagementInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-neutral-200 via-[#FF6B00]/40 to-neutral-200 origin-left"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {[
                { step: '01', title: 'Discovery Call', subtitle: 'Understand business parameters, listing locations, and target developer goals.' },
                { step: '02', title: 'Planning', subtitle: 'Identify high-intent keywords, map custom conversion funnels, and draft campaign budgets.' },
                { step: '03', title: 'Build', subtitle: 'Construct conversion-optimized landing portals and configure secure CRM webhook pipelines.' },
                { step: '04', title: 'Launch', subtitle: 'Activate search/social ad groups, monitor parameter captures, and verify system integrity.' },
                { step: '05', title: 'Monthly Optimization', subtitle: 'Prune non-converting keywords, adjust bid weights, and audit overall channel efficiency.' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isEngagementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="p-6 rounded-[22px] bg-white border border-neutral-200/50 hover:border-[#FF6B00]/20 shadow-[0_4px_15px_rgba(0,0,0,0.01)] transition-all duration-300 text-center flex flex-col items-center group cursor-default"
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-neutral-100 flex items-center justify-center font-mono-num font-bold text-[#FF6B00] text-sm shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.02)] group-hover:scale-105 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-base font-sans-clean font-bold text-brand-dark mt-5 group-hover:text-[#FF6B00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans-clean text-neutral-500 mt-2 leading-relaxed max-w-[200px]">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CLOSING CTA */}
      <section 
        id="services-cta" 
        ref={ctaRef}
        className="max-w-5xl mx-auto px-6"
      >
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8 }}
          className="rounded-[32px] bg-brand-dark text-white p-10 md:p-14 text-center relative overflow-hidden shadow-2xl space-y-8"
        >
          {/* Subtle light leak for premium touch */}
          <div className="absolute top-0 right-1/4 w-80 h-32 bg-[#FF6B00]/10 blur-[80px] pointer-events-none" />

          <div className="space-y-3">
            <span className="text-[#FF6B00] text-xs font-mono-num font-medium tracking-widest uppercase block">GET IN TOUCH</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
              Let's Build Your Lead Generation System.
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
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage('get-started');
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 font-sans-clean font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Custom Proposal</span>
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
