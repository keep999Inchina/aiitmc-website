import { NextResponse } from 'next/server'
import { checkAdmin } from '@/lib/auth/admin-check'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }
  try {
    const body = await request.json()
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('lab_items').insert(body).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function GET() {
  const adminCheck = await checkAdmin()
  if (!adminCheck.isAdmin) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 })
  }
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase.from('lab_items').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
