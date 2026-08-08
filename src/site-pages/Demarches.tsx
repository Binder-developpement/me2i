'use client'

import { useState } from 'react'
import { Link } from '@/src/lib/router-compat'
import { Search, FileText, Monitor, Building2, CheckCircle, Clock, TrendingUp } from 'lucide-react'

const demarches = [
  { title: 'Demande de carte d\'identite', theme: 'Etat civil', online: true, delay: '3 semaines' },
  { title: 'Demande de passeport', theme: 'Etat civil', online: true, delay: '3 semaines' },
  { title: 'Acte de naissance', theme: 'Etat civil', online: true, delay: '48 heures' },
  { title: 'Acte de mariage', theme: 'Etat civil', online: true, delay: '48 heures' },
  { title: 'Declaration de deces', theme: 'Etat civil', online: false, delay: 'Immediat' },
  { title: 'Recensement citoyen (16 ans)', theme: 'Citoyennete', online: true, delay: 'Immediat' },
  { title: 'Inscription sur les listes electorales', theme: 'Citoyennete', online: true, delay: '1 semaine' },
  { title: 'Permis de construire', theme: 'Urbanisme', online: false, delay: '2 mois' },
  { title: 'Certificat d\'urbanisme', theme: 'Urbanisme', online: true, delay: '1 mois' },
  { title: 'Declaration prealable de travaux', theme: 'Urbanisme', online: false, delay: '1 mois' },
  { title: 'Inscription scolaire', theme: 'Education', online: true, delay: '2 semaines' },
  { title: 'Demande de logement social', theme: 'Logement', online: true, delay: '3 mois' },
  { title: 'Carte grise / immatriculation', theme: 'Transport', online: true, delay: '1 semaine' },
  { title: 'Demande d\'aide sociale (CCAS)', theme: 'Social', online: false, delay: '2 semaines' },
]

const themeDescriptions: Record<string, string> = {
  'Etat civil': 'Actes officiels de naissance, mariage, deces et pieces d\'identite.',
  'Citoyennete': 'Participation a la vie democratique et obligations citoyennes.',
  'Urbanisme': 'Autorisations de construction, renovation et amenagement.',
  'Education': 'Inscriptions scolaires et services aux familles.',
  'Logement': 'Demandes de logement social et aides a l\'habitat.',
  'Transport': 'Immatriculation et services lies aux vehicules.',
  'Social': 'Aides et accompagnement social aupres du CCAS.',
}

const themes = ['Tous', 'Etat civil', 'Citoyennete', 'Urbanisme', 'Education', 'Logement', 'Transport', 'Social']

const popularDemarches = demarches.slice(0, 4)

export default function Demarches() {
  const [activeTheme, setActiveTheme] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = demarches.filter((d) => {
    const matchesTheme = activeTheme === 'Tous' || d.theme === activeTheme
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTheme && matchesSearch
  })

  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      {/* Header / Hero */}
      <section className="bg-bleu-marianne py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
              Demarches administratives
            </h1>
            <p className="text-white/80 max-w-[560px] mb-8">
              Recherchez parmi {demarches.length} demarches proposees par la mairie, effectuez-les en ligne 24h/24.
            </p>
            <div className="max-w-[520px]">
              <div className="flex items-center bg-white rounded-lg overflow-hidden">
                <Search size={20} className="text-gray-400 ml-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher une demarche..."
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
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading text-lg font-medium text-white">Espace Demarches</h3>
                <p className="mt-2 text-sm text-white/70">Vos formulaires et suivis en un seul endroit</p>
                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-vert-succes shrink-0" />
                    <span className="text-sm text-gris-fonce">Formulaire soumis</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <div className="h-4 w-4 rounded-full border-2 border-bleu-marianne border-t-transparent animate-spin shrink-0" />
                    <span className="text-sm text-gris-fonce">En cours de traitement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular demarches */}
      <section className="py-12 bg-gris-tres-clair border-b border-gray-200">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-bleu-marianne" />
            <h2 className="text-xl font-bold text-gris-fonce font-heading">Demarches populaires</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDemarches.map((d) => (
              <div key={d.title} className="p-4 bg-white border border-gray-200 rounded-lg">
                <p className="font-semibold text-gris-fonce text-sm mb-1">{d.title}</p>
                <p className="text-xs text-gris-moyen flex items-center gap-1">
                  <Clock size={12} />
                  Delai : {d.delay}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes + list */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 mb-4">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeTheme === theme
                    ? 'bg-bleu-marianne text-white'
                    : 'bg-gray-100 text-gris-fonce hover:bg-gray-200'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>

          {activeTheme !== 'Tous' && (
            <p className="text-sm text-gris-moyen mb-10 max-w-[640px]">{themeDescriptions[activeTheme]}</p>
          )}
          {activeTheme === 'Tous' && <div className="mb-6" />}

          <div className="space-y-3">
            {filtered.map((demarche) => (
              <div
                key={demarche.title}
                className="flex items-center justify-between gap-4 p-5 border border-gray-200 rounded-xl hover:border-bleu-marianne transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <FileText size={20} className="text-bleu-marianne shrink-0" />
                  <div>
                    <p className="font-semibold text-gris-fonce">{demarche.title}</p>
                    <p className="text-sm text-gris-moyen">{demarche.theme} &middot; Delai : {demarche.delay}</p>
                  </div>
                </div>
                <span
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shrink-0 ${
                    demarche.online ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                  }`}
                >
                  {demarche.online ? <Monitor size={14} /> : <Building2 size={14} />}
                  {demarche.online ? 'En ligne' : 'En mairie'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bleu-marianne">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-4">
            Besoin d'aide pour une demarche ?
          </h2>
          <p className="text-white/80 max-w-[560px] mx-auto mb-8">
            Notre equipe est disponible pour vous accompagner dans vos formalites.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-bleu-marianne transition-all hover:bg-gray-100"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
