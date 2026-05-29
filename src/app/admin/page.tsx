'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ articles: 0, courses: 0, products: 0, users: 0 })
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const [a, c, p, u] = await Promise.all([
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
      ])
      setStats({
        articles: a.count ?? 0,
        courses: c.count ?? 0,
        products: p.count ?? 0,
        users: u.count ?? 0,
      })
    }
    load()
  }, [])

  const cards = [
    { label: '文章', count: stats.articles, href: '/admin/articles', color: 'bg-blue-500' },
    { label: '课程', count: stats.courses, href: '/admin/courses', color: 'bg-green-500' },
    { label: '商品', count: stats.products, href: '/admin/products', color: 'bg-purple-500' },
    { label: '用户', count: stats.users, href: '/admin/users', color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">管理仪表盘</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.count}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {card.count}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">快捷操作</h3>
          <div className="space-y-2">
            <Link href="/admin/articles/new" className="block px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
              + 新建文章
            </Link>
            <Link href="/admin/courses/new" className="block px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium">
              + 新建课程
            </Link>
            <Link href="/admin/products/new" className="block px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm font-medium">
              + 新建商品
            </Link>
            <Link href="/admin/labs/new" className="block px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition text-sm font-medium">
              + 新建展品
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">使用说明</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>1. 先在 Supabase 中执行 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">supabase/schema.sql</code> 创建数据表</p>
            <p>2. 配置 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">.env.local</code> 中的 Supabase 密钥</p>
            <p>3. 后台内容管理支持全文 Markdown 编辑</p>
            <p>4. VIP 内容需在文章/课程中勾选 "付费内容"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
