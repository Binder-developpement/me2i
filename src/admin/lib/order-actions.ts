'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createOrderAction(formData: {
  customer_name: string
  customer_email: string
  customer_phone: string
  delivery_address: string
  delivery_date: string
  payment_method: string
  notes?: string
  product_name: string
  item_type: 'product' | 'service'
  amount?: number
  currency?: string
}) {
  const supabase = await createServerClient()

  // Generate unique order reference CMD-2026-XXXX
  const randomRef = `CMD-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

  const itemsPayload = [
    {
      name: formData.product_name,
      type: formData.item_type,
      delivery_address: formData.delivery_address,
      delivery_date: formData.delivery_date,
      payment_method: formData.payment_method,
      notes: formData.notes || '',
    },
  ]

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        reference: randomRef,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        items: itemsPayload,
        total: formData.amount || 0,
        currency: formData.currency || 'XAF',
        status: 'pending',
        notes: `Lieu: ${formData.delivery_address} | Date: ${formData.delivery_date} | Paiement: ${formData.payment_method} | Notes: ${formData.notes || 'Aucune'}`,
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/commandes')
  return data?.[0]
}

export async function updateOrderStatusAction(id: string, status: string) {
  const supabase = await createServerClient()

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/commandes')
  revalidatePath(`/admin/commandes/${id}`)
  return { success: true }
}

export async function deleteOrderAction(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from('orders').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/commandes')
  return { success: true }
}
