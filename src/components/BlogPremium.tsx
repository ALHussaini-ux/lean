import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Clock, User, ArrowRight, ArrowLeft, ChevronRight, Share2, BookOpen, Sparkles, MessageSquare } from 'lucide-react';

interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  excerpt: string;
  content: string[];
}

export default function BlogPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const articles: Article[] = [
    {
      id: 'art-1',
      slug: 'sub-60-second-response-rule',
      title: 'The Sub-60 Second Response Rule: Why Minutes Cost Lakhs in Real Estate',
      category: 'AUTOMATION PIPELINES',
      readTime: '4 min read',
      date: 'June 24, 2026',
      author: 'Pranav Reddy, System Architect',
      summary: 'Data from Indian property developers confirms that contacting a prospective buyer within 60 seconds boosts response probability by over 300%. Here is how we bypass analog delays.',
      excerpt: 'In the hyper-competitive real estate landscape of major Indian hubs like Hyderabad and Bengaluru, a lead is a transient pulse. Learn how we engineered a custom webhook pipeline that routes inquiries to active WhatsApp dialogues in real-time.',
      content: [
        'At LEAN, we do not view real estate marketing as a creative campaign. We view it as an infrastructure engineering problem. Most builders measure lead follow-up in hours, or sometimes even days. By the time a sales executive manually reads an email, matches the project, and dials the number, the prospect has already clicked on three other competitor ad campaigns.',
        'Data from Indian property developers confirms that contacting a prospective buyer within 60 seconds boosts response probability by over 300%. After 5 minutes, conversion rates decay exponentially. At 30 minutes, the lead is virtually dead.',
        'To solve this response latency, we bypass analog broker delays entirely using secure webhook parsers. The instant a user clicks "Submit" on a Google or Meta ad, the payload is parsed by our automation servers. Within 48 seconds, a personalized WhatsApp response is triggered, dispatching the high-resolution project brochure, asking pre-qualification filter questions, and establishing a direct booking link.',
        'Your sales team receives structured parameter logs directly on their Airtable boards. Instead of cold-calling random contacts, they dial prospects who are actively engaged with the brochure in real-time. That is how automated infrastructure turns raw interest into steady site visits.'
      ]
    },
    {
      id: 'art-2',
      slug: 'how-builders-waste-ad-spend',
      title: 'How Indian Property Builders Waste 60% of Their Digital Ad Budgets',
      category: 'CAMPAIGN STRATEGY',
      readTime: '6 min read',
      date: 'June 18, 2026',
      author: 'Siddharth Rao, Lead Strategist',
      summary: 'Raw clicks do not sell premium apartments. We analyze standard search intent mismatches, broader demographic bleed, and the vanity metrics agencies use to hide poor ROI.',
      excerpt: 'Most digital marketing agencies boast about millions of impressions and low cost-per-click. But why are your sales teams calling disconnected numbers, brokers, or people looking for rent? We audit the major flaws in real estate ad bidding.',
      content: [
        'Walk into any real estate sales office in Hyderabad and you will hear the same complaint: "The leads from digital ads are garbage." Sales reps spend hours calling numbers that are switched off, people who deny ever filling out a form, or brokers seeking co-broke arrangements.',
        'This is not a failure of digital advertising. It is a failure of bidding structures and audience constraints. Most agency contracts incentivize vanity metrics like impressions and clicks, driving campaigns toward cheap, broad-match keywords.',
        'When you target "3 BHK apartments in Gachibowli" with broad match, search engines will show your ads to people searching for "3 BHK flat for rent", "cheap flats under 30 lakhs", or even "Gachibowli PG accommodations". Your budget is depleted by unqualified clicks.',
        'LEAN standard practices enforce exact and phrase match keywords, coupled with an aggressive negative keyword register (updated daily). We bid exclusively on premium high-intent phrases, paired with structured form requirements that filter out accidental clicks. It results in a higher cost-per-click but a dramatically lower cost per qualified site visit.'
      ]
    },
    {
      id: 'art-3',
      slug: 'database-central-nervous-system',
      title: "Why an Interactive Database is Your Sales Team's Central Nervous System",
      category: 'CONVERSION TOOLS',
      readTime: '5 min read',
      date: 'May 12, 2026',
      author: 'Meera Sen, Integration Lead',
      summary: 'Raw Google Sheets lead sheets lead to lost details and forgotten callbacks. We design structured, visual conversion boards that track leads from ad click to registration.',
      excerpt: 'Disorganized lead tracking is the silent killer of property sales. When leads are dumped into static sheets or shared via WhatsApp chat, follow-ups fall through the cracks. Learn how a structured CRM board brings absolute transparency.',
      content: [
        'A lead is an asset with a high rate of value depreciation. When a lead is generated, it contains key parameter metadata: the specific project they clicked, their search query, their budget threshold, and the time they submitted. Yet, most developers distribute these leads as a copy-pasted WhatsApp message to their sales team.',
        'This chaotic system is prone to leakages. There is no central log of who called whom, what the response was, or when the site visit is scheduled. Leads are forgotten, duplicate calls are made, and builders lose trust in their campaigns.',
        'Under the LEAN framework, we integrate every lead channel directly into an interactive Airtable or custom CRM conversion board. Each entry is timestamped and mapped with structured parameters. Sales reps update lead states with single-click drop-down selectors: "Attempting Contact", "Brochure Dispatched", "Site Visit Booked", "Follow Up Required", or "Unqualified".',
        'This creates a single source of truth. As a property developer, you can inspect the board in real-time, reviewing exactly how many site visits were scheduled this week and tracing them back to the exact search campaign that generated the interest.'
      ]
    }
  ];

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 3000);
    });
  };

  return (
    <div ref={containerRef} className="space-y-24 pb-24 pt-28 md:pt-36 bg-brand-light font-sans min-h-screen">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl space-y-4">
          <span className="text-[#FF6B00] text-xs tracking-[0.2em] font-black uppercase inline-block border-b-2 border-[#FF6B00] pb-2 mb-2">
            TELEMETRY & INSIGHTS
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight leading-tight uppercase">
            The LEAN Bulletin
          </h1>
          <p className="font-body text-neutral-500 text-sm md:text-base max-w-xl leading-relaxed">
            Process-driven studies, digital engineering parameters, and honest breakdowns of Indian real estate marketing systems.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            /* ================= ARTICLE LISTING ================= */
            <motion.div
              key="listing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {articles.map((art, idx) => (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    setSelectedArticle(art);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-neutral-200/60 rounded-[24px] p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF6B00]/30 shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <div className="space-y-6">
                    {/* Category and date */}
                    <div className="flex items-center justify-between text-[10px] font-sans font-black tracking-widest text-neutral-400">
                      <span>{art.category}</span>
                      <span>{art.date}</span>
                    </div>

                    {/* Title */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-sans font-black text-brand-dark group-hover:text-[#FF6B00] transition-colors duration-200 leading-snug">
                        {art.title}
                      </h3>
                      <p className="font-body text-neutral-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card bottom footer */}
                  <div className="pt-6 border-t border-neutral-100/80 mt-8 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-md font-bold">
                      {art.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-sans font-black text-neutral-700 group-hover:text-[#FF6B00] transition-colors">
                      <span>Read Study</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            /* ================= SINGLE ARTICLE VIEW ================= */
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto bg-white border border-neutral-200/60 rounded-[32px] p-8 md:p-12 shadow-xl space-y-10 relative"
            >
              {/* Floating back button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 text-xs font-sans font-black text-neutral-500 hover:text-brand-dark transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO INSIGHTS</span>
              </button>

              {/* Title area */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                  <span className="bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded-md text-neutral-600">
                    {selectedArticle.category}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-4xl font-sans font-black text-brand-dark tracking-tight leading-snug">
                  {selectedArticle.title}
                </h2>

                <div className="flex items-center justify-between pt-2 border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-sans font-bold text-neutral-700">
                      {selectedArticle.author}
                    </span>
                  </div>

                  <button
                    onClick={() => handleShare(selectedArticle.slug)}
                    className="flex items-center gap-1.5 text-xs font-sans font-bold text-neutral-500 hover:text-[#FF6B00] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedSlug === selectedArticle.slug ? 'Copied Link!' : 'Share Article'}</span>
                  </button>
                </div>
              </div>

              {/* Highlight summary panel */}
              <div className="bg-brand-light border-l-4 border-[#FF6B00] p-6 rounded-r-2xl space-y-2">
                <span className="text-[10px] font-sans font-black tracking-widest text-[#FF6B00] uppercase block">EXECUTIVE BRIEF</span>
                <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  "{selectedArticle.summary}"
                </p>
              </div>

              {/* Core editorial body content */}
              <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6 leading-relaxed font-body text-sm md:text-base">
                {selectedArticle.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Bottom navigation suggestion */}
              <div className="pt-10 border-t border-neutral-100 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest block">LEARNED ENOUGH?</span>
                  <p className="text-xs font-body text-neutral-500">Let's audit your current digital lead capture parameters.</p>
                </div>
                <button
                  onClick={() => {
                    // Navigate to contact or lead panel
                    const el = document.getElementById('contact');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-dark hover:bg-neutral-800 text-white font-sans font-black text-xs uppercase tracking-wider rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group/cta"
                >
                  <span>Build Your System</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
