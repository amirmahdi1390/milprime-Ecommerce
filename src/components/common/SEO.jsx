import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({
  title,
  description = 'Milprime curates exceptional leather carryalls, precision timepieces, and apparel defined by architectural discipline and enduring materials.',
  canonical,
  url,
  image = 'https://milprime.shop/og-image.jpg',
  type = 'website',
  schema,
  noindex = false,
}) {
  const siteUrl = 'https://milprime.shop';

  // Prevent duplicate brand suffix if already present
  let fullTitle = 'Milprime — Architectural Minimalism & Everyday Utility';
  if (title) {
    const cleanTitle = title.trim();
    if (cleanTitle.includes('Milprime')) {
      fullTitle = cleanTitle;
    } else {
      fullTitle = `${cleanTitle} — Milprime`;
    }
  }

  // Support both canonical and url props consistently
  const targetPath = canonical || url;
  let canonicalUrl = siteUrl;
  if (targetPath) {
    if (targetPath.startsWith('http://') || targetPath.startsWith('https://')) {
      canonicalUrl = targetPath;
    } else {
      // Ensure leading slash and handle root
      if (targetPath === '/' || targetPath === '') {
        canonicalUrl = `${siteUrl}/`;
      } else {
        const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
        canonicalUrl = `${siteUrl}${cleanPath}`;
      }
    }
  }

  // Format absolute image URL
  const ogImage = image.startsWith('http://') || image.startsWith('https://')
    ? image
    : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;

  // Schemas to render
  const schemasToRender = schema
    ? (Array.isArray(schema) ? schema.filter(Boolean) : [schema])
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Self-referencing Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Index / Noindex directive */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph metadata */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Milprime" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
