'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createOrderAction } from '@/src/admin/lib/order-actions'
import { toast } from 'sonner'
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react'

interface OrderClientProps {
  itemType: 'product' | 'service'
  selectedItem: any
}

export default function OrderClient({ itemType, selectedItem }: OrderClientProps) {
  const [loading, setLoading] = useState(false)
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Virement bancaire')
  const [notes, setNotes] = useState('')

  const itemTitle = selectedItem
    ? itemType === 'service'
      ? selectedItem.title
      : selectedItem.name
    : itemType === 'service'
    ? 'Demande de prestation de service'
    : 'Commande d\'équipement'

  const itemPrice = selectedItem?.price
    ? new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: selectedItem.currency === 'XAF' ? 'XAF' : 'EUR',
        maximumFractionDigits: 0,
      }).format(selectedItem.price)
    : 'Sur devis gratuit'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      toast.error('Veuillez remplir vos informations de contact')
      return
    }

    if (!deliveryAddress.trim() || !deliveryDate) {
      toast.error('Veuillez indiquer le lieu et la date souhaitée')
      return
    }

    try {
      setLoading(true)
      const res = await createOrderAction({
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        delivery_date: deliveryDate,
        payment_method: paymentMethod,
        notes: notes,
        product_name: itemTitle,
        item_type: itemType,
        amount: selectedItem?.price || 0,
        currency: selectedItem?.currency || 'XAF',
      })

      setSubmittedRef(res.reference)
      toast.success('Votre demande a été enregistrée avec succès !')
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de l\'enregistrement de la commande')
    } finally {
      setLoading(false)
    }
  }

  if (submittedRef) {
    return (
      <div className="pt-28 pb-16 min-h-[100dvh] bg-white flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto p-8 border border-gray-200 text-center shadow-lg">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Commande Enregistrée !</h1>
          <p className="text-sm text-gray-600 mb-6">
            Votre demande a bien été transmise à notre service commercial et technique.
          </p>

          <div className="bg-gray-50 border border-gray-200 p-4 mb-6 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Référence :</span>
              <span className="font-mono font-bold text-[#1E3A5F]">{submittedRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Élément concerné :</span>
              <span className="font-bold text-gray-900">{itemTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Mode de paiement :</span>
              <span className="font-semibold text-gray-800">{paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Lieu :</span>
              <span className="font-semibold text-gray-800">{deliveryAddress}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            Un ingénieur ME2I vous contactera très rapidement au <strong className="text-gray-900">{customerPhone}</strong> pour valider l'intervention.
          </p>

          <Link
            href="/"
            className="inline-block bg-[#1E3A5F] text-white font-semibold text-xs px-6 py-3 rounded-none hover:bg-[#2A5DB0] transition-colors"
          >
            Retourner à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href={itemType === 'service' ? '/services' : '/demarches'}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A5F] hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{itemType === 'service' ? 'Retour aux services' : 'Retour au catalogue'}</span>
        </Link>

        {/* Page Title */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
            Formulaire de commande
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {itemType === 'service' ? 'Demande de prestation' : 'Commande d\'équipement'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: User Info */}
              <div className="border border-gray-200 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F] border-b border-gray-100 pb-2">
                  1. Informations utilisateur
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">
                      Nom complet / Entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Brasseries du Cameroun / M. Paul Nguema"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-gray-700">
                      Adresse e-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: contact@entreprise.cm"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Numéro de téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +237 6 99 88 77 66"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
                  />
                </div>
              </div>

              {/* Section 2: Delivery & Date */}
              <div className="border border-gray-200 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F] border-b border-gray-100 pb-2">
                  2. Lieu & Date souhaitée
                </h3>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Lieu de livraison / d'intervention <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Akwa, Douala / Zone industrielle Bassa"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Date souhaitée de livraison / d'intervention <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
                  />
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="border border-gray-200 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F] border-b border-gray-100 pb-2">
                  3. Mode de paiement
                </h3>

                <div className="space-y-2 text-xs">
                  {[
                    'Virement bancaire',
                    'Mobile Money (MTN / Orange Money)',
                    'Paiement à la livraison / Chèque',
                  ].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer p-2 border border-gray-200 hover:border-[#1E3A5F] transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="text-[#1E3A5F]"
                      />
                      <span className="font-semibold text-gray-800">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 4: Description / Notes */}
              <div className="border border-gray-200 p-5 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F] border-b border-gray-100 pb-2">
                  4. Description / Précisions demandées
                </h3>

                <textarea
                  rows={3}
                  placeholder="Détaillez vos besoins spécifiques (accessibilité du site, caractéristiques particulières, contraintes horaires...)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
                />
              </div>

              {/* Non-rounded Submit Button without icons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E3A5F] hover:bg-[#2A5DB0] text-white text-sm font-bold py-3.5 rounded-none transition-colors shadow-md disabled:opacity-50"
              >
                {loading ? 'Enregistrement de la commande...' : 'Valider et envoyer la commande'}
              </button>
            </form>
          </div>

          {/* Right Summary Card (1/3) */}
          <div className="space-y-4">
            <div className="border border-gray-200 p-5 space-y-4 bg-gray-50 sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F] border-b border-gray-200 pb-2">
                Récapitulatif
              </h3>

              {selectedItem?.cover_url && (
                <div className="aspect-[16/10] overflow-hidden border border-gray-200">
                  <img src={selectedItem.cover_url} alt={itemTitle} className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase text-[#1E3A5F]">
                  {itemType === 'service' ? 'Service Sélectionné' : 'Produit Sélectionné'}
                </span>
                <h4 className="text-base font-bold text-gray-900 mt-0.5">{itemTitle}</h4>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">Prix estimé :</span>
                <span className="text-base font-black text-[#1E3A5F]">{itemPrice}</span>
              </div>

              <div className="text-[11px] text-gray-500 leading-relaxed pt-2 border-t border-gray-200">
                Un technicien expert ME2I examinera votre commande et vous délivrera un devis ferme sous 24h.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
