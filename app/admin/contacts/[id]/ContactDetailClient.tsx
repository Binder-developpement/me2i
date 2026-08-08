'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateContactStatusAction } from '@/src/admin/lib/contact-actions'
import { toast } from 'sonner'
import { ArrowLeft, Mail, Phone, User, CheckCircle2, Clock, Send } from 'lucide-react'

export default function ContactDetailClient({ contact }: { contact: any }) {
  const router = useRouter()
  const [status, setStatus] = useState(contact.status || 'read')

  const handleStatusChange = async (newStatus: 'read' | 'replied' | 'archived') => {
    try {
      setStatus(newStatus)
      await updateContactStatusAction(contact.id, newStatus)
      toast.success('Statut du message mis à jour !')
      router.refresh()
    } catch (err) {
      toast.error('Erreur lors de la mise à jour')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#c3c4c7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/contacts"
            className="p-1.5 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1d2327]">
              {contact.subject || 'Demande de contact'}
            </h1>
            <p className="text-xs text-[#646970] mt-0.5">
              Envoyé le {new Date(contact.created_at).toLocaleString('fr-FR')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${contact.email}?subject=RE: ${encodeURIComponent(contact.subject || 'Demande ME2I')}`}
            onClick={() => handleStatusChange('replied')}
            className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors shadow-sm"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Répondre par email</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main message content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#646970] border-b border-[#f0f0f1] pb-3 mb-4">
              Contenu du message
            </h2>
            <div className="prose max-w-none text-sm text-[#1e1e1e] whitespace-pre-wrap leading-relaxed">
              {contact.message}
            </div>
          </div>
        </div>

        {/* Right side info */}
        <div className="space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Traitement du message
            </div>
            <div className="p-4 space-y-3 text-xs">
              <label className="block text-[#646970] font-semibold">Statut actuel :</label>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusChange('read')}
                  className={`px-3 py-2 text-left rounded border transition-colors ${
                    status === 'read'
                      ? 'bg-blue-50 border-blue-400 font-bold text-blue-800'
                      : 'border-[#c3c4c7] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📖 Lu (en attente)
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('replied')}
                  className={`px-3 py-2 text-left rounded border transition-colors ${
                    status === 'replied'
                      ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-800'
                      : 'border-[#c3c4c7] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ✅ Traité / Répondu
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange('archived')}
                  className={`px-3 py-2 text-left rounded border transition-colors ${
                    status === 'archived'
                      ? 'bg-gray-200 border-gray-400 font-bold text-gray-800'
                      : 'border-[#c3c4c7] text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  📁 Archivé
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Expéditeur
            </div>
            <div className="p-4 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#8c8f94]" />
                <span className="font-bold text-[#1d2327]">{contact.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8c8f94]" />
                <a href={`mailto:${contact.email}`} className="text-[#2271b1] underline">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#8c8f94]" />
                  <a href={`tel:${contact.phone}`} className="text-[#2271b1] underline">
                    {contact.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
