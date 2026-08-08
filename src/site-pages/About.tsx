'use client'

const stats = [
  { value: '174 000', label: 'Habitants' },
  { value: '79,97', label: 'km² de superficie' },
  { value: '55', label: 'Elus municipaux' },
  { value: '3 200', label: 'Agents municipaux' },
]

const elus = [
  { name: 'Marie Dubosc', role: 'Maire' },
  { name: 'Antoine Leforestier', role: '1er Adjoint - Finances' },
  { name: 'Claire Beaumont', role: 'Adjointe - Education' },
  { name: 'Karim Belhadj', role: 'Adjoint - Urbanisme' },
]

const historyTimeline = [
  { period: 'XIe siecle', event: 'Premieres mentions de Saint-Etienne comme bourg autour de l\'exploitation miniere.' },
  { period: 'XIXe siecle', event: 'Essor industriel majeur : houille, textile et armement font la renommee de la ville.' },
  { period: '1970-1990', event: 'Reconversion industrielle et diversification economique apres le declin minier.' },
  { period: '2010', event: 'Obtention du label UNESCO Ville de Design, premiere ville francaise distinguee.' },
  { period: 'Aujourd\'hui', event: 'Ville en transformation continue, misant sur l\'innovation, la culture et la qualite de vie.' },
]

const twinCities = [
  { city: 'Wolverhampton', country: 'Royaume-Uni', since: '1957' },
  { city: 'Katowice', country: 'Pologne', since: '1964' },
  { city: 'Oyonnax', country: 'France', since: '1970' },
  { city: 'Chemnitz', country: 'Allemagne', since: '1985' },
]

const values = [
  { title: 'Solidarite', desc: 'Un accompagnement social fort pour tous les habitants, quel que soit leur parcours.' },
  { title: 'Innovation', desc: 'Une ville pionniere en matiere de design et de reconversion urbaine.' },
  { title: 'Durabilite', desc: 'Un engagement fort dans la transition ecologique et energetique.' },
  { title: 'Proximite', desc: 'Des services publics accessibles a tous, au plus pres des quartiers.' },
]

export default function About() {
  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      <section className="bg-bleu-marianne py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            A propos de la ville
          </h1>
          <p className="text-white/80 max-w-[640px]">
            m2i - Ville de Saint-Etienne, prefecture de la Loire, au coeur
            de la region Auvergne-Rhone-Alpes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          {/* Mot du maire */}
          <div className="max-w-[720px] mb-16">
            <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-4">Le mot du maire</h2>
            <p className="text-gris-moyen leading-relaxed mb-4">
              "Saint-Etienne est une ville de reinvention permanente. De son passe industriel a
              son statut de capitale du design, notre ville n'a jamais cesse de se transformer
              pour offrir a ses habitants un cadre de vie toujours plus agreable, solidaire et
              durable."
            </p>
            <p className="text-gris-fonce font-semibold">Marie Dubosc, Maire de Saint-Etienne</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 py-10 border-y border-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-bleu-marianne font-heading mb-1">{stat.value}</p>
                <p className="text-sm text-gris-moyen">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Histoire - Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-8">Notre histoire</h2>
            <div className="space-y-6 max-w-[720px]">
              {historyTimeline.map((item) => (
                <div key={item.period} className="flex gap-6 items-start">
                  <span className="text-sm font-bold text-bleu-marianne shrink-0 w-28">{item.period}</span>
                  <p className="text-sm text-gris-moyen pt-0.5 border-l border-gray-200 pl-6">{item.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-8">Nos valeurs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="p-6 bg-gris-tres-clair rounded-xl">
                  <h3 className="font-semibold text-gris-fonce mb-2">{value.title}</h3>
                  <p className="text-sm text-gris-moyen">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Elus */}
          <div>
            <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-8">L'equipe municipale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {elus.map((elu) => (
                <div key={elu.name} className="p-6 border border-gray-200 rounded-xl text-center">
                  <div className="w-16 h-16 rounded-full bg-bleu-marianne/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-bleu-marianne font-bold text-lg">
                      {elu.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <p className="font-semibold text-gris-fonce">{elu.name}</p>
                  <p className="text-sm text-gris-moyen">{elu.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Jumelages */}
          <div>
            <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-8">Villes jumelees</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {twinCities.map((tc) => (
                <div key={tc.city} className="p-6 border border-gray-200 rounded-xl text-center">
                  <p className="font-semibold text-gris-fonce">{tc.city}</p>
                  <p className="text-sm text-gris-moyen">{tc.country}</p>
                  <p className="text-xs text-bleu-marianne mt-1">Depuis {tc.since}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
