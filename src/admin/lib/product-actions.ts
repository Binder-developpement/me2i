'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createProductAction(formData: {
  name: string
  slug: string
  description?: string
  price?: number
  currency?: string
  cover_url?: string
  images?: string[]
  category?: string
  stock?: number
  status: 'published' | 'draft' | 'out_of_stock'
}) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from('products').insert([
    {
      name: formData.name,
      slug: formData.slug,
      description: formData.description || null,
      price: formData.price || null,
      currency: formData.currency || 'XAF',
      cover_url: formData.cover_url || null,
      images: formData.images || [],
      category: formData.category || 'Général',
      stock: formData.stock ?? 0,
      status: formData.status || 'published',
    },
  ]).select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/produits')
  revalidatePath('/demarches')
  return data?.[0]
}

export async function updateProductAction(
  id: string,
  formData: {
    name: string
    slug: string
    description?: string
    price?: number
    currency?: string
    cover_url?: string
    images?: string[]
    category?: string
    stock?: number
    status: 'published' | 'draft' | 'out_of_stock'
  }
) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('products')
    .update({
      name: formData.name,
      slug: formData.slug,
      description: formData.description || null,
      price: formData.price || null,
      currency: formData.currency || 'XAF',
      cover_url: formData.cover_url || null,
      images: formData.images || [],
      category: formData.category || 'Général',
      stock: formData.stock ?? 0,
      status: formData.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/produits')
  revalidatePath(`/admin/produits/${id}`)
  revalidatePath('/demarches')
  return data?.[0]
}

export async function deleteProductAction(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/produits')
  revalidatePath('/demarches')
  return { success: true }
}
