import { createServerClient } from '@/src/admin/lib/supabase-server'
import AdminShell from '@/src/admin/components/AdminShell'
import { Toaster } from 'sonner'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Administration - MCI',
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

  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || ''

  // Enforce server-side redirect to login if not authenticated and not on login page
  if (!user && pathname !== '/admin/login') {
    redirect('/admin/login')
  }

  // If already authenticated and accessing login page, redirect to dashboard
  if (user && pathname === '/admin/login') {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1e1e1e] font-sans antialiased overflow-x-hidden">
      {user ? (
        <AdminShell userEmail={user.email}>{children}</AdminShell>
      ) : (
        <main className="min-h-screen p-4">{children}</main>
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
