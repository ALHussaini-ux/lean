import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function MinimalHero() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle Interactive Animated Dot Grid Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    // Mouse tracking state
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const spacing = 28; // Grid dot distance
    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth lerp mouse coordinates for fluid movement
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * spacing;
          const baseY = j * spacing;

          // Organic ambient subtle breath motion
          const wave = Math.sin(time + i * 0.3 + j * 0.3) * 1.2;

          // Distance to mouse cursor
          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          let offsetX = 0;
          let offsetY = 0;
          let radius = 1.1;
          let opacity = 0.18;
          let color = '160, 160, 165'; // Soft neutral grey

          if (dist < maxDist) {
            const factor = (1 - dist / maxDist);
            const angle = Math.atan2(dy, dx);
            // Gentle displacement away from cursor
            offsetX = -Math.cos(angle) * factor * 10;
            offsetY = -Math.sin(angle) * factor * 10;
            
            radius = 1.1 + factor * 1.4;
            opacity = 0.18 + factor * 0.45;

            if (factor > 0.4) {
              color = '255, 140, 66'; // Subtle brand orange accent near cursor
            }
          }

          ctx.beginPath();
          ctx.arc(baseX + offsetX, baseY + offsetY + wave, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleGetStarted = () => {
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
      className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-center bg-[#FAFAFA] text-neutral-900 overflow-hidden selection:bg-brand-orange selection:text-white"
    >
      {/* Background Interactive Dot Grid Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Very faint linear top/bottom vignette gradients for smooth section transition */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-1" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-1" />

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-24 w-full">
        <div className="max-w-3xl space-y-8 text-left">
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-sans font-extrabold text-neutral-900 tracking-tight leading-[1.08]"
          >
            CRM, automation <br className="hidden sm:inline" />
            and lead systems <br className="hidden sm:inline" />
            for real estate <br className="hidden sm:inline" />
            developers.
          </motion.h1>

          {/* Subheading - Single concise human paragraph under two lines */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 font-body font-normal leading-relaxed max-w-2xl"
          >
            We help real estate developers capture enquiries, organise leads and respond faster using simple systems built around CRM and automation.
          </motion.p>

          {/* Buttons Group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            {/* Primary Button */}
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_4px_20px_rgba(255,140,66,0.3)] hover:shadow-[0_6px_25px_rgba(255,140,66,0.4)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleHowItWorks}
              className="inline-flex items-center justify-center gap-1.5 px-7 py-3.5 bg-white hover:bg-neutral-100/80 text-neutral-900 font-sans font-bold text-sm sm:text-base rounded-full border border-neutral-200/80 hover:border-neutral-300 shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span>How It Works</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
