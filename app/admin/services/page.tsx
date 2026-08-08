import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ServiceListClient from './ServiceListClient'

export const revalidate = 0

export default async function ServicesListPage() {
  await requireAdminAuth()
  let services: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })

    services = data || []
  } catch (err) {
    console.error('Error fetching services:', err)
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327]">Services &amp; Domaines</h1>
          <p className="text-xs text-[#646970] font-normal mt-0.5">
            Gérez vos offres de services et prestations techniques
          </p>
        </div>
        <Link
          href="/admin/services/nouveau"
          className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ajouter un service</span>
        </Link>
      </div>

      <ServiceListClient initialServices={services} />
    </div>
  )
}
