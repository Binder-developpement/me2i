import { createServerClient } from '@/src/admin/lib/supabase-server'
import Contact from '@/src/site-pages/Contact'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Contactez-nous - Devis et Intervention rapide 24h/7j',
  description: 'Besoin d\'une intervention ou d\'un devis gratuit au Cameroun ? Contactez les ingénieurs et techniciens MCI à Douala et Yaoundé.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contactez MCI | Maintenance & Devis gratuit au Cameroun',
    description: 'Demande d\'intervention 24/7 pour groupes électrogènes, automatisme et installations électriques.',
  },
}

export default async function ContactPage() {
  let settingsMap: Record<string, string> = {
    company_name: 'MCI',
    tagline: 'Maintenance & Construction Industrielle',
    email: 'contact@me2i.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    opening_hours: 'Lundi – Vendredi : 7h30 – 18h00',
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
    console.error('Erreur chargement parametres contact:', err)
  }

  return <Contact settings={settingsMap} />
}
