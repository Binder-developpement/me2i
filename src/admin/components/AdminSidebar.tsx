'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Package,
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
    <aside className="fixed top-10 left-0 bottom-0 z-30 w-60 flex flex-col bg-gradient-to-br from-[#0f1b2c] via-[#1a3354] to-[#264872] text-white select-none shadow-sm">
      {/* Sidebar Header: ME2I sans gras avec sous-titre et légère séparation */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-transparent">
        <Link href="/admin" className="block group">
          <span className="font-medium text-lg tracking-wider text-white group-hover:text-white/80 transition-colors block">
            ME2I
          </span>
          <span className="block text-[11px] font-normal text-white/60 tracking-normal leading-tight mt-0.5">
            Administration
          </span>
        </Link>
      </div>

      {/* Navigation items sans sous-menus avec texte agrandi */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-white/20 text-white font-bold shadow-sm'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-white/70'}`} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
