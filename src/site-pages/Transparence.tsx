'use client'

import { FileText, PieChart, Users, Download, TrendingUp, Gavel, CalendarClock } from 'lucide-react'

const budgetItems = [
  { label: 'Education & Jeunesse', percent: 28, percentPrev: 26, color: '#7B3FA0' },
  { label: 'Services Generaux', percent: 22, percentPrev: 23, color: '#1E7FC3' },
  { label: 'Culture & Sport', percent: 18, percentPrev: 17, color: '#D16B0A' },
  { label: 'Environnement', percent: 16, percentPrev: 14, color: '#27A658' },
  { label: 'Social & Sante', percent: 16, percentPrev: 20, color: '#1E3A5F' },
]

const documents = [
  { title: 'Budget primitif 2025', type: 'PDF - 3.2 Mo' },
  { title: 'Compte-rendu Conseil municipal - Juin 2025', type: 'PDF - 1.1 Mo' },
  { title: 'Marches publics en cours', type: 'PDF - 850 Ko' },
  { title: 'Rapport annuel 2024', type: 'PDF - 5.4 Mo' },
]

const councilHistory = [
  { date: '10 juin 2025', title: 'Vote du budget supplementaire 2025' },
  { date: '15 mai 2025', title: 'Adoption du plan de mobilite douce' },
  { date: '20 avril 2025', title: 'Approbation de la convention culturelle 2025-2027' },
  { date: '18 mars 2025', title: 'Debat d\'orientation budgetaire 2025' },
]

const ongoingContracts = [
  { title: 'Renovation energetique de 5 ecoles', budget: '2,4 M€', deadline: 'Cloture le 15 aout 2025' },
  { title: 'Extension du reseau de pistes cyclables', budget: '850 K€', deadline: 'Cloture le 30 juillet 2025' },
  { title: 'Renouvellement du parc de vehicules municipaux', budget: '620 K€', deadline: 'Cloture le 10 septembre 2025' },
]

export default function Transparence() {
  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      <section className="bg-bleu-marianne py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            Transparence & Open Data
          </h1>
          <p className="text-white/80 max-w-[560px]">
            Budget, marches publics et decisions municipales en toute transparence.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Budget */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <PieChart size={22} className="text-bleu-marianne" />
              <h2 className="text-2xl font-bold text-gris-fonce font-heading">Budget municipal 2025</h2>
            </div>
            <div className="space-y-4">
              {budgetItems.map((item) => {
                const diff = item.percent - item.percentPrev
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gris-fonce font-medium">{item.label}</span>
                      <span className="text-gris-moyen flex items-center gap-1">
                        {item.percent}%
                        <span className={diff >= 0 ? 'text-vert-succes' : 'text-red-600'}>
                          ({diff >= 0 ? '+' : ''}{diff}pt vs 2024)
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-sm text-gris-moyen mt-6">Budget total : 142 M€ pour l'exercice 2025 (136 M€ en 2024).</p>
          </div>

          {/* Organigramme */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Users size={22} className="text-bleu-marianne" />
              <h2 className="text-2xl font-bold text-gris-fonce font-heading">Organigramme des services</h2>
            </div>
            <div className="space-y-3">
              {['Cabinet du Maire', 'Direction Generale des Services', 'Ressources Humaines', 'Urbanisme & Amenagement', 'Affaires Sociales', 'Finances & Budget'].map((service) => (
                <div key={service} className="p-4 bg-gray-50 rounded-lg text-sm font-medium text-gris-fonce">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Council history + Contracts */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CalendarClock size={22} className="text-bleu-marianne" />
              <h2 className="text-2xl font-bold text-gris-fonce font-heading">Derniers conseils municipaux</h2>
            </div>
            <div className="space-y-3">
              {councilHistory.map((c) => (
                <div key={c.title} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-xs font-semibold text-bleu-marianne shrink-0 w-24">{c.date}</span>
                  <p className="text-sm text-gris-fonce">{c.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Gavel size={22} className="text-bleu-marianne" />
              <h2 className="text-2xl font-bold text-gris-fonce font-heading">Marches publics en cours</h2>
            </div>
            <div className="space-y-3">
              {ongoingContracts.map((c) => (
                <div key={c.title} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-gris-fonce text-sm mb-1">{c.title}</p>
                  <div className="flex items-center justify-between text-xs text-gris-moyen">
                    <span className="flex items-center gap-1"><TrendingUp size={12} />{c.budget}</span>
                    <span>{c.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-6">
            <FileText size={22} className="text-bleu-marianne" />
            <h2 className="text-2xl font-bold text-gris-fonce font-heading">Documents publics</h2>
          </div>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between gap-4 p-5 border border-gray-200 rounded-xl hover:border-bleu-marianne transition-colors duration-200"
              >
                <div>
                  <p className="font-semibold text-gris-fonce">{doc.title}</p>
                  <p className="text-sm text-gris-moyen">{doc.type}</p>
                </div>
                <button className="flex items-center gap-2 text-bleu-marianne font-medium text-sm shrink-0">
                  <Download size={16} />
                  Telecharger
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
