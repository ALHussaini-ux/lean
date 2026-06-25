import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Target, 
  AppWindow, 
  MessageSquare, 
  Database, 
  LineChart, 
  Check, 
  TrendingUp, 
  Sparkles, 
  Smartphone,
  Calendar,
  FileText,
  MousePointer,
  ArrowRight
} from 'lucide-react';

interface BentoCardProps {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
  className?: string;
  visual?: React.ReactNode;
}

export default function ServicesBento() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="what-we-do" 
      className="relative bg-brand-light py-28 md:py-36 border-y border-neutral-200 overflow-hidden"
    >
      {/* Decorative ambient blurred glass blobs for realistic refraction */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div ref={headerRef} className="text-center mb-20 md:mb-24 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[#FF6B00] text-xs tracking-[0.2em] font-sans font-black uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2"
          >
            WHAT WE DO
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-brand-dark tracking-tight"
          >
            One System.<br className="sm:hidden" /> Five Growth Engines.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-body text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Everything required to attract, capture, nurture, and convert qualified real estate leads—from the first ad click to the final sale.
          </motion.p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* CARD 1: Google & Meta Ads (Large - 7 cols) */}
          <BentoCard 
            index={0}
            title="Google & Meta Ads"
            subtitle="PERFORMANCE CAMPAIGNS"
            description="Generate qualified enquiries through highly targeted campaigns built specifically for real estate developers."
            icon={<Target className="w-5 h-5 text-[#FF6B00]" />}
            highlights={[
              "High-intent audience targeting",
              "Continuous optimization",
              "Better quality leads"
            ]}
            className="md:col-span-12 lg:col-span-7"
            visual={<AdsVisual />}
          />

          {/* CARD 2: WhatsApp Automation (Medium - 5 cols) */}
          <BentoCard 
            index={1}
            title="WhatsApp Automation"
            subtitle="INSTANT RESPONSE"
            description="Automatically engage every lead with instant responses, brochure delivery, and appointment scheduling."
            icon={<MessageSquare className="w-5 h-5 text-[#FF6B00]" />}
            highlights={[
              "Instant replies",
              "Brochure delivery",
              "24/7 follow-up"
            ]}
            className="md:col-span-12 lg:col-span-5"
            visual={<WhatsAppVisual />}
          />

          {/* CARD 3: Landing Pages (Medium - 4 cols) */}
          <BentoCard 
            index={2}
            title="Landing Pages"
            subtitle="CONVERSION DESIGN"
            description="Beautiful landing pages engineered to turn visitors into booked site visits and qualified enquiries."
            icon={<AppWindow className="w-5 h-5 text-[#FF6B00]" />}
            highlights={[
              "Lightning-fast loading",
              "Conversion-focused design",
              "Mobile-first experience"
            ]}
            className="md:col-span-6 lg:col-span-4"
            visual={<LandingPageVisual />}
          />

          {/* CARD 4: CRM & Lead Tracking (Medium - 4 cols) */}
          <BentoCard 
            index={3}
            title="CRM & Lead Tracking"
            subtitle="PIPELINE SYSTEM"
            description="Track every enquiry from the first click to the final sale without losing valuable prospects."
            icon={<Database className="w-5 h-5 text-[#FF6B00]" />}
            highlights={[
              "Centralized lead management",
              "Activity tracking",
              "Complete visibility"
            ]}
            className="md:col-span-6 lg:col-span-4"
            visual={<CRMVisual />}
          />

          {/* CARD 5: Performance Reporting (Large - 4 cols, fully styled to balance grid) */}
          <BentoCard 
            index={4}
            title="Performance Reporting"
            subtitle="ACTIONABLE INSIGHTS"
            description="Understand exactly where your leads come from with transparent reporting and actionable insights."
            icon={<LineChart className="w-5 h-5 text-[#FF6B00]" />}
            highlights={[
              "Campaign performance",
              "Lead quality analysis",
              "Weekly reporting"
            ]}
            className="md:col-span-12 lg:col-span-4"
            visual={<ReportingVisual />}
          />

        </div>

      </div>
    </section>
  );
}

