'use client'

import { useState, useMemo } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'

const news = [
  { image: '/actualite-1.jpg', date: '15 juin 2025', category: 'Consultation', title: 'Conseil municipal : participez a la consultation sur le futur PLU', excerpt: 'La municipalite lance une consultation publique sur le Plan Local d\'Urbanisme, ouverte jusqu\'a fin juillet. Les habitants sont invites a partager leurs propositions lors de reunions publiques organisees dans chaque quartier.' },
  { image: '/actualite-2.jpg', date: '12 juin 2025', category: 'Travaux', title: 'Lancement des travaux de renovation du centre aquatique', excerpt: 'Le centre aquatique municipal fermera ses portes pour une renovation complete de 6 mois.' },
  { image: '/actualite-3.jpg', date: '08 juin 2025', category: 'Culture', title: 'Fete de la musique : programme complet des animations', excerpt: 'Concerts, animations de rue et scenes ouvertes dans toute la ville pour la Fete de la musique.' },
  { image: '/actualite-4.jpg', date: '05 juin 2025', category: 'Institution', title: 'Nouvelle equipe municipale : decouvrez les delegations', excerpt: 'Presentation des nouveaux adjoints et de leurs delegations respectives.' },
  { image: '/actualite-1.jpg', date: '28 mai 2025', category: 'Travaux', title: 'Renovation de la place de l\'Hotel de Ville', excerpt: 'Debut des travaux d\'embellissement de la place centrale, livraison prevue au printemps 2026.' },
  { image: '/actualite-2.jpg', date: '20 mai 2025', category: 'Culture', title: 'Nouvelle saison au theatre municipal', excerpt: 'Decouvrez la programmation 2025-2026 du theatre municipal.' },
  { image: '/actualite-3.jpg', date: '12 mai 2025', category: 'Institution', title: 'Budget participatif 2026 : les projets laureats devoiles', excerpt: 'Douze projets citoyens ont ete selectionnes pour beneficier du budget participatif de la ville.' },
  { image: '/actualite-4.jpg', date: '02 mai 2025', category: 'Travaux', title: 'Extension du reseau de pistes cyclables', excerpt: '8 km de nouvelles pistes cyclables seront amenagees d\'ici la fin de l\'annee.' },
]

const categories = ['Toutes', 'Consultation', 'Travaux', 'Culture', 'Institution']
const PAGE_SIZE = 6

export default function Actualites() {
  const [activeCategory, setActiveCategory] = useState('Toutes')
  const [page, setPage] = useState(1)

  const filtered = news.filter((n) => activeCategory === 'Toutes' || n.category === activeCategory)
  const [featured, ...rest] = filtered
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE))
  const paginated = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const archivesByMonth = useMemo(() => {
    const groups: Record<string, number> = {}
    news.forEach((n) => {
      const [, month, year] = n.date.split(' ')
      const key = `${month} ${year}`
      groups[key] = (groups[key] || 0) + 1
    })
    return groups
  }, [])

  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      <section className="mx-auto max-w-[1280px] px-6 lg:px-12 py-section-mobile lg:py-section">
        <h1 className="text-4xl sm:text-5xl font-bold text-gris-fonce font-heading mb-4">
          Actualites municipales
        </h1>
        <p className="text-gris-moyen max-w-[560px] mb-10">
          Suivez l'actualite de la ville : travaux, culture, consultations citoyennes et vie institutionnelle.
        </p>

        {/* Featured article */}
        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 pb-14 border-b border-gray-200">
            <div className="aspect-[16/10] rounded-xl overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-bleu-marianne mb-3 w-fit">
                A la une &middot; {featured.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gris-fonce font-heading mb-4">
                {featured.title}
              </h2>
              <p className="text-gris-moyen mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-1.5 text-xs text-gris-moyen mb-6">
                <Calendar size={12} />
                <span>{featured.date}</span>
              </div>
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-bleu-marianne w-fit">
                Lire l'article <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat
                  ? 'bg-bleu-marianne text-white'
                  : 'bg-gray-100 text-gris-fonce hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {paginated.map((item, i) => (
            <div key={`${item.title}-${i}`} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-bleu-marianne mb-2">
                {item.category}
              </span>
              <h3 className="font-heading font-semibold text-gris-fonce mb-2 group-hover:text-bleu-marianne transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-sm text-gris-moyen mb-3 line-clamp-2">{item.excerpt}</p>
              <div className="flex items-center gap-1.5 text-xs text-gris-moyen">
                <Calendar size={12} />
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  page === i + 1 ? 'bg-bleu-marianne text-white' : 'bg-gray-100 text-gris-fonce hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Archives */}
        <div className="pt-10 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gris-fonce font-heading mb-6">Archives</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(archivesByMonth).map(([month, count]) => (
              <span key={month} className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gris-fonce">
                {month} <span className="text-gris-moyen">({count})</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
