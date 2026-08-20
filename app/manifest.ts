import { MetadataRoute } from 'next'
import { SITE_NAME, SITE_DESCRIPTION } from '@/src/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'MCI',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1E33',
    theme_color: '#1E3A5F',
    lang: 'fr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/og-preview.png',
        sizes: '1200x630',
        type: 'image/png',
      },
    ],
  }
}
