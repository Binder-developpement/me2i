import { createServerClient } from '@/src/admin/lib/supabase-server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ProductListClient from './ProductListClient'

export const revalidate = 0

export default async function ProductsListPage() {
  let products: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    products = data || []
  } catch (err) {
    console.error('Error fetching products:', err)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#c3c4c7] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1d2327]">Produits &amp; Équipements</h1>
          <p className="text-xs text-[#646970] mt-0.5">
            Gérez le catalogue de matériels électriques et industriels à la vente
          </p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-3 py-2 rounded-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter un produit</span>
        </Link>
      </div>

      <ProductListClient initialProducts={products} />
    </div>
  )
}
