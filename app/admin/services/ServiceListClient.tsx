'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteServiceAction } from '@/src/admin/lib/service-actions'
import { toast } from 'sonner'
import { Search, Wrench, Tag, List, LayoutGrid } from 'lucide-react'

export default function ServiceListClient({
  initialServices,
}: {
  initialServices: any[]
}) {
  const router = useRouter()
  const [services, setServices] = useState(initialServices)
  const [activeStatus, setActiveStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredServices = services.filter((s) => {
    const matchesStatus = activeStatus === 'all' || s.status === activeStatus
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.category && s.category.toLowerCase().includes(search.toLowerCase()))
    return matchesStatus && matchesSearch
  })

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
      {/* Search & Actions Bar with View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm w-full">
        {/* Responsive Horizontal Scroll Tabs (no visible scrollbar on mobile) */}
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0 select-none overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full whitespace-nowrap shrink-0">
          <button
            type="button"
            onClick={() => setActiveStatus('all')}
            className={`pb-1 px-1 font-normal transition-colors ${
              activeStatus === 'all'
                ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                : 'text-[#2271b1] hover:text-[#135e96]'
            }`}
          >
            Tous <span className="text-[#646970]">({services.length})</span>
          </button>
          <span className="text-[#c3c4c7]">|</span>
          <button
            type="button"
            onClick={() => setActiveStatus('published')}
            className={`pb-1 px-1 font-normal transition-colors ${
              activeStatus === 'published'
                ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                : 'text-[#2271b1] hover:text-[#135e96]'
            }`}
          >
            Publiés <span className="text-[#646970]">({services.filter((s) => s.status === 'published').length})</span>
          </button>
          <span className="text-[#c3c4c7]">|</span>
          <button
            type="button"
            onClick={() => setActiveStatus('draft')}
            className={`pb-1 px-1 font-normal transition-colors ${
              activeStatus === 'draft'
                ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                : 'text-[#2271b1] hover:text-[#135e96]'
            }`}
          >
            Brouillons <span className="text-[#646970]">({services.filter((s) => s.status === 'draft').length})</span>
          </button>
        </div>

        {/* Right side controls: Search + View Switcher */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
            <input
              type="text"
              placeholder="Rechercher des services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center border border-[#8c8f94] rounded-sm overflow-hidden bg-white shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 flex items-center gap-1 text-xs font-normal transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#2271b1] text-white'
                  : 'text-[#50575e] hover:bg-[#f0f0f1]'
              }`}
              title="Vue Tableau"
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tableau</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 flex items-center gap-1 text-xs font-normal transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#2271b1] text-white'
                  : 'text-[#50575e] hover:bg-[#f0f0f1]'
              }`}
              title="Vue Cartes"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cartes</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW RENDER */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.length === 0 ? (
            <div className="col-span-full bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
              Aucun service trouvé.
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  {service.cover_url && (
                    <div className="h-36 w-full overflow-hidden rounded-sm mb-3 border border-gray-200 bg-gray-50">
                      <img
                        src={service.cover_url}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="font-semibold text-[#2271b1] hover:text-[#135e96] text-sm leading-snug"
                    >
                      {service.title}
                    </Link>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm shrink-0 ${
                        service.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {service.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#646970] mt-1">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-[#2271b1]" />
                      <span>{service.category || 'Général'}</span>
                    </span>
                    <span>Ordre: {service.order_index}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="text-[#2271b1] font-medium hover:underline"
                  >
                    Modifier
                  </Link>
                  <span className="text-[#c3c4c7]">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id, service.title)}
                    disabled={deletingId === service.id}
                    className="text-[#d63638] font-medium hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* DEFAULT VIEW MODE ('table'): Automatic Mobile Cards (< 768px), Desktop Table (>= 768px) */
        <>
          {/* MOBILE RESPONSIVE CARDS VIEW (< 768px) */}
          <div className="block md:hidden space-y-3">
            {filteredServices.length === 0 ? (
              <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
                Aucun service trouvé.
              </div>
            ) : (
              filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="font-semibold text-[#2271b1] hover:text-[#135e96] text-sm leading-snug"
                    >
                      {service.title}
                    </Link>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm shrink-0 ${
                        service.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {service.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#646970]">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-[#2271b1]" />
                      <span>{service.category || 'Général'}</span>
                    </span>
                    <span>Ordre: {service.order_index}</span>
                  </div>

                  <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="text-[#2271b1] font-medium hover:underline"
                    >
                      Modifier
                    </Link>
                    <span className="text-[#c3c4c7]">|</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id, service.title)}
                      disabled={deletingId === service.id}
                      className="text-[#d63638] font-medium hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE VIEW (>= 768px) */}
          <div className="hidden md:block bg-white border border-[#c3c4c7] rounded-sm overflow-x-auto shadow-sm w-full">
            <table className="w-full text-left text-xs border-collapse">
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
                        <div className="flex items-center gap-2 text-[11px] mt-1 opacity-100 transition-opacity">
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
        </>
      )}
    </div>
  )
}
