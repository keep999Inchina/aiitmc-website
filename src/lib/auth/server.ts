// ============================================
// Auth Helper 函数
// ============================================

import { createServerSupabase } from '../supabase'

export type UserProfile = {
  id: string
  email: string
  display_name: string
  avatar_url: string
  role: 'admin' | 'user' | 'vip'
  vip_expires_at: string | null
  created_at: string
}

/**
 * 获取当前登录用户 (Server Component)
 */
export async function getCurrentUser() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * 获取当前用户完整 Profile
 */
export async function getCurrentProfile(): Promise<UserProfile | null> {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile as UserProfile | null
}

/**
 * 检查当前用户是否 admin
 */
export async function isAdmin(): Promise<boolean> {
  const profile = await getCurrentProfile()
  return profile?.role === 'admin'
}

/**
 * 检查当前用户是否 VIP (或 admin)
 */
export async function isVIP(): Promise<boolean> {
  const profile = await getCurrentProfile()
  if (!profile) return false
  if (profile.role === 'admin') return true
  if (profile.role === 'vip') {
    // 检查 VIP 是否过期
    if (profile.vip_expires_at) {
      return new Date(profile.vip_expires_at) > new Date()
    }
    return true // 终身 VIP
  }
  return false
}
