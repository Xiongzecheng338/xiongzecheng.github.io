'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import styles from './page.module.css';

const platformStats = [
  { platform: 'CSDN', articles: 45, views: 125000, likes: 3200 },
  { platform: '掘金', articles: 38, views: 89000, likes: 2100 },
];

const categoryData = [
  { name: 'Python', value: 35, color: '#00d4ff' },
  { name: 'Web开发', value: 28, color: '#bf5af2' },
  { name: 'AI/ML', value: 20, color: '#ff375f' },
  { name: '工具', value: 12, color: '#30d158' },
  { name: '其他', value: 5, color: '#ff9500' },
];

const monthlyViews = [
  { month: '1月', views: 8500 },
  { month: '2月', views: 12000 },
  { month: '3月', views: 9800 },
  { month: '4月', views: 15000 },
  { month: '5月', views: 18500 },
  { month: '6月', views: 22000 },
];

const featuredArticles = [
  {
    title: 'Python爬虫实战：如何优雅地抓取百万级数据',
    platform: 'CSDN',
    views: 25600,
    likes: 890,
    date: '2024-03-15',
    tags: ['Python', '爬虫', '数据采集'],
  },
  {
    title: 'Next.js 15 App Router 完全指南',
    platform: '掘金',
    views: 18900,
    likes: 720,
    date: '2024-02-28',
    tags: ['Next.js', 'React', '前端'],
  },
  {
    title: 'AI辅助开发：我的效率提升10倍的秘密',
    platform: 'CSDN',
    views: 34200,
    likes: 1500,
    date: '2024-01-20',
    tags: ['AI', '效率', '开发工具'],
  },
  {
    title: 'Docker容器化部署全栈应用',
    platform: '掘金',
    views: 12300,
    likes: 450,
    date: '2024-03-01',
    tags: ['Docker', 'DevOps', '部署'],
  },
];

const navItems = [
  { label: '首页', href: '/' },
  { label: '关于', href: '/#about' },
  { label: '项目', href: '/#projects' },
  { label: '博客', href: '/blog' },
  { label: '工具', href: '/tools' },
  { label: '简历', href: '/resume' },
  { label: '联系', href: '/contact' },
];

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <Navigation items={navItems} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>博客中心</span>
            <h1 className={styles.title}>
              <span className="gradient-text">技术</span>分享
            </h1>
            <p className={styles.subtitle}>
              在CSDN和掘金分享技术见解，记录成长足迹
            </p>
          </motion.div>
        </section>

        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {platformStats.map((stat, i) => (
                <motion.a
                  key={stat.platform}
                  href={stat.platform === 'CSDN' ? 'https://blog.csdn.net/weixin_56622231' : 'https://juejin.cn/user/2350111542479753'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.platformCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(0, 212, 255, 0.5)' }}
                >
                  <div className={styles.platformHeader}>
                    <span className={styles.platformName}>{stat.platform}</span>
                    <span className={styles.platformIcon}>
                      {stat.platform === 'CSDN' ? '📚' : '💎'}
                    </span>
                  </div>
                  <div className={styles.platformStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{stat.articles}</span>
                      <span className={styles.statLabel}>文章</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{(stat.views / 1000).toFixed(1)}k</span>
                      <span className={styles.statLabel}>阅读</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{(stat.likes / 1000).toFixed(1)}k</span>
                      <span className={styles.statLabel}>获赞</span>
                    </div>
                  </div>
                  <div className={styles.platformLink}>
                    访问主页 →
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.charts}>
          <div className={styles.container}>
            <div className={styles.chartsGrid}>
              <motion.div
                className={styles.chartCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.chartTitle}>月度阅读趋势</h3>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyViews}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: '#12121a',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#e0e0e0',
                        }}
                      />
                      <Bar dataKey="views" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00d4ff" />
                          <stop offset="100%" stopColor="#bf5af2" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                className={styles.chartCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className={styles.chartTitle}>内容分类分布</h3>
                <div className={styles.chartContainer}>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: '#12121a',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: '#e0e0e0',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.pieLegend}>
                    {categoryData.map((item) => (
                      <div key={item.name} className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: item.color }} />
                        <span className={styles.legendLabel}>{item.name}</span>
                        <span className={styles.legendValue}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.articles}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              <span className="gradient-text">精选</span>文章
            </h2>
            <div className={styles.articlesGrid}>
              {featuredArticles.map((article, i) => (
                <motion.a
                  key={article.title}
                  href={article.platform === 'CSDN' ? 'https://blog.csdn.net/weixin_56622231' : 'https://juejin.cn/user/2350111542479753'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.articleCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.5)' }}
                >
                  <div className={styles.articleHeader}>
                    <span className={styles.articlePlatform}>
                      {article.platform === 'CSDN' ? '📚 CSDN' : '💎 掘金'}
                    </span>
                    <span className={styles.articleDate}>{article.date}</span>
                  </div>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <div className={styles.articleStats}>
                    <span>👁 {article.views.toLocaleString()}</span>
                    <span>❤️ {article.likes}</span>
                  </div>
                  <div className={styles.articleTags}>
                    {article.tags.map((tag) => (
                      <span key={tag} className={styles.articleTag}>{tag}</span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
