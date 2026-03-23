'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchKnowledgeBase, getRandomGreeting, skillCategories, FAQItem } from '@/lib/knowledge-base';
import { isAIEnabled, generateAIResponse, AIMessage } from '@/lib/ai-api';
import styles from './AIChat.module.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  source?: 'knowledge' | 'ai' | 'system';
}

interface AIChatProps {
  className?: string;
}

export default function AIChat({ className }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAiEnabled(isAIEnabled());
  }, []);

  useEffect(() => {
    if (!isInitialized && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: getRandomGreeting(),
        timestamp: new Date(),
        source: 'system',
      }]);
      setIsInitialized(true);
    }
  }, [isInitialized, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const kbMatch = searchKnowledgeBase(userMessage.content);

      if (aiEnabled) {
        const chatMessages: AIMessage[] = messages.slice(1).map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));
        chatMessages.push({ role: 'user', content: userMessage.content });

        try {
          const response = await generateAIResponse(chatMessages);
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            timestamp: new Date(),
            source: 'ai',
          };
          setMessages(prev => [...prev, aiMessage]);
          return;
        } catch {
          console.warn('AI调用失败，回退到知识库');
        }
      }

      if (kbMatch) {
        const kbMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: kbMatch.answer,
          timestamp: new Date(),
          source: 'knowledge',
        };
        setMessages(prev => [...prev, kbMessage]);
      } else {
        const fallbackMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '抱歉，我无法找到关于这个问题的高匹配答案。你可以尝试：\n• 换一种方式描述你的问题\n• 访问 /contact 页面联系 badhope\n• 查看 /projects 页面了解更多信息',
          timestamp: new Date(),
          source: 'system',
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '发生了一些问题，请稍后再试。',
        timestamp: new Date(),
        source: 'system',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions: { q: string; icon: string }[] = [
    { q: 'badhope是谁？', icon: '👤' },
    { q: '擅长什么技术？', icon: '💻' },
    { q: '有哪些项目？', icon: '📂' },
    { q: '如何联系？', icon: '📧' },
  ];

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.messages}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              className={`${styles.message} ${styles[msg.role]} ${msg.source ? styles[msg.source] : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index === messages.length - 1 ? 0 : 0 }}
            >
              {msg.role === 'assistant' && (
                <div className={styles.avatar}>
                  {msg.source === 'ai' ? '🤖' : msg.source === 'knowledge' ? '📚' : '💬'}
                </div>
              )}
              <div className={styles.bubble}>
                <p>{msg.content}</p>
                {msg.source && (
                  <span className={styles.sourceTag}>
                    {msg.source === 'ai' ? 'AI生成' : msg.source === 'knowledge' ? '知识库' : '系统'}
                  </span>
                )}
              </div>
              {msg.role === 'user' && <div className={styles.avatar}>👤</div>}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            className={`${styles.message} ${styles.assistant}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.avatar}>🤖</div>
            <div className={styles.bubble}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className={styles.quickQuestions}>
          {quickQuestions.map(item => (
            <button
              key={item.q}
              className={styles.quickBtn}
              onClick={() => {
                setInputValue(item.q);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.q}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          placeholder="输入问题..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <motion.button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </motion.button>
      </div>

      {!aiEnabled && messages.length <= 2 && (
        <div className={styles.notice}>
          <span>💡 当前使用知识库回答，配置AI API可获得更智能的对话体验</span>
        </div>
      )}
    </div>
  );
}
