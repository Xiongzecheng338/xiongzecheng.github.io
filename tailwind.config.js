/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          white: '#FFFFFF',
          secondary: '#F8F9FA',
        },
        gradient: {
          start: '#667EEA',
          mid: '#764BA2',
          end: '#F093FB',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#4A4A68',
        },
        accent: {
          glow: 'rgba(102, 126, 234, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};