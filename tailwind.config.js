/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          750: '#1e293b',
          850: '#0d131f',
          925: '#060a12',
        },
        dark: {
          950: '#0F172A',
          900: '#1E293B',
          850: '#334155',
          800: '#475569',
          700: '#64748B',
          600: '#94A3B8',
        },
        cyber: {
          cyan: '#0284C7',
          blue: '#2563EB',
          sky: '#0EA5E9',
          violet: '#7C3AED',
          purple: '#9333EA',
          emerald: '#059669',
          crimson: '#E11D48',
          amber: '#D97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 20px 35px -5px rgba(15, 23, 42, 0.08), 0 10px 15px -3px rgba(15, 23, 42, 0.04)',
        'glow-cyan': '0 10px 30px -5px rgba(2, 132, 199, 0.25)',
        'glow-blue': '0 10px 30px -5px rgba(37, 99, 235, 0.25)',
        'glow-violet': '0 10px 30px -5px rgba(124, 58, 237, 0.25)',
        'glow-crimson': '0 10px 30px -5px rgba(225, 29, 72, 0.25)',
        'glow-emerald': '0 10px 30px -5px rgba(5, 150, 105, 0.25)',
        'inner-glow': 'inset 0 0 15px 0 rgba(2, 132, 199, 0.1)',
      },
      animation: {
        'scan-vertical': 'scanVertical 3.5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'glitch': 'glitch 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanVertical: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: '0.3' },
          '50%': { transform: 'translateY(110%)', opacity: '0.9' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
