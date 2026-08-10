'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  trashRealisationAction,
  restoreRealisationAction,
  deleteRealisationAction,
} from '@/src/admin/lib/realisation-actions'
import { Search, Edit3, Trash2, RotateCcw, ExternalLink, Building, MapPin, Tag } from 'lucide-react'
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
        <div className="flex items-center gap-3 text-xs font-normal text-[#2c3338] border-b border-[#f0f0f1] sm:border-b-0 pb-2 sm:pb-0 flex-wrap">
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
          {countTrash > 0 && (
            <>
              <span>|</span>
              <button
                onClick={() => setActiveTab('trash')}
                className={`transition-colors ${
                  activeTab === 'trash'
                    ? 'text-red-700 underline font-normal'
                    : 'text-red-600 hover:text-red-800'
                }`}
              >
                Corbeille ({countTrash})
              </button>
            </>
          )}
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

      {/* MOBILE RESPONSIVE CARDS VIEW (< 768px) */}
      <div className="block md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
            Aucune réalisation trouvée.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start gap-3">
                {item.cover_url && (
                  <img
                    src={item.cover_url}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-sm border border-gray-200 shrink-0 bg-gray-50"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/realisations/${item.id}`}
                    className="font-semibold text-[#2271b1] hover:text-[#135e96] text-sm leading-snug block"
                  >
                    {item.title}
                  </Link>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-normal rounded-sm ${
                      item.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'trash'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status === 'published' ? 'Publié' : item.status === 'trash' ? 'Corbeille' : 'Brouillon'}
                  </span>
                </div>
              </div>

              {/* Info Badges */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#646970]">
                {item.category && (
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-[#2271b1]" />
                    <span>{item.category}</span>
                  </span>
                )}
                {item.client && (
                  <span className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-[#646970]" />
                    <span>{item.client}</span>
                  </span>
                )}
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#646970]" />
                    <span>{item.location}</span>
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#f0f0f1] flex flex-wrap items-center gap-3 text-xs">
                {activeTab === 'trash' ? (
                  <>
                    <button
                      onClick={() => handleRestore(item.id)}
                      className="text-[#2271b1] font-medium hover:underline"
                    >
                      Rétablir
                    </button>
                    <span className="text-[#c3c4c7]">|</span>
                    <button
                      onClick={() => handleDeletePermanent(item.id)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Supprimer
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/admin/realisations/${item.id}`}
                      className="text-[#2271b1] font-medium hover:underline"
                    >
                      Modifier
                    </Link>
                    <span className="text-[#c3c4c7]">|</span>
                    <button
                      onClick={() => handleTrash(item.id)}
                      className="text-[#d63638] font-medium hover:underline"
                    >
                      Corbeille
                    </button>
                    <span className="text-[#c3c4c7]">|</span>
                    <Link
                      href={`/realisations/${item.slug || item.id}`}
                      target="_blank"
                      className="text-[#2271b1] font-medium hover:underline"
                    >
                      Aperçu
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE VIEW (>= 768px) */}
      <div className="hidden md:block bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-x-auto w-full">
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
                  <td className="py-2.5 px-3">
                    <Link
                      href={`/admin/realisations/${item.id}`}
                      className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block"
                    >
                      {item.title}
                    </Link>
                    {item.subtitle && (
                      <p className="text-[11px] text-[#646970] line-clamp-1 font-normal mt-0.5">
                        {item.subtitle}
                      </p>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-[#50575e] font-normal">{item.category}</td>
                  <td className="py-2.5 px-3 text-[#50575e] font-normal">
                    <div>{item.client || '—'}</div>
                    <div className="text-[11px] text-[#646970]">{item.location || '—'}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm ${
                        item.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'trash'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status === 'published' ? 'Publié' : item.status === 'trash' ? 'Corbeille' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs font-normal">
                      {activeTab === 'trash' ? (
                        <>
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="text-[#2271b1] hover:underline"
                          >
                            Rétablir
                          </button>
                          <span className="text-[#c3c4c7]">|</span>
                          <button
                            onClick={() => handleDeletePermanent(item.id)}
                            className="text-red-600 hover:underline"
                          >
                            Supprimer
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/admin/realisations/${item.id}`}
                            className="text-[#2271b1] hover:underline"
                          >
                            Modifier
                          </Link>
                          <span className="text-[#c3c4c7]">|</span>
                          <button
                            onClick={() => handleTrash(item.id)}
                            className="text-[#d63638] hover:underline"
                          >
                            Corbeille
                          </button>
                          <span className="text-[#c3c4c7]">|</span>
                          <Link
                            href={`/realisations/${item.slug || item.id}`}
                            target="_blank"
                            className="text-[#2271b1] hover:underline"
                          >
                            Aperçu
                          </Link>
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
  )
}
