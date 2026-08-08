'use server'

import { createServerClient } from '@/src/admin/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function updateCompanySettingsAction(settings: Record<string, string>) {
  const supabase = await createServerClient()

  const upsertData = Object.entries(settings).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }))

  const { error } = await supabase.from('company_settings').upsert(upsertData, {
    onConflict: 'key',
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/parametres')
  revalidatePath('/contact')
  revalidatePath('/')
  return { success: true }
}
