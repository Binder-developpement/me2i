import MediaLibraryClient from '@/src/admin/components/MediaLibraryClient'

export const metadata = {
  title: 'Médiathèque - Administration ME2I',
}

export default function MediaPage() {
  return (
    <div className="space-y-4 w-full">
      <MediaLibraryClient />
    </div>
  )
}
