'use client'

import { Link } from '@/src/lib/router-compat'
import Image from 'next/image'
import { Realisation } from '@/src/lib/realisations-data'
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export default function RealisationDetail({
  realisation,
}: {
  realisation: Realisation
}) {
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
                {realisation.subtitle && (
                  <p className="text-sm font-normal text-[#2271b1]">
                    {realisation.subtitle}
                  </p>
                )}
              </div>

              {/* Cover Image */}
              <div className="relative w-full h-80 sm:h-96 bg-[#f0f0f1] border border-[#c3c4c7] rounded-sm overflow-hidden">
                {realisation.cover_url ? (
                  <Image
                    src={realisation.cover_url}
                    alt={realisation.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#646970]">
                    Photo non disponible
                  </div>
                )}
              </div>

              {/* Description & Technical details */}
              <div className="space-y-4 pt-4 border-t border-[#f0f0f1]">
                <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                  Détail du projet &amp; Intervention ME2I
                </h2>
                <div className="text-sm text-[#50575e] font-normal leading-relaxed whitespace-pre-line space-y-3">
                  {realisation.content || realisation.description}
                </div>
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

            {/* Assistance Box */}
            <div className="bg-[#f6f7f7] border border-[#c3c4c7] rounded-sm p-6 space-y-4">
              <h3 className="text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
                Assistance Technique 24h/7j
              </h3>
              <p className="text-xs text-[#50575e] font-normal leading-relaxed">
                Une question sur cette réalisation ou besoin d'une évaluation pour vos propres équipements ?
              </p>
              <div className="space-y-2 text-xs font-normal">
                <p className="flex items-center gap-2 text-[#2271b1]">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+237699000000" className="hover:underline">
                    +237 699 00 00 00
                  </a>
                </p>
                <p className="flex items-center gap-2 text-[#2271b1]">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:contact@me2i.cm" className="hover:underline">
                    contact@me2i.cm
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
