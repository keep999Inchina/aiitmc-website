'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Article = {
  id: string
  title: string
  slug: string
  category: string
  is_premium: boolean
  published: boolean
  created_at: string
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('id,title,slug,category,is_premium,published,created_at')
        .order('created_at', { ascending: false })
      setArticles(data || [])
      setLoading(false)
    }
    load()
  }, [])

  async function togglePublished(id: string, current: boolean) {
    await supabase.from('articles').update({ published: !current }).eq('id', id)
    setArticles(articles.map(a => a.id === id ? { ...a, published: !current } : a))
  }

  async function deleteArticle(id: string, title: string) {
    if (!confirm(`确定删除 "${title}"？此操作不可恢复。`)) return
    await supabase.from('articles').delete().eq('id', id)
    setArticles(articles.filter(a => a.id !== id))
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg" />)}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
        <Link
          href="/admin/articles/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + 新建文章
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg mb-4">还没有文章</p>
          <Link
            href="/admin/articles/new"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            创建第一篇文章
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">标题</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">分类</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">时间</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{article.title}</div>
                    <div className="text-xs text-gray-400">/{article.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="tag">{article.category}</span>
                    {article.is_premium && (
                      <span className="tag bg-yellow-100 text-yellow-700 ml-1">VIP</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublished(article.id, article.published)}
                      className={`text-xs px-2 py-1 rounded-full font-medium transition ${
                        article.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {article.published ? '已发布' : '草稿'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(article.created_at).toLocaleDateString('zh-CN')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        编辑
                      </Link>
                      <button
                        onClick={() => deleteArticle(article.id, article.title)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
