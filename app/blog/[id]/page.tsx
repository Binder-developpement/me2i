import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'

export const revalidate = 0

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerClient()

  // Try finding by id or by slug
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .or(`id.eq.${id},slug.eq.${id}`)
    .single()

  if (!article || article.status !== 'published') {
    notFound()
  }

  const formattedDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1E3A5F] hover:text-[#2A5DB0] mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour au Blog</span>
        </Link>

        {/* Category & Date */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {article.category || 'Actualité'}
          </span>
          {formattedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              {formattedDate}
            </span>
          )}
        </div>

        {/* Article Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt if available */}
        {article.excerpt && (
          <p className="text-lg text-gray-600 font-medium mb-8 leading-relaxed border-l-4 border-[#1E3A5F] pl-4 italic">
            {article.excerpt}
          </p>
        )}

        {/* Cover Image */}
        {article.cover_url && (
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-md">
            <img
              src={article.cover_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Rich HTML Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-normal
            prose-headings:font-bold prose-headings:text-gray-900
            prose-a:text-[#1E3A5F] prose-a:underline hover:prose-a:text-[#2A5DB0]
            prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: article.content || '<p>Aucun contenu rédigé.</p>' }}
        />

        {/* Bottom Navigation */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A5F] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Découvrir d'autres articles</span>
          </Link>
        </div>
      </article>
    </div>
  )
}
