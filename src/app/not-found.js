'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-space-bg flex flex-col items-center justify-center text-text-main px-4">
      {/* 404 数字动画 */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-[150px] md:text-[200px] font-bold text-space-border opacity-20 mb-8"
      >
        404
      </motion.div>

      {/* 提示信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          迷失在数据宇宙中
        </h1>
        <p className="text-text-light mb-8 max-w-md">
          看起来你探索到了未知的区域，这片星空还没有被点亮。
        </p>

        {/* 返回按钮 */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-neon-cyan text-space-bg font-bold rounded-full"
            >
              <Home size={18} /> 返回首页
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border-2 border-text-light text-text-main font-bold rounded-full hover:border-neon-cyan transition-colors"
          >
            <ArrowLeft size={18} /> 返回上一页
          </button>
        </div>
      </motion.div>

      {/* 装饰性代码 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 font-mono text-xs text-text-light opacity-30"
      >
        <p>{"// ERROR: Page not found in this galaxy"}</p>
        <p>{"// StatusCode: 404"}</p>
      </motion.div>
    </div>
  );
}
