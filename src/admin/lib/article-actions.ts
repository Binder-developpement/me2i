'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

const isUuid = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)

export async function createArticleAction(formData: {
  title: string
  slug: string
  excerpt?: string
  content?: string
  cover_url?: string
  category?: string
  status: 'draft' | 'published' | 'archived' | 'trash'
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
  revalidatePath('/blog')
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
    status: 'draft' | 'published' | 'archived' | 'trash'
  }
) {
  const supabase = await createServerClient()
  const validUuid = isUuid(id)

  let data: any = null
  let error: any = null

  if (validUuid) {
    const res = await supabase
      .from('articles')
      .update({
        title: formData.title,
        slug: formData.slug || id,
        excerpt: formData.excerpt || null,
        content: formData.content || null,
        cover_url: formData.cover_url || null,
        category: formData.category || 'Général',
        status: formData.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
    data = res.data
    error = res.error
  } else {
    // Non-UUID slug ID: Try update by slug in articles table first
    const res = await supabase
      .from('articles')
      .update({
        title: formData.title,
        slug: formData.slug || id,
        excerpt: formData.excerpt || null,
        content: formData.content || null,
        cover_url: formData.cover_url || null,
        category: formData.category || 'Général',
        status: formData.status,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', id)
      .select()
    
    data = res.data
    error = res.error

    // Fallback: update or upsert in realisations seed backup table
    if (!data || data.length === 0) {
      const realRes = await supabase
        .from('realisations')
        .upsert(
          {
            id: `art_${formData.slug || id}`,
            title: formData.title,
            slug: formData.slug || id,
            category: formData.category || 'Maintenance Industrielle',
            subtitle: formData.excerpt || null,
            description: formData.excerpt || null,
            content: formData.content || null,
            cover_url: formData.cover_url || null,
            status: formData.status === 'trash' ? 'trash' : 'published',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )
        .select()
      
      data = realRes.data
    }
  }

  revalidatePath('/admin/articles')
  revalidatePath(`/admin/articles/${id}`)
  revalidatePath('/blog')
  return data?.[0] || { id, ...formData }
}

// Move article to Corbeille (Trash)
export async function trashArticleAction(id: string) {
  const supabase = await createServerClient()
  const validUuid = isUuid(id)

  if (validUuid) {
    await supabase.from('articles').update({ status: 'trash', updated_at: new Date().toISOString() }).eq('id', id)
  } else {
    await supabase.from('articles').update({ status: 'trash', updated_at: new Date().toISOString() }).eq('slug', id)
    await supabase.from('realisations').update({ status: 'trash', updated_at: new Date().toISOString() }).or(`id.eq.art_${id},slug.eq.${id}`)
  }

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  return { success: true }
}

// Restore article from Corbeille (Trash)
export async function restoreArticleAction(id: string) {
  const supabase = await createServerClient()
  const validUuid = isUuid(id)

  if (validUuid) {
    await supabase.from('articles').update({ status: 'draft', updated_at: new Date().toISOString() }).eq('id', id)
  } else {
    await supabase.from('articles').update({ status: 'draft', updated_at: new Date().toISOString() }).eq('slug', id)
    await supabase.from('realisations').update({ status: 'published', updated_at: new Date().toISOString() }).or(`id.eq.art_${id},slug.eq.${id}`)
  }

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  return { success: true }
}

// Delete article permanently from DB
export async function deleteArticlePermanentlyAction(id: string) {
  const supabase = await createServerClient()
  const validUuid = isUuid(id)

  if (validUuid) {
    await supabase.from('articles').delete().eq('id', id)
  } else {
    await supabase.from('articles').delete().eq('slug', id)
    await supabase.from('realisations').delete().or(`id.eq.art_${id},slug.eq.${id}`)
  }

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  return { success: true }
}

// Empty all trashed articles permanently
export async function emptyTrashAction() {
  const supabase = await createServerClient()

  await supabase.from('articles').delete().eq('status', 'trash')
  await supabase.from('realisations').delete().eq('status', 'trash').like('id', 'art_%')

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  return { success: true }
}

// Backward compatibility helper
export async function deleteArticleAction(id: string) {
  return trashArticleAction(id)
}
