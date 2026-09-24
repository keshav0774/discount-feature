/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        'bg-elevated': '#080808',
        'bg-card': '#101010',
        'bg-card-hover': '#161616',
        border: '#222222',
        'border-bright': '#2e2e2e',
        text: '#FFFFFF',
        'text-dim': '#B0B0B0',
        'text-faint': '#707070',
        accent: '#FFFFFF',
        'accent-soft': 'rgba(255, 255, 255, 0.08)',
        'accent-2': '#B0B0B0',
        'accent-2-soft': 'rgba(176, 176, 176, 0.08)',
        success: '#4ee1a0',
        danger: '#ff6b6b',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        lg: '20px',
        md: '14px',
        sm: '9px',
      },
      keyframes: {
        'dot-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.4)' },
          '70%': { boxShadow: '0 0 0 8px rgba(255,255,255,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0)' },
        },
        'cube-spin': { to: { transform: 'rotateY(360deg)' } },
        'cube-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
        'modal-in': {
          from: { opacity: 0, transform: 'translateY(14px) scale(0.97)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'percent-in': {
          from: { opacity: 0, transform: 'scale(0.85)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(140px) rotate(340deg)', opacity: 0 },
        },
        'spin-load': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'dot-pulse': 'dot-pulse 2s ease-out infinite',
        'cube-spin': 'cube-spin 9s linear infinite',
        'cube-float': 'cube-float 4.5s ease-in-out infinite',
        'float-y': 'float-y 5s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
        'orbit-spin': 'spin 24s linear infinite',
        'modal-in': 'modal-in 0.25s cubic-bezier(.2,.9,.3,1)',
        'fade-up': 'fade-up 0.3s ease',
        'percent-in': 'percent-in 0.5s cubic-bezier(.2,.9,.3,1.3)',
        'confetti-fall': 'confetti-fall 1.1s ease-out forwards',
        'spin-load': 'spin-load 0.7s linear infinite',
      },
    },
  },
  plugins: [],
};