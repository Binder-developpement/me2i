'use client'

import { Bike, Leaf, Palette, TrendingUp, Download } from 'lucide-react'

const axes = [
  {
    icon: Bike,
    title: 'Mobilite Durable',
    color: '#1E7FC3',
    description: 'Developpement des pistes cyclables, extension du reseau de transports en commun, zones a faibles emissions.',
    stats: [{ label: 'km de pistes cyclables', value: '85' }, { label: 'stations velos en libre-service', value: '40' }],
    timeline: [
      { year: '2023', event: 'Lancement du plan velo, 25 km de pistes creees.' },
      { year: '2024', event: 'Ouverture de 20 stations velos en libre-service.' },
      { year: '2025', event: 'Extension a 85 km de pistes cyclables securisees.' },
    ],
    documents: ['Plan de mobilite 2023-2028', 'Bilan carbone des transports 2024'],
  },
  {
    icon: Leaf,
    title: 'Transition Ecologique',
    color: '#27A658',
    description: 'Renovation energetique des batiments publics, vegetalisation urbaine, gestion durable des dechets.',
    stats: [{ label: 'batiments renoves', value: '32' }, { label: 'arbres plantes depuis 2023', value: '2 400' }],
    timeline: [
      { year: '2023', event: 'Diagnostic energetique de 60 batiments municipaux.' },
      { year: '2024', event: 'Renovation de 18 ecoles et batiments publics.' },
      { year: '2025', event: 'Plantation de 2 400 arbres, objectif 5 000 en 2027.' },
    ],
    documents: ['Plan climat-air-energie territorial', 'Rapport developpement durable 2024'],
  },
  {
    icon: Palette,
    title: 'Culture & Patrimoine',
    color: '#7B3FA0',
    description: 'Soutien aux associations culturelles, renovation du patrimoine historique, programmation evenementielle.',
    stats: [{ label: 'evenements culturels par an', value: '120' }, { label: 'associations soutenues', value: '65' }],
    timeline: [
      { year: '2023', event: 'Renovation de la facade de l\'Hotel de Ville.' },
      { year: '2024', event: 'Creation du Pass Culture municipal pour les jeunes.' },
      { year: '2025', event: '120 evenements culturels organises, frequentation en hausse de 18%.' },
    ],
    documents: ['Schema directeur culturel 2023-2026'],
  },
  {
    icon: TrendingUp,
    title: 'Developpement Economique',
    color: '#D16B0A',
    description: 'Soutien aux commerces de proximite, attractivite territoriale, accompagnement des entrepreneurs locaux.',
    stats: [{ label: 'entreprises accompagnees', value: '210' }, { label: 'emplois crees en 2024', value: '540' }],
    timeline: [
      { year: '2023', event: 'Lancement du fonds de soutien aux commerces de proximite.' },
      { year: '2024', event: 'Ouverture de la pepiniere d\'entreprises municipale.' },
      { year: '2025', event: '210 entreprises accompagnees, 540 emplois crees.' },
    ],
    documents: ['Strategie de developpement economique 2023-2027'],
  },
]

export default function PolitiquesPubliques() {
  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      <section className="bg-bleu-marianne py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            Nos politiques publiques
          </h1>
          <p className="text-white/80 max-w-[560px]">
            Les grands axes d'action de la municipalite pour transformer durablement notre ville.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 space-y-10">
          {axes.map((axe) => (
            <div key={axe.title} className="border border-gray-200 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${axe.color}1A` }}
                >
                  <axe.icon size={26} style={{ color: axe.color }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gris-fonce font-heading">{axe.title}</h2>
                  <p className="text-gris-moyen">{axe.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-6 mb-6 border-b border-gray-100">
                {axe.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold font-heading" style={{ color: axe.color }}>{stat.value}</p>
                    <p className="text-xs text-gris-moyen">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gris-fonce mb-4">Realisations</h3>
                <div className="space-y-3">
                  {axe.timeline.map((item) => (
                    <div key={item.year} className="flex gap-4 items-start">
                      <span className="text-sm font-bold shrink-0 w-12" style={{ color: axe.color }}>{item.year}</span>
                      <p className="text-sm text-gris-moyen">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-sm font-semibold text-gris-fonce mb-3">Documents</h3>
                <div className="flex flex-wrap gap-3">
                  {axe.documents.map((doc) => (
                    <button
                      key={doc}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gris-fonce"
                    >
                      <Download size={14} className="text-gris-moyen" />
                      {doc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
