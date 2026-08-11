'use server'

import { createServerClient } from './supabase-server'
import { revalidatePath } from 'next/cache'
import { AdminUser, UserRole, UserStatus } from './types'

// Initial seed users if database table is fresh
const DEFAULT_USERS: AdminUser[] = [
  {
    id: 'usr-001',
    email: 'admin@me2i.cm',
    full_name: 'Jean-Marc ME2I',
    role: 'super_admin',
    status: 'active',
    phone: '+237 699 00 11 22',
    last_login: new Date(Date.now() - 3600000).toISOString(),
    created_at: '2026-01-10T10:00:00Z',
  },
  {
    id: 'usr-002',
    email: 'm.nkolo@me2i.cm',
    full_name: 'Michel Nkolo',
    role: 'admin',
    status: 'active',
    phone: '+237 677 33 44 55',
    last_login: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: '2026-02-15T14:30:00Z',
  },
  {
    id: 'usr-003',
    email: 'c.nana@me2i.cm',
    full_name: 'Clarisse Nana',
    role: 'editor',
    status: 'active',
    phone: '+237 690 12 34 56',
    last_login: new Date(Date.now() - 86400000 * 5).toISOString(),
    created_at: '2026-03-01T09:15:00Z',
  },
  {
    id: 'usr-004',
    email: 'e.tamba@me2i.cm',
    full_name: 'Emmanuel Tamba',
    role: 'manager',
    status: 'active',
    phone: '+237 655 77 88 99',
    last_login: new Date(Date.now() - 86400000 * 10).toISOString(),
    created_at: '2026-03-20T16:45:00Z',
  },
  {
    id: 'usr-005',
    email: 'p.fotso@me2i.cm',
    full_name: 'Paul Fotso',
    role: 'editor',
    status: 'inactive',
    phone: '+237 680 99 88 77',
    last_login: new Date(Date.now() - 86400000 * 30).toISOString(),
    created_at: '2026-04-05T11:20:00Z',
  },
]

// In-memory store for fallback if Supabase table is not yet created
let globalUsersStore: AdminUser[] = [...DEFAULT_USERS]

export async function getUsersAction(): Promise<AdminUser[]> {
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return globalUsersStore
    }

    return data as AdminUser[]
  } catch (err) {
    console.error('Error fetching users from Supabase:', err)
    return globalUsersStore
  }
}

export async function createUserAction(formData: {
  email: string
  full_name: string
  role: UserRole
  status?: UserStatus
  phone?: string
}): Promise<AdminUser> {
  const newUser: AdminUser = {
    id: `usr-${Date.now().toString(36)}`,
    email: formData.email.trim().toLowerCase(),
    full_name: formData.full_name.trim(),
    role: formData.role,
    status: formData.status || 'active',
    phone: formData.phone?.trim() || null,
    created_at: new Date().toISOString(),
  }

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('admin_users')
      .insert([newUser])
      .select('*')
      .single()

    if (error) {
      console.warn('Supabase insert failed, using memory store:', error.message)
      globalUsersStore = [newUser, ...globalUsersStore]
    } else if (data) {
      globalUsersStore = [data as AdminUser, ...globalUsersStore]
    }
  } catch (err) {
    globalUsersStore = [newUser, ...globalUsersStore]
  }

  revalidatePath('/admin/utilisateurs')
  return newUser
}

export async function updateUserAction(
  id: string,
  updates: Partial<Omit<AdminUser, 'id' | 'created_at'>>
): Promise<AdminUser> {
  let updatedUser: AdminUser | null = null

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('admin_users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single()

    if (!error && data) {
      updatedUser = data as AdminUser
    }
  } catch (err) {
    console.warn('Supabase update failed:', err)
  }

  globalUsersStore = globalUsersStore.map((u) => {
    if (u.id === id) {
      const merged = {
        ...u,
        ...updates,
        updated_at: new Date().toISOString(),
      }
      if (!updatedUser) updatedUser = merged
      return merged
    }
    return u
  })

  revalidatePath('/admin/utilisateurs')
  if (!updatedUser) throw new Error('Utilisateur non trouvé')
  return updatedUser
}

export async function deleteUserAction(id: string): Promise<void> {
  try {
    const supabase = await createServerClient()
    await supabase.from('admin_users').delete().eq('id', id)
  } catch (err) {
    console.warn('Supabase delete error:', err)
  }

  globalUsersStore = globalUsersStore.filter((u) => u.id !== id)
  revalidatePath('/admin/utilisateurs')
}

export async function toggleUserStatusAction(
  id: string,
  newStatus: UserStatus
): Promise<AdminUser> {
  return updateUserAction(id, { status: newStatus })
}
