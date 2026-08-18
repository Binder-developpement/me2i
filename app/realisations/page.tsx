import { fetchPublishedRealisations } from '@/src/lib/realisations-data'
import Realisations from '@/src/site-pages/Realisations'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export const metadata: Metadata = {
  title: 'Nos Réalisations et Projets de Maintenance Industrielle',
  description: "Découvrez les projets et réalisations de MCI au Cameroun : installations de groupes électrogènes, centrales solaires et systèmes d'automatisme.",
  keywords: [
    "réalisations MCI",
    "projets maintenance industrielle",
    "maintenances industrielles",
    "industrial maintenance projects",
    "installations groupes électrogènes",
    "power plant projects Cameroon",
    "centrales solaires industrielles"
  ],
  alternates: {
    canonical: `${baseUrl}/realisations`,
  },
  openGraph: {
    title: 'Nos Réalisations et Projets de Maintenance Industrielle | MCI',
    description: 'Projets documentés d\'installations et de maintenance industrielle au Cameroun.',
    url: `${baseUrl}/realisations`,
    images: [
      {
        url: `${baseUrl}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "MCI Réalisations et Projets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'Nos Réalisations et Projets de Maintenance Industrielle | MCI',
    description: 'Projets documentés d\'installations et de maintenance industrielle au Cameroun.',
    images: [`${baseUrl}/og-preview.png`],
  },
}

export default async function RealisationsPage() {
  const realisations = await fetchPublishedRealisations()
  return <Realisations realisations={realisations} />
}
