import Link from 'next/link'

export default function VipSuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">VIP 开通成功！</h1>
        <p className="text-gray-500 mb-6">
          恭喜你成为 VIP 会员，现在可以访问所有付费内容了。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/courses"
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            浏览付费课程
          </Link>
          <Link
            href="/articles"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
          >
            阅读付费文章
          </Link>
        </div>
      </div>
    </div>
  )
}
