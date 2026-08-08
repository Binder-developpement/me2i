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
  const [category, setCategory] = useState('Groupes Électrogènes')
  const [price, setPrice] = useState<number | ''>('')
  const [currency, setCurrency] = useState('XAF')
  const [stock, setStock] = useState<number>(1)
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const [status, setStatus] = useState<'published' | 'draft' | 'out_of_stock'>('published')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    const generatedSlug = val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    setSlug(generatedSlug)
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
        slug,
        category,
        price: price === '' ? 0 : Number(price),
        currency,
        stock,
        description,
        cover_url: coverUrl || undefined,
        status,
      })

      toast.success('Produit créé avec succès !')
      router.push('/admin/produits')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erreur lors de la création du produit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Header sans gras */}
      <div className="flex items-center justify-between pb-2 border-b border-[#dcdcde] w-full">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/produits"
            className="p-1 rounded hover:bg-[#dcdcde] text-[#1d2327] transition-colors"
            title="Retour à la liste"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-normal text-[#1d2327]">Ajouter un produit</h1>
        </div>
      </div>

      {/* WordPress Full-Width Flex Layout: Central content takes full remaining width, sidebar 280px on extreme right */}
      <div className="flex flex-col lg:flex-row items-start gap-4 w-full">
        {/* Main Content Area (Expands to fill all central space) */}
        <div className="flex-1 min-w-0 space-y-3 w-full">
          {/* Name box */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 space-y-2 shadow-sm">
            <input
              type="text"
              placeholder="Saisir le nom du produit ici..."
              value={name}
              onChange={handleNameChange}
              className="w-full text-lg font-normal text-[#1d2327] placeholder-[#8c8f94] focus:outline-none border-b border-[#dcdcde] focus:border-[#2271b1] pb-1.5 transition-colors"
            />
            <div className="flex items-center gap-1 text-xs text-[#646970]">
              <span className="font-normal">Permalien :</span>
              <span className="text-[#2271b1] underline font-normal">{slug || 'mon-produit'}</span>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                Prix unitaire ({currency})
              </label>
              <input
                type="number"
                placeholder="Ex: 450000"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                Devise
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white uppercase font-normal"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider mb-1">
                Stock disponible
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
              />
            </div>
          </div>

          {/* Technical Description Editor */}
          <div className="space-y-1.5">
            <label className="block text-xs font-normal text-[#1d2327] uppercase tracking-wider">
              Description technique du produit
            </label>
            <RichEditor content={description} onChange={setDescription} />
          </div>
        </div>

        {/* Right Sidebar (Extreme right, 280px width) */}
        <div className="w-full lg:w-72 shrink-0 space-y-3">
          {/* Card Publication */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Publication & Stock
            </div>

            <div className="p-3.5 space-y-3 text-xs text-[#2c3338]">
              <div className="flex items-center justify-between">
                <span className="font-normal">Statut :</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="p-1 border border-[#8c8f94] rounded-sm text-xs bg-white font-normal"
                >
                  <option value="published">En stock (Publié)</option>
                  <option value="draft">Brouillon</option>
                  <option value="out_of_stock">Rupture de stock</option>
                </select>
              </div>
            </div>

            {/* Actions inside Publication Card */}
            <div className="px-3.5 py-2.5 bg-[#f6f7f7] border-t border-[#c3c4c7] flex items-center justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-1 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3.5 py-1.5 rounded-sm transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Save className="h-3.5 w-3.5" />
                )}
                <span>Enregistrer le produit</span>
              </button>
            </div>
          </div>

          {/* Card Catégorie */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
            <div className="px-3.5 py-2 bg-[#f6f7f7] border-b border-[#c3c4c7] font-normal text-xs text-[#1d2327] uppercase tracking-wider">
              Catégorie de produit
            </div>
            <div className="p-3.5 space-y-1.5 text-xs">
              {['Groupes Électrogènes', 'Automatisme', 'Solaire', 'Électricité', 'Outillage', 'Accessoires'].map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#2271b1]">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="text-[#2271b1]"
                  />
                  <span className="font-normal">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Card Image du Produit */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm p-3.5">
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              bucketName="article-covers"
              label="Visuel du produit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
