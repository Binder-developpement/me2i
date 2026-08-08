import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditServiceClient from './EditServiceClient'

export const revalidate = 0

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let service: any = null

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      notFound()
    }
    service = data
  } catch (err) {
    notFound()
  }

  return <EditServiceClient service={service} />
}
