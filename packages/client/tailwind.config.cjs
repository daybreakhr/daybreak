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
          main: '#9155fd',
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
