'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteOrderAction } from '@/src/admin/lib/order-actions'
import { toast } from 'sonner'
import { Search, ShoppingCart, Calendar, Mail, User, List, LayoutGrid } from 'lucide-react'

export default function OrderListClient({
  initialOrders,
}: {
  initialOrders: any[]
}) {
  const router = useRouter()
  const [orders, setOrders] = useState(initialOrders)
  const [activeStatus, setActiveStatus] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [search, setSearch] = useState('')

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = activeStatus === 'all' || ord.status === activeStatus
    const matchesSearch =
      ord.reference.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer_email.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleDelete = async (id: string, ref: string) => {
    if (!confirm(`Voulez-vous supprimer la commande ${ref} ?`)) return

    try {
      await deleteOrderAction(id)
      setOrders((prev) => prev.filter((o) => o.id !== id))
      toast.success('Commande supprimée')
      router.refresh()
    } catch (err) {
      toast.error('Erreur lors de la suppression')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 text-[10px] font-normal rounded-sm bg-amber-100 text-amber-800 border border-amber-300 shrink-0">En attente</span>
      case 'processing':
        return <span className="px-2 py-0.5 text-[10px] font-normal rounded-sm bg-blue-100 text-blue-800 border border-blue-300 shrink-0">En cours</span>
      case 'completed':
        return <span className="px-2 py-0.5 text-[10px] font-normal rounded-sm bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">Complétée</span>
      case 'cancelled':
        return <span className="px-2 py-0.5 text-[10px] font-normal rounded-sm bg-red-100 text-red-800 border border-red-300 shrink-0">Annulée</span>
      default:
        return <span className="px-2 py-0.5 text-[10px] font-normal rounded-sm bg-gray-100 text-gray-800 shrink-0">{status}</span>
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Search & Tabs Toolbar with View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm w-full">
        {/* Responsive Horizontal Scroll Tabs (no visible scrollbar on mobile) */}
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0 select-none overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full whitespace-nowrap shrink-0">
          {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveStatus(st)}
              className={`pb-1 px-1 font-normal transition-colors capitalize ${
                activeStatus === st
                  ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                  : 'text-[#2271b1] hover:text-[#135e96]'
              }`}
            >
              {st === 'all' ? 'Toutes' : st === 'pending' ? 'En attente' : st === 'processing' ? 'En cours' : st === 'completed' ? 'Complétées' : 'Annulées'}
            </button>
          ))}
        </div>

        {/* Right side controls: Search + View Switcher */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
            <input
              type="text"
              placeholder="Rechercher par référence, client..."
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

      {/* VIEW RENDER */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
              Aucune commande enregistrée.
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <Link
                        href={`/admin/commandes/${ord.id}`}
                        className="font-bold text-[#2271b1] hover:text-[#135e96] text-sm font-mono block"
                      >
                        {ord.reference}
                      </Link>
                      <p className="font-medium text-xs text-[#1d2327] mt-1 flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-[#646970]" />
                        <span>{ord.customer_name}</span>
                      </p>
                    </div>
                    <div>{getStatusBadge(ord.status)}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#646970] mt-2">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-[#8c8f94]" />
                      <span>{ord.customer_email}</span>
                    </span>
                    <span className="font-semibold text-xs text-[#1d2327]">
                      {ord.total ? `${ord.total.toLocaleString()} FCFA` : 'Sur devis'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                  <Link
                    href={`/admin/commandes/${ord.id}`}
                    className="text-[#2271b1] font-medium hover:underline"
                  >
                    Consulter la commande
                  </Link>
                  <span className="text-[#c3c4c7]">|</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(ord.id, ord.reference)}
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
        /* DEFAULT VIEW MODE ('table'): Automatic Mobile Cards (< 768px), Desktop Table (>= 768px) */
        <>
          {/* MOBILE RESPONSIVE CARDS VIEW (< 768px) */}
          <div className="block md:hidden space-y-3">
            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
                Aucune commande enregistrée.
              </div>
            ) : (
              filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        href={`/admin/commandes/${ord.id}`}
                        className="font-bold text-[#2271b1] hover:text-[#135e96] text-sm font-mono block"
                      >
                        {ord.reference}
                      </Link>
                      <p className="font-medium text-xs text-[#1d2327] mt-0.5 flex items-center gap-1">
                        <User className="h-3 w-3 text-[#646970]" />
                        <span>{ord.customer_name}</span>
                      </p>
                    </div>
                    <div>{getStatusBadge(ord.status)}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#646970]">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-[#8c8f94]" />
                      <span>{ord.customer_email}</span>
                    </span>
                    <span className="font-semibold text-xs text-[#1d2327]">
                      {ord.total ? `${ord.total.toLocaleString()} FCFA` : 'Sur devis'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                    <Link
                      href={`/admin/commandes/${ord.id}`}
                      className="text-[#2271b1] font-medium hover:underline"
                    >
                      Consulter la commande
                    </Link>
                    <span className="text-[#c3c4c7]">|</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(ord.id, ord.reference)}
                      className="text-[#d63638] font-medium hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP TABLE VIEW (>= 768px) */}
          <div className="hidden md:block bg-white border border-[#c3c4c7] rounded-sm overflow-x-auto shadow-sm w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] uppercase tracking-wider font-normal">
                  <th className="p-3 font-normal">Référence</th>
                  <th className="p-3 font-normal">Client</th>
                  <th className="p-3 font-normal">Montant Total</th>
                  <th className="p-3 font-normal">Statut</th>
                  <th className="p-3 font-normal">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c3c4c7]/50 text-[#2c3338]">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs text-[#646970]">
                      <ShoppingCart className="h-8 w-8 mx-auto text-[#a7aaad] mb-2" />
                      Aucune commande enregistrée.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#f0f6fc]/50 transition-colors group font-normal">
                      <td className="p-3 font-mono">
                        <Link
                          href={`/admin/commandes/${ord.id}`}
                          className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block"
                        >
                          {ord.reference}
                        </Link>
                        <div className="flex items-center gap-2 text-[11px] mt-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity font-sans">
                          <Link
                            href={`/admin/commandes/${ord.id}`}
                            className="text-[#2271b1] hover:underline font-normal"
                          >
                            Consulter
                          </Link>
                          <span className="text-[#c3c4c7]">|</span>
                          <button
                            type="button"
                            onClick={() => handleDelete(ord.id, ord.reference)}
                            className="text-[#d63638] hover:underline font-normal"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="font-normal text-[#1d2327]">{ord.customer_name}</p>
                        <p className="text-[11px] text-[#646970] font-normal">{ord.customer_email}</p>
                      </td>
                      <td className="p-3 font-medium text-[#1d2327]">
                        {ord.total ? `${ord.total.toLocaleString()} FCFA` : 'Sur devis'}
                      </td>
                      <td className="p-3">{getStatusBadge(ord.status)}</td>
                      <td className="p-3 text-[#646970] font-normal">
                        {new Date(ord.created_at).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
