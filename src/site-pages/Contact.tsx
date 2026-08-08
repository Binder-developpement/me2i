'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, HelpCircle, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const services = [
  { name: 'Standard general', phone: '01 23 45 67 89', hours: 'Lun-Ven 8h30-17h30' },
  { name: 'Etat civil', phone: '01 23 45 67 90', hours: 'Lun-Ven 8h30-16h30' },
  { name: 'Urbanisme', phone: '01 23 45 67 91', hours: 'Lun-Ven 9h-12h, 14h-17h' },
  { name: 'CCAS - Action sociale', phone: '01 23 45 67 92', hours: 'Lun-Ven 8h30-17h, sans rdv le mardi' },
]

const faqs = [
  { q: 'Comment prendre rendez-vous a la mairie ?', a: 'Vous pouvez prendre rendez-vous en ligne via l\'espace demarches ou par telephone aupres du service concerne.' },
  { q: 'Puis-je venir sans rendez-vous ?', a: 'Certains services, comme le CCAS, accueillent sans rendez-vous a des creneaux dedies (voir annuaire ci-contre).' },
  { q: 'Quel est le delai de reponse a un message ?', a: 'Nous nous engageons a repondre sous 5 jours ouvres a toute demande via le formulaire de contact.' },
  { q: 'Ou trouver les mairies annexes ?', a: 'La ville dispose de 3 mairies de quartier, dont les coordonnees sont disponibles sur la page Demarches.' },
]

const socials = [
  { icon: Facebook, label: 'Facebook' },
  { icon: Twitter, label: 'X / Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-20 min-h-[100dvh] bg-white">
      <section className="bg-bleu-marianne py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            Contactez-nous
          </h1>
          <p className="text-white/80 max-w-[560px]">
            Une question, une demarche ? Notre equipe est a votre disposition.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-6">Formulaire de contact</h2>
            {sent ? (
              <div className="p-6 bg-green-50 text-green-700 rounded-xl">
                Votre message a bien ete envoye. Nous vous repondrons dans les meilleurs delais.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-bleu-marianne"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-bleu-marianne"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Objet"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:border-bleu-marianne"
                />
                <textarea
                  placeholder="Votre message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-bleu-marianne resize-none"
                />
                <button
                  type="submit"
                  className="h-12 px-8 bg-bleu-marianne text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  Envoyer le message
                </button>
              </form>
            )}

            {/* Map placeholder */}
            <div className="mt-10 aspect-[16/9] rounded-xl bg-gris-tres-clair flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-bleu-marianne mx-auto mb-2" />
                <p className="text-sm text-gris-moyen">Place de l'Hotel de Ville, 42000 Saint-Etienne</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gris-fonce font-heading mb-6 flex items-center gap-2">
                <HelpCircle size={22} className="text-bleu-marianne" />
                Questions frequentes
              </h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.q} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gris-fonce text-sm mb-1">{faq.q}</p>
                    <p className="text-sm text-gris-moyen">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3 mb-4">
                <MapPin size={20} className="text-bleu-marianne mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gris-fonce">Hotel de Ville</p>
                  <p className="text-sm text-gris-moyen">Place de l'Hotel de Ville, 42000 Saint-Etienne</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <Clock size={20} className="text-bleu-marianne mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gris-fonce">Horaires</p>
                  <p className="text-sm text-gris-moyen">Lun-Ven : 8h30 - 17h30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-bleu-marianne mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-gris-fonce">Email</p>
                  <p className="text-sm text-gris-moyen">contact@saint-etienne.fr</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gris-fonce mb-3 flex items-center gap-2">
                <Phone size={18} className="text-bleu-marianne" />
                Annuaire des services
              </h3>
              <div className="space-y-2">
                {services.map((service) => (
                  <div key={service.name} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gris-fonce font-medium">{service.name}</span>
                      <span className="text-gris-moyen">{service.phone}</span>
                    </div>
                    <p className="text-xs text-gris-moyen mt-1">{service.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gris-fonce mb-3">Suivez-nous</h3>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-bleu-marianne hover:bg-bleu-marianne hover:text-white transition-colors duration-200"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
