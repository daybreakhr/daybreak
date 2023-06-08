const defaultTheme = require('../../node_modules/tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          defaultTheme.fontFamily.sans,
        ],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          900: '#17023C',
          800: '#300978',
          700: '#4C14B0',
          600: '#6926E1',
          500: '#8441FC',
          400: '#A979FF',
          300: '#BF9CFF',
          200: '#D9C3FF',
          100: '#E9DDFF',
          50: '#F0E8FF',
        },
        secondary: {
          main: '#EBD966',
        },
      },
    },
    backgroundImage: {
      'cover-image': "url('/assets/cover.png')",
    },
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false,
  },
}
