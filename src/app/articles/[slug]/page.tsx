import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArticleBySlug } from '@/lib/db/articles'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { fallbackArticles } from '@/lib/db/fallback-data'
import { getCurrentProfile } from '@/lib/auth/server'

type Props = { params: Promise<{ slug: string }> }

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params

  const article = isSupabaseConfigured()
    ? await getArticleBySlug(slug)
    : fallbackArticles.find(a => a.slug === slug)

  if (!article) notFound()

  const profile = await getCurrentProfile()
  const isVIP = profile?.role === 'vip' || profile?.role === 'admin'
  const needsVIP = article.is_premium && !isVIP

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href="/articles" className="text-sm text-blue-600 hover:underline">
          ← 返回文章列表
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="tag text-sm bg-blue-100 text-blue-700">{article.category}</span>
          {article.is_premium && (
            <span className="tag text-sm bg-yellow-100 text-yellow-700">⭐ VIP 专享</span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{article.author?.display_name || '易牧'}</span>
          <span>·</span>
          <span>{new Date(article.created_at).toLocaleDateString('zh-CN')}</span>
        </div>
      </header>

      {/* Content */}
      {needsVIP ? (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">VIP 专享内容</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            这篇文章是 VIP 会员专享内容。升级 VIP 即可解锁全部高级教程、课程和资料。
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/auth/login"
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              登录已有账号
            </Link>
            <Link
              href="/vip"
              className="px-6 py-2.5 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              升级 VIP
            </Link>
          </div>
          {/* Show excerpt for non-VIP */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-100 text-left">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">内容预览</p>
            <p className="text-gray-600">{article.excerpt}</p>
          </div>
        </div>
      ) : (
        <article className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {article.content || article.excerpt || '文章内容加载中...'}
          </div>
        </article>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span key={tag} className="tag bg-gray-100 text-gray-600">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
