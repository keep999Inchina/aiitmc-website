import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'aiitmc.online — 智能制造 · 数字孪生 · 实训平台',
    template: '%s | aiitmc.online',
  },
  description: '专注智能制造工程教育：PLC编程、数字孪生、工业物联网、AI赋能实训平台',
  keywords: ['智能制造', '数字孪生', 'PLC', 'S7-1200', '工业物联网', '实训平台', 'ESP32'],
  authors: [{ name: 'Huawen' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://aiitmc.online',
    siteName: 'aiitmc.online',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
