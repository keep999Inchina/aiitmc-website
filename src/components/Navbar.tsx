'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/lib/auth/context'
import UserMenu from '@/components/auth/UserMenu'

const navItems = [
  { href: '/articles',     label: '文章',     icon: '📝' },
  { href: '/courses',      label: '课程',     icon: '🎓' },
  { href: '/digital-twin', label: '数字孪生', icon: '🏭' },
  { href: '/iot',          label: '物联网',   icon: '🌐' },
  { href: '/shop',         label: 'DIY商品',  icon: '🛒' },
  { href: '/labs',         label: '实训展品', icon: '🏆' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isLoading } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">⚙️</span>
            <span className="gradient-text">aiitmc.online</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Right: Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-20 h-8 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              <>
                <a
                  href="mailto:contact@aiitmc.online"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  联系
                </a>
                <UserMenu user={user} />
              </>
            ) : (
              <>
                <a
                  href="mailto:contact@aiitmc.online"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  联系
                </a>
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  注册
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="菜单"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="flex items-center justify-between">
                <UserMenu user={user} />
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  className="flex-1 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="flex-1 bg-primary-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
