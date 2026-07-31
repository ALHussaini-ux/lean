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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Pure Typography */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8 text-left">
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-sans font-extrabold text-neutral-900 tracking-tight leading-[1.08]"
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

          {/* Right Column: Abstract Minimal Dot Matrix Precision Visual */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[340px] aspect-square flex items-center justify-center"
            >
              {/* Outer delicate concentric ring boundary */}
              <div className="absolute inset-0 rounded-full border border-neutral-200/60 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-dashed border-neutral-200/40 animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Central Abstract Precision Node Grid */}
              <div className="grid grid-cols-5 gap-5 p-6 relative z-10">
                {Array.from({ length: 25 }).map((_, idx) => {
                  const isAccent = idx === 12; // center point
                  const isSubtleAccent = [6, 8, 16, 18].includes(idx);
                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        scale: isAccent ? [1, 1.25, 1] : [1, 1.08, 1],
                        opacity: isAccent ? [0.9, 1, 0.9] : isSubtleAccent ? [0.4, 0.7, 0.4] : [0.25, 0.35, 0.25]
                      }}
                      transition={{
                        duration: 3 + (idx % 4),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: (idx % 5) * 0.2
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        isAccent
                          ? 'bg-brand-orange ring-4 ring-brand-orange/20'
                          : isSubtleAccent
                          ? 'bg-neutral-800'
                          : 'bg-neutral-300'
                      }`}
                    />
                  );
                })}
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