function BentoCard({ 
  index, 
  title, 
  subtitle, 
  description, 
  icon, 
  highlights, 
  className = '', 
  visual 
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={`group relative rounded-[28px] overflow-hidden bg-white/10 backdrop-blur-[24px] border border-white/20 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04),inset_0_1.5px_3px_rgba(255,255,255,0.4)] hover:bg-white/18 hover:shadow-[0_24px_50px_-15px_rgba(255,107,0,0.07),inset_0_1.5px_4px_rgba(255,255,255,0.5)] transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      {/* Absolute subtle glowing radial gradient at the top right of cards */}
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-orange-500/5 group-hover:bg-orange-500/10 blur-xl transition-all duration-300 pointer-events-none" />

      {/* Main content compartment */}
      <div className="p-8 sm:p-9 space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          
          {/* Icon squircle with glass highlight & rotation */}
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-[14px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,0.8)] border border-white/70 group-hover:rotate-[5deg] group-hover:scale-105 transition-all duration-300">
            {icon}
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] tracking-[0.18em] font-sans font-black text-neutral-400 uppercase block">
              {subtitle}
            </span>
            <h3 className="text-2xl font-sans font-extrabold text-brand-dark group-hover:text-[#FF6B00] transition-colors duration-300">
              {title}
            </h3>
          </div>

          <p className="font-body text-neutral-500 text-sm leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* Dynamic highlights drawer */}
        <div className="pt-6 border-t border-neutral-200/50 space-y-3">
          {highlights.map((hl, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                <Check className="w-2.5 h-2.5 text-[#FF6B00]" strokeWidth={3} />
              </div>
              <span className="font-sans text-[13px] font-bold text-neutral-600">
                {hl}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Integrated sleek visual frame if exists */}
      {visual && (
        <div className="w-full relative px-8 pb-8 overflow-hidden select-none">
          <div className="w-full bg-neutral-900/[0.02] border border-neutral-900/[0.04] rounded-2xl overflow-hidden p-4 backdrop-blur-[4px]">
            {visual}
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ==================== HIGH-FIDELITY CUSTOM VISUALS ==================== */

// 1. Google & Meta Ads Visual
function AdsVisual() {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-bold border-b border-neutral-200/50 pb-2">
        <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Google & Meta ROAS</span>
        <span className="text-[#FF6B00] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">Live Campaign</span>
      </div>
      <div className="relative h-24 flex items-end justify-between px-2 pt-4">
        {/* Simplified high fidelity line graph */}
        <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0"/>
            </linearGradient>
          </defs>
          <path 
            d="M 0 80 Q 50 60 100 45 T 200 20 T 300 5" 
            fill="none" 
            stroke="#FF6B00" 
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path 
            d="M 0 80 Q 50 60 100 45 T 200 20 T 300 5 L 300 100 L 0 100 Z" 
            fill="url(#chartGrad)"
          />
          {/* Animated node pulse */}
          <circle cx="300" cy="5" r="5" fill="#FF6B00" />
          <circle cx="300" cy="5" r="10" fill="none" stroke="#FF6B00" strokeWidth="2" className="animate-ping" />
        </svg>

        <div className="z-10 bg-white/90 backdrop-blur-md shadow-sm border border-neutral-100 p-2 rounded-xl text-center">
          <div className="text-[10px] text-neutral-400 font-bold uppercase">CPL Average</div>
          <div className="text-sm font-black text-brand-dark">₹420</div>
        </div>

        <div className="z-10 bg-white/90 backdrop-blur-md shadow-sm border border-neutral-100 p-2 rounded-xl text-center">
          <div className="text-[10px] text-neutral-400 font-bold uppercase">Conversions</div>
          <div className="text-sm font-black text-brand-dark">+148%</div>
        </div>
      </div>
    </div>
  );
}

// 2. WhatsApp Automation Visual
function WhatsAppVisual() {
  return (
    <div className="space-y-2.5 font-sans">
      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-bold border-b border-neutral-200/50 pb-2">
        <Smartphone className="w-3.5 h-3.5 text-[#FF6B00]" />
        <span>WhatsApp Conversation Flow</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-start">
          <div className="bg-neutral-100 text-neutral-700 rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[85%] border border-neutral-200/40">
            Hi, I saw your project. Can you send the pricing brochure?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#FF6B00] text-white rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[85%] shadow-sm relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-white animate-pulse" />
              <span>Instantly Sent! Here is the pricing PDF. 📥</span>
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#FF6B00] text-white rounded-2xl rounded-tr-sm px-3.5 py-1.5 max-w-[80%] text-[11px] border border-orange-500/10 flex items-center gap-2">
            <Calendar className="w-3 h-3 text-white" />
            <span>Schedule free site visit?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Landing Pages Visual
function LandingPageVisual() {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-bold border-b border-neutral-200/50 pb-2">
        <span className="flex items-center gap-1.5">⚡ Lighthouse Score</span>
        <span className="text-emerald-500 font-black">99/100 Speed</span>
      </div>
      <div className="bg-white/90 rounded-xl p-3 border border-neutral-100 shadow-sm space-y-2">
        <div className="h-3 w-2/3 bg-neutral-200 rounded animate-pulse" />
        <div className="h-2 w-full bg-neutral-100 rounded" />
        <div className="h-6 w-full bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-between px-2.5 text-[10px] text-[#FF6B00] font-black">
          <span>Book Site Visit Now</span>
          <MousePointer className="w-3 h-3 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

// 4. CRM & Lead Tracking Visual
function CRMVisual() {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-bold border-b border-neutral-200/50 pb-2">
        <span>Pipeline Board</span>
        <span className="text-xs font-black text-[#FF6B00]">Airtable</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-white/90 p-2 rounded-xl border border-neutral-100 shadow-sm text-xs">
          <span className="font-bold text-neutral-700">Abhishek Sharma</span>
          <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 font-bold">Hot Prospect</span>
        </div>
        <div className="flex items-center justify-between bg-white/90 p-2 rounded-xl border border-neutral-100 shadow-sm text-xs">
          <span className="font-bold text-neutral-700">Rohan Mehta</span>
          <span className="text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-100 font-bold">Site Visit Booked</span>
        </div>
      </div>
    </div>
  );
}

// 5. Performance Reporting Visual
function ReportingVisual() {
  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-bold border-b border-neutral-200/50 pb-2">
        <span>Channel Breakdown</span>
        <span className="flex items-center gap-1 text-[10px] text-neutral-400 font-bold"><FileText className="w-3 h-3 text-[#FF6B00]" /> Weekly Report</span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-neutral-500">
            <span>Meta Ads (Instagram/FB)</span>
            <span>48%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#FF6B00] rounded-full" style={{ width: '48%' }} />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-bold text-neutral-500">
            <span>Google Search Ads</span>
            <span>35%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div className="h-full bg-neutral-700 rounded-full" style={{ width: '35%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
