import { createServerClient } from '@/src/admin/lib/supabase-server'
import AccountSettingsClient from './AccountSettingsClient'

export const revalidate = 0

export default async function AccountPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <div className="border-b border-[#c3c4c7] pb-4">
        <h1 className="text-2xl font-bold text-[#1d2327]">Mon compte Administrateur</h1>
        <p className="text-xs text-[#646970] mt-0.5">
          Gérez vos identifiants de connexion Supabase Auth et mot de passe
        </p>
      </div>

      <AccountSettingsClient userEmail={user?.email} />
    </div>
  )
}
