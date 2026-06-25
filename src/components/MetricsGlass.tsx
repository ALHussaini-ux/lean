import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Bot, Zap, Smartphone, Layers } from 'lucide-react';

interface MetricItem {
  icon: React.ReactNode;
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function CountUp({ 
  target, 
  duration = 1600, 
  prefix = '', 
  suffix = '', 
  startTrigger = false 
}: { 
  target: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
  startTrigger?: boolean; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    let startTime: number | null = null;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth ease-out quad
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animateCount);
  }, [target, duration, startTrigger]);

  return (
    <span className="font-sans font-extrabold tracking-tight">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsGlass() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const metrics: MetricItem[] = [
    {
      icon: <Bot className="w-5 h-5 text-[#FF6B00]" />,
      value: '24/7',
      numericTarget: 24,
      suffix: '/7',
      label: 'Lead Automation'
    },
    {
      icon: <Zap className="w-5 h-5 text-[#FF6B00]" />,
      value: '<60s',
      numericTarget: 60,
      prefix: '<',
      suffix: 's',
      label: 'Lead Response'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#FF6B00]" />,
      value: '100%',
      numericTarget: 100,
      suffix: '%',
      label: 'Mobile Optimized'
    },
    {
      icon: <Layers className="w-5 h-5 text-[#FF6B00]" />,
      value: '3',
      numericTarget: 3,
      label: 'Core Services'
    }
  ];

  return (
    <section 
      id="stats-banner" 
      ref={containerRef}
      className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-20 relative z-20"
    >
      {/* Dynamic Glow Refractions behind the glass pill container for authentic look */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-72 h-32 rounded-full bg-orange-500/10 blur-[50px] pointer-events-none" />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 h-32 rounded-full bg-amber-500/10 blur-[50px] pointer-events-none" />

      {/* Main Glass Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/12 backdrop-blur-[32px] rounded-[32px] border border-white/25 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.45),0_12px_45px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] p-8 md:py-10 md:px-12 flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-0"
      >
        {metrics.map((item, idx) => (
          <React.Fragment key={idx}>
            {/* Divider */}
            {idx > 0 && (
              <div className="hidden md:block w-[1px] self-stretch bg-gradient-to-b from-transparent via-black/10 to-transparent" />
            )}

            {/* Metric Block */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex-1 flex flex-col items-center text-center group cursor-default relative px-4"
            >
              {/* Embossed Glass Squircle Container for Icon */}
              <div className="w-12 h-12 rounded-2xl bg-white shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.04)] border border-white/60 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(255,107,0,0.25)]">
                {item.icon}
              </div>

              {/* Large Metric Number with brand orange (#FF6B00) */}
              <span className="text-[40px] md:text-[46px] lg:text-[52px] font-sans font-black text-[#FF6B00] tracking-tight leading-none mb-2 select-none">
                <CountUp 
                  target={item.numericTarget} 
                  prefix={item.prefix}
                  suffix={item.suffix}
                  startTrigger={isInView}
                />
              </span>

              {/* Metric Label in medium-weight gray (#6B7280) */}
              <span className="text-sm font-sans font-medium text-[#6B7280] tracking-tight select-none">
                {item.label}
              </span>
            </motion.div>
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
