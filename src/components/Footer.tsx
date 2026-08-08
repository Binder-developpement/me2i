'use client'

import { Link } from '@/src/lib/router-compat'
import { Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react'

const expertiseLinks = [
  { label: 'Groupes électrogènes', path: '/services' },
  { label: 'Installation électrique', path: '/services' },
  { label: 'Maintenance industrielle', path: '/services' },
  { label: 'Automatisme industriel', path: '/services' },
  { label: 'Systèmes solaires photovoltaïques', path: '/services' },
  { label: 'Hybridation énergétique', path: '/services' },
]

const companyLinks = [
  { label: 'Qui sommes-nous', path: '/a-propos' },
  { label: 'Nos réalisations', path: '/services' },
  { label: 'Actualités', path: '/actualites' },
  { label: 'Contact', path: '/contact' },
  { label: 'Mentions légales', path: '/a-propos' },
]

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-bleu-marianne text-white" role="contentinfo">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 pt-16 pb-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Company info */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-1">
                Entreprise
              </p>
              <p className="text-xl font-bold tracking-tight">ME2I</p>
              <p className="text-sm text-white/70 mt-1 leading-snug">
                Maintenance Industrielle &amp; Énergie sans Interruption
              </p>
            </div>

            <address className="not-italic text-sm text-white/70 leading-relaxed space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/50" />
                Cameroun — Afrique centrale
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white/50" />
                <a href="tel:+237000000000" className="hover:text-white transition-colors underline">
                  +237 000 000 000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-white/50" />
                <a href="mailto:contact@me2i.cm" className="hover:text-white transition-colors underline">
                  contact@me2i.cm
                </a>
              </p>
            </address>

            {/* Social links */}
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Expertise */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-5">
              Nos expertises
            </h3>
            <ul className="space-y-2.5">
              {expertiseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-5">
              L'entreprise
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-5">
              Besoin d&apos;une intervention ?
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Nos techniciens sont disponibles pour répondre à vos besoins en maintenance industrielle et en solutions énergétiques.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/40 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Nous contacter
            </Link>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/50 mb-1">Disponibilité</p>
              <p className="text-sm text-white/70">Lundi – Vendredi : 7h30 – 18h00</p>
              <p className="text-sm text-white/70">Astreinte 24h/24 – 7j/7</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} ME2I — Maintenance Industrielle &amp; Énergie sans Interruption. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/a-propos" className="text-xs text-white/40 hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link to="/a-propos" className="text-xs text-white/40 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
