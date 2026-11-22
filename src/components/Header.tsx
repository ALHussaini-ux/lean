import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Button, Wordmark } from './ui';
import { EASE, useLenis } from '../lib/motion';

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > 240 && y > prev && !open);
  });

  // Close the menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock scrolling while the mobile menu is open
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open, lenis]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: hidden ? '-100%' : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled || open ? 'bg-paper/85 backdrop-blur-md border-line/70' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link to="/" aria-label="Lean System, home" className="text-ink">
            <Wordmark />
          </Link>

          <nav className="hidden md:flex items-center gap-9" aria-label="Main">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-[15px] tracking-[-0.01em] transition-colors duration-300 ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button to="/contact" className="!h-10 !px-5 !text-[14px]">
              Book a call
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden -mr-2 flex h-11 w-11 items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-paper md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="container-x flex h-full flex-col justify-between pt-28 pb-10" aria-label="Mobile">
              <ul className="space-y-1">
                {[{ to: '/', label: 'Home' }, ...NAV].map((item, i) => (
                  <li key={item.to} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease: EASE }}
                    >
                      <Link to={item.to} className="block py-2 text-[44px] font-medium leading-tight tracking-[-0.03em]">
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-1 text-muted"
              >
                <a href="mailto:hello@leansystem.co" className="block text-ink">hello@leansystem.co</a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
