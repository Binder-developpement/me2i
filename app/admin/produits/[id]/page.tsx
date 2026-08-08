import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditProductClient from './EditProductClient'

export const revalidate = 0

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminAuth()
  const { id } = await params
  let product: any = null

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      notFound()
    }
    product = data
  } catch (err) {
    notFound()
  }

  return <EditProductClient product={product} />
}
