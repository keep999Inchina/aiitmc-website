import type { Metadata } from 'next'
import Link from 'next/link'

// 文章详情页（后期接入 gray-matter 解析真实 Markdown）
// 目前使用静态数据作为骨架演示

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  return {
    title: `文章详情 — ${params.slug}`,
    description: '智能制造工程技术文章',
  }
}

// 后期从 Markdown 文件读取真实内容
const mockArticle = {
  title: '西门子 S7-1200 PID 控制实战：从参数整定到工程应用',
  date: '2024-12-15',
  readTime: '12 分钟',
  category: 'PLC编程',
  tags: ['S7-1200', 'PID', 'TIA Portal'],
  content: `
PID 控制是工业自动化中最常用的闭环控制算法。S7-1200 内置了高质量的 PID 指令库，
本文带你从零掌握它——从基本原理到 TIA Portal 中的实际配置，再到参数自整定实战。

（完整内容请查看配套课程视频）
  `,
}

export default function ArticleDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">首页</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-gray-900">文章</Link>
        <span>/</span>
        <span className="text-gray-900">详情</span>
      </div>

      {/* Article Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="tag bg-blue-100 text-blue-700">{mockArticle.category}</span>
          <span className="text-sm text-gray-400">{mockArticle.readTime}</span>
          <time className="text-sm text-gray-400">{mockArticle.date}</time>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
          {mockArticle.title}
        </h1>
        <div className="flex flex-wrap gap-1">
          {mockArticle.tags.map((t) => (
            <span key={t} className="tag bg-gray-100 text-gray-600">{t}</span>
          ))}
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
          <p className="text-amber-800 text-sm font-medium">📝 内容建设中</p>
          <p className="text-amber-700 text-sm mt-1">
            这篇文章的完整内容正在整理中。配套课程视频已上线，可前往
            <Link href="/courses" className="underline ml-1">课程页面</Link>观看。
          </p>
        </div>
        <p className="text-gray-700 leading-relaxed">{mockArticle.content}</p>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-100 mt-12 pt-8 flex items-center justify-between">
        <Link href="/articles" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
          ← 返回文章列表
        </Link>
        <Link href="/courses" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
          查看配套课程 →
        </Link>
      </div>
    </div>
  )
}
