# badhope Portfolio

> A modern, visually stunning personal portfolio website showcasing a full-stack developer's professional journey, featuring 3D effects, AI integration, and seamless internationalization (English & Chinese).

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-badhope.github.io-blue)](https://badhope.github.io)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## ✨ Features

### 🌐 Internationalization (i18n)

| Feature | Description |
|---------|-------------|
| **Dual Language Support** | English (primary) and Chinese (secondary) |
| **Language Switcher** | Quick toggle in the navigation bar (EN/中文) |
| **Persistent Preference** | Language choice saved to localStorage |
| **Auto-Detection** | Automatically detects browser language preference |
| **Complete Coverage** | All UI elements, labels, and content translated |

### 🎨 Visual Design

- **3D Effects**: Three.js-powered particle mesh and portal transitions
- **Dark Theme**: Modern neon-accented dark color scheme (#0a0a0f base)
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)
- **Micro-interactions**: Smooth animations via Framer Motion
- **Typography**: Premium font stack (Inter, JetBrains Mono, Space Grotesk)

### 🤖 AI Integration

- **AI Chat Assistant**: Interactive AI-powered chat interface with knowledge base
- **Skill Book Visualization**: Visual representation of technical skills
- **Fallback System**: Graceful degradation when AI services unavailable

### ⚡ Performance

- **SSR/SSG**: Server-side rendering with Next.js 15 App Router
- **Code Splitting**: Automatic code splitting for optimal load times
- **Dynamic Imports**: Heavy components (Three.js, etc.) loaded on demand
- **Static Generation**: All pages pre-rendered for fast initial load

---

## 🚀 Quick Start

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| npm | 9+ |
| Git | 2.0+ |

### Installation

```bash
# Clone the repository
git clone https://github.com/badhope/badhope.github.io.git

# Navigate to project directory
cd badhope.github.io

# Install dependencies (with legacy peer deps for Next.js 15 compatibility)
npm install --legacy-peer-deps

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build locally
npx serve@latest out -p 3000
```

### Deployment

The project is configured for GitHub Pages deployment via GitHub Actions.

```bash
# Push to main branch triggers automatic deployment
git push origin main
```

---

## 🌏 Language Selection

### How to Switch Languages

1. **Navigation Bar**: Click the language toggle (EN/中文) in the top-right corner
2. **Automatic Detection**: On first visit, the site detects your browser language
3. **Persistent Storage**: Your preference is saved in localStorage

### Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Primary |
| 中文 | `zh` | ✅ Secondary |

### Translation Coverage

| Section | EN | ZH |
|---------|----|----|
| Navigation | ✅ | ✅ |
| Hero Section | ✅ | ✅ |
| About Section | ✅ | ✅ |
| Skills Categories | ✅ | ✅ |
| Projects | ✅ | ✅ |
| Footer | ✅ | ✅ |
| AI Chat | ✅ | ✅ |
| Error States | ✅ | ✅ |
| Network Status | ✅ | ✅ |
| Comments | ✅ | ✅ |

---

## 📂 Project Structure

```
badhope.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── ai/               # AI Assistant page
│   │   ├── blog/             # Blog page
│   │   ├── contact/          # Contact page
│   │   ├── home/             # Home page (main)
│   │   ├── projects/         # Projects showcase page
│   │   ├── resume/           # Resume page
│   │   ├── tools/            # Tools page
│   │   ├── layout.tsx        # Root layout with Providers
│   │   ├── page.tsx          # Redirect to /home
│   │   ├── globals.css       # Global styles
│   │   ├── loading.tsx       # Loading state
│   │   └── error.tsx         # Error boundary
│   ├── components/
│   │   ├── 3d/              # Three.js 3D components
│   │   │   └── ThreeScene.tsx
│   │   ├── ai/              # AI components
│   │   │   ├── AIChat.tsx
│   │   │   ├── AISettings.tsx
│   │   │   └── SkillBook.tsx
│   │   ├── animations/       # Animation components
│   │   │   ├── DoorOpen.tsx
│   │   │   ├── LabelCarousel.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── ParticlePortal.tsx
│   │   │   └── Typewriter.tsx
│   │   ├── cards/            # Card components
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ToolCard.tsx
│   │   ├── effects/          # Visual effects
│   │   │   └── ParticleRain.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── About.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Skills.tsx
│   │   └── ui/               # UI components
│   │       ├── BackToTop.tsx
│   │       ├── Button.tsx
│   │       ├── Comments.tsx
│   │       ├── InteractiveButton.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       ├── Navigation.tsx
│   │       └── NetworkStatus.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useInteractions.ts
│   ├── lib/                   # Libraries & utilities
│   │   ├── i18n/             # Internationalization
│   │   │   ├── translations.ts
│   │   │   └── LanguageContext.tsx
│   │   ├── ai-api.ts        # AI API integration
│   │   ├── knowledge-base.ts # Knowledge base for AI chat
│   │   └── utils.ts          # Utility functions
│   └── types/                # TypeScript type definitions
│       └── index.ts
├── CONTRIBUTING.md           # Contribution guidelines
├── PROTOCOL.md               # Technical documentation
├── README.md                 # This file
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.1 | App Router SSR/SSG |
| **Language** | TypeScript | 5.7 | Type safety |
| **Styling** | Tailwind CSS | 3.4 | Utility-first CSS |
| **Animation** | Framer Motion | 11.x | Page transitions & micro-interactions |
| **3D Graphics** | Three.js | latest | 3D particle scenes |
| **State** | React Context | - | Language & app state |
| **Deployment** | GitHub Pages | - | Static hosting |

---

## 🎨 Design System

### Color Palette

```css
:root {
  /* Background */
  --color-dark-bg: #0a0a0f;       /* Primary background */
  --color-dark-card: #12121a;     /* Card backgrounds */
  --color-dark-border: #1f1f2e;   /* Borders */

  /* Neon Accents */
  --color-neon-blue: #00d4ff;     /* Primary accent */
  --color-neon-purple: #bf5af2;   /* Secondary accent */
  --color-neon-pink: #ff375f;     /* Tertiary accent */
  --color-neon-green: #30d158;    /* Success accent */

  /* Text */
  --text-primary: #ffffff;        /* Primary text */
  --text-secondary: #888888;      /* Secondary text */
  --text-muted: #555555;          /* Muted text */
}
```

### Typography

| Font | Family | Usage |
|------|--------|-------|
| **Display** | Space Grotesk | Headings, titles |
| **Body** | Inter | Paragraphs, UI text |
| **Code** | JetBrains Mono | Code snippets, labels |

### Spacing

Uses 4px base grid system (Tailwind default).

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines, PR process, code review standards |
| [PROTOCOL.md](PROTOCOL.md) | Technical documentation, API specs, component architecture |

---

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on:

- 🔀 Code submission process
- 📝 Pull request requirements
- 👀 Code review standards
- 💬 Commit message conventions
- 🏆 Contribution acknowledgment

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🔗 Connect

| Platform | Link |
|----------|------|
| **GitHub** | [badhope](https://github.com/badhope) |
| **CSDN** | [blog.csdn.net/weixin_56622231](https://blog.csdn.net/weixin_56622231) |
| **掘金** | [juejin.cn/user/2350111542479753](https://juejin.cn/user/2350111542479753) |
| **Email** | x18825407105@outlook.com |

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Three.js](https://threejs.org/) - 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS framework
- [Giscus](https://giscus.app/) - Comments system

---

Built with ❤️ by **badhope** · 2024-present