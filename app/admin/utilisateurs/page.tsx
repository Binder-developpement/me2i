import { requireAdminAuth } from '@/src/admin/lib/auth-guard'
import { getUsersAction } from '@/src/admin/lib/user-actions'
import UserListClient from './UserListClient'

export const revalidate = 0

export default async function AdministrationUsersPage() {
  await requireAdminAuth()
  const users = await getUsersAction()

  return (
    <div className="w-full">
      <UserListClient initialUsers={users} />
    </div>
  )
}
