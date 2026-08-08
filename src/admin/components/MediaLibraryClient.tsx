'use client'

import { useState, useEffect } from 'react'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { toast } from 'sonner'
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Trash2,
  X,
  Loader2,
  Check,
  Grid,
  List,
  Search,
  ExternalLink
} from 'lucide-react'

interface MediaItem {
  name: string
  url: string
  bucket: string
  created_at?: string
  size?: number
}

export default function MediaLibraryClient() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  // Fetch images from Supabase Storage buckets
  const fetchMedia = async () => {
    try {
      setLoading(true)
      const supabase = createClientSupabase()
      const mediaList: MediaItem[] = []

      const buckets = ['company-assets', 'article-covers']

      for (const bucket of buckets) {
        const { data, error } = await supabase.storage.from(bucket).list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        })

        if (data && !error) {
          data.forEach((file) => {
            if (file.name && !file.name.startsWith('.')) {
              const { data: publicUrlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(file.name)

              mediaList.push({
                name: file.name,
                url: publicUrlData.publicUrl,
                bucket,
                created_at: file.created_at,
                size: file.metadata?.size,
              })
            }
          })
        }
      }

      setItems(mediaList)
    } catch {
      toast.error('Erreur lors du chargement des médias')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  // Handle Upload File up to 10MB
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (file.size > 10 * 1024 * 1024) {
      toast.error('L\'image dépasse 10 Mo')
      return
    }

    try {
      setUploading(true)
      const supabase = createClientSupabase()

      const fileExt = file.name.split('.').pop()
      const fileName = `media_${Math.random().toString(36).substring(2, 9)}_${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from('article-covers')
        .upload(fileName, file)

      if (error) {
        toast.error('Erreur lors du téléversement : ' + error.message)
        return
      }

      toast.success('Image téléversée dans la médiathèque !')
      fetchMedia()
    } catch {
      toast.error('Erreur de téléversement')
    } finally {
      setUploading(false)
    }
  }

  // Delete media item permanently
  const handleDeleteMedia = async (item: MediaItem) => {
    if (!confirm(`Voulez-vous vraiment supprimer "${item.name}" de la médiathèque ?`)) return

    try {
      const supabase = createClientSupabase()
      const { error } = await supabase.storage.from(item.bucket).remove([item.name])

      if (error) {
        toast.error('Erreur de suppression : ' + error.message)
        return
      }

      toast.success('Image supprimée de la médiathèque')
      setItems((prev) => prev.filter((i) => i.name !== item.name))
      setSelectedItem(null)
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    toast.success('URL copiée dans le presse-papier !')
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4 w-full">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#dcdcde] gap-3">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327]">Médiathèque</h1>
          <p className="text-xs text-[#646970] mt-0.5">
            Gérez la galerie d'images et tous les fichiers médias de votre site.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3.5 py-2 rounded-sm cursor-pointer transition-colors shadow-sm w-fit">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )}
          <span>Ajouter un fichier média (jusqu'à 10 Mo)</span>
        </label>
      </div>

      {/* Controls Bar: View mode & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 border border-[#c3c4c7] rounded-sm shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-[#2271b1] text-white' : 'text-[#50575e] hover:bg-[#f0f0f1]'
            }`}
            title="Affichage en grille"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-colors ${
              viewMode === 'list' ? 'bg-[#2271b1] text-white' : 'text-[#50575e] hover:bg-[#f0f0f1]'
            }`}
            title="Affichage en liste"
          >
            <List className="h-4 w-4" />
          </button>
          <span className="text-xs text-[#646970] ml-2">
            {filteredItems.length} fichier(s) média
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher un média..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white w-full sm:w-64 font-normal"
          />
        </div>
      </div>

      {/* Main Content Grid / List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 bg-white border border-[#c3c4c7] rounded-sm">
          <Loader2 className="h-6 w-6 text-[#2271b1] animate-spin" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#c3c4c7] rounded-sm p-6">
          <ImageIcon className="h-10 w-10 text-[#8c8f94] mx-auto mb-2" />
          <p className="text-sm font-normal text-[#1d2327]">Aucun fichier média trouvé dans la galerie.</p>
          <p className="text-xs text-[#646970] mt-1">Téléversez des images jusqu'à 10 Mo pour enrichir vos articles et pages.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.url}
              onClick={() => setSelectedItem(item)}
              className="group aspect-square relative bg-gray-100 border border-[#c3c4c7] rounded-sm overflow-hidden cursor-pointer hover:border-[#2271b1] hover:shadow-md transition-all"
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span className="text-[10px] text-white font-medium truncate w-full">
                  Détails & URL
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#c3c4c7] rounded-sm overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] font-semibold">
                <th className="p-3 w-16">Aperçu</th>
                <th className="p-3">Nom du fichier</th>
                <th className="p-3">Bucket</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f0f1]">
              {filteredItems.map((item) => (
                <tr key={item.url} className="hover:bg-[#f6f7f7] transition-colors">
                  <td className="p-2">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded border border-gray-200"
                    />
                  </td>
                  <td className="p-3 font-medium text-[#2271b1] truncate max-w-xs">
                    {item.name}
                  </td>
                  <td className="p-3 text-[#646970]">{item.bucket}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.url)}
                      className="text-[#2271b1] hover:underline text-xs"
                    >
                      Copier l'URL
                    </button>
                    <span className="text-[#c3c4c7]">|</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(item)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* WordPress Media Detail Modal / Drawer */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1d2327] uppercase tracking-wider">
                Détails du fichier média
              </h3>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Big Preview */}
              <div className="bg-gray-100 border border-[#c3c4c7] rounded-sm p-2 flex items-center justify-center min-h-[240px]">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.name}
                  className="max-h-72 max-w-full object-contain rounded"
                />
              </div>

              {/* Right: File details & Copy URL */}
              <div className="space-y-4 text-xs text-[#2c3338]">
                <div>
                  <label className="block font-semibold text-[#1d2327] mb-1">Nom du fichier :</label>
                  <p className="font-mono text-[11px] bg-gray-50 p-2 border border-gray-200 rounded break-all">
                    {selectedItem.name}
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-[#1d2327] mb-1">Emplacement Storage :</label>
                  <p className="text-gray-600">{selectedItem.bucket}</p>
                </div>

                {/* Direct URL input with Copy Button */}
                <div>
                  <label className="block font-semibold text-[#1d2327] mb-1">URL du fichier :</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      readOnly
                      value={selectedItem.url}
                      className="flex-1 p-2 border border-[#8c8f94] rounded-sm text-xs font-mono bg-gray-50 select-all"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(selectedItem.url)}
                      className="px-3 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white font-normal rounded-sm flex items-center gap-1 transition-colors shrink-0"
                    >
                      {copiedUrl === selectedItem.url ? (
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedUrl === selectedItem.url ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#f0f0f1] flex items-center justify-between">
                  <a
                    href={selectedItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#2271b1] hover:underline"
                  >
                    <span>Voir le fichier original</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDeleteMedia(selectedItem)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 hover:underline font-normal"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Supprimer définitivement</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
