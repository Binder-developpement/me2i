'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateOrderStatusAction } from '@/src/admin/lib/order-actions'
import { toast } from 'sonner'
import { ArrowLeft, Save, ShoppingCart, User, Mail, Phone, Clock } from 'lucide-react'

export default function OrderDetailClient({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'cancelled'>(order.status || 'pending')
  const [notes, setNotes] = useState(order.notes || '')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await updateOrderStatusAction(order.id, status, notes)
      toast.success('Commande mise à jour avec succès !')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const items = Array.isArray(order.items) ? order.items : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#c3c4c7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/commandes"
            className="p-1.5 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1d2327]">
              Commande {order.reference}
            </h1>
            <p className="text-xs text-[#646970] mt-0.5">
              Reçue le {new Date(order.created_at).toLocaleString('fr-FR')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2/3) Items table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Articles commandés
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#c3c4c7] text-[#646970]">
                  <th className="p-3">Produit</th>
                  <th className="p-3 text-center">Quantité</th>
                  <th className="p-3 text-right">Prix Unitaire</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-xs text-[#646970]">
                      Aucun article répertorié.
                    </td>
                  </tr>
                ) : (
                  items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#f6f7f7]">
                      <td className="p-3 font-semibold text-[#1d2327]">
                        {item.name || item.title || 'Produit'}
                      </td>
                      <td className="p-3 text-center font-mono">{item.qty || 1}</td>
                      <td className="p-3 text-right">
                        {item.price ? `${item.price.toLocaleString('fr-FR')} XAF` : '-'}
                      </td>
                      <td className="p-3 text-right font-bold text-[#1d2327]">
                        {item.price && item.qty ? `${(item.price * item.qty).toLocaleString('fr-FR')} XAF` : '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="p-4 bg-[#f6f7f7] border-t border-[#c3c4c7] flex justify-between items-center text-sm font-bold text-[#1d2327]">
              <span>Total Commande :</span>
              <span className="text-base text-[#2271b1]">
                {order.total ? `${order.total.toLocaleString('fr-FR')} ${order.currency || 'XAF'}` : 'Sur devis'}
              </span>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Notes internes / Remarques
            </label>
            <textarea
              rows={3}
              placeholder="Notes sur la livraison, modalité de paiement..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
            />
          </div>
        </div>

        {/* Right (1/3) Customer & Status Panel */}
        <div className="space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Statut de la commande
            </div>
            <div className="p-4 space-y-3 text-xs">
              <label className="block text-[#646970] font-semibold">Changer le statut :</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs bg-white font-semibold"
              >
                <option value="pending">⏳ En attente</option>
                <option value="processing">⚙️ En cours de traitement</option>
                <option value="completed">✅ Complétée</option>
                <option value="cancelled">❌ Annulée</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Informations client
            </div>
            <div className="p-4 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#8c8f94]" />
                <span className="font-bold text-[#1d2327]">{order.customer_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8c8f94]" />
                <a href={`mailto:${order.customer_email}`} className="text-[#2271b1] underline">
                  {order.customer_email}
                </a>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#8c8f94]" />
                  <a href={`tel:${order.customer_phone}`} className="text-[#2271b1] underline">
                    {order.customer_phone}
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
