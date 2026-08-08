'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createServiceAction(formData: {
  title: string
  slug: string
  description?: string
  content?: string
  icon_name?: string
  cover_url?: string
  category?: string
  order_index?: number
  status: 'published' | 'draft'
}) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from('services').insert([
    {
      title: formData.title,
      slug: formData.slug,
      description: formData.description || null,
      content: formData.content || null,
      icon_name: formData.icon_name || 'Wrench',
      cover_url: formData.cover_url || null,
      category: formData.category || 'Général',
      order_index: formData.order_index || 0,
      status: formData.status || 'published',
    },
  ]).select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  return data?.[0]
}

export async function updateServiceAction(
  id: string,
  formData: {
    title: string
    slug: string
    description?: string
    content?: string
    icon_name?: string
    cover_url?: string
    category?: string
    order_index?: number
    status: 'published' | 'draft'
  }
) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('services')
    .update({
      title: formData.title,
      slug: formData.slug,
      description: formData.description || null,
      content: formData.content || null,
      icon_name: formData.icon_name || 'Wrench',
      cover_url: formData.cover_url || null,
      category: formData.category || 'Général',
      order_index: formData.order_index || 0,
      status: formData.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/services')
  revalidatePath(`/admin/services/${id}`)
  revalidatePath('/services')
  return data?.[0]
}

export async function deleteServiceAction(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from('services').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/services')
  revalidatePath('/services')
  return { success: true }
}
