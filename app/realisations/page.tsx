import { fetchPublishedRealisations } from '@/src/lib/realisations-data'
import Realisations from '@/src/site-pages/Realisations'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: 'Nos Réalisations et Projets de Maintenance Industrielle',
  description:
    "Découvrez les projets et réalisations de MCI au Cameroun : installations de groupes électrogènes, centrales solaires et systèmes d'automatisme.",
  path: '/realisations',
  keywords: [
    'réalisations MCI',
    'projets industriels Cameroun',
    'chantiers maintenance industrielle',
    'installations solaires Douala',
  ],
})

export default async function RealisationsPage() {
  const realisations = await fetchPublishedRealisations()
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Réalisations', url: '/realisations' },
        ]}
      />
      <Realisations realisations={realisations} />
    </>
  )
}
