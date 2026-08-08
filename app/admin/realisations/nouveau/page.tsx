'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createRealisationAction } from '@/src/admin/lib/realisation-actions'
import ImageUpload from '@/src/admin/components/ImageUpload'
import RichEditor from '@/src/admin/components/RichEditor'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewRealisationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Groupes Électrogènes')
  const [subtitle, setSubtitle] = useState('')
  const [client, setClient] = useState('Site Industriel')
  const [location, setLocation] = useState('Douala, Cameroun')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'draft' | 'published'>('published')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    const generated = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setSlug(generated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) {
      toast.error('Veuillez saisir un titre')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('slug', slug)
      formData.append('category', category)
      formData.append('subtitle', subtitle)
      formData.append('client', client)
      formData.append('location', location)
      formData.append('description', description)
      formData.append('content', content)
      formData.append('cover_url', coverUrl || '')
      formData.append('status', status)

      await createRealisationAction(formData)
      toast.success('Réalisation créée avec succès')
      router.push('/admin/realisations')
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto w-full">
      {/* Header Card */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/realisations"
            className="text-[#50575e] hover:text-[#2271b1] p-1.5 border border-[#c3c4c7] rounded-sm transition-colors"
            title="Retour à la liste"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-normal text-[#1d2327]">Nouvelle réalisation</h1>
            <p className="text-xs text-[#646970] font-normal mt-0.5">
              Ajoutez un nouveau projet à votre catalogue de référence
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-4 py-2 rounded-sm transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Enregistrer</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Title, Slug, Description, Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">
                Titre de la réalisation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Ex: Câblage complet d'un groupe électrogène de 250kVA..."
                required
                className="w-full px-3 py-2 text-sm bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">
                Permalien (Slug)
              </label>
              <div className="flex items-center text-xs text-[#646970]">
                <span className="bg-[#f0f0f1] px-2 py-1.5 border border-r-0 border-[#8c8f94] rounded-l-sm">
                  /realisations/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-2 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-r-sm focus:outline-none focus:border-[#2271b1] font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">
                Sous-titre / Spécification courte
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex: Groupe électrogène 250kVA - Carte DSE 6120"
                className="w-full px-3 py-2 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">
                Résumé de l'intervention
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Présentation synthétique du projet..."
                className="w-full px-3 py-2 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-2">
                Description détaillée du projet
              </label>
              <RichEditor value={content} onChange={setContent} />
            </div>
          </div>
        </div>

        {/* Right Column: Metadata, Cover Image & Status */}
        <div className="space-y-4">
          {/* Status Box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-3">
            <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-2">
              Publication
            </h2>
            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">Statut</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] font-normal"
              >
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>
            </div>
          </div>

          {/* Category & Client Box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-3">
            <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-2">
              Informations Projet
            </h2>
            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] font-normal"
              >
                <option value="Groupes Électrogènes">Groupes Électrogènes</option>
                <option value="Automatisme & Coffrets">Automatisme &amp; Coffrets</option>
                <option value="Énergie Solaire">Énergie Solaire</option>
                <option value="Énergies Renouvelables & Stockage">Énergies Renouvelables &amp; Stockage</option>
                <option value="Maintenance Corrective">Maintenance Corrective</option>
                <option value="Maintenance Préventive">Maintenance Préventive</option>
                <option value="Froid Industriel & Climatisation">Froid Industriel &amp; Climatisation</option>
                <option value="Sécurité & Contrôle">Sécurité &amp; Contrôle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">Client</label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Ex: Site Industriel / Boulangerie..."
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-[#1d2327] mb-1">Localisation</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Douala, Cameroun"
                className="w-full px-3 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] font-normal"
              />
            </div>
          </div>

          {/* Cover Image Upload Box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-3">
            <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-2">
              Photo Principale de la Réalisation
            </h2>
            <ImageUpload value={coverUrl} onChange={setCoverUrl} folder="realisations" />
          </div>
        </div>
      </form>
    </div>
  )
}
