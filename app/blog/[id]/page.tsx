import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Wrench,
  FileText,
} from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerClient()

  // Fetch target article
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .or(`id.eq.${id},slug.eq.${id}`)
    .single()

  if (!article || article.status !== 'published') {
    notFound()
  }

  // Fetch recent articles for the sidebar
  const { data: recentArticles } = await supabase
    .from('articles')
    .select('id, title, slug, cover_url, created_at')
    .eq('status', 'published')
    .neq('id', article.id)
    .order('created_at', { ascending: false })
    .limit(4)

  // Fetch company settings for contact widget
  const { data: companySettings } = await supabase
    .from('company_settings')
    .select('*')
    .single()

  const formattedDate = article.created_at
    ? new Date(article.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  // Estimate reading time
  const wordCount = (article.content || '').replace(/<[^>]*>/g, '').split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#f8fafc] text-gray-800">
      {/* Top Bar with Back Link on the LEFT */}
      <div className="bg-white border-b border-gray-200 py-3 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-normal">
          {/* Back Button on the LEFT */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[#1E3A5F] hover:text-[#152943] font-normal transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Retour au blog</span>
          </Link>

          {/* Breadcrumb on the RIGHT */}
          <div className="flex items-center gap-2 text-gray-500 truncate">
            <Link href="/" className="hover:text-[#1E3A5F] transition-colors">ME2I</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#1E3A5F] transition-colors">Blog et Actualités</Link>
            <span>/</span>
            <span className="text-gray-800 font-normal truncate max-w-xs">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MAIN CONTENT (8 Cols) */}
          <main className="lg:col-span-8 bg-white border border-gray-200 rounded-sm p-6 sm:p-8 lg:p-10 shadow-sm">
            {/* Header Metadata */}
            <header className="border-b border-gray-100 pb-6 mb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4 font-normal">
                <span className="bg-[#1E3A5F] text-white font-normal px-3 py-1 rounded-sm uppercase tracking-wider text-[11px]">
                  {article.category || 'Expertise Technique'}
                </span>
                {formattedDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {formattedDate}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  {readTime} min de lecture
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  Par Équipe ME2I
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1d2327] leading-tight mb-4">
                {article.title}
              </h1>

              {/* Excerpt Callout */}
              {article.excerpt && (
                <p className="text-base text-gray-600 font-normal leading-relaxed border-l-4 border-[#1E3A5F] bg-gray-50 p-4 rounded-r-sm italic">
                  {article.excerpt}
                </p>
              )}
            </header>

            {/* Cover Image (Uncropped) */}
            {article.cover_url && (
              <div className="w-full bg-gray-50 border border-gray-200 rounded-sm overflow-hidden mb-8 shadow-sm">
                <img
                  src={article.cover_url}
                  alt={article.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Rich HTML Content Body */}
            <div
              className="prose prose-slate max-w-none text-gray-800 leading-relaxed font-normal
                prose-headings:font-normal prose-headings:text-[#1d2327]
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-a:text-[#1E3A5F] prose-a:underline hover:prose-a:text-[#2A5DB0]
                prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-[#1E3A5F] prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:font-normal prose-blockquote:italic
                prose-img:rounded-sm prose-img:border prose-img:border-gray-200 prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Aucun contenu disponible pour cet article.</p>' }}
            />

            {/* Article Footer & Action */}
            <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-normal text-[#1E3A5F] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à la liste des articles</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1E3A5F] hover:bg-[#152943] text-white text-xs font-normal px-4 py-2 rounded-sm transition-colors shadow-sm"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Demander des informations sur cet article</span>
              </Link>
            </footer>
          </main>

          {/* RIGHT SIDEBAR (4 Cols - WordPress Widget Area Style) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Widget 1: À propos de ME2I */}
            <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
              <div className="border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#1E3A5F]" />
                <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                  À propos de ME2I
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-normal mb-4">
                ME2I (Maintenance Industrielle et Énergie sans Interruption) est votre spécialiste au Cameroun pour la maintenance des groupes électrogènes, l'automatisme industriel et les énergies renouvelables.
              </p>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-1 text-xs text-[#1E3A5F] hover:underline font-normal"
              >
                <span>En savoir plus sur notre entreprise</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Widget 2: Articles récents */}
            {recentArticles && recentArticles.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
                <div className="border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#1E3A5F]" />
                  <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                    Articles récents
                  </h3>
                </div>
                <div className="space-y-4">
                  {recentArticles.map((item) => (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug || item.id}`}
                      className="group flex gap-3 items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                    >
                      {item.cover_url && (
                        <img
                          src={item.cover_url}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-sm border border-gray-200 shrink-0 bg-gray-50"
                        />
                      )}
                      <div>
                        <h4 className="text-xs font-normal text-[#1d2327] group-hover:text-[#1E3A5F] transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 block font-normal">
                          {new Date(item.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Widget 3: Contact & Devis rapide */}
            <div className="bg-[#1E3A5F] text-white rounded-sm p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-amber-400" />
                <h3 className="text-xs font-normal uppercase tracking-wider text-white">
                  Besoin d'une intervention ?
                </h3>
              </div>
              <p className="text-xs text-white/80 leading-relaxed font-normal">
                Nos équipes d'ingénieurs et techniciens interviennent 24h/24 et 7j/7 pour la maintenance de vos installations industrielles.
              </p>

              <div className="space-y-2 pt-2 text-xs font-normal">
                {companySettings?.phone && (
                  <a
                    href={`tel:${companySettings.phone}`}
                    className="flex items-center gap-2 text-white/90 hover:text-white hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 text-amber-400" />
                    <span>{companySettings.phone}</span>
                  </a>
                )}
                {companySettings?.email && (
                  <a
                    href={`mailto:${companySettings.email}`}
                    className="flex items-center gap-2 text-white/90 hover:text-white hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5 text-amber-400" />
                    <span className="truncate">{companySettings.email}</span>
                  </a>
                )}
              </div>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="block text-center w-full bg-amber-500 hover:bg-amber-600 text-[#1d2327] font-normal text-xs py-2 rounded-sm transition-colors shadow-sm uppercase tracking-wider"
                >
                  Demander un devis gratuit
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
