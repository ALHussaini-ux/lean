import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from './icons';

const TYPEWRITER_PHRASES = [
  'Appointments',
  'Qualified leads',
  'More property sales',
] as const;

const LONGEST_PHRASE = 'More property sales';
const TYPING_SPEED_MS = 34;
const DELETING_SPEED_MS = 18;
const PAUSE_AFTER_TYPING_MS = 1000;
const PAUSE_AFTER_DELETING_MS = 120;

export default function MinimalHero() {
  const navigate = useNavigate();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Listen for OS/browser reduced-motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Continuous typewriter state machine with clean timer lifecycle management
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhraseIndex(0);
      setDisplayedText(TYPEWRITER_PHRASES[0]);
      setIsDeleting(false);
      return;
    }

    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, TYPING_SPEED_MS);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPING_MS);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, DELETING_SPEED_MS);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }, PAUSE_AFTER_DELETING_MS);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex, prefersReducedMotion]);

  const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
  const visibleText = prefersReducedMotion ? TYPEWRITER_PHRASES[0] : displayedText;
  const isActivelyTypingOrDeleting =
    !prefersReducedMotion &&
    ((!isDeleting && displayedText.length < currentPhrase.length) ||
      (isDeleting && displayedText.length > 0));

  const handleLetsTalk = () => {
    navigate('/contact');
  };

  const handleHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/services');
    }
  };

  return (
    <section
      id="home-hero"
      data-header-theme="light"
      className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-center items-center bg-[#FAFAFA] text-neutral-900 overflow-hidden selection:bg-brand-orange selection:text-white text-center"
    >
      {/* ABSTRACT FLOWING LIGHT RIBBONS BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle Organic Grain Overlay for smooth tactile depth */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02] mix-blend-overlay">
          <filter id="hero-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        {/* Ribbon 1: Upper Diagonal Soft Light Stream */}
        <motion.div
          animate={{
            x: ['-12%', '14%', '-8%', '-12%'],
            y: ['-8%', '10%', '12%', '-8%'],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-[18%] -left-[12%] w-[1100px] h-[380px] sm:w-[1450px] sm:h-[480px] rounded-[100%] rotate-[-22deg] bg-gradient-to-r from-[#FF7A1A]/16 via-[#FF8C33]/10 to-transparent blur-[130px] sm:blur-[160px] transform-gpu"
        />

        {/* Ribbon 2: Center-Right Sweeping Light Stream */}
        <motion.div
          animate={{
            x: ['12%', '-14%', '8%', '12%'],
            y: ['8%', '-12%', '-6%', '8%'],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[12%] -right-[18%] w-[1200px] h-[420px] sm:w-[1550px] sm:h-[520px] rounded-[100%] rotate-[28deg] bg-gradient-to-l from-[#FF7A1A]/17 via-[#FFA352]/09 to-transparent blur-[140px] sm:blur-[170px] transform-gpu"
        />

        {/* Ribbon 3: Bottom Horizontal Light Ribbon */}
        <motion.div
          animate={{
            x: ['-8%', '10%', '-12%', '-8%'],
            y: ['10%', '-8%', '6%', '10%'],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-[12%] left-[2%] w-[1250px] h-[360px] sm:w-[1600px] sm:h-[460px] rounded-[100%] rotate-[-10deg] bg-gradient-to-r from-transparent via-[#FF7A1A]/14 to-[#FFB366]/06 blur-[130px] sm:blur-[165px] transform-gpu"
        />

        {/* Ribbon 4: Central Ambient Light Core Sheen */}
        <motion.div
          animate={{
            x: ['6%', '-8%', '10%', '6%'],
            y: ['-6%', '8%', '-8%', '-6%'],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[28%] left-[12%] w-[900px] h-[300px] sm:w-[1200px] sm:h-[380px] rounded-[100%] rotate-[14deg] bg-radial from-[#FF7A1A]/12 via-[#FF8C33]/05 to-transparent blur-[120px] sm:blur-[150px] transform-gpu"
        />
      </div>

      {/* Subtle top & bottom linear vignette transitions for smooth section blending */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-1" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-1" />

      {/* Main Content Layout - Perfectly Centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-10 lg:px-16 pt-24 sm:pt-36 md:pt-40 pb-12 sm:pb-24 w-full flex flex-col items-center justify-center">
        <div className="space-y-6 sm:space-y-10 text-center flex flex-col items-center max-w-4xl w-full">
          
          {/* Centered Headline with Typewriter Final Phrase */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-center tracking-[-0.035em] text-neutral-900 leading-[1.08] sm:leading-[1.05] selection:bg-brand-orange selection:text-white w-full"
          >
            <span className="block text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-semibold text-neutral-900 tracking-[-0.035em]">
              Engineering lead systems
            </span>
            <span className="block text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-semibold text-neutral-800 tracking-[-0.035em] mt-0.5 sm:mt-1">
              that create
            </span>

            <span className="grid place-items-center w-full max-w-full mt-1.5 sm:mt-3 py-0.5 text-[clamp(1.05rem,5.2vw,2.2rem)] sm:text-[clamp(2.05rem,5.1vw,3.45rem)] leading-[1.2] font-extrabold text-brand-orange tracking-[-0.035em]">
              <span className="sr-only">{currentPhrase}</span>
              {/* Invisible longest-phrase sizer reserves exact height and width to prevent layout shifts */}
              <span
                aria-hidden="true"
                className="col-start-1 row-start-1 invisible pointer-events-none select-none block w-full max-w-full text-center px-1 break-words"
              >
                {LONGEST_PHRASE}
                <span className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.82em] ml-[0.08em] align-[-0.08em]" />
              </span>
              {/* Live centered typewriter phrase + subtle blinking caret */}
              <span
                aria-hidden="true"
                className="col-start-1 row-start-1 block w-full max-w-full text-center px-1 break-words"
              >
                <span>{visibleText || '\u200B'}</span>
                {!prefersReducedMotion && (
                  <span
                    className={`inline-block w-[2.5px] sm:w-[3.5px] h-[0.82em] ml-[0.08em] align-[-0.08em] rounded-[1px] bg-brand-orange/85 ${
                      isActivelyTypingOrDeleting ? 'opacity-100' : 'animate-caret-blink'
                    }`}
                  />
                )}
              </span>
            </span>
          </motion.h1>

          {/* Supporting Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-lg md:text-xl text-neutral-600 font-sans-clean font-normal leading-relaxed max-w-2xl text-center tracking-[-0.01em] px-2"
          >
            We build simple CRM, lead management and automation systems that help real estate developers capture enquiries, stay organised and respond faster.
          </motion.p>

          {/* Centered Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto px-4 sm:px-0"
          >
            {/* Primary Button */}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLetsTalk();
              }}
              className="group relative w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-sans-clean font-bold text-sm sm:text-base rounded-full shadow-[0_4px_20px_rgba(255,140,66,0.3)] hover:shadow-[0_6px_25px_rgba(255,140,66,0.4)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>

            {/* Secondary Button */}
            <a
              href="/#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleHowItWorks();
              }}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-1.5 px-8 py-3.5 bg-white hover:bg-neutral-100/80 text-neutral-900 font-sans-clean font-bold text-sm sm:text-base rounded-full border border-neutral-200/80 hover:border-neutral-300 shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span>How It Works</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



