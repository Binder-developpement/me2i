import { createServerClient } from '@/src/admin/lib/supabase-server'
import { notFound } from 'next/navigation'
import ContactDetailClient from './ContactDetailClient'

export const revalidate = 0

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let contact: any = null

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      notFound()
    }
    contact = data
  } catch (err) {
    notFound()
  }

  return <ContactDetailClient contact={contact} />
}
