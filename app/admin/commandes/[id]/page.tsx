import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import OrderDetailClient from './OrderDetailClient'

export const revalidate = 0

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let order: any = null

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      notFound()
    }
    order = data
  } catch (err) {
    notFound()
  }

  return <OrderDetailClient order={order} />
}
