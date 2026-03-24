# badhope 个人作品集

> 一个现代化、视觉效果出众的个人作品集网站，展示全栈开发者的专业历程，具备3D特效、AI集成和无缝国际化（中英文）支持。

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-badhope.github.io-blue)](https://badhope.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ 功能特性

### 🌐 国际化 (i18n)

| 功能 | 描述 |
|------|------|
| **双语言支持** | 英语（主要）和中文（次要） |
| **语言切换器** | 导航栏快速切换（EN/中文） |
| **持久化偏好** | 语言选择保存至 localStorage |
| **自动检测** | 自动检测浏览器语言偏好 |
| **完整覆盖** | 所有UI元素、标签和内容均已翻译 |

### 🎨 视觉设计

- **3D特效**：基于 Three.js 的粒子网格和传送门过渡效果
- **暗色主题**：现代霓虹风格暗色配色方案（#0a0a0f 基底）
- **响应式设计**：针对所有屏幕尺寸优化（移动端、平板、桌面）
- **微交互**：通过 Framer Motion 实现流畅动画
- **字体排版**：高级字体栈（Inter、JetBrains Mono、Space Grotesk）

### 🤖 AI 集成

- **AI聊天助手**：带知识库的交互式AI聊天界面
- **技能书可视化**：技术技能的视觉展示
- **降级系统**：AI服务不可用时的优雅降级

### ⚡ 性能

- **SSR/SSG**：基于 Next.js 15 App Router 的服务端渲染
- **代码分割**：自动代码分割优化加载时间
- **动态导入**：重型组件（Three.js等）按需加载
- **静态生成**：所有页面预渲染实现快速首屏加载

---

## 🚀 快速开始

### 环境要求

| 要求 | 版本 |
|------|------|
| Node.js | 18+ |
| npm | 9+ |
| Git | 2.0+ |

### 安装

```bash
# 克隆仓库
git clone https://github.com/badhope/badhope.github.io.git

# 进入项目目录
cd badhope.github.io

# 安装依赖（使用 legacy-peer-deps 兼容 Next.js 15）
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev

# 打开 http://localhost:3000
```

### 生产构建

```bash
# 构建项目
npm run build

# 本地预览生产构建
npx serve@latest out -p 3000
```

### 部署

项目已配置 GitHub Actions 自动部署至 GitHub Pages。

```bash
# 推送到 main 分支触发自动部署
git push origin main
```

---

## 🌏 语言选择

### 如何切换语言

1. **导航栏**：点击右上角的语言切换按钮（EN/中文）
2. **自动检测**：首次访问时自动检测浏览器语言
3. **持久存储**：偏好设置保存在 localStorage

### 支持的语言

| 语言 | 代码 | 状态 |
|------|------|------|
| English | `en` | ✅ 主要语言 |
| 中文 | `zh` | ✅ 次要语言 |

### 翻译覆盖

| 区块 | EN | ZH |
|------|----|----|
| 导航 | ✅ | ✅ |
| Hero区域 | ✅ | ✅ |
| 关于区域 | ✅ | ✅ |
| 技能分类 | ✅ | ✅ |
| 项目展示 | ✅ | ✅ |
| 页脚 | ✅ | ✅ |
| AI聊天 | ✅ | ✅ |
| 错误状态 | ✅ | ✅ |
| 网络状态 | ✅ | ✅ |
| 评论区 | ✅ | ✅ |

---

## 📂 项目结构

```
badhope.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages 部署配置
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── ai/               # AI助手页面
│   │   ├── blog/             # 博客页面
│   │   ├── contact/          # 联系页面
│   │   ├── home/             # 首页（主页面）
│   │   ├── projects/         # 项目展示页面
│   │   ├── resume/           # 简历页面
│   │   ├── tools/            # 工具页面
│   │   ├── layout.tsx        # 根布局与Providers
│   │   ├── page.tsx          # 重定向至 /home
│   │   ├── globals.css       # 全局样式
│   │   ├── loading.tsx       # 加载状态
│   │   └── error.tsx         # 错误边界
│   ├── components/
│   │   ├── 3d/              # Three.js 3D组件
│   │   │   └── ThreeScene.tsx
│   │   ├── ai/              # AI组件
│   │   │   ├── AIChat.tsx
│   │   │   ├── AISettings.tsx
│   │   │   └── SkillBook.tsx
│   │   ├── animations/       # 动画组件
│   │   │   ├── DoorOpen.tsx
│   │   │   ├── LabelCarousel.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── ParticlePortal.tsx
│   │   │   └── Typewriter.tsx
│   │   ├── cards/            # 卡片组件
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ToolCard.tsx
│   │   ├── effects/          # 视觉效果
│   │   │   └── ParticleRain.tsx
│   │   ├── sections/         # 页面区块
│   │   │   ├── About.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Skills.tsx
│   │   └── ui/               # UI组件
│   │       ├── BackToTop.tsx
│   │       ├── Button.tsx
│   │       ├── Comments.tsx
│   │       ├── InteractiveButton.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       ├── Navigation.tsx
│   │       └── NetworkStatus.tsx
│   ├── hooks/                 # 自定义React Hooks
│   │   └── useInteractions.ts
│   ├── lib/                   # 库与工具函数
│   │   ├── i18n/             # 国际化
│   │   │   ├── translations.ts
│   │   │   └── LanguageContext.tsx
│   │   ├── ai-api.ts        # AI API集成
│   │   ├── knowledge-base.ts # AI聊天知识库
│   │   └── utils.ts          # 工具函数
│   └── types/                # TypeScript类型定义
│       └── index.ts
├── CONTRIBUTING.md           # 贡献指南
├── PROTOCOL.md               # 技术文档
├── README.md                 # 英文版说明
├── README_CN.md              # 中文版说明（本文件）
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🛠️ 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **框架** | Next.js | 15.1 | App Router SSR/SSG |
| **语言** | TypeScript | 5.7 | 类型安全 |
| **样式** | Tailwind CSS | 3.4 | 原子化CSS |
| **动画** | Framer Motion | 11.x | 页面过渡与微交互 |
| **3D图形** | Three.js | latest | 3D粒子场景 |
| **状态** | React Context | - | 语言与应用状态 |
| **部署** | GitHub Pages | - | 静态托管 |

---

## 🎨 设计系统

### 色彩方案

```css
:root {
  /* 背景色 */
  --color-dark-bg: #0a0a0f;       /* 主背景 */
  --color-dark-card: #12121a;     /* 卡片背景 */
  --color-dark-border: #1f1f2e;   /* 边框 */

  /* 霓虹强调色 */
  --color-neon-blue: #00d4ff;     /* 主强调色 */
  --color-neon-purple: #bf5af2;   /* 次强调色 */
  --color-neon-pink: #ff375f;     /* 第三强调色 */
  --color-neon-green: #30d158;    /* 成功色 */

  /* 文字色 */
  --text-primary: #ffffff;        /* 主文字 */
  --text-secondary: #888888;      /* 次文字 */
  --text-muted: #555555;          /* 弱化文字 */
}
```

### 字体排版

| 字体 | 字体族 | 用途 |
|------|--------|------|
| **展示字体** | Space Grotesk | 标题、大字 |
| **正文字体** | Inter | 段落、UI文字 |
| **代码字体** | JetBrains Mono | 代码片段、标签 |

### 间距

使用4px基准网格系统（Tailwind默认）。

---

## 📖 文档

| 文档 | 描述 |
|------|------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南、PR流程、代码审查标准 |
| [PROTOCOL.md](PROTOCOL.md) | 技术文档、API规范、组件架构 |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | 部署指南、GitHub Pages配置 |

---

## 🤝 贡献

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解：

- 🔀 代码提交流程
- 📝 Pull Request 要求
- 👀 代码审查标准
- 💬 提交信息规范
- 🏆 贡献致谢

---

## 📜 许可证

本项目采用 **MIT 许可证** 授权。

---

## 🔗 联系方式

| 平台 | 链接 |
|------|------|
| **GitHub** | [badhope](https://github.com/badhope) |
| **CSDN** | [blog.csdn.net/weixin_56622231](https://blog.csdn.net/weixin_56622231) |
| **掘金** | [juejin.cn/user/2350111542479753](https://juejin.cn/user/2350111542479753) |
| **邮箱** | x18825407105@outlook.com |

---

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Three.js](https://threejs.org/) - 3D图形
- [Tailwind CSS](https://tailwindcss.com/) - 原子化CSS框架
- [Giscus](https://giscus.app/) - 评论系统

---

由 **badhope** 用 ❤️ 构建 · 2024至今
