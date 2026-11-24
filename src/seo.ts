/**
 * Search metadata for every page, in one place.
 * Used by the pages at runtime and by scripts/prerender.mjs at build time.
 */
import { FAQS, SERVICES } from './data';
import { POSTS, Post } from './posts';

export const SITE_URL = 'https://www.leansystem.co';
export const SITE_NAME = 'Lean System';
export const CONTACT_EMAIL = 'hello@leansystem.co';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export const PAGES = {
  home: {
    path: '/',
    title: 'Real Estate Lead Generation for Developers | Lean System',
    description:
      'Google and Meta ads, fast project landing pages and lead tracking for real estate developers. Every enquiry answered and followed up.',
  },
  services: {
    path: '/services',
    title: 'Real Estate Marketing Services | Lean System',
    description:
      'Google and Meta Ads, project landing pages, lead tracking and weekly reporting for real estate developers. See what each service includes.',
  },
  about: {
    path: '/about',
    title: 'About Lean System | Real Estate Lead Generation',
    description:
      'Lean System runs ads on Google and Meta, builds the pages people land on, and sets up the tracking that makes sure every enquiry gets a reply.',
  },
  blog: {
    path: '/blog',
    title: 'Journal: Real Estate Marketing Notes | Lean System',
    description:
      'Practical notes on real estate advertising, project landing pages and lead follow-up for property developers and builders.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Lean System | Book a Call',
    description:
      'Tell us about your real estate project. Book a 30-minute call or send an enquiry and we’ll reply within one working day.',
  },
  getStarted: {
    path: '/contact',
    title: 'Contact Lean System | Book a Call',
    description:
      'Tell us about your real estate project. Book a 30-minute call or send an enquiry and we’ll reply within one working day.',
    noindex: true,
  },
  hello: {
    path: '/hello',
    title: 'Lean System',
    description: 'Contact details for Lean System.',
    noindex: true,
  },
  notFound: {
    path: '/404',
    title: 'Page not found | Lean System',
    description: 'This page doesn’t exist.',
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export function postMeta(post: Post): PageMeta {
  return { path: `/blog/${post.slug}`, title: `${post.title} | Lean System`, description: post.summary };
}

/* -------------------------------------------------------------------------- */
/* Structured data (JSON-LD)                                                  */
/* -------------------------------------------------------------------------- */

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
      image: OG_IMAGE,
      email: CONTACT_EMAIL,
      description:
        'Lean System runs Google and Meta ads, builds project landing pages and sets up lead tracking for real estate developers and builders.',
      knowsAbout: [
        'Real estate lead generation',
        'Google Ads for real estate',
        'Meta Ads for real estate',
        'Real estate landing pages',
        'Real estate CRM and lead tracking',
      ],
      contactPoint: { '@type': 'ContactPoint', email: CONTACT_EMAIL, contactType: 'sales', availableLanguage: ['English'] },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
    },
  ],
};

const breadcrumbs = (items: [string, string][]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

const serviceLd = SERVICES.map((s) => ({
  '@type': 'Service',
  name: s.title,
  description: s.summary,
  serviceType: s.title,
  audience: { '@type': 'Audience', audienceType: 'Real estate developers and builders' },
  provider: { '@id': ORG_ID },
  url: `${SITE_URL}/services#${s.slug}`,
}));

const faqLd = {
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/** Extra JSON-LD for a given path (beyond the site-wide organization graph). */
export function pageLd(path: string): object | null {
  if (path === '/') return { '@context': 'https://schema.org', '@graph': [faqLd, ...serviceLd] };
  if (path === '/services')
    return { '@context': 'https://schema.org', '@graph': [...serviceLd, breadcrumbs([['Home', '/'], ['Services', '/services']])] };
  if (path === '/about')
    return { '@context': 'https://schema.org', '@graph': [breadcrumbs([['Home', '/'], ['About', '/about']])] };
  if (path === '/contact')
    return { '@context': 'https://schema.org', '@graph': [breadcrumbs([['Home', '/'], ['Contact', '/contact']])] };
  if (path === '/blog')
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          name: 'Lean System Journal',
          url: `${SITE_URL}/blog`,
          publisher: { '@id': ORG_ID },
          ...(POSTS.length
            ? { blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}` })) }
            : {}),
        },
        breadcrumbs([['Home', '/'], ['Journal', '/blog']]),
      ],
    };
  const post = POSTS.find((p) => path === `/blog/${p.slug}`);
  if (post) {
    const date = new Date(post.date).toISOString().slice(0, 10);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.summary,
          datePublished: date,
          dateModified: date,
          articleSection: post.category,
          url: `${SITE_URL}${path}`,
          mainEntityOfPage: `${SITE_URL}${path}`,
          image: OG_IMAGE,
          author: { '@id': ORG_ID },
          publisher: { '@id': ORG_ID },
        },
        breadcrumbs([['Home', '/'], ['Journal', '/blog'], [post.title, path]]),
      ],
    };
  }
  return null;
}

/** Every indexable route, for pre-rendering and the sitemap. */
export function indexableRoutes(): { path: string; meta: PageMeta }[] {
  return [
    { path: '/', meta: PAGES.home },
    { path: '/services', meta: PAGES.services },
    { path: '/about', meta: PAGES.about },
    { path: '/blog', meta: PAGES.blog },
    { path: '/contact', meta: PAGES.contact },
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}`, meta: postMeta(p) })),
  ];
}
