import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Page } from './types';
import { SERVICES, PRICING_TIERS, COMPANY_VALUES, GENERAL_FAQS, PRICING_FAQS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadPortal from './components/LeadPortal';
import AramcoButton from './components/AramcoButton';
import Hero3DBackground from './components/Hero3DBackground';
import MetricsGlass from './components/MetricsGlass';
import ServicesBento from './components/ServicesBento';
import HowItWorksTimeline from './components/HowItWorksTimeline';
import AboutPremium from './components/AboutPremium';
import ServicesPremium from './components/ServicesPremium';
import BlogPremium from './components/BlogPremium';
import ContactPremium from './components/ContactPremium';
import PageMetadata from './components/PageMetadata';
import { ArrowRight, Check, X, Shield, ChevronDown, ChevronUp, Clock, AlertTriangle, Layers, MessageSquare, Zap, Smartphone, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedPricingFaq, setExpandedPricingFaq] = useState<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Legacy page callback adapter to keep ServicesPremium and AboutPremium fully compatible
  const legacySetPage = (page: Page) => {
    if (page === 'home') navigate('/');
    else if (page === 'get-started' || page === 'contact') navigate('/contact');
    else navigate(`/${page}`);
  };

  const HERO_SLIDES = [
    {
      category: 'REAL ESTATE GROWTH SYSTEMS',
      title: 'Generate qualified leads, automate customer replies, and close deals with systems built for developers.',
      subheading: 'We help you attract interested buyers, respond instantly to enquiries, and track every lead. Modern systems replace outdated marketing methods.',
      ctaText: 'Schedule a Demo',
      action: () => handleCTA('/contact')
    },
    {
      category: 'LEAD GENERATION PIPELINE',
      title: 'Google and Meta Ads campaigns optimized specifically for Indian real estate.',
      subheading: 'Qualified buyers searching for your project, not random clicks. Focus budget on people with high intent to purchase.',
      ctaText: 'Explore Service Tiers',
      action: () => handleCTA('/services')
    },
    {
      category: 'WHATSAPP AUTOMATION',
      title: 'Brochure dispatch within 60 seconds and site visit scheduling 24/7.',
      subheading: 'Outperform slow human responses. WhatsApp bots engage prospects immediately when their interest is highest.',
      ctaText: 'Explore Service Tiers',
      action: () => handleCTA('/services')
    },
    {
      category: 'INFRASTRUCTURE YOU CONTROL',
      title: 'Predictable growth pipeline built into your business, not bolted onto it.',
      subheading: 'Own your landing pages, ad accounts, and databases. We set up systems that empower you, with no vendor lock-in.',
      ctaText: 'Build Your System',
      action: () => handleCTA('/contact')
    }
  ];

  // Auto-advance slider every 5 seconds (Only runs on Home View `/`)
  useEffect(() => {
    if (!isHome) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHome, currentSlide]);

  const handleCTA = (path: string, hash?: string) => {
    if (location.pathname !== path) {
      navigate(path);
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const togglePricingFaq = (index: number) => {
    setExpandedPricingFaq(expandedPricingFaq === index ? null : index);
  };

  return (
    <div id="lean-app" className="min-h-screen bg-white text-brand-dark flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      
      {/* 1. STICKY HEADER */}
      <Header setCurrentPage={legacySetPage} />

      {/* Main Content Area with Routes and Page-Level Transitions */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            
            {/* ==================== 1. HOME VIEW ==================== */}
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-24 pb-24"
              >
                <PageMetadata 
                  title="LEAN Growth Systems | Lead Infrastructure for Real Estate"
                  description="We build high-conversion digital advertising pipelines and automated WhatsApp communication systems specifically for Indian property builders and developers."
                />

                {/* HERO SECTION WITH THREE.JS PARTICLE FIELDS & DETAILED CONTENT */}
                <section 
                  id="home-hero" 
                  data-header-theme="dark"
                  className="relative h-screen min-h-[650px] flex flex-col justify-between text-white px-6 md:px-16 lg:px-24 pt-32 pb-12 overflow-hidden bg-brand-dark"
                >
                  <Hero3DBackground activeTab={currentSlide} />

                  {/* Dark photorealistic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-black/40 to-black/50 pointer-events-none z-[2]" />
                  
                  {/* Left-Aligned content block representing current carousel slide */}
                  <div className="max-w-4xl z-10 space-y-5 mt-auto mb-6 pl-0 md:pl-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <span className="text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold text-brand-orange uppercase block">
                          {HERO_SLIDES[currentSlide].category}
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] font-sans font-black text-white tracking-tight leading-[1.12] max-w-3xl">
                          {HERO_SLIDES[currentSlide].title}
                        </h1>

                        <p className="font-body text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                          {HERO_SLIDES[currentSlide].subheading}
                        </p>

                        <div className="pt-4">
                          <AramcoButton
                            onClick={HERO_SLIDES[currentSlide].action}
                            variant="white"
                          >
                            {HERO_SLIDES[currentSlide].ctaText}
                          </AramcoButton>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Horizontal indicator slider tabs */}
                  <div className="w-full max-w-7xl mx-auto border-t border-white/10 pt-4 z-10 pl-0 md:pl-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                      {HERO_SLIDES.map((slide, idx) => {
                        const isActive = currentSlide === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className="text-left group cursor-pointer focus:outline-none relative pb-4 transition-all duration-300"
                          >
                            <span className={`text-[10px] md:text-[11px] font-sans font-bold tracking-[0.1em] uppercase transition-all duration-300 block ${
                              isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                            }`}>
                              {slide.category.split(' ')[0]} {slide.category.split(' ')[1] || ''}
                            </span>
                            
                            {isActive && (
                              <motion.div
                                layoutId="activeHeroSlideUnderline"
                                className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-orange rounded-full"
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>

                {/* REDESIGNED LIQUID GLASS METRICS SECTION */}
                <MetricsGlass />

                {/* REDESIGNED SERVICES BENTO GRID */}
                <ServicesBento />

                {/* REDESIGNED HOW IT WORKS TIMELINE */}
                <HowItWorksTimeline />

                {/* WHAT SUCCESS LOOKS LIKE SECTION */}
                <section id="success-indicators" data-header-theme="dark" className="bg-neutral-900 text-white py-20 border-y border-neutral-800">
                  <div className="max-w-7xl mx-auto px-6">
                    
                    <div className="text-center mb-16 space-y-2">
                      <span className="text-brand-orange text-xs tracking-widest font-sans font-bold uppercase inline-block border-b-2 border-brand-orange pb-2 mb-2">
                        COMPARATIVE METRICS
                      </span>
                      <h2 className="text-2xl md:text-4xl font-sans font-black text-white tracking-tight">
                        What Success Looks Like
                      </h2>
                      <p className="font-body text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                        An honest side-by-side comparison between LEAN systems and outdated marketing models.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
                      
                      {/* Left: SUCCESS */}
                      <div className="bg-neutral-950 border border-emerald-500/20 rounded-sm p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                        <h3 className="font-sans font-extrabold text-lg text-emerald-400 flex items-center gap-2 uppercase tracking-wide">
                          <Check className="w-5 h-5 shrink-0" />
                          SUCCESS WITH LEAN
                        </h3>
                        
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-200">Direct Webhook Lead Flow</h4>
                              <p className="text-xs text-neutral-400 leading-relaxed font-body">Prospective buyers receive WhatsApp brochure parameters in under 60 seconds.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-200">Steady Qualified Site Visits</h4>
                              <p className="text-xs text-neutral-400 leading-relaxed font-body">Calendar bookings populate automatically from pre-vetted ad clickers.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-200">Transparent Attribution</h4>
                              <p className="text-xs text-neutral-400 leading-relaxed font-body">You know exactly which search query, ad asset, and routing pipeline closed the deal.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-200">Total Infrastructure Ownership</h4>
                              <p className="text-xs text-neutral-400 leading-relaxed font-body">You own landing files, databases, and ad accounts. No vendor locking.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-200">High-Velocity Sales Conversion</h4>
                              <p className="text-xs text-neutral-400 leading-relaxed font-body">Sales teams focus 100% on ready-to-buy prospects instead of hunting for phone numbers.</p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* Right: NOT SUCCESS */}
                      <div className="bg-neutral-950 border border-red-500/10 rounded-sm p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                        <h3 className="font-sans font-extrabold text-lg text-red-400 flex items-center gap-2 uppercase tracking-wide">
                          <X className="w-5 h-5 shrink-0" />
                          NOT SUCCESS (OUTDATED METHODS)
                        </h3>
                        
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center text-xs shrink-0 font-bold">✕</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-300">Human-Dependent Dispatch</h4>
                              <p className="text-xs text-neutral-500 leading-relaxed font-body">Hours or days of delay before an executive manually sends project layout files.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center text-xs shrink-0 font-bold">✕</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-300">Raw Unqualified Bandwidth Drain</h4>
                              <p className="text-xs text-neutral-500 leading-relaxed font-body">Sales executives cold-calling random contacts who just wanted to browse images.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center text-xs shrink-0 font-bold">✕</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-300">Blind Advertising Speculation</h4>
                              <p className="text-xs text-neutral-500 leading-relaxed font-body">Spending lakhs on impressions with zero visibility on actual client site visits or sales.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center text-xs shrink-0 font-bold">✕</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-300">Absolute Vendor Lock-in</h4>
                              <p className="text-xs text-neutral-500 leading-relaxed font-body">Standard agencies shut down your site and ad accounts the minute you cancel their contract.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-red-950/40 text-red-400 border border-red-500/20 flex items-center justify-center text-xs shrink-0 font-bold">✕</span>
                            <div className="space-y-0.5">
                              <h4 className="font-sans font-bold text-xs sm:text-sm text-neutral-300">Wasted Broker commissions</h4>
                              <p className="text-xs text-neutral-500 leading-relaxed font-body">Paying huge brokerage commissions because you can't reach direct property buyers on your own.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* GENERAL FAQ SECTION */}
                <section id="general-faqs" className="max-w-4xl mx-auto px-6 scroll-mt-24">
                  <div className="text-center mb-12 space-y-2">
                    <span className="text-brand-orange text-xs tracking-widest font-sans font-bold uppercase inline-block border-b-2 border-brand-orange pb-2 mb-2">
                      HAVE QUESTIONS?
                    </span>
                    <h2 className="text-2xl md:text-3xl font-sans font-black text-brand-dark tracking-tight">
                      Frequently Asked Questions
                    </h2>
                    <p className="font-body text-brand-gray text-xs sm:text-sm max-w-lg mx-auto">
                      Direct, transparent answers regarding lead quality, timelines, ownership, and systems.
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-neutral-200 pt-6">
                    {GENERAL_FAQS.map((faq, idx) => {
                      const isOpen = expandedFaq === idx;
                      return (
                        <div key={idx} className="border-b border-neutral-200 pb-4 last:border-b-0">
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex items-center justify-between text-left py-3 group cursor-pointer focus:outline-none"
                          >
                            <span className="font-sans font-extrabold text-sm sm:text-base text-brand-navy group-hover:text-brand-orange transition-colors duration-200">
                              {faq.q}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-brand-orange shrink-0 ml-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-brand-orange shrink-0 ml-4" />
                            )}
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <p className="font-body text-brand-gray text-xs sm:text-sm leading-relaxed pt-2 pb-4 px-1 bg-brand-light/50 rounded-sm">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* BOTTOM CTA: DIRECT CONTACT CONVERSION */}
                <section id="contact" className="border-t border-neutral-200 pt-16 scroll-mt-24">
                  <LeadPortal />
                </section>

              </motion.div>
            } />

            {/* ==================== 2. SERVICES VIEW ==================== */}
            <Route path="/services" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PageMetadata 
                  title="Service Tiers & Deliverables | LEAN Growth Systems"
                  description="Explore our Starter, Growth, and Premium service plans optimized for real estate ads, ultra-fast landing pages, and WhatsApp brochure automations."
                />
                <ServicesPremium setCurrentPage={legacySetPage} />
              </motion.div>
            } />

            {/* ==================== 3. ABOUT VIEW ==================== */}
            <Route path="/about" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PageMetadata 
                  title="Our Methodology | LEAN Growth Systems"
                  description="Learn about our process-driven lead capture infrastructure, engineering standards, and zero vendor lock-in guidelines built to empower modern developers."
                />
                <AboutPremium setCurrentPage={legacySetPage} />
              </motion.div>
            } />

            {/* ==================== 4. BLOG VIEW ==================== */}
            <Route path="/blog" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PageMetadata 
                  title="The LEAN Bulletin | Technical Studies & Real Estate Insights"
                  description="Expert breakdowns, digital advertising optimization studies, and real estate marketing automation briefs with direct database integration."
                />
                <BlogPremium />
              </motion.div>
            } />

            {/* ==================== 5. CONTACT VIEW ==================== */}
            <Route path="/contact" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PageMetadata 
                  title="Get Started & Schedule System Audit | LEAN Growth Systems"
                  description="Schedule a 30-minute growth consultation or submit your project details. Let's analyze your current digital marketing parameters and build your system."
                />
                <ContactPremium />
              </motion.div>
            } />

            {/* fallback redirect for legacy page links */}
            <Route path="/get-started" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PageMetadata 
                  title="Get Started & Schedule System Audit | LEAN Growth Systems"
                  description="Schedule a 30-minute growth consultation or submit your project details. Let's analyze your current digital marketing parameters and build your system."
                />
                <ContactPremium />
              </motion.div>
            } />

          </Routes>
        </AnimatePresence>
      </main>

      {/* 6. FOOTER */}
      <Footer setCurrentPage={legacySetPage} />

    </div>
  );
}
