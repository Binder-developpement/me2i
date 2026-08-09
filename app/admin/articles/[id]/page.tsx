import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditArticleClient from './EditArticleClient'
import { fallbackLongArticles } from '@/src/lib/default-articles'

export const revalidate = 0

const isUuid = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str)

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminAuth()
  const { id } = await params
  let article: any = null
  const validUuid = isUuid(id)

  try {
    const supabase = await createServerClient()

    if (validUuid) {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .or(`id.eq.${id},slug.eq.${id}`)
        .single()
      article = data
    } else {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', id)
        .single()
      article = data

      if (!article) {
        const { data: seedArt } = await supabase
          .from('realisations')
          .select('*')
          .or(`id.eq.art_${id},slug.eq.${id}`)
          .single()
        
        if (seedArt) {
          article = {
            id: seedArt.id,
            title: seedArt.title,
            slug: seedArt.slug || seedArt.id.replace('art_', ''),
            category: seedArt.category || 'Maintenance Industrielle',
            excerpt: seedArt.description || seedArt.subtitle || '',
            content: seedArt.content || seedArt.description || '',
            cover_url: seedArt.cover_url || null,
            status: seedArt.status || 'published',
          }
        }
      }
    }
  } catch (err) {
    // Ignore error
  }

  // Fallback to long articles list if not in DB
  if (!article) {
    article = fallbackLongArticles.find((f) => f.id === id || f.slug === id)
  }

  if (!article) {
    notFound()
  }

  return <EditArticleClient article={article} />
}
