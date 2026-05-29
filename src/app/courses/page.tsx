import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '在线课程',
  description: '智能制造工程系列课程：PLC、数字孪生、AI赋能MCU开发',
}

const courses = [
  {
    slug: 'plc-s7-1200-complete',
    title: 'S7-1200 PLC 编程与应用完整课程',
    description: '从基础梯形图到高级编程，涵盖定时器/计数器/通信/PID/SCL，配套25个实验，每节课附练习题。',
    level: '初学到进阶',
    lessons: 42,
    duration: '约36小时',
    icon: '🔧',
    color: 'from-blue-500 to-blue-700',
    tags: ['S7-1200', 'TIA Portal', 'PID', 'SCL', 'Modbus'],
    status: 'available',
  },
  {
    slug: 'digital-twin-fundamentals',
    title: '数字孪生技术基础与实践',
    description: '理解数字孪生核心概念，动手搭建虚实融合的工厂仿真系统，对接真实设备数据，包含Unity3D实战。',
    level: '中级',
    lessons: 28,
    duration: '约24小时',
    icon: '🏭',
    color: 'from-emerald-500 to-emerald-700',
    tags: ['Unity3D', 'OPC UA', '数字孪生', '仿真'],
    status: 'available',
  },
  {
    slug: 'ai-mcu-esp32',
    title: 'AI赋能MCU开发：ESP32-S3 全实战',
    description: '14个外设模块、43项实验，从传感器采集到边缘AI推理，全程配套 AI-Edge32 Pro 硬件套件。',
    level: '中级',
    lessons: 35,
    duration: '约30小时',
    icon: '🤖',
    color: 'from-violet-500 to-violet-700',
    tags: ['ESP32-S3', 'Arduino', 'AI推理', 'Modbus'],
    status: 'available',
  },
  {
    slug: 'industrial-iot-platform',
    title: '工业物联网平台开发实战',
    description: 'MQTT协议 + Node-RED + Grafana，搭建生产环境可用的工业数据采集与可视化平台。',
    level: '进阶',
    lessons: 20,
    duration: '约18小时',
    icon: '🌐',
    color: 'from-orange-500 to-orange-700',
    tags: ['MQTT', 'Node-RED', 'Grafana', 'EMQ X'],
    status: 'coming_soon',
  },
  {
    slug: 'math-intuition-k12',
    title: '直觉式数学：小学到高中全阶段',
    description: '打破死记硬背，用直觉和连接理解数学。从整数到微积分，每个概念都有"为什么这样"的解释。',
    level: '通识',
    lessons: 50,
    duration: '约45小时',
    icon: '🔢',
    color: 'from-amber-500 to-amber-700',
    tags: ['数学', '直觉学习', '教育改革'],
    status: 'coming_soon',
  },
]

const levelColors: Record<string, string> = {
  '初学到进阶': 'bg-green-100 text-green-700',
  '中级': 'bg-blue-100 text-blue-700',
  '进阶': 'bg-violet-100 text-violet-700',
  '通识': 'bg-amber-100 text-amber-700',
}

export default function CoursesPage() {
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
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className={`tag ${levelColors[course.level] || 'bg-gray-100 text-gray-700'}`}>
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

              <div className="flex flex-wrap gap-1 mb-5">
                {course.tags.map((t) => (
                  <span key={t} className="tag bg-gray-100 text-gray-600 text-xs">{t}</span>
                ))}
              </div>

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
