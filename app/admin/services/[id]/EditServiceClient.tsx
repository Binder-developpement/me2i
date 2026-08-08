'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateServiceAction, deleteServiceAction } from '@/src/admin/lib/service-actions'
import RichEditor from '@/src/admin/components/RichEditor'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { ArrowLeft, Save, Trash2, Loader2 } from 'lucide-react'

export default function EditServiceClient({ service }: { service: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [title, setTitle] = useState(service.title || '')
  const [slug, setSlug] = useState(service.slug || '')
  const [category, setCategory] = useState(service.category || 'Groupes Électrogènes')
  const [description, setDescription] = useState(service.description || '')
  const [content, setContent] = useState(service.content || '')
  const [iconName, setIconName] = useState(service.icon_name || 'Zap')
  const [coverUrl, setCoverUrl] = useState<string | null>(service.cover_url || null)
  const [orderIndex, setOrderIndex] = useState(service.order_index || 0)
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
        icon_name: iconName,
        cover_url: coverUrl || undefined,
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return

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
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#c3c4c7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="p-1.5 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold text-[#1d2327]">Modifier le service</h1>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm">
            <input
              type="text"
              placeholder="Nom du service..."
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
              Description courte
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Détails complets du service
            </label>
            <RichEditor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Paramètres
            </div>
            <div className="p-4 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span>Statut :</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white"
                >
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f0f0f1]">
                <span>Ordre d'affichage :</span>
                <input
                  type="number"
                  value={orderIndex}
                  onChange={(e) => setOrderIndex(Number(e.target.value))}
                  className="w-16 p-1 border border-[#8c8f94] rounded-sm text-xs text-center"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f0f0f1]">
                <span>Icône Lucide :</span>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white"
                >
                  <option value="Zap">⚡ Zap</option>
                  <option value="Wrench">🔧 Wrench</option>
                  <option value="Cpu">💻 Cpu</option>
                  <option value="Leaf">🌿 Leaf</option>
                  <option value="Settings">⚙️ Settings</option>
                  <option value="Shield">🛡️ Shield</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Domaine d'intervention
            </div>
            <div className="p-4 space-y-2 text-xs">
              {[
                'Groupes Électrogènes',
                'Installation Électrique',
                'Maintenance Industrielle',
                'Automatisme & Contrôle',
                'Énergies Renouvelables',
              ].map((cat) => (
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
              bucketName="service-covers"
              label="Illustration du service"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
