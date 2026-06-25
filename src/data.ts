import { ServiceCard, PricingTier } from './types';

export const SERVICES: ServiceCard[] = [
  {
    number: '1',
    title: 'Lead Generation',
    description: 'Google and Meta Ads campaigns optimized specifically for real estate. Qualified buyers searching for your project, not random clicks.',
    details: [
      'Real estate specific ad optimization',
      'High-intent search keyword targeting',
      'Continuous daily budget & bid tuning'
    ]
  },
  {
    number: '2',
    title: 'Landing Pages',
    description: 'Conversion-focused project pages. Modern design, fast load times, built to turn ad clicks into enquiries and site visit bookings.',
    details: [
      'Ultra-fast load times on mobile',
      'Conversion-centered structural layout',
      'Site visit booking forms built-in'
    ]
  },
  {
    number: '3',
    title: 'WhatsApp Automation',
    description: 'Instant replies to leads. Brochure delivery in seconds. Site visit booking without manual follow-up. Responds 24/7.',
    details: [
      'Brochure dispatch within 60 seconds',
      'Site visit scheduling without friction',
      'Continuous 24/7 responsive follow-ups'
    ]
  },
  {
    number: '4',
    title: 'Lead Tracking',
    description: "Complete visibility on every lead. Know who's interested, who's visited your site, who's ready to buy. No leads lost to disorganization.",
    details: [
      'Centralized tracking database',
      'Instant lead notification pipeline',
      'Detailed interest category tagging'
    ]
  },
  {
    number: '5',
    title: 'Performance Reports',
    description: 'Weekly insights. Cost per lead. Conversion rates. Data that shows exactly what\'s working and where to optimize.',
    details: [
      'Comprehensive weekly metric digests',
      'Precise cost-per-lead tracking',
      'Clear, actionable campaign insights'
    ]
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '₹20,000',
    billing: 'month',
    tagline: 'Perfect for launching new projects or testing digital lead generation.',
    description: 'Includes everything needed to start generating qualified leads. Best for builders launching projects or testing if digital works before scaling budget.',
    features: [
      'Google Ads management (up to ₹8,000 monthly ad spend)',
      'Professional landing page (hosted and maintained)',
      'WhatsApp auto-reply setup and maintenance',
      'Lead database (Google Sheets) with tracking',
      'Weekly performance reports with metrics',
      'One monthly strategy discussion'
    ],
    typicalResults: [
      '15-25 qualified leads per month',
      'Cost per lead: ₹400-600',
      'Lead response time: <1 minute (WhatsApp)',
      'Lead time to first results: 48-72 hours'
    ],
    whoItsFor: [
      'New project launches',
      'Testing digital lead generation',
      'Smaller budgets',
      'Single active project'
    ],
    ctaText: 'Get Started',
    popular: false
  },
  {
    name: 'Growth',
    price: '₹50,000',
    billing: 'month',
    tagline: 'For aggressive scaling across multiple projects or channels.',
    description: 'Multi-channel lead generation with advanced optimization. Best for builders managing multiple projects or wanting predictable lead volume.',
    features: [
      'Google Ads + Meta Ads (up to ₹20,000 total spend)',
      'Landing page with A/B testing and optimization',
      'Advanced WhatsApp automation + SMS messaging',
      'Airtable database with conversion dashboard',
      'Bi-weekly strategy calls and optimization',
      'Bi-weekly performance reports with insights'
    ],
    typicalResults: [
      '40-60 qualified leads per month',
      'Cost per lead: ₹300-500',
      'Lead response time: <30 minutes (WhatsApp)',
      'Conversion visibility: Full funnel tracking'
    ],
    whoItsFor: [
      'Multiple active projects',
      'Aggressive growth targets',
      'Want optimization and strategy',
      'Can sustain ₹20k/month ad budget'
    ],
    ctaText: 'Get Started',
    popular: true
  },
  {
    name: 'Premium',
    price: '₹100,000',
    billing: 'month',
    tagline: 'Full funnel optimization with dedicated account management.',
    description: 'Complete lead generation system with dedicated support. Best for large developers managing multiple projects or wanting white-glove service.',
    features: [
      'Unlimited ad spend management (Google + Meta)',
      'Custom landing page design + full optimization',
      'Full funnel WhatsApp + SMS + email automation',
      'Advanced analytics dashboard (custom reporting)',
      'Weekly strategy calls with dedicated account manager',
      'Proactive optimization and scaling recommendations'
    ],
    typicalResults: [
      '60-100+ qualified leads per month',
      'Cost per lead: ₹250-400',
      'Lead response time: <15 minutes',
      'Full conversion funnel tracked and optimized'
    ],
    whoItsFor: [
      'Large developers with multiple projects',
      'Want white-glove service and strategy',
      'Budget flexibility',
      'Serious about lead generation ROI'
    ],
    ctaText: 'Get Started',
    popular: false
  }
];

