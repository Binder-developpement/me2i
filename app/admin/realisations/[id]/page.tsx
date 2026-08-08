import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { fetchRealisationById } from '@/src/lib/realisations-data'
import { notFound } from 'next/navigation'
import EditRealisationClient from './EditRealisationClient'

export const revalidate = 0

export default async function EditRealisationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminAuth()
  const { id } = await params
  const item = await fetchRealisationById(id)

  if (!item) {
    notFound()
  }

  return <EditRealisationClient realisation={item} />
}
