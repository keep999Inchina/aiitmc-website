'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

type ArticleFormProps = {
  initialData?: {
    id?: string
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    cover_image?: string
    category?: string
    tags?: string[]
    is_premium?: boolean
    published?: boolean
  }
  isEditing?: boolean
}

export default function ArticleForm({ initialData = {}, isEditing = false }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData.title || '')
  const [slug, setSlug] = useState(initialData.slug || '')
  const [excerpt, setExcerpt] = useState(initialData.excerpt || '')
  const [content, setContent] = useState(initialData.content || '')
  const [coverImage, setCoverImage] = useState(initialData.cover_image || '')
  const [category, setCategory] = useState(initialData.category || 'PLC')
  const [isPremium, setIsPremium] = useState(initialData.is_premium || false)
  const [published, setPublished] = useState(initialData.published || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // 自动生成 slug
  function handleTitleChange(value: string) {
    setTitle(value)
    if (!isEditing) {
      setSlug(value
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fff]+/g, '-')
        .replace(/^-+|-+$/g, '')
      )
    }
  }

  async function handleSave(publishNow: boolean) {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const articleData = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      category,
      tags: [] as string[],
      is_premium: isPremium,
      published: publishNow || published,
    }

    if (isEditing && initialData.id) {
      const { error: err } = await supabase
        .from('articles')
        .update(articleData)
        .eq('id', initialData.id)
      if (err) { setError(err.message); setLoading(false); return }
    } else {
      const { error: err } = await supabase
        .from('articles')
        .insert(articleData)
      if (err) { setError(err.message); setLoading(false); return }
    }

    router.push('/admin/articles')
    router.refresh()
  }

  const categories = ['PLC', '数字孪生', '物联网', 'AI', '数学教育', '智能制造', '其他']

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? '编辑文章' : '新建文章'}
      </h1>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="文章标题"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="article-slug"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">封面图 URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="简短描述..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            内容 (Markdown)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={16}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="## 文章内容&#10;&#10;使用 Markdown 格式写作..."
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">VIP 专享内容</span>
          </label>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleSave(true)}
            disabled={loading || !title || !slug}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '保存中...' : '发布'}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={loading || !title || !slug}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            保存草稿
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  )
}
