import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Page } from './types';
import { SERVICES, PRICING_TIERS, COMPANY_VALUES, GENERAL_FAQS, PRICING_FAQS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadPortal from './components/LeadPortal';
import AramcoButton from './components/AramcoButton';
import Hero3DBackground from './components/Hero3DBackground';
import HeroInteractiveDashboard from './components/HeroInteractiveDashboard';
import MetricsGlass from './components/MetricsGlass';
import ServicesBento from './components/ServicesBento';
import HowItWorksTimeline from './components/HowItWorksTimeline';
import AboutPremium from './components/AboutPremium';
import ServicesPremium from './components/ServicesPremium';
import BlogPremium from './components/BlogPremium';
import ContactPremium from './components/ContactPremium';
import HelloPrivateCard from './components/HelloPrivateCard';
import MinimalHero from './components/MinimalHero';
import PageMetadata from './components/PageMetadata';
import { ArrowRight, Check, X, Shield, ChevronDown, ChevronUp, Clock, AlertTriangle, Layers, MessageSquare, Zap, Smartphone, Cpu } from './components/icons';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Auto-advance slider with progress bar (Only runs on Home View `/`)
  useEffect(() => {
    if (!isHome) return;
    
    setSlideProgress(0);
    const startTime = Date.now();
    const duration = 5000; // 5 seconds
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setSlideProgress(pct);
      
      if (elapsed >= duration) {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }
    }, 40);
    
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

                {/* MINIMALIST HERO SECTION (APPLE / LINEAR STYLE) */}
                <MinimalHero />

                {/* REDESIGNED LIQUID GLASS METRICS SECTION */}
                <MetricsGlass />

                {/* REDESIGNED SERVICES BENTO GRID */}
                <ServicesBento />

                {/* REDESIGNED HOW IT WORKS TIMELINE */}
                <HowItWorksTimeline />

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

            {/* ==================== 6. PRIVATE BUSINESS CARD VIEW (/hello) ==================== */}
            <Route path="/hello" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <HelloPrivateCard />
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
