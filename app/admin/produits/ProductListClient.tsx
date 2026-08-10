'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteProductAction } from '@/src/admin/lib/product-actions'
import { toast } from 'sonner'
import { Search, Package, Image as ImageIcon, Tag } from 'lucide-react'

export default function ProductListClient({
  initialProducts,
}: {
  initialProducts: any[]
}) {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filteredProducts = products.filter((prod) => {
    return (
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      (prod.category && prod.category.toLowerCase().includes(search.toLowerCase()))
    )
  })

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer le produit "${name}" ?`)) return

    try {
      setDeletingId(id)
      await deleteProductAction(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      toast.success('Produit supprimé avec succès')
      router.refresh()
    } catch (err: any) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Search & Counter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs w-full sm:w-64 focus:outline-none focus:border-[#2271b1] bg-white font-normal"
          />
        </div>
        <span className="text-xs text-[#646970] font-normal">{filteredProducts.length} produit(s)</span>
      </div>

      {/* MOBILE RESPONSIVE CARDS VIEW (< 768px) */}
      <div className="block md:hidden space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
            Aucun produit dans le catalogue.
          </div>
        ) : (
          filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs space-y-3"
            >
              <div className="flex items-start gap-3">
                {prod.cover_url ? (
                  <img
                    src={prod.cover_url}
                    alt={prod.name}
                    className="w-14 h-14 object-cover rounded-sm border border-gray-200 shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded-sm border border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/produits/${prod.id}`}
                    className="font-semibold text-[#2271b1] hover:text-[#135e96] text-sm leading-snug block"
                  >
                    {prod.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-medium text-xs text-[#1d2327]">
                      {prod.price ? `${prod.price.toLocaleString()} FCFA` : 'Sur devis'}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-sm ${
                        prod.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {prod.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#646970]">
                <span className="flex items-center gap-1">
                  <Tag className="h-3 w-3 text-[#2271b1]" />
                  <span>{prod.category || 'Non classé'}</span>
                </span>
                <span>Stock: {prod.stock ?? 0}</span>
              </div>

              <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                <Link
                  href={`/admin/produits/${prod.id}`}
                  className="text-[#2271b1] font-medium hover:underline"
                >
                  Modifier
                </Link>
                <span className="text-[#c3c4c7]">|</span>
                <button
                  type="button"
                  onClick={() => handleDelete(prod.id, prod.name)}
                  disabled={deletingId === prod.id}
                  className="text-[#d63638] font-medium hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE VIEW (>= 768px) */}
      <div className="hidden md:block bg-white border border-[#c3c4c7] rounded-sm overflow-x-auto shadow-sm w-full">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f6f7f7] border-b border-[#c3c4c7] text-[#1d2327] uppercase tracking-wider font-normal">
              <th className="p-3 w-14 text-center">Image</th>
              <th className="p-3 font-normal">Nom du Produit</th>
              <th className="p-3 font-normal">Catégorie</th>
              <th className="p-3 font-normal">Prix</th>
              <th className="p-3 font-normal">Stock</th>
              <th className="p-3 font-normal">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3c4c7]/50 text-[#2c3338]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-xs text-[#646970]">
                  <Package className="h-8 w-8 mx-auto text-[#a7aaad] mb-2" />
                  Aucun produit dans le catalogue.
                </td>
              </tr>
            ) : (
              filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#f0f6fc]/50 transition-colors group font-normal">
                  <td className="p-2 text-center">
                    {prod.cover_url ? (
                      <img
                        src={prod.cover_url}
                        alt=""
                        className="h-9 w-9 object-cover rounded-sm border border-gray-200 mx-auto"
                      />
                    ) : (
                      <div className="h-9 w-9 bg-gray-100 rounded-sm flex items-center justify-center mx-auto text-gray-400">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/admin/produits/${prod.id}`}
                      className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block"
                    >
                      {prod.name}
                    </Link>
                    <div className="flex items-center gap-2 text-[11px] mt-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/produits/${prod.id}`}
                        className="text-[#2271b1] hover:underline font-normal"
                      >
                        Modifier
                      </Link>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(prod.id, prod.name)}
                        disabled={deletingId === prod.id}
                        className="text-[#d63638] hover:underline font-normal"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-[#50575e] font-normal">{prod.category || 'Non classé'}</td>
                  <td className="p-3 font-medium text-[#1d2327]">
                    {prod.price ? `${prod.price.toLocaleString()} FCFA` : 'Sur devis'}
                  </td>
                  <td className="p-3 text-[#50575e] font-normal">{prod.stock ?? 0}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm tracking-wider ${
                        prod.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {prod.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
