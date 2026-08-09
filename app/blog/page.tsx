import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog et Actualités techniques',
  description: 'Découvrez nos articles techniques, guides pratiques et actualités sur la maintenance des groupes électrogènes, l\'automatisme et l\'énergie industrielle au Cameroun.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog et Actualités techniques | ME2I Cameroun',
    description: 'Guides et articles d\'expertise sur la maintenance industrielle et les groupes électrogènes au Cameroun.',
  },
}

export default async function BlogPage() {
  const supabase = await createServerClient()

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return <BlogClient initialArticles={articles || []} />
}
