import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const OUTCOME_PHRASES = [
  'more conversations.',
  'more follow-ups.',
  'more appointments.',
  'more site visits.',
  'more sales.',
];

export default function MinimalHero() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotating phrase interval (2.8s)
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % OUTCOME_PHRASES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Mouse Parallax tracking (smooth lerp for subtle background ambient motion)
  useEffect(() => {
    let reqId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      targetY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    };

    const update = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMousePos({ x: currentX, y: currentY });
      reqId = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove);
    reqId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  }, []);

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

    const spacing = 36; // Clean, evenly spaced dots
    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const baseX = i * spacing;
          const baseY = j * spacing;

          // Organic ambient subtle breath motion
          const wave = Math.sin(time + i * 0.35 + j * 0.35) * 0.6;

          // Distance to mouse cursor
          const dx = mouseX - baseX;
          const dy = mouseY - baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          let offsetX = 0;
          let offsetY = 0;
          let radius = 0.95;
          let opacity = 0.055; // Barely noticeable, extremely subtle grid
          let color = '160, 165, 175';

          if (dist < maxDist) {
            const factor = (1 - dist / maxDist);
            const angle = Math.atan2(dy, dx);
            offsetX = -Math.cos(angle) * factor * 6;
            offsetY = -Math.sin(angle) * factor * 6;
            
            radius = 0.95 + factor * 1.0;
            opacity = 0.055 + factor * 0.15;

            if (factor > 0.5) {
              color = '255, 140, 66';
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
      {/* AMBIENT ORANGE SIDE GLARE LIGHTS (Far Left & Far Right Edges) */}
      {/* Left Edge Studio Glare */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.38, 0.25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: mousePos.x * 28,
          y: mousePos.y * 20,
        }}
        className="absolute -left-28 sm:-left-44 lg:-left-60 top-1/2 -translate-y-1/2 w-[480px] h-[700px] sm:w-[650px] sm:h-[900px] lg:w-[850px] lg:h-[1100px] rounded-[100%] bg-[radial-gradient(ellipse_at_left_center,rgba(255,140,66,0.45)_0%,rgba(255,140,66,0.12)_45%,transparent_75%)] blur-[80px] sm:blur-[110px] pointer-events-none z-0"
      />

      {/* Right Edge Studio Glare */}
      <motion.div
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.30, 0.20, 0.30],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: mousePos.x * -28,
          y: mousePos.y * -20,
        }}
        className="absolute -right-28 sm:-right-44 lg:-right-60 top-1/2 -translate-y-1/2 w-[480px] h-[700px] sm:w-[650px] sm:h-[900px] lg:w-[850px] lg:h-[1100px] rounded-[100%] bg-[radial-gradient(ellipse_at_right_center,rgba(255,140,66,0.45)_0%,rgba(255,140,66,0.12)_45%,transparent_75%)] blur-[80px] sm:blur-[110px] pointer-events-none z-0"
      />

      {/* Background Interactive Dot Grid Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Subtle top & bottom linear vignette transitions for smooth section blending */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-1" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-1" />

      {/* Main Content Layout - Perfectly Centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-24 w-full flex flex-col items-center justify-center">
        <div className="space-y-8 sm:space-y-10 text-center flex flex-col items-center max-w-4xl">
          
          {/* Centered Headline with Rotating Final Phrase */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-sans font-extrabold text-neutral-900 tracking-tight leading-[1.08] text-center"
          >
            Engineering lead systems <br className="hidden sm:inline" />
            that create{' '}
            <span className="inline-block relative text-brand-orange min-w-[280px] sm:min-w-[380px] md:min-w-[460px] text-left sm:text-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {OUTCOME_PHRASES[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Supporting Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 font-body font-normal leading-relaxed max-w-2xl text-center"
          >
            We build simple CRM, lead management and automation systems that help real estate developers capture enquiries, stay organised and respond faster.
          </motion.p>

          {/* Centered Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            {/* Primary Button */}
            <button
              onClick={handleLetsTalk}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-orange hover:bg-orange-600 text-white font-sans font-bold text-sm sm:text-base rounded-full shadow-[0_4px_20px_rgba(255,140,66,0.3)] hover:shadow-[0_6px_25px_rgba(255,140,66,0.4)] transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleHowItWorks}
              className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 bg-white hover:bg-neutral-100/80 text-neutral-900 font-sans font-bold text-sm sm:text-base rounded-full border border-neutral-200/80 hover:border-neutral-300 shadow-sm transition-all duration-300 cursor-pointer active:scale-[0.98]"
            >
              <span>How It Works</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


