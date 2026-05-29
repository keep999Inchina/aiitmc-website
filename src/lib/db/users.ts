import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'
import type { Role } from '@/lib/auth/roles'

export interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  role: Role
  vip_expires_at: string | null
  created_at: string
  updated_at: string
}

export async function getUserById(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }
  return data as UserProfile | null
}

/**
 * Admin-only: Get all users with pagination
 */
export async function getUsers(options?: {
  role?: Role
  limit?: number
  offset?: number
}) {
  const supabase = await createAdminClient()
  let query = supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (options?.role) {
    query = query.eq('role', options.role)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1)
  }

  const { data, error, count } = await query
  if (error) {
    console.error('Error fetching users:', error)
    return { users: [], total: 0 }
  }
  return { users: (data as UserProfile[]) || [], total: count || 0 }
}

/**
 * Admin-only: Update user role
 */
export async function updateUserRole(userId: string, role: Role) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating user role:', error)
    return null
  }
  return data as UserProfile | null
}

/**
 * Admin-only: Delete user
 */
export async function deleteUser(userId: string) {
  const supabase = await createAdminClient()
  // Delete from auth.users (cascades to profiles)
  const { error } = await supabase.auth.admin.deleteUser(userId)
  if (error) {
    console.error('Error deleting user:', error)
    return false
  }
  return true
}

/**
 * Get total user count (for admin dashboard)
 */
export async function getUserCount() {
  const supabase = await createAdminClient()
  const { count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error counting users:', error)
    return 0
  }
  return count || 0
}
