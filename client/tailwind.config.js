module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      // 'xsm': '340',
      // // => @media (min-width: 340px) { ... }

      // 'sm': '640',
      // // => @media (min-width: 640px) { ... }

      // 'md': '834',
      // // => @media (min-width: 834px) { ... }

      // 'lg': '1024px',
      // // => @media (min-width: 1024px) { ... }

      // 'xl': '1280px',
      // // => @media (min-width: 1280px) { ... }

      // '2xl': '1536px',
      // // => @media (min-width: 1536px) { ... }
      'sm': '640px',
      'md': '960px',
      'lg': '1280px',
      'xl': '1280px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tw-elements/dist/plugin"),
    require('flowbite/plugin')
  ],
}