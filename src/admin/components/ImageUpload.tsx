'use client'

import { useState } from 'react'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { Upload, X, Loader2, RefreshCw, FolderOpen, Check } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string | null
  onChange: (url: string | null) => void
  bucketName?: string
  label?: string
}

export default function ImageUpload({
  value,
  onChange,
  bucketName = 'company-assets',
  label = 'Image mise en avant',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [showMediaPicker, setShowMediaPicker] = useState(false)
  const [mediaList, setMediaList] = useState<string[]>([])
  const [loadingMedia, setLoadingMedia] = useState(false)

  // Default system images extracted from PDF + realization photos
  const systemImages = [
    '/images/realisations/realisation_p6_img1.png',
    '/images/realisations/realisation_p7_img1.png',
    '/images/realisations/realisation_p8_img1.png',
    '/images/realisations/realisation_p9_img1.png',
    '/images/realisations/realisation_p10_img1.png',
    '/images/realisations/realisation_p11_img1.png',
    '/images/realisations/realisation_p12_img1.png',
    '/images/realisations/realisation_p13_img1.png',
    '/images/realisations/realisation_p14_img1.png',
    '/images/realisations/realisation_p15_img1.png',
    '/images/realisations/realisation_p16_img1.png',
    '/images/realisations/realisation_p17_img1.png',
    '/images/realisations/realisation_p18_img1.jpeg',
    '/images/realisations/realisation_p19_img1.png',
    '/images/realisations/realisation_p20_img1.png',
    '/images/realisations/realisation_p21_img1.png',
    '/images/realisations/realisation_p22_img1.jpeg',
  ]

  const loadMediaLibrary = async () => {
    setLoadingMedia(true)
    const list: string[] = [...systemImages]
    try {
      const supabase = createClientSupabase()
      const buckets = ['company-assets', 'article-covers']
      for (const b of buckets) {
        const { data } = await supabase.storage.from(b).list('', { limit: 50 })
        if (data) {
          data.forEach((file) => {
            if (file.name && !file.name.startsWith('.')) {
              const { data: pUrl } = supabase.storage.from(b).getPublicUrl(file.name)
              if (pUrl?.publicUrl) list.unshift(pUrl.publicUrl)
            }
          })
        }
      }
    } catch (e) {
      console.error(e)
    }
    setMediaList(list)
    setLoadingMedia(false)
  }

  const handleOpenPicker = () => {
    setShowMediaPicker(true)
    loadMediaLibrary()
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.size > 10 * 1024 * 1024) {
        toast.error("L'image dépasse la taille maximale autorisée (10 Mo)")
        return
      }

      setUploading(true)
      const supabase = createClientSupabase()

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 9)}_${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file)

      if (uploadError) {
        console.warn("Storage upload error:", uploadError)
        toast.warning("Stocké en base de données. Pour la médiathèque Cloud, activez les règles RLS dans Supabase SQL Editor.")
        const reader = new FileReader()
        reader.onloadend = () => {
          onChange(reader.result as string)
          setUploading(false)
        }
        reader.readAsDataURL(file)
        return
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
      onChange(data.publicUrl)
      toast.success('Image téléversée avec succès')
    } catch (err: any) {
      toast.error("Erreur lors du téléversement de l'image")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange(null)
    toast.info("Image déliée de cet élément")
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider">
          {label}
        </label>
      )}

      {value ? (
        <div className="space-y-2">
          {/* Image Preview */}
          <div className="relative group border border-[#c3c4c7] rounded-sm overflow-hidden bg-[#f8fafc]">
            <img
              src={value}
              alt="Preview"
              className="w-full h-44 object-contain"
            />
          </div>

          {/* Action Bar: Modifier, Délier, Médiathèque */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Remplacer / Changer image */}
            <label className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm cursor-pointer transition-colors">
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
                <RefreshCw className="h-3.5 w-3.5" />
              )}
              <span>Changer l'image</span>
            </label>

            {/* Choisir dans la médiathèque */}
            <button
              type="button"
              onClick={handleOpenPicker}
              className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
            >
              <FolderOpen className="h-3.5 w-3.5 text-[#2271b1]" />
              <span>Médiathèque</span>
            </button>

            {/* Délier de l'élément */}
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
              title="Retirer l'image de cet élément sans supprimer le fichier système"
            >
              <X className="h-3.5 w-3.5" />
              <span>Délier de l'élément</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="border-2 border-dashed border-[#8c8f94] hover:border-[#2271b1] rounded-sm p-4 text-center cursor-pointer block bg-[#f6f7f7] hover:bg-white transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-1">
              {uploading ? (
                <Loader2 className="h-6 w-6 text-[#2271b1] animate-spin" />
              ) : (
                <Upload className="h-6 w-6 text-[#8c8f94]" />
              )}
              <span className="text-xs font-normal text-[#2271b1]">
                {uploading ? 'Téléversement en cours...' : 'Téléverser une image'}
              </span>
              <span className="text-[10px] text-[#646970] font-normal">
                PNG, JPG, WebP jusqu'à 10 Mo
              </span>
            </div>
          </label>

          <button
            type="button"
            onClick={handleOpenPicker}
            className="w-full flex items-center justify-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal py-2 rounded-sm transition-colors"
          >
            <FolderOpen className="h-4 w-4 text-[#2271b1]" />
            <span>Choisir une image existante dans la Médiathèque</span>
          </button>
        </div>
      )}

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="px-4 py-3 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-[#2271b1]" />
                <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                  Sélectionner une image dans la Médiathèque
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaPicker(false)}
                className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {loadingMedia ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-6 w-6 text-[#2271b1] animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {mediaList.map((url, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onChange(url)
                        setShowMediaPicker(false)
                        toast.success('Image sélectionnée')
                      }}
                      className={`relative group aspect-square bg-[#f8fafc] border rounded-sm overflow-hidden cursor-pointer transition-all ${value === url
                          ? 'border-2 border-[#2271b1] ring-2 ring-[#2271b1]/20'
                          : 'border-[#c3c4c7] hover:border-[#2271b1]'
                        }`}
                    >
                      <img
                        src={url}
                        alt="Media option"
                        className="w-full h-full object-cover"
                      />
                      {value === url && (
                        <div className="absolute top-1 right-1 bg-[#2271b1] text-white rounded-full p-0.5">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
