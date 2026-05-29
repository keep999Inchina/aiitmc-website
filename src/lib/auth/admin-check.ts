import { createClient } from '@/lib/supabase/server'
import type { Role } from '@/lib/auth/roles'
import { ROLES } from '@/lib/auth/roles'

interface AdminCheckResult {
  isAdmin: boolean
  userId: string | null
  role: Role | null
  error: string | null
}

/**
 * Verify that the current user is an admin.
 * Use this in all /api/admin/* route handlers.
 */
export async function checkAdmin(): Promise<AdminCheckResult> {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { isAdmin: false, userId: null, role: null, error: '未登录' }
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return { isAdmin: false, userId: user.id, role: null, error: '无法获取用户信息' }
    }

    if (profile.role !== ROLES.ADMIN) {
      return { isAdmin: false, userId: user.id, role: profile.role as Role, error: '权限不足' }
    }

    return { isAdmin: true, userId: user.id, role: ROLES.ADMIN, error: null }
  } catch {
    return { isAdmin: false, userId: null, role: null, error: '认证检查失败' }
  }
}
