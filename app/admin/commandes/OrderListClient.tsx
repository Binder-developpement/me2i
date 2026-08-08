'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateOrderStatusAction, deleteOrderAction } from '@/src/admin/lib/order-actions'
import { toast } from 'sonner'
import { Search, ShoppingCart, Eye, Trash2 } from 'lucide-react'

export default function OrderListClient({
  initialOrders,
}: {
  initialOrders: any[]
}) {
  const router = useRouter()
  const [orders, setOrders] = useState(initialOrders)
  const [activeStatus, setActiveStatus] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all')
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
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-800 border border-amber-300">En attente</span>
      case 'processing':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-100 text-blue-800 border border-blue-300">En cours</span>
      case 'completed':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-300">Complétée</span>
      case 'cancelled':
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-red-100 text-red-800 border border-red-300">Annulée</span>
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-gray-100 text-gray-800">{status}</span>
    }
  }

  return (
    <div className="space-y-4">
      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0 flex-wrap">
          {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveStatus(st)}
              className={`pb-1 px-1 font-semibold transition-colors capitalize ${
                activeStatus === st
                  ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                  : 'text-[#2271b1] hover:text-[#135e96]'
              }`}
            >
              {st === 'all' ? 'Toutes' : st === 'pending' ? 'En attente' : st === 'processing' ? 'En cours' : st === 'completed' ? 'Complétées' : 'Annulées'}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher par référence, client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs w-full sm:w-64 focus:outline-none focus:border-[#2271b1] bg-white"
          />
        </div>
      </div>

      {/* WordPress Table */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] uppercase tracking-wider font-semibold">
              <th className="p-3">Référence</th>
              <th className="p-3">Client</th>
              <th className="p-3">Montant Total</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Date</th>
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
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#f0f6fc]/50 transition-colors group">
                  <td className="p-3">
                    <Link
                      href={`/admin/commandes/${order.id}`}
                      className="font-bold text-[#2271b1] hover:text-[#135e96] font-mono text-sm block"
                    >
                      {order.reference}
                    </Link>
                    <div className="flex items-center gap-2 text-[11px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/commandes/${order.id}`}
                        className="text-[#2271b1] hover:underline font-semibold"
                      >
                        Consulter
                      </Link>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id, order.reference)}
                        className="text-[#d63638] hover:underline font-semibold"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="font-semibold text-[#1d2327]">{order.customer_name}</p>
                    <p className="text-[11px] text-[#646970]">{order.customer_email}</p>
                  </td>
                  <td className="p-3 font-bold text-[#1d2327]">
                    {order.total ? `${order.total.toLocaleString('fr-FR')} ${order.currency || 'XAF'}` : 'N/A'}
                  </td>
                  <td className="p-3">{getStatusBadge(order.status)}</td>
                  <td className="p-3 text-[#646970] text-[11px]">
                    {new Date(order.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
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
