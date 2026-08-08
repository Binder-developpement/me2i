'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, HelpCircle, Loader2 } from 'lucide-react'
import { createContactAction } from '@/src/admin/lib/contact-actions'
import { toast } from 'sonner'

export default function Contact({ settings = {} }: { settings?: Record<string, string> }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const companyName = settings.company_name || 'ME2I'
  const email = settings.email || 'contact@me2i.cm'
  const phone = settings.phone || '+237 699 00 00 00'
  const emergencyPhone = settings.emergency_phone || '+237 677 00 00 00'
  const address = settings.address || 'Douala / Yaoundé, Cameroun'
  const openingHours = settings.opening_hours || 'Lundi – Vendredi : 7h30 – 18h00'

  // Dynamic FAQ list from admin settings
  const faqsList: Array<{ id?: string; q: string; a: string }> = (() => {
    if (settings.faq_items) {
      try {
        const parsed = JSON.parse(settings.faq_items)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      } catch (e) {
        console.error('Error parsing contact faqs:', e)
      }
    }
    return [
      { q: 'Quel est le délai de réponse à une demande de devis ?', a: 'Nos équipes techniques vous répondent sous 24 à 48 heures ouvrées.' },
      { q: 'Intervenez-vous en urgence pour la maintenance ?', a: 'Oui, notre service d\'astreinte est disponible 24h/24 et 7j/7 pour les contrats de maintenance.' },
      { q: 'Fournissez-vous des groupes électrogènes sur mesure ?', a: 'Nous proposons la vente, l\'installation et l\'hybridation de groupes électrogènes de toutes puissances.' },
    ]
  })()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    try {
      setLoading(true)
      await createContactAction({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      })
      setSent(true)
      toast.success('Message envoyé avec succès !')
    } catch (err: any) {
      toast.error(err?.message || 'Erreur lors de l\'envoi du message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Header Title styled like /demarches */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-none bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            Contact {companyName}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Contactez {companyName}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Une étude technique, un devis de maintenance ou une commande ? Notre équipe d'ingénieurs et techniciens est à votre écoute.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-normal text-[#1d2327] mb-6">Formulaire de contact</h2>
            {sent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-sm font-normal">
                Votre message a bien été transmis aux équipes {companyName}. Nous vous recontacterons dans les plus brefs délais.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-sm outline-none focus:border-[#2271b1] text-sm font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      placeholder="nom@entreprise.cm"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-sm outline-none focus:border-[#2271b1] text-sm font-normal"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="+237 6XX XX XX XX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-sm outline-none focus:border-[#2271b1] text-sm font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                      Objet de la demande
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Demande de devis groupe électrogène"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full h-11 px-3.5 border border-gray-300 rounded-sm outline-none focus:border-[#2271b1] text-sm font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                    Votre message *
                  </label>
                  <textarea
                    placeholder="Détaillez votre besoin technique ou votre projet..."
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3.5 border border-gray-300 rounded-sm outline-none focus:border-[#2271b1] text-sm font-normal resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 bg-[#2271b1] hover:bg-[#135e96] text-white font-normal text-sm rounded-none transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Envoyer le message</span>
                </button>
              </form>
            )}

            {/* Dynamic FAQ list */}
            {faqsList.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-normal text-[#1d2327] mb-6 flex items-center gap-2">
                  <HelpCircle size={20} className="text-[#2271b1]" />
                  Questions fréquentes
                </h2>
                <div className="space-y-3">
                  {faqsList.map((faq, index) => (
                    <div key={faq.id || index} className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
                      <p className="font-normal text-[#1d2327] text-sm mb-1">{faq.q}</p>
                      <p className="text-xs text-[#646970] font-normal">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info sidebar dynamically populated from admin parameters */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#2271b1] mt-0.5 shrink-0" />
                <div>
                  <p className="font-normal text-[#1d2327] text-sm">Siège &amp; Adresse</p>
                  <p className="text-xs text-[#646970] font-normal">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-[#2271b1] mt-0.5 shrink-0" />
                <div>
                  <p className="font-normal text-[#1d2327] text-sm">Horaires d'ouverture</p>
                  <p className="text-xs text-[#646970] font-normal">{openingHours}</p>
                  {emergencyPhone && (
                    <p className="text-xs text-emerald-700 font-normal mt-0.5">
                      Astreinte / Urgence : {emergencyPhone}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#2271b1] mt-0.5 shrink-0" />
                <div>
                  <p className="font-normal text-[#1d2327] text-sm">Email direct</p>
                  <a href={`mailto:${email}`} className="text-xs text-[#2271b1] hover:underline font-normal">
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#2271b1] mt-0.5 shrink-0" />
                <div>
                  <p className="font-normal text-[#1d2327] text-sm">Téléphone &amp; Support</p>
                  <a href={`tel:${phone}`} className="text-xs text-[#646970] hover:text-[#2271b1] font-normal">
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
