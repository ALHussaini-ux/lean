import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CANONICAL_ORIGIN = 'https://www.leansystem.co';

interface PageMetadataProps {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
}

function setOrCreateMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export default function PageMetadata({
  title,
  description,
  canonicalPath,
  noindex = false,
}: PageMetadataProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Normalize path and construct strict canonical URL on https://www.leansystem.co
    const rawPath = canonicalPath ?? location.pathname;
    const normalizedPath =
      rawPath === '/' || rawPath === ''
        ? '/'
        : `/${rawPath.replace(/^\/+|\/+$/g, '')}`;
    const canonicalUrl = `${CANONICAL_ORIGIN}${normalizedPath}`;

    // 3. Meta Description
    setOrCreateMeta('name', 'description', description);

    // 4. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Search Engine Indexing (Robots meta)
    setOrCreateMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 6. Keep OpenGraph & Twitter Card metadata synchronized across SPA navigations
    setOrCreateMeta('property', 'og:title', title);
    setOrCreateMeta('property', 'og:description', description);
    setOrCreateMeta('property', 'og:url', canonicalUrl);
    setOrCreateMeta('name', 'twitter:title', title);
    setOrCreateMeta('name', 'twitter:description', description);
  }, [title, description, canonicalPath, location.pathname, noindex]);

  return null;
}
