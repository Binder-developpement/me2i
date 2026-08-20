import { createServerClient } from '@/src/admin/lib/supabase-server'
import ServicesClient from '@/src/site-pages/ServicesClient'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: 'Nos Services et Solutions de Maintenance Industrielle',
  description:
    "Services d'ingénierie MCI au Cameroun : maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et installations UPS.",
  path: '/services',
  keywords: [
    'services maintenance industrielle',
    'contrat maintenance groupe électrogène',
    'ingénierie électrique Douala',
    'dépannage automates industriels',
    'onduleurs de secours Cameroun',
  ],
})

export default async function ServicesPage() {
  let servicesList: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    servicesList = data || []
  } catch (err) {
    console.error('Erreur chargement services:', err)
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Services', url: '/services' },
        ]}
      />
      {servicesList.map((service) => (
        <ServiceJsonLd
          key={service.id}
          title={service.title}
          description={service.description || service.title}
          url={`/services#${service.slug || service.id}`}
          image={service.cover_url}
        />
      ))}
      <ServicesClient initialServices={servicesList} />
    </>
  )
}
