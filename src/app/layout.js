import './globals.css';
import Sidebar from '@/components/Sidebar';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import EasterEgg from '@/components/EasterEgg';

export const metadata = {
  title: '熊泽城 | AI时代的探索者',
  description: '大数据专业本科生，全栈开发者，活跃的开源贡献者',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-space-bg text-text-main min-h-screen">
        <Sidebar />
        <KeyboardShortcuts />
        <EasterEgg /> {/* 添加彩蛋组件 */}
        <main className="min-h-screen relative">
          {children}
        </main>
      </body>
    </html>
  );
}
