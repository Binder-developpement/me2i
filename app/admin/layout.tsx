import { createServerClient } from '@/src/admin/lib/supabase-server'
import AdminSidebar from '@/src/admin/components/AdminSidebar'
import AdminTopbar from '@/src/admin/components/AdminTopbar'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'Administration — ME2I',
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1e1e1e] font-sans antialiased">
      {user && <AdminTopbar userEmail={user.email} />}
      {user && <AdminSidebar />}

      <main
        className={`min-h-screen transition-all duration-200 ${
          user ? 'pt-10 pl-16 md:pl-60' : ''
        }`}
      >
        <div className="p-6 max-w-7xl mx-auto">{children}</div>
      </main>

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
