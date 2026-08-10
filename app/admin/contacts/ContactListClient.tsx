'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateContactStatusAction, deleteContactAction } from '@/src/admin/lib/contact-actions'
import { toast } from 'sonner'
import { Search, MessageSquare, Mail, User, List, LayoutGrid } from 'lucide-react'

export default function ContactListClient({
  initialContacts,
}: {
  initialContacts: any[]
}) {
  const router = useRouter()
  const [contacts, setContacts] = useState(initialContacts)
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setContacts(initialContacts)
  }, [initialContacts])

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
    <div className="space-y-4 w-full">
      {/* Tabs & Search Toolbar with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
        {/* Tabs */}
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0 flex-wrap">
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

        {/* Right side controls: Search + View Switcher */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
            <input
              type="text"
              placeholder="Rechercher par nom, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center border border-[#8c8f94] rounded-sm overflow-hidden bg-white shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 flex items-center gap-1 text-xs font-normal transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#2271b1] text-white'
                  : 'text-[#50575e] hover:bg-[#f0f0f1]'
              }`}
              title="Vue Tableau"
            >
              <List className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tableau</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 flex items-center gap-1 text-xs font-normal transition-colors ${
                viewMode === 'cards'
                  ? 'bg-[#2271b1] text-white'
                  : 'text-[#50575e] hover:bg-[#f0f0f1]'
              }`}
              title="Vue Cartes"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Cartes</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW RENDER: CARDS VIEW */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.length === 0 ? (
            <div className="col-span-full bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
              Aucun message de contact.
            </div>
          ) : (
            filteredContacts.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <Link
                        href={`/admin/contacts/${c.id}`}
                        className="font-semibold text-[#2271b1] hover:text-[#135e96] text-sm block"
                      >
                        {c.name}
                      </Link>
                      <p className="text-[11px] text-[#646970] font-normal flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3 text-[#8c8f94]" />
                        <span>{c.email}</span>
                      </p>
                    </div>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm tracking-wider shrink-0 ${
                        c.status === 'unread'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : c.status === 'replied'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      {c.status === 'unread' ? 'Non lu' : c.status === 'replied' ? 'Traité' : 'Lu'}
                    </span>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded p-2.5 text-xs text-[#1d2327]">
                    <p className="font-semibold text-xs text-[#1d2327] mb-0.5">{c.subject || 'Sans sujet'}</p>
                    <p className="text-[11px] text-[#646970] line-clamp-2 leading-relaxed">{c.message}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                  <Link
                    href={`/admin/contacts/${c.id}`}
                    className="text-[#2271b1] font-medium hover:underline"
                  >
                    Consulter
                  </Link>
                  {c.status === 'unread' && (
                    <>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(c.id)}
                        className="text-[#2271b1] font-medium hover:underline"
                      >
                        Marquer comme lu
                      </button>
                    </>
                  )}
                  <span className="text-[#c3c4c7]">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id, c.name)}
                    className="text-[#d63638] font-medium hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* VIEW RENDER: TABLE VIEW */
        <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-x-auto shadow-sm w-full">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
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
                filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-[#f0f6fc]/50 transition-colors group font-normal">
                    <td className="p-3">
                      <Link
                        href={`/admin/contacts/${c.id}`}
                        className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block"
                      >
                        {c.name}
                      </Link>
                      <p className="text-[11px] text-[#646970] font-normal">{c.email}</p>
                      <div className="flex items-center gap-2 text-[11px] mt-1 opacity-100 transition-opacity">
                        <Link
                          href={`/admin/contacts/${c.id}`}
                          className="text-[#2271b1] hover:underline font-normal"
                        >
                          Consulter
                        </Link>
                        {c.status === 'unread' && (
                          <>
                            <span className="text-[#c3c4c7]">|</span>
                            <button
                              type="button"
                              onClick={() => handleMarkAsRead(c.id)}
                              className="text-[#2271b1] hover:underline font-normal"
                            >
                              Marquer comme lu
                            </button>
                          </>
                        )}
                        <span className="text-[#c3c4c7]">|</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id, c.name)}
                          className="text-[#d63638] hover:underline font-normal"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <p className="font-normal text-[#1d2327] line-clamp-1">{c.subject || 'Sans sujet'}</p>
                      <p className="text-[11px] text-[#646970] line-clamp-1 font-normal mt-0.5">{c.message}</p>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm tracking-wider ${
                          c.status === 'unread'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : c.status === 'replied'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      >
                        {c.status === 'unread' ? 'Non lu' : c.status === 'replied' ? 'Traité' : 'Lu'}
                      </span>
                    </td>
                    <td className="p-3 text-[#646970] font-normal">
                      {new Date(c.created_at).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
