import { createServerClient } from '@/src/admin/lib/supabase-server'
import BlogClient from '@/src/site-pages/BlogClient'
import type { Metadata } from 'next'
import { constructMetadata } from '@/src/lib/seo'
import { BreadcrumbJsonLd } from '@/src/components/seo/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = constructMetadata({
  title: "Blog et Articles d'Expertise - Maintenance Industrielle et Énergie",
  description:
    "Découvrez nos grands dossiers techniques originaux et guides pratiques sur la maintenance des groupes électrogènes, l'automatisme PLC et l'efficacité énergétique au Cameroun.",
  path: '/blog',
  keywords: [
    'articles maintenance industrielle',
    'guides groupes électrogènes',
    'dossiers techniques automatisme PLC',
    'conseils ingénierie Cameroun',
  ],
})

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

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog & Actualités', url: '/blog' },
        ]}
      />
      <BlogClient initialArticles={articles} />
    </>
  )
}
