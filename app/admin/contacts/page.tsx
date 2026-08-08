import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import ContactListClient from './ContactListClient'

export const revalidate = 0

export default async function ContactsListPage() {
  await requireAdminAuth()
  let contacts: any[] = []

  try {
    const supabase = await createServerClient()
    const { data } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    contacts = data || []
  } catch (err) {
    console.error('Error fetching contacts:', err)
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm w-full">
        <h1 className="text-xl font-normal text-[#1d2327]">Messages &amp; Demandes de contact</h1>
        <p className="text-xs text-[#646970] font-normal mt-0.5">
          Consultez et traitez les demandes envoyées depuis le formulaire de contact
        </p>
      </div>

      <ContactListClient initialContacts={contacts} />
    </div>
  )
}
