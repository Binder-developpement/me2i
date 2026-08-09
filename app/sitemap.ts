import { MetadataRoute } from 'next'
import { createServerClient } from '@/src/admin/lib/supabase-server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://me2i.cm'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/commander`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/demarches`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  let articleRoutes: MetadataRoute.Sitemap = []
  let realisationRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = await createServerClient()

    // Fetch published articles
    const { data: articles } = await supabase
      .from('articles')
      .select('id, slug, updated_at, created_at')
      .eq('status', 'published')

    if (articles) {
      articleRoutes = articles.map((art) => ({
        url: `${baseUrl}/blog/${art.slug || art.id}`,
        lastModified: new Date(art.updated_at || art.created_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    }

    // Fetch published realisations
    const { data: realisations } = await supabase
      .from('realisations')
      .select('id, updated_at, created_at')

    if (realisations) {
      realisationRoutes = realisations.map((real) => ({
        url: `${baseUrl}/realisations/${real.id}`,
        lastModified: new Date(real.updated_at || real.created_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    }
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err)
  }

  return [...staticRoutes, ...articleRoutes, ...realisationRoutes]
}
