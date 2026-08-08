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
} from 'lucide-react'

export const revalidate = 0

export default async function AdminDashboard() {
  let stats = {
    articles: 0,
    services: 0,
    products: 0,
    orders: 0,
    contacts: 0,
  }

  let recentArticles: any[] = []
  let recentContacts: any[] = []
  let recentOrders: any[] = []

  try {
    const supabase = await createServerClient()

    const [
      { count: articlesCount },
      { count: servicesCount },
      { count: productsCount },
      { count: ordersCount },
      { count: contactsCount },
      { data: articlesData },
      { data: contactsData },
      { data: ordersData },
    ] = await Promise.all([
      supabase.from('articles').select('*', { count: 'exact', head: true }),
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('id, title, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('contacts').select('id, name, email, subject, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('orders').select('id, reference, customer_name, total, status, created_at').order('created_at', { ascending: false }).limit(5),
    ])

    stats = {
      articles: articlesCount || 0,
      services: servicesCount || 0,
      products: productsCount || 0,
      orders: ordersCount || 0,
      contacts: contactsCount || 0,
    }

    recentArticles = articlesData || []
    recentContacts = contactsData || []
    recentOrders = ordersData || []
  } catch (err) {
    console.error('Error fetching admin dashboard stats:', err)
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Header Card: White BG, non-bold title */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327]">Tableau de bord</h1>
          <p className="text-xs text-[#646970] font-normal mt-0.5">
            Aperçu général des activités et contenus de votre site ME2I
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

      {/* WordPress Welcome Box */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-5 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <h2 className="text-base font-normal text-[#1d2327]">
            Bienvenue dans votre administration ME2I
          </h2>
          <p className="text-xs text-[#50575e] mt-1.5 leading-relaxed font-normal">
            Gérez vos publications, présentez vos expertises et suivez les demandes de contact ainsi que les commandes clients directement depuis ce panneau de contrôle.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-normal text-[#2271b1]">
            <Link href="/admin/articles" className="hover:underline flex items-center gap-1">
              Gérer les articles &rarr;
            </Link>
            <Link href="/admin/services" className="hover:underline flex items-center gap-1">
              Gérer les services &rarr;
            </Link>
            <Link href="/admin/produits" className="hover:underline flex items-center gap-1">
              Gérer le catalogue &rarr;
            </Link>
            <Link href="/admin/parametres" className="hover:underline flex items-center gap-1">
              Modifier les informations entreprise &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Articles */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 shadow-sm flex flex-col justify-between hover:border-[#2271b1] transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#646970] uppercase tracking-wider">
              Articles
            </span>
            <div className="p-1.5 rounded bg-blue-50 text-[#2271b1]">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.articles}</span>
          </div>
          <Link
            href="/admin/articles"
            className="mt-2 text-xs text-[#2271b1] font-normal flex items-center gap-1 group-hover:underline"
          >
            <span>Voir la liste</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Services */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 shadow-sm flex flex-col justify-between hover:border-[#2271b1] transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#646970] uppercase tracking-wider">
              Services
            </span>
            <div className="p-1.5 rounded bg-purple-50 text-purple-600">
              <Wrench className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.services}</span>
          </div>
          <Link
            href="/admin/services"
            className="mt-2 text-xs text-[#2271b1] font-normal flex items-center gap-1 group-hover:underline"
          >
            <span>Voir la liste</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Produits */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 shadow-sm flex flex-col justify-between hover:border-[#2271b1] transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#646970] uppercase tracking-wider">
              Produits
            </span>
            <div className="p-1.5 rounded bg-amber-50 text-amber-600">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.products}</span>
          </div>
          <Link
            href="/admin/produits"
            className="mt-2 text-xs text-[#2271b1] font-normal flex items-center gap-1 group-hover:underline"
          >
            <span>Voir le catalogue</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Commandes */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 shadow-sm flex flex-col justify-between hover:border-[#2271b1] transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#646970] uppercase tracking-wider">
              Commandes
            </span>
            <div className="p-1.5 rounded bg-emerald-50 text-emerald-600">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.orders}</span>
          </div>
          <Link
            href="/admin/commandes"
            className="mt-2 text-xs text-[#2271b1] font-normal flex items-center gap-1 group-hover:underline"
          >
            <span>Voir les commandes</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Messages */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-3.5 shadow-sm flex flex-col justify-between hover:border-[#2271b1] transition-colors group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-normal text-[#646970] uppercase tracking-wider">
              Messages
            </span>
            <div className="p-1.5 rounded bg-sky-50 text-sky-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-xl font-normal text-[#1d2327]">{stats.contacts}</span>
          </div>
          <Link
            href="/admin/contacts"
            className="mt-2 text-xs text-[#2271b1] font-normal flex items-center gap-1 group-hover:underline"
          >
            <span>Consulter les messages</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Recent Activity Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Messages Widget */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
          <div className="px-4 py-2.5 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#2271b1]" />
              Derniers messages reçus
            </h3>
            <Link
              href="/admin/contacts"
              className="text-xs text-[#2271b1] hover:underline font-normal"
            >
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
                  <div>
                    <p className="text-xs font-normal text-[#1d2327]">{contact.name}</p>
                    <p className="text-[11px] text-[#646970] font-normal truncate max-w-xs">{contact.subject || contact.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded ${
                      contact.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {contact.status === 'unread' ? 'Non lu' : 'Lu'}
                    </span>
                    <p className="text-[10px] text-[#a7aaad] font-normal mt-0.5">
                      {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Articles Widget */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm">
          <div className="px-4 py-2.5 border-b border-[#c3c4c7] bg-[#f6f7f7] flex items-center justify-between">
            <h3 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#2271b1]" />
              Articles récents
            </h3>
            <Link
              href="/admin/articles"
              className="text-xs text-[#2271b1] hover:underline font-normal"
            >
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
                  <span className="text-xs font-normal text-[#1d2327] truncate max-w-sm">
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
