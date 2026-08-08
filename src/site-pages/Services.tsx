'use client'

import { useState, useMemo } from 'react'
import { Link } from '@/src/lib/router-compat'
import { Search, Users, Briefcase, Heart, BookOpen, Home as HomeIcon, Leaf, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react'

const services = [
  {
    icon: Users,
    title: 'Famille & Citoyennete',
    description: 'Carte d\'identite, passeport, etat civil, recensement, elections...',
    color: '#1E7FC3',
    items: ['Demande de carte d\'identite', 'Passeport', 'Acte de naissance / mariage / deces', 'Recensement citoyen', 'Inscription sur les listes electorales'],
  },
  {
    icon: Briefcase,
    title: 'Emploi & Formation',
    description: 'Offres d\'emploi, formation professionnelle, accompagnement...',
    color: '#1E3A5F',
    items: ['Offres d\'emploi municipales', 'Formation professionnelle', 'Accompagnement vers l\'emploi', 'Insertion des jeunes', 'Aide a la creation d\'entreprise'],
  },
  {
    icon: Heart,
    title: 'Sante & Solidarite',
    description: 'Aides sociales, CCAS, handicap, personnes agees...',
    color: '#D16B0A',
    items: ['Centre Communal d\'Action Sociale', 'Aides financieres d\'urgence', 'Accompagnement handicap', 'Services aux personnes agees', 'Acces aux soins'],
  },
  {
    icon: BookOpen,
    title: 'Education & Jeunesse',
    description: 'Ecoles, colleges, lycees, cantines, transports scolaires...',
    color: '#7B3FA0',
    items: ['Inscription scolaire', 'Cantines et restauration', 'Transports scolaires', 'Activites periscolaires', 'Aides aux devoirs'],
  },
  {
    icon: HomeIcon,
    title: 'Logement & Urbanisme',
    description: 'Permis de construire, PLU, logement social, habitat...',
    color: '#D16B0A',
    items: ['Permis de construire', 'Plan Local d\'Urbanisme (PLU)', 'Demande de logement social', 'Aide a la renovation', 'Certificat d\'urbanisme'],
  },
  {
    icon: Leaf,
    title: 'Environnement & Proprete',
    description: 'Dechets, espaces verts, energie, assainissement...',
    color: '#27A658',
    items: ['Collecte des dechets', 'Encombrants', 'Espaces verts', 'Assainissement', 'Aides a la renovation energetique'],
  },
]

const topServices = [
  'Demande de carte d\'identite',
  'Inscription scolaire',
  'Collecte des dechets',
  'Permis de construire',
]

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalItems = useMemo(() => services.reduce((sum, s) => sum + s.items.length, 0), [])

  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      {/* Header / Hero */}
      <section className="bg-bleu-marianne py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
              Tous nos services
            </h1>
            <p className="text-white/80 max-w-[560px] mb-8">
              Retrouvez l'ensemble des {totalItems} services municipaux classes en {services.length} categories, accessibles en ligne 24h/24.
            </p>
            <div className="max-w-[520px]">
              <div className="flex items-center bg-white rounded-lg overflow-hidden">
                <Search size={20} className="text-gray-400 ml-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 px-3 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Status illustration */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
              <div className="relative z-10 text-center p-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-medium text-white">Service en ligne</h3>
                <p className="mt-2 text-sm text-white/70">Disponible 7j/7, suivi en temps reel</p>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-vert-succes shrink-0" />
                    <span className="text-sm text-gris-fonce">Demande soumise</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <div className="h-4 w-4 rounded-full border-2 border-bleu-marianne border-t-transparent animate-spin shrink-0" />
                    <span className="text-sm text-gris-fonce">Traitement en cours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most consulted */}
      <section className="py-12 bg-gris-tres-clair border-b border-gray-200">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-bleu-marianne" />
            <h2 className="text-xl font-bold text-gris-fonce font-heading">Services les plus consultes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topServices.map((service) => (
              <Link
                key={service}
                to="/demarches"
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-bleu-marianne transition-colors duration-200 text-sm text-gris-fonce font-medium"
              >
                <span>{service}</span>
                <ArrowRight size={16} className="text-bleu-marianne shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 space-y-10">
          {filteredServices.map((service) => (
            <div key={service.title} className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${service.color}1A` }}
                >
                  <service.icon size={26} style={{ color: service.color }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gris-fonce font-heading">{service.title}</h2>
                  <p className="text-gris-moyen">{service.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.items.map((item) => (
                  <Link
                    key={item}
                    to="/demarches"
                    className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gris-fonce"
                  >
                    <span>{item}</span>
                    <ArrowRight size={16} className="text-gray-400 shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bleu-marianne">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-4">
            Pret a effectuer une demarche ?
          </h2>
          <p className="text-white/80 max-w-[560px] mx-auto mb-8">
            Accedez directement au formulaire correspondant a votre besoin.
          </p>
          <Link
            to="/demarches"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-bleu-marianne transition-all hover:bg-gray-100"
          >
            Voir toutes les demarches
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
