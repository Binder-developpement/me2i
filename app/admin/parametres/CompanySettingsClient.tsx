'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCompanySettingsAction } from '@/src/admin/lib/setting-actions'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { Save, Loader2, Building, Phone, Globe, HelpCircle, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react'

interface FaqItem {
  id: string
  q: string
  a: string
}

export default function CompanySettingsClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    company_name: initialSettings.company_name || 'ME2I',
    tagline: initialSettings.tagline || 'Maintenance Industrielle & Énergie sans Interruption',
    email: initialSettings.email || 'contact@me2i.cm',
    phone: initialSettings.phone || '+237 699 00 00 00',
    emergency_phone: initialSettings.emergency_phone || '+237 677 00 00 00',
    address: initialSettings.address || 'Douala / Yaoundé, Cameroun',
    linkedin_url: initialSettings.linkedin_url || '',
    facebook_url: initialSettings.facebook_url || '',
    opening_hours: initialSettings.opening_hours || 'Lundi – Vendredi : 7h30 – 18h00',
    logo_url: initialSettings.logo_url || '',
  })

  // Parse or initialize FAQ items
  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    if (initialSettings.faq_items) {
      try {
        const parsed = JSON.parse(initialSettings.faq_items)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {
        console.error('Error parsing initial faq_items:', e)
      }
    }
    return [
      { id: '1', q: 'Quel est le délai de réponse à une demande de devis ?', a: 'Nos équipes techniques vous répondent sous 24 à 48 heures ouvrées.' },
      { id: '2', q: 'Intervenez-vous en urgence pour la maintenance ?', a: 'Oui, notre service d\'astreinte est disponible 24h/24 et 7j/7 pour les contrats de maintenance.' },
      { id: '3', q: 'Fournissez-vous des groupes électrogènes sur mesure ?', a: 'Nous proposons la vente, l\'installation et l\'hybridation de groupes électrogènes de toutes puissances.' },
    ]
  })

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  // FAQ Handlers
  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      { id: Date.now().toString(), q: '', a: '' },
    ])
  }

  const handleUpdateFaq = (id: string, key: 'q' | 'a', value: string) => {
    setFaqs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
    )
  }

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id))
  }

  const handleMoveFaq = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === faqs.length - 1) return

    const newFaqs = [...faqs]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const [movedItem] = newFaqs.splice(index, 1)
    newFaqs.splice(targetIndex, 0, movedItem)
    setFaqs(newFaqs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const payload = {
        ...settings,
        faq_items: JSON.stringify(faqs.filter((f) => f.q.trim() !== '' || f.a.trim() !== '')),
      }

      await updateCompanySettingsAction(payload)
      toast.success('Paramètres et FAQ enregistrés avec succès !')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl w-full">
      {/* General info */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Building className="h-4 w-4 text-[#2271b1]" />
          Identité de l'entreprise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Slogan / Accroche
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
        </div>

        <div>
          <ImageUpload
            value={settings.logo_url || null}
            onChange={(url) => handleChange('logo_url', url || '')}
            bucketName="company-assets"
            label="Logo officiel ME2I"
          />
        </div>
      </div>

      {/* Contact info */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#2271b1]" />
          Coordonnées de contact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              E-mail officiel
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Téléphone principal
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Téléphone d'urgence (Astreinte 24h/7j)
            </label>
            <input
              type="text"
              value={settings.emergency_phone}
              onChange={(e) => handleChange('emergency_phone', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Adresse physique
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-normal text-[#1d2327] mb-1">
            Horaires d'ouverture
          </label>
          <input
            type="text"
            value={settings.opening_hours}
            onChange={(e) => handleChange('opening_hours', e.target.value)}
            className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
          />
        </div>
      </div>

      {/* Social links */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#2271b1]" />
          Réseaux sociaux
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Lien LinkedIn
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/company/me2i"
              value={settings.linkedin_url}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
          <div>
            <label className="block text-xs font-normal text-[#1d2327] mb-1">
              Lien Facebook
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/me2i"
              value={settings.facebook_url}
              onChange={(e) => handleChange('facebook_url', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>
        </div>
      </div>

      {/* FAQ Management Section */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#f0f0f1] pb-3">
          <div>
            <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#2271b1]" />
              Foire Aux Questions (FAQ)
            </h2>
            <p className="text-xs text-[#646970] font-normal mt-0.5">
              Gérez les questions et réponses affichées sur la page de contact publique
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            className="inline-flex items-center gap-1 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Ajouter une question</span>
          </button>
        </div>

        <div className="space-y-4">
          {faqs.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#646970] bg-[#f6f7f7] border border-[#dcdcde] rounded-sm font-normal">
              Aucune question fréquente enregistrée. Cliquez sur "Ajouter une question" ci-dessus.
            </div>
          ) : (
            faqs.map((item, index) => (
              <div
                key={item.id}
                className="bg-[#f6f7f7] border border-[#c3c4c7] rounded-sm p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between border-b border-[#dcdcde] pb-2">
                  <span className="text-xs font-normal text-[#1d2327]">
                    Question #{index + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveFaq(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-[#646970] hover:text-[#1d2327] disabled:opacity-30"
                      title="Monter"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveFaq(index, 'down')}
                      disabled={index === faqs.length - 1}
                      className="p-1 text-[#646970] hover:text-[#1d2327] disabled:opacity-30"
                      title="Descendre"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(item.id)}
                      className="p-1 text-red-600 hover:text-red-800 ml-2"
                      title="Supprimer la question"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-[#1d2327] mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    placeholder="Saisissez la question..."
                    value={item.q}
                    onChange={(e) => handleUpdateFaq(item.id, 'q', e.target.value)}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-normal text-[#1d2327] mb-1">
                    Réponse
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Saisissez la réponse détaillée..."
                    value={item.a}
                    onChange={(e) => handleUpdateFaq(item.id, 'a', e.target.value)}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal resize-none"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-6 py-2.5 rounded-sm transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>Enregistrer tous les réglages et la FAQ</span>
        </button>
      </div>
    </form>
  )
}
