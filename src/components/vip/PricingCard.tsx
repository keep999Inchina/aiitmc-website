import Link from 'next/link'

interface PricingCardProps {
  title: string
  price: string
  period: string
  features: string[]
  popular?: boolean
  ctaText: string
  ctaHref: string
}

export default function PricingCard({ title, price, period, features, popular, ctaText, ctaHref }: PricingCardProps) {
  return (
    <div className={`rounded-2xl p-6 md:p-8 border-2 ${popular ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-white'} relative`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          推荐
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-500 text-sm">/{period}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-green-500">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`block w-full text-center font-semibold py-2.5 rounded-xl text-sm transition-colors ${
          popular
            ? 'bg-amber-500 hover:bg-amber-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        {ctaText}
      </Link>
    </div>
  )
}
