import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Blog et Articles d\'Expertise : Maintenance Industrielle et Énergie',
  description: 'Découvrez nos articles techniques originaux, guides pratiques et dossiers sur la maintenance préventive des groupes électrogènes, l\'automatisme et l\'efficacité énergétique au Cameroun.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog et Articles d\'Expertise | ME2I Cameroun',
    description: 'Guides pratiques et dossiers techniques sur la maintenance industrielle et les groupes électrogènes au Cameroun.',
  },
}

export default async function BlogPage() {
  const supabase = await createServerClient()

  // 1. Primary query on articles table
  const { data: dbArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  let finalArticles = dbArticles || []

  // 2. If RLS prevented articles fetch, retrieve dedicated article seeds from realisations table (prefixed with art_)
  if (finalArticles.length === 0) {
    const { data: seedArticles } = await supabase
      .from('realisations')
      .select('*')
      .like('id', 'art_%')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (seedArticles) {
      finalArticles = seedArticles.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug || item.id.replace('art_', ''),
        category: item.category || 'Maintenance Industrielle',
        excerpt: item.description || item.subtitle || '',
        content: item.content || '',
        cover_url: item.cover_url || null,
        status: 'published',
        created_at: item.created_at,
      }))
    }
  }

  return <BlogClient initialArticles={finalArticles} />
}
