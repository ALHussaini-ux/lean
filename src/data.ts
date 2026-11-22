/**
 * Site copy lives here so it can be edited without touching layout code.
 */

export interface Service {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  includes: string[];
}

export const SERVICES: Service[] = [
  {
    slug: 'ads',
    title: 'Google & Meta Ads',
    summary: 'Campaigns aimed at people looking to buy in your area, not people browsing rentals.',
    detail:
      'We run search campaigns on exact and phrase-match keywords for your project, location and configuration, and keep a negative keyword list that grows every week. On Meta, we target by location and intent and test creative until the cost per real enquiry comes down.',
    includes: [
      'Keyword research for your micro-market',
      'Negative keyword list, updated weekly',
      'Ad copy written around your project, not templates',
      'Conversion tracking set up properly from day one',
    ],
  },
  {
    slug: 'landing-pages',
    title: 'Project landing pages',
    summary: 'One fast page per project, built to turn an ad click into an enquiry or a site visit.',
    detail:
      'Most project sites are slow and say too much. We build a single page that loads quickly on a phone, shows what a buyer actually needs (location, configurations, pricing range, amenities) and makes enquiring or booking a visit easy.',
    includes: [
      'Mobile-first design, loads in under two seconds',
      'Enquiry and site-visit booking forms',
      'Brochure download with lead capture',
      'Hosted and maintained by us; you own the domain',
    ],
  },
  {
    slug: 'lead-tracking',
    title: 'Lead tracking',
    summary: 'Every enquiry lands in one place, gets an instant reply, and is followed until it closes.',
    detail:
      'Enquiries from ads, your website and portals go into one shared board instead of a WhatsApp group. Your sales team is alerted the moment someone enquires, the buyer gets an instant reply with the brochure, and every call and visit is logged against the lead.',
    includes: [
      'One board for every lead source',
      'Instant alerts to your sales team',
      'Automatic first reply with your brochure',
      'Simple statuses: contacted, visit booked, closed',
    ],
  },
  {
    slug: 'reporting',
    title: 'Weekly reporting',
    summary: 'A short weekly report: what you spent, how many real leads it brought, and what we’re changing.',
    detail:
      'No dashboards full of impressions. Each week you get cost per lead, how many leads were qualified, how many visited site, and which campaigns produced them, plus a plain note on what we’re adjusting next.',
    includes: [
      'Cost per lead and cost per site visit',
      'Lead quality by campaign',
      'What changed this week and why',
      'A monthly call to plan the next month',
    ],
  },
];

export const STEPS = [
  {
    when: 'Week 1',
    title: 'Set up',
    body:
      'We learn the project, the buyer and your sales process. Then we build the landing page, set up the ad accounts in your name, and connect everything to your lead board.',
  },
  {
    when: 'Weeks 2–3',
    title: 'Launch',
    body:
      'Campaigns go live. We watch the first leads closely with your sales team: who’s calling back, what buyers are asking, which searches are wasting money.',
  },
  {
    when: 'Ongoing',
    title: 'Improve',
    body:
      'Every week we cut what isn’t working and put more behind what is. The goal is simple: more site visits for the same budget.',
  },
];

export const PRINCIPLES = [
  {
    title: 'You own everything',
    body: 'Ad accounts, landing pages, domains and lead data are in your name. If you stop working with us, you keep all of it.',
  },
  {
    title: 'Leads, not impressions',
    body: 'We report on enquiries and site visits. Reach and clicks only matter if they turn into one of those.',
  },
  {
    title: 'No promises we can’t keep',
    body: 'Nobody can guarantee sales. We can promise a clear process, honest numbers and fast changes when something isn’t working.',
  },
  {
    title: 'Simple on purpose',
    body: 'Tools your sales team will actually use. If it needs a training manual, it’s too complicated.',
  },
];

export const FAQS = [
  {
    q: 'Who do you work with?',
    a: 'Real estate developers and builders: apartment projects, villas, plotted developments and some commercial. If you have a project to sell and want enquiries you can actually follow up, we should talk.',
  },
  {
    q: 'How soon will we see leads?',
    a: 'Usually within the first few days of campaigns going live. The first two to three weeks are for learning what works; quality and cost per lead improve from there.',
  },
  {
    q: 'What does it cost?',
    a: 'Plans start at ₹20,000 a month for one project. Your ad budget is separate and paid directly to Google and Meta. We’ll recommend a budget on the first call based on your project and location.',
  },
  {
    q: 'Do we need to change our CRM?',
    a: 'No. If your team already uses a CRM, we send leads into it. If you don’t have one, we set up a simple shared board that takes ten minutes to learn.',
  },
  {
    q: 'What happens if we stop?',
    a: 'You keep everything: ad accounts, landing pages, the domain and all your lead data. Nothing is locked to us.',
  },
];
