'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  user: {
    id: string
    email?: string
    display_name?: string
    avatar_url?: string
    role?: string
  } | null
}

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
        >
          登录
        </Link>
        <Link
          href="/auth/register"
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          注册
        </Link>
      </div>
    )
  }

  const isAdmin = user.role === 'admin'
  const isVIP = user.role === 'vip'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
          {(user.display_name || user.email || 'U')[0].toUpperCase()}
        </div>
        <span className="hidden sm:block text-sm font-medium text-gray-700">
          {user.display_name || user.email?.split('@')[0]}
        </span>
        {isVIP && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">
            VIP
          </span>
        )}
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.display_name || user.email}
            </p>
            <p className="text-xs text-gray-500">
              {isAdmin ? '管理员' : isVIP ? 'VIP会员' : '普通用户'}
            </p>
          </div>

          {isAdmin && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              onClick={() => setOpen(false)}
            >
              ⚙️ 管理后台
            </Link>
          )}

          {!isVIP && !isAdmin && (
            <Link
              href="/vip"
              className="block px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 transition font-medium"
              onClick={() => setOpen(false)}
            >
              ⭐ 升级VIP
            </Link>
          )}

          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  )
}
