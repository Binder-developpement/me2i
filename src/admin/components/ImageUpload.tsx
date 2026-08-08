'use client'

import { useState } from 'react'
import { createClientSupabase } from '@/src/admin/lib/supabase-client'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.size > 10 * 1024 * 1024) {
        toast.error('L\'image dépasse la taille maximale autorisée (10 Mo)')
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
        // Fallback: if bucket doesn't exist, convert to Data URL for instant preview & saving
        const reader = new FileReader()
        reader.onloadend = () => {
          onChange(reader.result as string)
          toast.success('Image chargée avec succès')
          setUploading(false)
        }
        reader.readAsDataURL(file)
        return
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath)
      onChange(data.publicUrl)
      toast.success('Image téléversée avec succès')
    } catch (err: any) {
      toast.error('Erreur lors du téléversement de l\'image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    onChange(null)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative group border border-[#c3c4c7] rounded-sm overflow-hidden bg-gray-50">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs flex items-center gap-1 font-semibold"
            >
              <X className="h-4 w-4" />
              Supprimer
            </button>
          </div>
        </div>
      ) : (
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
            <span className="text-xs font-semibold text-[#2271b1]">
              {uploading ? 'Téléversement...' : 'Définir l\'image'}
            </span>
            <span className="text-[10px] text-[#646970]">
              PNG, JPG, WebP jusqu'à 10 Mo
            </span>
          </div>
        </label>
      )}
    </div>
  )
}
