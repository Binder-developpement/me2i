'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteServiceAction } from '@/src/admin/lib/service-actions'
import { toast } from 'sonner'
import { Search, Wrench } from 'lucide-react'

export default function ServiceListClient({
  initialServices,
}: {
  initialServices: any[]
}) {
  const router = useRouter()
  const [services, setServices] = useState(initialServices)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.category && s.category.toLowerCase().includes(search.toLowerCase()))
  )

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer le service "${title}" ?`)) return

    try {
      setDeletingId(id)
      await deleteServiceAction(id)
      setServices((prev) => prev.filter((s) => s.id !== id))
      toast.success('Service supprimé')
      router.refresh()
    } catch (err: any) {
      toast.error(err?.message || 'Erreur lors de la suppression')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher des services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs w-full sm:w-64 focus:outline-none focus:border-[#2271b1] bg-white font-normal"
          />
        </div>
        <span className="text-xs text-[#646970] font-normal">{filteredServices.length} service(s)</span>
      </div>

      {/* WordPress Table */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-x-auto shadow-sm w-full">
        <table className="w-full min-w-[550px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] uppercase tracking-wider font-normal">
              <th className="p-3 w-10 text-center">
                <input type="checkbox" className="rounded-sm border-[#8c8f94]" />
              </th>
              <th className="p-3 font-normal">Titre du Service</th>
              <th className="p-3 font-normal">Catégorie</th>
              <th className="p-3 font-normal">Statut</th>
              <th className="p-3 text-center font-normal">Ordre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3c4c7]/50 text-[#2c3338]">
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-xs text-[#646970]">
                  <Wrench className="h-8 w-8 mx-auto text-[#a7aaad] mb-2" />
                  Aucun service trouvé.
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-[#f0f6fc]/50 transition-colors group font-normal">
                  <td className="p-3 text-center">
                    <input type="checkbox" className="rounded-sm border-[#8c8f94]" />
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block"
                    >
                      {service.title}
                    </Link>
                    <div className="flex items-center gap-2 text-[11px] mt-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="text-[#2271b1] hover:underline font-normal"
                      >
                        Modifier
                      </Link>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(service.id, service.title)}
                        disabled={deletingId === service.id}
                        className="text-[#d63638] hover:underline font-normal"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-[#50575e] font-normal">{service.category || 'Général'}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm tracking-wider ${
                        service.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {service.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-xs font-normal">{service.order_index}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
