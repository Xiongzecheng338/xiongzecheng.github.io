'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ThreeParticleDoor from '@/components/ThreeParticleDoor';
import ParticlesBackground from '@/components/ParticlesBackground';
import Navbar from '@/components/Navbar';
import AnimatedSection, { AnimatedCard } from '@/components/AnimatedSection';
import TiltCard from '@/components/TiltCard';

const works = [
  { title: 'E-Commerce Platform', desc: 'Modern shopping experience with AI recommendations', emoji: '🛒', color: 'from-pink-400 to-purple-500' },
  { title: 'Dashboard Analytics', desc: 'Real-time data visualization for enterprise', emoji: '📊', color: 'from-blue-400 to-cyan-500' },
  { title: 'Social App', desc: 'Connect people with shared interests', emoji: '💬', color: 'from-green-400 to-teal-500' },
  { title: 'AI Assistant', desc: 'Intelligent chatbot with natural language', emoji: '🤖', color: 'from-orange-400 to-red-500' },
  { title: 'Portfolio Site', desc: 'Minimalist showcase for creative professionals', emoji: '🎨', color: 'from-violet-400 to-purple-500' },
  { title: 'Mobile Game', desc: 'Cross-platform casual gaming experience', emoji: '🎮', color: 'from-yellow-400 to-orange-500' },
];

const tools = [
  { name: 'VS Code', desc: 'The best code editor for web development', icon: '💻' },
  { name: 'Figma', desc: 'Collaborative design and prototyping', icon: '🎨' },
  { name: 'GitHub', desc: 'Code hosting and version control', icon: '🐙' },
  { name: 'Vercel', desc: 'Fast and easy deployments', icon: '▲' },
];

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'GSAP', 'Python', 'PostgreSQL', 'Docker', 'AWS'];

export default function HomePage() {
  const introRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowIntro(false);
        setShowContent(true);
      },
    });

    tl.fromTo('.intro-title', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' })
      .fromTo('.intro-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.5')
      .fromTo('.intro-enter', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.3')
      .fromTo('.intro-hint', { opacity: 0 }, { opacity: 0.5, duration: 1 }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  const handleEnter = () => {
    gsap.to(introRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => setShowIntro(false),
    });
    setTimeout(() => setShowContent(true), 800);
  };

  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <ThreeParticleDoor />
      <ParticlesBackground />

      {showIntro && (
        <div ref={introRef} className="fixed inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md">
          <h1 className="intro-title text-7xl font-bold gradient-text mb-4 cursor-pointer hover:scale-105 transition-transform">
            Anonymous
          </h1>
          <p className="intro-subtitle text-xl text-text-secondary mb-4">Creative Developer & Designer</p>
          <p className="intro-subtitle text-sm text-text-secondary/60 mb-12">粒子汇聚开门动画 · 极简白渐变设计</p>
          <button
            onClick={handleEnter}
            className="intro-enter px-10 py-4 rounded-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white font-semibold cursor-pointer hover:scale-110 hover:shadow-2xl hover:shadow-purple-300/50 transition-all duration-300"
          >
            Enter Portfolio
          </button>
          <p className="intro-hint text-xs text-text-secondary mt-8">or wait for auto-play</p>
        </div>
      )}

      {showContent && (
        <div ref={contentRef} className="relative z-10 animate-fadeIn">
          <Navbar items={['About', 'Works', 'Tools', 'Contact']} />

          <section className="min-h-screen flex items-center justify-center px-8 pt-20">
            <div className="max-w-4xl text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Creative</span>
                <br />
                <span className="text-text-primary">Developer</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
                Building digital experiences with cutting-edge technologies.
                <br />
                Focused on performance, aesthetics, and user experience.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="#works"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-white font-semibold hover:scale-105 hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-300"
                >
                  View Works
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 rounded-full border-2 border-purple-300 text-text-primary font-semibold hover:bg-purple-50 transition-all duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </section>

          <AnimatedSection id="about">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-8">
                  <span className="gradient-text">About Me</span>
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  A passionate developer with expertise in modern web technologies.
                  Creating innovative solutions with clean, efficient code and beautiful interfaces.
                </p>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Specialized in building scalable applications, interactive user interfaces,
                  and immersive digital experiences that captivate users.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-sm border border-purple-100 text-center hover:shadow-lg hover:scale-105 transition-all cursor-default"
                    >
                      <span className="text-text-primary font-medium text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <TiltCard className="w-72 h-72 rounded-full bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end p-1 shadow-2xl shadow-purple-300/30">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-purple-50 flex items-center justify-center">
                    <span className="text-8xl">👨‍💻</span>
                  </div>
                </TiltCard>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection id="works">
            <h2 className="text-5xl font-bold text-center mb-16">
              <span className="gradient-text">Featured Works</span>
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.map((work, i) => (
                <AnimatedCard key={i}>
                  <span className="text-5xl mb-4 block">{work.emoji}</span>
                  <h3 className="text-xl font-bold text-text-primary mb-2">{work.title}</h3>
                  <p className="text-text-secondary text-sm">{work.desc}</p>
                  <div className={`mt-4 text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r ${work.color} text-white inline-block`}>
                    View Project
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection id="tools">
            <h2 className="text-5xl font-bold text-center mb-16">
              <span className="gradient-text">Recommended Tools</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {tools.map((tool, i) => (
                <TiltCard
                  key={i}
                  className="flex items-center gap-6 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100"
                >
                  <span className="text-5xl">{tool.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{tool.name}</h3>
                    <p className="text-text-secondary">{tool.desc}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection id="contact">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-8">
                <span className="gradient-text">Get in Touch</span>
              </h2>
              <p className="text-xl text-text-secondary mb-12">
                Interested in working together? Feel free to reach out!
              </p>
              <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-xl bg-white/70 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-text-primary placeholder:text-text-secondary/50 transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 rounded-xl bg-white/70 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-text-primary placeholder:text-text-secondary/50 transition-all"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-6 py-4 rounded-xl bg-white/70 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-text-primary placeholder:text-text-secondary/50 transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white rounded-xl font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </AnimatedSection>

          <footer className="px-8 py-12 text-center border-t border-purple-100/30 bg-white/30 backdrop-blur-sm">
            <p className="text-text-secondary">© 2026 Anonymous Portfolio. All rights reserved.</p>
          </footer>
        </div>
      )}
    </main>
  );
}