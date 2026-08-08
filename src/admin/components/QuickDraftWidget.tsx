'use client'

import { useState } from 'react'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function QuickDraftWidget() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Veuillez saisir un titre pour le brouillon')
      return
    }

    try {
      setSaving(true)
      const supabase = createClientSupabase()

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `brouillon-${Date.now()}`

      const { error } = await supabase.from('articles').insert([
        {
          title: title.trim(),
          slug,
          content: content.trim(),
          excerpt: content.trim().substring(0, 120),
          status: 'draft',
          published_at: null,
        },
      ])

      if (error) {
        toast.error('Erreur lors de l\'enregistrement : ' + error.message)
        return
      }

      toast.success('Brouillon enregistré avec succès !')
      setTitle('')
      setContent('')
      router.refresh()
    } catch {
      toast.error('Erreur lors de la sauvegarde du brouillon')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSaveDraft} className="space-y-3 p-4">
      <div>
        <label className="block text-xs text-[#1d2327] font-normal mb-1">
          Titre
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du brouillon..."
          className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs font-normal focus:outline-none focus:border-[#2271b1] bg-white"
        />
      </div>

      <div>
        <label className="block text-xs text-[#1d2327] font-normal mb-1">
          Contenu
        </label>
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="À quoi pensez-vous ?"
          className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs font-normal focus:outline-none focus:border-[#2271b1] bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center justify-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3.5 py-1.5 rounded-sm transition-colors disabled:opacity-50"
      >
        {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        <span>Enregistrer le brouillon</span>
      </button>
    </form>
  )
}
