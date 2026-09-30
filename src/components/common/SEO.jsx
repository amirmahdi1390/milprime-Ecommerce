import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({
  title,
  description = 'Milprime curates exceptional leather carryalls, precision timepieces, and apparel defined by architectural discipline and enduring materials.',
  canonical,
  image = 'https://milprime.shop/og-image.jpg',
  type = 'website',
  schema,
  noindex = false,
}) {
  const siteUrl = 'https://milprime.shop';
  const fullTitle = title ? `${title} — Milprime` : 'Milprime — Architectural Minimalism & Everyday Utility';
  const canonicalUrl = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;

  const defaultOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Milprime',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: [
      'https://twitter.com/milprime',
      'https://instagram.com/milprime',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-842-9102',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };

  const schemasToRender = schema ? (Array.isArray(schema) ? [defaultOrgSchema, ...schema] : [defaultOrgSchema, schema]) : [defaultOrgSchema];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Milprime" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemasToRender.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
