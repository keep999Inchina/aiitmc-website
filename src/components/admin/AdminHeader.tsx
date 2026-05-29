'use client'

import { useAuth } from '@/lib/auth/context'
import { useRouter } from 'next/navigation'

export default function AdminHeader() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <h2 className="text-sm text-gray-500">管理后台</h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">{user?.display_name || user?.email}</span>
        <button
          onClick={handleSignOut}
          className="text-xs text-gray-500 hover:text-red-600 transition-colors"
        >
          退出
        </button>
      </div>
    </header>
  )
}
