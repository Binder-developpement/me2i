import type { Metadata, Viewport } from 'next'
import './globals.css'
import Layout from '@/src/components/Layout'
import { constructMetadata, SITE_URL } from '@/src/lib/seo'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/src/components/seo/JsonLd'

export const metadata: Metadata = constructMetadata()

export const viewport: Viewport = {
  themeColor: '#1E3A5F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />

        {/* Geo / Regional Meta Tags for Cameroon */}
        <meta name="geo.region" content="CM-LT" />
        <meta name="geo.placename" content="Douala" />
        <meta name="geo.position" content="4.0511;9.7679" />
        <meta name="ICBM" content="4.0511, 9.7679" />

        {/* RSS Feed link for search engines & readers */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Flux RSS des Actualités MCI"
          href={`${SITE_URL}/feed.xml`}
        />

        {/* Structured Data (Schema.org) */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
