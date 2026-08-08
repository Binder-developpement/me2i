'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight, Rss } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug?: string
  category?: string
  excerpt?: string
  content?: string
  cover_url?: string
  created_at?: string
  status?: string
}

export default function BlogClient({ initialArticles }: { initialArticles: Article[] }) {
  const [activeCategory, setActiveCategory] = useState('Toutes')

  // Extract unique categories
  const categories = ['Toutes', ...Array.from(new Set(initialArticles.map((a) => a.category).filter(Boolean))) as string[]]

  const filtered = initialArticles.filter(
    (a) => activeCategory === 'Toutes' || a.category === activeCategory
  )

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Header Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Rss className="h-3.5 w-3.5" />
            <span>Blog & Actualités ME2I</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            Actualités & Insights Techniques
          </h1>
          <p className="text-gray-600 max-w-2xl text-base sm:text-lg">
            Retrouvez les dernières avancées, retours d'expériences et conseils de nos experts en maintenance industrielle et ingénierie énergétique.
          </p>
        </div>

        {/* Empty state if no articles */}
        {initialArticles.length === 0 ? (
          <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <Rss className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Aucun article publié</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              Les articles rédigés dans l'espace d'administration apparaîtront ici automatiquement dès leur publication.
            </p>
            <Link
              href="/admin/articles/nouveau"
              className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#2A5DB0] transition-colors"
            >
              Créer un article en admin
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-200">
                <Link href={`/blog/${featured.id}`} className="block aspect-[16/10] rounded-2xl overflow-hidden shadow-md group">
                  {featured.cover_url ? (
                    <img
                      src={featured.cover_url}
                      alt={featured.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1E3A5F] flex items-center justify-center text-white font-bold text-2xl">
                      ME2I
                    </div>
                  )}
                </Link>
                <div className="flex flex-col justify-center">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1E3A5F] mb-2">
                    À la une &middot; {featured.category || 'Actualité'}
                  </span>
                  <Link href={`/blog/${featured.id}`} className="group">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-[#1E3A5F] transition-colors mb-3 leading-snug">
                      {featured.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-3">
                    {featured.excerpt || 'Découvrez le détail de cet article rédigé par nos experts.'}
                  </p>
                  {featured.created_at && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(featured.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  )}
                  <Link
                    href={`/blog/${featured.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A5F] hover:text-[#2A5DB0] transition-colors w-fit"
                  >
                    <span>Lire l'article complet</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Category Filters */}
            {categories.length > 2 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-[#1E3A5F] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Article Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="group flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] bg-gray-100 overflow-hidden relative">
                    {article.cover_url ? (
                      <img
                        src={article.cover_url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] font-bold text-xl">
                        ME2I
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1E3A5F] mb-2">
                        {article.category || 'Actualité'}
                      </span>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-[#1E3A5F] transition-colors mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                        {article.excerpt || 'Lire le contenu complet de cette actualité.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      {article.created_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      <span className="font-semibold text-[#1E3A5F] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Lire <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
