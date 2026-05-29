import { NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/auth/admin-check'
import { createAdminClient } from '@/lib/supabase/server'
import { getUsers } from '@/lib/db/users'

export async function GET() {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }
  try {
    const { users, total } = await getUsers()
    return NextResponse.json({ data: users, total })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }
  try {
    const supabase = await createAdminClient()
    const { error } = await supabase.auth.admin.deleteUser(params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
