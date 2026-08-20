import { createServerClient } from '@/src/admin/lib/supabase-server'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/src/lib/seo'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  let articles: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(50)

    articles = data || []
  } catch (e) {
    console.error('Error generating RSS feed:', e)
  }

  const rssItems = articles
    .map((article) => {
      const url = `${SITE_URL}/blog/${article.slug || article.id}`
      const pubDate = new Date(article.published_at || article.created_at || Date.now()).toUTCString()
      const title = escapeXml(article.title || '')
      const description = escapeXml(article.excerpt || article.title || '')
      const category = escapeXml(article.category || 'Maintenance Industrielle')

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <category>${category}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr-FR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '&':
        return '&amp;'
      case "'":
        return '&apos;'
      case '"':
        return '&quot;'
      default:
        return c
    }
  })
}
