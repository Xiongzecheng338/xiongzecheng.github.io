'use client';

import { Component, type ReactNode } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error?: Error }) {
  const { language } = useLanguage();

  const isZh = language === 'zh';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      padding: '2rem',
    }}>
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem',
      }}>
        ⚠️
      </div>
      <h1 style={{
        fontSize: '2rem',
        background: 'linear-gradient(135deg, #00d4ff, #bf5af2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>
        {isZh ? '糟糕！出了点问题' : 'Oops! Something went wrong'}
      </h1>
      <p style={{
        color: '#888888',
        marginBottom: '1rem',
        textAlign: 'center',
        maxWidth: '400px',
      }}>
        {isZh
          ? '抱歉给您带来不便。请尝试刷新页面或返回首页。'
          : 'We apologize for the inconvenience. Please try refreshing the page or return to the home page.'}
      </p>
      {error && process.env.NODE_ENV === 'development' && (
        <pre style={{
          background: '#1a1a2e',
          padding: '1rem',
          borderRadius: '8px',
          overflow: 'auto',
          maxWidth: '100%',
          fontSize: '0.75rem',
          color: '#ff375f',
          marginBottom: '1.5rem',
          maxHeight: '200px',
        }}>
          {error.message}
        </pre>
      )}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #00d4ff, #bf5af2)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isZh ? '刷新页面' : 'Refresh Page'}
        </button>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            background: 'transparent',
            color: '#00d4ff',
            border: '1px solid #00d4ff',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {isZh ? '返回首页' : 'Go Home'}
        </button>
      </div>
    </div>
  );
}