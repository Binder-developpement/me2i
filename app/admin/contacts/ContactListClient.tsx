'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateContactStatusAction, deleteContactAction } from '@/src/admin/lib/contact-actions'
import { toast } from 'sonner'
import { Search, MessageSquare } from 'lucide-react'

export default function ContactListClient({
  initialContacts,
}: {
  initialContacts: any[]
}) {
  const router = useRouter()
  const [contacts, setContacts] = useState(initialContacts)
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [search, setSearch] = useState('')

  const filteredContacts = contacts.filter((c) => {
    const matchesTab = activeTab === 'all' || c.status === activeTab
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.subject && c.subject.toLowerCase().includes(search.toLowerCase()))
    return matchesTab && matchesSearch
  })

  const handleMarkAsRead = async (id: string) => {
    try {
      await updateContactStatusAction(id, 'read')
      setContacts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'read' } : item))
      )
      toast.success('Marqué comme lu')
      router.refresh()
    } catch (err) {
      toast.error('Erreur')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le message de ${name} ?`)) return

    try {
      await deleteContactAction(id)
      setContacts((prev) => prev.filter((item) => item.id !== id))
      toast.success('Message supprimé')
      router.refresh()
    } catch (err) {
      toast.error('Erreur lors de la suppression')
    }
  }

  return (
    <div className="space-y-4">
      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0">
          {(['all', 'unread', 'read', 'replied'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-1 px-1 font-normal transition-colors capitalize ${
                activeTab === tab
                  ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                  : 'text-[#2271b1] hover:text-[#135e96]'
              }`}
            >
              {tab === 'all' ? 'Tous' : tab === 'unread' ? 'Non lus' : tab === 'read' ? 'Lus' : 'Traités'}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs w-full sm:w-64 focus:outline-none focus:border-[#2271b1] bg-white font-normal"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] uppercase tracking-wider font-normal">
              <th className="p-3 font-normal">Expéditeur</th>
              <th className="p-3 font-normal">Sujet / Message</th>
              <th className="p-3 font-normal">Statut</th>
              <th className="p-3 font-normal">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3c4c7]/50 text-[#2c3338]">
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-xs text-[#646970]">
                  <MessageSquare className="h-8 w-8 mx-auto text-[#a7aaad] mb-2" />
                  Aucun message de contact.
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className={`transition-colors group font-normal ${
                    contact.status === 'unread' ? 'bg-[#f0f6fc]/80' : 'hover:bg-[#f6f7f7]'
                  }`}
                >
                  <td className="p-3 font-normal">
                    <Link
                      href={`/admin/contacts/${contact.id}`}
                      className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block"
                    >
                      {contact.name}
                    </Link>
                    <p className="text-[11px] text-[#646970] font-normal">{contact.email}</p>
                    <div className="flex items-center gap-2 text-[11px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-normal">
                      <Link
                        href={`/admin/contacts/${contact.id}`}
                        className="text-[#2271b1] hover:underline font-normal"
                      >
                        Consulter
                      </Link>
                      <span className="text-[#c3c4c7]">|</span>
                      {contact.status === 'unread' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleMarkAsRead(contact.id)}
                            className="text-[#2271b1] hover:underline font-normal"
                          >
                            Marquer comme lu
                          </button>
                          <span className="text-[#c3c4c7]">|</span>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(contact.id, contact.name)}
                        className="text-[#d63638] hover:underline font-normal"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                  <td className="p-3 font-normal">
                    <p className="font-normal text-[#1d2327]">{contact.subject || 'Demande de contact'}</p>
                    <p className="text-[#646970] truncate max-w-md font-normal">{contact.message}</p>
                  </td>
                  <td className="p-3 font-normal">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm ${
                        contact.status === 'unread'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : contact.status === 'replied'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-300'
                      }`}
                    >
                      {contact.status === 'unread' ? 'Non lu' : contact.status === 'replied' ? 'Traité' : 'Lu'}
                    </span>
                  </td>
                  <td className="p-3 text-[#646970] text-[11px] font-normal">
                    {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
