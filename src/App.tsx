import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadPortal from './components/LeadPortal';
import AramcoButton from './components/AramcoButton';
import Hero3DBackground from './components/Hero3DBackground';
import HeroInteractiveDashboard from './components/HeroInteractiveDashboard';
import ServicesBento from './components/ServicesBento';
import HowItWorksTimeline from './components/HowItWorksTimeline';
import AboutPremium from './components/AboutPremium';
import ServicesPremium from './components/ServicesPremium';
import BlogPremium from './components/BlogPremium';
import ContactPremium from './components/ContactPremium';
import HelloPrivateCard from './components/HelloPrivateCard';
import MinimalHero from './components/MinimalHero';
import PageMetadata from './components/PageMetadata';
import { ArrowRight } from './components/icons';
import { motion, AnimatePresence } from 'motion/react';
import { gsap, ScrollTrigger, prefersReducedMotion } from './utils/scroll';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);

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
      category: 'CONVERSION LANDING PAGES',
      title: 'Ultra-fast landing pages engineered for high buyer intent.',
      subheading: 'Turn ad clicks into qualified enquiries. Mobile-first design with built-in site visit scheduling forms.',
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

  // Scroll to hash target or top on route change, and refresh ScrollTrigger
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace(/^#/, '');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        ScrollTrigger.refresh();
      }, 100);
    } else {
      window.scrollTo(0, 0);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
  }, [location.pathname, location.hash]);

  // Global subtle scroll progress indicator
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to('#global-scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        }
      });
    });

    return () => ctx.revert();
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

  return (
    <div id="lean-app" className="min-h-screen bg-white text-brand-dark flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      
      {/* Top Reading / Scroll Progress Bar */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left"
      >
        <div 
          id="global-scroll-progress" 
          className="h-full bg-gradient-to-r from-brand-orange via-[#FF8C33] to-[#FFA352] origin-left scale-x-0 will-change-transform shadow-[0_0_10px_rgba(255,122,26,0.65)]" 
        />
      </div>

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
                  title="Lean System | Real Estate Lead Generation & Automation"
                  description="Lean System builds lead generation and digital growth systems for real estate businesses in Hyderabad, India, combining targeted ads and conversion pipelines."
                />

                {/* MINIMALIST HERO SECTION (APPLE / LINEAR STYLE) */}
                <MinimalHero />

                {/* REDESIGNED SERVICES BENTO GRID */}
                <ServicesBento />

                {/* REDESIGNED HOW IT WORKS TIMELINE */}
                <HowItWorksTimeline />

                {/* BOTTOM CTA: DIRECT CONTACT CONVERSION */}
                <motion.section 
                  id="contact" 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-neutral-200 pt-16 scroll-mt-24"
                >
                  <LeadPortal />
                </motion.section>

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
                  description="Explore our Starter, Growth, and Premium service plans optimized for real estate ads, ultra-fast landing pages, and automated lead tracking pipelines."
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
                  title="About & Methodology | LEAN Growth Systems"
                  description="Learn about Lean System's process-driven lead capture infrastructure, engineering standards, and zero vendor lock-in systems built for property developers."
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

            <Route path="/blog/:slug" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PageMetadata 
                  title="The LEAN Bulletin | Technical Studies & Real Estate Insights"
                  description="Expert breakdowns, digital advertising optimization studies, and real estate marketing automation briefs with direct database integration."
                  canonicalPath="/blog"
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
                  title="Contact & Schedule System Audit | LEAN Growth Systems"
                  description="Schedule a 30-minute growth consultation or submit your project details. Let's analyze your current digital marketing parameters and build your system."
                />
                <ContactPremium />
              </motion.div>
            } />

            {/* fallback redirect for legacy page links (canonicalized to /contact, excluded from indexing) */}
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
                  canonicalPath="/contact"
                  noindex={true}
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

            {/* ==================== 7. NOT FOUND VIEW (404) ==================== */}
            <Route path="*" element={
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 space-y-6 bg-brand-light"
              >
                <PageMetadata 
                  title="Page Not Found | LEAN Growth Systems"
                  description="The requested page could not be found on Lean System."
                  noindex={true}
                />
                <span className="text-xs font-mono-num font-medium tracking-widest text-brand-orange uppercase">
                  ERROR 404
                </span>
                <h1 className="text-3xl sm:text-5xl font-display font-bold text-brand-dark tracking-tight">
                  Page Not Found
                </h1>
                <p className="font-sans-clean text-neutral-500 text-sm sm:text-base max-w-md leading-relaxed">
                  The page you are looking for doesn&apos;t exist or has been moved. Return to our homepage to explore our real estate lead systems.
                </p>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-sans-clean font-bold text-sm rounded-full transition-colors duration-200"
                >
                  <span>Back to Homepage</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
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
