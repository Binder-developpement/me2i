import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import Link from 'next/link'
import QuickDraftWidget from '@/src/admin/components/QuickDraftWidget'
import {
  FileText,
  Wrench,
  Package,
  ShoppingCart,
  MessageSquare,
  Award,
  Plus,
} from 'lucide-react'

export const revalidate = 0

export default async function AdminDashboard() {
  await requireAdminAuth()

  let stats = {
    articles: 0,
    draftArticles: 0,
    services: 0,
    products: 0,
    orders: 0,
    pendingOrders: 0,
    contacts: 0,
    unreadContacts: 0,
    realisations: 0,
  }

  let recentArticles: any[] = []
  let recentContacts: any[] = []
  let recentOrders: any[] = []
  let draftArticlesList: any[] = []

  try {
    const supabase = await createServerClient()

    const [
      { count: articlesCount },
      { count: draftArticlesCount },
      { count: servicesCount },
      { count: productsCount },
      { count: ordersCount },
      { count: pendingOrdersCount },
      { count: contactsCount },
      { count: unreadContactsCount },
      { count: realisationsCount },
      { data: articlesData },
      { data: contactsData },
      { data: ordersData },
      { data: draftsData },
    ] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }).neq('status', 'completed'),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
      supabase.from('realisations').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('contacts').select('id, name, email, subject, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('orders').select('id, reference, customer_name, total, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('articles').select('id, title, created_at').eq('status', 'draft').order('created_at', { ascending: false }).limit(3),
    ])

    stats = {
      articles: articlesCount || 0,
      draftArticles: draftArticlesCount || 0,
      services: servicesCount || 0,
      products: productsCount || 0,
      orders: ordersCount || 0,
      pendingOrders: pendingOrdersCount || 0,
      contacts: contactsCount || 0,
      unreadContacts: unreadContactsCount || 0,
      realisations: realisationsCount || 0,
    }

    recentArticles = articlesData || []
    recentContacts = contactsData || []
    recentOrders = ordersData || []
    draftArticlesList = draftsData || []
  } catch (err) {
    console.error('Error fetching admin dashboard stats:', err)
  }

  return (
    <div className="space-y-4 w-full">
      {/* WordPress Top Header Card */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327]">Tableau de bord</h1>
          <p className="text-xs text-[#646970] font-normal mt-0.5">
            Bienvenue dans l'administration ME2I
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Créer un article</span>
          </Link>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#1E3A5F] hover:bg-[#152943] text-white text-xs font-normal px-3 py-1.5 rounded-sm transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nouveau produit</span>
          </Link>
        </div>
      </div>

      {/* WordPress 2-Column Dashboard Meta Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Meta Box: D'un coup d'œil */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7]">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                D'un coup d'œil
              </h2>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3 text-xs text-[#2c3338] font-normal">
              <div className="space-y-2">
                <Link href="/admin/articles" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <FileText className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.articles}</strong> Article(s)</span>
                </Link>
                <Link href="/admin/services" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <Wrench className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.services}</strong> Service(s)</span>
                </Link>
                <Link href="/admin/produits" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <Package className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.products}</strong> Produit(s)</span>
                </Link>
              </div>

              <div className="space-y-2">
                <Link href="/admin/realisations" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <Award className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.realisations}</strong> Réalisation(s)</span>
                </Link>
                <Link href="/admin/contacts" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <MessageSquare className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.contacts}</strong> Message(s) {stats.unreadContacts > 0 && <span className="text-amber-700 font-normal">({stats.unreadContacts} non lu)</span>}</span>
                </Link>
                <Link href="/admin/commandes" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <ShoppingCart className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.orders}</strong> Commande(s) {stats.pendingOrders > 0 && <span className="text-emerald-700 font-normal">({stats.pendingOrders} en cours)</span>}</span>
                </Link>
              </div>
            </div>

            <div className="px-4 py-2 bg-[#f6f7f7] border-t border-[#f0f0f1] text-[11px] text-[#646970] font-normal">
              ME2I Maintenance &amp; Énergie — Next.js avec Supabase Database
            </div>
          </div>

          {/* Meta Box: Activité */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                Activité
              </h2>
              <span className="text-[11px] text-[#646970] font-normal">Récemment publié &amp; reçu</span>
            </div>

            {/* Sub-section: Messages récents */}
            <div className="p-4 space-y-3 border-b border-[#f0f0f1]">
              <div className="text-[11px] font-normal text-[#646970] uppercase tracking-wider">
                Derniers messages clients
              </div>
              {recentContacts.length === 0 ? (
                <p className="text-xs text-[#646970] font-normal">Aucun message reçu pour le moment.</p>
              ) : (
                <div className="space-y-2">
                  {recentContacts.map((c) => (
                    <div key={c.id} className="flex items-center justify-between text-xs py-1 border-b border-[#f6f7f7] last:border-0 font-normal">
                      <div className="truncate max-w-[240px]">
                        <Link href="/admin/contacts" className="text-[#2271b1] hover:underline">
                          {c.name}
                        </Link>
                        <span className="text-[#646970] ml-2 text-[11px] truncate">
                          {c.subject || c.email}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] rounded ${
                        c.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {c.status === 'unread' ? 'Non lu' : 'Lu'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub-section: Articles publiés récemment */}
            <div className="p-4 space-y-3">
              <div className="text-[11px] font-normal text-[#646970] uppercase tracking-wider">
                Articles récents
              </div>
              {recentArticles.length === 0 ? (
                <p className="text-xs text-[#646970] font-normal">Aucun article créé.</p>
              ) : (
                <div className="space-y-2">
                  {recentArticles.map((a) => (
                    <div key={a.id} className="flex items-center justify-between text-xs py-1 border-b border-[#f6f7f7] last:border-0 font-normal">
                      <Link href={`/admin/articles/${a.id}`} className="text-[#2271b1] hover:underline truncate max-w-[240px]">
                        {a.title}
                      </Link>
                      <span className={`px-2 py-0.5 text-[10px] rounded ${
                        a.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {a.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Meta Box: Brouillon rapide */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7]">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                Brouillon rapide
              </h2>
            </div>

            <QuickDraftWidget />

            {draftArticlesList.length > 0 && (
              <div className="p-4 bg-[#f6f7f7] border-t border-[#c3c4c7] space-y-2 text-xs font-normal">
                <div className="text-[11px] text-[#646970] uppercase tracking-wider">
                  Brouillons récents :
                </div>
                {draftArticlesList.map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <Link href={`/admin/articles/${d.id}`} className="text-[#2271b1] hover:underline truncate max-w-[220px]">
                      {d.title}
                    </Link>
                    <span className="text-[10px] text-[#a7aaad]">
                      {new Date(d.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Meta Box: Dernières commandes reçues */}
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                Commandes reçues
              </h2>
              <Link href="/admin/commandes" className="text-xs text-[#2271b1] hover:underline font-normal">
                Tout voir
              </Link>
            </div>

            <div className="p-4 space-y-2 text-xs font-normal">
              {recentOrders.length === 0 ? (
                <p className="text-xs text-[#646970] font-normal">Aucune commande pour le moment.</p>
              ) : (
                recentOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-1.5 border-b border-[#f6f7f7] last:border-0">
                    <div>
                      <Link href={`/admin/commandes/${o.id}`} className="text-[#2271b1] hover:underline">
                        {o.customer_name || o.reference}
                      </Link>
                      <p className="text-[11px] text-[#646970]">
                        {o.total ? `${o.total.toLocaleString()} FCFA` : 'Sur devis'}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] rounded ${
                      o.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {o.status === 'pending' ? 'En attente' : 'Traitée'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
