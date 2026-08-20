import { MetadataRoute } from 'next'
import { SITE_URL } from '@/src/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Applebot',
          'DuckDuckBot',
          'YandexBot',
        ],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: [
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
          'WhatsApp',
          'TelegramBot',
          'Slackbot',
          'Pinterestbot',
          'Discordbot',
        ],
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
