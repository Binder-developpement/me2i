import React from 'react'
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  COMPANY_CONTACT,
  getAbsoluteUrl,
} from '@/src/lib/seo'

/**
 * Organization & LocalBusiness JSON-LD
 */
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ['MCI', 'MCI SARL', 'MCI Maintenance Industrielle'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
    },
    image: DEFAULT_OG_IMAGE,
    description: SITE_DESCRIPTION,
    priceRange: '$$$',
    telephone: COMPANY_CONTACT.phone,
    email: COMPANY_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zone Industrielle de Bassa / Bonabéri',
      addressLocality: 'Douala',
      addressRegion: 'Littoral',
      postalCode: 'BP 0000',
      addressCountry: 'CM',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.0511,
      longitude: 9.7679,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '07:30',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
        description: 'Permanence dépannage urgence 24/7',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Cameroon' },
      { '@type': 'AdministrativeArea', name: 'Afrique centrale' },
      { '@type': 'City', name: 'Douala' },
      { '@type': 'City', name: 'Yaoundé' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_CONTACT.phone,
        contactType: 'customer service',
        areaServed: 'CM',
        availableLanguage: ['French', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_CONTACT.emergencyPhone,
        contactType: 'emergency',
        areaServed: 'CM',
        availableLanguage: ['French', 'English'],
      },
    ],
    sameAs: [
      COMPANY_CONTACT.linkedin,
      COMPANY_CONTACT.facebook,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * WebSite Schema with Sitelinks SearchBox
 */
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'MCI Cameroun',
    url: SITE_URL,
    description: SITE_TAGLINE,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'fr-FR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Breadcrumbs JSON-LD for rich snippet navigation in Google
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Article / TechArticle JSON-LD for blog and news posts
 */
export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = 'MCI Maintenance et Énergie',
  category = 'Maintenance Industrielle',
}: {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  authorName?: string
  category?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getAbsoluteUrl(url),
    },
    headline: title,
    description,
    image: image ? [image.startsWith('http') ? image : getAbsoluteUrl(image)] : [DEFAULT_OG_IMAGE],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    articleSection: category,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Service JSON-LD Schema
 */
export function ServiceJsonLd({
  title,
  description,
  url,
  image,
}: {
  title: string
  description: string
  url: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: title,
    description,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Cameroon',
    },
    url: getAbsoluteUrl(url),
    image: image ? (image.startsWith('http') ? image : getAbsoluteUrl(image)) : DEFAULT_OG_IMAGE,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Product JSON-LD Schema
 */
export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = 'XAF',
  url,
  inStock = true,
}: {
  name: string
  description?: string
  image?: string
  price?: number
  currency?: string
  url: string
  inStock?: boolean
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description || name,
    image: image ? (image.startsWith('http') ? image : getAbsoluteUrl(image)) : DEFAULT_OG_IMAGE,
    url: getAbsoluteUrl(url),
    brand: {
      '@type': 'Brand',
      name: 'MCI',
    },
    offers: {
      '@type': 'Offer',
      price: price || '0.00',
      priceCurrency: currency,
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
