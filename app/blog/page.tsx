import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'

export const revalidate = 0 // Dynamic SSR

export default async function BlogPage() {
  const supabase = await createServerClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return <BlogClient initialArticles={articles || []} />
}
