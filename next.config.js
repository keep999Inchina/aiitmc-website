/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'mmbiz.qpic.cn' },
      { protocol: 'https', hostname: 'pic.bilibili.com' },
    ],
  },
  experimental: {
    mdxRs: true,
  },
}

module.exports = nextConfig
