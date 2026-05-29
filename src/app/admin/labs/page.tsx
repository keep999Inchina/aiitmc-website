'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type LabItem = { id: string; name: string; category: string; published: boolean; created_at: string }

export default function AdminLabsPage() {
  const [items, setItems] = useState<LabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', description: '', category: '实训平台', video_url: '', image: '' })
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('lab_items').select('*').order('created_at', { ascending: false })
    setItems(data || []); setLoading(false)
  }

  async function save() {
    await supabase.from('lab_items').insert({ ...form, published: true, specs: {} })
    setShowForm(false); setForm({ name: '', slug: '', description: '', category: '实训平台', video_url: '', image: '' }); load()
  }

  async function toggle(id: string, val: boolean) { await supabase.from('lab_items').update({ published: !val }).eq('id', id); load() }
  async function del(id: string) { if (!confirm('确定删除？')) return; await supabase.from('lab_items').delete().eq('id', id); load() }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">展品管理</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition">
          {showForm ? '取消' : '+ 新建展品'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">名称</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, '-') })} className="w-full px-4 py-2.5 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">分类</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg"><option>实训平台</option><option>数字孪生</option><option>设备展示</option></select></div>
          </div>
          <div><label className="block text-sm font-medium mb-1">视频链接</label><input value={form.video_url} onChange={e => setForm({ ...form, video_url: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg" placeholder="B站视频链接" /></div>
          <div><label className="block text-sm font-medium mb-1">描述</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-4 py-2.5 border rounded-lg" /></div>
          <button onClick={save} disabled={!form.name} className="px-6 py-2.5 bg-orange-600 text-white text-sm font-medium rounded-lg disabled:opacity-50">保存</button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-gray-50"><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">名称</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">分类</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">状态</th><th className="text-right px-4 py-3 text-sm font-medium text-gray-500">操作</th></tr></thead>
          <tbody>{items.map(p => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3"><span className="tag">{p.category}</span></td>
              <td className="px-4 py-3"><button onClick={() => toggle(p.id, p.published)} className={`text-xs px-2 py-1 rounded-full ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.published ? '已发布' : '草稿'}</button></td>
              <td className="px-4 py-3 text-right"><button onClick={() => del(p.id)} className="text-sm text-red-500 hover:underline">删除</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
