import AdminSidebar from '@/components/admin/Sidebar'

export const metadata = {
  title: '管理后台 | aiitmc.online',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-56 flex-1 p-6 pt-20">
        {children}
      </div>
    </div>
  )
}
