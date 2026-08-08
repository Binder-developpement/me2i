'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCompanySettingsAction } from '@/src/admin/lib/setting-actions'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { Save, Loader2, Building, Phone, Mail, MapPin, Globe } from 'lucide-react'

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
    phone: initialSettings.phone || '+237 000 000 000',
    emergency_phone: initialSettings.emergency_phone || '+237 000 000 001',
    address: initialSettings.address || 'Cameroun — Afrique centrale',
    linkedin_url: initialSettings.linkedin_url || '',
    facebook_url: initialSettings.facebook_url || '',
    opening_hours: initialSettings.opening_hours || 'Lundi – Vendredi : 7h30 – 18h00',
    logo_url: initialSettings.logo_url || '',
  })

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await updateCompanySettingsAction(settings)
      toast.success('Paramètres enregistrés avec succès !')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* General info */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Building className="h-4 w-4 text-[#2271b1]" />
          Identité de l'entreprise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Slogan / Accroche
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
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
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#2271b1]" />
          Coordonnées de contact
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              E-mail officiel
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Téléphone principal
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Téléphone d'urgence (Astreinte 24h/7j)
            </label>
            <input
              type="text"
              value={settings.emergency_phone}
              onChange={(e) => handleChange('emergency_phone', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Adresse physique
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1d2327] mb-1">
            Horaires d'ouverture
          </label>
          <input
            type="text"
            value={settings.opening_hours}
            onChange={(e) => handleChange('opening_hours', e.target.value)}
            className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
          />
        </div>
      </div>

      {/* Social links */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#2271b1]" />
          Réseaux sociaux
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Lien LinkedIn
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/company/me2i"
              value={settings.linkedin_url}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1d2327] mb-1">
              Lien Facebook
            </label>
            <input
              type="url"
              placeholder="https://facebook.com/me2i"
              value={settings.facebook_url}
              onChange={(e) => handleChange('facebook_url', e.target.value)}
              className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-6 py-2.5 rounded-sm transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>Enregistrer tous les réglages</span>
        </button>
      </div>
    </form>
  )
}
