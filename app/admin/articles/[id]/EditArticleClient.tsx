'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateArticleAction, deleteArticleAction } from '@/src/admin/lib/article-actions'
import RichEditor from '@/src/admin/components/RichEditor'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { ArrowLeft, Save, Trash2, Loader2 } from 'lucide-react'

export default function EditArticleClient({ article }: { article: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [title, setTitle] = useState(article.title || '')
  const [slug, setSlug] = useState(article.slug || '')
  const [category, setCategory] = useState(article.category || 'Technique')
  const [excerpt, setExcerpt] = useState(article.excerpt || '')
  const [content, setContent] = useState(article.content || '')
  const [coverUrl, setCoverUrl] = useState<string | null>(article.cover_url || null)
  const [status, setStatus] = useState<'draft' | 'published'>(article.status || 'draft')

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Le titre de l\'article est obligatoire')
      return
    }

    try {
      setLoading(true)
      await updateArticleAction(article.id, {
        title,
        slug,
        category,
        excerpt,
        content,
        cover_url: coverUrl || undefined,
        status,
      })

      toast.success('Article mis à jour avec succès !')
      router.push('/admin/articles')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return

    try {
      setDeleting(true)
      await deleteArticleAction(article.id)
      toast.success('Article supprimé')
      router.push('/admin/articles')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between border-b border-[#c3c4c7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-1.5 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold text-[#1d2327]">Modifier l'article</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-sm transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Supprimer</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>Mettre à jour</span>
          </button>
        </div>
      </div>

      {/* WordPress 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm">
            <input
              type="text"
              placeholder="Titre de l'article"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xl font-bold text-[#1d2327] placeholder-[#8c8f94] focus:outline-none border-b border-transparent focus:border-[#2271b1] pb-2 transition-colors"
            />
            <div className="mt-2 flex items-center gap-1 text-xs text-[#646970]">
              <span className="font-semibold">Permalien :</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-[#2271b1] bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#2271b1] px-1"
              />
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Extrait (Résumé court)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Contenu de l'article
            </label>
            <RichEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right Sidebar Panels (1/3) */}
        <div className="space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Publication
            </div>
            <div className="p-4 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span>Statut :</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white"
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>
              <div className="text-[11px] text-[#646970] pt-2 border-t border-[#f0f0f1]">
                Créé le : {new Date(article.created_at).toLocaleString('fr-FR')}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Catégorie
            </div>
            <div className="p-4 space-y-2 text-xs">
              {['Technique', 'Prévention', 'Réglementation', 'Équipe', 'Solaire', 'Industrie'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#2271b1]">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="text-[#2271b1]"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-4">
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              bucketName="article-covers"
              label="Image mise en avant"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
