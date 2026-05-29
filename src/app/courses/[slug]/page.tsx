import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `课程详情`,
    description: '智能制造工程系列课程',
  }
}

export default function CourseDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">首页</Link>
        <span>/</span>
        <Link href="/courses" className="hover:text-gray-900">课程</Link>
        <span>/</span>
        <span className="text-gray-900">课程详情</span>
      </div>

      {/* Placeholder */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">课程内容建设中</h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          课程视频正在录制中，预计近期上线。
          关注微信公众号获取上线通知，或联系咨询企业定制课程。
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/courses" className="bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
            返回课程列表
          </Link>
          <a href="mailto:contact@aiitmc.online" className="bg-white border border-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            联系咨询
          </a>
        </div>
      </div>
    </div>
  )
}
