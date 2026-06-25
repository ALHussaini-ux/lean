import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AramcoButton from './AramcoButton';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page; hash?: string; disabled?: boolean }[] = [
    { label: 'HOME', value: 'home' },
    { label: 'ABOUT', value: 'about' },
    { label: 'SERVICES', value: 'services' },
    { label: 'HOW IT WORKS', value: 'home', hash: 'how-it-works' },
    { label: 'BLOG', value: 'home', hash: 'blog', disabled: true },
    { label: 'CONTACT', value: 'home', hash: 'contact' }
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
    <>
      <header 
        id="app-header" 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          scrolled || currentPage !== 'home'
            ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg border-b border-white/10 py-1' 
            : 'bg-transparent border-b border-white/5 py-2'
        }`}
      >


        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-18 flex items-center justify-between relative">
          
          {/* Logo on Left */}
          <div 
            id="brand-logo"
            className="flex flex-col items-start cursor-pointer select-none z-10 group"
            onClick={() => handleNav('home')}
          >
            <img 
              src="https://lh3.googleusercontent.com/d/1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5" 
              alt="LEAN Logo"
              referrerPolicy="no-referrer"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://drive.google.com/thumbnail?id=1LFCv9BinE7S_-D4Fuf2MrPLf_KAUA-K5&sz=w1000";
              }}
            />
            <span className="text-[8px] md:text-[9px] text-neutral-400 font-sans tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-3 mt-0 group-hover:mt-1 overflow-hidden whitespace-nowrap">
              Built for Real Estate Growth
            </span>
          </div>

          {/* Centered Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-12 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navItems.map((item, index) => {
              const isActive = currentPage === item.value && !item.hash;
              return (
                <button
                  key={index}
                  id={`nav-item-${index}`}
                  disabled={item.disabled}
                  onClick={() => handleNav(item.value, item.hash)}
                  className={`relative py-2 text-[12px] font-sans font-semibold tracking-wider transition-colors duration-200 cursor-pointer select-none uppercase ${
                    item.disabled 
                      ? 'text-neutral-600 cursor-not-allowed' 
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.label === 'BLOG' ? 'BLOG (LAUNCH LATER)' : item.label}
                  {isActive && !item.disabled && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 to-emerald-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Extra CTA & Hamburger Menu on Right */}
          <div className="flex items-center gap-6 z-10 ml-auto lg:ml-0">
            {/* Extra CTA - desktop (hidden when menu is open or on mobile screen) */}
            <div className="hidden sm:flex">
              <AramcoButton
                id="cta-get-started-desktop"
                onClick={() => handleNav('get-started')}
                variant="white"
              >
                Get started
              </AramcoButton>
            </div>

            {/* Hamburger Menu Toggle - Mobile */}
            <div className="lg:hidden flex items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 -mr-2 text-neutral-300 hover:text-white focus:outline-none w-12 h-12 flex items-center justify-center cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Slide-In Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-brand-navy border-b border-white/10 text-white lg:hidden shadow-2xl pt-2 pb-6"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navItems.map((item, index) => {
                return (
                  <button
                    key={index}
                    id={`mobile-nav-item-${index}`}
                    disabled={item.disabled}
                    onClick={() => handleNav(item.value, item.hash)}
                    className={`text-left font-sans font-bold tracking-widest text-sm py-2 border-b border-white/5 uppercase ${
                      item.disabled
                        ? 'text-neutral-600 cursor-not-allowed'
                        : 'text-neutral-200 hover:text-white'
                    }`}
                  >
                    {item.label === 'BLOG' ? 'BLOG (LAUNCH LATER)' : item.label}
                  </button>
                );
              })}
              
              <div className="flex justify-center w-full pt-4">
                <AramcoButton
                  id="mobile-nav-cta"
                  onClick={() => handleNav('get-started')}
                  variant="orange"
                  className="w-full justify-between"
                >
                  Get started
                </AramcoButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
