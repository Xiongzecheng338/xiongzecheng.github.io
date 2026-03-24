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
  subtitle: string;
  viewProject: string;
  viewCode: string;
  projects: {
    id: number;
    title: string;
    description: string;
  }[];
}

export interface FooterTranslations {
  builtWith: string;
  rights: string;
  disclaimer: string;
}

export interface ContactTranslations {
  label: string;
  title: string;
  subtitle: string;
  email: string;
  message: string;
  send: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  successTitle: string;
  successDesc: string;
  socialsTitle: string;
  formTitle: string;
  nameLabel: string;
  socialsDesc: string[];
}

export interface ToolsTranslations {
  label: string;
  title: string;
  subtitle: string;
  tryIt: string;
  categories: {
    all: string;
    editor: string;
    design: string;
    deploy: string;
    devops: string;
    other: string;
  };
  tools: {
    name: string;
    description: string;
    url: string;
  }[];
}

export interface ResumeTranslations {
  label: string;
  title: string;
  subtitle: string;
  location: {
    zh: string;
    en: string;
  };
  download: string;
  print: string;
  sections: {
    summary: string;
    skills: string;
    experience: string;
    education: string;
  };
  skills: {
    frontend: string;
    backend: string;
    aiTools: string;
    frontendTags: string[];
    backendTags: string[];
    aiToolsTags: string[];
  };
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    period: string;
    description: string;
  }[];
  summary: {
    p1: string;
    p2: string;
    p3: string;
  };
}

export interface BlogTranslations {
  label: string;
  title: string;
  subtitle: string;
  readMore: string;
  visitProfile: string;
  articles: string;
  views: string;
  likes: string;
  monthlyViews: string;
  categoryDistribution: string;
  featured: string;
  platformStats: {
    articles: string;
    views: string;
    likes: string;
  };
  articlesData: {
    title: string;
    platform: string;
    views: string;
    likes: string;
    date: string;
    tags: string[];
  }[];
}

export interface AIChatTranslations {
  title: string;
  subtitle: string;
  placeholder: string;
  send: string;
  settings: string;
  model: string;
  temperature: string;
  maxTokens: string;
  features: {
    knowledgeBase: string;
    multiModel: string;
    apiSecurity: string;
    chineseFirst: string;
  };
  configBtn: {
    enabled: string;
    disabled: string;
  };
  loading: string;
  chat: {
    title: string;
  };
  quickQuestions: {
    q: string;
    icon: string;
  }[];
  errorMessages: {
    noMatch: string;
    general: string;
  };
  sources: {
    ai: string;
    knowledge: string;
    system: string;
  };
}

export interface AISettingsTranslations {
  testMessage: {
    noApiKey: string;
    testing: string;
    selectProvider: string;
    success: string;
    failed: string;
  };
  testButton: {
    testing: string;
    test: string;
  };
  title: string;
  provider: string;
  apiKey: string;
  baseUrl: string;
  model: string;
  temperature: string;
  advancedSettings: string;
}

export interface SkillBookTranslations {
  title: string;
  description: string;
  categories: {
    frontend: string;
    backend: string;
    ai: string;
    tools: string;
  };
}

export interface LoaderTranslations {
  taglines: string[];
  skip: string;
}

export interface ErrorBoundaryTranslations {
  title: string;
  message: string;
  reset: string;
  goHome: string;
}

