import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * GET /api/cron/expire-vip
 * Cron job: Find expired VIP users and reset role to 'user'
 *
 * Can be triggered by Vercel Cron Jobs:
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/expire-vip",
 *     "schedule": "0 0 * * *"
 *   }]
 * }
 *
 * Or triggered manually via Supabase pg_cron.
 */
export async function GET() {
  // Simple auth check - verify this is called by a cron service
  const authHeader = process.env.CRON_SECRET
  // In production, verify CRON_SECRET header

  try {
    const supabase = await createAdminClient()

    // Find VIP users whose membership has expired
    const { data: expiredUsers, error: fetchError } = await supabase
      .from('profiles')
      .select('id, email, vip_expires_at')
      .eq('role', 'vip')
      .lt('vip_expires_at', new Date().toISOString())

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    if (!expiredUsers || expiredUsers.length === 0) {
      return NextResponse.json({ message: 'No expired VIP users', expired: 0 })
    }

    // Update each expired user
    const userIds = expiredUsers.map(u => u.id)
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'user' })
      .in('id', userIds)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'VIP expiration processed',
      expired: expiredUsers.length,
      users: expiredUsers.map(u => ({ id: u.id, email: u.email })),
    })
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
