'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { ExternalLink, Plus, LogOut, User, Bell, Home, ShieldCheck } from 'lucide-react'

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
    <header className="fixed top-0 left-0 right-0 z-40 h-10 bg-[#1d2327] border-b border-[#2c3338] text-[#f0f6fc] flex items-center justify-between px-3 select-none text-[13px]">
      {/* Left side actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[#c3c4c7] hover:text-white hover:bg-[#2c3338] transition-colors"
          title="Ouvrir le site public"
        >
          <Home className="h-3.5 w-3.5" />
          <span className="font-medium text-xs hidden sm:inline">Aller sur le site</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </Link>

        {/* Quick create menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            className="flex items-center gap-1 px-2 py-1 rounded text-[#c3c4c7] hover:text-white hover:bg-[#2c3338] transition-colors text-xs font-medium"
          >
            <Plus className="h-3.5 w-3.5 text-[#72aee6]" />
            <span>Créer</span>
          </button>

          {showCreateMenu && (
            <div
              className="absolute left-0 mt-1 w-44 bg-[#1d2327] border border-[#2c3338] rounded shadow-xl py-1 z-50"
              onMouseLeave={() => setShowCreateMenu(false)}
            >
              <Link
                href="/admin/articles/nouveau"
                className="block px-3 py-1.5 text-xs text-[#c3c4c7] hover:bg-[#2271b1] hover:text-white"
                onClick={() => setShowCreateMenu(false)}
              >
                Article
              </Link>
              <Link
                href="/admin/services/nouveau"
                className="block px-3 py-1.5 text-xs text-[#c3c4c7] hover:bg-[#2271b1] hover:text-white"
                onClick={() => setShowCreateMenu(false)}
              >
                Service
              </Link>
              <Link
                href="/admin/produits/nouveau"
                className="block px-3 py-1.5 text-xs text-[#c3c4c7] hover:bg-[#2271b1] hover:text-white"
                onClick={() => setShowCreateMenu(false)}
              >
                Produit
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Right side profile & status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#a7aaad] bg-[#101517] px-2.5 py-0.5 rounded border border-[#2c3338]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#00a32a]" />
          <span className="font-mono text-[11px] text-emerald-400">Administrateur</span>
        </div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1 rounded text-[#c3c4c7] hover:text-white hover:bg-[#2c3338] transition-colors"
          >
            <div className="h-6 w-6 rounded-full bg-[#2271b1] flex items-center justify-center text-white text-xs font-bold">
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
            </div>
            <span className="text-xs font-medium max-w-[120px] truncate hidden md:inline">
              {userEmail || 'Admin'}
            </span>
          </button>

          {showUserMenu && (
            <div
              className="absolute right-0 mt-1 w-48 bg-[#1d2327] border border-[#2c3338] rounded shadow-xl py-1 z-50"
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div className="px-3 py-2 border-b border-[#2c3338]">
                <p className="text-xs font-semibold text-white truncate">{userEmail || 'Admin'}</p>
                <p className="text-[10px] text-[#a7aaad]">Compte Administrateur</p>
              </div>
              <Link
                href="/admin/parametres/compte"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#c3c4c7] hover:bg-[#2271b1] hover:text-white"
                onClick={() => setShowUserMenu(false)}
              >
                <User className="h-3.5 w-3.5" />
                Mon compte
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-600 hover:text-white transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
