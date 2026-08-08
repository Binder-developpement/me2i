'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      {/* Skip link target */}
      <main id="contenu" className="flex-1 pt-20" tabIndex={-1}>
        {children}
      </main>
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-bleu-marianne text-white shadow-lg transition-all duration-300 hover:bg-bleu-marianne-clair focus:outline-none focus:ring-2 focus:ring-bleu-marianne focus:ring-offset-2 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
        aria-label="Retour en haut de page"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
