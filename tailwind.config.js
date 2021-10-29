module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'blue-first': '#5eabe4',
        'purple-middle': '#6769d4',
        'purple-end': '#7866b8',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
