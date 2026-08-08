'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Search, Rss } from 'lucide-react'

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
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Toutes')

  // Unique categories
  const categories = ['Toutes', ...Array.from(new Set(initialArticles.map((a) => a.category).filter(Boolean))) as string[]]

  // Filtered articles by category & search
  const filtered = initialArticles.filter((art) => {
    const matchesCat = activeCategory === 'Toutes' || art.category === activeCategory
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(search.toLowerCase())) ||
      (art.category && art.category.toLowerCase().includes(search.toLowerCase()))
    return matchesCat && matchesSearch
  })

  const featured = filtered[0]
  const restArticles = filtered.slice(1)

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0f1b2c] to-[#1E3A5F] text-white py-12 mb-12">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Blog & Actualités ME2I
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Actualités & Insights Techniques
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Découvrez les dernières innovations, guides techniques et études de cas en maintenance industrielle, hybridation solaire et ingénierie électrique au Cameroun.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#1E3A5F] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 text-xs focus:outline-none focus:border-[#1E3A5F] bg-white"
            />
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4 bg-gray-50 border border-gray-200">
            <Rss className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-gray-900 mb-1">Aucun article trouvé</h3>
            <p className="text-gray-500 text-xs max-w-sm mx-auto mb-4">
              Aucun article ne correspond à votre recherche ou catégorie sélectionnée.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Toutes')
                setSearch('')
              }}
              className="bg-[#1E3A5F] text-white text-xs font-semibold px-4 py-2 transition-colors hover:bg-[#2A5DB0]"
            >
              Réinitialiser la recherche
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Main Article */}
            {featured && (
              <div className="border border-gray-200 bg-white grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Image (7 cols) */}
                <div className="lg:col-span-7 aspect-[16/10] bg-gray-100 relative overflow-hidden">
                  <Link href={`/blog/${featured.id}`} className="block w-full h-full">
                    {featured.cover_url ? (
                      <img
                        src={featured.cover_url}
                        alt={featured.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1E3A5F] text-white flex items-center justify-center font-bold text-2xl">
                        ME2I
                      </div>
                    )}
                  </Link>
                </div>

                {/* Content (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1E3A5F] mb-2">
                      À la une &middot; {featured.category || 'Actualité'}
                    </span>

                    <Link href={`/blog/${featured.id}`}>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-[#1E3A5F] transition-colors mb-3 leading-snug">
                        {featured.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-4 leading-relaxed mb-6">
                      {featured.excerpt || 'Découvrez le détail de cet article rédigé par nos experts ME2I.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    {featured.created_at && (
                      <span className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(featured.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    )}

                    <Link
                      href={`/blog/${featured.id}`}
                      className="bg-[#1E3A5F] hover:bg-[#2A5DB0] text-white text-xs font-semibold px-4 py-2 transition-colors"
                    >
                      Lire l'article
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Remaining Articles */}
            {restArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restArticles.map((article) => (
                  <div
                    key={article.id}
                    className="border border-gray-200 bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <Link href={`/blog/${article.id}`} className="block aspect-[16/10] bg-gray-100 overflow-hidden">
                        {article.cover_url ? (
                          <img
                            src={article.cover_url}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center font-bold text-xl">
                            ME2I
                          </div>
                        )}
                      </Link>

                      <div className="p-5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E3A5F] block mb-1.5">
                          {article.category || 'Actualité'}
                        </span>

                        <Link href={`/blog/${article.id}`}>
                          <h3 className="text-base font-bold text-gray-900 hover:text-[#1E3A5F] transition-colors mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                          {article.excerpt || 'Consultez la totalité de cet article.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-auto">
                      {article.created_at && (
                        <span className="text-[11px] text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      )}

                      <Link
                        href={`/blog/${article.id}`}
                        className="bg-[#1E3A5F] hover:bg-[#2A5DB0] text-white text-xs font-semibold px-3 py-1.5 transition-colors"
                      >
                        Lire
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
