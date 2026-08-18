'use client'

import Link from 'next/link'
import { Zap, Sun, Settings, Shield, CheckCircle } from 'lucide-react'

interface ServiceItem {
  id: string
  title: string
  slug?: string
  category?: string
  description?: string
  content?: string
  cover_url?: string
  icon_name?: string
}

const getIcon = (name?: string) => {
  switch (name) {
    case 'Sun':
      return Sun
    case 'Settings':
      return Settings
    case 'Shield':
      return Shield
    case 'Zap':
    default:
      return Zap
  }
}

export default function ServicesClient({ initialServices }: { initialServices: ServiceItem[] }) {
  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-white">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Header Title */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-none bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            Nos Expertises Métiers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Ingénierie & Services Industriels au Cameroun
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            MCI accompagne les industriels, les mines et les infrastructures privées et publiques avec des prestations de haute précision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {initialServices.map((service) => {
            const IconComp = getIcon(service.icon_name)

            return (
              <div
                key={service.id}
                className="group bg-white border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover image without badge */}
                  {service.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden mb-6 relative">
                      <img
                        src={service.cover_url}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center mb-6">
                      <IconComp className="h-6 w-6" />
                    </div>
                  )}

                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
                    {service.category || 'Maintenance'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3 group-hover:text-[#1E3A5F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                    {service.description || 'Intervention rapide et expertise technique garantie par les ingénieurs MCI.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Disponible 24h/7
                  </span>
                  <Link
                    href={`/commander?type=service&id=${service.id}`}
                    className="bg-[#1E3A5F] hover:bg-[#2A5DB0] text-white text-xs font-semibold px-4 py-2.5 rounded-none transition-colors shadow-sm"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#1E3A5F] via-[#1A3354] to-[#13253e] p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Besoin d'un audit technique ou d'une intervention d'urgence ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
            Nos techniciens et ingénieurs interviennent sur tout le territoire camerounais et en Afrique Centrale.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#1E3A5F] hover:bg-gray-100 font-bold text-sm px-6 py-3 rounded-none transition-colors shadow-md"
          >
            Contacter nos équipes techniques
          </Link>
        </div>
      </section>
    </div>
  )
}
