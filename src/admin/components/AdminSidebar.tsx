'use client'

import { useState } from 'react'
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
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
  User,
  SlidersHorizontal,
  Plus
} from 'lucide-react'

interface NavGroup {
  title: string
  icon: any
  href: string
  badge?: number
  subItems?: { title: string; href: string }[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'Articles',
    icon: FileText,
    href: '/admin/articles',
    subItems: [
      { title: 'Tous les articles', href: '/admin/articles' },
      { title: 'Ajouter un article', href: '/admin/articles/nouveau' },
    ],
  },
  {
    title: 'Services',
    icon: Wrench,
    href: '/admin/services',
    subItems: [
      { title: 'Tous les services', href: '/admin/services' },
      { title: 'Ajouter un service', href: '/admin/services/nouveau' },
    ],
  },
  {
    title: 'Produits',
    icon: Package,
    href: '/admin/produits',
    subItems: [
      { title: 'Tous les produits', href: '/admin/produits' },
      { title: 'Ajouter un produit', href: '/admin/produits/nouveau' },
    ],
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
    subItems: [
      { title: 'Entreprise', href: '/admin/parametres' },
      { title: 'Mon compte', href: '/admin/parametres/compte' },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Articles: pathname.startsWith('/admin/articles'),
    Services: pathname.startsWith('/admin/services'),
    Produits: pathname.startsWith('/admin/produits'),
    Paramètres: pathname.startsWith('/admin/parametres'),
  })

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <aside
      className={`fixed top-10 left-0 bottom-0 z-30 flex flex-col bg-[#1d2327] text-[#f0f6fc] transition-all duration-200 border-r border-[#2c3338] select-none ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Sidebar Header / Logo */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-[#2c3338] bg-[#101517]">
        {!collapsed ? (
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <span className="flex h-7 w-7 items-center justify-center bg-[#2271b1] text-white text-xs font-black tracking-wider rounded-sm">
              M2I
            </span>
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-[#72aee6] transition-colors">
              ME2I Admin
            </span>
          </Link>
        ) : (
          <Link href="/admin" className="mx-auto flex h-7 w-7 items-center justify-center bg-[#2271b1] text-white text-xs font-black rounded-sm">
            M
          </Link>
        )}
      </div>

      {/* Navigation items list */}
      <nav className="flex-1 overflow-y-auto py-2 px-0 space-y-0.5 custom-scrollbar">
        {navGroups.map((group) => {
          const isActive =
            pathname === group.href ||
            (group.href !== '/admin' && pathname.startsWith(group.href))
          const hasSubmenu = Boolean(group.subItems && group.subItems.length > 0)
          const isOpen = Boolean(openMenus[group.title])

          return (
            <div key={group.title} className="relative group/item">
              {/* Parent item */}
              <div
                onClick={() => {
                  if (hasSubmenu && !collapsed) {
                    toggleSubmenu(group.title)
                  }
                }}
                className={`flex items-center justify-between px-3.5 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#2271b1] text-white font-semibold'
                    : 'text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]'
                }`}
              >
                <Link
                  href={group.href}
                  onClick={(e) => {
                    if (hasSubmenu && !collapsed) {
                      // Allow toggling if clicking main title with submenus
                    }
                  }}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <group.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-[#a7aaad]'}`} />
                  {!collapsed && <span className="truncate">{group.title}</span>}
                </Link>

                {!collapsed && hasSubmenu && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleSubmenu(group.title)
                    }}
                    className="p-0.5 hover:text-white"
                  >
                    {isOpen ? (
                      <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                    )}
                  </button>
                )}
              </div>

              {/* Submenu items (expanded state) */}
              {!collapsed && hasSubmenu && isOpen && (
                <div className="bg-[#101517] py-1 border-l-2 border-[#2271b1]/50 ml-4 my-0.5 space-y-0.5">
                  {group.subItems?.map((sub) => {
                    const isSubActive = pathname === sub.href
                    return (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        className={`block px-4 py-1.5 text-[12px] transition-colors ${
                          isSubActive
                            ? 'text-white font-semibold'
                            : 'text-[#c3c4c7] hover:text-[#72aee6]'
                        }`}
                      >
                        {sub.title}
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* Flyout menu on collapsed state */}
              {collapsed && hasSubmenu && (
                <div className="absolute left-full top-0 hidden group-hover/item:block bg-[#1d2327] border border-[#2c3338] shadow-lg py-1.5 w-48 z-50 rounded-r">
                  <div className="px-3 py-1 text-xs font-semibold text-white border-b border-[#2c3338] mb-1">
                    {group.title}
                  </div>
                  {group.subItems?.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      className="block px-3 py-1.5 text-xs text-[#c3c4c7] hover:bg-[#2271b1] hover:text-white"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Collapse button at bottom */}
      <div className="border-t border-[#2c3338] bg-[#101517]">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 w-full px-4 py-2.5 text-xs text-[#a7aaad] hover:text-[#72aee6] transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 mx-auto" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span>Réduire le menu</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
