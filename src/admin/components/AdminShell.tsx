'use client'

import { useState } from 'react'
import AdminTopbar from './AdminTopbar'
import AdminSidebar from './AdminSidebar'

export default function AdminShell({
  userEmail,
  children,
}: {
  userEmail?: string
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      <AdminTopbar
        userEmail={userEmail}
        isMobileOpen={isMobileOpen}
        onToggleMobileMenu={() => setIsMobileOpen((prev) => !prev)}
      />

      <AdminSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobileMenu={() => setIsMobileOpen(false)}
      />

      <main className="min-h-screen transition-all duration-200 pt-12 md:pl-64">
        <div className="p-3 sm:p-6 max-w-7xl mx-auto overflow-x-hidden">{children}</div>
      </main>
    </>
  )
}
