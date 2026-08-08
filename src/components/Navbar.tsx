'use client'

import { useState, useEffect } from 'react'
import { Link, useLocation } from '@/src/lib/router-compat'
import { Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Produits', path: '/demarches' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Skip link */}
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>

      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
        style={{
          boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
          height: 80,
        }}
        role="banner"
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Accueil - Ville de Saint-Etienne">
            <div className="flex flex-col">
              <span className="text-[21px] font-semibold uppercase tracking-wider text-bleu-marianne leading-tight">
                ME2I
              </span>
              <span className="text-[13px] font-medium text-gris-fonce leading-tight mt-0.5">
                L'industrie du futur en action
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-sm font-medium text-gris-fonce transition-colors duration-200 hover:text-bleu-marianne py-1"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bleu-marianne"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side: Search + Login */}
          <div className="hidden lg:flex items-center gap-4">
            <div
              className="flex items-center rounded border border-gris-clair bg-white transition-all duration-300"
              style={{ width: searchFocused ? 400 : 280 }}
            >
              <Search className="ml-3 h-4 w-4 text-gris-moyen shrink-0" aria-hidden="true" />
              <input
                type="search"
                placeholder="Rechercher un service, une demarche..."
                className="h-10 w-full bg-transparent px-3 text-sm text-gris-fonce placeholder:text-gris-moyen focus:outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                aria-label="Rechercher"
              />
            </div>
            <Link
              to="/contact"
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-bleu-marianne-clair"
            >
              A propos
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-gris-fonce hover:bg-gris-tres-clair transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 z-[90] bg-slate-900/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Slide-out drawer */}
            <motion.div
              id="mobile-menu"
              className="fixed top-0 right-0 bottom-0 z-[100] w-80 max-w-[85vw] bg-white h-full shadow-2xl border-l border-slate-100"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            >
              <div className="flex h-full flex-col px-6 py-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-10 h-10 rounded-md text-slate-900 hover:bg-slate-100 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="mt-12 flex flex-col gap-6" aria-label="Navigation mobile">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium text-slate-800 hover:text-bleu-marianne transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <p className="text-slate-400 text-sm">
                    m2i
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
