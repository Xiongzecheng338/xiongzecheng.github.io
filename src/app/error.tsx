'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #FFFFFF 100%)',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        background: 'linear-gradient(135deg, #667EEA, #764BA2, #F093FB)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1rem',
      }}>
        Something went wrong!
      </h1>
      <p style={{
        color: '#4A4A68',
        marginBottom: '0.5rem',
        fontSize: '1rem',
      }}>
        We apologize for the inconvenience.
      </p>
      {error.digest && (
        <p style={{
          color: '#9CA3AF',
          fontSize: '0.75rem',
          marginBottom: '1.5rem',
        }}>
          Error ID: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, #667EEA, #764BA2)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '1rem',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Try again
      </button>
    </div>
  );
}