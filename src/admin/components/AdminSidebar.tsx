'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Package,
  FolderCheck,
  ImageIcon,
  Trash2,
  ShoppingCart,
  MessageSquare,
  Settings,
  X,
} from 'lucide-react'

const navItems = [
  {
    title: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'Réalisations',
    icon: FolderCheck,
    href: '/admin/realisations',
  },
  {
    title: 'Articles',
    icon: FileText,
    href: '/admin/articles',
  },
  {
    title: 'Services',
    icon: Wrench,
    href: '/admin/services',
  },
  {
    title: 'Produits',
    icon: Package,
    href: '/admin/produits',
  },
  {
    title: 'Commandes',
    icon: ShoppingCart,
    href: '/admin/commandes',
  },
  {
    title: 'Messages',
    icon: MessageSquare,
    href: '/admin/contacts',
  },
  {
    title: 'Paramètres',
    icon: Settings,
    href: '/admin/parametres',
  },
  {
    title: 'Médiathèque & Galerie',
    icon: ImageIcon,
    href: '/admin/media',
  },
  {
    title: 'Corbeille',
    icon: Trash2,
    href: '/admin/articles?tab=trash',
  },
]

export default function AdminSidebar({
  isMobileOpen = false,
  onCloseMobileMenu,
}: {
  isMobileOpen?: boolean
  onCloseMobileMenu?: () => void
}) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={onCloseMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-10 left-0 bottom-0 z-50 w-64 flex flex-col bg-gradient-to-b from-[#0b1320] via-[#111e33] to-[#1a2d4b] text-white select-none border-r border-black/20 shadow-xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-5 py-4 bg-black/15 flex items-center justify-between">
          <Link href="/admin" onClick={onCloseMobileMenu} className="block group">
            <span className="font-medium text-lg tracking-wider text-white/90 group-hover:text-[#72aee6] transition-colors block uppercase">
              ME2I Admin
            </span>
            <span className="block text-xs font-normal text-white/40 tracking-normal leading-tight mt-0.5 uppercase">
              Panneau de contrôle
            </span>
          </Link>

          {/* Close button inside mobile menu */}
          <button
            type="button"
            onClick={onCloseMobileMenu}
            className="md:hidden p-1.5 rounded-sm text-white/60 hover:text-white hover:bg-black/20 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={onCloseMobileMenu}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-md text-sm font-medium transition-all relative ${
                  isActive
                    ? 'bg-[#2271b1] text-white shadow-md'
                    : 'text-white/80 hover:bg-black/25 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-white/50'}`} />
                <span className="text-sm">{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
