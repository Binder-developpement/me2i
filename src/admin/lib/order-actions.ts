'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function updateOrderStatusAction(
  id: string,
  status: 'pending' | 'processing' | 'completed' | 'cancelled',
  notes?: string
) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('orders')
    .update({
      status,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/commandes')
  revalidatePath(`/admin/commandes/${id}`)
  return data?.[0]
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
