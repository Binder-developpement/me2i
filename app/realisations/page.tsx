import { fetchPublishedRealisations } from '@/src/lib/realisations-data'
import Realisations from '@/src/site-pages/Realisations'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Nos Réalisations et Projets Industriels',
  description: "Découvrez l'ensemble des projets ME2I au Cameroun : installations de groupes électrogènes, centrales solaires et automatisme industriel.",
  alternates: {
    canonical: '/realisations',
  },
  openGraph: {
    title: 'Nos Réalisations et Projets Industriels | ME2I Cameroun',
    description: 'Projets documentés d\'installations et de maintenance industrielle au Cameroun.',
  },
}

export default async function RealisationsPage() {
  const realisations = await fetchPublishedRealisations()
  return <Realisations realisations={realisations} />
}
