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
      {/* Hero Header (Centered, no background) */}
      <section className="py-8 mb-8">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-gray-100 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3 rounded-sm">
              Blog & Actualités ME2I
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1d2327] mb-4">
              Actualités & Insights Techniques
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
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
              type="button"
              onClick={() => {
                setSearch('')
                setActiveCategory('Toutes')
              }}
              className="px-4 py-2 bg-[#1E3A5F] text-white text-xs font-medium hover:bg-[#152943] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Hero Article - Limited height & clickable everywhere */}
            {featured && (
              <div className="group relative bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-6 relative bg-gray-100 overflow-hidden h-[260px] sm:h-[320px] lg:h-[350px]">
                    <Link href={`/blog/${featured.slug || featured.id}`} className="block w-full h-full">
                      <img
                        src={featured.cover_url || '/images/hero.jpg'}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  </div>
                  <div className="lg:col-span-6 p-6 sm:p-8 lg:p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <span className="px-2.5 py-0.5 bg-[#1E3A5F] text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">
                          {featured.category || 'Maintenance'}
                        </span>
                        {featured.created_at && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {new Date(featured.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#1d2327] group-hover:text-[#1E3A5F] transition-colors mb-3 leading-snug">
                        <Link href={`/blog/${featured.slug || featured.id}`}>
                          {featured.title}
                        </Link>
                      </h2>
                      <Link href={`/blog/${featured.slug || featured.id}`} className="block text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6 hover:text-gray-900 transition-colors">
                        {featured.excerpt}
                      </Link>
                    </div>

                    <div>
                      <Link
                        href={`/blog/${featured.slug || featured.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A5F] text-white text-xs font-semibold hover:bg-[#152943] transition-colors rounded-sm shadow-sm"
                      >
                        <span>Lire l'article</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Other Articles - All images and texts clickable */}
            {restArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {restArticles.map((art) => (
                  <article
                    key={art.id}
                    className="group bg-white border border-gray-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-sm"
                  >
                    <div>
                      <Link href={`/blog/${art.slug || art.id}`} className="block aspect-[16/10] bg-gray-100 relative overflow-hidden">
                        <img
                          src={art.cover_url || '/og-preview.png'}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                          <span className="text-[#1E3A5F] font-semibold uppercase tracking-wider">
                            {art.category || 'Technique'}
                          </span>
                          <span>•</span>
                          {art.created_at && (
                            <span>{new Date(art.created_at).toLocaleDateString('fr-FR')}</span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-[#1d2327] group-hover:text-[#1E3A5F] transition-colors line-clamp-2 mb-2 leading-snug">
                          <Link href={`/blog/${art.slug || art.id}`}>
                            {art.title}
                          </Link>
                        </h3>
                        <Link href={`/blog/${art.slug || art.id}`} className="block text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4 hover:text-gray-900 transition-colors">
                          {art.excerpt}
                        </Link>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0">
                      <Link
                        href={`/blog/${art.slug || art.id}`}
                        className="text-xs font-semibold text-[#1E3A5F] group-hover:underline inline-flex items-center gap-1"
                      >
                        <span>Lire l'article</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
