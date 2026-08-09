import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog et Actualités techniques : Maintenance et Énergie',
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

  const [{ data: articles }, { data: realisations }] = await Promise.all([
    supabase.from('articles').select('*').eq('status', 'published').order('created_at', { ascending: false }),
    supabase.from('realisations').select('*').eq('status', 'published').order('created_at', { ascending: false }),
  ])

  const mappedRealisations = (realisations || []).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug || r.id,
    category: r.category || 'Expertise Technique',
    excerpt: r.description || r.subtitle || '',
    content: r.content || r.description || '',
    cover_url: r.cover_url || r.image_url || null,
    status: 'published',
    created_at: r.created_at,
  }))

  // Combine articles and mapped realisations without duplicates
  const existingSlugs = new Set((articles || []).map((a) => a.slug || a.id))
  const uniqueRealisations = mappedRealisations.filter((r) => !existingSlugs.has(r.slug) && !existingSlugs.has(r.id))

  const combined = [...(articles || []), ...uniqueRealisations]

  return <BlogClient initialArticles={combined} />
}
