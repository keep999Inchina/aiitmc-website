import type { Metadata } from 'next'
import { getProducts } from '@/lib/db/products'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { fallbackProducts } from '@/lib/db/fallback-data'

export const metadata: Metadata = {
  title: 'DIY套件商品',
  description: 'AI-Edge32 Pro、ESP32-S3 等硬件 DIY 套件',
}

export default async function ShopPage() {
  const products = isSupabaseConfigured()
    ? await getProducts({ published: true })
    : fallbackProducts

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 text-pink-700 rounded-full px-3 py-1 text-sm mb-4">
          🛒 DIY 硬件套件
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">DIY 套件商品</h1>
        <p className="text-gray-500 text-lg max-w-2xl">
          配套课程的硬件套件。所有套件均为配套内容自研，开源 BOM 和电路图，
          可自行采购或联系定制组装版本。
        </p>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col card-hover">
            {/* Cover */}
            <div className={`bg-gradient-to-br ${product.color} p-10 flex items-center justify-center`}>
              <span className="text-6xl">{product.icon}</span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-auto">
                <h3 className="font-bold text-gray-900 text-lg mb-0.5">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{product.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>

                <ul className="space-y-1.5 mb-4">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500 text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 mb-5">
                  {product.tags.map((t: string) => (
                    <span key={t} className="tag bg-gray-100 text-gray-600 text-xs">{t}</span>
                  ))}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    {product.price_note && (
                      <span className="text-xs text-gray-500 ml-1">{product.price_note}</span>
                    )}
                  </div>
                </div>
                {product.status === 'available' ? (
                  <a
                    href={product.buy_url || '#'}
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-xl text-center text-sm transition-colors"
                  >
                    查看购买
                  </a>
                ) : (
                  <a
                    href={product.buy_url || `mailto:contact@aiitmc.online?subject=${product.name}询价`}
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-center text-sm transition-colors"
                  >
                    联系询价
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Open Source Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex items-start gap-4">
        <span className="text-3xl shrink-0">🔓</span>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">开源设计文件</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            AI-Edge32 Pro 的 KiCad 8 完整工程文件（原理图 + PCB + BOM + 封装库）开源可用。
            欢迎 Fork 修改用于教学或个人项目，请注明来源。
          </p>
          <a href="#" className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block">
            查看 GitHub 仓库 →
          </a>
        </div>
      </div>
    </div>
  )
}
