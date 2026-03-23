# Contributing to badhope Portfolio

We welcome contributions! This document provides guidelines and instructions for contributing to the badhope personal portfolio project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Process](#contribution-process)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Code Review Standards](#code-review-standards)
- [Commit Message Convention](#commit-message-convention)
- [Contribution Types](#contribution-types)
- [Recognition](#recognition)
- [Questions?](#questions)

---

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful, constructive, and inclusive in all interactions.

---

## Getting Started

### Repository Structure

```
src/
├── app/                    # Next.js 15 App Router pages
├── components/             # React components
│   ├── 3d/                # Three.js 3D components
│   ├── ai/                # AI assistant components
│   ├── animations/        # Animation components
│   ├── cards/             # Card components
│   ├── effects/           # Visual effect components
│   ├── sections/          # Page section components
│   └── ui/                # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   └── i18n/             # Internationalization
└── types/                 # TypeScript type definitions
```

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup Steps

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/badhope.github.io.git

# 3. Navigate to project directory
cd badhope.github.io

# 4. Install dependencies
npm install --legacy-peer-deps

# 5. Create a feature branch
git checkout -b feature/your-feature-name

# 6. Start development server
npm run dev

# 7. Make your changes

# 8. Run linting
npm run lint

# 9. Build to verify
npm run build
```

---

## Contribution Process

### 1. Issue Creation

Before starting work on a contribution:

- Search existing issues to avoid duplicates
- Create a new issue with:
  - Clear description of the feature/bug
  - Expected behavior
  - Steps to reproduce (for bugs)
  - Screenshot/mockup (for UI changes)

### 2. Branch Naming Convention

Use descriptive branch names:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `refactor/` | Code refactoring |
| `docs/` | Documentation updates |
| `i18n/` | Internationalization |
| `style/` | Visual/style changes |
| `test/` | Test additions |

**Example:** `feature/add-dark-mode`, `fix/navbar-mobile-scroll`

### 3. Development Guidelines

#### Component Guidelines

- Use functional components with hooks
- Place component files in appropriate directories
- Use CSS Modules for component styling (`.module.css`)
- Export components as default
- Add TypeScript types for props

```tsx
// src/components/ui/Example.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './Example.module.css';

interface ExampleProps {
  title: string;
  onClick?: () => void;
}

export default function Example({ title, onClick }: ExampleProps) {
  return (
    <motion.button onClick={onClick} className={styles.button}>
      {title}
    </motion.button>
  );
}
```

#### i18n Guidelines

- All user-facing text must use the i18n system
- Add translations in `src/lib/i18n/translations.ts`
- Use the `useLanguage` hook for translations

```tsx
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  return <h1>{t.hero.greeting}</h1>;
}
```

---

## Pull Request Guidelines

### PR Requirements

Before submitting a PR:

- [ ] Code follows project style guidelines
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Commit messages follow convention

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (please specify)

## Related Issues
Fixes #issue-number

## Screenshots (if applicable)
Before/After screenshots for UI changes

## Checklist
- [ ] Code follows project conventions
- [ ] Self-reviewed code
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors/warnings
```

### PR Review Process

1. **Automated Checks:** CI/CD runs lint, build, and deployment
2. **Review:** Maintainer reviews code for quality and style
3. **Feedback:** Address any requested changes
4. **Merge:** PR approved and merged to main branch

---

## Code Review Standards

### What We Look For

**Functionality**
- Code works as intended
- Edge cases handled
- No breaking changes

**Code Quality**
- Clear, readable code
- Appropriate abstractions
- No code duplication

**Performance**
- No unnecessary re-renders
- Optimized bundle size
- Efficient data handling

**Style**
- Follows project conventions
- Consistent naming
- Proper formatting

### Review Response Time

We aim to review PRs within 48 hours. Thank you for your patience!

---

## Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting |
| `refactor` | Code restructuring |
| `perf` | Performance improvement |
| `test` | Adding tests |
| `chore` | Maintenance |

### Examples

```
feat(i18n): add Chinese language support
fix(navigation): resolve mobile menu scroll issue
docs(readme): update installation instructions
style(hero): adjust typography spacing
refactor(components): extract shared button logic
```

---

## Contribution Types

### Bug Reports

- Include steps to reproduce
- Specify expected vs actual behavior
- Note browser/OS environment

### Feature Requests

- Describe the feature and its benefits
- Provide use cases
- Consider backwards compatibility

### Documentation

- Fix typos or unclear explanations
- Add missing information
- Improve code examples

### Code Contributions

- Follow all guidelines in this document
- Test thoroughly before submitting
- Keep changes focused and atomic

---

## Recognition

Contributors will be recognized in the following ways:

1. **GitHub Contributors Graph** - Automatically displayed on the repository
2. **Release Notes** - Mentioned in project changelogs
3. **Social Media** - Mentioned in project announcements (with permission)

---

## Questions?

- **GitHub Issues** - For bug reports and feature requests
- **Email** - x18825407105@outlook.com

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to badhope Portfolio! 🚀