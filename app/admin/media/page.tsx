import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import MediaLibraryClient from '@/src/admin/components/MediaLibraryClient'

export const metadata = {
  title: 'Médiathèque - Administration MCI',
}

export default async function MediaPage() {
  await requireAdminAuth()
  return (
    <div className="space-y-4 w-full">
      <MediaLibraryClient />
    </div>
  )
}
