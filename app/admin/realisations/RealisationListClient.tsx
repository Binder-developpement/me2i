'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  trashRealisationAction,
  restoreRealisationAction,
  deleteRealisationAction,
} from '@/src/admin/lib/realisation-actions'
import { Search, Edit3, Trash2, RotateCcw, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

export default function RealisationListClient({
  initialRealisations,
  initialTab = 'all',
}: {
  initialRealisations: any[]
  initialTab?: string
}) {
  const [realisations, setRealisations] = useState(initialRealisations)
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'trash'>(
    initialTab as any
  )
  const [searchTerm, setSearchTerm] = useState('')

  const handleTrash = async (id: string) => {
    try {
      await trashRealisationAction(id)
      setRealisations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'trash' } : r))
      )
      toast.success('Réalisation mise à la corbeille')
    } catch (err) {
      toast.error('Erreur lors de la mise à la corbeille')
    }
  }

  const handleRestore = async (id: string) => {
    try {
      await restoreRealisationAction(id)
      setRealisations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'published' } : r))
      )
      toast.success('Réalisation restaurée')
    } catch (err) {
      toast.error('Erreur lors de la restauration')
    }
  }

  const handleDeletePermanent = async (id: string) => {
    if (confirm('Supprimer définitivement cette réalisation ? Action irréversible.')) {
      try {
        await deleteRealisationAction(id)
        setRealisations((prev) => prev.filter((r) => r.id !== id))
        toast.success('Réalisation supprimée définitivement')
      } catch (err) {
        toast.error('Erreur lors de la suppression')
      }
    }
  }

  const filtered = realisations.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client || '').toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === 'all') return item.status !== 'trash' && matchesSearch
    if (activeTab === 'published') return item.status === 'published' && matchesSearch
    if (activeTab === 'draft') return item.status === 'draft' && matchesSearch
    if (activeTab === 'trash') return item.status === 'trash' && matchesSearch
    return matchesSearch
  })

  const countAll = realisations.filter((r) => r.status !== 'trash').length
  const countPublished = realisations.filter((r) => r.status === 'published').length
  const countDraft = realisations.filter((r) => r.status === 'draft').length
  const countTrash = realisations.filter((r) => r.status === 'trash').length

  return (
    <div className="space-y-4 w-full">
      {/* Tabs and Search */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div className="flex items-center gap-3 text-xs font-normal text-[#2c3338] border-b border-[#f0f0f1] sm:border-b-0 pb-2 sm:pb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`transition-colors ${
              activeTab === 'all'
                ? 'text-[#2271b1] underline font-normal'
                : 'text-[#50575e] hover:text-[#2271b1]'
            }`}
          >
            Toutes ({countAll})
          </button>
          <span>|</span>
          <button
            onClick={() => setActiveTab('published')}
            className={`transition-colors ${
              activeTab === 'published'
                ? 'text-[#2271b1] underline font-normal'
                : 'text-[#50575e] hover:text-[#2271b1]'
            }`}
          >
            Publiées ({countPublished})
          </button>
          <span>|</span>
          <button
            onClick={() => setActiveTab('draft')}
            className={`transition-colors ${
              activeTab === 'draft'
                ? 'text-[#2271b1] underline font-normal'
                : 'text-[#50575e] hover:text-[#2271b1]'
            }`}
          >
            Brouillons ({countDraft})
          </button>
          <span>|</span>
          <button
            onClick={() => setActiveTab('trash')}
            className={`transition-colors ${
              activeTab === 'trash'
                ? 'text-[#d63638] underline font-normal'
                : 'text-[#50575e] hover:text-[#d63638]'
            }`}
          >
            Corbeille ({countTrash})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] font-normal"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[11px] font-normal uppercase tracking-wider text-[#50575e]">
                <th className="py-2.5 px-3 font-normal">Visuel</th>
                <th className="py-2.5 px-3 font-normal">Titre &amp; Description</th>
                <th className="py-2.5 px-3 font-normal">Catégorie</th>
                <th className="py-2.5 px-3 font-normal">Client / Lieu</th>
                <th className="py-2.5 px-3 font-normal">Statut</th>
                <th className="py-2.5 px-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c4c7] text-xs font-normal text-[#2c3338]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#646970] font-normal">
                    Aucune réalisation trouvée.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f6f7f7]/60 transition-colors">
                    {/* Visual Thumbnail */}
                    <td className="py-2.5 px-3 w-16">
                      <div className="relative w-12 h-12 bg-[#f0f0f1] border border-[#c3c4c7] rounded-sm overflow-hidden shrink-0">
                        {item.cover_url ? (
                          <Image
                            src={item.cover_url}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#646970]">
                            No img
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title & Description */}
                    <td className="py-2.5 px-3 max-w-xs sm:max-w-md">
                      <p className="text-xs font-normal text-[#1d2327] line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#646970] font-normal line-clamp-1 mt-0.5">
                        {item.subtitle || item.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-2 py-0.5 text-[11px] bg-[#f0f0f1] text-[#2c3338] border border-[#c3c4c7] rounded-sm font-normal">
                        {item.category || 'Maintenance'}
                      </span>
                    </td>

                    {/* Client / Location */}
                    <td className="py-2.5 px-3 text-[#50575e] font-normal">
                      <div>{item.client || 'Client ME2I'}</div>
                      <div className="text-[11px] text-[#646970] font-normal">{item.location || 'Douala'}</div>
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3">
                      {item.status === 'published' && (
                        <span className="inline-block px-2 py-0.5 text-[11px] bg-[#e7f5ea] text-[#007017] border border-[#b2e2bd] rounded-sm font-normal">
                          Publié
                        </span>
                      )}
                      {item.status === 'draft' && (
                        <span className="inline-block px-2 py-0.5 text-[11px] bg-[#fcf9e8] text-[#8a6d3b] border border-[#f5e7ac] rounded-sm font-normal">
                          Brouillon
                        </span>
                      )}
                      {item.status === 'trash' && (
                        <span className="inline-block px-2 py-0.5 text-[11px] bg-[#fcf0f1] text-[#d63638] border border-[#f5c6cb] rounded-sm font-normal">
                          Corbeille
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status !== 'trash' ? (
                          <>
                            <Link
                              href={`/realisations/${item.slug || item.id}`}
                              target="_blank"
                              className="text-[#646970] hover:text-[#2271b1] p-1"
                              title="Voir sur le site public"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              href={`/admin/realisations/${item.id}`}
                              className="text-[#2271b1] hover:text-[#135e96] p-1"
                              title="Modifier"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </Link>
                            <button
                              onClick={() => handleTrash(item.id)}
                              className="text-[#d63638] hover:text-[#a00] p-1"
                              title="Mettre à la corbeille"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleRestore(item.id)}
                              className="text-[#007017] hover:text-[#005010] p-1 flex items-center gap-1 text-[11px]"
                              title="Restaurer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Restaurer</span>
                            </button>
                            <button
                              onClick={() => handleDeletePermanent(item.id)}
                              className="text-[#d63638] hover:text-[#a00] p-1 flex items-center gap-1 text-[11px]"
                              title="Supprimer définitivement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Supprimer</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
