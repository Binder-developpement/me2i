import { createServerClient } from '@/src/admin/lib/supabase-server'
import Contact from '@/src/site-pages/Contact'

export const revalidate = 0

export default async function ContactPage() {
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
    console.error('Error fetching company settings for contact page:', err)
  }

  return <Contact settings={settingsMap} />
}
