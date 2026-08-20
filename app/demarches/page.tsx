import { createServerClient } from '@/src/admin/lib/supabase-server'
import ProductsClient from '@/src/site-pages/ProductsClient'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd, ProductJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: 'Catalogue Produits et Équipements Industriels',
  description:
    'Achetez vos pièces détachées, équipements industriels et groupes électrogènes certifiés auprès de MCI au Cameroun.',
  path: '/demarches',
  keywords: [
    'produits industriels MCI',
    'vente groupe électrogène Douala',
    'pièces de rechange industrielles',
    'filtres et pièces Perkins Cummins SDMO',
  ],
})

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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Produits', url: '/demarches' },
        ]}
      />
      {productsList.map((product) => (
        <ProductJsonLd
          key={product.id}
          name={product.name}
          description={product.description}
          image={product.cover_url}
          price={product.price}
          currency={product.currency || 'XAF'}
          url={`/demarches#${product.slug || product.id}`}
          inStock={product.stock > 0 || product.status === 'published'}
        />
      ))}
      <ProductsClient initialProducts={productsList} />
    </>
  )
}
