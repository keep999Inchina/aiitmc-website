import type { Metadata } from 'next'
import { getLabItems } from '@/lib/db/labs'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { fallbackLabItems } from '@/lib/db/fallback-data'

export const metadata: Metadata = {
  title: '实训平台展品',
  description: 'DT Station · SmartMFG Lab 智能制造实训平台介绍',
}

export default async function LabsPage() {
  const products = isSupabaseConfigured()
    ? await getLabItems({ published: true })
    : fallbackLabItems

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 rounded-full px-3 py-1 text-sm mb-4">
          🏆 实训平台展品
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">智能制造实训平台</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          从单工位 DT-Station 到完整 SmartMFG Lab，模块化扩展，
          覆盖智能制造工程全专业课程体系。
        </p>
      </div>

      {/* Products */}
      <div className="space-y-10 mb-12">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left: Hero */}
              <div className={`lg:col-span-2 bg-gradient-to-br ${product.color} p-10 flex flex-col justify-between text-white`}>
                <div>
                  {product.badge && (
                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4 ${product.badge_color || 'bg-amber-100 text-amber-700'}`}>
                      {product.badge}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
                  <p className="text-white/70 text-sm mb-4">{product.subtitle}</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">{product.description}</p>
                  <div className="text-3xl font-bold mb-1">{product.price}</div>
                </div>
                <a
                  href="mailto:contact@aiitmc.online?subject=实训平台询价"
                  className="mt-4 block bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-5 py-3 rounded-xl text-center text-sm transition-colors"
                >
                  获取报价方案
                </a>
              </div>

              {/* Right: Details */}
              <div className="lg:col-span-3 p-8">
                {/* Modules */}
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-600 rounded-full" />
                  模块构成
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                  {product.modules.map((m: { name: string; desc: string }) => (
                    <div key={m.name} className="bg-gray-50 rounded-xl p-3.5">
                      <div className="font-medium text-sm text-gray-900 mb-0.5">{m.name}</div>
                      <div className="text-xs text-gray-500">{m.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent-500 rounded-full" />
                  技术规格
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s: { label: string; value: string }) => (
                      <tr key={s.label} className="border-b border-gray-100 last:border-0">
                        <td className="py-2 text-gray-500 w-1/3">{s.label}</td>
                        <td className="py-2 text-gray-900 font-medium">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Banner */}
      <div className="bg-gray-900 rounded-3xl p-8 md:p-10 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">📦</div>
            <div className="font-semibold mb-1">开箱即教</div>
            <div className="text-gray-400 text-sm">设备到位第一天即可正常上课，无需额外购买教材</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🔲</div>
            <div className="font-semibold mb-1">模块化扩展</div>
            <div className="text-gray-400 text-sm">从1套 DT-Station 按需扩展至完整 SmartMFG Lab</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🎓</div>
            <div className="font-semibold mb-1">政策合规</div>
            <div className="text-gray-400 text-sm">符合教育部新专业目录要求，配合1+X证书认证培训</div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-4">需要定制化方案或现场演示？</p>
          <a
            href="mailto:contact@aiitmc.online?subject=实训平台咨询"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            预约线下演示 / 获取完整方案
          </a>
        </div>
      </div>
    </div>
  )
}
