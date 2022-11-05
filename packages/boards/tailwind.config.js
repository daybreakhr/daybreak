const defaultTheme = require('../../node_modules/tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#9155fd',
        },
      },
      fontFamily: {
        sans: ['Roboto', defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#9155fd',
              textDecorationLine: 'none',
              '&:hover': {
                textDecorationLine: 'underline',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
