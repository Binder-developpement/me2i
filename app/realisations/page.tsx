import { fetchPublishedRealisations } from '@/src/lib/realisations-data'
import Realisations from '@/src/site-pages/Realisations'

export const revalidate = 0

export const metadata = {
  title: 'Nos Réalisations & Projets - ME2I',
  description: "Découvrez l'ensemble de nos réalisations industrielles, installations de groupes électrogènes, centrales solaires et automatisations au Cameroun et en Afrique centrale.",
}

export default async function RealisationsPage() {
  const realisations = await fetchPublishedRealisations()
  return <Realisations realisations={realisations} />
}
