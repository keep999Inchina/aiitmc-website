import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * GET /api/payment/status/[orderId]
 * Check payment status for a specific order (client polls this)
 */
export async function GET(
  _request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { data: order, error } = await supabase
      .from('vip_orders')
      .select('id, payment_status, amount, payment_method')
      .eq('id', params.orderId)
      .eq('user_id', user.id)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: '订单不存在' }, { status: 404 })
    }

    return NextResponse.json({ data: order })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
