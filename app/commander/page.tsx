import { createServerClient } from '@/src/admin/lib/supabase-server'
import OrderClient from '@/src/site-pages/OrderClient'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: 'Commander un Équipement ou Demander un Devis',
  description:
    "Passez votre commande d'équipements ou demandez une intervention de maintenance auprès de MCI au Cameroun.",
  path: '/commander',
  keywords: [
    'commander équipement industriel',
    'devis maintenance groupe électrogène',
    'devis électricité industrielle Douala',
  ],
})

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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Commander', url: '/commander' },
        ]}
      />
      <OrderClient itemType={itemType} selectedItem={selectedItem} />
    </>
  )
}
