module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './atomic/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        one: {
          normal: '#abdddf',
        },
        two: {
          light: '#fab550',
          normal: '#f15d4a',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
