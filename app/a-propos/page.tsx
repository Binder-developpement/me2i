import { createServerClient } from '@/src/admin/lib/supabase-server'
import About from '@/src/site-pages/About'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: 'À propos de MCI - Expertise et Ingénierie Industrielle au Cameroun',
  description:
    "Découvrez l'histoire, la vision et l'équipe d'ingénieurs et techniciens de MCI, référence en maintenance industrielle et ingénierie énergétique.",
  path: '/a-propos',
  keywords: [
    'à propos MCI',
    'société maintenance industrielle Cameroun',
    'ingénieurs électromécanique Douala',
    'équipe technique MCI',
  ],
})

export default async function AboutPage() {
  let settingsMap: Record<string, string> = {
    company_name: 'MCI',
    tagline: 'Maintenance & Construction Industrielle',
    email: 'contact@mci.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    opening_hours: 'Lundi - Vendredi : 7h30 - 18h00',
  }

  try {
    const supabase = await createServerClient()
    const { data } = await supabase.from('company_settings').select('*')

    if (data && data.length > 0) {
      data.forEach((item: any) => {
        if (item.key && item.value) {
          settingsMap[item.key] = item.value
        }
      })
    }
  } catch (err) {
    console.error('Erreur chargement parametres a-propos:', err)
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'À propos', url: '/a-propos' },
        ]}
      />
      <About settings={settingsMap} />
    </>
  )
}
