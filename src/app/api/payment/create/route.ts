import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/payment/create
 * Create a VIP order and redirect to payment
 *
 * Request body:
 * { payment_method: 'wechat' | 'alipay' }
 *
 * Flow:
 * 1. Verify user is authenticated
 * 2. Create a vip_orders record
 * 3. Call 虎皮椒 API to get payment URL
 * 4. Return payment URL to client
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: '未登录' }, { status: 401 })
    }

    const { payment_method } = await request.json()
    if (!payment_method || !['wechat', 'alipay'].includes(payment_method)) {
      return NextResponse.json({ error: '无效的支付方式' }, { status: 400 })
    }

    // Create order in database
    const amount = 199.00 // VIP annual price
    const { data: order, error: orderError } = await supabase
      .from('vip_orders')
      .insert({
        user_id: user.id,
        amount,
        payment_method,
        payment_status: 'pending',
        vip_duration_days: 365,
      })
      .select()
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: '创建订单失败' }, { status: 500 })
    }

    // TODO: Call 虎皮椒 API to create payment
    // This requires 虎皮椒 APP_ID and APP_SECRET
    // For now, return a placeholder response
    const paymentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aiitmc.online'}/vip/success?order_id=${order.id}`

    return NextResponse.json({
      order_id: order.id,
      payment_url: paymentUrl,
      amount,
    })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
