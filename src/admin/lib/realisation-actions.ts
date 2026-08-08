'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export async function createRealisationAction(formData: FormData) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autorisé')
  }

  const title = (formData.get('title') as string) || ''
  const category = (formData.get('category') as string) || 'Groupes Électrogènes'
  const subtitle = (formData.get('subtitle') as string) || ''
  const client = (formData.get('client') as string) || ''
  const location = (formData.get('location') as string) || ''
  const description = (formData.get('description') as string) || ''
  const content = (formData.get('content') as string) || ''
  const cover_url = (formData.get('cover_url') as string) || ''
  const status = (formData.get('status') as string) || 'published'
  let slug = (formData.get('slug') as string) || ''

  if (!title) {
    throw new Error('Le titre est obligatoire')
  }

  if (!slug) {
    slug = generateSlug(title)
  }

  const newRealisation = {
    id: `realisation-${Date.now()}`,
    title,
    slug,
    category,
    subtitle,
    client,
    location,
    description,
    content,
    cover_url,
    status,
    created_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('realisations').insert(newRealisation)

  if (error) {
    console.error('Error inserting realization:', error)
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')

  return { success: true }
}

export async function updateRealisationAction(id: string, formData: FormData) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autorisé')
  }

  const title = (formData.get('title') as string) || ''
  const category = (formData.get('category') as string) || ''
  const subtitle = (formData.get('subtitle') as string) || ''
  const client = (formData.get('client') as string) || ''
  const location = (formData.get('location') as string) || ''
  const description = (formData.get('description') as string) || ''
  const content = (formData.get('content') as string) || ''
  const cover_url = (formData.get('cover_url') as string) || ''
  const status = (formData.get('status') as string) || 'published'
  let slug = (formData.get('slug') as string) || ''

  if (!slug && title) {
    slug = generateSlug(title)
  }

  const updates = {
    title,
    slug,
    category,
    subtitle,
    client,
    location,
    description,
    content,
    cover_url,
    status,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('realisations').update(updates).eq('id', id)

  if (error) {
    console.error('Error updating realization:', error)
  }

  revalidatePath('/realisations')
  revalidatePath(`/realisations/${id}`)
  revalidatePath('/admin/realisations')

  return { success: true }
}

export async function deleteRealisationAction(id: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autorisé')
  }

  const { error } = await supabase.from('realisations').delete().eq('id', id)

  if (error) {
    console.error('Error deleting realization:', error)
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')

  return { success: true }
}

export async function trashRealisationAction(id: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autorisé')
  }

  const { error } = await supabase
    .from('realisations')
    .update({ status: 'trash' })
    .eq('id', id)

  if (error) {
    console.error('Error trashing realization:', error)
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')

  return { success: true }
}

export async function restoreRealisationAction(id: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Non autorisé')
  }

  const { error } = await supabase
    .from('realisations')
    .update({ status: 'published' })
    .eq('id', id)

  if (error) {
    console.error('Error restoring realization:', error)
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')

  return { success: true }
}
