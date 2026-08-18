'use client'

import { Link } from '@/src/lib/router-compat'
import { Realisation } from '@/src/lib/realisations-data'
import {
  ArrowLeft,
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export default function RealisationDetail({
  realisation,
}: {
  realisation: Realisation
}) {
  const cleanSubtitle = (realisation.subtitle || '').replace(/<[^>]*>/g, '').trim()
  const rawContent = (realisation.content || realisation.description || '').trim()

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-[#f8fafc]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#646970]">
          <Link to="/" className="hover:text-[#2271b1]">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/realisations" className="hover:text-[#2271b1]">
            Nos Réalisations
          </Link>
          <span>/</span>
          <span className="text-[#1d2327] line-clamp-1">{realisation.title}</span>
        </div>

        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-1.5 text-xs text-[#2271b1] hover:text-[#135e96] font-normal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la liste des réalisations</span>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Image & Main Description */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm space-y-6">
              {/* Category Badge & Title */}
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-1 bg-[#1E3A5F] text-white text-xs font-normal rounded-sm">
                  {realisation.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1d2327] tracking-tight leading-tight">
                  {realisation.title}
                </h1>
                {cleanSubtitle && !rawContent.startsWith(cleanSubtitle) && (
                  <p className="text-sm font-normal text-[#2271b1]">
                    {cleanSubtitle}
                  </p>
                )}
              </div>

              {/* Cover Image - Uncropped full width natural height */}
              <div className="w-full bg-[#f8fafc] border border-[#c3c4c7] rounded-sm overflow-hidden">
                {realisation.cover_url ? (
                  <img
                    src={realisation.cover_url}
                    alt={realisation.title}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center text-xs text-[#646970]">
                    Photo non disponible
                  </div>
                )}
              </div>

              {/* Description & Technical details (Rendered as HTML) */}
              <div className="space-y-4 pt-4 border-t border-[#f0f0f1]">
                <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                  Détail du projet &amp; Intervention MCI
                </h2>
                <div
                  className="prose prose-slate max-w-none text-sm text-[#50575e] font-normal leading-relaxed
                    prose-headings:font-semibold prose-headings:text-[#1d2327]
                    prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h2:border-b prose-h2:border-[#f0f0f1] prose-h2:pb-2
                    prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
                    prose-p:mb-3 prose-p:leading-relaxed
                    prose-ul:list-disc prose-ul:pl-5 prose-ul:my-3
                    prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-3
                    prose-li:mb-1.5"
                  dangerouslySetInnerHTML={{
                    __html: rawContent || '<p>Détail du projet non disponible.</p>',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Project Metadata Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Metadata Card */}
            <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-5">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3">
                Fiche Technique du Projet
              </h2>

              <div className="space-y-4 text-xs font-normal text-[#2c3338]">
                {realisation.client && (
                  <div className="flex items-start gap-3">
                    <Building className="w-4 h-4 text-[#2271b1] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#646970] block text-[11px]">Client / Secteur :</span>
                      <span className="text-[#1d2327] font-semibold">{realisation.client}</span>
                    </div>
                  </div>
                )}

                {realisation.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#2271b1] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#646970] block text-[11px]">Localisation :</span>
                      <span className="text-[#1d2327]">{realisation.location}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#2271b1] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#646970] block text-[11px]">Garantie &amp; Suivi :</span>
                    <span className="text-[#1d2327]">Conforme aux exigences industrielles</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#007017] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#646970] block text-[11px]">Statut Projet :</span>
                    <span className="text-[#007017]">Réalisé avec succès</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#f0f0f1]">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1E3A5F] text-white text-xs font-semibold px-4 py-3 rounded-none hover:bg-[#1E3A5F]/90 transition-colors shadow-sm"
                >
                  <span>Demander un devis similaire</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
