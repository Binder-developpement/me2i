'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateContactStatusAction, deleteContactAction } from '@/src/admin/lib/contact-actions'
import { toast } from 'sonner'
import { ArrowLeft, User, Mail, Phone, Clock, Send, Trash2 } from 'lucide-react'

export default function ContactDetailClient({ contact }: { contact: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<string>(contact.status || 'unread')
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    try {
      setLoading(true)
      await updateContactStatusAction(contact.id, newStatus)
      setStatus(newStatus)
      toast.success('Statut mis à jour !')
      router.refresh()
    } catch {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Voulez-vous vraiment supprimer le message de ${contact.name} ?`)) return

    try {
      setDeleting(true)
      await deleteContactAction(contact.id)
      toast.success('Message supprimé')
      router.push('/admin/contacts')
      router.refresh()
    } catch {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Header sans gras */}
      <div className="flex items-center justify-between pb-2 border-b border-[#dcdcde] w-full">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/contacts"
            className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
            title="Retour aux messages"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-normal text-[#1d2327]">
            Message de {contact.name}
          </h1>
        </div>
      </div>

      {/* WordPress Full-Width Flex Layout: Central content takes full remaining width, sidebar 280px on extreme right */}
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        {/* Main Content Area (Expands to fill all central space) */}
        <div className="flex-1 min-w-0 space-y-3 w-full">
          {/* Subject Box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 space-y-1 shadow-sm">
            <span className="text-[11px] font-normal uppercase text-[#646970] tracking-wider block">
              Sujet du message :
            </span>
            <h2 className="text-base font-normal text-[#1d2327]">
              {contact.subject || 'Demande de renseignement'}
            </h2>
            <div className="text-xs text-[#646970] pt-1">
              Reçu le {new Date(contact.created_at).toLocaleString('fr-FR')}
            </div>
          </div>

          {/* Main Message Body */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-2">
            <span className="text-xs font-normal uppercase tracking-wider text-[#1d2327] block border-b border-gray-100 pb-2">
              Contenu du message
            </span>
            <div className="text-xs text-[#2c3338] whitespace-pre-wrap leading-relaxed font-normal pt-1">
              {contact.message}
            </div>
          </div>
        </div>

        {/* Right Sidebar (Extreme right, 280px width) */}
        <div className="w-full lg:w-72 shrink-0 space-y-3">
          {/* Card Traitement du message */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Traitement du message
            </div>

            <div className="p-3.5 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span className="font-normal">Statut :</span>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white font-normal"
                >
                  <option value="unread">Non lu</option>
                  <option value="read">Lu</option>
                  <option value="replied">Traité / Répondu</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>

              <div className="pt-2 border-t border-[#f0f0f1]">
                <a
                  href={`mailto:${contact.email}?subject=RE: ${encodeURIComponent(contact.subject || 'Demande ME2I')}`}
                  onClick={() => handleStatusChange('replied')}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal py-2 rounded-sm transition-colors shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Répondre par email</span>
                </a>
              </div>
            </div>

            {/* Actions inside Card */}
            <div className="px-3.5 py-2.5 bg-[#f6f7f7] border-t border-[#c3c4c7] flex items-center justify-between">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs text-red-600 hover:text-red-800 hover:underline font-normal disabled:opacity-50"
              >
                {deleting ? 'Suppression...' : 'Supprimer le message'}
              </button>
            </div>
          </div>

          {/* Card Expéditeur */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Expéditeur
            </div>
            <div className="p-3.5 space-y-2.5 text-xs text-[#2c3338]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#8c8f94]" />
                <span className="font-normal text-[#1d2327]">{contact.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8c8f94]" />
                <a href={`mailto:${contact.email}`} className="text-[#2271b1] hover:underline font-normal">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#8c8f94]" />
                  <a href={`tel:${contact.phone}`} className="text-[#2271b1] hover:underline font-normal">
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
