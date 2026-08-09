import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import EditArticleClient from './EditArticleClient'

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
    }
  } catch (err) {
    // Ignore error
  }

  if (!article) {
    notFound()
  }

  return <EditArticleClient article={article} />
}
