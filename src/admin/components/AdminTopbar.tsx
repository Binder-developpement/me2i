'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { ExternalLink, Plus, LogOut, Home } from 'lucide-react'

export default function AdminTopbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter()
  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClientSupabase()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-10 bg-gradient-to-r from-[#0b1320] via-[#111e33] to-[#1a2d4b] border-b border-[#1e3a5f]/40 text-white flex items-center justify-between px-3 select-none text-xs font-normal shadow-sm">
      {/* Left side actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Ouvrir le site public"
        >
          <Home className="h-3.5 w-3.5 text-[#72aee6]" />
          <span className="font-normal text-xs hidden sm:inline">Aller sur le site</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </Link>

        {/* Quick create menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors text-xs font-normal"
          >
            <Plus className="h-3.5 w-3.5 text-[#72aee6]" />
            <span>Créer</span>
          </button>

          {showCreateMenu && (
            <div
              className="absolute left-0 mt-1 w-44 bg-[#0d1624] border border-[#1e3a5f]/60 rounded-sm shadow-xl py-1 z-50"
              onMouseLeave={() => setShowCreateMenu(false)}
            >
              <Link
                href="/admin/articles/nouveau"
                className="block px-3 py-1.5 text-xs text-white/80 hover:bg-[#2271b1] hover:text-white font-normal"
                onClick={() => setShowCreateMenu(false)}
              >
                Article
              </Link>
              <Link
                href="/admin/services/nouveau"
                className="block px-3 py-1.5 text-xs text-white/80 hover:bg-[#2271b1] hover:text-white font-normal"
                onClick={() => setShowCreateMenu(false)}
              >
                Service
              </Link>
              <Link
                href="/admin/produits/nouveau"
                className="block px-3 py-1.5 text-xs text-white/80 hover:bg-[#2271b1] hover:text-white font-normal"
                onClick={() => setShowCreateMenu(false)}
              >
                Produit
              </Link>
              <Link
                href="/admin/realisations/nouveau"
                className="block px-3 py-1.5 text-xs text-white/80 hover:bg-[#2271b1] hover:text-white font-normal"
                onClick={() => setShowCreateMenu(false)}
              >
                Réalisation
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right side profile */}
      <div className="flex items-center gap-3">
        {/* User profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <div className="h-5 w-5 rounded-full bg-[#2271b1] flex items-center justify-center text-white text-[10px] font-bold">
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="text-xs font-normal max-w-[140px] truncate hidden md:inline">
              {userEmail || 'Admin'}
            </span>
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-1 w-48 bg-[#0d1624] border border-[#1e3a5f]/60 rounded-sm shadow-xl py-1 z-50"
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div className="px-3 py-2 border-b border-[#1e3a5f]/40">
                <p className="text-[11px] text-white/60">Connecté en tant que</p>
                <p className="text-xs text-white font-normal truncate mt-0.5">{userEmail || 'Admin'}</p>
              </div>

              <Link
                href="/admin/parametres"
                className="block px-3 py-2 text-xs text-white/80 hover:bg-[#2271b1] hover:text-white font-normal"
                onClick={() => setShowUserMenu(false)}
              >
                Paramètres du site
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-950/30 hover:text-red-300 font-normal border-t border-[#1e3a5f]/40"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Se déconnecter</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