export interface ContactTranslationsFull {
  label: string;
  title: string;
  subtitle: string;
  email: string;
  message: string;
  send: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  successTitle: string;
  successDesc: string;
  socialsTitle: string;
  formTitle: string;
  nameLabel: string;
  socialsDesc: string[];
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
  aiSettings: AISettingsTranslations;
  skillBook: SkillBookTranslations;
  loader: LoaderTranslations;
  errorBoundary: ErrorBoundaryTranslations;
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
      { year: '2021', title: 'Data Science Studies', desc: 'Systematic learning of data science and big data technology' },
      { year: '2022', title: 'Full-Stack Development', desc: 'Mastered frontend to backend web development stack' },
      { year: '2023', title: 'AI Technology Deep Dive', desc: 'In-depth learning of machine learning and AI applications' },
      { year: '2024', title: 'Continuous Growth', desc: 'Exploring cutting-edge technologies, creating value through code' },
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
    subtitle: 'Every project is an exploration of technology and innovation',
    viewProject: 'View Project',
    viewCode: 'View Code',
    projects: [
      { id: 1, title: 'AI-Powered E-Commerce Platform', description: 'Modern shopping experience with AI recommendations, intelligent search and personalized suggestions' },
      { id: 2, title: 'Real-Time Data Visualization', description: 'Enterprise-grade analytics dashboard with multi-dimensional real-time monitoring' },
      { id: 3, title: 'Cross-Platform Social App', description: 'Interest-based social network with real-time chat and content sharing' },
      { id: 4, title: 'Distributed Crawler System', description: 'Scalable data collection framework with distributed crawling and cleaning capabilities' },
    ],
  },
  footer: {
    builtWith: 'Built with',
    rights: 'All rights reserved',
    disclaimer: 'The ideas and opinions expressed in this website are my own.',
  },
  contact: {
    label: 'Contact',
    title: 'Get in Touch',
    subtitle: 'Have a project idea or want to collaborate? Feel free to reach out!',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Your message...',
    successTitle: 'Message sent!',
    successDesc: 'Thank you for reaching out. I will get back to you soon.',
    socialsTitle: 'Social Platforms',
    formTitle: 'Send Message',
    nameLabel: 'Name',
    socialsDesc: ['Open source projects', 'Tech blog articles', 'Development insights', 'Business cooperation'],
  },
  tools: {
    label: 'Tools',
    title: 'Useful',
    subtitle: 'My favorite tools that boost productivity',
    tryIt: 'Try It',
    categories: {
      all: 'All Tools',
      editor: 'Editors',
      design: 'Design',
      deploy: 'Deploy',
      devops: 'DevOps',
      other: 'Other',
    },
    tools: [
      { name: 'VS Code', description: 'The best code editor for web development', url: 'https://code.visualstudio.com/' },
      { name: 'Figma', description: 'Collaborative design and prototyping', url: 'https://figma.com/' },
      { name: 'GitHub', description: 'Code hosting and version control', url: 'https://github.com/' },
      { name: 'Vercel', description: 'Fast and easy deployments', url: 'https://vercel.com/' },
      { name: 'Docker', description: 'Container platform for developers', url: 'https://docker.com/' },
      { name: 'Postman', description: 'API testing and development', url: 'https://postman.com/' },
      { name: 'Notion', description: 'All-in-one workspace for notes', url: 'https://notion.so/' },
      { name: 'Linear', description: 'Issue tracking for software teams', url: 'https://linear.app/' },
    ],
  },
  resume: {
    label: 'Resume',
    title: 'My Journey',
    subtitle: 'Full-Stack Developer · AI Explorer · Open Source Contributor',
    location: {
      zh: 'Shenzhen, Guangdong, China',
      en: 'Shenzhen, Guangdong, China',
    },
    download: 'Download PDF',
    print: 'Print',
    sections: {
      summary: 'Summary',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
    },
    skills: {
      frontend: 'Frontend',
      backend: 'Backend',
      aiTools: 'AI & Tools',
      frontendTags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backendTags: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
      aiToolsTags: ['TensorFlow', 'PyTorch', 'Docker', 'Git', 'Linux'],
    },
    experience: [
      {
        title: 'Full-Stack Developer',
        company: 'Freelance / Personal Projects',
        period: '2022 - Present',
        description: 'Independently developed multiple full-stack projects covering e-commerce, data visualization, and social applications. Proficient in leveraging AI tools to improve development efficiency.',
      },
    ],
    education: [
      {
        degree: 'Data Science & Big Data Technology',
        school: 'University · Shenzhen',
        period: '2020 - 2024',
        description: 'Major in data analysis, machine learning, and backend development. GPA: 3.8/4.0',
      },
    ],
    summary: {
      p1: 'Full-stack developer with expertise in modern web technologies. Passionate about creating elegant solutions and seamless user experiences.',
      p2: 'Strong background in data science and big data technology. Committed to leveraging AI to enhance productivity and solve complex problems.',
      p3: 'Active open source contributor with a growth mindset. Always exploring new technologies and sharing knowledge with the community.',
    },
  },
  blog: {
    label: 'Blog',
    title: 'Thoughts',
    subtitle: 'Sharing technical insights on CSDN and Juejin, recording my growth journey',
    readMore: 'Read More',
    visitProfile: 'Visit Profile',
    articles: 'Articles',
    views: 'Views',
    likes: 'Likes',
    monthlyViews: 'Monthly Views',
    categoryDistribution: 'Category Distribution',
    featured: 'Featured',
    platformStats: {
      articles: 'Articles',
      views: 'Views',
      likes: 'Likes',
    },
    articlesData: [
      {
        title: 'Python Crawler Practice: How to Elegantly Scrape Million-Level Data',
        platform: 'CSDN',
        views: '25.6k',
        likes: '890',
        date: '2024-03-15',
        tags: ['Python', 'Crawler', 'Data Collection'],
      },
      {
        title: 'Next.js 15 App Router Complete Guide',
        platform: 'Juejin',
        views: '18.9k',
        likes: '720',
        date: '2024-02-28',
        tags: ['Next.js', 'React', 'Frontend'],
      },
      {
        title: 'AI-Assisted Development: My Secret to 10x Efficiency',
        platform: 'CSDN',
        views: '34.2k',
        likes: '1500',
        date: '2024-01-20',
        tags: ['AI', 'Efficiency', 'Dev Tools'],
      },
      {
        title: 'Docker Containerized Deployment of Full-Stack Applications',
        platform: 'Juejin',
        views: '12.3k',
        likes: '450',
        date: '2024-03-01',
        tags: ['Docker', 'DevOps', 'Deployment'],
      },
    ],
  },
  aiChat: {
    title: 'AI Assistant',
    subtitle: 'Chat with badhope\'s AI assistant to learn more',
    placeholder: 'Ask me anything...',
    send: 'Send',
    settings: 'Settings',
    model: 'Model',
    temperature: 'Temperature',
    maxTokens: 'Max Tokens',
    features: {
      knowledgeBase: 'Knowledge base Q&A',
      multiModel: 'Multiple AI model support',
      apiSecurity: 'API keys stored locally',
      chineseFirst: 'Priority for Chinese LLMs',
    },
    configBtn: {
      enabled: 'AI Enabled',
      disabled: 'Configure AI',
    },
    loading: 'Loading chat component...',
    chat: {
      title: 'AI Chat',
    },
    quickQuestions: [
      { q: 'Who is badhope?', icon: '👤' },
      { q: 'What are your skills?', icon: '💻' },
      { q: 'What projects do you have?', icon: '📂' },
      { q: 'How can I contact?', icon: '📧' },
    ],
    errorMessages: {
      noMatch: 'Sorry, I couldn\'t find a highly relevant answer. Try:\n• Rephrase your question\n• Visit /contact to reach badhope\n• Check /projects for more info',
      general: 'Something went wrong. Please try again later.',
    },
    sources: {
      ai: 'AI Generated',
      knowledge: 'Knowledge Base',
      system: 'System',
    },
  },
  aiSettings: {
    title: 'AI Settings',
    provider: 'Provider',
    apiKey: 'API Key',
    baseUrl: 'Base URL',
    model: 'Model',
    temperature: 'Temperature',
    advancedSettings: 'Advanced Settings',
    testMessage: {
      noApiKey: 'Please enter API key first',
      testing: 'Testing connection...',
      selectProvider: 'Please select provider first',
      success: 'Connection successful! AI is enabled.',
      failed: 'Connection failed. Check network and API config.',
    },
    testButton: {
      testing: 'Testing...',
      test: 'Test Connection',
    },
  },
  skillBook: {
    title: 'Skill Handbook',
    description: 'Explore badhope\'s technology stack',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      ai: 'AI & Data',
      tools: 'Tools',
    },
  },
  loader: {
    taglines: ['Full-Stack Developer', 'AI Era Explorer', 'Code Creator'],
    skip: 'Skip',
  },
  errorBoundary: {
    title: 'Oops! Something went wrong',
    message: 'An error occurred. Please try refreshing the page.',
    reset: 'Try Again',
    goHome: 'Go Home',
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
      { year: '2021', title: '数据科学专业学习', desc: '系统学习数据科学与大数据技术，打下坚实基础' },
      { year: '2022', title: '全栈开发之路', desc: '从前端到后端，全面掌握Web开发技术栈' },
      { year: '2023', title: 'AI技术深耕', desc: '深入学习机器学习与人工智能，探索AI应用边界' },
      { year: '2024', title: '持续成长中', desc: '不断探索前沿技术，致力于用技术创造价值' },
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
    subtitle: '每一个项目都是一次技术探索与创新的尝试',
    viewProject: '查看项目',
    viewCode: '查看代码',
    projects: [
      { id: 1, title: 'AI驱动的电商平台', description: '融合AI推荐的现代化购物体验，支持智能搜索与个性化推荐' },
      { id: 2, title: '实时数据可视化平台', description: '企业级数据分析仪表盘，支持多维度实时数据监控' },
      { id: 3, title: '跨平台社交应用', description: '基于兴趣图谱的社交网络，支持实时聊天与内容分享' },
      { id: 4, title: '智能爬虫系统', description: '分布式爬虫框架，支持大规模数据采集与清洗' },
    ],
  },
  footer: {
    builtWith: '用',
    rights: '版权所有',
    disclaimer: '本网站所表达的想法和观点仅代表本人。',
  },
  contact: {
    label: '联系',
    title: '联系我',
    subtitle: '有项目合作或技术交流？随时欢迎联系我',
    email: '邮箱',
    message: '留言',
    send: '发送消息',
    namePlaceholder: '您的姓名',
    emailPlaceholder: '您的邮箱',
    messagePlaceholder: '请输入留言内容...',
    successTitle: '消息已发送！',
    successDesc: '感谢你的留言，我会尽快回复。',
    socialsTitle: '社交平台',
    formTitle: '发送消息',
    nameLabel: '姓名',
    socialsDesc: ['开源项目与代码', '技术博客文章', '开发心得分享', '商务合作联系'],
  },
  tools: {
    label: '工具',
    title: '实用',
    subtitle: '我喜欢的效率工具推荐',
    tryIt: '试试看',
    categories: {
      all: '全部',
      editor: '编辑器',
      design: '设计',
      deploy: '部署',
      devops: 'DevOps',
      other: '其他',
    },
    tools: [
      { name: 'VS Code', description: '最佳的Web开发代码编辑器', url: 'https://code.visualstudio.com/' },
      { name: 'Figma', description: '协作设计和原型制作', url: 'https://figma.com/' },
      { name: 'GitHub', description: '代码托管和版本控制', url: 'https://github.com/' },
      { name: 'Vercel', description: '快速简单的部署平台', url: 'https://vercel.com/' },
      { name: 'Docker', description: '开发者容器平台', url: 'https://docker.com/' },
      { name: 'Postman', description: 'API测试和开发工具', url: 'https://postman.com/' },
      { name: 'Notion', description: '多功能笔记工作空间', url: 'https://notion.so/' },
      { name: 'Linear', description: '软件团队问题追踪', url: 'https://linear.app/' },
    ],
  },
  resume: {
    label: '简历',
    title: '历程',
    subtitle: '全栈开发者 · AI探索者 · 开源贡献者',
    location: {
      zh: '深圳 · 广东 · 中国',
      en: '深圳 · 广东 · 中国',
    },
    download: '下载PDF',
    print: '打印',
    sections: {
      summary: '个人简介',
      skills: '技能',
      experience: '经验',
      education: '教育',
    },
    skills: {
      frontend: '前端',
      backend: '后端',
      aiTools: 'AI与工具',
      frontendTags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backendTags: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
      aiToolsTags: ['TensorFlow', 'PyTorch', 'Docker', 'Git', 'Linux'],
    },
    experience: [
      {
        title: '全栈开发工程师',
        company: '个人项目 / 自由职业',
        period: '2022 - Present',
        description: '独立完成多个全栈项目，涵盖电商、数据可视化、社交应用等领域。熟练运用AI工具提升开发效率。',
      },
    ],
    education: [
      {
        degree: '数据科学与大数据技术',
        school: '大学 · 深圳',
        period: '2020 - 2024',
        description: '主修数据分析、机器学习、后端开发。 GPA: 3.8/4.0',
      },
    ],
    summary: {
      p1: '全栈开发者，精通现代Web技术。热衷于创造优雅解决方案和无缝用户体验。',
      p2: '数据科学与大数据技术背景。致力于利用AI提升生产力、解决复杂问题。',
      p3: '活跃的开源贡献者，拥有成长型思维。不断探索新技术，与社区分享知识。',
    },
  },
  blog: {
    label: '博客',
    title: '思考',
    subtitle: '在CSDN和掘金分享技术见解，记录成长足迹',
    readMore: '阅读更多',
    visitProfile: '访问主页',
    articles: '文章',
    views: '阅读',
    likes: '获赞',
    monthlyViews: '月度阅读趋势',
    categoryDistribution: '内容分类分布',
    featured: '精选',
    platformStats: {
      articles: '文章',
      views: '阅读',
      likes: '获赞',
    },
    articlesData: [
      {
        title: 'Python爬虫实战：如何优雅地抓取百万级数据',
        platform: 'CSDN',
        views: '25.6k',
        likes: '890',
        date: '2024-03-15',
        tags: ['Python', '爬虫', '数据采集'],
      },
      {
        title: 'Next.js 15 App Router 完全指南',
        platform: '掘金',
        views: '18.9k',
        likes: '720',
        date: '2024-02-28',
        tags: ['Next.js', 'React', '前端'],
      },
      {
        title: 'AI辅助开发：我的效率提升10倍的秘密',
        platform: 'CSDN',
        views: '34.2k',
        likes: '1500',
        date: '2024-01-20',
        tags: ['AI', '效率', '开发工具'],
      },
      {
        title: 'Docker容器化部署全栈应用',
        platform: '掘金',
        views: '12.3k',
        likes: '450',
        date: '2024-03-01',
        tags: ['Docker', 'DevOps', '部署'],
      },
    ],
  },
  aiChat: {
    title: 'AI 助手',
    subtitle: '与 badhope 的 AI 助手对话，了解更多信息',
    placeholder: '问我任何问题...',
    send: '发送',
    settings: '设置',
    model: '模型',
    temperature: '温度',
    maxTokens: '最大令牌',
    features: {
      knowledgeBase: '基于知识库的智能问答',
      multiModel: '支持多种AI模型接入',
      apiSecurity: 'API密钥仅存储在本地',
      chineseFirst: '优先支持国产大模型',
    },
    configBtn: {
      enabled: 'AI已启用',
      disabled: '配置AI',
    },
    loading: '加载聊天组件...',
    chat: {
      title: 'AI 对话',
    },
    quickQuestions: [
      { q: 'badhope是谁？', icon: '👤' },
      { q: '擅长什么技术？', icon: '💻' },
      { q: '有哪些项目？', icon: '📂' },
      { q: '如何联系？', icon: '📧' },
    ],
    errorMessages: {
      noMatch: '抱歉，我无法找到关于这个问题的高匹配答案。你可以尝试：\n• 换一种方式描述你的问题\n• 访问 /contact 页面联系 badhope\n• 查看 /projects 页面了解更多信息',
      general: '发生了一些问题，请稍后再试。',
    },
    sources: {
      ai: 'AI生成',
      knowledge: '知识库',
      system: '系统',
    },
  },
  aiSettings: {
    title: 'AI 设置',
    provider: '提供商',
    apiKey: 'API 密钥',
    baseUrl: 'API 地址',
    model: '模型',
    temperature: '温度',
    advancedSettings: '高级设置',
    testMessage: {
      noApiKey: '请先输入API密钥',
      testing: '正在测试连接...',
      selectProvider: '请先选择AI提供商',
      success: '连接成功！AI功能已启用。',
      failed: '连接失败，请检查网络和API配置',
    },
    testButton: {
      testing: '测试中...',
      test: '测试连接',
    },
  },
  skillBook: {
    title: '技能手册',
    description: '探索 badhope 的技术栈',
    categories: {
      frontend: '前端',
      backend: '后端',
      ai: 'AI与数据',
      tools: '工具',
    },
  },
  loader: {
    taglines: ['全栈开发者', 'AI时代探索者', '代码创造者'],
    skip: '跳过',
  },
  errorBoundary: {
    title: '出错了！',
    message: '发生了一些错误，请尝试刷新页面。',
    reset: '重试',
    goHome: '返回首页',
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