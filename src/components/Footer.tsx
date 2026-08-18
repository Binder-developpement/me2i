'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/src/lib/router-compat'
import { Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'

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
  { label: 'Nos réalisations', path: '/realisations' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Mentions légales', path: '/a-propos' },
]

export default function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({
    company_name: 'MCI',
    tagline: 'Maintenance & Construction Industrielle',
    email: 'contact@me2i.cm',
    phone: '+237 699 00 00 00',
    emergency_phone: '+237 677 00 00 00',
    address: 'Douala / Yaoundé, Cameroun',
    linkedin_url: '',
    facebook_url: '',
  })

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createClientSupabase()
        const { data } = await supabase.from('company_settings').select('*')
        if (data && data.length > 0) {
          const map: Record<string, string> = {}
          data.forEach((item: any) => {
            if (item.key && item.value) map[item.key] = item.value
          })
          setSettings((prev) => ({ ...prev, ...map }))
        }
      } catch (err) {
        console.error('Error fetching settings for footer:', err)
      }
    }
    loadSettings()
  }, [])

  const companyName = settings.company_name || 'MCI'
  const tagline = settings.tagline || 'Maintenance & Construction Industrielle'
  const address = settings.address || 'Douala / Yaoundé, Cameroun'
  const email = settings.email || 'contact@me2i.cm'
  const phone = settings.phone || '+237 699 00 00 00'
  const emergencyPhone = settings.emergency_phone || ''
  const linkedinUrl = settings.linkedin_url || ''
  const facebookUrl = settings.facebook_url || ''

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
              <p className="text-2xl font-bold tracking-tight uppercase">{companyName}</p>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed font-normal">
                {tagline}
              </p>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
              Votre partenaire de confiance au Cameroun et en Afrique centrale pour la fourniture, l'installation et la maintenance d'équipements industriels et de centrales électriques.
            </p>
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
                    className="text-xs text-white/70 hover:text-white transition-colors duration-200 font-normal"
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
                    className="text-xs text-white/70 hover:text-white transition-colors duration-200 font-normal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Replaces old Disponibilité section) */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-5">
              Contact &amp; Assistance
            </h3>
            <address className="not-italic text-xs text-white/70 leading-relaxed space-y-3 font-normal mb-6">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/60" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-white/60" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors underline">
                  {phone}
                </a>
              </p>
              {emergencyPhone && (
                <p className="flex items-center gap-2.5 text-emerald-400">
                  <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Astreinte : {emergencyPhone}</span>
                </p>
              )}
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-white/60" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors underline">
                  {email}
                </a>
              </p>
            </address>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-normal text-white transition-colors rounded-none"
            >
              <span>Demander un devis</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom bar with Social Networks placed LOWER down */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50 font-normal">
            &copy; {new Date().getFullYear()} {companyName} - {tagline}. Tous droits réservés.
          </p>

          {/* Social Links dynamically populated from admin database */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 font-normal mr-1">Suivez-nous :</span>
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center border border-white/20 rounded-sm text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            ) : (
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center border border-white/20 rounded-sm text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}

            {facebookUrl ? (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center border border-white/20 rounded-sm text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            ) : (
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center border border-white/20 rounded-sm text-white/70 hover:bg-white/15 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/a-propos" className="text-xs text-white/50 hover:text-white transition-colors font-normal">
              Mentions légales
            </Link>
            <Link to="/a-propos" className="text-xs text-white/50 hover:text-white transition-colors font-normal">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
