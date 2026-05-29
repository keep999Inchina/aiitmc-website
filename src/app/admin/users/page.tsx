'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Profile = { id: string; email: string; display_name: string; role: string; vip_expires_at: string | null; created_at: string }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { load() }, [])

  async function load() {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    setUsers(data || []); setLoading(false)
  }

  async function changeRole(id: string, role: string) {
    await supabase.from('profiles').update({ role }).eq('id', id)
    load()
  }

  async function deleteUser(id: string) {
    if (!confirm('确定删除此用户？这将同时删除其所有数据。')) return
    // 注意: Profiles 通过 CASCADE 关联到 auth.users, 需要 admin API 删除
    const { error } = await supabase.from('profiles').delete().eq('id', id)
    if (error) alert('删除失败: ' + error.message)
    else load()
  }

  function getRoleBadge(role: string) {
    const styles: Record<string, string> = {
      admin: 'bg-red-100 text-red-700',
      vip: 'bg-yellow-100 text-yellow-700',
      user: 'bg-blue-100 text-blue-700',
    }
    const labels: Record<string, string> = { admin: '管理员', vip: 'VIP', user: '普通用户' }
    return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[role] || styles.user}`}>{labels[role] || role}</span>
  }

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-lg" />)}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">用户管理</h1>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b bg-gray-50"><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">用户</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">角色</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">VIP到期</th><th className="text-left px-4 py-3 text-sm font-medium text-gray-500">注册时间</th><th className="text-right px-4 py-3 text-sm font-medium text-gray-500">操作</th></tr></thead>
          <tbody>{users.map(u => (
            <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{u.display_name || '未设置'}</div>
                <div className="text-xs text-gray-400">{u.email}</div>
              </td>
              <td className="px-4 py-3">{getRoleBadge(u.role)}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{u.vip_expires_at ? new Date(u.vip_expires_at).toLocaleDateString('zh-CN') : '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-500">{new Date(u.created_at).toLocaleDateString('zh-CN')}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  {u.role !== 'admin' && (
                    <button onClick={() => changeRole(u.id, 'admin')} className="text-xs text-blue-600 hover:underline">设为管理员</button>
                  )}
                  {u.role !== 'vip' && (
                    <button onClick={() => changeRole(u.id, 'vip')} className="text-xs text-yellow-600 hover:underline">设为VIP</button>
                  )}
                  {u.role !== 'user' && (
                    <button onClick={() => changeRole(u.id, 'user')} className="text-xs text-gray-500 hover:underline">降为普通</button>
                  )}
                  <button onClick={() => deleteUser(u.id)} className="text-xs text-red-500 hover:underline">删除</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  )
}
