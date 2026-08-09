import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'
import { fallbackLongArticles } from '@/src/lib/default-articles'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog et Articles d\'Expertise : Maintenance Industrielle et Énergie',
  description: 'Découvrez nos grands dossiers techniques originaux et guides pratiques sur la maintenance des groupes électrogènes, l\'automatisme PLC et l\'efficacité énergétique au Cameroun.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog et Articles d\'Expertise | ME2I Cameroun',
    description: 'Guides pratiques et grands dossiers d\'ingénierie sur la maintenance industrielle et les groupes électrogènes au Cameroun.',
  },
}

export default async function BlogPage() {
  let dbArticles: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    dbArticles = data || []
  } catch (err) {
    // Ignore error
  }

  const cleanDbArticles = dbArticles.filter(
    (a) => a.title && !a.title.toLowerCase().includes('test')
  )

  const dbSlugs = new Set(cleanDbArticles.map((a) => a.slug || a.id))
  const missingFallbacks = fallbackLongArticles.filter((f) => !dbSlugs.has(f.slug) && !dbSlugs.has(f.id))

  const finalArticles = [...missingFallbacks, ...cleanDbArticles]

  return <BlogClient initialArticles={finalArticles} />
}
