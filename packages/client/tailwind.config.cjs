const defaultTheme = require('../../node_modules/tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '.625rem',
      },
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
        success: {
          900: '#064A26',
          800: '#064A26',
          700: '#085D2F',
          600: '#0D944B',
          500: '#10B95E',
          400: '#40C77E',
          300: '#70D59E',
          200: '#E7F8EF',
          100: '#CFF1DF',
          50: '#E7F8EF',
        },
        gray: {
          900: '#12181A',
          800: '#252F35',
          700: '#47555A',
          600: '#58666C',
          500: '#7A848A',
          400: '#9BA3A7',
          300: '#BCC2C4',
          200: '#D7DADC',
          100: '#E4E6E8',
          50: '#F2F3F3',
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
