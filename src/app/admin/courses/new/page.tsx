'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function NewCoursePage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('入门')
  const [isPremium, setIsPremium] = useState(false)
  const [price, setPrice] = useState(0)
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  function handleTitleChange(v: string) {
    setTitle(v)
    setSlug(v.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-').replace(/^-+|-+$/g, ''))
  }

  async function handleSave() {
    setLoading(true); setError('')
    const { error: err } = await supabase.from('courses').insert({ title, slug, description, level, is_premium: isPremium, price, published, cover_image: '' })
    if (err) { setError(err.message); setLoading(false); return }
    router.push('/admin/courses'); router.refresh()
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新建课程</h1>
      {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
          <input type="text" value={title} onChange={e => handleTitleChange(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="课程标题" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">等级</label>
            <select value={level} onChange={e => setLevel(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {['入门','进阶','高级'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">价格 (¥)</label>
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" checked={isPremium} onChange={e => setIsPremium(e.target.checked)} className="w-4 h-4 rounded" /><span className="text-sm text-gray-700">VIP 专享</span></label>
        </div>
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={() => { setPublished(true); handleSave() }} disabled={loading || !title} className="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50">发布</button>
          <button onClick={handleSave} disabled={loading || !title} className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition disabled:opacity-50">保存草稿</button>
        </div>
      </div>
    </div>
  )
}
