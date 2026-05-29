export const ROLES = {
  ANONYMOUS: 'anonymous',
  USER: 'user',
  VIP: 'vip',
  ADMIN: 'admin',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export function isVipOrAbove(role: Role | null | undefined): boolean {
  return role === ROLES.VIP || role === ROLES.ADMIN
}

export function isAdmin(role: Role | null | undefined): boolean {
  return role === ROLES.ADMIN
}

export function canAccessPremiumContent(role: Role | null | undefined): boolean {
  return isVipOrAbove(role)
}

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.ANONYMOUS]: '游客',
  [ROLES.USER]: '注册用户',
  [ROLES.VIP]: 'VIP会员',
  [ROLES.ADMIN]: '管理员',
}

export const ROLE_COLORS: Record<Role, string> = {
  [ROLES.ANONYMOUS]: 'bg-gray-100 text-gray-700',
  [ROLES.USER]: 'bg-blue-100 text-blue-700',
  [ROLES.VIP]: 'bg-amber-100 text-amber-700',
  [ROLES.ADMIN]: 'bg-red-100 text-red-700',
}
