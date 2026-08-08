'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Wrench,
  Package,
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
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-10 left-0 bottom-0 z-30 w-60 flex flex-col bg-[#1d2327] text-[#f0f6fc] border-r border-[#2c3338] select-none">
      {/* Sidebar Header: juste ME2I en majuscule sans aucun logo */}
      <div className="flex items-center px-5 h-14 border-b border-[#2c3338] bg-[#101517]">
        <Link href="/admin" className="font-black text-xl tracking-wider text-white hover:text-[#72aee6] transition-colors">
          ME2I
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
              className={`flex items-center gap-3.5 px-4 py-3 rounded text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[#2271b1] text-white'
                  : 'text-[#c3c4c7] hover:bg-[#2c3338] hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : 'text-[#a7aaad]'}`} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
