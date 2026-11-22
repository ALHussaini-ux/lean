import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Hello from './pages/Hello';
import NotFound from './pages/NotFound';
import { BlogIndex, BlogPost } from './pages/Blog';
import { SmoothScroll, scrollToTarget, useLenis } from './lib/motion';

function Shell() {
  const location = useLocation();
  const lenis = useLenis();

  // Jump to a #section when arriving with a hash (e.g. /services#ads)
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const t = setTimeout(() => scrollToTarget(lenis, id), 450);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash, lenis]);

  const hideFooterCta = location.pathname === '/contact' || location.pathname === '/get-started' || location.pathname === '/hello';

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-grow">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (!window.location.hash) scrollToTarget(lenis, 0, true);
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-started" element={<Contact canonicalPath="/contact" noindex />} />
            <Route path="/hello" element={<Hello />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer showCta={!hideFooterCta} />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <Shell />
    </SmoothScroll>
  );
}
