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
    title: 'Lead Tracking',
    description: "Complete visibility on every lead. Know who's interested, who's visited your site, who's ready to buy. No leads lost to disorganization.",
    details: [
      'Centralized tracking database',
      'Instant lead notification pipeline',
      'Detailed interest category tagging'
    ]
  },
  {
    number: '4',
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
      'Instant lead notification and CRM delivery',
      'Lead database (Google Sheets) with tracking',
      'Weekly performance reports with metrics',
      'One monthly strategy discussion'
    ],
    typicalResults: [
      '15-25 qualified leads per month',
      'Cost per lead: ₹400-600',
      'Lead delivery time: <1 minute',
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
      'Multi-channel lead notification & automated SMS',
      'Airtable database with conversion dashboard',
      'Bi-weekly strategy calls and optimization',
      'Bi-weekly performance reports with insights'
    ],
    typicalResults: [
      '40-60 qualified leads per month',
      'Cost per lead: ₹300-500',
      'Lead routing time: <15 minutes',
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
      'Full funnel lead routing & automated SMS/email alerts',
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

