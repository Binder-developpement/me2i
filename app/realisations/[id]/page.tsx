import { fetchRealisationById } from '@/src/lib/realisations-data'
import RealisationDetail from '@/src/site-pages/RealisationDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  const description =
    item.excerpt || item.description || `Réalisation de maintenance industrielle MCI : ${item.title}`

  return constructMetadata({
    title: item.title,
    description,
    path: `/realisations/${id}`,
    image: item.image_url || item.image,
    keywords: [
      item.title,
      'réalisation MCI',
      'projet maintenance industrielle Cameroun',
      item.client || '',
      item.category || '',
    ],
  })
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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Réalisations', url: '/realisations' },
          { name: item.title, url: `/realisations/${id}` },
        ]}
      />
      <RealisationDetail realisation={item} />
    </>
  )
}
