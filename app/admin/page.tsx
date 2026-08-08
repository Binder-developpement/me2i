import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { createServerClient } from '@/src/admin/lib/supabase-server'
import Link from 'next/link'
import {
  FileText,
  Wrench,
  Package,
  ShoppingCart,
  MessageSquare,
  Plus,
  ArrowRight,
  FolderOpen,
  Settings,
  Layers,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
} from 'lucide-react'

export const revalidate = 0

export default async function AdminDashboard() {
  await requireAdminAuth()

  let stats = {
    articles: 0,
    draftArticles: 0,
    publishedArticles: 0,
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
    ])

    const totalArts = articlesCount || 0
    const drafts = draftArticlesCount || 0

    stats = {
      articles: totalArts,
      draftArticles: drafts,
      publishedArticles: totalArts - drafts,
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
  } catch (err) {
    console.error('Error fetching admin dashboard stats:', err)
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Header Card */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327]">Tableau de bord</h1>
          <p className="text-xs text-[#646970] font-normal mt-0.5">
            Aperçu général de l'activité, demandes de contact et contenus de votre site ME2I
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3 py-2 rounded-sm transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nouvel article</span>
          </Link>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#1E3A5F] hover:bg-[#152943] text-white text-xs font-normal px-3 py-2 rounded-sm transition-colors shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nouveau produit</span>
          </Link>
        </div>
      </div>

      {/* Barre d'Accès Rapide */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
        <div className="text-[11px] font-normal text-[#646970] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 text-[#2271b1]" />
          <span>Accès rapide aux fonctionnalités</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-[#2271b1]" />
            <span>Créer un article</span>
          </Link>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-amber-600" />
            <span>Ajouter un produit</span>
          </Link>
          <Link
            href="/admin/services/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-purple-600" />
            <span>Nouveau service</span>
          </Link>
          <Link
            href="/admin/realisations/nouveau"
            className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-blue-600" />
            <span>Ajouter une réalisation</span>
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
          >
            <FolderOpen className="h-3.5 w-3.5 text-emerald-600" />
            <span>Médiathèque</span>
          </Link>
          <Link
            href="/admin/parametres"
            className="inline-flex items-center gap-1.5 bg-[#f6f7f7] hover:bg-[#e0e0e0] text-[#1d2327] border border-[#c3c4c7] text-xs font-normal px-3 py-1.5 rounded-sm transition-colors"
          >
            <Settings className="h-3.5 w-3.5 text-gray-600" />
            <span>Paramètres entreprise</span>
          </Link>
        </div>
      </div>

      {/* Section des Alertes & Éléments Nécessitant une Attention */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Messages non lus */}
        <Link
          href="/admin/contacts"
          className="bg-white border border-[#c3c4c7] hover:border-amber-500 rounded-sm p-3.5 shadow-sm transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-normal text-[#646970]">Messages non lus</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-normal text-[#1d2327]">{stats.unreadContacts}</span>
              <span className="text-[11px] text-[#646970] font-normal">sur {stats.contacts} reçus</span>
            </div>
          </div>
          <div className={`p-2.5 rounded-full ${stats.unreadContacts > 0 ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
            <MessageSquare className="h-5 w-5" />
          </div>
        </Link>

        {/* Commandes reçues / en cours */}
        <Link
          href="/admin/commandes"
          className="bg-white border border-[#c3c4c7] hover:border-emerald-500 rounded-sm p-3.5 shadow-sm transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-normal text-[#646970]">Commandes à traiter</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-normal text-[#1d2327]">{stats.pendingOrders}</span>
              <span className="text-[11px] text-[#646970] font-normal">sur {stats.orders} reçues</span>
            </div>
          </div>
          <div className={`p-2.5 rounded-full ${stats.pendingOrders > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
            <ShoppingCart className="h-5 w-5" />
          </div>
        </Link>

        {/* Articles en Brouillons */}
        <Link
          href="/admin/articles"
          className="bg-white border border-[#c3c4c7] hover:border-blue-500 rounded-sm p-3.5 shadow-sm transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <span className="text-xs font-normal text-[#646970]">Articles en brouillon</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-normal text-[#1d2327]">{stats.draftArticles}</span>
              <span className="text-[11px] text-[#646970] font-normal">sur {stats.articles} articles</span>
            </div>
          </div>
          <div className="p-2.5 rounded-full bg-blue-50 text-[#2271b1]">
            <Clock className="h-5 w-5" />
          </div>
        </Link>
      </div>

      {/* Statistiques Diverses Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Articles */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
          <div className="text-[10px] font-normal text-[#646970] uppercase">Articles</div>
          <div className="text-lg font-normal text-[#1d2327] mt-1">{stats.articles}</div>
          <div className="text-[10px] text-[#646970] mt-0.5">{stats.publishedArticles} publiés</div>
        </div>

        {/* Services */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
          <div className="text-[10px] font-normal text-[#646970] uppercase">Services</div>
          <div className="text-lg font-normal text-[#1d2327] mt-1">{stats.services}</div>
          <div className="text-[10px] text-[#646970] mt-0.5">Offres de maintenance</div>
        </div>

        {/* Produits */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
          <div className="text-[10px] font-normal text-[#646970] uppercase">Catalogue</div>
          <div className="text-lg font-normal text-[#1d2327] mt-1">{stats.products}</div>
          <div className="text-[10px] text-[#646970] mt-0.5">Produits en ligne</div>
        </div>

        {/* Réalisations */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
          <div className="text-[10px] font-normal text-[#646970] uppercase">Réalisations</div>
          <div className="text-lg font-normal text-[#1d2327] mt-1">{stats.realisations}</div>
          <div className="text-[10px] text-[#646970] mt-0.5">Projets documentés</div>
        </div>

        {/* Commandes */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
          <div className="text-[10px] font-normal text-[#646970] uppercase">Commandes</div>
          <div className="text-lg font-normal text-[#1d2327] mt-1">{stats.orders}</div>
          <div className="text-[10px] text-[#646970] mt-0.5">{stats.pendingOrders} en attente</div>
        </div>

        {/* Messages */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm">
          <div className="text-[10px] font-normal text-[#646970] uppercase">Messages</div>
          <div className="text-lg font-normal text-[#1d2327] mt-1">{stats.contacts}</div>
          <div className="text-[10px] text-amber-700 mt-0.5 font-normal">{stats.unreadContacts} non lus</div>
        </div>
      </div>

      {/* Main Grid: Widgets d'activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Messages non lus & récents */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
          <div className="px-4 py-2.5 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#2271b1]" />
              Derniers messages reçus
            </h3>
            <Link href="/admin/contacts" className="text-xs text-[#2271b1] hover:underline font-normal">
              Tout voir
            </Link>
          </div>
          <div className="divide-y divide-[#f0f0f1]">
            {recentContacts.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#646970] font-normal">
                Aucun message reçu pour le moment.
              </div>
            ) : (
              recentContacts.map((contact) => (
                <div key={contact.id} className="p-3 hover:bg-[#f6f7f7] transition-colors flex items-center justify-between">
                  <div className="overflow-hidden pr-2">
                    <p className="text-xs font-normal text-[#1d2327] truncate">{contact.name}</p>
                    <p className="text-[11px] text-[#646970] font-normal truncate">{contact.subject || contact.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded ${
                      contact.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {contact.status === 'unread' ? 'Non lu' : 'Lu'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
          <div className="px-4 py-2.5 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-emerald-600" />
              Commandes reçues
            </h3>
            <Link href="/admin/commandes" className="text-xs text-[#2271b1] hover:underline font-normal">
              Tout voir
            </Link>
          </div>
          <div className="divide-y divide-[#f0f0f1]">
            {recentOrders.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#646970] font-normal">
                Aucune commande reçue pour le moment.
              </div>
            ) : (
              recentOrders.map((ord) => (
                <div key={ord.id} className="p-3 hover:bg-[#f6f7f7] transition-colors flex items-center justify-between">
                  <div className="overflow-hidden pr-2">
                    <p className="text-xs font-normal text-[#1d2327] truncate">{ord.customer_name || ord.reference}</p>
                    <p className="text-[11px] text-emerald-700 font-normal">{ord.total ? `${ord.total.toLocaleString()} FCFA` : 'Sur devis'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded ${
                      ord.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ord.status === 'pending' ? 'En attente' : 'Traitée'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Articles récents */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
          <div className="px-4 py-2.5 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#2271b1]" />
              Articles récents
            </h3>
            <Link href="/admin/articles" className="text-xs text-[#2271b1] hover:underline font-normal">
              Tout voir
            </Link>
          </div>
          <div className="divide-y divide-[#f0f0f1]">
            {recentArticles.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#646970] font-normal">
                Aucun article créé pour le moment.
              </div>
            ) : (
              recentArticles.map((art) => (
                <div key={art.id} className="p-3 hover:bg-[#f6f7f7] transition-colors flex items-center justify-between">
                  <span className="text-xs font-normal text-[#1d2327] truncate max-w-[180px]">
                    {art.title}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-normal rounded ${
                    art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {art.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
