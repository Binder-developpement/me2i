import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditArticleClient from './EditArticleClient'
import { fallbackLongArticles } from '@/src/lib/default-articles'

export const revalidate = 0

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminAuth()
  const { id } = await params
  let article: any = null

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .or(`id.eq.${id},slug.eq.${id}`)
      .single()

    article = data
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
