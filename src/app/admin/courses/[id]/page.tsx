'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useParams, useRouter } from 'next/navigation'

export default function EditCoursePage() {
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState({ title: '', slug: '', description: '', level: '入门', is_premium: false, price: 0, published: false })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('courses').select('*').eq('id', params.id).single()
      if (data) setForm(data)
      setLoading(false)
    }
    load()
  }, [params.id])

  async function handleSave(publish: boolean) {
    setLoading(true)
    await supabase.from('courses').update({ ...form, published: publish || form.published }).eq('id', params.id)
    router.push('/admin/courses')
  }

  if (loading) return <div className="animate-pulse h-96 bg-gray-100 rounded-xl" />

  const fields = [
    { label: '标题', key: 'title', type: 'text' },
    { label: 'Slug', key: 'slug', type: 'text' },
    { label: '描述', key: 'description', type: 'textarea' },
  ]

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑课程</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            ) : (
              <input type="text" value={(form as any)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            )}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">等级</label>
            <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg">
              {['入门','进阶','高级'].map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">价格</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg" />
          </div>
        </div>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_premium} onChange={e => setForm({ ...form, is_premium: e.target.checked })} className="w-4 h-4" /><span className="text-sm">VIP专享</span></label>
        <div className="flex gap-3 pt-4 border-t">
          <button onClick={() => handleSave(true)} className="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg">更新并发布</button>
          <button onClick={() => handleSave(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">保存</button>
        </div>
      </div>
    </div>
  )
}
