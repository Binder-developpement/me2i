'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  trashArticleAction,
  restoreArticleAction,
  deleteArticlePermanentlyAction,
  emptyTrashAction,
} from '@/src/admin/lib/article-actions'
import { toast } from 'sonner'
import { Search, Edit, Trash2, ExternalLink, RefreshCw, AlertTriangle } from 'lucide-react'

export default function ArticleListClient({
  initialArticles,
}: {
  initialArticles: any[]
}) {
  const router = useRouter()
  const [articles, setArticles] = useState(initialArticles)
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all')
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [emptying, setEmptying] = useState(false)

  // Filter articles by tab and search
  const filteredArticles = articles.filter((art) => {
    const isTrashed = art.status === 'trash'

    let matchesTab = false
    if (activeTab === 'all') matchesTab = !isTrashed
    else if (activeTab === 'published') matchesTab = art.status === 'published'
    else if (activeTab === 'draft') matchesTab = art.status === 'draft'
    else if (activeTab === 'trash') matchesTab = isTrashed

    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      (art.category && art.category.toLowerCase().includes(search.toLowerCase()))

    return matchesTab && matchesSearch
  })

  // Move to trash
  const handleTrash = async (id: string, title: string) => {
    try {
      setLoadingId(id)
      await trashArticleAction(id)
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'trash' } : a))
      )
      toast.success(`"${title}" a été déplacé dans la corbeille`)
      router.refresh()
    } catch {
      toast.error('Erreur lors du déplacement dans la corbeille')
    } finally {
      setLoadingId(null)
    }
  }

  // Restore from trash
  const handleRestore = async (id: string, title: string) => {
    try {
      setLoadingId(id)
      await restoreArticleAction(id)
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'draft' } : a))
      )
      toast.success(`"${title}" a été rétabli`)
      router.refresh()
    } catch {
      toast.error('Erreur lors de la restauration')
    } finally {
      setLoadingId(null)
    }
  }

  // Delete permanently
  const handleDeletePermanently = async (id: string, title: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer définitivement "${title}" ? Cette action est irréversible.`)) {
      return
    }

    try {
      setLoadingId(id)
      await deleteArticlePermanentlyAction(id)
      setArticles((prev) => prev.filter((a) => a.id !== id))
      toast.success('Article supprimé définitivement')
      router.refresh()
    } catch {
      toast.error('Erreur lors de la suppression définitive')
    } finally {
      setLoadingId(null)
    }
  }

  // Empty entire trash
  const handleEmptyTrash = async () => {
    if (!confirm('Voulez-vous vraiment vider toute la corbeille ? Tous les articles corbeille seront supprimés définitivement.')) {
      return
    }

    try {
      setEmptying(true)
      await emptyTrashAction()
      setArticles((prev) => prev.filter((a) => a.status !== 'trash'))
      toast.success('Corbeille vidée')
      router.refresh()
    } catch {
      toast.error('Erreur lors du vidage de la corbeille')
    } finally {
      setEmptying(false)
    }
  }

  const counts = {
    all: articles.filter((a) => a.status !== 'trash').length,
    published: articles.filter((a) => a.status === 'published').length,
    draft: articles.filter((a) => a.status === 'draft').length,
    trash: articles.filter((a) => a.status === 'trash').length,
  }

  return (
    <div className="space-y-4">
      {/* WordPress-style Status Tabs & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0 select-none">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`pb-1 px-1 font-semibold transition-colors ${
              activeTab === 'all'
                ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                : 'text-[#2271b1] hover:text-[#135e96]'
            }`}
          >
            Tous <span className="text-[#646970]">({counts.all})</span>
          </button>
          <span className="text-[#c3c4c7]">|</span>
          <button
            type="button"
            onClick={() => setActiveTab('published')}
            className={`pb-1 px-1 font-semibold transition-colors ${
              activeTab === 'published'
                ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                : 'text-[#2271b1] hover:text-[#135e96]'
            }`}
          >
            Publiés <span className="text-[#646970]">({counts.published})</span>
          </button>
          <span className="text-[#c3c4c7]">|</span>
          <button
            type="button"
            onClick={() => setActiveTab('draft')}
            className={`pb-1 px-1 font-semibold transition-colors ${
              activeTab === 'draft'
                ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                : 'text-[#2271b1] hover:text-[#135e96]'
            }`}
          >
            Brouillons <span className="text-[#646970]">({counts.draft})</span>
          </button>
          {counts.trash > 0 && (
            <>
              <span className="text-[#c3c4c7]">|</span>
              <button
                type="button"
                onClick={() => setActiveTab('trash')}
                className={`pb-1 px-1 font-semibold transition-colors ${
                  activeTab === 'trash'
                    ? 'text-red-700 border-b-2 border-red-600'
                    : 'text-red-600 hover:text-red-800'
                }`}
              >
                Corbeille <span className="text-[#646970]">({counts.trash})</span>
              </button>
            </>
          )}
        </div>

        {/* Search Input & Empty Trash button */}
        <div className="flex items-center gap-2">
          {activeTab === 'trash' && counts.trash > 0 && (
            <button
              type="button"
              onClick={handleEmptyTrash}
              disabled={emptying}
              className="px-3 py-1.5 border border-red-600 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-sm transition-colors disabled:opacity-50"
            >
              {emptying ? 'Vidage...' : 'Vider la corbeille'}
            </button>
          )}

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
            <input
              type="text"
              placeholder="Rechercher des articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table WordPress style */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-semibold">
              <th className="p-3 w-1/2">Titre</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f1]">
            {filteredArticles.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#646970]">
                  {activeTab === 'trash'
                    ? 'La corbeille est vide.'
                    : 'Aucun article trouvé.'}
                </td>
              </tr>
            ) : (
              filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-[#f6f7f7] group transition-colors">
                  <td className="p-3 align-top">
                    <Link
                      href={activeTab === 'trash' ? '#' : `/admin/articles/${article.id}`}
                      className="font-bold text-[#2271b1] hover:text-[#135e96] text-sm block mb-1"
                    >
                      {article.title}
                    </Link>

                    {/* WordPress Action Bar under row */}
                    <div className="flex items-center gap-2 text-[11px] opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {activeTab === 'trash' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRestore(article.id, article.title)}
                            disabled={loadingId === article.id}
                            className="text-[#2271b1] hover:underline font-semibold"
                          >
                            Rétablir
                          </button>
                          <span className="text-[#c3c4c7]">|</span>
                          <button
                            type="button"
                            onClick={() => handleDeletePermanently(article.id, article.title)}
                            disabled={loadingId === article.id}
                            className="text-red-600 hover:underline font-semibold"
                          >
                            Supprimer définitivement
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/admin/articles/${article.id}`}
                            className="text-[#2271b1] hover:underline font-semibold"
                          >
                            Modifier
                          </Link>
                          <span className="text-[#c3c4c7]">|</span>
                          <button
                            type="button"
                            onClick={() => handleTrash(article.id, article.title)}
                            disabled={loadingId === article.id}
                            className="text-[#d63638] hover:underline font-semibold"
                          >
                            Déplacer dans la corbeille
                          </button>
                          <span className="text-[#c3c4c7]">|</span>
                          <Link
                            href={`/blog/${article.id}`}
                            target="_blank"
                            className="text-[#2271b1] hover:underline"
                          >
                            Aperçu
                          </Link>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-[#50575e] align-top">
                    {article.category || 'Général'}
                  </td>
                  <td className="p-3 align-top">
                    {article.status === 'published' ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        Publié
                      </span>
                    ) : article.status === 'trash' ? (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-100 text-red-800">
                        Corbeille
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700">
                        Brouillon
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[#50575e] text-[11px] align-top">
                    {article.created_at
                      ? new Date(article.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-3 py-2 bg-[#f6f7f7] border-t border-[#c3c4c7] text-[11px] text-[#646970] flex items-center justify-between">
          <span>{filteredArticles.length} élément(s)</span>
        </div>
      </div>
    </div>
  )
}
