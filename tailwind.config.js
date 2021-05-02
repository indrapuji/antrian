const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // false or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Proxima Nova"', '"Helvetica"', '"sans-serif"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...colors,
        'blue-gray': colors.blueGray,
        'cool-gray': colors.coolGray,
        'true-gray': colors.trueGray,
        'warm-gray': colors.warmGray,
        'light-blue': colors.lightBlue,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
