import { createServerClient } from '@/src/admin/lib/supabase-server'
import ContactListClient from './ContactListClient'

export const revalidate = 0

export default async function ContactsListPage() {
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
    <div className="space-y-6">
      <div className="border-b border-[#c3c4c7] pb-4">
        <h1 className="text-2xl font-bold text-[#1d2327]">Messages &amp; Demandes de contact</h1>
        <p className="text-xs text-[#646970] mt-0.5">
          Consultez et traitez les demandes envoyées depuis le formulaire de contact
        </p>
      </div>

      <ContactListClient initialContacts={contacts} />
    </div>
  )
}
