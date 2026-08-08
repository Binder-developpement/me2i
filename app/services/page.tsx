import { createServerClient } from '@/src/admin/lib/supabase-server'
import ServicesClient from '@/src/site-pages/ServicesClient'

export const revalidate = 0

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

  return <ServicesClient initialServices={servicesList} />
}
