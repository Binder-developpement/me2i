'use client'

import { useState } from 'react'
import { Link } from '@/src/lib/router-compat'
import Image from 'next/image'
import { Realisation } from '@/src/lib/realisations-data'
import {
  Search,
  MapPin,
  Building,
  ArrowRight,
  Zap,
  FolderCheck,
  CheckCircle,
} from 'lucide-react'

export default function Realisations({
  realisations = [],
}: {
  realisations?: Realisation[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const categories = [
    'Toutes',
    'Groupes Électrogènes',
    'Automatisme & Coffrets',
    'Énergie Solaire',
    'Maintenance',
    'Froid Industriel',
  ]

  const filtered = realisations.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Toutes' ||
      (item.category || '').toLowerCase().includes(selectedCategory.toLowerCase())

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-[#f8fafc]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Document Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            PORTFOLIO D'INGÉNIERIE ME2I
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d2327] tracking-tight mb-4 font-heading">
            Nos Réalisations &amp; Projets
          </h1>
          <p className="text-[#50575e] text-base sm:text-lg font-normal leading-relaxed">
            Découvrez la polyvalence technique et la qualité d'exécution de nos équipes sur le terrain : centrales solaires, groupes électrogènes, armoires d'automatisme et froid industriel.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-normal transition-colors rounded-sm border ${
                  selectedCategory === cat
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-[#f6f7f7] text-[#2c3338] border-[#c3c4c7] hover:bg-[#e0e0e0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8c8f94]" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé, client, ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#8c8f94] rounded-sm focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] font-normal"
            />
          </div>
        </div>

        {/* Realisations Cards Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-12 text-center text-[#646970] font-normal">
            Aucun projet ne correspond à votre recherche.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative w-full h-56 bg-[#f0f0f1] border-b border-[#c3c4c7] overflow-hidden group">
                    {item.cover_url ? (
                      <Image
                        src={item.cover_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#646970]">
                        Image non disponible
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-[#1E3A5F] text-white text-[11px] font-normal px-2.5 py-1 rounded-sm shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h2 className="text-base font-semibold text-[#1d2327] leading-snug line-clamp-2">
                      {item.title}
                    </h2>

                    {item.subtitle && (
                      <p className="text-xs font-normal text-[#2271b1] line-clamp-1">
                        {(item.subtitle || '').replace(/<[^>]*>/g, '').trim()}
                      </p>
                    )}

                    <p className="text-xs text-[#50575e] font-normal leading-relaxed line-clamp-3">
                      {(item.description || '').replace(/<[^>]*>/g, '').trim()}
                    </p>

                    {/* Metadata tags */}
                    <div className="pt-3 border-t border-[#f0f0f1] flex flex-wrap items-center justify-between text-[11px] text-[#646970] font-normal gap-2">
                      {item.client && (
                        <span className="flex items-center gap-1">
                          <Building className="h-3.5 w-3.5 text-[#2271b1]" />
                          <span>{item.client}</span>
                        </span>
                      )}
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-[#2271b1]" />
                          <span>{item.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-5 pt-0">
                  <Link
                    to={`/realisations/${item.slug || item.id}`}
                    className="inline-flex items-center gap-2 text-xs font-normal text-[#2271b1] hover:text-[#135e96] transition-colors"
                  >
                    <span>Consulter la fiche détaillée</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-[#1E3A5F] text-white rounded-sm p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Vous avez un projet similaire ou une intervention urgente ?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-normal max-w-2xl">
              Nos ingénieurs et techniciens étudient vos besoins et conçoivent des solutions adaptées sur mesure pour vos installations.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1E3A5F] text-xs font-semibold px-5 py-3 rounded-none hover:bg-white/90 transition-colors shrink-0 shadow-sm"
          >
            <span>Demander un devis technique</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
