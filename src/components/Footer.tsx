import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚙️</span>
              <span className="text-white font-bold text-lg">aiitmc.online</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              专注智能制造工程教育，提供 PLC 编程、数字孪生、工业物联网等领域的优质内容与实训平台。
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">微信公众号</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">哔哩哔哩</a>
              <a href="mailto:contact@aiitmc.online" className="text-gray-500 hover:text-white transition-colors text-sm">邮件联系</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-medium mb-3 text-sm">内容</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles" className="hover:text-white transition-colors">技术文章</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">在线课程</Link></li>
              <li><Link href="/digital-twin" className="hover:text-white transition-colors">数字孪生演示</Link></li>
              <li><Link href="/iot" className="hover:text-white transition-colors">物联网平台</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3 text-sm">产品</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">DIY 套件</Link></li>
              <li><Link href="/labs" className="hover:text-white transition-colors">实训平台</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">询价咨询</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2024 aiitmc.online · 智能制造工程教育</p>
          <p>域名 aiitmc.online · 托管于 Vercel</p>
        </div>
      </div>
    </footer>
  )
}
