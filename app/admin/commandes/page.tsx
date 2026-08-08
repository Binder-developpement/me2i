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
    <div className="space-y-4 w-full">
      {/* Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm w-full">
        <h1 className="text-xl font-normal text-[#1d2327]">Commandes reçues</h1>
        <p className="text-xs text-[#646970] font-normal mt-0.5">
          Suivez les demandes d'achat et commandes des équipements industriels
        </p>
      </div>

      <OrderListClient initialOrders={orders} />
    </div>
  )
}
