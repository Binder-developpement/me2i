import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import AccountSettingsClient from './AccountSettingsClient'

export const revalidate = 0

export default async function AccountPage() {
  const user = await requireAdminAuth()

  return (
    <div className="space-y-4 w-full">
      {/* Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm w-full">
        <h1 className="text-xl font-normal text-[#1d2327]">Mon compte Administrateur</h1>
        <p className="text-xs text-[#646970] font-normal mt-0.5">
          Gérez vos identifiants de connexion Supabase Auth et mot de passe
        </p>
      </div>

      <AccountSettingsClient userEmail={user?.email} />
    </div>
  )
}
