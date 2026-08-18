'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  createUserAction,
  updateUserAction,
  deleteUserAction,
  toggleUserStatusAction,
} from '@/src/admin/lib/user-actions'
import { AdminUser, UserRole, UserStatus } from '@/src/admin/lib/types'
import { toast } from 'sonner'
import {
  Search,
  UserPlus,
  Users,
  ShieldCheck,
  Shield,
  Edit,
  Trash2,
  List,
  LayoutGrid,
  CheckCircle2,
  XCircle,
  Key,
  Mail,
  Phone,
  Calendar,
  Lock,
  UserCheck,
  UserX,
  X,
  Loader2,
  Check,
} from 'lucide-react'

export default function UserListClient({
  initialUsers,
}: {
  initialUsers: AdminUser[]
}) {
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>(initialUsers)
  const [activeMainTab, setActiveMainTab] = useState<'users' | 'roles' | 'security'>('users')
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'active' | 'inactive' | UserRole>('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [search, setSearch] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states for creation
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: 'editor' as UserRole,
    status: 'active' as UserStatus,
    password: '',
  })

  // Filter users by search and tab status/role
  const filteredUsers = users.filter((u) => {
    let matchesTab = true
    if (activeStatusFilter === 'active') matchesTab = u.status === 'active'
    else if (activeStatusFilter === 'inactive') matchesTab = u.status !== 'active'
    else if (
      activeStatusFilter === 'super_admin' ||
      activeStatusFilter === 'admin' ||
      activeStatusFilter === 'editor' ||
      activeStatusFilter === 'manager'
    ) {
      matchesTab = u.role === activeStatusFilter
    }

    const matchesSearch =
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.phone && u.phone.toLowerCase().includes(search.toLowerCase()))

    return matchesTab && matchesSearch
  })

  // Role Badge Helper
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-100 text-purple-800 border border-purple-300 shrink-0">
            <ShieldCheck className="h-3 w-3 text-purple-600" />
            Super Admin
          </span>
        )
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800 border border-blue-300 shrink-0">
            <Shield className="h-3 w-3 text-blue-600" />
            Administrateur
          </span>
        )
      case 'editor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
            <Edit className="h-3 w-3 text-emerald-600" />
            Éditeur
          </span>
        )
      case 'manager':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
            <UserCheck className="h-3 w-3 text-amber-600" />
            Gestionnaire
          </span>
        )
      default:
        return <span className="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-800 rounded-sm">{role}</span>
    }
  }

  // Handle Create User
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.full_name || !formData.email) {
      toast.error('Le nom et l\'adresse e-mail sont obligatoires')
      return
    }

    try {
      setIsSubmitting(true)
      const created = await createUserAction({
        email: formData.email,
        full_name: formData.full_name,
        role: formData.role,
        status: formData.status,
        phone: formData.phone,
      })

      setUsers((prev) => [created, ...prev])
      toast.success(`L'utilisateur "${created.full_name}" a été créé avec succès`)
      setIsCreateModalOpen(false)
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        role: 'editor',
        status: 'active',
        password: '',
      })
      router.refresh()
    } catch (err: any) {
      toast.error(err?.message || 'Erreur lors de la création de l\'utilisateur')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Update User
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    try {
      setIsSubmitting(true)
      const updated = await updateUserAction(editingUser.id, {
        full_name: editingUser.full_name,
        email: editingUser.email,
        phone: editingUser.phone,
        role: editingUser.role,
        status: editingUser.status,
      })

      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      toast.success(`Informations de "${updated.full_name}" mises à jour`)
      setEditingUser(null)
      router.refresh()
    } catch (err: any) {
      toast.error(err?.message || 'Erreur lors de la mise à jour')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Toggle Status (Active / Inactive)
  const handleToggleStatus = async (user: AdminUser) => {
    const nextStatus: UserStatus = user.status === 'active' ? 'inactive' : 'active'
    try {
      setLoadingId(user.id)
      const updated = await toggleUserStatusAction(user.id, nextStatus)
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
      toast.success(
        `Statut de "${user.full_name}" changé en ${nextStatus === 'active' ? 'Actif' : 'Inactif'
        }`
      )
      router.refresh()
    } catch (err) {
      toast.error('Erreur lors du changement de statut')
    } finally {
      setLoadingId(null)
    }
  }

  // Handle Delete User
  const handleDelete = async (user: AdminUser) => {
    if (!confirm(`Voulez-vous vraiment supprimer l'utilisateur "${user.full_name}" ?`)) return

    try {
      setLoadingId(user.id)
      await deleteUserAction(user.id)
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
      toast.success(`L'utilisateur "${user.full_name}" a été supprimé`)
      router.refresh()
    } catch (err) {
      toast.error('Erreur lors de la suppression')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Top Main Page Banner */}
      <div className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-normal text-[#1d2327] flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2271b1]" />
            Administration &amp; Utilisateurs
          </h1>
          <p className="text-xs text-[#646970] font-normal mt-0.5">
            Gérez les comptes utilisateurs, l'attribution des rôles et les privilèges d'accès au système
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-normal px-3.5 py-2 rounded-sm transition-colors shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          <span>Nouvel Utilisateur</span>
        </button>
      </div>

      {/* Main Navigation Tabs (Utilisateurs | Rôles & Permissions | Sécurité) */}
      <div className="border-b border-[#c3c4c7] flex items-center gap-4 text-xs font-normal text-[#1d2327]">
        <button
          type="button"
          onClick={() => setActiveMainTab('users')}
          className={`pb-2.5 px-2 flex items-center gap-2 border-b-2 transition-colors ${activeMainTab === 'users'
              ? 'border-[#2271b1] text-[#2271b1] font-semibold'
              : 'border-transparent text-[#50575e] hover:text-[#2271b1]'
            }`}
        >
          <Users className="h-4 w-4" />
          <span>Utilisateurs ({users.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab('roles')}
          className={`pb-2.5 px-2 flex items-center gap-2 border-b-2 transition-colors ${activeMainTab === 'roles'
              ? 'border-[#2271b1] text-[#2271b1] font-semibold'
              : 'border-transparent text-[#50575e] hover:text-[#2271b1]'
            }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Rôles &amp; Permissions</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab('security')}
          className={`pb-2.5 px-2 flex items-center gap-2 border-b-2 transition-colors ${activeMainTab === 'security'
              ? 'border-[#2271b1] text-[#2271b1] font-semibold'
              : 'border-transparent text-[#50575e] hover:text-[#2271b1]'
            }`}
        >
          <Lock className="h-4 w-4" />
          <span>Sécurité &amp; Audit</span>
        </button>
      </div>

      {/* TAB 1: UTILISATEURS */}
      {activeMainTab === 'users' && (
        <div className="space-y-4 w-full">
          {/* Sub-toolbar: Status/Role Filters + Search + View Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#c3c4c7] rounded-sm p-3 shadow-sm w-full">
            {/* Horizontal Scroll Filter Tabs (Hidden scrollbar on mobile) */}
            <div className="flex items-center gap-2 text-xs border-b border-[#c3c4c7] sm:border-b-0 pb-2 sm:pb-0 select-none overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full whitespace-nowrap shrink-0">
              <button
                type="button"
                onClick={() => setActiveStatusFilter('all')}
                className={`pb-1 px-1 font-normal transition-colors ${activeStatusFilter === 'all'
                    ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                    : 'text-[#2271b1] hover:text-[#135e96]'
                  }`}
              >
                Tous <span className="text-[#646970]">({users.length})</span>
              </button>
              <span className="text-[#c3c4c7]">|</span>
              <button
                type="button"
                onClick={() => setActiveStatusFilter('active')}
                className={`pb-1 px-1 font-normal transition-colors ${activeStatusFilter === 'active'
                    ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                    : 'text-[#2271b1] hover:text-[#135e96]'
                  }`}
              >
                Actifs <span className="text-[#646970]">({users.filter((u) => u.status === 'active').length})</span>
              </button>
              <span className="text-[#c3c4c7]">|</span>
              <button
                type="button"
                onClick={() => setActiveStatusFilter('super_admin')}
                className={`pb-1 px-1 font-normal transition-colors ${activeStatusFilter === 'super_admin'
                    ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                    : 'text-[#2271b1] hover:text-[#135e96]'
                  }`}
              >
                Super Admin <span className="text-[#646970]">({users.filter((u) => u.role === 'super_admin').length})</span>
              </button>
              <span className="text-[#c3c4c7]">|</span>
              <button
                type="button"
                onClick={() => setActiveStatusFilter('admin')}
                className={`pb-1 px-1 font-normal transition-colors ${activeStatusFilter === 'admin'
                    ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                    : 'text-[#2271b1] hover:text-[#135e96]'
                  }`}
              >
                Admins <span className="text-[#646970]">({users.filter((u) => u.role === 'admin').length})</span>
              </button>
              <span className="text-[#c3c4c7]">|</span>
              <button
                type="button"
                onClick={() => setActiveStatusFilter('editor')}
                className={`pb-1 px-1 font-normal transition-colors ${activeStatusFilter === 'editor'
                    ? 'text-[#1d2327] border-b-2 border-[#2271b1]'
                    : 'text-[#2271b1] hover:text-[#135e96]'
                  }`}
              >
                Éditeurs <span className="text-[#646970]">({users.filter((u) => u.role === 'editor').length})</span>
              </button>
            </div>

            {/* Controls Right: Search + View Switcher */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end shrink-0">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#8c8f94]" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                />
              </div>

              {/* View Switcher */}
              <div className="flex items-center border border-[#8c8f94] rounded-sm overflow-hidden bg-white shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 flex items-center gap-1 text-xs font-normal transition-colors ${viewMode === 'table' ? 'bg-[#2271b1] text-white' : 'text-[#50575e] hover:bg-[#f0f0f1]'
                    }`}
                  title="Vue Tableau"
                >
                  <List className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Tableau</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 flex items-center gap-1 text-xs font-normal transition-colors ${viewMode === 'cards' ? 'bg-[#2271b1] text-white' : 'text-[#50575e] hover:bg-[#f0f0f1]'
                    }`}
                  title="Vue Cartes"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Cartes</span>
                </button>
              </div>
            </div>
          </div>

          {/* VIEW RENDER: CARDS VIEW */}
          {viewMode === 'cards' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.length === 0 ? (
                <div className="col-span-full bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
                  Aucun utilisateur trouvé.
                </div>
              ) : (
                filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#1E3A5F] text-white font-medium text-sm flex items-center justify-center shrink-0 border border-[#2271b1]">
                            {u.full_name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#1d2327] leading-snug">{u.full_name}</p>
                            <p className="text-xs text-[#646970] font-normal flex items-center gap-1 mt-0.5">
                              <Mail className="h-3 w-3 text-[#8c8f94]" />
                              <span>{u.email}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-2 border-t border-[#f0f0f1]">
                        <div>{getRoleBadge(u.role)}</div>

                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm ${u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {u.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                      <button
                        type="button"
                        onClick={() => setEditingUser(u)}
                        className="text-[#2271b1] font-medium hover:underline"
                      >
                        Modifier
                      </button>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(u)}
                        disabled={loadingId === u.id}
                        className="text-[#2271b1] font-medium hover:underline"
                      >
                        {u.status === 'active' ? 'Désactiver' : 'Activer'}
                      </button>
                      <span className="text-[#c3c4c7]">|</span>
                      <button
                        type="button"
                        onClick={() => handleDelete(u)}
                        disabled={loadingId === u.id}
                        className="text-red-600 font-medium hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* DEFAULT VIEW MODE ('table'): Automatic Mobile Cards (< 768px), Desktop Table (>= 768px) */
            <>
              {/* MOBILE RESPONSIVE CARDS VIEW (< 768px) */}
              <div className="block md:hidden space-y-3">
                {filteredUsers.length === 0 ? (
                  <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 text-center text-xs text-[#646970]">
                    Aucun utilisateur trouvé.
                  </div>
                ) : (
                  filteredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="bg-white border border-[#c3c4c7] rounded-sm p-4 shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1E3A5F] text-white font-medium text-xs flex items-center justify-center shrink-0">
                            {u.full_name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#1d2327]">{u.full_name}</p>
                            <p className="text-xs text-[#646970] font-normal">{u.email}</p>
                          </div>
                        </div>
                        <div>{getRoleBadge(u.role)}</div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#646970] pt-1">
                        <span>Statut:</span>
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded-sm ${u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {u.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#f0f0f1] flex items-center gap-3 text-xs">
                        <button
                          type="button"
                          onClick={() => setEditingUser(u)}
                          className="text-[#2271b1] font-medium hover:underline"
                        >
                          Modifier
                        </button>
                        <span className="text-[#c3c4c7]">|</span>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u)}
                          disabled={loadingId === u.id}
                          className="text-[#2271b1] font-medium hover:underline"
                        >
                          {u.status === 'active' ? 'Désactiver' : 'Activer'}
                        </button>
                        <span className="text-[#c3c4c7]">|</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(u)}
                          disabled={loadingId === u.id}
                          className="text-red-600 font-medium hover:underline"
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
                      <th className="p-3 font-normal">Utilisateur / E-mail</th>
                      <th className="p-3 font-normal">Téléphone</th>
                      <th className="p-3 font-normal">Rôle Attribué</th>
                      <th className="p-3 font-normal">Statut</th>
                      <th className="p-3 font-normal">Dernière Connexion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c3c4c7]/50 text-[#2c3338]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-xs text-[#646970]">
                          Aucun utilisateur trouvé.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#f0f6fc]/50 transition-colors group font-normal">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1E3A5F] text-white font-medium text-xs flex items-center justify-center shrink-0">
                                {u.full_name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>
                              <div>
                                <p className="font-normal text-[#2271b1] hover:text-[#135e96] text-sm block">
                                  {u.full_name}
                                </p>
                                <p className="text-[11px] text-[#646970] font-normal">{u.email}</p>
                              </div>
                            </div>

                            {/* Hover Action Bar */}
                            <div className="flex items-center gap-2 text-xs font-medium mt-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity pl-11">
                              <button
                                type="button"
                                onClick={() => setEditingUser(u)}
                                className="text-[#2271b1] hover:underline font-normal"
                              >
                                Modifier
                              </button>
                              <span className="text-[#c3c4c7]">|</span>
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(u)}
                                disabled={loadingId === u.id}
                                className="text-[#2271b1] hover:underline font-normal"
                              >
                                {u.status === 'active' ? 'Désactiver' : 'Activer'}
                              </button>
                              <span className="text-[#c3c4c7]">|</span>
                              <button
                                type="button"
                                onClick={() => handleDelete(u)}
                                disabled={loadingId === u.id}
                                className="text-[#d63638] hover:underline font-normal"
                              >
                                Supprimer
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-[#50575e] font-normal">{u.phone || '-'}</td>
                          <td className="p-3">{getRoleBadge(u.role)}</td>
                          <td className="p-3">
                            <span
                              className={`inline-block px-2 py-0.5 text-[10px] font-normal rounded-sm ${u.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                                }`}
                            >
                              {u.status === 'active' ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="p-3 text-[#646970] font-normal">
                            {u.last_login
                              ? new Date(u.last_login).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                              : 'Jamais'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: ROLES & PERMISSIONS */}
      {activeMainTab === 'roles' && (
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-6 w-full">
          <div>
            <h2 className="text-sm font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#2271b1]" />
              Matrice des Rôles &amp; Privilèges Système
            </h2>
            <p className="text-xs text-[#646970] mt-1 font-normal">
              Les rôles définissent les autorisations d'accès et les fonctionnalités accessibles par les collaborateurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Super Admin Card */}
            <div className="border border-purple-200 bg-purple-50/50 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-purple-100 text-purple-900 border border-purple-300 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-purple-700" />
                  Super Administrateur
                </span>
                <span className="text-[11px] text-purple-700 font-mono">Privilège Maximal</span>
              </div>
              <p className="text-xs text-[#2c3338] leading-relaxed font-normal">
                Accès illimité à l'ensemble du système, gestion complète des utilisateurs, attribution des rôles, paramètres système et corbeille.
              </p>
              <ul className="text-xs text-[#50575e] space-y-1 pl-4 list-disc font-normal">
                <li>Création &amp; suppression des comptes utilisateurs</li>
                <li>Modification des clés d'API et paramètres entreprise</li>
                <li>Suppression définitive des éléments en corbeille</li>
              </ul>
            </div>

            {/* Admin Card */}
            <div className="border border-blue-200 bg-blue-50/50 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-900 border border-blue-300 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-blue-700" />
                  Administrateur
                </span>
                <span className="text-[11px] text-blue-700 font-mono">Gestion Globale</span>
              </div>
              <p className="text-xs text-[#2c3338] leading-relaxed font-normal">
                Gestion opérationnelle du contenu du site, du catalogue produits, des commandes et des messages clients.
              </p>
              <ul className="text-xs text-[#50575e] space-y-1 pl-4 list-disc font-normal">
                <li>Création &amp; édition des articles et réalisations</li>
                <li>Gestion des commandes, devis et messages</li>
                <li>Accès à la médiathèque officielle</li>
              </ul>
            </div>

            {/* Editor Card */}
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <Edit className="h-3.5 w-3.5 text-emerald-700" />
                  Éditeur de Contenu
                </span>
                <span className="text-[11px] text-emerald-700 font-mono">Rédaction &amp; Médias</span>
              </div>
              <p className="text-xs text-[#2c3338] leading-relaxed font-normal">
                Spécialisé dans la rédaction, la modification et la publication des actualités, guides techniques et projets clients.
              </p>
              <ul className="text-xs text-[#50575e] space-y-1 pl-4 list-disc font-normal">
                <li>Rédaction et publication d'articles de blog</li>
                <li>Mise à jour des fiches réalisations &amp; services</li>
                <li>Upload de visuels dans la médiathèque</li>
              </ul>
            </div>

            {/* Manager Card */}
            <div className="border border-amber-200 bg-amber-50/50 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-amber-700" />
                  Gestionnaire Commercial
                </span>
                <span className="text-[11px] text-amber-700 font-mono">Commandes &amp; Catalogue</span>
              </div>
              <p className="text-xs text-[#2c3338] leading-relaxed font-normal">
                Responsable du traitement des demandes d'intervention, du suivi des commandes produits et des devis clients.
              </p>
              <ul className="text-xs text-[#50575e] space-y-1 pl-4 list-disc font-normal">
                <li>Mise à jour du statut des commandes et devis</li>
                <li>Gestion du stock et prix du catalogue produit</li>
                <li>Traitement des formulaires de contact</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SÉCURITÉ */}
      {activeMainTab === 'security' && (
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 shadow-sm space-y-6 w-full">
          <div>
            <h2 className="text-sm font-normal uppercase tracking-wider text-[#1d2327] border-b border-[#f0f0f1] pb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#2271b1]" />
              Politique de Sécurité &amp; Sessions
            </h2>
            <p className="text-xs text-[#646970] mt-1 font-normal">
              Paramètres d'authentification et suivi des accès au back-office MCI
            </p>
          </div>

          <div className="space-y-4 max-w-2xl text-xs text-[#2c3338]">
            <div className="p-4 border border-gray-200 rounded-sm bg-gray-50 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-xs text-[#1d2327]">Authentification double facteur (2FA)</p>
                <p className="text-xs text-[#646970] mt-0.5">Exiger un code OTP par application pour les comptes Administrateurs</p>
              </div>
              <span className="px-2 py-1 text-[10px] bg-emerald-100 text-emerald-800 rounded font-medium">Recommandé</span>
            </div>

            <div className="p-4 border border-gray-200 rounded-sm bg-gray-50 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-xs text-[#1d2327]">Expiration de session inactive</p>
                <p className="text-xs text-[#646970] mt-0.5">Déconnexion automatique après 60 minutes d'inactivité</p>
              </div>
              <span className="px-2 py-1 text-[10px] bg-blue-100 text-blue-800 rounded font-medium">Activé (60 min)</span>
            </div>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 bg-[#1E3A5F] text-white flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Créer un nouvel utilisateur admin
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-xs text-[#1d2327] mb-1 font-normal">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Paul Atangana"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">
                    Adresse e-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ex: p.atangana@me2i.cm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="text"
                    placeholder="+237 6xx xx xx xx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">
                    Rôle attribué <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  >
                    <option value="editor">Éditeur (Rédaction)</option>
                    <option value="admin">Administrateur (Gestion)</option>
                    <option value="manager">Gestionnaire Commercial</option>
                    <option value="super_admin">Super Administrateur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">
                    Statut du compte
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  >
                    <option value="active">Actif (Autorisé)</option>
                    <option value="inactive">Inactif (Bloqué)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0f0f1] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-[#8c8f94] text-[#2c3338] hover:bg-gray-100 rounded-sm font-normal"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-sm font-normal flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  <span>Créer le compte</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#c3c4c7] rounded-sm shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-3.5 bg-[#1E3A5F] text-white flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Modifier l'utilisateur : {editingUser.full_name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-xs text-[#1d2327] mb-1 font-normal">Nom complet</label>
                <input
                  type="text"
                  required
                  value={editingUser.full_name}
                  onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                  className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">Adresse e-mail</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">Téléphone</label>
                  <input
                    type="text"
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">Attribution du Rôle</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  >
                    <option value="super_admin">Super Administrateur</option>
                    <option value="admin">Administrateur</option>
                    <option value="editor">Éditeur de Contenu</option>
                    <option value="manager">Gestionnaire Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#1d2327] mb-1 font-normal">Statut du compte</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as UserStatus })}
                    className="w-full p-2 border border-[#8c8f94] rounded-sm text-xs focus:outline-none focus:border-[#2271b1] bg-white font-normal"
                  >
                    <option value="active">Actif (Autorisé)</option>
                    <option value="inactive">Inactif (Bloqué)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0f0f1] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-[#8c8f94] text-[#2c3338] hover:bg-gray-100 rounded-sm font-normal"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-sm font-normal flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  <span>Enregistrer les modifications</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