export const COMPANY_VALUES = [
  {
    title: 'Built for Real Estate',
    description: 'We understand builder sales cycles, project launches, property buyer behavior, and competitive dynamics in India\'s real estate market.'
  },
  {
    title: 'Systems Over Service',
    description: 'We create infrastructure you control. Not dependent on us — empowered by us. You own the landing page, access the data, and understand how everything works.'
  },
  {
    title: 'Results Focused',
    description: 'Every tactic is measured. Every rupee is tracked. You see exactly what works and what doesn\'t. Transparent reporting, no hidden metrics.'
  }
];

export const GENERAL_FAQS = [
  {
    q: 'What if my project isn\'t good or overpriced?',
    a: 'We bring qualified leads — people actually interested in your project. Whether they convert to customers depends on your team\'s follow-up, project quality, pricing, and location. That\'s your job. Our job is generating interest.'
  },
  {
    q: 'How long before I see results?',
    a: 'Ads start running immediately after setup. First leads arrive within 48-72 hours. Meaningful data (20+ leads, conversion patterns) takes 2-4 weeks to analyze.'
  },
  {
    q: 'What if I\'m not happy with results after Month 1?',
    a: 'You can pause or cancel anytime. We recommend 3-month commitment to see real optimization, but there\'s no lock-in.'
  },
  {
    q: 'Do you guarantee X number of leads?',
    a: 'No. Lead volume depends on budget, competition, project location, and market demand. We deliver qualified leads — whether they convert is your team\'s responsibility. We show typical results but won\'t promise specific numbers.'
  },
  {
    q: 'What happens to the landing page and ads after I cancel?',
    a: 'You own the landing page. You can keep running it yourself or transfer it to another agency. The ads stop. You keep all the data.'
  },
  {
    q: 'Can I use my own ads account instead of yours?',
    a: 'Yes. We can manage campaigns in your Google Ads account instead. You maintain ownership and control from day one.'
  },
  {
    q: 'What if my budget is lower than your Starter plan?',
    a: 'Starter tier is designed as the minimum for meaningful results (₹8k/month ad spend). Smaller budgets rarely generate qualified leads. We recommend starting with Starter or waiting until budget is available.'
  },
  {
    q: 'How do you track leads?',
    a: 'Leads are captured via landing page form, automatically added to Airtable database, and connected to Google Analytics for source tracking. You have full access.'
  },
  {
    q: 'Why shouldn\'t I just hire an in-house marketing person?',
    a: 'An in-house person costs ₹30-50k/month + requires training. LEAN gives you complete systems (ads, landing page, automation) for less, without long-term employment commitment. You can switch easily.'
  },
  {
    q: 'Can you help with offline sales too?',
    a: 'We focus on digital lead generation (ads, landing pages, WhatsApp). Site visit conversions depend on your sales team. We\'re not a sales company — we\'re lead infrastructure.'
  },
  {
    q: 'Do you provide customer service support?',
    a: 'You have weekly/bi-weekly calls (Growth/Premium tiers). Starter tier gets weekly reports. We\'re available for technical issues. We\'re not a customer service company — you handle buyer interactions.'
  },
  {
    q: 'What if Google Ads changes or algorithms shift?',
    a: 'We monitor and adapt continuously. If performance drops, we optimize. We stay updated on platform changes and adjust strategies accordingly.'
  },
  {
    q: 'Can you guarantee my cost per lead won\'t increase?',
    a: 'No. Competition and market dynamics shift. We work to maintain or improve CPL, but can\'t guarantee it. We\'ll notify you if costs shift significantly.'
  },
  {
    q: 'How is this different from other digital marketing agencies?',
    a: 'Most agencies focus on brand awareness or social media. LEAN focuses exclusively on lead generation for real estate. We\'re specialists, not generalists. You pay for performance systems, not creative storytelling.'
  },
  {
    q: 'What\'s included in reporting?',
    a: 'Leads generated, cost per lead, site visits booked, conversion rate, top-performing keywords, recommendations for next month. Reports are weekly (Starter) or bi-weekly (Growth/Premium).'
  }
];

export const PRICING_FAQS = [
  {
    q: 'Can I change tiers mid-month?',
    a: 'Yes. We\'ll prorate the difference.'
  },
  {
    q: 'What if my budget changes?',
    a: 'You can pause, scale down, or cancel with 30 days notice.'
  },
  {
    q: 'Are there hidden costs?',
    a: 'No. The monthly fee covers everything listed. Ad spend is separate and goes directly to Google/Meta.'
  },
  {
    q: 'Can I negotiate pricing?',
    a: 'Not typically, but multi-project or annual discounts are possible. Contact us.'
  },
  {
    q: 'What if I want a custom package?',
    a: 'We can discuss custom arrangements for Growth/Premium tiers. Contact for details.'
  }
];
