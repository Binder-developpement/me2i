import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog et Articles d\'Expertise : Maintenance Industrielle et Énergie',
  description: 'Découvrez nos grands dossiers techniques originaux et guides pratiques sur la maintenance des groupes électrogènes, l\'automatisme PLC et l\'efficacité énergétique au Cameroun.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog et Articles d\'Expertise | MCI Cameroun',
    description: 'Guides pratiques et grands dossiers d\'ingénierie sur la maintenance industrielle et les groupes électrogènes au Cameroun.',
  },
}

export default async function BlogPage() {
  const supabase = await createServerClient()

  const { data: dbArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const articles = (dbArticles || []).filter(
    (a) => a.title && !a.title.toLowerCase().includes('test')
  )

  return <BlogClient initialArticles={articles} />
}
