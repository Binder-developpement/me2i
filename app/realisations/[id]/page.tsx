import { fetchRealisationById } from '@/src/lib/realisations-data'
import RealisationDetail from '@/src/site-pages/RealisationDetail'
import { notFound } from 'next/navigation'

export const revalidate = 0

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
