import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user prefers reduced motion.
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Refreshes ScrollTrigger calculations (call on route change or DOM resize).
 */
export const refreshScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
};

export { gsap, ScrollTrigger };
