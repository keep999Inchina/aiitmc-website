'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminLinks = [
  { href: '/admin', label: '仪表盘', icon: '📊' },
  { href: '/admin/articles', label: '文章管理', icon: '📝' },
  { href: '/admin/courses', label: '课程管理', icon: '🎓' },
  { href: '/admin/products', label: '商品管理', icon: '🛒' },
  { href: '/admin/labs', label: '展品管理', icon: '🏆' },
  { href: '/admin/users', label: '用户管理', icon: '👥' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-16 overflow-y-auto pb-20">
      <div className="px-3 py-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
          管理后台
        </div>
        <nav className="space-y-0.5">
          {adminLinks.map(({ href, label, icon }) => {
            const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-100 mt-6 pt-4 px-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← 返回前台
          </Link>
        </div>
      </div>
    </aside>
  )
}
