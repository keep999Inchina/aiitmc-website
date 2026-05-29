import Link from 'next/link'
import type { Metadata } from 'next'
import { getArticles, getArticleCategories } from '@/lib/db/articles'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { fallbackArticles, fallbackArticleCategories } from '@/lib/db/fallback-data'

export const metadata: Metadata = {
  title: '技术文章',
  description: 'PLC编程、数字孪生、工业物联网、AI、数学教育专栏文章',
}

const categoryColors: Record<string, string> = {
  'PLC编程':  'bg-blue-100 text-blue-700',
  '数字孪生': 'bg-violet-100 text-violet-700',
  'IoT开发':  'bg-orange-100 text-orange-700',
  'AI赋能':   'bg-red-100 text-red-700',
  '数学教育': 'bg-green-100 text-green-700',
  '创业实践': 'bg-amber-100 text-amber-700',
}

export default async function ArticlesPage() {
  const categories = isSupabaseConfigured()
    ? await getArticleCategories()
    : fallbackArticleCategories

  const articles = isSupabaseConfigured()
    ? await getArticles({ published: true })
    : fallbackArticles

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">技术文章</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          分享智能制造、数字孪生、工业物联网、AI 等技术领域的学习笔记与项目经验
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat: string) => (
          <Link
            key={cat}
            href={cat === '全部' ? '/articles' : `/articles?category=${cat}`}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Article List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: any, i: number) => (
          <Link
            key={article.id || i}
            href={`/articles/${article.slug}`}
            className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all card-hover"
          >
            {article.cover_image && (
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
            )}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`tag text-xs ${categoryColors[article.category] || 'bg-gray-100 text-gray-600'}`}>
                  {article.category}
                </span>
                {article.is_premium && (
                  <span className="tag text-xs bg-yellow-100 text-yellow-700">⭐ VIP</span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{article.author?.display_name || '易牧'}</span>
                <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
