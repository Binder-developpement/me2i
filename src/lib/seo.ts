import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mci.cm'
export const SITE_NAME = 'MCI - Maintenance & Construction Industrielle'
export const SITE_TAGLINE = 'Leader en Maintenance Industrielle et Énergie au Cameroun'
export const SITE_DESCRIPTION =
  "Expertise d'excellence au Cameroun en maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et installations solaires hybrides 24h/7j à Douala et Yaoundé."

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-preview.png`

export const COMPANY_CONTACT = {
  phone: '+237 699 00 00 00',
  emergencyPhone: '+237 677 00 00 00',
  email: 'contact@mci.cm',
  address: 'Douala / Yaoundé, Cameroun',
  city: 'Douala',
  country: 'CM',
  hours: 'Lundi - Vendredi : 7h30 - 18h00 / Urgence 24h/7j',
  linkedin: 'https://linkedin.com/company/mci-cameroun',
  facebook: 'https://facebook.com/mci.cameroun',
}

export const SEO_KEYWORDS = [
  // Mots-clés français principaux
  'MCI',
  'MCI SARL',
  'MCI Cameroun',
  'maintenance industrielle Cameroun',
  'maintenance de groupes électrogènes',
  'dépannage groupe électrogène Douala',
  'maintenance groupe électrogène Yaoundé',
  'automatisme industriel',
  'armoires électriques industrielles',
  'onduleurs industriels UPS',
  'énergie sans interruption',
  'hybridation solaire groupe électrogène',
  'audit énergétique industriel',
  'chaudronnerie et tuyauterie industrielle',
  'électromécanique industrielle',
  'contrat de maintenance préventive',
  'génie électrique Cameroun',
  'Perkins SDMO Cummins Caterpillar Cameroun',

  // English Keywords for regional & international SEO
  'industrial maintenance Cameroon',
  'power generator maintenance Africa',
  'industrial automation Douala',
  'uninterruptible power supply UPS Cameroon',
  'electrical engineering Central Africa',
  'backup generator services Cameroon',
  'hybrid solar power systems industrial',
]

/**
 * Builds a standardized absolute URL for canonicals and OpenGraph
 */
export function getAbsoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`
}

/**
 * Helper to construct robust page metadata with OpenGraph and Twitter tags
 */
export function constructMetadata({
  title,
  description = SITE_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  path = '',
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: {
  title?: string
  description?: string
  image?: string
  path?: string
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
} = {}): Metadata {
  const fullTitle = title ? `${title} | MCI Cameroun` : `${SITE_NAME} - ${SITE_TAGLINE}`
  const canonicalUrl = getAbsoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : getAbsoluteUrl(image)

  const mergedKeywords = Array.from(new Set([...SEO_KEYWORDS, ...keywords]))

  return {
    title: title ? title : { default: fullTitle, template: '%s | MCI Cameroun' },
    description,
    keywords: mergedKeywords,
    authors: authors ? authors.map((name) => ({ name })) : [{ name: 'MCI Maintenance & Énergie' }],
    creator: 'MCI',
    publisher: 'MCI SARL',
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr-CM': canonicalUrl,
        'fr-FR': canonicalUrl,
        'en-CM': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      alternateLocale: ['en_US', 'fr_CM'],
      type: type as any,
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors: authors || ['MCI Maintenance Industrielle'],
            section: 'Ingénierie & Maintenance Industrielle',
            tags: keywords,
          }
        : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@MCICameroun',
      site: '@MCICameroun',
    },
    other: {
      'format-detection': 'telephone=no',
      'theme-color': '#1E3A5F',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'MCI',
    },
  }
}
