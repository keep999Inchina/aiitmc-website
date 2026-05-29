export default async function EditCoursePage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-400">连接 Supabase 后可编辑课程</p>
    </div>
  )
}
