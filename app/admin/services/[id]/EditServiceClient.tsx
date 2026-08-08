'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateServiceAction, deleteServiceAction } from '@/src/admin/lib/service-actions'
import RichEditor from '@/src/admin/components/RichEditor'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function EditServiceClient({ service }: { service: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [title, setTitle] = useState(service.title || '')
  const [slug, setSlug] = useState(service.slug || '')
  const [category, setCategory] = useState(service.category || 'Groupes Électrogènes')
  const [description, setDescription] = useState(service.description || '')
  const [content, setContent] = useState(service.content || '')
  const [coverUrl, setCoverUrl] = useState<string | null>(service.cover_url || null)
  const [iconName, setIconName] = useState(service.icon_name || 'Zap')
  const [orderIndex, setOrderIndex] = useState<number>(service.order_index ?? 0)
  const [status, setStatus] = useState<'published' | 'draft'>(service.status || 'published')

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error('Le titre du service est obligatoire')
      return
    }

    try {
      setLoading(true)
      await updateServiceAction(service.id, {
        title,
        slug,
        category,
        description,
        content,
        cover_url: coverUrl || undefined,
        icon_name: iconName,
        order_index: orderIndex,
        status,
      })

      toast.success('Service mis à jour avec succès !')
      router.push('/admin/services')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le service "${title}" ?`)) return

    try {
      setDeleting(true)
      await deleteServiceAction(service.id)
      toast.success('Service supprimé')
      router.push('/admin/services')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/services"
            className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
            title="Retour à la liste"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-normal text-[#1d2327]">Modifier le service</h1>
        </div>
      </div>

      {/* WordPress Full-Width Flex Layout: Central content takes full remaining width, sidebar 280px on extreme right */}
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        {/* Main Content Area (Expands to fill all central space) */}
        <div className="flex-1 min-w-0 space-y-3 w-full">
          {/* Title box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 space-y-2 shadow-sm">
            <input
              type="text"
              placeholder="Saisir le titre du service ici..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg font-normal text-[#1d2327] placeholder-[#8c8f94] focus:outline-none border-b border-[#dcdcde] focus:border-[#2271b1] pb-1.5 transition-colors"
            />
            <div className="flex items-center gap-1 text-xs text-[#646970]">
              <span className="font-normal">Permalien :</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-[#2271b1] bg-transparent border-b border-dashed border-gray-300 focus:outline-none focus:border-[#2271b1] px-1 font-normal max-w-full"
              />
            </div>
          </div>

          {/* Excerpt description box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 space-y-1.5 shadow-sm">
            <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider">
              Bref résumé du service
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>

          {/* Detailed Content Editor */}
          <div className="space-y-1.5">
            <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider">
              Présentation détaillée du service
            </label>
            <RichEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Right Sidebar (Extreme right, 280px width) */}
        <div className="w-full lg:w-72 shrink-0 space-y-3">
          {/* Card Publication */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Publication
            </div>

            <div className="p-3.5 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span className="font-normal">Statut :</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white font-normal"
                >
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-[#f0f0f1] pt-3">
                <span className="font-normal">Ordre d'affichage :</span>
                <input
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(Number(e.target.value))}
                  className="w-16 p-1 border border-[#8c8f94] rounded-sm text-xs bg-white text-center font-normal"
                />
              </div>
            </div>

            {/* Actions inside Publication Card */}
            <div className="px-3.5 py-2.5 bg-[#f6f7f7] border-t border-[#c3c4c7] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs text-red-600 hover:text-red-800 hover:underline font-normal disabled:opacity-50"
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-1 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm disabled:opacity-50"
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

          {/* Card Catégorie */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Catégorie de service
            </div>
            <div className="p-3.5 space-y-1.5 text-xs">
              {['Groupes Électrogènes', 'Solaire & Énergies', 'Automatisme & Électricité', 'Maintenance Industrielle', 'Audit'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#2271b1]">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="text-[#2271b1]"
                  />
                  <span className="font-normal">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Card Image d'illustration */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-3.5">
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              bucketName="article-covers"
              label="Illustration du service"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
