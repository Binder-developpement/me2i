import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import Link from 'next/link'
import QuickDraftWidget from '@/src/admin/components/QuickDraftWidget'
import DashboardAnalyticsWidget from '@/src/admin/components/DashboardAnalyticsWidget'
import {
  FileText,
  Wrench,
  Package,
  ShoppingCart,
  MessageSquare,
  Award,
  Plus,
  FolderOpen,
  Settings,
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
      <div className="bg-white border border-slate-200/80 rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327]">Tableau de bord</h1>
          <p className="text-xs text-[#646970] font-normal mt-0.5">
            Bienvenue dans l'administration MCI
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

      {/* Cards Overview juste après le Header */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Articles */}
        <Link
          href="/admin/articles"
          className="bg-white border border-slate-200/80 hover:border-[#2271b1] rounded-sm p-3.5 shadow-sm transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal text-[#646970] uppercase">Articles</span>
            <FileText className="h-4 w-4 text-[#2271b1]" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.articles}</span>
          </div>
          <div className="text-[10px] text-[#646970] mt-1 font-normal">
            {stats.draftArticles > 0 ? `${stats.draftArticles} brouillon(s)` : 'Tous publiés'}
          </div>
        </Link>

        {/* Services */}
        <Link
          href="/admin/services"
          className="bg-white border border-slate-200/80 hover:border-[#2271b1] rounded-sm p-3.5 shadow-sm transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal text-[#646970] uppercase">Services</span>
            <Wrench className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.services}</span>
          </div>
          <div className="text-[10px] text-[#646970] mt-1 font-normal">
            Services actifs
          </div>
        </Link>

        {/* Produits */}
        <Link
          href="/admin/produits"
          className="bg-white border border-slate-200/80 hover:border-[#2271b1] rounded-sm p-3.5 shadow-sm transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal text-[#646970] uppercase">Produits</span>
            <Package className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.products}</span>
          </div>
          <div className="text-[10px] text-[#646970] mt-1 font-normal">
            En catalogue
          </div>
        </Link>

        {/* Réalisations */}
        <Link
          href="/admin/realisations"
          className="bg-white border border-slate-200/80 hover:border-[#2271b1] rounded-sm p-3.5 shadow-sm transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal text-[#646970] uppercase">Réalisations</span>
            <Award className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.realisations}</span>
          </div>
          <div className="text-[10px] text-[#646970] mt-1 font-normal">
            Projets client
          </div>
        </Link>

        {/* Commandes */}
        <Link
          href="/admin/commandes"
          className="bg-white border border-slate-200/80 hover:border-[#2271b1] rounded-sm p-3.5 shadow-sm transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal text-[#646970] uppercase">Commandes</span>
            <ShoppingCart className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.orders}</span>
          </div>
          <div className="text-[10px] text-emerald-700 mt-1 font-normal">
            {stats.pendingOrders > 0 ? `${stats.pendingOrders} en cours` : 'Aucune en cours'}
          </div>
        </Link>

        {/* Messages */}
        <Link
          href="/admin/contacts"
          className="bg-white border border-slate-200/80 hover:border-[#2271b1] rounded-sm p-3.5 shadow-sm transition-colors group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-normal text-[#646970] uppercase">Messages</span>
            <MessageSquare className="h-4 w-4 text-sky-600" />
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.contacts}</span>
          </div>
          <div className="text-[10px] text-amber-700 mt-1 font-normal">
            {stats.unreadContacts > 0 ? `${stats.unreadContacts} non lu(s)` : 'Tous lus'}
          </div>
        </Link>
      </div>

      {/* WordPress 2-Column Dashboard Meta Boxes: Left 3/4 (lg:col-span-3), Right 1/4 (lg:col-span-1) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* LEFT COLUMN: 3/4 Width (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Meta Box: D'un coup d'œil */}
          <div className="bg-white border border-slate-200/80 rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-slate-200/80">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                D'un coup d'œil
              </h2>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#2c3338] font-normal">
              <div className="space-y-2">
                <Link href="/admin/articles" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <FileText className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.articles}</strong> Article(s) ({stats.draftArticles} brouillon)</span>
                </Link>
                <Link href="/admin/services" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <Wrench className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.services}</strong> Service(s) d'expertise</span>
                </Link>
              </div>

              <div className="space-y-2">
                <Link href="/admin/produits" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <Package className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.products}</strong> Produit(s) en catalogue</span>
                </Link>
                <Link href="/admin/realisations" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <Award className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.realisations}</strong> Réalisation(s) documentée(s)</span>
                </Link>
              </div>

              <div className="space-y-2">
                <Link href="/admin/contacts" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <MessageSquare className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.contacts}</strong> Message(s) client</span>
                </Link>
                <Link href="/admin/commandes" className="flex items-center gap-2 text-[#2271b1] hover:underline">
                  <ShoppingCart className="h-4 w-4 text-[#8c8f94]" />
                  <span><strong>{stats.orders}</strong> Commande(s) et devis</span>
                </Link>
              </div>
            </div>

            <div className="px-4 py-2 bg-[#f6f7f7] border-t border-[#f0f0f1] text-[11px] text-[#646970] font-normal">
              MCI Maintenance et Énergie : Propulsé par Next.js et Supabase Database
            </div>
          </div>

          {/* Meta Box: Activité Récente */}
          <div className="bg-white border border-slate-200/80 rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-slate-200/80 flex items-center justify-between">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                Activité récente
              </h2>
              <span className="text-[11px] text-[#646970] font-normal">Flux des messages et commandes</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#f0f0f1]">
              {/* Messages récents */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-normal text-[#646970] uppercase tracking-wider">
                    Derniers messages reçus
                  </span>
                  <Link href="/admin/contacts" className="text-xs text-[#2271b1] hover:underline font-normal">
                    Voir tout
                  </Link>
                </div>

                {recentContacts.length === 0 ? (
                  <p className="text-xs text-[#646970] font-normal py-4">Aucun message pour le moment.</p>
                ) : (
                  <div className="space-y-2">
                    {recentContacts.map((c) => (
                      <div key={c.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#f6f7f7] last:border-0 font-normal">
                        <div className="truncate max-w-[200px]">
                          <Link href="/admin/contacts" className="text-[#2271b1] hover:underline">
                            {c.name}
                          </Link>
                          <p className="text-[11px] text-[#646970] truncate">
                            {c.subject || c.email}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] rounded shrink-0 ${
                          c.status === 'unread' ? 'bg-amber-100 text-amber-800 font-normal' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {c.status === 'unread' ? 'Non lu' : 'Lu'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Commandes récentes */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-normal text-[#646970] uppercase tracking-wider">
                    Dernières commandes
                  </span>
                  <Link href="/admin/commandes" className="text-xs text-[#2271b1] hover:underline font-normal">
                    Voir tout
                  </Link>
                </div>

                {recentOrders.length === 0 ? (
                  <p className="text-xs text-[#646970] font-normal py-4">Aucune commande reçue.</p>
                ) : (
                  <div className="space-y-2">
                    {recentOrders.map((o) => (
                      <div key={o.id} className="flex items-center justify-between text-xs py-1.5 border-b border-[#f6f7f7] last:border-0 font-normal">
                        <div>
                          <Link href={`/admin/commandes/${o.id}`} className="text-[#2271b1] hover:underline">
                            {o.customer_name || o.reference}
                          </Link>
                          <p className="text-[11px] text-[#646970]">
                            {o.total ? `${o.total.toLocaleString()} FCFA` : 'Sur devis'}
                          </p>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] rounded shrink-0 ${
                          o.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {o.status === 'pending' ? 'En attente' : 'Traitée'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 1/4 Width (lg:col-span-1) with Analytics & Quick Draft */}
        <div className="lg:col-span-1 space-y-4">
          {/* Analytics & Metrics Cards */}
          <DashboardAnalyticsWidget
            contactsCount={stats.contacts}
            unreadContactsCount={stats.unreadContacts}
            ordersCount={stats.orders}
            pendingOrdersCount={stats.pendingOrders}
            articlesCount={stats.articles}
            productsCount={stats.products}
            servicesCount={stats.services}
            realisationsCount={stats.realisations}
          />

          {/* Meta Box: Brouillon rapide */}
          <div className="bg-white border border-slate-200/80 rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-slate-200/80">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                Brouillon rapide
              </h2>
            </div>

            <QuickDraftWidget />

            {draftArticlesList.length > 0 && (
              <div className="p-3 bg-[#f6f7f7] border-t border-slate-200/80 space-y-2 text-xs font-normal">
                <div className="text-[10px] text-[#646970] uppercase tracking-wider">
                  Brouillons récents :
                </div>
                {draftArticlesList.map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <Link href={`/admin/articles/${d.id}`} className="text-[#2271b1] hover:underline truncate max-w-[140px]">
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

          {/* Meta Box: Raccourcis Rapides */}
          <div className="bg-white border border-slate-200/80 rounded-sm shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-slate-200/80">
              <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
                Raccourcis rapides
              </h2>
            </div>

            <div className="p-3 space-y-2 text-xs font-normal">
              <Link href="/admin/media" className="flex items-center gap-2 text-[#2271b1] hover:underline py-1">
                <FolderOpen className="h-4 w-4 text-[#8c8f94]" />
                <span>Médiathèque système</span>
              </Link>
              <Link href="/admin/parametres" className="flex items-center gap-2 text-[#2271b1] hover:underline py-1">
                <Settings className="h-4 w-4 text-[#8c8f94]" />
                <span>Informations entreprise</span>
              </Link>
              <Link href="/admin/realisations/nouveau" className="flex items-center gap-2 text-[#2271b1] hover:underline py-1">
                <Award className="h-4 w-4 text-[#8c8f94]" />
                <span>Ajouter une réalisation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
