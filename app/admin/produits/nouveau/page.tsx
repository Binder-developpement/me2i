'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createProductAction } from '@/src/admin/lib/product-actions'
import RichEditor from '@/src/admin/components/RichEditor'
import ImageUpload from '@/src/admin/components/ImageUpload'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [currency, setCurrency] = useState('XAF')
  const [stock, setStock] = useState<number>(10)
  const [category, setCategory] = useState('Groupes & Pièces')
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'published' | 'draft' | 'out_of_stock'>('published')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    setSlug(
      val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
    )
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Le nom du produit est obligatoire')
      return
    }

    try {
      setLoading(true)
      await createProductAction({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        price: price === '' ? undefined : Number(price),
        currency,
        stock: Number(stock),
        category,
        description,
        cover_url: coverUrl || undefined,
        status,
      })

      toast.success('Produit ajouté au catalogue !')
      router.push('/admin/produits')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création du produit')
    } finally {
      setLoading(false)
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
          <h1 className="text-2xl font-bold text-[#1d2327]">Ajouter un produit</h1>
        </div>

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
          <span>Enregistrer le produit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm">
            <input
              type="text"
              placeholder="Nom du produit..."
              value={name}
              onChange={handleNameChange}
              className="w-full text-xl font-bold text-[#1d2327] placeholder-[#8c8f94] focus:outline-none border-b border-transparent focus:border-[#2271b1] pb-2 transition-colors"
            />
            <div className="mt-2 flex items-center gap-1 text-xs text-[#646970]">
              <span className="font-semibold">Permalien :</span>
              <span className="text-[#2271b1] underline">{slug || 'mon-produit'}</span>
            </div>
          </div>

          <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1d2327] uppercase tracking-wider mb-1">
                Prix (FCFA)
              </label>
              <input
                type="number"
                placeholder="Ex: 450000"
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
