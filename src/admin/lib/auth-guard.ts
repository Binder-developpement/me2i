import { createServerClient } from '@/src/admin/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function requireAdminAuth() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return user
}
