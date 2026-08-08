'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateOrderStatusAction, deleteOrderAction } from '@/src/admin/lib/order-actions'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, User, Mail, Phone, MapPin, Calendar, CreditCard, FileText } from 'lucide-react'

export default function OrderDetailClient({ order }: { order: any }) {
  const router = useRouter()
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed' | 'cancelled'>(order.status || 'pending')
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const items = Array.isArray(order.items) ? order.items : []
  const firstItem = items[0] || {}

  const handleUpdate = async () => {
    try {
      setLoading(true)
      await updateOrderStatusAction(order.id, status)
      toast.success('Commande mise à jour avec succès !')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la commande ${order.reference} ?`)) return

    try {
      setDeleting(true)
      await deleteOrderAction(order.id)
      toast.success('Commande supprimée')
      router.push('/admin/commandes')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/commandes"
            className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
            title="Retour à la liste"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-normal text-[#1d2327]">
            Commande {order.reference}
          </h1>
        </div>
      </div>

      {/* WordPress Full-Width Flex Layout: Main content expands, sidebar 280px on extreme right */}
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        {/* Main Central Content Area */}
        <div className="flex-1 min-w-0 space-y-3 w-full">
          {/* Order Reference & Date Card */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-lg font-normal text-[#1d2327] font-mono">
                Référence : {order.reference}
              </span>
              <span className="text-xs text-[#646970]">
                Reçue le {new Date(order.created_at).toLocaleString('fr-FR')}
              </span>
            </div>
          </div>

          {/* Ordered Item Details Card */}
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
                      Aucun article répertorié.
                    </td>
                  </tr>
                ) : (
                  items.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#f6f7f7]">
                      <td className="p-3 font-normal text-[#1d2327]">
                        <p className="font-normal text-sm text-[#1d2327]">{item.name || 'Commande'}</p>
                        {item.type && (
                          <span className="text-[11px] text-[#646970] uppercase">Type : {item.type}</span>
                        )}
                      </td>
                      <td className="p-3 text-right font-normal text-[#1d2327]">
                        {order.total ? `${order.total.toLocaleString('fr-FR')} ${order.currency || 'XAF'}` : 'Sur devis'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="p-3.5 bg-[#f6f7f7] border-t border-[#c3c4c7] flex justify-between items-center text-xs text-[#1d2327]">
              <span className="font-normal">Total de la commande :</span>
              <span className="text-sm font-normal text-[#2271b1]">
                {order.total ? `${order.total.toLocaleString('fr-FR')} ${order.currency || 'XAF'}` : 'Sur devis'}
              </span>
            </div>
          </div>

          {/* Delivery & Request Details Card */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Lieu de livraison, Date & Précisions du client
            </div>
            <div className="p-3.5 space-y-3 text-xs text-[#2c3338]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-2.5 bg-[#f6f7f7] border border-[#dcdcde] rounded-sm space-y-1">
                  <span className="font-normal text-[#1d2327] flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#2271b1]" />
                    <span>Lieu de livraison / intervention :</span>
                  </span>
                  <p className="text-[#2c3338] pl-5">
                    {firstItem.delivery_address || order.notes?.split('|')[0]?.replace('Lieu:', '') || 'Non précisé'}
                  </p>
                </div>

                <div className="p-2.5 bg-[#f6f7f7] border border-[#dcdcde] rounded-sm space-y-1">
                  <span className="font-normal text-[#1d2327] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#2271b1]" />
                    <span>Date souhaitée :</span>
                  </span>
                  <p className="text-[#2c3338] pl-5">
                    {firstItem.delivery_date || order.notes?.split('|')[1]?.replace('Date:', '') || 'Non précisée'}
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-[#f6f7f7] border border-[#dcdcde] rounded-sm space-y-1">
                <span className="font-normal text-[#1d2327] flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-[#2271b1]" />
                  <span>Mode de paiement choisi :</span>
                </span>
                <p className="text-[#2c3338] pl-5">
                  {firstItem.payment_method || order.notes?.split('|')[2]?.replace('Paiement:', '') || 'Virement / Mobile Money'}
                </p>
              </div>

              <div className="pt-2">
                <span className="font-normal text-[#1d2327] flex items-center gap-1.5 mb-1.5 uppercase tracking-wider text-[11px]">
                  <FileText className="h-3.5 w-3.5 text-[#2271b1]" />
                  <span>Description / Précisions particulières :</span>
                </span>
                <div className="p-3 bg-[#f6f7f7] border border-[#dcdcde] rounded-sm font-normal text-[#2c3338] leading-relaxed whitespace-pre-wrap">
                  {firstItem.notes || order.notes || 'Aucune consigne particulière renseignée.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Extreme right, 280px width) */}
        <div className="w-full lg:w-72 shrink-0 space-y-3">
          {/* Card Publication / Statut */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Traitement & Statut
            </div>

            <div className="p-3.5 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span className="font-normal">Statut :</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white font-normal"
                >
                  <option value="pending">En attente</option>
                  <option value="processing">En cours</option>
                  <option value="completed">Complétée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </div>

              <div className="text-[11px] text-[#646970] pt-2 border-t border-[#f0f0f1]">
                Reçue le : {new Date(order.created_at).toLocaleString('fr-FR')}
              </div>
            </div>

            {/* Card Actions inside Publication Card */}
            <div className="px-3.5 py-2.5 bg-[#f6f7f7] border-t border-[#c3c4c7] flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs text-red-600 hover:text-red-800 hover:underline font-normal disabled:opacity-50"
              >
                {deleting ? 'Suppression...' : 'Supprimer'}
              </button>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={loading}
                className="flex items-center gap-1 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5" />
                )}
                <span>Mettre à jour</span>
              </button>
            </div>
          </div>

          {/* Card Client Info */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Client
            </div>
            <div className="p-3.5 space-y-2.5 text-xs text-[#2c3338]">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#8c8f94]" />
                <span className="font-normal text-[#1d2327]">{order.customer_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#8c8f94]" />
                <a href={`mailto:${order.customer_email}`} className="text-[#2271b1] hover:underline font-normal">
                  {order.customer_email}
                </a>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#8c8f94]" />
                  <a href={`tel:${order.customer_phone}`} className="text-[#2271b1] hover:underline font-normal">
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
