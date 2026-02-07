import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2036',
          50: '#f0f2f8',
          100: '#e2e8f0',
          200: '#c4d0e0',
          300: '#a5b8d0',
          400: '#87a0c0',
          500: '#1a2036',
          600: '#252b47',
          700: '#14192b',
          800: '#0f1320',
          900: '#0a0d15',
        },
        secondary: {
          DEFAULT: '#d6b598',
          50: '#f5ede4',
          100: '#e0c4a8',
          200: '#d6b598',
          300: '#c4a588',
          400: '#b89678',
          500: '#d6b598',
          600: '#c4a588',
          700: '#b89678',
          800: '#a68768',
          900: '#947858',
        },
        text: {
          dark: '#1a2036',
          light: '#4a5568',
          muted: '#718096',
        },
        bg: {
          light: '#f7f8fc',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
