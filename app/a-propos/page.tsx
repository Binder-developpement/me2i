import { createServerClient } from '@/src/admin/lib/supabase-server'
import About from '@/src/site-pages/About'

export const revalidate = 0

export default async function AboutPage() {
  let settingsMap: Record<string, string> = {
    company_name: 'ME2I',
    tagline: 'Maintenance Industrielle & Énergie sans Interruption',
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
    console.error('Error fetching company settings for About page:', err)
  }

  return <About settings={settingsMap} />
}
