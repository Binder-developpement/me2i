import { createServerClient } from '@/src/admin/lib/supabase-server'
import OrderListClient from './OrderListClient'

export const revalidate = 0

export default async function OrdersListPage() {
  let orders: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    orders = data || []
  } catch (err) {
    console.error('Error fetching orders:', err)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#c3c4c7] pb-4">
        <h1 className="text-2xl font-bold text-[#1d2327]">Commandes reçues</h1>
        <p className="text-xs text-[#646970] mt-0.5">
          Suivez les demandes d'achat et commandes des équipements industriels
        </p>
      </div>

      <OrderListClient initialOrders={orders} />
    </div>
  )
}
