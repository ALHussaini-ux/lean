import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOverDarkBg, setIsOverDarkBg] = useState(true);

  useEffect(() => {
    const checkBackground = () => {
      // Find all elements with data-header-theme="dark"
      const darkSections = document.querySelectorAll('[data-header-theme="dark"]');
      let overDark = false;
      const headerHeight = 90; // Height of interest at top of screen

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // If a dark section is overlapping the header's vertical position
        if (rect.top <= headerHeight && rect.bottom >= 20) {
          overDark = true;
        }
      });

      setIsOverDarkBg(overDark);
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      checkBackground();
    };

    // Run initial checks
    checkBackground();
    
    // Register event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkBackground, { passive: true });

    // Use MutationObserver to watch for route/page changes or layout reflows dynamically
    const observer = new MutationObserver(checkBackground);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkBackground);
      observer.disconnect();
    };
  }, [currentPage]);

  const navItems: { label: string; value: Page; hash?: string; disabled?: boolean }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Services', value: 'services' },
    { label: 'How It Works', value: 'home', hash: 'how-it-works' },
    { label: 'Blog', value: 'home', hash: 'blog', disabled: true },
    { label: 'Contact', value: 'home', hash: 'contact' }
  ];

  const handleNav = (page: Page, hash?: string) => {
    setCurrentPage(page);
    setIsOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="app-header" 
      className={`fixed top-4 inset-x-0 mx-auto max-w-[94%] sm:max-w-[88%] lg:max-w-5xl w-full z-50 transition-all duration-300 font-sans ${
        isOpen ? 'rounded-2xl' : 'rounded-full'
      } ${
        isOverDarkBg 
          ? 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.25),0_12px_40px_rgba(0,0,0,0.25)]' 
          : 'bg-white/70 backdrop-blur-2xl border border-neutral-200/50 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.6),0_12px_40px_rgba(0,0,0,0.06)]'
      } ${
        scrolled ? 'py-1.5' : 'py-2'
      }`}
    >
      {/* Main Nav Bar Content */}
      <div className="px-4 sm:px-6 h-12 sm:h-14 flex items-center justify-between relative">
        
        {/* Left Side Logo */}
        <div 
          id="brand-logo"
          className="flex items-center gap-2.5 cursor-pointer select-none group pl-1.5"
          onClick={() => handleNav('home')}
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5" 
            alt="LEAN Logo"
            referrerPolicy="no-referrer"
            className={`h-7 sm:h-8 w-auto object-contain transition-all duration-300 group-hover:scale-[1.04] ${
              isOverDarkBg ? 'brightness-0 invert' : ''
            }`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://drive.google.com/thumbnail?id=1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5&sz=w1000";
            }}
          />
        </div>

        {/* Centered Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          {navItems.map((item, index) => {
            const isActive = currentPage === item.value && !item.hash;
            const isContact = item.label === 'Contact';
            return (
              <React.Fragment key={index}>
                {isContact && (
                  <span className={`select-none font-light text-[13px] mx-1 transition-colors duration-300 ${
                    isOverDarkBg ? 'text-white/20' : 'text-neutral-300'
                  }`}>|</span>
                )}
                <button
                  id={`nav-item-${index}`}
                  disabled={item.disabled}
                  onClick={() => handleNav(item.value, item.hash)}
                  className={`relative py-1 text-[13px] font-sans font-medium tracking-wide transition-colors duration-300 cursor-pointer select-none ${
                    item.disabled 
                      ? isOverDarkBg ? 'text-white/40 cursor-not-allowed' : 'text-neutral-400 cursor-not-allowed'
                      : isActive 
                        ? 'text-brand-orange font-bold' 
                        : isOverDarkBg 
                          ? 'text-white/85 hover:text-white' 
                          : 'text-neutral-700 hover:text-brand-orange'
                  }`}
                >
                  {item.label}
                  {isActive && !item.disabled && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right Side Call To Action */}
        <div className="flex items-center gap-4 pr-1.5">
          {/* Desktop Capsule Button */}
          <div className="hidden sm:block">
            <button
              id="cta-get-started-desktop"
              onClick={() => handleNav('get-started')}
              className="bg-gradient-to-r from-brand-orange to-orange-500 hover:from-orange-500 hover:to-brand-orange text-white px-5 py-2 rounded-full font-sans font-bold text-[13px] tracking-wide shadow-[0_4px_14px_rgba(255,140,66,0.3)] hover:shadow-[0_6px_20px_rgba(255,140,66,0.45)] hover:scale-[1.02] transition-all duration-300 cursor-pointer active:scale-[0.98] focus:outline-none"
            >
              Get started
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
                isOverDarkBg ? 'text-white hover:text-brand-orange' : 'text-neutral-700 hover:text-brand-orange'
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Expanding Drawer (Fluid Liquid Container) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden lg:hidden px-5 pb-5"
          >
            <div className={`flex flex-col space-y-3.5 pt-4 border-t ${
              isOverDarkBg ? 'border-white/10' : 'border-neutral-100'
            }`}>
              {navItems.map((item, index) => {
                const isActive = currentPage === item.value && !item.hash;
                return (
                  <button
                    key={index}
                    id={`mobile-nav-item-${index}`}
                    disabled={item.disabled}
                    onClick={() => handleNav(item.value, item.hash)}
                    className={`text-left font-sans font-medium text-[14px] py-1 transition-colors ${
                      item.disabled
                        ? isOverDarkBg ? 'text-white/30 cursor-not-allowed' : 'text-neutral-300 cursor-not-allowed'
                        : isActive
                          ? 'text-brand-orange font-bold'
                          : isOverDarkBg
                            ? 'text-white/80 hover:text-white'
                            : 'text-neutral-600 hover:text-brand-orange'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-2">
                <button
                  id="mobile-nav-cta"
                  onClick={() => handleNav('get-started')}
                  className="w-full bg-gradient-to-r from-brand-orange to-orange-500 hover:from-orange-500 hover:to-brand-orange text-white py-2.5 rounded-full font-sans font-bold text-xs tracking-wide shadow-md transition-all duration-300"
                >
                  Get started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
