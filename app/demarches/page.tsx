import { createServerClient } from '@/src/admin/lib/supabase-server'
import ProductsClient from '@/src/site-pages/ProductsClient'

export const revalidate = 0

export default async function ProductsPage() {
  let productsList: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    productsList = data || []
  } catch (err) {
    console.error('Erreur chargement produits:', err)
  }

  return <ProductsClient initialProducts={productsList} />
}
