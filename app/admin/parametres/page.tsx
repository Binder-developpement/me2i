import { createServerClient } from '@/src/admin/lib/supabase-server'
import CompanySettingsClient from './CompanySettingsClient'

export const revalidate = 0

export default async function SettingsPage() {
  let settingsMap: Record<string, string> = {}

  try {
    const supabase = await createServerClient()
    const { data } = await supabase.from('company_settings').select('*')

    if (data) {
      data.forEach((item: any) => {
        settingsMap[item.key] = item.value || ''
      })
    }
  } catch (err) {
    console.error('Error fetching settings:', err)
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-[#c3c4c7] pb-4">
        <h1 className="text-2xl font-bold text-[#1d2327]">Informations de l'entreprise</h1>
        <p className="text-xs text-[#646970] mt-0.5">
          Modifiez les coordonnées, téléphones, horaires et liens sociaux affichés sur le site
        </p>
      </div>

      <CompanySettingsClient initialSettings={settingsMap} />
    </div>
  )
}
