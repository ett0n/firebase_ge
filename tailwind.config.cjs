/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./public/src/**/*.{html,js,ts}", "./public/*.html", "./nested/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
