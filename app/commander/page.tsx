import { createServerClient } from '@/src/admin/lib/supabase-server'
import OrderClient from '@/src/site-pages/OrderClient'

export const revalidate = 0

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; id?: string }>
}) {
  const params = await searchParams
  const itemType = params?.type === 'service' ? 'service' : 'product'
  const itemId = params?.id

  let selectedItem: any = null

  if (itemId) {
    try {
      const supabase = await createServerClient()
      const tableName = itemType === 'service' ? 'services' : 'products'
      const { data } = await supabase.from(tableName).select('*').eq('id', itemId).single()
      selectedItem = data
    } catch (err) {
      console.error('Error fetching item for order:', err)
    }
  }

  return <OrderClient itemType={itemType} selectedItem={selectedItem} />
}
