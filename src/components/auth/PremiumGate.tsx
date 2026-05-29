'use client'

import { useAuth } from '@/lib/auth/context'
import { canAccessPremiumContent, ROLES } from '@/lib/auth/roles'
import Link from 'next/link'

interface PremiumGateProps {
  isPremium: boolean
  children: React.ReactNode
}

export default function PremiumGate({ isPremium, children }: PremiumGateProps) {
  const { user, isLoading } = useAuth()

  // If content is not premium, show it to everyone
  if (!isPremium) {
    return <>{children}</>
  }

  // If still loading, show a skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    )
  }

  // If user has VIP or admin role, show the content
  if (canAccessPremiumContent(user?.role)) {
    return <>{children}</>
  }

  // Otherwise, show the paywall
  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="blur-sm select-none pointer-events-none" aria-hidden="true">
        {children}
      </div>

      {/* Paywall overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm border border-amber-200 rounded-2xl p-8 text-center max-w-md mx-4 shadow-lg">
          <div className="text-4xl mb-3">👑</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">VIP 专享内容</h3>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            此内容为 VIP 会员专属。升级 VIP 即可解锁所有付费课程和文章。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link
                href="/vip"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                升级 VIP
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
              >
                登录后升级
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
