import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ═══ THE MODERN CLASSIC — "Ink & Paper" Palette ═══

        // Primary Ink — Deep Royal Blue
        royal: {
          950: '#00004D',
          900: '#000066',
          800: '#00008B', // Primary — use for headers & body
          700: '#0000A3',
          600: '#0000BB',
          500: '#0000D4',
          400: '#3333E0',
          300: '#6666E8',
          200: '#9999F0',
          100: '#CCCCF7',
          50: '#E6E6FB',
        },

        // Accent Ink — Cyan/Quill Blue
        quill: {
          600: '#3A78C2',
          500: '#4A90E2', // Primary accent — borders, active states, motion
          400: '#6BA8E8',
          300: '#8CC0EE',
          200: '#ADD8F4',
          100: '#CEE8FA',
          50: '#E7F3FD',
        },

        // Paper shades — for backgrounds and subtle contrasts
        paper: {
          white: '#FFFFFF',
          cream: '#FEFDFB',
          warm: '#FBF9F7',
          cool: '#F8FAFC',
          muted: '#F1F5F9',
        },

        // Legacy colors (maintained for compatibility)
        navy: {
          950: '#020617',
          900: '#0A1628',
          800: '#0F2038',
          700: '#162A4A',
          600: '#1E3A5F',
          500: '#2A4A73',
          400: '#4A6A93',
          300: '#7A9ABB',
          200: '#A8C4DD',
          100: '#D4E4F0',
          50: '#EDF4F8',
        },
        gold: {
          500: '#D4A84B',
          400: '#E4B85B',
          300: '#F0C96B',
        },
      },
      fontFamily: {
        // Sans — Space Grotesk for headings, navigation, labels, UI elements
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // Serif — Source Serif 4 for body text, paragraphs, article content
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        // Mono — system monospace fallback (no custom mono font loaded)
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        // Brutalist hard shadows
        'brutalist-sm': '3px 3px 0px #00008B',
        'brutalist': '6px 6px 0px #00008B',
        'brutalist-lg': '8px 8px 0px #00008B',
        'brutalist-xl': '12px 12px 0px #00008B',
        // Ink glow for active states
        'ink-glow': '0 0 20px rgba(74, 144, 226, 0.3)',
        'ink-glow-lg': '0 0 40px rgba(74, 144, 226, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards',
        'ink-fade': 'inkFade 0.8s ease-out forwards',
        'draw-stroke': 'drawStroke 1.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        inkFade: {
          '0%': { opacity: '0.6', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.3)' },
        },
        drawStroke: {
          to: { strokeDashoffset: '0' },
        },
      },
      transitionTimingFunction: {
        'ink-flow': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'quill-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
