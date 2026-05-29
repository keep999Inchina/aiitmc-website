import Link from 'next/link'

// ======== 示例数据（后期替换为从 Markdown 读取）========

const featuredArticles = [
  {
    slug: 'siemens-s7-1200-pid',
    title: '西门子 S7-1200 PID 控制实战：从参数整定到工程应用',
    summary: '详解 S7-1200 内置 PID 指令块的使用方法，包含温度控制、流量控制典型案例，手把手完成参数自整定。',
    category: 'PLC编程',
    date: '2024-12-15',
    readTime: '12 分钟',
    tags: ['S7-1200', 'PID', 'TIA Portal'],
  },
  {
    slug: 'digital-twin-unity',
    title: '用 Unity 搭建数字孪生工厂：从零到可视化仿真',
    summary: '从 CAD 模型导入、场景搭建到 OPC UA 数据驱动，完整演示数字孪生产线的构建流程。',
    category: '数字孪生',
    date: '2024-12-08',
    readTime: '18 分钟',
    tags: ['Unity3D', '数字孪生', 'OPC UA'],
  },
  {
    slug: 'esp32-modbus-iot',
    title: 'ESP32-S3 + Modbus TCP 实现工业设备数据采集',
    summary: '基于 ESP32-S3 开发板，实现 Modbus TCP 协议与西门子 PLC 通信，数据上云全流程演示。',
    category: 'IoT开发',
    date: '2024-11-28',
    readTime: '15 分钟',
    tags: ['ESP32-S3', 'Modbus', 'IoT'],
  },
]

const featuredCourses = [
  {
    slug: 'plc-s7-1200-complete',
    title: 'S7-1200 PLC 编程与应用完整课程',
    description: '从基础梯形图到高级编程，涵盖定时器/计数器/通信/PID，配套25个实验。',
    level: '初学到进阶',
    lessons: 42,
    icon: '🔧',
    color: 'from-blue-500 to-blue-700',
  },
  {
    slug: 'digital-twin-fundamentals',
    title: '数字孪生技术基础与实践',
    description: '理解数字孪生核心概念，动手搭建虚实融合的工厂仿真系统，对接真实设备数据。',
    level: '中级',
    lessons: 28,
    icon: '🏭',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    slug: 'ai-mcu-esp32',
    title: 'AI赋能MCU开发：ESP32-S3 全实战',
    description: '14个外设模块、43项实验，从传感器采集到边缘AI推理，全程配套硬件套件。',
    level: '中级',
    lessons: 35,
    icon: '🤖',
    color: 'from-violet-500 to-violet-700',
  },
]

const modules = [
  { href: '/articles',     icon: '📝', label: '技术文章',  desc: 'PLC / 数字孪生 / AI / 数学教育',   color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { href: '/courses',      icon: '🎓', label: '在线课程',  desc: '视频课程 + PDF + 实验指导书',        color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { href: '/digital-twin', icon: '🏭', label: '数字孪生',  desc: '虚实融合工厂演示窗口',              color: 'bg-violet-50 text-violet-700 border-violet-100' },
  { href: '/iot',          icon: '🌐', label: '物联网平台', desc: '设备实时数据看板',                  color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { href: '/shop',         icon: '🛒', label: 'DIY套件',   desc: 'AI-Edge32 Pro 等硬件套件',          color: 'bg-pink-50 text-pink-700 border-pink-100' },
  { href: '/labs',         icon: '🏆', label: '实训平台',  desc: 'DT Station · SmartMFG Lab 展品',    color: 'bg-amber-50 text-amber-700 border-amber-100' },
]

const categoryColors: Record<string, string> = {
  'PLC编程':  'bg-blue-100 text-blue-700',
  '数字孪生': 'bg-violet-100 text-violet-700',
  'IoT开发':  'bg-orange-100 text-orange-700',
}

// ======== 页面组件 ========

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-950 to-gray-900 text-white overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              <span>智能制造工程教育平台</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              让工程教育
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                真实可触碰
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              PLC 编程 · 数字孪生 · 工业物联网 · AI 赋能实训
              <br />
              从公众号文章到完整课程，从 DIY 套件到实训平台，一站获取。
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                📝 浏览文章
              </Link>
              <Link
                href="/courses"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                🎓 开始学习
              </Link>
              <Link
                href="/labs"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                🏆 了解实训平台
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 六大模块导航 ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">探索所有内容</h2>
        <p className="text-gray-500 mb-8">六个专区，覆盖学习、动手、购买、展示全场景</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={`flex flex-col items-center text-center p-5 rounded-2xl border ${m.color} card-hover`}
            >
              <span className="text-3xl mb-2">{m.icon}</span>
              <span className="font-semibold text-sm mb-1">{m.label}</span>
              <span className="text-xs opacity-75 leading-tight">{m.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 精选文章 ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">精选文章</h2>
            <p className="text-gray-500 mt-1">PLC · 数字孪生 · IoT · AI · 数学教育</p>
          </div>
          <Link href="/articles" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
            全部文章 →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 card-hover group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`tag ${categoryColors[article.category] || 'bg-gray-100 text-gray-700'}`}>
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">{article.readTime}</span>
              </div>
              <h3 className="font-semibold text-gray-900 leading-snug mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
                {article.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((t) => (
                    <span key={t} className="tag bg-gray-100 text-gray-600">{t}</span>
                  ))}
                </div>
                <time className="text-xs text-gray-400">{article.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 精选课程 ──────────────────────────────────────── */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">精选课程</h2>
              <p className="text-gray-400 mt-1">系统学习，配套实验，从理论到动手</p>
            </div>
            <Link href="/courses" className="text-primary-400 hover:text-primary-300 font-medium text-sm flex items-center gap-1">
              全部课程 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="bg-gray-800 rounded-2xl overflow-hidden card-hover group"
              >
                <div className={`bg-gradient-to-br ${course.color} p-8 flex items-center justify-center`}>
                  <span className="text-5xl">{course.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="bg-gray-700 px-2 py-1 rounded-full">{course.level}</span>
                    <span>{course.lessons} 节课</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 实训平台 Banner ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 w-80 h-80 bg-white rounded-full" />
            <div className="absolute -left-5 -bottom-5 w-60 h-60 bg-white rounded-full" />
          </div>
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm mb-4">
              🏆 讯飞杯参赛项目
            </div>
            <h2 className="text-3xl font-bold mb-4">
              智影工坊 · DT-Station Pro
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              AI + 数字孪生驱动的智能制造实训工作站。星火大模型 + 数字孪生引擎 + 真实设备三融合，
              5-8万/套，开箱即教，模块化扩展至完整智能工厂。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/labs"
                className="bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                查看详情
              </Link>
              <a
                href="mailto:contact@aiitmc.online?subject=DT-Station%20询价"
                className="border border-white/50 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                询价咨询
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
