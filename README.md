# aiitmc.online 网站项目

> 智能制造工程教育平台 — 文章 · 课程 · 数字孪生 · 物联网 · DIY套件 · 实训平台

域名：**aiitmc.online**  
框架：Next.js 14 (App Router) + TypeScript + Tailwind CSS  
部署：Vercel

---

## 项目结构

```
aiitmc-website/
├── src/
│   ├── app/                    # Next.js App Router 路由
│   │   ├── page.tsx            # 首页
│   │   ├── layout.tsx          # 全局布局
│   │   ├── globals.css         # 全局样式
│   │   ├── articles/           # 文章专区
│   │   │   ├── page.tsx        # 文章列表
│   │   │   └── [slug]/page.tsx # 文章详情
│   │   ├── courses/            # 课程专区
│   │   │   ├── page.tsx        # 课程列表
│   │   │   └── [slug]/page.tsx # 课程详情
│   │   ├── digital-twin/       # 数字孪生演示
│   │   ├── iot/                # 物联网看板
│   │   ├── shop/               # DIY套件
│   │   └── labs/               # 实训平台展品
│   └── components/
│       ├── Navbar.tsx           # 导航栏
│       └── Footer.tsx           # 页脚
├── content/
│   ├── articles/               # Markdown 文章（后期读取）
│   └── courses/                # 课程 Markdown（后期读取）
├── public/
│   └── images/                 # 静态图片
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（访问 http://localhost:3000）
npm run dev

# 生产构建
npm run build
npm start
```

---

## 六大功能模块

| 路由 | 功能 | 当前状态 |
|------|------|----------|
| `/` | 首页：Hero + 精选文章 + 精选课程 + 实训平台 Banner | ✅ 完成 |
| `/articles` | 文章列表（分类筛选）| ✅ 框架完成，需填充内容 |
| `/articles/[slug]` | 文章详情（Markdown渲染）| ✅ 框架完成 |
| `/courses` | 课程列表 | ✅ 框架完成 |
| `/courses/[slug]` | 课程详情 | ✅ 骨架完成 |
| `/digital-twin` | 数字孪生演示（视频占位）| ✅ 框架完成 |
| `/iot` | 物联网数据看板（静态演示）| ✅ 框架完成 |
| `/shop` | DIY套件商品 | ✅ 框架完成 |
| `/labs` | 实训平台展品 | ✅ 框架完成 |

---

## 部署到 Vercel

1. 将项目推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入项目
3. 在项目设置中绑定域名 `aiitmc.online`（在域名商处将 NS 指向 Vercel）
4. 每次 git push 自动重新部署

---

## 后续待接入功能

- [ ] 文章 Markdown 自动解析（gray-matter + next-mdx-remote）
- [ ] 文章分类筛选（客户端 useState）
- [ ] Three.js 3D 模型展示（待 .glb 文件）
- [ ] 物联网实时数据接入（WebSocket + MQTT）
- [ ] 课程付费（外链知识星球/小鹅通）
- [ ] 联系表单（Supabase）
- [ ] 微信公众号文章同步（RSS聚合）
