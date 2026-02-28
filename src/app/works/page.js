'use client';
import { motion } from 'framer-motion';
import { projectsData, articlesData } from '@/data/worksData';
import { ExternalLink, Github, Star, GitFork, BookOpen } from 'lucide-react';

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-space-bg text-text-main py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">作品集</h1>
          <p className="text-text-light text-lg">造物工坊：代码与思想的结晶</p>
        </div>

        {/* 第一板块：GitHub 项目 */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-neon-cyan mb-8 flex items-center gap-2 border-b border-space-border pb-2">
            <Github /> 开源项目
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <motion.a
                key={index}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group block bg-space-card p-6 rounded-lg border border-space-border hover:border-neon-cyan transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,255,218,0.05)] relative overflow-hidden"
              >
                {/* 顶部角标 */}
                <div className="absolute top-0 right-0 bg-space-bg text-xs text-text-light px-2 py-1 rounded-bl border-l border-b border-space-border">
                  Open Source
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan">{project.title}</h3>
                  <div className="flex gap-2 text-text-light text-sm">
                    <span className="flex items-center gap-1"><Star size={14} /> {project.stars}</span>
                    <span className="flex items-center gap-1"><GitFork size={14} /> {project.forks}</span>
                  </div>
                </div>
                
                <p className="text-text-light text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-space-bg text-neon-cyan rounded border border-space-border">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-text-light group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1 hover:text-neon-cyan">
                    <Github size={16} /> 查看源码
                  </span>
                  {project.link && (
                    <span className="flex items-center gap-1 hover:text-neon-cyan">
                      <ExternalLink size={16} /> 在线演示
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* 第二板块：技术文章 */}
        <section>
          <h2 className="text-2xl font-bold text-neon-cyan mb-8 flex items-center gap-2 border-b border-space-border pb-2">
            <BookOpen /> 技术文章
          </h2>

          <div className="space-y-4">
            {articlesData.map((article, index) => (
              <motion.a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-space-card rounded-lg border border-space-border hover:border-neon-cyan transition-all"
              >
                <div className="mb-2 md:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs bg-neon-cyan/10 text-neon-cyan rounded border border-neon-cyan/30">{article.platform}</span>
                    <span className="text-xs text-text-light">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan">{article.title}</h3>
                  <p className="text-sm text-text-light mt-1 hidden md:block">{article.desc}</p>
                </div>
                
                <div className="flex items-center gap-2 text-neon-cyan text-sm font-bold">
                  阅读全文 <ExternalLink size={16} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
