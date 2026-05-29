import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCourseBySlug } from '@/lib/db/courses'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { fallbackCourses } from '@/lib/db/fallback-data'
import { getCurrentProfile } from '@/lib/auth/server'

type Props = { params: Promise<{ slug: string }> }

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params

  const course = isSupabaseConfigured()
    ? await getCourseBySlug(slug)
    : fallbackCourses.find(c => c.slug === slug)

  if (!course) notFound()

  const profile = await getCurrentProfile()
  const isVIP = profile?.role === 'vip' || profile?.role === 'admin'
  const needsVIP = course.is_premium && !isVIP

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/courses" className="text-sm text-blue-600 hover:underline">
          ← 返回课程列表
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className={`tag text-sm ${course.level === '进阶' ? 'bg-purple-100 text-purple-700' : course.level === '入门' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            {course.level}
          </span>
          {course.is_premium && (
            <span className="tag text-sm bg-yellow-100 text-yellow-700">⭐ VIP 专享</span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
        <p className="text-lg text-gray-500">{course.description}</p>
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span>{(course as any).lessons || course.chapters_count} 节课</span>
          <span>·</span>
          <span>{(course as any).students_count || 0} 人已学习</span>
        </div>
      </header>

      {needsVIP ? (
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-8 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">VIP 专享课程</h2>
          <p className="text-gray-600 mb-2">
            此课程需要 VIP 会员才能观看
          </p>
          {course.price > 0 && (
            <p className="text-gray-500 mb-6">
              单独购买：<span className="text-lg font-bold text-gray-800">¥{course.price}</span>，或升级 VIP 免费观看全部课程
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <Link href="/auth/login" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
              登录
            </Link>
            <Link href="/vip" className="px-6 py-2.5 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition">
              升级 VIP
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Chapters */}
          {course.chapters && (
            <div className="divide-y divide-gray-50">
              {course.chapters.map((ch: any, i: number) => (
                <div key={ch.id || i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                    {ch.sort_order || i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{ch.title}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    {ch.duration_min && <span>{ch.duration_min} 分钟</span>}
                    {ch.is_free && <span className="tag bg-green-100 text-green-700 text-xs">免费</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          {!course.chapters && (
            <div className="p-8 text-center text-gray-400">
              课程内容即将上线
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {(course as any).tags?.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {(course as any).tags.map((tag: string) => (
              <span key={tag} className="tag bg-gray-100 text-gray-600">{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
