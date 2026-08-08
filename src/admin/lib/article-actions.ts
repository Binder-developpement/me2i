'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createArticleAction(formData: {
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_url?: string
  category?: string
  status: 'draft' | 'published' | 'archived'
}) {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from('articles').insert([
    {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      cover_url: formData.cover_url || null,
      category: formData.category || 'Général',
      status: formData.status || 'published',
      published_at: formData.status === 'published' ? new Date().toISOString() : null,
    },
  ]).select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  return data?.[0]
}

export async function updateArticleAction(
  id: string,
  formData: {
    title: string
    slug: string
    excerpt?: string
    content?: string
    cover_url?: string
    category?: string
    status: 'draft' | 'published' | 'archived'
  }
) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('articles')
    .update({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt || null,
      content: formData.content || null,
      cover_url: formData.cover_url || null,
      category: formData.category || 'Général',
      status: formData.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/articles')
  revalidatePath(`/admin/articles/${id}`)
  revalidatePath('/actualites')
  return data?.[0]
}

export async function deleteArticleAction(id: string) {
  const supabase = await createServerClient()

  const { error } = await supabase.from('articles').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/articles')
  revalidatePath('/actualites')
  return { success: true }
}
