import { NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/auth/admin-check'
import { updateUserRole } from '@/lib/db/users'
import type { Role } from '@/lib/auth/roles'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }

  try {
    const { role } = await request.json()

    if (!['user', 'vip', 'admin'].includes(role)) {
      return NextResponse.json({ error: '无效的角色' }, { status: 400 })
    }

    const result = await updateUserRole(params.id, role as Role)
    if (!result) {
      return NextResponse.json({ error: '更新失败' }, { status: 500 })
    }

    return NextResponse.json({ data: result })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
