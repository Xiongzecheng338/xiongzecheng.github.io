export type Language = 'en' | 'zh';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavTranslations {
  home: string;
  about: string;
  projects: string;
  blog: string;
  aiAssistant: string;
  tools: string;
  resume: string;
  contact: string;
}

export interface HeroTranslations {
  greeting: string;
  name: string;
  titles: string[];
  scrollHint: string;
}

export interface AboutTranslations {
  label: string;
  title: string;
  bio1: string;
  bio2: string;
  stats: {
    githubStars: string;
    projects: string;
    contributions: string;
  };
  timeline: {
    year: string;
    title: string;
    desc: string;
  }[];
}

export interface SkillsTranslations {
  label: string;
  title: string;
  categories: {
    frontend: string;
    backend: string;
    ai: string;
    devops: string;
  };
}

export interface ProjectsTranslations {
  label: string;
  title: string;
  viewProject: string;
  viewCode: string;
}

export interface FooterTranslations {
  builtWith: string;
  rights: string;
  disclaimer: string;
}

export interface ContactTranslations {
  label: string;
  title: string;
  email: string;
  message: string;
  send: string;
}

export interface ToolsTranslations {
  label: string;
  title: string;
  tryIt: string;
}

export interface ResumeTranslations {
  label: string;
  title: string;
  download: string;
  print: string;
}

export interface BlogTranslations {
  label: string;
  title: string;
  readMore: string;
}

export interface AIChatTranslations {
  title: string;
  placeholder: string;
  send: string;
  settings: string;
  model: string;
  temperature: string;
  maxTokens: string;
}

export interface CommonTranslations {
  loading: string;
  error: string;
  retry: string;
  close: string;
  save: string;
  cancel: string;
  language: string;
  switchLanguage: string;
}

export interface Translations {
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

export const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    blog: 'Blog',
    aiAssistant: 'AI Assistant',
    tools: 'Tools',
    resume: 'Resume',
    contact: 'Contact',
  },
  hero: {
    greeting: 'Hello, I am',
    name: 'badhope',
    titles: ['Full-Stack Developer', 'AI Era Explorer', 'Open Source Contributor', 'Data Engineer'],
    scrollHint: 'Scroll to explore',
  },
  about: {
    label: 'About Me',
    title: 'Full-Stack',
    bio1: 'Hello! I am <highlight>badhope</highlight>, a full-stack developer from Shenzhen. With a background in Data Science and Big Data Technology, I am passionate about creating value through code.',
    bio2: 'I am an <highlight>AI Era Explorer</highlight>, convinced that AI is key to boosting productivity. I leverage AI-assisted development and pursue technical excellence.',
    stats: {
      githubStars: 'GitHub Stars',
      projects: 'Projects',
      contributions: 'Contributions',
    },
    timeline: [
      { year: '20XX', title: 'Started Data Science Program', desc: 'Began systematic learning of data science and big data technology' },
      { year: '20XX', title: 'Full-Stack Development Journey', desc: 'Embraced AI-assisted development from frontend to backend' },
      { year: '20XX', title: 'Open Source Contributor', desc: 'Actively participated in open source projects and contributed code' },
      { year: 'Now', title: 'AI Era Explorer', desc: 'Exploring cutting-edge technologies, riding the wave of the era' },
    ],
  },
  skills: {
    label: 'Skills',
    title: 'Tech',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      ai: 'AI & Data',
      devops: 'DevOps',
    },
  },
  projects: {
    label: 'Projects',
    title: 'Featured',
    viewProject: 'View Project',
    viewCode: 'View Code',
  },
  footer: {
    builtWith: 'Built with',
    rights: 'All rights reserved',
    disclaimer: 'The ideas and opinions expressed in this website are my own.',
  },
  contact: {
    label: 'Contact',
    title: 'Get in Touch',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
  },
  tools: {
    label: 'Tools',
    title: 'Useful',
    tryIt: 'Try It',
  },
  resume: {
    label: 'Resume',
    title: 'My Journey',
    download: 'Download PDF',
    print: 'Print',
  },
  blog: {
    label: 'Blog',
    title: 'Thoughts',
    readMore: 'Read More',
  },
  aiChat: {
    title: 'AI Assistant',
    placeholder: 'Ask me anything...',
    send: 'Send',
    settings: 'Settings',
    model: 'Model',
    temperature: 'Temperature',
    maxTokens: 'Max Tokens',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    language: 'Language',
    switchLanguage: 'Switch Language',
  },
};

export const zh: Translations = {
  nav: {
    home: '首页',
    about: '关于',
    projects: '项目',
    blog: '博客',
    aiAssistant: 'AI助手',
    tools: '工具',
    resume: '简历',
    contact: '联系',
  },
  hero: {
    greeting: '你好，我是',
    name: 'badhope',
    titles: ['全栈开发者', 'AI时代探索者', '开源贡献者', '数据工程师'],
    scrollHint: '滚动探索',
  },
  about: {
    label: '关于我',
    title: '全栈',
    bio1: '你好！我是 <highlight>badhope</highlight>，一名来自深圳的<span className={styles.highlight}>全栈开发者</span>。数据科学与大数据技术专业背景，热衷于用代码创造价值。',
    bio2: '我是 <highlight>AI时代探索者</highlight>，坚信AI是提升生产力的关键。善用AI辅助开发，追求技术卓越。',
    stats: {
      githubStars: 'GitHub Stars',
      projects: '项目数',
      contributions: '开源贡献',
    },
    timeline: [
      { year: '20XX', title: '入学数据科学专业', desc: '开始系统学习数据科学与大数据技术' },
      { year: '20XX', title: '全栈开发之路', desc: '从前端到后端，拥抱AI辅助开发' },
      { year: '20XX', title: '开源贡献者', desc: '积极参与开源项目，贡献代码' },
      { year: 'Now', title: 'AI时代探索者', desc: '探索前沿技术，做时代的弄潮儿' },
    ],
  },
  skills: {
    label: '技能',
    title: '技术',
    categories: {
      frontend: '前端',
      backend: '后端',
      ai: 'AI与数据',
      devops: 'DevOps',
    },
  },
  projects: {
    label: '项目',
    title: '精选',
    viewProject: '查看项目',
    viewCode: '查看代码',
  },
  footer: {
    builtWith: '用',
    rights: '版权所有',
    disclaimer: '本网站所表达的想法和观点仅代表本人。',
  },
  contact: {
    label: '联系',
    title: '联系我',
    email: '邮箱',
    message: '留言',
    send: '发送消息',
  },
  tools: {
    label: '工具',
    title: '实用',
    tryIt: '试试看',
  },
  resume: {
    label: '简历',
    title: '历程',
    download: '下载PDF',
    print: '打印',
  },
  blog: {
    label: '博客',
    title: '思考',
    readMore: '阅读更多',
  },
  aiChat: {
    title: 'AI助手',
    placeholder: '问我任何问题...',
    send: '发送',
    settings: '设置',
    model: '模型',
    temperature: '温度',
    maxTokens: '最大令牌',
  },
  common: {
    loading: '加载中...',
    error: '发生错误',
    retry: '重试',
    close: '关闭',
    save: '保存',
    cancel: '取消',
    language: '语言',
    switchLanguage: '切换语言',
  },
};