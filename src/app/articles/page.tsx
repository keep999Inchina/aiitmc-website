import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '技术文章',
  description: 'PLC编程、数字孪生、工业物联网、AI、数学教育专栏文章',
}

const categories = ['全部', 'PLC编程', '数字孪生', 'IoT开发', 'AI赋能', '数学教育', '创业实践']

const articles = [
  {
    slug: 'siemens-s7-1200-pid',
    title: '西门子 S7-1200 PID 控制实战：从参数整定到工程应用',
    summary: '详解 S7-1200 内置 PID 指令块的使用方法，包含温度控制、流量控制典型案例，手把手完成参数自整定。',
    category: 'PLC编程',
    date: '2024-12-15',
    readTime: '12 分钟',
    tags: ['S7-1200', 'PID', 'TIA Portal'],
    featured: true,
  },
  {
    slug: 'digital-twin-unity',
    title: '用 Unity 搭建数字孪生工厂：从零到可视化仿真',
    summary: '从 CAD 模型导入、场景搭建到 OPC UA 数据驱动，完整演示数字孪生产线的构建流程。',
    category: '数字孪生',
    date: '2024-12-08',
    readTime: '18 分钟',
    tags: ['Unity3D', 'OPC UA', 'GLTF'],
    featured: true,
  },
  {
    slug: 'esp32-modbus-iot',
    title: 'ESP32-S3 + Modbus TCP 实现工业设备数据采集',
    summary: '基于 ESP32-S3 开发板，实现 Modbus TCP 协议与西门子 PLC 通信，数据上云全流程演示。',
    category: 'IoT开发',
    date: '2024-11-28',
    readTime: '15 分钟',
    tags: ['ESP32-S3', 'Modbus', 'MQTT'],
    featured: true,
  },
  {
    slug: 's7-1200-scl-basics',
    title: 'S7-1200 SCL 结构化控制语言入门：比梯形图更高效',
    summary: '当梯形图写得越来越长，是时候学 SCL 了。本文用10个典型程序教你从梯形图平滑迁移到 SCL。',
    category: 'PLC编程',
    date: '2024-11-20',
    readTime: '10 分钟',
    tags: ['S7-1200', 'SCL', 'TIA Portal'],
    featured: false,
  },
  {
    slug: 'math-intuition-learning',
    title: '为什么你学了十年数学还是不会用？直觉式数学学习法',
    summary: '传统数学教育强调记忆和程序，而真正的数学理解来自直觉和连接。这篇文章提出一套从小学到大学的直觉式数学学习路径。',
    category: '数学教育',
    date: '2024-11-12',
    readTime: '8 分钟',
    tags: ['数学教育', '学习方法', '教学改革'],
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  'PLC编程':  'bg-blue-100 text-blue-700',
  '数字孪生': 'bg-violet-100 text-violet-700',
  'IoT开发':  'bg-orange-100 text-orange-700',
  'AI赋能':   'bg-red-100 text-red-700',
  '数学教育': 'bg-green-100 text-green-700',
  '创业实践': 'bg-amber-100 text-amber-700',
}

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">技术文章</h1>
        <p className="text-gray-500 text-lg">PLC编程 · 数字孪生 · IoT开发 · AI赋能 · 数学教育</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat === '全部'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary-600 rounded-full" />
          精选推荐
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.filter(a => a.featured).map((article) => (
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
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map((t) => (
                  <span key={t} className="tag bg-gray-100 text-gray-600">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* All Articles List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-gray-400 rounded-full" />
          全部文章
        </h2>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 card-hover group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`tag text-xs ${categoryColors[article.category] || 'bg-gray-100 text-gray-700'}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                  <time className="text-xs text-gray-400">{article.date}</time>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{article.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="mt-12 bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center">
        <p className="text-primary-700 font-medium">更多文章持续更新中</p>
        <p className="text-primary-600 text-sm mt-1">关注微信公众号获取最新推送</p>
      </div>
    </div>
  )
}
