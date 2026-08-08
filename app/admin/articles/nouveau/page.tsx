'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createArticleAction } from '@/src/admin/lib/article-actions'
import RichEditor from '@/src/admin/components/RichEditor'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Eye, Check } from 'lucide-react'

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Technique')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    // Auto-slugify
    setSlug(
      val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    )
  }

  const handleSubmit = async (targetStatus?: 'draft' | 'published') => {
    if (!title.trim()) {
      toast.error('Le titre de l\'article est obligatoire')
      return
    }

    const finalStatus = targetStatus || status

    try {
      setLoading(true)
      await createArticleAction({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        category,
        excerpt,
        content,
        cover_url: coverUrl || undefined,
        status: finalStatus,
      })

      toast.success(
        finalStatus === 'published'
          ? 'Article publié avec succès !'
          : 'Brouillon enregistré'
      )
      router.push('/admin/articles')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création de l\'article')
    } finally {
      setLoading(false)
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
          <h1 className="text-2xl font-bold text-[#1d2327]">Ajouter un article</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={loading}
            className="px-3 py-1.5 border border-[#2271b1] text-[#2271b1] hover:bg-[#2271b1]/10 text-xs font-semibold rounded-sm transition-colors"
          >
            Enregistrer le brouillon
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>Publier</span>
          </button>
        </div>
      </div>

      {/* WordPress 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title input */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm">
            <input
              type="text"
              placeholder="Saisir le titre ici..."
              value={title}
              onChange={handleTitleChange}
              className="w-full text-xl font-bold text-[#1d2327] placeholder-[#8c8f94] focus:outline-none border-b border-transparent focus:border-[#2271b1] pb-2 transition-colors"
            />
            <div className="mt-2 flex items-center gap-1 text-xs text-[#646970]">
              <span className="font-semibold">Permalien :</span>
              <span className="text-[#2271b1] underline">
                {slug || 'mon-article'}
              </span>
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Extrait (Résumé court)
            </label>
            <textarea
              rows={2}
              placeholder="Un bref résumé de l'article pour les cartes d'actualités..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>

          {/* Rich Editor */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Contenu de l'article
            </label>
            <RichEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right Sidebar Panels (1/3) */}
        <div className="space-y-4">
          {/* Publish Settings Panel */}
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

              <div className="flex items-center justify-between border-t border-[#f0f0f1] pt-3">
                <span>Visibilité :</span>
                <span className="font-semibold text-emerald-700">Publique</span>
              </div>
            </div>
          </div>

          {/* Category Panel */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Catégories
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

          {/* Featured Image Panel */}
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
