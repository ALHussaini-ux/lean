import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageMetadataProps {
  title: string;
  description: string;
}

export default function PageMetadata({ title, description }: PageMetadataProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Find or Create Meta Description Tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Find or Create Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    // Formulate clean canonical link based on original site URL and clean pathname
    const cleanCanonicalUrl = `${window.location.origin}${location.pathname}`;
    canonicalLink.setAttribute('href', cleanCanonicalUrl);

    // 4. Ensure Search Engine Indexing (Robots meta)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow');
  }, [title, description, location.pathname]);

  return null;
}
