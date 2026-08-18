'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ProductItem {
  id: string
  name: string
  slug?: string
  category?: string
  price?: number
  currency?: string
  stock?: number
  description?: string
  cover_url?: string
}

export default function ProductsClient({ initialProducts }: { initialProducts: ProductItem[] }) {
  const [activeCategory, setActiveCategory] = useState('Toutes')

  const categories = ['Toutes', ...Array.from(new Set(initialProducts.map((p) => p.category).filter(Boolean))) as string[]]

  const filtered = initialProducts.filter(
    (p) => activeCategory === 'Toutes' || p.category === activeCategory
  )

  const formatPrice = (price?: number, currency = 'XAF') => {
    if (!price) return 'Sur Devis'
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency === 'XAF' ? 'XAF' : 'EUR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Header Title */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-none bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            Catalogue MCI
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Équipements, Moteurs & Pièces Détachées
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Découvrez nos groupes électrogènes, inverseurs automatiques, composants de puissance et accessoires solaires certifiés aux normes internationales.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-none text-xs font-semibold transition-all ${
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {product.cover_url ? (
                    <img
                      src={product.cover_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] font-bold text-xl">
                      MCI
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
                    {product.category || 'Équipement'}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2 group-hover:text-[#1E3A5F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed font-normal">
                    {product.description || 'Matériel de haute fiabilité pour installations industrielles exigeantes.'}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 block uppercase font-medium">Prix unitaire</span>
                  <span className="text-lg font-black text-[#1E3A5F]">
                    {formatPrice(product.price, product.currency)}
                  </span>
                </div>

                <Link
                  href={`/commander?type=product&id=${product.id}`}
                  className="bg-[#1E3A5F] hover:bg-[#2A5DB0] text-white text-xs font-semibold px-4 py-2.5 rounded-none transition-colors shadow-sm"
                >
                  Commander
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
