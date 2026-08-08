'use client'

import Link from 'next/link'
import { Zap, Sun, Settings, Wrench, Shield, CheckCircle, ArrowRight } from 'lucide-react'

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
          <span className="inline-block px-3 py-1 rounded-full bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            Nos Expertises Métiers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Ingénierie & Services Industriels au Cameroun
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            ME2I accompagne les industriels, les mines et les infrastructures privées et publiques avec des prestations de haute précision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {initialServices.map((service) => {
            const IconComp = getIcon(service.icon_name)

            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover image or Icon */}
                  {service.cover_url ? (
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 relative">
                      <img
                        src={service.cover_url}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E3A5F] text-white p-2 rounded-lg shadow-md">
                        <IconComp className="h-5 w-5" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-[#1E3A5F]/10 text-[#1E3A5F] flex items-center justify-center mb-6">
                      <IconComp className="h-6 w-6" />
                    </div>
                  )}

                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F]">
                    {service.category || 'Maintenance'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-3 group-hover:text-[#1E3A5F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {service.description || 'Intervention rapide et expertise technique garantie par les ingénieurs ME2I.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Disponible 24h/7
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A5F] hover:underline"
                  >
                    <span>Demander un devis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#1E3A5F] via-[#1A3354] to-[#13253e] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Besoin d'un audit technique ou d'une intervention d'urgence ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
            Nos techniciens et ingénieurs interviennent sur tout le territoire camerounais et en Afrique Centrale.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1E3A5F] hover:bg-gray-100 font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
          >
            <span>Contacter nos équipes techniques</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
