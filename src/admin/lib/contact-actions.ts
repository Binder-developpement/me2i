'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createContactAction(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  const supabase = await createServerClient()

  const { data: newContact, error } = await supabase
    .from('contacts')
    .insert([
      {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || 'Demande de contact',
        message: data.message,
        status: 'unread',
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
  revalidatePath('/admin')
  return newContact?.[0]
}

export async function updateContactStatusAction(
  id: string,
  status: 'unread' | 'read' | 'replied' | 'archived'
) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('contacts')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
  revalidatePath(`/admin/contacts/${id}`)
  return data?.[0]
}

export async function deleteContactAction(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from('contacts').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/contacts')
  return { success: true }
}
