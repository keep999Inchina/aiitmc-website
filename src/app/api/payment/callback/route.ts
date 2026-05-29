import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * POST /api/payment/callback
 * 虎皮椒 payment webhook callback
 *
 * This endpoint receives payment notifications from 虎皮椒 after
 * a user completes payment. It verifies the HMAC signature and
 * updates the order status.
 *
 * TODO: Implement HMAC signature verification when 虎皮椒 is configured
 */
export async function POST(request: Request) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)

    const orderId = params.get('order_id')
    const transactionId = params.get('transaction_id')
    const status = params.get('status')

    if (!orderId) {
      return new Response('fail', { status: 400 })
    }

    // TODO: Verify HMAC signature with 虎皮椒 APP_SECRET
    // const hash = params.get('hash')
    // const expectedHash = computeHmac(body, process.env.XUNHU_APP_SECRET)
    // if (hash !== expectedHash) return new Response('fail', { status: 400 })

    if (status !== 'success') {
      return new Response('success') // Acknowledge non-success callbacks
    }

    // Update order and user profile
    const supabase = await createAdminClient()

    // Get the order
    const { data: order } = await supabase
      .from('vip_orders')
      .select('user_id, vip_duration_days')
      .eq('id', orderId)
      .single()

    if (!order) {
      return new Response('fail', { status: 400 })
    }

    // Update order status
    await supabase
      .from('vip_orders')
      .update({
        payment_status: 'paid',
        transaction_id: transactionId,
        paid_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    // Update user role to VIP
    const vipExpiresAt = new Date()
    vipExpiresAt.setDate(vipExpiresAt.getDate() + order.vip_duration_days)

    await supabase
      .from('profiles')
      .update({
        role: 'vip',
        vip_expires_at: vipExpiresAt.toISOString(),
      })
      .eq('id', order.user_id)

    return new Response('success')
  } catch {
    return new Response('fail', { status: 500 })
  }
}
