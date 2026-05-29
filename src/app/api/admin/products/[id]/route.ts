import { NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/auth/admin-check'
import { createAdminClient } from '@/lib/supabase/server'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }
  try {
    const body = await request.json()
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('products').update(body).eq('id', params.id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }
  try {
    const supabase = await createAdminClient()
    const { error } = await supabase.from('products').delete().eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
