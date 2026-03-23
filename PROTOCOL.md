# Protocol Documentation

> Complete technical documentation for the badhope Portfolio system interfaces, APIs, and interactions.

---

## Table of Contents

- [System Overview](#system-overview)
- [Component Architecture](#component-architecture)
- [Interface Specifications](#interface-specifications)
- [API Documentation](#api-documentation)
- [State Management](#state-management)
- [Internationalization System](#internationalization-system)
- [Animation System](#animation-system)
- [3D Scene System](#3d-scene-system)
- [Data Flow](#data-flow)
- [Error Handling](#error-handling)

---

## System Overview

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 15.1 | SSR/SSG Framework |
| Language | TypeScript | 5.7 | Type Safety |
| Styling | Tailwind CSS | 3.4 | Utility CSS |
| Animation | Framer Motion | 11.x | Animations |
| 3D | Three.js + R3F | Latest | 3D Rendering |
| State | React Context + Zustand | - | State Management |

### Directory Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── [route]/          # Dynamic routes
├── components/             # React components
│   ├── 3d/               # Three.js components
│   ├── ai/               # AI assistant
│   ├── animations/        # Animation wrappers
│   ├── cards/             # Card components
│   ├── effects/           # Visual effects
│   ├── sections/          # Page sections
│   └── ui/               # UI components
├── lib/                   # Libraries
│   ├── i18n/             # Translations
│   ├── ai-api.ts         # AI API wrapper
│   └── utils.ts          # Utilities
└── hooks/                 # Custom hooks
```

---

## Component Architecture

### Component Hierarchy

```
App
├── Providers
│   ├── LanguageProvider
│   ├── NetworkStatus
│   └── ParticleRain
├── Navigation
│   └── LanguageSwitcher
├── Page Sections
│   ├── Hero (with 3D)
│   ├── About
│   ├── Skills
│   ├── Projects
│   └── Footer
└── Page-specific Components
    ├── AI Chat System
    ├── Tools Page
    └── Contact Form
```

### Component Types

| Type | Convention | Example |
|------|------------|---------|
| Page | `page.tsx` | `src/app/ai/page.tsx` |
| Layout | `layout.tsx` | `src/app/ai/layout.tsx` |
| Section | `Section.tsx` | `Hero.tsx`, `About.tsx` |
| UI | `Component.tsx` | `Button.tsx`, `BackToTop.tsx` |
| Animation | `Animation.tsx` | `Typewriter.tsx`, `Loader.tsx` |
| Effect | `Effect.tsx` | `ParticleRain.tsx` |
| 3D | `Three*.tsx` | `ThreeScene.tsx` |

---

## Interface Specifications

### Language Context Interface

```typescript
// src/lib/i18n/LanguageContext.tsx

interface LanguageContextType {
  language: 'en' | 'zh';
  translations: Translations;
  setLanguage: (lang: 'en' | 'zh') => void;
  t: Translations;
}

interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  skills: SkillsTranslations;
  projects: ProjectsTranslations;
  footer: FooterTranslations;
  contact: ContactTranslations;
  tools: ToolsTranslations;
  resume: ResumeTranslations;
  blog: BlogTranslations;
  aiChat: AIChatTranslations;
  common: CommonTranslations;
}
```

### Navigation Interface

```typescript
interface NavItem {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
}
```

### Animation Props Interface

```typescript
interface MotionProps {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: TransitionProps;
  viewport?: ViewportProps;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
}
```

---

## API Documentation

### AI Chat API

```typescript
// src/lib/ai-api.ts

interface AIConfig {
  model: string;
  temperature: number;
  maxTokens: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Methods
sendMessage(messages: ChatMessage[], config: AIConfig): Promise<AIResponse>
```

### Knowledge Base API

```typescript
// src/lib/knowledge-base.ts

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
}

search(query: string): KnowledgeEntry | null
getRelated(category: string): KnowledgeEntry[]
```

---

## State Management

### Global State (React Context)

**LanguageContext**
- Current language ('en' | 'zh')
- Translation strings
- Language setter function

### Component State (useState)

- UI states (modals, dropdowns, toggles)
- Form inputs
- Animation states

### Persistent State (localStorage)

| Key | Type | Purpose |
|-----|------|---------|
| `badhope-language` | 'en' \| 'zh' | Language preference |

---

## Internationalization System

### Translation Structure

```
src/lib/i18n/translations.ts
├── en (English - Default)
└── zh (Chinese)
```

### Translation Categories

Each language object contains:

```typescript
{
  nav: Navigation labels
  hero: Hero section text
  about: About section text
  skills: Skills section text
  projects: Projects section text
  footer: Footer text
  contact: Contact section text
  tools: Tools section text
  resume: Resume section text
  blog: Blog section text
  aiChat: AI Chat interface text
  common: Shared common text
}
```

### Usage in Components

```tsx
import { useLanguage } from '@/lib/i18n/LanguageContext';

function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t.hero.title}</h1>
      {language === 'zh' ? <ChineseContent /> : <EnglishContent />}
    </div>
  );
}
```

---

## Animation System

### Animation Libraries Used

1. **Framer Motion** - React animations
2. **GSAP** - Advanced timeline animations
3. **CSS Transitions** - Simple hover effects
4. **CSS Keyframes** - Continuous animations

### Animation Patterns

#### Scroll-triggered Animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
/>
```

#### Hover Animation

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

#### Staggered Children

```tsx
<motion.div variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  transition: { staggerChildren: 0.1 }
}}>
  {items.map(item => (
    <motion.div key={item} variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }} />
  ))}
</motion.div>
```

---

## 3D Scene System

### Three.js Integration

```tsx
// Dynamic import for SSR safety
const ThreeScene = dynamic(() => import('@/components/3d/ThreeScene'), {
  ssr: false,
  loading: () => <div className={styles.loader} />
});
```

### Scene Components

| Component | Purpose |
|-----------|---------|
| `ThreeScene.tsx` | Main 3D particle mesh scene |
| `ThreeParticleDoor.tsx` | Portal transition effect |

### R3F Dependencies

- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful R3F helpers
- `@react-three/postprocessing` - Post-processing effects

---

## Data Flow

### Page Load Sequence

```
1. Root Layout (layout.tsx)
   ├── Load fonts
   ├── Set metadata
   └── Render Providers
       ├── LanguageProvider (from localStorage)
       ├── NetworkStatus
       └── ParticleRain

2. Navigation (fixed header)
   └── LanguageSwitcher

3. Page Content
   └── Sections render with intersection observer

4. Footer
   └── Social links, copyright
```

### User Interaction Flows

#### Language Switch

```
User clicks LanguageSwitcher
    → setLanguage(newLang)
    → localStorage.setItem('badhope-language', newLang)
    → Context triggers re-render
    → All components with useLanguage() update
```

#### Scroll Animations

```
Element enters viewport
    → Framer Motion's whileInView triggers
    → Animate from initial to animate state
    → viewport={{ once: true }} prevents re-animation
```

---

## Error Handling

### Error Boundaries

```tsx
// src/components/ErrorBoundary.tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
</ErrorBoundary>
```

### Network Error Handling

```tsx
// src/components/ui/NetworkStatus.tsx
- Monitors navigator.onLine
- Displays status indicator
- Handles offline/online transitions
```

### API Error Handling

```typescript
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) throw new Error('Request failed');
  return await response.json();
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

---

## Security Considerations

### Client-Side Only

- No sensitive data stored in client code
- API keys managed via environment variables
- CORS configured for API endpoints

### Input Sanitization

- All user inputs sanitized before rendering
- XSS prevention via React's default escaping
- Form validation on client and server

---

## Performance Optimizations

### Code Splitting

```tsx
// Dynamic imports for heavy components
const ThreeScene = dynamic(() => import('@/components/3d/ThreeScene'), {
  ssr: false,
  loading: () => <Loader />
});
```

### Image Optimization

- Next.js Image component for automatic optimization
- WebP format when supported
- Lazy loading for below-fold images

### Bundle Size

- Tree-shaking enabled
- Component-level code splitting
- Minimal dependencies

---

## Accessibility

### ARIA Labels

```tsx
<button aria-label="Switch to English">EN</button>
<nav aria-label="Main navigation">...</nav>
```

### Keyboard Navigation

- All interactive elements focusable
- Visible focus states
- Skip links for screen readers

### Color Contrast

- WCAG AA compliance
- Minimum 4.5:1 contrast ratio
- Tested in various color schemes

---

## Future Protocol Updates

This protocol will be updated as the system evolves. Major changes will be documented in CHANGELOG.md.

---

**Last Updated:** 2024
**Version:** 1.0.0