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

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-10 left-0 bottom-0 z-30 w-60 flex flex-col bg-gradient-to-b from-[#0b1320] via-[#111e33] to-[#1a2d4b] text-white select-none border-r border-black/20 shadow-md">
      {/* Sidebar Header: sans aucune ligne blanche */}
      <div className="px-5 py-3.5 border-b border-black/20 bg-black/20 backdrop-blur-sm">
        <Link href="/admin" className="block group">
          <span className="font-normal text-base tracking-wider text-white/90 group-hover:text-[#72aee6] transition-colors block uppercase">
            ME2I Admin
          </span>
          <span className="block text-[10px] font-normal text-white/40 tracking-normal leading-tight mt-0.5 uppercase">
            Panneau de contrôle
          </span>
        </Link>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-sm text-xs font-normal transition-all relative ${
                isActive
                  ? 'bg-[#2271b1] text-white shadow-sm font-medium'
                  : 'text-white/70 hover:bg-black/20 hover:text-white'
              }`}
            >
              <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-white/40'}`} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer info sans ligne claire */}
      <div className="p-3 border-t border-black/20 bg-black/20 text-[10px] text-white/35 text-center font-normal">
        ME2I &copy; {new Date().getFullYear()} — Version 1.0
      </div>
    </aside>
  )
}
