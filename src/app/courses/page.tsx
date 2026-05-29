import Link from 'next/link'
import type { Metadata } from 'next'
import { getCourses } from '@/lib/db/courses'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { fallbackCourses } from '@/lib/db/fallback-data'

export const metadata: Metadata = {
  title: '在线课程',
  description: '智能制造工程系列课程：PLC、数字孪生、AI赋能MCU开发',
}

const levelColors: Record<string, string> = {
  '初学到进阶': 'bg-green-100 text-green-700',
  '中级': 'bg-blue-100 text-blue-700',
  '进阶': 'bg-violet-100 text-violet-700',
  '通识': 'bg-amber-100 text-amber-700',
}

export default async function CoursesPage() {
  const courses = isSupabaseConfigured()
    ? await getCourses({ published: true })
    : fallbackCourses

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">在线课程</h1>
        <p className="text-gray-500 text-lg">系统学习，配套实验，从理论到动手——每门课都有完整的学习闭环</p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.slug} className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group">
            {/* Cover */}
            <div className={`bg-gradient-to-br ${course.color} p-10 flex items-center justify-center relative`}>
              <span className="text-6xl">{course.icon}</span>
              {course.status === 'coming_soon' && (
                <div className="absolute top-3 right-3 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
                  即将上线
                </div>
              )}
              {course.is_premium && (
                <div className="absolute top-3 left-3 bg-amber-500/80 text-white text-xs px-2 py-1 rounded-full">
                  VIP
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`tag ${levelColors[course.level || ''] || 'bg-gray-100 text-gray-700'}`}>
                  {course.level}
                </span>
                <span className="text-xs text-gray-400">{course.lessons} 节 · {course.duration}</span>
              </div>

              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors leading-snug">
                {course.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                {course.description}
              </p>

              {course.tags && course.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-5">
                  {course.tags.map((t: string) => (
                    <span key={t} className="tag bg-gray-100 text-gray-600 text-xs">{t}</span>
                  ))}
                </div>
              )}

              {course.status === 'available' ? (
                <Link
                  href={`/courses/${course.slug}`}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-xl text-center transition-colors"
                >
                  开始学习
                </Link>
              ) : (
                <button className="block w-full bg-gray-100 text-gray-400 text-sm font-medium py-2.5 rounded-xl cursor-not-allowed" disabled>
                  即将上线，敬请期待
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom / Enterprise */}
      <div className="mt-12 bg-gray-900 rounded-3xl p-8 md:p-10 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">需要企业定制课程？</h2>
            <p className="text-gray-400">可根据企业/院校需求，定制 PLC、数字孪生、工业网络等专项培训课程，配套实训设备。</p>
          </div>
          <a
            href="mailto:contact@aiitmc.online?subject=定制课程咨询"
            className="shrink-0 bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            联系咨询
          </a>
        </div>
      </div>
    </div>
  )
}
