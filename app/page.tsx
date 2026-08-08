import { createServerClient } from '@/src/admin/lib/supabase-server'
import Home from '@/src/site-pages/Home'

export const revalidate = 0

export default async function HomePage() {
  let settingsMap: Record<string, string> = {
    company_name: 'ME2I',
    tagline: 'Maintenance Industrielle & Énergie sans Interruption',
    email: 'contact@me2i.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    opening_hours: 'Lundi – Vendredi : 7h30 – 18h00',
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

    // Fetch latest published articles
    const { data: articlesData } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3)

    if (articlesData && articlesData.length > 0) {
      dbArticles = articlesData
    }
  } catch (err) {
    console.error('Error fetching homepage data:', err)
  }

  return <Home settings={settingsMap} articles={dbArticles} />
}
