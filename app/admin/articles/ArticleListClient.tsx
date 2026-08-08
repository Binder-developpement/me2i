'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteArticleAction } from '@/src/admin/lib/article-actions'
import { toast } from 'sonner'
import { Search, Edit, Trash2, ExternalLink, FileText } from 'lucide-react'

export default function ArticleListClient({
  initialArticles,
}: {
  initialArticles: any[]
}) {
  const router = useRouter()
  const [articles, setArticles] = useState(initialArticles)
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'draft'>('all')
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredArticles = articles.filter((art) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'published' && art.status === 'published') ||
      (activeTab === 'draft' && art.status === 'draft')
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      (art.category && art.category.toLowerCase().includes(search.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer l'article "${title}" ?`)) return

    try {
      setDeletingId(id)
      await deleteArticleAction(id)
      setArticles((prev) => prev.filter((a) => a.id !== id))
      toast.success('Article supprimé avec succès')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeletingId(null)
    }
  }

  const counts = {
    all: articles.length,
    published: articles.filter((a) => a.status === 'published').length,
    draft: articles.filter((a) => a.status === 'draft').length,
  }

  return (
    <div className="space-y-4">
      {/* WordPress-style Status Tabs & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0">
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
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher des articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs w-full sm:w-64 focus:outline-none focus:border-[#2271b1] bg-white"
          />
        </div>
      </div>

      {/* WordPress Table */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] uppercase tracking-wider font-semibold">
                <th className="p-3 w-10 text-center">
                  <input type="checkbox" className="rounded-sm border-[#8c8f94]" />
                </th>
                <th className="p-3">Titre</th>
                <th className="p-3">Catégorie</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c4c7]/50 text-[#2c3338]">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-xs text-[#646970]">
                    <FileText className="h-8 w-8 mx-auto text-[#a7aaad] mb-2" />
                    Aucun article trouvé.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-[#f0f6fc]/50 transition-colors group"
                  >
                    <td className="p-3 text-center">
                      <input type="checkbox" className="rounded-sm border-[#8c8f94]" />
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="font-bold text-[#2271b1] hover:text-[#135e96] text-sm block"
                      >
                        {article.title}
                      </Link>
                      {/* WP Hover Action Bar */}
                      <div className="flex items-center gap-2 text-[11px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="text-[#2271b1] hover:underline font-semibold"
                        >
                          Modifier
                        </Link>
                        <span className="text-[#c3c4c7]">|</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deletingId === article.id}
                          className="text-[#d63638] hover:underline font-semibold"
                        >
                          Supprimer
                        </button>
                        <span className="text-[#c3c4c7]">|</span>
                        <Link
                          href={`/blog/${article.id}`}
                          target="_blank"
                          className="text-[#2271b1] hover:underline"
                        >
                          Aperçu
                        </Link>
                      </div>
                    </td>
                    <td className="p-3 text-[#50575e]">
                      {article.category || 'Général'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase tracking-wider ${
                          article.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="p-3 text-[#646970] text-[11px]">
                      {new Date(article.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#f6f7f7] border-t border-[#c3c4c7] text-[11px] text-[#646970] flex justify-between items-center">
          <span>{filteredArticles.length} élément(s)</span>
        </div>
      </div>
    </div>
  )
}
