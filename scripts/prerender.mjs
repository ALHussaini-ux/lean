/**
 * Build step: renders every page to its own HTML file with the right title,
 * description, canonical URL, social tags and structured data, then writes
 * sitemap.xml. Runs after `vite build` and the SSR build (see package.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, PAGES, indexableRoutes, organizationLd, pageLd, SITE_URL, OG_IMAGE, SITE_NAME } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo-->') || !template.includes('<div id="root"></div>')) {
  throw new Error('index.html is missing the <!--seo--> marker or the empty #root element');
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

function headFor(meta, routePath) {
  const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;
  const extra = meta.noindex ? null : pageLd(routePath);
  return [
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${routePath.startsWith('/blog/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ld(organizationLd),
    extra ? ld(extra) : '',
  ]
    .filter(Boolean)
    .join('\n    ');
}

function writePage(routePath, meta, file) {
  const appHtml = render(routePath);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace('<!--seo-->', headFor(meta, routePath))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return out;
}

const fileFor = (p) => (p === '/' ? 'index.html' : `${p.slice(1)}.html`);

const routes = indexableRoutes();
for (const { path: p, meta } of routes) writePage(p, meta, fileFor(p));
writePage('/get-started', PAGES.getStarted, 'get-started.html');
writePage('/hello', PAGES.hello, 'hello.html');
writePage('/404-not-found', PAGES.notFound, '404.html');

// Sitemap
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path: p }) => `  <url>
    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length + 3} pages and wrote sitemap.xml (${routes.length} URLs).`);
