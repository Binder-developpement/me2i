'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateOrderStatusAction } from '@/src/admin/lib/order-actions'
import { toast } from 'sonner'
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Calendar, CreditCard, FileText } from 'lucide-react'

export default function OrderDetailClient({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'cancelled'>(order.status || 'pending')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await updateOrderStatusAction(order.id, status)
      toast.success('Statut de la commande mis à jour avec succès !')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const items = Array.isArray(order.items) ? order.items : []
  const firstItem = items[0] || {}

  return (
    <div className="space-y-4 w-full">
      {/* Top Header sans gras */}
      <div className="flex items-center justify-between pb-2 border-b border-[#dcdcde] w-full">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/commandes"
            className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
            title="Retour à la liste"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-normal text-[#1d2327]">
              Détails de la Commande {order.reference}
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
          className="flex items-center gap-1 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      {/* WordPress 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        {/* Left Column (2/3) - Items & Delivery Details */}
        <div className="lg:col-span-2 space-y-3">
          {/* Order Items Table */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Équipement / Service commandé
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#c3c4c7] text-[#646970]">
                  <th className="p-3">Désignation</th>
                  <th className="p-3 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f0f1]">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-3 text-center text-xs text-[#646970]">
                      Aucun détail spécifique répertorié.
                    </td>
                  </tr>
                ) : (
                  items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#f6f7f7]">
                      <td className="p-3 font-normal text-[#1d2327]">
                        <p className="font-semibold text-sm">{item.name || 'Commande'}</p>
                        {item.type && (
                          <span className="text-[10px] text-[#646970] uppercase">Type : {item.type}</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-bold text-[#1d2327]">
                        {order.total ? `${order.total.toLocaleString('fr-FR')} ${order.currency || 'XAF'}` : 'Sur devis'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="p-3 bg-[#f6f7f7] border-t border-[#c3c4c7] flex justify-between items-center text-xs text-[#1d2327]">
              <span className="font-normal">Total estimé :</span>
              <span className="text-sm font-bold text-[#2271b1]">
                {order.total ? `${order.total.toLocaleString('fr-FR')} ${order.currency || 'XAF'}` : 'Sur devis'}
              </span>
            </div>
          </div>

          {/* Delivery & Request Description Box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm space-y-3 text-xs">
            <h3 className="font-normal uppercase tracking-wider text-[#1d2327] border-b border-gray-200 pb-2">
              Lieu, Date & Description demandée par le client
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 bg-gray-50 p-2.5 border border-gray-200 rounded-sm">
                <MapPin className="h-4 w-4 text-[#2271b1] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1d2327] block">Lieu de livraison / intervention :</span>
                  <span className="text-gray-700">{firstItem.delivery_address || order.notes?.split('|')[0]?.replace('Lieu:', '') || 'Non précisé'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-gray-50 p-2.5 border border-gray-200 rounded-sm">
                <Calendar className="h-4 w-4 text-[#2271b1] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1d2327] block">Date souhaitée :</span>
                  <span className="text-gray-700">{firstItem.delivery_date || order.notes?.split('|')[1]?.replace('Date:', '') || 'Non précisée'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gray-50 p-2.5 border border-gray-200 rounded-sm">
              <CreditCard className="h-4 w-4 text-[#2271b1] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1d2327] block">Mode de paiement choisi :</span>
                <span className="text-gray-700 font-semibold">{firstItem.payment_method || order.notes?.split('|')[2]?.replace('Paiement:', '') || 'Virement / Mobile Money'}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-semibold text-[#1d2327] block mb-1">Précisions & Description demandées :</span>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm font-normal text-gray-800 leading-relaxed whitespace-pre-wrap">
                {firstItem.notes || order.notes || 'Aucune consigne particulière renseignée.'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) - Status & Customer Info */}
        <div className="space-y-3">
          {/* Status Change Card */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Statut de la commande
            </div>
            <div className="p-3.5 space-y-3 text-xs">
              <label className="block text-[#646970] font-normal">Changer le statut :</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs bg-white font-normal"
              >
                <option value="pending">⏳ En attente</option>
                <option value="processing">⚙️ En cours de traitement</option>
                <option value="completed">✅ Complétée</option>
                <option value="cancelled">❌ Annulée</option>
              </select>
            </div>
          </div>

          {/* Customer Info Card */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Informations du client
            </div>
            <div className="p-3.5 space-y-2.5 text-xs text-[#2c3338]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#8c8f94]" />
                <span className="font-semibold text-[#1d2327]">{order.customer_name}</span>
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
