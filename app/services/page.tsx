import { createServerClient } from '@/src/admin/lib/supabase-server'
import ServicesClient from '@/src/site-pages/ServicesClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Nos Services et Expertises Industrielles',
  description: 'Services ME2I au Cameroun : Maintenance de groupes électrogènes, automatisme industriel, installation d\'onduleurs et énergies renouvelables.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Nos Services et Expertises Industrielles | ME2I Cameroun',
    description: 'Maintenance des groupes électrogènes, automatisme et installations électriques au Cameroun.',
  },
}

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
