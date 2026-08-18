'use client'

import { Link } from '@/src/lib/router-compat'
import {
  Building,
  Target,
  ShieldCheck,
  Award,
  Cpu,
  Users,
  CheckCircle,
  Wrench,
  Zap,
  Sun,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

const companyValues = [
  {
    title: 'Professionnalisme',
    desc: 'Excellence et rigueur technique dans chaque intervention sur le terrain.',
    icon: Award,
  },
  {
    title: 'Fiabilité',
    desc: 'Des solutions d’ingénierie éprouvées et durables pour vos équipements.',
    icon: ShieldCheck,
  },
  {
    title: 'Sécurité',
    desc: 'Respect strict et sans compromis des normes industrielles en vigueur.',
    icon: Wrench,
  },
  {
    title: 'Innovation',
    desc: 'Intégration continue des nouvelles technologies énergétiques et d’automatisme.',
    icon: Cpu,
  },
  {
    title: 'Respect',
    desc: 'Écoute active, transparence et considération de l’ensemble de nos partenaires.',
    icon: Users,
  },
  {
    title: 'Satisfaction Client',
    desc: 'Au cœur absolu de notre démarche et de nos engagements de service.',
    icon: CheckCircle,
  },
]

const targetClients = [
  'Industries manufacturières',
  'Hôpitaux et cliniques',
  'Établissements scolaires et universitaires',
  'Hôtels et complexes touristiques',
  'PME / PMI',
  'Stations-service',
  'Boulangeries industrielles',
  'Carrières et mines',
  'Administrations publiques',
]

const coreDomains = [
  'Maintenance industrielle générale',
  'Groupes électrogènes (toutes marques)',
  'Automatisme et contrôle industriel',
  'Énergies renouvelables (solaire photovoltaïque)',
  'Installations électriques industrielles',
  'Froid industriel et climatisation',
  'Systèmes de pompage',
  'Audit et conseil énergétique',
  'Formation technique des équipes',
]

const generatorServices = [
  'Maintenance préventive et curative',
  'Diagnostic et dépannage toutes marques',
  'Câblage et installation complète',
  'Synchronisation de groupes électrogènes',
  'Remplacement de pièces (alternateurs, régulateurs, diodes)',
  'Conception de coffrets inverseurs automatiques et semi-automatiques',
  'Programmation de cartes de contrôle (DSE, ComAp)',
  'Adaptation et modification de systèmes existants',
  'Entretien de radiateurs et systèmes de refroidissement',
  'Mise en service et essais de performance',
]

const supportedBrands = [
  'SDMO',
  'Cummins',
  'Caterpillar',
  'Olympian',
  'Aksa',
  'Mikano',
  'Perkins',
  'FG Wilson',
  'Hyundai',
  'MTU',
]

const solarServices = [
  'Études de faisabilité et dimensionnement solaire',
  'Installation de systèmes photovoltaïques (résidentiel et industriel)',
  'Hybridation groupe électrogène / solaire',
  'Maintenance préventive et curative des installations solaires',
  'Audit énergétique et optimisation de la consommation',
  'Solutions de stockage d’énergie (batteries industrielles)',
]

const automationServices = [
  'Programmation d’automates (PLC) et cartes de contrôle',
  'Instrumentation industrielle',
  'Supervision et télégestion (SCADA)',
  'Régulation et contrôle de processus',
  'Câblage d’armoires de commande et de puissance',
  'Mise en service et paramétrage d’équipements',
]

export default function About({
  settings = {},
}: {
  settings?: Record<string, string>
}) {
  const companyName = settings.company_name || 'MCI'
  const tagline =
    settings.tagline || 'Maintenance & Construction Industrielle'
  const address = settings.address || 'Douala / Yaoundé, Cameroun'
  const email = settings.email || 'contact@me2i.cm'
  const phone = settings.phone || '+237 699 00 00 00'
  const emergencyPhone = settings.emergency_phone || '+237 677 00 00 00'
  const openingHours = settings.opening_hours || 'Lundi – Vendredi : 7h30 – 18h00'

  return (
    <div className="pt-24 pb-16 min-h-[100dvh] bg-[#f8fafc]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Document Header styled like /demarches */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold uppercase tracking-wider mb-3">
            DOCUMENT INSTITUTIONNEL OFFICIEL
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d2327] tracking-tight mb-4 font-heading">
            À Propos de {companyName}
          </h1>
          <p className="text-[#50575e] text-base sm:text-lg font-normal leading-relaxed">
            Spécialiste en maintenance industrielle, groupes électrogènes, automatisme industriel et énergies renouvelables au Cameroun et en Afrique centrale.
          </p>
        </div>

        {/* Executive Overview & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Presentation */}
          <div className="lg:col-span-7 bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
                <Building className="h-5 w-5 text-[#2271b1]" />
                <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                  Présentation de l'entreprise
                </h2>
              </div>
              <p className="text-sm text-[#50575e] font-normal leading-relaxed mb-4">
                <strong className="text-[#1d2327] font-semibold">{companyName}</strong> (Maintenance et Construction Industrielle) est une entreprise camerounaise basée à Douala, spécialisée dans la maintenance industrielle, les groupes électrogènes, les systèmes énergétiques, l'automatisme industriel et les énergies renouvelables.
              </p>
              <p className="text-sm text-[#50575e] font-normal leading-relaxed">
                Notre mission principale est d'assurer la continuité énergétique et la performance maximale des installations industrielles de nos clients grâce à des solutions techniques fiables, innovantes et rigoureusement adaptées aux réalités du terrain.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#f0f0f1] flex items-center justify-between text-xs text-[#646970]">
              <span>Siège Social : {address}</span>
              <span>Référence 2026</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="lg:col-span-5 bg-[#1E3A5F] text-white rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-white/10">
                <Target className="h-5 w-5 text-white" />
                <h2 className="text-base font-normal uppercase tracking-wider text-white">
                  Notre Vision
                </h2>
              </div>
              <blockquote className="text-lg sm:text-xl font-normal leading-snug text-white/95 mb-6">
                "Devenir une référence incontournable au Cameroun et en Afrique centrale dans le domaine de la maintenance industrielle et des solutions énergétiques durables."
              </blockquote>
              <p className="text-xs text-white/80 font-normal leading-relaxed">
                {companyName} s'engage au quotidien aux côtés des industriels et acteurs économiques pour offrir une assistance technique continue et irréprochable.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1E3A5F] text-xs font-semibold px-4 py-2.5 rounded-none hover:bg-white/90 transition-colors shadow-sm"
              >
                <span>Prendre contact avec nos experts</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Nos Valeurs Grid */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
            <Award className="h-5 w-5 text-[#2271b1]" />
            <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
              Nos Valeurs d'Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyValues.map((val) => {
              const IconComp = val.icon
              return (
                <div
                  key={val.title}
                  className="bg-[#f6f7f7] border border-[#c3c4c7] rounded-sm p-5 space-y-2 hover:border-[#2271b1] transition-colors"
                >
                  <div className="flex items-center gap-2.5 text-[#2271b1]">
                    <IconComp className="h-4 w-4" />
                    <h3 className="text-sm font-semibold text-[#1d2327]">
                      {val.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#50575e] font-normal leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Domaines d'Activité & Clients Cibles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Domaines d'activité */}
          <div className="lg:col-span-6 bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
              <Wrench className="h-5 w-5 text-[#2271b1]" />
              <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                Domaines d'Activité
              </h2>
            </div>
            <ul className="space-y-3">
              {coreDomains.map((dom, index) => (
                <li key={dom} className="flex items-center gap-3 text-xs text-[#50575e] font-normal">
                  <span className="h-5 w-5 rounded-full bg-[#2271b1]/10 text-[#2271b1] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span>{dom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clients Cibles */}
          <div className="lg:col-span-6 bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
              <Users className="h-5 w-5 text-[#2271b1]" />
              <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                Secteurs &amp; Clients Cibles
              </h2>
            </div>
            <p className="text-xs text-[#50575e] font-normal leading-relaxed mb-6">
              MCI accompagne un vaste réseau de partenaires publics et privés exigeant une haute disponibilité énergétique :
            </p>
            <div className="flex flex-wrap gap-2">
              {targetClients.map((client) => (
                <span
                  key={client}
                  className="bg-[#f6f7f7] border border-[#c3c4c7] text-[#1d2327] text-xs font-normal px-3 py-1.5 rounded-sm"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Deep Expertise: Groupes Électrogènes */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-[#f0f0f1] gap-2">
            <div className="flex items-center gap-2.5">
              <Zap className="h-5 w-5 text-[#2271b1]" />
              <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                Services Groupes Électrogènes
              </h2>
            </div>
            <span className="text-xs text-[#646970] font-normal">
              Maintenance préventive &amp; curative toutes puissances
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {generatorServices.map((srv) => (
              <div key={srv} className="flex items-start gap-2.5 text-xs text-[#50575e] font-normal">
                <ChevronRight className="h-4 w-4 text-[#2271b1] shrink-0 mt-0.5" />
                <span>{srv}</span>
              </div>
            ))}
          </div>

          {/* Marques prises en charge */}
          <div className="p-4 bg-[#f6f7f7] border border-[#c3c4c7] rounded-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1d2327] mb-3">
              Marques et Constructeurs pris en charge :
            </h3>
            <div className="flex flex-wrap gap-2">
              {supportedBrands.map((brand) => (
                <span
                  key={brand}
                  className="bg-white border border-[#c3c4c7] text-[#2271b1] font-semibold text-xs px-3 py-1 rounded-sm shadow-sm"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Energies Renouvelables & Automatisme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Énergies Renouvelables */}
          <div className="lg:col-span-6 bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
              <Sun className="h-5 w-5 text-[#2271b1]" />
              <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                Énergies Renouvelables &amp; Solaire
              </h2>
            </div>
            <ul className="space-y-3">
              {solarServices.map((sol) => (
                <li key={sol} className="flex items-start gap-2.5 text-xs text-[#50575e] font-normal">
                  <CheckCircle className="h-4 w-4 text-[#2271b1] shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Automatisme & Contrôle */}
          <div className="lg:col-span-6 bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
              <Cpu className="h-5 w-5 text-[#2271b1]" />
              <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
                Automatisme &amp; Contrôle Industriel
              </h2>
            </div>
            <ul className="space-y-3">
              {automationServices.map((aut) => (
                <li key={aut} className="flex items-start gap-2.5 text-xs text-[#50575e] font-normal">
                  <CheckCircle className="h-4 w-4 text-[#2271b1] shrink-0 mt-0.5" />
                  <span>{aut}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dynamic Contact Banner from Admin Database */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#f0f0f1]">
            <Phone className="h-5 w-5 text-[#2271b1]" />
            <h2 className="text-base font-normal uppercase tracking-wider text-[#1d2327]">
              Contact Officiel &amp; Support Technique MCI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#2271b1] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#1d2327]">Siège &amp; Adresse</p>
                <p className="text-xs text-[#50575e] font-normal mt-0.5">{address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#2271b1] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#1d2327]">Téléphone &amp; Support</p>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-xs text-[#2271b1] font-normal hover:underline block mt-0.5">
                  {phone}
                </a>
                {emergencyPhone && (
                  <span className="text-[11px] text-emerald-700 font-normal block mt-0.5">
                    Astreinte : {emergencyPhone}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#2271b1] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#1d2327]">Email Direct</p>
                <a href={`mailto:${email}`} className="text-xs text-[#2271b1] font-normal hover:underline block mt-0.5">
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-[#2271b1] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#1d2327]">Horaires d'ouverture</p>
                <p className="text-xs text-[#50575e] font-normal mt-0.5">{openingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
