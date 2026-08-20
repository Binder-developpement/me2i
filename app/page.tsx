import { createServerClient } from '@/src/admin/lib/supabase-server'
import Home from '@/src/site-pages/Home'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: 'MCI - Leader en Maintenance Industrielle et Énergie au Cameroun',
  description:
    'Expertise haut de gamme en maintenance industrielle, groupes électrogènes, automatisme, armoires électriques et installations solaires hybrides à Douala et Yaoundé.',
  path: '/',
  keywords: [
    'maintenance industrielle Cameroun',
    'groupes électrogènes Douala Yaoundé',
    'automatisme PLC',
    'onduleurs UPS',
    'énergie solaire industrielle',
  ],
})

export default async function HomePage() {
  let settingsMap: Record<string, string> = {
    company_name: 'MCI',
    tagline: 'Maintenance & Construction Industrielle',
    email: 'contact@mci.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    opening_hours: 'Lundi - Vendredi : 7h30 - 18h00',
  }
  let dbArticles: any[] = []

  try {
    const supabase = await createServerClient()

    // Fetch company settings
    const { data: settingsData } = await supabase.from('company_settings').select('*')
    if (settingsData && settingsData.length > 0) {
      settingsData.forEach((item: any) => {
        if (item.key && item.value) {
          settingsMap[item.key] = item.value
        }
      })
    }

    // Fetch latest published articles from database
    const { data: articlesData } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3)

    if (articlesData) {
      dbArticles = articlesData
    }
  } catch (err) {
    console.error('Erreur chargement donnees accueil:', err)
  }

  return (
    <Home
      settings={settingsMap}
      dbSettings={settingsMap}
      articles={dbArticles}
      dbArticles={dbArticles}
    />
  )
}
