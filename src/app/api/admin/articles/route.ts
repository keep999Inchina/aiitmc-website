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
    const { title, slug, excerpt, content, category, tags, is_premium, published, featured, read_time } = body

    if (!title || !slug) {
      return NextResponse.json({ error: '标题和 Slug 为必填项' }, { status: 400 })
    }

    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('articles')
      .insert({
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        category: category || 'PLC编程',
        tags: tags || [],
        is_premium: is_premium || false,
        published: published || false,
        featured: featured || false,
        read_time: read_time || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

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
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
