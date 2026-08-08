import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditArticleClient from './EditArticleClient'

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
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      notFound()
    }
    article = data
  } catch (err) {
    notFound()
  }

  return <EditArticleClient article={article} />
}
