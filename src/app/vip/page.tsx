import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '升级VIP | aiitmc.online',
}

const plans = [
  {
    name: '月度会员',
    price: 29,
    unit: '月',
    features: ['解锁所有VIP文章', 'VIP课程免费观看', '专属资料下载', '优先技术支持'],
    highlighted: false,
  },
  {
    name: '年度会员',
    price: 199,
    unit: '年',
    originalPrice: 348,
    features: ['月度会员全部权益', '新课程抢先体验', '一对一技术答疑', '线下活动优先报名'],
    highlighted: true,
  },
  {
    name: '终身会员',
    price: 499,
    unit: '永久',
    features: ['年度会员全部权益', '一次购买终身有效', '专属VIP社群', '产品折扣权益'],
    highlighted: false,
  },
]

export default function VIPPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          升级 <span className="gradient-text">VIP 会员</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          解锁全部高级内容：VIP 专享文章、进阶课程、独家资料、优先技术支持
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border-2 p-8 ${
              plan.highlighted
                ? 'border-yellow-400 bg-gradient-to-b from-yellow-50 to-white shadow-lg shadow-yellow-100'
                : 'border-gray-200 bg-white hover:shadow-lg transition'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                最受欢迎
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-gray-900">¥{plan.price}</span>
              <span className="text-gray-500">/ {plan.unit}</span>
              {plan.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">¥{plan.originalPrice}</span>
              )}
            </div>
            {plan.highlighted && (
              <p className="text-sm text-yellow-700 bg-yellow-100 rounded-lg px-3 py-1.5 text-center mb-4">
                省 ¥{plan.originalPrice! - plan.price}，相当于 ¥{(plan.price / 12).toFixed(1)}/月
              </p>
            )}
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-medium transition ${
                plan.highlighted
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              立即开通
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
        <div className="space-y-4">
          {[
            { q: '支付支持哪些方式？', a: '目前支持微信支付和支付宝，通过安全支付平台处理。' },
            { q: '可以退款吗？', a: '购买后 7 天内如未观看超过 3 节课程，可申请全额退款。' },
            { q: 'VIP 可以看所有内容吗？', a: '是的，VIP 会员可以访问所有标记为"VIP专享"的文章和课程。部分单独售卖的课程可能需要额外购买。' },
          ].map((faq) => (
            <details key={faq.q} className="bg-white border border-gray-100 rounded-xl p-4 group">
              <summary className="font-medium text-gray-900 cursor-pointer">{faq.q}</summary>
              <p className="mt-3 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-sm text-gray-400">
          支付功能接入中。如需立即开通，请联系 <a href="mailto:contact@aiitmc.online" className="text-blue-600 hover:underline">contact@aiitmc.online</a>
        </p>
      </div>
    </div>
  )
}
