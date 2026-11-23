/**
 * Server entry used only at build time (scripts/prerender.mjs) to render each
 * page to static HTML, so search engines and link previews see real content.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { PAGES, indexableRoutes, organizationLd, pageLd, SITE_URL, OG_IMAGE, SITE_NAME } from './seo';
