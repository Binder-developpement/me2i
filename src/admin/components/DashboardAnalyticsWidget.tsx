'use client'

import { TrendingUp, MessageSquare, ShoppingCart, Activity } from 'lucide-react'

interface AnalyticsProps {
  contactsCount: number
  unreadContactsCount: number
  ordersCount: number
  pendingOrdersCount: number
  articlesCount: number
  productsCount: number
  servicesCount: number
  realisationsCount: number
}

export default function DashboardAnalyticsWidget({
  contactsCount,
  unreadContactsCount,
  ordersCount,
  pendingOrdersCount,
  articlesCount,
  productsCount,
  servicesCount,
  realisationsCount,
}: AnalyticsProps) {
  // Weekly simulation data for visual sparklines
  const weeklyData = [12, 18, 14, 25, 32, 28, 40]
  const maxVal = Math.max(...weeklyData)

  const totalCatalog = productsCount + servicesCount + realisationsCount
  const servicesPct = totalCatalog > 0 ? Math.round((servicesCount / totalCatalog) * 100) : 35
  const productsPct = totalCatalog > 0 ? Math.round((productsCount / totalCatalog) * 100) : 45
  const realisationsPct = 100 - (servicesPct + productsPct)

  const responseRate = contactsCount > 0 
    ? Math.round(((contactsCount - unreadContactsCount) / contactsCount) * 100)
    : 100

  return (
    <div className="space-y-4">
      {/* Card 1: Activité Hebdomadaire & Demandes */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7] flex items-center justify-between">
          <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327] flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-[#2271b1]" />
            <span>Tendances de l'activité</span>
          </h2>
          <span className="text-[10px] text-emerald-700 font-normal flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />
            +18.5%
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-end justify-between h-20 pt-2 px-1">
            {weeklyData.map((val, idx) => {
              const heightPct = Math.round((val / maxVal) * 100)
              const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
              return (
                <div key={idx} className="flex flex-col items-center gap-1 w-6">
                  <div className="w-full bg-blue-50 rounded-t-sm flex items-end h-14 overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-[#2271b1] hover:bg-[#135e96] transition-all rounded-t-sm"
                      title={`${val} interactions`}
                    />
                  </div>
                  <span className="text-[9px] text-[#646970] font-normal">{days[idx]}</span>
                </div>
              )
            })}
          </div>

          <div className="pt-2 border-t border-[#f0f0f1] flex items-center justify-between text-xs text-[#2c3338] font-normal">
            <div>
              <span className="text-[10px] text-[#646970] block">Demandes reçues</span>
              <span className="font-medium text-[#1d2327]">{contactsCount + ordersCount}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#646970] block">Taux de réponse</span>
              <span className="font-medium text-emerald-700">{responseRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Répartition des Offres & Réalisations */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-sm overflow-hidden">
        <div className="px-4 py-2.5 bg-[#f6f7f7] border-b border-[#c3c4c7]">
          <h2 className="text-xs font-normal uppercase tracking-wider text-[#1d2327]">
            Répartition du catalogue
          </h2>
        </div>

        <div className="p-4 space-y-3">
          {/* Progress Bar Multi-Color */}
          <div className="h-3 w-full bg-gray-100 rounded-sm overflow-hidden flex">
            <div style={{ width: `${servicesPct}%` }} className="bg-purple-600 h-full" title={`Services: ${servicesPct}%`} />
            <div style={{ width: `${productsPct}%` }} className="bg-amber-500 h-full" title={`Produits: ${productsPct}%`} />
            <div style={{ width: `${realisationsPct}%` }} className="bg-blue-600 h-full" title={`Réalisations: ${realisationsPct}%`} />
          </div>

          {/* Legend */}
          <div className="space-y-1.5 text-xs text-[#2c3338] font-normal">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-600" />
                <span>Services de maintenance</span>
              </div>
              <span className="font-mono text-[11px] text-[#646970]">{servicesCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Équipements &amp; Produits</span>
              </div>
              <span className="font-mono text-[11px] text-[#646970]">{productsCount}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>Projets documentés</span>
              </div>
              <span className="font-mono text-[11px] text-[#646970]">{realisationsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
