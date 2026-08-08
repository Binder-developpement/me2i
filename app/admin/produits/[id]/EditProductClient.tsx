'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateProductAction, deleteProductAction } from '@/src/admin/lib/product-actions'
import RichEditor from '@/src/admin/components/RichEditor'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { ArrowLeft, Save, Trash2, Loader2 } from 'lucide-react'

export default function EditProductClient({ product }: { product: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [name, setName] = useState(product.name || '')
  const [slug, setSlug] = useState(product.slug || '')
  const [price, setPrice] = useState<number | ''>(product.price ?? '')
  const [currency, setCurrency] = useState(product.currency || 'XAF')
  const [stock, setStock] = useState<number>(product.stock ?? 10)
  const [category, setCategory] = useState(product.category || 'Groupes & Pièces')
  const [description, setDescription] = useState(product.description || '')
  const [coverUrl, setCoverUrl] = useState<string | null>(product.cover_url || null)
  const [status, setStatus] = useState<'published' | 'draft' | 'out_of_stock'>(product.status || 'published')

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Le nom du produit est obligatoire')
      return
    }

    try {
      setLoading(true)
      await updateProductAction(product.id, {
        name,
        slug,
        price: price === '' ? undefined : Number(price),
        currency,
        stock: Number(stock),
        category,
        description,
        cover_url: coverUrl || undefined,
        status,
      })

      toast.success('Produit mis à jour avec succès !')
      router.push('/admin/produits')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

    try {
      setDeleting(true)
      await deleteProductAction(product.id)
      toast.success('Produit supprimé')
      router.push('/admin/produits')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#c3c4c7] pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/produits"
            className="p-1.5 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold text-[#1d2327]">Modifier le produit</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-sm transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Supprimer</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold px-4 py-2 rounded-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>Mettre à jour</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm">
            <input
              type="text"
              placeholder="Nom du produit..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xl font-bold text-[#1d2327] placeholder-[#8c8f94] focus:outline-none border-b border-transparent focus:border-[#2271b1] pb-2 transition-colors"
            />
            <div className="mt-2 flex items-center gap-1 text-xs text-[#646970]">
              <span className="font-semibold">Permalien :</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="text-[#2271b1] bg-transparent border-b border-gray-300 focus:outline-none focus:border-[#2271b1] px-1"
              />
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider mb-1">
                Prix (FCFA)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider mb-1">
                Devise
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider mb-1">
                Quantité en stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider">
              Description technique du produit
            </label>
            <RichEditor content={description} onChange={setDescription} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Disponibilité
            </div>
            <div className="p-4 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span>Statut :</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white"
                >
                  <option value="published">En stock</option>
                  <option value="out_of_stock">Rupture de stock</option>
                  <option value="draft">Brouillon</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] font-semibold text-xs text-[#1d2327] uppercase tracking-wider">
              Catégorie produit
            </div>
            <div className="p-4 space-y-2 text-xs">
              {[
                'Groupes & Pièces',
                'Matériel Électrique',
                'Solaire & Batteries',
                'Automates & Capteurs',
                'Outillage Industriel',
              ].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#2271b1]">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="text-[#2271b1]"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-4">
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              bucketName="product-images"
              label="Photo principale"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
