import { MetadataRoute } from 'next'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import { SITE_URL } from '@/src/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/realisations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/demarches`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/commander`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  let articleRoutes: MetadataRoute.Sitemap = []
  let realisationRoutes: MetadataRoute.Sitemap = []
  let serviceRoutes: MetadataRoute.Sitemap = []
  let productRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = await createServerClient()

    // Fetch published articles
    const { data: articles } = await supabase
      .from('articles')
      .select('id, slug, updated_at, created_at')
      .eq('status', 'published')

    if (articles) {
      articleRoutes = articles.map((art) => ({
        url: `${SITE_URL}/blog/${art.slug || art.id}`,
        lastModified: new Date(art.updated_at || art.created_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }))
    }

    // Fetch published realisations
    const { data: realisations } = await supabase
      .from('realisations')
      .select('id, slug, updated_at, created_at')
      .eq('status', 'published')

    if (realisations) {
      realisationRoutes = realisations.map((real) => ({
        url: `${SITE_URL}/realisations/${real.slug || real.id}`,
        lastModified: new Date(real.updated_at || real.created_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    }

    // Fetch published services
    const { data: services } = await supabase
      .from('services')
      .select('id, slug, updated_at, created_at')
      .eq('status', 'published')

    if (services) {
      serviceRoutes = services.map((srv) => ({
        url: `${SITE_URL}/services#${srv.slug || srv.id}`,
        lastModified: new Date(srv.updated_at || srv.created_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
    }

    // Fetch published products
    const { data: products } = await supabase
      .from('products')
      .select('id, slug, updated_at, created_at')
      .eq('status', 'published')

    if (products) {
      productRoutes = products.map((prod) => ({
        url: `${SITE_URL}/demarches#${prod.slug || prod.id}`,
        lastModified: new Date(prod.updated_at || prod.created_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.6,
      }))
    }
  } catch (err) {
    console.error('Error generating dynamic sitemap:', err)
  }

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...realisationRoutes,
    ...serviceRoutes,
    ...productRoutes,
  ]
}
