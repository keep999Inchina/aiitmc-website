'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type Course = {
  id: string; title: string; slug: string; level: string;
  is_premium: boolean; price: number; published: boolean; created_at: string
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false })
      setCourses(data || []); setLoading(false)
    }
    load()
  }, [])

  async function togglePublished(id: string, current: boolean) {
    await supabase.from('courses').update({ published: !current }).eq('id', id)
    setCourses(courses.map(c => c.id === id ? { ...c, published: !current } : c))
  }

  async function deleteCourse(id: string, title: string) {
    if (!confirm(`确定删除 "${title}"？`)) return
    await supabase.from('courses').delete().eq('id', id)
    setCourses(courses.filter(c => c.id !== id))
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg" />)}</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">课程管理</h1>
        <Link href="/admin/courses/new" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">+ 新建课程</Link>
      </div>
      {courses.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400 text-lg">还没有课程</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">标题</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">等级</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">价格</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">状态</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">操作</th>
            </tr></thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{c.title}</div></td>
                  <td className="px-4 py-3"><span className="tag">{c.level}</span>{c.is_premium && <span className="tag bg-yellow-100 text-yellow-700 ml-1">VIP</span>}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">¥{c.price}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublished(c.id, c.published)} className={`text-xs px-2 py-1 rounded-full font-medium ${c.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.published ? '已发布' : '草稿'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/courses/${c.id}`} className="text-sm text-blue-600 hover:underline mr-3">编辑</Link>
                    <button onClick={() => deleteCourse(c.id, c.title)} className="text-sm text-red-500 hover:underline">删除</button>
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
