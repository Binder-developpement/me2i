import { fetchRealisationById } from '@/src/lib/realisations-data'
import RealisationDetail from '@/src/site-pages/RealisationDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const item = await fetchRealisationById(id)

  if (!item) {
    return {
      title: 'Réalisation introuvable',
    }
  }

  const imageUrl = item.image_url || item.image || `${baseUrl}/og-preview.png`
  const description = item.excerpt || item.description || `Réalisation de maintenance industrielle MCI : ${item.title}`

  return {
    title: item.title,
    description: description,
    keywords: [
      "maintenance industrielle",
      "maintenances industrielles",
      "industrial maintenance project",
      "réalisation MCI",
      "ingénierie industrielle Cameroun",
      "installation groupe électrogène"
    ],
    alternates: {
      canonical: `${baseUrl}/realisations/${id}`,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `${baseUrl}/realisations/${id}`,
      title: `${item.title} | MCI Réalisations`,
      description: description,
      siteName: 'MCI : Maintenance et Énergie',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: description,
      images: [imageUrl],
    },
  }
}

export default async function RealisationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await fetchRealisationById(id)

  if (!item) {
    notFound()
  }

  return <RealisationDetail realisation={item} />
}
