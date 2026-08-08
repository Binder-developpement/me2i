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
    <div className="space-y-4 w-full">
      {/* Header Card: bg-white and non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm w-full">
        <h1 className="text-xl font-normal text-[#1d2327]">Informations de l'entreprise</h1>
        <p className="text-xs text-[#646970] font-normal mt-0.5">
          Modifiez les coordonnées, téléphones, horaires et liens sociaux affichés sur le site
        </p>
      </div>

      <CompanySettingsClient initialSettings={settingsMap} />
    </div>
  )
}
