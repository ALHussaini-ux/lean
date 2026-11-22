import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useInView, useReducedMotion, useScroll, useTransform, MotionValue } from 'motion/react';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* Smooth scrolling (Lenis)                                                    */
/* -------------------------------------------------------------------------- */

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(instance);

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll to an element id (or top), using Lenis when available. */
export function scrollToTarget(lenis: Lenis | null, target: string | number, immediate = false) {
  const el = typeof target === 'string' ? document.getElementById(target) : null;
  if (typeof target === 'string' && !el) return;
  if (lenis) {
    lenis.scrollTo(el ?? (target as number), { offset: el ? -88 : 0, immediate, duration: 1.2 });
  } else if (el) {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: target as number, behavior: immediate ? 'auto' : 'smooth' });
  }
}

/* -------------------------------------------------------------------------- */
/* Reveal: fade + rise when scrolled into view                                 */
/* -------------------------------------------------------------------------- */

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'p' | 'span' | 'article';
  amount?: number;
}

export function Reveal({ children, delay = 0, y = 24, className, as = 'div', amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* -------------------------------------------------------------------------- */
/* Lines: masked line-by-line headline reveal                                  */
/* -------------------------------------------------------------------------- */

interface LinesProps {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

export function Lines({ lines, className, delay = 0, stagger = 0.08, as = 'h2', immediate = false }: LinesProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const show = immediate || inView;
  const Tag = as;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block will-change-transform"
            initial={reduce ? false : { y: '105%' }}
            animate={show ? { y: '0%' } : undefined}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* ScrollText: words light up as the paragraph scrolls through the viewport   */
/* -------------------------------------------------------------------------- */

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
}

export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <React.Fragment key={i}>
            <Word progress={scrollYProgress} range={[start, end]}>
              {w}
            </Word>{' '}
          </React.Fragment>
        );
      })}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Page transition wrapper                                                    */
/* -------------------------------------------------------------------------- */

export function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
